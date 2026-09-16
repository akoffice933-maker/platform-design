import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SCENARIO } from '../lib/engine';
import { skillLabel } from '../lib/skills';
import { generateScenario, hasKey } from '../lib/ai';
import { api } from '../lib/api';
import { Btn, Card, Chip, DiffDots, Input, SectionTitle } from '../components/ui';

const SOON = [
  { t: 'Первичная консультация', d: 'Сбор запроса и контракт на работу. База для новичков.', lvl: 1, min: 20, skills: ['structuring', 'questioning'] },
  { t: 'Сопротивление и молчание', d: 'Работа с защитами: пауза, отражение, граница.', lvl: 3, min: 40, skills: ['resistance', 'boundaries', 'reflection'] },
];

const FOCUS = ['listening', 'empathy', 'emotion_work', 'questioning', 'boundaries', 'structuring', 'resistance', 'reflection'];
const IDEAS = [
  'Клиент боится увольнения и во всём соглашается с начальством',
  'Первая встреча с подростком, которого привели родители',
  'Выгорание медсестры после ночных смен, раздражение на пациентов',
  'Мужчина 40 лет: панические атаки в метро, избегает поездок',
  'Пара на грани развода: клиент не может говорить о чувствах',
];

export default function Scenarios() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState(IDEAS[Math.floor(Math.random() * IDEAS.length)]);
  const [focus, setFocus] = useState('listening');
  const [dif, setDif] = useState(2);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const [customs, setCustoms] = useState(api.getCustomScenarios());
  const m = SCENARIO.meta;
  const match = (t: string) => t.toLowerCase().includes(q.toLowerCase());

  const gen = async (): Promise<void> => {
    setBusy(true);
    setNote('Генерирую сценарий… (ИИ: до минуты, шаблон: мгновенно)');
    const r = await generateScenario({ topic: topic.trim() || IDEAS[0], focus: [focus], difficulty: dif });
    api.saveCustomScenario(r.scenario);
    setCustoms(api.getCustomScenarios());
    setNote(r.note ?? '');
    nav('/app/session/' + r.scenario.id);
    setBusy(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <SectionTitle sub="контракт — schemas/scenario.schema.json · эталон docs/09 · генерация — docs/12">Библиотека сценариев</SectionTitle>

      {/* Генератор */}
      <Card className="mb-8 bg-bg-secondary">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-h3">✨ Генератор сценариев</h3>
          <Chip tone={hasKey() ? 'ok' : 'warn'}>{hasKey() ? 'ИИ · OpenRouter готов' : 'без ключа — шаблоны'}</Chip>
        </div>
        <p className="text-body-sm text-ink-2 mb-4">Опишите запрос клиента — получите полный сценарий с ветвлениями, критическим эпизодом и разбором. Каждый граф валидируется контрактом docs/09 до запуска.</p>
        <div className="grid md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end">
          <label className="flex flex-col gap-1.5">
            <span className="text-caption uppercase text-ink-3">Тема / запрос клиента</span>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Например: страх публичных выступлений" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-caption uppercase text-ink-3">Фокус-навык</span>
            <select value={focus} onChange={(e) => setFocus(e.target.value)} className="pui-input">
              {FOCUS.map((f) => <option key={f} value={f}>{skillLabel(f)}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-caption uppercase text-ink-3">Сложность</span>
            <select value={dif} onChange={(e) => setDif(+e.target.value)} className="pui-input">
              {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>{d} из 5</option>)}
            </select>
          </label>
          <Btn size="lg" disabled={busy} onClick={gen}>{busy ? 'Генерирую…' : '✨ Сгенерировать'}</Btn>
        </div>
        {note && <div className={'mt-3 rounded-md px-3 py-2 text-caption ' + (note.startsWith('✓') ? 'bg-ok/10 text-ok' : 'bg-warn/10 text-warn')}>{note}</div>}
        <p className="text-caption text-ink-3 mt-3">Свободные ответы клиента придумывает ИИ — сценарий проверяется на: целостность графа, достижимость финала, лимиты текстов, корректность баллов −3…+3. Невалидный граф не запустится никогда.</p>
      </Card>

      {/* Сгенерированные */}
      {customs.length > 0 && (
        <>
          <SectionTitle sub={`${customs.length} сгенерированных · хранятся локально`}>Ваши сгенерированные сценарии</SectionTitle>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {customs.map((c) => (
              <Card key={c.id} className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <DiffDots level={c.meta.difficulty} />
                  <Chip>{c.meta.durationMin} мин</Chip>
                  <Chip tone="accent">✨ сгенерирован</Chip>
                </div>
                <h3 className="text-h3">{c.meta.title}</h3>
                <p className="text-body-sm text-ink-2 mt-1.5 grow">{c.meta.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.meta.focusSkills.map((s) => <Chip key={s} tone="info">{skillLabel(s)}</Chip>)}
                  <Chip>клиент: {c.meta.clientRole}</Chip>
                  <Chip>{Object.keys(c.graph.nodes).length} узлов</Chip>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to={`/app/session/${c.id}`} className="grow"><Btn full>▶ Запустить</Btn></Link>
                  <Btn variant="ghost" onClick={() => { api.deleteCustomScenario(c.id); setCustoms(api.getCustomScenarios()); }} title="Удалить">✕</Btn>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Эталон + скоро */}
      <div className="flex gap-3 mb-6 max-w-md">
        <Input placeholder="Поиск по названиям и навыкам…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {m.title.toLowerCase().includes(q.toLowerCase()) && (
          <Card className="m-lift flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <DiffDots level={m.difficulty} />
              <Chip>{m.durationMin} мин</Chip>
              <Chip tone="accent">эталон · готов</Chip>
            </div>
            <h3 className="text-h3">{m.title}</h3>
            <p className="text-body-sm text-ink-2 mt-1.5 grow">{m.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {m.focusSkills.map((s) => <Chip key={s} tone="info">{skillLabel(s)}</Chip>)}
              <Chip>клиент: {m.clientRole}</Chip>
            </div>
            <div className="text-caption text-ink-3 mt-3">
              16 узлов · 2 ветвления · критический эпизод (риск высокий)
            </div>
            <Link to={`/app/session/${SCENARIO.id}`} className="mt-4"><Btn full>▶ Запустить сессию</Btn></Link>
          </Card>
        )}

        {SOON.filter((s) => match(s.t) || s.skills.some((k) => match(skillLabel(k)))).map((s) => (
          <Card key={s.t} className="opacity-80">
            <div className="flex items-center gap-2 mb-3">
              <DiffDots level={s.lvl} />
              <Chip>{s.min} мин</Chip>
              <Chip tone="warn">скоро</Chip>
            </div>
            <h3 className="text-h3">{s.t}</h3>
            <p className="text-body-sm text-ink-2 mt-1.5">{s.d}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {s.skills.map((k) => <Chip key={k} tone="info">{skillLabel(k)}</Chip>)}
            </div>
            <Btn full variant="secondary" disabled className="mt-4">Методист готовит тексты (docs/05)</Btn>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-bg-secondary">
        <b className="text-body-sm">Методисту:</b> <span className="text-body-sm text-ink-2">авторский сценарий добавляется JSON-файлом по схеме, валидируется
        {' '}<code className="text-caption bg-bg-tertiary rounded px-1">tools/validate_scenario.py</code> и появляется здесь автоматически. Инструкция — <a className="text-accent" href="https://github.com/akoffice933-maker/platform-design/blob/main/docs/09-%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D1%81%D1%86%D0%B5%D0%BD%D0%B0%D1%80%D0%B8%D1%8F.md" target="_blank" rel="noreferrer">docs/09</a>.</span>
      </Card>
    </div>
  );
}
