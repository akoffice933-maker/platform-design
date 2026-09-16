import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { RadarSkills, SkillBars } from '../components/charts';
import { Badge, Btn, Card, Chip, SectionTitle } from '../components/ui';
import { EmoColor } from '../components/ui';

export default function Debrief() {
  const { rid } = useParams();
  const s = api.getSession(rid ?? '');
  const avg = api.getAverages();

  if (!s) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-h3 mb-2">Разбор не найден</p>
          <p className="text-body-sm text-ink-2 mb-5">Пройдите сессию — разбор появится здесь.</p>
          <Link to="/app/scenarios"><Btn>К библиотеке сценариев</Btn></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <h1 className="text-h2">Разбор · {s.scenarioTitle}</h1>
        <Badge completed={s.completed} />
        <span className="grow" />
        <Link to="/app/scenarios"><Btn size="sm" variant="secondary">⟲ Ещё раз</Btn></Link>
        <Link to="/app/history"><Btn size="sm" variant="ghost">В историю</Btn></Link>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 mb-4">
        <Card>
          <SectionTitle sub="итог сессии от узла end (docs/09)">Что произошло</SectionTitle>
          <p className="text-body">{s.summary}</p>
          <div className="flex items-center gap-6 mt-6">
            <div>
              <div className="text-caption uppercase text-ink-3">Тревога</div>
              <div className="text-h1 tabular-nums">
                <span className={EmoColor(s.emotionFrom)}>{s.emotionFrom}</span>
                <span className="text-ink-3 text-h2"> → </span>
                <span className={EmoColor(s.emotionTo)}>{s.emotionTo}</span>
              </div>
              <div className="text-caption text-ink-3">{s.emotionLabel}</div>
            </div>
            <span className="grow" />
            <div className="text-right">
              <div className="text-caption uppercase text-ink-3">Длительность</div>
              <div className="text-h2">{s.durationMin} мин</div>
            </div>
          </div>
          <blockquote className="mt-6 border-l-4 border-accent/40 pl-4 text-body-sm text-ink-2">{s.debrief}</blockquote>
        </Card>

        <Card>
          <SectionTitle sub="сплошная — сессия · пунктир — среднее за 5">Радар навыков</SectionTitle>
          <RadarSkills session={s.skills} average={avg} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <SectionTitle sub="накопленные дельты против среднего">Баллы по навыкам</SectionTitle>
          <SkillBars skills={s.skills} average={avg} />
        </Card>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="text-caption uppercase text-ok mb-2">✓ Сильные стороны</div>
            {s.strengths.length === 0 && <p className="text-caption text-ink-3">В этой сессии не зафиксировано.</p>}
            <ul className="flex flex-col gap-1.5">
              {s.strengths.map((t, i) => <li key={i} className="text-body-sm">• {t}</li>)}
            </ul>
          </Card>
          <Card>
            <div className="text-caption uppercase text-warn mb-2">▲ Зоны роста</div>
            {s.growth.length === 0 && <p className="text-caption text-ink-3">Не зафиксировано — осторожнее с идеалом :)</p>}
            <ul className="flex flex-col gap-1.5">
              {s.growth.map((t, i) => <li key={i} className="text-body-sm">• {t}</li>)}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="bg-bg-secondary">
        <b className="text-body-sm">Дальше: </b>
        <span className="text-body-sm text-ink-2">разбор с супервизором — <Link className="text-accent" to={`/supervisor/review/${s.id}`}>отправить в супервизию</Link> ·
        или закрепите навыки играми: <Link className="text-accent" to="/client">дыхание 4-7-8</Link></span>
      </Card>
    </div>
  );
}
