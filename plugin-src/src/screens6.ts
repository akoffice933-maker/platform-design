// Состояния данных (Итерация 9 ТЗ, раздел 5.9): E-80…E-85 —
// loading / empty / error / success / partial / critical error. 18 фреймов (×3 бп).

declare const penpot: any;

import { C } from './tokens-data';
import { pickFont, setStroke, FONT_FALLBACKS } from './draw';
import { Mode, D, T, MB, openFrame, txt, rect, ic, btn, cardBox, shell, skillBarRow } from './screens';
import { codeDisplay } from './domain';

let F6: any = null;
let M6: any = null;

// ---------------------------------------------------------------------------
// Хелперы состояний
// ---------------------------------------------------------------------------

function skel(f: any, x: number, y: number, w: number, h: number, r = 8): void {
  const s = rect(f, x, y, w, h, C.BG2, r);
  s.name = 'skeleton';
}

function emptyState(f: any, cx: number, cy: number, title: string, sub1: string, sub2: string): void {
  ic(f, 'inbox', cx - 28, cy - 28, 56, C.INK3);
  const t = txt(f, cx - 140, cy + 44, title, 17, 700, C.INK);
  try { if (t.width) t.x = cx - t.width / 2; } catch (_) { /* mock */ }
  const s1 = txt(f, cx - 180, cy + 74, sub1, 13, 400, C.INK2);
  const s2 = txt(f, cx - 180, cy + 94, sub2, 13, 400, C.INK2);
  try { if (s1.width) s1.x = cx - s1.width / 2; if (s2.width) s2.x = cx - s2.width / 2; } catch (_) { /* mock */ }
}

// ---------------------------------------------------------------------------
// E-80 Состояния · загрузка (skeleton)
// ---------------------------------------------------------------------------

function e80(f: any, m: Mode): void {
  const box = shell(f, m, 0, 'Дашборд');
  let y = box.cy;
  const W = box.cw;
  skel(f, box.cx, y, 220, 24, 6); // «Добрый вечер»
  skel(f, box.cx, y + 36, 150, 14, 6);
  y += 74;
  const kw = Math.round((W - 72) / 4);
  for (let i = 0; i < 4; i++) {
    cardBox(f, box.cx + i * (kw + 24), y, kw, 92, 'skeleton / kpi');
    skel(f, box.cx + i * (kw + 24) + 16, y + 16, kw - 60, 12, 6);
    skel(f, box.cx + i * (kw + 24) + 16, y + 40, 90, 22, 6);
  }
  y += 116;
  const mainW = m.kind === 'desktop' ? Math.round(W * 0.62) : W;
  cardBox(f, box.cx, y, mainW, 264, 'skeleton / chart');
  skel(f, box.cx + 20, y + 16, 180, 14, 6);
  skel(f, box.cx + 20, y + 56, mainW - 40, 170, 10);
  if (m.kind === 'desktop') {
    cardBox(f, box.cx + mainW + 24, y, W - mainW - 24, 264, 'skeleton / system');
    skel(f, box.cx + mainW + 44, y + 16, 150, 14, 6);
    for (let i = 0; i < 4; i++) skel(f, box.cx + mainW + 44, y + 52 + i * 40, W - mainW - 64, 14, 6);
  }
  y += 288;
  cardBox(f, box.cx, y, W, 232, 'skeleton / list');
  skel(f, box.cx + 20, y + 16, 160, 14, 6);
  for (let i = 0; i < 3; i++) {
    skel(f, box.cx + 20, y + 56 + i * 56, 36, 36, 18);
    skel(f, box.cx + 72, y + 60 + i * 56, W - 220, 12, 6);
    skel(f, box.cx + 72, y + 78 + i * 56, (W - 220) * 0.6, 12, 6);
  }
}

// ---------------------------------------------------------------------------
// E-81 Состояния · пусто (empty)
// ---------------------------------------------------------------------------

function e81(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сценарии');
  const y = box.cy;
  const W = box.cw;
  emptyState(f, box.cx + Math.round(W / 2), y + 120,
    'Сценариев пока нет',
    'Создайте свой первый сценарий или выберите готовый',
    'из библиотеки — это займёт пару минут.');
  const bw = 200;
  const bx = box.cx + Math.round((W - bw) / 2);
  btn(f, bx, y + 236, bw, 'Создать сценарий', 'primary', { icon: 'plus', h: 44 });
  btn(f, bx, y + 296, bw, 'Открыть шаблоны', 'secondary', { h: 44 });
  const t = txt(f, box.cx, y + 368, 'Подсказка: сценарий можно продублировать и адаптировать под клиента.', 12, 400, C.INK3);
  try { if (t.width) t.x = box.cx + (W - t.width) / 2; } catch (_) { /* mock */ }
}

