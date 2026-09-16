import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SCENARIO, advance, applyOption, buildResult, isEnd, nodeOf, remainingSteps, startRun } from '../lib/engine';
import type { RunState, SNode, Option, Emotion } from '../lib/engine';
import { api, getScenarioById } from '../lib/api';
import { skillLabel } from '../lib/skills';
import { Btn, Card, Chip, DiffDots, EmotionBar, Input, Textarea } from '../components/ui';
import { aiConfig, setAiConfig, hasKey, judgeInput, judgeChoice, fallbackChoice, rephraseClientLine, FREE_MODELS, setRuntimeConfig, testKey } from '../lib/ai';
import type { AiConfig } from '../lib/ai';

function Bubble({ children, me }: { children: React.ReactNode; me?: boolean }) {
  return (
    <div className={`max-w-[92%] rounded-lg px-4 py-3 text-body ${me
      ? 'ml-auto bg-accent text-white rounded-br-sm m-slide-right'
      : 'bg-bg-primary border border-line rounded-bl-sm m-fade-in'}`}>
      {children}
    </div>
  );
}

export default function Session() {
  const { sid } = useParams();
  const nav = useNavigate();
  const sc = getScenarioById(sid) ?? SCENARIO; // не найден — открываем эталон
  const [run, setRun] = useState<RunState>(() => startRun(sc));
  const [phase, setPhase] = useState<'answer' | 'feedback'>('answer');
  const [left, setLeft] = useState(0);
  const [rate, setRate] = useState(4);
  const [free, setFree] = useState('');
  const [freeChoice, setFreeChoice] = useState('');
  const [aiCfg, setAiState] = useState<AiConfig>(() => aiConfig());
  const [judging, setJudging] = useState(false);
  const [aiLine, setAiLine] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [lastSource, setLastSource] = useState<{ source: 'ai' | 'fallback'; model?: string; ms?: number } | null>(null);
  const brief = sc.graph.nodes[sc.graph.start].type === 'card' ? (sc.graph.nodes[sc.graph.start] as { body: string }).body : '';
  const setAi = (patch: Partial<AiConfig>) => { const c = { ...aiCfg, ...patch }; setAiState(c); setAiConfig(c); setRuntimeConfig(c); };
  const savedRef = useRef(false);
  const node: SNode = nodeOf(run, sc);
  const last = run.steps[run.steps.length - 1];

  const resetLocal = () => { setLeft(0); setRate(4); setFree(''); setFreeChoice(''); setAiLine(null); };
  useEffect(resetLocal, [run.nodeId]);

  // конец сценария → сохранить разбор и перейти на E-25
  useEffect(() => {
    if (node.type === 'end' && !savedRef.current) {
      savedRef.current = true;
      const r = buildResult(run, sc);
      api.saveSession(r);
      nav(`/app/debrief/${r.id}`, { replace: true });
    }
  }, [node]);

  // таймер паузы
  useEffect(() => {
    if (node.type !== 'timer') return;
    setLeft(node.seconds);
    const t = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [node]);

  // отправка свободного ответа: с ИИ-судьёй (валидация + фолбэк внутри) или детерминированно
  const submitInput = async (): Promise<void> => {
    if (judging) return;
    const nd = node as Extract<SNode, { type: 'input' }>;
    const text = free.trim() || '(пропущено)';
    if (aiCfg.judge && hasKey(aiCfg)) {
      setJudging(true);
      const v = await judgeInput({ hints: nd.hints, text, nodeScores: nd.scores, emotionLabel: run.emotion.label });
      setLastSource({ source: v.source, model: v.model, ms: v.ms });
      if (v.note) setAiNote('⚠ ' + v.note);
      else if (v.source === 'ai') setAiNote('✓ Оценка ИИ · ' + (v.model ?? '') + ' · ' + Math.round((v.ms ?? 0) / 100) / 10 + ' c');
      setRun(advance(run, { text, scores: v.scores, feedback: v.feedback, feedbackKind: v.kind }, sc));
      setJudging(false);
      return;
    }
    setRun(advance(run, { text }, sc));
  };

  // свободный ответ на выбор: ИИ-судья выбирает ближайшую ветку графа и оценивает
  const submitFreeChoice = async (): Promise<void> => {
    if (judging) return;
    const nd = node as Extract<SNode, { type: 'choice' }>;
    const text = freeChoice.trim();
    if (text.length < 2) return;
    setJudging(true);
    const opts = nd.options.map((o) => ({ id: o.id, text: o.text, scores: o.scores, feedback: o.feedback }));
    const v = aiCfg.judge && hasKey(aiCfg)
      ? await judgeChoice({ line: nd.clientLine, options: opts, text, emotionLabel: shownEmotion.label })
      : fallbackChoice({ line: nd.clientLine, options: opts, text });
    setLastSource({ source: v.source, model: v.model, ms: v.ms });
    if (v.note) setAiNote('⚠ ' + v.note);
    else if (v.source === 'ai') setAiNote('✓ Ответ оценён ИИ · ' + (v.model ?? '') + ' · ветка «' + (nd.options.find((o) => o.id === v.optionId)?.text.slice(0, 34) ?? v.optionId) + '…»');
    setRun(applyOption(run, v.optionId, sc, { scores: v.scores, feedback: v.feedback, feedbackKind: v.kind, answer: text }));
    setPhase('feedback');
    setJudging(false);
    setFreeChoice('');
  };

  // прогресс = пройденные шаги / (пройденные + минимальный остаток до финала) —
  // доходит до 100% ровно на узле end (старый «visited/16» застревал на ~56%)
  const progress = Math.min(100, Math.round((run.steps.length / (run.steps.length + remainingSteps(run.nodeId, sc))) * 100));
  const skillChips = Object.entries(run.skills).filter(([, v]) => v !== 0).sort((a, b) => b[1] - a[1]);
  // на реплике/выборе клиент УЖЕ в состоянии emotionAfter узла; у critical его нет
  // (эмоции живут в вариантах) — тогда показываем состояние прогона
  const talking = node.type === 'text' || node.type === 'choice' || node.type === 'critical';
  const nodeEmotion = talking ? (node as { emotionAfter?: Emotion }).emotionAfter : undefined;
  const shownEmotion: Emotion = phase === 'answer' && nodeEmotion ? nodeEmotion : run.emotion;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6 m-fade-in">
      {/* ---- Диалог ---- */}
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-h2">{sc.meta.title}</h1>
          <span className="grow" />
          <span className="text-caption text-ink-3">ШАГ {run.steps.length + 1} · {progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden mb-6">
          <div className="h-full bg-accent m-grow-x" style={{ width: `${progress}%`, transformOrigin: 'left' }} />
        </div>

        <div className="flex flex-col gap-4 max-w-2xl">
          {/* критический эпизод */}
          {node.type === 'critical' && phase === 'answer' && (
            <div className="rounded-lg border-l-4 border-err bg-err/5 p-4 m-slide-right">
              <div className="flex items-center gap-2 mb-1">
                <Chip tone="err">● КРИТИЧЕСКИЙ ЭПИЗОД · риск {node.risk === 'high' ? 'высокий' : node.risk}</Chip>
              </div>
              <b className="text-body-sm">Рекомендации системы:</b>
              <ol className="list-decimal ml-5 mt-1 text-body-sm text-ink-2 space-y-0.5">
                {node.recommendations.map((r) => <li key={r}>{r}</li>)}
              </ol>
            </div>
          )}

          {/* реплика клиента текущего/прошедшего узла */}
          {(node.type === 'text' || node.type === 'choice' || node.type === 'critical') && phase === 'answer' && (
            <Bubble>
              {aiLine && (node.type === 'text' || node.type === 'choice') ? aiLine : (node as { clientLine: string }).clientLine}
              <div className="mt-1.5 text-caption text-ink-3">Максим · <span className="text-ink-2">{shownEmotion.label}</span></div>
            </Bubble>
          )}

          {(node.type === 'text' || node.type === 'choice') && phase === 'answer' && hasKey(aiCfg) && aiCfg.client && !aiLine && (
            <button className="self-start text-caption text-accent underline disabled:opacity-50" disabled={aiBusy}
              onClick={async () => {
                setAiBusy(true);
                try {
                  const r = await rephraseClientLine({ line: (node as { clientLine: string }).clientLine, role: sc.meta.clientRole, brief, emotion: shownEmotion.value + '/10 · ' + shownEmotion.label });
                  setAiLine(r.line); setAiNote('✓ Реплика ИИ · ' + r.model + ' · ' + Math.round(r.ms / 100) / 10 + ' c');
                } catch (e) { setAiNote('⚠ ' + (e as Error).message); }
                setAiBusy(false);
              }}>
              {aiBusy ? 'ИИ-клиент печатает…' : '⟳ Вариант реплики от ИИ-клиента'}
            </button>
          )}

          {/* реплика-монолог: единственное действие — продолжить */}
          {node.type === 'text' && phase === 'answer' && (
            <Btn onClick={() => setRun(advance(run, undefined, sc))}>Продолжить →</Btn>
          )}

          {/* card */}
          {node.type === 'card' && (
            <Card className="m-slide-up">
              <Chip tone="accent" className="mb-2">БРИФ КЛИЕНТУ</Chip>
              <h3 className="text-h3">{node.title}</h3>
              <p className="text-body text-ink-2 mt-2">{node.body}</p>
              <Btn className="mt-4" onClick={() => setRun(advance(run, undefined, sc))}>Начать сессию →</Btn>
            </Card>
          )}

          {/* фаза обратной связи после выбора */}
          {phase === 'feedback' && last && (
            <>
              <Bubble me>{last.answer}</Bubble>
              {last.feedback && (
                <div className={`rounded-lg border-l-4 p-3.5 m-slide-up ${last.feedbackKind === 'strength' ? 'border-ok bg-ok/5' : 'border-warn bg-warn/5'}`}>
                  <b className="text-caption uppercase block mb-0.5"
                    style={{ color: last.feedbackKind === 'strength' ? 'var(--color-semantic-success)' : 'var(--color-semantic-warning)' }}>
                    {last.feedbackKind === 'strength' ? '✓ Сильная сторона' : '▲ Зона роста'}
                  </b>
                  <span className="text-body-sm text-ink">{last.feedback}</span>
                </div>
              )}
              {lastSource && (
                <div className="text-caption text-ink-3">
                  Оценка: {lastSource.source === 'ai' ? 'ИИ (' + (lastSource.model ?? '') + ')' : 'фолбэк без ИИ'}
                  {lastSource.ms ? ' · ' + Math.round(lastSource.ms / 100) / 10 + ' c' : ''}
                </div>
              )}
              <div className="text-caption text-ink-2">Эмоция клиента: <b>{run.emotion.value}/10 · {run.emotion.label}</b></div>
              <span className="grow" />
              <Btn onClick={() => setPhase('answer')} disabled={node.type === 'end'}>Продолжить →</Btn>
            </>
          )}

          {/* варианты выбора */}
          {(node.type === 'choice' || node.type === 'critical') && phase === 'answer' && (
            <div className="flex flex-col gap-2.5 mt-1">
              <span className="text-caption uppercase text-ink-3">Ваш ответ как психолога</span>
              {(node.options as Option[]).map((o) => (
                <button key={o.id} onClick={() => { setRun(applyOption(run, o.id, sc)); setPhase('feedback'); }}
                  className="text-left rounded-lg border border-line bg-bg-primary px-4 py-3 text-body-sm hover:border-accent hover:bg-accent/5 transition-colors duration-fast ease-platform-out m-press">
                  {o.text}
                </button>
              ))}

              {/* свободный ответ: ИИ-судья ведёт по ближайшей ветке и оценивает */}
              <div className="mt-1">
                <div className="flex items-center gap-2 my-2">
                  <span className="h-px bg-line grow" />
                  <span className="text-caption text-ink-3">или ответьте своими словами</span>
                  <span className="h-px bg-line grow" />
                </div>
                <Textarea rows={2} value={freeChoice} maxLength={500} onChange={(e) => setFreeChoice(e.target.value)}
                  placeholder="Напишите свой ответ клиенту — ИИ подберёт ближайшую ветку сценария и оценит по навыкам…" />
                <div className="flex items-center gap-3 mt-2">
                  <Btn size="sm" disabled={judging || freeChoice.trim().length < 2} onClick={submitFreeChoice}>
                    {judging ? 'ИИ-супервизор оценивает…' : 'Ответить своими словами'}
                  </Btn>
                  {judging && <div className="m-skeleton h-8 w-40 rounded-md bg-bg-tertiary" />}
                </div>
              </div>
            </div>
          )}

          {/* таймер */}
          {node.type === 'timer' && phase === 'answer' && (
            <Card className="text-center m-scale-in">
              <p className="text-body text-ink-2">{node.prompt}</p>
              <div className="text-display text-accent my-4 tabular-nums">{left} с</div>
              <Btn onClick={() => setRun(advance(run, undefined, sc))} disabled={left > 0}>Пауза выдержана →</Btn>
              {left > 0 && <button className="block mx-auto mt-2 text-caption text-ink-3 underline" onClick={() => setLeft(0)}>пропустить (демо)</button>}
            </Card>
          )}

          {/* шкала */}
          {node.type === 'scale' && phase === 'answer' && (
            <Card className="m-scale-in">
              <p className="text-body text-ink-2 mb-4">{node.prompt}</p>
              <input type="range" min={0} max={10} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-[#2563EB]" />
              <div className="flex justify-between text-caption text-ink-3"><span>0</span><b className={`text-h2 ${rate <= 3 ? 'text-emo-low' : rate <= 6 ? 'text-emo-mid' : 'text-emo-high'}`}>{rate}/10</b><span>10</span></div>
              <Btn className="mt-4" onClick={() => setRun(advance(run, { selfRate: rate }, sc))}>Отправить</Btn>
            </Card>
          )}

          {/* свободный ввод */}
          {node.type === 'input' && phase === 'answer' && (
            <Card className="m-scale-in">
              <p className="text-body text-ink-2 mb-3">{node.prompt}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {node.hints.map((h) => <Chip key={h} tone="info">{h}</Chip>)}
              </div>
              <Textarea value={free} maxLength={node.maxLen} onChange={(e) => setFree(e.target.value)} placeholder="Напишите свой ответ клиенту…" rows={3} />
              <div className="flex items-center gap-3 mt-3">
                <Btn onClick={submitInput} disabled={judging}>{judging ? 'ИИ-супервизор оценивает…' : 'Отправить'}</Btn>
                <span className="text-caption text-ink-3">{free.length}/{node.maxLen}</span>
              </div>
              {judging && <div className="m-skeleton h-12 rounded-lg bg-bg-tertiary mt-3" />}
            </Card>
          )}
        </div>
      </div>

      {/* ---- Правая панель ---- */}
      <aside className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-full bg-accent/10 text-accent font-semibold inline-flex items-center justify-center">М</span>
            <div>
              <b className="text-body-sm block">Максим, 19</b>
              <span className="text-caption text-ink-3">студент · ИИ-клиент</span>
            </div>
          </div>
          <EmotionBar value={shownEmotion.value} label={shownEmotion.label} compact />
        </Card>

        <Card>
          <div className="text-caption uppercase text-ink-3 mb-2">Баллы навыков (ход)</div>
          {skillChips.length === 0 && <p className="text-caption text-ink-3">Пока без оценок — выбирайте реплики.</p>}
          <div className="flex flex-wrap gap-1.5">
            {skillChips.map(([k, v]) => (
              <Chip key={k} tone={v > 0 ? 'ok' : 'err'}>{skillLabel(k)} {v > 0 ? `+${v}` : v}</Chip>
            ))}
          </div>
        </Card>

        <Card className="bg-bg-secondary">
          <div className="flex items-center gap-2 mb-2">
            <DiffDots level={sc.meta.difficulty} />
            <Chip>{sc.meta.durationMin} мин</Chip>
          </div>
          <p className="text-caption text-ink-2 leading-relaxed">{sc.meta.description}</p>
          <button className="mt-3 text-caption text-err underline" onClick={() => { savedRef.current = false; setPhase('answer'); setRun(startRun(sc)); resetLocal(); }}>
            ⟲ Сбросить прогон
          </button>
        </Card>

        {isEnd(run, sc) && <Chip tone="ok">сценарий завершён</Chip>}

        <Card>
          <div className="text-caption uppercase text-ink-3 mb-2">ИИ · OpenRouter (опция)</div>
          <Input type="password" placeholder="Ключ sk-or-v1-…" value={aiCfg.key} onChange={(e) => setAi({ key: e.target.value })} />
          <select value={aiCfg.model} onChange={(e) => setAi({ model: e.target.value })} className="pui-input mt-2">
            {FREE_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <label className="flex items-center gap-2 text-caption text-ink-2 mt-3">
            <input type="checkbox" checked={aiCfg.judge} onChange={(e) => setAi({ judge: e.target.checked })} className="accent-[#2563EB]" />
            ИИ-судья свободных ответов
          </label>
          <label className="flex items-center gap-2 text-caption text-ink-2 mt-1.5">
            <input type="checkbox" checked={aiCfg.client} onChange={(e) => setAi({ client: e.target.checked })} className="accent-[#2563EB]" />
            Варианты реплик ИИ-клиента
          </label>
          <Btn size="sm" variant="secondary" className="mt-3" disabled={checking || !hasKey(aiCfg)}
            onClick={async () => { setChecking(true); setAiNote((await testKey()).message); setChecking(false); }}>
            {checking ? 'Проверяю…' : 'Проверить ключ'}
          </Btn>
          {aiNote && <div className={'mt-2 rounded-md px-2.5 py-2 text-caption ' + (aiNote.startsWith('✓') ? 'bg-ok/10 text-ok' : 'bg-warn/10 text-warn')}>{aiNote}</div>}
          <p className="text-caption text-ink-3 mt-3 leading-relaxed">
            Демо: ключ живёт только в вашем браузере и уходит напрямую в openrouter.ai. Бесплатные
            модели (:free) — с лимитами OpenRouter. Без ключа сессия полностью работает на
            детерминированных оценках. Прод — серверный прокси:{' '}
            <a className="text-accent" href="https://github.com/akoffice933-maker/platform-design/blob/main/docs/12-ai-openrouter.md" target="_blank" rel="noreferrer">docs/12</a>.{' '}
            <a className="text-accent" href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">Получить ключ →</a>
          </p>
        </Card>
      </aside>
    </div>
  );
}
