// Экраны игр + клиентское прохождение (Итерация 6 ТЗ, разделы 5.4–5.5):
// E-30…E-33 — кабинет психолога (светлая тема), E-40…E-44 — клиент (тёмная тема,
// обязательная для клиентских экранов по ТЗ 11.1). 30 фреймов.

declare const penpot: any;

import { C } from './tokens-data';
import {
  pickFont, makeText, makeRect, makeEllipse, setStroke, setShadow,
  setOrigin, getOrigin, icon, FONT_FALLBACKS,
} from './draw';
import { Mode, D, T, MB, shell, openFrame, txt, rect, ic, avatar, btn, cardBox } from './screens';
import { gameCard, clientAccessCard, codeDisplay, deepLinkBlock } from './domain';

let F3: any = null;

// ---------------------------------------------------------------------------
// Тёмная тема для клиентских экранов (ТЗ 11.1)
// ---------------------------------------------------------------------------

function darkFrame(name: string, x: number, y: number, w: number, h: number): any {
  const f = openFrame(name, x, y, w, h);
  try { f.fills = [{ fillColor: C.D_BG, fillOpacity: 1 }]; } catch (_) { /* светлый */ }
  return f;
}

function dRect(f: any, x: number, y: number, w: number, h: number,
               fill: string | null, r: number): any {
  const rc = rect(f, x, y, w, h, fill, r);
  if (fill === C.D_BG2) setStroke(rc, C.D_BD, 1, 'inner');
  return rc;
}

function clientCard(f: any, x: number, y: number, w: number, h: number, name: string): void {
  const c = dRect(f, x, y, w, h, C.D_BG2, 14);
  c.name = name;
}

// ---------------------------------------------------------------------------
// E-30 Библиотека игр
// ---------------------------------------------------------------------------

