// ============================================================================
// Platform Builder — плагин для Penpot (v1.2)
// Автоматизирует всё ТЗ v1.0 + P1: стили, борды Foundations/UI-kit/Domain,
// фреймы E-01…E-85 (+ offline E-53o), Handoff, 6 кликабельных потоков,
// борд самодиагностики. 151 борд.
// v1.2: окно прогресса (penpot.ui) + асинхронные стадии — сборка длинная
// (минуты), без лога выглядела как «ничего не происходит».
// Идемпотентен: повторный запуск пересобирает свои борды, ничего не дублирует.
// ============================================================================

declare const penpot: any;

import { createColorStyles, createTextStyles, buildFoundationsBoard } from './foundations';
import { buildUIKitBoard } from './uikit';
import { buildDomainBoard } from './domain';
import { buildScreens, SCREEN_FRAME_NAMES } from './screens';
import { buildScreens2, SCREEN2_FRAME_NAMES } from './screens2';
import { buildScreens3, SCREEN3_FRAME_NAMES } from './screens3';
import { buildScreens4, SCREEN4_FRAME_NAMES } from './screens4';
import { buildScreens5, SCREEN5_FRAME_NAMES } from './screens5';
import { buildScreens6, SCREEN6_FRAME_NAMES } from './screens6';
import { buildFlows } from './prototypes';
import { buildHandoffBoard, HANDOFF_BOARD_NAME } from './handoff';
import { pickFont, removeShapesByName, setOrigin, FONT_FALLBACKS } from './draw';
import { txt, rect } from './screens';

// --- Окно прогресса (не критично: без UI сборка всё равно выполняется) ------

function uiOpen(): void {
  try { penpot.ui && penpot.ui.open('Platform Builder', '', { width: 380, height: 520 }); }
  catch (_) { /* мок / старый рантайм */ }
}

function uiLog(text: string): void {
  try { penpot.ui && penpot.ui.sendMessage({ type: 'log', text }); }
  catch (_) { /* мок / старый рантайм */ }
}

function uiDone(seconds: number, errors: number): void {
  try { penpot.ui && penpot.ui.sendMessage({ type: 'done', seconds, problems: errors }); }
  catch (_) { /* мок / старый рантайм */ }
}

// Пауза между стадиями: отдаёт слот event loop, чтобы postMessage
// из лога реально долетали до окна, а Penpot успевал дышать.
function yieldFrame(): Promise<void> {
  return new Promise((resolve) => { setTimeout(resolve, 30); });
}

