// Доменные компоненты (Итерация 3 ТЗ, раздел 4.2):
// борд «03_Patterns / Domain» + компоненты «Name / Variant / State».
// Radar и QR — статичные SVG (реальная визуализация — на разработчике, ТЗ 4.2).

declare const penpot: any;

import { C } from './tokens-data';
import {
  pickFont, makeText, makeRect, makeEllipse, centerTextIn, icon,
  setStroke, setShadow, sectionTitle, caption, startBag, endBag,
  registerComponent, setOrigin, FONT_FALLBACKS,
} from './draw';

const BOARD_NAME = '03_Patterns / Domain';
const M = 48;
const CW = 1240;

// Локальный чип (упрощённый, для доменных карточек)
function chip(parent: any, x: number, y: number, label: string, bg: string, fg: string,
              font: any, opts: { dot?: string; icon?: string; border?: boolean; sm?: boolean } = {}): number {
  const h = opts.sm ? 24 : 26;
  const fs = opts.sm ? 11 : 12;
  let textX = x + 10;
  let w = Math.round(label.length * fs * 0.62) + 20;
  if (opts.dot) { w += 14; makeEllipse(parent, x + 9, y + h / 2 - 4, 8, 8, opts.dot); textX = x + 23; }
  if (opts.icon) { w += 18; icon(parent, opts.icon, x + 9, y + (h - 13) / 2, 13, fg); textX = x + 25; }
  const ch = makeRect(parent, x, y, w, h, bg, h / 2);
  if (opts.border !== false) setStroke(ch, C.BD, 1, 'inner');
  ch.name = 'chip ' + label;
  const t = makeText(parent, textX, y + (h - fs - 3) / 2 + 1, label, { size: fs, weight: 500, color: fg, font });
  void t;
  return w;
}

function dotsDifficulty(parent: any, x: number, y: number, level: number, font: any): number {
  for (let i = 0; i < 5; i++) {
    makeEllipse(parent, x + i * 14, y, 8, 8, i < level ? C.ACCENT : C.BG3).name = 'difficulty-dot';
  }
  makeText(parent, x + 78, y - 3, 'сложность ' + level + '/5', { size: 11, weight: 400, color: C.INK3, font });
  return 110;
}

function ghostButton(parent: any, x: number, y: number, w: number, label: string, font: any,
                     opts: { primary?: boolean; danger?: boolean; icon?: string } = {}): void {
  const h = 32;
  const bg = opts.primary ? C.ACCENT : null;
  const b = makeRect(parent, x, y, w, h, bg, h / 2);
  if (!opts.primary) setStroke(b, opts.danger ? '#FECACA' : C.BD, 1, 'inner');
  b.name = 'Button / ' + (opts.primary ? 'primary' : 'secondary') + ' / sm / ' + (opts.danger ? 'danger' : 'default');
  const fg = opts.primary ? '#FFFFFF' : (opts.danger ? C.ERROR : C.INK2);
  let tx = x;
  const tw = label.length * 7 + (opts.icon ? 22 : 0);
  tx = x + (w - tw) / 2;
  if (opts.icon) {
    icon(parent, opts.icon, tx, y + 8, 16, fg);
    tx += 22;
  }
  const t = makeText(parent, tx, y + 7, label, { size: 13, weight: 600, color: fg, font });
  void t;
}

// ---------------------------------------------------------------------------
// ScenarioCard: default / compact / locked
// ---------------------------------------------------------------------------

