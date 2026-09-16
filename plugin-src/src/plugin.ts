// ============================================================================
// Platform Builder — плагин для Penpot (v0.2)
// Автоматизирует Итерации 1–2 ТЗ:
//   1) Foundations: 33 цветовых стиля, 10 текстовых стилей, борд-аудит;
//   2) UI-kit: борд компонентов + ~70 компонентов «Name / Variant / State».
// Идемпотентен: повторный запуск обновляет стили и пересобирает борды,
// существующие компоненты не дублируются.
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

function main(): void {
  const problems: string[] = [];
  let colorsCreated = 0;
  let textOk = 0;

  // Идемпотентность: пересобираем борды и фреймы с теми же именами
  try {
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
  } catch (_) { /* первая сборка */ }

  try { colorsCreated = createColorStyles(problems); } catch (e) { problems.push('× цветовые стили: ' + e); }
  try { textOk = createTextStyles(problems); } catch (e) { problems.push('× текстовые стили: ' + e); }
  try { buildFoundationsBoard(colorsCreated, textOk, problems, pickFont(FONT_FALLBACKS)); }
  catch (e) { problems.push('× борд Foundations: ' + e); }
  try { buildUIKitBoard(problems); } catch (e) { problems.push('× борд UI-kit: ' + e); }
  try { buildDomainBoard(problems); } catch (e) { problems.push('× борд Domain: ' + e); }
  try { buildScreens(problems); } catch (e) { problems.push('× экраны: ' + e); }
  try { buildScreens2(problems); } catch (e) { problems.push('× экраны симулятора: ' + e); }
  try { buildScreens3(problems); } catch (e) { problems.push('× экраны игр/клиента: ' + e); }
  try { buildScreens4(problems); } catch (e) { problems.push('× TMA экраны: ' + e); }
  try { buildScreens5(problems); } catch (e) { problems.push('× экраны админки/супервизии: ' + e); }
  try { buildScreens6(problems); } catch (e) { problems.push('× состояния: ' + e); }
  try { buildHandoffBoard(problems); } catch (e) { problems.push('× Handoff: ' + e); }
  try { buildFlows(problems); } catch (e) { problems.push('× прототипы: ' + e); }
  try { buildDiagnostics(problems); } catch (_) { /* диагностика не критична */ }
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