function filterChipsGames(f: any, x: number, y: number, maxW: number): number {
  const chips: [string, boolean][] = [
    ['Все типы', true], ['Упражнение', false], ['Медитация', false], ['Дневник', false],
    ['Техника', false], ['Тревога', false], ['Стресс', false], ['Эмоции', false],
  ];
  let cx = x;
  let cy = y;
  chips.forEach((cdef) => {
    const cwd = Math.round(cdef[0].length * 6.8) + 26;
    if (cx + cwd > x + maxW) { cx = x; cy += 40; }
    const chipEl = rect(f, cx, cy, cwd, 30, cdef[1] ? C.ACCENT : C.WHITE, 15);
    if (!cdef[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'filter-chip';
    txt(f, cx + 12, cy + 8, cdef[0], 12, cdef[1] ? 600 : 500, cdef[1] ? '#FFFFFF' : C.INK2);
    cx += cwd + 10;
  });
  return cy + 40 - y;
}

function e30(f: any, m: Mode): void {
  const box = shell(f, m, 2, 'Библиотека игр');
  let y = box.cy;
  const W = box.cw;

  const searchW = m.kind === 'mobile' ? W : 420;
  const sf = rect(f, box.cx, y, searchW, 40, C.WHITE, 8);
  setStroke(sf, C.BD, 1, 'inner');
  sf.name = 'Input / search';
  ic(f, 'search', box.cx + 12, y + 12, 16, C.INK3);
  txt(f, box.cx + 36, y + 10, 'Игра или тема…', 14, 400, C.INK3);
  if (m.kind !== 'mobile') txt(f, box.cx + W - 110, y + 12, '12 игр', 13, 500, C.INK3);
  y += 56;

  y += filterChipsGames(f, box.cx, y, W);

  const cols = m.kind === 'desktop' ? 3 : m.kind === 'tablet' ? 2 : 1;
  const gap = 20;
  const games: string[][] = [
    ['Упражнение', 'Тревога'], ['Медитация', 'Стресс'], ['Дневник', 'Эмоции'],
    ['Техника', 'Тревога'], ['Упражнение', 'Эмоции'], ['Медитация', 'Тревога'],
  ];
  games.forEach((g, i) => {
    const cx = box.cx + (i % cols) * (300 + gap);
    const cy = y + Math.floor(i / cols) * 192;
    gameCard(f, cx, cy, F3);
  });
  void gap;
}

// ---------------------------------------------------------------------------
// E-31 Создание ClientAccess
// ---------------------------------------------------------------------------

function e31(f: any, m: Mode): void {
  const box = shell(f, m, 2, 'Новый доступ');
  let y = box.cy;
  const W = box.cw;
  const isDesktop = m.kind === 'desktop';
  const formW = isDesktop ? Math.round((W - 24) * 0.46) : W;

  // форма
  const formH = isDesktop ? 520 : 620;
  cardBox(f, box.cx, y, formW, formH, 'card/form');
  const px = box.cx + 20;
  const pw = formW - 40;
  let cy = y + 18;
  txt(f, px, cy, 'Выдать игру клиенту', 17, 700, C.INK);
  cy += 36;

  // выбранная игра
  const gsel = rect(f, px, cy, pw, 64, C.BG2, 10);
  gsel.name = 'select/game';
  ic(f, 'sparkles', px + 14, cy + 14, 18, C.ACCENT);
  txt(f, px + 42, cy + 10, 'Дыхание 4-7-8', 14, 600, C.INK);
  txt(f, px + 42, cy + 30, 'Упражнение · Тревога · 5 мин', 11, 400, C.INK3);
  ic(f, 'chevron-down', px + pw - 26, cy + 24, 16, C.INK3);
  txt(f, px, cy + 74, 'Выбрать другую игру →', 12, 500, C.ACCENT);
  cy += 104;

  // метка клиента
  txt(f, px, cy, 'Метка клиента', 12, 500, C.INK2);
  const mf = rect(f, px, cy + 24, pw, 40, C.WHITE, 8);
  setStroke(mf, C.BD, 1, 'inner');
  txt(f, px + 12, cy + 34, 'Клиент А', 14, 400, C.INK);
  txt(f, px, cy + 72, 'Псевдоним вместо имени — виден только вам', 11, 400, C.INK3);
  cy += 98;

  // срок
  txt(f, px, cy, 'Срок доступа', 12, 500, C.INK2);
  ([['7 дней', false], ['30 дней', true], ['90 дней', false]] as [string, boolean][]).forEach((s, i) => {
    const bx = px + i * 96;
    const bEl = rect(f, bx, cy + 22, 88, 32, s[1] ? '#EFF6FF' : C.WHITE, 16);
    setStroke(bEl, s[1] ? C.ACCENT : C.BD, s[1] ? 2 : 1, 'inner');
    bEl.name = 'chip/term';
    const t = txt(f, bx + 20, cy + 30, s[0], 13, s[1] ? 600 : 400, s[1] ? C.ACCENT : C.INK2);
    void t;
  });
  cy += 76;

  // лимит
  txt(f, px, cy, 'Лимит входов', 12, 500, C.INK2);
  ([['1', false], ['3', false], ['5', true], ['∞', false]] as [string, boolean][]).forEach((s, i) => {
    const bx = px + i * 56;
    const bEl = rect(f, bx, cy + 22, 48, 32, s[1] ? '#EFF6FF' : C.WHITE, 16);
    setStroke(bEl, s[1] ? C.ACCENT : C.BD, s[1] ? 2 : 1, 'inner');
    bEl.name = 'chip/limit';
    const t = txt(f, bx + 20, cy + 30, s[0], 13, s[1] ? 600 : 400, s[1] ? C.ACCENT : C.INK2);
    void t;
  });
  cy += 76;

  // уведомления
  const track = rect(f, px, cy + 2, 44, 24, C.ACCENT, 12);
  track.name = 'Switch / on';
  const knob = makeEllipse(f, px + 23, cy + 5, 18, 18, C.WHITE);
  setShadow(knob, 0, 1, 2, 0.1);
  txt(f, px + 56, cy + 4, 'Уведомлять о прохождении', 13, 400, C.INK);
  cy += 52;

  btn(f, px, cy, Math.min(240, pw), 'Создать доступ', 'primary', { icon: 'key-round', h: 44 });

  // результат
  const resX = isDesktop ? box.cx + formW + 24 : box.cx;
  const resW = isDesktop ? W - formW - 24 : W;
  const resY = isDesktop ? y : y + formH + 20;
  const sToast = rect(f, resX, resY, Math.min(resW, 380), 52, '#F0FDF4', 12);
  setStroke(sToast, '#BBF7D0', 1, 'inner');
  sToast.name = 'Toast / success / created';
  ic(f, 'circle-check', resX + 14, resY + 16, 20, C.SUCCESS);
  txt(f, resX + 44, resY + 8, 'Доступ создан', 13, 600, '#166534');
  txt(f, resX + 44, resY + 28, 'Отправьте клиенту код или ссылку', 12, 400, '#15803D');

  codeDisplay(f, resX, resY + 68, F3, null);
  deepLinkBlock(f, resX + (isDesktop ? 300 : 0), resY + 68 + (isDesktop ? 0 : 148), F3, null);
}

// ---------------------------------------------------------------------------
// E-32 Управление клиентами
// ---------------------------------------------------------------------------

function e32(f: any, m: Mode): void {
  const box = shell(f, m, 3, 'Клиенты');
  let y = box.cy;
  const W = box.cw;
  const isDesktop = m.kind === 'desktop';
  const listW = isDesktop ? 340 : W;

  // список
  const clients: [string, string, string, string, string, boolean][] = [
    ['КА', 'Клиент А', 'Дневник эмоций · 2 ч назад', 'g', 'активен', true],
    ['КБ', 'Клиент Б', 'Дыхание 4-7-8 · вчера', 'b', 'завершён', false],
    ['КВ', 'Клиент В', 'Дневник эмоций · 3 дн.', 'y', 'истёк', false],
    ['КГ', 'Клиент Г', '—', 'n', 'нет доступов', false],
  ];
  const listH = 64 + clients.length * 64 + 8;
  cardBox(f, box.cx, y, listW, listH, 'card/clients-list');
  clients.forEach((cl, i) => {
    const ry = y + 56 + i * 64;
    avatar(f, box.cx + 16, ry, 40, cl[0], cl[5] ? C.ACCENT2 : C.INK3);
    txt(f, box.cx + 68, ry + 2, cl[1], 13, 600, cl[5] ? C.INK : C.INK2);
    txt(f, box.cx + 68, ry + 21, cl[2], 11, 400, C.INK3);
    const chipEl = rect(f, box.cx + listW - 92, ry + 8, 76, 24,
      cl[3] === 'g' ? '#DCFCE7' : cl[3] === 'b' ? '#E0F2FE' : cl[3] === 'y' ? '#FEF3C7' : C.BG2, 12);
    chipEl.name = 'status-chip';
    txt(f, box.cx + listW - 84, ry + 12, cl[4], 10, 500,
      cl[3] === 'g' ? '#166534' : cl[3] === 'b' ? '#0C4A6E' : cl[3] === 'y' ? '#92400E' : C.INK3);
    if (i < clients.length - 1) rect(f, box.cx + 16, ry + 52, listW - 32, 1, C.BD, 0);
    if (cl[5] && isDesktop) rect(f, box.cx + 4, ry - 6, 3, 52, C.ACCENT, 2);
  });
  y += listH + 20;

  // карточка выбранного клиента (desktop) или второй блок
  if (isDesktop || m.kind === 'tablet') {
    const dx = isDesktop ? box.cx + listW + 24 : box.cx;
    const dw = isDesktop ? W - listW - 24 : W;
    clientDetail(f, dx, isDesktop ? box.cy : y, dw);
  } else {
    clientDetail(f, box.cx, y, W);
  }
}

function clientDetail(f: any, x: number, y: number, w: number): void {
  // шапка
  const headH = 76;
  cardBox(f, x, y, w, headH, 'card/client-head');
  avatar(f, x + 16, y + 18, 40, 'КА');
  txt(f, x + 68, y + 14, 'Клиент А', 16, 700, C.INK);
  txt(f, x + 68, y + 38, 'в доступе с 01.09.2026 · 3 игры', 12, 400, C.INK3);
  ic(f, 'settings', x + w - 40, y + 28, 18, C.INK3);

  // доступы
  const accY = y + headH + 16;
  txt(f, x + 4, accY + 4, 'Активные доступы', 14, 600, C.INK);
  clientAccessCard(f, x + 4, accY + 28, F3, 'active');
  clientAccessCard(f, x + 4, accY + 172, F3, 'expired');

  // заметки
  const ntY = accY + 316;
  txt(f, x + 4, ntY + 4, 'Заметки', 14, 600, C.INK);
  ic(f, 'lock', x + 74, ntY + 5, 13, C.INK3);
  txt(f, x + 92, ntY + 4, 'шифруются (E2E)', 11, 400, C.INK3);
  const nt = rect(f, x + 4, ntY + 26, Math.min(w - 8, 360), 84, C.WHITE, 10);
  setStroke(nt, C.BD, 1, 'inner');
  nt.name = 'Input / textarea / notes';
  txt(f, x + 18, ntY + 38, 'Реагирует тревожно на тему работы.', 12, 400, C.INK2);
  txt(f, x + 18, ntY + 56, 'Дыхательные практики заходят лучше.', 12, 400, C.INK2);
}

// ---------------------------------------------------------------------------
// E-33 Управление доступами
// ---------------------------------------------------------------------------

function e33(f: any, m: Mode): void {
  const box = shell(f, m, 3, 'Доступы');
  let y = box.cy;
  const W = box.cw;

  btn(f, box.cx + W - 170, y - 6, 170, 'Новый доступ', 'primary', { icon: 'plus', h: 40 });
  y += 48;

  const rows: [string, string, string, string, string, string, string, string][] = [
    ['Клиент А', 'Дневник эмоций', 'DCFCE7', '#166534', 'активен', 'до 30.09', '3/5', 'copy'],
    ['Клиент А', 'Дыхание 4-7-8', 'DCFCE7', '#166534', 'активен', 'до 15.10', '1/5', 'copy'],
    ['Клиент Б', 'Дыхание 4-7-8', 'E0F2FE', '#0C4A6E', 'завершён', '—', '5/5', 'copy'],
    ['Клиент В', 'Дневник эмоций', 'FEF3C7', '#92400E', 'истёк', '12.09', '3/3', 'none'],
    ['Клиент Г', 'Скрипт сна', 'FEE2E2', '#991B1B', 'отозван', '—', '0/3', 'none'],
  ];
  const rowH = 52;
  const tableH = 52 + rows.length * rowH + 12;
  cardBox(f, box.cx, y, W, tableH, 'card/access-table');
  const hy = y + 12;
  txt(f, box.cx + 16, hy, 'КЛИЕНТ', 11, 500, C.INK3);
  txt(f, box.cx + 120, hy, 'ИГРА', 11, 500, C.INK3);
  if (m.kind !== 'mobile') {
    txt(f, box.cx + Math.round(W * 0.42), hy, 'СТАТУС', 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W * 0.58), hy, 'СРОК', 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W * 0.7), hy, 'ВХОДЫ', 11, 500, C.INK3);
  }
  txt(f, box.cx + W - 96, hy, 'ДЕЙСТВИЯ', 11, 500, C.INK3);
  rows.forEach((r, i) => {
    const ry = y + 44 + i * rowH;
    txt(f, box.cx + 16, ry + 8, r[0], 13, 600, C.INK);
    txt(f, box.cx + 120, ry + 8, r[1], 13, 400, C.INK2);
    if (m.kind !== 'mobile') {
      const chipEl = rect(f, box.cx + Math.round(W * 0.42), ry + 4, 84, 24, '#' + r[2], 12);
      chipEl.name = 'status-chip';
      txt(f, box.cx + Math.round(W * 0.42) + 10, ry + 8, r[4], 11, 500, '#' + r[3]);
      txt(f, box.cx + Math.round(W * 0.58), ry + 8, r[5], 12, 400, C.INK2);
      txt(f, box.cx + Math.round(W * 0.7), ry + 8, r[6], 12, 500, C.INK);
    }
    // действия
    const ax = box.cx + W - 96;
    const cp = rect(f, ax, ry + 2, 32, 28, C.WHITE, 8);
    setStroke(cp, C.BD, 1, 'inner');
    cp.name = 'Button / copy-icon';
    ic(f, 'copy', ax + 8, ry + 9, 14, C.INK2);
    if (r[7] === 'copy' || r[4] === 'активен') {
      const rv = rect(f, ax + 40, ry + 2, 52, 28, C.WHITE, 8);
      setStroke(rv, '#FECACA', 1, 'inner');
      rv.name = 'Button / revoke';
      txt(f, ax + 47, ry + 8, 'Отозвать', 10, 500, C.ERROR);
    } else {
      txt(f, ax + 44, ry + 8, '—', 12, 400, C.INK3);
    }
    if (i < rows.length - 1) rect(f, box.cx + 16, ry + rowH - 4, W - 32, 1, C.BD, 0);
  });
  y += tableH + 16;
  txt(f, box.cx, y, 'Отзыв доступа немедленно закрывает ссылку и код. Данные прохождений сохраняются.',
    12, 400, C.INK3);
}

