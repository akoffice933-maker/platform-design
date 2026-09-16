// Экраны симулятора (Итерация 5 ТЗ, раздел 5.3): E-20…E-28 × 1440/768/390 = 27 фреймов.
// Переиспользует каркас и хелперы screens.ts, доменные блоки domain.ts.

declare const penpot: any;

import { C } from './tokens-data';
import { pickFont, makeEllipse, setStroke, setShadow, setOrigin, getOrigin, icon, FONT_FALLBACKS } from './draw';
import {
  Mode, D, T, MB, shell, openFrame, bubble, answerRow, skillBarRow,
  txt, rect, ic, avatar, btn, cardBox,
} from './screens';
import { scenarioCardDefault, scenarioCardCompact, scenarioCardLocked, emotionIndicatorCompact, radarSvg } from './domain';

// ---------------------------------------------------------------------------
// Хелперы итерации 5
// ---------------------------------------------------------------------------

let F2: any = null; // шрифт (тот же Inter, что и в helpers screens.ts)

function lineChartSvg(w: number, h: number, points: number[], color: string): string {
  const min = Math.min(...points) - 8;
  const max = Math.max(...points) + 8;
  const px = (i: number): number => Math.round(14 + i * (w - 28) / (points.length - 1));
  const py = (v: number): number => Math.round(h - 12 - (v - min) * (h - 24) / (max - min));
  const poly = points.map((v, i) => px(i) + ',' + py(v)).join(' ');
  const dots = points.map((v, i) =>
    '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3.5" fill="' + color + '"/>').join('');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="10" y1="' + (h - 12) + '" x2="' + (w - 10) + '" y2="' + (h - 12) + '" stroke="#E2E8F0"/>' +
    '<polyline points="' + poly + '" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/>' + dots + '</svg>';
}

function sessionTop(f: any, x: number, y: number, w: number, step: number, total: number,
                    name: string): number {
  txt(f, x, y, 'ШАГ ' + step + ' ИЗ ' + total, 11, 500, C.INK3);
  txt(f, x + 92, y - 1, name, 13, 600, C.INK);
  const pause = rect(f, x + w - 36, y - 8, 36, 36, C.BG2, 18);
  setStroke(pause, C.BD, 1, 'inner');
  pause.name = 'Button / pause';
  ic(f, 'pause', x + w - 28, y, 16, C.INK2);
  rect(f, x, y + 22, w, 6, C.BG3, 3);
  rect(f, x, y + 22, Math.round(w * step / total), 6, C.ACCENT, 3).name = 'progress-fill';
  return 52;
}

function answerStack(f: any, x: number, y: number, w: number, opts: [string, string][],
                     withOwn: boolean): number {
  let cy = y;
  opts.forEach((o) => {
    cy += answerRow(f, x, cy, w, o[0], o[1]);
  });
  if (withOwn) {
    const own = rect(f, x, cy, w, 44, C.WHITE, 10);
    try { own.strokes = [{ strokeColor: C.INK3, strokeOpacity: 1, strokeWidth: 1, strokeAlignment: 'inner', strokeStyle: 'dashed' }]; } catch (_) { /* сплошная */ }
    own.name = 'own-variant / beta';
    txt(f, x + 16, cy + 13, 'Написать свой вариант…', 13, 400, C.INK3);
    const b = rect(f, x + w - 58, cy + 10, 44, 24, '#EFF6FF', 12);
    b.name = 'badge-beta';
    const t = txt(f, x + w - 50, cy + 14, 'beta', 11, 600, C.ACCENT);
    void t;
    cy += 56;
  }
  return cy - y;
}

function historyPanel(f: any, x: number, y: number, w: number): number {
  const h = 372;
  cardBox(f, x, y, w, h, 'card/history');
  txt(f, x + 16, y + 16, 'История реплик', 14, 600, C.INK);
  txt(f, x + w - 60, y + 18, 'шаг 3/7', 11, 400, C.INK3);
  let cy = y + 48;
  const msgs: [string, 'l' | 'r'][] = [
    ['Здравствуйте… я не знаю, с чего начать.', 'l'],
    ['Расскажите, что вы чувствуете сейчас?', 'r'],
    ['Как будто всё идёт не так. Я устала.', 'l'],
    ['Усталость — от чего она у вас?', 'r'],
    ['От работы. И от того, что всё откладываю.', 'l'],
  ];
  msgs.forEach((m) => {
    const bh = 40;
    const b = rect(f, x + 16, cy, w - 32, bh, m[1] === 'l' ? C.BG2 : '#EFF6FF', 8);
    b.name = 'history-bubble';
    txt(f, x + 26, cy + 8, m[0].slice(0, 30), 10, 400, m[1] === 'l' ? C.INK : '#1D4ED8');
    txt(f, x + 26, cy + 24, m[0].slice(30).trim() || ' ', 10, 400, m[1] === 'l' ? C.INK : '#1D4ED8');
    cy += bh + 8;
  });
  return h;
}

