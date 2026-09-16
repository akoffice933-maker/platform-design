// Telegram Mini App (Итерация 7 ТЗ, раздел 5.6): E-50…E-57 — клиент в Telegram.
// Только 390, тёмная тема по умолчанию (ТЗ 11.1), safe areas:
// сверху 56px — шапка Telegram, снизу 80px — MainButton или BottomNav. 9 фреймов.

declare const penpot: any;

import { C } from './tokens-data';
import { makeEllipse, setStroke } from './draw';
import { MB, openFrame, txt, rect, ic, avatar, btn } from './screens';

const W = 390;
const H = MB.h; // 844
const TG_H = 56; // safe area top: нативная шапка Telegram
const BTM_H = 80; // safe area bottom: MainButton / BottomNav + home indicator
const ZONE_Y = H - BTM_H; // 764

let F4: any = null;
void F4;

// ---------------------------------------------------------------------------
// Хелперы TMA
// ---------------------------------------------------------------------------

function centerTxt(t: any, x: number, w: number): void {
  try { if (t && typeof t.width === 'number' && t.width > 0) t.x = t.x + (w - t.width) / 2; } catch (_) { /* as-is */ }
}

function dots(f: any, x: number, y: number): void { // «⋯» меню Telegram
  for (let i = 0; i < 3; i++) makeEllipse(f, x + i * 8, y, 4, 4, C.D_INK2);
}

function homeIndicator(f: any): void {
  const hi = rect(f, Math.round((W - 134) / 2), 830, 134, 5, '#F8FAFC', 3);
  hi.name = 'home-indicator';
  try { hi.fills[0].fillOpacity = 0.35; } catch (_) { /* mock */ }
}

// Шапка Telegram: safe area 56px
function tgHeader(f: any, title: string): void {
  rect(f, 0, 0, W, TG_H, '#0E1826', 0).name = 'tg-header / safe-area 56';
  txt(f, 16, 19, 'Закрыть', 14, 500, '#60A5FA');
  const t = txt(f, 0, 19, title, 15, 600, C.D_INK);
  centerTxt(t, 0, W);
  dots(f, W - 40, 26);
}

// MainButton (нативная кнопка бота): safe area 80px
function mainBtn(f: any, label: string, enabled: boolean): void {
  rect(f, 0, ZONE_Y, W, BTM_H, C.D_BG, 0).name = 'mainbutton-zone / safe-area 80';
  const b = rect(f, 16, 772, W - 32, 48, enabled ? C.ACCENT : '#1E293B', 12);
  b.name = 'MainButton / ' + (enabled ? 'enabled' : 'disabled');
  const t = txt(f, 0, 791, label, 15, 600, enabled ? '#FFFFFF' : C.D_INK2);
  centerTxt(t, 16, W - 32);
  homeIndicator(f);
}

const NAV: [string, string][] = [
  ['home', 'Главная'], ['sparkles', 'Игры'], ['book-open', 'Дневник'],
  ['chart-column', 'Прогресс'], ['user', 'Профиль'],
];

// BottomNav (5 вкладок): safe area 80px = 56 nav + 24 home indicator
function bottomNav(f: any, active: number): void {
  rect(f, 0, ZONE_Y, W, BTM_H, C.D_BG2, 0).name = 'bottomnav-zone / safe-area 80';
  rect(f, 0, ZONE_Y, W, 1, C.D_BD, 0);
  NAV.forEach((n, i) => {
    const cx = 39 + i * 78;
    const on = i === active;
    ic(f, n[0], cx - 10, 776, 20, on ? C.ACCENT : C.D_INK2);
    const t = txt(f, 0, 802, n[1], 10, on ? 600 : 400, on ? C.ACCENT : C.D_INK2);
    centerTxt(t, cx - 34, 68);
  });
  homeIndicator(f);
}