export function scenarioCardDefault(parent: any, x: number, y: number, font: any): number {
  const w = 320;
  const card = makeRect(parent, x, y, w, 216, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  setShadow(card, 0, 4, 12, 0.08);
  card.name = 'ScenarioCard / default';
  makeText(parent, x + 16, y + 14, 'Работа с сопротивлением', { size: 16, weight: 600, color: C.INK, font });
  makeText(parent, x + 16, y + 38, 'Клиент избегает темы и переводит разговор.', { size: 13, weight: 400, color: C.INK2, font });
  makeText(parent, x + 16, y + 56, 'Отработайте навык распознавания и работы', { size: 13, weight: 400, color: C.INK2, font });
  makeText(parent, x + 16, y + 74, 'с сопротивлением.', { size: 13, weight: 400, color: C.INK2, font });
  dotsDifficulty(parent, x + 16, y + 100, 4, font);
  icon(parent, 'clock', x + 16, y + 124, 14, C.INK3);
  makeText(parent, x + 36, y + 121, '15 мин', { size: 12, weight: 400, color: C.INK2, font });
  let cx = x + 16;
  cx += chip(parent, cx, y + 146, 'сопротивление', C.BG2, C.INK2, font, { dot: '#EA580C', sm: true }) + 8;
  chip(parent, cx, y + 146, 'границы', C.BG2, C.INK2, font, { dot: '#0891B2', sm: true });
  makeText(parent, x + 16, y + 184, 'Не пройден', { size: 12, weight: 400, color: C.INK3, font });
  ghostButton(parent, x + w - 100, y + 176, 84, 'Начать', font, { primary: true });
  return 216;
}

export function scenarioCardCompact(parent: any, x: number, y: number, font: any): number {
  const w = 300;
  const card = makeRect(parent, x, y, w, 64, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'ScenarioCard / compact';
  makeText(parent, x + 14, y + 11, 'Активное слушание', { size: 14, weight: 600, color: C.INK, font });
  for (let i = 0; i < 5; i++) makeEllipse(parent, x + 14 + i * 12, y + 38, 7, 7, i < 2 ? C.ACCENT : C.BG3).name = 'dot';
  makeText(parent, x + 80, y + 34, '·  10 мин', { size: 11, weight: 400, color: C.INK3, font });
  ghostButton(parent, x + w - 82, y + 16, 68, 'Начать', font, {});
  return 64;
}

export function scenarioCardLocked(parent: any, x: number, y: number, font: any): number {
  const w = 320;
  const card = makeRect(parent, x, y, w, 216, C.BG2, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'ScenarioCard / locked';
  icon(parent, 'lock', x + 16, y + 14, 16, C.INK3);
  makeText(parent, x + 40, y + 12, 'Границы и контракт', { size: 16, weight: 600, color: C.INK2, font });
  makeText(parent, x + 16, y + 40, 'Сценарий будет доступен после прохождения', { size: 13, weight: 400, color: C.INK3, font });
  makeText(parent, x + 16, y + 58, '«Активное слушание».', { size: 13, weight: 400, color: C.INK3, font });
  dotsDifficulty(parent, x + 16, y + 100, 3, font);
  for (let i = 0; i < 5; i++) makeEllipse(parent, x + 16 + i * 14, y + 100, 8, 8, C.BG3).name = 'dot-locked';
  icon(parent, 'clock', x + 16, y + 124, 14, C.INK3);
  makeText(parent, x + 36, y + 121, '20 мин', { size: 12, weight: 400, color: C.INK3, font });
  const b = makeRect(parent, x + w - 108, y + 176, 92, 32, C.BG3, 16);
  b.name = 'Button / disabled';
  makeText(parent, x + w - 96, y + 183, 'Закрыто', { size: 13, weight: 600, color: C.INK3, font });
  makeText(parent, x + 16, y + 184, 'Пройдите предыдущий сценарий', { size: 11, weight: 400, color: C.INK3, font });
  return 216;
}

// ---------------------------------------------------------------------------
// GameCard + ClientAccessCard
// ---------------------------------------------------------------------------

export function gameCard(parent: any, x: number, y: number, font: any): number {
  const w = 300;
  const card = makeRect(parent, x, y, w, 168, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  setShadow(card, 0, 4, 12, 0.08);
  card.name = 'GameCard / default';
  let cx = x + 16;
  cx += chip(parent, cx, y + 14, 'Упражнение', '#E0F2FE', '#0C4A6E', font, { sm: true, border: false }) + 8;
  chip(parent, cx, y + 14, 'Тревога', '#FEF3C7', '#92400E', font, { sm: true, border: false });
  makeText(parent, x + 16, y + 46, 'Дыхание 4-7-8', { size: 16, weight: 600, color: C.INK, font });
  makeText(parent, x + 16, y + 70, 'Техника дыхания для снижения тревоги.', { size: 13, weight: 400, color: C.INK2, font });
  icon(parent, 'timer', x + 16, y + 94, 14, C.INK3);
  makeText(parent, x + 36, y + 91, '5 мин', { size: 12, weight: 400, color: C.INK2, font });
  icon(parent, 'users', x + 96, y + 94, 14, C.INK3);
  makeText(parent, x + 116, y + 91, '12 клиентов', { size: 12, weight: 400, color: C.INK2, font });
  ghostButton(parent, x + w - 160, y + 124, 144, 'Выдать клиенту', font, { primary: true, icon: 'send' });
  return 168;
}

export function clientAccessCard(parent: any, x: number, y: number, font: any, status: string): number {
  const w = 340;
  const card = makeRect(parent, x, y, w, 132, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'ClientAccessCard / ' + status;
  makeText(parent, x + 16, y + 14, 'Клиент А', { size: 14, weight: 600, color: C.INK, font });
  const st: Record<string, { label: string; bg: string; fg: string }> = {
    active: { label: 'активен', bg: '#DCFCE7', fg: '#166534' },
    completed: { label: 'завершён', bg: '#E0F2FE', fg: '#0C4A6E' },
    expired: { label: 'истёк', bg: '#FEF3C7', fg: '#92400E' },
    revoked: { label: 'отозван', bg: '#FEE2E2', fg: '#991B1B' },
  };
  const s = st[status] || st.active;
  chip(parent, x + w - 96, y + 12, s.label, s.bg, s.fg, font, { sm: true, border: false });
  makeText(parent, x + 16, y + 36, 'Игра: Дневник эмоций', { size: 13, weight: 400, color: C.INK2, font });
  icon(parent, 'calendar', x + 16, y + 60, 14, C.INK3);
  makeText(parent, x + 36, y + 57, 'до 30.09.2026', { size: 12, weight: 400, color: C.INK2, font });
  icon(parent, 'key-round', x + 130, y + 60, 14, C.INK3);
  makeText(parent, x + 150, y + 57, 'входы 3/5', { size: 12, weight: 400, color: C.INK2, font });
  ghostButton(parent, x + 16, y + 88, 128, 'Копировать ссылку', font, { icon: 'link-2' });
  ghostButton(parent, x + 156, y + 88, 96, 'Отозвать', font, { danger: true, icon: 'x' });
  return 132;
}

// ---------------------------------------------------------------------------
// ClientMessageBubble + EmotionIndicator
// ---------------------------------------------------------------------------

function bubbleLeft(parent: any, x: number, y: number, font: any): number {
  const w = 430;
  const h = 84;
  const b = makeRect(parent, x, y, w, h, C.BG2, 12);
  b.name = 'ClientMessageBubble / left';
  makeText(parent, x + 16, y + 12, 'Я не знаю, с чего начать… Как будто всё идёт', { size: 14, weight: 400, color: C.INK, font });
  makeText(parent, x + 16, y + 32, 'не так, и я уже не справляюсь.', { size: 14, weight: 400, color: C.INK, font });
  icon(parent, 'frown', x + 16, y + h + 8, 14, C.ERROR);
  makeText(parent, x + 36, y + h + 6, 'эмоция 3/10 · низкий фон', { size: 11, weight: 500, color: C.ERROR, font });
  makeText(parent, x + w - 90, y + h + 6, '14:02', { size: 11, weight: 400, color: C.INK3, font });
  return h + 28;
}

function bubbleRight(parent: any, x: number, y: number, font: any): number {
  const w = 400;
  const h = 64;
  const b = makeRect(parent, x, y, w, h, C.ACCENT, 12);
  b.name = 'ClientMessageBubble / right';
  makeText(parent, x + 16, y + 12, 'Расскажите, что вы чувствуете, когда', { size: 14, weight: 400, color: '#FFFFFF', font });
  makeText(parent, x + 16, y + 32, 'говорите об этом?', { size: 14, weight: 400, color: '#FFFFFF', font });
  makeText(parent, x + w - 50, y + 40, '14:03', { size: 11, weight: 400, color: '#BFDBFE', font });
  return h + 8;
}

export function emotionIndicatorCompact(parent: any, x: number, y: number, font: any): void {
  const card = makeRect(parent, x, y, 200, 44, C.WHITE, 10);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'EmotionIndicator / compact';
  icon(parent, 'frown', x + 12, y + 13, 18, C.ERROR);
  makeText(parent, x + 38, y + 8, '3/10', { size: 14, weight: 600, color: C.INK, font });
  makeText(parent, x + 38, y + 26, 'низкий фон', { size: 11, weight: 400, color: C.ERROR, font });
  makeEllipse(parent, x + 158, y + 18, 8, 8, C.ERROR).name = 'emotion-dot';
}

function emotionIndicatorExtended(parent: any, x: number, y: number, font: any): void {
  const w = 520;
  const card = makeRect(parent, x, y, w, 74, C.WHITE, 10);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'EmotionIndicator / extended';
  makeText(parent, x + 14, y + 10, 'Эмоциональный фон клиента', { size: 12, weight: 500, color: C.INK2, font });
  makeText(parent, x + w - 76, y + 6, '3/10', { size: 16, weight: 600, color: C.INK, font });
  const segW = 44;
  for (let i = 0; i < 10; i++) {
    const col = i < 3 ? C.ERROR : i < 6 ? C.WARNING : C.SUCCESS;
    const seg = makeRect(parent, x + 14 + i * (segW + 4), y + 32, segW, 12, col, 3);
    seg.name = 'seg';
    try { if (i !== 2) { seg.fills = [{ fillColor: col, fillOpacity: i < 3 ? 0.9 : 0.35 }]; } } catch (_) { /* полная */ }
  }
  makeText(parent, x + 14, y + 52, '0–3 низкий', { size: 10, weight: 400, color: C.INK3, font });
  makeText(parent, x + 14 + 3 * (segW + 4), y + 52, '4–6 средний', { size: 10, weight: 400, color: C.INK3, font });
  makeText(parent, x + 14 + 6 * (segW + 4), y + 52, '7–10 высокий', { size: 10, weight: 400, color: C.INK3, font });
  icon(parent, 'frown', x + w - 40, y + 30, 20, C.ERROR);
}

// ---------------------------------------------------------------------------
// AnswerOption ×5 + TechniqueTag + CriticalErrorBanner
// ---------------------------------------------------------------------------

const ANSWER_TEXT = 'Отражаю чувство: «Похоже, сейчас для вас всё слишком»';

function answerOption(parent: any, x: number, y: number, state: string, font: any): number {
  const w = 470;
  const h = 58;
  let bg = C.WHITE, border = C.BD, bw = 1, fg = C.INK, icon1 = '', iconCol = '', label = '';
  if (state === 'selected') { bg = '#EFF6FF'; border = C.ACCENT; bw = 2; }
  if (state === 'correct') { bg = '#F0FDF4'; border = C.SUCCESS; bw = 2; icon1 = 'circle-check'; iconCol = C.SUCCESS; label = 'верно'; }
  if (state === 'wrong') { bg = '#FEF2F2'; border = C.ERROR; bw = 2; icon1 = 'circle-x'; iconCol = C.ERROR; label = 'мимо'; }
  if (state === 'critical-error') {
    bg = C.ERROR; border = C.ERROR; fg = '#FFFFFF';
    const card = makeRect(parent, x, y, w, h, bg, 12);
    setShadow(card, 0, 4, 12, 0.15);
    card.name = 'AnswerOption / critical-error';
    icon(parent, 'alert-octagon', x + 14, y + 21, 18, '#FFFFFF');
    makeText(parent, x + 42, y + 10, 'Критическая ошибка: обесценивание чувств', { size: 13, weight: 600, color: '#FFFFFF', font });
    makeText(parent, x + 42, y + 30, 'Фраза обесценивает переживания клиента. Разбор будет изменён.', { size: 11, weight: 400, color: '#FECACA', font });
    return h + 26;
  }
  const card = makeRect(parent, x, y, w, h, bg, 12);
  setStroke(card, border, bw, 'inner');
  card.name = 'AnswerOption / ' + state;
  makeText(parent, x + 14, y + 9, ANSWER_TEXT, { size: 12, weight: 400, color: fg, font });
  chip(parent, x + 14, y + 30, 'активное слушание', C.WHITE, '#1D4ED8', font, { dot: '#2563EB', sm: true });
  if (icon1) {
    icon(parent, icon1, x + w - 76, y + 8, 16, iconCol);
    makeText(parent, x + w - 54, y + 9, label, { size: 11, weight: 600, color: iconCol, font });
  }
  return h + 26;
}

function techniqueTag(parent: any, x: number, y: number, font: any): void {
  const card = makeRect(parent, x, y, 210, 32, '#EFF6FF', 16);
  setStroke(card, '#BFDBFE', 1, 'inner');
  card.name = 'TechniqueTag / default';
  icon(parent, 'message-circle', x + 12, y + 8, 15, C.ACCENT);
  makeText(parent, x + 34, y + 7, 'Активное слушание', { size: 12, weight: 500, color: '#1D4ED8', font });
}

function criticalErrorBanner(parent: any, x: number, y: number, font: any): void {
  const w = 560;
  const h = 72;
  const card = makeRect(parent, x, y, w, h, '#FEF2F2', 12);
  setStroke(card, '#FECACA', 1, 'inner');
  card.name = 'CriticalErrorBanner / default';
  makeRect(parent, x, y + 10, 4, h - 20, C.ERROR, 2);
  icon(parent, 'alert-octagon', x + 20, y + 16, 20, C.ERROR);
  makeText(parent, x + 52, y + 12, 'Критическая ошибка', { size: 14, weight: 600, color: '#991B1B', font });
  makeText(parent, x + 52, y + 34, 'Вы обесценили чувства клиента («это ерунда, успокойтесь»).', { size: 12, weight: 400, color: '#991B1B', font });
  makeText(parent, x + 52, y + 52, 'Сессия завершена. Изучите разбор перед повторной попыткой.', { size: 12, weight: 400, color: '#B91C1C', font });
}

// ---------------------------------------------------------------------------
// SkillScoreCard + Radar
// ---------------------------------------------------------------------------

function skillScoreCard(parent: any, x: number, y: number, name: string, ball: number,
                        color: string, font: any): number {
  const w = 280;
  const card = makeRect(parent, x, y, w, 84, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'SkillScoreCard / ' + name;
  makeText(parent, x + 16, y + 14, name, { size: 14, weight: 600, color: C.INK, font });
  makeText(parent, x + w - 72, y + 10, ball + '/100', { size: 16, weight: 600, color: C.INK, font });
  makeRect(parent, x + 16, y + 46, w - 32, 8, C.BG3, 4);
  makeRect(parent, x + 16, y + 46, Math.max(8, Math.round((w - 32) * ball / 100)), 8, color, 4).name = 'skill-bar';
  makeText(parent, x + 16, y + 62, 'рост +8 за неделю', { size: 11, weight: 400, color: C.SUCCESS, font });
  return 84;
}

const SKILLS: [string, string, number][] = [
  ['Слушание', '#2563EB', 86], ['Эмпатия', '#7C3AED', 72], ['Границы', '#0891B2', 64],
  ['Эмоции', '#DB2777', 58], ['Структура', '#65A30D', 77], ['Сопротивл.', '#EA580C', 49],
  ['Вопросы', '#0EA5E9', 81], ['Рефлексия', '#9333EA', 68],
];

export function radarSvg(size: number): string {
  const cx = 110, cy = 100, R = 78;
  const scores = SKILLS.map(s => s[2]);
  const pt = (i: number, r: number): [number, number] => {
    const a = -Math.PI / 2 + i * Math.PI / 4;
    return [Math.round((cx + r * Math.cos(a)) * 10) / 10, Math.round((cy + r * Math.sin(a)) * 10) / 10];
  };
  const s: string[] = [];
  for (const level of [0.25, 0.5, 0.75, 1]) {
    const pts = scores.map((_, i) => pt(i, R * level).join(',')).join(' ');
    s.push(`<polygon points="${pts}" fill="${level === 1 ? '#F8FAFC' : 'none'}" stroke="#E2E8F0" stroke-width="1"/>`);
  }
  for (let i = 0; i < 8; i++) {
    const [px, py] = pt(i, R);
    s.push(`<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#E2E8F0" stroke-width="1"/>`);
  }
  const data = scores.map((v, i) => pt(i, R * v / 100).join(',')).join(' ');
  s.push(`<polygon points="${data}" fill="#2563EB" fill-opacity="0.18" stroke="#2563EB" stroke-width="2"/>`);
  scores.forEach((v, i) => {
    const [px, py] = pt(i, R * v / 100);
    s.push(`<circle cx="${px}" cy="${py}" r="3" fill="#2563EB"/>`);
  });
  return `<svg width="${size}" height="${Math.round(size * 100 / 220)}" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">${s.join('')}</svg>`;
}

function radarWithLabels(parent: any, x: number, y: number, font: any): void {
  const svg = penpot.createShapeFromSvg(radarSvg(220));
  if (svg) {
    parent.appendChild(svg);
    svg.x = x; svg.y = y;
    svg.name = 'SkillRadarChart / default';
  }
  // подписи вокруг радара (cx=110, cy=100 в координатах svg, R=78)
  const cx = x + 110, cy = y + 100, R = 78 + 16;
  const labels = SKILLS.map(s => s[0]);
  labels.forEach((lb, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 4;
    const lx = cx + R * Math.cos(a);
    const ly = cy + R * Math.sin(a);
    const t = makeText(parent, lx - 30, ly - 7, lb, { size: 10, weight: 500, color: C.INK2, font });
    centerTextIn(t, lx - 30, 60);
  });
}

// ---------------------------------------------------------------------------
// SessionProgress + Loader + OnboardingStep
// ---------------------------------------------------------------------------

function sessionProgress(parent: any, x: number, y: number, font: any): void {
  const w = 420;
  const card = makeRect(parent, x, y, w, 56, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'SessionProgress / default';
  makeText(parent, x + 16, y + 10, 'ШАГ 3 ИЗ 7', { size: 11, weight: 500, color: C.INK3, font });
  makeText(parent, x + 100, y + 9, 'Уточнение запроса', { size: 12, weight: 600, color: C.INK, font });
  makeRect(parent, x + 16, y + 34, 300, 6, C.BG3, 3);
  makeRect(parent, x + 16, y + 34, Math.round(300 * 3 / 7), 6, C.ACCENT, 3).name = 'progress-fill';
  const pause = makeRect(parent, x + w - 44, y + 12, 32, 32, C.BG2, 16);
  setStroke(pause, C.BD, 1, 'inner');
  pause.name = 'Button / pause';
  icon(parent, 'pause', x + w - 36, y + 20, 16, C.INK2);
}

function loader(parent: any, x: number, y: number, font: any): void {
  const card = makeRect(parent, x, y, 240, 88, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'Loader / default';
  try {
    const sp = '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="14" cy="14" r="11" stroke="#EEF0F4" stroke-width="4"/>' +
      '<path d="M 14 3 A 11 11 0 0 1 25 14" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/></svg>';
    const g = penpot.createShapeFromSvg(sp);
    if (g) { parent.appendChild(g); g.x = x + 20; g.y = y + 30; g.name = 'spinner'; }
  } catch (_) { /* спиннер опционален */ }
  makeText(parent, x + 60, y + 26, 'Загружаем сценарий…', { size: 13, weight: 400, color: C.INK2, font });
  makeText(parent, x + 60, y + 46, 'Обычно это занимает пару секунд', { size: 11, weight: 400, color: C.INK3, font });
}

function onboardingStep(parent: any, x: number, y: number, font: any): void {
  const w = 320;
  const card = makeRect(parent, x, y, w, 148, C.INK, 12);
  setShadow(card, 0, 12, 32, 0.25);
  card.name = 'OnboardingStep / default';
  makeText(parent, x + 20, y + 16, 'ШАГ 2 ИЗ 4 · ОНБОРДИНГ', { size: 10, weight: 500, color: '#93C5FD', font });
  makeText(parent, x + 20, y + 38, 'Выберите специализацию', { size: 16, weight: 600, color: '#FFFFFF', font });
  makeText(parent, x + 20, y + 62, 'Это поможет подобрать сценарии под ваш', { size: 12, weight: 400, color: '#CBD5E1', font });
  makeText(parent, x + 20, y + 78, 'профиль: тревожность, выгорание, отношения…', { size: 12, weight: 400, color: '#CBD5E1', font });
  ghostButtonDark(parent, x + 20, y + 104, 92, 'Далее', font);
  makeText(parent, x + 128, y + 112, 'Пропустить', { size: 12, weight: 500, color: '#94A3B8', font });
}

function ghostButtonDark(parent: any, x: number, y: number, w: number, label: string, font: any): void {
  const b = makeRect(parent, x, y, w, 32, C.ACCENT, 16);
  b.name = 'Button / primary / sm / dark-context';
  makeText(parent, x + 24, y + 7, label, { size: 13, weight: 600, color: '#FFFFFF', font });
}

// ---------------------------------------------------------------------------
// ConsentBlock + CodeDisplay + DeepLinkBlock
// ---------------------------------------------------------------------------

function consentBlock(parent: any, x: number, y: number, font: any): void {
  const w = 360;
  const card = makeRect(parent, x, y, w, 128, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'ConsentBlock / default';
  const box = makeRect(parent, x + 16, y + 16, 20, 20, C.ACCENT, 6);
  box.name = 'checkbox-checked';
  icon(parent, 'check', x + 19, y + 19, 14, '#FFFFFF');
  makeText(parent, x + 46, y + 12, 'Я даю согласие на обработку', { size: 13, weight: 400, color: C.INK, font });
  makeText(parent, x + 46, y + 30, 'персональных данных', { size: 13, weight: 400, color: C.INK, font });
  makeText(parent, x + 46, y + 58, 'Подробности:', { size: 12, weight: 400, color: C.INK3, font });
  makeText(parent, x + 46, y + 76, 'Политика конфиденциальности', { size: 12, weight: 500, color: C.ACCENT, font });
  makeText(parent, x + 46, y + 94, 'Условия использования платформы', { size: 12, weight: 500, color: C.ACCENT, font });
}

export function codeDisplay(parent: any, x: number, y: number, font: any, monoFont: any): void {
  const w = 280;
  const card = makeRect(parent, x, y, w, 128, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  setShadow(card, 0, 4, 12, 0.08);
  card.name = 'CodeDisplay / default';
  makeText(parent, x + 16, y + 14, 'КОД ДОСТУПА', { size: 10, weight: 500, color: C.INK3, font });
  makeText(parent, x + 16, y + 36, 'A7X9-Q2', { size: 32, weight: 600, color: C.INK, font: monoFont || font });
  makeText(parent, x + 16, y + 78, 'Клиент введёт код на странице игры', { size: 11, weight: 400, color: C.INK3, font });
  ghostButton(parent, x + 16, y + 92, 132, 'Скопировать', font, { icon: 'copy' });
}

function qrSvg(px: number): string {
  // плейсхолдер QR (реальный код генерирует бэкенд)
  const n = 21; const m = px / n;
  const cells: string[] = [];
  const finder = (fx: number, fy: number) => {
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const edge = i === 0 || i === 6 || j === 0 || j === 6;
      const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (edge || core) cells.push(`<rect x="${(fx + j) * m}" y="${(fy + i) * m}" width="${m}" height="${m}" fill="#0F172A"/>`);
    }
  };
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
    if (inFinder) continue;
    if ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0) {
      cells.push(`<rect x="${x * m}" y="${y * m}" width="${m}" height="${m}" fill="#0F172A"/>`);
    }
  }
  return `<svg width="${px}" height="${px}" viewBox="0 0 ${px} ${px}" fill="none" xmlns="http://www.w3.org/2000/svg">${cells.join('')}</svg>`;
}

export function deepLinkBlock(parent: any, x: number, y: number, font: any, monoFont: any): void {
  const w = 380;
  const card = makeRect(parent, x, y, w, 128, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'DeepLinkBlock / default';
  makeText(parent, x + 16, y + 14, 'ССЫЛКА ДЛЯ КЛИЕНТА', { size: 10, weight: 500, color: C.INK3, font });
  const urlBox = makeRect(parent, x + 16, y + 32, 240, 32, C.BG2, 8);
  setStroke(urlBox, C.BD, 1, 'inner');
  makeText(parent, x + 26, y + 40, 'app.platform.ru/g/A7X9Q2', { size: 12, weight: 400, color: C.ACCENT, font: monoFont || font });
  const cp = makeRect(parent, x + 264, y + 32, 32, 32, C.WHITE, 8);
  setStroke(cp, C.BD, 1, 'inner');
  cp.name = 'Button / copy-icon';
  icon(parent, 'copy', x + 272, y + 40, 16, C.INK2);
  try {
    const qr = penpot.createShapeFromSvg(qrSvg(64));
    if (qr) { parent.appendChild(qr); qr.x = x + 304; qr.y = y + 16; qr.name = 'qr-placeholder'; }
  } catch (_) { /* QR опционален */ }
  makeText(parent, x + 16, y + 76, 'Или отсканируйте QR-код в мобильном', { size: 11, weight: 400, color: C.INK3, font });
  ghostButton(parent, x + 16, y + 92, 148, 'Скопировать ссылку', font, { icon: 'link-2' });
}

// ---------------------------------------------------------------------------
// EmptyState + VerificationBadge + SupervisionComment + AuditLogRow
// ---------------------------------------------------------------------------

function emptyState(parent: any, x: number, y: number, font: any): void {
  const w = 300;
  const card = makeRect(parent, x, y, w, 240, C.BG2, 16);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'EmptyState / default';
  icon(parent, 'inbox', x + w / 2 - 16, y + 36, 32, C.INK3);
  makeText(parent, x + 40, y + 88, 'Здесь пока пусто', { size: 16, weight: 600, color: C.INK, font });
  makeText(parent, x + 30, y + 116, 'Выдайте первую игру клиенту — она появится', { size: 12, weight: 400, color: C.INK2, font });
  makeText(parent, x + 52, y + 134, 'в списке доступов', { size: 12, weight: 400, color: C.INK2, font });
  ghostButton(parent, x + w / 2 - 62, y + 168, 124, 'Выдать игру', font, { primary: true });
}

function verificationBadges(parent: any, x: number, y: number, font: any): number {
  const items: [string, string, string, string][] = [
    ['unverified', 'Без статуса', C.BG2, C.INK2],
    ['pending', 'На проверке', '#FEF3C7', '#92400E'],
    ['verified', 'Верифицирован', '#DCFCE7', '#166534'],
    ['rejected', 'Отклонён', '#FEE2E2', '#991B1B'],
  ];
  const icons: Record<string, string> = { unverified: 'user', pending: 'clock', verified: 'badge-check', rejected: 'circle-x' };
  let cy = y;
  items.forEach((it) => {
    const w = Math.round(it[1].length * 6.8) + 46;
    const card = makeRect(parent, x, cy, w, 30, it[2], 15);
    card.name = 'VerificationBadge / ' + it[0];
    icon(parent, icons[it[0]], x + 12, cy + 8, 14, it[3]);
    makeText(parent, x + 32, cy + 7, it[1], { size: 12, weight: 500, color: it[3], font });
    cy += 40;
  });
  return cy - y;
}

function supervisionComment(parent: any, x: number, y: number, font: any): void {
  const w = 460;
  const card = makeRect(parent, x, y, w, 148, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'SupervisionComment / default';
  const av = makeEllipse(parent, x + 16, y + 14, 36, 36, C.ACCENT2);
  av.name = 'avatar';
  makeText(parent, x + 24, y + 24, 'МП', { size: 13, weight: 600, color: '#FFFFFF', font });
  makeText(parent, x + 64, y + 14, 'М. Петрова', { size: 13, weight: 600, color: C.INK, font });
  makeText(parent, x + 64, y + 32, 'супервизор · 14.09.2026', { size: 11, weight: 400, color: C.INK3, font });
  makeRect(parent, x + 16, y + 62, 3, 70, C.ACCENT2, 2);
  makeText(parent, x + 32, y + 62, 'Хороший ход на 4-й реплике. Обратите внимание на', { size: 12, weight: 400, color: C.INK2, font });
  makeText(parent, x + 32, y + 80, 'момент 06:40 — клиент дважды возвращается к теме', { size: 12, weight: 400, color: C.INK2, font });
  makeText(parent, x + 32, y + 98, 'отца: уместен циркулярный вопрос. Оценка за сессию:', { size: 12, weight: 400, color: C.INK2, font });
  makeText(parent, x + 32, y + 116, '82/100. Рекомендую сценарий «Циркулярные вопросы».', { size: 12, weight: 400, color: C.INK2, font });
}

function auditLogRow(parent: any, x: number, y: number, font: any): void {
  const w = 620;
  const row = makeRect(parent, x, y, w, 48, C.WHITE, 10);
  setStroke(row, C.BD, 1, 'inner');
  row.name = 'AuditLogRow / default';
  icon(parent, 'fingerprint', x + 14, y + 16, 16, C.INK3);
  makeText(parent, x + 40, y + 15, 'admin@platform.ru', { size: 12, weight: 500, color: C.INK, font });
  makeText(parent, x + 200, y + 15, 'опубликовал', { size: 12, weight: 400, color: C.INK2, font });
  makeText(parent, x + 300, y + 15, 'Сценарий #142 «Первичная консультация»', { size: 12, weight: 500, color: C.ACCENT, font });
  makeText(parent, x + w - 110, y + 15, '16.09.2026 14:32', { size: 11, weight: 400, color: C.INK3, font });
}

// ---------------------------------------------------------------------------
// TMA: BottomNav + MainButton
// ---------------------------------------------------------------------------

function bottomNav(parent: any, x: number, y: number, font: any): void {
  const w = 390, h = 64;
  const bar = makeRect(parent, x, y, w, h, C.WHITE, 0);
  setStroke(bar, C.BD, 1, 'inner');
  bar.name = 'BottomNav / TMA / default';
  const items: [string, string, boolean][] = [
    ['home', 'Главная', true], ['book-open', 'Сценарии', false], ['sparkles', 'Игры', false],
    ['chart-column', 'Прогресс', false], ['user', 'Профиль', false],
  ];
  items.forEach((it, i) => {
    const cx = x + 12 + i * 76;
    const col = it[2] ? C.ACCENT : C.INK3;
    icon(parent, it[0], cx + 8, y + 10, 20, col);
    makeText(parent, cx, y + 36, it[1], { size: 9, weight: it[2] ? 600 : 400, color: col, font });
  });
}

function mainButton(parent: any, x: number, y: number, font: any, variant: string): void {
  const w = 390, h = 80;
  const bar = makeRect(parent, x, y, w, h, C.WHITE, 0);
  setStroke(bar, C.BD, 1, 'inner');
  bar.name = 'MainButton / TMA / ' + variant;
  const enabled = variant === 'enabled';
  const btn = makeRect(parent, x + 16, y + 10, w - 32, 44, enabled ? C.ACCENT : C.BG3, 22);
  btn.name = 'tg-main-button';
  const t = makeText(parent, x + 100, y + 22, enabled ? 'Продолжить' : 'Подождите…',
    { size: 15, weight: 600, color: enabled ? '#FFFFFF' : C.INK3, font });
  centerTextIn(t, x + 16, w - 32);
  makeText(parent, x + 16, y + 62, 'зона safe area · высота 80px', { size: 9, weight: 400, color: C.INK3, font });
}

// ---------------------------------------------------------------------------
// Сборка борда
// ---------------------------------------------------------------------------

export function buildDomainBoard(log: string[]): void {
  const font = pickFont(FONT_FALLBACKS);
  const lib = penpot.library.local;
  const existing = new Set<string>();
  try { for (const c of lib.components) existing.add(c.name); } catch (_) { /* пусто */ }

  const board = penpot.createBoard();
  board.name = BOARD_NAME;
  board.x = 100 + 2 * (1240 + 200); // третья колонка
  board.y = 100;
  setOrigin(board.x, board.y);
  try { board.resize(CW, 400); } catch (_) { /* ниже */ }
  try { board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }]; } catch (_) { /* фон */ }
  setStroke(board, C.BD, 1, 'inner');

  let y = M;
  makeText(board, M, y, 'Platform — Domain components', { size: 40, weight: 700, color: C.INK, font });
  y += 56;
  makeText(board, M, y, 'Доменные компоненты ТЗ 4.2 · радар и QR — статичные SVG-плейсхолдеры · компоненты зарегистрированы в Assets',
    { size: 13, weight: 400, color: C.INK2, font });
  y += 80;

  // ScenarioCard
  y = sectionTitle(board, M, y, 'ScenarioCard · GameCard · ClientAccessCard', 'варианты default / compact / locked · статусы доступов');
  const yCards = y;
  startBag();
  scenarioCardDefault(board, M, yCards, font);
  registerComponent(endBag(), 'ScenarioCard / default', existing, log);
  startBag();
  scenarioCardCompact(board, M + 356, yCards, font);
  registerComponent(endBag(), 'ScenarioCard / compact', existing, log);
  startBag();
  scenarioCardLocked(board, M + 692, yCards, font);
  registerComponent(endBag(), 'ScenarioCard / locked', existing, log);
  caption(board, M, yCards + 226, 'default');
  caption(board, M + 356, yCards + 226, 'compact');
  caption(board, M + 692, yCards + 226, 'locked');
  startBag();
  gameCard(board, M, yCards + 252, font);
  registerComponent(endBag(), 'GameCard / default', existing, log);
  startBag();
  clientAccessCard(board, M + 336, yCards + 252, 'active', font);
  registerComponent(endBag(), 'ClientAccessCard / active', existing, log);
  startBag();
  clientAccessCard(board, M + 692, yCards + 252, 'expired', font);
  registerComponent(endBag(), 'ClientAccessCard / expired', existing, log);
  caption(board, M, yCards + 430, 'GameCard');
  caption(board, M + 336, yCards + 394, 'access / active');
  caption(board, M + 692, yCards + 394, 'access / expired');
  startBag();
  clientAccessCard(board, M + 336, yCards + 440, 'completed', font);
  registerComponent(endBag(), 'ClientAccessCard / completed', existing, log);
  startBag();
  clientAccessCard(board, M + 692, yCards + 440, 'revoked', font);
  registerComponent(endBag(), 'ClientAccessCard / revoked', existing, log);
  y = yCards + 600;

  // Bubbles + Emotion
  y = sectionTitle(board, M, y, 'ClientMessageBubble · EmotionIndicator', 'left (клиент) / right (психолог) · эмоция = иконка + цвет + текст (WCAG)');
  startBag();
  bubbleLeft(board, M, y, font);
  registerComponent(endBag(), 'ClientMessageBubble / left', existing, log);
  startBag();
  bubbleRight(board, M + 520, y, font);
  registerComponent(endBag(), 'ClientMessageBubble / right', existing, log);
  caption(board, M, y + 118, 'left · с индикатором эмоции');
  caption(board, M + 520, y + 80, 'right');
  startBag();
  emotionIndicatorCompact(board, M + 520, y + 100, font);
  registerComponent(endBag(), 'EmotionIndicator / compact', existing, log);
  startBag();
  emotionIndicatorExtended(board, M, y + 160, font);
  registerComponent(endBag(), 'EmotionIndicator / extended', existing, log);
  caption(board, M + 520, y + 152, 'compact');
  caption(board, M, y + 244, 'extended · шкала 0–10');
  y += 290;

  // AnswerOption + TechniqueTag + CriticalErrorBanner
  y = sectionTitle(board, M, y, 'AnswerOption · TechniqueTag · CriticalErrorBanner', 'default / selected / correct / wrong / critical-error');
  const states = ['default', 'selected', 'correct', 'wrong', 'critical-error'];
  states.forEach((st, i) => {
    startBag();
    const used = answerOption(board, M, y + i * 62, st, font);
    registerComponent(endBag(), 'AnswerOption / ' + st, existing, log);
    caption(board, M + 480, y + i * 62 + 16, st);
    void used;
  });
  startBag();
  techniqueTag(board, M + 560, y, font);
  registerComponent(endBag(), 'TechniqueTag / default', existing, log);
  caption(board, M + 560, y + 40, 'technique tag');
  startBag();
  criticalErrorBanner(board, M + 560, y + 76, font);
  registerComponent(endBag(), 'CriticalErrorBanner / default', existing, log);
  caption(board, M + 560, y + 156, 'critical error banner');
  y += 390;

  // Skills
  y = sectionTitle(board, M, y, 'SkillScoreCard · SkillRadarChart', 'балл 0–100 · радар 8 навыков (статичный SVG-плейсхолдер)');
  startBag();
  skillScoreCard(board, M, y, 'Эмпатия', 72, '#7C3AED', font);
  registerComponent(endBag(), 'SkillScoreCard / default', existing, log);
  skillScoreCard(board, M + 300, y, 'Сопротивление', 49, '#EA580C', font);
  skillScoreCard(board, M + 600, y, 'Активное слушание', 86, '#2563EB', font);
  caption(board, M, y + 94, 'skill cards');
  startBag();
  radarWithLabels(board, M + 60, y + 130, font);
  registerComponent(endBag(), 'SkillRadarChart / default', existing, log);
  caption(board, M + 60, y + 400, 'radar · SVG-плейсхолдер');
  y += 450;

  // Session + Loader + Onboarding
  y = sectionTitle(board, M, y, 'SessionProgress · Loader · OnboardingStep', 'шаг X/Y + пауза · спиннер · коуч-марк онбординга');
  startBag();
  sessionProgress(board, M, y, font);
  registerComponent(endBag(), 'SessionProgress / default', existing, log);
  startBag();
  loader(board, M + 460, y, font);
  registerComponent(endBag(), 'Loader / default', existing, log);
  startBag();
  onboardingStep(board, M + 760, y, font);
  registerComponent(endBag(), 'OnboardingStep / default', existing, log);
  y += 200;

  // Consent + Code + DeepLink
  y = sectionTitle(board, M, y, 'ConsentBlock · CodeDisplay · DeepLinkBlock', 'согласие (E-41) · код 6 символов mono · ссылка + QR');
  startBag();
  consentBlock(board, M, y, font);
  registerComponent(endBag(), 'ConsentBlock / default', existing, log);
  startBag();
  codeDisplay(board, M + 400, y, font, null);
  registerComponent(endBag(), 'CodeDisplay / default', existing, log);
  startBag();
  deepLinkBlock(board, M + 720, y, font, null);
  registerComponent(endBag(), 'DeepLinkBlock / default', existing, log);
  y += 170;

  // Empty + Badges + Comment + Audit
  y = sectionTitle(board, M, y, 'EmptyState · VerificationBadge · SupervisionComment · AuditLogRow', 'пустые состояния · статусы верификации · комментарий · аудит');
  startBag();
  emptyState(board, M, y, font);
  registerComponent(endBag(), 'EmptyState / default', existing, log);
  startBag();
  verificationBadges(board, M + 360, y, font);
  registerComponent(endBag(), 'VerificationBadge / verified', existing, log);
  startBag();
  supervisionComment(board, M + 560, y, font);
  registerComponent(endBag(), 'SupervisionComment / default', existing, log);
  startBag();
  auditLogRow(board, M + 360, y + 180, font);
  registerComponent(endBag(), 'AuditLogRow / default', existing, log);
  caption(board, M, y + 250, 'empty state');
  caption(board, M + 360, y + 156, 'badges ×4');
  caption(board, M + 560, y + 156, 'comment');
  caption(board, M + 360, y + 236, 'audit log row');
  y += 300;

  // TMA
  y = sectionTitle(board, M, y, 'TMA: BottomNav · MainButton', 'Telegram Mini App · только 390 · safe area');
  startBag();
  bottomNav(board, M, y, font);
  registerComponent(endBag(), 'BottomNav / TMA', existing, log);
  caption(board, M, y + 72, 'BottomNav · 64px · активная вкладка = accent');
  startBag();
  mainButton(board, M + 460, y, font, 'enabled');
  registerComponent(endBag(), 'MainButton / TMA / enabled', existing, log);
  startBag();
  mainButton(board, M + 880, y, font, 'disabled');
  registerComponent(endBag(), 'MainButton / TMA / disabled', existing, log);
  caption(board, M + 460, y + 92, 'MainButton · 80px safe area');
  caption(board, M + 880, y + 92, 'disabled');
  y += 140;

  makeText(board, M, y, 'Дальше: экраны (Итерация 4+): E-01…E-85 собираются из этих компонентов.',
    { size: 12, weight: 400, color: C.INK3, font });
  y += 48;

  try { board.resize(CW, y); } catch (_) { /* высота */ }
  log.push('✓ Domain: зарегистрировано компонентов: ' + existing.size);
}
