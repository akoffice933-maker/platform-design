// Экраны Web: Auth + Дашборды (Итерация 4 ТЗ, раздел 5.1–5.2):
// E-01…E-12 в трёх брейкпоинтах 1440/768/390 — 33 фрейма.
// Нейминг фреймов: «E-XX Название / breakpoint» (ТЗ 9.3).
// Адаптив по ТЗ 6.3: desktop — sidebar, tablet — иконки, mobile — bottom nav.

declare const penpot: any;

import { C } from './tokens-data';
import {
  pickFont, makeText, makeRect, makeEllipse, centerTextIn, icon,
  setStroke, setShadow, setOrigin, getOrigin, caption, FONT_FALLBACKS,
} from './draw';
import { radarSvg } from './domain';

// ---------------------------------------------------------------------------
// Каркас
// ---------------------------------------------------------------------------

export interface Mode { w: number; h: number; kind: 'desktop' | 'tablet' | 'mobile' }
export const D: Mode = { w: 1440, h: 900, kind: 'desktop' };
export const T: Mode = { w: 768, h: 1024, kind: 'tablet' };
export const MB: Mode = { w: 390, h: 844, kind: 'mobile' };

let F: any = null; // шрифт

export function txt(f: any, x: number, y: number, s: string, size: number, weight: number, color: string): any {
  return makeText(f, x, y, s, { size, weight, color, font: F });
}

export function rect(f: any, x: number, y: number, w: number, h: number, fill: string | null, r: number): any {
  return makeRect(f, x, y, w, h, fill, r);
}

function line(f: any, x: number, y: number, w: number): void {
  rect(f, x, y, w, 1, C.BD, 0);
}

export function ic(f: any, name: string, x: number, y: number, s: number, color: string): void {
  icon(f, name, x, y, s, color);
}

export function avatar(f: any, x: number, y: number, size: number, initials: string, bg?: string): void {
  const a = makeEllipse(f, x, y, size, size, bg || C.ACCENT2);
  a.name = 'avatar';
  const fs = Math.round(size * 0.34);
  const t = txt(f, x, y + size / 2 - fs * 0.62, initials, fs, 600, '#FFFFFF');
  centerTextIn(t, x, size);
}

export function btn(f: any, x: number, y: number, w: number, label: string,
             style: 'primary' | 'secondary' | 'ghost',
             opts: { icon?: string; h?: number; fs?: number; full?: boolean } = {}): void {
  const h = opts.h || 40;
  const fs = opts.fs || 14;
  const bg = style === 'primary' ? C.ACCENT : style === 'secondary' ? C.WHITE : null;
  const b = rect(f, x, y, w, h, bg, h / 2);
  b.name = 'Button / ' + style;
  if (style === 'secondary') setStroke(b, C.BD, 1, 'inner');
  const fg = style === 'primary' ? '#FFFFFF' : style === 'ghost' ? C.ACCENT : C.INK;
  const tw = Math.round(label.length * fs * 0.62) + (opts.icon ? 26 : 0);
  let tx = x + (w - tw) / 2;
  if (opts.icon) { ic(f, opts.icon, tx, y + (h - 16) / 2, 16, fg); tx += 26; }
  const t = txt(f, tx, y + (h - fs - 4) / 2, label, fs, 600, fg);
  centerTextIn(t, tx, tw);
  void opts.full;
}

export function inputLine(f: any, x: number, y: number, w: number, label: string, value: string,
                   opts: { password?: boolean } = {}): number {
  txt(f, x, y, label, 12, 500, C.INK2);
  const field = rect(f, x, y + 24, w, 40, C.WHITE, 8);
  setStroke(field, C.BD, 1, 'inner');
  field.name = 'Input / ' + label.toLowerCase();
  txt(f, x + 12, y + 34, value, 14, 400, C.INK);
  if (opts.password) ic(f, 'eye-off', x + w - 28, y + 34, 16, C.INK3);
  return 86;
}

export function openFrame(name: string, x: number, y: number, w: number, h: number): any {
  const f = penpot.createBoard();
  f.name = name;
  f.x = x;
  f.y = y;
  try { f.resize(w, h); } catch (_) { /* размеры по умолчанию */ }
  try { f.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }]; } catch (_) { /* белый */ }
  setStroke(f, C.BD, 1, 'inner');
  setOrigin(x, y);
  return f;
}

// ----- Навигационная оболочка (ТЗ 6.3) -----

const NAV: [string, string][] = [
  ['home', 'Дашборд'], ['book-open', 'Сценарии'], ['sparkles', 'Игры'],
  ['users', 'Клиенты'], ['chart-column', 'Прогресс'], ['settings', 'Настройки'],
];

function bottomNavM(f: any, w: number, y: number, active: number): void {
  const items: [string, string][] = [
    ['home', 'Главная'], ['book-open', 'Сценарии'], ['sparkles', 'Игры'],
    ['chart-column', 'Прогресс'], ['user', 'Профиль'],
  ];
  const bar = rect(f, 0, y, w, 64, C.WHITE, 0);
  setStroke(bar, C.BD, 1, 'inner');
  bar.name = 'BottomNav / TMA';
  items.forEach((it, i) => {
    const cx = 12 + i * 76;
    const col = i === active ? C.ACCENT : C.INK3;
    ic(f, it[0], cx + 8, y + 10, 20, col);
    txt(f, cx, y + 36, it[1], 9, i === active ? 600 : 400, col);
  });
}