// ---------------------------------------------------------------------------
// Клиентские экраны (тёмная тема)
// ---------------------------------------------------------------------------

function clientShell(f: any, m: Mode, step: string): { cardX: number; cardW: number; y: number } {
  // шапка
  rect(f, 0, 0, m.w, 56, C.D_BG2, 0).name = 'client-header';
  rect(f, 16, 16, 24, 24, C.ACCENT, 7);
  txt(f, 48, 18, 'Platform', 15, 700, C.D_INK);
  txt(f, m.w - 90, 20, step, 11, 400, C.D_INK2);
  const cardW = Math.min(480, m.w - 32);
  const cardX = Math.round((m.w - cardW) / 2);
  return { cardX, cardW, y: 96 };
}

function progressDark(f: any, x: number, y: number, w: number, cur: number, total: number): void {
  txt(f, x, y, 'ШАГ ' + cur + ' ИЗ ' + total, 10, 500, C.D_INK2);
  rect(f, x, y + 18, w, 6, C.D_BD, 3);
  rect(f, x, y + 18, Math.round(w * cur / total), 6, C.ACCENT, 3).name = 'progress-fill';
}

function e40(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'без входа');
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  const h = 420;
  clientCard(f, x, y, w, h, 'E-40 card');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 26;
  const typeChip = rect(f, px, cy, 108, 26, '#1E293B', 13);
  typeChip.name = 'chip/type';
  txt(f, px + 12, cy + 5, 'Упражнение', 11, 500, '#93C5FD');
  txt(f, px + 120, cy + 5, 'Тревога', 11, 400, C.D_INK2);
  cy += 48;
  txt(f, px, cy, 'Дыхание 4-7-8', 26, 700, C.D_INK);
  cy += 40;
  txt(f, px, cy, '5 мин · 6 шагов', 13, 500, '#60A5FA');
  cy += 32;
  txt(f, px, cy, 'Простая техника дыхания, которая помогает', 14, 400, C.D_INK2);
  cy += 22;
  txt(f, px, cy, 'снизить тревогу и вернуться в спокойное', 14, 400, C.D_INK2);
  cy += 22;
  txt(f, px, cy, 'состояние. Не требует подготовки.', 14, 400, C.D_INK2);
  cy += 36;
  const who = rect(f, px, cy, pw, 56, '#111C2E', 12);
  who.name = 'invited-by';
  avatar(f, px + 14, cy + 12, 32, 'АК');
  txt(f, px + 58, cy + 10, 'Вас пригласила Анна К.', 13, 600, C.D_INK);
  txt(f, px + 58, cy + 30, 'ваш психолог', 11, 400, C.D_INK2);
  cy += 76;
  btn(f, px, cy, pw, 'Начать', 'primary', { h: 48 });
  cy += 64;
  const t = txt(f, px, cy, 'Откроется по ссылке или коду · без регистрации', 11, 400, C.D_INK2);
  centerTxt(t, px, pw);
}

