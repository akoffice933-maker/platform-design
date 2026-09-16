/**
 * EmotionIndicator — самооценка эмоции 0–10 (E-22/E-25/E-54, дневник E-55).
 * Цвет по токенам color/emotion: 0–3 low, 4–6 mid, 7–10 high.
 */
function zoneColor(value) {
  if (value <= 3) return 'var(--color-emotion-low)';
  if (value <= 6) return 'var(--color-emotion-mid)';
  return 'var(--color-emotion-high)';
}

export function EmotionIndicator({ label = 'Тревога', value = 5, showScale = true }) {
  const color = zoneColor(value);
  return (
    <div style={{ width: 260, fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          {label} <b style={{ color: 'var(--color-text-primary)' }}>{value}/10</b>
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color }}>{zoneLabel(value)}</span>
      </div>
      {showScale ? (
        <div className="pui-emobar" role="meter" aria-valuemin={0} aria-valuemax={10} aria-valuenow={value} aria-label={label}>
          <b style={{ width: (value * 10) + '%', background: color }} />
        </div>
      ) : null}
    </div>
  );
}

function zoneLabel(v) {
  if (v <= 3) return 'низкий фон';
  if (v <= 6) return 'умеренно';
  return 'высокий';
}