export function shell(f: any, m: Mode, active: number, title: string):
  { cx: number; cy: number; cw: number; ch: number } {
  if (m.kind === 'mobile') {
    const bar = rect(f, 0, 0, m.w, 56, C.WHITE, 0);
    setStroke(bar, C.BD, 1, 'inner');
    rect(f, 16, 16, 24, 24, C.ACCENT, 7);
    txt(f, 48, 18, 'Platform', 15, 700, C.INK);
    avatar(f, m.w - 44, 14, 28, 'АК');
    bottomNavM(f, m.w, m.h - 64, active);
    return { cx: 16, cy: 72, cw: m.w - 32, ch: m.h - 56 - 64 };
  }
  const sbw = m.kind === 'desktop' ? 240 : 64;
  const sb = rect(f, 0, 0, sbw, m.h, C.BG2, 0);
  sb.name = 'sidebar';
  // логотип
  rect(f, m.kind === 'desktop' ? 24 : 20, 20, 28, 28, C.ACCENT, 8);
  if (m.kind === 'desktop') txt(f, 62, 22, 'Platform', 16, 700, C.INK);
  // навигация
  NAV.forEach((it, i) => {
    const ny = 88 + i * 44;
    const isActive = i === active;
    if (isActive && m.kind === 'desktop') {
      const itemBg = rect(f, 12, ny - 6, sbw - 24, 40, C.WHITE, 10);
      itemBg.name = 'nav-item/active';
      rect(f, 12, ny - 6, 3, 40, C.ACCENT, 2);
    }
    ic(f, it[0], m.kind === 'desktop' ? 28 : 22, ny + 2, 20, isActive ? C.ACCENT : C.INK3);
    if (m.kind === 'desktop') txt(f, 60, ny + 5, it[1], 14, isActive ? 600 : 400, isActive ? C.INK : C.INK2);
  });
  // карточка пользователя
  if (m.kind === 'desktop') {
    avatar(f, 20, m.h - 64, 36, 'АК');
    txt(f, 66, m.h - 62, 'Анна К.', 13, 600, C.INK);
    txt(f, 66, m.h - 44, 'психолог', 11, 400, C.INK3);
  }
  // верхняя панель
  const tb = rect(f, sbw, 0, m.w - sbw, 72, C.WHITE, 0);
  setStroke(tb, C.BD, 1, 'inner');
  tb.name = 'topbar';
  txt(f, sbw + 24, 24, title, 20, 600, C.INK);
  ic(f, 'search', m.w - 120, 26, 20, C.INK2);
  avatar(f, m.w - 84, 20, 32, 'АК');
  return { cx: sbw + 24, cy: 96, cw: m.w - sbw - 48, ch: m.h - 120 };
}

export function authShell(f: any, m: Mode): { cardX: number; cardW: number; y: number } {
  rect(f, 20, 20, 28, 28, C.ACCENT, 8);
  txt(f, 56, 22, 'Platform', 16, 700, C.INK);
  const cardW = Math.min(480, m.w - 40);
  const cardX = Math.round((m.w - cardW) / 2);
  return { cardX, cardW, y: 120 };
}

export function cardBox(f: any, x: number, y: number, w: number, h: number, name: string): void {
  const c = rect(f, x, y, w, h, C.WHITE, 12);
  setStroke(c, C.BD, 1, 'inner');
  setShadow(c, 0, 4, 12, 0.08);
  c.name = name;
}

// Переиспользуемые блоки контента ---------------------------------------------

export function bubble(f: any, x: number, y: number, w: number, text1: string, text2: string,
                side: 'left' | 'right'): number {
  const h = 64;
  const b = rect(f, x, y, w, h, side === 'left' ? C.BG2 : C.ACCENT, 12);
  b.name = 'ClientMessageBubble / ' + side;
  txt(f, x + 16, y + 12, text1, 14, 400, side === 'left' ? C.INK : '#FFFFFF');
  txt(f, x + 16, y + 32, text2, 14, 400, side === 'left' ? C.INK : '#FFFFFF');
  return h;
}

export function answerRow(f: any, x: number, y: number, w: number, text: string, tech: string): number {
  const h = 58;
  const card = rect(f, x, y, w, h, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'AnswerOption / default';
  txt(f, x + 14, y + 9, text, 12, 400, C.INK);
  const chipBg = rect(f, x + 14, y + 30, tech.length * 6.6 + 26, 22, C.WHITE, 11);
  setStroke(chipBg, C.BD, 1, 'inner');
  makeEllipse(f, x + 22, y + 37, 8, 8, '#2563EB');
  txt(f, x + 34, y + 33, tech, 11, 500, '#1D4ED8');
  return h + 12;
}

function stepsRow(f: any, x: number, y: number, labels: string[], current: number): number {
  const gap = 120;
  for (let i = 0; i < labels.length; i++) {
    const cx = x + i * gap;
    if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= current ? C.ACCENT : C.BG3, 1);
    if (i < current) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      ic(f, 'check', cx + 6, y + 6, 12, '#FFFFFF');
    } else if (i === current) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 600, '#FFFFFF');
      centerTextIn(t, cx, 24);
    } else {
      makeEllipse(f, cx, y, 24, 24, C.BG3);
      const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 500, C.INK3);
      centerTextIn(t, cx, 24);
    }
    txt(f, cx - 14, y + 32, labels[i], 10, 400, i <= current ? C.INK2 : C.INK3);
  }
  return 56;
}

export function skillBarRow(f: any, x: number, y: number, w: number, name: string,
                     ball: number, color: string): number {
  txt(f, x, y, name, 12, 500, C.INK2);
  txt(f, x + w - 46, y, String(ball), 12, 600, C.INK);
  rect(f, x, y + 20, w, 6, C.BG3, 3);
  rect(f, x, y + 20, Math.max(6, Math.round(w * ball / 100)), 6, color, 3);
  return 40;
}

// ---------------------------------------------------------------------------
// E-01 Лендинг
// ---------------------------------------------------------------------------

