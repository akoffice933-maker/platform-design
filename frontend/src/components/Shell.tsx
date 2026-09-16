import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Logo } from './ui';

const NAV = {
  psych: [
    { to: '/app', label: 'Дашборд', end: true },
    { to: '/app/scenarios', label: 'Библиотека сценариев' },
    { to: '/app/history', label: 'История сессий' },
    { to: '/app/progress', label: 'Прогресс навыков' },
  ],
  client: [
    { to: '/client', label: 'Мои игры', end: true },
  ],
  admin: [
    { to: '/admin', label: 'Верификация и аудит', end: true },
  ],
  supervisor: [
    { to: '/supervisor', label: 'Разборы сессий', end: true },
  ],
} as const;

const ROLES = [
  { to: '/app', label: 'Психолог' },
  { to: '/client', label: 'Клиент · веб' },
  { to: '/tma', label: 'Клиент · Telegram' },
  { to: '/admin', label: 'Админ' },
  { to: '/supervisor', label: 'Супервизор' },
  { to: '/states', label: 'Стейты UI' },
];

const TITLES: Record<string, string> = {
  psych: 'Кабинет психолога',
  client: 'Кабинет клиента',
  admin: 'Администрирование',
  supervisor: 'Супервизия',
};

export default function Shell({ role }: { role: keyof typeof NAV }) {
  const nav = useNavigate();
  const loc = useLocation();
  const who = role === 'psych' ? 'Ирина Д.' : role === 'client' ? 'Анна К.' : role === 'admin' ? 'Админ' : 'М.Т.';
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 flex-none border-r border-line bg-bg-primary hidden lg:flex flex-col">
        <div className="px-5 h-16 flex items-center border-b border-line"><Logo /></div>
        <nav className="p-3 flex flex-col gap-1">
          {NAV[role].map((n) => (
            <NavLink key={n.to} to={n.to} end={'end' in n && n.end}
              className={({ isActive }) => `px-3 py-2 rounded-md text-body-sm font-medium transition-colors duration-fast ease-platform-out ${isActive ? 'bg-accent/10 text-accent' : 'text-ink-2 hover:bg-bg-tertiary'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4 text-caption text-ink-3 leading-relaxed">
          Platform Design · фронтенд v0.1<br />токены + motion.css из репо
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-16 flex-none border-b border-line bg-bg-primary/90 backdrop-blur flex items-center gap-3 px-4 lg:px-6 sticky top-0 z-20">
          <div className="lg:hidden"><Logo /></div>
          <b className="text-h3 hidden sm:block">{TITLES[role]}</b>
          <span className="grow" />
          <select
            aria-label="Демо-переключатель роли"
            className="text-body-sm rounded-md border border-line bg-bg-secondary px-2 py-1.5 focus:border-line-focus outline-none"
            value={ROLES.find((r) => loc.pathname.startsWith(r.to))?.to ?? ''}
            onChange={(e) => nav(e.target.value)}
          >
            {ROLES.map((r) => <option key={r.to} value={r.to}>{r.label}</option>)}
          </select>
          <span className="flex items-center gap-2">
            <Avatar name={who} />
            <span className="hidden md:block text-body-sm"><b>{who}</b><br /><span className="text-caption text-ink-3">демо-аккаунт</span></span>
          </span>
        </header>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
