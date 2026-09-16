// Мок-API (docs/08, «API-стаб»): те же сигнатуры, что пойдут на бэкенд.
// Персист в localStorage — демо живёт без сервера. Замена на fetch(/api/…) —
// точечно в этом файле, компоненты не меняем.
import type { SessionResult } from './engine';

const KEY = 'platform.mock.v1';

export interface ClientRow { id: string; name: string; age: number; request: string; status: 'активен' | 'пауза' | 'завершён'; lastEmotion: number; sessions: number; next?: string }
export interface Verification { id: string; name: string; email: string; edu: string; docs: number; submitted: string; checklist: boolean[] }
export interface AuditRow { id: string; time: string; actor: string; action: string; target: string }
export interface DiaryEntry { id: string; date: string; emotion: number; note: string }
export interface CommentRow { id: string; sessionId: string; author: string; text: string; date: string }

interface DB {
  sessions: SessionResult[];
  clients: ClientRow[];
  verifications: Verification[];
  audit: AuditRow[];
  diary: DiaryEntry[];
  comments: CommentRow[];
  games: Record<string, { done: number; last?: string }>;
}

function seed(): DB {
  return {
    sessions: [
      {
        id: 's-seed1', scenarioId: 'exam-anxiety', scenarioTitle: 'Тревога перед экзаменом',
        date: new Date(Date.now() - 3 * 864e5).toISOString(), completed: true,
        emotionFrom: 8, emotionTo: 5, emotionLabel: 'тревога умеренная',
        skills: { listening: 4, empathy: 1, boundaries: 0, structuring: 1, emotion_work: 3, resistance: 0, questioning: 2, reflection: 1 },
        strengths: ['Телесный фокус — путь к заземлению.'], growth: ['Нормализация уместна позже.'],
        summary: 'Отработан телесный фокус; тревога 8→5.', debrief: 'Держите паузы.', steps: [], durationMin: 18,
      },
      {
        id: 's-seed2', scenarioId: 'first-session', scenarioTitle: 'Первичная консультация',
        date: new Date(Date.now() - 8 * 864e5).toISOString(), completed: true,
        emotionFrom: 6, emotionTo: 4, emotionLabel: 'спокойнее',
        skills: { listening: 3, empathy: 2, boundaries: 1, structuring: 3, emotion_work: 1, resistance: 0, questioning: 3, reflection: 0 },
        strengths: ['Структура встречи выдержана.'], growth: ['Меньше закрывать вопросы.'],
        summary: 'Сбор запроса, контракт на работу.', debrief: 'Хорошая база.', steps: [], durationMin: 22,
      },
    ],
    clients: [
      { id: 'c1', name: 'Анна К.', age: 24, request: 'тревога, панические мысли', status: 'активен', lastEmotion: 4, sessions: 6, next: 'завтра, 18:00' },
      { id: 'c2', name: 'Мария С.', age: 31, request: 'выгорание на работе', status: 'активен', lastEmotion: 6, sessions: 4, next: 'чт, 12:30' },
      { id: 'c3', name: 'Дмитрий Л.', age: 27, request: 'прокрастинация, самооценка', status: 'пауза', lastEmotion: 5, sessions: 9 },
      { id: 'c4', name: 'Ольга В.', age: 35, request: 'границы в семье', status: 'активен', lastEmotion: 3, sessions: 2, next: 'пт, 10:00' },
    ],
    verifications: [
      { id: 'v1', name: 'Ольга В.', email: 'olga@psy.ru', edu: 'МГУ, клиническая психология (2019) · КПТ 480 ч', docs: 3, submitted: 'сегодня, 09:12', checklist: [true, true, true, true] },
      { id: 'v2', name: 'Павел Р.', email: 'pavel.r@mail.ru', edu: 'СПбГУ, психология (2021)', docs: 2, submitted: 'вчера, 19:40', checklist: [true, false, true, false] },
    ],
    audit: [
      { id: 'a1', time: 'сегодня 09:02', actor: 'Ирина Д.', action: 'вход в систему', target: '—' },
      { id: 'a2', time: 'вчера 21:15', actor: 'система', action: 'верификация: заявка принята', target: 'Павел Р.' },
      { id: 'a3', time: 'вчера 18:44', actor: 'супервизор М.Т.', action: 'комментарий к разбору', target: 'сессия s-seed1' },
    ],
    diary: [
      { id: 'd1', date: 'сегодня, 08:30', emotion: 4, note: 'Утро тревожное, но помогло дыхание.' },
      { id: 'd2', date: 'вчера, 22:10', emotion: 6, note: 'Долго не могла уснуть перед звонком.' },
    ],
    comments: [
      { id: 'm1', sessionId: 's-seed1', author: 'супервизор М.Т.', text: 'Хорошее заземление в остром эпизоде. Обсудим темп на встрече.', date: 'вчера' },
    ],
    games: { breathing: { done: 4, last: 'вчера' }, ground541: { done: 1, last: '3 дня назад' }, diary: { done: 12, last: 'сегодня' }, sleep: { done: 0 } },
  };
}

