// Smoke-тест Platform Builder v0.3: Foundations + UI-kit + Domain.
const fs = require('fs');
const path = require('path');

const stats = { colorStyles: 0, typoStyles: 0, boards: [], components: [], texts: 0, rects: 0, ellipses: 0, svgImports: 0, groups: 0, interactions: [], flows: [], textList: [] };

function makeShape(kind) {
  return {
    kind, name: '', x: 0, y: 0, w: 0, h: 0,
    fills: [], strokes: [], effects: [], cornerRadius: 0, rotation: 0,
    resize(w, h) { this.w = w; this.h = h; },
    addInteraction(trigger, action) { stats.interactions.push({ trigger, action, shape: this }); return action; },
    appendChild(c) { (this.children = this.children || []).push(c); c.parent = this; },
    remove() { this._removed = true; },
    characters: kind === 'text' ? '' : undefined,
  };
}

const page = {
  findShapes(opts) { const all = stats.boards.concat(stats.rects || []); return (opts && opts.name) ? all.filter(s => s.name === opts.name) : all; },
  flows: [],
  createFlow(name, board) { const fl = { name, startingBoard: board }; stats.flows.push(fl); return fl; },
};

global.penpot = {
  currentPage: page,
  fonts: {
    findByName(name) {
      const fonts = {
        'Inter': { name: 'Inter', fontId: 'f-inter', variants: [
          { name: 'Regular', fontVariantId: 'v-r', fontWeight: 400 },
          { name: 'Medium', fontVariantId: 'v-m', fontWeight: 500 },
          { name: 'SemiBold', fontVariantId: 'v-sb', fontWeight: 600 },
          { name: 'Bold', fontVariantId: 'v-b', fontWeight: 700 },
        ]},
        'JetBrains Mono': { name: 'JetBrains Mono', fontId: 'f-jbm', variants: [
          { name: 'Regular', fontVariantId: 'v-r', fontWeight: 400 },
        ]},
      };
      return fonts[name] || null;
    },
  },
  ui: { open() { }, sendMessage() { } },
  library: {
    local: {
      colors: [], typographies: [], components: [],
      createColor() { stats.colorStyles++; const c = { name: '', color: undefined, opacity: undefined }; this.colors.push(c); return c; },
      createTypography() { stats.typoStyles++; const t = { name: '', fontFamily: '', fontId: '', fontVariantId: '', fontSize: '', fontWeight: '', lineHeight: '', letterSpacing: '' }; this.typographies.push(t); return t; },
      createComponent(shapes) { const comp = { name: '', shapes: shapes.slice() }; stats.components.push(comp); return comp; },
    },
  },
  createBoard() { const b = makeShape('board'); stats.boards.push(b); return b; },
  createRectangle() { stats.rects++; return makeShape('rect'); },
  createEllipse() { stats.ellipses++; return makeShape('ellipse'); },
  createText(s) { stats.texts++; stats.textList.push(String(s)); const t = makeShape('text'); t.characters = String(s); return t; },
  createShapeFromSvg() { stats.svgImports++; return makeShape('svg-group'); },
  group(shapes, name) { stats.groups++; return { kind: 'group', name, shapes }; },
};

