import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Btn, Card, Chip, Field, Input, SectionTitle } from '../components/ui';

const GAMES = [
  { id: 'breathing', t: 'Дыхание 4-7-8', d: 'Упражнение · 5 мин', emoji: '🫁', tint: '#EAF2FE' },
  { id: 'ground541', t: 'Заземление 5-4-3-2-1', d: 'Техника · 3 мин', emoji: '🌱', tint: '#FDF6E3' },
  { id: 'diary', t: 'Дневник эмоций', d: 'Дневник · ежедневно', emoji: '📔', tint: '#F0FDF4' },
  { id: 'sleep', t: 'Скрипт сна', d: 'Медитация · 10 мин', emoji: '🌙', tint: '#EEF0F4' },
];

export default function ClientGames() {
  const games = api.getGames();
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [err, setErr] = useState('');

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
        <div>
          <h1 className="text-h2">Привет, Анна</h1>
          <p className="text-body-sm text-ink-2 mt-1">Серия 5 дней 🔥 · ваш психолог рекомендовал 2 игры.</p>
        </div>
        <Link to="/tma"><Btn variant="secondary" size="sm">Открыть в Telegram →</Btn></Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {GAMES.map((g) => {
          const st = games[g.id];
          const label = st?.done ? (g.id === 'diary' ? `записей: ${st.done}` : `пройдено: ${st.done}`) : 'новая';
          return (
            <Link key={g.id} to={g.id === 'breathing' ? `/client/game/${g.id}` : '#'}>
              <Card className="m-lift h-full">
                <span className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-3" style={{ background: g.tint }}>{g.emoji}</span>
                <h3 className="text-h3">{g.t}</h3>
                <p className="text-caption text-ink-3 mt-0.5">{g.d}</p>
                <div className="mt-3">{st?.done ? <Chip tone="ok">● {label}</Chip> : <Chip tone="accent">новая</Chip>}</div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle sub="код приходит от психолога или в ссылке">Доступ по коду</SectionTitle>
          {unlocked ? (
            <div className="flex items-center gap-3 text-ok">
              <span className="w-10 h-10 rounded-full bg-ok/10 flex items-center justify-center text-lg">✓</span>
              <div>
                <b className="text-body-sm block">Доступ открыт</b>
                <span className="text-caption text-ink-3">«Дыхание 4-7-8» и «Дневник эмоций» на 30 дней</span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-start">
              <Field label="Код доступа" error={err}>
                <Input value={code} onChange={(e) => { setCode(e.target.value); setErr(''); }} placeholder="XXXX-XXXX" />
              </Field>
              <Btn className="mt-[26px]" onClick={() => {
                if (code.trim().toUpperCase() === 'DEMO-2026') setUnlocked(true);
                else setErr('В демо работает код DEMO-2026');
              }}>Открыть</Btn>
            </div>
          )}
        </Card>

        <Card className="bg-bg-secondary">
          <b className="text-body-sm block mb-1">Приватность</b>
          <p className="text-body-sm text-ink-2">Ответы в играх и дневник шифруются (E2E). Психолог видит только то, чем вы поделитесь.</p>
          <Chip tone="ok" className="mt-3">🔒 приватность по умолчанию</Chip>
        </Card>
      </div>
    </div>
  );
}