function centerTxt(t: any, x: number, w: number): void {
  try { if (t && typeof t.width === 'number' && t.width > 0) t.x = t.x + (w - t.width) / 2; } catch (_) { /* as-is */ }
}

function e41(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'шаг 1 из 6');
  progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 1, 6);
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  const h = 360;
  clientCard(f, x, y, w, h, 'E-41 card');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 24;
  txt(f, px, cy, 'Согласие', 20, 700, C.D_INK);
  cy += 34;
  txt(f, px, cy, 'Перед началом коротко о том, как устроена', 13, 400, C.D_INK2);
  cy += 20;
  txt(f, px, cy, 'игра и что происходит с вашими ответами.', 13, 400, C.D_INK2);
  cy += 30;
  // чекбоксы
  const items: [string, boolean][] = [
    ['Участие добровольное, можно остановиться в любой момент', true],
    ['Ответы видит только ваш психолог', true],
    ['Я прочитал(а) политику конфиденциальности', true],
  ];
  items.forEach((it) => {
    const box = rect(f, px, cy + 2, 18, 18, C.ACCENT, 5);
    box.name = 'checkbox-checked';
    ic(f, 'check', px + 3, cy + 5, 12, '#FFFFFF');
    txt(f, px + 28, cy, it[0].slice(0, Math.floor(pw / 6.2)), 12, 400, C.D_INK2);
    cy += 44;
  });
  cy += 8;
  txt(f, px, cy, 'Политика конфиденциальности', 12, 500, '#60A5FA');
  cy += 22;
  txt(f, px, cy, 'Условия использования', 12, 500, '#60A5FA');
  cy += 36;
  btn(f, px, cy, pw, 'Продолжить', 'primary', { h: 48 });
}