function e01(f: any, m: Mode): void {
  // верхняя навигация
  rect(f, 20, 20, 28, 28, C.ACCENT, 8);
  txt(f, 56, 22, 'Platform', 16, 700, C.INK);
  if (m.kind === 'desktop') {
    ['Возможности', 'Сценарии', 'Игры', 'Тарифы'].forEach((l, i) => {
      txt(f, 460 + i * 110, 25, l, 14, 400, C.INK2);
    });
  }
  btn(f, m.w - (m.kind === 'desktop' ? 220 : 130), 16, m.kind === 'desktop' ? 96 : 110, 'Войти', 'ghost', { h: 36 });
  btn(f, m.w - (m.kind === 'desktop' ? 116 : 16), 16, 100, 'Начать', 'primary', { h: 36, fs: 13 });

  const isDesktop = m.kind === 'desktop';
  const hx = isDesktop ? 96 : 24;
  let hy = 130;

  txt(f, hx, hy, 'ОБУЧАЮЩАЯ ПЛАТФОРМА ДЛЯ ПСИХОЛОГОВ', 12, 500, C.ACCENT);
  hy += 32;
  txt(f, hx, hy, 'Отработайте консультацию', isDesktop ? 40 : 30, 700, C.INK);
  hy += isDesktop ? 48 : 38;
  txt(f, hx, hy, 'до встречи с клиентом', isDesktop ? 40 : 30, 700, C.INK);
  hy += isDesktop ? 60 : 48;
  txt(f, hx, hy, 'Симулятор с ИИ-клиентом, разбор по 8 навыкам и терапевтические', 16, 400, C.INK2);
  hy += 26;
  txt(f, hx, hy, 'игры для ваших клиентов — в вебе и Telegram.', 16, 400, C.INK2);
  hy += 40;

  btn(f, hx, hy, 200, 'Попробовать демо', 'primary', { icon: 'play', h: 48 });
  if (isDesktop) btn(f, hx + 216, hy, 160, 'Регистрация', 'secondary', { h: 48 });
  hy += 84;

  // превью симулятора
  if (isDesktop) {
    cardBox(f, 800, 120, 520, 380, 'demo-preview');
    rect(f, 800, 120, 520, 40, C.BG2, 12);
    makeEllipse(f, 820, 132, 16, 16, C.ERROR);
    makeEllipse(f, 844, 132, 16, 16, C.WARNING);
    makeEllipse(f, 868, 132, 16, 16, C.SUCCESS);
    txt(f, 900, 132, 'Демо · сценарий «Первичная консультация»', 12, 400, C.INK2);
    bubble(f, 824, 184, 400, 'Здравствуйте. Мне немного страшно', 'начинать… но пора что-то менять.', 'left');
    txt(f, 824, 258, 'эмоция 4/10 · тревожность', 11, 500, C.WARNING);
    answerRow(f, 824, 284, 472, 'Рад, что вы решили поговорить об этом. Что страшнее всего?', 'эмпатия');
    answerRow(f, 824, 354, 472, 'Расскажите, что вы уже пробовали менять?', 'вопрошание');
  } else {
    cardBox(f, hx, hy, m.w - 48, 240, 'demo-preview');
    bubble(f, hx + 16, hy + 16, m.w - 80, 'Здравствуйте. Мне немного', 'страшно начинать… но пора.', 'left');
    txt(f, hx + 16, hy + 90, 'эмоция 4/10 · тревожность', 11, 500, C.WARNING);
    answerRow(f, hx + 16, hy + 112, m.w - 80, 'Рад, что вы решились. Что страшнее всего?', 'эмпатия');
    hy += 270;
  }

  // преимущества
  const advY = isDesktop ? 620 : hy + 16;
  const cards: [string, string, string][] = [
    ['target', '8 навыков с разбором', 'Активное слушание, эмпатия, границы — с баллами и альтернативными ходами'],
    ['chart-column', 'Супервизия и прогресс', 'Комментарии супервизора, радар навыков, динамика по неделям'],
    ['sparkles', 'Игры для клиентов', 'Выдавайте терапевтические игры по ссылке и коду — в Telegram или вебе'],
  ];
  const cw = isDesktop ? (m.w - 96 * 2 - 48) / 3 : m.w - 48;
  cards.forEach((cdef, i) => {
    const cx = isDesktop ? 96 + i * (cw + 24) : 24;
    const cy = isDesktop ? advY : advY + i * 128;
    cardBox(f, cx, cy, cw, isDesktop ? 170 : 116, 'advantage');
    ic(f, cdef[0], cx + 20, cy + 20, 24, C.ACCENT);
    txt(f, cx + 56, cy + 22, cdef[1], 15, 600, C.INK);
    txt(f, cx + 20, cy + 58, cdef[2].slice(0, isDesktop ? 46 : 40), 12, 400, C.INK2);
    if (!isDesktop) txt(f, cx + 20, cy + 76, cdef[2].slice(isDesktop ? 46 : 40) || ' ', 12, 400, C.INK2);
  });

  // футер
  const ft = rect(f, 0, m.h - 56, m.w, 56, C.INK, 0);
  ft.name = 'footer';
  txt(f, 24, m.h - 37, '© 2026 Platform · Политика конфиденциальности · Оферта', 12, 400, '#94A3B8');
}

// ---------------------------------------------------------------------------
// E-02 Демо-симуляция (гость)
// ---------------------------------------------------------------------------

function e02(f: any, m: Mode): void {
  rect(f, 20, 20, 28, 28, C.ACCENT, 8);
  txt(f, 56, 22, 'Platform', 16, 700, C.INK);
  btn(f, m.w - 120, 16, 100, 'Войти', 'ghost', { h: 36 });

  // баннер регистрации
  const bw = m.w - (m.kind === 'desktop' ? 96 * 2 : 32);
  const bx = m.kind === 'desktop' ? 96 : 16;
  const bn = rect(f, bx, 72, bw, 52, '#EFF6FF', 10);
  setStroke(bn, '#BFDBFE', 1, 'inner');
  bn.name = 'banner/register';
  ic(f, 'info', bx + 16, 88, 18, C.ACCENT);
  txt(f, bx + 44, 82, 'Зарегистрируйтесь, чтобы сохранить прогресс', 13, 500, '#1E40AF');
  txt(f, bx + 44, 102, 'Демо: 1 короткий сценарий · без сохранения', 11, 400, '#3B82F6');

  // сессия
  const sw = Math.min(680, bw - 32);
  const sx = Math.round((m.w - sw) / 2);
  let sy = 152;
  // прогресс
  txt(f, sx, sy, 'ШАГ 1 ИЗ 3', 11, 500, C.INK3);
  txt(f, sx + 90, sy - 1, 'Первичная консультация', 12, 600, C.INK);
  rect(f, sx, sy + 20, sw, 6, C.BG3, 3);
  rect(f, sx, sy + 20, Math.round(sw / 3), 6, C.ACCENT, 3);
  sy += 52;
  sy += bubble(f, sx, sy, Math.min(sw - 40, 430), 'Здравствуйте… Честно, я уже не знаю,', 'куда себя девать. Всё валится из рук.', 'left') + 26;
  ic(f, 'frown', sx + 2, sy, 14, C.ERROR);
  txt(f, sx + 22, sy - 2, 'эмоция 3/10 · низкий фон', 11, 500, C.ERROR);
  sy += 28;
  sy += answerRow(f, sx, sy, sw, 'Рад, что вы написали. Расскажите, что изменилось за последнюю неделю?', 'вопрошание');
  sy += answerRow(f, sx, sy, sw, 'Похоже, сейчас для вас всё слишком. Как вы это ощущаете?', 'активное слушание');
  sy += answerRow(f, sx, sy, sw, 'Начнём с дыхательных упражнений, это поможет.', 'совет без запроса');
  // свой вариант
  const own = rect(f, sx, sy, sw, 44, C.WHITE, 10);
  try { own.strokes = [{ strokeColor: C.INK3, strokeOpacity: 1, strokeWidth: 1, strokeAlignment: 'inner', strokeStyle: 'dashed' }]; } catch (_) { /* сплошная */ }
  own.name = 'own-variant';
  txt(f, sx + 16, sy + 13, 'Написать свой вариант… (beta)', 13, 400, C.INK3);

  if (m.kind === 'mobile') {
    btn(f, 16, m.h - 84, m.w - 32, 'Зарегистрироваться и сохранить', 'primary', { h: 48 });
  }
}

// ---------------------------------------------------------------------------
// E-03 Вход
// ---------------------------------------------------------------------------