// ---------------------------------------------------------------------------
// E-82 Состояния · ошибка (error)
// ---------------------------------------------------------------------------

function e82(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сценарии');
  let y = box.cy;
  const W = box.cw;
  const cw = Math.min(520, W - 32);
  const cx = box.cx + Math.round((W - cw) / 2);
  cardBox(f, cx, y + 40, cw, 300, 'card / error');
  const circ = rect(f, cx + Math.round((cw - 72) / 2), y + 76, 72, 72, 'FEE2E2', 36);
  circ.name = 'error-circle';
  ic(f, 'triangle-alert', cx + Math.round((cw - 72) / 2) + 20, y + 96, 32, C.ERROR);
  const t = txt(f, cx, y + 170, 'Не удалось загрузить сценарии', 17, 700, C.INK);
  try { if (t.width) t.x = cx + (cw - t.width) / 2; } catch (_) { /* mock */ }
  const s1 = txt(f, cx, y + 202, 'Проверьте подключение к интернету и попробуйте ещё раз.', 13, 400, C.INK2);
  try { if (s1.width) s1.x = cx + (cw - s1.width) / 2; } catch (_) { /* mock */ }
  const s2 = txt(f, cx, y + 222, 'Ошибка: NETWORK_504 · 16.09.2026, 14:02', 11, 400, C.INK3);
  try { if (s2.width) s2.x = cx + (cw - s2.width) / 2; } catch (_) { /* mock */ }
  const bw = Math.min(200, cw - 40);
  btn(f, cx + Math.round((cw - bw) / 2), y + 256, bw, 'Повторить', 'primary', { icon: 'rotate-ccw', h: 44 });
  const l = txt(f, cx, y + 380, 'Повторная ошибка? Напишите в поддержку — ответим в течение дня.', 12, 500, C.ACCENT);
  try { if (l.width) l.x = cx + (W - l.width) / 2; } catch (_) { /* mock */ }
}

// ---------------------------------------------------------------------------
// E-83 Состояния · успех (success)
// ---------------------------------------------------------------------------

function e83(f: any, m: Mode): void {
  const box = shell(f, m, 2, 'Игры');
  let y = box.cy;
  const W = box.cw;
  // success toast
  const tw = Math.min(420, W - 32);
  const tr = rect(f, box.cx, y, tw, 56, 'F0FDF4', 12);
  tr.name = 'Toast / success';
  ic(f, 'circle-check', box.cx + 16, y + 18, 20, C.SUCCESS);
  txt(f, box.cx + 46, y + 10, 'Доступ создан', 13, 700, '#166534');
  txt(f, box.cx + 46, y + 30, 'Код и ссылка отправлены клиенту', 12, 400, '#15803D');
  y += 80;
  const cw = Math.min(520, W - 32);
  const cx = box.cx + Math.round((W - cw) / 2);
  cardBox(f, cx, y, cw, 260, 'card / success');
  const circ = rect(f, cx + Math.round((cw - 72) / 2), y + 28, 72, 72, 'DCFCE7', 36);
  circ.name = 'success-circle';
  ic(f, 'circle-check', cx + Math.round((cw - 72) / 2) + 20, y + 48, 32, C.SUCCESS);
  const t = txt(f, cx, y + 116, 'Игра «Дыхание 4-7-8» выдана клиенту', 16, 700, C.INK);
  try { if (t.width) t.x = cx + (cw - t.width) / 2; } catch (_) { /* mock */ }
  const s = txt(f, cx, y + 144, 'Клиент получит уведомление в Telegram', 13, 400, C.INK2);
  try { if (s.width) s.x = cx + (cw - s.width) / 2; } catch (_) { /* mock */ }
  if (m.kind !== 'tablet') {
    codeDisplay(f, cx + Math.round((cw - 280) / 2), y + 176, F6, M6);
  }
  const bw = 160;
  btn(f, cx + Math.round((cw - bw) / 2), y + 330, bw, 'Готово', 'primary', { h: 44 });
}

// ---------------------------------------------------------------------------
// E-84 Состояния · частичные данные (partial)
// ---------------------------------------------------------------------------

