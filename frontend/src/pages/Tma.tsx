import { useState } from 'react';
import { api } from '../lib/api';
import { Btn, Card } from '../components/ui';

// TMA (E-50…E-57o): телефонная рамка 390×844, тёмная тема, safe-area 56/80.
// Тумблер «сеть» демонстрирует E-53o «Нет соединения» — экран из docs/07.
type Screen = 'onb' | 'home' | 'games' | 'play' | 'result' | 'diary' | 'progress' | 'profile' | 'offline';

const NAV: { id: Screen; icon: string; label: string }[] = [
  { id: 'home', icon: '⌂', label: 'Главная' },
  { id: 'games', icon: '✦', label: 'Игры' },
  { id: 'diary', icon: '📖', label: 'Дневник' },
  { id: 'progress', icon: '▤', label: 'Прогресс' },
  { id: 'profile', icon: '☺', label: 'Профиль' },
];

const WEEK = [25, 40, 15, 50, 35, 20, 45];

export default function Tma() {
  const [net, setNet] = useState(true);
  const [screen, setScreen] = useState<Screen>('onb');
  const [ret, setRet] = useState<Screen>('home');
  const [emo, setEmo] = useState(6);
  const [note, setNote] = useState('');
  const diary = api.getDiary();

  const go = (s: Screen) => {
    if (!net) { setRet(s); setScreen('offline'); return; }
    setScreen(s);
  };

  const emoColor = (v: number) => (v <= 3 ? '#DC2626' : v <= 6 ? '#F59E0B' : '#16A34A');

  const header = (title: string) => (
    <div className="h-14 flex-none bg-[#0E1826] border-b border-[#1F2937] flex items-center px-4 relative">
      <span className="text-body-sm text-[#60A5FA]">Закрыть</span>
      <b className="absolute left-1/2 -translate-x-1/2 text-body-sm">{title}</b>
      <span className="ml-auto tracking-widest text-[#CBD5E1]">⋯</span>
    </div>
  );

  const mainBtn = (label: string, on: boolean, onClick: () => void) => (
    <div className="h-20 flex-none px-4 pt-2 bg-[#0B1220]">
      <button onClick={onClick} disabled={!on}
        className={`w-full h-12 rounded-xl text-body font-semibold transition-colors duration-fast ${on ? 'bg-accent text-white' : 'bg-[#1E293B] text-[#64748B]'}`}>
        {label}
      </button>
      <div className="w-32 h-1.5 rounded-full bg-white/30 mx-auto mt-2.5" />
    </div>
  );

  const navBar = () => (
    <div className="h-20 flex-none bg-[#111827] border-t border-[#1F2937] flex">
      {NAV.map((n) => (
        <button key={n.id} onClick={() => go(n.id)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors duration-fast ${screen === n.id ? 'text-accent font-semibold' : 'text-[#64748B]'}`}>
          <span className="text-base leading-none">{n.icon}</span>{n.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060B14] p-6 lg:p-10 flex gap-10 justify-center items-start flex-wrap">
      {/* Телефон */}
      <div className="w-[390px] flex-none origin-top scale-90 sm:scale-100">
        <div className="rounded-[36px] bg-[#111827] p-3 shadow-2xl">
          <div className="rounded-[26px] bg-[#0B1220] overflow-hidden flex flex-col h-[844px] text-[#F8FAFC] relative">
            {screen === 'onb' && (
              <>
                {header('Platform')}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
                  <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary" />
                  <h2 className="text-h2">Пространство спокойствия</h2>
                  <p className="text-body-sm text-[#94A3B8]">Игры и практики, которые подобрал ваш психолог — под вашу задачу.</p>
                  <p className="text-caption text-[#64748B]">Без регистрации · заметки шифруются (E2E)</p>
                </div>
                {mainBtn('Начать', true, () => go('home'))}
              </>
            )}

            {screen === 'offline' && (
              <>
                {header('Дыхание 4-7-8')}
                <div className="flex-1 px-6">
                  <div className="text-caption uppercase text-[#64748B] mb-2">ШАГ 3 ИЗ 6</div>
                  <div className="h-1.5 rounded-full bg-[#1F2937] mb-8"><div className="h-full w-1/2 rounded-full bg-accent" /></div>
                  <div className="w-20 h-20 rounded-full bg-[#1E293B] flex items-center justify-center text-3xl mx-auto mb-5">📡</div>
                  <h2 className="text-h3 text-center">Нет соединения</h2>
                  <p className="text-body-sm text-[#94A3B8] text-center mt-2">Похоже, связь пропала. Проверьте интернет и повторите попытку.</p>
                  <div className="mt-6 rounded-xl bg-[#111827] border border-[#1F2937] p-4 flex gap-3">
                    <span className="text-ok text-lg">✓</span>
                    <div>
                      <b className="text-body-sm block">Прогресс не потерян</b>
                      <span className="text-caption text-[#94A3B8]">Шаг 3 из 6 · ответы синхронизируются сами</span>
                    </div>
                  </div>
                  <p className="text-center mt-8"><a className="text-body-sm text-[#60A5FA] font-medium" href="#tma" onClick={(e) => { e.preventDefault(); setScreen(ret); }}>Продолжить офлайн</a></p>
                </div>
                {mainBtn('Повторить', true, () => setScreen(ret))}
              </>
            )}

            {screen === 'home' && (
              <>
                {header('Platform')}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  <h2 className="text-h3">Доброе утро, Анна</h2>
                  <p className="text-caption text-[#94A3B8] -mt-2">Серия 5 дней 🔥 · продолжите сегодня</p>
                  <button onClick={() => go('play')} className="text-left rounded-xl bg-[#111827] border border-[#1F2937] p-4 flex items-center gap-3 hover:border-accent transition-colors duration-fast">
                    <span className="w-11 h-11 rounded-lg bg-[#1E293B] flex items-center justify-center text-xl">🫁</span>
                    <span>
                      <b className="text-body-sm block">Продолжить «Дыхание 4-7-8»</b>
                      <span className="text-caption text-[#64748B]">шаг 3 из 6 · 2 мин</span>
                    </span>
                    <span className="ml-auto text-accent">→</span>
                  </button>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <div className="flex justify-between mb-2">
                      <b className="text-body-sm">Чек-ин: как вы сейчас?</b>
                      <b style={{ color: emoColor(emo) }}>{emo}/10</b>
                    </div>
                    <input type="range" min={0} max={10} value={emo} onChange={(e) => setEmo(+e.target.value)} className="w-full accent-[#2563EB]" />
                    <div className="flex justify-between text-caption text-[#64748B]"><span>спокоен</span><span>остро</span></div>
                  </div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <span className="text-caption uppercase text-[#64748B]">Совет дня</span>
                    <p className="text-body-sm mt-1">Перед сном — «Скрипт сна» 10 минут. Он снижает фоновую тревогу.</p>
                  </div>
                </div>
                {navBar()}
              </>
            )}

            {screen === 'games' && (
              <>
                {header('Игры')}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  {[['🫁', 'Дыхание 4-7-8', 'в процессе · 3/6', 'play'], ['🌱', 'Заземление 5-4-3-2-1', 'новая', 'play'], ['📔', 'Дневник эмоций', 'ежедневно', 'diary'], ['🌙', 'Скрипт сна', 'завершена', 'play']].map(([e, t, st, to]) => (
                    <button key={t as string} onClick={() => go(to as Screen)} className="text-left rounded-xl bg-[#111827] border border-[#1F2937] p-4 flex items-center gap-3 hover:border-accent transition-colors duration-fast">
                      <span className="w-11 h-11 rounded-lg bg-[#1E293B] flex items-center justify-center text-xl">{e}</span>
                      <span><b className="text-body-sm block">{t}</b><span className="text-caption text-[#64748B]">{st}</span></span>
                      <span className="ml-auto text-accent">→</span>
                    </button>
                  ))}
                </div>
                {navBar()}
              </>
            )}

            {screen === 'play' && (
              <>
                {header('Дыхание 4-7-8')}
                <div className="flex-1 px-5 py-4">
                  <div className="text-caption uppercase text-[#64748B] mb-2">ШАГ 3 ИЗ 6</div>
                  <div className="h-1.5 rounded-full bg-[#1F2937] mb-5"><div className="h-full w-1/2 rounded-full bg-accent" /></div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4 mb-4">
                    <b className="text-body-sm block mb-3">Что вы чувствуете в теле сейчас?</b>
                    {['Плечи и спина напряжены', 'Сердце бьётся чаще', 'Дыхание спокойное'].map((o, i) => (
                      <button key={o} onClick={() => go('result')}
                        className={`w-full text-left rounded-lg border px-3.5 py-3 text-body-sm mb-2 transition-colors duration-fast ${i === 1 ? 'border-accent bg-[#16233B] text-white font-medium' : 'border-[#1F2937] text-[#CBD5E1] hover:border-[#334155]'}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                  <p className="text-caption text-[#64748B] text-center">Выберите один вариант — можно изменить</p>
                </div>
                {mainBtn('Ответить', true, () => go('result'))}
              </>
            )}

            {screen === 'result' && (
              <>
                {header('Готово')}
                <div className="flex-1 flex flex-col items-center pt-10 px-6 text-center">
                  <span className="w-16 h-16 rounded-full bg-ok/15 text-ok flex items-center justify-center text-3xl">✓</span>
                  <h2 className="text-h3 mt-4">Сессия завершена!</h2>
                  <p className="text-caption text-[#94A3B8] mt-1">Вы прошли все 6 шагов упражнения</p>
                  <div className="grid grid-cols-3 gap-3 mt-7 w-full">
                    {[['4:32', 'время'], ['6/6', 'шаги'], ['+1', 'серия']].map(([v, l]) => (
                      <div key={l} className="rounded-xl bg-[#111827] border border-[#1F2937] py-3">
                        <b className="text-h3 block">{v}</b><span className="text-caption text-[#64748B]">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full rounded-xl bg-[#111827] border border-[#1F2937] p-4 mt-4 text-left">
                    <span className="text-caption uppercase text-[#64748B]">Самооценка тревоги</span>
                    <div className="text-h2 mt-1">7 <span className="text-[#64748B]">→</span> <span className="text-ok">4</span></div>
                    <span className="text-caption text-[#64748B]">результат отправлен вашему психологу</span>
                  </div>
                </div>
                {mainBtn('На главную', true, () => go('home'))}
              </>
            )}

            {screen === 'diary' && (
              <>
                {header('Дневник')}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <div className="flex justify-between items-center mb-2">
                      <b className="text-body-sm">Новая запись</b>
                      <b style={{ color: emoColor(emo) }}>{emo}/10</b>
                    </div>
                    <input type="range" min={0} max={10} value={emo} onChange={(e) => setEmo(+e.target.value)} className="w-full accent-[#2563EB] mb-2" />
                    <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Что повлияло? (до 200 символов)"
                      className="w-full rounded-lg bg-[#0B1220] border border-[#1F2937] px-3 py-2.5 text-body-sm outline-none focus:border-accent" />
                    <button onClick={() => { if (net) { api.addDiary(emo, note || 'без заметки'); setNote(''); } else go('diary'); }}
                      className="mt-2 text-body-sm text-[#60A5FA] font-medium">Сохранить →</button>
                  </div>
                  {diary.map((d) => (
                    <div key={d.id} className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                      <div className="flex justify-between">
                        <b className="text-body-sm" style={{ color: emoColor(d.emotion) }}>эмоция {d.emotion}/10</b>
                        <span className="text-caption text-[#64748B]">{d.date}</span>
                      </div>
                      <p className="text-body-sm text-[#CBD5E1] mt-1">{d.note}</p>
                    </div>
                  ))}
                </div>
                {navBar()}
              </>
            )}

            {screen === 'progress' && (
              <>
                {header('Прогресс')}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4 text-center">
                    <b className="text-display block">5</b>
                    <span className="text-caption text-[#94A3B8]">дней серии · лучший 9</span>
                  </div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <b className="text-body-sm block mb-3">Активность недели</b>
                    <div className="flex items-end gap-2 h-24">
                      {WEEK.map((m, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full max-w-6 rounded-t bg-accent" style={{ height: `${m * 2}px` }} />
                          <span className="text-[10px] text-[#64748B]">{['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <b className="text-body-sm block mb-2">Сводка месяца</b>
                    {[['Игр пройдено', '7'], ['Чек-инов', '12'], ['Дней без пропуска', '5']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-body-sm py-1 border-b border-[#1F2937] last:border-0">
                        <span className="text-[#94A3B8]">{k}</span><b>{v}</b>
                      </div>
                    ))}
                  </div>
                </div>
                {navBar()}
              </>
            )}

            {screen === 'profile' && (
              <>
                {header('Профиль')}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-[#16233B] border-2 border-accent flex items-center justify-center text-lg">А</span>
                    <div>
                      <b className="text-body-sm block">Анна К.</b>
                      <span className="text-caption text-[#64748B]">психолог: Ирина Д. ✓ привязан</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4">
                    <b className="text-body-sm block mb-2">Настройки</b>
                    {[['Тема — как в Telegram', true], ['Напоминание 21:00', true], ['Haptic feedback', false]].map(([k, v]) => (
                      <div key={k as string} className="flex justify-between items-center py-2 border-b border-[#1F2937] last:border-0">
                        <span className="text-body-sm text-[#CBD5E1]">{k}</span>
                        <span className={`w-10 h-6 rounded-full relative transition-colors duration-fast ${v ? 'bg-accent' : 'bg-[#334155]'}`}>
                          <i className={`absolute top-0.5 w-5 h-5 rounded-full bg-white ${v ? 'right-0.5' : 'left-0.5'}`} />
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-4 flex gap-3">
                    <span className="text-ok text-lg">🔒</span>
                    <div>
                      <b className="text-body-sm block">Заметки и ответы шифруются (E2E)</b>
                      <span className="text-caption text-[#94A3B8]">Психолог видит только то, чем вы поделитесь</span>
                    </div>
                  </div>
                  <button onClick={() => go('offline')} className="text-caption text-[#60A5FA]">Показать экран «Нет соединения» (E-53o)</button>
                </div>
                {navBar()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Пульт демо */}
      <div className="max-w-xs">
        <h1 className="text-h2 text-white">Telegram Mini App</h1>
        <p className="text-body-sm text-[#94A3B8] mt-2">
          Клиентский мини-апп: 390×844, тёмная тема, safe-area 56/80 (шапка Telegram и MainButton).
          Экраны E-50…E-57o из спеки <b className="text-white">screens/07-tma.html</b>.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-4 flex items-center justify-between">
            <span className="text-body-sm text-[#CBD5E1]">Сеть {net ? 'включена' : 'выключена'}</span>
            <button onClick={() => { setNet(!net); }} className={`w-11 h-6 rounded-full relative transition-colors duration-fast ${net ? 'bg-ok' : 'bg-err'}`}>
              <i className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${net ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
          <p className="text-caption text-[#64748B]">Выключите сеть и понажимайте экраны — любой переход показывает E-53o «Нет соединения» с сохранённым прогрессом. Включите обратно и нажмите «Повторить».</p>
          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-4">
            <span className="text-caption uppercase text-[#64748B]">Экраны</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(['onb', 'home', 'games', 'play', 'result', 'diary', 'progress', 'profile'] as Screen[]).map((s) => (
                <button key={s} onClick={() => go(s)} className={`rounded-full px-2.5 py-1 text-caption border transition-colors duration-fast ${screen === s ? 'border-accent text-accent' : 'border-[#1F2937] text-[#94A3B8] hover:border-[#334155]'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