function e03(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX;
  const w = sh.cardW;
  let y = sh.y;

  cardBox(f, x, y, w, 468, 'E-03 card');
  const px = x + 28;
  const pw = w - 56;
  let cy = y + 28;

  txt(f, px, cy, 'Вход', 24, 700, C.INK);
  cy += 44;
  btn(f, px, cy, pw, 'Войти через Telegram', 'primary', { icon: 'send', h: 44 });
  cy += 68;
  // разделитель
  line(f, px, cy + 10, pw * 0.42 - 8);
  line(f, px + pw * 0.58 + 8, cy + 10, pw * 0.42 - 8);
  const orT = txt(f, px, cy + 2, 'или', 12, 400, C.INK3);
  centerTextIn(orT, px, pw);
  cy += 32;
  cy += inputLine(f, px, cy, pw, 'Email', 'name@example.com');
  cy += inputLine(f, px, cy, pw, 'Пароль', '••••••••', { password: true });
  btn(f, px, cy, pw, 'Войти', 'primary', { h: 44 });
  cy += 60;
  const fg = txt(f, px, cy, 'Забыли пароль?', 13, 500, C.ACCENT);
  centerTextIn(fg, px, pw);
  cy += 32;
  const su = txt(f, px, cy, 'Нет аккаунта?  Регистрация', 13, 400, C.INK2);
  centerTextIn(su, px, pw);
}

// ---------------------------------------------------------------------------
// E-04 Регистрация
// ---------------------------------------------------------------------------

function e04(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX;
  const w = sh.cardW;
  let y = sh.y;
  const H = m.kind === 'mobile' ? 760 : 640;
  cardBox(f, x, y, w, H, 'E-04 card');
  const px = x + 28;
  const pw = w - 56;
  let cy = y + 28;

  txt(f, px, cy, 'Регистрация', 24, 700, C.INK);
  cy += 40;

  const roles: [string, string, string, boolean][] = [
    ['user', 'Психолог', 'Практикующий специалист', true],
    ['graduation-cap', 'Студент', 'Учусь, отрабатываю навыки', false],
    ['users', 'Супервизор', 'По приглашению', false],
  ];
  roles.forEach((r, i) => {
    const selected = r[3];
    const rw = m.kind === 'mobile' ? pw : Math.round((pw - 16) / 3);
    const rx = px + i * (rw + (m.kind === 'mobile' ? 0 : 8));
    const ry = cy + i * (m.kind === 'mobile' ? 76 : 0);
    const card = rect(f, rx, ry, rw, 68, selected ? '#EFF6FF' : C.WHITE, 10);
    setStroke(card, selected ? C.ACCENT : C.BD, selected ? 2 : 1, 'inner');
    card.name = 'role-card/' + r[1];
    ic(f, r[0], rx + 12, ry + 12, 20, selected ? C.ACCENT : C.INK3);
    txt(f, rx + 40, ry + 10, r[1], 13, 600, selected ? C.ACCENT : C.INK);
    txt(f, rx + 40, ry + 30, r[2].slice(0, Math.floor(rw / 6.4)), 10, 400, C.INK3);
    if (selected) ic(f, 'circle-check', rx + rw - 26, ry + 12, 16, C.ACCENT);
  });
  cy += m.kind === 'mobile' ? 76 * 3 + 12 : 92;

  cy += inputLine(f, px, cy, pw, 'Email', 'name@example.com');
  cy += inputLine(f, px, cy, pw, 'Пароль', 'Придумайте пароль', { password: true });

  // согласие
  const box = rect(f, px, cy + 2, 18, 18, C.ACCENT, 5);
  box.name = 'checkbox';
  ic(f, 'check', px + 3, cy + 5, 12, '#FFFFFF');
  txt(f, px + 28, cy + 2, 'Принимаю условия и политику конфиденциальности', 12, 400, C.INK2);
  cy += 40;

  btn(f, px, cy, pw, 'Создать аккаунт', 'primary', { h: 44 });
  cy += 64;
  const si = txt(f, px, cy, 'Уже есть аккаунт?  Войти', 13, 400, C.INK2);
  centerTextIn(si, px, pw);
}

// ---------------------------------------------------------------------------
// E-05 Восстановление пароля
// ---------------------------------------------------------------------------

function e05(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX;
  const w = sh.cardW;
  let y = sh.y;
  cardBox(f, x, y, w, 380, 'E-05 card');
  const px = x + 28;
  const pw = w - 56;
  let cy = y + 28;
  txt(f, px, cy, 'Восстановление пароля', 22, 700, C.INK);
  cy += 36;
  txt(f, px, cy, 'Отправим ссылку для смены пароля', 14, 400, C.INK2);
  cy += 22;
  txt(f, px, cy, 'на указанный email.', 14, 400, C.INK2);
  cy += 36;
  cy += inputLine(f, px, cy, pw, 'Email', 'name@example.com');
  btn(f, px, cy, pw, 'Отправить ссылку', 'primary', { h: 44 });
  cy += 64;
  txt(f, px, cy, '←  Ко входу', 13, 500, C.ACCENT);
}

// ---------------------------------------------------------------------------
// E-06 Онбординг психолога · E-07 Онбординг студента
// ---------------------------------------------------------------------------

function e06(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX, w = sh.cardW;
  txt(f, x, 92, 'ОНБОРДИНГ ПСИХОЛОГА', 11, 500, C.INK3);
  let y = 128;
  const steps = ['Профиль', 'Специализация', 'Верификация', 'Готово'];
  const gap = m.kind === 'mobile' ? 92 : 120;
  for (let i = 0; i < steps.length; i++) {
    const cx = x + i * gap;
    if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 1 ? C.ACCENT : C.BG3, 1);
    if (i < 1) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      ic(f, 'check', cx + 6, y + 6, 12, '#FFFFFF');
    } else if (i === 1) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      const t = txt(f, cx + 9, y + 4, '2', 12, 600, '#FFFFFF');
      centerTextIn(t, cx, 24);
    } else {
      makeEllipse(f, cx, y, 24, 24, C.BG3);
      const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 500, C.INK3);
      centerTextIn(t, cx, 24);
    }
    txt(f, cx - 22, y + 32, steps[i], 10, 400, i <= 1 ? C.INK2 : C.INK3);
  }
  y += 80;
  cardBox(f, x, y, w, m.kind === 'mobile' ? 400 : 360, 'E-06 card');
  const px = x + 28, pw = w - 56;
  let cy = y + 28;
  txt(f, px, cy, 'Выберите специализацию', 20, 600, C.INK);
  cy += 30;
  txt(f, px, cy, 'Можно выбрать несколько — подберём сценарии', 13, 400, C.INK2);
  cy += 34;
  const chips: [string, boolean][] = [
    ['Тревожность', true], ['Выгорание', true], ['Отношения', false], ['ОКР', false],
    ['ПТСР', false], ['Подростки', false], ['Дети', false], ['Кризисы', false],
  ];
  let chx = px, chy = cy;
  chips.forEach((cdef) => {
    const cwd = Math.round(cdef[0].length * 7.2) + 40;
    if (chx + cwd > px + pw) { chx = px; chy += 44; }
    const selected = cdef[1];
    const chipEl = rect(f, chx, chy, cwd, 32, selected ? '#EFF6FF' : C.WHITE, 16);
    setStroke(chipEl, selected ? C.ACCENT : C.BD, selected ? 2 : 1, 'inner');
    txt(f, chx + 14, chy + 7, cdef[0], 13, selected ? 600 : 400, selected ? C.ACCENT : C.INK2);
    if (selected) ic(f, 'check', chx + cwd - 22, chy + 9, 14, C.ACCENT);
    chx += cwd + 12;
  });
  cy = chy + 76;
  btn(f, px, cy, 140, 'Далее', 'primary', { h: 44 });
  txt(f, px + 160, cy + 13, 'Пропустить', 13, 500, C.INK3);
}

