// ============================================================================
// ИИ через OpenRouter (фаза 1, docs/12). Демо-режим BYOK.
// v1.1: ключ живёт в рантайм-состоянии (localStorage — только кэш: во встроенных
// превью-iframe он может быть недоступен), ошибки НЕ глотаются — возвращаются
// человекочитаемым кодом, есть testKey() для диагностики «в один клик».
// Прод: тот же контракт через серверный прокси — интерфейс функций не меняется.
// ============================================================================
import type { Scenario } from './engine';

const CFG_KEY = 'platform.ai.v1';

export interface AiConfig { key: string; model: string; judge: boolean; client: boolean }

// Бесплатные модели OpenRouter (live-список сент. 2026, pricing 0/0).
// По решению пользователя GLM 5.2 и автороутер openrouter/free (водивший к GLM)
// выведены: дефолт — google/gemma-4-31b-it:free (русский язык, строгий JSON, скорость).
export const FREE_MODELS = [
  { id: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B · Google (рекоменд.)' },
  { id: 'google/gemma-4-26b-a4b-it:free', label: 'Gemma 4 26B MoE · быстрее' },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Nemotron 3 Super 120B · NVIDIA' },
  { id: 'nex-agi/nex-n2.5-pro:free', label: 'Nex N2.5 Pro' },
  { id: 'thinkingmachines/inkling:free', label: 'Inkling · Thinking Machines' },
];

const DEFAULTS: AiConfig = { key: '', model: FREE_MODELS[0].id, judge: true, client: true };

// Рантайм-конфиг (источник истины в UI; localStorage может быть недоступен)
let RUNTIME: AiConfig | null = null;
export function setRuntimeConfig(c: AiConfig): void { RUNTIME = { ...c }; }

export class AiError extends Error {
  code: 'auth' | 'limit' | 'timeout' | 'network' | 'empty' | 'http' | 'nokey';
  constructor(code: AiError['code'], message: string) { super(message); this.code = code; }
}

export function aiConfig(): AiConfig {
  if (RUNTIME) return { ...RUNTIME };
  try {
    const c = { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(CFG_KEY) || '{}') as Partial<AiConfig>) };
    // миграция: выведенные модели (автороутер, GLM) → новый дефолт
    if (!FREE_MODELS.some((m) => m.id === c.model)) c.model = DEFAULTS.model;
    return c;
  }
  catch { return { ...DEFAULTS }; }
}
export function setAiConfig(patch: Partial<AiConfig>): void {
  try { localStorage.setItem(CFG_KEY, JSON.stringify({ ...aiConfig(), ...patch })); } catch { /* приватный режим / песочница */ }
}
export function hasKey(c: AiConfig = aiConfig()): boolean { return c.key.trim().length > 10; }

async function chat(messages: { role: string; content: string }[], opts?: { temperature?: number; maxTokens?: number }): Promise<{ text: string; model: string; ms: number }> {
  const c = aiConfig();
  if (!hasKey(c)) throw new AiError('nokey', 'Ключ не задан — вставьте его в панели «ИИ · OpenRouter»');
  const t0 = Date.now();
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
        'HTTP-Referer': (typeof location !== 'undefined' ? location.origin : 'https://akoffice933-maker.github.io'),
        'X-Title': 'Platform Design Demo',
      },
      body: JSON.stringify({
        model: c.model,
        messages,
        temperature: opts?.temperature ?? 0.2,
        max_tokens: opts?.maxTokens ?? 400,
      }),
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw new AiError('timeout', 'Таймаут 30 c — бесплатная модель не ответила, попробуйте ещё раз или смените модель');
    throw new AiError('network', 'Сеть недоступна или запрос заблокирован (расширения/прокси?)');
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401 || res.status === 403) throw new AiError('auth', 'Ключ отклонён (401) — проверьте, скопировался ли он целиком: sk-or-v1-…');
  if (res.status === 429) throw new AiError('limit', 'Дневной лимит бесплатных моделей исчерпан (429) — подождите до завтра, смените модель или пополните баланс OpenRouter');
  if (!res.ok) throw new AiError('http', 'OpenRouter вернул ' + res.status);
  const d = await res.json();
  const text = d?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) throw new AiError('empty', 'Модель вернула пустой ответ — попробуйте ещё раз или другую модель');
  return { text, model: String(d?.model ?? c.model), ms: Date.now() - t0 };
}

