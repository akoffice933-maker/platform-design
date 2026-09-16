// ============================================================================
// ИИ через OpenRouter (фаза 1, docs/12). Демо-режим BYOK: ключ живёт только в
// localStorage этого браузера и уходит напрямую в openrouter.ai (CORS открыт).
// ПРОД: тот же контракт через серверный прокси (ключ на сервере) — интерфейс
// функций не меняется, компоненты править не придётся.
// Без ключа всё работает детерминированно (фолбэк) — ИИ здесь опция.
// ============================================================================
const CFG_KEY = 'platform.ai.v1';

export interface AiConfig { key: string; model: string; judge: boolean; client: boolean }

// Бесплатные модели OpenRouter (live-список сент. 2026, pricing 0/0).
// Дефолт — автороутер openrouter/free: переживает отсутствие отдельных моделей.
export const FREE_MODELS = [
  { id: 'openrouter/free', label: 'openrouter/free · автороутер (рекоменд.)' },
  { id: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B · Google' },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Nemotron 3 Super 120B · NVIDIA' },
  { id: 'z-ai/glm-5.2:free', label: 'GLM 5.2 · Z.ai' },
  { id: 'thinkingmachines/inkling:free', label: 'Inkling · Thinking Machines' },
];

const DEFAULTS: AiConfig = { key: '', model: FREE_MODELS[0].id, judge: true, client: true };

export function aiConfig(): AiConfig {
  try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(CFG_KEY) || '{}') as Partial<AiConfig>) }; }
  catch { return { ...DEFAULTS }; }
}
export function setAiConfig(patch: Partial<AiConfig>): void {
  try { localStorage.setItem(CFG_KEY, JSON.stringify({ ...aiConfig(), ...patch })); } catch { /* приватный режим */ }
}
export function hasKey(c: AiConfig = aiConfig()): boolean { return c.key.trim().length > 10; }

async function chat(messages: { role: string; content: string }[], opts?: { temperature?: number; maxTokens?: number }): Promise<string> {
  const c = aiConfig();
  if (!hasKey(c)) throw new Error('нет ключа OpenRouter');
  // :free-модели бывают медленными (live: 3–22 c) и иногда возвращают пустой
  // content — таймаут 30 c + фолбэк в вызывающем коде, UI не зависает.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  let res: Response;
  try {
    res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        Authorization: 'Bearer ' + c.key.trim(),
        'Content-Type': 'application/json',
        'HTTP-Referer': location.origin,
        'X-Title': 'Platform Design Demo',
      },
      body: JSON.stringify({
        model: c.model,
        messages,
        temperature: opts?.temperature ?? 0.2,
        max_tokens: opts?.maxTokens ?? 400,
      }),
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error('OpenRouter ' + res.status);
  const d = await res.json();
  const text = d?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) throw new Error('пустой ответ модели');
  return text;
}

// --- ИИ-судья свободного ответа (input-узлы; docs/09: скоринг на бэкенде) ---

export interface Verdict { scores: Record<string, number>; feedback: string; kind: 'strength' | 'growth'; source: 'ai' | 'fallback' }

const SKILL_IDS = ['listening', 'empathy', 'boundaries', 'structuring', 'emotion_work', 'resistance', 'questioning', 'reflection'];
const clamp3 = (n: number) => Math.max(-3, Math.min(3, Math.round(Number(n)) || 0));

function extractJson(raw: string): Record<string, unknown> {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('в ответе нет JSON');
  return JSON.parse(m[0]);
}

