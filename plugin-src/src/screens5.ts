// Админка + супервизия (Итерация 8 ТЗ, разделы 5.7–5.8): E-60…E-73.
// Только 1440/1280 (ТЗ: админ-экраны без мобильных), светлые кабинеты ролей
// «админ» и «супервизор». 14 экранов × 2 брейкпоинта = 28 фреймов.

declare const penpot: any;

import { C } from './tokens-data';
import { makeEllipse, setStroke } from './draw';
import { Mode, D, openFrame, txt, rect, ic, avatar, btn, cardBox, bubble } from './screens';
import { radarSvg } from './domain';

const A128: Mode = { w: 1280, h: 800, kind: 'desktop' };

// ---------------------------------------------------------------------------
// Хелперы
// ---------------------------------------------------------------------------

function ralign(t: any, xRight: number): void {
  try { if (t && typeof t.width === 'number' && t.width > 0) t.x = xRight - t.width; } catch (_) { /* as-is */ }
}

const TINT: Record<string, [string, string]> = {
  g: ['DCFCE7', '#166534'], b: ['E0F2FE', '#0C4A6E'], y: ['FEF3C7', '#92400E'],
  r: ['FEE2E2', '#991B1B'], n: ['F1F5F9', '#475569'], v: ['EDE9FE', '#5B21B6'],
};

function chipStat(f: any, x: number, y: number, label: string, kind: string): number {
  const w = Math.round(label.length * 6.4) + 22;
  const c = rect(f, x, y, w, 24, '#' + TINT[kind][0], 12);
  c.name = 'status-chip / ' + label;
  txt(f, x + 11, y + 5, label, 11, 500, TINT[kind][1]);
  return w;
}

function kpi(f: any, x: number, y: number, w: number, label: string, value: string, delta: string, kind: string): void {
  cardBox(f, x, y, w, 92, 'kpi / ' + label);
  txt(f, x + 16, y + 14, label, 12, 500, C.INK3);
  txt(f, x + 16, y + 34, value, 22, 700, C.INK);
  chipStat(f, x + 16, y + 60, delta, kind);
}

function sideShell(f: any, m: Mode, nav: [string, string][], active: number, title: string,
                   role: string, userName: string, initials: string):
  { cx: number; cy: number; cw: number; ch: number } {
  const sbw = 240;
  const sb = rect(f, 0, 0, sbw, m.h, C.BG2, 0);
  sb.name = 'sidebar';
  rect(f, 24, 20, 28, 28, C.ACCENT, 8);
  txt(f, 62, 22, 'Platform', 16, 700, C.INK);
  txt(f, 62, 43, role, 10, 600, C.ACCENT);
  nav.forEach((it, i) => {
    const ny = 100 + i * 44;
    const on = i === active;
    if (on) {
      const bg = rect(f, 12, ny - 9, sbw - 24, 40, C.WHITE, 10);
      setStroke(bg, C.BD, 1, 'inner');
      bg.name = 'nav-active';
    }
    ic(f, it[0], 28, ny, 18, on ? C.ACCENT : C.INK2);
    txt(f, 58, ny + 1, it[1], 13, on ? 600 : 500, on ? C.INK : C.INK2);
  });
  const uy = m.h - 76;
  avatar(f, 24, uy, 36, initials);
  txt(f, 72, uy + 2, userName, 13, 600, C.INK);
  txt(f, 72, uy + 22, role, 11, 400, C.INK3);
  // топбар
  txt(f, 272, 22, title, 16, 700, C.INK);
  avatar(f, m.w - 60, 16, 32, 'AD');
  return { cx: 272, cy: 72, cw: m.w - 272 - 32, ch: m.h - 72 - 24 };
}

function adminShell(f: any, m: Mode, active: number, title: string):
  { cx: number; cy: number; cw: number; ch: number } {
  return sideShell(f, m, [
    ['home', 'Обзор'], ['users', 'Пользователи'], ['badge-check', 'Верификация'],
    ['book-open', 'Сценарии'], ['file-text', 'Аудит'], ['settings', 'Настройки'],
  ], active, title, 'администратор', 'Ирина Д.', 'ИД');
}

function supShell(f: any, m: Mode, active: number, title: string):
  { cx: number; cy: number; cw: number; ch: number } {
  return sideShell(f, m, [
    ['chart-column', 'Обзор'], ['users', 'Супервизируемые'], ['message-circle', 'Разборы'],
    ['graduation-cap', 'Студенты'], ['file-text', 'Отчёты'],
  ], active, title, 'супервизор', 'Мария С.', 'МС');
}

function auditRow(f: any, x: number, y: number, w: number, time: string, actor: string,
                  action: string, target: string): void {
  txt(f, x, y + 3, time, 11, 500, C.INK3);
  txt(f, x + 70, y, actor, 12, 600, C.INK);
  txt(f, x + 70, y + 18, action, 12, 400, C.INK2);
  ralign(txt(f, 0, y + 3, target, 11, 400, C.INK3), x + w);
  rect(f, x, y + 40, w, 1, C.BD, 0);
}

function lineChartSvg(w: number, h: number, points: number[], color: string): string {
  const min = Math.min(...points) - 8;
  const max = Math.max(...points) + 8;
  const px = (i: number): number => Math.round(14 + i * (w - 28) / (points.length - 1));
  const py = (v: number): number => Math.round(h - 12 - (v - min) * (h - 24) / (max - min));
  const poly = points.map((v, i) => px(i) + ',' + py(v)).join(' ');
  const dots = points.map((v, i) => '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3.5" fill="' + color + '"/>').join('');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="10" y1="' + (h - 12) + '" x2="' + (w - 10) + '" y2="' + (h - 12) + '" stroke="#E2E8F0"/>' +
    '<polyline points="' + poly + '" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/>' + dots + '</svg>';
}

function supComment(f: any, x: number, y: number, w: number, tc: string, author: string,
                    l1: string, l2: string): number {
  const h = 108;
  const c = rect(f, x, y, w, h, C.BG2, 12);
  setStroke(c, C.BD, 1, 'inner');
  c.name = 'SupervisionComment / ' + tc;
  avatar(f, x + 14, y + 14, 32, 'МС');
  txt(f, x + 58, y + 14, author, 13, 600, C.INK);
  const tcw = Math.round(tc.length * 6.2) + 20;
  const tchip = rect(f, x + w - tcw - 14, y + 14, tcw, 22, '#EDE9FE', 11);
  tchip.name = 'timecode-chip';
  txt(f, x + w - tcw - 14 + 10, y + 18, tc, 11, 600, '#5B21B6');
  txt(f, x + 58, y + 40, l1, 12, 400, C.INK2);
  txt(f, x + 58, y + 58, l2, 12, 400, C.INK2);
  txt(f, x + 58, y + 80, 'Ответить · Решить', 11, 500, C.ACCENT);
  return h + 12;
}

// ---------------------------------------------------------------------------
// E-60 Обзор платформы
// ---------------------------------------------------------------------------

