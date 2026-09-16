import { Link } from 'react-router-dom';
import { Btn, Card, Chip, Logo } from '../components/ui';

const ADV = [
  { t: 'Симулятор с ИИ-клиентом', d: 'Ветвящиеся сценарии с разбором по 8 навыкам: слушание, эмпатия, границы — с баллами и альтернативными ходами.', cls: 'bg-accent' },
  { t: 'Терапевтические игры', d: 'Дыхание 4-7-8, заземление 5-4-3-2-1, дневник эмоций. Выдавайте клиентам по ссылке — в вебе и Telegram.', cls: 'bg-accent-secondary' },
  { t: 'Супервизия и прогресс', d: 'Комментарии супервизора к таймкодам сессии, радар навыков, динамика по неделям.', cls: 'bg-info' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-8">
        <Logo />
        <nav className="hidden md:flex gap-6 text-body-sm text-ink-2">
          <a href="#adv" className="hover:text-ink transition-colors duration-fast">Возможности</a>
          <a href="#aud" className="hover:text-ink transition-colors duration-fast">Кому</a>
          <a href="#demo" className="hover:text-ink transition-colors duration-fast">Демо</a>
        </nav>
        <span className="grow" />
        <Link to="/login" className="text-body-sm font-medium text-accent hover:underline">Войти</Link>
        <Btn size="sm" onClick={() => (window.location.href = '/register')}>Начать</Btn>
      </header>

      <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-14 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="m-slide-right">
          <Chip tone="accent" className="mb-4">ОБУЧАЮЩАЯ ПЛАТФОРМА ДЛЯ ПСИХОЛОГОВ</Chip>
          <h1 className="text-display leading-tight">Отработайте консультацию<br /><span className="text-accent">до встречи с клиентом</span></h1>
          <p className="text-body-lg text-ink-2 mt-4 max-w-lg">
            Симулятор с ветвляющимися диалогами, разбор по 8 навыкам и терапевтические
            игры для ваших клиентов — в вебе и Telegram.
          </p>
          <div className="flex gap-3 mt-7" id="demo">
            <Btn size="lg" onClick={() => (window.location.href = '/app/session/exam-anxiety')}>▶ Попробовать демо-сессию</Btn>
            <Link to="/login"><Btn size="lg" variant="secondary">Войти в кабинет</Btn></Link>
          </div>
          <p className="text-caption text-ink-3 mt-3">Демо: сценарий «Тревога перед экзаменом» — без регистрации.</p>
        </div>

        <div className="m-slide-left">
          <Card className="max-w-md ml-auto">
            <div className="flex items-center gap-2 text-caption text-ink-3 border-b border-line pb-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-err inline-block" /><span className="w-2.5 h-2.5 rounded-full bg-warn inline-block" /><span className="w-2.5 h-2.5 rounded-full bg-ok inline-block" />
              <span className="ml-2">Демо · «Первичная консультация»</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="max-w-[85%] bg-bg-secondary rounded-lg rounded-bl-sm px-3.5 py-2.5 text-body-sm">
                Здравствуйте… Честно, я уже не знаю, куда себя девать. Всё валится из рук.
                <div className="mt-1.5 text-caption"><span className="text-err">● эмоция 3/10 · низкий фон</span></div>
              </div>
              <div className="max-w-[90%] ml-auto bg-accent text-white rounded-lg rounded-br-sm px-3.5 py-2.5 text-body-sm">
                Отражаю чувство: «Похоже, сейчас для вас всё слишком»
                <div className="mt-1.5"><Chip className="!bg-white/15 !text-white">эмпатия +2</Chip></div>
              </div>
              <div className="max-w-[85%] bg-bg-secondary rounded-lg rounded-bl-sm px-3.5 py-2.5 text-body-sm">
                Да… именно так. А можно спросить вот о чём —
                <div className="mt-1.5 text-caption"><span className="text-warn">● тревога спадает 3→2</span></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="adv" className="max-w-6xl mx-auto px-4 lg:px-6 pb-16 grid md:grid-cols-3 gap-4">
        {ADV.map((a) => (
          <Card key={a.t} className="m-lift">
            <span className={`inline-block w-9 h-9 rounded-lg ${a.cls} mb-3`} />
            <h3 className="text-h3">{a.t}</h3>
            <p className="text-body-sm text-ink-2 mt-2">{a.d}</p>
          </Card>
        ))}
      </section>

      <section id="aud" className="max-w-6xl mx-auto px-4 lg:px-6 pb-20">
        <Card className="bg-bg-secondary border-line" pad>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[['Психологи', 'практика без риска для клиента'], ['Студенты', 'навыки до первой сессии'], ['Супервизоры', 'разбор по шагам, не по памяти'], ['Клиенты', 'игры между сессиями']].map(([t, d]) => (
              <div key={t}><b className="text-h3 block">{t}</b><span className="text-body-sm text-ink-2">{d}</span></div>
            ))}
          </div>
        </Card>
      </section>

      <footer className="border-t border-line py-8 text-center text-caption text-ink-3">
        © 2026 Platform · Политика конфиденциальности · Оферта · <Link className="text-accent" to="/states">стейты UI</Link>
      </footer>
    </div>
  );
}