function e84(f: any, m: Mode): void {
  const box = shell(f, m, 4, 'Прогресс');
  let y = box.cy;
  const W = box.cw;
  const mainW = m.kind === 'desktop' ? Math.round(W * 0.5) : W;
  cardBox(f, box.cx, y, mainW, 300, 'card / partial-radar');
  txt(f, box.cx + 20, y + 16, 'Радар навыков', 15, 600, C.INK);
  const warn = rect(f, box.cx + 20, y + 48, mainW - 40, 64, 'FEF3C7', 10);
  warn.name = 'partial-warning';
  ic(f, 'info', box.cx + 34, y + 68, 20, C.WARNING);
  txt(f, box.cx + 64, y + 60, 'Недостаточно данных: пройдено 2 из 5 сессий.', 12, 500, '#92400E');
  txt(f, box.cx + 64, y + 80, 'Радар покажет полную картину после 5-й сессии.', 11, 400, '#92400E');
  const rows: [string, number, string, boolean][] = [
    ['Слушание', 86, '2563EB', true], ['Эмпатия', 78, '16A34A', true], ['Границы', 64, 'D97706', true],
    ['Рефлексия', 0, '94A3B8', false], ['Самоанализ', 0, '94A3B8', false],
  ];
  let ry = y + 132;
  rows.forEach((r) => {
    if (r[3]) { skillBarRow(f, box.cx + 24, ry, mainW - 48, r[0], r[1], '#' + r[2]); }
    else {
      txt(f, box.cx + 24, ry, r[0], 12, 500, C.INK3);
      const nd = rect(f, box.cx + mainW - 130, ry - 2, 82, 22, 'F1F5F9', 11);
      nd.name = 'chip / нет данных';
      txt(f, box.cx + mainW - 122, ry + 2, 'нет данных', 10, 500, '64748B');
    }
    ry += 34;
  });
  if (m.kind === 'desktop') {
    const rx = box.cx + mainW + 24;
    const rw = W - mainW - 24;
    cardBox(f, rx, y, rw, 300, 'card / partial-sessions');
    txt(f, rx + 20, y + 16, 'Сессии', 15, 600, C.INK);
    const ss: [string, string, string][] = [
      ['02.09', 'Тревога перед экзаменом', '86'], ['09.09', 'Конфликт с руководителем', '78'],
      ['??', 'Сессия 3 из 5', 'НД'], ['??', 'Сессия 4 из 5', 'НД'], ['??', 'Сессия 5 из 5', 'НД'],
    ];
    ss.forEach((s, i) => {
      const sy = y + 52 + i * 46;
      const on = s[2] !== 'НД';
      const cell = rect(f, rx + 20, sy, 40, 28, on ? 'EFF6FF' : 'F8FAFC', 8);
      cell.name = on ? 'session-cell' : 'session-cell / empty';
      if (!on) setStroke(cell, C.BD, 1, 'inner');
      txt(f, rx + 72, sy + 7, s[1], 13, on ? 500 : 400, on ? C.INK : C.INK3);
      txt(f, rx + rw - 56, sy + 7, s[2], 13, 600, on ? C.ACCENT : C.INK3);
    });
  }
}

// ---------------------------------------------------------------------------
// E-85 Сессия · критическая ошибка
// ---------------------------------------------------------------------------

