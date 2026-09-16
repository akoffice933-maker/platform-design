// UI-kit (Итерация 2 ТЗ, раздел 4.1): борд «02_Components / UI-kit»
// + регистрация компонентов по неймингу «Name / Variant / State» (ТЗ 9.3).
// Все размеры/цвета — из токенов; интерактивные состояния — по ТЗ 6.1;
// кликабельные зоны ≥ 44×44 (кнопки md/lg), фокус-обводка 2px color/border/focus.

declare const penpot: any;

import { C } from './tokens-data';
import {
  pickFont, makeText, makeRect, makeEllipse, centerTextIn, icon,
  setStroke, setShadow, sectionTitle, caption, startBag, endBag,
  registerComponent, setOrigin, FONT_FALLBACKS,
} from './draw';

const BOARD_NAME = '02_Components / UI-kit';
const M = 48;            // поле борда
const CW = 1240;         // ширина борда

const SIZES: Record<string, { h: number; fs: number; pl: number; lh: number }> = {
  sm: { h: 32, fs: 13, pl: 14, lh: 18 },
  md: { h: 40, fs: 14, pl: 16, lh: 20 },
  lg: { h: 48, fs: 16, pl: 20, lh: 24 },
};

const VARIANTS: Record<string, { label: string; bg: string | null; hover: string | null; active: string | null; fg: string; border: string | null }> = {
  primary:   { label: 'Продолжить', bg: C.ACCENT, hover: C.ACCENT_HOVER, active: C.ACCENT_ACTIVE, fg: '#FFFFFF', border: null },
  secondary: { label: 'Вторичная',  bg: C.BG2,    hover: C.BG3,         active: C.BD,            fg: C.INK,     border: C.BD },
  ghost:     { label: 'Отмена',     bg: null,     hover: C.BG3,         active: C.BD,            fg: C.ACCENT,  border: null },
  danger:    { label: 'Удалить',    bg: C.ERROR,  hover: C.ERROR_HOVER, active: C.ERROR_ACTIVE,  fg: '#FFFFFF', border: null },
  link:      { label: 'Ссылка',     bg: null,     hover: null,          active: null,            fg: C.ACCENT,  border: null },
};

const STATES = ['default', 'hover', 'active', 'focus', 'disabled', 'loading'];

// --------------------------------------------------------------------------
// Кнопки
// --------------------------------------------------------------------------

function drawButton(board: any, x: number, y: number, sizeKey: string, variantKey: string,
                    state: string, font: any): number {
  const s = SIZES[sizeKey];
  const v = VARIANTS[variantKey];
  const tw = Math.round(v.label.length * s.fs * 0.62);
  let w = s.pl * 2 + tw;
  const loadingIconW = state === 'loading' ? 12 + 8 : 0;
  if (state === 'loading') w = s.pl + loadingIconW + tw + s.pl;

  // фокус-кольцо (2px, color/border/focus) — снаружи, не перекрывает кнопку
  if (state === 'focus') {
    const ring = makeRect(board, x - 3, y - 3, w + 6, s.h + 6, null, s.h / 2 + 3);
    setStroke(ring, C.ACCENT, 2, 'outer');
    ring.name = 'focus-ring';
  }

  let bg = v.bg;
  if (state === 'hover') bg = v.hover || v.bg;
  if (state === 'active') bg = v.active || v.hover || v.bg;
  if (state === 'disabled') bg = C.BG3;
  if (state === 'loading' && bg) {
    const r = makeRect(board, x, y, w, s.h, bg, s.h / 2);
    try { r.fills = [{ fillColor: bg, fillOpacity: 0.55 }]; } catch (_) { /* непрозрачно */ }
  } else {
    const r = makeRect(board, x, y, w, s.h, bg, s.h / 2);
    if (v.border && state !== 'disabled') setStroke(r, v.border, 1, 'inner');
    if (state === 'disabled' && !bg) setStroke(r, C.BD, 1, 'inner');
    r.name = 'Button / ' + variantKey + ' / ' + state;
  }

  // подчёркивание для link hover/active
  if (variantKey === 'link' && (state === 'hover' || state === 'active')) {
    makeRect(board, x + (w - tw) / 2, y + s.h / 2 + s.lh / 2 + 1, tw, 1.5, v.fg, 1);
  }

  // спиннер для loading
  let labelX = x + (w - tw) / 2;
  if (state === 'loading') {
    const sp = makeEllipse(board, x + s.pl, y + (s.h - 12) / 2, 12, 12, null);
    setStroke(sp, v.fg, 2, 'inner');
    labelX = x + s.pl + loadingIconW;
  }

  const fg = state === 'disabled' ? C.INK3 : v.fg;
  const t = makeText(board, labelX, y + (s.h - s.lh) / 2, v.label, { size: s.fs, weight: 600, color: fg, font });
  centerTextIn(t, x, w);
  return w;
}

function drawIconButton(board: any, x: number, y: number, sizeKey: string, iconName: string,
                        state: string, font: any): number {
  const s = SIZES[sizeKey];
  if (state === 'focus') {
    const ring = makeRect(board, x - 3, y - 3, s.h + 6, s.h + 6, null, s.h / 2 + 3);
    setStroke(ring, C.ACCENT, 2, 'outer');
  }
  const bg = state === 'hover' ? C.ACCENT_HOVER : state === 'disabled' ? C.BG3 : C.ACCENT;
  const r = makeRect(board, x, y, s.h, s.h, bg, s.h / 2);
  r.name = 'IconButton / ' + sizeKey + ' / ' + state;
  const fgColor = state === 'disabled' ? C.INK3 : '#FFFFFF';
  icon(board, iconName, x + (s.h - 16) / 2, y + (s.h - 16) / 2, 16, fgColor);
  return s.h;
}