async function main(): Promise<void> {
  const t0 = Date.now();
  const problems: string[] = [];
  let colorsCreated = 0;
  let textOk = 0;

  uiOpen();

  const stage = async (label: string, fn: () => void): Promise<void> => {
    uiLog('… ' + label);
    await yieldFrame();
    try {
      fn();
      uiLog('✓ ' + label);
    } catch (e: any) {
      const msg = e && e.message ? e.message : String(e);
      problems.push('× ' + label + ': ' + msg);
      uiLog('× ' + label + ' — ошибка, продолжаю (детали в диагностике)');
    }
  };

  await stage('Очистка прошлой сборки (идемпотентность)', () => {
    const page = penpot.currentPage;
    const r1 = removeShapesByName(page, '01_Foundations / audit');
    const r2 = removeShapesByName(page, '02_Components / UI-kit');
    const r3 = removeShapesByName(page, '03_Patterns / Domain');
    let rS = 0;
    for (const nm of SCREEN_FRAME_NAMES) rS += removeShapesByName(page, nm);
    for (const nm of SCREEN2_FRAME_NAMES) rS += removeShapesByName(page, nm);
    for (const nm of SCREEN3_FRAME_NAMES) rS += removeShapesByName(page, nm);
    for (const nm of SCREEN4_FRAME_NAMES) rS += removeShapesByName(page, nm);
    for (const nm of SCREEN5_FRAME_NAMES) rS += removeShapesByName(page, nm);
    for (const nm of SCREEN6_FRAME_NAMES) rS += removeShapesByName(page, nm);
    rS += removeShapesByName(page, HANDOFF_BOARD_NAME);
    if (r1 || r2 || r3 || rS) problems.push('ℹ пересобрано фреймов: ' + (r1 + r2 + r3 + rS));
  });

  await stage('Цветовые стили (33)', () => { colorsCreated = createColorStyles(problems); });
  await stage('Текстовые стили (10)', () => { textOk = createTextStyles(problems); });
  await stage('Борд Foundations', () => { buildFoundationsBoard(colorsCreated, textOk, problems, pickFont(FONT_FALLBACKS)); });
  await stage('Борд UI-kit (72 компонента)', () => { buildUIKitBoard(problems); });
  await stage('Борд Domain (34 компонента)', () => { buildDomainBoard(problems); });
  await stage('Экраны E-01…E-12', () => { buildScreens(problems); });
  await stage('Экраны симулятора E-20…E-28', () => { buildScreens2(problems); });
  await stage('Экраны игр/клиента E-30…E-44', () => { buildScreens3(problems); });
  await stage('Экраны TMA E-50…E-57o (151-й борд)', () => { buildScreens4(problems); });
  await stage('Экраны админки/супервизии E-60…E-73', () => { buildScreens5(problems); });
  await stage('Состояния E-80…E-85 (18 фреймов)', () => { buildScreens6(problems); });
  await stage('Борд Handoff', () => { buildHandoffBoard(problems); });
  await stage('Кликабельные потоки (7.1–7.6)', () => { buildFlows(problems); });
  await stage('Борд самодиагностики', () => { buildDiagnostics(problems); });

  uiLog('Готово. Shift+1 — показать всю сборку; борд 00_Diagnostics / run — отчёт прогона.');
  uiDone(Math.round((Date.now() - t0) / 100) / 10, problems.filter((p) => p.startsWith('×')).length);
}

main();

// ---------------------------------------------------------------------------
// Диагностика прогона (v1.1): борд с отчётом + самопроверка координат
// ---------------------------------------------------------------------------

function buildDiagnostics(problems: string[]): void {
  const NAME = '00_Diagnostics / run';
  try { removeShapesByName(penpot.currentPage, NAME); } catch (_) { /* первая сборка */ }
  const f = penpot.createBoard();
  f.name = NAME;
  f.x = 100; f.y = -560;
  try { f.resize(1240, 560); } catch (_) { /* фикс. высота */ }
  try { f.fills = [{ fillColor: { r: 1, g: 1, b: 1 }, fillOpacity: 1 }]; } catch (_) { /* фон */ }
  setOrigin(f.x, f.y);
  rect(f, 0, 0, 1240, 560, '#FFFFFF', 0);
  txt(f, 24, 26, 'ДИАГНОСТИКА ПРОГОНА · ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC', 14, 700, '#0F172A');
  txt(f, 24, 50, 'Борд пересоздаётся при каждом запуске. Строки с × или ⚠ — повод сообщить разработчику плагина.', 11, 400, '#475569');
  // Самопроверка координат: контент должен лежать ВНУТРИ фреймов (x ребёнка ≈ x фрейма + локальный офсет)
  try {
    const fr = (penpot.currentPage.findShapes({ name: 'E-03 Вход / 1440' }) || [])[0];
    const ch = (fr && fr.children) || [];
    const child = ch.find((c: any) => typeof c.x === 'number');
    if (fr && child) {
      const diff = Math.round(child.x - fr.x);
      if (Math.abs(diff) > 300) {
        problems.push('⚠ координаты: контент смещён на ' + diff + 'px — Penpot трактует x/y как parent-relative. Сообщите разработчику (фикс — одна строка в draw.ts).');
      } else {
        problems.push('✓ координаты: контент внутри фреймов (сдвиг первого слоя ' + diff + 'px)');
      }
    }
  } catch (_) { /* нет доступа к children */ }
  const lines = problems.length ? problems : ['✓ ошибок нет: стили, компоненты, фреймы и потоки собраны'];
  lines.slice(0, 19).forEach((ln, i) => {
    txt(f, 24, 84 + i * 24, ln, 12, 400,
      ln.startsWith('×') || ln.startsWith('⚠') ? '#DC2626' : ln.startsWith('✓') ? '#16A34A' : '#0F172A');
  });
}