function tmaProgress(f: any, x: number, y: number, cur: number, total: number): void {
  txt(f, x, y, 'ШАГ ' + cur + ' ИЗ ' + total, 10, 500, C.D_INK2);
  rect(f, x, y + 18, W - 48, 6, C.D_BD, 3);
  rect(f, x, y + 18, Math.round((W - 48) * cur / total), 6, C.ACCENT, 3).name = 'progress-fill';
}

function toggle(f: any, x: number, y: number, on: boolean): void {
  const p = rect(f, x, y, 40, 22, on ? C.ACCENT : '#334155', 11);
  p.name = 'switch / ' + (on ? 'on' : 'off');
  makeEllipse(f, x + (on ? 20 : 2), y + 2, 18, 18, '#FFFFFF');
}

function card(f: any, x: number, y: number, w: number, h: number, name: string): void {
  const c = rect(f, x, y, w, h, C.D_BG2, 14);
  setStroke(c, C.D_BD, 1, 'inner');
  c.name = name;
}

// ---------------------------------------------------------------------------
// E-50 Онбординг
// ---------------------------------------------------------------------------

function e50(f: any): void {
  tgHeader(f, 'Platform');
  const lg = rect(f, (W - 64) / 2, 150, 64, 64, C.ACCENT, 16);
  lg.name = 'logo-mark';
  ic(f, 'brain', (W - 64) / 2 + 16, 166, 32, '#FFFFFF');
  let cy = 244;
  const t1 = txt(f, 0, cy, 'Пространство спокойствия', 22, 700, C.D_INK);
  centerTxt(t1, 0, W);
  cy += 34;
  const t2 = txt(f, 0, cy, 'Игры и практики, которые подобрал', 13, 400, C.D_INK2);
  centerTxt(t2, 0, W);
  cy += 20;
  const t3 = txt(f, 0, cy, 'ваш психолог — под вашу задачу', 13, 400, C.D_INK2);
  centerTxt(t3, 0, W);
  cy += 52;
  const feats: [string, string][] = [
    ['sparkles', 'Игры и практики от вашего психолога'],
    ['lock', 'Приватность: ответы видит только он'],
    ['key-round', 'Без регистрации — вход по ссылке'],
  ];
  feats.forEach((ft, i) => {
    const ry = cy + i * 64;
    const row = rect(f, 32, ry, W - 64, 52, C.D_BG2, 12);
    setStroke(row, C.D_BD, 1, 'inner');
    row.name = 'feature-row';
    ic(f, ft[0], 48, ry + 16, 20, '#60A5FA');
    txt(f, 80, ry + 17, ft[1], 13, 500, C.D_INK);
  });
  mainBtn(f, 'Начать', true);
}

// ---------------------------------------------------------------------------
// E-51 Главная
// ---------------------------------------------------------------------------