function filterChips(f: any, x: number, y: number, maxW: number): number {
  const chips: [string, boolean, string | null][] = [
    ['Все навыки', true, null], ['эмпатия', false, '#7C3AED'], ['сопротивление', false, '#EA580C'],
    ['границы', false, '#0891B2'], ['вопрошание', false, '#0EA5E9'], ['рефлексия', false, '#9333EA'],
  ];
  let cx = x;
  let cy = y;
  chips.forEach((cdef) => {
    const cwd = Math.round(cdef[0].length * 6.8) + (cdef[1] ? 30 : 34);
    if (cx + cwd > x + maxW) { cx = x; cy += 40; }
    const selected = cdef[1];
    const chipEl = rect(f, cx, cy, cwd, 30, selected ? C.ACCENT : C.WHITE, 15);
    if (!selected) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'filter-chip';
    if (cdef[2]) makeEllipse(f, cx + 11, cy + 11, 8, 8, cdef[2] as string);
    const tx = cdef[2] ? cx + 25 : cx + 12;
    txt(f, tx, cy + 8, cdef[0], 12, selected ? 600 : 500, selected ? '#FFFFFF' : C.INK2);
    if (selected) ic(f, 'x', cx + cwd - 20, cy + 8, 14, '#FFFFFF');
    cx += cwd + 10;
  });
  return cy + 40 - y;
}

function sortRow(f: any, x: number, y: number, w: number): void {
  txt(f, x, y, 'Сложность', 12, 500, C.INK2);
  ['1–2', '3', '4–5'].forEach((s, i) => {
    const bx = x + 90 + i * 56;
    const sel = i === 1;
    const bEl = rect(f, bx, y - 4, 48, 26, sel ? C.BG3 : C.WHITE, 13);
    setStroke(bEl, C.BD, 1, 'inner');
    const t = txt(f, bx + 14, y + 1, s, 12, sel ? 600 : 400, sel ? C.INK : C.INK2);
    void t;
  });
  txt(f, x + 270, y, 'Длительность', 12, 500, C.INK2);
  ['до 10', '10–20', '20+'].forEach((s, i) => {
    const bx = x + 370 + i * 64;
    const sel = i === 1;
    const bEl = rect(f, bx, y - 4, 56, 26, sel ? C.BG3 : C.WHITE, 13);
    setStroke(bEl, C.BD, 1, 'inner');
    txt(f, bx + 10, y + 1, s, 12, sel ? 600 : 400, sel ? C.INK : C.INK2);
  });
}

// ---------------------------------------------------------------------------
// E-20 Библиотека сценариев
// ---------------------------------------------------------------------------

function e20(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Библиотека сценариев');
  let y = box.cy;
  const W = box.cw;

  // поиск
  const searchW = m.kind === 'mobile' ? W : 420;
  const sf = rect(f, box.cx, y, searchW, 40, C.WHITE, 8);
  setStroke(sf, C.BD, 1, 'inner');
  sf.name = 'Input / search';
  ic(f, 'search', box.cx + 12, y + 12, 16, C.INK3);
  txt(f, box.cx + 36, y + 10, 'Сценарий или навык…', 14, 400, C.INK3);
  if (m.kind !== 'mobile') {
    ic(f, 'sliders-horizontal', box.cx + searchW + 24, y + 10, 20, C.INK2);
    txt(f, box.cx + searchW + 50, y + 12, 'Фильтры', 13, 500, C.INK2);
    txt(f, box.cx + W - 120, y + 12, '24 сценария', 13, 500, C.INK3);
  }
  y += 56;

  // фильтры
  y += filterChips(f, box.cx, y, W);
  if (m.kind === 'desktop') { sortRow(f, box.cx, y, W); y += 44; }

  // сетка карточек
  const cols = m.kind === 'desktop' ? 3 : m.kind === 'tablet' ? 2 : 1;
  const gap = 20;
  const cardW = Math.round((W - gap * (cols - 1)) / cols);
  const cards: [number, 'd' | 'c' | 'l'][] = [
    [4, 'd'], [2, 'd'], [3, 'l'], [5, 'd'], [3, 'c'], [4, 'l'],
  ];
  cards.forEach((cdef, i) => {
    const cx = box.cx + (i % cols) * (cardW + gap);
    const cy = y + Math.floor(i / cols) * 240;
    if (cdef[1] === 'd') {
      // default-карточка на ширину колонки (масштабируем координаты)
      scenarioCardDefault(f, cx, cy, F2);
      if (cardW !== 320) {
        // подгоняем ширину базовой карточки
        try { const card = f.children && null; } catch (_) { /* noop */ }
      }
    } else if (cdef[1] === 'l') {
      scenarioCardLocked(f, cx, cy, F2);
    } else {
      scenarioCardCompact(f, cx, cy, F2);
    }
  });
  void gap;
}