function e60(f: any, m: Mode): void {
  const box = adminShell(f, m, 0, 'Обзор платформы');
  let y = box.cy;
  const W = box.cw;
  const kw = Math.round((W - 72) / 4);
  kpi(f, box.cx, y, kw, 'Пользователи', '12 480', '+8 %', 'g');
  kpi(f, box.cx + (kw + 24), y, kw, 'Психологи', '1 240', '+24 за месяц', 'g');
  kpi(f, box.cx + 2 * (kw + 24), y, kw, 'Сессии за неделю', '3 120', '+12 %', 'g');
  kpi(f, box.cx + 3 * (kw + 24), y, kw, 'Жалобы', '2', '−3', 'y');
  y += 116;
  const chH = 264;
  const mainW = Math.round(W * 0.62);
  cardBox(f, box.cx, y, mainW, chH, 'card/chart');
  txt(f, box.cx + 20, y + 16, 'Активность, 12 недель', 14, 600, C.INK);
  chipStat(f, box.cx + mainW - 76, y + 14, 'неделя', 'n');
  try {
    const svg = penpot.createShapeFromSvg(lineChartSvg(mainW - 40, 170,
      [820, 910, 880, 1040, 1120, 1090, 1260, 1380, 1340, 1520, 1660, 1580], C.ACCENT));
    if (svg) { f.appendChild(svg); svg.x = box.cx + 20; svg.y = y + 52; svg.name = 'line-chart'; }
  } catch (_) { /* опционально */ }
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y, rw, chH, 'card/system');
  txt(f, rx + 20, y + 16, 'Состояние системы', 14, 600, C.INK);
  const sys: [string, string][] = [['API', '99,98 %'], ['БД', 'норма'], ['Очередь писем', 'норма'], ['Telegram-бот', 'норма']];
  sys.forEach((s, i) => {
    const sy = y + 48 + i * 32;
    makeEllipse(f, rx + 20, sy + 4, 8, 8, C.SUCCESS);
    txt(f, rx + 38, sy, s[0], 13, 500, C.INK);
    ralign(txt(f, 0, sy, s[1], 12, 400, C.INK3), rx + rw - 20);
  });
  txt(f, rx + 20, y + 186, 'Бэкап: сегодня 03:00 · OK', 11, 400, C.INK3);
  y += chH + 20;
  cardBox(f, box.cx, y, W, 296, 'card/recent-audit');
  txt(f, box.cx + 20, y + 16, 'Последние события', 14, 600, C.INK);
  const evs: [string, string, string, string][] = [
    ['12:04', 'Ирина Д. (админ)', 'Одобрила верификацию психолога', 'Ольга В.'],
    ['11:37', 'система', 'Доступ истёк автоматически', 'Клиент В.'],
    ['10:52', 'Мария С. (супервизор)', 'Оставила комментарий к разбору', 'Сессия #812'],
    ['09:15', 'Анна К. (психолог)', 'Выдала игру клиенту', 'A7X9-Q2'],
  ];
  evs.forEach((e, i) => auditRow(f, box.cx + 20, y + 48 + i * 56, W - 40, e[0], e[1], e[2], e[3]));
}

// ---------------------------------------------------------------------------
// E-61 Пользователи · список
// ---------------------------------------------------------------------------

function e61(f: any, m: Mode): void {
  const box = adminShell(f, m, 1, 'Пользователи');
  let y = box.cy;
  const W = box.cw;
  const sf = rect(f, box.cx, y - 6, 320, 40, C.WHITE, 8);
  setStroke(sf, C.BD, 1, 'inner');
  sf.name = 'Input / search';
  ic(f, 'search', box.cx + 12, y + 4, 16, C.INK3);
  txt(f, box.cx + 36, y + 2, 'Имя или email…', 13, 400, C.INK3);
  const roles: [string, boolean][] = [['Все', true], ['Психологи', false], ['Студенты', false], ['Клиенты', false], ['Админы', false]];
  let cx = box.cx + 344;
  roles.forEach((r) => {
    const cwd = Math.round(r[0].length * 6.8) + 26;
    const chipEl = rect(f, cx, y - 1, cwd, 30, r[1] ? C.ACCENT : C.WHITE, 15);
    if (!r[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'filter-chip';
    txt(f, cx + 12, y + 6, r[0], 12, r[1] ? 600 : 500, r[1] ? '#FFFFFF' : C.INK2);
    cx += cwd + 8;
  });
  btn(f, box.cx + W - 130, y - 6, 130, 'Пригласить', 'primary', { icon: 'plus', h: 40 });
  y += 58;
  const rows: [string, string, string, string, string, string][] = [
    ['Анна К.', 'психолог', 'badge', 'anna@psy.ru', '312 сессий', 'активна'],
    ['Мария С.', 'супервизор', 'badge', 'maria@psy.ru', '148 разборов', 'активна'],
    ['Ольга В.', 'психолог', 'wait', 'olga@psy.ru', 'на проверке', 'активна'],
    ['Пётр С.', 'студент', 'none', 'petya@uni.ru', '24 сессии', 'активна'],
    ['Клиент А', 'клиент', 'none', '—', '5 игр', 'активна'],
    ['Денис М.', 'психолог', 'badge', 'denis@psy.ru', '201 сессия', 'активна'],
    ['Клиент Г', 'клиент', 'none', '—', 'нет доступов', 'блок'],
    ['Нина Т.', 'студент', 'none', 'nina@uni.ru', '12 сессий', 'активна'],
  ];
  const rowH = 54;
  const tableH = 52 + rows.length * rowH + 8;
  cardBox(f, box.cx, y, W, tableH, 'card/users-table');
  const hy = y + 16;
  txt(f, box.cx + 20, hy, 'ПОЛЬЗОВАТЕЛЬ', 11, 500, C.INK3);
  txt(f, box.cx + 220, hy, 'РОЛЬ', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.5), hy, 'АКТИВНОСТЬ', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.72), hy, 'СТАТУС', 11, 500, C.INK3);
  ralign(txt(f, 0, hy, 'ДЕЙСТВИЯ', 11, 500, C.INK3), box.cx + W - 20);
  rows.forEach((r, i) => {
    const ry = y + 46 + i * rowH;
    avatar(f, box.cx + 20, ry + 4, 32, r[0].slice(0, 2).toUpperCase());
    txt(f, box.cx + 62, ry + 4, r[0], 13, 600, C.INK);
    txt(f, box.cx + 62, ry + 22, r[3], 11, 400, C.INK3);
    // роль
    if (r[2] === 'badge') {
      ic(f, 'badge-check', box.cx + 220, ry + 2, 16, C.ACCENT);
      txt(f, box.cx + 242, ry + 4, r[1], 12, 500, C.INK);
    } else if (r[2] === 'wait') {
      ic(f, 'clock', box.cx + 220, ry + 2, 16, C.WARNING);
      txt(f, box.cx + 242, ry + 4, r[1], 12, 500, C.INK);
    } else {
      txt(f, box.cx + 220, ry + 4, r[1], 12, 500, C.INK2);
    }
    txt(f, box.cx + Math.round(W * 0.5), ry + 8, r[4], 12, 400, C.INK2);
    if (r[5] === 'активна') chipStat(f, box.cx + Math.round(W * 0.72), ry + 4, 'активна', 'g');
    else chipStat(f, box.cx + Math.round(W * 0.72), ry + 4, 'заблок.', 'r');
    ic(f, 'settings', box.cx + W - 44, ry + 6, 18, C.INK3);
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 6, W - 40, 1, C.BD, 0);
  });
}