function read(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DB;
  } catch { /* перезапишем */ }
  const db = seed();
  write(db);
  return db;
}

function write(db: DB): void {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* приватный режим */ }
}

export const api = {
  // — сессии/разборы —
  getSessions(): SessionResult[] { return read().sessions; },
  getSession(id: string): SessionResult | undefined { return read().sessions.find((s) => s.id === id); },
  saveSession(r: SessionResult): void { const db = read(); db.sessions.unshift(r); write(db); },

  // — психолог: клиенты —
  getClients(): ClientRow[] { return read().clients; },

  // — средние баллы «за 5 сессий» (стаб аналитики) —
  getAverages(): Record<string, number> {
    const sessions = read().sessions.slice(0, 5);
    const acc: Record<string, number> = {};
    for (const s of sessions) for (const [k, v] of Object.entries(s.skills)) acc[k] = (acc[k] ?? 0) + v;
    return Object.fromEntries(Object.entries(acc).map(([k, v]) => [k, Math.round((v / Math.max(1, sessions.length)) * 10) / 10]));
  },

  // — верификация/аудит —
  getVerifications(): Verification[] { return read().verifications; },
  resolveVerification(id: string, approve: boolean, actor = 'Ирина Д.'): void {
    const db = read();
    const v = db.verifications.find((x) => x.id === id);
    if (!v) return;
    db.verifications = db.verifications.filter((x) => x.id !== id);
    db.audit.unshift({
      id: 'a-' + Date.now().toString(36), time: 'только что', actor,
      action: approve ? 'верификация: одобрена' : 'верификация: отклонена', target: v.name,
    });
    write(db);
  },
  getAudit(): AuditRow[] { return read().audit; },

  // — клиент: игры/дневник —
  doneGame(id: string): void {
    const db = read();
    const g = db.games[id] ?? { done: 0 };
    g.done += 1; g.last = 'только что';
    db.games[id] = g; write(db);
  },
  getGames(): DB['games'] { return read().games; },
  addDiary(emotion: number, note: string): void {
    const db = read();
    db.diary.unshift({ id: 'd-' + Date.now().toString(36), date: 'только что', emotion, note });
    write(db);
  },
  getDiary(): DiaryEntry[] { return read().diary; },

  // — супервизия —
  addComment(sessionId: string, text: string, author = 'супервизор М.Т.'): void {
    const db = read();
    db.comments.unshift({ id: 'm-' + Date.now().toString(36), sessionId, author, text, date: 'только что' });
    write(db);
  },
  getComments(sessionId?: string): CommentRow[] {
    const all = read().comments;
    return sessionId ? all.filter((c) => c.sessionId === sessionId) : all;
  },
};

export const WEEK_ACTIVITY = [
  { w: 'Пн', min: 25 }, { w: 'Вт', min: 40 }, { w: 'Ср', min: 15 },
  { w: 'Чт', min: 50 }, { w: 'Пт', min: 35 }, { w: 'Сб', min: 20 }, { w: 'Вс', min: 45 },
];

export const PROGRESS_WEEKS = [
  { w: '-5', балл: 42 }, { w: '-4', балл: 48 }, { w: '-3', балл: 45 },
  { w: '-2', балл: 56 }, { w: '-1', балл: 61 }, { w: 'текущая', балл: 67 },
];