// --------------------------------------------------------------------------
// Поля ввода
// --------------------------------------------------------------------------

function drawInput(board: any, x: number, y: number, kind: string, state: string, font: any): number {
  const w = 280;
  const h = kind === 'textarea' ? 96 : 40;
  const label = kind === 'email' ? 'Email' : kind === 'search' ? 'Поиск' : kind === 'textarea' ? 'Сообщение' : 'Имя';
  const placeholder = kind === 'email' ? 'name@example.com' : kind === 'search' ? 'Сценарий или навык…' : kind === 'textarea' ? 'Опишите ситуацию…' : 'Иван Иванов';

  makeText(board, x, y, label, { size: 12, weight: 500, color: C.INK2, font });
  const fy = y + 24;

  if (state === 'focus') {
    const ring = makeRect(board, x - 3, fy - 3, w + 6, h + 6, null, 11);
    setStroke(ring, C.ACCENT, 2, 'outer');
    ring.name = 'focus-ring';
  }

  const field = makeRect(board, x, fy, w, h, state === 'disabled' ? C.BG3 : C.WHITE, 8);
  const isErr = state === 'error';
  if (isErr) setStroke(field, C.ERROR, 1, 'inner');
  else if (state === 'focus') setStroke(field, C.ACCENT, 2, 'inner');
  else if (state !== 'disabled') setStroke(field, C.BD, 1, 'inner');
  field.name = 'Input / ' + kind + ' / ' + state;

  const textY = kind === 'textarea' ? fy + 10 : fy + (h - 20) / 2;
  let textX = x + 12;
  if (kind === 'search') {
    icon(board, 'search', x + 12, fy + (h - 16) / 2, 16, C.INK3);
    textX = x + 36;
  }
  if (kind === 'textarea') icon(board, 'eye', x + w - 28, fy + h - 26, 16, C.INK3); // плейсхолдер-иконка

  const hasValue = state === 'filled';
  makeText(board, textX, textY, hasValue ? placeholder : placeholder,
    { size: 14, weight: 400, color: hasValue ? C.INK : C.INK3, font });

  if (isErr) {
    icon(board, 'circle-x', x + w - 28, fy + (h - 16) / 2, 16, C.ERROR);
    makeText(board, x, fy + h + 6, 'Введите корректный email', { size: 12, weight: 400, color: C.ERROR, font });
  } else {
    makeText(board, x, fy + h + 6, 'Подсказка под полем', { size: 12, weight: 400, color: C.INK3, font });
  }
  return 24 + h + 26;
}

// --------------------------------------------------------------------------
// Select
// --------------------------------------------------------------------------

function drawSelect(board: any, x: number, y: number, state: string, font: any): number {
  const w = 280;
  const h = state === 'multi' ? 48 : 40;
  makeText(board, x, y, 'Частота сессий', { size: 12, weight: 500, color: C.INK2, font });
  const fy = y + 24;

  const field = makeRect(board, x, fy, w, h, C.WHITE, 8);
  setStroke(field, C.BD, 1, 'inner');
  field.name = 'Select / ' + state;

  if (state === 'multi') {
    chipInline(board, x + 10, fy + 10, 'Тревожность', font);
    chipInline(board, x + 112, fy + 10, 'Выгорание', font);
    icon(board, 'chevron-down', x + w - 28, fy + (h - 16) / 2, 16, C.INK2);
    return 24 + h + 8;
  }

  makeText(board, x + 12, fy + (h - 20) / 2, 'Еженедельно', { size: 14, weight: 400, color: C.INK, font });
  icon(board, 'chevron-down', x + w - 28, fy + (h - 16) / 2, 16, C.INK2);

  if (state === 'open') {
    const mh = 3 * 40 + 8;
    const menu = makeRect(board, x, fy + h + 6, w, mh, C.WHITE, 8);
    setStroke(menu, C.BD, 1, 'inner');
    setShadow(menu, 0, 4, 12, 0.08);
    menu.name = 'Select / open / menu';
    const opts = ['Ежедневно', 'Еженедельно', 'Ежемесячно'];
    opts.forEach((o, i) => {
      const oy = fy + h + 6 + 4 + i * 40;
      if (i === 1) makeRect(board, x + 4, oy, w - 8, 36, C.BG2, 6);
      makeText(board, x + 14, oy + 8, o, { size: 14, weight: 400, color: C.INK, font });
      if (i === 1) icon(board, 'check', x + w - 30, oy + 10, 16, C.ACCENT);
    });
    return 24 + h + 6 + mh + 8;
  }
  return 24 + h + 8;
}

function chipInline(board: any, x: number, y: number, label: string, font: any): number {
  const w = Math.round(label.length * 6.6) + 20;
  const ch = makeRect(board, x, y, w, 26, C.BG3, 13);
  ch.name = 'chip-inline';
  makeText(board, x + 10, y + 5, label, { size: 12, weight: 500, color: C.INK2, font });
  return w;
}

// --------------------------------------------------------------------------
// Checkbox / Radio / Switch
// --------------------------------------------------------------------------

function drawCheckbox(board: any, x: number, y: number, state: string, font: any): void {
  if (state === 'focus') {
    const ring = makeRect(board, x - 3, y - 3, 26, 26, null, 9);
    setStroke(ring, C.ACCENT, 2, 'outer');
  }
  const box = makeRect(board, x, y, 20, 20, state === 'disabled' ? C.BG3 : C.WHITE, 6);
  setStroke(box, state === 'focus' || state === 'checked' || state === 'indeterminate' ? C.ACCENT : C.BD, state === 'focus' ? 2 : 1, 'inner');
  if (state === 'checked' || state === 'indeterminate') {
    try { box.fills = [{ fillColor: C.ACCENT, fillOpacity: 1 }]; } catch (_) { /* без заливки */ }
    icon(board, state === 'checked' ? 'check' : 'minus', x + 3, y + 3, 14,
      (state as string) === 'disabled' ? C.INK3 : '#FFFFFF');
  }
  box.name = 'Checkbox / ' + state;
  makeText(board, x + 30, y + 1, 'Согласен с условиями', { size: 14, weight: 400, color: state === 'disabled' ? C.INK3 : C.INK, font });
}

