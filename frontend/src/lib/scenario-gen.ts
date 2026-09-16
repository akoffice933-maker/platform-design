// Генерация сценариев: строгая валидация (порт правил tools/validate_scenario.py)
// + шаблонный генератор (работает БЕЗ ключа). ИИ-генерация — в lib/ai.ts.
import type { Scenario } from './engine';

const SKILLS8 = ['listening', 'empathy', 'boundaries', 'structuring', 'emotion_work', 'resistance', 'questioning', 'reflection'];

export interface GenParams { topic: string; focus: string[]; difficulty: number; clientRole?: string }

/** Полная проверка графа: схема + целостность + достижимость финала. */
export function validateScenarioJson(raw: unknown): { ok: boolean; errors: string[]; scenario?: Scenario } {
  const e: string[] = [];
  const d = raw as Record<string, unknown>;
  if (!d || typeof d !== 'object') return { ok: false, errors: ['ответ не JSON-объект'] };
  if (d.schemaVersion !== '1.0') e.push('schemaVersion ≠ "1.0"');
  const m = (d.meta ?? {}) as Record<string, unknown>;
  if (typeof m.title !== 'string' || m.title.length < 3 || m.title.length > 48) e.push('meta.title: 3–48 символов');
  if (typeof m.clientRole !== 'string' || m.clientRole.length < 2 || m.clientRole.length > 20) e.push('meta.clientRole: 2–20');
  if (!Number.isInteger(m.difficulty) || (m.difficulty as number) < 1 || (m.difficulty as number) > 5) e.push('meta.difficulty: 1–5');
  if (!Number.isInteger(m.durationMin) || (m.durationMin as number) < 5 || (m.durationMin as number) > 60) e.push('meta.durationMin: 5–60');
  if (!Array.isArray(m.focusSkills) || !m.focusSkills.length || m.focusSkills.length > 3 || !(m.focusSkills as string[]).every((s) => SKILLS8.includes(s))) e.push('meta.focusSkills: 1–3 из восьми skillId');
  const g = (d.graph ?? {}) as Record<string, unknown>;
  const nodes = (g.nodes ?? {}) as Record<string, Record<string, unknown>>;
  const ids = Object.keys(nodes);
  if (ids.length < 3) e.push('узлов < 3');
  if (typeof g.start !== 'string' || !nodes[g.start as string]) e.push('graph.start не существует');
  const ends: string[] = [];
  const bad = (from: string, to: unknown): void => { if (typeof to !== 'string' || !nodes[to]) e.push(from + ': битая ссылка → ' + JSON.stringify(to)); };
  const emo = (where: string, v: unknown): number => {
    const val = (v as { value?: unknown })?.value;
    if (!Number.isInteger(val) || (val as number) < 0 || (val as number) > 10) { e.push(where + ': emotion.value 0–10'); return -1; }
    return val as number;
  };
  for (const [id, n] of Object.entries(nodes)) {
    const t = n.type as string;
    if (!['card', 'text', 'choice', 'scale', 'timer', 'input', 'critical', 'branch', 'end'].includes(t)) { e.push(id + ': неизвестный тип ' + t); continue; }
    if (t === 'card' || t === 'text' || t === 'scale' || t === 'timer' || t === 'input') bad(id, n.next);
    if (t === 'text' || t === 'scale' || t === 'timer' || t === 'input') emo(id, n.emotionAfter);
    if (t === 'text' && (typeof n.clientLine !== 'string' || (n.clientLine as string).length < 4)) e.push(id + ': clientLine 4–90');
    if (t === 'choice' || t === 'critical') {
      const opts = (n.options ?? []) as Record<string, unknown>[];
      if (opts.length < 2) e.push(id + ': вариантов < 2');
      const seen = new Set<string>();
      let positive = false;
      for (const o of opts) {
        if (typeof o.id !== 'string' || !/^[a-z0-9_]+$/.test(o.id)) e.push(id + ': option.id "' + o.id + '"');
        if (seen.has(o.id as string)) e.push(id + ': дубль варианта ' + o.id);
        seen.add(o.id as string);
        bad(id + '.' + o.id, o.next);
        emo(id + '.' + o.id, o.emotionAfter);
        const scores = (o.scores ?? {}) as Record<string, unknown>;
        let sum = 0;
        for (const [k, v] of Object.entries(scores)) {
          if (!SKILLS8.includes(k)) e.push(id + '.' + o.id + ': skillId ' + k);
          if (!Number.isInteger(v) || (v as number) < -3 || (v as number) > 3) e.push(id + '.' + o.id + ': score ' + k + '=' + v);
          sum += (v as number) || 0;
        }
        if (sum > 0) positive = true;
      }
      if (opts.length >= 2 && !positive) e.push(id + ': нет варианта с положительной суммой очков');
    }
    if (t === 'branch') {
      bad(id + ' (else)', n.else);
      if (!Array.isArray(n.branches) || !n.branches.length) e.push(id + ': пустые branches');
      for (const b of (n.branches ?? []) as Record<string, unknown>[]) {
        const when = (b.when ?? {}) as Record<string, unknown>;
        if (!Object.keys(when).length) e.push(id + ': пустое when');
        if (when.emotionAtLeast !== undefined && (!Number.isInteger(when.emotionAtLeast) || (when.emotionAtLeast as number) < 0 || (when.emotionAtLeast as number) > 10)) e.push(id + ': emotionAtLeast 0–10');
        bad(id + ' (then)', b.then);
      }
    }
    if (t === 'end') {
      ends.push(id);
      const out = (n.outcome ?? {}) as Record<string, unknown>;
      if (typeof out.summary !== 'string' || !out.summary) e.push(id + ': outcome.summary');
      if (typeof out.completed !== 'boolean') e.push(id + ': outcome.completed');
    }
  }
  if (!ends.length) e.push('нет узла end');
  // достижимость любого end от start (DFS)
  const seen = new Set<string>();
  const walk = (id: string, depth: number): void => {
    if (seen.has(id) || depth > 40 || !nodes[id]) return;
    seen.add(id);
    const n = nodes[id];
    const t = n.type as string;
    if (t === 'end') return;
    if (t === 'branch') {
      walk(n.else as string, depth + 1);
      for (const b of (n.branches ?? []) as Record<string, unknown>[]) walk(b.then as string, depth + 1);
    } else if (t === 'choice' || t === 'critical') {
      for (const o of (n.options ?? []) as Record<string, unknown>[]) walk(o.next as string, depth + 1);
    } else walk(n.next as string, depth + 1);
  };
  walk(g.start as string, 0);
  if (!ends.some((x) => seen.has(x))) e.push('финал недостижим от start');
  return { ok: !e.length, errors: e.slice(0, 6), scenario: e.length ? undefined : (d as unknown as Scenario) };
}

