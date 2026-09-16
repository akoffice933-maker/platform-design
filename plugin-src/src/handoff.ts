// Handoff (Итерация 10 ТЗ, раздел 13): борд «13_Handoff / handoff» — токены,
// анимации, именование, changelog итераций 1–10 и процесс передачи в разработку.

declare const penpot: any;

import { LIGHT_COLORS, DARK_COLORS, TYPE_STYLES, SPACE, RADII, SHADOWS } from './tokens-data';
import { pickFont, FONT_FALLBACKS, setStroke } from './draw';
import { txt, rect, ic, cardBox, openFrame } from './screens';

export const HANDOFF_BOARD_NAME = '13_Handoff / handoff';

const MOTION: [string, string, string][] = [
  ['150 мс', 'fast', 'Ховеры, фокус, нажатие кнопок — ease-out'],
  ['250 мс', 'base', 'Аккордеоны, тултипы, тосты, фильтры — ease-in-out'],
  ['400 мс', 'slow', 'Модалки, оверлеи, смена страницы — ease-in-out'],
  ['500 мс', 'spring', 'Появление карточек онбординга — spring (лёгкий overshoot)'],
];

const CHANGELOG: [string, string][] = [
  ['Итерация 1 · Foundations', '33 цвета + 10 текстовых стилей в библиотеке; WCAG-аудит; сетки 4 брейкпоинтов'],
  ['Итерация 2 · UI-kit', '72 компонента: кнопки, поля, чипы, тосты, таблицы; демо-полоса тёмной темы'],
  ['Итерация 3 · Domain', '34 доменных компонента: ScenarioCard, GameCard, радар, CodeDisplay, BottomNav…'],
  ['Итерация 4 · Auth + дашборды', '33 фрейма E-01…E-12 × 1440/768/390 (гость, психолог, студент)'],
  ['Итерация 5 · Симулятор', '27 фреймов E-20…E-28: сессия, пауза, разбор, радары, история'],
  ['Итерация 6 · Игры + клиент', '30 фреймов E-30…E-44: доступы по коду/ссылке, клиентский сценарий в тёмной теме'],
  ['Итерация 7 · TMA', '9 фреймов E-50…E-57, только 390, safe areas 56/80, MainButton и BottomNav'],
  ['Итерация 8 · Админка + супервизия', '28 фреймов E-60…E-73, только 1440/1280: верификация, аудит 152-ФЗ, разборы'],
  ['Итерация 9 · Состояния + прототипы', '18 фреймов E-80…E-85 + 6 потоков createFlow с 15 клик-связями'],
  ['Итерация 10 · Handoff', 'Этот борд, спека 10-handoff.html: токены, Tailwind, анимации, чек-лист'],
];

const NAMING: [string, string][] = [
  ['Фреймы экранов', 'E-XX Название / 1440 · 768 · 390   (пример: «E-22 Сессия / 768»)'],
  ['Компоненты', 'ComponentName / Variant / State   (пример: «Button / primary / hover»)'],
  ['Стили цветов', 'color/<группа>/<роль>   (пример: «color/accent/primary»)'],
  ['Стили текста', 'text/<роль>   (пример: «text/h2», «text/mono»)'],
];