function drawRadio(board: any, x: number, y: number, state: string, font: any): void {
  const fill = state === 'disabled' ? C.BG3 : C.WHITE;
  const ring = makeEllipse(board, x, y, 20, 20, fill);
  setStroke(ring, state === 'checked' ? C.ACCENT : C.BD, 2, 'inner');
  if (state === 'checked') {
    makeEllipse(board, x + 5, y + 5, 10, 10, C.ACCENT);
  }
  ring.name = 'Radio / ' + state;
  makeText(board, x + 30, y + 1, 'Вариант', { size: 14, weight: 400, color: state === 'disabled' ? C.INK3 : C.INK, font });
}

function drawSwitch(board: any, x: number, y: number, on: boolean, disabled: boolean, font: any): void {
  const track = makeRect(board, x, y, 44, 24, disabled ? C.BG3 : (on ? C.ACCENT : C.BD), 12);
  if (disabled) setStroke(track, C.BD, 1, 'inner');
  const knob = makeEllipse(board, x + (on ? 23 : 3), y + 3, 18, 18, C.WHITE);
  setShadow(knob, 0, 1, 2, 0.1);
  track.name = 'Switch / ' + (on ? 'on' : 'off') + (disabled ? ' / disabled' : '');
  makeText(board, x + 56, y + 3, on ? 'Уведомления включены' : 'Уведомления выключены',
    { size: 14, weight: 400, color: disabled ? C.INK3 : C.INK, font });
}

// --------------------------------------------------------------------------
// Chip / Avatar / Tooltip
// --------------------------------------------------------------------------

const CHIP_TINTS: Record<string, { bg: string; fg: string }> = {
  neutral:  { bg: C.BG2,    fg: C.INK2 },
  info:     { bg: '#E0F2FE', fg: '#0C4A6E' },
  success:  { bg: '#DCFCE7', fg: '#166534' },
  warning:  { bg: '#FEF3C7', fg: '#92400E' },
  error:    { bg: '#FEE2E2', fg: '#991B1B' },
};

function drawChip(board: any, x: number, y: number, label: string, variant: string,
                  size: string, font: any, skillColor?: string): number {
  const h = size === 'sm' ? 24 : 28;
  const fs = size === 'sm' ? 11 : 12;
  const tints = CHIP_TINTS[variant] || CHIP_TINTS.neutral;
  let textX = x + 10;
  let w = Math.round(label.length * fs * 0.62) + 20;

  if (variant === 'skill' && skillColor) {
    w += 16;
    makeEllipse(board, x + 10, y + h / 2 - 4, 8, 8, skillColor);
    textX = x + 24;
  }
  const ch = makeRect(board, x, y, w, h, tints.bg, h / 2);
  if (variant === 'neutral' || variant === 'skill') setStroke(ch, C.BD, 1, 'inner');
  ch.name = 'Chip / ' + variant + ' / ' + size;
  makeText(board, textX, y + (h - fs - 4) / 2 + 1, label, { size: fs, weight: 500, color: tints.fg, font });
  return w;
}

function drawAvatar(board: any, x: number, y: number, size: number, type: string, font: any): void {
  if (type === 'initials') {
    const a = makeEllipse(board, x, y, size, size, C.ACCENT2);
    a.name = 'Avatar / ' + type + ' / ' + size;
    const fs = Math.round(size * 0.36);
    const t = makeText(board, x + size / 2 - fs * 0.6, y + size / 2 - fs * 0.65, 'АК', { size: fs, weight: 600, color: '#FFFFFF', font });
    centerTextIn(t, x, size);
  } else {
    const a = makeEllipse(board, x, y, size, size, C.BG3);
    a.name = 'Avatar / ' + type + ' / ' + size;
    icon(board, 'user', x + size / 2 - Math.round(size * 0.3), y + size / 2 - Math.round(size * 0.3), Math.round(size * 0.6), C.INK3);
  }
}

function drawTooltip(board: any, x: number, y: number, font: any): void {
  const w = 230;
  const tip = makeRect(board, x, y, w, 32, C.INK, 8);
  tip.name = 'Tooltip / top / default';
  setShadow(tip, 0, 4, 12, 0.15);
  const t = makeText(board, x + 12, y + 8, 'Эмпатия — отражение чувств клиента', { size: 12, weight: 400, color: '#FFFFFF', font });
  centerTextIn(t, x, w);
  const arrow = makeRect(board, x + w / 2 - 5, y + 28, 10, 10, C.INK, 2);
  try { arrow.rotation = 45; } catch (_) { /* без стрелки */ }
}

// --------------------------------------------------------------------------
// Modal / Toast
// --------------------------------------------------------------------------