function e42(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'шаг 2 из 6');
  progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 2, 6);
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  const h = 430;
  clientCard(f, x, y, w, h, 'E-42 card · choice');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 24;
  txt(f, px, cy, 'Как вы себя чувствуете сейчас?', 18, 600, C.D_INK);
  cy += 38;
  const opts: [string, boolean][] = [
    ['Спокойно, ровно', false],
    ['Немного тревожно', true],
    ['Очень тревожно', false],
    ['Другое (опишу словами)', false],
  ];
  opts.forEach((o) => {
    const sel = o[1];
    const card = rect(f, px, cy, pw, 52, sel ? '#16233B' : C.D_BG2, 12);
    setStroke(card, sel ? C.ACCENT : C.D_BD, sel ? 2 : 1, 'inner');
    card.name = 'AnswerOption / choice / ' + (sel ? 'selected' : 'default');
    makeEllipse(f, px + 16, cy + 17, 18, 18, sel ? C.ACCENT : C.D_BG2);
    if (sel) {
      setStroke(makeEllipse(f, px + 16, cy + 17, 18, 18, 'none'), C.ACCENT, 2, 'inner');
      makeEllipse(f, px + 21, cy + 22, 8, 8, C.ACCENT);
    } else {
      setStroke(makeEllipse(f, px + 16, cy + 17, 18, 18, 'none'), C.D_BD, 2, 'inner');
    }
    txt(f, px + 46, cy + 15, o[0], 14, sel ? 600 : 400, sel ? C.D_INK : C.D_INK2);
    cy += 64;
  });
  cy += 10;
  btn(f, px, cy, pw, 'Далее', 'primary', { h: 48 });
}