export function buildHandoffBoard(log: string[]): void {
  const font = pickFont(FONT_FALLBACKS);
  void font;
  const SX = 11970 + 2160 + 240; // правее состояний E-80…E-85
  const W = 1240;
  const M = 24;
  const f = openFrame(HANDOFF_BOARD_NAME, SX, 100, W, 4400);
  try { f.resize(W, 4400); } catch (_) { /* пересчитаем в конце */ }
  let y = M;

  // Шапка
  rect(f, M, y, 40, 40, '#2563EB', 10);
  txt(f, M + 56, y + 2, 'Handoff Kit', 22, 700, '#0F172A');
  txt(f, M + 56, y + 26, 'Platform · обучающе-симуляционная платформа для психологов + игры для клиентов', 13, 400, '#475569');
  txt(f, W - 320, y + 6, 'ТЗ v1.0 · все 10 итераций выполнены', 12, 600, '#16A34A');
  txt(f, W - 320, y + 26, 'токены · анимации · именование · changelog', 11, 400, '#94A3B8');
  y += 64;

  // --- 1. Цветовые токены ---
  cardBox(f, M, y, W - 2 * M, 470, 'section / color tokens');
  txt(f, M + 20, y + 16, '1 · Цветовые токены', 15, 700, '#0F172A');
  txt(f, M + 20, y + 38, '33 стиля в библиотеке Penpot (color/…) — источник: tokens/design-tokens.json (DTCG)', 12, 400, '#475569');
  const swW = 132;
  LIGHT_COLORS.forEach((c, i) => {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const sx = M + 20 + col * swW;
    const sy = y + 66 + row * 78;
    const sw = rect(f, sx, sy, swW - 14, 30, c.value, 8);
    setStroke(sw, '#E2E8F0', 1, 'inner');
    sw.name = 'swatch ' + c.name;
    txt(f, sx, sy + 36, c.name.replace('color/', ''), 9, 600, '#0F172A');
    txt(f, sx, sy + 50, c.value + ' · ' + c.use.slice(0, 18), 8, 400, '#94A3B8');
  });
  const dY = y + 66 + 4 * 78;
  txt(f, M + 20, dY - 6, 'Тёмная тема (ТЗ 11.1) — обязательна для клиентских и TMA:', 11, 600, '#475569');
  DARK_COLORS.forEach((c, i) => {
    const sx = M + 20 + i * swW;
    const sw = rect(f, sx, dY + 12, swW - 14, 30, c.value, 8);
    setStroke(sw, '#E2E8F0', 1, 'inner');
    sw.name = 'swatch ' + c.name;
    txt(f, sx, dY + 48, c.name.replace('color/dark/', ''), 9, 600, '#0F172A');
    txt(f, sx, dY + 62, c.value, 8, 400, '#94A3B8');
  });
  txt(f, M + 740, dY - 6, 'Контраст пар текст/фон проверен (WCAG 2.1 AA);', 10, 400, '#94A3B8');
  txt(f, M + 740, dY + 12, 'риски — в foundations/01-foundations.html #wcag.', 10, 400, '#94A3B8');
  y += 470 + 16;

  // --- 2. Типографика ---
  cardBox(f, M, y, W - 2 * M, 420, 'section / type tokens');
  txt(f, M + 20, y + 16, '2 · Типографика — Inter, 10 стилей (text/…)', 15, 700, '#0F172A');
  txt(f, M + 20, y + 38, 'Коды доступа — JetBrains Mono (text/mono). Шкала 40→12 без промежуточных значений.', 12, 400, '#475569');
  TYPE_STYLES.forEach((t, i) => {
    const ty = y + 70 + i * 33;
    txt(f, M + 20, ty + 4, t.name, 11, 600, '#2563EB');
    txt(f, M + 190, ty + (t.size > 24 ? -2 : 0), t.sample, Math.min(t.size, 22), t.weight, '#0F172A');
    txt(f, W - 340, ty + 4, t.size + '/' + t.lineHeight + ' · ' + t.weight + ' · ' + t.use, 11, 400, '#94A3B8');
  });
  y += 420 + 16;

  // --- 3. Space · Radius · Shadow ---
  cardBox(f, M, y, W - 2 * M, 190, 'section / space radius shadow');
  txt(f, M + 20, y + 16, '3 · Отступы, радиусы, тени', 15, 700, '#0F172A');
  txt(f, M + 20, y + 40, 'SPACE (space/1–9):', 11, 600, '#475569');
  SPACE.forEach((s, i) => {
    const sx = M + 130 + i * 84;
    rect(f, sx, y + 38, Math.min(s, 64), 14, '#2563EB', 4).name = 'space/' + (i + 1);
    txt(f, sx, y + 58, String(s), 10, 500, '#0F172A');
  });
  txt(f, M + 20, y + 96, 'RADIUS:', 11, 600, '#475569');
  RADII.forEach((r, i) => {
    const sx = M + 130 + i * 110;
    const rr = rect(f, sx, y + 88, 72, 26, '#EEF0F4', Math.min(r[1], 13));
    setStroke(rr, '#E2E8F0', 1, 'inner');
    txt(f, sx, y + 120, r[0].replace('radius/', '') + ' ' + (r[1] === 9999 ? '∞' : r[1]), 9, 500, '#475569');
  });
  txt(f, M + 20, y + 156, 'SHADOW:', 11, 600, '#475569');
  SHADOWS.forEach((s, i) => {
    const sx = M + 130 + i * 150;
    txt(f, sx, y + 150, s[0] + ' · 0 ' + s[1].y + ' ' + s[1].b + ' / ' + s[1].op, 10, 500, '#475569');
  });
  y += 190 + 16;

  // --- 4. Анимации ---
  cardBox(f, M, y, W - 2 * M, 210, 'section / motion');
  txt(f, M + 20, y + 16, '4 · Анимации — 150 / 250 / 400 / 500 мс', 15, 700, '#0F172A');
  txt(f, M + 20, y + 38, 'motion/fast · base · slow · spring. Кривые: ease-out (0,0,.58,1) · ease-in-out (.42,0,.58,1) · spring (.34,1.56,.64,1)', 12, 400, '#475569');
  MOTION.forEach((mrow, i) => {
    const my = y + 70 + i * 32;
    const dur = rect(f, M + 20, my, 76, 24, '#EFF6FF', 12);
    dur.name = 'motion / ' + mrow[1];
    txt(f, M + 34, my + 5, mrow[0], 12, 700, '#2563EB');
    txt(f, M + 110, my + 5, mrow[1], 11, 600, '#7C3AED');
    txt(f, M + 200, my + 5, mrow[2], 12, 400, '#475569');
  });
  y += 210 + 16;

  // --- 5. Именование ---
  cardBox(f, M, y, W - 2 * M, 176, 'section / naming');
  txt(f, M + 20, y + 16, '5 · Именование (обязательный паттерн ТЗ)', 15, 700, '#0F172A');
  NAMING.forEach((n, i) => {
    const ny = y + 50 + i * 30;
    txt(f, M + 20, ny, n[0], 12, 600, '#0F172A');
    txt(f, M + 260, ny, n[1], 12, 400, '#475569');
  });
  y += 176 + 16;

  // --- 6. Changelog ---
  cardBox(f, M, y, W - 2 * M, 402, 'section / changelog');
  txt(f, M + 20, y + 16, '6 · Changelog — все 10 итераций', 15, 700, '#0F172A');
  CHANGELOG.forEach((c, i) => {
    const cy2 = y + 48 + i * 34;
    const num = rect(f, M + 20, cy2, 22, 22, i === 9 ? '#16A34A' : '#EEF0F4', 11);
    num.name = 'changelog / ' + (i + 1);
    txt(f, M + 26, cy2 + 4, String(i + 1), 11, 700, i === 9 ? '#FFFFFF' : '#475569');
    txt(f, M + 56, cy2 + 3, c[0], 12, 600, '#0F172A');
    txt(f, M + 340, cy2 + 3, c[1], 11, 400, '#475569');
  });
  y += 402 + 16;

  // --- 7. Процесс передачи ---
  cardBox(f, M, y, W - 2 * M, 236, 'section / handoff process');
  txt(f, M + 20, y + 16, '7 · Как передавать в разработку', 15, 700, '#0F172A');
  const steps: [string, string][] = [
    ['inspect', 'Выделить слой → правая панель: размеры, стили уже привязаны к color/… и text/…'],
    ['токены', 'tokens/design-tokens.json (DTCG) + tokens/tokens.css → переменные; Tailwind-маппинг — спека 10'],
    ['анимации', 'Таблица motion (150/250/400/500 + кривые) — спека 10, раздел 4'],
    ['прототипы', 'Режим Present: 6 потоков 7.1–7.6 кликабельны (navigate-to)'],
    ['приёмка', 'Чек-листы docs/03-checklists.md; WCAG — foundations/01 #wcag; тёмная тема обязательна в клиентских'],
  ];
  steps.forEach((s, i) => {
    const sy = y + 48 + i * 36;
    const tag = rect(f, M + 20, sy, 110, 26, '#F5F3FF', 13);
    tag.name = 'handoff-step / ' + s[0];
    txt(f, M + 32, sy + 6, s[0], 11, 700, '#7C3AED');
    txt(f, M + 150, sy + 6, s[1], 12, 400, '#475569');
  });
  y += 236 + 16;

  // Итоговая строка
  const fin = rect(f, M, y, W - 2 * M, 44, '#F0FDF4', 10);
  fin.name = 'final-note';
  ic(f, 'badge-check', M + 16, y + 13, 18, '#16A34A');
  txt(f, M + 44, y + 8, '149 бордов: 3 контента + 145 экранов E-01…E-85 + этот борд · 106 компонентов · 6 прототипов', 12, 600, '#166534');
  txt(f, M + 44, y + 26, '9 HTML-спек в screens/ · токены в tokens/ · плагин Platform Builder v1.0 (идемпотентен)', 11, 400, '#15803D');

  try { f.resize(W, y + 44 + M); } catch (_) { /* фиксированная высота */ }
}
