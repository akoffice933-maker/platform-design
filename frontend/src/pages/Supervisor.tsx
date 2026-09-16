import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Badge, Card, EmoColor, SectionTitle } from '../components/ui';

export default function Supervisor() {
  const sessions = api.getSessions();
  const comments = api.getComments();
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <SectionTitle sub="разборы, отправленные психологами; комментарии — по шагам сессии">Очередь супервизии</SectionTitle>
      <Card pad={false} className="overflow-hidden">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="text-left text-caption uppercase text-ink-3 border-b border-line">
              <th className="px-4 py-3">Сессия</th>
              <th className="px-4 py-3 hidden sm:table-cell">Психолог</th>
              <th className="px-4 py-3">Тревога</th>
              <th className="px-4 py-3 hidden md:table-cell">Комментарии</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => {
              const cc = comments.filter((c) => c.sessionId === s.id).length;
              return (
                <tr key={s.id} className="border-b border-line last:border-0 hover:bg-bg-secondary transition-colors duration-fast">
                  <td className="px-4 py-3">
                    <b className="block">{s.scenarioTitle}</b>
                    <span className="text-caption text-ink-3">{s.id}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">Ирина Д.</td>
                  <td className={`px-4 py-3 font-semibold tabular-nums ${EmoColor(s.emotionTo)}`}>{s.emotionFrom}→{s.emotionTo}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{cc ? <span className="text-caption">💬 {cc}</span> : <span className="text-caption text-ink-3">—</span>}</td>
                  <td className="px-4 py-3"><Badge completed={s.completed} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/supervisor/review/${s.id}`} className="text-body-sm font-medium text-accent hover:underline">Разобрать →</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <p className="text-caption text-ink-3 mt-3">Сессии, прерванные в критическом эпизоде (completed = false), поднимаются наверх при сортировке на бэкенде (docs/09: outcome.completed).</p>
    </div>
  );
}