// ---------------------------------------------------------------------------
// E-21 Карточка сценария
// ---------------------------------------------------------------------------

function e21(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сценарий');
  let y = box.cy;
  const W = box.cw;

  txt(f, box.cx, y, '←  Библиотека', 13, 500, C.ACCENT);
  y += 36;

  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round((W - 24) * 0.62) : W;

  // главная карточка
  const ch = 300;
  cardBox(f, box.cx, y, mainW, ch, 'ScenarioCard / detail');
  txt(f, box.cx + 24, y + 20, 'Работа с сопротивлением', 22, 700, C.INK);
  txt(f, box.cx + 24, y + 52, 'Клиент 34 года, избегает темы развода, переводит разговор,', 14, 400, C.INK2);
  txt(f, box.cx + 24, y + 72, 'отшучивается, обесценивает важность проблемы. Ваша задача —', 14, 400, C.INK2);
  txt(f, box.cx + 24, y + 92, 'удержать фокус и работать с сопротивлением без давления.', 14, 400, C.INK2);
  // метаданные
  for (let i = 0; i < 5; i++) makeEllipse(f, box.cx + 24 + i * 16, y + 122, 9, 9, i < 4 ? C.ACCENT : C.BG3);
  txt(f, box.cx + 110, y + 118, 'сложность 4/5', 12, 400, C.INK3);
  ic(f, 'clock', box.cx + 24, y + 148, 15, C.INK3);
  txt(f, box.cx + 46, y + 145, '15 мин · 7 шагов', 12, 400, C.INK2);
  ic(f, 'message-circle', box.cx + 160, y + 148, 15, C.INK3);
  txt(f, box.cx + 182, y + 145, 'ИИ-клиент «Марина»', 12, 400, C.INK2);
  // навыки
  let chx = box.cx + 24;
  const skills: [string, string][] = [['сопротивление', '#EA580C'], ['границы', '#0891B2'], ['эмпатия', '#7C3AED']];
  skills.forEach((sk) => {
    const cwd = Math.round(sk[0].length * 6.8) + 34;
    const chipEl = rect(f, chx, y + 176, cwd, 28, C.WHITE, 14);
    setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'chip';
    makeEllipse(f, chx + 11, y + 184, 8, 8, sk[1]);
    txt(f, chx + 25, y + 181, sk[0], 12, 500, C.INK2);
    chx += cwd + 10;
  });
  // CTA
  btn(f, box.cx + 24, y + ch - 66, 180, 'Начать сценарий', 'primary', { icon: 'play', h: 44 });
  btn(f, box.cx + 220, y + ch - 66, 140, 'В демо', 'secondary', { h: 44 });
  txt(f, box.cx + 380, y + ch - 50, 'пройден 2 раза · лучший балл 86', 12, 400, C.INK3);
  y += ch + 20;

  // правая колонка: что тренируем
  const sideX = isDesktop ? box.cx + mainW + 24 : box.cx;
  const sideW = isDesktop ? W - mainW - 24 : W;
  cardBox(f, sideX, y - (isDesktop ? 0 : 0), sideW, 236, 'card/skills');
  txt(f, sideX + 20, y + 16, 'Что тренируем', 15, 600, C.INK);
  skillBarRow(f, sideX + 20, y + 50, sideW - 40, 'Сопротивление', 49, '#EA580C');
  skillBarRow(f, sideX + 20, y + 94, sideW - 40, 'Границы', 64, '#0891B2');
  skillBarRow(f, sideX + 20, y + 138, sideW - 40, 'Эмпатия', 72, '#7C3AED');
  txt(f, sideX + 20, y + 188, 'Рекомендовано: средний балл по этим', 12, 400, C.INK3);
  txt(f, sideX + 20, y + 206, 'навыкам ниже 75', 12, 400, C.INK3);
  y += (isDesktop ? 0 : 256);
}

// ---------------------------------------------------------------------------
// E-22 Сессия — активная
// ---------------------------------------------------------------------------

