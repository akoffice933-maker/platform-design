const STATUS = {
  new:      { label: 'Новая',     color: 'var(--color-semantic-info)',    bg: 'var(--color-bg-secondary)' },
  progress: { label: 'В процессе', color: 'var(--color-accent-primary)',  bg: 'var(--color-bg-secondary)' },
  done:     { label: 'Завершена', color: 'var(--color-semantic-success)', bg: 'var(--color-bg-secondary)' },
};

/**
 * GameCard — строка/карточка терапевтической игры (E-30, E-52 TMA).
 * thumb — эмодзи или буква; статус по спеке: новая / в процессе (N/M) / завершена.
 */
export function GameCard({ title, meta, thumb = '🫁', status = 'new', step, total, tint = 'var(--color-bg-tertiary)', onClick }) {
  const st = STATUS[status] || STATUS.new;
  const label = status === 'progress' && total ? `${step}/${total}` : st.label;
  return (
    <div
      className="m-lift"
      onClick={onClick}
      style={{
        display: 'flex', gap: 12, alignItems: 'center', width: 320, padding: 12,
        background: 'var(--color-bg-primary)', border: '1px solid var(--color-border-default)',
        borderRadius: 14, fontFamily: 'var(--font-inter, Inter, sans-serif)', cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span style={{
        width: 44, height: 44, borderRadius: 10, background: tint, flex: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>{thumb}</span>
      <span style={{ minWidth: 0 }}>
        <b style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</b>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>{meta}</span>
      </span>
      <span className="pui-chip" style={{ marginLeft: 'auto', color: st.color, flex: 'none' }}>{label}</span>
    </div>
  );
}