// ---------------------------------------------------------------------------
// Шаблонный генератор: та же архитектура графа, три темы. Работает без ключа.
// ---------------------------------------------------------------------------

interface ThemeT {
  role: string; title: string; desc: string;
  briefBody: string;
  s1: string; s1emo: [number, string];
  c1line: string; c1opts: [string, string, string];
  c2line: string; c2opts: [string, string, string];
  t1: string;
  critLine: string;
  q1line: string; q1opts: [string, string, string];
  e1summary: string;
}

const THEMES: ThemeT[] = [
  {
    role: 'джуниор-разработчик',
    title: 'Стресс перед собеседованием',
    desc: 'Первое техническое интервью в крупную компанию: паника, провалы в памяти, страх «провалиться».',
    briefBody: 'Кирилл, 23 года. Завтра финальное собеседование. Два отказа подряд в прошлом месяце. Просил «научиться не тормозить на вопросах».',
    s1: 'Я сижу над задачами, и всё вылетает из головы. Руки потеют, будто я уже провалился…',
    s1emo: [7, 'тревога — высокая'],
    c1line: 'Все говорят «просто расслабься». Легко сказать.',
    c1opts: ['Тело уже напряглось — где сильнее всего feels?', 'Это частая история, вы не один такой.', 'Составим план на собеседование?'],
    c2line: '…и стоит представить скриншот кода на экране — сразу ступор.',
    c2opts: ['Где сейчас напряжение — в груди, в плечах?', 'Тело мобилизуется, оно хочет помочь вам.', 'Не будем о интервью. О чём угодно другом.'],
    t1: 'Пауза. Заметьте напряжение и медленно выдохните.',
    critLine: 'Дальше не могу… как будто я снова на том отказе. Ничего не чувствую, шум в голове.',
    q1line: 'Наверное, я всегда так реагирую на «могу вас заверить».',
    q1opts: ['«Заверить» — что самое страшное услышать?', 'Вы боитесь именно отказа?', 'Похоже, интервью для вас — мера ценности.'],
    e1summary: 'Отработан телесный фокус; клиент сам назвал страх отказа. Тревога 7→4.',
  },
  {
    role: 'врач-докладчик',
    title: 'Паника перед докладом',
    desc: 'Выступление на конференции перед 200 коллегами: голос срывается, страх «опозориться».',
    briefBody: 'Елена, 34 года, врач. Через день доклад. В прошлом замолчала на середине слайда. Пришла с фразой «хочу досказать до конца».',
    s1: 'Репетирую — и слышу свой голос как чужой. Сразу представляю зал, который смотрит…',
    s1emo: [8, 'тревога — высокая'],
    c1line: 'Коллеги говорят: «вы же профессионал, что вы как студентка».',
    c1opts: ['Обидно слышать это от своих. Как вы на это отвечаете внутри?', 'Так бывает многим профессионалам.', 'Давайте сразу отрепетируем сложный слайд.'],
    c2line: '…и руки холодеют, стоит подумать про первые тридцать секунд.',
    c2opts: ['Что вы чувствуете в теле, когда представляете начало?', 'Тело готовит вас к важному — оно на вашей стороне.', 'Не думайте о выступлении, поговорим о погоде.'],
    t1: 'Пауза. Почувствуйте опору под ногами, медленный выдох.',
    critLine: 'Стоп… я как будто снова там, на том слайде. Всё звенит, я не здесь.',
    q1line: 'Видимо, я всегда так реагирую, когда «нельзя ошибиться».',
    q1opts: ['«Нельзя ошибиться» — перед кем нельзя?', 'Вы боитесь реакции конкретных людей?', 'Похоже, зал для вас — экзаменатор.'],
    e1summary: 'Заземление в остром эпизоде; страх «первой минуты» назван. Тревога 8→4.',
  },
  {
    role: 'сотрудник',
    title: 'Конфликт с руководителем',
    desc: 'Руководитель перебивает и обесценивает на планёрках. Клиент молчит и потом злится на себя.',
    briefBody: 'Андрей, 29 лет. Каждую планёрку его перебивают. Уходит сmeetings с комом в горле. Просил «научиться отвечать спокойно».',
    s1: 'Завтра снова планёрка. Уже сейчас ком в горле, будто я снова молчу и сглатываю…',
    s1emo: [7, 'тревога с обидой'],
    c1line: 'Может, мне просто не стоило идти в эту компанию?',
    c1opts: ['Звучит как усталость и обида. Это про компанию или про вас?', 'Многие так думают после тяжёлых встреч.', 'Давайте сразу сценарий разговора с ним.'],
    c2line: '…и сердце стучит, стоит представить, что он меня перебьёт.',
    c2opts: ['Где в теле этот «ком» сейчас?', 'Сердце готовит вас сказать вслух важное.', 'Не будем про планёрку. Расскажите о выходных.'],
    t1: 'Пауза. Медленный выдох, плечи вниз.',
    critLine: 'Всё, не могу… как будто я снова там, молчу, и все смотрят. Ничего не чувствую.',
    q1line: 'Наверное, я всегда так реагирую, когда меня не слышат.',
    q1opts: ['«Не слышат» — что самое тяжёлое в этом?', 'Вы боитесь именно ответить вслух?', 'Похоже, молчание стало вашей защитой.'],
    e1summary: 'Найден телесный маркер «кома»; заявка на «Я-высказывание». Тревога 7→4.',
  },
];