function sessionBody(f: any, x: number, y: number, w: number, mode: 'chat' | 'free'): number {
  let cy = y;
  cy += sessionTop(f, x, cy, w, 3, 7, 'Уточнение запроса');
  // эмоция
  emotionIndicatorCompact(f, x, cy, F2);
  cy += 60;
  if (mode === 'free') {
    // textarea
    const ta = rect(f, x, cy, w, 96, C.WHITE, 10);
    setStroke(ta, C.ACCENT, 2, 'inner');
    ta.name = 'Input / textarea / focus';
    txt(f, x + 14, cy + 12, 'Ваш ответ клиенту…', 14, 400, C.INK3);
    txt(f, x + 14, cy + 70, 'beta · свободный ввод', 11, 500, C.ACCENT);
    txt(f, x + w - 74, cy + 70, '184 / 500', 11, 400, C.INK3);
    cy += 110;
    btn(f, x + w - 140, cy, 140, 'Отправить', 'primary', { icon: 'send', h: 44 });
    cy += 60;
    return cy - y;
  }
  cy += bubble(f, x, cy, Math.min(w - 20, 430), 'Я не знаю, с чего начать… Как будто', 'всё идёт не так, и я уже не справляюсь.', 'left') + 24;
  ic(f, 'frown', x + 2, cy, 14, C.ERROR);
  txt(f, x + 22, cy - 2, 'эмоция 3/10 · низкий фон', 11, 500, C.ERROR);
  cy += 26;
  cy += bubble(f, x + (w > 500 ? 60 : 20), cy, Math.min(w - 80, 400), 'Расскажите, что вы чувствуете, когда', 'говорите об этом?', 'right') + 20;
  cy += answerStack(f, x, cy, w, [
    ['Отражаю чувство: «Похоже, сейчас для вас всё слишком»', 'эмпатия'],
    ['Что для вас значит «не справляетесь»?', 'вопрошание'],
    ['Молчу и выдерживаю паузу', 'выдерживание паузы'],
  ], true);
  return cy - y;
}

function e22(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сессия');
  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
  const histW = 280;
  sessionBody(f, box.cx, box.cy, mainW, 'chat');
  if (isDesktop) {
    historyPanel(f, box.cx + mainW + 24, box.cy, histW);
  }
}

// ---------------------------------------------------------------------------
// E-23 Сессия — свободный ввод
// ---------------------------------------------------------------------------

function e23(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сессия · свой вариант');
  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
  sessionBody(f, box.cx, box.cy, mainW, 'free');
  if (isDesktop) {
    historyPanel(f, box.cx + mainW + 24, box.cy, 280);
  }
}

// ---------------------------------------------------------------------------
// E-24 Сессия — пауза
// ---------------------------------------------------------------------------

function e24(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сессия');
  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
  sessionBody(f, box.cx, box.cy, mainW, 'chat');
  if (isDesktop) historyPanel(f, box.cx + mainW + 24, box.cy, 280);

  // затемнение
  const ov = rect(f, 0, 0, m.w, m.h, C.INK, 0);
  try { ov.fills = [{ fillColor: C.INK, fillOpacity: 0.5 }]; } catch (_) { /* непрозрачно */ }
  ov.name = 'Modal / backdrop';
  // модалка
  const mw = m.kind === 'mobile' ? m.w - 32 : 400;
  const mx = Math.round((m.w - mw) / 2);
  const my = Math.round(m.h / 2 - 130);
  const card = rect(f, mx, my, mw, 260, C.WHITE, 16);
  setShadow(card, 0, 12, 32, 0.2);
  card.name = 'Modal / sm / pause';
  txt(f, mx + 24, my + 24, 'Пауза', 20, 700, C.INK);
  txt(f, mx + 24, my + 56, 'Сессия приостановлена на шаге 3 из 7.', 14, 400, C.INK2);
  txt(f, mx + 24, my + 76, 'Прогресс сохранён автоматически.', 14, 400, C.INK2);
  btn(f, mx + 24, my + 112, mw - 48, 'Продолжить', 'primary', { h: 44 });
  btn(f, mx + 24, my + 168, mw - 48, 'Завершить сессию', 'secondary', { h: 44 });
  txt(f, mx + 24, my + 228, 'Завершённая сессия попадёт в разбор', 11, 400, C.INK3);
}

// ---------------------------------------------------------------------------
// E-25 Разбор — итог
// ---------------------------------------------------------------------------