function e07(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX, w = sh.cardW;
  txt(f, x, 92, 'ОНБОРДИНГ СТУДЕНТА', 11, 500, C.INK3);
  let y = 128;
  const steps = ['Профиль', 'Вуз / группа', 'Готово'];
  const gap = m.kind === 'mobile' ? 110 : 140;
  for (let i = 0; i < steps.length; i++) {
    const cx = x + i * gap;
    if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 1 ? C.ACCENT : C.BG3, 1);
    if (i < 1) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      ic(f, 'check', cx + 6, y + 6, 12, '#FFFFFF');
    } else if (i === 1) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      const t = txt(f, cx + 9, y + 4, '2', 12, 600, '#FFFFFF');
      centerTextIn(t, cx, 24);
    } else {
      makeEllipse(f, cx, y, 24, 24, C.BG3);
      const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 500, C.INK3);
      centerTextIn(t, cx, 24);
    }
    txt(f, cx - 20, y + 32, steps[i], 10, 400, i <= 1 ? C.INK2 : C.INK3);
  }
  y += 80;
  cardBox(f, x, y, w, 380, 'E-07 card');
  const px = x + 28, pw = w - 56;
  let cy = y + 28;
  txt(f, px, cy, 'Вуз и группа', 20, 600, C.INK);
  cy += 30;
  txt(f, px, cy, 'Необязательно. Данные увидит только ваш супервизор.', 13, 400, C.INK2);
  cy += 34;
  cy += inputLine(f, px, cy, pw, 'Вуз', 'МГУ, факультет психологии');
  cy += inputLine(f, px, cy, pw, 'Группа', 'ПС-304');
  const box = rect(f, px, cy + 2, 18, 18, C.WHITE, 5);
  setStroke(box, C.BD, 1, 'inner');
  txt(f, px + 28, cy + 2, 'Скрыть в профиле', 13, 400, C.INK2);
  cy += 44;
  btn(f, px, cy, 140, 'Далее', 'primary', { h: 44 });
}

// ---------------------------------------------------------------------------
// E-08 Верификация психолога
// ---------------------------------------------------------------------------

function e08(f: any, m: Mode): void {
  const sh = authShell(f, m);
  const x = sh.cardX, w = sh.cardW;
  txt(f, x, 92, 'ВЕРИФИКАЦИЯ', 11, 500, C.INK3);
  let y = 128;
  const steps = ['Профиль', 'Специализация', 'Верификация', 'Готово'];
  const gap = m.kind === 'mobile' ? 92 : 120;
  for (let i = 0; i < steps.length; i++) {
    const cx = x + i * gap;
    if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 2 ? C.ACCENT : C.BG3, 1);
    if (i < 2) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      ic(f, 'check', cx + 6, y + 6, 12, '#FFFFFF');
    } else if (i === 2) {
      makeEllipse(f, cx, y, 24, 24, C.ACCENT);
      const t = txt(f, cx + 9, y + 4, '3', 12, 600, '#FFFFFF');
      centerTextIn(t, cx, 24);
    } else {
      makeEllipse(f, cx, y, 24, 24, C.BG3);
      const t = txt(f, cx + 9, y + 4, '4', 12, 500, C.INK3);
      centerTextIn(t, cx, 24);
    }
    txt(f, cx - 22, y + 32, steps[i], 10, 400, i <= 2 ? C.INK2 : C.INK3);
  }
  y += 80;
  cardBox(f, x, y, w, 460, 'E-08 card');
  const px = x + 28, pw = w - 56;
  let cy = y + 28;
  txt(f, px, cy, 'Подтвердите квалификацию', 20, 600, C.INK);
  cy += 28;
  txt(f, px, cy, 'Документ видит только модератор. После проверки — бейдж', 13, 400, C.INK2);
  cy += 20;
  txt(f, px, cy, '«Верифицирован» и доступ к выдаче игр.', 13, 400, C.INK2);
  cy += 32;
  // dropzone
  const dz = rect(f, px, cy, pw, 96, C.BG2, 12);
  try { dz.strokes = [{ strokeColor: C.ACCENT, strokeOpacity: 1, strokeWidth: 1.5, strokeAlignment: 'inner', strokeStyle: 'dashed' }]; } catch (_) { /* сплошная */ }
  dz.name = 'dropzone';
  ic(f, 'file-text', px + pw / 2 - 64, cy + 24, 24, C.ACCENT);
  txt(f, px + pw / 2 - 32, cy + 24, 'Загрузите диплом', 14, 600, C.INK);
  txt(f, px + pw / 2 - 32, cy + 46, 'PDF или JPG, до 10 МБ', 12, 400, C.INK3);
  cy += 116;
  // загруженный файл
  const fileRow = rect(f, px, cy, pw, 52, C.WHITE, 10);
  setStroke(fileRow, C.BD, 1, 'inner');
  ic(f, 'file-text', px + 14, cy + 16, 20, C.INK2);
  txt(f, px + 44, cy + 10, 'diploma.pdf', 13, 500, C.INK);
  txt(f, px + 44, cy + 30, '2,4 МБ · загружено', 11, 400, C.INK3);
  ic(f, 'circle-check', px + pw - 30, cy + 16, 18, C.SUCCESS);
  cy += 68;
  // статус
  const st = rect(f, px, cy, 130, 28, '#FEF3C7', 14);
  st.name = 'status/pending';
  ic(f, 'clock', px + 12, cy + 7, 14, '#92400E');
  txt(f, px + 32, cy + 6, 'На проверке', 12, 500, '#92400E');
  txt(f, px + 144, cy + 6, 'обычно до 24 часов', 12, 400, C.INK3);
  cy += 56;
  btn(f, px, cy, 240, 'Отправить на проверку', 'primary', { h: 44 });
}