function e51(f: any): void {
  tgHeader(f, 'Platform');
  let cy = 76;
  txt(f, 24, cy, 'Добрый вечер', 20, 700, C.D_INK);
  txt(f, 24, cy + 27, 'Среда, 16 сентября', 12, 400, C.D_INK2);
  cy += 64;
  const stk = rect(f, 24, cy, W - 48, 44, '#111C2E', 12);
  setStroke(stk, C.D_BD, 1, 'inner');
  stk.name = 'streak-chip';
  ic(f, 'zap', 40, cy + 13, 18, C.WARNING);
  txt(f, 68, cy + 13, 'Серия 5 дней подряд', 13, 600, C.D_INK);
  txt(f, W - 116, cy + 14, 'лучшая — 12', 11, 400, C.D_INK2);
  cy += 60;
  // продолжить игру
  card(f, 24, cy, W - 48, 128, 'continue-card');
  const tile = rect(f, 40, cy + 16, 44, 44, '#1E293B', 10);
  tile.name = 'game-thumb';
  ic(f, 'play', 40 + 14, cy + 16 + 13, 18, C.ACCENT);
  txt(f, 98, cy + 18, 'Дыхание 4-7-8', 15, 600, C.D_INK);
  txt(f, 98, cy + 40, 'Упражнение · шаг 3 из 6', 11, 400, C.D_INK2);
  rect(f, 40, cy + 84, W - 96, 6, C.D_BD, 3);
  rect(f, 40, cy + 84, Math.round((W - 96) / 2), 6, C.ACCENT, 3).name = 'progress-fill';
  txt(f, 98, cy + 100, 'Продолжить', 12, 600, '#60A5FA');
  ic(f, 'arrow-right', 168, cy + 100, 14, '#60A5FA');
  cy += 148;
  // чек-ин настроения
  card(f, 24, cy, W - 48, 108, 'mood-checkin');
  txt(f, 40, cy + 16, 'Как вы себя чувствуете?', 14, 600, C.D_INK);
  const faces: [string, string, boolean][] = [
    ['frown', 'тревожно', false], ['meh', 'нормально', true], ['smile', 'спокойно', false],
  ];
  faces.forEach((fc, i) => {
    const fx = 52 + i * 106;
    makeEllipse(f, fx, cy + 40, 44, 44, fc[2] ? '#16233B' : '#111C2E');
    if (fc[2]) {
      const ring = makeEllipse(f, fx, cy + 40, 44, 44, 'none');
      setStroke(ring, C.ACCENT, 2, 'inner');
    }
    ic(f, fc[0], fx + 11, cy + 51, 22, fc[2] ? C.ACCENT : C.D_INK2);
    const t = txt(f, 0, cy + 88, fc[1], 10, fc[2] ? 600 : 400, fc[2] ? C.ACCENT : C.D_INK2);
    centerTxt(t, fx - 12, 68);
  });
  cy += 128;
  // совет дня
  card(f, 24, cy, W - 48, 88, 'tip-card');
  ic(f, 'heart', 40, cy + 16, 18, C.ERROR);
  txt(f, 66, cy + 17, 'Совет дня', 12, 600, C.D_INK);
  txt(f, 40, cy + 42, 'Короткая прогулка снижает напряжение', 12, 400, C.D_INK2);
  txt(f, 40, cy + 60, 'быстрее, чем скролл ленты.', 12, 400, C.D_INK2);
  bottomNav(f, 0);
}

// ---------------------------------------------------------------------------
// E-52 Игры
// ---------------------------------------------------------------------------

function e52(f: any): void {
  tgHeader(f, 'Игры');
  let cy = 76;
  txt(f, 24, cy, 'Мои игры', 20, 700, C.D_INK);
  txt(f, W - 110, cy + 6, '4 доступно', 12, 400, C.D_INK2);
  cy += 44;
  const chips: [string, boolean][] = [['Все', true], ['Дыхание', false], ['Дневник', false], ['Медитация', false]];
  let cx = 24;
  chips.forEach((c) => {
    const cwd = Math.round(c[0].length * 6.8) + 26;
    const chipEl = rect(f, cx, cy, cwd, 30, c[1] ? C.ACCENT : C.D_BG2, 15);
    if (!c[1]) setStroke(chipEl, C.D_BD, 1, 'inner');
    chipEl.name = 'filter-chip';
    txt(f, cx + 12, cy + 8, c[0], 12, c[1] ? 600 : 500, c[1] ? '#FFFFFF' : C.D_INK2);
    cx += cwd + 8;
  });
  cy += 46;
  const games: [string, string, string, string, string, boolean][] = [
    ['play', 'Дыхание 4-7-8', 'Упражнение · 5 мин', '3/6', '#93C5FD', true],
    ['book-open', 'Дневник эмоций', 'Дневник · ежедневно', 'Новое', '#86EFAC', true],
    ['target', 'Заземление 5-4-3-2-1', 'Техника · 3 мин', 'Новая', '#FDE68A', true],
    ['timer', 'Скрипт сна', 'Медитация · 10 мин', 'Завершена', C.D_INK2, false],
  ];
  games.forEach((g) => {
    card(f, 24, cy, W - 48, 76, 'game-row');
    const tile = rect(f, 40, cy + 16, 44, 44, '#1E293B', 10);
    tile.name = 'game-thumb';
    ic(f, g[0], 40 + 13, cy + 16 + 13, 18, C.ACCENT);
    txt(f, 98, cy + 16, g[1], 14, 600, C.D_INK);
    txt(f, 98, cy + 38, g[2], 11, 400, C.D_INK2);
    const chw = Math.round(g[3].length * 6.2) + 20;
    const chipEl = rect(f, 24 + 342 - 16 - chw, cy + 28, chw, 22, g[5] ? '#1E293B' : C.D_BG, 11);
    chipEl.name = 'game-status';
    const ct = txt(f, 24 + 342 - 16 - chw, cy + 32, g[3], 10, g[5] ? 600 : 400, g[4]);
    void ct;
    cy += 88;
  });
  bottomNav(f, 1);
}