/** Диагностика «в один клик»: минимальный вызов, человекочитаемый итог. */
export async function testKey(): Promise<{ ok: boolean; message: string }> {
  try {
    const r = await chat([{ role: 'user', content: 'Ответь одним словом: ок' }], { temperature: 0, maxTokens: 10 });
    return { ok: true, message: '✓ Ключ работает · ' + r.model + ' · ' + Math.round(r.ms / 100) / 10 + ' c' };
  } catch (e) {
    return { ok: false, message: '⚠ ' + (e as Error).message };
  }
}

// --- ИИ-судья свободного ответа (input-узлы; docs/09: скоринг на бэкенде) ---

export interface Verdict {
  scores: Record<string, number>; feedback: string; kind: 'strength' | 'growth'; source: 'ai' | 'fallback';
  model?: string; ms?: number; note?: string; // note — почему сработал фолбэк
}

const SKILL_IDS = ['listening', 'empathy', 'boundaries', 'structuring', 'emotion_work', 'resistance', 'questioning', 'reflection'];
const clamp3 = (n: number) => Math.max(-3, Math.min(3, Math.round(Number(n)) || 0));

function extractJson(raw: string): Record<string, unknown> {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new AiError('empty', 'в ответе нет JSON');
  return JSON.parse(m[0]);
}

export async function judgeInput(p: { hints: string[]; text: string; nodeScores?: Record<string, number>; emotionLabel?: string }): Promise<Verdict> {
  const c = aiConfig();
  if (!c.judge || !hasKey(c)) return { ...fallbackVerdict(p), note: hasKey(c) ? undefined : 'ИИ выключен или ключ не задан' };
  let model = '';
  let ms = 0;
  try {
    const r = await chat([
      {
        role: 'system',
        content: 'Ты супервизор-психолог на обучающей платформе. Оцениваешь свободный ответ стажёра клиенту. Верни ТОЛЬКО валидный JSON без пояснений: {"scores": {"<skillId>": целое от -3 до 3}, "kind": "strength"|"growth", "feedback": "одно предложение до 90 символов, по-русски, конкретно про ответ стажёра"}. Допустимые skillId: ' + SKILL_IDS.join(', ') + '. Оценивай близость ответа к подсказкам и базовые навыки активного слушания. Другие ключи и skillId запрещены. Пустой scores допустим.',
      },
      {
        role: 'user',
        content: 'Эмоция клиента: ' + (p.emotionLabel ?? 'нейтральная') + '. Подсказки стажёру: ' + JSON.stringify(p.hints) + '. Ответ стажёра: «' + p.text + '»',
      },
    ], { temperature: 0.2, maxTokens: 250 });
    model = r.model;
    ms = r.ms;
    const j = extractJson(r.text);
    const rawScores = (j.scores ?? {}) as Record<string, unknown>;
    const scores: Record<string, number> = {};
    for (const [k, v] of Object.entries(rawScores)) if (SKILL_IDS.includes(k)) scores[k] = clamp3(v as number);
    if (!Object.keys(scores).length) throw new AiError('empty', 'модель не дала оценок');
    const kind: 'strength' | 'growth' = j.kind === 'strength' ? 'strength' : 'growth';
    const feedback = String(j.feedback ?? '').slice(0, 140) || 'Ответ принят.';
    return { scores, feedback, kind, source: 'ai', model, ms };
  } catch (e) {
    return { ...fallbackVerdict(p), model: model || undefined, ms: ms || undefined, note: (e as Error).message };
  }
}

/** Детерминированный фолбэк: сопоставление свободного ответа с подсказками по словоформам. */
function fallbackVerdict(p: { hints: string[]; text: string; nodeScores?: Record<string, number>; emotionLabel?: string }): Verdict {
  const words = (s: string) => s.toLowerCase().split(/[^а-яёa-z0-9]+/).filter((w) => w.length >= 4);
  const tw = words(p.text);
  const hitWord = (w: string) => tw.some((t) => t.slice(0, 3) === w.slice(0, 3)); // «самый»~«самое»
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
  // далёкий от подсказок ответ — ноль баллов (раньше sign() давал те же +1, что и сильный)
  return {
    scores: {},
    feedback: bestHint ? 'Ответ далёк от подсказки «' + bestHint + '» — сначала отразите чувство клиента.' : 'Свободный ответ принят: добавьте отражение чувства клиента.',
    kind: 'growth',
    source: 'fallback',
  };
}