// ---------------------------------------------------------------------------
// E-10 Дашборд психолога
// ---------------------------------------------------------------------------

function sessionsRows(f: any, x: number, y: number, w: number, count: number): number {
  const rows: [string, string, number][] = [
    ['16.09 · 14:00', 'Работа с сопротивлением', 86],
    ['14.09 · 12:30', 'Первичная консультация', 74],
    ['12.09 · 18:00', 'Активное слушание', 91],
    ['10.09 · 11:00', 'Границы и контракт', 68],
  ];
  rows.slice(0, count).forEach((r, i) => {
    const ry = y + i * 48;
    txt(f, x, ry + 4, r[0], 12, 400, C.INK3);
    txt(f, x + 110, ry + 3, r[1], 13, 500, C.INK);
    const sc = rect(f, x + w - 88, ry, 44, 24, '#DCFCE7', 12);
    sc.name = 'score-chip';
    const t = txt(f, x + w - 78, ry + 4, String(r[2]), 12, 600, '#166534');
    centerTextIn(t, x + w - 88, 44);
    ic(f, 'chevron-right', x + w - 28, ry + 4, 16, C.INK3);
    line(f, x, ry + 40, w);
  });
  return count * 48;
}

function clientRows(f: any, x: number, y: number, w: number, count: number): number {
  const rows: [string, string, string, string][] = [
    ['КА', 'Клиент А', '#DCFCE7', '#166534'],
    ['КБ', 'Клиент Б', '#E0F2FE', '#0C4A6E'],
    ['КВ', 'Клиент В', '#FEF3C7', '#92400E'],
  ];
  rows.slice(0, count).forEach((r, i) => {
    const ry = y + i * 52;
    avatar(f, x, ry, 36, r[0], C.ACCENT2);
    txt(f, x + 48, ry + 2, r[1], 13, 600, C.INK);
    txt(f, x + 48, ry + 20, 'Дневник эмоций · 3 дня назад', 11, 400, C.INK3);
    const chipEl = rect(f, x + w - 88, ry + 6, 88, 24, r[2], 12);
    chipEl.name = 'status-chip';
    const labels: Record<string, string> = { '#DCFCE7': 'активен', '#E0F2FE': 'завершён', '#FEF3C7': 'истёк' };
    txt(f, x + w - 80, ry + 10, labels[r[2]], 11, 500, r[3]);
    line(f, x, ry + 44, w);
  });
  return count * 52;
}

function e10(f: any, m: Mode): void {
  const box = shell(f, m, 0, 'Дашборд');
  let y = box.cy;
  const W = box.cw;

  txt(f, box.cx, y, 'Добрый день, Анна', m.kind === 'mobile' ? 22 : 24, 700, C.INK);
  txt(f, box.cx, y + (m.kind === 'mobile' ? 32 : 36), 'понедельник, 16 сентября · 3 сессии на этой неделе', 13, 400, C.INK2);
  y += m.kind === 'mobile' ? 60 : 68;

  // CTA
  if (m.kind === 'mobile') {
    btn(f, box.cx, y, W, 'Начать симуляцию', 'primary', { icon: 'play', h: 44 });
    y += 56;
    btn(f, box.cx, y, W, 'Выдать игру', 'secondary', { icon: 'send', h: 44 });
    y += 64;
  } else {
    btn(f, box.cx, y - 8, 190, 'Начать симуляцию', 'primary', { icon: 'play', h: 44 });
    btn(f, box.cx + 206, y - 8, 160, 'Выдать игру', 'secondary', { icon: 'send', h: 44 });
    y += 60;
  }

  const isDesktop = m.kind === 'desktop';
  const colW = isDesktop ? Math.round((W - 24) * 0.6) : W;

  // Радар
  const radarH = isDesktop ? 320 : 380;
  cardBox(f, box.cx, y, colW, radarH, 'card/radar');
  txt(f, box.cx + 20, y + 18, 'Прогресс навыков', 16, 600, C.INK);
  txt(f, box.cx + colW - 168, y + 20, 'средний балл 72/100', 12, 500, C.INK2);
  try {
    const o = getOrigin();
    const svg = penpot.createShapeFromSvg(radarSvg(isDesktop ? 240 : 200));
    if (svg) {
      f.appendChild(svg);
      svg.x = o.x + box.cx + 20;
      svg.y = o.y + y + 52;
      svg.name = 'radar';
    }
  } catch (_) { /* радар опционален */ }
  // топ-навыки справа от радара (desktop) или ниже (tablet/mobile)
  const skx = isDesktop ? box.cx + 300 : box.cx + 20;
  const sky = isDesktop ? y + 70 : y + 156;
  const rowsCount = isDesktop ? 4 : 3;
  const skw = isDesktop ? colW - 330 : colW - 40;
  [86, 72, 77, 49].slice(0, rowsCount).forEach((ball, i) => {
    const names = ['Активное слушание', 'Эмпатия', 'Структура', 'Сопротивление'];
    const colors = ['#2563EB', '#7C3AED', '#65A30D', '#EA580C'];
    skillBarRow(f, skx, sky + i * 44, skw, names[i], ball, colors[i]);
  });
  y += radarH + 16;

  // Сессии
  const sessH = 60 + (m.kind === 'mobile' ? 3 : 4) * 48 + 16;
  cardBox(f, box.cx, y, colW, sessH, 'card/sessions');
  txt(f, box.cx + 20, y + 18, 'Последние сессии', 16, 600, C.INK);
  sessionsRows(f, box.cx + 20, y + 52, colW - 40, m.kind === 'mobile' ? 3 : 4);
  y += sessH + 16;

  if (!isDesktop) {
    // клиенты + достижения одной колонкой
    const cliH = 60 + 2 * 52 + 12;
    cardBox(f, box.cx, y, W, cliH, 'card/clients');
    txt(f, box.cx + 20, y + 18, 'Активные клиенты', 16, 600, C.INK);
    clientRows(f, box.cx + 20, y + 52, W - 40, 2);
    y += cliH + 16;
  }

  // Достижения
  const tiles: [string, string, string][] = [
    ['trophy', '10 сессий', 'пройдено за месяц'],
    ['sparkles', 'Серия 5 дней', 'не пропускайте тренировки'],
    ['star', 'Эмпатия 80+', 'новый уровень навыка'],
  ];
  const tw2 = isDesktop ? Math.round((W - colW - 24 - 32) / 3) : Math.round((W - 24) / 3);
  const ax = isDesktop ? box.cx + colW + 24 : box.cx;
  const ah = 60 + 96;
  cardBox(f, ax, isDesktop ? box.cy + 68 : y, isDesktop ? W - colW - 24 : W, ah, 'card/achievements');
  txt(f, ax + 20, (isDesktop ? box.cy + 68 : y) + 18, 'Достижения', 16, 600, C.INK);
  tiles.forEach((tl, i) => {
    const txp = ax + 20 + i * (tw2 + 8);
    const typ = (isDesktop ? box.cy + 68 : y) + 52;
    const tile = rect(f, txp, typ, tw2 - 8, 92, C.BG2, 10);
    tile.name = 'achievement';
    ic(f, tl[0], txp + 14, typ + 14, 22, C.ACCENT);
    txt(f, txp + 14, typ + 46, tl[1], 13, 600, C.INK);
    txt(f, txp + 14, typ + 66, tl[2].slice(0, 18), 10, 400, C.INK3);
  });

  if (isDesktop) {
    // клиенты (правая колонка, под достижениями)
    const cliY = box.cy + 68 + ah + 16;
    const cliH = 60 + 3 * 52 + 12;
    cardBox(f, ax, cliY, W - colW - 24, cliH, 'card/clients');
    txt(f, ax + 20, cliY + 18, 'Активные клиенты', 16, 600, C.INK);
    clientRows(f, ax + 20, cliY + 52, W - colW - 64, 3);
  }
}