function build(t: ThemeT, p: GenParams): Scenario {
  const dif = Math.min(5, Math.max(1, p.difficulty || 2));
  return {
    schemaVersion: '1.0',
    id: 'tpl-' + Date.now().toString(36),
    meta: {
      title: t.title,
      description: t.desc,
      clientRole: t.role,
      difficulty: dif,
      durationMin: 15 + dif * 5,
      focusSkills: (p.focus.length ? p.focus : ['listening', 'emotion_work']).slice(0, 3),
      language: 'ru',
    },
    graph: {
      start: 'brief',
      nodes: {
        brief: { type: 'card', title: 'Клиент: ' + t.role, body: t.briefBody, next: 's1' },
        s1: { type: 'text', clientLine: t.s1, emotionAfter: { value: t.s1emo[0], label: t.s1emo[1] }, next: 'c1' },
        c1: {
          type: 'choice', clientLine: t.c1line,
          emotionAfter: { value: t.s1emo[0], label: 'напряжение' },
          options: [
            { id: 'reflect', text: t.c1opts[0], scores: { listening: 2, emotion_work: 1 }, feedback: { strength: 'Точно отразили и чувство, и запрос.' }, emotionAfter: { value: Math.min(10, t.s1emo[0] - 1), label: 'чувствует: услышан' }, next: 'c2' },
            { id: 'normalize', text: t.c1opts[1], scores: { empathy: 1, listening: -1 }, feedback: { growth: 'Нормализация раньше исследования — обесценивает.' }, emotionAfter: { value: t.s1emo[0], label: 'держится' }, next: 'c2' },
            { id: 'advice', text: t.c1opts[2], scores: { structuring: 1, listening: -2 }, feedback: { growth: 'Совет без исследования — уход от эмоции.' }, emotionAfter: { value: Math.min(10, t.s1emo[0] + 1), label: 'тревога растёт' }, next: 'c2' },
          ],
        },
        c2: {
          type: 'choice', clientLine: t.c2line,
          emotionAfter: { value: Math.min(10, t.s1emo[0] + 1), label: 'тревога с телесным напряжением' },
          options: [
            { id: 'body_focus', text: t.c2opts[0], scores: { listening: 2, questioning: 1 }, feedback: { strength: 'Телесный фокус — путь к заземлению.' }, emotionAfter: { value: 6, label: 'внимание на теле' }, next: 'br1' },
            { id: 'validate_body', text: t.c2opts[1], scores: { emotion_work: 2 }, feedback: { strength: 'Валидация телесного опыта.' }, emotionAfter: { value: 6, label: 'напряжение признаётся' }, next: 'br1' },
            { id: 'avoid', text: t.c2opts[2], scores: { resistance: -2, structuring: -1 }, feedback: { growth: 'Избегание усилит тревогу.' }, emotionAfter: { value: Math.min(10, t.s1emo[0] + 1), label: 'тревога никуда не ушла' }, next: 'br1' },
          ],
        },
        br1: { type: 'branch', branches: [{ when: { emotionAtLeast: 7 }, then: 'crit1' }], else: 't1' },
        t1: { type: 'timer', prompt: t.t1, seconds: 10, emotionAfter: { value: 5, label: 'тревога снижается' }, next: 'q1' },
        crit1: {
          type: 'critical', clientLine: t.critLine, risk: 'high',
          recommendations: ['Валидация, не углублять', 'Заземление «5-4-3-2-1»', 'Предложить паузу и выйти из роли'],
          options: [
            { id: 'ground', text: 'Я здесь. Назовите 5 предметов вокруг.', scores: { emotion_work: 2, boundaries: 1 }, feedback: { strength: 'Заземление без вторжения.' }, emotionAfter: { value: 5, label: 'возвращается в «здесь»' }, next: 'q1' },
            { id: 'push', text: 'Продолжим — вы же хотели проработать это?', scores: { boundaries: -3, emotion_work: -2 }, feedback: { growth: 'Давление в остром состоянии — главная ошибка.' }, emotionAfter: { value: 10, label: 'диссоциация усиливается' }, next: 'end_early' },
            { id: 'minimize', text: 'Это просто воспоминание, не опасно.', scores: { emotion_work: -1, listening: -1 }, feedback: { growth: 'Обесценивание в острой фазе.' }, emotionAfter: { value: 7, label: 'сдержанно' }, next: 'q1' },
          ],
        },
        q1: {
          type: 'choice', clientLine: t.q1line,
          emotionAfter: { value: 5, label: 'есть рефлексия' },
          options: [
            { id: 'open_q', text: t.q1opts[0], scores: { questioning: 2, listening: 1 }, feedback: { strength: 'Открытый вопрос на смысл.' }, emotionAfter: { value: 4, label: 'говорит о главном' }, next: 'in1' },
            { id: 'closed_q', text: t.q1opts[1], scores: { questioning: 1 }, feedback: { growth: 'Закрытый вопрос сужает ответ.' }, emotionAfter: { value: 5, label: 'отвечает коротко' }, next: 'in1' },
            { id: 'interpret', text: t.q1opts[2], scores: { reflection: 1, questioning: -1 }, feedback: { growth: 'Интерпретация раньше данных.' }, emotionAfter: { value: 6, label: 'напряжение' }, next: 'in1' },
          ],
        },
        in1: { type: 'input', prompt: 'Свободный ответ — как отреагируете?', hints: ['Отразить смысл', 'Спросить про самое страшное', 'Нормализовать и заземлить'], maxLen: 500, scores: { emotion_work: 1, reflection: 1 }, feedback: { strength: 'Свободный ответ оценён по близости к подсказкам.' }, emotionAfter: { value: 4, label: 'спокойнее' }, next: 'sc1' },
        sc1: { type: 'scale', prompt: 'Оцените своё состояние прямо сейчас, 0–10.', selfRate: 4, emotionAfter: { value: 4, label: 'самооценка' }, next: 'e1' },
        e1: { type: 'end', outcome: { summary: t.e1summary, debrief: 'Сильное — телесный фокус и паузы. Рост — не спешить с советами и интерпретациями.', completed: true } },
        end_early: { type: 'end', outcome: { summary: 'Сессия остановлена в остром эпизоде: давление усилило реакцию. Разбор с супервизором обязателен.', debrief: 'Разберите по шагам: где было возможно заземление.', completed: false } },
      },
    },
  };
}

/** Случайная тема (или по совпадению слов в topic) → готовый валидный сценарий. */
export function templateScenario(p: GenParams): Scenario {
  const q = p.topic.toLowerCase();
  const pick =
    (q.includes('собес') || q.includes('интервью') || q.includes('работоустро')) ? THEMES[0] :
    (q.includes('выступ') || q.includes('доклад') || q.includes('публич') || q.includes('конферен')) ? THEMES[1] :
    (q.includes('конфликт') || q.includes('руковод') || q.includes('началь')) ? THEMES[2] :
    THEMES[Math.floor(Math.random() * THEMES.length)];
  return build(pick, p);
}
