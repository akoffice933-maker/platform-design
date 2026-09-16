// Foundations: цветовые/текстовые стили + борд-аудит (Итерация 1 ТЗ).

declare const penpot: any;

import { LIGHT_COLORS, DARK_COLORS, TYPE_STYLES, SPACE, RADII, SHADOWS, C } from './tokens-data';
import {
  pickFont, variantForWeight, makeText, makeRect, sectionTitle,
  setStroke, setShadow, setOrigin, FONT_FALLBACKS, MONO_FALLBACKS,
} from './draw';

export function createColorStyles(log: string[]): number {
  const lib = penpot.library.local;
  const existing = new Map<string, any>();
  for (const c of lib.colors) existing.set(c.name, c);
  let count = 0;
  const all = LIGHT_COLORS.concat(DARK_COLORS);
  for (const t of all) {
    try {
      let style = existing.get(t.name);
      if (!style) {
        style = lib.createColor();
        style.name = t.name;
      }
      style.color = t.value;
      style.opacity = 1;
      existing.set(t.name, style);
      count++;
    } catch (e) {
      log.push('× цвет ' + t.name + ': ' + e);
    }
  }
  return count;
}

export function createTextStyles(log: string[]): number {
  const font = pickFont(FONT_FALLBACKS);
  if (!font) {
    log.push('× Шрифт Inter не найден в Penpot. Установите Inter (Fonts) и перезапустите плагин.');
    return 0;
  }
  const mono = pickFont(MONO_FALLBACKS);
  const lib = penpot.library.local;
  const existing = new Map<string, any>();
  for (const t of lib.typographies) existing.set(t.name, t);
  let count = 0;
  for (const spec of TYPE_STYLES) {
    try {
      const fam = spec.mono ? (mono || font) : font;
      const variant = variantForWeight(fam, spec.weight);
      let style = existing.get(spec.name);
      if (!style) {
        style = lib.createTypography();
        style.name = spec.name;
      }
      style.fontFamily = fam.name;
      try { style.fontId = fam.fontId || fam.id; } catch (_) { /* задан через fontFamily */ }
      if (variant) {
        try { style.fontVariantId = variant.fontVariantId; } catch (_) { /* вариант по умолчанию */ }
      }
      style.fontSize = String(spec.size);
      style.fontWeight = String(spec.weight);
      style.lineHeight = String(spec.lineHeight);
      style.letterSpacing = '0';
      existing.set(spec.name, style);
      count++;
    } catch (e) {
      log.push('× текстовый стиль ' + spec.name + ': ' + e);
    }
  }
  return count;
}

function swatchGrid(board: any, x0: number, y0: number, tokens: typeof LIGHT_COLORS,
                    perRow: number, font: any): void {
  const cellW = 132;
  const sw = 64;
  tokens.forEach((t, i) => {
    const cx = x0 + (i % perRow) * cellW;
    const cy = y0 + Math.floor(i / perRow) * 118;
    makeRect(board, cx, cy, sw, sw, t.value, 8).name = 'swatch ' + t.name;
    makeText(board, cx, cy + sw + 6, t.name.replace('color/', ''), { size: 10, weight: 600, color: C.INK, font });
    makeText(board, cx, cy + sw + 22, t.value, { size: 10, weight: 400, color: C.INK2, font });
  });
}