// ---------------------------------------------------------------------------
// E-11 Дашборд студента
// ---------------------------------------------------------------------------

function e11(f: any, m: Mode): void {
  const box = shell(f, m, 0, 'Дашборд');
  let y = box.cy;
  const W = box.cw;

  txt(f, box.cx, y, 'Привет, Дмитрий', m.kind === 'mobile' ? 22 : 24, 700, C.INK);
  txt(f, box.cx, y + (m.kind === 'mobile' ? 32 : 36), 'рекомендовано супервизором: 2 сценария', 13, 400, C.INK2);
  y += m.kind === 'mobile' ? 60 : 64;

  const isDesktop = m.kind === 'desktop';
  const mainW = isDesktop ? Math.round((W - 24) * 0.62) : W;

  // Рекомендованные сценарии
  const scH = 96;
  ['Работа с сопротивлением', 'Циркулярные вопросы'].forEach((title, i) => {
    const cx = isDesktop ? box.cx + i * (mainW + 24) * 0 + i * 0 : box.cx;
    const cw2 = mainW;
    const cy2 = y + i * (scH + 12);
    cardBox(f, box.cx, cy2, cw2, scH, 'ScenarioCard / compact');
    txt(f, box.cx + 20, cy2 + 16, title, 15, 600, C.INK);
    for (let d = 0; d < 5; d++) makeEllipse(f, box.cx + 20 + d * 13, cy2 + 44, 8, 8, d < (i === 0 ? 4 : 3) ? C.ACCENT : C.BG3);
    txt(f, box.cx + 92, cy2 + 40, '· 15 мин · рекомендовано', 11, 400, C.INK3);
    const bEl = rect(f, box.cx + cw2 - 108, cy2 + 30, 88, 32, C.ACCENT, 16);
    bEl.name = 'Button / primary / sm';
    txt(f, box.cx + cw2 - 84, cy2 + 38, 'Начать', 13, 600, '#FFFFFF');
  });
  y += (scH + 12) * 2 + 8;

  // Прогресс + комментарий супервизора
  const radarH = 250;
  cardBox(f, box.cx, y, isDesktop ? 380 : W, radarH, 'card/progress');
  txt(f, box.cx + 20, y + 18, 'Мой прогресс', 16, 600, C.INK);
  try {
    const o = getOrigin();
    const svg = penpot.createShapeFromSvg(radarSvg(180));
    if (svg) { f.appendChild(svg); svg.x = o.x + box.cx + 20; svg.y = o.y + y + 50; svg.name = 'radar'; }
  } catch (_) { /* опционально */ }
  skillBarRow(f, box.cx + 210, y + 66, (isDesktop ? 380 : W) - 230, 'Слушание', 81, '#2563EB');
  skillBarRow(f, box.cx + 210, y + 110, (isDesktop ? 380 : W) - 230, 'Рефлексия', 68, '#9333EA');
  skillBarRow(f, box.cx + 210, y + 154, (isDesktop ? 380 : W) - 230, 'Границы', 64, '#0891B2');
  txt(f, box.cx + 210, y + 200, 'средний балл 71 · +6 за неделю', 12, 500, C.SUCCESS);

  const comX = isDesktop ? box.cx + 404 : box.cx;
  const comW = isDesktop ? W - 428 : W;
  const comH = 150;
  const com = rect(f, comX, y, comW, comH, C.BG2, 12);
  setStroke(com, C.BD, 1, 'inner');
  com.name = 'SupervisionComment';
  avatar(f, comX + 16, y + 16, 32, 'МП');
  txt(f, comX + 58, y + 14, 'М. Петрова', 13, 600, C.INK);
  txt(f, comX + 58, y + 32, 'супервизор · вчера', 11, 400, C.INK3);
  txt(f, comX + 16, y + 58, 'Хороший ход на 4-й реплике. На моменте 06:40 уместен', 12, 400, C.INK2);
  txt(f, comX + 16, y + 76, 'циркулярный вопрос. Оценка: 82/100. Рекомендую сценарий', 12, 400, C.INK2);
  txt(f, comX + 16, y + 94, '«Циркулярные вопросы».', 12, 400, C.INK2);
  txt(f, comX + 16, y + 120, 'Открыть сессию →', 12, 500, C.ACCENT);
  y += radarH + 16;

  // Достижения
  const tiles: [string, string][] = [
    ['trophy', 'Первый сценарий'], ['zap', 'Серия 3 дня'], ['star', 'Слушание 80+'],
  ];
  const tw3 = Math.round((W - 24) / 3);
  const achY = y;
  cardBox(f, box.cx, achY, W, 168, 'card/achievements');
  txt(f, box.cx + 20, achY + 18, 'Достижения', 16, 600, C.INK);
  tiles.forEach((tl, i) => {
    const txp = box.cx + 20 + i * (tw3 + 4);
    const tile = rect(f, txp, achY + 52, tw3 - 8, 92, C.BG2, 10);
    tile.name = 'achievement';
    ic(f, tl[0], txp + 14, achY + 66, 22, C.ACCENT);
    txt(f, txp + 14, achY + 98, tl[1], 13, 600, C.INK);
  });
}

// ---------------------------------------------------------------------------
// E-12 Дашборд супервизора
// ---------------------------------------------------------------------------

