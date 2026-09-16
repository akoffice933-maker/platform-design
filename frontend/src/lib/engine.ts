// Рантайм сценария — реализация контракта docs/09 (schemas/scenario.schema.json).
// Гайд бэкенду из docs/09 соблюдён: choice/critical ждут optionId; branch
// вычисляется из текущего состояния; прогресс хранит nodeId → возобновление
// = восстановить RunState и продолжить.
import scenarioData from '../data/exam-anxiety.json';

export interface Emotion { value: number; label: string }
export interface Feedback { strength?: string; growth?: string }
export interface Option {
  id: string; text: string;
  scores?: Record<string, number>;
  feedback?: Feedback;
  emotionAfter: Emotion;
  next: string;
}
interface BranchCond { emotionAtLeast?: number; optionSelected?: string; skillTotalAtLeast?: number }

export type SNode =
  | { type: 'card'; title: string; body: string; next: string }
  | { type: 'text'; clientLine: string; emotionAfter: Emotion; next: string }
  | { type: 'choice'; clientLine: string; emotionAfter: Emotion; options: Option[] }
  | { type: 'timer'; prompt: string; seconds: number; emotionAfter: Emotion; next: string }
  | { type: 'input'; prompt: string; hints: string[]; maxLen: number; scores?: Record<string, number>; feedback?: Feedback; emotionAfter: Emotion; next: string }
  | { type: 'scale'; prompt: string; selfRate: number; emotionAfter: Emotion; next: string }
  | { type: 'critical'; clientLine: string; risk: 'high' | 'medium' | 'low'; recommendations: string[]; options: Option[] }
  | { type: 'branch'; branches: { when: BranchCond; then: string }[]; else: string }
  | { type: 'end'; outcome: { summary: string; debrief: string; completed: boolean } };

export interface Scenario {
  schemaVersion: string;
  id: string;
  meta: { title: string; description?: string; clientRole: string; difficulty: number; durationMin: number; focusSkills: string[]; language?: string };
  graph: { start: string; nodes: Record<string, SNode> };
}

export const SCENARIO = scenarioData as unknown as Scenario;

export interface Step {
  nodeId: string;
  kind: SNode['type'];
  clientLine?: string;
  answer?: string;
  feedbackKind?: 'strength' | 'growth';
  feedback?: string;
  emotionAfter?: Emotion;
}

export interface RunState {
  scenarioId: string;
  nodeId: string;
  emotion: Emotion;
  skills: Record<string, number>;
  chosen: string[]; // "nodeId.optionId" — для branch.when.optionSelected
  steps: Step[];
  visited: string[];
  startedAt: number;
}

const zeroSkills = (): Record<string, number> =>
  Object.fromEntries(['listening', 'empathy', 'boundaries', 'structuring', 'emotion_work', 'resistance', 'questioning', 'reflection'].map((k) => [k, 0]));

export function startRun(sc: Scenario = SCENARIO): RunState {
  const first = sc.graph.nodes[sc.graph.start];
  return {
    scenarioId: sc.id,
    nodeId: sc.graph.start,
    emotion: { value: 6, label: 'ожидание сессии' },
    skills: zeroSkills(),
    chosen: [],
    steps: [],
    visited: [sc.graph.start],
    startedAt: Date.now(),
  };
}

export function nodeOf(run: RunState, sc: Scenario = SCENARIO): SNode {
  return sc.graph.nodes[run.nodeId];
}

/** Первое истинное условие (docs/09); иначе — else. */
export function evalBranch(node: Extract<SNode, { type: 'branch' }>, run: RunState): string {
  const total = Object.values(run.skills).reduce((a, b) => a + b, 0);
  for (const b of node.branches) {
    const w = b.when;
    if (w.emotionAtLeast !== undefined && run.emotion.value >= w.emotionAtLeast) return b.then;
    if (w.optionSelected !== undefined && run.chosen.includes(w.optionSelected)) return b.then;
    if (w.skillTotalAtLeast !== undefined && total >= w.skillTotalAtLeast) return b.then;
  }
  return node.else;
}

function clone(run: RunState): RunState {
  return {
    ...run,
    emotion: { ...run.emotion },
    skills: { ...run.skills },
    chosen: [...run.chosen],
    steps: [...run.steps],
    visited: [...run.visited],
  };
}

function addScores(run: RunState, scores?: Record<string, number>): void {
  if (!scores) return;
  for (const [k, v] of Object.entries(scores)) run.skills[k] = (run.skills[k] ?? 0) + v;
}

function pushStep(run: RunState, step: Step): void {
  run.steps.push(step);
  if (!run.visited.includes(step.nodeId)) run.visited.push(step.nodeId);
}

function goTo(run: RunState, next: string): void {
  run.nodeId = next;
  // ветвления резолвим сразу, пока не дойдём до «настоящего» узла
  let guard = 0;
  while (nodeOf(run).type === 'branch' && guard++ < 20) {
    const b = nodeOf(run) as Extract<SNode, { type: 'branch' }>;
    run.nodeId = evalBranch(b, run);
    if (!run.visited.includes(run.nodeId)) run.visited.push(run.nodeId);
  }
}

/** Выбор варианта (choice/critical). extra — переопределение для свободных
 *  ответов, оценённых ИИ-судьёй (docs/12): баллы/фидбек/текст ответа. */