function e25(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Разбор сессии');
  let y = box.cy;
  const W = box.cw;
  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round((W - 24) * 0.58) : W;

  // итоговая карточка
  const heroH = 210;
  cardBox(f, box.cx, y, mainW, heroH, 'card/result');
  txt(f, box.cx + 24, y + 20, 'Сценарий «Работа с сопротивлением» · 15 мин', 12, 500, C.INK3);
  txt(f, box.cx + 24, y + 44, '78', 56, 700, C.INK);
  txt(f, box.cx + 118, y + 74, '/ 100', 20, 600, C.INK3);
  const badge = rect(f, box.cx + 210, y + 58, 132, 30, '#DCFCE7', 15);
  badge.name = 'badge/improved';
  ic(f, 'circle-check', box.cx + 220, y + 65, 16, '#166534');
  txt(f, box.cx + 242, y + 64, '+6 к прошлому', 12, 600, '#166534');
  txt(f, box.cx + 24, y + 122, 'Очки: +120 · критических ошибок нет', 13, 500, C.INK2);
  // достижения
  const ach: [string, string][] = [['trophy', 'Сценарий пройден'], ['zap', 'Серия 5 дней']];
  let axx = box.cx + 24;
  ach.forEach((a) => {
    const awd = Math.round(a[1].length * 6.6) + 46;
    const t = rect(f, axx, y + 150, awd, 32, '#FEF3C7', 16);
    t.name = 'achievement-chip';
    ic(f, a[0], axx + 10, y + 157, 18, '#B45309');
    txt(f, axx + 34, y + 158, a[1], 12, 500, '#92400E');
    axx += awd + 10;
  });
  y += heroH + 20;

  // критическая ошибка — как предупреждение (мягкий вариант)
  const warnH = 92;
  const wcard = rect(f, box.cx, y, mainW, warnH, '#FFFBEB', 12);
  setStroke(wcard, '#FDE68A', 1, 'inner');
  wcard.name = 'CriticalErrorBanner / warning';
  rect(f, box.cx, y + 10, 4, warnH - 20, C.WARNING, 2);
  ic(f, 'triangle-alert', box.cx + 20, y + 18, 20, C.WARNING);
  txt(f, box.cx + 52, y + 14, 'Почти критично: дважды уходили от эмоции', 13, 600, '#92400E');
  txt(f, box.cx + 52, y + 36, 'На шагах 4 и 6 вы переводили разговор на факты, когда клиент', 12, 400, '#92400E');
  txt(f, box.cx + 52, y + 54, 'говорил о чувствах. В следующий раз отразите чувство до вопроса.', 12, 400, '#B45309');
  y += warnH + 20;

  // радар
  const radH = 300;
  cardBox(f, box.cx, y, mainW, radH, 'card/radar');
  txt(f, box.cx + 20, y + 16, 'Навыки сессии', 16, 600, C.INK);
  try {
    const o = getOrigin();
    const svg = penpot.createShapeFromSvg(radarSvg(230));
    if (svg) { f.appendChild(svg); svg.x = o.x + box.cx + 30; svg.y = o.y + y + 50; svg.name = 'radar'; }
  } catch (_) { /* опционально */ }
  const skx = box.cx + 290;
  [[86, 'Слушание', '#2563EB'], [72, 'Эмпатия', '#7C3AED'], [49, 'Сопрот.', '#EA580C'], [68, 'Рефлексия', '#9333EA']].forEach((s, i) => {
    skillBarRow(f, skx, y + 60 + i * 46, mainW - 320, s[1] as string, s[0] as number, s[2] as string);
  });
  y += radH + 20;

  // CTA
  if (m.kind === 'mobile') {
    btn(f, box.cx, y, W, 'Следующий сценарий', 'primary', { icon: 'arrow-right', h: 48 });
    y += 60;
    btn(f, box.cx, y, W, 'Повторить', 'secondary', { icon: 'rotate-ccw', h: 44 });
    y += 56;
    btn(f, box.cx, y, (W - 12) / 2, 'Поделиться', 'secondary', { icon: 'share-2', h: 44 });
    btn(f, box.cx + (W + 12) / 2, y, (W - 12) / 2, 'PDF', 'secondary', { icon: 'download', h: 44 });
  } else {
    btn(f, box.cx, y, 220, 'Следующий сценарий', 'primary', { icon: 'arrow-right', h: 48 });
    btn(f, box.cx + 236, y, 160, 'Повторить', 'secondary', { icon: 'rotate-ccw', h: 48 });
    btn(f, box.cx + 412, y, 150, 'Поделиться', 'secondary', { icon: 'share-2', h: 48 });
    btn(f, box.cx + 578, y, 150, 'Скачать PDF', 'secondary', { icon: 'download', h: 48 });
  }

  if (isDesktop) {
    // правая колонка: детали моментов
    const dx = box.cx + mainW + 24;
    const dw = W - mainW - 24;
    cardBox(f, dx, box.cy, dw, 420, 'card/moments');
    txt(f, dx + 20, box.cy + 18, 'Ключевые моменты', 15, 600, C.INK);
    const moments: [string, string, string][] = [
      ['ok', 'Шаг 2 · Отражение чувства', '«Похоже, сейчас всё слишком» — клиент раскрылся'],
      ['ok', 'Шаг 5 · Пауза выдержана', 'Дали клиенту пространство, он вернулся к теме сам'],
      ['warn', 'Шаг 4 · Уход от эмоции', 'Перевели на факты — отразите чувство до вопроса'],
      ['warn', 'Шаг 6 · Закрытый вопрос', '«Вы устали?» — лучше открытое: «Что вы чувствуете?»'],
    ];
    moments.forEach((mo, i) => {
      const my2 = box.cy + 52 + i * 88;
      if (mo[0] === 'ok') {
        ic(f, 'circle-check', dx + 20, my2, 18, C.SUCCESS);
      } else {
        ic(f, 'triangle-alert', dx + 20, my2, 18, C.WARNING);
      }
      txt(f, dx + 46, my2 - 2, mo[1], 12, 600, C.INK);
      txt(f, dx + 46, my2 + 18, mo[2].slice(0, 40), 11, 400, C.INK2);
      txt(f, dx + 46, my2 + 34, mo[2].slice(40) || ' ', 11, 400, C.INK2);
    });
    txt(f, dx + 20, box.cy + 402, 'Полный разбор →', 13, 500, C.ACCENT);
  }
}