export function buildFoundationsBoard(colorsCreated: number, textOk: number, problems: string[], font: any): void {
  const board = penpot.createBoard();
  board.name = '01_Foundations / audit';
  board.x = 100;
  board.y = 100;
  setOrigin(board.x, board.y);
  try { board.resize(1240, 400); } catch (_) { /* пересчитаем ниже */ }
  try { board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }]; } catch (_) { /* фон по умолчанию */ }
  setStroke(board, C.BD, 1, 'inner');

  const M = 48;
  let y = M;

  makeText(board, M, y, 'Platform — Foundations audit', { size: 40, weight: 700, color: C.INK, font });
  y += 56;
  makeText(board, M, y,
    'Сгенерировано плагином Platform Builder v0.2 · ТЗ на дизайн-макеты v1.0 · Итерация 1',
    { size: 13, weight: 400, color: C.INK2, font });
  y += 96;

  y = sectionTitle(board, M, y, 'Цвета — светлая тема', '28 токенов · созданы как color styles (библиотека Assets)');
  swatchGrid(board, M, y, LIGHT_COLORS, 7, font);
  y += Math.ceil(LIGHT_COLORS.length / 7) * 118 + 40;

  y = sectionTitle(board, M, y, 'Цвета — тёмная тема (Mini App, клиентские экраны)',
    'Акценты и семантика — те же, что в светлой теме');
  swatchGrid(board, M, y, DARK_COLORS, 7, font);
  y += Math.ceil(DARK_COLORS.length / 7) * 118 + 40;

  y = sectionTitle(board, M, y, 'Типографика', '10 text styles · ' + (font ? font.name : 'шрифт по умолчанию'));
  const sampleX = 380;
  TYPE_STYLES.forEach((spec) => {
    makeText(board, M, y + 4, spec.name, { size: 12, weight: 600, color: C.ACCENT, font });
    makeText(board, M, y + 22, spec.size + '/' + spec.lineHeight + ' · ' + spec.weight + ' · ' + spec.use,
      { size: 11, weight: 400, color: C.INK3, font });
    makeText(board, sampleX, y, spec.sample, { size: spec.size, weight: spec.weight, color: C.INK, font });
    y += Math.max(spec.lineHeight, 28) + 24;
  });
  y += 40;

  y = sectionTitle(board, M, y, 'Spacing (шкала 4px)', 'space/1 … space/9');
  SPACE.forEach((s, i) => {
    makeText(board, M, y + 2, 'space/' + (i + 1), { size: 12, weight: 500, color: C.INK2, font });
    makeRect(board, M + 100, y, s, 16, C.BG3, 2);
    makeText(board, M + 110 + s, y + 2, String(s) + 'px', { size: 11, weight: 400, color: C.INK3, font });
    y += 28;
  });
  y += 40;

  y = sectionTitle(board, M, y, 'Радиусы', '6 токенов');
  RADII.forEach((r, i) => {
    const cx = M + i * 120;
    const rect = makeRect(board, cx, y, 64, 64, C.BG2, Math.min(r[1], 32));
    setStroke(rect, C.BD, 1, 'inner');
    rect.name = 'radius ' + r[0];
    makeText(board, cx, y + 72, r[0].replace('radius/', ''), { size: 11, weight: 500, color: C.INK2, font });
    makeText(board, cx, y + 88, r[1] === 9999 ? 'full' : r[1] + 'px', { size: 10, weight: 400, color: C.INK3, font });
  });
  y += 130;

  y = sectionTitle(board, M, y, 'Тени', '3 токена · drop-shadow');
  SHADOWS.forEach((s, i) => {
    const cx = M + i * 160;
    const card = makeRect(board, cx, y, 112, 72, C.WHITE, 12);
    setShadow(card, s[1].x, s[1].y, s[1].b, s[1].op);
    card.name = 'shadow ' + s[0];
    makeText(board, cx, y + 80, s[0], { size: 11, weight: 500, color: C.INK2, font });
    makeText(board, cx, y + 96, s[1].x + ' ' + s[1].y + ' ' + s[1].b + 'px · ' + Math.round(s[1].op * 100) + '%',
      { size: 10, weight: 400, color: C.INK3, font });
  });
  y += 150;

  y = sectionTitle(board, M, y, 'Сетки и фреймы', 'ТЗ раздел 2.3 · все экраны в 3 вариантах, TMA — только 390');
  const gridLines = [
    'Desktop 1440 · контент 1200 · 12 колонок · gutter 24 · margin 120 · брейкпоинты 1440/1280/1024',
    'Tablet 768 · 8 колонок · gutter 16 · margin 32',
    'Mobile web 390 (iPhone 14) · 4 колонки · gutter 16 · margin 16',
    'Telegram Mini App 390 · пометка «TMA» · safe area: сверху ~56 (заголовок TG), снизу ~80 (MainButton)',
  ];
  gridLines.forEach((line) => {
    makeText(board, M, y, line, { size: 13, weight: 400, color: C.INK, font });
    y += 24;
  });
  y += 40;

  y = sectionTitle(board, M, y, 'Итог запуска', '');
  const summary = [
    '✓ Цветовых стилей создано/обновлено: ' + colorsCreated + ' из ' + (LIGHT_COLORS.length + DARK_COLORS.length),
    '✓ Текстовых стилей создано/обновлено: ' + textOk + ' из ' + TYPE_STYLES.length,
  ];
  summary.forEach((line) => {
    makeText(board, M, y, line, { size: 13, weight: 500, color: C.SUCCESS, font });
    y += 22;
  });
  if (problems.length) {
    problems.forEach((p) => {
      makeText(board, M, y, p, { size: 12, weight: 400, color: C.ERROR, font });
      y += 20;
    });
  }
  y += 48;

  try { board.resize(1240, y); } catch (_) { /* оставляем высоту */ }
}