// ---------------------------------------------------------------------------
// E-62 Пользователь · карточка
// ---------------------------------------------------------------------------

function e62(f: any, m: Mode): void {
  const box = adminShell(f, m, 1, 'Пользователи · Ольга В.');
  let y = box.cy;
  const W = box.cw;
  const mainW = Math.round(W * 0.58);
  cardBox(f, box.cx, y, mainW, 288, 'card/profile');
  avatar(f, box.cx + 24, y + 24, 64, 'ОВ');
  txt(f, box.cx + 104, y + 26, 'Ольга В.', 20, 700, C.INK);
  ic(f, 'clock', box.cx + 104, y + 56, 16, C.WARNING);
  txt(f, box.cx + 126, y + 57, 'психолог · верификация на проверке', 12, 500, C.INK2);
  const facts: [string, string][] = [
    ['Email', 'olga@psy.ru'], ['Telegram', '@olga_psy'], ['Регистрация', '02.09.2026'],
    ['Последний вход', 'сегодня, 09:41'], ['2FA', 'включена'], ['Сессий', '0 (новая)'],
  ];
  facts.forEach((fc, i) => {
    const fx = box.cx + 24 + (i % 2) * Math.round((mainW - 48) / 2);
    const fy = y + 108 + Math.floor(i / 2) * 56;
    txt(f, fx, fy, fc[0].toUpperCase(), 10, 500, C.INK3);
    txt(f, fx, fy + 18, fc[1], 13, 600, C.INK);
  });
  y += 312;
  cardBox(f, box.cx, y, mainW, 268, 'card/verification-docs');
  txt(f, box.cx + 20, y + 16, 'Документы верификации', 14, 600, C.INK);
  const docs: [string, string][] = [['Диплом.pdf', '2,4 МБ'], ['Сертификат КПТ.pdf', '1,1 МБ'], ['Скан паспорта.pdf', '860 КБ']];
  docs.forEach((d, i) => {
    const dy = y + 48 + i * 52;
    const dr = rect(f, box.cx + 20, dy, mainW - 40, 44, C.BG2, 10);
    dr.name = 'doc-row';
    ic(f, 'file-text', box.cx + 34, dy + 13, 18, C.ACCENT);
    txt(f, box.cx + 62, dy + 6, d[0], 13, 500, C.INK);
    txt(f, box.cx + 62, dy + 24, d[1], 10, 400, C.INK3);
    ralign(txt(f, 0, dy + 13, 'Открыть →', 12, 500, C.ACCENT), box.cx + mainW - 36);
  });
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y - 312, rw, 188, 'card/activity');
  txt(f, rx + 20, y - 296, 'Активность', 14, 600, C.INK);
  auditRow(f, rx + 20, y - 264, rw - 40, '09:41', 'Ольга В.', 'Вход в систему', '87.229.…');
  auditRow(f, rx + 20, y - 208, rw - 40, 'вчера', 'Ольга В.', 'Заявка на верификацию', '3 файла');
  auditRow(f, rx + 20, y - 152, rw - 40, '02.09', 'система', 'Регистрация по приглашению', '—');
  cardBox(f, rx, y, rw, 268, 'card/danger');
  txt(f, rx + 20, y + 16, 'Действия администратора', 14, 600, C.INK);
  txt(f, rx + 20, y + 40, 'Верификация решается на экране E-64.', 11, 400, C.INK3);
  btn(f, rx + 20, y + 64, rw - 40, 'Написать пользователю', 'secondary', { h: 40 });
  btn(f, rx + 20, y + 116, rw - 40, 'Заблокировать', 'ghost', { h: 40 });
  const db = rect(f, rx + 20, y + 164, rw - 40, 40, C.WHITE, 20);
  setStroke(db, '#FECACA', 1, 'inner');
  db.name = 'Button / danger';
  txt(f, rx + 20, y + 175, 'Удалить аккаунт', 14, 600, C.ERROR);
  try { if (typeof db.characters !== 'string') { const t = txt(f, 0, y + 175, '', 1, 400, C.INK); ralign(t, rx + 20 + (rw - 40) / 2); } } catch (_) { /* центр */ }
}

// ---------------------------------------------------------------------------
// E-63 Верификация · очередь
// ---------------------------------------------------------------------------

function e63(f: any, m: Mode): void {
  const box = adminShell(f, m, 2, 'Верификация психологов');
  let y = box.cy;
  const W = box.cw;
  const bn = rect(f, box.cx, y, W, 48, '#EFF6FF', 10);
  bn.name = 'info-banner';
  ic(f, 'info', box.cx + 14, y + 15, 18, C.ACCENT);
  txt(f, box.cx + 42, y + 15, '5 заявок в очереди · SLA ответа — 48 часов · просроченных нет', 13, 500, '#1D4ED8');
  y += 68;
  const rows: [string, string, string, string][] = [
    ['Ольга В.', 'сегодня, 10:12', '3 документа', 'новая'],
    ['Игорь Л.', 'сегодня, 08:47', '3 документа', 'на проверке'],
    ['Светлана Р.', 'вчера, 19:30', '2 документа', 'на проверке'],
    ['Максим Д.', 'вчера, 14:05', '3 документа', 'на проверке'],
    ['Елена П.', '2 дня назад', '1 документ', 'дособрать'],
  ];
  const rowH = 72;
  const tableH = 56 + rows.length * rowH + 8;
  cardBox(f, box.cx, y, W, tableH, 'card/verification-queue');
  const hy = y + 18;
  txt(f, box.cx + 20, hy, 'ЗАЯВИТЕЛЬ', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.32), hy, 'ПОДАНА', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.52), hy, 'ДОКУМЕНТЫ', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.7), hy, 'СТАТУС', 11, 500, C.INK3);
  ralign(txt(f, 0, hy, 'ДЕЙСТВИЯ', 11, 500, C.INK3), box.cx + W - 20);
  rows.forEach((r, i) => {
    const ry = y + 50 + i * rowH;
    avatar(f, box.cx + 20, ry + 6, 36, r[0].slice(0, 2).toUpperCase());
    txt(f, box.cx + 68, ry + 8, r[0], 14, 600, C.INK);
    txt(f, box.cx + 68, ry + 28, 'психолог · 1 заявка', 11, 400, C.INK3);
    txt(f, box.cx + Math.round(W * 0.32), ry + 16, r[1], 13, 400, C.INK2);
    txt(f, box.cx + Math.round(W * 0.52), ry + 16, r[2], 13, 400, C.INK2);
    chipStat(f, box.cx + Math.round(W * 0.7), ry + 12,
      r[3] === 'новая' ? 'новая' : r[3] === 'дособрать' ? 'дособрать' : 'на проверке',
      r[3] === 'новая' ? 'b' : r[3] === 'дособрать' ? 'y' : 'n');
    btn(f, box.cx + W - 160, ry + 12, 140, 'Рассмотреть', 'secondary', { h: 36, fs: 13 });
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 8, W - 40, 1, C.BD, 0);
  });
}