// ---------------------------------------------------------------------------
// E-26 Разбор — детали
// ---------------------------------------------------------------------------

function e26(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Разбор · детали');
  let y = box.cy;
  const W = box.cw;

  txt(f, box.cx, y, '←  К итогам', 13, 500, C.ACCENT);
  y += 34;
  txt(f, box.cx, y, 'Работа с сопротивлением · разбор', 20, 700, C.INK);
  y += 40;

  // что сработало
  const okH = 168;
  cardBox(f, box.cx, y, W, okH, 'card/worked');
  txt(f, box.cx + 20, y + 16, 'Что сработало', 15, 600, '#166534');
  const okItems: [string, string][] = [
    ['Шаг 2 · Отражение чувства', '«Похоже, сейчас для вас всё слишком» — клиент раскрылся и перешёл к главному.'],
    ['Шаг 5 · Выдержанная пауза', 'Вы не заполнили тишину — клиент сам вернулся к теме и уточнил запрос.'],
  ];
  okItems.forEach((it, i) => {
    const iy = y + 48 + i * 58;
    ic(f, 'circle-check', box.cx + 20, iy, 18, C.SUCCESS);
    txt(f, box.cx + 48, iy - 2, it[0], 13, 600, C.INK);
    txt(f, box.cx + 48, iy + 18, it[1].slice(0, Math.floor(W / 5.6)), 12, 400, C.INK2);
  });
  y += okH + 16;

  // что улучшить
  const imH = 168;
  cardBox(f, box.cx, y, W, imH, 'card/improve');
  txt(f, box.cx + 20, y + 16, 'Что улучшить', 15, 600, '#92400E');
  const imItems: [string, string][] = [
    ['Шаг 4 · Уход от эмоции', 'Дважды переводили разговор на факты. Отражайте чувство до вопроса.'],
    ['Шаг 6 · Закрытый вопрос', '«Вы устали?» закрывает разговор. Открытое: «Что вы чувствуете сейчас?»'],
  ];
  imItems.forEach((it, i) => {
    const iy = y + 48 + i * 58;
    ic(f, 'triangle-alert', box.cx + 20, iy, 18, C.WARNING);
    txt(f, box.cx + 48, iy - 2, it[0], 13, 600, C.INK);
    txt(f, box.cx + 48, iy + 18, it[1].slice(0, Math.floor(W / 5.6)), 12, 400, C.INK2);
  });
  y += imH + 16;

  // альтернативные ходы
  const altH = 150;
  cardBox(f, box.cx, y, W, altH, 'card/alternatives');
  txt(f, box.cx + 20, y + 16, 'Альтернативные удачные ходы · шаг 4', 15, 600, C.INK);
  const alt = rect(f, box.cx + 20, y + 46, W - 40, 84, '#F0FDF4', 12);
  setStroke(alt, C.SUCCESS, 2, 'inner');
  alt.name = 'AnswerOption / correct / alternative';
  txt(f, box.cx + 34, y + 58, '«Звучит, как вы держитесь из последних сил. Как это — нести', 13, 400, C.INK);
  txt(f, box.cx + 34, y + 78, 'это всё самостоятельно?»', 13, 400, C.INK);
  const tech = rect(f, box.cx + 34, y + 98, 150, 24, C.WHITE, 12);
  setStroke(tech, C.BD, 1, 'inner');
  makeEllipse(f, box.cx + 42, y + 106, 8, 8, '#7C3AED');
  txt(f, box.cx + 56, y + 101, 'эмпатия · валидация', 11, 500, '#6D28D9');
}

// ---------------------------------------------------------------------------
// E-27 История сессий
// ---------------------------------------------------------------------------

