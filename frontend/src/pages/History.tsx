import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Badge, Card, EmoColor, SectionTitle } from '../components/ui';
import { skillLabel } from '../lib/skills';

export default function History() {
  const sessions = api.getSessions();
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <SectionTitle sub={`${sessions.length} сессий · хранятся локально (мок-API)`}>История сессий</SectionTitle>
      <Card pad={false} className="overflow-hidden">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="text-left text-caption uppercase text-ink-3 border-b border-line">
              <th className="px-4 py-3">Сценарий</th>
              <th className="px-4 py-3 hidden sm:table-cell">Дата</th>
              <th className="px-4 py-3">Тревога</th>
              <th className="px-4 py-3 hidden md:table-cell">Топ-навык</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => {
              const top = Object.entries(s.skills).sort((a, b) => b[1] - a[1])[0];
              return (
                <tr key={s.id} className="border-b border-line last:border-0 hover:bg-bg-secondary transition-colors duration-fast">
                  <td className="px-4 py-3">
                    <Link to={`/app/debrief/${s.id}`} className="font-medium text-accent hover:underline">{s.scenarioTitle}</Link>
                    <div className="text-caption text-ink-3">{s.durationMin} мин</div>
                  </td>
                  <td className="px-4 py-3 text-ink-2 hidden sm:table-cell">{new Date(s.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className={`px-4 py-3 font-semibold tabular-nums ${EmoColor(s.emotionTo)}`}>{s.emotionFrom}→{s.emotionTo}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{top ? <span className="text-caption">{skillLabel(top[0])} +{top[1]}</span> : '—'}</td>
                  <td className="px-4 py-3"><Badge completed={s.completed} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