// ---------------------------------------------------------------------------
// E-64 Верификация · решение
// ---------------------------------------------------------------------------

function e64(f: any, m: Mode): void {
  const box = adminShell(f, m, 2, 'Верификация · Ольга В.');
  let y = box.cy;
  const W = box.cw;
  const mainW = Math.round(W * 0.6);
  cardBox(f, box.cx, y, mainW, 300, 'card/applicant');
  avatar(f, box.cx + 24, y + 24, 56, 'ОВ');
  txt(f, box.cx + 96, y + 26, 'Ольга В.', 18, 700, C.INK);
  txt(f, box.cx + 96, y + 52, 'olga@psy.ru · @olga_psy', 12, 400, C.INK3);
  chipStat(f, box.cx + 96, y + 72, 'заявка подана сегодня', 'b');
  txt(f, box.cx + 24, y + 108, 'ОБРАЗОВАНИЕ', 10, 500, C.INK3);
  txt(f, box.cx + 24, y + 126, 'МГУ, клиническая психология (2019)', 13, 600, C.INK);
  txt(f, box.cx + 24, y + 150, 'КПТ-сертификация, 480 часов (2023)', 13, 400, C.INK2);
  txt(f, box.cx + 24, y + 186, 'ОПЫТ', 10, 500, C.INK3);
  txt(f, box.cx + 24, y + 204, 'Частная практика, 3 года · очно и онлайн', 13, 400, C.INK2);
  const docs: [string, string][] = [['Диплом.pdf', '2,4 МБ'], ['Сертификат КПТ.pdf', '1,1 МБ'], ['Скан паспорта.pdf', '860 КБ']];
  docs.forEach((d, i) => {
    const dy = y + 48 + i * 52;
    const dr = rect(f, box.cx + 20, dy, mainW - 40, 44, C.BG2, 10);
    dr.name = 'doc-row';
    ic(f, 'file-text', box.cx + 34, dy + 13, 18, C.ACCENT);
    txt(f, box.cx + 62, dy + 6, d[0], 13, 500, C.INK);
    txt(f, box.cx + 62, dy + 24, d[1], 10, 400, C.INK3);
    ralign(txt(f, 0, dy + 13, 'Открыть →', 12, 500, C.ACCENT), box.cx + mainW - 36);
  });
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y, rw, 264, 'card/checklist');
  txt(f, rx + 20, y + 16, 'Чек-лист проверки', 14, 600, C.INK);
  const checks: [string, boolean][] = [
    ['Документы читаемы и полны', true], ['Данные совпадают с профилем', true],
    ['Образование подтверждено', false], ['Нет дублей аккаунта', true],
  ];
  checks.forEach((ck, i) => {
    const cy2 = y + 48 + i * 40;
    const cb = rect(f, rx + 20, cy2, 20, 20, ck[1] ? C.ACCENT : C.WHITE, 6);
    cb.name = 'checkbox / ' + (ck[1] ? 'checked' : 'unchecked');
    setStroke(cb, ck[1] ? C.ACCENT : C.BD, 1, 'inner');
    if (ck[1]) ic(f, 'check', rx + 24, cy2 + 3, 13, '#FFFFFF');
    txt(f, rx + 52, cy2 + 1, ck[0], 13, 400, C.INK2);
  });
  const cm = rect(f, rx + 20, y + 212, rw - 40, 1, C.BD, 0);
  void cm;
  cardBox(f, rx, y + 288, rw, 208, 'card/decision');
  txt(f, rx + 20, y + 304, 'Комментарий к решению', 14, 600, C.INK);
  const ta = rect(f, rx + 20, y + 328, rw - 40, 64, C.WHITE, 8);
  setStroke(ta, C.BD, 1, 'inner');
  ta.name = 'Input / textarea';
  txt(f, rx + 32, y + 340, 'Диплом и сертификат в порядке…', 12, 400, C.INK3);
  btn(f, rx + 20, y + 408, Math.round((rw - 52) / 2), 'Отклонить', 'ghost', { h: 44 });
  btn(f, rx + 32 + Math.round((rw - 52) / 2), y + 408, Math.round((rw - 52) / 2), 'Одобрить', 'primary', { icon: 'badge-check', h: 44 });
}

// ---------------------------------------------------------------------------
// E-65 Модерация сценариев
// ---------------------------------------------------------------------------

function e65(f: any, m: Mode): void {
  const box = adminShell(f, m, 3, 'Модерация сценариев');
  let y = box.cy;
  const W = box.cw;
  const tabs: [string, boolean][] = [['Все', false], ['На проверке', true], ['С жалобами', false], ['Опубликованные', false]];
  let tx = box.cx;
  tabs.forEach((t) => {
    const twd = Math.round(t[0].length * 6.8) + 28;
    const chipEl = rect(f, tx, y, twd, 32, t[1] ? C.ACCENT : C.WHITE, 16);
    if (!t[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'tab-pill';
    txt(f, tx + 14, y + 8, t[0], 13, t[1] ? 600 : 500, t[1] ? '#FFFFFF' : C.INK2);
    tx += twd + 10;
  });
  y += 56;
  const rows: [string, string, string, string, string][] = [
    ['Тревога перед экзаменом', 'Анна К.', 'жалоба', '1', 'проверить'],
    ['Конфликт с руководителем', 'Денис М.', 'на проверке', '—', 'открыть'],
    ['Прощание с партнёром', 'Ольга В.', 'на проверке', '—', 'открыть'],
    ['Синдром самозванца', 'Анна К.', 'опубликован', '—', 'открыть'],
    ['Выгорание мамы', 'Мария С.', 'опубликован', '—', 'открыть'],
    ['Панические атаки', 'Денис М.', 'скрыт', '1', 'восстановить'],
  ];
  const rowH = 60;
  const tableH = 56 + rows.length * rowH + 8;
  cardBox(f, box.cx, y, W, tableH, 'card/moderation-table');
  const hy = y + 18;
  txt(f, box.cx + 20, hy, 'СЦЕНАРИЙ', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.44), hy, 'АВТОР', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.6), hy, 'СТАТУС', 11, 500, C.INK3);
  txt(f, box.cx + Math.round(W * 0.76), hy, 'ЖАЛОБЫ', 11, 500, C.INK3);
  ralign(txt(f, 0, hy, 'ДЕЙСТВИЯ', 11, 500, C.INK3), box.cx + W - 20);
  rows.forEach((r, i) => {
    const ry = y + 52 + i * rowH;
    txt(f, box.cx + 20, ry + 8, r[0], 14, 600, C.INK);
    txt(f, box.cx + 20, ry + 28, 'изменён 2 дня назад', 10, 400, C.INK3);
    txt(f, box.cx + Math.round(W * 0.44), ry + 16, r[1], 13, 400, C.INK2);
    chipStat(f, box.cx + Math.round(W * 0.6), ry + 10, r[2],
      r[2] === 'жалоба' ? 'r' : r[2] === 'на проверке' ? 'y' : r[2] === 'скрыт' ? 'n' : 'g');
    txt(f, box.cx + Math.round(W * 0.76), ry + 16, r[3], 13, 500, C.INK);
    ralign(txt(f, 0, ry + 14, r[4] + ' →', 13, 500, C.ACCENT), box.cx + W - 20);
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 8, W - 40, 1, C.BD, 0);
  });
}

