import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { SKILLS, skillColorVar, skillLabel } from '../lib/skills';

/** Радар 8 навыков — референс charts/radar-skills.svg, docs/11. */
export function RadarSkills({ session, average, height = 300 }: { session: Record<string, number>; average: Record<string, number>; height?: number }) {
  const data = SKILLS.map((s) => ({
    skill: s.short,
    session: session[s.id] ?? 0,
    average: average[s.id] ?? 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="74%">
        <PolarGrid stroke="var(--color-border-default)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, 10]} tickCount={6} axisLine={false} tick={false} />
        <Radar name="Среднее" dataKey="average" stroke="var(--color-text-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
        <Radar name="Сессия" dataKey="session" stroke="var(--color-accent-primary)" strokeWidth={2} fill="var(--color-accent-primary)" fillOpacity={0.16}
          dot={{ r: 3, fill: 'var(--color-accent-primary)', strokeWidth: 0 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/** Горизонтальные полосы по 8 навыкам (значение против среднего). */
export function SkillBars({ skills, average }: { skills: Record<string, number>; average?: Record<string, number> }) {
  const rows = [...SKILLS].sort((a, b) => (skills[b.id] ?? 0) - (skills[a.id] ?? 0));
  const max = Math.max(1, ...rows.map((r) => Math.max(skills[r.id] ?? 0, average?.[r.id] ?? 0)));
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => {
        const v = skills[r.id] ?? 0;
        const avg = average?.[r.id];
        const delta = avg !== undefined ? Math.round((v - avg) * 10) / 10 : undefined;
        return (
          <div key={r.id} className="grid grid-cols-[130px_1fr_auto] items-center gap-3">
            <span className="text-caption text-ink-2 truncate" title={r.label}>{r.short}</span>
            <div className="relative h-2.5 rounded-full bg-bg-tertiary overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full m-grow-x" style={{ width: `${Math.max(0, v) / max * 100}%`, background: skillColorVar(r.id), transformOrigin: 'left' }} />
              {avg !== undefined && (
                <div className="absolute inset-y-0 w-0.5 bg-ink-3" style={{ left: `${Math.max(0, avg) / max * 100}%` }} title={`среднее ${avg}`} />
              )}
            </div>
            <span className={`text-caption font-semibold w-14 text-right ${delta === undefined ? 'text-ink-2' : delta > 0 ? 'text-ok' : delta < 0 ? 'text-err' : 'text-ink-3'}`}>
              {v > 0 ? `+${v}` : v}
              {delta !== undefined && delta !== 0 && <span className="text-ink-3 font-normal"> ({delta > 0 ? '+' : ''}{delta})</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Линия прогресса по неделям (E-28). */
export function ProgressLine({ data, height = 220 }: { data: { w: string; балл: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
        <CartesianGrid stroke="var(--color-border-default)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="w" tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`${v} балл(ов)`, 'Прогресс']} contentStyle={{ borderRadius: 12, borderColor: 'var(--color-border-default)', fontSize: 12 }} />
        <Line type="monotone" dataKey="балл" stroke="var(--color-accent-primary)" strokeWidth={2.5} dot={{ r: 3.5, fill: 'var(--color-accent-primary)', strokeWidth: 0 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Простая столбчатая неделя — без библиотеки, на div'ах (TMA/дашборд). */
export function MiniBars({ data, tone = 'bg-accent' }: { data: { w: string; min: number }[]; tone?: string }) {
  const max = Math.max(...data.map((d) => d.min), 1);
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d) => (
        <div key={d.w} className="flex-1 flex flex-col items-center gap-1">
          <div className={`w-full max-w-7 rounded-t-md ${tone} m-grow-x`} style={{ height: `${d.min / max * 100}%`, transformOrigin: 'bottom' }} title={`${d.min} мин`} />
          <span className="text-caption text-ink-3">{d.w}</span>
        </div>
      ))}
    </div>
  );
}

export { skillLabel };
