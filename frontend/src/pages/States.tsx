import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Btn, Card, Chip, Logo } from '../components/ui';

type S = 'loading' | 'empty' | 'error' | 'success' | 'partial' | 'critical';
const TABS: { id: S; label: string; code: string }[] = [
  { id: 'loading', label: 'Загрузка', code: 'E-80' },
  { id: 'empty', label: 'Пусто', code: 'E-81' },
  { id: 'error', label: 'Ошибка', code: 'E-82' },
  { id: 'success', label: 'Успех', code: 'E-83' },
  { id: 'partial', label: 'Частичные данные', code: 'E-84' },
  { id: 'critical', label: 'Критическая ошибка сессии', code: 'E-85' },
];

export default function States() {
  const [s, setS] = useState<S>('loading');
  return (
    <div className="min-h-screen bg-bg-secondary">
      <header className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <Link to="/" className="text-body-sm text-accent">← На главную</Link>
      </header>
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <h1 className="text-h2 mb-1">Состояния данных · E-80…E-85</h1>
        <p className="text-body-sm text-ink-2 mb-5">Единые стейты для всего продукта, включая TMA (docs/03, итерация 9). Скелетон пульсирует классом m-skeleton из motion.css.</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setS(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-body-sm font-medium transition-colors duration-fast ${s === t.id ? 'border-accent text-accent bg-accent/5' : 'border-line text-ink-2 hover:bg-bg-tertiary'}`}>
              {t.code} · {t.label}
            </button>
          ))}
        </div>

        <Card className="min-h-72 flex items-center justify-center">
          {s === 'loading' && (
            <div className="w-full max-w-md flex flex-col gap-3">
              <div className="m-skeleton h-6 w-48 rounded-md bg-bg-tertiary" />
              <div className="m-skeleton h-20 rounded-lg bg-bg-tertiary" />
              <div className="m-skeleton h-20 rounded-lg bg-bg-tertiary" />
              <p className="text-caption text-ink-3 text-center">скелетоны вместо спиннеров · motion.css</p>
            </div>
          )}
          {s === 'empty' && (
            <div className="text-center">
              <span className="text-5xl block mb-3">🗂</span>
              <b className="text-h3 block">Пока ничего нет</b>
              <p className="text-body-sm text-ink-2 mt-1 mb-4">Здесь появятся разборы ваших сессий.</p>
              <Btn size="sm">Пройти первую сессию</Btn>
            </div>
          )}
          {s === 'error' && (
            <div className="text-center">
              <span className="text-5xl block mb-3">⚠️</span>
              <b className="text-h3 block">Не удалось загрузить</b>
              <p className="text-body-sm text-ink-2 mt-1 mb-4">Проверьте соединение — данные не пострадали.</p>
              <Btn size="sm" variant="secondary">Повторить</Btn>
            </div>
          )}
          {s === 'success' && (
            <div className="text-center">
              <span className="w-16 h-16 rounded-full bg-ok/10 text-ok text-3xl inline-flex items-center justify-center mb-3">✓</span>
              <b className="text-h3 block">Всё сохранено</b>
              <p className="text-body-sm text-ink-2 mt-1">Разбор сессии отправлен вам на почту.</p>
            </div>
          )}
          {s === 'partial' && (
            <div className="w-full max-w-md">
              <div className="flex items-center gap-2 mb-3"><Chip tone="warn">показаны доступные данные</Chip></div>
              <div className="rounded-lg border border-line p-4 mb-3">
                <b className="text-body-sm block">Анна К. — 6 сессий</b>
                <span className="text-caption text-ink-2">данные обновлены 2 минуты назад</span>
              </div>
              <div className="rounded-lg border border-dashed border-warn/50 bg-warn/5 p-4">
                <b className="text-body-sm text-warn">Прогресс навыков — временно недоступен</b>
                <p className="text-caption text-ink-2 mt-0.5">обновим в течение часа, остальное работает</p>
              </div>
            </div>
          )}
          {s === 'critical' && (
            <div className="w-full max-w-md rounded-lg border-l-4 border-err bg-err/5 p-4">
              <b className="text-body-sm text-err block">Сессия остановлена в остром эпизоде</b>
              <p className="text-body-sm text-ink-2 mt-1 mb-3">Клиент диссоциирует: продолжение без заземления небезопасно. Рекомендовано: «5-4-3-2-1», пауза, выход из роли.</p>
              <Btn size="sm" variant="danger">Разбор с супервизором</Btn>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
