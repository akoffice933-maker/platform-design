import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Btn, Card, Chip } from '../components/ui';

type Phase = { name: 'Вдох'; secs: number } | { name: 'Задержка'; secs: number } | { name: 'Выдох'; secs: number } | { name: 'Готово'; secs: number };
const CYCLE: Phase[] = [{ name: 'Вдох', secs: 4 }, { name: 'Задержка', secs: 7 }, { name: 'Выдох', secs: 8 }];
const TOTAL = 3;

export default function GamePlay() {
  const { gid } = useParams();
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [left, setLeft] = useState(CYCLE[0].secs);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const savedRef = useRef(false);
  const phase = running || done ? CYCLE[phaseIdx] : { name: 'Готово', secs: 0 } as Phase;

  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      const nextIdx = phaseIdx + 1;
      if (nextIdx >= CYCLE.length) {
        if (cycle >= TOTAL) { setRunning(false); setDone(true); return; }
        setCycle(cycle + 1);
        setPhaseIdx(0);
      } else setPhaseIdx(nextIdx);
      setLeft(CYCLE[nextIdx % CYCLE.length].secs);
      return;
    }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left, phaseIdx, cycle]);

  useEffect(() => {
    if (done && !savedRef.current) { savedRef.current = true; api.doneGame('breathing'); }
  }, [done]);

  const scale = phase.name === 'Вдох' ? 1 : phase.name === 'Задержка' ? 1 : 0.55;
  const dur = phase.name === 'Вдох' ? 4 : phase.name === 'Задержка' ? 0.3 : 8;

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto m-fade-in">
      <Link to="/client" className="text-body-sm text-accent">← Мои игры</Link>

      <Card className="mt-4 text-center py-10">
        {!running && !done && (
          <>
            <span className="text-5xl block mb-3">🫁</span>
            <h1 className="text-h2">Дыхание 4-7-8</h1>
            <p className="text-body-sm text-ink-2 mt-2 max-w-md mx-auto">
              {gid === 'breathing' ? 'Три цикла: вдох 4 секунды, задержка 7, медленный выдох 8. Уройте систему.' : 'Эта игра появится в демо позже — попробуйте дыхание.'}
            </p>
            <Btn size="lg" className="mt-6" onClick={() => { setRunning(true); setLeft(CYCLE[0].secs); }}>Начать · 3 цикла</Btn>
          </>
        )}

        {running && (
          <>
            <Chip tone="accent">цикл {cycle} из {TOTAL}</Chip>
            <div className="relative w-56 h-56 mx-auto my-8">
              <div className="absolute inset-0 rounded-full bg-accent/10 transition-transform ease-linear"
                style={{ transform: `scale(${scale})`, transitionDuration: `${dur}s` }} />
              <div className="absolute inset-6 rounded-full bg-accent/20 transition-transform ease-linear"
                style={{ transform: `scale(${scale})`, transitionDuration: `${dur}s` }} />
              <div className="absolute inset-12 rounded-full bg-accent text-white flex flex-col items-center justify-center transition-transform ease-linear"
                style={{ transform: `scale(${scale})`, transitionDuration: `${dur}s` }}>
                <b className="text-h3">{phase.name}</b>
                <span className="text-h1 tabular-nums">{left}</span>
              </div>
            </div>
            <button className="text-caption text-ink-3 underline" onClick={() => { setRunning(false); }}>прервать</button>
          </>
        )}

        {done && (
          <div className="m-spring-pop">
            <span className="text-5xl block mb-3">✨</span>
            <h1 className="text-h2">Готово!</h1>
            <p className="text-body-sm text-ink-2 mt-2">3 цикла · ~1 мин · самооценка тревоги снизится на 1–2 пункта.</p>
            <div className="flex justify-center gap-6 mt-6 text-h3">
              <div><b>3</b><div className="text-caption text-ink-3">цикла</div></div>
              <div><b>+1</b><div className="text-caption text-ink-3">к серии</div></div>
              <div><b>4:32</b><div className="text-caption text-ink-3">всего за день</div></div>
            </div>
            <div className="mt-6"><Chip tone="ok">результат отправлен вашему психологу (демо)</Chip></div>
            <div className="flex justify-center gap-3 mt-6">
              <Btn variant="secondary" onClick={() => { savedRef.current = false; setDone(false); setCycle(1); setPhaseIdx(0); }}>Ещё раз</Btn>
              <Link to="/client"><Btn>К играм</Btn></Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
