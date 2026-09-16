import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Avatar, Badge, Btn, Card, Chip, DiffDots, EmoColor, SectionTitle, Stat } from '../components/ui';
import { MiniBars } from '../components/charts';
import { WEEK_ACTIVITY } from '../lib/api';
import { SCENARIO } from '../lib/engine';

export default function Dashboard() {
  const clients = api.getClients();
  const sessions = api.getSessions();
  const week = sessions.filter((s) => Date.now() - +new Date(s.date) < 7 * 864e5).length;

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
        <div>
          <h1 className="text-h2">Добрый день, Ирина</h1>
          <p className="text-body-sm text-ink-2 mt-1">На этой неделе 2 сессии в симуляторе и 3 игры у клиентов.</p>
        </div>
        <Link to="/app/scenarios"><Btn>▶ Запустить сценарий</Btn></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Клиенты" value={clients.length} hint="3 активных · 1 пауза" />
        <Stat label="Сессии за 7 дней" value={week} hint="симулятор + разборы" />
        <Stat label="Средняя тревога" value="↓ 2.4" hint="после сессий, шкала 0–10" tone="text-ok" />
        <Stat label="Верификации" value={api.getVerifications().length} hint="ожидают решения" tone="text-warn" />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <div>
          <SectionTitle sub="последние разборы — кликните для детального разбора">Сессии</SectionTitle>
          <Card pad={false} className="overflow-hidden mb-8">
            <table className="w-full text-body-sm">
              <thead>
                <tr className="text-left text-caption uppercase text-ink-3 border-b border-line">
                  <th className="px-4 py-3">Сценарий</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Когда</th>
                  <th className="px-4 py-3">Тревога</th>
                  <th className="px-4 py-3">Статус</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 5).map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-0 hover:bg-bg-secondary transition-colors duration-fast">
                    <td className="px-4 py-3">
                      <Link to={`/app/debrief/${s.id}`} className="font-medium text-accent hover:underline">{s.scenarioTitle}</Link>
                      <div className="text-caption text-ink-3">{s.durationMin} мин · навыков задето: {Object.values(s.skills).filter((v) => v !== 0).length}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-2 hidden sm:table-cell">{new Date(s.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</td>
                    <td className={`px-4 py-3 font-semibold ${EmoColor(s.emotionTo)}`}>{s.emotionFrom}→{s.emotionTo}</td>
                    <td className="px-4 py-3"><Badge completed={s.completed} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <SectionTitle>Клиенты</SectionTitle>
          <Card pad={false} className="overflow-hidden">
            {clients.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 border-b border-line last:border-0">
                <Avatar name={c.name} />
                <div className="min-w-0">
                  <b className="text-body-sm block truncate">{c.name}, {c.age}</b>
                  <span className="text-caption text-ink-3 truncate block">{c.request}</span>
                </div>
                <span className="grow" />
                <span className={`text-body-sm font-semibold ${EmoColor(c.lastEmotion)}`}>{c.lastEmotion}/10</span>
                {c.next ? <Chip tone="accent" className="hidden md:inline-flex">{c.next}</Chip> : <Chip>пауза</Chip>}
              </div>
            ))}
          </Card>
        </div>

        <div>
          <SectionTitle>Демо-сценарий недели</SectionTitle>
          <Card className="m-lift mb-8">
            <div className="flex items-center gap-2 mb-2">
              <DiffDots level={SCENARIO.meta.difficulty} />
              <Chip>{SCENARIO.meta.durationMin} мин</Chip>
              <Chip tone="accent">фокус: слушание · эмоции</Chip>
            </div>
            <h3 className="text-h3">{SCENARIO.meta.title}</h3>
            <p className="text-body-sm text-ink-2 mt-1.5">{SCENARIO.meta.description}</p>
            <Link to={`/app/session/${SCENARIO.id}`}><Btn full className="mt-4">▶ Запустить сессию</Btn></Link>
          </Card>

          <SectionTitle>Активность недели</SectionTitle>
          <Card>
            <MiniBars data={WEEK_ACTIVITY} />
            <p className="text-caption text-ink-3 mt-3">минуты практики · цель 150 мин/нед</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
