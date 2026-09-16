/** Input — текстовое поле: label, hint, error (валидация на месте). */
export function Input({ label, hint, error, disabled, placeholder, type = 'text', value, onChange }) {
  return (
    <label className="pui-field">
      {label ? <span className="pui-label">{label}</span> : null}
      <input
        className={'pui-input' + (error ? ' error' : '')}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      {error ? <span className="pui-error">{error}</span> : hint ? <span className="pui-hint">{hint}</span> : null}
    </label>
  );
}