function drawModal(board: any, x: number, y: number, font: any): void {
  const backdrop = makeRect(board, x, y, 700, 400, C.INK, 16);
  try { backdrop.fills = [{ fillColor: C.INK, fillOpacity: 0.5 }]; } catch (_) { /* непрозрачно */ }
  backdrop.name = 'Modal / backdrop';

  const w = 560;
  const h = 232;
  const cx = x + (700 - w) / 2;
  const cy = y + (400 - h) / 2;
  const card = makeRect(board, cx, cy, w, h, C.WHITE, 16);
  setShadow(card, 0, 12, 32, 0.12);
  card.name = 'Modal / md / open';

  makeText(board, cx + 24, cy + 24, 'Удалить сценарий?', { size: 20, weight: 600, color: C.INK, font });
  makeText(board, cx + 24, cy + 60, 'Сценарий «Работа с сопротивлением» будет удалён', { size: 14, weight: 400, color: C.INK2, font });
  makeText(board, cx + 24, cy + 80, 'для всех студентов. Действие необратимо.', { size: 14, weight: 400, color: C.INK2, font });
  icon(board, 'x', cx + w - 36, cy + 20, 16, C.INK3);

  const bw = drawButton(board, cx + w - 24 - 108 - 12 - 108, cy + h - 64, 'md', 'secondary', 'default', font);
  drawButton(board, cx + w - 24 - 108, cy + h - 64, 'md', 'danger', 'default', font);
  void bw;
}

const TOASTS: Record<string, { icon: string; color: string; title: string; text: string }> = {
  info:    { icon: 'info',           color: C.INFO,    title: 'Инфо',     text: 'Сессия сохранена автоматически' },
  success: { icon: 'circle-check',   color: C.SUCCESS, title: 'Готово',   text: 'Сценарий опубликован' },
  warning: { icon: 'triangle-alert', color: C.WARNING, title: 'Внимание', text: 'Сессия не завершена' },
  error:   { icon: 'circle-x',       color: C.ERROR,   title: 'Ошибка',   text: 'Не удалось отправить ответ' },
};