const code = fs.readFileSync(path.join(__dirname, '..', 'penpot-plugin', 'plugin.js'), 'utf8');
new Function(code)();
(async () => {

// v1.2: сборка асинхронная (стадии с yield) — ждём завершения: последний
// борд прогона — 00_Diagnostics / run (151-й). Таймаут 30 с.
await new Promise((resolve, reject) => {
  const t0 = Date.now();
  const check = () => {
    const ready = stats.boards.length >= 151 && stats.boards[stats.boards.length - 1].name === '00_Diagnostics / run';
    if (ready) return resolve();
    if (Date.now() - t0 > 30000) return reject(new Error('плагин не собрал 151 борд за 30 с (' + stats.boards.length + ')'));
    setTimeout(check, 50);
  };
  check();
});



  const assert = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); process.exitCode = 1; } else { console.log('ok:', msg); } };

  // Foundations
  assert(stats.colorStyles === 33, `цветовых стилей: ${stats.colorStyles}`);
  assert(stats.typoStyles === 10, `текстовых стилей: ${stats.typoStyles}`);
  // Борды
  assert(stats.boards.length === 151, `бордов/фреймов: ${stats.boards.length} (3 контента + 145 экранов + E-53o offline + Handoff + диагностика)`);
  assert(stats.boards[0].name === '01_Foundations / audit', 'борд «01_Foundations / audit»');
  assert(stats.boards[1].name === '02_Components / UI-kit', 'борд «02_Components / UI-kit»');
  assert(stats.boards[2].name === '03_Patterns / Domain', 'борд «03_Patterns / Domain»');
  assert(stats.boards[148] && stats.boards[148].name === 'E-85 Критическая ошибка сессии / 390', 'борд «E-85 Критическая ошибка сессии / 390» (последний из состояний)');
  assert(stats.boards[149] && stats.boards[149].name === '13_Handoff / handoff', 'борд «13_Handoff / handoff»');
  assert(stats.boards[150] && stats.boards[150].name === '00_Diagnostics / run', 'борд «00_Diagnostics / run» (последним)');
  const offBoards = stats.boards.filter(b => /^E-53o /.test(b.name));
  assert(offBoards.length === 1, 'offline-фрейм E-53o: 1 шт. (/ 390)');
  const i53b = stats.boards.findIndex(b => b.name === 'E-53 Прохождение · не выбрано / 390');
  assert(i53b >= 0 && stats.boards[i53b + 1] && stats.boards[i53b + 1].name === 'E-53o Нет соединения / 390', 'E-53o идёт сразу после «E-53 · не выбрано» (серия TMA)');
  assert(stats.textList.some(c => c.includes('координаты')), 'диагностика проверяет координаты');
  const screenBoards = stats.boards.filter(b => /^E-\d\d /.test(b.name));
  assert(screenBoards.length === 145, `фреймов экранов: ${screenBoards.length} (…+ 18 состояний E-80…E-85 ×3)`);
  const simBoards = screenBoards.filter(b => /^E-2\d /.test(b.name));
  assert(simBoards.length === 27, `фреймов симулятора: ${simBoards.length} (9 × 3)`);
  const gameBoards = screenBoards.filter(b => /^E-(3\d|4\d) /.test(b.name));
  assert(gameBoards.length === 30, `фреймов игр/клиента: ${gameBoards.length} (E-30…E-33 ×3 + E-40…E-44 ×3 + 3 шага ×390)`);
  for (const nm of ['E-30 Библиотека игр / 1440', 'E-31 Создание доступа / 390', 'E-33 Доступы / 768',
                    'E-40 Открытие игры / 390', 'E-41 Согласие / 1440', 'E-42 Прохождение / 768',
                    'E-42 Прохождение · шкала / 390', 'E-42 Прохождение · таймер / 390',
                    'E-43 Завершение / 390', 'E-44 Ошибка доступа / 1440']) {
    assert(gameBoards.some(b => b.name === nm), 'фрейм «' + nm + '»');
  }
  const tmaBoards = screenBoards.filter(b => /^E-5\d /.test(b.name));
  assert(tmaBoards.length === 9, `TMA-фреймов: ${tmaBoards.length} (E-50…E-57 + сост. MainButton disabled, все / 390)`);
  for (const nm of ['E-50 Онбординг / 390', 'E-51 Главная / 390', 'E-52 Игры / 390',
                    'E-53 Прохождение / 390', 'E-53 Прохождение · не выбрано / 390',
                    'E-54 Результат / 390', 'E-55 Дневник / 390', 'E-56 Прогресс / 390',
                    'E-57 Профиль / 390']) {
    assert(tmaBoards.some(b => b.name === nm), 'фрейм «' + nm + '»');
  }
  const admBoards = screenBoards.filter(b => /^E-[67]\d /.test(b.name));
  assert(admBoards.length === 28, `фреймов админка+супервизия: ${admBoards.length} (E-60…E-73 × 1440/1280)`);
  for (const nm of ['E-60 Обзор платформы / 1440', 'E-62 Пользователь · карточка / 1280',
                    'E-63 Верификация · очередь / 1440', 'E-64 Верификация · решение / 1280',
                    'E-66 Аудит-лог / 1440', 'E-68 Супервизия · дашборд / 1280',
                    'E-70 Разбор сессии / 1440', 'E-71 Комментарий супервизии / 1280',
                    'E-73 Отчёт супервизии / 1440']) {
    assert(screenBoards.some(b => b.name === nm), 'фрейм «' + nm + '»');
  }
  const stBoards = screenBoards.filter(b => /^E-8\d /.test(b.name));
  assert(stBoards.length === 18, `фреймов состояний: ${stBoards.length} (E-80…E-85 × 1440/768/390)`);
  for (const nm of ['E-80 Загрузка / 1440', 'E-81 Пусто / 390', 'E-82 Ошибка / 768',
                    'E-83 Успех / 1440', 'E-84 Частичные данные / 768', 'E-85 Критическая ошибка сессии / 390']) {
    assert(stBoards.some(b => b.name === nm), 'фрейм «' + nm + '»');
  }
  assert(stats.flows.length === 6, `потоков прототипов: ${stats.flows.length} (ТЗ 7.1–7.6)`);
  assert(stats.flows.every(f => /^7\.\d /.test(f.name)), 'имена потоков «7.X …»');
  assert(stats.interactions.length === 15, `связей navigate-to: ${stats.interactions.length} (2+3+3+3+2+2)`);
  assert(stats.interactions.every(i => i.trigger === 'click' && i.action.type === 'navigate-to'), 'все связи click → navigate-to');
  assert(stats.flows[2].startingBoard.name === 'E-40 Открытие игры / 390', 'поток 7.3 стартует с E-40/390');
  for (const nm of ['E-01 Лендинг / 1440', 'E-03 Вход / 768', 'E-10 Дашборд психолога / 1440',
                    'E-20 Библиотека сценариев / 1440', 'E-20 Библиотека сценариев / 390',
                    'E-22 Сессия / 390', 'E-24 Сессия · пауза / 768', 'E-25 Разбор / 1440',
                    'E-26 Разбор · детали / 390', 'E-27 История сессий / 768', 'E-28 Прогресс навыков / 390']) {
    assert(screenBoards.some(b => b.name === nm), 'фрейм «' + nm + '»');
  }
  // проверка origin: контент рисуется в координатах фрейма (x = frame.x + local)
  const f0 = screenBoards.find(b => b.name === 'E-03 Вход / 1440');
  function firstChildX(node) { const c = (node.children || []).find(ch => ch.characters !== undefined || ch.kind === 'rect'); return c ? c.x : null; }
  const fx = firstChildX(f0);
  assert(fx !== null && Math.abs(fx - (f0.x + 20)) < 0.01, `origin фрейма применён (первая фигура x=${fx}, ожидалось ${f0.x + 20})`);

  const named = stats.components.map(c => c.name);
  const mustHave = [
    'ScenarioCard / default', 'ScenarioCard / compact', 'ScenarioCard / locked',
    'GameCard / default',
    'ClientAccessCard / active', 'ClientAccessCard / expired', 'ClientAccessCard / completed', 'ClientAccessCard / revoked',
    'ClientMessageBubble / left', 'ClientMessageBubble / right',
    'EmotionIndicator / compact', 'EmotionIndicator / extended',
    'AnswerOption / default', 'AnswerOption / selected', 'AnswerOption / correct', 'AnswerOption / wrong', 'AnswerOption / critical-error',
    'TechniqueTag / default', 'CriticalErrorBanner / default',
    'SkillScoreCard / default', 'SkillRadarChart / default',
    'SessionProgress / default', 'Loader / default', 'OnboardingStep / default',
    'ConsentBlock / default', 'CodeDisplay / default', 'DeepLinkBlock / default',
    'EmptyState / default', 'SupervisionComment / default', 'AuditLogRow / default',
    'BottomNav / TMA', 'MainButton / TMA / enabled', 'MainButton / TMA / disabled',
  ];
  for (const m of mustHave) {
    assert(named.includes(m), 'есть ' + m);
  }
  assert(named.filter(n => n.startsWith('VerificationBadge')).length >= 1, 'есть VerificationBadge');
  assert(named.every(n => n && n.length > 0), 'все компоненты именованы');
  assert(stats.components.length >= 105, `всего компонентов: ${stats.components.length} (72 UI-kit + ~33 domain, ≥105)`);
  assert(stats.svgImports >= 60, `SVG-импортов: ${stats.svgImports} (радары, графики, QR, иконки)`);
  console.log(`\nИтого: ${stats.colorStyles} цветов, ${stats.typoStyles} типографик, ${stats.components.length} компонентов,`);
  console.log(`бордов ${stats.boards.length}, SVG ${stats.svgImports}, текстов ${stats.texts}, прямоугольников ${stats.rects}, эллипсов ${stats.ellipses}`);
  console.log(process.exitCode ? 'SMOKE TEST FAILED' : 'SMOKE TEST PASSED ✓');

})();