export async function judgeInput(p: { hints: string[]; text: string; nodeScores?: Record<string, number>; emotionLabel?: string }): Promise<Verdict> {
  const c = aiConfig();
  if (!c.judge || !hasKey(c)) return fallbackVerdict(p);
  try {
    const raw = await chat([
      {
        role: 'system',
        content: 'Ты супервизор-психолог на обучающей платформе. Оцениваешь свободный ответ стажёра клиенту. Верни ТОЛЬКО валидный JSON без пояснений: {"scores": {"<skillId>": целое от -3 до 3}, "kind": "strength"|"growth", "feedback": "одно предложение до 90 символов, по-русски, конкретно про ответ стажёра"}. Допустимые skillId: ' + SKILL_IDS.join(', ') + '. Оценивай близость ответа к подсказкам и базовые навыки активного слушания. Другие ключи и skillId запрещены. Пустой scores допустим.',
      },
      {
        role: 'user',
        content: 'Эмоция клиента: ' + (p.emotionLabel ?? 'нейтральная') + '. Подсказки стажёру: ' + JSON.stringify(p.hints) + '. Ответ стажёра: «' + p.text + '»',
      },
    ], { temperature: 0.2, maxTokens: 250 });
    const j = extractJson(raw);
    const rawScores = (j.scores ?? {}) as Record<string, unknown>;
    const scores: Record<string, number> = {};
    for (const [k, v] of Object.entries(rawScores)) if (SKILL_IDS.includes(k)) scores[k] = clamp3(v as number);
    if (!Object.keys(scores).length) throw new Error('модель не дала оценок');
    const kind: 'strength' | 'growth' = j.kind === 'strength' ? 'strength' : 'growth';
    const feedback = String(j.feedback ?? '').slice(0, 140) || 'Ответ принят.';
    return { scores, feedback, kind, source: 'ai' };
  } catch {
    return fallbackVerdict(p);
  }
}

/** Детерминированный фолбэк: сопоставление свободного ответа с подсказками по словоформам. */
function fallbackVerdict(p: { hints: string[]; text: string; nodeScores?: Record<string, number>; emotionLabel?: string }): Verdict {
  const words = (s: string) => s.toLowerCase().split(/[^а-яёa-z0-9]+/).filter((w) => w.length >= 4);
  const tw = words(p.text);
  const hitWord = (w: string) => tw.some((t) => t.slice(0, 3) === w.slice(0, 3)); // «самый»~«самое», «страшный»~«страшное»
  let best = 0;
  let bestHint = '';
  for (const h of p.hints) {
    const hw = words(h);
    const hit = hw.filter(hitWord).length / Math.max(1, hw.length);
    if (hit > best) { best = hit; bestHint = h; }
  }
  const base = p.nodeScores ?? { emotion_work: 1, reflection: 1 };
  if (best >= 0.34) {
    return { scores: base, feedback: 'Ответ близок к подсказке «' + bestHint + '» — разверните её своими словами.', kind: 'strength', source: 'fallback' };
  }
  const weak = Object.fromEntries(Object.entries(base).map(([k, v]) => [k, Math.sign(v)])) as Record<string, number>;
  return {
    scores: weak,
    feedback: bestHint ? 'Ответ далёк от подсказки «' + bestHint + '» — сначала отразите чувство клиента.' : 'Свободный ответ принят: добавьте отражение чувства клиента.',
    kind: 'growth',
    source: 'fallback',
  };
}

// --- ИИ-вариант реплики клиента (text-узлы): смысл и эмоция неизменны ---

export async function rephraseClientLine(p: { line: string; role: string; brief: string; emotion: string }): Promise<string> {
  const c = aiConfig();
  if (!c.client || !hasKey(c)) throw new Error('ИИ-клиент выключен');
  const raw = await chat([
    {
      role: 'system',
      content: 'Ты играешь клиента на обучении психологов. Переформулируй реплику СВОИМИ СЛОВАМИ, сохранив смысл, интенсивность эмоции и длину (1–2 фразы). Не добавляй новых фактов, не выходи из роли. Верни только реплику, без кавычек и пояснений.',
    },
    {
      role: 'user',
      content: 'Клиент: ' + p.role + '. ' + p.brief + ' Эмоция сейчас: ' + p.emotion + '. Реплика: «' + p.line + '»',
    },
  ], { temperature: 0.9, maxTokens: 160 });
  const out = raw.trim().replace(/^["«»]+|["«»]+$/g, '');
  if (out.length < 6 || out.length > 220) throw new Error('модель вернула неподходящую реплику');
  return out;
}
