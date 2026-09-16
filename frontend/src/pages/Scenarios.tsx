import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCENARIO } from '../lib/engine';
import { skillLabel } from '../lib/skills';
import { Btn, Card, Chip, DiffDots, Input, SectionTitle } from '../components/ui';

const SOON = [
  { t: 'Первичная консультация', d: 'Сбор запроса и контракт на работу. База для новичков.', lvl: 1, min: 20, skills: ['structuring', 'questioning'] },
  { t: 'Сопротивление и молчание', d: 'Работа с защитами: пауза, отражение, граница.', lvl: 3, min: 40, skills: ['resistance', 'boundaries', 'reflection'] },
  { t: 'Выгорание клиента', d: 'Истощение и цинизм: темп, валидация, ресурсы.', lvl: 2, min: 30, skills: ['empathy', 'emotion_work'] },
];

export default function Scenarios() {
  const [q, setQ] = useState('');
  const m = SCENARIO.meta;
  const match = (t: string) => t.toLowerCase().includes(q.toLowerCase());

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <SectionTitle sub="контракт сценариев — schemas/scenario.schema.json · эталон docs/09">Библиотека сценариев</SectionTitle>

      <div className="flex gap-3 mb-6 max-w-md">
        <Input placeholder="Поиск по названиям и навыкам…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {match(m.title) !== false && m.title.toLowerCase().includes(q.toLowerCase()) && (
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
        <b className="text-body-sm">Методисту:</b> <span className="text-body-sm text-ink-2">новый сценарий добавляется JSON-файлом по схеме, валидируется
        {' '}<code className="text-caption bg-bg-tertiary rounded px-1">tools/validate_scenario.py</code> и появляется здесь автоматически. Инструкция — <a className="text-accent" href="https://github.com/akoffice933-maker/platform-design/blob/main/docs/09-%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D1%81%D1%86%D0%B5%D0%BD%D0%B0%D1%80%D0%B8%D1%8F.md" target="_blank" rel="noreferrer">docs/09</a>.</span>
      </Card>
    </div>
  );
}