// --- Судья СВОБОДНОГО ответа на choice-узле: выбирает ближайшую ветку графа ---

export interface ChoiceVerdict {
  optionId: string; scores: Record<string, number>; feedback: string;
  kind: 'strength' | 'growth'; source: 'ai' | 'fallback'; model?: string; ms?: number; note?: string;
}

const words = (s: string) => s.toLowerCase().split(/[^а-яёa-z0-9]+/).filter((w) => w.length >= 4);
const similar = (a: string, b: string): number => {
  const wa = words(a); const wb = words(b);
  if (!wa.length || !wb.length) return 0;
  let hit = 0;
  for (const x of wa) if (wb.some((y) => y.slice(0, 3) === x.slice(0, 3))) hit++;
  return hit / Math.max(wa.length, wb.length);
};

export function fallbackChoice(p: { line: string; options: { id: string; text: string; scores?: Record<string, number>; feedback?: { strength?: string; growth?: string } }[]; text: string }): ChoiceVerdict {
  let best = p.options[0]; let bestSim = -1;
  for (const o of p.options) { const sim = similar(p.text, o.text); if (sim > bestSim) { bestSim = sim; best = o; } }
  return {
    optionId: best.id, scores: best.scores ?? {},
    feedback: 'Свободный ответ ближе всего к варианту «' + best.text.slice(0, 50) + '»' + (bestSim < 0.2 ? ' — но смысл сильно расходится.' : '.'),
    kind: best.feedback?.strength ? 'strength' : 'growth', source: 'fallback',
  };
}

export async function judgeChoice(p: { line: string; options: { id: string; text: string }[]; text: string; emotionLabel?: string }): Promise<ChoiceVerdict> {
  const c = aiConfig();
  if (!c.judge || !hasKey(c)) return fallbackChoice(p);
  try {
    const r = await chat([
      {
        role: 'system',
        content: 'Ты супервизор-психолог. Стажёр ответил клиенту СВОИМИ СЛОВАМИ (не выбрал готовый вариант). Выбери вариант графа, ближайший по смыслу и технике, и оцени свободный ответ. Верни ТОЛЬКО валидный JSON: {"option": "<id одного из вариантов>", "scores": {"<skillId>": -3…3}, "kind": "strength"|"growth", "feedback": "одно предложение до 90 символов, по-русски, про ответ стажёра"}. Допустимые skillId: listening, empathy, boundaries, structuring, emotion_work, resistance, questioning, reflection. option — только из списка вариантов.',
      },
      {
        role: 'user',
        content: 'Клиент сказал: «' + p.line + '» (эмоция: ' + (p.emotionLabel ?? '—') + '). Варианты: ' + JSON.stringify(p.options) + '. Свободный ответ стажёра: «' + p.text + '»',
      },
    ], { temperature: 0.2, maxTokens: 250 });
    const j = extractJson(r.text);
    const optId = String(j.option ?? '');
    if (!p.options.some((o) => o.id === optId)) throw new AiError('empty', 'модель выбрала несуществующий вариант');
    const rawScores = (j.scores ?? {}) as Record<string, unknown>;
    const scores: Record<string, number> = {};
    for (const [k, v] of Object.entries(rawScores)) if (SKILL_IDS.includes(k)) scores[k] = clamp3(v as number);
    return {
      optionId: optId, scores,
      feedback: String(j.feedback ?? '').slice(0, 140) || 'Ответ принят.',
      kind: j.kind === 'strength' ? 'strength' : 'growth', source: 'ai', model: r.model, ms: r.ms,
    };
  } catch (e) {
    return { ...fallbackChoice(p), note: (e as Error).message };
  }
}

// --- Генератор случайных сценариев (docs/12, фаза 2) ---