// ---------------------------------------------------------------------------
// E-66 Аудит-лог
// ---------------------------------------------------------------------------

function e66(f: any, m: Mode): void {
  const box = adminShell(f, m, 4, 'Аудит-лог');
  let y = box.cy;
  const W = box.cw;
  const kinds: [string, boolean][] = [['Все события', true], ['Входы', false], ['Доступы', false], ['Верификация', false], ['Данные', false]];
  let kx = box.cx;
  kinds.forEach((k) => {
    const kwd = Math.round(k[0].length * 6.8) + 26;
    const chipEl = rect(f, kx, y, kwd, 30, k[1] ? C.ACCENT : C.WHITE, 15);
    if (!k[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'filter-chip';
    txt(f, kx + 12, y + 6, k[0], 12, k[1] ? 600 : 500, k[1] ? '#FFFFFF' : C.INK2);
    kx += kwd + 8;
  });
  const per = rect(f, box.cx + W - 180, y - 2, 180, 34, C.WHITE, 8);
  setStroke(per, C.BD, 1, 'inner');
  per.name = 'Input / period';
  ic(f, 'calendar', box.cx + W - 168, y + 7, 16, C.INK3);
  txt(f, box.cx + W - 144, y + 6, 'сегодня · 00:00–23:59', 12, 400, C.INK2);
  y += 54;
  const evs: [string, string, string, string][] = [
    ['12:04', 'Ирина Д. (админ)', 'Одобрила верификацию психолога', 'Ольга В.'],
    ['11:58', 'система', 'Ротация ключей шифрования', '—'],
    ['11:37', 'система', 'Доступ истёк автоматически', 'Клиент В.'],
    ['11:02', 'Анна К. (психолог)', 'Создала ClientAccess', 'Дневник эмоций'],
    ['10:52', 'Мария С. (супервизор)', 'Комментарий к разбору', 'Сессия #812'],
    ['10:15', 'Пётр С. (студент)', 'Экспорт разбора сессии', 'Сессия #790'],
    ['09:41', 'Ольга В. (психолог)', 'Вход в систему · 2FA', '87.229.…'],
    ['09:15', 'Анна К. (психолог)', 'Выдала игру клиенту', 'A7X9-Q2'],
    ['08:47', 'Игорь Л. (психолог)', 'Заявка на верификацию', '3 файла'],
    ['03:00', 'система', 'Ночной бэкап завершён', 'OK · 12 ГБ'],
  ];
  const tableH = 48 + evs.length * 56 + 8;
  cardBox(f, box.cx, y, W, tableH, 'card/audit-log');
  evs.forEach((e, i) => auditRow(f, box.cx + 20, y + 20 + i * 56, W - 40, e[0], e[1], e[2], e[3]));
  const t = txt(f, box.cx, y + tableH + 14, 'Журнал хранится 3 года (152-ФЗ); действия администраторов — без удаления.', 12, 400, C.INK3);
  void t;
}

// ---------------------------------------------------------------------------
// E-67 Настройки платформы
// ---------------------------------------------------------------------------

function e67(f: any, m: Mode): void {
  const box = adminShell(f, m, 5, 'Настройки платформы');
  let y = box.cy;
  const W = box.cw;
  const colW = Math.round((W - 48) / 3);
  // лимиты
  cardBox(f, box.cx, y, colW, 356, 'card/limits');
  txt(f, box.cx + 20, y + 16, 'Лимиты', 14, 600, C.INK);
  const lims: [string, string][] = [['Сессий в день (студент)', '10'], ['Игр на клиента', '∞'], ['Размер файла', '25 МБ'], ['Дней хранения черновиков', '30']];
  lims.forEach((l, i) => {
    const ly = y + 52 + i * 58;
    txt(f, box.cx + 20, ly, l[0], 12, 500, C.INK2);
    const inp = rect(f, box.cx + 20, ly + 20, colW - 40, 34, C.WHITE, 8);
    setStroke(inp, C.BD, 1, 'inner');
    inp.name = 'Input / number';
    txt(f, box.cx + 32, ly + 28, l[1], 13, 600, C.INK);
  });
  // Telegram-бот
  const tX = box.cx + colW + 24;
  cardBox(f, tX, y, colW, 356, 'card/telegram');
  txt(f, tX + 20, y + 16, 'Telegram-бот', 14, 600, C.INK);
  txt(f, tX + 20, y + 44, 'BOT TOKEN', 10, 500, C.INK3);
  const tk = rect(f, tX + 20, y + 60, colW - 40, 34, C.WHITE, 8);
  setStroke(tk, C.BD, 1, 'inner');
  tk.name = 'Input / password';
  txt(f, tX + 32, y + 68, '••••••••••••:AAH…', 13, 400, C.INK2);
  txt(f, tX + 20, y + 110, 'WEBHOOK', 10, 500, C.INK3);
  const wh = rect(f, tX + 20, y + 126, colW - 40, 34, C.WHITE, 8);
  setStroke(wh, C.BD, 1, 'inner');
  wh.name = 'Input / url';
  txt(f, tX + 32, y + 134, 'api.platform.ru/tg/hook', 12, 400, C.INK2);
  const sws: [string, boolean][] = [['Уведомлять о прохождениях', true], ['Напоминания клиентам', true], ['Тестовые сообщения', false]];
  sws.forEach((s, i) => {
    const sy = y + 184 + i * 40;
    txt(f, tX + 20, sy + 4, s[0], 12, 500, C.INK2);
    const p = rect(f, tX + colW - 60, sy, 40, 22, s[1] ? C.ACCENT : '#CBD5E1', 11);
    p.name = 'switch / ' + (s[1] ? 'on' : 'off');
    makeEllipse(f, tX + colW - 60 + (s[1] ? 20 : 2), sy + 2, 18, 18, '#FFFFFF');
  });
  // интеграции
  const iX = box.cx + 2 * (colW + 24);
  cardBox(f, iX, y, colW, 356, 'card/integrations');
  txt(f, iX + 20, y + 16, 'Интеграции', 14, 600, C.INK);
  const ints: [string, string][] = [['SMTP-почта', 'подключено'], ['S3-хранилище', 'подключено'], ['Sentry-мониторинг', 'подключено'], ['Платёжный провайдер', 'скоро']];
  ints.forEach((it, i) => {
    const iy = y + 52 + i * 62;
    const ir = rect(f, iX + 20, iy, colW - 40, 50, C.BG2, 10);
    ir.name = 'integration-row';
    txt(f, iX + 34, iy + 8, it[0], 13, 600, C.INK);
    chipStat(f, iX + 34, iy + 26, it[1], it[1] === 'скоро' ? 'y' : 'g');
  });
  btn(f, box.cx + W - 190, y + 388, 190, 'Сохранить настройки', 'primary', { h: 44 });
}

// ---------------------------------------------------------------------------
// E-68 Супервизия · дашборд
// ---------------------------------------------------------------------------

function e68(f: any, m: Mode): void {
  const box = supShell(f, m, 0, 'Супервизия · обзор');
  let y = box.cy;
  const W = box.cw;
  const kw = Math.round((W - 72) / 4);
  kpi(f, box.cx, y, kw, 'Супервизируемых', '8', '+1', 'g');
  kpi(f, box.cx + (kw + 24), y, kw, 'Разборов за неделю', '14', '+3', 'g');
  kpi(f, box.cx + 2 * (kw + 24), y, kw, 'Средний балл', '7,8', '+0,4', 'g');
  kpi(f, box.cx + 3 * (kw + 24), y, kw, 'Ждут комментария', '3', 'дедлайн 2 дня', 'y');
  y += 116;
  const mainW = Math.round(W * 0.62);
  cardBox(f, box.cx, y, mainW, 320, 'card/recent-reviews');
  txt(f, box.cx + 20, y + 16, 'Последние разборы', 14, 600, C.INK);
  const rows: [string, string, string, string][] = [
    ['Пётр С.', 'Тревога перед экзаменом', 'Слушание', 'ждёт'],
    ['Нина Т.', 'Конфликт с руководителем', 'Границы', 'ждёт'],
    ['Пётр С.', 'Синдром самозванца', 'Эмпатия', 'завершён'],
    ['Алина Ж.', 'Выгорание мамы', 'Рефлексия', 'завершён'],
  ];
  rows.forEach((r, i) => {
    const ry = y + 50 + i * 64;
    avatar(f, box.cx + 20, ry + 4, 36, r[0].slice(0, 2).toUpperCase());
    txt(f, box.cx + 68, ry + 2, r[0] + ' · ' + r[1], 13, 600, C.INK);
    txt(f, box.cx + 68, ry + 22, 'фокус: ' + r[2] + ' · сессия 24 мин', 11, 400, C.INK3);
    chipStat(f, box.cx + mainW - 116, ry + 8, r[3], r[3] === 'ждёт' ? 'y' : 'g');
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + 52, mainW - 40, 1, C.BD, 0);
  });
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y, rw, 320, 'card/supervision-sessions');
  txt(f, rx + 20, y + 16, 'Групповые супервизии', 14, 600, C.INK);
  const evs: [string, string, string][] = [
    ['пт, 18:00', 'Группа · студенты 2 курса', '4 участника'],
    ['пн, 11:00', 'Интервизия психологов', '6 участников'],
  ];
  evs.forEach((e, i) => {
    const ey = y + 50 + i * 84;
    const er = rect(f, rx + 20, ey, rw - 40, 72, C.BG2, 10);
    er.name = 'event-row';
    txt(f, rx + 34, ey + 10, e[0], 13, 600, C.ACCENT);
    txt(f, rx + 34, ey + 30, e[1], 12, 500, C.INK);
    txt(f, rx + 34, ey + 48, e[2], 11, 400, C.INK3);
  });
  txt(f, rx + 20, y + 224, 'Ссылка на встречу приходит за час.', 11, 400, C.INK3);
  btn(f, rx + 20, y + 248, rw - 40, 'Запланировать', 'secondary', { h: 40 });
}