// ---------------------------------------------------------------------------
// E-53 Прохождение (+ состояние «ничего не выбрано»)
// ---------------------------------------------------------------------------

function e53body(f: any, selected: boolean): void {
  tgHeader(f, 'Дыхание 4-7-8');
  tmaProgress(f, 24, 72, 3, 6);
  let cy = 116;
  card(f, 24, cy, W - 48, 348, 'step-card · choice');
  txt(f, 40, cy + 22, 'Что вы чувствуете в теле сейчас?', 16, 600, C.D_INK);
  cy += 62;
  const opts: [string, boolean][] = [
    ['Плечи и спина напряжены', false],
    ['Сердце бьётся чаще', selected],
    ['Дыхание спокойное', false],
    ['Тело расслаблено', false],
  ];
  opts.forEach((o) => {
    const sel = o[1];
    const op = rect(f, 40, cy, W - 96, 52, sel ? '#16233B' : C.D_BG2, 12);
    setStroke(op, sel ? C.ACCENT : C.D_BD, sel ? 2 : 1, 'inner');
    op.name = 'AnswerOption / choice / ' + (sel ? 'selected' : 'default');
    makeEllipse(f, 56, cy + 17, 18, 18, 'none');
    if (sel) {
      const r1 = makeEllipse(f, 56, cy + 17, 18, 18, 'none');
      setStroke(r1, C.ACCENT, 2, 'inner');
      makeEllipse(f, 61, cy + 22, 8, 8, C.ACCENT);
    } else {
      const r2 = makeEllipse(f, 56, cy + 17, 18, 18, 'none');
      setStroke(r2, C.D_BD, 2, 'inner');
    }
    txt(f, 86, cy + 16, o[0], 13, sel ? 600 : 400, sel ? C.D_INK : C.D_INK2);
    cy += 64;
  });
  const hint = txt(f, 24, cy + 16, selected ? 'Выберите один вариант — можно изменить' : 'Выберите вариант, чтобы продолжить',
    11, 400, C.D_INK2);
  centerTxt(hint, 24, W - 48);
  mainBtn(f, 'Ответить', selected);
}

function e53(f: any): void { e53body(f, true); }
function e53b(f: any): void { e53body(f, false); }

// ---------------------------------------------------------------------------
// E-54 Результат
// ---------------------------------------------------------------------------

