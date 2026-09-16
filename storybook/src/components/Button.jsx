/** Button — спека uikit/02: primary / secondary / ghost / danger, 32–40–48px. */
export function Button({
  variant = 'primary',
  size = 'md',
  full,
  disabled,
  children,
  onClick,
}) {
  const cls = ['pui-btn', variant, size];
  if (full) cls.push('m-press');
  return (
    <button
      type="button"
      className={cls.join(' ')}
      style={full ? { width: '100%' } : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
