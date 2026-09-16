// Кликабельные прототипы (Итерация 9 ТЗ, раздел 7.1–7.6): потоки поверх
// собранных фреймов. createFlow + addInteraction('click', navigate-to).
// Идемпотентность: перед созданием удаляем потоки с теми же именами.

declare const penpot: any;

// [имя потока, [[фрейм-источник, фрейм-цель], …]] — имена фреймов из реестров
const FLOWS: [string, [string, string][]][] = [
  ['7.1 Гость → демо → регистрация', [
    ['E-01 Лендинг / 1440', 'E-02 Демо-симуляция / 1440'],
    ['E-02 Демо-симуляция / 1440', 'E-04 Регистрация / 1440'],
  ]],
  ['7.2 Психолог → сессия → разбор', [
    ['E-03 Вход / 1440', 'E-10 Дашборд психолога / 1440'],
    ['E-10 Дашборд психолога / 1440', 'E-22 Сессия / 1440'],
    ['E-22 Сессия / 1440', 'E-25 Разбор / 1440'],
  ]],
  ['7.3 Клиент web: ссылка → игра → результат', [
    ['E-40 Открытие игры / 390', 'E-41 Согласие / 390'],
    ['E-41 Согласие / 390', 'E-42 Прохождение / 390'],
    ['E-42 Прохождение / 390', 'E-43 Завершение / 390'],
  ]],
  ['7.4 Клиент TMA: онбординг → результат', [
    ['E-50 Онбординг / 390', 'E-52 Игры / 390'],
    ['E-52 Игры / 390', 'E-53 Прохождение / 390'],
    ['E-53 Прохождение / 390', 'E-54 Результат / 390'],
  ]],
  ['7.5 Супервизор → разбор → комментарий', [
    ['E-68 Супервизия · дашборд / 1440', 'E-70 Разбор сессии / 1440'],
    ['E-70 Разбор сессии / 1440', 'E-71 Комментарий супервизии / 1440'],
  ]],
  ['7.6 Админ → верификация → решение', [
    ['E-60 Обзор платформы / 1440', 'E-63 Верификация · очередь / 1440'],
    ['E-63 Верификация · очередь / 1440', 'E-64 Верификация · решение / 1440'],
  ]],
];

export const FLOW_NAMES: string[] = FLOWS.map((fl) => fl[0]);
export const FLOW_TOTAL_LINKS: number = FLOWS.reduce((n, fl) => n + fl[1].length, 0);

export function buildFlows(log: string[]): void {
  const page: any = penpot.currentPage;
  // карта фреймов по имени
  const byName = new Map<string, any>();
  try {
    for (const s of page.findShapes()) {
      if (s && typeof s.name === 'string' && /^E-\d\d /.test(s.name)) byName.set(s.name, s);
    }
  } catch (_) { /* нет доступа к findShapes */ }
  // идемпотентность: снести потоки с теми же именами
  try {
    for (const fl of page.flows || []) if (FLOW_NAMES.includes(fl.name)) fl.remove();
  } catch (_) { /* первый запуск */ }
  let ok = 0;
  for (const [name, steps] of FLOWS) {
    try {
      const start = byName.get(steps[0][0]);
      if (!start) { log.push('! поток «' + name + '»: нет стартового фрейма'); continue; }
      page.createFlow(name, start);
      let linked = 0;
      for (const [from, to] of steps) {
        const a = byName.get(from);
        const b = byName.get(to);
        if (!a || !b) continue;
        try { for (const it of a.interactions || []) it.remove(); } catch (_) { /* нет взаимодействий */ }
        a.addInteraction('click', { type: 'navigate-to', destination: b });
        linked++;
      }
      log.push('✓ поток «' + name + '»: ' + linked + ' связей');
      if (linked === steps.length) ok++;
    } catch (e) { log.push('× поток «' + name + '»: ' + e); }
  }
  log.push('потоков готово: ' + ok + ' из ' + FLOWS.length);
}