function e54(f: any): void {
  tgHeader(f, 'Готово');
  ic(f, 'circle-check', (W - 64) / 2, 112, 64, C.SUCCESS);
  let cy = 196;
  const t1 = txt(f, 0, cy, 'Сессия завершена!', 20, 700, C.D_INK);
  centerTxt(t1, 0, W);
  cy += 30;
  const t2 = txt(f, 0, cy, 'Вы прошли все 6 шагов упражнения', 13, 400, C.D_INK2);
  centerTxt(t2, 0, W);
  cy += 44;
  const stats: [string, string, string][] = [
    ['clock', '4:32', 'время'], ['target', '6/6', 'шаги'], ['zap', '+1', 'серия'],
  ];
  stats.forEach((st, i) => {
    const sx = 24 + i * 118;
    card(f, sx, cy, 106, 76, 'stat-card');
    ic(f, st[0], sx + 16, cy + 14, 18, '#60A5FA');
    txt(f, sx + 16, cy + 36, st[1], 16, 700, C.D_INK);
    txt(f, sx + 16, cy + 58, st[2], 10, 400, C.D_INK2);
  });
  cy += 100;
  card(f, 24, cy, W - 48, 120, 'anxiety-delta');
  txt(f, 40, cy + 16, 'Самооценка тревоги (0–10)', 12, 500, C.D_INK2);
  txt(f, 40, cy + 48, '7', 28, 700, C.D_INK2);
  ic(f, 'arrow-right', 92, cy + 58, 20, C.D_INK2);
  txt(f, 132, cy + 48, '4', 28, 700, C.ACCENT);
  txt(f, 40, cy + 90, 'после дыхательной практики', 11, 400, C.D_INK2);
  cy += 140;
  const pr = rect(f, 24, cy, W - 48, 64, '#111C2E', 12);
  setStroke(pr, C.D_BD, 1, 'inner');
  pr.name = 'privacy-note';
  ic(f, 'shield-check', 40, cy + 14, 18, C.SUCCESS);
  txt(f, 66, cy + 13, 'Результат автоматически увидит', 12, 500, C.D_INK);
  txt(f, 66, cy + 33, 'ваш психолог — и подберёт следующую игру', 11, 400, C.D_INK2);
  mainBtn(f, 'Отправить психологу', true);
}

// ---------------------------------------------------------------------------
// E-55 Дневник
// ---------------------------------------------------------------------------

function e55(f: any): void {
  tgHeader(f, 'Дневник');
  let cy = 76;
  txt(f, 24, cy, 'Как прошёл день?', 18, 600, C.D_INK);
  txt(f, W - 116, cy + 5, '16 сентября', 12, 400, C.D_INK2);
  cy += 44;
  card(f, 24, cy, W - 48, 100, 'mood-row');
  const faces: [string, string, boolean][] = [
    ['frown', 'тяжело', false], ['meh', 'нормально', false], ['smile', 'хорошо', true],
  ];
  faces.forEach((fc, i) => {
    const fx = 60 + i * 106;
    makeEllipse(f, fx, cy + 14, 44, 44, fc[2] ? '#16233B' : '#111C2E');
    if (fc[2]) {
      const ring = makeEllipse(f, fx, cy + 14, 44, 44, 'none');
      setStroke(ring, C.ACCENT, 2, 'inner');
    }
    ic(f, fc[0], fx + 11, cy + 25, 22, fc[2] ? C.ACCENT : C.D_INK2);
    const t = txt(f, 0, cy + 66, fc[1], 10, fc[2] ? 600 : 400, fc[2] ? C.ACCENT : C.D_INK2);
    centerTxt(t, fx - 12, 68);
  });
  cy += 116;
  card(f, 24, cy, W - 48, 96, 'note-input');
  txt(f, 40, cy + 14, 'Что повлияло на состояние?', 12, 500, C.D_INK2);
  txt(f, 40, cy + 38, 'Пара слов о дне — по желанию…', 13, 400, '#475569');
  rect(f, 40, cy + 70, W - 96, 1, C.D_BD, 0);
  txt(f, W - 96, cy + 76, '0/300', 10, 400, C.D_INK2);
  cy += 112;
  const tags: [string, boolean][] = [['Работа', true], ['Сон', false], ['Спорт', false], ['Люди', false]];
  let tx = 24;
  tags.forEach((tg) => {
    const twd = Math.round(tg[0].length * 6.8) + 24;
    const chipEl = rect(f, tx, cy, twd, 28, tg[1] ? C.ACCENT : C.D_BG2, 14);
    if (!tg[1]) setStroke(chipEl, C.D_BD, 1, 'inner');
    chipEl.name = 'tag-chip';
    txt(f, tx + 11, cy + 7, tg[0], 11, tg[1] ? 600 : 500, tg[1] ? '#FFFFFF' : C.D_INK2);
    tx += twd + 8;
  });
  cy += 46;
  btn(f, 24, cy, W - 48, 'Сохранить запись', 'primary', { h: 44 });
  cy += 72;
  txt(f, 24, cy, 'Последние записи', 13, 600, C.D_INK);
  cy += 26;
  const hist: [string, string, string][] = [
    ['14 сен', 'meh', 'Ровный день, много работы'],
    ['11 сен', 'smile', 'Прогулка и звонок подруге'],
  ];
  hist.forEach((hrow) => {
    card(f, 24, cy, W - 48, 52, 'history-row');
    ic(f, hrow[1], 40, cy + 16, 20, C.D_INK2);
    txt(f, 72, cy + 9, hrow[0], 11, 500, C.D_INK2);
    txt(f, 72, cy + 27, hrow[2], 12, 400, C.D_INK);
    cy += 62;
  });
  bottomNav(f, 2);
}