function e27(f: any, m: Mode): void {
  const box = shell(f, m, 4, 'История сессий');
  let y = box.cy;
  const W = box.cw;

  const rows: [string, string, number, string, string, string][] = [
    ['16.09 · 14:00', 'Работа с сопротивлением', 78, '15 мин', 'done', 'Разбор'],
    ['14.09 · 12:30', 'Первичная консультация', 74, '18 мин', 'done', 'Разбор'],
    ['12.09 · 18:00', 'Активное слушание', 91, '12 мин', 'done', 'Разбор'],
    ['10.09 · 11:00', 'Границы и контракт', 68, '21 мин', 'paused', 'Продолжить'],
    ['08.09 · 09:30', 'Циркулярные вопросы', 82, '14 мин', 'done', 'Разбор'],
    ['05.09 · 16:00', 'Эмпатия в конфликте', 61, '19 мин', 'done', 'Разбор'],
  ];
  const rowH = 52;
  const tableH = 56 + rows.length * rowH + 64;
  cardBox(f, box.cx, y, W, tableH, 'card/history-table');
  // шапка
  const hy = y + 14;
  txt(f, box.cx + 20, hy, 'ДАТА', 11, 500, C.INK3);
  txt(f, box.cx + 130, hy, 'СЦЕНАРИЙ', 11, 500, C.INK3);
  if (m.kind !== 'mobile') {
    txt(f, box.cx + Math.round(W * 0.55), hy, 'БАЛЛ', 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W * 0.55) + 80, hy, 'ВРЕМЯ', 11, 500, C.INK3);
  }
  ic(f, 'chevron-up', box.cx + Math.round(W * 0.55) + 46, hy + 1, 13, C.ACCENT);
  txt(f, box.cx + W - 90, hy, 'ДЕЙСТВИЕ', 11, 500, C.INK3);
  rows.forEach((r, i) => {
    const ry = y + 52 + i * rowH;
    txt(f, box.cx + 20, ry + 8, r[0], 12, 400, C.INK3);
    txt(f, box.cx + 130, ry + 7, r[1], 13, 500, C.INK);
    if (m.kind !== 'mobile') {
      const col = r[2] >= 80 ? '#166534' : r[2] >= 70 ? C.INK : '#B45309';
      txt(f, box.cx + Math.round(W * 0.55), ry + 7, String(r[2]), 14, 700, col);
      txt(f, box.cx + Math.round(W * 0.55) + 80, ry + 8, r[3], 12, 400, C.INK2);
    } else {
      txt(f, box.cx + W - 168, ry + 8, String(r[2]), 14, 700, r[2] >= 70 ? C.INK : '#B45309');
    }
    const isPaused = r[4] === 'paused';
    const btnW = m.kind === 'mobile' ? 76 : 92;
    const bEl = rect(f, box.cx + W - 20 - btnW, ry + 4, btnW, 28, isPaused ? C.ACCENT : C.BG2, 14);
    if (isPaused) { /* primary */ } else setStroke(bEl, C.BD, 1, 'inner');
    bEl.name = 'Button / sm / ' + (isPaused ? 'primary' : 'secondary');
    txt(f, box.cx + W - 14 - btnW, ry + 9, isPaused ? 'Продолжить' : 'Открыть', 11, 600, isPaused ? '#FFFFFF' : C.INK2);
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 4, W - 40, 1, C.BD, 0);
  });
  // пагинация
  const py = y + 52 + rows.length * rowH + 14;
  ic(f, 'chevron-left', box.cx + 20, py + 5, 14, C.INK3);
  [1, 2, 3].forEach((p) => {
    const px = box.cx + 48 + (p - 1) * 32;
    if (p === 1) {
      const pg = rect(f, px, py, 24, 24, C.ACCENT, 6);
      pg.name = 'pagination/active';
      txt(f, px + 8, py + 4, '1', 12, 600, '#FFFFFF');
    } else {
      txt(f, px + 8, py + 4, String(p), 12, 400, C.INK2);
    }
  });
  txt(f, box.cx + 48 + 3 * 32, py + 4, '…', 12, 400, C.INK3);
  ic(f, 'chevron-right', box.cx + 48 + 3 * 32 + 24, py + 5, 14, C.INK2);
  y += tableH + 20;

  // экспорт
  if (m.kind !== 'mobile') {
    btn(f, box.cx, y, 180, 'Экспорт CSV', 'secondary', { icon: 'download', h: 40 });
    btn(f, box.cx + 196, y, 180, 'Экспорт PDF', 'secondary', { icon: 'file-text', h: 40 });
  }
}

// ---------------------------------------------------------------------------
// E-28 Прогресс по навыкам
// ---------------------------------------------------------------------------

