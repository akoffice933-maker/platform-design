/**
 * RadarSkills — радар 8 навыков (E-25 «Разбор», E-28 «Прогресс навыков»).
 * Референс вида: charts/radar-skills.svg. Спека выбора библиотеки: docs/11-графики.md.
 *
 * Требует recharts ^2.12. Цвета — только токены (см. docs/11, правило 1).
 */
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';

const SKILL_LABELS = {
  listening: 'Слушание', empathy: 'Эмпатия', boundaries: 'Границы', emotion_work: 'Эмоции',
  structuring: 'Структура', resistance: 'Сопротивление', questioning: 'Вопрошание', reflection: 'Рефлексия',
};

/** session/average: { [skillId]: 0..10 } — 8 skillId из docs/09 (совпадают с color/skill токенами). */
export function RadarSkills({ session = {}, average = {}, height = 320 }) {
  const data = Object.keys(SKILL_LABELS).map((id) => ({
    skill: SKILL_LABELS[id],
    session: session[id] ?? 0,
    average: average[id] ?? 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
        <PolarGrid stroke="var(--color-border-default)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12.5 }} />
        <PolarRadiusAxis domain={[0, 10]} tickCount={6} axisLine={false} tick={false} />
        <Radar
          name="Среднее за 5 сессий" dataKey="average"
          stroke="var(--color-text-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent"
        />
        <Radar
          name="Текущая сессия" dataKey="session"
          stroke="var(--color-accent-primary)" strokeWidth={2}
          fill="var(--color-accent-primary)" fillOpacity={0.16}
          dot={{ r: 3, fill: 'var(--color-accent-primary)', strokeWidth: 0 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* Использование в E-25:
   <RadarSkills
     session={{ listening: 7, empathy: 8, boundaries: 5, emotion_work: 6,
               structuring: 6, resistance: 4, questioning: 7, reflection: 6 }}
     average={{ listening: 6, empathy: 7, boundaries: 4, emotion_work: 5,
                structuring: 5, resistance: 5, questioning: 6, reflection: 5 }} />
*/