// ---------------------------------------------------------------------------
// E-56 Прогресс
// ---------------------------------------------------------------------------

function e56(f: any): void {
  tgHeader(f, 'Прогресс');
  let cy = 76;
  card(f, 24, cy, W - 48, 84, 'streak-card');
  const fl = rect(f, 40, cy + 20, 44, 44, '#1E293B', 12);
  fl.name = 'streak-icon';
  ic(f, 'zap', 40 + 13, cy + 20 + 13, 18, C.WARNING);
  txt(f, 98, cy + 20, 'Серия 5 дней', 16, 700, C.D_INK);
  txt(f, 98, cy + 44, 'лучшая серия — 12 дней', 11, 400, C.D_INK2);
  cy += 104;
  txt(f, 24, cy, 'Активность за неделю', 14, 600, C.D_INK);
  cy += 28;
  card(f, 24, cy, W - 48, 150, 'week-chart');
  const bars: [number, string, boolean][] = [
    [40, 'пн', false], [64, 'вт', false], [28, 'ср', false], [80, 'чт', true],
    [56, 'пт', false], [88, 'сб', true], [48, 'вс', false],
  ];
  bars.forEach((b, i) => {
    const bx = 48 + i * 42;
    rect(f, bx, cy + 104 - b[0], 24, b[0], b[2] ? C.ACCENT : '#1E293B', 6).name = 'bar';
    const t = txt(f, 0, cy + 112, b[1], 10, b[2] ? 600 : 400, b[2] ? C.ACCENT : C.D_INK2);
    centerTxt(t, bx - 8, 40);
  });
  cy += 170;
  card(f, 24, cy, W - 48, 156, 'activity-list');
  const rows: [string, string, string][] = [
    ['play', 'Игр пройдено', '12'],
    ['book-open', 'Записей в дневнике', '8'],
    ['calendar', 'Ближайшая сессия', 'ср, 18:00'],
  ];
  rows.forEach((r, i) => {
    const ry = cy + 14 + i * 46;
    ic(f, r[0], 40, ry, 18, '#60A5FA');
    txt(f, 70, ry + 1, r[1], 13, 400, C.D_INK);
    txt(f, W - 116, ry + 1, r[2], 13, 600, C.D_INK);
    if (i < 2) rect(f, 40, ry + 34, W - 96, 1, C.D_BD, 0);
  });
  bottomNav(f, 3);
}

// ---------------------------------------------------------------------------
// E-57 Профиль
// ---------------------------------------------------------------------------