// ---------------------------------------------------------------------------
// E-69 Супервизируемые
// ---------------------------------------------------------------------------

function e69(f: any, m: Mode): void {
  const box = supShell(f, m, 1, 'Супервизируемые');
  let y = box.cy;
  const W = box.cw;
  const sf = rect(f, box.cx, y - 6, 320, 40, C.WHITE, 8);
  setStroke(sf, C.BD, 1, 'inner');
  sf.name = 'Input / search';
  ic(f, 'search', box.cx + 12, y + 4, 16, C.INK3);
  txt(f, box.cx + 36, y + 2, 'Имя студента…', 13, 400, C.INK3);
  chipStat(f, box.cx + 344, y + 4, '8 активных', 'n');
  btn(f, box.cx + W - 170, y - 6, 170, 'Пригласить студента', 'primary', { icon: 'plus', h: 40 });
  y += 58;
  const rows: [string, string, string, number, string][] = [
    ['Пётр С.', 'студент · 2 курс', '24 сессии · ср. 7,2', 72, 'по плану'],
    ['Нина Т.', 'студент · 2 курс', '12 сессий · ср. 6,8', 55, 'по плану'],
    ['Алина Ж.', 'студент · 3 курс', '41 сессия · ср. 8,1', 88, 'отлично'],
    ['Глеб К.', 'психолог · практика', '9 сессий · ср. 7,5', 63, 'по плану'],
    ['Даша Р.', 'студент · 1 курс', '4 сессии · ср. 6,1', 30, 'внимание'],
  ];
  const rowH = 76;
  const tableH = rows.length * rowH + 8;
  cardBox(f, box.cx, y, W, tableH, 'card/supervisees');
  rows.forEach((r, i) => {
    const ry = y + 8 + i * rowH;
    avatar(f, box.cx + 20, ry + 12, 44, r[0].slice(0, 2).toUpperCase());
    txt(f, box.cx + 80, ry + 12, r[0], 15, 600, C.INK);
    txt(f, box.cx + 80, ry + 34, r[1], 12, 400, C.INK3);
    txt(f, box.cx + Math.round(W * 0.34), ry + 22, r[2], 13, 400, C.INK2);
    // прогресс навыка
    txt(f, box.cx + Math.round(W * 0.58), ry + 8, 'Прогресс программы', 10, 500, C.INK3);
    rect(f, box.cx + Math.round(W * 0.58), ry + 26, 180, 8, C.BD, 4);
    rect(f, box.cx + Math.round(W * 0.58), ry + 26, Math.round(180 * r[3] / 100), 8, C.ACCENT, 4).name = 'progress-fill';
    txt(f, box.cx + Math.round(W * 0.58) + 192, ry + 22, r[3] + '%', 12, 600, C.INK);
    chipStat(f, box.cx + Math.round(W * 0.8), ry + 18, r[4], r[4] === 'отлично' ? 'g' : r[4] === 'внимание' ? 'y' : 'n');
    ralign(txt(f, 0, ry + 20, 'Открыть →', 13, 500, C.ACCENT), box.cx + W - 20);
    if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 6, W - 40, 1, C.BD, 0);
  });
}

// ---------------------------------------------------------------------------
// E-70 Разбор сессии
// ---------------------------------------------------------------------------

