import type { ReactNode, ButtonHTMLAttributes } from 'react';

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
};

export function Btn({ variant = 'primary', size = 'md', full, className = '', ...rest }: BtnProps) {
  const base = 'pui-btn';
  const v = { primary: 'primary', secondary: 'secondary', ghost: 'ghost', danger: 'danger' }[variant];
  const s = { sm: 'sm', md: 'md', lg: 'lg' }[size];
  return <button className={`${base} ${v} ${s} m-press ${full ? 'w-full' : ''} ${className}`} {...rest} />;
}

export function Card({ children, className = '', pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <div className={`bg-bg-primary border border-line rounded-lg ${pad ? 'p-4' : ''} ${className}`}>{children}</div>
  );
}

export function Chip({ children, tone = 'default', className = '' }: { children: ReactNode; tone?: 'default' | 'ok' | 'warn' | 'err' | 'info' | 'accent'; className?: string }) {
  const tones = {
    default: 'bg-bg-secondary text-ink-2',
    ok: 'bg-bg-secondary text-ok',
    warn: 'bg-bg-secondary text-warn',
    err: 'bg-bg-secondary text-err',
    info: 'bg-bg-secondary text-info',
    accent: 'bg-bg-secondary text-accent',
  }[tone];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption ${tones} ${className}`}>{children}</span>;
}

export function Dot({ color, on = true }: { color: string; on?: boolean }) {
  return <i className={`inline-block w-1.5 h-1.5 rounded-full ${on ? color : 'bg-bg-tertiary'}`} />;
}

export function DiffDots({ level }: { level: number }) {
  const colors = ['bg-ok', 'bg-warn', 'bg-err', 'bg-err', 'bg-err'];
  return (
    <span className="inline-flex gap-1" title={`Сложность ${level} из 5`}>
      {[1, 2, 3, 4, 5].slice(0, 3).map((i) => <Dot key={i} color={colors[Math.min(level, 3) - 1] || 'bg-ok'} on={i <= level} />)}
    </span>
  );
}

export function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-body-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="text-caption text-err">{error}</span> : hint ? <span className="text-caption text-ink-2">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input className={`pui-input ${className}`} {...rest} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props;
  return <textarea className={`pui-input h-auto py-2 ${className}`} {...rest} />;
}

export function EmoColor(v: number): string {
  if (v <= 3) return 'text-emo-low';
  if (v <= 6) return 'text-emo-mid';
  return 'text-emo-high';
}

export function EmotionBar({ value, label, compact }: { value: number; label?: string; compact?: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-caption text-ink-2 uppercase">Эмоция клиента</span>
        <span className={`text-body-sm font-semibold ${EmoColor(value)}`}>{value}/10{label ? ` · ${label}` : ''}</span>
      </div>
      <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
        <div className={`h-full rounded-full m-grow-x ${value <= 3 ? 'bg-emo-low' : value <= 6 ? 'bg-emo-mid' : 'bg-emo-high'}`} style={{ width: `${value * 10}%`, transformOrigin: 'left' }} />
      </div>
      {!compact && <div className="flex justify-between mt-1 text-caption text-ink-3"><span>0 · спокоен</span><span>10 · остро</span></div>}
    </div>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: string; tone?: string }) {
  return (
    <Card className="m-lift">
      <div className="text-caption uppercase text-ink-2">{label}</div>
      <div className={`text-h2 mt-1 ${tone ?? ''}`}>{value}</div>
      {hint && <div className="text-caption text-ink-3 mt-0.5">{hint}</div>}
    </Card>
  );
}

export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const s = { sm: 'w-7 h-7 text-[11px]', md: 'w-9 h-9 text-caption', lg: 'w-14 h-14 text-h3' }[size];
  return <span className={`${s} rounded-full bg-accent/10 text-accent font-semibold inline-flex items-center justify-center flex-none`}>{initials}</span>;
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-h2">{children}</h2>
      {sub && <p className="text-body-sm text-ink-2 mt-1">{sub}</p>}
    </div>
  );
}

export function Badge({ completed }: { completed: boolean }) {
  return completed
    ? <Chip tone="ok">● завершена</Chip>
    : <Chip tone="err">● прервана · разбор обязателен</Chip>;
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex-none" />
      <b className={`text-h3 ${light ? 'text-dark-ink' : 'text-ink'}`}>Platform</b>
    </span>
  );
}