function drawToast(board: any, x: number, y: number, type: string, font: any): void {
  const t = TOASTS[type];
  const w = 380;
  const card = makeRect(board, x, y, w, 56, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  setShadow(card, 0, 4, 12, 0.08);
  card.name = 'Toast / ' + type;
  makeRect(board, x, y + 8, 4, 40, t.color, 2);
  icon(board, t.icon, x + 16, y + 18, 20, t.color);
  makeText(board, x + 48, y + 10, t.title, { size: 13, weight: 600, color: C.INK, font });
  makeText(board, x + 48, y + 30, t.text, { size: 12, weight: 400, color: C.INK2, font });
  icon(board, 'x', x + w - 28, y + 20, 14, C.INK3);
}

// --------------------------------------------------------------------------
// Progress / Tabs / Accordion / Table / Skeleton
// --------------------------------------------------------------------------

function drawProgressLinear(board: any, x: number, y: number, pct: number, font: any): void {
  makeRect(board, x, y + 4, 260, 8, C.BG3, 4);
  makeRect(board, x, y + 4, Math.max(8, Math.round(260 * pct / 100)), 8, C.ACCENT, 4).name = 'Progress / linear / ' + pct;
  makeText(board, x + 270, y, pct + '%', { size: 12, weight: 500, color: C.INK2, font });
}

function ringSvg(pct: number, size: number, color: string, track: string): string {
  const r = 16;
  const circ = Math.round(2 * Math.PI * r * 10) / 10;
  const off = Math.round(circ * (1 - pct / 100) * 10) / 10;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="20" cy="20" r="' + r + '" stroke="' + track + '" stroke-width="5"/>' +
    '<circle cx="20" cy="20" r="' + r + '" stroke="' + color + '" stroke-width="5" stroke-linecap="round" ' +
    'stroke-dasharray="' + circ + '" stroke-dashoffset="' + off + '" transform="rotate(-90 20 20)"/></svg>';
}

function drawProgressSteps(board: any, x: number, y: number, current: number, labels: string[], font: any): void {
  const gap = 130;
  for (let i = 0; i < labels.length; i++) {
    const cx = x + i * gap;
    if (i > 0) makeRect(board, cx - gap + 28, y + 11, gap - 40, 2, i <= current ? C.ACCENT : C.BG3, 1);
    if (i < current) {
      const d = makeEllipse(board, cx, y, 24, 24, C.ACCENT);
      d.name = 'step/done';
      icon(board, 'check', cx + 6, y + 6, 12, '#FFFFFF');
    } else if (i === current) {
      const a = makeEllipse(board, cx, y, 24, 24, C.ACCENT);
      a.name = 'step/active';
      const t = makeText(board, cx + 9, y + 4, String(i + 1), { size: 12, weight: 600, color: '#FFFFFF', font });
      centerTextIn(t, cx, 24);
    } else {
      const u = makeEllipse(board, cx, y, 24, 24, C.BG3);
      u.name = 'step/upcoming';
      const t = makeText(board, cx + 9, y + 4, String(i + 1), { size: 12, weight: 500, color: C.INK3, font });
      centerTextIn(t, cx, 24);
    }
    makeText(board, cx - 10, y + 32, labels[i], { size: 11, weight: 400, color: i <= current ? C.INK2 : C.INK3, font });
  }
}

function drawTabsUnderline(board: any, x: number, y: number, font: any): void {
  const tabs = ['Обзор', 'Сессии', 'Настройки'];
  let tx = x;
  tabs.forEach((tb, i) => {
    const active = i === 1;
    const tw = Math.round(tb.length * 8.4) + 8;
    makeText(board, tx, y, tb, { size: 14, weight: active ? 600 : 400, color: active ? C.INK : C.INK2, font });
    if (active) {
      const u = makeRect(board, tx, y + 28, tw, 2, C.ACCENT, 1);
      u.name = 'Tabs / underline / active';
    }
    tx += tw + 24;
  });
  makeRect(board, x, y + 30, 360, 1, C.BD, 0).name = 'Tabs / underline / divider';
}

function drawTabsPills(board: any, x: number, y: number, font: any): void {
  const cont = makeRect(board, x, y, 320, 36, C.BG3, 18);
  cont.name = 'Tabs / pills / container';
  const seg = ['Неделя', 'Месяц', 'Год'];
  seg.forEach((s, i) => {
    const px = x + 4 + i * 104;
    if (i === 0) {
      const pill = makeRect(board, px, y + 4, 100, 28, C.WHITE, 14);
      setShadow(pill, 0, 1, 2, 0.08);
      pill.name = 'Tabs / pills / active';
      const t = makeText(board, px + 30, y + 10, s, { size: 13, weight: 600, color: C.INK, font });
      centerTextIn(t, px, 100);
    } else {
      const t = makeText(board, px + 30, y + 10, s, { size: 13, weight: 400, color: C.INK2, font });
      centerTextIn(t, px, 100);
    }
  });
}

function drawAccordion(board: any, x: number, y: number, firstOpen: boolean, font: any): number {
  const w = 480;
  const name = 'Accordion / ' + (firstOpen ? 'expanded' : 'collapsed');
  let cy = y;
  const items = [
    { q: 'Что входит в разбор сессии?', open: firstOpen },
    { q: 'Как начисляются очки?', open: false },
  ];
  items.forEach((it) => {
    makeText(board, x, cy + 14, it.q, { size: 14, weight: 600, color: C.INK, font });
    icon(board, it.open ? 'chevron-up' : 'chevron-down', x + w - 28, cy + 14, 16, C.INK2);
    cy += 44;
    if (it.open) {
      makeText(board, x, cy, 'Полный разбор: баллы по 8 навыкам, ключевые моменты,', { size: 14, weight: 400, color: C.INK2, font });
      makeText(board, x, cy + 20, 'альтернативные ходы и комментарий супервизора.', { size: 14, weight: 400, color: C.INK2, font });
      cy += 44;
    }
    makeRect(board, x, cy, w, 1, C.BD, 0);
    cy += 1;
  });
  // имя компонента — на первый заголовок
  try {
    const shapes = penpot.currentPage.findShapes({ name: items[0].q }) || [];
    if (shapes.length) shapes[0].name = name;
  } catch (_) { /* имя опционально */ }
  return cy - y;
}

function drawTable(board: any, x: number, y: number, font: any): number {
  const w = 680;
  const cols = [
    { t: 'ДАТА', cx: 16 }, { t: 'СЦЕНАРИЙ', cx: 130 },
    { t: 'БАЛЛ', cx: 470 }, { t: 'ДЛИТЕЛЬНОСТЬ', cx: 560 },
  ];
  const head = makeRect(board, x, y, w, 40, C.BG2, 8);
  try { head.cornerRadius = 8; } catch (_) { /* без скругления */ }
  head.name = 'Table / header';
  cols.forEach((c2) => {
    makeText(board, x + c2.cx, y + 12, c2.t, { size: 11, weight: 500, color: C.INK3, font });
  });
  icon(board, 'chevron-up', x + 505, y + 13, 13, C.ACCENT);

  const rows = [
    ['12.09.2026', 'Работа с сопротивлением', '86', '14 мин'],
    ['10.09.2026', 'Первичная консультация', '74', '18 мин'],
    ['08.09.2026', 'Активное слушание', '91', '12 мин'],
    ['05.09.2026', 'Границы и контракт', '68', '21 мин'],
  ];
  rows.forEach((r, i) => {
    const ry = y + 40 + i * 44;
    makeText(board, x + 16, ry + 12, r[0], { size: 13, weight: 400, color: C.INK2, font });
    makeText(board, x + 130, ry + 12, r[1], { size: 13, weight: 500, color: C.INK, font });
    makeText(board, x + 470, ry + 12, r[2], { size: 13, weight: 600, color: C.INK, font });
    makeText(board, x + 560, ry + 12, r[3], { size: 13, weight: 400, color: C.INK2, font });
    makeRect(board, x, ry + 44, w, 1, C.BD, 0);
  });
  const table = head; // компонент по заголовку таблицы
  try { table.name = 'Table / default'; } catch (_) { /* имя опционально */ }

  // пагинация
  const py = y + 40 + 4 * 44 + 16;
  icon(board, 'chevron-left', x + 16, py + 5, 14, C.INK3);
  [1, 2, 3].forEach((p) => {
    const px = x + 44 + (p - 1) * 32;
    if (p === 1) {
      const pg = makeRect(board, px, py, 24, 24, C.ACCENT, 6);
      pg.name = 'pagination/active';
      const t = makeText(board, px + 8, py + 4, '1', { size: 12, weight: 600, color: '#FFFFFF', font });
      centerTextIn(t, px, 24);
    } else {
      makeText(board, px + 8, py + 4, String(p), { size: 12, weight: 400, color: C.INK2, font });
    }
  });
  makeText(board, x + 44 + 3 * 32, py + 4, '…', { size: 12, weight: 400, color: C.INK3, font });
  icon(board, 'chevron-right', x + 44 + 3 * 32 + 24, py + 5, 14, C.INK2);
  return py + 40 - y;
}

function drawSkeletonCard(board: any, x: number, y: number, font: any): void {
  const card = makeRect(board, x, y, 300, 180, C.WHITE, 12);
  setStroke(card, C.BD, 1, 'inner');
  card.name = 'Skeleton / card';
  makeEllipse(board, x + 16, y + 16, 40, 40, C.BG3);
  makeRect(board, x + 68, y + 20, 130, 10, C.BG3, 5);
  makeRect(board, x + 68, y + 38, 84, 10, C.BG3, 5);
  makeRect(board, x + 16, y + 72, 268, 84, C.BG3, 8);
}

function drawSkeletonLines(board: any, x: number, y: number, font: any): void {
  [320, 260, 300].forEach((w, i) => {
    makeRect(board, x, y + i * 22, w, 12, C.BG3, 6);
  });
}

// --------------------------------------------------------------------------
// Тёмная тема (демо-полоса для TMA)
// --------------------------------------------------------------------------

function drawDarkStrip(board: any, x: number, y: number, font: any): void {
  const w = 1144;
  const h = 300;
  const strip = makeRect(board, x, y, w, h, C.D_BG, 16);
  strip.name = 'Dark theme / strip';

  makeText(board, x + 32, y + 24, 'Тёмная тема — обязательна для TMA и клиентских экранов',
    { size: 16, weight: 600, color: C.D_INK, font });
  makeText(board, x + 32, y + 48, 'токены color/dark/* · акценты и семантика — те же',
    { size: 12, weight: 400, color: C.D_INK2, font });

  // кнопки на тёмном
  const bx = x + 32;
  const by = y + 92;
  const p1 = makeRect(board, bx, by, 130, 40, C.ACCENT, 20);
  p1.name = 'Button / primary / dark';
  makeText(board, bx + 37, by + 10, 'Продолжить', { size: 14, weight: 600, color: '#FFFFFF', font });
  const s1 = makeRect(board, bx + 146, by, 120, 40, C.D_BG2, 20);
  setStroke(s1, C.D_BD, 1, 'inner');
  s1.name = 'Button / secondary / dark';
  makeText(board, bx + 178, by + 10, 'Вторичная', { size: 14, weight: 600, color: C.D_INK, font });
  const g1 = makeRect(board, bx + 282, by, 96, 40, null, 20);
  g1.name = 'Button / ghost / dark';
  makeText(board, bx + 306, by + 10, 'Отмена', { size: 14, weight: 600, color: '#60A5FA', font });

  // инпут на тёмном
  const iy = y + 152;
  const f1 = makeRect(board, bx, iy, 280, 40, C.D_BG2, 8);
  setStroke(f1, C.D_BD, 1, 'inner');
  f1.name = 'Input / dark';
  makeText(board, bx + 12, iy + 10, 'name@example.com', { size: 14, weight: 400, color: '#64748B', font });

  // чип на тёмном
  const ch = makeRect(board, bx + 296, iy + 6, 120, 28, C.D_BG2, 14);
  setStroke(ch, C.D_BD, 1, 'inner');
  ch.name = 'Chip / dark';
  makeEllipse(board, bx + 306, iy + 14, 8, 8, C.ACCENT2);
  makeText(board, bx + 320, iy + 11, 'эмпатия', { size: 12, weight: 500, color: C.D_INK2, font });

  // тост на тёмном
  const t = makeRect(board, bx, iy + 60, 380, 56, C.D_BG2, 12);
  setStroke(t, C.D_BD, 1, 'inner');
  t.name = 'Toast / dark';
  makeRect(board, bx, iy + 68, 4, 40, C.SUCCESS, 2);
  icon(board, 'circle-check', bx + 16, iy + 78, 20, C.SUCCESS);
  makeText(board, bx + 48, iy + 70, 'Готово', { size: 13, weight: 600, color: C.D_INK, font });
  makeText(board, bx + 48, iy + 90, 'Сценарий опубликован', { size: 12, weight: 400, color: C.D_INK2, font });
  icon(board, 'x', bx + 352, iy + 80, 14, '#64748B');

  // заметка о safe area TMA
  const note = makeRect(board, x + 620, iy + 52, 480, 76, C.D_BG2, 12);
  setStroke(note, '#FDE68A', 1, 'inner');
  makeText(board, x + 636, iy + 64, 'TMA safe area: контент начинается ниже Telegram header (~56px),',
    { size: 12, weight: 400, color: C.D_INK2, font });
  makeText(board, x + 636, iy + 82, 'MainButton (~80px) не перекрывается; тапы ≥ 44×44; фокус 2px.',
    { size: 12, weight: 400, color: C.D_INK2, font });
}

// --------------------------------------------------------------------------
// Сборка борда UI-kit
// --------------------------------------------------------------------------

export function buildUIKitBoard(log: string[]): void {
  const font = pickFont(FONT_FALLBACKS);
  const lib = penpot.library.local;
  const existing = new Set<string>();
  try { for (const c of lib.components) existing.add(c.name); } catch (_) { /* пустой набор */ }

  const board = penpot.createBoard();
  board.name = BOARD_NAME;
  board.x = 100 + 1240 + 200; // справа от борда Foundations
  board.y = 100;
  setOrigin(board.x, board.y);
  try { board.resize(CW, 400); } catch (_) { /* пересчитаем */ }
  try { board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }]; } catch (_) { /* фон */ }
  setStroke(board, C.BD, 1, 'inner');

  let y = M;
  makeText(board, M, y, 'Platform — UI-kit', { size: 40, weight: 700, color: C.INK, font });
  y += 56;
  makeText(board, M, y, 'Компоненты ТЗ 4.1 · состояния ТЗ 6.1 · нейминг «Name / Variant / State» · компоненты зарегистрированы в Assets',
    { size: 13, weight: 400, color: C.INK2, font });
  y += 80;

  // ---- Buttons ----
  y = sectionTitle(board, M, y, 'Button', '5 вариантов × 6 состояний · размеры sm 32 / md 40 / lg 48 · кликабельная зона ≥ 44px (md/lg)');
  const colW = 180;
  for (const variantKey of Object.keys(VARIANTS)) {
    makeText(board, M, y + 10, variantKey, { size: 12, weight: 600, color: C.ACCENT, font });
    STATES.forEach((st, i) => {
      const cx = M + 90 + i * colW;
      startBag();
      drawButton(board, cx, y, 'md', variantKey, st, font);
      const bag = endBag();
      registerComponent(bag, 'Button / ' + variantKey + ' / ' + st, existing, log);
      caption(board, cx, y + 46, st);
    });
    y += 76;
  }
  // sm / lg — только primary
  makeText(board, M, y + 6, 'primary sm (32)', { size: 12, weight: 600, color: C.ACCENT, font });
  startBag();
  drawButton(board, M + 90, y, 'sm', 'primary', 'default', font);
  registerComponent(endBag(), 'Button / primary / sm / default', existing, log);
  y += 44;
  makeText(board, M, y + 6, 'primary lg (48)', { size: 12, weight: 600, color: C.ACCENT, font });
  startBag();
  drawButton(board, M + 90, y, 'lg', 'primary', 'default', font);
  registerComponent(endBag(), 'Button / primary / lg / default', existing, log);
  y += 64;
  // icon buttons
  makeText(board, M, y + 6, 'icon buttons', { size: 12, weight: 600, color: C.ACCENT, font });
  ['default', 'hover', 'focus', 'disabled'].forEach((st, i) => {
    const cx = M + 90 + i * 64;
    startBag();
    drawIconButton(board, cx, y, 'md', 'plus', st, font);
    const bag = endBag();
    if (st === 'default') registerComponent(bag, 'IconButton / md / ' + st, existing, log);
    caption(board, cx, y + 48, st);
  });
  y += 96;

  // ---- Inputs ----
  y = sectionTitle(board, M, y, 'Input', 'текст · email · поиск · textarea · состояния по ТЗ 6.1');
  const inputKinds: [string, string][] = [
    ['text', 'default'], ['text', 'focus'], ['text', 'filled'],
    ['email', 'error'], ['text', 'disabled'], ['search', 'default'],
  ];
  inputKinds.forEach((k, i) => {
    const cx = M + (i % 3) * 360;
    if (i === 3) y += 100;
    startBag();
    drawInput(board, cx, y, k[0], k[1], font);
    const bag = endBag();
    const names: Record<string, string> = { default: 'Input / text / default', focus: 'Input / text / focus', filled: 'Input / text / filled', error: 'Input / email / error', disabled: 'Input / text / disabled' };
    const nm = k[0] === 'search' ? 'Input / search / default' : (names[k[1]] || 'Input / text / default');
    registerComponent(bag, nm, existing, log);
    caption(board, cx, y + 92, k[0] + ' / ' + k[1]);
  });
  y += 150;
  startBag();
  drawInput(board, M, y, 'textarea', 'default', font);
  registerComponent(endBag(), 'Input / textarea / default', existing, log);
  caption(board, M, y + 150, 'textarea (высота 96, grow)');
  y += 190;

  // ---- Select ----
  y = sectionTitle(board, M, y, 'Select / Combobox', 'одинарный выбор · открытый список · множественный (чипы)');
  const selStates: string[] = ['default', 'open', 'multi'];
  let selX = M;
  selStates.forEach((st) => {
    startBag();
    const hUsed = drawSelect(board, selX, y, st, font);
    registerComponent(endBag(), 'Select / ' + st, existing, log);
    caption(board, selX, y + hUsed + 6, st);
    selX += 360;
  });
  y += 190;

  // ---- Checkbox / Radio / Switch ----
  y = sectionTitle(board, M, y, 'Checkbox · Radio · Switch', 'unchecked / checked / indeterminate / disabled / focus');
  const cbStates = ['unchecked', 'checked', 'indeterminate', 'disabled', 'focus'];
  makeText(board, M, y + 2, 'Checkbox', { size: 12, weight: 600, color: C.ACCENT, font });
  cbStates.forEach((st, i) => {
    const cx = M + 90 + i * 230;
    startBag();
    drawCheckbox(board, cx, y, st, font);
    registerComponent(endBag(), 'Checkbox / ' + st, existing, log);
    caption(board, cx, y + 30, st);
  });
  y += 64;
  makeText(board, M, y + 2, 'Radio', { size: 12, weight: 600, color: C.ACCENT, font });
  ['unchecked', 'checked', 'disabled'].forEach((st, i) => {
    const cx = M + 90 + i * 230;
    startBag();
    drawRadio(board, cx, y, st, font);
    registerComponent(endBag(), 'Radio / ' + st, existing, log);
    caption(board, cx, y + 30, st);
  });
  y += 64;
  makeText(board, M, y + 2, 'Switch', { size: 12, weight: 600, color: C.ACCENT, font });
  [[false, false], [true, false], [false, true], [true, true]].forEach((cfg, i) => {
    const cx = M + 90 + i * 230;
    startBag();
    drawSwitch(board, cx, y, cfg[0], cfg[1], font);
    registerComponent(endBag(), 'Switch / ' + (cfg[0] ? 'on' : 'off') + (cfg[1] ? ' / disabled' : ''), existing, log);
    caption(board, cx, y + 32, (cfg[0] ? 'on' : 'off') + (cfg[1] ? ' + disabled' : ''));
  });
  y += 90;

  // ---- Chips ----
  y = sectionTitle(board, M, y, 'Chip / Tag / Badge', 'нейтральный · семантические (тинты) · навыки (точка = цвет навыка)');
  let chipX = M;
  const semChips: [string, string][] = [['neutral', 'Черновик'], ['info', 'Инфо'], ['success', 'Пройдено'], ['warning', 'На проверке'], ['error', 'Ошибка']];
  semChips.forEach((cf) => {
    startBag();
    const wUsed = drawChip(board, chipX, y, cf[1], cf[0], 'md', font);
    if (cf[0] === 'neutral' || cf[0] === 'success') registerComponent(endBag(), 'Chip / ' + cf[0] + ' / md', existing, log);
    else endBag();
    chipX += wUsed + 16;
  });
  startBag();
  drawChip(board, chipX, y, 'эмпатия', 'skill', 'md', font, C.ACCENT2);
  registerComponent(endBag(), 'Chip / skill / md', existing, log);
  y += 48;
  chipX = M;
  const skills: [string, string][] = [
    ['активное слушание', '#2563EB'], ['эмпатия', '#7C3AED'], ['границы', '#0891B2'],
    ['эмоции', '#DB2777'], ['структура', '#65A30D'], ['сопротивление', '#EA580C'],
    ['вопрошание', '#0EA5E9'], ['рефлексия', '#9333EA'],
  ];
  skills.forEach((sk) => {
    startBag();
    chipX += drawChip(board, chipX, y, sk[0], 'skill', 'sm', font, sk[1]) + 12;
    endBag();
  });
  y += 90;

  // ---- Avatars ----
  y = sectionTitle(board, M, y, 'Avatar', '24 / 32 / 40 / 48 / 64 · инициалы и fallback');
  let avX = M + 20;
  [24, 32, 40, 48, 64].forEach((sz) => {
    startBag();
    drawAvatar(board, avX, y, sz, 'initials', font);
    if (sz === 40) registerComponent(endBag(), 'Avatar / initials / 40', existing, log);
    else endBag();
    avX += sz + 40;
  });
  avX += 40;
  [24, 32, 40, 48, 64].forEach((sz) => {
    startBag();
    drawAvatar(board, avX, y, sz, 'fallback', font);
    if (sz === 40) registerComponent(endBag(), 'Avatar / fallback / 40', existing, log);
    else endBag();
    avX += sz + 40;
  });
  y += 100;

  // ---- Tooltip + Progress ----
  y = sectionTitle(board, M, y, 'Tooltip · Progress', 'подсказка сверху · линейный / круговой (SVG) / шаги');
  startBag();
  drawTooltip(board, M, y, font);
  registerComponent(endBag(), 'Tooltip / top / default', existing, log);
  drawProgressLinear(board, M + 320, y + 10, 40, font);
  // круговой
  let ring = null;
  try {
    ring = penpot.createShapeFromSvg(ringSvg(40, 48, C.ACCENT, C.BG3));
    board.appendChild(ring);
    ring.x = M + 660; ring.y = y;
    ring.name = 'Progress / circular / 40';
  } catch (_) { ring = null; }
  makeText(board, M + 660, y + 54, '40%', { size: 11, weight: 500, color: C.INK2, font });
  startBag();
  drawProgressSteps(board, M + 760, y, 1, ['Профиль', 'Специализация', 'Верификация', 'Готово'], font);
  registerComponent(endBag(), 'Progress / steps / 2 из 4', existing, log);
  caption(board, M, y + 44, 'tooltip');
  caption(board, M + 320, y + 44, 'linear 40%');
  caption(board, M + 660, y + 76, 'circular 40%');
  caption(board, M + 760, y + 56, 'steps');
  y += 130;

  // ---- Tabs + Accordion ----
  y = sectionTitle(board, M, y, 'Tabs · Accordion', 'underline и pills · свёрнут/развёрнут');
  startBag();
  drawTabsUnderline(board, M, y, font);
  registerComponent(endBag(), 'Tabs / underline', existing, log);
  startBag();
  drawTabsPills(board, M + 420, y, font);
  registerComponent(endBag(), 'Tabs / pills', existing, log);
  y += 70;
  startBag();
  const accH = drawAccordion(board, M, y, true, font);
  registerComponent(endBag(), 'Accordion / expanded', existing, log);
  y += accH + 24;

  // ---- Table + Skeleton ----
  y = sectionTitle(board, M, y, 'Table · Skeleton', 'сортировка, пагинация · скелетоны загрузки (ТЗ 6.2)');
  startBag();
  const tblH = drawTable(board, M, y, font);
  registerComponent(endBag(), 'Table / default', existing, log);
  startBag();
  drawSkeletonCard(board, M + 760, y, font);
  registerComponent(endBag(), 'Skeleton / card', existing, log);
  drawSkeletonLines(board, M + 760, y + 200, font);
  caption(board, M + 760, y + 272, 'skeleton lines');
  y += Math.max(tblH, 280) + 24;

  // ---- Toasts + Modal ----
  y = sectionTitle(board, M, y, 'Toast · Modal', '4 типа уведомлений (иконка + цвет, WCAG) · модалка md 560');
  const toastX = M;
  ['info', 'success', 'warning', 'error'].forEach((tp, i) => {
    startBag();
    drawToast(board, toastX, y + i * 68, tp, font);
    registerComponent(endBag(), 'Toast / ' + tp, existing, log);
  });
  startBag();
  drawModal(board, M + 420, y, font);
  registerComponent(endBag(), 'Modal / md / open', existing, log);
  caption(board, M + 420, y + 408, 'modal md (560) на backdrop');
  y += 440;

  // ---- Dark ----
  y = sectionTitle(board, M, y, 'Тёмная тема', 'для Mini App и клиентских экранов (ТЗ 3.1, 11.1)');
  drawDarkStrip(board, M, y, font);
  y += 340;

  makeText(board, M, y, 'Дальше: доменные компоненты (Итерация 3): ScenarioCard, EmotionIndicator, ClientMessageBubble, AnswerOption…',
    { size: 12, weight: 400, color: C.INK3, font });
  y += 48;

  try { board.resize(CW, y); } catch (_) { /* высота */ }
  log.push('✓ UI-kit: зарегистрировано компонентов: ' + existing.size);
}
