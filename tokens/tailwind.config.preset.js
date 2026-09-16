/**
 * Platform Design v1.1 — Tailwind preset (Tailwind v3).
 *
 * Подключение в приложении (tailwind.config.js):
 *   module.exports = {
 *     presets: [require('./tokens/tailwind.config.preset.js')],
 *     content: ['./src'],  // папка с компонентами
 *   };
 *
 * Отступы: шкала space/1–9 ТЗ совпадает с дефолтной сеткой Tailwind:
 *   space/1=4px -> p-1 · /2=8 -> p-2 · /3=12 -> p-3 · /4=16 -> p-4 · /5=24 -> p-6 ·
 *   /6=32 -> p-8 · /7=48 -> p-12 · /8=64 -> p-16 · /9=96 -> p-24
 *
 * Источник истины: tokens/design-tokens.json (W3C DTCG).
 */
module.exports = {
    "theme": {
    "extend": {
      "colors": {
        "bg": { "primary": "#FFFFFF", "secondary": "#F7F8FA", "tertiary": "#EEF0F4", "inverse": "#0F172A" },
        "ink": { "DEFAULT": "#0F172A", "2": "#475569", "3": "#94A3B8", "inverse": "#FFFFFF" },
        "line": { "DEFAULT": "#E2E8F0", "focus": "#2563EB" },
        "accent": { "DEFAULT": "#2563EB", "hover": "#1D4ED8", "active": "#1E40AF", "secondary": "#7C3AED" },
        "ok": { "DEFAULT": "#16A34A" },
        "warn": { "DEFAULT": "#F59E0B" },
        "err": { "DEFAULT": "#DC2626" },
        "info": { "DEFAULT": "#0EA5E9" },
        "emo": { "low": "#DC2626", "mid": "#F59E0B", "high": "#16A34A" },
        "skill": {
          "listening": "#2563EB", "empathy": "#7C3AED", "boundaries": "#0891B2",
          "emotion": "#DB2777", "structuring": "#65A30D", "resistance": "#EA580C",
          "questioning": "#0EA5E9", "reflection": "#9333EA"
        },
        "dark": { "bg": "#0B1220", "card": "#111827", "ink": "#F8FAFC", "ink2": "#CBD5E1", "line": "#1F2937" }
      },
      "fontFamily": {
        "sans": ["Inter", "system-ui", "sans-serif"],
        "mono": ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      "fontSize": {
        "display": ["40px", { "lineHeight": "48px", "fontWeight": "700" }],
        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "body": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "caption": ["12px", { "lineHeight": "16px", "fontWeight": "500", "letterSpacing": "0.06em" }],
        "button": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
        "mono": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      },
      "borderRadius": { "xs": "4px", "sm": "8px", "md": "12px", "lg": "16px", "xl": "24px" },
      "boxShadow": {
        "sm": "0 1px 2px rgba(0,0,0,0.05)",
        "md": "0 4px 12px rgba(0,0,0,0.08)",
        "lg": "0 12px 32px rgba(0,0,0,0.12)"
      },
      "transitionDuration": { "fast": "150ms", "base": "250ms", "slow": "400ms", "spring": "500ms" },
      "transitionTimingFunction": {
        "platform-out": "cubic-bezier(0, 0, 0.58, 1)",
        "platform-inout": "cubic-bezier(0.42, 0, 0.58, 1)",
        "platform-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      "minWidth": { "touch": "44px" },
      "minHeight": { "touch": "44px" },
      "screens": { "tablet": "768px", "desktop": "1440px" },
      "spacing": { "safe-t": "56px", "safe-b": "80px" }
    }
  }
};