function e70(f: any, m: Mode): void {
  const box = supShell(f, m, 2, 'Разбор сессии #812');
  let y = box.cy;
  const W = box.cw;
  const mainW = Math.round(W * 0.58);
  cardBox(f, box.cx, y, mainW, 560, 'card/session-transcript');
  txt(f, box.cx + 20, y + 16, 'Пётр С. · «Тревога перед экзаменом»', 15, 600, C.INK);
  txt(f, box.cx + 20, y + 40, 'сегодня, 14:00 · 24 мин · фокус: Слушание', 12, 400, C.INK3);
  chipStat(f, box.cx + mainW - 96, y + 14, '04:12', 'v');
  let cy2 = y + 72;
  cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, 'Клиент: «Я всегда паникую перед', 'экзаменами, руки холодеют».', 'left') + 8;
  cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, 'Психолог: «Давайте остановимся на', 'этом ощущении. Где в теле оно?»', 'right') + 8;
  cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, 'Клиент: «В груди и горле. Становится', 'страшно говорить об этом».', 'left') + 8;
  cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, 'Психолог: «Спасибо, что замечаете.', 'Какую эмоцию вы слышите внутри?»', 'right') + 8;
  txt(f, box.cx + 20, cy2 + 6, 'ЭМОЦИИ КЛИЕНТА ПО ХОДУ СЕССИИ', 10, 500, C.INK3);
  const emos: [string, string][] = [['тревога — высокая', 'r'], ['напряжение — среднее', 'y'], ['доверие — растёт', 'g']];
  let ex = box.cx + 20;
  emos.forEach((em) => { ex += chipStat(f, ex, cy2 + 26, em[0], em[1]) + 8; });
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y, rw, 560, 'card/supervision-comments');
  txt(f, rx + 20, y + 16, 'Комментарии супервизии', 14, 600, C.INK);
  let sy = y + 48;
  sy += supComment(f, rx + 20, sy, rw - 40, '04:12', 'Мария С.', 'Хорошая фокусировка на телесном', 'ощущении — уточняющий вопрос уместен.');
  sy += supComment(f, rx + 20, sy, rw - 40, '11:40', 'Мария С.', 'Тут можно вернуться к эмоции и', 'проверить её название вместе с клиентом.');
  const ta = rect(f, rx + 20, sy + 8, rw - 40, 64, C.WHITE, 8);
  setStroke(ta, C.BD, 1, 'inner');
  ta.name = 'Input / textarea';
  txt(f, rx + 32, sy + 20, 'Новый комментарий…', 12, 400, C.INK3);
  txt(f, rx + 32, sy + 48, 'τ таймкод вставится автоматически', 10, 400, C.INK3);
  btn(f, rx + rw - 164, sy + 84, 144, 'Отправить', 'primary', { icon: 'send', h: 40 });
}

// ---------------------------------------------------------------------------
// E-71 Комментарий супервизии
// ---------------------------------------------------------------------------