function e57(f: any): void {
  tgHeader(f, 'Профиль');
  let cy = 80;
  avatar(f, 24, cy, 64, 'КА');
  txt(f, 104, cy + 8, 'Клиент А', 18, 700, C.D_INK);
  txt(f, 104, cy + 32, '@client_a · Telegram', 12, 400, C.D_INK2);
  const vb = rect(f, 104, cy + 52, 168, 24, '#1E293B', 12);
  vb.name = 'linked-chip';
  ic(f, 'badge-check', 112, cy + 56, 16, C.ACCENT);
  txt(f, 132, cy + 57, 'подключён к Анне К.', 11, 500, '#93C5FD');
  cy += 92;
  txt(f, 24, cy, 'НАСТРОЙКИ', 11, 500, C.D_INK2);
  cy += 24;
  card(f, 24, cy, W - 48, 156, 'settings-list');
  const sets: [string, string, boolean][] = [
    ['Напоминания о практике', 'каждый день в 20:00', true],
    ['Синхронизировать с Telegram', 'тема как в приложении', true],
    ['Звук в играх', '', false],
  ];
  sets.forEach((s, i) => {
    const ry = cy + 12 + i * 48;
    txt(f, 40, ry, s[0], 13, 500, C.D_INK);
    if (s[1]) txt(f, 40, ry + 19, s[1], 10, 400, C.D_INK2);
    toggle(f, W - 76, ry + 6, s[2]);
    if (i < 2) rect(f, 40, ry + 40, W - 96, 1, C.D_BD, 0);
  });
  cy += 176;
  txt(f, 24, cy, 'ПРИВАТНОСТЬ', 11, 500, C.D_INK2);
  cy += 24;
  card(f, 24, cy, W - 48, 80, 'privacy-card');
  ic(f, 'lock', 40, cy + 16, 18, C.SUCCESS);
  txt(f, 66, cy + 15, 'Заметки и ответы шифруются (E2E)', 12, 600, C.D_INK);
  txt(f, 66, cy + 36, 'Психолог видит только то, чем вы поделитесь', 10, 400, C.D_INK2);
  txt(f, 40, cy + 56, 'Подробнее →', 11, 500, '#60A5FA');
  cy += 100;
  card(f, 24, cy, W - 48, 92, 'links-list');
  txt(f, 40, cy + 14, 'Политика конфиденциальности', 13, 400, '#60A5FA');
  ic(f, 'chevron-right', W - 56, cy + 12, 16, C.D_INK2);
  rect(f, 40, cy + 40, W - 96, 1, C.D_BD, 0);
  txt(f, 40, cy + 58, 'Поддержка', 13, 400, '#60A5FA');
  ic(f, 'external-link', W - 56, cy + 56, 16, C.D_INK2);
  bottomNav(f, 4);
}

// ---------------------------------------------------------------------------
// Реестр и сборка
// ---------------------------------------------------------------------------

interface Screen4Def { code: string; title: string; draw: (f: any) => void }

const SCREENS4: Screen4Def[] = [
  { code: 'E-50', title: 'Онбординг', draw: e50 },
  { code: 'E-51', title: 'Главная', draw: e51 },
  { code: 'E-52', title: 'Игры', draw: e52 },
  { code: 'E-53', title: 'Прохождение', draw: e53 },
  { code: 'E-53', title: 'Прохождение · не выбрано', draw: e53b },
  { code: 'E-54', title: 'Результат', draw: e54 },
  { code: 'E-55', title: 'Дневник', draw: e55 },
  { code: 'E-56', title: 'Прогресс', draw: e56 },
  { code: 'E-57', title: 'Профиль', draw: e57 },
];

export const SCREEN4_FRAME_NAMES: string[] = SCREENS4
  .map((s) => s.code + ' ' + s.title + ' / 390');

export function buildScreens4(log: string[]): void {
  const SX = 7980 + 1440 + 240; // колонка правее экранов итерации 6
  let y = 100;
  for (const s of SCREENS4) {
    const f = openFrame(s.code + ' ' + s.title + ' / 390', SX, y, W, H);
    try { f.fills = [{ fillColor: C.D_BG, fillOpacity: 1 }]; } catch (_) { /* светлый */ }
    try { s.draw(f); } catch (e) { log.push('× ' + s.code + ' ' + s.title + ': ' + e); }
    y += 950;
  }
}