function e85(f: any, m: Mode): void {
  const box = shell(f, m, 1, 'Сессия · тревожный ответ клиента');
  let y = box.cy;
  const W = box.cw;
  // критический баннер
  const bh = 96;
  const bn = rect(f, box.cx, y, W, bh, 'FEF2F2', 12);
  bn.name = 'CriticalErrorBanner / session';
  setStroke(bn, 'FECACA', 1, 'inner');
  ic(f, 'alert-octagon', box.cx + 20, y + 20, 28, C.ERROR);
  txt(f, box.cx + 62, y + 16, 'В ответе клиента признаки острого состояния', 15, 700, '#991B1B');
  txt(f, box.cx + 62, y + 40, 'Система рекомендует остановить симуляцию и разобрать эпизод', 13, 400, '#B91C1C');
  txt(f, box.cx + 62, y + 58, 'с супервизором. Черновик сессии сохранён автоматически (14:03).', 13, 400, '#B91C1C');
  btn(f, box.cx + W - 170, y + 14, 150, 'Разобрать сейчас', 'primary', { h: 40 });
  btn(f, box.cx + W - 170, y + 60, 150, 'Отложить', 'secondary', { h: 36, fs: 12 });
  y += bh + 20;
  // свёрнутая лента сессии
  const mainW = m.kind === 'desktop' ? Math.round(W * 0.62) : W;
  cardBox(f, box.cx, y, mainW, 300, 'card / session-paused');
  txt(f, box.cx + 20, y + 16, 'Сессия остановлена · эпизод 12 из 20', 14, 600, C.INK);
  const ch = rect(f, box.cx + 20, y + 48, mainW - 40, 60, C.BG2, 10);
  ch.name = 'ClientMessageBubble / critical';
  setStroke(ch, 'FECACA', 1, 'inner');
  txt(f, box.cx + 36, y + 60, 'Клиент: «Дальше не могу… сейчас как будто', 13, 400, C.INK);
  txt(f, box.cx + 36, y + 80, 'снова там. Ничего не чувствую, только шум».', 13, 400, C.INK);
  txt(f, box.cx + 20, y + 124, 'Рекомендации системы:', 12, 600, C.INK2);
  const recs: [string, boolean][] = [['Валидация состояния клиента, не углублять драму', true],
    ['Техника заземления «5-4-3-2-1»', true], ['Предложить паузу и выйти из роли', false]];
  recs.forEach((r, i) => {
    const cb = rect(f, box.cx + 20, y + 152 + i * 36, 18, 18, r[1] ? C.ACCENT : C.WHITE, 5);
    cb.name = 'checkbox / ' + (r[1] ? 'checked' : 'unchecked');
    if (!r[1]) setStroke(cb, C.BD, 1, 'inner');
    else ic(f, 'check', box.cx + 24, y + 155 + i * 36, 12, '#FFFFFF');
    txt(f, box.cx + 48, y + 152 + i * 36, r[0], 12, 400, C.INK2);
  });
  if (m.kind === 'desktop') {
    const rx = box.cx + mainW + 24;
    const rw = W - mainW - 24;
    cardBox(f, rx, y, rw, 300, 'card / guidance');
    txt(f, rx + 20, y + 16, 'Что делать супервизору', 14, 600, C.INK);
    const steps: string[] = ['Разобрать триггер эпизода с кандидатом', 'Отметить реакцию паузы в журнале',
      'Проверить настройки интенсивности сценария', 'Назначить повторную сессию'];
    steps.forEach((s, i) => {
      const sy = y + 52 + i * 40;
      txt(f, rx + 20, sy, (i + 1) + '.', 12, 600, C.ACCENT);
      txt(f, rx + 40, sy, s, 12, 400, C.INK2);
    });
    btn(f, rx + 20, y + 232, rw - 40, 'Создать разбор', 'secondary', { icon: 'message-circle', h: 40 });
  }
}

// ---------------------------------------------------------------------------
// Реестр и сборка
// ---------------------------------------------------------------------------

interface Screen6Def { code: string; title: string; mobileH: number; draw: (f: any, m: Mode) => void }

const SCREENS6: Screen6Def[] = [
  { code: 'E-80', title: 'Загрузка', mobileH: 844, draw: e80 },
  { code: 'E-81', title: 'Пусто', mobileH: 720, draw: e81 },
  { code: 'E-82', title: 'Ошибка', mobileH: 700, draw: e82 },
  { code: 'E-83', title: 'Успех', mobileH: 780, draw: e83 },
  { code: 'E-84', title: 'Частичные данные', mobileH: 800, draw: e84 },
  { code: 'E-85', title: 'Критическая ошибка сессии', mobileH: 844, draw: e85 },
];

export const SCREEN6_FRAME_NAMES: string[] = SCREENS6
  .flatMap((s) => ['1440', '768', '390'].map((bp) => s.code + ' ' + s.title + ' / ' + bp));

export function buildScreens6(log: string[]): void {
  F6 = pickFont(FONT_FALLBACKS);
  try { M6 = pickFont(['JetBrains Mono']); } catch (_) { M6 = F6; }
  const SX = 11970; // колонка правее админ-блока итерации 8
  const XOFF: [Mode, string, number][] = [[D, '1440', 0], [T, '768', 1680], [MB, '390', 2688]];
  let y = 100;
  for (const s of SCREENS6) {
    for (const [base, bp, xo] of XOFF) {
      const h = base.kind === 'mobile' ? s.mobileH : base.h;
      const m: Mode = { w: base.w, h, kind: base.kind };
      const f = openFrame(s.code + ' ' + s.title + ' / ' + bp, SX + xo, y, m.w, h);
      try { s.draw(f, m); } catch (e) { log.push('× ' + s.code + ' ' + s.title + '/' + bp + ': ' + e); }
    }
    y += 1200;
  }
}