function e71(f: any, m: Mode): void {
  const box = supShell(f, m, 2, 'Новый комментарий');
  let y = box.cy;
  const W = box.cw;
  const fw = 720;
  cardBox(f, box.cx + Math.round((W - fw) / 2), y, fw, 520, 'card/comment-form');
  const px = box.cx + Math.round((W - fw) / 2) + 24;
  const pw = fw - 48;
  let cy2 = y + 22;
  txt(f, px, cy2, 'Комментарий супервизии', 17, 700, C.INK);
  txt(f, px, cy2 + 24, 'Сессия #812 · Пётр С. · 04:12–04:58', 12, 400, C.INK3);
  cy2 += 56;
  txt(f, px, cy2, 'ФРАГМЕНТ', 10, 500, C.INK3);
  const frag = rect(f, px, cy2 + 16, pw, 64, C.BG2, 10);
  frag.name = 'quoted-fragment';
  txt(f, px + 14, cy2 + 28, 'Психолог: «Давайте остановимся на этом', 13, 400, C.INK2);
  txt(f, px + 14, cy2 + 50, 'ощущении. Где в теле оно?»', 13, 400, C.INK2);
  ralign(txt(f, 0, cy2 + 32, '04:12', 11, 600, '#5B21B6'), px + pw - 14);
  cy2 += 100;
  txt(f, px, cy2, 'ФОКУС-НАВЫК', 10, 500, C.INK3);
  const sk: [string, boolean][] = [['Слушание', true], ['Эмпатия', false], ['Рефлексия', false], ['Границы', false]];
  let sx = px;
  sk.forEach((s) => {
    const swd = Math.round(s[0].length * 6.8) + 26;
    const chipEl = rect(f, sx, cy2 + 18, swd, 30, s[1] ? C.ACCENT : C.WHITE, 15);
    if (!s[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'skill-chip';
    txt(f, sx + 12, cy2 + 24, s[0], 12, s[1] ? 600 : 500, s[1] ? '#FFFFFF' : C.INK2);
    sx += swd + 8;
  });
  cy2 += 68;
  txt(f, px, cy2, 'ШАБЛОН', 10, 500, C.INK3);
  const tpl: [string, boolean][] = [['Отметить сильную сторону', true], ['Предложить альтернативу', false]];
  sx = px;
  tpl.forEach((t) => {
    const twd = Math.round(t[0].length * 6.4) + 24;
    const chipEl = rect(f, sx, cy2 + 18, twd, 28, t[1] ? '#EDE9FE' : C.WHITE, 14);
    if (!t[1]) setStroke(chipEl, C.BD, 1, 'inner');
    chipEl.name = 'template-chip';
    txt(f, sx + 12, cy2 + 23, t[0], 12, t[1] ? 600 : 500, t[1] ? '#5B21B6' : C.INK2);
    sx += twd + 8;
  });
  cy2 += 66;
  txt(f, px, cy2, 'КОММЕНТАРИЙ', 10, 500, C.INK3);
  const ta = rect(f, px, cy2 + 16, pw, 88, C.WHITE, 8);
  setStroke(ta, C.ACCENT, 2, 'inner');
  ta.name = 'Input / textarea / focus';
  txt(f, px + 14, cy2 + 30, 'Сильная сторона: ты не ушёл от телесного фокуса', 13, 400, C.INK2);
  txt(f, px + 14, cy2 + 52, 'и удержал темп. Рядом — проверка названия эмоции', 13, 400, C.INK2);
  txt(f, px + 14, cy2 + 74, 'вместе с клиентом («это тревога или страх?»).', 13, 400, C.INK2);
  cy2 += 124;
  const cb = rect(f, px, cy2 + 2, 18, 18, C.ACCENT, 5);
  cb.name = 'checkbox-checked';
  ic(f, 'check', px + 3, cy2 + 5, 12, '#FFFFFF');
  txt(f, px + 28, cy2, 'Видит только студент (не клиент)', 12, 400, C.INK2);
  cy2 += 40;
  btn(f, px, cy2, 130, 'Отменить', 'secondary', { h: 44 });
  btn(f, px + 146, cy2, 150, 'Отправить', 'primary', { icon: 'send', h: 44 });
}

// ---------------------------------------------------------------------------
// E-72 Прогресс студента
// ---------------------------------------------------------------------------

function e72(f: any, m: Mode): void {
  const box = supShell(f, m, 3, 'Прогресс студента · Пётр С.');
  let y = box.cy;
  const W = box.cw;
  const mainW = Math.round(W * 0.44);
  cardBox(f, box.cx, y, mainW, 320, 'card/skills-radar');
  txt(f, box.cx + 20, y + 16, 'Навыки (8) · сейчас / начало', 14, 600, C.INK);
  try {
    const svg = penpot.createShapeFromSvg(radarSvg(230));
    if (svg) { f.appendChild(svg); svg.x = box.cx + Math.round((mainW - 230) / 2); svg.y = y + 52; svg.name = 'radar-chart'; }
  } catch (_) { /* опционально */ }
  const rx = box.cx + mainW + 24;
  const rw = W - mainW - 24;
  cardBox(f, rx, y, rw, 320, 'card/dynamics');
  txt(f, rx + 20, y + 16, 'Средний балл по неделям', 14, 600, C.INK);
  const bars: [number, string, boolean][] = [[46, 'н1', false], [54, 'н2', false], [58, 'н3', false], [64, 'н4', true], [71, 'н5', true]];
  bars.forEach((b, i) => {
    const bx = rx + 28 + i * 56;
    rect(f, bx, y + 268 - b[0] * 2, 32, b[0] * 2, b[2] ? C.ACCENT : C.BD, 8).name = 'bar';
    const t = txt(f, 0, y + 276, b[1], 10, b[2] ? 600 : 400, b[2] ? C.ACCENT : C.INK3);
    ralign(t, bx + 32 + 14);
    void t;
    const vt = txt(f, 0, y + 236 - b[0] * 2, String(b[0] / 10).replace('.', ','), 11, 600, C.INK);
    ralign(vt, bx + 32 + 14);
  });
  y += 344;
  cardBox(f, box.cx, y, W, 224, 'card/achievements');
  txt(f, box.cx + 20, y + 16, 'Динамика навыков', 14, 600, C.INK);
  const ach: [string, string, string, string][] = [
    ['Слушание', '86', '91', '+5'], ['Эмпатия', '78', '84', '+6'], ['Границы', '64', '71', '+7'], ['Структура', '80', '83', '+3'],
  ];
  const awd = Math.round((W - 40 - 3 * 16) / 4);
  ach.forEach((a, i) => {
    const ax = box.cx + 20 + i * (awd + 16);
    const ac = rect(f, ax, y + 44, awd, 128, C.BG2, 12);
    ac.name = 'skill-delta';
    txt(f, ax + 14, y + 58, a[0], 13, 600, C.INK);
    txt(f, ax + 14, y + 84, a[1] + ' → ' + a[2], 20, 700, C.INK);
    chipStat(f, ax + 14, y + 122, a[3], 'g');
    txt(f, ax + 14, y + 152, 'за 5 недель', 10, 400, C.INK3);
  });
  ralign(txt(f, 0, y + 186, 'Рекомендация: готов к работе с клиентами под наблюдением →', 13, 500, C.ACCENT), box.cx + W - 20);
}

// ---------------------------------------------------------------------------
// E-73 Отчёт супервизии
// ---------------------------------------------------------------------------

function e73(f: any, m: Mode): void {
  const box = supShell(f, m, 4, 'Отчёт супервизии');
  let y = box.cy;
  const W = box.cw;
  const fw = 860;
  const fx0 = box.cx + Math.round((W - fw) / 2);
  cardBox(f, fx0, y, fw, 520, 'card/report');
  const px = fx0 + 32;
  const pw = fw - 64;
  txt(f, px, y + 24, 'Итоговый отчёт супервизии', 18, 700, C.INK);
  chipStat(f, fx0 + fw - 120, y + 24, 'черновик', 'y');
  txt(f, px, y + 52, 'Пётр С. · студент, 2 курс · период: май–сентябрь 2026 · супервизор Мария С.', 12, 400, C.INK3);
  const secs: [string, string[]][] = [
    ['1. Объём практики', ['12 сессий под наблюдением · 2 групповые супервизии · 4 разбора с таймкодами.']],
    ['2. Сильные стороны', ['Устойчивый контакт, телесный фокус, корректные границы.', 'Слушание 86→91, эмпатия 78→84.']],
    ['3. Зоны роста', ['Проверка названий эмоций с клиентом; работа с молчанием;', 'тайм-менеджмент сессии (финал торопится).']],
    ['4. Рекомендация', ['Допустить к работе с клиентами под наблюдением; полный допуск —', 'после 6 сессий и разбора двух сложных случаев.']],
  ];
  let cy2 = y + 84;
  secs.forEach((s) => {
    txt(f, px, cy2, s[0], 14, 600, C.INK);
    cy2 += 24;
    s[1].forEach((ln) => { txt(f, px, cy2, ln, 13, 400, C.INK2); cy2 += 20; });
    cy2 += 12;
  });
  const sig = rect(f, px, y + 448, pw, 1, C.BD, 0);
  void sig;
  txt(f, px, y + 460, 'Мария С. · супервизор, badge verified · 16.09.2026', 11, 400, C.INK3);
  btn(f, px, y + 484, 170, 'Экспорт PDF', 'secondary', { icon: 'download', h: 40 });
  btn(f, px + 186, y + 484, 200, 'Отправить студенту', 'primary', { icon: 'send', h: 40 });
}

// ---------------------------------------------------------------------------
// Реестр и сборка
// ---------------------------------------------------------------------------

interface Screen5Def { code: string; title: string; draw: (f: any, m: Mode) => void }

const SCREENS5: Screen5Def[] = [
  { code: 'E-60', title: 'Обзор платформы', draw: e60 },
  { code: 'E-61', title: 'Пользователи', draw: e61 },
  { code: 'E-62', title: 'Пользователь · карточка', draw: e62 },
  { code: 'E-63', title: 'Верификация · очередь', draw: e63 },
  { code: 'E-64', title: 'Верификация · решение', draw: e64 },
  { code: 'E-65', title: 'Модерация сценариев', draw: e65 },
  { code: 'E-66', title: 'Аудит-лог', draw: e66 },
  { code: 'E-67', title: 'Настройки платформы', draw: e67 },
  { code: 'E-68', title: 'Супервизия · дашборд', draw: e68 },
  { code: 'E-69', title: 'Супервизируемые', draw: e69 },
  { code: 'E-70', title: 'Разбор сессии', draw: e70 },
  { code: 'E-71', title: 'Комментарий супервизии', draw: e71 },
  { code: 'E-72', title: 'Прогресс студента', draw: e72 },
  { code: 'E-73', title: 'Отчёт супервизии', draw: e73 },
];

export const SCREEN5_FRAME_NAMES: string[] = SCREENS5
  .flatMap((s) => ['1440', '1280'].map((bp) => s.code + ' ' + s.title + ' / ' + bp));

export function buildScreens5(log: string[]): void {
  const SX = 9660 + 390 + 240; // колонка правее TMA-фреймов итерации 7
  let y = 100;
  for (const s of SCREENS5) {
    for (const m of [D, A128]) {
      const bp = m.w === 1440 ? '1440' : '1280';
      const fr = openFrame(s.code + ' ' + s.title + ' / ' + bp, SX, y, m.w, m.h);
      try { s.draw(fr, m); } catch (e) { log.push('× ' + s.code + ' ' + s.title + '/' + bp + ': ' + e); }
      y += m.h + 100;
    }
  }
}
