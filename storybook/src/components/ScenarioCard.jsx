import SKILL from './skills.js';

/**
 * ScenarioCard — карточка сценария симулятора (E-20/E-21).
 * difficulty 1–3, durationMin — минуты, skills — id из design-tokens color/skill.
 */
export function ScenarioCard({
  title,
  description,
  difficulty = 1,
  durationMin = 20,
  skills = [],
  progress = 0,
  onSelect,
}) {
  return (
    <article className="pui-card m-lift" onClick={onSelect} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <span className="pui-chip" title="Сложность">
          <span className="pui-dots">
            {[1, 2, 3].map((i) => (
              <i key={i} className={i <= difficulty ? 'on' : ''} />
            ))}
          </span>
        </span>
        <span className="pui-chip">{durationMin} мин</span>
        {progress > 0 ? <span className="pui-chip" style={{ marginLeft: 'auto' }}>{Math.round(progress * 100)}%</span> : null}
      </div>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</h3>
      <p style={{ margin: '6px 0 10px', fontSize: 13, lineHeight: '18px', color: 'var(--color-text-secondary)' }}>{description}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {skills.map((id) => (
          <span key={id} className="pui-chip">
            <i style={{ width: 8, height: 8, borderRadius: '50%', background: SKILL[id] ? SKILL[id].color : 'var(--color-bg-tertiary)', display: 'inline-block' }} />
            {SKILL[id] ? SKILL[id].label : id}
          </span>
        ))}
      </div>
    </article>
  );
}
