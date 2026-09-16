// Общие помощники рисования для плагина Platform Builder.
// Все функции принимают родителя (board/group) и координаты.

declare const penpot: any;

import { ICONS } from './icons';

// ----- Начало координат текущего борда -----
// x/y фигур в Penpot — абсолютные координаты канвы, поэтому все функции
// рисования принимают ЛОКАЛЬНЫЕ координаты и прибавляют origin борда.
let ORIGIN = { x: 0, y: 0 };

export function setOrigin(x: number, y: number): void {
  ORIGIN.x = x;
  ORIGIN.y = y;
}

export function getOrigin(): { x: number; y: number } {
  return ORIGIN;
}


// ----- Шрифты -----

export const FONT_FALLBACKS = ['Inter', 'Work Sans', 'Source Sans Pro', 'Roboto', 'DejaVu Sans'];
export const MONO_FALLBACKS = ['JetBrains Mono', 'IBM Plex Mono', 'Roboto Mono', 'Source Code Pro', 'Courier New'];

export function pickFont(names: string[]): any | null {
  for (const n of names) {
    try {
      const f = penpot.fonts.findByName(n);
      if (f) return f;
    } catch (_) { /* продолжаем поиск */ }
  }
  return null;
}

export function nameToWeight(name: string): number {
  const n = String(name || '').toLowerCase();
  const digits = n.match(/(\d{3})/);
  if (digits) return parseInt(digits[1], 10);
  const map: [string, number][] = [
    ['thin', 100], ['extralight', 200], ['light', 300], ['regular', 400],
    ['normal', 400], ['medium', 500], ['semibold', 600], ['demibold', 600],
    ['bold', 700], ['extrabold', 800], ['heavy', 800], ['black', 900],
  ];
  for (const [k, v] of map) if (n.indexOf(k) !== -1) return v;
  return 400;
}

export function variantForWeight(font: any, weight: number): any | null {
  const variants: any[] = font.variants || [];
  if (!variants.length) return null;
  let best = variants[0];
  let bestDiff = Infinity;
  for (const v of variants) {
    const w = (typeof v.fontWeight !== 'undefined') ? Number(v.fontWeight) : nameToWeight(v.name);
    const d = Math.abs(w - weight);
    if (d < bestDiff) { best = v; bestDiff = d; }
  }
  return best;
}

// ----- Сбор создаваемых фигур (для createComponent) -----

let CURRENT_BAG: any[] | null = null;

export function startBag(): any[] {
  CURRENT_BAG = [];
  return CURRENT_BAG;
}

export function endBag(): any[] {
  const b = CURRENT_BAG || [];
  CURRENT_BAG = null;
  return b;
}

function track(shape: any): void {
  if (CURRENT_BAG) CURRENT_BAG.push(shape);
}

// ----- Базовые фигуры -----

export function makeText(parent: any, x: number, y: number, content: string,
                         opts: { size?: number; weight?: number; color?: string; font?: any; lh?: number } = {}): any {
  const t = penpot.createText(String(content));
  if (!t) return null;
  parent.appendChild(t);
  t.x = x + ORIGIN.x;
  t.y = y + ORIGIN.y;
  try { t.growType = 'auto-width'; } catch (_) { /* необязательно */ }
  try { t.fontSize = String(opts.size != null ? opts.size : 14); } catch (_) { /* умолчание */ }
  try { t.fontWeight = String(opts.weight != null ? opts.weight : 400); } catch (_) { /* умолчание */ }
  if (opts.font) {
    try { t.fontFamily = opts.font.name; } catch (_) { /* системный */ }
    try {
      const v = variantForWeight(opts.font, opts.weight != null ? opts.weight : 400);
      if (v) t.fontVariantId = v.fontVariantId;
    } catch (_) { /* вариант по умолчанию */ }
  }
  try { t.fills = [{ fillColor: opts.color || '#0F172A', fillOpacity: 1 }]; } catch (_) { /* чёрный */ }
  track(t);
  return t;
}

/** Центрирует текст по горизонтали в полосе [x, x+w], если известна ширина текста. */
export function centerTextIn(t: any, x: number, w: number): void {
  try {
    if (t && typeof t.width === 'number' && isFinite(t.width) && t.width > 0) {
      t.x = x + (w - t.width) / 2;
    }
  } catch (_) { /* оставляем приблизительное позиционирование */ }
}

