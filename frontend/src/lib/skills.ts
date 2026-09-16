// 8 навыков — IDs из tokens/design-tokens.json (color/skill) и schemas/scenario.schema.json.
// Классы — из tailwind-пресета (colors.skill.*; emotion_work в пресете ключ 'emotion').
export const SKILLS: { id: string; label: string; short: string; cls: string }[] = [
  { id: 'listening',    label: 'Активное слушание',        short: 'Слушание',      cls: 'bg-skill-listening' },
  { id: 'empathy',      label: 'Эмпатия',                  short: 'Эмпатия',       cls: 'bg-skill-empathy' },
  { id: 'boundaries',   label: 'Границы',                  short: 'Границы',       cls: 'bg-skill-boundaries' },
  { id: 'structuring',  label: 'Структурирование',         short: 'Структура',     cls: 'bg-skill-structuring' },
  { id: 'emotion_work', label: 'Работа с эмоциями',        short: 'Эмоции',        cls: 'bg-skill-emotion' },
  { id: 'resistance',   label: 'Работа с сопротивлением',  short: 'Сопротивление', cls: 'bg-skill-resistance' },
  { id: 'questioning',  label: 'Вопрошание',               short: 'Вопрошание',    cls: 'bg-skill-questioning' },
  { id: 'reflection',   label: 'Рефлексия',                short: 'Рефлексия',     cls: 'bg-skill-reflection' },
];

export const SKILL_BY_ID: Record<string, (typeof SKILLS)[number]> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s]),
);

export function skillLabel(id: string): string {
  return SKILL_BY_ID[id]?.short ?? id;
}

export function skillColorVar(id: string): string {
  const map: Record<string, string> = {
    listening: 'var(--color-skill-active-listening)',
    empathy: 'var(--color-skill-empathy)',
    boundaries: 'var(--color-skill-boundaries)',
    emotion_work: 'var(--color-skill-emotion-work)',
    structuring: 'var(--color-skill-structuring)',
    resistance: 'var(--color-skill-resistance)',
    questioning: 'var(--color-skill-questioning)',
    reflection: 'var(--color-skill-reflection)',
  };
  return map[id] ?? 'var(--color-text-tertiary)';
}