function e12(f: any, m: Mode): void {
  const box = shell(f, m, 3, 'Студенты');
  let y = box.cy;
  const W = box.cw;

  txt(f, box.cx, y, 'Кабинет супервизора', m.kind === 'mobile' ? 22 : 24, 700, C.INK);
  y += m.kind === 'mobile' ? 44 : 48;

  // статистика
  const stats: [string, string, string][] = [
    ['users', '12', 'студентов'],
    ['book-open', '38', 'сессий за неделю'],
    ['triangle-alert', '3', 'требуют внимания'],
  ];
  const stw = m.kind === 'mobile' ? Math.round((W - 16) / 3) : 170;
  stats.forEach((s, i) => {
    const sx2 = box.cx + i * (stw + 12);
    const card = rect(f, sx2, y, stw, 84, C.BG2, 12);
    card.name = 'stat-card';
    ic(f, s[0], sx2 + 16, y + 16, 20, i === 2 ? C.WARNING : C.ACCENT);
    txt(f, sx2 + 44, y + 14, s[1], 22, 700, C.INK);
    txt(f, sx2 + 16, y + 52, s[2], 11, 400, C.INK3);
  });
  y += 108;

  const isDesktop = m.kind === 'desktop';
  const listW = isDesktop ? Math.round((W - 24) * 0.55) : W;

  // список студентов
  const students: [string, string, string, number][] = [
    ['ДК', 'Дмитрий К.', 'ПС-304 · 2 ч назад', 72],
    ['АС', 'Анна С.', 'ПС-301 · 5 ч назад', 64],
    ['МЛ', 'Мария Л.', 'ПС-304 · вчера', 81],
    ['ИП', 'Игорь П.', 'ПС-298 · 2 дня назад', 45],
  ];
  const listH = 60 + students.length * 56 + 8;
  cardBox(f, box.cx, y, listW, listH, 'card/students');
  txt(f, box.cx + 20, y + 18, 'Мои студенты', 16, 600, C.INK);
  students.forEach((s, i) => {
    const ry = y + 56 + i * 56;
    avatar(f, box.cx + 20, ry, 36, s[0]);
    txt(f, box.cx + 68, ry + 1, s[1], 13, 600, C.INK);
    txt(f, box.cx + 68, ry + 19, s[2], 11, 400, C.INK3);
    rect(f, box.cx + listW - 200, ry + 8, 100, 6, C.BG3, 3);
    rect(f, box.cx + listW - 200, ry + 8, Math.round(100 * s[3] / 100), 6, C.ACCENT, 3);
    txt(f, box.cx + listW - 88, ry + 2, s[3] + '%', 12, 600, C.INK);
    ic(f, 'chevron-right', box.cx + listW - 44, ry + 8, 16, C.INK3);
    line(f, box.cx + 20, ry + 44, listW - 40);
  });
  y += listH + 16;

  // требуют внимания
  const atW = isDesktop ? W - listW - 24 : W;
  const atH = 60 + 2 * 56 + 56;
  const ax2 = isDesktop ? box.cx + listW + 24 : box.cx;
  cardBox(f, ax2, isDesktop ? box.cy + 108 : y, atW, atH, 'card/attention');
  const atY = isDesktop ? box.cy + 108 : y;
  txt(f, ax2 + 20, atY + 18, 'Требуют внимания', 16, 600, C.INK);
  const items: [string, string][] = [
    ['Сессия без разбора 3 дня · Дмитрий К.', 'открыть →'],
    ['Критическая ошибка в последней сессии · Анна С.', 'открыть →'],
  ];
  items.forEach((it, i) => {
    const ry = atY + 56 + i * 56;
    ic(f, 'triangle-alert', ax2 + 20, ry + 2, 18, C.WARNING);
    txt(f, ax2 + 48, ry, it[0].slice(0, Math.floor(atW / 6.2)), 12, 500, C.INK);
    txt(f, ax2 + 48, ry + 20, it[1], 12, 500, C.ACCENT);
    line(f, ax2 + 20, ry + 42, atW - 40);
  });
  btn(f, ax2 + 20, atY + atH - 52, 180, 'Экспорт отчёта', 'secondary', { icon: 'download', h: 40 });
}

// ---------------------------------------------------------------------------
// Реестр экранов и сборка
// ---------------------------------------------------------------------------

interface ScreenDef {
  code: string; title: string; mobileH?: number;
  draw: (f: any, m: Mode) => void;
  focused?: boolean; // без sidebar
}

const SCREENS: ScreenDef[] = [
  { code: 'E-01', title: 'Лендинг', mobileH: 1220, draw: e01 },
  { code: 'E-02', title: 'Демо-симуляция', mobileH: 1000, draw: e02 },
  { code: 'E-03', title: 'Вход', draw: e03, focused: true },
  { code: 'E-04', title: 'Регистрация', draw: e04, focused: true },
  { code: 'E-05', title: 'Восстановление пароля', draw: e05, focused: true },
  { code: 'E-06', title: 'Онбординг психолога', mobileH: 900, draw: e06, focused: true },
  { code: 'E-07', title: 'Онбординг студента', mobileH: 900, draw: e07, focused: true },
  { code: 'E-08', title: 'Верификация', mobileH: 940, draw: e08, focused: true },
  { code: 'E-10', title: 'Дашборд психолога', mobileH: 1220, draw: e10 },
  { code: 'E-11', title: 'Дашборд студента', mobileH: 1220, draw: e11 },
  { code: 'E-12', title: 'Дашборд супервизора', mobileH: 1120, draw: e12 },
];

export function screenFrameName(s: ScreenDef, bp: string): string {
  return s.code + ' ' + s.title + ' / ' + bp;
}

export const SCREEN_FRAME_NAMES: string[] = SCREENS
  .flatMap((s) => ['1440', '768', '390'].map((bp) => screenFrameName(s, bp)));

export function buildScreens(log: string[]): void {
  F = pickFont(FONT_FALLBACKS);
  const SX = 4620; // правее трёх бордов компонентов
  let y = 100;
  for (const s of SCREENS) {
    const modes: [Mode, string][] = [[D, '1440'], [T, '768'], [MB, '390']];
    for (const mm of modes) {
      const h = (mm[0].kind === 'mobile' && s.mobileH) ? s.mobileH : mm[0].h;
      const mode: Mode = { w: mm[0].w, h, kind: mm[0].kind };
      const f = openFrame(screenFrameName(s, mm[1]), SX, y, mode.w, h);
      try { s.draw(f, mode); } catch (e) { log.push('× ' + s.code + '/' + mm[1] + ': ' + e); }
    }
    y += 1300;
  }
}
