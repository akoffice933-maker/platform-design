// Данные токенов ТЗ v1.0 (раздел 3) — синхронизированы с tokens/design-tokens.json

export interface ColorToken { name: string; value: string; use: string }

export const LIGHT_COLORS: ColorToken[] = [
  { name: 'color/bg/primary',   value: '#FFFFFF', use: 'Основной фон' },
  { name: 'color/bg/secondary', value: '#F7F8FA', use: 'Фон карточек, секций' },
  { name: 'color/bg/tertiary',  value: '#EEF0F4', use: 'Ховеры, разделители' },
  { name: 'color/bg/inverse',   value: '#0F172A', use: 'Тёмный фон (опц.)' },
  { name: 'color/text/primary',   value: '#0F172A', use: 'Заголовки, основной текст' },
  { name: 'color/text/secondary', value: '#475569', use: 'Подписи' },
  { name: 'color/text/tertiary',  value: '#94A3B8', use: 'Плейсхолдеры, disabled (не для читаемого текста!)' },
  { name: 'color/text/inverse',   value: '#FFFFFF', use: 'Текст на тёмном' },
  { name: 'color/border/default', value: '#E2E8F0', use: 'Границы' },
  { name: 'color/border/focus',   value: '#2563EB', use: 'Фокус, обводка 2px (WCAG)' },
  { name: 'color/accent/primary',       value: '#2563EB', use: 'CTA, ссылки' },
  { name: 'color/accent/primary-hover', value: '#1D4ED8', use: 'Ховер CTA' },
  { name: 'color/accent/secondary',     value: '#7C3AED', use: 'Вторичный акцент' },
  { name: 'color/semantic/success', value: '#16A34A', use: 'Успех' },
  { name: 'color/semantic/warning', value: '#F59E0B', use: 'Предупреждение (текст на нём — тёмный!)' },
  { name: 'color/semantic/error',   value: '#DC2626', use: 'Ошибка' },
  { name: 'color/semantic/info',    value: '#0EA5E9', use: 'Инфо (текст на нём — тёмный!)' },
  { name: 'color/emotion/low',  value: '#DC2626', use: 'Эмоция 0–3' },
  { name: 'color/emotion/mid',  value: '#F59E0B', use: 'Эмоция 4–6 (всегда иконка + цвет)' },
  { name: 'color/emotion/high', value: '#16A34A', use: 'Эмоция 7–10' },
  { name: 'color/skill/active-listening', value: '#2563EB', use: 'Навык: активное слушание' },
  { name: 'color/skill/empathy',          value: '#7C3AED', use: 'Навык: эмпатия' },
  { name: 'color/skill/boundaries',       value: '#0891B2', use: 'Навык: границы' },
  { name: 'color/skill/emotion-work',     value: '#DB2777', use: 'Навык: работа с эмоциями' },
  { name: 'color/skill/structuring',      value: '#65A30D', use: 'Навык: структурирование' },
  { name: 'color/skill/resistance',       value: '#EA580C', use: 'Навык: сопротивление' },
  { name: 'color/skill/questioning',      value: '#0EA5E9', use: 'Навык: вопрошание' },
  { name: 'color/skill/reflection',       value: '#9333EA', use: 'Навык: рефлексия' },
];

export const DARK_COLORS: ColorToken[] = [
  { name: 'color/dark/bg/primary',   value: '#0B1220', use: 'Основной фон (dark)' },
  { name: 'color/dark/bg/secondary', value: '#111827', use: 'Фон карточек (dark)' },
  { name: 'color/dark/text/primary',   value: '#F8FAFC', use: 'Основной текст (dark)' },
  { name: 'color/dark/text/secondary', value: '#CBD5E1', use: 'Подписи (dark)' },
  { name: 'color/dark/border/default', value: '#1F2937', use: 'Границы (dark)' },
];

export interface TypeToken {
  name: string; size: number; lineHeight: number; weight: number;
  mono?: boolean; sample: string; use: string;
}

export const TYPE_STYLES: TypeToken[] = [
  { name: 'text/display', size: 40, lineHeight: 48, weight: 700, sample: 'Симуляция консультации', use: 'Hero' },
  { name: 'text/h1',      size: 32, lineHeight: 40, weight: 700, sample: 'Библиотека сценариев',    use: 'Заголовок страницы' },
  { name: 'text/h2',      size: 24, lineHeight: 32, weight: 600, sample: 'Активное слушание',       use: 'Заголовок секции' },
  { name: 'text/h3',      size: 20, lineHeight: 28, weight: 600, sample: 'Карточка сценария',       use: 'Заголовок карточки' },
  { name: 'text/body-lg', size: 18, lineHeight: 28, weight: 400, sample: 'Клиент делится сложной ситуацией', use: 'Крупный текст' },
  { name: 'text/body',    size: 16, lineHeight: 24, weight: 400, sample: 'Основной текст интерфейса',        use: 'Основной текст' },
  { name: 'text/body-sm', size: 14, lineHeight: 20, weight: 400, sample: 'Подпись под полем ввода',          use: 'Подписи' },
  { name: 'text/caption', size: 12, lineHeight: 16, weight: 500, sample: 'МЕТА · ШАГ 2 ИЗ 7',                use: 'Мета, лейблы' },
  { name: 'text/button',  size: 16, lineHeight: 24, weight: 600, sample: 'Начать симуляцию',                 use: 'Кнопки' },
  { name: 'text/mono',    size: 14, lineHeight: 20, weight: 400, mono: true, sample: 'A7X9-Q2',              use: 'Коды доступа' },
];

export const SPACE: number[] = [4, 8, 12, 16, 24, 32, 48, 64, 96];

export const RADII: [string, number][] = [
  ['radius/xs', 4], ['radius/sm', 8], ['radius/md', 12],
  ['radius/lg', 16], ['radius/xl', 24], ['radius/full', 9999],
];

export const SHADOWS: [string, { x: number; y: number; b: number; op: number }][] = [
  ['shadow/sm', { x: 0, y: 1,  b: 2,  op: 0.05 }],
  ['shadow/md', { x: 0, y: 4,  b: 12, op: 0.08 }],
  ['shadow/lg', { x: 0, y: 12, b: 32, op: 0.12 }],
];

// ----- Палитра как константы (для рисования UI-kit) -----

export const C = {
  WHITE: '#FFFFFF',
  BG2: '#F7F8FA',
  BG3: '#EEF0F4',
  INK: '#0F172A',
  INK2: '#475569',
  INK3: '#94A3B8',
  BD: '#E2E8F0',
  ACCENT: '#2563EB',
  ACCENT_HOVER: '#1D4ED8',
  ACCENT_ACTIVE: '#1E40AF',
  ACCENT2: '#7C3AED',
  SUCCESS: '#16A34A',
  WARNING: '#F59E0B',
  ERROR: '#DC2626',
  ERROR_HOVER: '#B91C1C',
  ERROR_ACTIVE: '#991B1B',
  INFO: '#0EA5E9',
  // тёмная тема
  D_BG: '#0B1220',
  D_BG2: '#111827',
  D_INK: '#F8FAFC',
  D_INK2: '#CBD5E1',
  D_BD: '#1F2937',
};