export function applyOption(run: RunState, optionId: string, sc: Scenario = SCENARIO, extra?: { scores?: Record<string, number>; feedback?: string; feedbackKind?: 'strength' | 'growth'; answer?: string }): RunState {
  const node = nodeOf(run, sc);
  if (node.type !== 'choice' && node.type !== 'critical') throw new Error('узел не ждёт optionId: ' + run.nodeId);
  const opt = node.options.find((o) => o.id === optionId);
  if (!opt) throw new Error('нет варианта ' + optionId);
  const next = clone(run);
  addScores(next, extra?.scores ?? opt.scores);
  next.emotion = { ...opt.emotionAfter };
  next.chosen.push(run.nodeId + '.' + opt.id);
  pushStep(next, {
    nodeId: run.nodeId, kind: node.type, clientLine: node.clientLine, answer: extra?.answer ?? opt.text,
    feedbackKind: extra?.feedbackKind ?? (opt.feedback?.strength ? 'strength' : opt.feedback?.growth ? 'growth' : undefined),
    feedback: extra?.feedback ?? (opt.feedback?.strength ?? opt.feedback?.growth),
    emotionAfter: opt.emotionAfter,
  });
  goTo(next, opt.next);
  return next;
}

/** Продолжение по автоматическим узлам (card/text/timer/scale/input).
 *  extra.scores/feedback/feedbackKind — переопределение ИИ-судьёй (docs/12). */
export function advance(run: RunState, extra?: { text?: string; selfRate?: number; scores?: Record<string, number>; feedback?: string; feedbackKind?: 'strength' | 'growth' }, sc: Scenario = SCENARIO): RunState {
  const node = nodeOf(run, sc);
  const next = clone(run);
  switch (node.type) {
    case 'card':
      pushStep(next, { nodeId: run.nodeId, kind: 'card' });
      break;
    case 'text':
      next.emotion = { ...node.emotionAfter };
      pushStep(next, { nodeId: run.nodeId, kind: 'text', clientLine: node.clientLine, emotionAfter: node.emotionAfter });
      break;
    case 'timer':
      next.emotion = { ...node.emotionAfter };
      pushStep(next, { nodeId: run.nodeId, kind: 'timer', clientLine: node.prompt, emotionAfter: node.emotionAfter });
      break;
    case 'scale':
      // клиент сам назвал число — эмоция = его оценка (а не фиксированная из узла)
      next.emotion = { value: extra?.selfRate ?? node.selfRate, label: 'самооценка клиента' };
      pushStep(next, { nodeId: run.nodeId, kind: 'scale', answer: 'Самооценка: ' + (extra?.selfRate ?? node.selfRate) + '/10', emotionAfter: node.emotionAfter });
      break;
    case 'input':
      addScores(next, extra?.scores ?? node.scores);
      next.emotion = { ...node.emotionAfter };
      pushStep(next, {
        nodeId: run.nodeId, kind: 'input', answer: extra?.text || '(пропущено)',
        feedbackKind: extra?.feedbackKind ?? (node.feedback?.strength ? 'strength' : 'growth'),
        feedback: extra?.feedback ?? (node.feedback?.strength ?? node.feedback?.growth),
        emotionAfter: node.emotionAfter,
      });
      break;
    default:
      throw new Error('advance не для узла ' + node.type);
  }
  goTo(next, (node as { next: string }).next);
  return next;
}

export interface SessionResult {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  date: string;
  completed: boolean;
  emotionFrom: number;
  emotionTo: number;
  emotionLabel: string;
  skills: Record<string, number>;
  strengths: string[];
  growth: string[];
  summary: string;
  debrief: string;
  steps: Step[];
  durationMin: number;
}

export function buildResult(run: RunState, sc: Scenario = SCENARIO): SessionResult {
  const end = nodeOf(run, sc) as Extract<SNode, { type: 'end' }>;
  const strengths = run.steps.map((s) => (s.feedbackKind === 'strength' ? s.feedback : null)).filter(Boolean) as string[];
  const growth = run.steps.map((s) => (s.feedbackKind === 'growth' ? s.feedback : null)).filter(Boolean) as string[];
  const firstEmotion = run.steps.find((s) => s.emotionAfter)?.emotionAfter?.value ?? run.emotion.value;
  return {
    id: 's-' + Date.now().toString(36),
    scenarioId: sc.id,
    scenarioTitle: sc.meta.title,
    date: new Date().toISOString(),
    completed: end.outcome.completed,
    emotionFrom: firstEmotion,
    emotionTo: run.emotion.value,
    emotionLabel: run.emotion.label,
    skills: { ...run.skills },
    strengths,
    growth,
    summary: end.outcome.summary,
    debrief: end.outcome.debrief,
    steps: run.steps,
    durationMin: Math.max(1, Math.round((Date.now() - run.startedAt) / 60000)),
  };
}

export function isEnd(run: RunState, sc: Scenario = SCENARIO): boolean {
  return nodeOf(run, sc).type === 'end';
}

/** Оценка остатка до финала по ДЛИННЕЙШЕЙ ветке — для честного прогресс-бара.
 *  max (а не min) гарантирует: прогресс не убывает ни на одном пути и достигает
 *  100% ровно на узле end (min давал «откат» процентов на спокойной ветке). */
export function remainingSteps(nodeId: string, sc: Scenario = SCENARIO): number {
  const memo = new Map<string, number>();
  const visiting = new Set<string>();
  const d = (id: string): number => {
    if (memo.has(id)) return memo.get(id) as number;
    if (visiting.has(id)) return 0; // защита от циклов
    visiting.add(id);
    const n = sc.graph.nodes[id];
    let v = 0;
    if (n) {
      if (n.type === 'end') v = 0;
      else if (n.type === 'branch') v = 1 + Math.max(d(n.else), ...n.branches.map((b) => d(b.then)));
      else if (n.type === 'choice' || n.type === 'critical') v = 1 + Math.max(...n.options.map((o) => d(o.next)));
      else v = 1 + d(n.next);
    }
    visiting.delete(id);
    memo.set(id, v);
    return v;
  };
  return d(nodeId);
}