// шаг «шкала»
function e42scale(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'шаг 3 из 6');
  progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 3, 6);
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  clientCard(f, x, y, w, 340, 'E-42 card · scale');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 24;
  txt(f, px, cy, 'Оцените тревогу прямо сейчас', 17, 600, C.D_INK);
  cy += 40;
  const t = txt(f, px, cy, '6', 64, 700, C.WARNING);
  void t;
  txt(f, px + 66, cy + 38, '/ 10', 18, 600, C.D_INK2);
  cy += 110;
  const segW = Math.round((pw - 9 * 6) / 10);
  for (let i = 0; i < 10; i++) {
    const col = i < 3 ? C.ERROR : i < 6 ? C.WARNING : C.SUCCESS;
    const sel = i === 5;
    const seg = rect(f, px + i * (segW + 6), cy, segW, 16, col, 4);
    try { if (!sel) seg.fills = [{ fillColor: col, fillOpacity: 0.35 }]; } catch (_) { /* full */ }
    seg.name = 'scale-seg';
  }
  cy += 28;
  txt(f, px, cy, '0–3 низкая', 10, 400, C.D_INK2);
  txt(f, px + pw / 2 - 30, cy, '4–6 средняя', 10, 400, C.D_INK2);
  txt(f, px + pw - 66, cy, '7–10 высокая', 10, 400, C.D_INK2);
  cy += 36;
  btn(f, px, cy, pw, 'Далее', 'primary', { h: 48 });
}