export function makeRect(parent: any, x: number, y: number, w: number, h: number,
                         fill: string | null, radius: number): any {
  const r = penpot.createRectangle();
  parent.appendChild(r);
  r.x = x + ORIGIN.x; r.y = y + ORIGIN.y;
  r.resize(w, h);
  if (fill) {
    try { r.fills = [{ fillColor: fill, fillOpacity: 1 }]; } catch (_) { /* без заливки */ }
  } else {
    try { r.fills = []; } catch (_) { /* без заливки */ }
  }
  try { r.cornerRadius = radius > 48 ? Math.min(radius, h / 2) : radius; } catch (_) { /* без скругления */ }
  track(r);
  return r;
}

export function makeEllipse(parent: any, x: number, y: number, w: number, h: number,
                            fill: string | null): any {
  const e = penpot.createEllipse();
  parent.appendChild(e);
  e.x = x + ORIGIN.x; e.y = y + ORIGIN.y;
  e.resize(w, h);
  if (fill) {
    try { e.fills = [{ fillColor: fill, fillOpacity: 1 }]; } catch (_) { /* без заливки */ }
  } else {
    try { e.fills = []; } catch (_) { /* без заливки */ }
  }
  track(e);
  return e;
}

export function setStroke(shape: any, color: string, width: number, alignment = 'inner'): void {
  try {
    shape.strokes = [{
      strokeColor: color, strokeOpacity: 1, strokeWidth: width,
      strokeAlignment: alignment, strokeStyle: 'solid',
    }];
  } catch (_) { /* без обводки */ }
}

export function setShadow(shape: any, x: number, y: number, blur: number, opacity: number): void {
  try {
    shape.effects = [{
      style: 'drop-shadow', offsetX: x, offsetY: y, blur, spread: 0,
      color: { color: '#000000', opacity },
    }];
  } catch (_) { /* без тени */ }
}

/** Импортирует иконку Lucide (ICONS) как векторную группу нужного размера и цвета. */
export function icon(parent: any, name: string, x: number, y: number, size: number, color: string): any | null {
  let svg = ICONS[name];
  if (!svg) return null;
  svg = svg.split('stroke="currentColor"').join('stroke="' + color + '"');
  svg = svg.replace(/width="24"/, 'width="' + size + '"').replace(/height="24"/, 'height="' + size + '"');
  let g = null;
  try { g = penpot.createShapeFromSvg(svg); } catch (_) { g = null; }
  if (!g) return null;
  parent.appendChild(g);
  g.x = x + ORIGIN.x; g.y = y + ORIGIN.y;
  try { g.resize(size, size); } catch (_) { /* размер из атрибутов svg */ }
  try { g.name = 'icon/' + name; } catch (_) { /* имя не критично */ }
  track(g);
  return g;
}

// ----- Структура борда -----

export function sectionTitle(board: any, x: number, y: number, title: string, subtitle: string): number {
  makeText(board, x, y, title, { size: 24, weight: 600, color: '#0F172A' });
  if (subtitle) makeText(board, x, y + 34, subtitle, { size: 13, weight: 400, color: '#475569' });
  return y + (subtitle ? 70 : 48);
}

export function caption(parent: any, x: number, y: number, text: string): any {
  return makeText(parent, x, y, text, { size: 10, weight: 400, color: '#94A3B8' });
}

/** Идемпотентность: удалить борд с тем же именем на текущей странице перед пересборкой. */
export function removeShapesByName(page: any, name: string): number {
  let removed = 0;
  try {
    const shapes: any[] = page.findShapes({ name }) || [];
    for (const s of shapes) {
      try { s.remove(); removed++; } catch (_) { /* пропускаем */ }
    }
  } catch (_) { /* если findShapes недоступен — просто добавим новый борд */ }
  return removed;
}

// ----- Регистрация компонентов -----

export function registerComponent(shapes: any[], name: string, existing: Set<string>, log: string[]): void {
  if (!shapes.length) return;
  if (existing.has(name)) return; // идемпотентность: компонент уже создан ранее
  try {
    const comp = penpot.library.local.createComponent(shapes);
    try { comp.name = name; } catch (_) { /* имя по умолчанию */ }
    existing.add(name);
  } catch (e) {
    log.push('× компонент ' + name + ': ' + e);
  }
}