export async function generateScenario(p: { topic: string; focus: string[]; difficulty: number }): Promise<{ scenario: Scenario; source: 'ai' | 'template'; note?: string }> {
  const { validateScenarioJson, templateScenario } = await import('./scenario-gen');
  const c = aiConfig();
  if (hasKey(c)) {
    try {
      const r = await chat([
        {
          role: 'system',
          content: 'Ты методист обучающей платформы для психологов. Составь НОВЫЙ учебный сценарий симулятора. Верни ТОЛЬКО валидный JSON строго по структуре: {"schemaVersion":"1.0","id":"любой-lowercase","meta":{"title":"3-48 симв","description":"до 120","clientRole":"2-20","difficulty":1-5,"durationMin":5-60,"focusSkills":["из: listening, empathy, boundaries, structuring, emotion_work, resistance, questioning, reflection, максимум 3"],"language":"ru"},"graph":{"start":"<id первого узла>","nodes":{...}}}. Узлы (id: [a-z0-9_]): card{title≤48,body≤200,next}; text{clientLine≤90 (реплика клиента от первого лица), emotionAfter{value 0-10,label≤32}, next}; choice{clientLine,emotionAfter,options[2-5]: {id,text≤64 (реплика психолога),scores{skillId:-3…3},feedback{strength|growth≤90},emotionAfter, next}}; timer{prompt,seconds 5-30,emotionAfter,next}; input{prompt,hints[2-3],maxLen:500,scores,feedback,emotionAfter,next}; scale{prompt,selfRate 0-10,emotionAfter,next}; critical{clientLine,risk:"high",recommendations[3],options как choice}; branch{branches:[{when:{emotionAtLeast:0-10},then}],else}; end{outcome:{summary,debrief,completed:bool}}. Правила: 12-16 узлов; ≥2 choice по 3 варианта; у каждого варианта положительная сумма scores хотя бы у одного варианта choice; ВСЕ next/then/else — существующие id; один branch с emotionAtLeast ведёт в critical (риск: паника/диссоциация/слёзы) и в спокойную ветку; ровно 2 end (completed true и false); option с положительной суммой ведёт к снижению emotionAfter; предупреждение клиенту в card.',
        },
        {
          role: 'user',
          content: 'Тема/запрос клиента: ' + p.topic + '. Фокус-навыки: ' + (p.focus.join(', ') || 'на твой выбор') + '. Сложность: ' + p.difficulty + ' из 5.',
        },
      ], { temperature: 0.6, maxTokens: 3000 });
      const j = extractJson(r.text);
      const check = validateScenarioJson(j);
      if (!check.ok || !check.scenario) {
        return { scenario: templateScenario(p), source: 'template', note: '⚠ ИИ вернул невалидный граф (' + check.errors.join('; ') + ') — открыт шаблонный. Повторите генерацию.' };
      }
      const sc = check.scenario;
      sc.id = 'gen-' + Date.now().toString(36);
      if (p.focus.length) sc.meta.focusSkills = p.focus.slice(0, 3);
      return { scenario: sc, source: 'ai', note: '✓ Сгенерирован ИИ · ' + r.model + ' · ' + Math.round(r.ms / 100) / 10 + ' c' };
    } catch (e) {
      return { scenario: templateScenario(p), source: 'template', note: '⚠ ' + (e as Error).message + ' — открыт шаблонный сценарий' };
    }
  }
  return { scenario: templateScenario(p), source: 'template', note: 'Шаблонный сценарий по теме (без ключа). Вставьте ключ OpenRouter — и темы будут генерироваться ИИ.' };
}

// --- ИИ-вариант реплики клиента (text-узлы): смысл и эмоция неизменны ---

export async function rephraseClientLine(p: { line: string; role: string; brief: string; emotion: string }): Promise<{ line: string; model: string; ms: number }> {
  const c = aiConfig();
  if (!c.client || !hasKey(c)) throw new AiError('nokey', 'ИИ-клиент выключен или ключ не задан');
  const r = await chat([
    {
      role: 'system',
      content: 'Ты играешь клиента на обучении психологов. Переформулируй реплику СВОИМИ СЛОВАМИ, сохранив смысл, интенсивность эмоции и длину (1–2 фразы). Не добавляй новых фактов, не выходи из роли. Верни только реплику, без кавычек и пояснений.',
    },
    {
      role: 'user',
      content: 'Клиент: ' + p.role + '. ' + p.brief + ' Эмоция сейчас: ' + p.emotion + '. Реплика: «' + p.line + '»',
    },
  ], { temperature: 0.9, maxTokens: 160 });
  const out = r.text.trim().replace(/^["«»]+|["«»]+$/g, '');
  if (out.length < 6 || out.length > 220) throw new AiError('empty', 'модель вернула неподходящую реплику');
  return { line: out, model: r.model, ms: r.ms };
}