// шаг «таймер»
function e42timer(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'шаг 4 из 6');
  progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 4, 6);
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  clientCard(f, x, y, w, 400, 'E-42 card · timer');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 24;
  txt(f, px, cy, 'Медленный выдох · 8 секунд', 17, 600, C.D_INK);
  cy += 14;
  txt(f, px, cy + 14, 'Дышите вместе с кругом', 13, 400, C.D_INK2);
  try {
    const o = getOrigin();
    const ring = '<svg width="180" height="180" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="20" cy="20" r="16" stroke="#1F2937" stroke-width="3"/>' +
      '<circle cx="20" cy="20" r="16" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-dasharray="100.5" stroke-dashoffset="30" transform="rotate(-90 20 20)"/>' +
      '<text x="20" y="22.5" text-anchor="middle" font-size="6" font-weight="700" fill="#F8FAFC" font-family="Inter">8</text></svg>';
    const svg = penpot.createShapeFromSvg(ring);
    if (svg) { f.appendChild(svg); svg.x = o.x + px + Math.round((pw - 180) / 2); svg.y = o.y + cy + 20; svg.name = 'timer-ring'; }
  } catch (_) { /* опционально */ }
  cy += 216;
  // play/pause + skip
  const play = rect(f, px + pw / 2 - 30, cy, 60, 60, C.ACCENT, 30);
  play.name = 'Button / pause-timer';
  ic(f, 'pause', px + pw / 2 - 9, cy + 18, 18, '#FFFFFF');
  txt(f, px, cy + 20, 'Пропустить', 12, 500, C.D_INK2);
  txt(f, px + pw - 68, cy + 20, 'Перезапустить', 12, 500, '#60A5FA');
  cy += 80;
  btn(f, px, cy, pw, 'Далее', 'primary', { h: 48 });
}

// шаг «ввод»
function e42input(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'шаг 5 из 6');
  progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 5, 6);
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 40;
  clientCard(f, x, y, w, 360, 'E-42 card · input');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 24;
  txt(f, px, cy, 'Что помогло вам успокоиться?', 17, 600, C.D_INK);
  cy += 14;
  txt(f, px, cy + 14, 'Пара слов — этого достаточно', 13, 400, C.D_INK2);
  cy += 44;
  const ta = rect(f, px, cy, pw, 110, C.D_BG2, 12);
  setStroke(ta, C.ACCENT, 2, 'inner');
  ta.name = 'Input / textarea / dark / focus';
  txt(f, px + 14, cy + 12, 'Помогло подышать и выйти на улицу…', 14, 400, C.D_INK);
  txt(f, px + 14, cy + 84, '86 / 300', 11, 400, C.D_INK2);
  cy += 130;
  btn(f, px, cy, pw, 'Отправить', 'primary', { h: 48 });
}

function e43(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'готово');
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 60;
  clientCard(f, x, y, w, 400, 'E-43 card');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 36;
  ic(f, 'circle-check', px + pw / 2 - 28, cy, 56, C.SUCCESS);
  cy += 76;
  const t = txt(f, px, cy, 'Готово!', 24, 700, C.D_INK);
  centerTxt(t, px, pw);
  cy += 40;
  const t2 = txt(f, px, cy, 'Вы прошли упражнение до конца.', 14, 400, C.D_INK2);
  centerTxt(t2, px, pw);
  cy += 24;
  const t3 = txt(f, px, cy, 'Прогресс сохранён — ваш психолог увидит результат', 13, 400, C.D_INK2);
  centerTxt(t3, px, pw);
  cy += 22;
  const t4 = txt(f, px, cy, 'и сможет подобрать следующую игру.', 13, 400, C.D_INK2);
  centerTxt(t4, px, pw);
  cy += 44;
  btn(f, px, cy, pw, 'Отправить психологу', 'primary', { icon: 'send', h: 48 });
  cy += 64;
  const t5 = txt(f, px, cy, 'Закрыть', 14, 500, '#60A5FA');
  centerTxt(t5, px, pw);
}