function e28(f: any, m: Mode): void {
  const box = shell(f, m, 4, 'Прогресс');
  let y = box.cy;
  const W = box.cw;
  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round((W - 24) * 0.55) : W;

  // радар
  const radH = 340;
  cardBox(f, box.cx, y, mainW, radH, 'card/radar');
  txt(f, box.cx + 20, y + 16, 'Радар навыков', 16, 600, C.INK);
  txt(f, box.cx + mainW - 130, y + 18, 'средний 71/100', 12, 500, C.INK2);
  try {
    const o = getOrigin();
    const svg = penpot.createShapeFromSvg(radarSvg(240));
    if (svg) { f.appendChild(svg); svg.x = o.x + box.cx + Math.round((mainW - 240) / 2); svg.y = o.y + y + 52; svg.name = 'radar'; }
  } catch (_) { /* опционально */ }
  y += radH + 20;

  // динамика (line chart)
  const chH = 220;
  cardBox(f, box.cx, y, mainW, chH, 'card/dynamics');
  txt(f, box.cx + 20, y + 16, 'Динамика среднего балла', 16, 600, C.INK);
  txt(f, box.cx + mainW - 150, y + 18, '12 недель', 12, 400, C.INK3);
  try {
    const o = getOrigin();
    const svg = penpot.createShapeFromSvg(lineChartSvg(mainW - 40, 140, [58, 61, 60, 64, 66, 65, 69, 70, 68, 71, 74, 71], C.ACCENT));
    if (svg) { f.appendChild(svg); svg.x = o.x + box.cx + 20; svg.y = o.y + y + 56; svg.name = 'line-chart'; }
  } catch (_) { /* опционально */ }
  y += chH + 20;

  // список навыков
  const listH = 400;
  const listX = isDesktop ? box.cx + mainW + 24 : box.cx;
  const listW = isDesktop ? W - mainW - 24 : W;
  cardBox(f, listX, isDesktop ? box.cy : y, listW, listH, 'card/skills');
  const ly = isDesktop ? box.cy : y;
  txt(f, listX + 20, ly + 16, 'Навыки', 16, 600, C.INK);
  const data: [string, number, string, number][] = [
    ['Активное слушание', 86, '#2563EB', 12], ['Вопросы', 81, '#0EA5E9', 9],
    ['Структура', 77, '#65A30D', 5], ['Эмпатия', 72, '#7C3AED', 8],
    ['Рефлексия', 68, '#9333EA', 4], ['Границы', 64, '#0891B2', 6],
    ['Эмоции', 58, '#DB2777', 3], ['Сопротивление', 49, '#EA580C', 7],
  ];
  data.forEach((d, i) => {
    const ry = ly + 52 + i * 42;
    txt(f, listX + 20, ry, d[0], 12, 500, C.INK2);
    txt(f, listX + listW - 96, ry - 2, String(d[1]), 13, 700, C.INK);
    txt(f, listX + listW - 60, ry, '+' + d[3], 11, 500, C.SUCCESS);
    rect(f, listX + 20, ry + 20, listW - 104, 5, C.BG3, 3);
    rect(f, listX + 20, ry + 20, Math.max(6, Math.round((listW - 104) * d[1] / 100)), 5, d[2], 3);
  });
}

// ---------------------------------------------------------------------------
// Реестр и сборка
// ---------------------------------------------------------------------------

interface Screen2Def { code: string; title: string; mobileH?: number; draw: (f: any, m: Mode) => void }

const SCREENS2: Screen2Def[] = [
  { code: 'E-20', title: 'Библиотека сценариев', mobileH: 1400, draw: e20 },
  { code: 'E-21', title: 'Карточка сценария', mobileH: 1000, draw: e21 },
  { code: 'E-22', title: 'Сессия', draw: e22 },
  { code: 'E-23', title: 'Сессия · свободный ввод', draw: e23 },
  { code: 'E-24', title: 'Сессия · пауза', draw: e24 },
  { code: 'E-25', title: 'Разбор', mobileH: 1180, draw: e25 },
  { code: 'E-26', title: 'Разбор · детали', mobileH: 1000, draw: e26 },
  { code: 'E-27', title: 'История сессий', mobileH: 980, draw: e27 },
  { code: 'E-28', title: 'Прогресс навыков', mobileH: 1220, draw: e28 },
];

export const SCREEN2_FRAME_NAMES: string[] = SCREENS2
  .flatMap((s) => ['1440', '768', '390'].map((bp) => s.code + ' ' + s.title + ' / ' + bp));

export function buildScreens2(log: string[]): void {
  F2 = pickFont(FONT_FALLBACKS);
  const SX = 4620 + 1440 + 240; // колонка правее экранов итерации 4
  let y = 100;
  for (const s of SCREENS2) {
    const modes: [Mode, string][] = [[D, '1440'], [T, '768'], [MB, '390']];
    for (const mm of modes) {
      const h = (mm[0].kind === 'mobile' && s.mobileH) ? s.mobileH : mm[0].h;
      const mode: Mode = { w: mm[0].w, h, kind: mm[0].kind };
      const f = openFrame(s.code + ' ' + s.title + ' / ' + mm[1], SX, y, mode.w, h);
      try { s.draw(f, mode); } catch (e) { log.push('× ' + s.code + '/' + mm[1] + ': ' + e); }
    }
    y += 1300;
  }
}