function e44(f: any, m: Mode): void {
  const sh = clientShell(f, m, 'ошибка');
  const x = sh.cardX;
  const w = sh.cardW;
  const y = sh.y + 60;
  clientCard(f, x, y, w, 380, 'E-44 card');
  const px = x + 24;
  const pw = w - 48;
  let cy = y + 36;
  ic(f, 'alert-octagon', px + pw / 2 - 26, cy, 52, C.WARNING);
  cy += 72;
  const t = txt(f, px, cy, 'Ссылка больше не действует', 19, 700, C.D_INK);
  centerTxt(t, px, pw);
  cy += 36;
  const t2 = txt(f, px, cy, 'Доступ мог истечь, быть отозван', 13, 400, C.D_INK2);
  centerTxt(t2, px, pw);
  cy += 20;
  const t3 = txt(f, px, cy, 'или уже использован. Запросите новую', 13, 400, C.D_INK2);
  centerTxt(t3, px, pw);
  cy += 20;
  const t4 = txt(f, px, cy, 'ссылку у вашего психолога.', 13, 400, C.D_INK2);
  centerTxt(t4, px, pw);
  cy += 30;
  // причины-чипы
  const reasons: [string, boolean][] = [['истёк', true], ['отозван', false], ['использован', false]];
  let cx = px;
  reasons.forEach((r) => {
    const cwd = Math.round(r[0].length * 6.6) + 26;
    const chipEl = rect(f, cx, cy, cwd, 26, r[1] ? '#1E293B' : C.D_BG2, 13);
    setStroke(chipEl, C.D_BD, 1, 'inner');
    chipEl.name = 'reason-chip';
    txt(f, cx + 11, cy + 5, r[0], 11, r[1] ? 600 : 400, r[1] ? '#FCA5A5' : C.D_INK2);
    cx += cwd + 8;
  });
  cy += 52;
  btn(f, px, cy, pw, 'Понятно', 'primary', { h: 48 });
  cy += 64;
  const t5 = txt(f, px, cy, 'Связаться с психологом', 13, 500, '#60A5FA');
  centerTxt(t5, px, pw);
}

// ---------------------------------------------------------------------------
// Реестр и сборка
// ---------------------------------------------------------------------------

interface Screen3Def {
  code: string; title: string; mobileH?: number;
  draw: (f: any, m: Mode) => void; dark?: boolean; extraMobileOnly?: boolean;
}

const SCREENS3: Screen3Def[] = [
  { code: 'E-30', title: 'Библиотека игр', mobileH: 1420, draw: e30 },
  { code: 'E-31', title: 'Создание доступа', mobileH: 1240, draw: e31 },
  { code: 'E-32', title: 'Клиенты', mobileH: 1320, draw: e32 },
  { code: 'E-33', title: 'Доступы', mobileH: 980, draw: e33 },
  { code: 'E-40', title: 'Открытие игры', mobileH: 760, draw: e40, dark: true },
  { code: 'E-41', title: 'Согласие', mobileH: 720, draw: e41, dark: true },
  { code: 'E-42', title: 'Прохождение', mobileH: 780, draw: e42, dark: true },
  { code: 'E-42', title: 'Прохождение · шкала', mobileH: 700, draw: e42scale, dark: true, extraMobileOnly: true },
  { code: 'E-42', title: 'Прохождение · таймер', mobileH: 760, draw: e42timer, dark: true, extraMobileOnly: true },
  { code: 'E-42', title: 'Прохождение · ввод', mobileH: 700, draw: e42input, dark: true, extraMobileOnly: true },
  { code: 'E-43', title: 'Завершение', mobileH: 720, draw: e43, dark: true },
  { code: 'E-44', title: 'Ошибка доступа', mobileH: 740, draw: e44, dark: true },
];

export const SCREEN3_FRAME_NAMES: string[] = SCREENS3
  .flatMap((s) => (s.extraMobileOnly ? ['390'] : ['1440', '768', '390'])
    .map((bp) => s.code + ' ' + s.title + ' / ' + bp));

export function buildScreens3(log: string[]): void {
  F3 = pickFont(FONT_FALLBACKS);
  const SX = 4620 + 2 * (1440 + 240); // колонка правее экранов итераций 4–5
  let y = 100;
  for (const s of SCREENS3) {
    const modes: [Mode, string][] = s.extraMobileOnly
      ? [[MB, '390']]
      : [[D, '1440'], [T, '768'], [MB, '390']];
    for (const mm of modes) {
      const h = (mm[0].kind === 'mobile' && s.mobileH) ? s.mobileH : mm[0].h;
      const mode: Mode = { w: mm[0].w, h, kind: mm[0].kind };
      const open = s.dark ? darkFrame : openFrame;
      const f = open(s.code + ' ' + s.title + ' / ' + mm[1], SX, y, mode.w, h);
      try { s.draw(f, mode); } catch (e) { log.push('× ' + s.code + ' ' + s.title + '/' + mm[1] + ': ' + e); }
    }
    y += 1300;
  }
}
