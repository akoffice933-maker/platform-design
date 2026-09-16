(() => {
  // src/tokens-data.ts
  var LIGHT_COLORS = [
    { name: "color/bg/primary", value: "#FFFFFF", use: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u043E\u043D" },
    { name: "color/bg/secondary", value: "#F7F8FA", use: "\u0424\u043E\u043D \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A, \u0441\u0435\u043A\u0446\u0438\u0439" },
    { name: "color/bg/tertiary", value: "#EEF0F4", use: "\u0425\u043E\u0432\u0435\u0440\u044B, \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u0438" },
    { name: "color/bg/inverse", value: "#0F172A", use: "\u0422\u0451\u043C\u043D\u044B\u0439 \u0444\u043E\u043D (\u043E\u043F\u0446.)" },
    { name: "color/text/primary", value: "#0F172A", use: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438, \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043A\u0441\u0442" },
    { name: "color/text/secondary", value: "#475569", use: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438" },
    { name: "color/text/tertiary", value: "#94A3B8", use: "\u041F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B, disabled (\u043D\u0435 \u0434\u043B\u044F \u0447\u0438\u0442\u0430\u0435\u043C\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430!)" },
    { name: "color/text/inverse", value: "#FFFFFF", use: "\u0422\u0435\u043A\u0441\u0442 \u043D\u0430 \u0442\u0451\u043C\u043D\u043E\u043C" },
    { name: "color/border/default", value: "#E2E8F0", use: "\u0413\u0440\u0430\u043D\u0438\u0446\u044B" },
    { name: "color/border/focus", value: "#2563EB", use: "\u0424\u043E\u043A\u0443\u0441, \u043E\u0431\u0432\u043E\u0434\u043A\u0430 2px (WCAG)" },
    { name: "color/accent/primary", value: "#2563EB", use: "CTA, \u0441\u0441\u044B\u043B\u043A\u0438" },
    { name: "color/accent/primary-hover", value: "#1D4ED8", use: "\u0425\u043E\u0432\u0435\u0440 CTA" },
    { name: "color/accent/secondary", value: "#7C3AED", use: "\u0412\u0442\u043E\u0440\u0438\u0447\u043D\u044B\u0439 \u0430\u043A\u0446\u0435\u043D\u0442" },
    { name: "color/semantic/success", value: "#16A34A", use: "\u0423\u0441\u043F\u0435\u0445" },
    { name: "color/semantic/warning", value: "#F59E0B", use: "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 (\u0442\u0435\u043A\u0441\u0442 \u043D\u0430 \u043D\u0451\u043C \u2014 \u0442\u0451\u043C\u043D\u044B\u0439!)" },
    { name: "color/semantic/error", value: "#DC2626", use: "\u041E\u0448\u0438\u0431\u043A\u0430" },
    { name: "color/semantic/info", value: "#0EA5E9", use: "\u0418\u043D\u0444\u043E (\u0442\u0435\u043A\u0441\u0442 \u043D\u0430 \u043D\u0451\u043C \u2014 \u0442\u0451\u043C\u043D\u044B\u0439!)" },
    { name: "color/emotion/low", value: "#DC2626", use: "\u042D\u043C\u043E\u0446\u0438\u044F 0\u20133" },
    { name: "color/emotion/mid", value: "#F59E0B", use: "\u042D\u043C\u043E\u0446\u0438\u044F 4\u20136 (\u0432\u0441\u0435\u0433\u0434\u0430 \u0438\u043A\u043E\u043D\u043A\u0430 + \u0446\u0432\u0435\u0442)" },
    { name: "color/emotion/high", value: "#16A34A", use: "\u042D\u043C\u043E\u0446\u0438\u044F 7\u201310" },
    { name: "color/skill/active-listening", value: "#2563EB", use: "\u041D\u0430\u0432\u044B\u043A: \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435" },
    { name: "color/skill/empathy", value: "#7C3AED", use: "\u041D\u0430\u0432\u044B\u043A: \u044D\u043C\u043F\u0430\u0442\u0438\u044F" },
    { name: "color/skill/boundaries", value: "#0891B2", use: "\u041D\u0430\u0432\u044B\u043A: \u0433\u0440\u0430\u043D\u0438\u0446\u044B" },
    { name: "color/skill/emotion-work", value: "#DB2777", use: "\u041D\u0430\u0432\u044B\u043A: \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u044D\u043C\u043E\u0446\u0438\u044F\u043C\u0438" },
    { name: "color/skill/structuring", value: "#65A30D", use: "\u041D\u0430\u0432\u044B\u043A: \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" },
    { name: "color/skill/resistance", value: "#EA580C", use: "\u041D\u0430\u0432\u044B\u043A: \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435" },
    { name: "color/skill/questioning", value: "#0EA5E9", use: "\u041D\u0430\u0432\u044B\u043A: \u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435" },
    { name: "color/skill/reflection", value: "#9333EA", use: "\u041D\u0430\u0432\u044B\u043A: \u0440\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F" }
  ];
  var DARK_COLORS = [
    { name: "color/dark/bg/primary", value: "#0B1220", use: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u043E\u043D (dark)" },
    { name: "color/dark/bg/secondary", value: "#111827", use: "\u0424\u043E\u043D \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A (dark)" },
    { name: "color/dark/text/primary", value: "#F8FAFC", use: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043A\u0441\u0442 (dark)" },
    { name: "color/dark/text/secondary", value: "#CBD5E1", use: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438 (dark)" },
    { name: "color/dark/border/default", value: "#1F2937", use: "\u0413\u0440\u0430\u043D\u0438\u0446\u044B (dark)" }
  ];
  var TYPE_STYLES = [
    { name: "text/display", size: 40, lineHeight: 48, weight: 700, sample: "\u0421\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438", use: "Hero" },
    { name: "text/h1", size: 32, lineHeight: 40, weight: 700, sample: "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432", use: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" },
    { name: "text/h2", size: 24, lineHeight: 32, weight: 600, sample: "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", use: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0435\u043A\u0446\u0438\u0438" },
    { name: "text/h3", size: 20, lineHeight: 28, weight: 600, sample: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F", use: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438" },
    { name: "text/body-lg", size: 18, lineHeight: 28, weight: 400, sample: "\u041A\u043B\u0438\u0435\u043D\u0442 \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441\u043B\u043E\u0436\u043D\u043E\u0439 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0435\u0439", use: "\u041A\u0440\u0443\u043F\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442" },
    { name: "text/body", size: 16, lineHeight: 24, weight: 400, sample: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043A\u0441\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430", use: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043A\u0441\u0442" },
    { name: "text/body-sm", size: 14, lineHeight: 20, weight: 400, sample: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u043F\u043E\u0434 \u043F\u043E\u043B\u0435\u043C \u0432\u0432\u043E\u0434\u0430", use: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438" },
    { name: "text/caption", size: 12, lineHeight: 16, weight: 500, sample: "\u041C\u0415\u0422\u0410 \xB7 \u0428\u0410\u0413 2 \u0418\u0417 7", use: "\u041C\u0435\u0442\u0430, \u043B\u0435\u0439\u0431\u043B\u044B" },
    { name: "text/button", size: 16, lineHeight: 24, weight: 600, sample: "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044E", use: "\u041A\u043D\u043E\u043F\u043A\u0438" },
    { name: "text/mono", size: 14, lineHeight: 20, weight: 400, mono: true, sample: "A7X9-Q2", use: "\u041A\u043E\u0434\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u0430" }
  ];
  var SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96];
  var RADII = [
    ["radius/xs", 4],
    ["radius/sm", 8],
    ["radius/md", 12],
    ["radius/lg", 16],
    ["radius/xl", 24],
    ["radius/full", 9999]
  ];
  var SHADOWS = [
    ["shadow/sm", { x: 0, y: 1, b: 2, op: 0.05 }],
    ["shadow/md", { x: 0, y: 4, b: 12, op: 0.08 }],
    ["shadow/lg", { x: 0, y: 12, b: 32, op: 0.12 }]
  ];
  var C = {
    WHITE: "#FFFFFF",
    BG2: "#F7F8FA",
    BG3: "#EEF0F4",
    INK: "#0F172A",
    INK2: "#475569",
    INK3: "#94A3B8",
    BD: "#E2E8F0",
    ACCENT: "#2563EB",
    ACCENT_HOVER: "#1D4ED8",
    ACCENT_ACTIVE: "#1E40AF",
    ACCENT2: "#7C3AED",
    SUCCESS: "#16A34A",
    WARNING: "#F59E0B",
    ERROR: "#DC2626",
    ERROR_HOVER: "#B91C1C",
    ERROR_ACTIVE: "#991B1B",
    INFO: "#0EA5E9",
    // тёмная тема
    D_BG: "#0B1220",
    D_BG2: "#111827",
    D_INK: "#F8FAFC",
    D_INK2: "#CBD5E1",
    D_BD: "#1F2937"
  };

  // src/icons.ts
  var ICONS = {
    "check": '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20 6 9 17l-5-5" /> </svg>',
    "minus": '<svg class="lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> </svg>',
    "x": '<svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </svg>',
    "chevron-down": '<svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m6 9 6 6 6-6" /> </svg>',
    "chevron-up": '<svg class="lucide lucide-chevron-up" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m18 15-6-6-6 6" /> </svg>',
    "chevron-left": '<svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m15 18-6-6 6-6" /> </svg>',
    "chevron-right": '<svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m9 18 6-6-6-6" /> </svg>',
    "search": '<svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg>',
    "plus": '<svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="M12 5v14" /> </svg>',
    "user": '<svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" /> </svg>',
    "users": '<svg class="lucide lucide-users" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" /> </svg>',
    "info": '<svg class="lucide lucide-info" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" /> </svg>',
    "triangle-alert": '<svg class="lucide lucide-triangle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /> <path d="M12 9v4" /> <path d="M12 17h.01" /> </svg>',
    "circle-check": '<svg class="lucide lucide-circle-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m9 12 2 2 4-4" /> </svg>',
    "circle-x": '<svg class="lucide lucide-circle-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="m9 9 6 6" /> </svg>',
    "eye": '<svg class="lucide lucide-eye" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" /> </svg>',
    "eye-off": '<svg class="lucide lucide-eye-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /> <path d="m2 2 20 20" /> </svg>',
    "loader-circle": '<svg class="lucide lucide-loader-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21 12a9 9 0 1 1-6.219-8.56" /> </svg>',
    "heart": '<svg class="lucide lucide-heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /> </svg>',
    "brain": '<svg class="lucide lucide-brain" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 18V5" /> <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" /> <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" /> <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" /> <path d="M18 18a4 4 0 0 0 2-7.464" /> <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" /> <path d="M6 18a4 4 0 0 1-2-7.464" /> <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /> </svg>',
    "timer": '<svg class="lucide lucide-timer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <line x1="10" x2="14" y1="2" y2="2" /> <line x1="12" x2="15" y1="14" y2="11" /> <circle cx="12" cy="14" r="8" /> </svg>',
    "clock": '<svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 6v6l4 2" /> <circle cx="12" cy="12" r="10" /> </svg>',
    "play": '<svg class="lucide lucide-play" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /> </svg>',
    "pause": '<svg class="lucide lucide-pause" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect x="14" y="3" width="5" height="18" rx="1" /> <rect x="5" y="3" width="5" height="18" rx="1" /> </svg>',
    "star": '<svg class="lucide lucide-star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /> </svg>',
    "trophy": '<svg class="lucide lucide-trophy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" /> <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" /> <path d="M18 9h1.5a1 1 0 0 0 0-5H18" /> <path d="M4 22h16" /> <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /> <path d="M6 9H4.5a1 1 0 0 1 0-5H6" /> </svg>',
    "shield-check": '<svg class="lucide lucide-shield-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> <path d="m9 12 2 2 4-4" /> </svg>',
    "graduation-cap": '<svg class="lucide lucide-graduation-cap" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /> <path d="M22 10v6" /> <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /> </svg>',
    "fingerprint": '<svg class="lucide lucide-fingerprint" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /> <path d="M14 13.12c0 2.38 0 6.38-1 8.88" /> <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /> <path d="M2 12a10 10 0 0 1 18-6" /> <path d="M2 16h.01" /> <path d="M21.8 16c.2-2 .131-5.354 0-6" /> <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" /> <path d="M8.65 22c.21-.66.45-1.32.57-2" /> <path d="M9 6.8a6 6 0 0 1 9 5.2v2" /> </svg>',
    "qr-code": '<svg class="lucide lucide-qr-code" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="5" height="5" x="3" y="3" rx="1" /> <rect width="5" height="5" x="16" y="3" rx="1" /> <rect width="5" height="5" x="3" y="16" rx="1" /> <path d="M21 16h-3a2 2 0 0 0-2 2v3" /> <path d="M21 21v.01" /> <path d="M12 7v3a2 2 0 0 1-2 2H7" /> <path d="M3 12h.01" /> <path d="M12 3h.01" /> <path d="M12 16v.01" /> <path d="M16 12h1" /> <path d="M21 12v.01" /> <path d="M12 21v-1" /> </svg>',
    "link-2": '<svg class="lucide lucide-link-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M9 17H7A5 5 0 0 1 7 7h2" /> <path d="M15 7h2a5 5 0 1 1 0 10h-2" /> <line x1="8" x2="16" y1="12" y2="12" /> </svg>',
    "copy": '<svg class="lucide lucide-copy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /> </svg>',
    "external-link": '<svg class="lucide lucide-external-link" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /> </svg>',
    "sparkles": '<svg class="lucide lucide-sparkles" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" /> </svg>',
    "message-circle": '<svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /> </svg>',
    "inbox": '<svg class="lucide lucide-inbox" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /> <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /> </svg>',
    "smartphone": '<svg class="lucide lucide-smartphone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /> <path d="M12 18h.01" /> </svg>',
    "home": '<svg class="lucide lucide-home" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> </svg>',
    "chart-column": '<svg class="lucide lucide-chart-column" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" /> <path d="M13 17V5" /> <path d="M8 17v-3" /> </svg>',
    "calendar": '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" /> </svg>',
    "book-open": '<svg class="lucide lucide-book-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 7v14" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /> </svg>',
    "target": '<svg class="lucide lucide-target" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="6" /> <circle cx="12" cy="12" r="2" /> </svg>',
    "smile": '<svg class="lucide lucide-smile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M8 14s1.5 2 4 2 4-2 4-2" /> <line x1="9" x2="9.01" y1="9" y2="9" /> <line x1="15" x2="15.01" y1="9" y2="9" /> </svg>',
    "frown": '<svg class="lucide lucide-frown" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M16 16s-1.5-2-4-2-4 2-4 2" /> <line x1="9" x2="9.01" y1="9" y2="9" /> <line x1="15" x2="15.01" y1="9" y2="9" /> </svg>',
    "meh": '<svg class="lucide lucide-meh" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <line x1="8" x2="16" y1="15" y2="15" /> <line x1="9" x2="9.01" y1="9" y2="9" /> <line x1="15" x2="15.01" y1="9" y2="9" /> </svg>',
    "scale": '<svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /> <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /> <path d="M7 21h10" /> <path d="M12 3v18" /> <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /> </svg>',
    "zap": '<svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /> </svg>',
    "alert-octagon": '<svg class="lucide lucide-alert-octagon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 16h.01" /> <path d="M12 8v4" /> <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" /> </svg>',
    "file-text": '<svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" /> </svg>',
    "send": '<svg class="lucide lucide-send" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" /> </svg>',
    "key-round": '<svg class="lucide lucide-key-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /> <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /> </svg>',
    "badge-check": '<svg class="lucide lucide-badge-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="m9 12 2 2 4-4" /> </svg>',
    "settings": '<svg class="lucide lucide-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /> <circle cx="12" cy="12" r="3" /> </svg>',
    "lock": '<svg class="lucide lucide-lock" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>',
    "sliders-horizontal": '<svg class="lucide lucide-sliders-horizontal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 5H3" /> <path d="M12 19H3" /> <path d="M14 3v4" /> <path d="M16 17v4" /> <path d="M21 12h-9" /> <path d="M21 19h-5" /> <path d="M21 5h-7" /> <path d="M8 10v4" /> <path d="M8 12H3" /> </svg>',
    "share-2": '<svg class="lucide lucide-share-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="18" cy="5" r="3" /> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="19" r="3" /> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /> </svg>',
    "download": '<svg class="lucide lucide-download" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 15V3" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> <path d="m7 10 5 5 5-5" /> </svg>',
    "rotate-ccw": '<svg class="lucide lucide-rotate-ccw" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /> <path d="M3 3v5h5" /> </svg>',
    "arrow-right": '<svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>'
  };

  // src/draw.ts
  var ORIGIN = { x: 0, y: 0 };
  function setOrigin(x, y) {
    ORIGIN.x = x;
    ORIGIN.y = y;
  }
  function getOrigin() {
    return ORIGIN;
  }
  var FONT_FALLBACKS = ["Inter", "Work Sans", "Source Sans Pro", "Roboto", "DejaVu Sans"];
  var MONO_FALLBACKS = ["JetBrains Mono", "IBM Plex Mono", "Roboto Mono", "Source Code Pro", "Courier New"];
  function pickFont(names) {
    for (const n of names) {
      try {
        const f = penpot.fonts.findByName(n);
        if (f) return f;
      } catch (_) {
      }
    }
    return null;
  }
  function nameToWeight(name) {
    const n = String(name || "").toLowerCase();
    const digits = n.match(/(\d{3})/);
    if (digits) return parseInt(digits[1], 10);
    const map = [
      ["thin", 100],
      ["extralight", 200],
      ["light", 300],
      ["regular", 400],
      ["normal", 400],
      ["medium", 500],
      ["semibold", 600],
      ["demibold", 600],
      ["bold", 700],
      ["extrabold", 800],
      ["heavy", 800],
      ["black", 900]
    ];
    for (const [k, v] of map) if (n.indexOf(k) !== -1) return v;
    return 400;
  }
  function variantForWeight(font, weight) {
    const variants = font.variants || [];
    if (!variants.length) return null;
    let best = variants[0];
    let bestDiff = Infinity;
    for (const v of variants) {
      const w = typeof v.fontWeight !== "undefined" ? Number(v.fontWeight) : nameToWeight(v.name);
      const d = Math.abs(w - weight);
      if (d < bestDiff) {
        best = v;
        bestDiff = d;
      }
    }
    return best;
  }
  var CURRENT_BAG = null;
  function startBag() {
    CURRENT_BAG = [];
    return CURRENT_BAG;
  }
  function endBag() {
    const b = CURRENT_BAG || [];
    CURRENT_BAG = null;
    return b;
  }
  function track(shape) {
    if (CURRENT_BAG) CURRENT_BAG.push(shape);
  }
  function makeText(parent, x, y, content, opts = {}) {
    const t = penpot.createText(String(content));
    if (!t) return null;
    parent.appendChild(t);
    t.x = x + ORIGIN.x;
    t.y = y + ORIGIN.y;
    try {
      t.growType = "auto-width";
    } catch (_) {
    }
    try {
      t.fontSize = String(opts.size != null ? opts.size : 14);
    } catch (_) {
    }
    try {
      t.fontWeight = String(opts.weight != null ? opts.weight : 400);
    } catch (_) {
    }
    if (opts.font) {
      try {
        t.fontFamily = opts.font.name;
      } catch (_) {
      }
      try {
        const v = variantForWeight(opts.font, opts.weight != null ? opts.weight : 400);
        if (v) t.fontVariantId = v.fontVariantId;
      } catch (_) {
      }
    }
    try {
      t.fills = [{ fillColor: opts.color || "#0F172A", fillOpacity: 1 }];
    } catch (_) {
    }
    track(t);
    return t;
  }
  function centerTextIn(t, x, w) {
    try {
      if (t && typeof t.width === "number" && isFinite(t.width) && t.width > 0) {
        t.x = x + (w - t.width) / 2;
      }
    } catch (_) {
    }
  }
  function makeRect(parent, x, y, w, h, fill, radius) {
    const r = penpot.createRectangle();
    parent.appendChild(r);
    r.x = x + ORIGIN.x;
    r.y = y + ORIGIN.y;
    r.resize(w, h);
    if (fill) {
      try {
        r.fills = [{ fillColor: fill, fillOpacity: 1 }];
      } catch (_) {
      }
    } else {
      try {
        r.fills = [];
      } catch (_) {
      }
    }
    try {
      r.cornerRadius = radius > 48 ? Math.min(radius, h / 2) : radius;
    } catch (_) {
    }
    track(r);
    return r;
  }
  function makeEllipse(parent, x, y, w, h, fill) {
    const e = penpot.createEllipse();
    parent.appendChild(e);
    e.x = x + ORIGIN.x;
    e.y = y + ORIGIN.y;
    e.resize(w, h);
    if (fill) {
      try {
        e.fills = [{ fillColor: fill, fillOpacity: 1 }];
      } catch (_) {
      }
    } else {
      try {
        e.fills = [];
      } catch (_) {
      }
    }
    track(e);
    return e;
  }
  function setStroke(shape, color, width, alignment = "inner") {
    try {
      shape.strokes = [{
        strokeColor: color,
        strokeOpacity: 1,
        strokeWidth: width,
        strokeAlignment: alignment,
        strokeStyle: "solid"
      }];
    } catch (_) {
    }
  }
  function setShadow(shape, x, y, blur, opacity) {
    try {
      shape.effects = [{
        style: "drop-shadow",
        offsetX: x,
        offsetY: y,
        blur,
        spread: 0,
        color: { color: "#000000", opacity }
      }];
    } catch (_) {
    }
  }
  function icon(parent, name, x, y, size, color) {
    let svg = ICONS[name];
    if (!svg) return null;
    svg = svg.split('stroke="currentColor"').join('stroke="' + color + '"');
    svg = svg.replace(/width="24"/, 'width="' + size + '"').replace(/height="24"/, 'height="' + size + '"');
    let g = null;
    try {
      g = penpot.createShapeFromSvg(svg);
    } catch (_) {
      g = null;
    }
    if (!g) return null;
    parent.appendChild(g);
    g.x = x + ORIGIN.x;
    g.y = y + ORIGIN.y;
    try {
      g.resize(size, size);
    } catch (_) {
    }
    try {
      g.name = "icon/" + name;
    } catch (_) {
    }
    track(g);
    return g;
  }
  function sectionTitle(board, x, y, title, subtitle) {
    makeText(board, x, y, title, { size: 24, weight: 600, color: "#0F172A" });
    if (subtitle) makeText(board, x, y + 34, subtitle, { size: 13, weight: 400, color: "#475569" });
    return y + (subtitle ? 70 : 48);
  }
  function caption(parent, x, y, text) {
    return makeText(parent, x, y, text, { size: 10, weight: 400, color: "#94A3B8" });
  }
  function removeShapesByName(page, name) {
    let removed = 0;
    try {
      const shapes = page.findShapes({ name }) || [];
      for (const s of shapes) {
        try {
          s.remove();
          removed++;
        } catch (_) {
        }
      }
    } catch (_) {
    }
    return removed;
  }
  function registerComponent(shapes, name, existing, log) {
    if (!shapes.length) return;
    if (existing.has(name)) return;
    try {
      const comp = penpot.library.local.createComponent(shapes);
      try {
        comp.name = name;
      } catch (_) {
      }
      existing.add(name);
    } catch (e) {
      log.push("\xD7 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 " + name + ": " + e);
    }
  }

  // src/foundations.ts
  function createColorStyles(log) {
    const lib = penpot.library.local;
    const existing = /* @__PURE__ */ new Map();
    for (const c of lib.colors) existing.set(c.name, c);
    let count = 0;
    const all = LIGHT_COLORS.concat(DARK_COLORS);
    for (const t of all) {
      try {
        let style = existing.get(t.name);
        if (!style) {
          style = lib.createColor();
          style.name = t.name;
        }
        style.color = t.value;
        style.opacity = 1;
        existing.set(t.name, style);
        count++;
      } catch (e) {
        log.push("\xD7 \u0446\u0432\u0435\u0442 " + t.name + ": " + e);
      }
    }
    return count;
  }
  function createTextStyles(log) {
    const font = pickFont(FONT_FALLBACKS);
    if (!font) {
      log.push("\xD7 \u0428\u0440\u0438\u0444\u0442 Inter \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 Penpot. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 Inter (Fonts) \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D.");
      return 0;
    }
    const mono = pickFont(MONO_FALLBACKS);
    const lib = penpot.library.local;
    const existing = /* @__PURE__ */ new Map();
    for (const t of lib.typographies) existing.set(t.name, t);
    let count = 0;
    for (const spec of TYPE_STYLES) {
      try {
        const fam = spec.mono ? mono || font : font;
        const variant = variantForWeight(fam, spec.weight);
        let style = existing.get(spec.name);
        if (!style) {
          style = lib.createTypography();
          style.name = spec.name;
        }
        style.fontFamily = fam.name;
        try {
          style.fontId = fam.fontId || fam.id;
        } catch (_) {
        }
        if (variant) {
          try {
            style.fontVariantId = variant.fontVariantId;
          } catch (_) {
          }
        }
        style.fontSize = String(spec.size);
        style.fontWeight = String(spec.weight);
        style.lineHeight = String(spec.lineHeight);
        style.letterSpacing = "0";
        existing.set(spec.name, style);
        count++;
      } catch (e) {
        log.push("\xD7 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u0442\u0438\u043B\u044C " + spec.name + ": " + e);
      }
    }
    return count;
  }
  function swatchGrid(board, x0, y0, tokens, perRow, font) {
    const cellW = 132;
    const sw = 64;
    tokens.forEach((t, i) => {
      const cx = x0 + i % perRow * cellW;
      const cy = y0 + Math.floor(i / perRow) * 118;
      makeRect(board, cx, cy, sw, sw, t.value, 8).name = "swatch " + t.name;
      makeText(board, cx, cy + sw + 6, t.name.replace("color/", ""), { size: 10, weight: 600, color: C.INK, font });
      makeText(board, cx, cy + sw + 22, t.value, { size: 10, weight: 400, color: C.INK2, font });
    });
  }
  function buildFoundationsBoard(colorsCreated, textOk, problems, font) {
    const board = penpot.createBoard();
    board.name = "01_Foundations / audit";
    board.x = 100;
    board.y = 100;
    setOrigin(board.x, board.y);
    try {
      board.resize(1240, 400);
    } catch (_) {
    }
    try {
      board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }];
    } catch (_) {
    }
    setStroke(board, C.BD, 1, "inner");
    const M3 = 48;
    let y = M3;
    makeText(board, M3, y, "Platform \u2014 Foundations audit", { size: 40, weight: 700, color: C.INK, font });
    y += 56;
    makeText(
      board,
      M3,
      y,
      "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u043C Platform Builder v0.2 \xB7 \u0422\u0417 \u043D\u0430 \u0434\u0438\u0437\u0430\u0439\u043D-\u043C\u0430\u043A\u0435\u0442\u044B v1.0 \xB7 \u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 1",
      { size: 13, weight: 400, color: C.INK2, font }
    );
    y += 96;
    y = sectionTitle(board, M3, y, "\u0426\u0432\u0435\u0442\u0430 \u2014 \u0441\u0432\u0435\u0442\u043B\u0430\u044F \u0442\u0435\u043C\u0430", "28 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u0441\u043E\u0437\u0434\u0430\u043D\u044B \u043A\u0430\u043A color styles (\u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 Assets)");
    swatchGrid(board, M3, y, LIGHT_COLORS, 7, font);
    y += Math.ceil(LIGHT_COLORS.length / 7) * 118 + 40;
    y = sectionTitle(
      board,
      M3,
      y,
      "\u0426\u0432\u0435\u0442\u0430 \u2014 \u0442\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430 (Mini App, \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B)",
      "\u0410\u043A\u0446\u0435\u043D\u0442\u044B \u0438 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u2014 \u0442\u0435 \u0436\u0435, \u0447\u0442\u043E \u0432 \u0441\u0432\u0435\u0442\u043B\u043E\u0439 \u0442\u0435\u043C\u0435"
    );
    swatchGrid(board, M3, y, DARK_COLORS, 7, font);
    y += Math.ceil(DARK_COLORS.length / 7) * 118 + 40;
    y = sectionTitle(board, M3, y, "\u0422\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0430", "10 text styles \xB7 " + (font ? font.name : "\u0448\u0440\u0438\u0444\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"));
    const sampleX = 380;
    TYPE_STYLES.forEach((spec) => {
      makeText(board, M3, y + 4, spec.name, { size: 12, weight: 600, color: C.ACCENT, font });
      makeText(
        board,
        M3,
        y + 22,
        spec.size + "/" + spec.lineHeight + " \xB7 " + spec.weight + " \xB7 " + spec.use,
        { size: 11, weight: 400, color: C.INK3, font }
      );
      makeText(board, sampleX, y, spec.sample, { size: spec.size, weight: spec.weight, color: C.INK, font });
      y += Math.max(spec.lineHeight, 28) + 24;
    });
    y += 40;
    y = sectionTitle(board, M3, y, "Spacing (\u0448\u043A\u0430\u043B\u0430 4px)", "space/1 \u2026 space/9");
    SPACE.forEach((s, i) => {
      makeText(board, M3, y + 2, "space/" + (i + 1), { size: 12, weight: 500, color: C.INK2, font });
      makeRect(board, M3 + 100, y, s, 16, C.BG3, 2);
      makeText(board, M3 + 110 + s, y + 2, String(s) + "px", { size: 11, weight: 400, color: C.INK3, font });
      y += 28;
    });
    y += 40;
    y = sectionTitle(board, M3, y, "\u0420\u0430\u0434\u0438\u0443\u0441\u044B", "6 \u0442\u043E\u043A\u0435\u043D\u043E\u0432");
    RADII.forEach((r, i) => {
      const cx = M3 + i * 120;
      const rect2 = makeRect(board, cx, y, 64, 64, C.BG2, Math.min(r[1], 32));
      setStroke(rect2, C.BD, 1, "inner");
      rect2.name = "radius " + r[0];
      makeText(board, cx, y + 72, r[0].replace("radius/", ""), { size: 11, weight: 500, color: C.INK2, font });
      makeText(board, cx, y + 88, r[1] === 9999 ? "full" : r[1] + "px", { size: 10, weight: 400, color: C.INK3, font });
    });
    y += 130;
    y = sectionTitle(board, M3, y, "\u0422\u0435\u043D\u0438", "3 \u0442\u043E\u043A\u0435\u043D\u0430 \xB7 drop-shadow");
    SHADOWS.forEach((s, i) => {
      const cx = M3 + i * 160;
      const card2 = makeRect(board, cx, y, 112, 72, C.WHITE, 12);
      setShadow(card2, s[1].x, s[1].y, s[1].b, s[1].op);
      card2.name = "shadow " + s[0];
      makeText(board, cx, y + 80, s[0], { size: 11, weight: 500, color: C.INK2, font });
      makeText(
        board,
        cx,
        y + 96,
        s[1].x + " " + s[1].y + " " + s[1].b + "px \xB7 " + Math.round(s[1].op * 100) + "%",
        { size: 10, weight: 400, color: C.INK3, font }
      );
    });
    y += 150;
    y = sectionTitle(board, M3, y, "\u0421\u0435\u0442\u043A\u0438 \u0438 \u0444\u0440\u0435\u0439\u043C\u044B", "\u0422\u0417 \u0440\u0430\u0437\u0434\u0435\u043B 2.3 \xB7 \u0432\u0441\u0435 \u044D\u043A\u0440\u0430\u043D\u044B \u0432 3 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430\u0445, TMA \u2014 \u0442\u043E\u043B\u044C\u043A\u043E 390");
    const gridLines = [
      "Desktop 1440 \xB7 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 1200 \xB7 12 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \xB7 gutter 24 \xB7 margin 120 \xB7 \u0431\u0440\u0435\u0439\u043A\u043F\u043E\u0438\u043D\u0442\u044B 1440/1280/1024",
      "Tablet 768 \xB7 8 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \xB7 gutter 16 \xB7 margin 32",
      "Mobile web 390 (iPhone 14) \xB7 4 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 \xB7 gutter 16 \xB7 margin 16",
      "Telegram Mini App 390 \xB7 \u043F\u043E\u043C\u0435\u0442\u043A\u0430 \xABTMA\xBB \xB7 safe area: \u0441\u0432\u0435\u0440\u0445\u0443 ~56 (\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A TG), \u0441\u043D\u0438\u0437\u0443 ~80 (MainButton)"
    ];
    gridLines.forEach((line2) => {
      makeText(board, M3, y, line2, { size: 13, weight: 400, color: C.INK, font });
      y += 24;
    });
    y += 40;
    y = sectionTitle(board, M3, y, "\u0418\u0442\u043E\u0433 \u0437\u0430\u043F\u0443\u0441\u043A\u0430", "");
    const summary = [
      "\u2713 \u0426\u0432\u0435\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439 \u0441\u043E\u0437\u0434\u0430\u043D\u043E/\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: " + colorsCreated + " \u0438\u0437 " + (LIGHT_COLORS.length + DARK_COLORS.length),
      "\u2713 \u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439 \u0441\u043E\u0437\u0434\u0430\u043D\u043E/\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: " + textOk + " \u0438\u0437 " + TYPE_STYLES.length
    ];
    summary.forEach((line2) => {
      makeText(board, M3, y, line2, { size: 13, weight: 500, color: C.SUCCESS, font });
      y += 22;
    });
    if (problems.length) {
      problems.forEach((p) => {
        makeText(board, M3, y, p, { size: 12, weight: 400, color: C.ERROR, font });
        y += 20;
      });
    }
    y += 48;
    try {
      board.resize(1240, y);
    } catch (_) {
    }
  }

  // src/uikit.ts
  var BOARD_NAME = "02_Components / UI-kit";
  var M = 48;
  var CW = 1240;
  var SIZES = {
    sm: { h: 32, fs: 13, pl: 14, lh: 18 },
    md: { h: 40, fs: 14, pl: 16, lh: 20 },
    lg: { h: 48, fs: 16, pl: 20, lh: 24 }
  };
  var VARIANTS = {
    primary: { label: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", bg: C.ACCENT, hover: C.ACCENT_HOVER, active: C.ACCENT_ACTIVE, fg: "#FFFFFF", border: null },
    secondary: { label: "\u0412\u0442\u043E\u0440\u0438\u0447\u043D\u0430\u044F", bg: C.BG2, hover: C.BG3, active: C.BD, fg: C.INK, border: C.BD },
    ghost: { label: "\u041E\u0442\u043C\u0435\u043D\u0430", bg: null, hover: C.BG3, active: C.BD, fg: C.ACCENT, border: null },
    danger: { label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", bg: C.ERROR, hover: C.ERROR_HOVER, active: C.ERROR_ACTIVE, fg: "#FFFFFF", border: null },
    link: { label: "\u0421\u0441\u044B\u043B\u043A\u0430", bg: null, hover: null, active: null, fg: C.ACCENT, border: null }
  };
  var STATES = ["default", "hover", "active", "focus", "disabled", "loading"];
  function drawButton(board, x, y, sizeKey, variantKey, state, font) {
    const s = SIZES[sizeKey];
    const v = VARIANTS[variantKey];
    const tw = Math.round(v.label.length * s.fs * 0.62);
    let w = s.pl * 2 + tw;
    const loadingIconW = state === "loading" ? 12 + 8 : 0;
    if (state === "loading") w = s.pl + loadingIconW + tw + s.pl;
    if (state === "focus") {
      const ring = makeRect(board, x - 3, y - 3, w + 6, s.h + 6, null, s.h / 2 + 3);
      setStroke(ring, C.ACCENT, 2, "outer");
      ring.name = "focus-ring";
    }
    let bg = v.bg;
    if (state === "hover") bg = v.hover || v.bg;
    if (state === "active") bg = v.active || v.hover || v.bg;
    if (state === "disabled") bg = C.BG3;
    if (state === "loading" && bg) {
      const r = makeRect(board, x, y, w, s.h, bg, s.h / 2);
      try {
        r.fills = [{ fillColor: bg, fillOpacity: 0.55 }];
      } catch (_) {
      }
    } else {
      const r = makeRect(board, x, y, w, s.h, bg, s.h / 2);
      if (v.border && state !== "disabled") setStroke(r, v.border, 1, "inner");
      if (state === "disabled" && !bg) setStroke(r, C.BD, 1, "inner");
      r.name = "Button / " + variantKey + " / " + state;
    }
    if (variantKey === "link" && (state === "hover" || state === "active")) {
      makeRect(board, x + (w - tw) / 2, y + s.h / 2 + s.lh / 2 + 1, tw, 1.5, v.fg, 1);
    }
    let labelX = x + (w - tw) / 2;
    if (state === "loading") {
      const sp = makeEllipse(board, x + s.pl, y + (s.h - 12) / 2, 12, 12, null);
      setStroke(sp, v.fg, 2, "inner");
      labelX = x + s.pl + loadingIconW;
    }
    const fg = state === "disabled" ? C.INK3 : v.fg;
    const t = makeText(board, labelX, y + (s.h - s.lh) / 2, v.label, { size: s.fs, weight: 600, color: fg, font });
    centerTextIn(t, x, w);
    return w;
  }
  function drawIconButton(board, x, y, sizeKey, iconName, state, font) {
    const s = SIZES[sizeKey];
    if (state === "focus") {
      const ring = makeRect(board, x - 3, y - 3, s.h + 6, s.h + 6, null, s.h / 2 + 3);
      setStroke(ring, C.ACCENT, 2, "outer");
    }
    const bg = state === "hover" ? C.ACCENT_HOVER : state === "disabled" ? C.BG3 : C.ACCENT;
    const r = makeRect(board, x, y, s.h, s.h, bg, s.h / 2);
    r.name = "IconButton / " + sizeKey + " / " + state;
    const fgColor = state === "disabled" ? C.INK3 : "#FFFFFF";
    icon(board, iconName, x + (s.h - 16) / 2, y + (s.h - 16) / 2, 16, fgColor);
    return s.h;
  }
  function drawInput(board, x, y, kind, state, font) {
    const w = 280;
    const h = kind === "textarea" ? 96 : 40;
    const label = kind === "email" ? "Email" : kind === "search" ? "\u041F\u043E\u0438\u0441\u043A" : kind === "textarea" ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" : "\u0418\u043C\u044F";
    const placeholder = kind === "email" ? "name@example.com" : kind === "search" ? "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0438\u043B\u0438 \u043D\u0430\u0432\u044B\u043A\u2026" : kind === "textarea" ? "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044E\u2026" : "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432";
    makeText(board, x, y, label, { size: 12, weight: 500, color: C.INK2, font });
    const fy = y + 24;
    if (state === "focus") {
      const ring = makeRect(board, x - 3, fy - 3, w + 6, h + 6, null, 11);
      setStroke(ring, C.ACCENT, 2, "outer");
      ring.name = "focus-ring";
    }
    const field = makeRect(board, x, fy, w, h, state === "disabled" ? C.BG3 : C.WHITE, 8);
    const isErr = state === "error";
    if (isErr) setStroke(field, C.ERROR, 1, "inner");
    else if (state === "focus") setStroke(field, C.ACCENT, 2, "inner");
    else if (state !== "disabled") setStroke(field, C.BD, 1, "inner");
    field.name = "Input / " + kind + " / " + state;
    const textY = kind === "textarea" ? fy + 10 : fy + (h - 20) / 2;
    let textX = x + 12;
    if (kind === "search") {
      icon(board, "search", x + 12, fy + (h - 16) / 2, 16, C.INK3);
      textX = x + 36;
    }
    if (kind === "textarea") icon(board, "eye", x + w - 28, fy + h - 26, 16, C.INK3);
    const hasValue = state === "filled";
    makeText(
      board,
      textX,
      textY,
      hasValue ? placeholder : placeholder,
      { size: 14, weight: 400, color: hasValue ? C.INK : C.INK3, font }
    );
    if (isErr) {
      icon(board, "circle-x", x + w - 28, fy + (h - 16) / 2, 16, C.ERROR);
      makeText(board, x, fy + h + 6, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email", { size: 12, weight: 400, color: C.ERROR, font });
    } else {
      makeText(board, x, fy + h + 6, "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u043F\u043E\u0434 \u043F\u043E\u043B\u0435\u043C", { size: 12, weight: 400, color: C.INK3, font });
    }
    return 24 + h + 26;
  }
  function drawSelect(board, x, y, state, font) {
    const w = 280;
    const h = state === "multi" ? 48 : 40;
    makeText(board, x, y, "\u0427\u0430\u0441\u0442\u043E\u0442\u0430 \u0441\u0435\u0441\u0441\u0438\u0439", { size: 12, weight: 500, color: C.INK2, font });
    const fy = y + 24;
    const field = makeRect(board, x, fy, w, h, C.WHITE, 8);
    setStroke(field, C.BD, 1, "inner");
    field.name = "Select / " + state;
    if (state === "multi") {
      chipInline(board, x + 10, fy + 10, "\u0422\u0440\u0435\u0432\u043E\u0436\u043D\u043E\u0441\u0442\u044C", font);
      chipInline(board, x + 112, fy + 10, "\u0412\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435", font);
      icon(board, "chevron-down", x + w - 28, fy + (h - 16) / 2, 16, C.INK2);
      return 24 + h + 8;
    }
    makeText(board, x + 12, fy + (h - 20) / 2, "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E", { size: 14, weight: 400, color: C.INK, font });
    icon(board, "chevron-down", x + w - 28, fy + (h - 16) / 2, 16, C.INK2);
    if (state === "open") {
      const mh = 3 * 40 + 8;
      const menu = makeRect(board, x, fy + h + 6, w, mh, C.WHITE, 8);
      setStroke(menu, C.BD, 1, "inner");
      setShadow(menu, 0, 4, 12, 0.08);
      menu.name = "Select / open / menu";
      const opts = ["\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E", "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E", "\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E"];
      opts.forEach((o, i) => {
        const oy = fy + h + 6 + 4 + i * 40;
        if (i === 1) makeRect(board, x + 4, oy, w - 8, 36, C.BG2, 6);
        makeText(board, x + 14, oy + 8, o, { size: 14, weight: 400, color: C.INK, font });
        if (i === 1) icon(board, "check", x + w - 30, oy + 10, 16, C.ACCENT);
      });
      return 24 + h + 6 + mh + 8;
    }
    return 24 + h + 8;
  }
  function chipInline(board, x, y, label, font) {
    const w = Math.round(label.length * 6.6) + 20;
    const ch = makeRect(board, x, y, w, 26, C.BG3, 13);
    ch.name = "chip-inline";
    makeText(board, x + 10, y + 5, label, { size: 12, weight: 500, color: C.INK2, font });
    return w;
  }
  function drawCheckbox(board, x, y, state, font) {
    if (state === "focus") {
      const ring = makeRect(board, x - 3, y - 3, 26, 26, null, 9);
      setStroke(ring, C.ACCENT, 2, "outer");
    }
    const box = makeRect(board, x, y, 20, 20, state === "disabled" ? C.BG3 : C.WHITE, 6);
    setStroke(box, state === "focus" || state === "checked" || state === "indeterminate" ? C.ACCENT : C.BD, state === "focus" ? 2 : 1, "inner");
    if (state === "checked" || state === "indeterminate") {
      try {
        box.fills = [{ fillColor: C.ACCENT, fillOpacity: 1 }];
      } catch (_) {
      }
      icon(
        board,
        state === "checked" ? "check" : "minus",
        x + 3,
        y + 3,
        14,
        state === "disabled" ? C.INK3 : "#FFFFFF"
      );
    }
    box.name = "Checkbox / " + state;
    makeText(board, x + 30, y + 1, "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438", { size: 14, weight: 400, color: state === "disabled" ? C.INK3 : C.INK, font });
  }
  function drawRadio(board, x, y, state, font) {
    const fill = state === "disabled" ? C.BG3 : C.WHITE;
    const ring = makeEllipse(board, x, y, 20, 20, fill);
    setStroke(ring, state === "checked" ? C.ACCENT : C.BD, 2, "inner");
    if (state === "checked") {
      makeEllipse(board, x + 5, y + 5, 10, 10, C.ACCENT);
    }
    ring.name = "Radio / " + state;
    makeText(board, x + 30, y + 1, "\u0412\u0430\u0440\u0438\u0430\u043D\u0442", { size: 14, weight: 400, color: state === "disabled" ? C.INK3 : C.INK, font });
  }
  function drawSwitch(board, x, y, on, disabled, font) {
    const track2 = makeRect(board, x, y, 44, 24, disabled ? C.BG3 : on ? C.ACCENT : C.BD, 12);
    if (disabled) setStroke(track2, C.BD, 1, "inner");
    const knob = makeEllipse(board, x + (on ? 23 : 3), y + 3, 18, 18, C.WHITE);
    setShadow(knob, 0, 1, 2, 0.1);
    track2.name = "Switch / " + (on ? "on" : "off") + (disabled ? " / disabled" : "");
    makeText(
      board,
      x + 56,
      y + 3,
      on ? "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B" : "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u044B",
      { size: 14, weight: 400, color: disabled ? C.INK3 : C.INK, font }
    );
  }
  var CHIP_TINTS = {
    neutral: { bg: C.BG2, fg: C.INK2 },
    info: { bg: "#E0F2FE", fg: "#0C4A6E" },
    success: { bg: "#DCFCE7", fg: "#166534" },
    warning: { bg: "#FEF3C7", fg: "#92400E" },
    error: { bg: "#FEE2E2", fg: "#991B1B" }
  };
  function drawChip(board, x, y, label, variant, size, font, skillColor) {
    const h = size === "sm" ? 24 : 28;
    const fs = size === "sm" ? 11 : 12;
    const tints = CHIP_TINTS[variant] || CHIP_TINTS.neutral;
    let textX = x + 10;
    let w = Math.round(label.length * fs * 0.62) + 20;
    if (variant === "skill" && skillColor) {
      w += 16;
      makeEllipse(board, x + 10, y + h / 2 - 4, 8, 8, skillColor);
      textX = x + 24;
    }
    const ch = makeRect(board, x, y, w, h, tints.bg, h / 2);
    if (variant === "neutral" || variant === "skill") setStroke(ch, C.BD, 1, "inner");
    ch.name = "Chip / " + variant + " / " + size;
    makeText(board, textX, y + (h - fs - 4) / 2 + 1, label, { size: fs, weight: 500, color: tints.fg, font });
    return w;
  }
  function drawAvatar(board, x, y, size, type, font) {
    if (type === "initials") {
      const a = makeEllipse(board, x, y, size, size, C.ACCENT2);
      a.name = "Avatar / " + type + " / " + size;
      const fs = Math.round(size * 0.36);
      const t = makeText(board, x + size / 2 - fs * 0.6, y + size / 2 - fs * 0.65, "\u0410\u041A", { size: fs, weight: 600, color: "#FFFFFF", font });
      centerTextIn(t, x, size);
    } else {
      const a = makeEllipse(board, x, y, size, size, C.BG3);
      a.name = "Avatar / " + type + " / " + size;
      icon(board, "user", x + size / 2 - Math.round(size * 0.3), y + size / 2 - Math.round(size * 0.3), Math.round(size * 0.6), C.INK3);
    }
  }
  function drawTooltip(board, x, y, font) {
    const w = 230;
    const tip = makeRect(board, x, y, w, 32, C.INK, 8);
    tip.name = "Tooltip / top / default";
    setShadow(tip, 0, 4, 12, 0.15);
    const t = makeText(board, x + 12, y + 8, "\u042D\u043C\u043F\u0430\u0442\u0438\u044F \u2014 \u043E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0447\u0443\u0432\u0441\u0442\u0432 \u043A\u043B\u0438\u0435\u043D\u0442\u0430", { size: 12, weight: 400, color: "#FFFFFF", font });
    centerTextIn(t, x, w);
    const arrow = makeRect(board, x + w / 2 - 5, y + 28, 10, 10, C.INK, 2);
    try {
      arrow.rotation = 45;
    } catch (_) {
    }
  }
  function drawModal(board, x, y, font) {
    const backdrop = makeRect(board, x, y, 700, 400, C.INK, 16);
    try {
      backdrop.fills = [{ fillColor: C.INK, fillOpacity: 0.5 }];
    } catch (_) {
    }
    backdrop.name = "Modal / backdrop";
    const w = 560;
    const h = 232;
    const cx = x + (700 - w) / 2;
    const cy = y + (400 - h) / 2;
    const card2 = makeRect(board, cx, cy, w, h, C.WHITE, 16);
    setShadow(card2, 0, 12, 32, 0.12);
    card2.name = "Modal / md / open";
    makeText(board, cx + 24, cy + 24, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439?", { size: 20, weight: 600, color: C.INK, font });
    makeText(board, cx + 24, cy + 60, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \xAB\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C\xBB \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0451\u043D", { size: 14, weight: 400, color: C.INK2, font });
    makeText(board, cx + 24, cy + 80, "\u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432. \u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.", { size: 14, weight: 400, color: C.INK2, font });
    icon(board, "x", cx + w - 36, cy + 20, 16, C.INK3);
    const bw = drawButton(board, cx + w - 24 - 108 - 12 - 108, cy + h - 64, "md", "secondary", "default", font);
    drawButton(board, cx + w - 24 - 108, cy + h - 64, "md", "danger", "default", font);
  }
  var TOASTS = {
    info: { icon: "info", color: C.INFO, title: "\u0418\u043D\u0444\u043E", text: "\u0421\u0435\u0441\u0441\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438" },
    success: { icon: "circle-check", color: C.SUCCESS, title: "\u0413\u043E\u0442\u043E\u0432\u043E", text: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D" },
    warning: { icon: "triangle-alert", color: C.WARNING, title: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", text: "\u0421\u0435\u0441\u0441\u0438\u044F \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430" },
    error: { icon: "circle-x", color: C.ERROR, title: "\u041E\u0448\u0438\u0431\u043A\u0430", text: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442" }
  };
  function drawToast(board, x, y, type, font) {
    const t = TOASTS[type];
    const w = 380;
    const card2 = makeRect(board, x, y, w, 56, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    setShadow(card2, 0, 4, 12, 0.08);
    card2.name = "Toast / " + type;
    makeRect(board, x, y + 8, 4, 40, t.color, 2);
    icon(board, t.icon, x + 16, y + 18, 20, t.color);
    makeText(board, x + 48, y + 10, t.title, { size: 13, weight: 600, color: C.INK, font });
    makeText(board, x + 48, y + 30, t.text, { size: 12, weight: 400, color: C.INK2, font });
    icon(board, "x", x + w - 28, y + 20, 14, C.INK3);
  }
  function drawProgressLinear(board, x, y, pct, font) {
    makeRect(board, x, y + 4, 260, 8, C.BG3, 4);
    makeRect(board, x, y + 4, Math.max(8, Math.round(260 * pct / 100)), 8, C.ACCENT, 4).name = "Progress / linear / " + pct;
    makeText(board, x + 270, y, pct + "%", { size: 12, weight: 500, color: C.INK2, font });
  }
  function ringSvg(pct, size, color, track2) {
    const r = 16;
    const circ = Math.round(2 * Math.PI * r * 10) / 10;
    const off = Math.round(circ * (1 - pct / 100) * 10) / 10;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="' + r + '" stroke="' + track2 + '" stroke-width="5"/><circle cx="20" cy="20" r="' + r + '" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + off + '" transform="rotate(-90 20 20)"/></svg>';
  }
  function drawProgressSteps(board, x, y, current, labels, font) {
    const gap = 130;
    for (let i = 0; i < labels.length; i++) {
      const cx = x + i * gap;
      if (i > 0) makeRect(board, cx - gap + 28, y + 11, gap - 40, 2, i <= current ? C.ACCENT : C.BG3, 1);
      if (i < current) {
        const d = makeEllipse(board, cx, y, 24, 24, C.ACCENT);
        d.name = "step/done";
        icon(board, "check", cx + 6, y + 6, 12, "#FFFFFF");
      } else if (i === current) {
        const a = makeEllipse(board, cx, y, 24, 24, C.ACCENT);
        a.name = "step/active";
        const t = makeText(board, cx + 9, y + 4, String(i + 1), { size: 12, weight: 600, color: "#FFFFFF", font });
        centerTextIn(t, cx, 24);
      } else {
        const u = makeEllipse(board, cx, y, 24, 24, C.BG3);
        u.name = "step/upcoming";
        const t = makeText(board, cx + 9, y + 4, String(i + 1), { size: 12, weight: 500, color: C.INK3, font });
        centerTextIn(t, cx, 24);
      }
      makeText(board, cx - 10, y + 32, labels[i], { size: 11, weight: 400, color: i <= current ? C.INK2 : C.INK3, font });
    }
  }
  function drawTabsUnderline(board, x, y, font) {
    const tabs = ["\u041E\u0431\u0437\u043E\u0440", "\u0421\u0435\u0441\u0441\u0438\u0438", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"];
    let tx = x;
    tabs.forEach((tb, i) => {
      const active = i === 1;
      const tw = Math.round(tb.length * 8.4) + 8;
      makeText(board, tx, y, tb, { size: 14, weight: active ? 600 : 400, color: active ? C.INK : C.INK2, font });
      if (active) {
        const u = makeRect(board, tx, y + 28, tw, 2, C.ACCENT, 1);
        u.name = "Tabs / underline / active";
      }
      tx += tw + 24;
    });
    makeRect(board, x, y + 30, 360, 1, C.BD, 0).name = "Tabs / underline / divider";
  }
  function drawTabsPills(board, x, y, font) {
    const cont = makeRect(board, x, y, 320, 36, C.BG3, 18);
    cont.name = "Tabs / pills / container";
    const seg = ["\u041D\u0435\u0434\u0435\u043B\u044F", "\u041C\u0435\u0441\u044F\u0446", "\u0413\u043E\u0434"];
    seg.forEach((s, i) => {
      const px = x + 4 + i * 104;
      if (i === 0) {
        const pill = makeRect(board, px, y + 4, 100, 28, C.WHITE, 14);
        setShadow(pill, 0, 1, 2, 0.08);
        pill.name = "Tabs / pills / active";
        const t = makeText(board, px + 30, y + 10, s, { size: 13, weight: 600, color: C.INK, font });
        centerTextIn(t, px, 100);
      } else {
        const t = makeText(board, px + 30, y + 10, s, { size: 13, weight: 400, color: C.INK2, font });
        centerTextIn(t, px, 100);
      }
    });
  }
  function drawAccordion(board, x, y, firstOpen, font) {
    const w = 480;
    const name = "Accordion / " + (firstOpen ? "expanded" : "collapsed");
    let cy = y;
    const items = [
      { q: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 \u0440\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438?", open: firstOpen },
      { q: "\u041A\u0430\u043A \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u044E\u0442\u0441\u044F \u043E\u0447\u043A\u0438?", open: false }
    ];
    items.forEach((it) => {
      makeText(board, x, cy + 14, it.q, { size: 14, weight: 600, color: C.INK, font });
      icon(board, it.open ? "chevron-up" : "chevron-down", x + w - 28, cy + 14, 16, C.INK2);
      cy += 44;
      if (it.open) {
        makeText(board, x, cy, "\u041F\u043E\u043B\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0440: \u0431\u0430\u043B\u043B\u044B \u043F\u043E 8 \u043D\u0430\u0432\u044B\u043A\u0430\u043C, \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043C\u043E\u043C\u0435\u043D\u0442\u044B,", { size: 14, weight: 400, color: C.INK2, font });
        makeText(board, x, cy + 20, "\u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0445\u043E\u0434\u044B \u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0430.", { size: 14, weight: 400, color: C.INK2, font });
        cy += 44;
      }
      makeRect(board, x, cy, w, 1, C.BD, 0);
      cy += 1;
    });
    try {
      const shapes = penpot.currentPage.findShapes({ name: items[0].q }) || [];
      if (shapes.length) shapes[0].name = name;
    } catch (_) {
    }
    return cy - y;
  }
  function drawTable(board, x, y, font) {
    const w = 680;
    const cols = [
      { t: "\u0414\u0410\u0422\u0410", cx: 16 },
      { t: "\u0421\u0426\u0415\u041D\u0410\u0420\u0418\u0419", cx: 130 },
      { t: "\u0411\u0410\u041B\u041B", cx: 470 },
      { t: "\u0414\u041B\u0418\u0422\u0415\u041B\u042C\u041D\u041E\u0421\u0422\u042C", cx: 560 }
    ];
    const head = makeRect(board, x, y, w, 40, C.BG2, 8);
    try {
      head.cornerRadius = 8;
    } catch (_) {
    }
    head.name = "Table / header";
    cols.forEach((c2) => {
      makeText(board, x + c2.cx, y + 12, c2.t, { size: 11, weight: 500, color: C.INK3, font });
    });
    icon(board, "chevron-up", x + 505, y + 13, 13, C.ACCENT);
    const rows = [
      ["12.09.2026", "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", "86", "14 \u043C\u0438\u043D"],
      ["10.09.2026", "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F", "74", "18 \u043C\u0438\u043D"],
      ["08.09.2026", "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "91", "12 \u043C\u0438\u043D"],
      ["05.09.2026", "\u0413\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442", "68", "21 \u043C\u0438\u043D"]
    ];
    rows.forEach((r, i) => {
      const ry = y + 40 + i * 44;
      makeText(board, x + 16, ry + 12, r[0], { size: 13, weight: 400, color: C.INK2, font });
      makeText(board, x + 130, ry + 12, r[1], { size: 13, weight: 500, color: C.INK, font });
      makeText(board, x + 470, ry + 12, r[2], { size: 13, weight: 600, color: C.INK, font });
      makeText(board, x + 560, ry + 12, r[3], { size: 13, weight: 400, color: C.INK2, font });
      makeRect(board, x, ry + 44, w, 1, C.BD, 0);
    });
    const table = head;
    try {
      table.name = "Table / default";
    } catch (_) {
    }
    const py = y + 40 + 4 * 44 + 16;
    icon(board, "chevron-left", x + 16, py + 5, 14, C.INK3);
    [1, 2, 3].forEach((p) => {
      const px = x + 44 + (p - 1) * 32;
      if (p === 1) {
        const pg = makeRect(board, px, py, 24, 24, C.ACCENT, 6);
        pg.name = "pagination/active";
        const t = makeText(board, px + 8, py + 4, "1", { size: 12, weight: 600, color: "#FFFFFF", font });
        centerTextIn(t, px, 24);
      } else {
        makeText(board, px + 8, py + 4, String(p), { size: 12, weight: 400, color: C.INK2, font });
      }
    });
    makeText(board, x + 44 + 3 * 32, py + 4, "\u2026", { size: 12, weight: 400, color: C.INK3, font });
    icon(board, "chevron-right", x + 44 + 3 * 32 + 24, py + 5, 14, C.INK2);
    return py + 40 - y;
  }
  function drawSkeletonCard(board, x, y, font) {
    const card2 = makeRect(board, x, y, 300, 180, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "Skeleton / card";
    makeEllipse(board, x + 16, y + 16, 40, 40, C.BG3);
    makeRect(board, x + 68, y + 20, 130, 10, C.BG3, 5);
    makeRect(board, x + 68, y + 38, 84, 10, C.BG3, 5);
    makeRect(board, x + 16, y + 72, 268, 84, C.BG3, 8);
  }
  function drawSkeletonLines(board, x, y, font) {
    [320, 260, 300].forEach((w, i) => {
      makeRect(board, x, y + i * 22, w, 12, C.BG3, 6);
    });
  }
  function drawDarkStrip(board, x, y, font) {
    const w = 1144;
    const h = 300;
    const strip = makeRect(board, x, y, w, h, C.D_BG, 16);
    strip.name = "Dark theme / strip";
    makeText(
      board,
      x + 32,
      y + 24,
      "\u0422\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430 \u2014 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430 \u0434\u043B\u044F TMA \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u044D\u043A\u0440\u0430\u043D\u043E\u0432",
      { size: 16, weight: 600, color: C.D_INK, font }
    );
    makeText(
      board,
      x + 32,
      y + 48,
      "\u0442\u043E\u043A\u0435\u043D\u044B color/dark/* \xB7 \u0430\u043A\u0446\u0435\u043D\u0442\u044B \u0438 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u2014 \u0442\u0435 \u0436\u0435",
      { size: 12, weight: 400, color: C.D_INK2, font }
    );
    const bx = x + 32;
    const by = y + 92;
    const p1 = makeRect(board, bx, by, 130, 40, C.ACCENT, 20);
    p1.name = "Button / primary / dark";
    makeText(board, bx + 37, by + 10, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", { size: 14, weight: 600, color: "#FFFFFF", font });
    const s1 = makeRect(board, bx + 146, by, 120, 40, C.D_BG2, 20);
    setStroke(s1, C.D_BD, 1, "inner");
    s1.name = "Button / secondary / dark";
    makeText(board, bx + 178, by + 10, "\u0412\u0442\u043E\u0440\u0438\u0447\u043D\u0430\u044F", { size: 14, weight: 600, color: C.D_INK, font });
    const g1 = makeRect(board, bx + 282, by, 96, 40, null, 20);
    g1.name = "Button / ghost / dark";
    makeText(board, bx + 306, by + 10, "\u041E\u0442\u043C\u0435\u043D\u0430", { size: 14, weight: 600, color: "#60A5FA", font });
    const iy = y + 152;
    const f1 = makeRect(board, bx, iy, 280, 40, C.D_BG2, 8);
    setStroke(f1, C.D_BD, 1, "inner");
    f1.name = "Input / dark";
    makeText(board, bx + 12, iy + 10, "name@example.com", { size: 14, weight: 400, color: "#64748B", font });
    const ch = makeRect(board, bx + 296, iy + 6, 120, 28, C.D_BG2, 14);
    setStroke(ch, C.D_BD, 1, "inner");
    ch.name = "Chip / dark";
    makeEllipse(board, bx + 306, iy + 14, 8, 8, C.ACCENT2);
    makeText(board, bx + 320, iy + 11, "\u044D\u043C\u043F\u0430\u0442\u0438\u044F", { size: 12, weight: 500, color: C.D_INK2, font });
    const t = makeRect(board, bx, iy + 60, 380, 56, C.D_BG2, 12);
    setStroke(t, C.D_BD, 1, "inner");
    t.name = "Toast / dark";
    makeRect(board, bx, iy + 68, 4, 40, C.SUCCESS, 2);
    icon(board, "circle-check", bx + 16, iy + 78, 20, C.SUCCESS);
    makeText(board, bx + 48, iy + 70, "\u0413\u043E\u0442\u043E\u0432\u043E", { size: 13, weight: 600, color: C.D_INK, font });
    makeText(board, bx + 48, iy + 90, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", { size: 12, weight: 400, color: C.D_INK2, font });
    icon(board, "x", bx + 352, iy + 80, 14, "#64748B");
    const note = makeRect(board, x + 620, iy + 52, 480, 76, C.D_BG2, 12);
    setStroke(note, "#FDE68A", 1, "inner");
    makeText(
      board,
      x + 636,
      iy + 64,
      "TMA safe area: \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u043D\u0438\u0436\u0435 Telegram header (~56px),",
      { size: 12, weight: 400, color: C.D_INK2, font }
    );
    makeText(
      board,
      x + 636,
      iy + 82,
      "MainButton (~80px) \u043D\u0435 \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F; \u0442\u0430\u043F\u044B \u2265 44\xD744; \u0444\u043E\u043A\u0443\u0441 2px.",
      { size: 12, weight: 400, color: C.D_INK2, font }
    );
  }
  function buildUIKitBoard(log) {
    const font = pickFont(FONT_FALLBACKS);
    const lib = penpot.library.local;
    const existing = /* @__PURE__ */ new Set();
    try {
      for (const c of lib.components) existing.add(c.name);
    } catch (_) {
    }
    const board = penpot.createBoard();
    board.name = BOARD_NAME;
    board.x = 100 + 1240 + 200;
    board.y = 100;
    setOrigin(board.x, board.y);
    try {
      board.resize(CW, 400);
    } catch (_) {
    }
    try {
      board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }];
    } catch (_) {
    }
    setStroke(board, C.BD, 1, "inner");
    let y = M;
    makeText(board, M, y, "Platform \u2014 UI-kit", { size: 40, weight: 700, color: C.INK, font });
    y += 56;
    makeText(
      board,
      M,
      y,
      "\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0422\u0417 4.1 \xB7 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0422\u0417 6.1 \xB7 \u043D\u0435\u0439\u043C\u0438\u043D\u0433 \xABName / Variant / State\xBB \xB7 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 Assets",
      { size: 13, weight: 400, color: C.INK2, font }
    );
    y += 80;
    y = sectionTitle(board, M, y, "Button", "5 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \xD7 6 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439 \xB7 \u0440\u0430\u0437\u043C\u0435\u0440\u044B sm 32 / md 40 / lg 48 \xB7 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430 \u2265 44px (md/lg)");
    const colW = 180;
    for (const variantKey of Object.keys(VARIANTS)) {
      makeText(board, M, y + 10, variantKey, { size: 12, weight: 600, color: C.ACCENT, font });
      STATES.forEach((st, i) => {
        const cx = M + 90 + i * colW;
        startBag();
        drawButton(board, cx, y, "md", variantKey, st, font);
        const bag = endBag();
        registerComponent(bag, "Button / " + variantKey + " / " + st, existing, log);
        caption(board, cx, y + 46, st);
      });
      y += 76;
    }
    makeText(board, M, y + 6, "primary sm (32)", { size: 12, weight: 600, color: C.ACCENT, font });
    startBag();
    drawButton(board, M + 90, y, "sm", "primary", "default", font);
    registerComponent(endBag(), "Button / primary / sm / default", existing, log);
    y += 44;
    makeText(board, M, y + 6, "primary lg (48)", { size: 12, weight: 600, color: C.ACCENT, font });
    startBag();
    drawButton(board, M + 90, y, "lg", "primary", "default", font);
    registerComponent(endBag(), "Button / primary / lg / default", existing, log);
    y += 64;
    makeText(board, M, y + 6, "icon buttons", { size: 12, weight: 600, color: C.ACCENT, font });
    ["default", "hover", "focus", "disabled"].forEach((st, i) => {
      const cx = M + 90 + i * 64;
      startBag();
      drawIconButton(board, cx, y, "md", "plus", st, font);
      const bag = endBag();
      if (st === "default") registerComponent(bag, "IconButton / md / " + st, existing, log);
      caption(board, cx, y + 48, st);
    });
    y += 96;
    y = sectionTitle(board, M, y, "Input", "\u0442\u0435\u043A\u0441\u0442 \xB7 email \xB7 \u043F\u043E\u0438\u0441\u043A \xB7 textarea \xB7 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043F\u043E \u0422\u0417 6.1");
    const inputKinds = [
      ["text", "default"],
      ["text", "focus"],
      ["text", "filled"],
      ["email", "error"],
      ["text", "disabled"],
      ["search", "default"]
    ];
    inputKinds.forEach((k, i) => {
      const cx = M + i % 3 * 360;
      if (i === 3) y += 100;
      startBag();
      drawInput(board, cx, y, k[0], k[1], font);
      const bag = endBag();
      const names = { default: "Input / text / default", focus: "Input / text / focus", filled: "Input / text / filled", error: "Input / email / error", disabled: "Input / text / disabled" };
      const nm = k[0] === "search" ? "Input / search / default" : names[k[1]] || "Input / text / default";
      registerComponent(bag, nm, existing, log);
      caption(board, cx, y + 92, k[0] + " / " + k[1]);
    });
    y += 150;
    startBag();
    drawInput(board, M, y, "textarea", "default", font);
    registerComponent(endBag(), "Input / textarea / default", existing, log);
    caption(board, M, y + 150, "textarea (\u0432\u044B\u0441\u043E\u0442\u0430 96, grow)");
    y += 190;
    y = sectionTitle(board, M, y, "Select / Combobox", "\u043E\u0434\u0438\u043D\u0430\u0440\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \xB7 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \xB7 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 (\u0447\u0438\u043F\u044B)");
    const selStates = ["default", "open", "multi"];
    let selX = M;
    selStates.forEach((st) => {
      startBag();
      const hUsed = drawSelect(board, selX, y, st, font);
      registerComponent(endBag(), "Select / " + st, existing, log);
      caption(board, selX, y + hUsed + 6, st);
      selX += 360;
    });
    y += 190;
    y = sectionTitle(board, M, y, "Checkbox \xB7 Radio \xB7 Switch", "unchecked / checked / indeterminate / disabled / focus");
    const cbStates = ["unchecked", "checked", "indeterminate", "disabled", "focus"];
    makeText(board, M, y + 2, "Checkbox", { size: 12, weight: 600, color: C.ACCENT, font });
    cbStates.forEach((st, i) => {
      const cx = M + 90 + i * 230;
      startBag();
      drawCheckbox(board, cx, y, st, font);
      registerComponent(endBag(), "Checkbox / " + st, existing, log);
      caption(board, cx, y + 30, st);
    });
    y += 64;
    makeText(board, M, y + 2, "Radio", { size: 12, weight: 600, color: C.ACCENT, font });
    ["unchecked", "checked", "disabled"].forEach((st, i) => {
      const cx = M + 90 + i * 230;
      startBag();
      drawRadio(board, cx, y, st, font);
      registerComponent(endBag(), "Radio / " + st, existing, log);
      caption(board, cx, y + 30, st);
    });
    y += 64;
    makeText(board, M, y + 2, "Switch", { size: 12, weight: 600, color: C.ACCENT, font });
    [[false, false], [true, false], [false, true], [true, true]].forEach((cfg, i) => {
      const cx = M + 90 + i * 230;
      startBag();
      drawSwitch(board, cx, y, cfg[0], cfg[1], font);
      registerComponent(endBag(), "Switch / " + (cfg[0] ? "on" : "off") + (cfg[1] ? " / disabled" : ""), existing, log);
      caption(board, cx, y + 32, (cfg[0] ? "on" : "off") + (cfg[1] ? " + disabled" : ""));
    });
    y += 90;
    y = sectionTitle(board, M, y, "Chip / Tag / Badge", "\u043D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \xB7 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 (\u0442\u0438\u043D\u0442\u044B) \xB7 \u043D\u0430\u0432\u044B\u043A\u0438 (\u0442\u043E\u0447\u043A\u0430 = \u0446\u0432\u0435\u0442 \u043D\u0430\u0432\u044B\u043A\u0430)");
    let chipX = M;
    const semChips = [["neutral", "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"], ["info", "\u0418\u043D\u0444\u043E"], ["success", "\u041F\u0440\u043E\u0439\u0434\u0435\u043D\u043E"], ["warning", "\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"], ["error", "\u041E\u0448\u0438\u0431\u043A\u0430"]];
    semChips.forEach((cf) => {
      startBag();
      const wUsed = drawChip(board, chipX, y, cf[1], cf[0], "md", font);
      if (cf[0] === "neutral" || cf[0] === "success") registerComponent(endBag(), "Chip / " + cf[0] + " / md", existing, log);
      else endBag();
      chipX += wUsed + 16;
    });
    startBag();
    drawChip(board, chipX, y, "\u044D\u043C\u043F\u0430\u0442\u0438\u044F", "skill", "md", font, C.ACCENT2);
    registerComponent(endBag(), "Chip / skill / md", existing, log);
    y += 48;
    chipX = M;
    const skills = [
      ["\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "#2563EB"],
      ["\u044D\u043C\u043F\u0430\u0442\u0438\u044F", "#7C3AED"],
      ["\u0433\u0440\u0430\u043D\u0438\u0446\u044B", "#0891B2"],
      ["\u044D\u043C\u043E\u0446\u0438\u0438", "#DB2777"],
      ["\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", "#65A30D"],
      ["\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", "#EA580C"],
      ["\u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435", "#0EA5E9"],
      ["\u0440\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", "#9333EA"]
    ];
    skills.forEach((sk) => {
      startBag();
      chipX += drawChip(board, chipX, y, sk[0], "skill", "sm", font, sk[1]) + 12;
      endBag();
    });
    y += 90;
    y = sectionTitle(board, M, y, "Avatar", "24 / 32 / 40 / 48 / 64 \xB7 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u044B \u0438 fallback");
    let avX = M + 20;
    [24, 32, 40, 48, 64].forEach((sz) => {
      startBag();
      drawAvatar(board, avX, y, sz, "initials", font);
      if (sz === 40) registerComponent(endBag(), "Avatar / initials / 40", existing, log);
      else endBag();
      avX += sz + 40;
    });
    avX += 40;
    [24, 32, 40, 48, 64].forEach((sz) => {
      startBag();
      drawAvatar(board, avX, y, sz, "fallback", font);
      if (sz === 40) registerComponent(endBag(), "Avatar / fallback / 40", existing, log);
      else endBag();
      avX += sz + 40;
    });
    y += 100;
    y = sectionTitle(board, M, y, "Tooltip \xB7 Progress", "\u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u0441\u0432\u0435\u0440\u0445\u0443 \xB7 \u043B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 / \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 (SVG) / \u0448\u0430\u0433\u0438");
    startBag();
    drawTooltip(board, M, y, font);
    registerComponent(endBag(), "Tooltip / top / default", existing, log);
    drawProgressLinear(board, M + 320, y + 10, 40, font);
    let ring = null;
    try {
      ring = penpot.createShapeFromSvg(ringSvg(40, 48, C.ACCENT, C.BG3));
      board.appendChild(ring);
      ring.x = M + 660;
      ring.y = y;
      ring.name = "Progress / circular / 40";
    } catch (_) {
      ring = null;
    }
    makeText(board, M + 660, y + 54, "40%", { size: 11, weight: 500, color: C.INK2, font });
    startBag();
    drawProgressSteps(board, M + 760, y, 1, ["\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F", "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", "\u0413\u043E\u0442\u043E\u0432\u043E"], font);
    registerComponent(endBag(), "Progress / steps / 2 \u0438\u0437 4", existing, log);
    caption(board, M, y + 44, "tooltip");
    caption(board, M + 320, y + 44, "linear 40%");
    caption(board, M + 660, y + 76, "circular 40%");
    caption(board, M + 760, y + 56, "steps");
    y += 130;
    y = sectionTitle(board, M, y, "Tabs \xB7 Accordion", "underline \u0438 pills \xB7 \u0441\u0432\u0451\u0440\u043D\u0443\u0442/\u0440\u0430\u0437\u0432\u0451\u0440\u043D\u0443\u0442");
    startBag();
    drawTabsUnderline(board, M, y, font);
    registerComponent(endBag(), "Tabs / underline", existing, log);
    startBag();
    drawTabsPills(board, M + 420, y, font);
    registerComponent(endBag(), "Tabs / pills", existing, log);
    y += 70;
    startBag();
    const accH = drawAccordion(board, M, y, true, font);
    registerComponent(endBag(), "Accordion / expanded", existing, log);
    y += accH + 24;
    y = sectionTitle(board, M, y, "Table \xB7 Skeleton", "\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430, \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u044F \xB7 \u0441\u043A\u0435\u043B\u0435\u0442\u043E\u043D\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 (\u0422\u0417 6.2)");
    startBag();
    const tblH = drawTable(board, M, y, font);
    registerComponent(endBag(), "Table / default", existing, log);
    startBag();
    drawSkeletonCard(board, M + 760, y, font);
    registerComponent(endBag(), "Skeleton / card", existing, log);
    drawSkeletonLines(board, M + 760, y + 200, font);
    caption(board, M + 760, y + 272, "skeleton lines");
    y += Math.max(tblH, 280) + 24;
    y = sectionTitle(board, M, y, "Toast \xB7 Modal", "4 \u0442\u0438\u043F\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 (\u0438\u043A\u043E\u043D\u043A\u0430 + \u0446\u0432\u0435\u0442, WCAG) \xB7 \u043C\u043E\u0434\u0430\u043B\u043A\u0430 md 560");
    const toastX = M;
    ["info", "success", "warning", "error"].forEach((tp, i) => {
      startBag();
      drawToast(board, toastX, y + i * 68, tp, font);
      registerComponent(endBag(), "Toast / " + tp, existing, log);
    });
    startBag();
    drawModal(board, M + 420, y, font);
    registerComponent(endBag(), "Modal / md / open", existing, log);
    caption(board, M + 420, y + 408, "modal md (560) \u043D\u0430 backdrop");
    y += 440;
    y = sectionTitle(board, M, y, "\u0422\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430", "\u0434\u043B\u044F Mini App \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u044D\u043A\u0440\u0430\u043D\u043E\u0432 (\u0422\u0417 3.1, 11.1)");
    drawDarkStrip(board, M, y, font);
    y += 340;
    makeText(
      board,
      M,
      y,
      "\u0414\u0430\u043B\u044C\u0448\u0435: \u0434\u043E\u043C\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B (\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 3): ScenarioCard, EmotionIndicator, ClientMessageBubble, AnswerOption\u2026",
      { size: 12, weight: 400, color: C.INK3, font }
    );
    y += 48;
    try {
      board.resize(CW, y);
    } catch (_) {
    }
    log.push("\u2713 UI-kit: \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432: " + existing.size);
  }

  // src/domain.ts
  var BOARD_NAME2 = "03_Patterns / Domain";
  var M2 = 48;
  var CW2 = 1240;
  function chip(parent, x, y, label, bg, fg, font, opts = {}) {
    const h = opts.sm ? 24 : 26;
    const fs = opts.sm ? 11 : 12;
    let textX = x + 10;
    let w = Math.round(label.length * fs * 0.62) + 20;
    if (opts.dot) {
      w += 14;
      makeEllipse(parent, x + 9, y + h / 2 - 4, 8, 8, opts.dot);
      textX = x + 23;
    }
    if (opts.icon) {
      w += 18;
      icon(parent, opts.icon, x + 9, y + (h - 13) / 2, 13, fg);
      textX = x + 25;
    }
    const ch = makeRect(parent, x, y, w, h, bg, h / 2);
    if (opts.border !== false) setStroke(ch, C.BD, 1, "inner");
    ch.name = "chip " + label;
    const t = makeText(parent, textX, y + (h - fs - 3) / 2 + 1, label, { size: fs, weight: 500, color: fg, font });
    return w;
  }
  function dotsDifficulty(parent, x, y, level, font) {
    for (let i = 0; i < 5; i++) {
      makeEllipse(parent, x + i * 14, y, 8, 8, i < level ? C.ACCENT : C.BG3).name = "difficulty-dot";
    }
    makeText(parent, x + 78, y - 3, "\u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C " + level + "/5", { size: 11, weight: 400, color: C.INK3, font });
    return 110;
  }
  function ghostButton(parent, x, y, w, label, font, opts = {}) {
    const h = 32;
    const bg = opts.primary ? C.ACCENT : null;
    const b = makeRect(parent, x, y, w, h, bg, h / 2);
    if (!opts.primary) setStroke(b, opts.danger ? "#FECACA" : C.BD, 1, "inner");
    b.name = "Button / " + (opts.primary ? "primary" : "secondary") + " / sm / " + (opts.danger ? "danger" : "default");
    const fg = opts.primary ? "#FFFFFF" : opts.danger ? C.ERROR : C.INK2;
    let tx = x;
    const tw = label.length * 7 + (opts.icon ? 22 : 0);
    tx = x + (w - tw) / 2;
    if (opts.icon) {
      icon(parent, opts.icon, tx, y + 8, 16, fg);
      tx += 22;
    }
    const t = makeText(parent, tx, y + 7, label, { size: 13, weight: 600, color: fg, font });
  }
  function scenarioCardDefault(parent, x, y, font) {
    const w = 320;
    const card2 = makeRect(parent, x, y, w, 216, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    setShadow(card2, 0, 4, 12, 0.08);
    card2.name = "ScenarioCard / default";
    makeText(parent, x + 16, y + 14, "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", { size: 16, weight: 600, color: C.INK, font });
    makeText(parent, x + 16, y + 38, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0438\u0437\u0431\u0435\u0433\u0430\u0435\u0442 \u0442\u0435\u043C\u044B \u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440.", { size: 13, weight: 400, color: C.INK2, font });
    makeText(parent, x + 16, y + 56, "\u041E\u0442\u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u043D\u0430\u0432\u044B\u043A \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u043D\u0438\u044F \u0438 \u0440\u0430\u0431\u043E\u0442\u044B", { size: 13, weight: 400, color: C.INK2, font });
    makeText(parent, x + 16, y + 74, "\u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C.", { size: 13, weight: 400, color: C.INK2, font });
    dotsDifficulty(parent, x + 16, y + 100, 4, font);
    icon(parent, "clock", x + 16, y + 124, 14, C.INK3);
    makeText(parent, x + 36, y + 121, "15 \u043C\u0438\u043D", { size: 12, weight: 400, color: C.INK2, font });
    let cx = x + 16;
    cx += chip(parent, cx, y + 146, "\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", C.BG2, C.INK2, font, { dot: "#EA580C", sm: true }) + 8;
    chip(parent, cx, y + 146, "\u0433\u0440\u0430\u043D\u0438\u0446\u044B", C.BG2, C.INK2, font, { dot: "#0891B2", sm: true });
    makeText(parent, x + 16, y + 184, "\u041D\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u043D", { size: 12, weight: 400, color: C.INK3, font });
    ghostButton(parent, x + w - 100, y + 176, 84, "\u041D\u0430\u0447\u0430\u0442\u044C", font, { primary: true });
    return 216;
  }
  function scenarioCardCompact(parent, x, y, font) {
    const w = 300;
    const card2 = makeRect(parent, x, y, w, 64, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "ScenarioCard / compact";
    makeText(parent, x + 14, y + 11, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", { size: 14, weight: 600, color: C.INK, font });
    for (let i = 0; i < 5; i++) makeEllipse(parent, x + 14 + i * 12, y + 38, 7, 7, i < 2 ? C.ACCENT : C.BG3).name = "dot";
    makeText(parent, x + 80, y + 34, "\xB7  10 \u043C\u0438\u043D", { size: 11, weight: 400, color: C.INK3, font });
    ghostButton(parent, x + w - 82, y + 16, 68, "\u041D\u0430\u0447\u0430\u0442\u044C", font, {});
    return 64;
  }
  function scenarioCardLocked(parent, x, y, font) {
    const w = 320;
    const card2 = makeRect(parent, x, y, w, 216, C.BG2, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "ScenarioCard / locked";
    icon(parent, "lock", x + 16, y + 14, 16, C.INK3);
    makeText(parent, x + 40, y + 12, "\u0413\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442", { size: 16, weight: 600, color: C.INK2, font });
    makeText(parent, x + 16, y + 40, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F", { size: 13, weight: 400, color: C.INK3, font });
    makeText(parent, x + 16, y + 58, "\xAB\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435\xBB.", { size: 13, weight: 400, color: C.INK3, font });
    dotsDifficulty(parent, x + 16, y + 100, 3, font);
    for (let i = 0; i < 5; i++) makeEllipse(parent, x + 16 + i * 14, y + 100, 8, 8, C.BG3).name = "dot-locked";
    icon(parent, "clock", x + 16, y + 124, 14, C.INK3);
    makeText(parent, x + 36, y + 121, "20 \u043C\u0438\u043D", { size: 12, weight: 400, color: C.INK3, font });
    const b = makeRect(parent, x + w - 108, y + 176, 92, 32, C.BG3, 16);
    b.name = "Button / disabled";
    makeText(parent, x + w - 96, y + 183, "\u0417\u0430\u043A\u0440\u044B\u0442\u043E", { size: 13, weight: 600, color: C.INK3, font });
    makeText(parent, x + 16, y + 184, "\u041F\u0440\u043E\u0439\u0434\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", { size: 11, weight: 400, color: C.INK3, font });
    return 216;
  }
  function gameCard(parent, x, y, font) {
    const w = 300;
    const card2 = makeRect(parent, x, y, w, 168, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    setShadow(card2, 0, 4, 12, 0.08);
    card2.name = "GameCard / default";
    let cx = x + 16;
    cx += chip(parent, cx, y + 14, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435", "#E0F2FE", "#0C4A6E", font, { sm: true, border: false }) + 8;
    chip(parent, cx, y + 14, "\u0422\u0440\u0435\u0432\u043E\u0433\u0430", "#FEF3C7", "#92400E", font, { sm: true, border: false });
    makeText(parent, x + 16, y + 46, "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", { size: 16, weight: 600, color: C.INK, font });
    makeText(parent, x + 16, y + 70, "\u0422\u0435\u0445\u043D\u0438\u043A\u0430 \u0434\u044B\u0445\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0441\u043D\u0438\u0436\u0435\u043D\u0438\u044F \u0442\u0440\u0435\u0432\u043E\u0433\u0438.", { size: 13, weight: 400, color: C.INK2, font });
    icon(parent, "timer", x + 16, y + 94, 14, C.INK3);
    makeText(parent, x + 36, y + 91, "5 \u043C\u0438\u043D", { size: 12, weight: 400, color: C.INK2, font });
    icon(parent, "users", x + 96, y + 94, 14, C.INK3);
    makeText(parent, x + 116, y + 91, "12 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432", { size: 12, weight: 400, color: C.INK2, font });
    ghostButton(parent, x + w - 160, y + 124, 144, "\u0412\u044B\u0434\u0430\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u0443", font, { primary: true, icon: "send" });
    return 168;
  }
  function clientAccessCard(parent, x, y, font, status) {
    const w = 340;
    const card2 = makeRect(parent, x, y, w, 132, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "ClientAccessCard / " + status;
    makeText(parent, x + 16, y + 14, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", { size: 14, weight: 600, color: C.INK, font });
    const st = {
      active: { label: "\u0430\u043A\u0442\u0438\u0432\u0435\u043D", bg: "#DCFCE7", fg: "#166534" },
      completed: { label: "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D", bg: "#E0F2FE", fg: "#0C4A6E" },
      expired: { label: "\u0438\u0441\u0442\u0451\u043A", bg: "#FEF3C7", fg: "#92400E" },
      revoked: { label: "\u043E\u0442\u043E\u0437\u0432\u0430\u043D", bg: "#FEE2E2", fg: "#991B1B" }
    };
    const s = st[status] || st.active;
    chip(parent, x + w - 96, y + 12, s.label, s.bg, s.fg, font, { sm: true, border: false });
    makeText(parent, x + 16, y + 36, "\u0418\u0433\u0440\u0430: \u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439", { size: 13, weight: 400, color: C.INK2, font });
    icon(parent, "calendar", x + 16, y + 60, 14, C.INK3);
    makeText(parent, x + 36, y + 57, "\u0434\u043E 30.09.2026", { size: 12, weight: 400, color: C.INK2, font });
    icon(parent, "key-round", x + 130, y + 60, 14, C.INK3);
    makeText(parent, x + 150, y + 57, "\u0432\u0445\u043E\u0434\u044B 3/5", { size: 12, weight: 400, color: C.INK2, font });
    ghostButton(parent, x + 16, y + 88, 128, "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443", font, { icon: "link-2" });
    ghostButton(parent, x + 156, y + 88, 96, "\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C", font, { danger: true, icon: "x" });
    return 132;
  }
  function bubbleLeft(parent, x, y, font) {
    const w = 430;
    const h = 84;
    const b = makeRect(parent, x, y, w, h, C.BG2, 12);
    b.name = "ClientMessageBubble / left";
    makeText(parent, x + 16, y + 12, "\u042F \u043D\u0435 \u0437\u043D\u0430\u044E, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C\u2026 \u041A\u0430\u043A \u0431\u0443\u0434\u0442\u043E \u0432\u0441\u0451 \u0438\u0434\u0451\u0442", { size: 14, weight: 400, color: C.INK, font });
    makeText(parent, x + 16, y + 32, "\u043D\u0435 \u0442\u0430\u043A, \u0438 \u044F \u0443\u0436\u0435 \u043D\u0435 \u0441\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0441\u044C.", { size: 14, weight: 400, color: C.INK, font });
    icon(parent, "frown", x + 16, y + h + 8, 14, C.ERROR);
    makeText(parent, x + 36, y + h + 6, "\u044D\u043C\u043E\u0446\u0438\u044F 3/10 \xB7 \u043D\u0438\u0437\u043A\u0438\u0439 \u0444\u043E\u043D", { size: 11, weight: 500, color: C.ERROR, font });
    makeText(parent, x + w - 90, y + h + 6, "14:02", { size: 11, weight: 400, color: C.INK3, font });
    return h + 28;
  }
  function bubbleRight(parent, x, y, font) {
    const w = 400;
    const h = 64;
    const b = makeRect(parent, x, y, w, h, C.ACCENT, 12);
    b.name = "ClientMessageBubble / right";
    makeText(parent, x + 16, y + 12, "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435, \u043A\u043E\u0433\u0434\u0430", { size: 14, weight: 400, color: "#FFFFFF", font });
    makeText(parent, x + 16, y + 32, "\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u043E\u0431 \u044D\u0442\u043E\u043C?", { size: 14, weight: 400, color: "#FFFFFF", font });
    makeText(parent, x + w - 50, y + 40, "14:03", { size: 11, weight: 400, color: "#BFDBFE", font });
    return h + 8;
  }
  function emotionIndicatorCompact(parent, x, y, font) {
    const card2 = makeRect(parent, x, y, 200, 44, C.WHITE, 10);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "EmotionIndicator / compact";
    icon(parent, "frown", x + 12, y + 13, 18, C.ERROR);
    makeText(parent, x + 38, y + 8, "3/10", { size: 14, weight: 600, color: C.INK, font });
    makeText(parent, x + 38, y + 26, "\u043D\u0438\u0437\u043A\u0438\u0439 \u0444\u043E\u043D", { size: 11, weight: 400, color: C.ERROR, font });
    makeEllipse(parent, x + 158, y + 18, 8, 8, C.ERROR).name = "emotion-dot";
  }
  function emotionIndicatorExtended(parent, x, y, font) {
    const w = 520;
    const card2 = makeRect(parent, x, y, w, 74, C.WHITE, 10);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "EmotionIndicator / extended";
    makeText(parent, x + 14, y + 10, "\u042D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u043D \u043A\u043B\u0438\u0435\u043D\u0442\u0430", { size: 12, weight: 500, color: C.INK2, font });
    makeText(parent, x + w - 76, y + 6, "3/10", { size: 16, weight: 600, color: C.INK, font });
    const segW = 44;
    for (let i = 0; i < 10; i++) {
      const col = i < 3 ? C.ERROR : i < 6 ? C.WARNING : C.SUCCESS;
      const seg = makeRect(parent, x + 14 + i * (segW + 4), y + 32, segW, 12, col, 3);
      seg.name = "seg";
      try {
        if (i !== 2) {
          seg.fills = [{ fillColor: col, fillOpacity: i < 3 ? 0.9 : 0.35 }];
        }
      } catch (_) {
      }
    }
    makeText(parent, x + 14, y + 52, "0\u20133 \u043D\u0438\u0437\u043A\u0438\u0439", { size: 10, weight: 400, color: C.INK3, font });
    makeText(parent, x + 14 + 3 * (segW + 4), y + 52, "4\u20136 \u0441\u0440\u0435\u0434\u043D\u0438\u0439", { size: 10, weight: 400, color: C.INK3, font });
    makeText(parent, x + 14 + 6 * (segW + 4), y + 52, "7\u201310 \u0432\u044B\u0441\u043E\u043A\u0438\u0439", { size: 10, weight: 400, color: C.INK3, font });
    icon(parent, "frown", x + w - 40, y + 30, 20, C.ERROR);
  }
  var ANSWER_TEXT = "\u041E\u0442\u0440\u0430\u0436\u0430\u044E \u0447\u0443\u0432\u0441\u0442\u0432\u043E: \xAB\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u0434\u043B\u044F \u0432\u0430\u0441 \u0432\u0441\u0451 \u0441\u043B\u0438\u0448\u043A\u043E\u043C\xBB";
  function answerOption(parent, x, y, state, font) {
    const w = 470;
    const h = 58;
    let bg = C.WHITE, border = C.BD, bw = 1, fg = C.INK, icon1 = "", iconCol = "", label = "";
    if (state === "selected") {
      bg = "#EFF6FF";
      border = C.ACCENT;
      bw = 2;
    }
    if (state === "correct") {
      bg = "#F0FDF4";
      border = C.SUCCESS;
      bw = 2;
      icon1 = "circle-check";
      iconCol = C.SUCCESS;
      label = "\u0432\u0435\u0440\u043D\u043E";
    }
    if (state === "wrong") {
      bg = "#FEF2F2";
      border = C.ERROR;
      bw = 2;
      icon1 = "circle-x";
      iconCol = C.ERROR;
      label = "\u043C\u0438\u043C\u043E";
    }
    if (state === "critical-error") {
      bg = C.ERROR;
      border = C.ERROR;
      fg = "#FFFFFF";
      const card3 = makeRect(parent, x, y, w, h, bg, 12);
      setShadow(card3, 0, 4, 12, 0.15);
      card3.name = "AnswerOption / critical-error";
      icon(parent, "alert-octagon", x + 14, y + 21, 18, "#FFFFFF");
      makeText(parent, x + 42, y + 10, "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430: \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u0432\u0430\u043D\u0438\u0435 \u0447\u0443\u0432\u0441\u0442\u0432", { size: 13, weight: 600, color: "#FFFFFF", font });
      makeText(parent, x + 42, y + 30, "\u0424\u0440\u0430\u0437\u0430 \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u0442 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430. \u0420\u0430\u0437\u0431\u043E\u0440 \u0431\u0443\u0434\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0451\u043D.", { size: 11, weight: 400, color: "#FECACA", font });
      return h + 26;
    }
    const card2 = makeRect(parent, x, y, w, h, bg, 12);
    setStroke(card2, border, bw, "inner");
    card2.name = "AnswerOption / " + state;
    makeText(parent, x + 14, y + 9, ANSWER_TEXT, { size: 12, weight: 400, color: fg, font });
    chip(parent, x + 14, y + 30, "\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", C.WHITE, "#1D4ED8", font, { dot: "#2563EB", sm: true });
    if (icon1) {
      icon(parent, icon1, x + w - 76, y + 8, 16, iconCol);
      makeText(parent, x + w - 54, y + 9, label, { size: 11, weight: 600, color: iconCol, font });
    }
    return h + 26;
  }
  function techniqueTag(parent, x, y, font) {
    const card2 = makeRect(parent, x, y, 210, 32, "#EFF6FF", 16);
    setStroke(card2, "#BFDBFE", 1, "inner");
    card2.name = "TechniqueTag / default";
    icon(parent, "message-circle", x + 12, y + 8, 15, C.ACCENT);
    makeText(parent, x + 34, y + 7, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", { size: 12, weight: 500, color: "#1D4ED8", font });
  }
  function criticalErrorBanner(parent, x, y, font) {
    const w = 560;
    const h = 72;
    const card2 = makeRect(parent, x, y, w, h, "#FEF2F2", 12);
    setStroke(card2, "#FECACA", 1, "inner");
    card2.name = "CriticalErrorBanner / default";
    makeRect(parent, x, y + 10, 4, h - 20, C.ERROR, 2);
    icon(parent, "alert-octagon", x + 20, y + 16, 20, C.ERROR);
    makeText(parent, x + 52, y + 12, "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430", { size: 14, weight: 600, color: "#991B1B", font });
    makeText(parent, x + 52, y + 34, "\u0412\u044B \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u043B\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 (\xAB\u044D\u0442\u043E \u0435\u0440\u0443\u043D\u0434\u0430, \u0443\u0441\u043F\u043E\u043A\u043E\u0439\u0442\u0435\u0441\u044C\xBB).", { size: 12, weight: 400, color: "#991B1B", font });
    makeText(parent, x + 52, y + 52, "\u0421\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430. \u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u0440\u0430\u0437\u0431\u043E\u0440 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0439 \u043F\u043E\u043F\u044B\u0442\u043A\u043E\u0439.", { size: 12, weight: 400, color: "#B91C1C", font });
  }
  function skillScoreCard(parent, x, y, name, ball, color, font) {
    const w = 280;
    const card2 = makeRect(parent, x, y, w, 84, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "SkillScoreCard / " + name;
    makeText(parent, x + 16, y + 14, name, { size: 14, weight: 600, color: C.INK, font });
    makeText(parent, x + w - 72, y + 10, ball + "/100", { size: 16, weight: 600, color: C.INK, font });
    makeRect(parent, x + 16, y + 46, w - 32, 8, C.BG3, 4);
    makeRect(parent, x + 16, y + 46, Math.max(8, Math.round((w - 32) * ball / 100)), 8, color, 4).name = "skill-bar";
    makeText(parent, x + 16, y + 62, "\u0440\u043E\u0441\u0442 +8 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", { size: 11, weight: 400, color: C.SUCCESS, font });
    return 84;
  }
  var SKILLS = [
    ["\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "#2563EB", 86],
    ["\u042D\u043C\u043F\u0430\u0442\u0438\u044F", "#7C3AED", 72],
    ["\u0413\u0440\u0430\u043D\u0438\u0446\u044B", "#0891B2", 64],
    ["\u042D\u043C\u043E\u0446\u0438\u0438", "#DB2777", 58],
    ["\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", "#65A30D", 77],
    ["\u0421\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B.", "#EA580C", 49],
    ["\u0412\u043E\u043F\u0440\u043E\u0441\u044B", "#0EA5E9", 81],
    ["\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", "#9333EA", 68]
  ];
  function radarSvg(size) {
    const cx = 110, cy = 100, R = 78;
    const scores = SKILLS.map((s2) => s2[2]);
    const pt = (i, r) => {
      const a = -Math.PI / 2 + i * Math.PI / 4;
      return [Math.round((cx + r * Math.cos(a)) * 10) / 10, Math.round((cy + r * Math.sin(a)) * 10) / 10];
    };
    const s = [];
    for (const level of [0.25, 0.5, 0.75, 1]) {
      const pts = scores.map((_, i) => pt(i, R * level).join(",")).join(" ");
      s.push(`<polygon points="${pts}" fill="${level === 1 ? "#F8FAFC" : "none"}" stroke="#E2E8F0" stroke-width="1"/>`);
    }
    for (let i = 0; i < 8; i++) {
      const [px, py] = pt(i, R);
      s.push(`<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#E2E8F0" stroke-width="1"/>`);
    }
    const data = scores.map((v, i) => pt(i, R * v / 100).join(",")).join(" ");
    s.push(`<polygon points="${data}" fill="#2563EB" fill-opacity="0.18" stroke="#2563EB" stroke-width="2"/>`);
    scores.forEach((v, i) => {
      const [px, py] = pt(i, R * v / 100);
      s.push(`<circle cx="${px}" cy="${py}" r="3" fill="#2563EB"/>`);
    });
    return `<svg width="${size}" height="${Math.round(size * 100 / 220)}" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">${s.join("")}</svg>`;
  }
  function radarWithLabels(parent, x, y, font) {
    const svg = penpot.createShapeFromSvg(radarSvg(220));
    if (svg) {
      parent.appendChild(svg);
      svg.x = x;
      svg.y = y;
      svg.name = "SkillRadarChart / default";
    }
    const cx = x + 110, cy = y + 100, R = 78 + 16;
    const labels = SKILLS.map((s) => s[0]);
    labels.forEach((lb, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 4;
      const lx = cx + R * Math.cos(a);
      const ly = cy + R * Math.sin(a);
      const t = makeText(parent, lx - 30, ly - 7, lb, { size: 10, weight: 500, color: C.INK2, font });
      centerTextIn(t, lx - 30, 60);
    });
  }
  function sessionProgress(parent, x, y, font) {
    const w = 420;
    const card2 = makeRect(parent, x, y, w, 56, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "SessionProgress / default";
    makeText(parent, x + 16, y + 10, "\u0428\u0410\u0413 3 \u0418\u0417 7", { size: 11, weight: 500, color: C.INK3, font });
    makeText(parent, x + 100, y + 9, "\u0423\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430", { size: 12, weight: 600, color: C.INK, font });
    makeRect(parent, x + 16, y + 34, 300, 6, C.BG3, 3);
    makeRect(parent, x + 16, y + 34, Math.round(300 * 3 / 7), 6, C.ACCENT, 3).name = "progress-fill";
    const pause = makeRect(parent, x + w - 44, y + 12, 32, 32, C.BG2, 16);
    setStroke(pause, C.BD, 1, "inner");
    pause.name = "Button / pause";
    icon(parent, "pause", x + w - 36, y + 20, 16, C.INK2);
  }
  function loader(parent, x, y, font) {
    const card2 = makeRect(parent, x, y, 240, 88, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "Loader / default";
    try {
      const sp = '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="11" stroke="#EEF0F4" stroke-width="4"/><path d="M 14 3 A 11 11 0 0 1 25 14" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/></svg>';
      const g = penpot.createShapeFromSvg(sp);
      if (g) {
        parent.appendChild(g);
        g.x = x + 20;
        g.y = y + 30;
        g.name = "spinner";
      }
    } catch (_) {
    }
    makeText(parent, x + 60, y + 26, "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439\u2026", { size: 13, weight: 400, color: C.INK2, font });
    makeText(parent, x + 60, y + 46, "\u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u043F\u0430\u0440\u0443 \u0441\u0435\u043A\u0443\u043D\u0434", { size: 11, weight: 400, color: C.INK3, font });
  }
  function onboardingStep(parent, x, y, font) {
    const w = 320;
    const card2 = makeRect(parent, x, y, w, 148, C.INK, 12);
    setShadow(card2, 0, 12, 32, 0.25);
    card2.name = "OnboardingStep / default";
    makeText(parent, x + 20, y + 16, "\u0428\u0410\u0413 2 \u0418\u0417 4 \xB7 \u041E\u041D\u0411\u041E\u0420\u0414\u0418\u041D\u0413", { size: 10, weight: 500, color: "#93C5FD", font });
    makeText(parent, x + 20, y + 38, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E", { size: 16, weight: 600, color: "#FFFFFF", font });
    makeText(parent, x + 20, y + 62, "\u042D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438 \u043F\u043E\u0434 \u0432\u0430\u0448", { size: 12, weight: 400, color: "#CBD5E1", font });
    makeText(parent, x + 20, y + 78, "\u043F\u0440\u043E\u0444\u0438\u043B\u044C: \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E\u0441\u0442\u044C, \u0432\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435, \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u2026", { size: 12, weight: 400, color: "#CBD5E1", font });
    ghostButtonDark(parent, x + 20, y + 104, 92, "\u0414\u0430\u043B\u0435\u0435", font);
    makeText(parent, x + 128, y + 112, "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C", { size: 12, weight: 500, color: "#94A3B8", font });
  }
  function ghostButtonDark(parent, x, y, w, label, font) {
    const b = makeRect(parent, x, y, w, 32, C.ACCENT, 16);
    b.name = "Button / primary / sm / dark-context";
    makeText(parent, x + 24, y + 7, label, { size: 13, weight: 600, color: "#FFFFFF", font });
  }
  function consentBlock(parent, x, y, font) {
    const w = 360;
    const card2 = makeRect(parent, x, y, w, 128, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "ConsentBlock / default";
    const box = makeRect(parent, x + 16, y + 16, 20, 20, C.ACCENT, 6);
    box.name = "checkbox-checked";
    icon(parent, "check", x + 19, y + 19, 14, "#FFFFFF");
    makeText(parent, x + 46, y + 12, "\u042F \u0434\u0430\u044E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443", { size: 13, weight: 400, color: C.INK, font });
    makeText(parent, x + 46, y + 30, "\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445", { size: 13, weight: 400, color: C.INK, font });
    makeText(parent, x + 46, y + 58, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438:", { size: 12, weight: 400, color: C.INK3, font });
    makeText(parent, x + 46, y + 76, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", { size: 12, weight: 500, color: C.ACCENT, font });
    makeText(parent, x + 46, y + 94, "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B", { size: 12, weight: 500, color: C.ACCENT, font });
  }
  function codeDisplay(parent, x, y, font, monoFont) {
    const w = 280;
    const card2 = makeRect(parent, x, y, w, 128, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    setShadow(card2, 0, 4, 12, 0.08);
    card2.name = "CodeDisplay / default";
    makeText(parent, x + 16, y + 14, "\u041A\u041E\u0414 \u0414\u041E\u0421\u0422\u0423\u041F\u0410", { size: 10, weight: 500, color: C.INK3, font });
    makeText(parent, x + 16, y + 36, "A7X9-Q2", { size: 32, weight: 600, color: C.INK, font: monoFont || font });
    makeText(parent, x + 16, y + 78, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0432\u0432\u0435\u0434\u0451\u0442 \u043A\u043E\u0434 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0438\u0433\u0440\u044B", { size: 11, weight: 400, color: C.INK3, font });
    ghostButton(parent, x + 16, y + 92, 132, "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", font, { icon: "copy" });
  }
  function qrSvg(px) {
    const n = 21;
    const m = px / n;
    const cells = [];
    const finder = (fx, fy) => {
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
        const edge = i === 0 || i === 6 || j === 0 || j === 6;
        const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        if (edge || core) cells.push(`<rect x="${(fx + j) * m}" y="${(fy + i) * m}" width="${m}" height="${m}" fill="#0F172A"/>`);
      }
    };
    finder(0, 0);
    finder(n - 7, 0);
    finder(0, n - 7);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const inFinder = x < 8 && y < 8 || x > n - 9 && y < 8 || x < 8 && y > n - 9;
      if (inFinder) continue;
      if ((x * 7 + y * 13 + x * y % 5) % 3 === 0) {
        cells.push(`<rect x="${x * m}" y="${y * m}" width="${m}" height="${m}" fill="#0F172A"/>`);
      }
    }
    return `<svg width="${px}" height="${px}" viewBox="0 0 ${px} ${px}" fill="none" xmlns="http://www.w3.org/2000/svg">${cells.join("")}</svg>`;
  }
  function deepLinkBlock(parent, x, y, font, monoFont) {
    const w = 380;
    const card2 = makeRect(parent, x, y, w, 128, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "DeepLinkBlock / default";
    makeText(parent, x + 16, y + 14, "\u0421\u0421\u042B\u041B\u041A\u0410 \u0414\u041B\u042F \u041A\u041B\u0418\u0415\u041D\u0422\u0410", { size: 10, weight: 500, color: C.INK3, font });
    const urlBox = makeRect(parent, x + 16, y + 32, 240, 32, C.BG2, 8);
    setStroke(urlBox, C.BD, 1, "inner");
    makeText(parent, x + 26, y + 40, "app.platform.ru/g/A7X9Q2", { size: 12, weight: 400, color: C.ACCENT, font: monoFont || font });
    const cp = makeRect(parent, x + 264, y + 32, 32, 32, C.WHITE, 8);
    setStroke(cp, C.BD, 1, "inner");
    cp.name = "Button / copy-icon";
    icon(parent, "copy", x + 272, y + 40, 16, C.INK2);
    try {
      const qr = penpot.createShapeFromSvg(qrSvg(64));
      if (qr) {
        parent.appendChild(qr);
        qr.x = x + 304;
        qr.y = y + 16;
        qr.name = "qr-placeholder";
      }
    } catch (_) {
    }
    makeText(parent, x + 16, y + 76, "\u0418\u043B\u0438 \u043E\u0442\u0441\u043A\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 QR-\u043A\u043E\u0434 \u0432 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C", { size: 11, weight: 400, color: C.INK3, font });
    ghostButton(parent, x + 16, y + 92, 148, "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443", font, { icon: "link-2" });
  }
  function emptyState(parent, x, y, font) {
    const w = 300;
    const card2 = makeRect(parent, x, y, w, 240, C.BG2, 16);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "EmptyState / default";
    icon(parent, "inbox", x + w / 2 - 16, y + 36, 32, C.INK3);
    makeText(parent, x + 40, y + 88, "\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E", { size: 16, weight: 600, color: C.INK, font });
    makeText(parent, x + 30, y + 116, "\u0412\u044B\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0438\u0433\u0440\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F", { size: 12, weight: 400, color: C.INK2, font });
    makeText(parent, x + 52, y + 134, "\u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u0432", { size: 12, weight: 400, color: C.INK2, font });
    ghostButton(parent, x + w / 2 - 62, y + 168, 124, "\u0412\u044B\u0434\u0430\u0442\u044C \u0438\u0433\u0440\u0443", font, { primary: true });
  }
  function verificationBadges(parent, x, y, font) {
    const items = [
      ["unverified", "\u0411\u0435\u0437 \u0441\u0442\u0430\u0442\u0443\u0441\u0430", C.BG2, C.INK2],
      ["pending", "\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", "#FEF3C7", "#92400E"],
      ["verified", "\u0412\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D", "#DCFCE7", "#166534"],
      ["rejected", "\u041E\u0442\u043A\u043B\u043E\u043D\u0451\u043D", "#FEE2E2", "#991B1B"]
    ];
    const icons = { unverified: "user", pending: "clock", verified: "badge-check", rejected: "circle-x" };
    let cy = y;
    items.forEach((it) => {
      const w = Math.round(it[1].length * 6.8) + 46;
      const card2 = makeRect(parent, x, cy, w, 30, it[2], 15);
      card2.name = "VerificationBadge / " + it[0];
      icon(parent, icons[it[0]], x + 12, cy + 8, 14, it[3]);
      makeText(parent, x + 32, cy + 7, it[1], { size: 12, weight: 500, color: it[3], font });
      cy += 40;
    });
    return cy - y;
  }
  function supervisionComment(parent, x, y, font) {
    const w = 460;
    const card2 = makeRect(parent, x, y, w, 148, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "SupervisionComment / default";
    const av = makeEllipse(parent, x + 16, y + 14, 36, 36, C.ACCENT2);
    av.name = "avatar";
    makeText(parent, x + 24, y + 24, "\u041C\u041F", { size: 13, weight: 600, color: "#FFFFFF", font });
    makeText(parent, x + 64, y + 14, "\u041C. \u041F\u0435\u0442\u0440\u043E\u0432\u0430", { size: 13, weight: 600, color: C.INK, font });
    makeText(parent, x + 64, y + 32, "\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440 \xB7 14.09.2026", { size: 11, weight: 400, color: C.INK3, font });
    makeRect(parent, x + 16, y + 62, 3, 70, C.ACCENT2, 2);
    makeText(parent, x + 32, y + 62, "\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u0445\u043E\u0434 \u043D\u0430 4-\u0439 \u0440\u0435\u043F\u043B\u0438\u043A\u0435. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043D\u0430", { size: 12, weight: 400, color: C.INK2, font });
    makeText(parent, x + 32, y + 80, "\u043C\u043E\u043C\u0435\u043D\u0442 06:40 \u2014 \u043A\u043B\u0438\u0435\u043D\u0442 \u0434\u0432\u0430\u0436\u0434\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u043A \u0442\u0435\u043C\u0435", { size: 12, weight: 400, color: C.INK2, font });
    makeText(parent, x + 32, y + 98, "\u043E\u0442\u0446\u0430: \u0443\u043C\u0435\u0441\u0442\u0435\u043D \u0446\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441. \u041E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 \u0441\u0435\u0441\u0441\u0438\u044E:", { size: 12, weight: 400, color: C.INK2, font });
    makeText(parent, x + 32, y + 116, "82/100. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \xAB\u0426\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B\xBB.", { size: 12, weight: 400, color: C.INK2, font });
  }
  function auditLogRow(parent, x, y, font) {
    const w = 620;
    const row = makeRect(parent, x, y, w, 48, C.WHITE, 10);
    setStroke(row, C.BD, 1, "inner");
    row.name = "AuditLogRow / default";
    icon(parent, "fingerprint", x + 14, y + 16, 16, C.INK3);
    makeText(parent, x + 40, y + 15, "admin@platform.ru", { size: 12, weight: 500, color: C.INK, font });
    makeText(parent, x + 200, y + 15, "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B", { size: 12, weight: 400, color: C.INK2, font });
    makeText(parent, x + 300, y + 15, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 #142 \xAB\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F\xBB", { size: 12, weight: 500, color: C.ACCENT, font });
    makeText(parent, x + w - 110, y + 15, "16.09.2026 14:32", { size: 11, weight: 400, color: C.INK3, font });
  }
  function bottomNav(parent, x, y, font) {
    const w = 390, h = 64;
    const bar = makeRect(parent, x, y, w, h, C.WHITE, 0);
    setStroke(bar, C.BD, 1, "inner");
    bar.name = "BottomNav / TMA / default";
    const items = [
      ["home", "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", true],
      ["book-open", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438", false],
      ["sparkles", "\u0418\u0433\u0440\u044B", false],
      ["chart-column", "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441", false],
      ["user", "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", false]
    ];
    items.forEach((it, i) => {
      const cx = x + 12 + i * 76;
      const col = it[2] ? C.ACCENT : C.INK3;
      icon(parent, it[0], cx + 8, y + 10, 20, col);
      makeText(parent, cx, y + 36, it[1], { size: 9, weight: it[2] ? 600 : 400, color: col, font });
    });
  }
  function mainButton(parent, x, y, font, variant) {
    const w = 390, h = 80;
    const bar = makeRect(parent, x, y, w, h, C.WHITE, 0);
    setStroke(bar, C.BD, 1, "inner");
    bar.name = "MainButton / TMA / " + variant;
    const enabled = variant === "enabled";
    const btn2 = makeRect(parent, x + 16, y + 10, w - 32, 44, enabled ? C.ACCENT : C.BG3, 22);
    btn2.name = "tg-main-button";
    const t = makeText(
      parent,
      x + 100,
      y + 22,
      enabled ? "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" : "\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435\u2026",
      { size: 15, weight: 600, color: enabled ? "#FFFFFF" : C.INK3, font }
    );
    centerTextIn(t, x + 16, w - 32);
    makeText(parent, x + 16, y + 62, "\u0437\u043E\u043D\u0430 safe area \xB7 \u0432\u044B\u0441\u043E\u0442\u0430 80px", { size: 9, weight: 400, color: C.INK3, font });
  }
  function buildDomainBoard(log) {
    const font = pickFont(FONT_FALLBACKS);
    const lib = penpot.library.local;
    const existing = /* @__PURE__ */ new Set();
    try {
      for (const c of lib.components) existing.add(c.name);
    } catch (_) {
    }
    const board = penpot.createBoard();
    board.name = BOARD_NAME2;
    board.x = 100 + 2 * (1240 + 200);
    board.y = 100;
    setOrigin(board.x, board.y);
    try {
      board.resize(CW2, 400);
    } catch (_) {
    }
    try {
      board.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }];
    } catch (_) {
    }
    setStroke(board, C.BD, 1, "inner");
    let y = M2;
    makeText(board, M2, y, "Platform \u2014 Domain components", { size: 40, weight: 700, color: C.INK, font });
    y += 56;
    makeText(
      board,
      M2,
      y,
      "\u0414\u043E\u043C\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0422\u0417 4.2 \xB7 \u0440\u0430\u0434\u0430\u0440 \u0438 QR \u2014 \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u044B\u0435 SVG-\u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B \xB7 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 Assets",
      { size: 13, weight: 400, color: C.INK2, font }
    );
    y += 80;
    y = sectionTitle(board, M2, y, "ScenarioCard \xB7 GameCard \xB7 ClientAccessCard", "\u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B default / compact / locked \xB7 \u0441\u0442\u0430\u0442\u0443\u0441\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u0432");
    const yCards = y;
    startBag();
    scenarioCardDefault(board, M2, yCards, font);
    registerComponent(endBag(), "ScenarioCard / default", existing, log);
    startBag();
    scenarioCardCompact(board, M2 + 356, yCards, font);
    registerComponent(endBag(), "ScenarioCard / compact", existing, log);
    startBag();
    scenarioCardLocked(board, M2 + 692, yCards, font);
    registerComponent(endBag(), "ScenarioCard / locked", existing, log);
    caption(board, M2, yCards + 226, "default");
    caption(board, M2 + 356, yCards + 226, "compact");
    caption(board, M2 + 692, yCards + 226, "locked");
    startBag();
    gameCard(board, M2, yCards + 252, font);
    registerComponent(endBag(), "GameCard / default", existing, log);
    startBag();
    clientAccessCard(board, M2 + 336, yCards + 252, "active", font);
    registerComponent(endBag(), "ClientAccessCard / active", existing, log);
    startBag();
    clientAccessCard(board, M2 + 692, yCards + 252, "expired", font);
    registerComponent(endBag(), "ClientAccessCard / expired", existing, log);
    caption(board, M2, yCards + 430, "GameCard");
    caption(board, M2 + 336, yCards + 394, "access / active");
    caption(board, M2 + 692, yCards + 394, "access / expired");
    startBag();
    clientAccessCard(board, M2 + 336, yCards + 440, "completed", font);
    registerComponent(endBag(), "ClientAccessCard / completed", existing, log);
    startBag();
    clientAccessCard(board, M2 + 692, yCards + 440, "revoked", font);
    registerComponent(endBag(), "ClientAccessCard / revoked", existing, log);
    y = yCards + 600;
    y = sectionTitle(board, M2, y, "ClientMessageBubble \xB7 EmotionIndicator", "left (\u043A\u043B\u0438\u0435\u043D\u0442) / right (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433) \xB7 \u044D\u043C\u043E\u0446\u0438\u044F = \u0438\u043A\u043E\u043D\u043A\u0430 + \u0446\u0432\u0435\u0442 + \u0442\u0435\u043A\u0441\u0442 (WCAG)");
    startBag();
    bubbleLeft(board, M2, y, font);
    registerComponent(endBag(), "ClientMessageBubble / left", existing, log);
    startBag();
    bubbleRight(board, M2 + 520, y, font);
    registerComponent(endBag(), "ClientMessageBubble / right", existing, log);
    caption(board, M2, y + 118, "left \xB7 \u0441 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u043C \u044D\u043C\u043E\u0446\u0438\u0438");
    caption(board, M2 + 520, y + 80, "right");
    startBag();
    emotionIndicatorCompact(board, M2 + 520, y + 100, font);
    registerComponent(endBag(), "EmotionIndicator / compact", existing, log);
    startBag();
    emotionIndicatorExtended(board, M2, y + 160, font);
    registerComponent(endBag(), "EmotionIndicator / extended", existing, log);
    caption(board, M2 + 520, y + 152, "compact");
    caption(board, M2, y + 244, "extended \xB7 \u0448\u043A\u0430\u043B\u0430 0\u201310");
    y += 290;
    y = sectionTitle(board, M2, y, "AnswerOption \xB7 TechniqueTag \xB7 CriticalErrorBanner", "default / selected / correct / wrong / critical-error");
    const states = ["default", "selected", "correct", "wrong", "critical-error"];
    states.forEach((st, i) => {
      startBag();
      const used = answerOption(board, M2, y + i * 62, st, font);
      registerComponent(endBag(), "AnswerOption / " + st, existing, log);
      caption(board, M2 + 480, y + i * 62 + 16, st);
    });
    startBag();
    techniqueTag(board, M2 + 560, y, font);
    registerComponent(endBag(), "TechniqueTag / default", existing, log);
    caption(board, M2 + 560, y + 40, "technique tag");
    startBag();
    criticalErrorBanner(board, M2 + 560, y + 76, font);
    registerComponent(endBag(), "CriticalErrorBanner / default", existing, log);
    caption(board, M2 + 560, y + 156, "critical error banner");
    y += 390;
    y = sectionTitle(board, M2, y, "SkillScoreCard \xB7 SkillRadarChart", "\u0431\u0430\u043B\u043B 0\u2013100 \xB7 \u0440\u0430\u0434\u0430\u0440 8 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 (\u0441\u0442\u0430\u0442\u0438\u0447\u043D\u044B\u0439 SVG-\u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440)");
    startBag();
    skillScoreCard(board, M2, y, "\u042D\u043C\u043F\u0430\u0442\u0438\u044F", 72, "#7C3AED", font);
    registerComponent(endBag(), "SkillScoreCard / default", existing, log);
    skillScoreCard(board, M2 + 300, y, "\u0421\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", 49, "#EA580C", font);
    skillScoreCard(board, M2 + 600, y, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 86, "#2563EB", font);
    caption(board, M2, y + 94, "skill cards");
    startBag();
    radarWithLabels(board, M2 + 60, y + 130, font);
    registerComponent(endBag(), "SkillRadarChart / default", existing, log);
    caption(board, M2 + 60, y + 400, "radar \xB7 SVG-\u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440");
    y += 450;
    y = sectionTitle(board, M2, y, "SessionProgress \xB7 Loader \xB7 OnboardingStep", "\u0448\u0430\u0433 X/Y + \u043F\u0430\u0443\u0437\u0430 \xB7 \u0441\u043F\u0438\u043D\u043D\u0435\u0440 \xB7 \u043A\u043E\u0443\u0447-\u043C\u0430\u0440\u043A \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433\u0430");
    startBag();
    sessionProgress(board, M2, y, font);
    registerComponent(endBag(), "SessionProgress / default", existing, log);
    startBag();
    loader(board, M2 + 460, y, font);
    registerComponent(endBag(), "Loader / default", existing, log);
    startBag();
    onboardingStep(board, M2 + 760, y, font);
    registerComponent(endBag(), "OnboardingStep / default", existing, log);
    y += 200;
    y = sectionTitle(board, M2, y, "ConsentBlock \xB7 CodeDisplay \xB7 DeepLinkBlock", "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 (E-41) \xB7 \u043A\u043E\u0434 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 mono \xB7 \u0441\u0441\u044B\u043B\u043A\u0430 + QR");
    startBag();
    consentBlock(board, M2, y, font);
    registerComponent(endBag(), "ConsentBlock / default", existing, log);
    startBag();
    codeDisplay(board, M2 + 400, y, font, null);
    registerComponent(endBag(), "CodeDisplay / default", existing, log);
    startBag();
    deepLinkBlock(board, M2 + 720, y, font, null);
    registerComponent(endBag(), "DeepLinkBlock / default", existing, log);
    y += 170;
    y = sectionTitle(board, M2, y, "EmptyState \xB7 VerificationBadge \xB7 SupervisionComment \xB7 AuditLogRow", "\u043F\u0443\u0441\u0442\u044B\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \xB7 \u0441\u0442\u0430\u0442\u0443\u0441\u044B \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \xB7 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \xB7 \u0430\u0443\u0434\u0438\u0442");
    startBag();
    emptyState(board, M2, y, font);
    registerComponent(endBag(), "EmptyState / default", existing, log);
    startBag();
    verificationBadges(board, M2 + 360, y, font);
    registerComponent(endBag(), "VerificationBadge / verified", existing, log);
    startBag();
    supervisionComment(board, M2 + 560, y, font);
    registerComponent(endBag(), "SupervisionComment / default", existing, log);
    startBag();
    auditLogRow(board, M2 + 360, y + 180, font);
    registerComponent(endBag(), "AuditLogRow / default", existing, log);
    caption(board, M2, y + 250, "empty state");
    caption(board, M2 + 360, y + 156, "badges \xD74");
    caption(board, M2 + 560, y + 156, "comment");
    caption(board, M2 + 360, y + 236, "audit log row");
    y += 300;
    y = sectionTitle(board, M2, y, "TMA: BottomNav \xB7 MainButton", "Telegram Mini App \xB7 \u0442\u043E\u043B\u044C\u043A\u043E 390 \xB7 safe area");
    startBag();
    bottomNav(board, M2, y, font);
    registerComponent(endBag(), "BottomNav / TMA", existing, log);
    caption(board, M2, y + 72, "BottomNav \xB7 64px \xB7 \u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0432\u043A\u043B\u0430\u0434\u043A\u0430 = accent");
    startBag();
    mainButton(board, M2 + 460, y, font, "enabled");
    registerComponent(endBag(), "MainButton / TMA / enabled", existing, log);
    startBag();
    mainButton(board, M2 + 880, y, font, "disabled");
    registerComponent(endBag(), "MainButton / TMA / disabled", existing, log);
    caption(board, M2 + 460, y + 92, "MainButton \xB7 80px safe area");
    caption(board, M2 + 880, y + 92, "disabled");
    y += 140;
    makeText(
      board,
      M2,
      y,
      "\u0414\u0430\u043B\u044C\u0448\u0435: \u044D\u043A\u0440\u0430\u043D\u044B (\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 4+): E-01\u2026E-85 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0438\u0437 \u044D\u0442\u0438\u0445 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432.",
      { size: 12, weight: 400, color: C.INK3, font }
    );
    y += 48;
    try {
      board.resize(CW2, y);
    } catch (_) {
    }
    log.push("\u2713 Domain: \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432: " + existing.size);
  }

  // src/screens.ts
  var D = { w: 1440, h: 900, kind: "desktop" };
  var T = { w: 768, h: 1024, kind: "tablet" };
  var MB = { w: 390, h: 844, kind: "mobile" };
  var F = null;
  function txt(f, x, y, s, size, weight, color) {
    return makeText(f, x, y, s, { size, weight, color, font: F });
  }
  function rect(f, x, y, w, h, fill, r) {
    return makeRect(f, x, y, w, h, fill, r);
  }
  function line(f, x, y, w) {
    rect(f, x, y, w, 1, C.BD, 0);
  }
  function ic(f, name, x, y, s, color) {
    icon(f, name, x, y, s, color);
  }
  function avatar(f, x, y, size, initials, bg) {
    const a = makeEllipse(f, x, y, size, size, bg || C.ACCENT2);
    a.name = "avatar";
    const fs = Math.round(size * 0.34);
    const t = txt(f, x, y + size / 2 - fs * 0.62, initials, fs, 600, "#FFFFFF");
    centerTextIn(t, x, size);
  }
  function btn(f, x, y, w, label, style, opts = {}) {
    const h = opts.h || 40;
    const fs = opts.fs || 14;
    const bg = style === "primary" ? C.ACCENT : style === "secondary" ? C.WHITE : null;
    const b = rect(f, x, y, w, h, bg, h / 2);
    b.name = "Button / " + style;
    if (style === "secondary") setStroke(b, C.BD, 1, "inner");
    const fg = style === "primary" ? "#FFFFFF" : style === "ghost" ? C.ACCENT : C.INK;
    const tw = Math.round(label.length * fs * 0.62) + (opts.icon ? 26 : 0);
    let tx = x + (w - tw) / 2;
    if (opts.icon) {
      ic(f, opts.icon, tx, y + (h - 16) / 2, 16, fg);
      tx += 26;
    }
    const t = txt(f, tx, y + (h - fs - 4) / 2, label, fs, 600, fg);
    centerTextIn(t, tx, tw);
    void opts.full;
  }
  function inputLine(f, x, y, w, label, value, opts = {}) {
    txt(f, x, y, label, 12, 500, C.INK2);
    const field = rect(f, x, y + 24, w, 40, C.WHITE, 8);
    setStroke(field, C.BD, 1, "inner");
    field.name = "Input / " + label.toLowerCase();
    txt(f, x + 12, y + 34, value, 14, 400, C.INK);
    if (opts.password) ic(f, "eye-off", x + w - 28, y + 34, 16, C.INK3);
    return 86;
  }
  function openFrame(name, x, y, w, h) {
    const f = penpot.createBoard();
    f.name = name;
    f.x = x;
    f.y = y;
    try {
      f.resize(w, h);
    } catch (_) {
    }
    try {
      f.fills = [{ fillColor: C.WHITE, fillOpacity: 1 }];
    } catch (_) {
    }
    setStroke(f, C.BD, 1, "inner");
    setOrigin(x, y);
    return f;
  }
  var NAV = [
    ["home", "\u0414\u0430\u0448\u0431\u043E\u0440\u0434"],
    ["book-open", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438"],
    ["sparkles", "\u0418\u0433\u0440\u044B"],
    ["users", "\u041A\u043B\u0438\u0435\u043D\u0442\u044B"],
    ["chart-column", "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"],
    ["settings", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"]
  ];
  function bottomNavM(f, w, y, active) {
    const items = [
      ["home", "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"],
      ["book-open", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438"],
      ["sparkles", "\u0418\u0433\u0440\u044B"],
      ["chart-column", "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"],
      ["user", "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"]
    ];
    const bar = rect(f, 0, y, w, 64, C.WHITE, 0);
    setStroke(bar, C.BD, 1, "inner");
    bar.name = "BottomNav / TMA";
    items.forEach((it, i) => {
      const cx = 12 + i * 76;
      const col = i === active ? C.ACCENT : C.INK3;
      ic(f, it[0], cx + 8, y + 10, 20, col);
      txt(f, cx, y + 36, it[1], 9, i === active ? 600 : 400, col);
    });
  }
  function shell(f, m, active, title) {
    if (m.kind === "mobile") {
      const bar = rect(f, 0, 0, m.w, 56, C.WHITE, 0);
      setStroke(bar, C.BD, 1, "inner");
      rect(f, 16, 16, 24, 24, C.ACCENT, 7);
      txt(f, 48, 18, "Platform", 15, 700, C.INK);
      avatar(f, m.w - 44, 14, 28, "\u0410\u041A");
      bottomNavM(f, m.w, m.h - 64, active);
      return { cx: 16, cy: 72, cw: m.w - 32, ch: m.h - 56 - 64 };
    }
    const sbw = m.kind === "desktop" ? 240 : 64;
    const sb = rect(f, 0, 0, sbw, m.h, C.BG2, 0);
    sb.name = "sidebar";
    rect(f, m.kind === "desktop" ? 24 : 20, 20, 28, 28, C.ACCENT, 8);
    if (m.kind === "desktop") txt(f, 62, 22, "Platform", 16, 700, C.INK);
    NAV.forEach((it, i) => {
      const ny = 88 + i * 44;
      const isActive = i === active;
      if (isActive && m.kind === "desktop") {
        const itemBg = rect(f, 12, ny - 6, sbw - 24, 40, C.WHITE, 10);
        itemBg.name = "nav-item/active";
        rect(f, 12, ny - 6, 3, 40, C.ACCENT, 2);
      }
      ic(f, it[0], m.kind === "desktop" ? 28 : 22, ny + 2, 20, isActive ? C.ACCENT : C.INK3);
      if (m.kind === "desktop") txt(f, 60, ny + 5, it[1], 14, isActive ? 600 : 400, isActive ? C.INK : C.INK2);
    });
    if (m.kind === "desktop") {
      avatar(f, 20, m.h - 64, 36, "\u0410\u041A");
      txt(f, 66, m.h - 62, "\u0410\u043D\u043D\u0430 \u041A.", 13, 600, C.INK);
      txt(f, 66, m.h - 44, "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", 11, 400, C.INK3);
    }
    const tb = rect(f, sbw, 0, m.w - sbw, 72, C.WHITE, 0);
    setStroke(tb, C.BD, 1, "inner");
    tb.name = "topbar";
    txt(f, sbw + 24, 24, title, 20, 600, C.INK);
    ic(f, "search", m.w - 120, 26, 20, C.INK2);
    avatar(f, m.w - 84, 20, 32, "\u0410\u041A");
    return { cx: sbw + 24, cy: 96, cw: m.w - sbw - 48, ch: m.h - 120 };
  }
  function authShell(f, m) {
    rect(f, 20, 20, 28, 28, C.ACCENT, 8);
    txt(f, 56, 22, "Platform", 16, 700, C.INK);
    const cardW = Math.min(480, m.w - 40);
    const cardX = Math.round((m.w - cardW) / 2);
    return { cardX, cardW, y: 120 };
  }
  function cardBox(f, x, y, w, h, name) {
    const c = rect(f, x, y, w, h, C.WHITE, 12);
    setStroke(c, C.BD, 1, "inner");
    setShadow(c, 0, 4, 12, 0.08);
    c.name = name;
  }
  function bubble(f, x, y, w, text1, text2, side) {
    const h = 64;
    const b = rect(f, x, y, w, h, side === "left" ? C.BG2 : C.ACCENT, 12);
    b.name = "ClientMessageBubble / " + side;
    txt(f, x + 16, y + 12, text1, 14, 400, side === "left" ? C.INK : "#FFFFFF");
    txt(f, x + 16, y + 32, text2, 14, 400, side === "left" ? C.INK : "#FFFFFF");
    return h;
  }
  function answerRow(f, x, y, w, text, tech) {
    const h = 58;
    const card2 = rect(f, x, y, w, h, C.WHITE, 12);
    setStroke(card2, C.BD, 1, "inner");
    card2.name = "AnswerOption / default";
    txt(f, x + 14, y + 9, text, 12, 400, C.INK);
    const chipBg = rect(f, x + 14, y + 30, tech.length * 6.6 + 26, 22, C.WHITE, 11);
    setStroke(chipBg, C.BD, 1, "inner");
    makeEllipse(f, x + 22, y + 37, 8, 8, "#2563EB");
    txt(f, x + 34, y + 33, tech, 11, 500, "#1D4ED8");
    return h + 12;
  }
  function skillBarRow(f, x, y, w, name, ball, color) {
    txt(f, x, y, name, 12, 500, C.INK2);
    txt(f, x + w - 46, y, String(ball), 12, 600, C.INK);
    rect(f, x, y + 20, w, 6, C.BG3, 3);
    rect(f, x, y + 20, Math.max(6, Math.round(w * ball / 100)), 6, color, 3);
    return 40;
  }
  function e01(f, m) {
    rect(f, 20, 20, 28, 28, C.ACCENT, 8);
    txt(f, 56, 22, "Platform", 16, 700, C.INK);
    if (m.kind === "desktop") {
      ["\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438", "\u0418\u0433\u0440\u044B", "\u0422\u0430\u0440\u0438\u0444\u044B"].forEach((l, i) => {
        txt(f, 460 + i * 110, 25, l, 14, 400, C.INK2);
      });
    }
    btn(f, m.w - (m.kind === "desktop" ? 220 : 130), 16, m.kind === "desktop" ? 96 : 110, "\u0412\u043E\u0439\u0442\u0438", "ghost", { h: 36 });
    btn(f, m.w - (m.kind === "desktop" ? 116 : 16), 16, 100, "\u041D\u0430\u0447\u0430\u0442\u044C", "primary", { h: 36, fs: 13 });
    const isDesktop = m.kind === "desktop";
    const hx = isDesktop ? 96 : 24;
    let hy = 130;
    txt(f, hx, hy, "\u041E\u0411\u0423\u0427\u0410\u042E\u0429\u0410\u042F \u041F\u041B\u0410\u0422\u0424\u041E\u0420\u041C\u0410 \u0414\u041B\u042F \u041F\u0421\u0418\u0425\u041E\u041B\u041E\u0413\u041E\u0412", 12, 500, C.ACCENT);
    hy += 32;
    txt(f, hx, hy, "\u041E\u0442\u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E", isDesktop ? 40 : 30, 700, C.INK);
    hy += isDesktop ? 48 : 38;
    txt(f, hx, hy, "\u0434\u043E \u0432\u0441\u0442\u0440\u0435\u0447\u0438 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C", isDesktop ? 40 : 30, 700, C.INK);
    hy += isDesktop ? 60 : 48;
    txt(f, hx, hy, "\u0421\u0438\u043C\u0443\u043B\u044F\u0442\u043E\u0440 \u0441 \u0418\u0418-\u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C, \u0440\u0430\u0437\u0431\u043E\u0440 \u043F\u043E 8 \u043D\u0430\u0432\u044B\u043A\u0430\u043C \u0438 \u0442\u0435\u0440\u0430\u043F\u0435\u0432\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435", 16, 400, C.INK2);
    hy += 26;
    txt(f, hx, hy, "\u0438\u0433\u0440\u044B \u0434\u043B\u044F \u0432\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u2014 \u0432 \u0432\u0435\u0431\u0435 \u0438 Telegram.", 16, 400, C.INK2);
    hy += 40;
    btn(f, hx, hy, 200, "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0434\u0435\u043C\u043E", "primary", { icon: "play", h: 48 });
    if (isDesktop) btn(f, hx + 216, hy, 160, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", "secondary", { h: 48 });
    hy += 84;
    if (isDesktop) {
      cardBox(f, 800, 120, 520, 380, "demo-preview");
      rect(f, 800, 120, 520, 40, C.BG2, 12);
      makeEllipse(f, 820, 132, 16, 16, C.ERROR);
      makeEllipse(f, 844, 132, 16, 16, C.WARNING);
      makeEllipse(f, 868, 132, 16, 16, C.SUCCESS);
      txt(f, 900, 132, "\u0414\u0435\u043C\u043E \xB7 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \xAB\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F\xBB", 12, 400, C.INK2);
      bubble(f, 824, 184, 400, "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435. \u041C\u043D\u0435 \u043D\u0435\u043C\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u0430\u0448\u043D\u043E", "\u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u2026 \u043D\u043E \u043F\u043E\u0440\u0430 \u0447\u0442\u043E-\u0442\u043E \u043C\u0435\u043D\u044F\u0442\u044C.", "left");
      txt(f, 824, 258, "\u044D\u043C\u043E\u0446\u0438\u044F 4/10 \xB7 \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E\u0441\u0442\u044C", 11, 500, C.WARNING);
      answerRow(f, 824, 284, 472, "\u0420\u0430\u0434, \u0447\u0442\u043E \u0432\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u043F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u043E\u0431 \u044D\u0442\u043E\u043C. \u0427\u0442\u043E \u0441\u0442\u0440\u0430\u0448\u043D\u0435\u0435 \u0432\u0441\u0435\u0433\u043E?", "\u044D\u043C\u043F\u0430\u0442\u0438\u044F");
      answerRow(f, 824, 354, 472, "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u0432\u044B \u0443\u0436\u0435 \u043F\u0440\u043E\u0431\u043E\u0432\u0430\u043B\u0438 \u043C\u0435\u043D\u044F\u0442\u044C?", "\u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435");
    } else {
      cardBox(f, hx, hy, m.w - 48, 240, "demo-preview");
      bubble(f, hx + 16, hy + 16, m.w - 80, "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435. \u041C\u043D\u0435 \u043D\u0435\u043C\u043D\u043E\u0433\u043E", "\u0441\u0442\u0440\u0430\u0448\u043D\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u2026 \u043D\u043E \u043F\u043E\u0440\u0430.", "left");
      txt(f, hx + 16, hy + 90, "\u044D\u043C\u043E\u0446\u0438\u044F 4/10 \xB7 \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E\u0441\u0442\u044C", 11, 500, C.WARNING);
      answerRow(f, hx + 16, hy + 112, m.w - 80, "\u0420\u0430\u0434, \u0447\u0442\u043E \u0432\u044B \u0440\u0435\u0448\u0438\u043B\u0438\u0441\u044C. \u0427\u0442\u043E \u0441\u0442\u0440\u0430\u0448\u043D\u0435\u0435 \u0432\u0441\u0435\u0433\u043E?", "\u044D\u043C\u043F\u0430\u0442\u0438\u044F");
      hy += 270;
    }
    const advY = isDesktop ? 620 : hy + 16;
    const cards = [
      ["target", "8 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 \u0441 \u0440\u0430\u0437\u0431\u043E\u0440\u043E\u043C", "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435, \u044D\u043C\u043F\u0430\u0442\u0438\u044F, \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u2014 \u0441 \u0431\u0430\u043B\u043B\u0430\u043C\u0438 \u0438 \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u043C\u0438 \u0445\u043E\u0434\u0430\u043C\u0438"],
      ["chart-column", "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u044F \u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441", "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0430, \u0440\u0430\u0434\u0430\u0440 \u043D\u0430\u0432\u044B\u043A\u043E\u0432, \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u043F\u043E \u043D\u0435\u0434\u0435\u043B\u044F\u043C"],
      ["sparkles", "\u0418\u0433\u0440\u044B \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432", "\u0412\u044B\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0442\u0435\u0440\u0430\u043F\u0435\u0432\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0438\u0433\u0440\u044B \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0438 \u043A\u043E\u0434\u0443 \u2014 \u0432 Telegram \u0438\u043B\u0438 \u0432\u0435\u0431\u0435"]
    ];
    const cw = isDesktop ? (m.w - 96 * 2 - 48) / 3 : m.w - 48;
    cards.forEach((cdef, i) => {
      const cx = isDesktop ? 96 + i * (cw + 24) : 24;
      const cy = isDesktop ? advY : advY + i * 128;
      cardBox(f, cx, cy, cw, isDesktop ? 170 : 116, "advantage");
      ic(f, cdef[0], cx + 20, cy + 20, 24, C.ACCENT);
      txt(f, cx + 56, cy + 22, cdef[1], 15, 600, C.INK);
      txt(f, cx + 20, cy + 58, cdef[2].slice(0, isDesktop ? 46 : 40), 12, 400, C.INK2);
      if (!isDesktop) txt(f, cx + 20, cy + 76, cdef[2].slice(isDesktop ? 46 : 40) || " ", 12, 400, C.INK2);
    });
    const ft = rect(f, 0, m.h - 56, m.w, 56, C.INK, 0);
    ft.name = "footer";
    txt(f, 24, m.h - 37, "\xA9 2026 Platform \xB7 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \xB7 \u041E\u0444\u0435\u0440\u0442\u0430", 12, 400, "#94A3B8");
  }
  function e02(f, m) {
    rect(f, 20, 20, 28, 28, C.ACCENT, 8);
    txt(f, 56, 22, "Platform", 16, 700, C.INK);
    btn(f, m.w - 120, 16, 100, "\u0412\u043E\u0439\u0442\u0438", "ghost", { h: 36 });
    const bw = m.w - (m.kind === "desktop" ? 96 * 2 : 32);
    const bx = m.kind === "desktop" ? 96 : 16;
    const bn = rect(f, bx, 72, bw, 52, "#EFF6FF", 10);
    setStroke(bn, "#BFDBFE", 1, "inner");
    bn.name = "banner/register";
    ic(f, "info", bx + 16, 88, 18, C.ACCENT);
    txt(f, bx + 44, 82, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441", 13, 500, "#1E40AF");
    txt(f, bx + 44, 102, "\u0414\u0435\u043C\u043E: 1 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \xB7 \u0431\u0435\u0437 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F", 11, 400, "#3B82F6");
    const sw = Math.min(680, bw - 32);
    const sx = Math.round((m.w - sw) / 2);
    let sy = 152;
    txt(f, sx, sy, "\u0428\u0410\u0413 1 \u0418\u0417 3", 11, 500, C.INK3);
    txt(f, sx + 90, sy - 1, "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F", 12, 600, C.INK);
    rect(f, sx, sy + 20, sw, 6, C.BG3, 3);
    rect(f, sx, sy + 20, Math.round(sw / 3), 6, C.ACCENT, 3);
    sy += 52;
    sy += bubble(f, sx, sy, Math.min(sw - 40, 430), "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435\u2026 \u0427\u0435\u0441\u0442\u043D\u043E, \u044F \u0443\u0436\u0435 \u043D\u0435 \u0437\u043D\u0430\u044E,", "\u043A\u0443\u0434\u0430 \u0441\u0435\u0431\u044F \u0434\u0435\u0432\u0430\u0442\u044C. \u0412\u0441\u0451 \u0432\u0430\u043B\u0438\u0442\u0441\u044F \u0438\u0437 \u0440\u0443\u043A.", "left") + 26;
    ic(f, "frown", sx + 2, sy, 14, C.ERROR);
    txt(f, sx + 22, sy - 2, "\u044D\u043C\u043E\u0446\u0438\u044F 3/10 \xB7 \u043D\u0438\u0437\u043A\u0438\u0439 \u0444\u043E\u043D", 11, 500, C.ERROR);
    sy += 28;
    sy += answerRow(f, sx, sy, sw, "\u0420\u0430\u0434, \u0447\u0442\u043E \u0432\u044B \u043D\u0430\u043F\u0438\u0441\u0430\u043B\u0438. \u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u043E\u0441\u044C \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u043D\u0435\u0434\u0435\u043B\u044E?", "\u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435");
    sy += answerRow(f, sx, sy, sw, "\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u0434\u043B\u044F \u0432\u0430\u0441 \u0432\u0441\u0451 \u0441\u043B\u0438\u0448\u043A\u043E\u043C. \u041A\u0430\u043A \u0432\u044B \u044D\u0442\u043E \u043E\u0449\u0443\u0449\u0430\u0435\u0442\u0435?", "\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435");
    sy += answerRow(f, sx, sy, sw, "\u041D\u0430\u0447\u043D\u0451\u043C \u0441 \u0434\u044B\u0445\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0443\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0439, \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442.", "\u0441\u043E\u0432\u0435\u0442 \u0431\u0435\u0437 \u0437\u0430\u043F\u0440\u043E\u0441\u0430");
    const own = rect(f, sx, sy, sw, 44, C.WHITE, 10);
    try {
      own.strokes = [{ strokeColor: C.INK3, strokeOpacity: 1, strokeWidth: 1, strokeAlignment: "inner", strokeStyle: "dashed" }];
    } catch (_) {
    }
    own.name = "own-variant";
    txt(f, sx + 16, sy + 13, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u2026 (beta)", 13, 400, C.INK3);
    if (m.kind === "mobile") {
      btn(f, 16, m.h - 84, m.w - 32, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", "primary", { h: 48 });
    }
  }
  function e03(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX;
    const w = sh.cardW;
    let y = sh.y;
    cardBox(f, x, y, w, 468, "E-03 card");
    const px = x + 28;
    const pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u0412\u0445\u043E\u0434", 24, 700, C.INK);
    cy += 44;
    btn(f, px, cy, pw, "\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Telegram", "primary", { icon: "send", h: 44 });
    cy += 68;
    line(f, px, cy + 10, pw * 0.42 - 8);
    line(f, px + pw * 0.58 + 8, cy + 10, pw * 0.42 - 8);
    const orT = txt(f, px, cy + 2, "\u0438\u043B\u0438", 12, 400, C.INK3);
    centerTextIn(orT, px, pw);
    cy += 32;
    cy += inputLine(f, px, cy, pw, "Email", "name@example.com");
    cy += inputLine(f, px, cy, pw, "\u041F\u0430\u0440\u043E\u043B\u044C", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", { password: true });
    btn(f, px, cy, pw, "\u0412\u043E\u0439\u0442\u0438", "primary", { h: 44 });
    cy += 60;
    const fg = txt(f, px, cy, "\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?", 13, 500, C.ACCENT);
    centerTextIn(fg, px, pw);
    cy += 32;
    const su = txt(f, px, cy, "\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?  \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", 13, 400, C.INK2);
    centerTextIn(su, px, pw);
  }
  function e04(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX;
    const w = sh.cardW;
    let y = sh.y;
    const H2 = m.kind === "mobile" ? 760 : 640;
    cardBox(f, x, y, w, H2, "E-04 card");
    const px = x + 28;
    const pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", 24, 700, C.INK);
    cy += 40;
    const roles = [
      ["user", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0443\u044E\u0449\u0438\u0439 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442", true],
      ["graduation-cap", "\u0421\u0442\u0443\u0434\u0435\u043D\u0442", "\u0423\u0447\u0443\u0441\u044C, \u043E\u0442\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u044E \u043D\u0430\u0432\u044B\u043A\u0438", false],
      ["users", "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440", "\u041F\u043E \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044E", false]
    ];
    roles.forEach((r, i) => {
      const selected = r[3];
      const rw = m.kind === "mobile" ? pw : Math.round((pw - 16) / 3);
      const rx = px + i * (rw + (m.kind === "mobile" ? 0 : 8));
      const ry = cy + i * (m.kind === "mobile" ? 76 : 0);
      const card2 = rect(f, rx, ry, rw, 68, selected ? "#EFF6FF" : C.WHITE, 10);
      setStroke(card2, selected ? C.ACCENT : C.BD, selected ? 2 : 1, "inner");
      card2.name = "role-card/" + r[1];
      ic(f, r[0], rx + 12, ry + 12, 20, selected ? C.ACCENT : C.INK3);
      txt(f, rx + 40, ry + 10, r[1], 13, 600, selected ? C.ACCENT : C.INK);
      txt(f, rx + 40, ry + 30, r[2].slice(0, Math.floor(rw / 6.4)), 10, 400, C.INK3);
      if (selected) ic(f, "circle-check", rx + rw - 26, ry + 12, 16, C.ACCENT);
    });
    cy += m.kind === "mobile" ? 76 * 3 + 12 : 92;
    cy += inputLine(f, px, cy, pw, "Email", "name@example.com");
    cy += inputLine(f, px, cy, pw, "\u041F\u0430\u0440\u043E\u043B\u044C", "\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", { password: true });
    const box = rect(f, px, cy + 2, 18, 18, C.ACCENT, 5);
    box.name = "checkbox";
    ic(f, "check", px + 3, cy + 5, 12, "#FFFFFF");
    txt(f, px + 28, cy + 2, "\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0438 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", 12, 400, C.INK2);
    cy += 40;
    btn(f, px, cy, pw, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442", "primary", { h: 44 });
    cy += 64;
    const si = txt(f, px, cy, "\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?  \u0412\u043E\u0439\u0442\u0438", 13, 400, C.INK2);
    centerTextIn(si, px, pw);
  }
  function e05(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX;
    const w = sh.cardW;
    let y = sh.y;
    cardBox(f, x, y, w, 380, "E-05 card");
    const px = x + 28;
    const pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F", 22, 700, C.INK);
    cy += 36;
    txt(f, px, cy, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0434\u043B\u044F \u0441\u043C\u0435\u043D\u044B \u043F\u0430\u0440\u043E\u043B\u044F", 14, 400, C.INK2);
    cy += 22;
    txt(f, px, cy, "\u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 email.", 14, 400, C.INK2);
    cy += 36;
    cy += inputLine(f, px, cy, pw, "Email", "name@example.com");
    btn(f, px, cy, pw, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443", "primary", { h: 44 });
    cy += 64;
    txt(f, px, cy, "\u2190  \u041A\u043E \u0432\u0445\u043E\u0434\u0443", 13, 500, C.ACCENT);
  }
  function e06(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX, w = sh.cardW;
    txt(f, x, 92, "\u041E\u041D\u0411\u041E\u0420\u0414\u0418\u041D\u0413 \u041F\u0421\u0418\u0425\u041E\u041B\u041E\u0413\u0410", 11, 500, C.INK3);
    let y = 128;
    const steps = ["\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F", "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", "\u0413\u043E\u0442\u043E\u0432\u043E"];
    const gap = m.kind === "mobile" ? 92 : 120;
    for (let i = 0; i < steps.length; i++) {
      const cx = x + i * gap;
      if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 1 ? C.ACCENT : C.BG3, 1);
      if (i < 1) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        ic(f, "check", cx + 6, y + 6, 12, "#FFFFFF");
      } else if (i === 1) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        const t = txt(f, cx + 9, y + 4, "2", 12, 600, "#FFFFFF");
        centerTextIn(t, cx, 24);
      } else {
        makeEllipse(f, cx, y, 24, 24, C.BG3);
        const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 500, C.INK3);
        centerTextIn(t, cx, 24);
      }
      txt(f, cx - 22, y + 32, steps[i], 10, 400, i <= 1 ? C.INK2 : C.INK3);
    }
    y += 80;
    cardBox(f, x, y, w, m.kind === "mobile" ? 400 : 360, "E-06 card");
    const px = x + 28, pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E", 20, 600, C.INK);
    cy += 30;
    txt(f, px, cy, "\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u2014 \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438", 13, 400, C.INK2);
    cy += 34;
    const chips = [
      ["\u0422\u0440\u0435\u0432\u043E\u0436\u043D\u043E\u0441\u0442\u044C", true],
      ["\u0412\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435", true],
      ["\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F", false],
      ["\u041E\u041A\u0420", false],
      ["\u041F\u0422\u0421\u0420", false],
      ["\u041F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u0438", false],
      ["\u0414\u0435\u0442\u0438", false],
      ["\u041A\u0440\u0438\u0437\u0438\u0441\u044B", false]
    ];
    let chx = px, chy = cy;
    chips.forEach((cdef) => {
      const cwd = Math.round(cdef[0].length * 7.2) + 40;
      if (chx + cwd > px + pw) {
        chx = px;
        chy += 44;
      }
      const selected = cdef[1];
      const chipEl = rect(f, chx, chy, cwd, 32, selected ? "#EFF6FF" : C.WHITE, 16);
      setStroke(chipEl, selected ? C.ACCENT : C.BD, selected ? 2 : 1, "inner");
      txt(f, chx + 14, chy + 7, cdef[0], 13, selected ? 600 : 400, selected ? C.ACCENT : C.INK2);
      if (selected) ic(f, "check", chx + cwd - 22, chy + 9, 14, C.ACCENT);
      chx += cwd + 12;
    });
    cy = chy + 76;
    btn(f, px, cy, 140, "\u0414\u0430\u043B\u0435\u0435", "primary", { h: 44 });
    txt(f, px + 160, cy + 13, "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C", 13, 500, C.INK3);
  }
  function e07(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX, w = sh.cardW;
    txt(f, x, 92, "\u041E\u041D\u0411\u041E\u0420\u0414\u0418\u041D\u0413 \u0421\u0422\u0423\u0414\u0415\u041D\u0422\u0410", 11, 500, C.INK3);
    let y = 128;
    const steps = ["\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "\u0412\u0443\u0437 / \u0433\u0440\u0443\u043F\u043F\u0430", "\u0413\u043E\u0442\u043E\u0432\u043E"];
    const gap = m.kind === "mobile" ? 110 : 140;
    for (let i = 0; i < steps.length; i++) {
      const cx = x + i * gap;
      if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 1 ? C.ACCENT : C.BG3, 1);
      if (i < 1) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        ic(f, "check", cx + 6, y + 6, 12, "#FFFFFF");
      } else if (i === 1) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        const t = txt(f, cx + 9, y + 4, "2", 12, 600, "#FFFFFF");
        centerTextIn(t, cx, 24);
      } else {
        makeEllipse(f, cx, y, 24, 24, C.BG3);
        const t = txt(f, cx + 9, y + 4, String(i + 1), 12, 500, C.INK3);
        centerTextIn(t, cx, 24);
      }
      txt(f, cx - 20, y + 32, steps[i], 10, 400, i <= 1 ? C.INK2 : C.INK3);
    }
    y += 80;
    cardBox(f, x, y, w, 380, "E-07 card");
    const px = x + 28, pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u0412\u0443\u0437 \u0438 \u0433\u0440\u0443\u043F\u043F\u0430", 20, 600, C.INK);
    cy += 30;
    txt(f, px, cy, "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E. \u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0432\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0448 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440.", 13, 400, C.INK2);
    cy += 34;
    cy += inputLine(f, px, cy, pw, "\u0412\u0443\u0437", "\u041C\u0413\u0423, \u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438");
    cy += inputLine(f, px, cy, pw, "\u0413\u0440\u0443\u043F\u043F\u0430", "\u041F\u0421-304");
    const box = rect(f, px, cy + 2, 18, 18, C.WHITE, 5);
    setStroke(box, C.BD, 1, "inner");
    txt(f, px + 28, cy + 2, "\u0421\u043A\u0440\u044B\u0442\u044C \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u0435", 13, 400, C.INK2);
    cy += 44;
    btn(f, px, cy, 140, "\u0414\u0430\u043B\u0435\u0435", "primary", { h: 44 });
  }
  function e08(f, m) {
    const sh = authShell(f, m);
    const x = sh.cardX, w = sh.cardW;
    txt(f, x, 92, "\u0412\u0415\u0420\u0418\u0424\u0418\u041A\u0410\u0426\u0418\u042F", 11, 500, C.INK3);
    let y = 128;
    const steps = ["\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F", "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", "\u0413\u043E\u0442\u043E\u0432\u043E"];
    const gap = m.kind === "mobile" ? 92 : 120;
    for (let i = 0; i < steps.length; i++) {
      const cx = x + i * gap;
      if (i > 0) rect(f, cx - gap + 28, y + 11, gap - 40, 2, i <= 2 ? C.ACCENT : C.BG3, 1);
      if (i < 2) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        ic(f, "check", cx + 6, y + 6, 12, "#FFFFFF");
      } else if (i === 2) {
        makeEllipse(f, cx, y, 24, 24, C.ACCENT);
        const t = txt(f, cx + 9, y + 4, "3", 12, 600, "#FFFFFF");
        centerTextIn(t, cx, 24);
      } else {
        makeEllipse(f, cx, y, 24, 24, C.BG3);
        const t = txt(f, cx + 9, y + 4, "4", 12, 500, C.INK3);
        centerTextIn(t, cx, 24);
      }
      txt(f, cx - 22, y + 32, steps[i], 10, 400, i <= 2 ? C.INK2 : C.INK3);
    }
    y += 80;
    cardBox(f, x, y, w, 460, "E-08 card");
    const px = x + 28, pw = w - 56;
    let cy = y + 28;
    txt(f, px, cy, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E", 20, 600, C.INK);
    cy += 28;
    txt(f, px, cy, "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0432\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440. \u041F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u2014 \u0431\u0435\u0439\u0434\u0436", 13, 400, C.INK2);
    cy += 20;
    txt(f, px, cy, "\xAB\u0412\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\xBB \u0438 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0432\u044B\u0434\u0430\u0447\u0435 \u0438\u0433\u0440.", 13, 400, C.INK2);
    cy += 32;
    const dz = rect(f, px, cy, pw, 96, C.BG2, 12);
    try {
      dz.strokes = [{ strokeColor: C.ACCENT, strokeOpacity: 1, strokeWidth: 1.5, strokeAlignment: "inner", strokeStyle: "dashed" }];
    } catch (_) {
    }
    dz.name = "dropzone";
    ic(f, "file-text", px + pw / 2 - 64, cy + 24, 24, C.ACCENT);
    txt(f, px + pw / 2 - 32, cy + 24, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0434\u0438\u043F\u043B\u043E\u043C", 14, 600, C.INK);
    txt(f, px + pw / 2 - 32, cy + 46, "PDF \u0438\u043B\u0438 JPG, \u0434\u043E 10 \u041C\u0411", 12, 400, C.INK3);
    cy += 116;
    const fileRow = rect(f, px, cy, pw, 52, C.WHITE, 10);
    setStroke(fileRow, C.BD, 1, "inner");
    ic(f, "file-text", px + 14, cy + 16, 20, C.INK2);
    txt(f, px + 44, cy + 10, "diploma.pdf", 13, 500, C.INK);
    txt(f, px + 44, cy + 30, "2,4 \u041C\u0411 \xB7 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E", 11, 400, C.INK3);
    ic(f, "circle-check", px + pw - 30, cy + 16, 18, C.SUCCESS);
    cy += 68;
    const st = rect(f, px, cy, 130, 28, "#FEF3C7", 14);
    st.name = "status/pending";
    ic(f, "clock", px + 12, cy + 7, 14, "#92400E");
    txt(f, px + 32, cy + 6, "\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", 12, 500, "#92400E");
    txt(f, px + 144, cy + 6, "\u043E\u0431\u044B\u0447\u043D\u043E \u0434\u043E 24 \u0447\u0430\u0441\u043E\u0432", 12, 400, C.INK3);
    cy += 56;
    btn(f, px, cy, 240, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443", "primary", { h: 44 });
  }
  function sessionsRows(f, x, y, w, count) {
    const rows = [
      ["16.09 \xB7 14:00", "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", 86],
      ["14.09 \xB7 12:30", "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F", 74],
      ["12.09 \xB7 18:00", "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 91],
      ["10.09 \xB7 11:00", "\u0413\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442", 68]
    ];
    rows.slice(0, count).forEach((r, i) => {
      const ry = y + i * 48;
      txt(f, x, ry + 4, r[0], 12, 400, C.INK3);
      txt(f, x + 110, ry + 3, r[1], 13, 500, C.INK);
      const sc = rect(f, x + w - 88, ry, 44, 24, "#DCFCE7", 12);
      sc.name = "score-chip";
      const t = txt(f, x + w - 78, ry + 4, String(r[2]), 12, 600, "#166534");
      centerTextIn(t, x + w - 88, 44);
      ic(f, "chevron-right", x + w - 28, ry + 4, 16, C.INK3);
      line(f, x, ry + 40, w);
    });
    return count * 48;
  }
  function clientRows(f, x, y, w, count) {
    const rows = [
      ["\u041A\u0410", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", "#DCFCE7", "#166534"],
      ["\u041A\u0411", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0411", "#E0F2FE", "#0C4A6E"],
      ["\u041A\u0412", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0412", "#FEF3C7", "#92400E"]
    ];
    rows.slice(0, count).forEach((r, i) => {
      const ry = y + i * 52;
      avatar(f, x, ry, 36, r[0], C.ACCENT2);
      txt(f, x + 48, ry + 2, r[1], 13, 600, C.INK);
      txt(f, x + 48, ry + 20, "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439 \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", 11, 400, C.INK3);
      const chipEl = rect(f, x + w - 88, ry + 6, 88, 24, r[2], 12);
      chipEl.name = "status-chip";
      const labels = { "#DCFCE7": "\u0430\u043A\u0442\u0438\u0432\u0435\u043D", "#E0F2FE": "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D", "#FEF3C7": "\u0438\u0441\u0442\u0451\u043A" };
      txt(f, x + w - 80, ry + 10, labels[r[2]], 11, 500, r[3]);
      line(f, x, ry + 44, w);
    });
    return count * 52;
  }
  function e10(f, m) {
    const box = shell(f, m, 0, "\u0414\u0430\u0448\u0431\u043E\u0440\u0434");
    let y = box.cy;
    const W2 = box.cw;
    txt(f, box.cx, y, "\u0414\u043E\u0431\u0440\u044B\u0439 \u0434\u0435\u043D\u044C, \u0410\u043D\u043D\u0430", m.kind === "mobile" ? 22 : 24, 700, C.INK);
    txt(f, box.cx, y + (m.kind === "mobile" ? 32 : 36), "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A, 16 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F \xB7 3 \u0441\u0435\u0441\u0441\u0438\u0438 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435", 13, 400, C.INK2);
    y += m.kind === "mobile" ? 60 : 68;
    if (m.kind === "mobile") {
      btn(f, box.cx, y, W2, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044E", "primary", { icon: "play", h: 44 });
      y += 56;
      btn(f, box.cx, y, W2, "\u0412\u044B\u0434\u0430\u0442\u044C \u0438\u0433\u0440\u0443", "secondary", { icon: "send", h: 44 });
      y += 64;
    } else {
      btn(f, box.cx, y - 8, 190, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044E", "primary", { icon: "play", h: 44 });
      btn(f, box.cx + 206, y - 8, 160, "\u0412\u044B\u0434\u0430\u0442\u044C \u0438\u0433\u0440\u0443", "secondary", { icon: "send", h: 44 });
      y += 60;
    }
    const isDesktop = m.kind === "desktop";
    const colW = isDesktop ? Math.round((W2 - 24) * 0.6) : W2;
    const radarH = isDesktop ? 320 : 380;
    cardBox(f, box.cx, y, colW, radarH, "card/radar");
    txt(f, box.cx + 20, y + 18, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", 16, 600, C.INK);
    txt(f, box.cx + colW - 168, y + 20, "\u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B 72/100", 12, 500, C.INK2);
    try {
      const o = getOrigin();
      const svg = penpot.createShapeFromSvg(radarSvg(isDesktop ? 240 : 200));
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + box.cx + 20;
        svg.y = o.y + y + 52;
        svg.name = "radar";
      }
    } catch (_) {
    }
    const skx = isDesktop ? box.cx + 300 : box.cx + 20;
    const sky = isDesktop ? y + 70 : y + 156;
    const rowsCount = isDesktop ? 4 : 3;
    const skw = isDesktop ? colW - 330 : colW - 40;
    [86, 72, 77, 49].slice(0, rowsCount).forEach((ball, i) => {
      const names = ["\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "\u042D\u043C\u043F\u0430\u0442\u0438\u044F", "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", "\u0421\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435"];
      const colors = ["#2563EB", "#7C3AED", "#65A30D", "#EA580C"];
      skillBarRow(f, skx, sky + i * 44, skw, names[i], ball, colors[i]);
    });
    y += radarH + 16;
    const sessH = 60 + (m.kind === "mobile" ? 3 : 4) * 48 + 16;
    cardBox(f, box.cx, y, colW, sessH, "card/sessions");
    txt(f, box.cx + 20, y + 18, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u0435\u0441\u0441\u0438\u0438", 16, 600, C.INK);
    sessionsRows(f, box.cx + 20, y + 52, colW - 40, m.kind === "mobile" ? 3 : 4);
    y += sessH + 16;
    if (!isDesktop) {
      const cliH = 60 + 2 * 52 + 12;
      cardBox(f, box.cx, y, W2, cliH, "card/clients");
      txt(f, box.cx + 20, y + 18, "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B", 16, 600, C.INK);
      clientRows(f, box.cx + 20, y + 52, W2 - 40, 2);
      y += cliH + 16;
    }
    const tiles = [
      ["trophy", "10 \u0441\u0435\u0441\u0441\u0438\u0439", "\u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E \u0437\u0430 \u043C\u0435\u0441\u044F\u0446"],
      ["sparkles", "\u0421\u0435\u0440\u0438\u044F 5 \u0434\u043D\u0435\u0439", "\u043D\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0439\u0442\u0435 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438"],
      ["star", "\u042D\u043C\u043F\u0430\u0442\u0438\u044F 80+", "\u043D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043D\u0430\u0432\u044B\u043A\u0430"]
    ];
    const tw2 = isDesktop ? Math.round((W2 - colW - 24 - 32) / 3) : Math.round((W2 - 24) / 3);
    const ax = isDesktop ? box.cx + colW + 24 : box.cx;
    const ah = 60 + 96;
    cardBox(f, ax, isDesktop ? box.cy + 68 : y, isDesktop ? W2 - colW - 24 : W2, ah, "card/achievements");
    txt(f, ax + 20, (isDesktop ? box.cy + 68 : y) + 18, "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F", 16, 600, C.INK);
    tiles.forEach((tl, i) => {
      const txp = ax + 20 + i * (tw2 + 8);
      const typ = (isDesktop ? box.cy + 68 : y) + 52;
      const tile = rect(f, txp, typ, tw2 - 8, 92, C.BG2, 10);
      tile.name = "achievement";
      ic(f, tl[0], txp + 14, typ + 14, 22, C.ACCENT);
      txt(f, txp + 14, typ + 46, tl[1], 13, 600, C.INK);
      txt(f, txp + 14, typ + 66, tl[2].slice(0, 18), 10, 400, C.INK3);
    });
    if (isDesktop) {
      const cliY = box.cy + 68 + ah + 16;
      const cliH = 60 + 3 * 52 + 12;
      cardBox(f, ax, cliY, W2 - colW - 24, cliH, "card/clients");
      txt(f, ax + 20, cliY + 18, "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B", 16, 600, C.INK);
      clientRows(f, ax + 20, cliY + 52, W2 - colW - 64, 3);
    }
  }
  function e11(f, m) {
    const box = shell(f, m, 0, "\u0414\u0430\u0448\u0431\u043E\u0440\u0434");
    let y = box.cy;
    const W2 = box.cw;
    txt(f, box.cx, y, "\u041F\u0440\u0438\u0432\u0435\u0442, \u0414\u043C\u0438\u0442\u0440\u0438\u0439", m.kind === "mobile" ? 22 : 24, 700, C.INK);
    txt(f, box.cx, y + (m.kind === "mobile" ? 32 : 36), "\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043E \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u043E\u043C: 2 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F", 13, 400, C.INK2);
    y += m.kind === "mobile" ? 60 : 64;
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round((W2 - 24) * 0.62) : W2;
    const scH = 96;
    ["\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", "\u0426\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B"].forEach((title, i) => {
      const cx = isDesktop ? box.cx + i * (mainW + 24) * 0 + i * 0 : box.cx;
      const cw2 = mainW;
      const cy2 = y + i * (scH + 12);
      cardBox(f, box.cx, cy2, cw2, scH, "ScenarioCard / compact");
      txt(f, box.cx + 20, cy2 + 16, title, 15, 600, C.INK);
      for (let d = 0; d < 5; d++) makeEllipse(f, box.cx + 20 + d * 13, cy2 + 44, 8, 8, d < (i === 0 ? 4 : 3) ? C.ACCENT : C.BG3);
      txt(f, box.cx + 92, cy2 + 40, "\xB7 15 \u043C\u0438\u043D \xB7 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043E", 11, 400, C.INK3);
      const bEl = rect(f, box.cx + cw2 - 108, cy2 + 30, 88, 32, C.ACCENT, 16);
      bEl.name = "Button / primary / sm";
      txt(f, box.cx + cw2 - 84, cy2 + 38, "\u041D\u0430\u0447\u0430\u0442\u044C", 13, 600, "#FFFFFF");
    });
    y += (scH + 12) * 2 + 8;
    const radarH = 250;
    cardBox(f, box.cx, y, isDesktop ? 380 : W2, radarH, "card/progress");
    txt(f, box.cx + 20, y + 18, "\u041C\u043E\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441", 16, 600, C.INK);
    try {
      const o = getOrigin();
      const svg = penpot.createShapeFromSvg(radarSvg(180));
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + box.cx + 20;
        svg.y = o.y + y + 50;
        svg.name = "radar";
      }
    } catch (_) {
    }
    skillBarRow(f, box.cx + 210, y + 66, (isDesktop ? 380 : W2) - 230, "\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 81, "#2563EB");
    skillBarRow(f, box.cx + 210, y + 110, (isDesktop ? 380 : W2) - 230, "\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", 68, "#9333EA");
    skillBarRow(f, box.cx + 210, y + 154, (isDesktop ? 380 : W2) - 230, "\u0413\u0440\u0430\u043D\u0438\u0446\u044B", 64, "#0891B2");
    txt(f, box.cx + 210, y + 200, "\u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B 71 \xB7 +6 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", 12, 500, C.SUCCESS);
    const comX = isDesktop ? box.cx + 404 : box.cx;
    const comW = isDesktop ? W2 - 428 : W2;
    const comH = 150;
    const com = rect(f, comX, y, comW, comH, C.BG2, 12);
    setStroke(com, C.BD, 1, "inner");
    com.name = "SupervisionComment";
    avatar(f, comX + 16, y + 16, 32, "\u041C\u041F");
    txt(f, comX + 58, y + 14, "\u041C. \u041F\u0435\u0442\u0440\u043E\u0432\u0430", 13, 600, C.INK);
    txt(f, comX + 58, y + 32, "\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440 \xB7 \u0432\u0447\u0435\u0440\u0430", 11, 400, C.INK3);
    txt(f, comX + 16, y + 58, "\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u0445\u043E\u0434 \u043D\u0430 4-\u0439 \u0440\u0435\u043F\u043B\u0438\u043A\u0435. \u041D\u0430 \u043C\u043E\u043C\u0435\u043D\u0442\u0435 06:40 \u0443\u043C\u0435\u0441\u0442\u0435\u043D", 12, 400, C.INK2);
    txt(f, comX + 16, y + 76, "\u0446\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441. \u041E\u0446\u0435\u043D\u043A\u0430: 82/100. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", 12, 400, C.INK2);
    txt(f, comX + 16, y + 94, "\xAB\u0426\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B\xBB.", 12, 400, C.INK2);
    txt(f, comX + 16, y + 120, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u2192", 12, 500, C.ACCENT);
    y += radarH + 16;
    const tiles = [
      ["trophy", "\u041F\u0435\u0440\u0432\u044B\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439"],
      ["zap", "\u0421\u0435\u0440\u0438\u044F 3 \u0434\u043D\u044F"],
      ["star", "\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435 80+"]
    ];
    const tw3 = Math.round((W2 - 24) / 3);
    const achY = y;
    cardBox(f, box.cx, achY, W2, 168, "card/achievements");
    txt(f, box.cx + 20, achY + 18, "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F", 16, 600, C.INK);
    tiles.forEach((tl, i) => {
      const txp = box.cx + 20 + i * (tw3 + 4);
      const tile = rect(f, txp, achY + 52, tw3 - 8, 92, C.BG2, 10);
      tile.name = "achievement";
      ic(f, tl[0], txp + 14, achY + 66, 22, C.ACCENT);
      txt(f, txp + 14, achY + 98, tl[1], 13, 600, C.INK);
    });
  }
  function e12(f, m) {
    const box = shell(f, m, 3, "\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B");
    let y = box.cy;
    const W2 = box.cw;
    txt(f, box.cx, y, "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0430", m.kind === "mobile" ? 22 : 24, 700, C.INK);
    y += m.kind === "mobile" ? 44 : 48;
    const stats = [
      ["users", "12", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432"],
      ["book-open", "38", "\u0441\u0435\u0441\u0441\u0438\u0439 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E"],
      ["triangle-alert", "3", "\u0442\u0440\u0435\u0431\u0443\u044E\u0442 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u044F"]
    ];
    const stw = m.kind === "mobile" ? Math.round((W2 - 16) / 3) : 170;
    stats.forEach((s, i) => {
      const sx2 = box.cx + i * (stw + 12);
      const card2 = rect(f, sx2, y, stw, 84, C.BG2, 12);
      card2.name = "stat-card";
      ic(f, s[0], sx2 + 16, y + 16, 20, i === 2 ? C.WARNING : C.ACCENT);
      txt(f, sx2 + 44, y + 14, s[1], 22, 700, C.INK);
      txt(f, sx2 + 16, y + 52, s[2], 11, 400, C.INK3);
    });
    y += 108;
    const isDesktop = m.kind === "desktop";
    const listW = isDesktop ? Math.round((W2 - 24) * 0.55) : W2;
    const students = [
      ["\u0414\u041A", "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041A.", "\u041F\u0421-304 \xB7 2 \u0447 \u043D\u0430\u0437\u0430\u0434", 72],
      ["\u0410\u0421", "\u0410\u043D\u043D\u0430 \u0421.", "\u041F\u0421-301 \xB7 5 \u0447 \u043D\u0430\u0437\u0430\u0434", 64],
      ["\u041C\u041B", "\u041C\u0430\u0440\u0438\u044F \u041B.", "\u041F\u0421-304 \xB7 \u0432\u0447\u0435\u0440\u0430", 81],
      ["\u0418\u041F", "\u0418\u0433\u043E\u0440\u044C \u041F.", "\u041F\u0421-298 \xB7 2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", 45]
    ];
    const listH = 60 + students.length * 56 + 8;
    cardBox(f, box.cx, y, listW, listH, "card/students");
    txt(f, box.cx + 20, y + 18, "\u041C\u043E\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B", 16, 600, C.INK);
    students.forEach((s, i) => {
      const ry = y + 56 + i * 56;
      avatar(f, box.cx + 20, ry, 36, s[0]);
      txt(f, box.cx + 68, ry + 1, s[1], 13, 600, C.INK);
      txt(f, box.cx + 68, ry + 19, s[2], 11, 400, C.INK3);
      rect(f, box.cx + listW - 200, ry + 8, 100, 6, C.BG3, 3);
      rect(f, box.cx + listW - 200, ry + 8, Math.round(100 * s[3] / 100), 6, C.ACCENT, 3);
      txt(f, box.cx + listW - 88, ry + 2, s[3] + "%", 12, 600, C.INK);
      ic(f, "chevron-right", box.cx + listW - 44, ry + 8, 16, C.INK3);
      line(f, box.cx + 20, ry + 44, listW - 40);
    });
    y += listH + 16;
    const atW = isDesktop ? W2 - listW - 24 : W2;
    const atH = 60 + 2 * 56 + 56;
    const ax2 = isDesktop ? box.cx + listW + 24 : box.cx;
    cardBox(f, ax2, isDesktop ? box.cy + 108 : y, atW, atH, "card/attention");
    const atY = isDesktop ? box.cy + 108 : y;
    txt(f, ax2 + 20, atY + 18, "\u0422\u0440\u0435\u0431\u0443\u044E\u0442 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u044F", 16, 600, C.INK);
    const items = [
      ["\u0421\u0435\u0441\u0441\u0438\u044F \u0431\u0435\u0437 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 3 \u0434\u043D\u044F \xB7 \u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041A.", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u2192"],
      ["\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \xB7 \u0410\u043D\u043D\u0430 \u0421.", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u2192"]
    ];
    items.forEach((it, i) => {
      const ry = atY + 56 + i * 56;
      ic(f, "triangle-alert", ax2 + 20, ry + 2, 18, C.WARNING);
      txt(f, ax2 + 48, ry, it[0].slice(0, Math.floor(atW / 6.2)), 12, 500, C.INK);
      txt(f, ax2 + 48, ry + 20, it[1], 12, 500, C.ACCENT);
      line(f, ax2 + 20, ry + 42, atW - 40);
    });
    btn(f, ax2 + 20, atY + atH - 52, 180, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043E\u0442\u0447\u0451\u0442\u0430", "secondary", { icon: "download", h: 40 });
  }
  var SCREENS = [
    { code: "E-01", title: "\u041B\u0435\u043D\u0434\u0438\u043D\u0433", mobileH: 1220, draw: e01 },
    { code: "E-02", title: "\u0414\u0435\u043C\u043E-\u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044F", mobileH: 1e3, draw: e02 },
    { code: "E-03", title: "\u0412\u0445\u043E\u0434", draw: e03, focused: true },
    { code: "E-04", title: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", draw: e04, focused: true },
    { code: "E-05", title: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F", draw: e05, focused: true },
    { code: "E-06", title: "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430", mobileH: 900, draw: e06, focused: true },
    { code: "E-07", title: "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", mobileH: 900, draw: e07, focused: true },
    { code: "E-08", title: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", mobileH: 940, draw: e08, focused: true },
    { code: "E-10", title: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430", mobileH: 1220, draw: e10 },
    { code: "E-11", title: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", mobileH: 1220, draw: e11 },
    { code: "E-12", title: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0430", mobileH: 1120, draw: e12 }
  ];
  function screenFrameName(s, bp) {
    return s.code + " " + s.title + " / " + bp;
  }
  var SCREEN_FRAME_NAMES = SCREENS.flatMap((s) => ["1440", "768", "390"].map((bp) => screenFrameName(s, bp)));
  function buildScreens(log) {
    F = pickFont(FONT_FALLBACKS);
    const SX = 4620;
    let y = 100;
    for (const s of SCREENS) {
      const modes = [[D, "1440"], [T, "768"], [MB, "390"]];
      for (const mm of modes) {
        const h = mm[0].kind === "mobile" && s.mobileH ? s.mobileH : mm[0].h;
        const mode = { w: mm[0].w, h, kind: mm[0].kind };
        const f = openFrame(screenFrameName(s, mm[1]), SX, y, mode.w, h);
        try {
          s.draw(f, mode);
        } catch (e) {
          log.push("\xD7 " + s.code + "/" + mm[1] + ": " + e);
        }
      }
      y += 1300;
    }
  }

  // src/screens2.ts
  var F2 = null;
  function lineChartSvg(w, h, points, color) {
    const min = Math.min(...points) - 8;
    const max = Math.max(...points) + 8;
    const px = (i) => Math.round(14 + i * (w - 28) / (points.length - 1));
    const py = (v) => Math.round(h - 12 - (v - min) * (h - 24) / (max - min));
    const poly = points.map((v, i) => px(i) + "," + py(v)).join(" ");
    const dots2 = points.map((v, i) => '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3.5" fill="' + color + '"/>').join("");
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="' + (h - 12) + '" x2="' + (w - 10) + '" y2="' + (h - 12) + '" stroke="#E2E8F0"/><polyline points="' + poly + '" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/>' + dots2 + "</svg>";
  }
  function sessionTop(f, x, y, w, step, total, name) {
    txt(f, x, y, "\u0428\u0410\u0413 " + step + " \u0418\u0417 " + total, 11, 500, C.INK3);
    txt(f, x + 92, y - 1, name, 13, 600, C.INK);
    const pause = rect(f, x + w - 36, y - 8, 36, 36, C.BG2, 18);
    setStroke(pause, C.BD, 1, "inner");
    pause.name = "Button / pause";
    ic(f, "pause", x + w - 28, y, 16, C.INK2);
    rect(f, x, y + 22, w, 6, C.BG3, 3);
    rect(f, x, y + 22, Math.round(w * step / total), 6, C.ACCENT, 3).name = "progress-fill";
    return 52;
  }
  function answerStack(f, x, y, w, opts, withOwn) {
    let cy = y;
    opts.forEach((o) => {
      cy += answerRow(f, x, cy, w, o[0], o[1]);
    });
    if (withOwn) {
      const own = rect(f, x, cy, w, 44, C.WHITE, 10);
      try {
        own.strokes = [{ strokeColor: C.INK3, strokeOpacity: 1, strokeWidth: 1, strokeAlignment: "inner", strokeStyle: "dashed" }];
      } catch (_) {
      }
      own.name = "own-variant / beta";
      txt(f, x + 16, cy + 13, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u2026", 13, 400, C.INK3);
      const b = rect(f, x + w - 58, cy + 10, 44, 24, "#EFF6FF", 12);
      b.name = "badge-beta";
      const t = txt(f, x + w - 50, cy + 14, "beta", 11, 600, C.ACCENT);
      cy += 56;
    }
    return cy - y;
  }
  function historyPanel(f, x, y, w) {
    const h = 372;
    cardBox(f, x, y, w, h, "card/history");
    txt(f, x + 16, y + 16, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0440\u0435\u043F\u043B\u0438\u043A", 14, 600, C.INK);
    txt(f, x + w - 60, y + 18, "\u0448\u0430\u0433 3/7", 11, 400, C.INK3);
    let cy = y + 48;
    const msgs = [
      ["\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435\u2026 \u044F \u043D\u0435 \u0437\u043D\u0430\u044E, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C.", "l"],
      ["\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441?", "r"],
      ["\u041A\u0430\u043A \u0431\u0443\u0434\u0442\u043E \u0432\u0441\u0451 \u0438\u0434\u0451\u0442 \u043D\u0435 \u0442\u0430\u043A. \u042F \u0443\u0441\u0442\u0430\u043B\u0430.", "l"],
      ["\u0423\u0441\u0442\u0430\u043B\u043E\u0441\u0442\u044C \u2014 \u043E\u0442 \u0447\u0435\u0433\u043E \u043E\u043D\u0430 \u0443 \u0432\u0430\u0441?", "r"],
      ["\u041E\u0442 \u0440\u0430\u0431\u043E\u0442\u044B. \u0418 \u043E\u0442 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0432\u0441\u0451 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E.", "l"]
    ];
    msgs.forEach((m) => {
      const bh = 40;
      const b = rect(f, x + 16, cy, w - 32, bh, m[1] === "l" ? C.BG2 : "#EFF6FF", 8);
      b.name = "history-bubble";
      txt(f, x + 26, cy + 8, m[0].slice(0, 30), 10, 400, m[1] === "l" ? C.INK : "#1D4ED8");
      txt(f, x + 26, cy + 24, m[0].slice(30).trim() || " ", 10, 400, m[1] === "l" ? C.INK : "#1D4ED8");
      cy += bh + 8;
    });
    return h;
  }
  function filterChips(f, x, y, maxW) {
    const chips = [
      ["\u0412\u0441\u0435 \u043D\u0430\u0432\u044B\u043A\u0438", true, null],
      ["\u044D\u043C\u043F\u0430\u0442\u0438\u044F", false, "#7C3AED"],
      ["\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", false, "#EA580C"],
      ["\u0433\u0440\u0430\u043D\u0438\u0446\u044B", false, "#0891B2"],
      ["\u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435", false, "#0EA5E9"],
      ["\u0440\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", false, "#9333EA"]
    ];
    let cx = x;
    let cy = y;
    chips.forEach((cdef) => {
      const cwd = Math.round(cdef[0].length * 6.8) + (cdef[1] ? 30 : 34);
      if (cx + cwd > x + maxW) {
        cx = x;
        cy += 40;
      }
      const selected = cdef[1];
      const chipEl = rect(f, cx, cy, cwd, 30, selected ? C.ACCENT : C.WHITE, 15);
      if (!selected) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "filter-chip";
      if (cdef[2]) makeEllipse(f, cx + 11, cy + 11, 8, 8, cdef[2]);
      const tx = cdef[2] ? cx + 25 : cx + 12;
      txt(f, tx, cy + 8, cdef[0], 12, selected ? 600 : 500, selected ? "#FFFFFF" : C.INK2);
      if (selected) ic(f, "x", cx + cwd - 20, cy + 8, 14, "#FFFFFF");
      cx += cwd + 10;
    });
    return cy + 40 - y;
  }
  function sortRow(f, x, y, w) {
    txt(f, x, y, "\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C", 12, 500, C.INK2);
    ["1\u20132", "3", "4\u20135"].forEach((s, i) => {
      const bx = x + 90 + i * 56;
      const sel = i === 1;
      const bEl = rect(f, bx, y - 4, 48, 26, sel ? C.BG3 : C.WHITE, 13);
      setStroke(bEl, C.BD, 1, "inner");
      const t = txt(f, bx + 14, y + 1, s, 12, sel ? 600 : 400, sel ? C.INK : C.INK2);
    });
    txt(f, x + 270, y, "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", 12, 500, C.INK2);
    ["\u0434\u043E 10", "10\u201320", "20+"].forEach((s, i) => {
      const bx = x + 370 + i * 64;
      const sel = i === 1;
      const bEl = rect(f, bx, y - 4, 56, 26, sel ? C.BG3 : C.WHITE, 13);
      setStroke(bEl, C.BD, 1, "inner");
      txt(f, bx + 10, y + 1, s, 12, sel ? 600 : 400, sel ? C.INK : C.INK2);
    });
  }
  function e20(f, m) {
    const box = shell(f, m, 1, "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432");
    let y = box.cy;
    const W2 = box.cw;
    const searchW = m.kind === "mobile" ? W2 : 420;
    const sf = rect(f, box.cx, y, searchW, 40, C.WHITE, 8);
    setStroke(sf, C.BD, 1, "inner");
    sf.name = "Input / search";
    ic(f, "search", box.cx + 12, y + 12, 16, C.INK3);
    txt(f, box.cx + 36, y + 10, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0438\u043B\u0438 \u043D\u0430\u0432\u044B\u043A\u2026", 14, 400, C.INK3);
    if (m.kind !== "mobile") {
      ic(f, "sliders-horizontal", box.cx + searchW + 24, y + 10, 20, C.INK2);
      txt(f, box.cx + searchW + 50, y + 12, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B", 13, 500, C.INK2);
      txt(f, box.cx + W2 - 120, y + 12, "24 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F", 13, 500, C.INK3);
    }
    y += 56;
    y += filterChips(f, box.cx, y, W2);
    if (m.kind === "desktop") {
      sortRow(f, box.cx, y, W2);
      y += 44;
    }
    const cols = m.kind === "desktop" ? 3 : m.kind === "tablet" ? 2 : 1;
    const gap = 20;
    const cardW = Math.round((W2 - gap * (cols - 1)) / cols);
    const cards = [
      [4, "d"],
      [2, "d"],
      [3, "l"],
      [5, "d"],
      [3, "c"],
      [4, "l"]
    ];
    cards.forEach((cdef, i) => {
      const cx = box.cx + i % cols * (cardW + gap);
      const cy = y + Math.floor(i / cols) * 240;
      if (cdef[1] === "d") {
        scenarioCardDefault(f, cx, cy, F2);
        if (cardW !== 320) {
          try {
            const card2 = f.children && null;
          } catch (_) {
          }
        }
      } else if (cdef[1] === "l") {
        scenarioCardLocked(f, cx, cy, F2);
      } else {
        scenarioCardCompact(f, cx, cy, F2);
      }
    });
  }
  function e21(f, m) {
    const box = shell(f, m, 1, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439");
    let y = box.cy;
    const W2 = box.cw;
    txt(f, box.cx, y, "\u2190  \u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430", 13, 500, C.ACCENT);
    y += 36;
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round((W2 - 24) * 0.62) : W2;
    const ch = 300;
    cardBox(f, box.cx, y, mainW, ch, "ScenarioCard / detail");
    txt(f, box.cx + 24, y + 20, "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", 22, 700, C.INK);
    txt(f, box.cx + 24, y + 52, "\u041A\u043B\u0438\u0435\u043D\u0442 34 \u0433\u043E\u0434\u0430, \u0438\u0437\u0431\u0435\u0433\u0430\u0435\u0442 \u0442\u0435\u043C\u044B \u0440\u0430\u0437\u0432\u043E\u0434\u0430, \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440,", 14, 400, C.INK2);
    txt(f, box.cx + 24, y + 72, "\u043E\u0442\u0448\u0443\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F, \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u0442 \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B. \u0412\u0430\u0448\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u2014", 14, 400, C.INK2);
    txt(f, box.cx + 24, y + 92, "\u0443\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0444\u043E\u043A\u0443\u0441 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0431\u0435\u0437 \u0434\u0430\u0432\u043B\u0435\u043D\u0438\u044F.", 14, 400, C.INK2);
    for (let i = 0; i < 5; i++) makeEllipse(f, box.cx + 24 + i * 16, y + 122, 9, 9, i < 4 ? C.ACCENT : C.BG3);
    txt(f, box.cx + 110, y + 118, "\u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C 4/5", 12, 400, C.INK3);
    ic(f, "clock", box.cx + 24, y + 148, 15, C.INK3);
    txt(f, box.cx + 46, y + 145, "15 \u043C\u0438\u043D \xB7 7 \u0448\u0430\u0433\u043E\u0432", 12, 400, C.INK2);
    ic(f, "message-circle", box.cx + 160, y + 148, 15, C.INK3);
    txt(f, box.cx + 182, y + 145, "\u0418\u0418-\u043A\u043B\u0438\u0435\u043D\u0442 \xAB\u041C\u0430\u0440\u0438\u043D\u0430\xBB", 12, 400, C.INK2);
    let chx = box.cx + 24;
    const skills = [["\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", "#EA580C"], ["\u0433\u0440\u0430\u043D\u0438\u0446\u044B", "#0891B2"], ["\u044D\u043C\u043F\u0430\u0442\u0438\u044F", "#7C3AED"]];
    skills.forEach((sk) => {
      const cwd = Math.round(sk[0].length * 6.8) + 34;
      const chipEl = rect(f, chx, y + 176, cwd, 28, C.WHITE, 14);
      setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "chip";
      makeEllipse(f, chx + 11, y + 184, 8, 8, sk[1]);
      txt(f, chx + 25, y + 181, sk[0], 12, 500, C.INK2);
      chx += cwd + 10;
    });
    btn(f, box.cx + 24, y + ch - 66, 180, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", "primary", { icon: "play", h: 44 });
    btn(f, box.cx + 220, y + ch - 66, 140, "\u0412 \u0434\u0435\u043C\u043E", "secondary", { h: 44 });
    txt(f, box.cx + 380, y + ch - 50, "\u043F\u0440\u043E\u0439\u0434\u0435\u043D 2 \u0440\u0430\u0437\u0430 \xB7 \u043B\u0443\u0447\u0448\u0438\u0439 \u0431\u0430\u043B\u043B 86", 12, 400, C.INK3);
    y += ch + 20;
    const sideX = isDesktop ? box.cx + mainW + 24 : box.cx;
    const sideW = isDesktop ? W2 - mainW - 24 : W2;
    cardBox(f, sideX, y - (isDesktop ? 0 : 0), sideW, 236, "card/skills");
    txt(f, sideX + 20, y + 16, "\u0427\u0442\u043E \u0442\u0440\u0435\u043D\u0438\u0440\u0443\u0435\u043C", 15, 600, C.INK);
    skillBarRow(f, sideX + 20, y + 50, sideW - 40, "\u0421\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", 49, "#EA580C");
    skillBarRow(f, sideX + 20, y + 94, sideW - 40, "\u0413\u0440\u0430\u043D\u0438\u0446\u044B", 64, "#0891B2");
    skillBarRow(f, sideX + 20, y + 138, sideW - 40, "\u042D\u043C\u043F\u0430\u0442\u0438\u044F", 72, "#7C3AED");
    txt(f, sideX + 20, y + 188, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043E: \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u043F\u043E \u044D\u0442\u0438\u043C", 12, 400, C.INK3);
    txt(f, sideX + 20, y + 206, "\u043D\u0430\u0432\u044B\u043A\u0430\u043C \u043D\u0438\u0436\u0435 75", 12, 400, C.INK3);
    y += isDesktop ? 0 : 256;
  }
  function sessionBody(f, x, y, w, mode) {
    let cy = y;
    cy += sessionTop(f, x, cy, w, 3, 7, "\u0423\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430");
    emotionIndicatorCompact(f, x, cy, F2);
    cy += 60;
    if (mode === "free") {
      const ta = rect(f, x, cy, w, 96, C.WHITE, 10);
      setStroke(ta, C.ACCENT, 2, "inner");
      ta.name = "Input / textarea / focus";
      txt(f, x + 14, cy + 12, "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0443\u2026", 14, 400, C.INK3);
      txt(f, x + 14, cy + 70, "beta \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439 \u0432\u0432\u043E\u0434", 11, 500, C.ACCENT);
      txt(f, x + w - 74, cy + 70, "184 / 500", 11, 400, C.INK3);
      cy += 110;
      btn(f, x + w - 140, cy, 140, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "primary", { icon: "send", h: 44 });
      cy += 60;
      return cy - y;
    }
    cy += bubble(f, x, cy, Math.min(w - 20, 430), "\u042F \u043D\u0435 \u0437\u043D\u0430\u044E, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C\u2026 \u041A\u0430\u043A \u0431\u0443\u0434\u0442\u043E", "\u0432\u0441\u0451 \u0438\u0434\u0451\u0442 \u043D\u0435 \u0442\u0430\u043A, \u0438 \u044F \u0443\u0436\u0435 \u043D\u0435 \u0441\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0441\u044C.", "left") + 24;
    ic(f, "frown", x + 2, cy, 14, C.ERROR);
    txt(f, x + 22, cy - 2, "\u044D\u043C\u043E\u0446\u0438\u044F 3/10 \xB7 \u043D\u0438\u0437\u043A\u0438\u0439 \u0444\u043E\u043D", 11, 500, C.ERROR);
    cy += 26;
    cy += bubble(f, x + (w > 500 ? 60 : 20), cy, Math.min(w - 80, 400), "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435, \u043A\u043E\u0433\u0434\u0430", "\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u043E\u0431 \u044D\u0442\u043E\u043C?", "right") + 20;
    cy += answerStack(f, x, cy, w, [
      ["\u041E\u0442\u0440\u0430\u0436\u0430\u044E \u0447\u0443\u0432\u0441\u0442\u0432\u043E: \xAB\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u0434\u043B\u044F \u0432\u0430\u0441 \u0432\u0441\u0451 \u0441\u043B\u0438\u0448\u043A\u043E\u043C\xBB", "\u044D\u043C\u043F\u0430\u0442\u0438\u044F"],
      ["\u0427\u0442\u043E \u0434\u043B\u044F \u0432\u0430\u0441 \u0437\u043D\u0430\u0447\u0438\u0442 \xAB\u043D\u0435 \u0441\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0435\u0441\u044C\xBB?", "\u0432\u043E\u043F\u0440\u043E\u0448\u0430\u043D\u0438\u0435"],
      ["\u041C\u043E\u043B\u0447\u0443 \u0438 \u0432\u044B\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E \u043F\u0430\u0443\u0437\u0443", "\u0432\u044B\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u0430\u0443\u0437\u044B"]
    ], true);
    return cy - y;
  }
  function e22(f, m) {
    const box = shell(f, m, 1, "\u0421\u0435\u0441\u0441\u0438\u044F");
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
    const histW = 280;
    sessionBody(f, box.cx, box.cy, mainW, "chat");
    if (isDesktop) {
      historyPanel(f, box.cx + mainW + 24, box.cy, histW);
    }
  }
  function e23(f, m) {
    const box = shell(f, m, 1, "\u0421\u0435\u0441\u0441\u0438\u044F \xB7 \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442");
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
    sessionBody(f, box.cx, box.cy, mainW, "free");
    if (isDesktop) {
      historyPanel(f, box.cx + mainW + 24, box.cy, 280);
    }
  }
  function e24(f, m) {
    const box = shell(f, m, 1, "\u0421\u0435\u0441\u0441\u0438\u044F");
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round(box.cw - 304) : box.cw;
    sessionBody(f, box.cx, box.cy, mainW, "chat");
    if (isDesktop) historyPanel(f, box.cx + mainW + 24, box.cy, 280);
    const ov = rect(f, 0, 0, m.w, m.h, C.INK, 0);
    try {
      ov.fills = [{ fillColor: C.INK, fillOpacity: 0.5 }];
    } catch (_) {
    }
    ov.name = "Modal / backdrop";
    const mw = m.kind === "mobile" ? m.w - 32 : 400;
    const mx = Math.round((m.w - mw) / 2);
    const my = Math.round(m.h / 2 - 130);
    const card2 = rect(f, mx, my, mw, 260, C.WHITE, 16);
    setShadow(card2, 0, 12, 32, 0.2);
    card2.name = "Modal / sm / pause";
    txt(f, mx + 24, my + 24, "\u041F\u0430\u0443\u0437\u0430", 20, 700, C.INK);
    txt(f, mx + 24, my + 56, "\u0421\u0435\u0441\u0441\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u0448\u0430\u0433\u0435 3 \u0438\u0437 7.", 14, 400, C.INK2);
    txt(f, mx + 24, my + 76, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.", 14, 400, C.INK2);
    btn(f, mx + 24, my + 112, mw - 48, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", "primary", { h: 44 });
    btn(f, mx + 24, my + 168, mw - 48, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E", "secondary", { h: 44 });
    txt(f, mx + 24, my + 228, "\u0417\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432 \u0440\u0430\u0437\u0431\u043E\u0440", 11, 400, C.INK3);
  }
  function e25(f, m) {
    const box = shell(f, m, 1, "\u0420\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438");
    let y = box.cy;
    const W2 = box.cw;
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round((W2 - 24) * 0.58) : W2;
    const heroH = 210;
    cardBox(f, box.cx, y, mainW, heroH, "card/result");
    txt(f, box.cx + 24, y + 20, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \xAB\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C\xBB \xB7 15 \u043C\u0438\u043D", 12, 500, C.INK3);
    txt(f, box.cx + 24, y + 44, "78", 56, 700, C.INK);
    txt(f, box.cx + 118, y + 74, "/ 100", 20, 600, C.INK3);
    const badge = rect(f, box.cx + 210, y + 58, 132, 30, "#DCFCE7", 15);
    badge.name = "badge/improved";
    ic(f, "circle-check", box.cx + 220, y + 65, 16, "#166534");
    txt(f, box.cx + 242, y + 64, "+6 \u043A \u043F\u0440\u043E\u0448\u043B\u043E\u043C\u0443", 12, 600, "#166534");
    txt(f, box.cx + 24, y + 122, "\u041E\u0447\u043A\u0438: +120 \xB7 \u043A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043E\u0448\u0438\u0431\u043E\u043A \u043D\u0435\u0442", 13, 500, C.INK2);
    const ach = [["trophy", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u043E\u0439\u0434\u0435\u043D"], ["zap", "\u0421\u0435\u0440\u0438\u044F 5 \u0434\u043D\u0435\u0439"]];
    let axx = box.cx + 24;
    ach.forEach((a) => {
      const awd = Math.round(a[1].length * 6.6) + 46;
      const t = rect(f, axx, y + 150, awd, 32, "#FEF3C7", 16);
      t.name = "achievement-chip";
      ic(f, a[0], axx + 10, y + 157, 18, "#B45309");
      txt(f, axx + 34, y + 158, a[1], 12, 500, "#92400E");
      axx += awd + 10;
    });
    y += heroH + 20;
    const warnH = 92;
    const wcard = rect(f, box.cx, y, mainW, warnH, "#FFFBEB", 12);
    setStroke(wcard, "#FDE68A", 1, "inner");
    wcard.name = "CriticalErrorBanner / warning";
    rect(f, box.cx, y + 10, 4, warnH - 20, C.WARNING, 2);
    ic(f, "triangle-alert", box.cx + 20, y + 18, 20, C.WARNING);
    txt(f, box.cx + 52, y + 14, "\u041F\u043E\u0447\u0442\u0438 \u043A\u0440\u0438\u0442\u0438\u0447\u043D\u043E: \u0434\u0432\u0430\u0436\u0434\u044B \u0443\u0445\u043E\u0434\u0438\u043B\u0438 \u043E\u0442 \u044D\u043C\u043E\u0446\u0438\u0438", 13, 600, "#92400E");
    txt(f, box.cx + 52, y + 36, "\u041D\u0430 \u0448\u0430\u0433\u0430\u0445 4 \u0438 6 \u0432\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043B\u0438 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440 \u043D\u0430 \u0444\u0430\u043A\u0442\u044B, \u043A\u043E\u0433\u0434\u0430 \u043A\u043B\u0438\u0435\u043D\u0442", 12, 400, "#92400E");
    txt(f, box.cx + 52, y + 54, "\u0433\u043E\u0432\u043E\u0440\u0438\u043B \u043E \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u0445. \u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0440\u0430\u0437 \u043E\u0442\u0440\u0430\u0437\u0438\u0442\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u043E \u0434\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430.", 12, 400, "#B45309");
    y += warnH + 20;
    const radH = 300;
    cardBox(f, box.cx, y, mainW, radH, "card/radar");
    txt(f, box.cx + 20, y + 16, "\u041D\u0430\u0432\u044B\u043A\u0438 \u0441\u0435\u0441\u0441\u0438\u0438", 16, 600, C.INK);
    try {
      const o = getOrigin();
      const svg = penpot.createShapeFromSvg(radarSvg(230));
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + box.cx + 30;
        svg.y = o.y + y + 50;
        svg.name = "radar";
      }
    } catch (_) {
    }
    const skx = box.cx + 290;
    [[86, "\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "#2563EB"], [72, "\u042D\u043C\u043F\u0430\u0442\u0438\u044F", "#7C3AED"], [49, "\u0421\u043E\u043F\u0440\u043E\u0442.", "#EA580C"], [68, "\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", "#9333EA"]].forEach((s, i) => {
      skillBarRow(f, skx, y + 60 + i * 46, mainW - 320, s[1], s[0], s[2]);
    });
    y += radH + 20;
    if (m.kind === "mobile") {
      btn(f, box.cx, y, W2, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", "primary", { icon: "arrow-right", h: 48 });
      y += 60;
      btn(f, box.cx, y, W2, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C", "secondary", { icon: "rotate-ccw", h: 44 });
      y += 56;
      btn(f, box.cx, y, (W2 - 12) / 2, "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F", "secondary", { icon: "share-2", h: 44 });
      btn(f, box.cx + (W2 + 12) / 2, y, (W2 - 12) / 2, "PDF", "secondary", { icon: "download", h: 44 });
    } else {
      btn(f, box.cx, y, 220, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", "primary", { icon: "arrow-right", h: 48 });
      btn(f, box.cx + 236, y, 160, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C", "secondary", { icon: "rotate-ccw", h: 48 });
      btn(f, box.cx + 412, y, 150, "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F", "secondary", { icon: "share-2", h: 48 });
      btn(f, box.cx + 578, y, 150, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C PDF", "secondary", { icon: "download", h: 48 });
    }
    if (isDesktop) {
      const dx = box.cx + mainW + 24;
      const dw = W2 - mainW - 24;
      cardBox(f, dx, box.cy, dw, 420, "card/moments");
      txt(f, dx + 20, box.cy + 18, "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043C\u043E\u043C\u0435\u043D\u0442\u044B", 15, 600, C.INK);
      const moments = [
        ["ok", "\u0428\u0430\u0433 2 \xB7 \u041E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u0430", "\xAB\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u0441\u0451 \u0441\u043B\u0438\u0448\u043A\u043E\u043C\xBB \u2014 \u043A\u043B\u0438\u0435\u043D\u0442 \u0440\u0430\u0441\u043A\u0440\u044B\u043B\u0441\u044F"],
        ["ok", "\u0428\u0430\u0433 5 \xB7 \u041F\u0430\u0443\u0437\u0430 \u0432\u044B\u0434\u0435\u0440\u0436\u0430\u043D\u0430", "\u0414\u0430\u043B\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E, \u043E\u043D \u0432\u0435\u0440\u043D\u0443\u043B\u0441\u044F \u043A \u0442\u0435\u043C\u0435 \u0441\u0430\u043C"],
        ["warn", "\u0428\u0430\u0433 4 \xB7 \u0423\u0445\u043E\u0434 \u043E\u0442 \u044D\u043C\u043E\u0446\u0438\u0438", "\u041F\u0435\u0440\u0435\u0432\u0435\u043B\u0438 \u043D\u0430 \u0444\u0430\u043A\u0442\u044B \u2014 \u043E\u0442\u0440\u0430\u0437\u0438\u0442\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u043E \u0434\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430"],
        ["warn", "\u0428\u0430\u0433 6 \xB7 \u0417\u0430\u043A\u0440\u044B\u0442\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441", "\xAB\u0412\u044B \u0443\u0441\u0442\u0430\u043B\u0438?\xBB \u2014 \u043B\u0443\u0447\u0448\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0435: \xAB\u0427\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435?\xBB"]
      ];
      moments.forEach((mo, i) => {
        const my2 = box.cy + 52 + i * 88;
        if (mo[0] === "ok") {
          ic(f, "circle-check", dx + 20, my2, 18, C.SUCCESS);
        } else {
          ic(f, "triangle-alert", dx + 20, my2, 18, C.WARNING);
        }
        txt(f, dx + 46, my2 - 2, mo[1], 12, 600, C.INK);
        txt(f, dx + 46, my2 + 18, mo[2].slice(0, 40), 11, 400, C.INK2);
        txt(f, dx + 46, my2 + 34, mo[2].slice(40) || " ", 11, 400, C.INK2);
      });
      txt(f, dx + 20, box.cy + 402, "\u041F\u043E\u043B\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0440 \u2192", 13, 500, C.ACCENT);
    }
  }
  function e26(f, m) {
    const box = shell(f, m, 1, "\u0420\u0430\u0437\u0431\u043E\u0440 \xB7 \u0434\u0435\u0442\u0430\u043B\u0438");
    let y = box.cy;
    const W2 = box.cw;
    txt(f, box.cx, y, "\u2190  \u041A \u0438\u0442\u043E\u0433\u0430\u043C", 13, 500, C.ACCENT);
    y += 34;
    txt(f, box.cx, y, "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C \xB7 \u0440\u0430\u0437\u0431\u043E\u0440", 20, 700, C.INK);
    y += 40;
    const okH = 168;
    cardBox(f, box.cx, y, W2, okH, "card/worked");
    txt(f, box.cx + 20, y + 16, "\u0427\u0442\u043E \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u043E", 15, 600, "#166534");
    const okItems = [
      ["\u0428\u0430\u0433 2 \xB7 \u041E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u0430", "\xAB\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u0434\u043B\u044F \u0432\u0430\u0441 \u0432\u0441\u0451 \u0441\u043B\u0438\u0448\u043A\u043E\u043C\xBB \u2014 \u043A\u043B\u0438\u0435\u043D\u0442 \u0440\u0430\u0441\u043A\u0440\u044B\u043B\u0441\u044F \u0438 \u043F\u0435\u0440\u0435\u0448\u0451\u043B \u043A \u0433\u043B\u0430\u0432\u043D\u043E\u043C\u0443."],
      ["\u0428\u0430\u0433 5 \xB7 \u0412\u044B\u0434\u0435\u0440\u0436\u0430\u043D\u043D\u0430\u044F \u043F\u0430\u0443\u0437\u0430", "\u0412\u044B \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u043B\u0438 \u0442\u0438\u0448\u0438\u043D\u0443 \u2014 \u043A\u043B\u0438\u0435\u043D\u0442 \u0441\u0430\u043C \u0432\u0435\u0440\u043D\u0443\u043B\u0441\u044F \u043A \u0442\u0435\u043C\u0435 \u0438 \u0443\u0442\u043E\u0447\u043D\u0438\u043B \u0437\u0430\u043F\u0440\u043E\u0441."]
    ];
    okItems.forEach((it, i) => {
      const iy = y + 48 + i * 58;
      ic(f, "circle-check", box.cx + 20, iy, 18, C.SUCCESS);
      txt(f, box.cx + 48, iy - 2, it[0], 13, 600, C.INK);
      txt(f, box.cx + 48, iy + 18, it[1].slice(0, Math.floor(W2 / 5.6)), 12, 400, C.INK2);
    });
    y += okH + 16;
    const imH = 168;
    cardBox(f, box.cx, y, W2, imH, "card/improve");
    txt(f, box.cx + 20, y + 16, "\u0427\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C", 15, 600, "#92400E");
    const imItems = [
      ["\u0428\u0430\u0433 4 \xB7 \u0423\u0445\u043E\u0434 \u043E\u0442 \u044D\u043C\u043E\u0446\u0438\u0438", "\u0414\u0432\u0430\u0436\u0434\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043B\u0438 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440 \u043D\u0430 \u0444\u0430\u043A\u0442\u044B. \u041E\u0442\u0440\u0430\u0436\u0430\u0439\u0442\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u043E \u0434\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430."],
      ["\u0428\u0430\u0433 6 \xB7 \u0417\u0430\u043A\u0440\u044B\u0442\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441", "\xAB\u0412\u044B \u0443\u0441\u0442\u0430\u043B\u0438?\xBB \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440. \u041E\u0442\u043A\u0440\u044B\u0442\u043E\u0435: \xAB\u0427\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441?\xBB"]
    ];
    imItems.forEach((it, i) => {
      const iy = y + 48 + i * 58;
      ic(f, "triangle-alert", box.cx + 20, iy, 18, C.WARNING);
      txt(f, box.cx + 48, iy - 2, it[0], 13, 600, C.INK);
      txt(f, box.cx + 48, iy + 18, it[1].slice(0, Math.floor(W2 / 5.6)), 12, 400, C.INK2);
    });
    y += imH + 16;
    const altH = 150;
    cardBox(f, box.cx, y, W2, altH, "card/alternatives");
    txt(f, box.cx + 20, y + 16, "\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0443\u0434\u0430\u0447\u043D\u044B\u0435 \u0445\u043E\u0434\u044B \xB7 \u0448\u0430\u0433 4", 15, 600, C.INK);
    const alt = rect(f, box.cx + 20, y + 46, W2 - 40, 84, "#F0FDF4", 12);
    setStroke(alt, C.SUCCESS, 2, "inner");
    alt.name = "AnswerOption / correct / alternative";
    txt(f, box.cx + 34, y + 58, "\xAB\u0417\u0432\u0443\u0447\u0438\u0442, \u043A\u0430\u043A \u0432\u044B \u0434\u0435\u0440\u0436\u0438\u0442\u0435\u0441\u044C \u0438\u0437 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u0441\u0438\u043B. \u041A\u0430\u043A \u044D\u0442\u043E \u2014 \u043D\u0435\u0441\u0442\u0438", 13, 400, C.INK);
    txt(f, box.cx + 34, y + 78, "\u044D\u0442\u043E \u0432\u0441\u0451 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E?\xBB", 13, 400, C.INK);
    const tech = rect(f, box.cx + 34, y + 98, 150, 24, C.WHITE, 12);
    setStroke(tech, C.BD, 1, "inner");
    makeEllipse(f, box.cx + 42, y + 106, 8, 8, "#7C3AED");
    txt(f, box.cx + 56, y + 101, "\u044D\u043C\u043F\u0430\u0442\u0438\u044F \xB7 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F", 11, 500, "#6D28D9");
  }
  function e27(f, m) {
    const box = shell(f, m, 4, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0439");
    let y = box.cy;
    const W2 = box.cw;
    const rows = [
      ["16.09 \xB7 14:00", "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435\u043C", 78, "15 \u043C\u0438\u043D", "done", "\u0420\u0430\u0437\u0431\u043E\u0440"],
      ["14.09 \xB7 12:30", "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F", 74, "18 \u043C\u0438\u043D", "done", "\u0420\u0430\u0437\u0431\u043E\u0440"],
      ["12.09 \xB7 18:00", "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 91, "12 \u043C\u0438\u043D", "done", "\u0420\u0430\u0437\u0431\u043E\u0440"],
      ["10.09 \xB7 11:00", "\u0413\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442", 68, "21 \u043C\u0438\u043D", "paused", "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"],
      ["08.09 \xB7 09:30", "\u0426\u0438\u0440\u043A\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B", 82, "14 \u043C\u0438\u043D", "done", "\u0420\u0430\u0437\u0431\u043E\u0440"],
      ["05.09 \xB7 16:00", "\u042D\u043C\u043F\u0430\u0442\u0438\u044F \u0432 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u0435", 61, "19 \u043C\u0438\u043D", "done", "\u0420\u0430\u0437\u0431\u043E\u0440"]
    ];
    const rowH = 52;
    const tableH = 56 + rows.length * rowH + 64;
    cardBox(f, box.cx, y, W2, tableH, "card/history-table");
    const hy = y + 14;
    txt(f, box.cx + 20, hy, "\u0414\u0410\u0422\u0410", 11, 500, C.INK3);
    txt(f, box.cx + 130, hy, "\u0421\u0426\u0415\u041D\u0410\u0420\u0418\u0419", 11, 500, C.INK3);
    if (m.kind !== "mobile") {
      txt(f, box.cx + Math.round(W2 * 0.55), hy, "\u0411\u0410\u041B\u041B", 11, 500, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.55) + 80, hy, "\u0412\u0420\u0415\u041C\u042F", 11, 500, C.INK3);
    }
    ic(f, "chevron-up", box.cx + Math.round(W2 * 0.55) + 46, hy + 1, 13, C.ACCENT);
    txt(f, box.cx + W2 - 90, hy, "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u0415", 11, 500, C.INK3);
    rows.forEach((r, i) => {
      const ry = y + 52 + i * rowH;
      txt(f, box.cx + 20, ry + 8, r[0], 12, 400, C.INK3);
      txt(f, box.cx + 130, ry + 7, r[1], 13, 500, C.INK);
      if (m.kind !== "mobile") {
        const col = r[2] >= 80 ? "#166534" : r[2] >= 70 ? C.INK : "#B45309";
        txt(f, box.cx + Math.round(W2 * 0.55), ry + 7, String(r[2]), 14, 700, col);
        txt(f, box.cx + Math.round(W2 * 0.55) + 80, ry + 8, r[3], 12, 400, C.INK2);
      } else {
        txt(f, box.cx + W2 - 168, ry + 8, String(r[2]), 14, 700, r[2] >= 70 ? C.INK : "#B45309");
      }
      const isPaused = r[4] === "paused";
      const btnW = m.kind === "mobile" ? 76 : 92;
      const bEl = rect(f, box.cx + W2 - 20 - btnW, ry + 4, btnW, 28, isPaused ? C.ACCENT : C.BG2, 14);
      if (isPaused) {
      } else setStroke(bEl, C.BD, 1, "inner");
      bEl.name = "Button / sm / " + (isPaused ? "primary" : "secondary");
      txt(f, box.cx + W2 - 14 - btnW, ry + 9, isPaused ? "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" : "\u041E\u0442\u043A\u0440\u044B\u0442\u044C", 11, 600, isPaused ? "#FFFFFF" : C.INK2);
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 4, W2 - 40, 1, C.BD, 0);
    });
    const py = y + 52 + rows.length * rowH + 14;
    ic(f, "chevron-left", box.cx + 20, py + 5, 14, C.INK3);
    [1, 2, 3].forEach((p) => {
      const px = box.cx + 48 + (p - 1) * 32;
      if (p === 1) {
        const pg = rect(f, px, py, 24, 24, C.ACCENT, 6);
        pg.name = "pagination/active";
        txt(f, px + 8, py + 4, "1", 12, 600, "#FFFFFF");
      } else {
        txt(f, px + 8, py + 4, String(p), 12, 400, C.INK2);
      }
    });
    txt(f, box.cx + 48 + 3 * 32, py + 4, "\u2026", 12, 400, C.INK3);
    ic(f, "chevron-right", box.cx + 48 + 3 * 32 + 24, py + 5, 14, C.INK2);
    y += tableH + 20;
    if (m.kind !== "mobile") {
      btn(f, box.cx, y, 180, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV", "secondary", { icon: "download", h: 40 });
      btn(f, box.cx + 196, y, 180, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 PDF", "secondary", { icon: "file-text", h: 40 });
    }
  }
  function e28(f, m) {
    const box = shell(f, m, 4, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441");
    let y = box.cy;
    const W2 = box.cw;
    const isDesktop = m.kind === "desktop";
    const mainW = isDesktop ? Math.round((W2 - 24) * 0.55) : W2;
    const radH = 340;
    cardBox(f, box.cx, y, mainW, radH, "card/radar");
    txt(f, box.cx + 20, y + 16, "\u0420\u0430\u0434\u0430\u0440 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", 16, 600, C.INK);
    txt(f, box.cx + mainW - 130, y + 18, "\u0441\u0440\u0435\u0434\u043D\u0438\u0439 71/100", 12, 500, C.INK2);
    try {
      const o = getOrigin();
      const svg = penpot.createShapeFromSvg(radarSvg(240));
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + box.cx + Math.round((mainW - 240) / 2);
        svg.y = o.y + y + 52;
        svg.name = "radar";
      }
    } catch (_) {
    }
    y += radH + 20;
    const chH = 220;
    cardBox(f, box.cx, y, mainW, chH, "card/dynamics");
    txt(f, box.cx + 20, y + 16, "\u0414\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u0431\u0430\u043B\u043B\u0430", 16, 600, C.INK);
    txt(f, box.cx + mainW - 150, y + 18, "12 \u043D\u0435\u0434\u0435\u043B\u044C", 12, 400, C.INK3);
    try {
      const o = getOrigin();
      const svg = penpot.createShapeFromSvg(lineChartSvg(mainW - 40, 140, [58, 61, 60, 64, 66, 65, 69, 70, 68, 71, 74, 71], C.ACCENT));
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + box.cx + 20;
        svg.y = o.y + y + 56;
        svg.name = "line-chart";
      }
    } catch (_) {
    }
    y += chH + 20;
    const listH = 400;
    const listX = isDesktop ? box.cx + mainW + 24 : box.cx;
    const listW = isDesktop ? W2 - mainW - 24 : W2;
    cardBox(f, listX, isDesktop ? box.cy : y, listW, listH, "card/skills");
    const ly = isDesktop ? box.cy : y;
    txt(f, listX + 20, ly + 16, "\u041D\u0430\u0432\u044B\u043A\u0438", 16, 600, C.INK);
    const data = [
      ["\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 86, "#2563EB", 12],
      ["\u0412\u043E\u043F\u0440\u043E\u0441\u044B", 81, "#0EA5E9", 9],
      ["\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", 77, "#65A30D", 5],
      ["\u042D\u043C\u043F\u0430\u0442\u0438\u044F", 72, "#7C3AED", 8],
      ["\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", 68, "#9333EA", 4],
      ["\u0413\u0440\u0430\u043D\u0438\u0446\u044B", 64, "#0891B2", 6],
      ["\u042D\u043C\u043E\u0446\u0438\u0438", 58, "#DB2777", 3],
      ["\u0421\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435", 49, "#EA580C", 7]
    ];
    data.forEach((d, i) => {
      const ry = ly + 52 + i * 42;
      txt(f, listX + 20, ry, d[0], 12, 500, C.INK2);
      txt(f, listX + listW - 96, ry - 2, String(d[1]), 13, 700, C.INK);
      txt(f, listX + listW - 60, ry, "+" + d[3], 11, 500, C.SUCCESS);
      rect(f, listX + 20, ry + 20, listW - 104, 5, C.BG3, 3);
      rect(f, listX + 20, ry + 20, Math.max(6, Math.round((listW - 104) * d[1] / 100)), 5, d[2], 3);
    });
  }
  var SCREENS2 = [
    { code: "E-20", title: "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432", mobileH: 1400, draw: e20 },
    { code: "E-21", title: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F", mobileH: 1e3, draw: e21 },
    { code: "E-22", title: "\u0421\u0435\u0441\u0441\u0438\u044F", draw: e22 },
    { code: "E-23", title: "\u0421\u0435\u0441\u0441\u0438\u044F \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439 \u0432\u0432\u043E\u0434", draw: e23 },
    { code: "E-24", title: "\u0421\u0435\u0441\u0441\u0438\u044F \xB7 \u043F\u0430\u0443\u0437\u0430", draw: e24 },
    { code: "E-25", title: "\u0420\u0430\u0437\u0431\u043E\u0440", mobileH: 1180, draw: e25 },
    { code: "E-26", title: "\u0420\u0430\u0437\u0431\u043E\u0440 \xB7 \u0434\u0435\u0442\u0430\u043B\u0438", mobileH: 1e3, draw: e26 },
    { code: "E-27", title: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0439", mobileH: 980, draw: e27 },
    { code: "E-28", title: "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", mobileH: 1220, draw: e28 }
  ];
  var SCREEN2_FRAME_NAMES = SCREENS2.flatMap((s) => ["1440", "768", "390"].map((bp) => s.code + " " + s.title + " / " + bp));
  function buildScreens2(log) {
    F2 = pickFont(FONT_FALLBACKS);
    const SX = 4620 + 1440 + 240;
    let y = 100;
    for (const s of SCREENS2) {
      const modes = [[D, "1440"], [T, "768"], [MB, "390"]];
      for (const mm of modes) {
        const h = mm[0].kind === "mobile" && s.mobileH ? s.mobileH : mm[0].h;
        const mode = { w: mm[0].w, h, kind: mm[0].kind };
        const f = openFrame(s.code + " " + s.title + " / " + mm[1], SX, y, mode.w, h);
        try {
          s.draw(f, mode);
        } catch (e) {
          log.push("\xD7 " + s.code + "/" + mm[1] + ": " + e);
        }
      }
      y += 1300;
    }
  }

  // src/screens3.ts
  var F3 = null;
  function darkFrame(name, x, y, w, h) {
    const f = openFrame(name, x, y, w, h);
    try {
      f.fills = [{ fillColor: C.D_BG, fillOpacity: 1 }];
    } catch (_) {
    }
    return f;
  }
  function dRect(f, x, y, w, h, fill, r) {
    const rc = rect(f, x, y, w, h, fill, r);
    if (fill === C.D_BG2) setStroke(rc, C.D_BD, 1, "inner");
    return rc;
  }
  function clientCard(f, x, y, w, h, name) {
    const c = dRect(f, x, y, w, h, C.D_BG2, 14);
    c.name = name;
  }
  function filterChipsGames(f, x, y, maxW) {
    const chips = [
      ["\u0412\u0441\u0435 \u0442\u0438\u043F\u044B", true],
      ["\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435", false],
      ["\u041C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044F", false],
      ["\u0414\u043D\u0435\u0432\u043D\u0438\u043A", false],
      ["\u0422\u0435\u0445\u043D\u0438\u043A\u0430", false],
      ["\u0422\u0440\u0435\u0432\u043E\u0433\u0430", false],
      ["\u0421\u0442\u0440\u0435\u0441\u0441", false],
      ["\u042D\u043C\u043E\u0446\u0438\u0438", false]
    ];
    let cx = x;
    let cy = y;
    chips.forEach((cdef) => {
      const cwd = Math.round(cdef[0].length * 6.8) + 26;
      if (cx + cwd > x + maxW) {
        cx = x;
        cy += 40;
      }
      const chipEl = rect(f, cx, cy, cwd, 30, cdef[1] ? C.ACCENT : C.WHITE, 15);
      if (!cdef[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "filter-chip";
      txt(f, cx + 12, cy + 8, cdef[0], 12, cdef[1] ? 600 : 500, cdef[1] ? "#FFFFFF" : C.INK2);
      cx += cwd + 10;
    });
    return cy + 40 - y;
  }
  function e30(f, m) {
    const box = shell(f, m, 2, "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0438\u0433\u0440");
    let y = box.cy;
    const W2 = box.cw;
    const searchW = m.kind === "mobile" ? W2 : 420;
    const sf = rect(f, box.cx, y, searchW, 40, C.WHITE, 8);
    setStroke(sf, C.BD, 1, "inner");
    sf.name = "Input / search";
    ic(f, "search", box.cx + 12, y + 12, 16, C.INK3);
    txt(f, box.cx + 36, y + 10, "\u0418\u0433\u0440\u0430 \u0438\u043B\u0438 \u0442\u0435\u043C\u0430\u2026", 14, 400, C.INK3);
    if (m.kind !== "mobile") txt(f, box.cx + W2 - 110, y + 12, "12 \u0438\u0433\u0440", 13, 500, C.INK3);
    y += 56;
    y += filterChipsGames(f, box.cx, y, W2);
    const cols = m.kind === "desktop" ? 3 : m.kind === "tablet" ? 2 : 1;
    const gap = 20;
    const games = [
      ["\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435", "\u0422\u0440\u0435\u0432\u043E\u0433\u0430"],
      ["\u041C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044F", "\u0421\u0442\u0440\u0435\u0441\u0441"],
      ["\u0414\u043D\u0435\u0432\u043D\u0438\u043A", "\u042D\u043C\u043E\u0446\u0438\u0438"],
      ["\u0422\u0435\u0445\u043D\u0438\u043A\u0430", "\u0422\u0440\u0435\u0432\u043E\u0433\u0430"],
      ["\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435", "\u042D\u043C\u043E\u0446\u0438\u0438"],
      ["\u041C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044F", "\u0422\u0440\u0435\u0432\u043E\u0433\u0430"]
    ];
    games.forEach((g, i) => {
      const cx = box.cx + i % cols * (300 + gap);
      const cy = y + Math.floor(i / cols) * 192;
      gameCard(f, cx, cy, F3);
    });
  }
  function e31(f, m) {
    const box = shell(f, m, 2, "\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F");
    let y = box.cy;
    const W2 = box.cw;
    const isDesktop = m.kind === "desktop";
    const formW = isDesktop ? Math.round((W2 - 24) * 0.46) : W2;
    const formH = isDesktop ? 520 : 620;
    cardBox(f, box.cx, y, formW, formH, "card/form");
    const px = box.cx + 20;
    const pw = formW - 40;
    let cy = y + 18;
    txt(f, px, cy, "\u0412\u044B\u0434\u0430\u0442\u044C \u0438\u0433\u0440\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443", 17, 700, C.INK);
    cy += 36;
    const gsel = rect(f, px, cy, pw, 64, C.BG2, 10);
    gsel.name = "select/game";
    ic(f, "sparkles", px + 14, cy + 14, 18, C.ACCENT);
    txt(f, px + 42, cy + 10, "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", 14, 600, C.INK);
    txt(f, px + 42, cy + 30, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435 \xB7 \u0422\u0440\u0435\u0432\u043E\u0433\u0430 \xB7 5 \u043C\u0438\u043D", 11, 400, C.INK3);
    ic(f, "chevron-down", px + pw - 26, cy + 24, 16, C.INK3);
    txt(f, px, cy + 74, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0443\u044E \u0438\u0433\u0440\u0443 \u2192", 12, 500, C.ACCENT);
    cy += 104;
    txt(f, px, cy, "\u041C\u0435\u0442\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430", 12, 500, C.INK2);
    const mf = rect(f, px, cy + 24, pw, 40, C.WHITE, 8);
    setStroke(mf, C.BD, 1, "inner");
    txt(f, px + 12, cy + 34, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", 14, 400, C.INK);
    txt(f, px, cy + 72, "\u041F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C \u0432\u043C\u0435\u0441\u0442\u043E \u0438\u043C\u0435\u043D\u0438 \u2014 \u0432\u0438\u0434\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u043C", 11, 400, C.INK3);
    cy += 98;
    txt(f, px, cy, "\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0443\u043F\u0430", 12, 500, C.INK2);
    [["7 \u0434\u043D\u0435\u0439", false], ["30 \u0434\u043D\u0435\u0439", true], ["90 \u0434\u043D\u0435\u0439", false]].forEach((s, i) => {
      const bx = px + i * 96;
      const bEl = rect(f, bx, cy + 22, 88, 32, s[1] ? "#EFF6FF" : C.WHITE, 16);
      setStroke(bEl, s[1] ? C.ACCENT : C.BD, s[1] ? 2 : 1, "inner");
      bEl.name = "chip/term";
      const t = txt(f, bx + 20, cy + 30, s[0], 13, s[1] ? 600 : 400, s[1] ? C.ACCENT : C.INK2);
    });
    cy += 76;
    txt(f, px, cy, "\u041B\u0438\u043C\u0438\u0442 \u0432\u0445\u043E\u0434\u043E\u0432", 12, 500, C.INK2);
    [["1", false], ["3", false], ["5", true], ["\u221E", false]].forEach((s, i) => {
      const bx = px + i * 56;
      const bEl = rect(f, bx, cy + 22, 48, 32, s[1] ? "#EFF6FF" : C.WHITE, 16);
      setStroke(bEl, s[1] ? C.ACCENT : C.BD, s[1] ? 2 : 1, "inner");
      bEl.name = "chip/limit";
      const t = txt(f, bx + 20, cy + 30, s[0], 13, s[1] ? 600 : 400, s[1] ? C.ACCENT : C.INK2);
    });
    cy += 76;
    const track2 = rect(f, px, cy + 2, 44, 24, C.ACCENT, 12);
    track2.name = "Switch / on";
    const knob = makeEllipse(f, px + 23, cy + 5, 18, 18, C.WHITE);
    setShadow(knob, 0, 1, 2, 0.1);
    txt(f, px + 56, cy + 4, "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0438", 13, 400, C.INK);
    cy += 52;
    btn(f, px, cy, Math.min(240, pw), "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F", "primary", { icon: "key-round", h: 44 });
    const resX = isDesktop ? box.cx + formW + 24 : box.cx;
    const resW = isDesktop ? W2 - formW - 24 : W2;
    const resY = isDesktop ? y : y + formH + 20;
    const sToast = rect(f, resX, resY, Math.min(resW, 380), 52, "#F0FDF4", 12);
    setStroke(sToast, "#BBF7D0", 1, "inner");
    sToast.name = "Toast / success / created";
    ic(f, "circle-check", resX + 14, resY + 16, 20, C.SUCCESS);
    txt(f, resX + 44, resY + 8, "\u0414\u043E\u0441\u0442\u0443\u043F \u0441\u043E\u0437\u0434\u0430\u043D", 13, 600, "#166534");
    txt(f, resX + 44, resY + 28, "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u043A\u043E\u0434 \u0438\u043B\u0438 \u0441\u0441\u044B\u043B\u043A\u0443", 12, 400, "#15803D");
    codeDisplay(f, resX, resY + 68, F3, null);
    deepLinkBlock(f, resX + (isDesktop ? 300 : 0), resY + 68 + (isDesktop ? 0 : 148), F3, null);
  }
  function e32(f, m) {
    const box = shell(f, m, 3, "\u041A\u043B\u0438\u0435\u043D\u0442\u044B");
    let y = box.cy;
    const W2 = box.cw;
    const isDesktop = m.kind === "desktop";
    const listW = isDesktop ? 340 : W2;
    const clients = [
      ["\u041A\u0410", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439 \xB7 2 \u0447 \u043D\u0430\u0437\u0430\u0434", "g", "\u0430\u043A\u0442\u0438\u0432\u0435\u043D", true],
      ["\u041A\u0411", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0411", "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8 \xB7 \u0432\u0447\u0435\u0440\u0430", "b", "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D", false],
      ["\u041A\u0412", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0412", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439 \xB7 3 \u0434\u043D.", "y", "\u0438\u0441\u0442\u0451\u043A", false],
      ["\u041A\u0413", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0413", "\u2014", "n", "\u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u0432", false]
    ];
    const listH = 64 + clients.length * 64 + 8;
    cardBox(f, box.cx, y, listW, listH, "card/clients-list");
    clients.forEach((cl, i) => {
      const ry = y + 56 + i * 64;
      avatar(f, box.cx + 16, ry, 40, cl[0], cl[5] ? C.ACCENT2 : C.INK3);
      txt(f, box.cx + 68, ry + 2, cl[1], 13, 600, cl[5] ? C.INK : C.INK2);
      txt(f, box.cx + 68, ry + 21, cl[2], 11, 400, C.INK3);
      const chipEl = rect(
        f,
        box.cx + listW - 92,
        ry + 8,
        76,
        24,
        cl[3] === "g" ? "#DCFCE7" : cl[3] === "b" ? "#E0F2FE" : cl[3] === "y" ? "#FEF3C7" : C.BG2,
        12
      );
      chipEl.name = "status-chip";
      txt(
        f,
        box.cx + listW - 84,
        ry + 12,
        cl[4],
        10,
        500,
        cl[3] === "g" ? "#166534" : cl[3] === "b" ? "#0C4A6E" : cl[3] === "y" ? "#92400E" : C.INK3
      );
      if (i < clients.length - 1) rect(f, box.cx + 16, ry + 52, listW - 32, 1, C.BD, 0);
      if (cl[5] && isDesktop) rect(f, box.cx + 4, ry - 6, 3, 52, C.ACCENT, 2);
    });
    y += listH + 20;
    if (isDesktop || m.kind === "tablet") {
      const dx = isDesktop ? box.cx + listW + 24 : box.cx;
      const dw = isDesktop ? W2 - listW - 24 : W2;
      clientDetail(f, dx, isDesktop ? box.cy : y, dw);
    } else {
      clientDetail(f, box.cx, y, W2);
    }
  }
  function clientDetail(f, x, y, w) {
    const headH = 76;
    cardBox(f, x, y, w, headH, "card/client-head");
    avatar(f, x + 16, y + 18, 40, "\u041A\u0410");
    txt(f, x + 68, y + 14, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", 16, 700, C.INK);
    txt(f, x + 68, y + 38, "\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0435 \u0441 01.09.2026 \xB7 3 \u0438\u0433\u0440\u044B", 12, 400, C.INK3);
    ic(f, "settings", x + w - 40, y + 28, 18, C.INK3);
    const accY = y + headH + 16;
    txt(f, x + 4, accY + 4, "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u044B", 14, 600, C.INK);
    clientAccessCard(f, x + 4, accY + 28, F3, "active");
    clientAccessCard(f, x + 4, accY + 172, F3, "expired");
    const ntY = accY + 316;
    txt(f, x + 4, ntY + 4, "\u0417\u0430\u043C\u0435\u0442\u043A\u0438", 14, 600, C.INK);
    ic(f, "lock", x + 74, ntY + 5, 13, C.INK3);
    txt(f, x + 92, ntY + 4, "\u0448\u0438\u0444\u0440\u0443\u044E\u0442\u0441\u044F (E2E)", 11, 400, C.INK3);
    const nt = rect(f, x + 4, ntY + 26, Math.min(w - 8, 360), 84, C.WHITE, 10);
    setStroke(nt, C.BD, 1, "inner");
    nt.name = "Input / textarea / notes";
    txt(f, x + 18, ntY + 38, "\u0420\u0435\u0430\u0433\u0438\u0440\u0443\u0435\u0442 \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E \u043D\u0430 \u0442\u0435\u043C\u0443 \u0440\u0430\u0431\u043E\u0442\u044B.", 12, 400, C.INK2);
    txt(f, x + 18, ntY + 56, "\u0414\u044B\u0445\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438 \u0437\u0430\u0445\u043E\u0434\u044F\u0442 \u043B\u0443\u0447\u0448\u0435.", 12, 400, C.INK2);
  }
  function e33(f, m) {
    const box = shell(f, m, 3, "\u0414\u043E\u0441\u0442\u0443\u043F\u044B");
    let y = box.cy;
    const W2 = box.cw;
    btn(f, box.cx + W2 - 170, y - 6, 170, "\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F", "primary", { icon: "plus", h: 40 });
    y += 48;
    const rows = [
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439", "DCFCE7", "#166534", "\u0430\u043A\u0442\u0438\u0432\u0435\u043D", "\u0434\u043E 30.09", "3/5", "copy"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", "DCFCE7", "#166534", "\u0430\u043A\u0442\u0438\u0432\u0435\u043D", "\u0434\u043E 15.10", "1/5", "copy"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0411", "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", "E0F2FE", "#0C4A6E", "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D", "\u2014", "5/5", "copy"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0412", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439", "FEF3C7", "#92400E", "\u0438\u0441\u0442\u0451\u043A", "12.09", "3/3", "none"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0413", "\u0421\u043A\u0440\u0438\u043F\u0442 \u0441\u043D\u0430", "FEE2E2", "#991B1B", "\u043E\u0442\u043E\u0437\u0432\u0430\u043D", "\u2014", "0/3", "none"]
    ];
    const rowH = 52;
    const tableH = 52 + rows.length * rowH + 12;
    cardBox(f, box.cx, y, W2, tableH, "card/access-table");
    const hy = y + 12;
    txt(f, box.cx + 16, hy, "\u041A\u041B\u0418\u0415\u041D\u0422", 11, 500, C.INK3);
    txt(f, box.cx + 120, hy, "\u0418\u0413\u0420\u0410", 11, 500, C.INK3);
    if (m.kind !== "mobile") {
      txt(f, box.cx + Math.round(W2 * 0.42), hy, "\u0421\u0422\u0410\u0422\u0423\u0421", 11, 500, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.58), hy, "\u0421\u0420\u041E\u041A", 11, 500, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.7), hy, "\u0412\u0425\u041E\u0414\u042B", 11, 500, C.INK3);
    }
    txt(f, box.cx + W2 - 96, hy, "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F", 11, 500, C.INK3);
    rows.forEach((r, i) => {
      const ry = y + 44 + i * rowH;
      txt(f, box.cx + 16, ry + 8, r[0], 13, 600, C.INK);
      txt(f, box.cx + 120, ry + 8, r[1], 13, 400, C.INK2);
      if (m.kind !== "mobile") {
        const chipEl = rect(f, box.cx + Math.round(W2 * 0.42), ry + 4, 84, 24, "#" + r[2], 12);
        chipEl.name = "status-chip";
        txt(f, box.cx + Math.round(W2 * 0.42) + 10, ry + 8, r[4], 11, 500, "#" + r[3]);
        txt(f, box.cx + Math.round(W2 * 0.58), ry + 8, r[5], 12, 400, C.INK2);
        txt(f, box.cx + Math.round(W2 * 0.7), ry + 8, r[6], 12, 500, C.INK);
      }
      const ax = box.cx + W2 - 96;
      const cp = rect(f, ax, ry + 2, 32, 28, C.WHITE, 8);
      setStroke(cp, C.BD, 1, "inner");
      cp.name = "Button / copy-icon";
      ic(f, "copy", ax + 8, ry + 9, 14, C.INK2);
      if (r[7] === "copy" || r[4] === "\u0430\u043A\u0442\u0438\u0432\u0435\u043D") {
        const rv = rect(f, ax + 40, ry + 2, 52, 28, C.WHITE, 8);
        setStroke(rv, "#FECACA", 1, "inner");
        rv.name = "Button / revoke";
        txt(f, ax + 47, ry + 8, "\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C", 10, 500, C.ERROR);
      } else {
        txt(f, ax + 44, ry + 8, "\u2014", 12, 400, C.INK3);
      }
      if (i < rows.length - 1) rect(f, box.cx + 16, ry + rowH - 4, W2 - 32, 1, C.BD, 0);
    });
    y += tableH + 16;
    txt(
      f,
      box.cx,
      y,
      "\u041E\u0442\u0437\u044B\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438 \u043A\u043E\u0434. \u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0439 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F.",
      12,
      400,
      C.INK3
    );
  }
  function clientShell(f, m, step) {
    rect(f, 0, 0, m.w, 56, C.D_BG2, 0).name = "client-header";
    rect(f, 16, 16, 24, 24, C.ACCENT, 7);
    txt(f, 48, 18, "Platform", 15, 700, C.D_INK);
    txt(f, m.w - 90, 20, step, 11, 400, C.D_INK2);
    const cardW = Math.min(480, m.w - 32);
    const cardX = Math.round((m.w - cardW) / 2);
    return { cardX, cardW, y: 96 };
  }
  function progressDark(f, x, y, w, cur, total) {
    txt(f, x, y, "\u0428\u0410\u0413 " + cur + " \u0418\u0417 " + total, 10, 500, C.D_INK2);
    rect(f, x, y + 18, w, 6, C.D_BD, 3);
    rect(f, x, y + 18, Math.round(w * cur / total), 6, C.ACCENT, 3).name = "progress-fill";
  }
  function e40(f, m) {
    const sh = clientShell(f, m, "\u0431\u0435\u0437 \u0432\u0445\u043E\u0434\u0430");
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    const h = 420;
    clientCard(f, x, y, w, h, "E-40 card");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 26;
    const typeChip = rect(f, px, cy, 108, 26, "#1E293B", 13);
    typeChip.name = "chip/type";
    txt(f, px + 12, cy + 5, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435", 11, 500, "#93C5FD");
    txt(f, px + 120, cy + 5, "\u0422\u0440\u0435\u0432\u043E\u0433\u0430", 11, 400, C.D_INK2);
    cy += 48;
    txt(f, px, cy, "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", 26, 700, C.D_INK);
    cy += 40;
    txt(f, px, cy, "5 \u043C\u0438\u043D \xB7 6 \u0448\u0430\u0433\u043E\u0432", 13, 500, "#60A5FA");
    cy += 32;
    txt(f, px, cy, "\u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u0434\u044B\u0445\u0430\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442", 14, 400, C.D_INK2);
    cy += 22;
    txt(f, px, cy, "\u0441\u043D\u0438\u0437\u0438\u0442\u044C \u0442\u0440\u0435\u0432\u043E\u0433\u0443 \u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E\u0435", 14, 400, C.D_INK2);
    cy += 22;
    txt(f, px, cy, "\u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435. \u041D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438.", 14, 400, C.D_INK2);
    cy += 36;
    const who = rect(f, px, cy, pw, 56, "#111C2E", 12);
    who.name = "invited-by";
    avatar(f, px + 14, cy + 12, 32, "\u0410\u041A");
    txt(f, px + 58, cy + 10, "\u0412\u0430\u0441 \u043F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u043B\u0430 \u0410\u043D\u043D\u0430 \u041A.", 13, 600, C.D_INK);
    txt(f, px + 58, cy + 30, "\u0432\u0430\u0448 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", 11, 400, C.D_INK2);
    cy += 76;
    btn(f, px, cy, pw, "\u041D\u0430\u0447\u0430\u0442\u044C", "primary", { h: 48 });
    cy += 64;
    const t = txt(f, px, cy, "\u041E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0438\u043B\u0438 \u043A\u043E\u0434\u0443 \xB7 \u0431\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438", 11, 400, C.D_INK2);
    centerTxt(t, px, pw);
  }
  function centerTxt(t, x, w) {
    try {
      if (t && typeof t.width === "number" && t.width > 0) t.x = t.x + (w - t.width) / 2;
    } catch (_) {
    }
  }
  function e41(f, m) {
    const sh = clientShell(f, m, "\u0448\u0430\u0433 1 \u0438\u0437 6");
    progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 1, 6);
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    const h = 360;
    clientCard(f, x, y, w, h, "E-41 card");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 24;
    txt(f, px, cy, "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435", 20, 700, C.D_INK);
    cy += 34;
    txt(f, px, cy, "\u041F\u0435\u0440\u0435\u0434 \u043D\u0430\u0447\u0430\u043B\u043E\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u043E \u043E \u0442\u043E\u043C, \u043A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D\u0430", 13, 400, C.D_INK2);
    cy += 20;
    txt(f, px, cy, "\u0438\u0433\u0440\u0430 \u0438 \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0441 \u0432\u0430\u0448\u0438\u043C\u0438 \u043E\u0442\u0432\u0435\u0442\u0430\u043C\u0438.", 13, 400, C.D_INK2);
    cy += 30;
    const items = [
      ["\u0423\u0447\u0430\u0441\u0442\u0438\u0435 \u0434\u043E\u0431\u0440\u043E\u0432\u043E\u043B\u044C\u043D\u043E\u0435, \u043C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C\u0441\u044F \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442", true],
      ["\u041E\u0442\u0432\u0435\u0442\u044B \u0432\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0448 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", true],
      ["\u042F \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B(\u0430) \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", true]
    ];
    items.forEach((it) => {
      const box = rect(f, px, cy + 2, 18, 18, C.ACCENT, 5);
      box.name = "checkbox-checked";
      ic(f, "check", px + 3, cy + 5, 12, "#FFFFFF");
      txt(f, px + 28, cy, it[0].slice(0, Math.floor(pw / 6.2)), 12, 400, C.D_INK2);
      cy += 44;
    });
    cy += 8;
    txt(f, px, cy, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", 12, 500, "#60A5FA");
    cy += 22;
    txt(f, px, cy, "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F", 12, 500, "#60A5FA");
    cy += 36;
    btn(f, px, cy, pw, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", "primary", { h: 48 });
  }
  function e42(f, m) {
    const sh = clientShell(f, m, "\u0448\u0430\u0433 2 \u0438\u0437 6");
    progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 2, 6);
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    const h = 430;
    clientCard(f, x, y, w, h, "E-42 card \xB7 choice");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 24;
    txt(f, px, cy, "\u041A\u0430\u043A \u0432\u044B \u0441\u0435\u0431\u044F \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441?", 18, 600, C.D_INK);
    cy += 38;
    const opts = [
      ["\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u043E, \u0440\u043E\u0432\u043D\u043E", false],
      ["\u041D\u0435\u043C\u043D\u043E\u0433\u043E \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E", true],
      ["\u041E\u0447\u0435\u043D\u044C \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E", false],
      ["\u0414\u0440\u0443\u0433\u043E\u0435 (\u043E\u043F\u0438\u0448\u0443 \u0441\u043B\u043E\u0432\u0430\u043C\u0438)", false]
    ];
    opts.forEach((o) => {
      const sel = o[1];
      const card2 = rect(f, px, cy, pw, 52, sel ? "#16233B" : C.D_BG2, 12);
      setStroke(card2, sel ? C.ACCENT : C.D_BD, sel ? 2 : 1, "inner");
      card2.name = "AnswerOption / choice / " + (sel ? "selected" : "default");
      makeEllipse(f, px + 16, cy + 17, 18, 18, sel ? C.ACCENT : C.D_BG2);
      if (sel) {
        setStroke(makeEllipse(f, px + 16, cy + 17, 18, 18, "none"), C.ACCENT, 2, "inner");
        makeEllipse(f, px + 21, cy + 22, 8, 8, C.ACCENT);
      } else {
        setStroke(makeEllipse(f, px + 16, cy + 17, 18, 18, "none"), C.D_BD, 2, "inner");
      }
      txt(f, px + 46, cy + 15, o[0], 14, sel ? 600 : 400, sel ? C.D_INK : C.D_INK2);
      cy += 64;
    });
    cy += 10;
    btn(f, px, cy, pw, "\u0414\u0430\u043B\u0435\u0435", "primary", { h: 48 });
  }
  function e42scale(f, m) {
    const sh = clientShell(f, m, "\u0448\u0430\u0433 3 \u0438\u0437 6");
    progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 3, 6);
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    clientCard(f, x, y, w, 340, "E-42 card \xB7 scale");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 24;
    txt(f, px, cy, "\u041E\u0446\u0435\u043D\u0438\u0442\u0435 \u0442\u0440\u0435\u0432\u043E\u0433\u0443 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441", 17, 600, C.D_INK);
    cy += 40;
    const t = txt(f, px, cy, "6", 64, 700, C.WARNING);
    txt(f, px + 66, cy + 38, "/ 10", 18, 600, C.D_INK2);
    cy += 110;
    const segW = Math.round((pw - 9 * 6) / 10);
    for (let i = 0; i < 10; i++) {
      const col = i < 3 ? C.ERROR : i < 6 ? C.WARNING : C.SUCCESS;
      const sel = i === 5;
      const seg = rect(f, px + i * (segW + 6), cy, segW, 16, col, 4);
      try {
        if (!sel) seg.fills = [{ fillColor: col, fillOpacity: 0.35 }];
      } catch (_) {
      }
      seg.name = "scale-seg";
    }
    cy += 28;
    txt(f, px, cy, "0\u20133 \u043D\u0438\u0437\u043A\u0430\u044F", 10, 400, C.D_INK2);
    txt(f, px + pw / 2 - 30, cy, "4\u20136 \u0441\u0440\u0435\u0434\u043D\u044F\u044F", 10, 400, C.D_INK2);
    txt(f, px + pw - 66, cy, "7\u201310 \u0432\u044B\u0441\u043E\u043A\u0430\u044F", 10, 400, C.D_INK2);
    cy += 36;
    btn(f, px, cy, pw, "\u0414\u0430\u043B\u0435\u0435", "primary", { h: 48 });
  }
  function e42timer(f, m) {
    const sh = clientShell(f, m, "\u0448\u0430\u0433 4 \u0438\u0437 6");
    progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 4, 6);
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    clientCard(f, x, y, w, 400, "E-42 card \xB7 timer");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 24;
    txt(f, px, cy, "\u041C\u0435\u0434\u043B\u0435\u043D\u043D\u044B\u0439 \u0432\u044B\u0434\u043E\u0445 \xB7 8 \u0441\u0435\u043A\u0443\u043D\u0434", 17, 600, C.D_INK);
    cy += 14;
    txt(f, px, cy + 14, "\u0414\u044B\u0448\u0438\u0442\u0435 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043A\u0440\u0443\u0433\u043E\u043C", 13, 400, C.D_INK2);
    try {
      const o = getOrigin();
      const ring = '<svg width="180" height="180" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="16" stroke="#1F2937" stroke-width="3"/><circle cx="20" cy="20" r="16" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-dasharray="100.5" stroke-dashoffset="30" transform="rotate(-90 20 20)"/><text x="20" y="22.5" text-anchor="middle" font-size="6" font-weight="700" fill="#F8FAFC" font-family="Inter">8</text></svg>';
      const svg = penpot.createShapeFromSvg(ring);
      if (svg) {
        f.appendChild(svg);
        svg.x = o.x + px + Math.round((pw - 180) / 2);
        svg.y = o.y + cy + 20;
        svg.name = "timer-ring";
      }
    } catch (_) {
    }
    cy += 216;
    const play = rect(f, px + pw / 2 - 30, cy, 60, 60, C.ACCENT, 30);
    play.name = "Button / pause-timer";
    ic(f, "pause", px + pw / 2 - 9, cy + 18, 18, "#FFFFFF");
    txt(f, px, cy + 20, "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C", 12, 500, C.D_INK2);
    txt(f, px + pw - 68, cy + 20, "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C", 12, 500, "#60A5FA");
    cy += 80;
    btn(f, px, cy, pw, "\u0414\u0430\u043B\u0435\u0435", "primary", { h: 48 });
  }
  function e42input(f, m) {
    const sh = clientShell(f, m, "\u0448\u0430\u0433 5 \u0438\u0437 6");
    progressDark(f, sh.cardX, sh.y - 40, sh.cardW, 5, 6);
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 40;
    clientCard(f, x, y, w, 360, "E-42 card \xB7 input");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 24;
    txt(f, px, cy, "\u0427\u0442\u043E \u043F\u043E\u043C\u043E\u0433\u043B\u043E \u0432\u0430\u043C \u0443\u0441\u043F\u043E\u043A\u043E\u0438\u0442\u044C\u0441\u044F?", 17, 600, C.D_INK);
    cy += 14;
    txt(f, px, cy + 14, "\u041F\u0430\u0440\u0430 \u0441\u043B\u043E\u0432 \u2014 \u044D\u0442\u043E\u0433\u043E \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E", 13, 400, C.D_INK2);
    cy += 44;
    const ta = rect(f, px, cy, pw, 110, C.D_BG2, 12);
    setStroke(ta, C.ACCENT, 2, "inner");
    ta.name = "Input / textarea / dark / focus";
    txt(f, px + 14, cy + 12, "\u041F\u043E\u043C\u043E\u0433\u043B\u043E \u043F\u043E\u0434\u044B\u0448\u0430\u0442\u044C \u0438 \u0432\u044B\u0439\u0442\u0438 \u043D\u0430 \u0443\u043B\u0438\u0446\u0443\u2026", 14, 400, C.D_INK);
    txt(f, px + 14, cy + 84, "86 / 300", 11, 400, C.D_INK2);
    cy += 130;
    btn(f, px, cy, pw, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "primary", { h: 48 });
  }
  function e43(f, m) {
    const sh = clientShell(f, m, "\u0433\u043E\u0442\u043E\u0432\u043E");
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 60;
    clientCard(f, x, y, w, 400, "E-43 card");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 36;
    ic(f, "circle-check", px + pw / 2 - 28, cy, 56, C.SUCCESS);
    cy += 76;
    const t = txt(f, px, cy, "\u0413\u043E\u0442\u043E\u0432\u043E!", 24, 700, C.D_INK);
    centerTxt(t, px, pw);
    cy += 40;
    const t2 = txt(f, px, cy, "\u0412\u044B \u043F\u0440\u043E\u0448\u043B\u0438 \u0443\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435 \u0434\u043E \u043A\u043E\u043D\u0446\u0430.", 14, 400, C.D_INK2);
    centerTxt(t2, px, pw);
    cy += 24;
    const t3 = txt(f, px, cy, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D \u2014 \u0432\u0430\u0448 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u0443\u0432\u0438\u0434\u0438\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442", 13, 400, C.D_INK2);
    centerTxt(t3, px, pw);
    cy += 22;
    const t4 = txt(f, px, cy, "\u0438 \u0441\u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E \u0438\u0433\u0440\u0443.", 13, 400, C.D_INK2);
    centerTxt(t4, px, pw);
    cy += 44;
    btn(f, px, cy, pw, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0443", "primary", { icon: "send", h: 48 });
    cy += 64;
    const t5 = txt(f, px, cy, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", 14, 500, "#60A5FA");
    centerTxt(t5, px, pw);
  }
  function e44(f, m) {
    const sh = clientShell(f, m, "\u043E\u0448\u0438\u0431\u043A\u0430");
    const x = sh.cardX;
    const w = sh.cardW;
    const y = sh.y + 60;
    clientCard(f, x, y, w, 380, "E-44 card");
    const px = x + 24;
    const pw = w - 48;
    let cy = y + 36;
    ic(f, "alert-octagon", px + pw / 2 - 26, cy, 52, C.WARNING);
    cy += 72;
    const t = txt(f, px, cy, "\u0421\u0441\u044B\u043B\u043A\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442", 19, 700, C.D_INK);
    centerTxt(t, px, pw);
    cy += 36;
    const t2 = txt(f, px, cy, "\u0414\u043E\u0441\u0442\u0443\u043F \u043C\u043E\u0433 \u0438\u0441\u0442\u0435\u0447\u044C, \u0431\u044B\u0442\u044C \u043E\u0442\u043E\u0437\u0432\u0430\u043D", 13, 400, C.D_INK2);
    centerTxt(t2, px, pw);
    cy += 20;
    const t3 = txt(f, px, cy, "\u0438\u043B\u0438 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D. \u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u0435 \u043D\u043E\u0432\u0443\u044E", 13, 400, C.D_INK2);
    centerTxt(t3, px, pw);
    cy += 20;
    const t4 = txt(f, px, cy, "\u0441\u0441\u044B\u043B\u043A\u0443 \u0443 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430.", 13, 400, C.D_INK2);
    centerTxt(t4, px, pw);
    cy += 30;
    const reasons = [["\u0438\u0441\u0442\u0451\u043A", true], ["\u043E\u0442\u043E\u0437\u0432\u0430\u043D", false], ["\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D", false]];
    let cx = px;
    reasons.forEach((r) => {
      const cwd = Math.round(r[0].length * 6.6) + 26;
      const chipEl = rect(f, cx, cy, cwd, 26, r[1] ? "#1E293B" : C.D_BG2, 13);
      setStroke(chipEl, C.D_BD, 1, "inner");
      chipEl.name = "reason-chip";
      txt(f, cx + 11, cy + 5, r[0], 11, r[1] ? 600 : 400, r[1] ? "#FCA5A5" : C.D_INK2);
      cx += cwd + 8;
    });
    cy += 52;
    btn(f, px, cy, pw, "\u041F\u043E\u043D\u044F\u0442\u043D\u043E", "primary", { h: 48 });
    cy += 64;
    const t5 = txt(f, px, cy, "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u043E\u043C", 13, 500, "#60A5FA");
    centerTxt(t5, px, pw);
  }
  var SCREENS3 = [
    { code: "E-30", title: "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0438\u0433\u0440", mobileH: 1420, draw: e30 },
    { code: "E-31", title: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", mobileH: 1240, draw: e31 },
    { code: "E-32", title: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B", mobileH: 1320, draw: e32 },
    { code: "E-33", title: "\u0414\u043E\u0441\u0442\u0443\u043F\u044B", mobileH: 980, draw: e33 },
    { code: "E-40", title: "\u041E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0433\u0440\u044B", mobileH: 760, draw: e40, dark: true },
    { code: "E-41", title: "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435", mobileH: 720, draw: e41, dark: true },
    { code: "E-42", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", mobileH: 780, draw: e42, dark: true },
    { code: "E-42", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \xB7 \u0448\u043A\u0430\u043B\u0430", mobileH: 700, draw: e42scale, dark: true, extraMobileOnly: true },
    { code: "E-42", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \xB7 \u0442\u0430\u0439\u043C\u0435\u0440", mobileH: 760, draw: e42timer, dark: true, extraMobileOnly: true },
    { code: "E-42", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \xB7 \u0432\u0432\u043E\u0434", mobileH: 700, draw: e42input, dark: true, extraMobileOnly: true },
    { code: "E-43", title: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435", mobileH: 720, draw: e43, dark: true },
    { code: "E-44", title: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", mobileH: 740, draw: e44, dark: true }
  ];
  var SCREEN3_FRAME_NAMES = SCREENS3.flatMap((s) => (s.extraMobileOnly ? ["390"] : ["1440", "768", "390"]).map((bp) => s.code + " " + s.title + " / " + bp));
  function buildScreens3(log) {
    F3 = pickFont(FONT_FALLBACKS);
    const SX = 4620 + 2 * (1440 + 240);
    let y = 100;
    for (const s of SCREENS3) {
      const modes = s.extraMobileOnly ? [[MB, "390"]] : [[D, "1440"], [T, "768"], [MB, "390"]];
      for (const mm of modes) {
        const h = mm[0].kind === "mobile" && s.mobileH ? s.mobileH : mm[0].h;
        const mode = { w: mm[0].w, h, kind: mm[0].kind };
        const open = s.dark ? darkFrame : openFrame;
        const f = open(s.code + " " + s.title + " / " + mm[1], SX, y, mode.w, h);
        try {
          s.draw(f, mode);
        } catch (e) {
          log.push("\xD7 " + s.code + " " + s.title + "/" + mm[1] + ": " + e);
        }
      }
      y += 1300;
    }
  }

  // src/screens4.ts
  var W = 390;
  var H = MB.h;
  var TG_H = 56;
  var BTM_H = 80;
  var ZONE_Y = H - BTM_H;
  function centerTxt2(t, x, w) {
    try {
      if (t && typeof t.width === "number" && t.width > 0) t.x = t.x + (w - t.width) / 2;
    } catch (_) {
    }
  }
  function dots(f, x, y) {
    for (let i = 0; i < 3; i++) makeEllipse(f, x + i * 8, y, 4, 4, C.D_INK2);
  }
  function homeIndicator(f) {
    const hi = rect(f, Math.round((W - 134) / 2), 830, 134, 5, "#F8FAFC", 3);
    hi.name = "home-indicator";
    try {
      hi.fills[0].fillOpacity = 0.35;
    } catch (_) {
    }
  }
  function tgHeader(f, title) {
    rect(f, 0, 0, W, TG_H, "#0E1826", 0).name = "tg-header / safe-area 56";
    txt(f, 16, 19, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", 14, 500, "#60A5FA");
    const t = txt(f, 0, 19, title, 15, 600, C.D_INK);
    centerTxt2(t, 0, W);
    dots(f, W - 40, 26);
  }
  function mainBtn(f, label, enabled) {
    rect(f, 0, ZONE_Y, W, BTM_H, C.D_BG, 0).name = "mainbutton-zone / safe-area 80";
    const b = rect(f, 16, 772, W - 32, 48, enabled ? C.ACCENT : "#1E293B", 12);
    b.name = "MainButton / " + (enabled ? "enabled" : "disabled");
    const t = txt(f, 0, 791, label, 15, 600, enabled ? "#FFFFFF" : C.D_INK2);
    centerTxt2(t, 16, W - 32);
    homeIndicator(f);
  }
  var NAV2 = [
    ["home", "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"],
    ["sparkles", "\u0418\u0433\u0440\u044B"],
    ["book-open", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A"],
    ["chart-column", "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"],
    ["user", "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"]
  ];
  function bottomNav2(f, active) {
    rect(f, 0, ZONE_Y, W, BTM_H, C.D_BG2, 0).name = "bottomnav-zone / safe-area 80";
    rect(f, 0, ZONE_Y, W, 1, C.D_BD, 0);
    NAV2.forEach((n, i) => {
      const cx = 39 + i * 78;
      const on = i === active;
      ic(f, n[0], cx - 10, 776, 20, on ? C.ACCENT : C.D_INK2);
      const t = txt(f, 0, 802, n[1], 10, on ? 600 : 400, on ? C.ACCENT : C.D_INK2);
      centerTxt2(t, cx - 34, 68);
    });
    homeIndicator(f);
  }
  function tmaProgress(f, x, y, cur, total) {
    txt(f, x, y, "\u0428\u0410\u0413 " + cur + " \u0418\u0417 " + total, 10, 500, C.D_INK2);
    rect(f, x, y + 18, W - 48, 6, C.D_BD, 3);
    rect(f, x, y + 18, Math.round((W - 48) * cur / total), 6, C.ACCENT, 3).name = "progress-fill";
  }
  function toggle(f, x, y, on) {
    const p = rect(f, x, y, 40, 22, on ? C.ACCENT : "#334155", 11);
    p.name = "switch / " + (on ? "on" : "off");
    makeEllipse(f, x + (on ? 20 : 2), y + 2, 18, 18, "#FFFFFF");
  }
  function card(f, x, y, w, h, name) {
    const c = rect(f, x, y, w, h, C.D_BG2, 14);
    setStroke(c, C.D_BD, 1, "inner");
    c.name = name;
  }
  function e50(f) {
    tgHeader(f, "Platform");
    const lg = rect(f, (W - 64) / 2, 150, 64, 64, C.ACCENT, 16);
    lg.name = "logo-mark";
    ic(f, "brain", (W - 64) / 2 + 16, 166, 32, "#FFFFFF");
    let cy = 244;
    const t1 = txt(f, 0, cy, "\u041F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E \u0441\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u044F", 22, 700, C.D_INK);
    centerTxt2(t1, 0, W);
    cy += 34;
    const t2 = txt(f, 0, cy, "\u0418\u0433\u0440\u044B \u0438 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B", 13, 400, C.D_INK2);
    centerTxt2(t2, 0, W);
    cy += 20;
    const t3 = txt(f, 0, cy, "\u0432\u0430\u0448 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u2014 \u043F\u043E\u0434 \u0432\u0430\u0448\u0443 \u0437\u0430\u0434\u0430\u0447\u0443", 13, 400, C.D_INK2);
    centerTxt2(t3, 0, W);
    cy += 52;
    const feats = [
      ["sparkles", "\u0418\u0433\u0440\u044B \u0438 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438 \u043E\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430"],
      ["lock", "\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C: \u043E\u0442\u0432\u0435\u0442\u044B \u0432\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u043D"],
      ["key-round", "\u0411\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u2014 \u0432\u0445\u043E\u0434 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435"]
    ];
    feats.forEach((ft, i) => {
      const ry = cy + i * 64;
      const row = rect(f, 32, ry, W - 64, 52, C.D_BG2, 12);
      setStroke(row, C.D_BD, 1, "inner");
      row.name = "feature-row";
      ic(f, ft[0], 48, ry + 16, 20, "#60A5FA");
      txt(f, 80, ry + 17, ft[1], 13, 500, C.D_INK);
    });
    mainBtn(f, "\u041D\u0430\u0447\u0430\u0442\u044C", true);
  }
  function e51(f) {
    tgHeader(f, "Platform");
    let cy = 76;
    txt(f, 24, cy, "\u0414\u043E\u0431\u0440\u044B\u0439 \u0432\u0435\u0447\u0435\u0440", 20, 700, C.D_INK);
    txt(f, 24, cy + 27, "\u0421\u0440\u0435\u0434\u0430, 16 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F", 12, 400, C.D_INK2);
    cy += 64;
    const stk = rect(f, 24, cy, W - 48, 44, "#111C2E", 12);
    setStroke(stk, C.D_BD, 1, "inner");
    stk.name = "streak-chip";
    ic(f, "zap", 40, cy + 13, 18, C.WARNING);
    txt(f, 68, cy + 13, "\u0421\u0435\u0440\u0438\u044F 5 \u0434\u043D\u0435\u0439 \u043F\u043E\u0434\u0440\u044F\u0434", 13, 600, C.D_INK);
    txt(f, W - 116, cy + 14, "\u043B\u0443\u0447\u0448\u0430\u044F \u2014 12", 11, 400, C.D_INK2);
    cy += 60;
    card(f, 24, cy, W - 48, 128, "continue-card");
    const tile = rect(f, 40, cy + 16, 44, 44, "#1E293B", 10);
    tile.name = "game-thumb";
    ic(f, "play", 40 + 14, cy + 16 + 13, 18, C.ACCENT);
    txt(f, 98, cy + 18, "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", 15, 600, C.D_INK);
    txt(f, 98, cy + 40, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435 \xB7 \u0448\u0430\u0433 3 \u0438\u0437 6", 11, 400, C.D_INK2);
    rect(f, 40, cy + 84, W - 96, 6, C.D_BD, 3);
    rect(f, 40, cy + 84, Math.round((W - 96) / 2), 6, C.ACCENT, 3).name = "progress-fill";
    txt(f, 98, cy + 100, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", 12, 600, "#60A5FA");
    ic(f, "arrow-right", 168, cy + 100, 14, "#60A5FA");
    cy += 148;
    card(f, 24, cy, W - 48, 108, "mood-checkin");
    txt(f, 40, cy + 16, "\u041A\u0430\u043A \u0432\u044B \u0441\u0435\u0431\u044F \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435?", 14, 600, C.D_INK);
    const faces = [
      ["frown", "\u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E", false],
      ["meh", "\u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E", true],
      ["smile", "\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E", false]
    ];
    faces.forEach((fc, i) => {
      const fx = 52 + i * 106;
      makeEllipse(f, fx, cy + 40, 44, 44, fc[2] ? "#16233B" : "#111C2E");
      if (fc[2]) {
        const ring = makeEllipse(f, fx, cy + 40, 44, 44, "none");
        setStroke(ring, C.ACCENT, 2, "inner");
      }
      ic(f, fc[0], fx + 11, cy + 51, 22, fc[2] ? C.ACCENT : C.D_INK2);
      const t = txt(f, 0, cy + 88, fc[1], 10, fc[2] ? 600 : 400, fc[2] ? C.ACCENT : C.D_INK2);
      centerTxt2(t, fx - 12, 68);
    });
    cy += 128;
    card(f, 24, cy, W - 48, 88, "tip-card");
    ic(f, "heart", 40, cy + 16, 18, C.ERROR);
    txt(f, 66, cy + 17, "\u0421\u043E\u0432\u0435\u0442 \u0434\u043D\u044F", 12, 600, C.D_INK);
    txt(f, 40, cy + 42, "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u043F\u0440\u043E\u0433\u0443\u043B\u043A\u0430 \u0441\u043D\u0438\u0436\u0430\u0435\u0442 \u043D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435", 12, 400, C.D_INK2);
    txt(f, 40, cy + 60, "\u0431\u044B\u0441\u0442\u0440\u0435\u0435, \u0447\u0435\u043C \u0441\u043A\u0440\u043E\u043B\u043B \u043B\u0435\u043D\u0442\u044B.", 12, 400, C.D_INK2);
    bottomNav2(f, 0);
  }
  function e52(f) {
    tgHeader(f, "\u0418\u0433\u0440\u044B");
    let cy = 76;
    txt(f, 24, cy, "\u041C\u043E\u0438 \u0438\u0433\u0440\u044B", 20, 700, C.D_INK);
    txt(f, W - 110, cy + 6, "4 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E", 12, 400, C.D_INK2);
    cy += 44;
    const chips = [["\u0412\u0441\u0435", true], ["\u0414\u044B\u0445\u0430\u043D\u0438\u0435", false], ["\u0414\u043D\u0435\u0432\u043D\u0438\u043A", false], ["\u041C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044F", false]];
    let cx = 24;
    chips.forEach((c) => {
      const cwd = Math.round(c[0].length * 6.8) + 26;
      const chipEl = rect(f, cx, cy, cwd, 30, c[1] ? C.ACCENT : C.D_BG2, 15);
      if (!c[1]) setStroke(chipEl, C.D_BD, 1, "inner");
      chipEl.name = "filter-chip";
      txt(f, cx + 12, cy + 8, c[0], 12, c[1] ? 600 : 500, c[1] ? "#FFFFFF" : C.D_INK2);
      cx += cwd + 8;
    });
    cy += 46;
    const games = [
      ["play", "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8", "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435 \xB7 5 \u043C\u0438\u043D", "3/6", "#93C5FD", true],
      ["book-open", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \xB7 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E", "\u041D\u043E\u0432\u043E\u0435", "#86EFAC", true],
      ["target", "\u0417\u0430\u0437\u0435\u043C\u043B\u0435\u043D\u0438\u0435 5-4-3-2-1", "\u0422\u0435\u0445\u043D\u0438\u043A\u0430 \xB7 3 \u043C\u0438\u043D", "\u041D\u043E\u0432\u0430\u044F", "#FDE68A", true],
      ["timer", "\u0421\u043A\u0440\u0438\u043F\u0442 \u0441\u043D\u0430", "\u041C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044F \xB7 10 \u043C\u0438\u043D", "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430", C.D_INK2, false]
    ];
    games.forEach((g) => {
      card(f, 24, cy, W - 48, 76, "game-row");
      const tile = rect(f, 40, cy + 16, 44, 44, "#1E293B", 10);
      tile.name = "game-thumb";
      ic(f, g[0], 40 + 13, cy + 16 + 13, 18, C.ACCENT);
      txt(f, 98, cy + 16, g[1], 14, 600, C.D_INK);
      txt(f, 98, cy + 38, g[2], 11, 400, C.D_INK2);
      const chw = Math.round(g[3].length * 6.2) + 20;
      const chipEl = rect(f, 24 + 342 - 16 - chw, cy + 28, chw, 22, g[5] ? "#1E293B" : C.D_BG, 11);
      chipEl.name = "game-status";
      const ct = txt(f, 24 + 342 - 16 - chw, cy + 32, g[3], 10, g[5] ? 600 : 400, g[4]);
      cy += 88;
    });
    bottomNav2(f, 1);
  }
  function e53body(f, selected) {
    tgHeader(f, "\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8");
    tmaProgress(f, 24, 72, 3, 6);
    let cy = 116;
    card(f, 24, cy, W - 48, 348, "step-card \xB7 choice");
    txt(f, 40, cy + 22, "\u0427\u0442\u043E \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0432 \u0442\u0435\u043B\u0435 \u0441\u0435\u0439\u0447\u0430\u0441?", 16, 600, C.D_INK);
    cy += 62;
    const opts = [
      ["\u041F\u043B\u0435\u0447\u0438 \u0438 \u0441\u043F\u0438\u043D\u0430 \u043D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u044B", false],
      ["\u0421\u0435\u0440\u0434\u0446\u0435 \u0431\u044C\u0451\u0442\u0441\u044F \u0447\u0430\u0449\u0435", selected],
      ["\u0414\u044B\u0445\u0430\u043D\u0438\u0435 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E\u0435", false],
      ["\u0422\u0435\u043B\u043E \u0440\u0430\u0441\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u043E", false]
    ];
    opts.forEach((o) => {
      const sel = o[1];
      const op = rect(f, 40, cy, W - 96, 52, sel ? "#16233B" : C.D_BG2, 12);
      setStroke(op, sel ? C.ACCENT : C.D_BD, sel ? 2 : 1, "inner");
      op.name = "AnswerOption / choice / " + (sel ? "selected" : "default");
      makeEllipse(f, 56, cy + 17, 18, 18, "none");
      if (sel) {
        const r1 = makeEllipse(f, 56, cy + 17, 18, 18, "none");
        setStroke(r1, C.ACCENT, 2, "inner");
        makeEllipse(f, 61, cy + 22, 8, 8, C.ACCENT);
      } else {
        const r2 = makeEllipse(f, 56, cy + 17, 18, 18, "none");
        setStroke(r2, C.D_BD, 2, "inner");
      }
      txt(f, 86, cy + 16, o[0], 13, sel ? 600 : 400, sel ? C.D_INK : C.D_INK2);
      cy += 64;
    });
    const hint = txt(
      f,
      24,
      cy + 16,
      selected ? "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u2014 \u043C\u043E\u0436\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C" : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
      11,
      400,
      C.D_INK2
    );
    centerTxt2(hint, 24, W - 48);
    mainBtn(f, "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C", selected);
  }
  function e53(f) {
    e53body(f, true);
  }
  function e53b(f) {
    e53body(f, false);
  }
  function e54(f) {
    tgHeader(f, "\u0413\u043E\u0442\u043E\u0432\u043E");
    ic(f, "circle-check", (W - 64) / 2, 112, 64, C.SUCCESS);
    let cy = 196;
    const t1 = txt(f, 0, cy, "\u0421\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430!", 20, 700, C.D_INK);
    centerTxt2(t1, 0, W);
    cy += 30;
    const t2 = txt(f, 0, cy, "\u0412\u044B \u043F\u0440\u043E\u0448\u043B\u0438 \u0432\u0441\u0435 6 \u0448\u0430\u0433\u043E\u0432 \u0443\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u044F", 13, 400, C.D_INK2);
    centerTxt2(t2, 0, W);
    cy += 44;
    const stats = [
      ["clock", "4:32", "\u0432\u0440\u0435\u043C\u044F"],
      ["target", "6/6", "\u0448\u0430\u0433\u0438"],
      ["zap", "+1", "\u0441\u0435\u0440\u0438\u044F"]
    ];
    stats.forEach((st, i) => {
      const sx = 24 + i * 118;
      card(f, sx, cy, 106, 76, "stat-card");
      ic(f, st[0], sx + 16, cy + 14, 18, "#60A5FA");
      txt(f, sx + 16, cy + 36, st[1], 16, 700, C.D_INK);
      txt(f, sx + 16, cy + 58, st[2], 10, 400, C.D_INK2);
    });
    cy += 100;
    card(f, 24, cy, W - 48, 120, "anxiety-delta");
    txt(f, 40, cy + 16, "\u0421\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0430 \u0442\u0440\u0435\u0432\u043E\u0433\u0438 (0\u201310)", 12, 500, C.D_INK2);
    txt(f, 40, cy + 48, "7", 28, 700, C.D_INK2);
    ic(f, "arrow-right", 92, cy + 58, 20, C.D_INK2);
    txt(f, 132, cy + 48, "4", 28, 700, C.ACCENT);
    txt(f, 40, cy + 90, "\u043F\u043E\u0441\u043B\u0435 \u0434\u044B\u0445\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438", 11, 400, C.D_INK2);
    cy += 140;
    const pr = rect(f, 24, cy, W - 48, 64, "#111C2E", 12);
    setStroke(pr, C.D_BD, 1, "inner");
    pr.name = "privacy-note";
    ic(f, "shield-check", 40, cy + 14, 18, C.SUCCESS);
    txt(f, 66, cy + 13, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0443\u0432\u0438\u0434\u0438\u0442", 12, 500, C.D_INK);
    txt(f, 66, cy + 33, "\u0432\u0430\u0448 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u2014 \u0438 \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E \u0438\u0433\u0440\u0443", 11, 400, C.D_INK2);
    mainBtn(f, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0443", true);
  }
  function e55(f) {
    tgHeader(f, "\u0414\u043D\u0435\u0432\u043D\u0438\u043A");
    let cy = 76;
    txt(f, 24, cy, "\u041A\u0430\u043A \u043F\u0440\u043E\u0448\u0451\u043B \u0434\u0435\u043D\u044C?", 18, 600, C.D_INK);
    txt(f, W - 116, cy + 5, "16 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F", 12, 400, C.D_INK2);
    cy += 44;
    card(f, 24, cy, W - 48, 100, "mood-row");
    const faces = [
      ["frown", "\u0442\u044F\u0436\u0435\u043B\u043E", false],
      ["meh", "\u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E", false],
      ["smile", "\u0445\u043E\u0440\u043E\u0448\u043E", true]
    ];
    faces.forEach((fc, i) => {
      const fx = 60 + i * 106;
      makeEllipse(f, fx, cy + 14, 44, 44, fc[2] ? "#16233B" : "#111C2E");
      if (fc[2]) {
        const ring = makeEllipse(f, fx, cy + 14, 44, 44, "none");
        setStroke(ring, C.ACCENT, 2, "inner");
      }
      ic(f, fc[0], fx + 11, cy + 25, 22, fc[2] ? C.ACCENT : C.D_INK2);
      const t = txt(f, 0, cy + 66, fc[1], 10, fc[2] ? 600 : 400, fc[2] ? C.ACCENT : C.D_INK2);
      centerTxt2(t, fx - 12, 68);
    });
    cy += 116;
    card(f, 24, cy, W - 48, 96, "note-input");
    txt(f, 40, cy + 14, "\u0427\u0442\u043E \u043F\u043E\u0432\u043B\u0438\u044F\u043B\u043E \u043D\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435?", 12, 500, C.D_INK2);
    txt(f, 40, cy + 38, "\u041F\u0430\u0440\u0430 \u0441\u043B\u043E\u0432 \u043E \u0434\u043D\u0435 \u2014 \u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E\u2026", 13, 400, "#475569");
    rect(f, 40, cy + 70, W - 96, 1, C.D_BD, 0);
    txt(f, W - 96, cy + 76, "0/300", 10, 400, C.D_INK2);
    cy += 112;
    const tags = [["\u0420\u0430\u0431\u043E\u0442\u0430", true], ["\u0421\u043E\u043D", false], ["\u0421\u043F\u043E\u0440\u0442", false], ["\u041B\u044E\u0434\u0438", false]];
    let tx = 24;
    tags.forEach((tg) => {
      const twd = Math.round(tg[0].length * 6.8) + 24;
      const chipEl = rect(f, tx, cy, twd, 28, tg[1] ? C.ACCENT : C.D_BG2, 14);
      if (!tg[1]) setStroke(chipEl, C.D_BD, 1, "inner");
      chipEl.name = "tag-chip";
      txt(f, tx + 11, cy + 7, tg[0], 11, tg[1] ? 600 : 500, tg[1] ? "#FFFFFF" : C.D_INK2);
      tx += twd + 8;
    });
    cy += 46;
    btn(f, 24, cy, W - 48, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C", "primary", { h: 44 });
    cy += 72;
    txt(f, 24, cy, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438", 13, 600, C.D_INK);
    cy += 26;
    const hist = [
      ["14 \u0441\u0435\u043D", "meh", "\u0420\u043E\u0432\u043D\u044B\u0439 \u0434\u0435\u043D\u044C, \u043C\u043D\u043E\u0433\u043E \u0440\u0430\u0431\u043E\u0442\u044B"],
      ["11 \u0441\u0435\u043D", "smile", "\u041F\u0440\u043E\u0433\u0443\u043B\u043A\u0430 \u0438 \u0437\u0432\u043E\u043D\u043E\u043A \u043F\u043E\u0434\u0440\u0443\u0433\u0435"]
    ];
    hist.forEach((hrow) => {
      card(f, 24, cy, W - 48, 52, "history-row");
      ic(f, hrow[1], 40, cy + 16, 20, C.D_INK2);
      txt(f, 72, cy + 9, hrow[0], 11, 500, C.D_INK2);
      txt(f, 72, cy + 27, hrow[2], 12, 400, C.D_INK);
      cy += 62;
    });
    bottomNav2(f, 2);
  }
  function e56(f) {
    tgHeader(f, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441");
    let cy = 76;
    card(f, 24, cy, W - 48, 84, "streak-card");
    const fl = rect(f, 40, cy + 20, 44, 44, "#1E293B", 12);
    fl.name = "streak-icon";
    ic(f, "zap", 40 + 13, cy + 20 + 13, 18, C.WARNING);
    txt(f, 98, cy + 20, "\u0421\u0435\u0440\u0438\u044F 5 \u0434\u043D\u0435\u0439", 16, 700, C.D_INK);
    txt(f, 98, cy + 44, "\u043B\u0443\u0447\u0448\u0430\u044F \u0441\u0435\u0440\u0438\u044F \u2014 12 \u0434\u043D\u0435\u0439", 11, 400, C.D_INK2);
    cy += 104;
    txt(f, 24, cy, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", 14, 600, C.D_INK);
    cy += 28;
    card(f, 24, cy, W - 48, 150, "week-chart");
    const bars = [
      [40, "\u043F\u043D", false],
      [64, "\u0432\u0442", false],
      [28, "\u0441\u0440", false],
      [80, "\u0447\u0442", true],
      [56, "\u043F\u0442", false],
      [88, "\u0441\u0431", true],
      [48, "\u0432\u0441", false]
    ];
    bars.forEach((b, i) => {
      const bx = 48 + i * 42;
      rect(f, bx, cy + 104 - b[0], 24, b[0], b[2] ? C.ACCENT : "#1E293B", 6).name = "bar";
      const t = txt(f, 0, cy + 112, b[1], 10, b[2] ? 600 : 400, b[2] ? C.ACCENT : C.D_INK2);
      centerTxt2(t, bx - 8, 40);
    });
    cy += 170;
    card(f, 24, cy, W - 48, 156, "activity-list");
    const rows = [
      ["play", "\u0418\u0433\u0440 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E", "12"],
      ["book-open", "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u0432 \u0434\u043D\u0435\u0432\u043D\u0438\u043A\u0435", "8"],
      ["calendar", "\u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F", "\u0441\u0440, 18:00"]
    ];
    rows.forEach((r, i) => {
      const ry = cy + 14 + i * 46;
      ic(f, r[0], 40, ry, 18, "#60A5FA");
      txt(f, 70, ry + 1, r[1], 13, 400, C.D_INK);
      txt(f, W - 116, ry + 1, r[2], 13, 600, C.D_INK);
      if (i < 2) rect(f, 40, ry + 34, W - 96, 1, C.D_BD, 0);
    });
    bottomNav2(f, 3);
  }
  function e57(f) {
    tgHeader(f, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C");
    let cy = 80;
    avatar(f, 24, cy, 64, "\u041A\u0410");
    txt(f, 104, cy + 8, "\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", 18, 700, C.D_INK);
    txt(f, 104, cy + 32, "@client_a \xB7 Telegram", 12, 400, C.D_INK2);
    const vb = rect(f, 104, cy + 52, 168, 24, "#1E293B", 12);
    vb.name = "linked-chip";
    ic(f, "badge-check", 112, cy + 56, 16, C.ACCENT);
    txt(f, 132, cy + 57, "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D \u043A \u0410\u043D\u043D\u0435 \u041A.", 11, 500, "#93C5FD");
    cy += 92;
    txt(f, 24, cy, "\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0418", 11, 500, C.D_INK2);
    cy += 24;
    card(f, 24, cy, W - 48, 156, "settings-list");
    const sets = [
      ["\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u043E \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0435", "\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C \u0432 20:00", true],
      ["\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 Telegram", "\u0442\u0435\u043C\u0430 \u043A\u0430\u043A \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438", true],
      ["\u0417\u0432\u0443\u043A \u0432 \u0438\u0433\u0440\u0430\u0445", "", false]
    ];
    sets.forEach((s, i) => {
      const ry = cy + 12 + i * 48;
      txt(f, 40, ry, s[0], 13, 500, C.D_INK);
      if (s[1]) txt(f, 40, ry + 19, s[1], 10, 400, C.D_INK2);
      toggle(f, W - 76, ry + 6, s[2]);
      if (i < 2) rect(f, 40, ry + 40, W - 96, 1, C.D_BD, 0);
    });
    cy += 176;
    txt(f, 24, cy, "\u041F\u0420\u0418\u0412\u0410\u0422\u041D\u041E\u0421\u0422\u042C", 11, 500, C.D_INK2);
    cy += 24;
    card(f, 24, cy, W - 48, 80, "privacy-card");
    ic(f, "lock", 40, cy + 16, 18, C.SUCCESS);
    txt(f, 66, cy + 15, "\u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u043E\u0442\u0432\u0435\u0442\u044B \u0448\u0438\u0444\u0440\u0443\u044E\u0442\u0441\u044F (E2E)", 12, 600, C.D_INK);
    txt(f, 66, cy + 36, "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u0432\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E, \u0447\u0435\u043C \u0432\u044B \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C", 10, 400, C.D_INK2);
    txt(f, 40, cy + 56, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u2192", 11, 500, "#60A5FA");
    cy += 100;
    card(f, 24, cy, W - 48, 92, "links-list");
    txt(f, 40, cy + 14, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", 13, 400, "#60A5FA");
    ic(f, "chevron-right", W - 56, cy + 12, 16, C.D_INK2);
    rect(f, 40, cy + 40, W - 96, 1, C.D_BD, 0);
    txt(f, 40, cy + 58, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", 13, 400, "#60A5FA");
    ic(f, "external-link", W - 56, cy + 56, 16, C.D_INK2);
    bottomNav2(f, 4);
  }
  var SCREENS4 = [
    { code: "E-50", title: "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433", draw: e50 },
    { code: "E-51", title: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", draw: e51 },
    { code: "E-52", title: "\u0418\u0433\u0440\u044B", draw: e52 },
    { code: "E-53", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", draw: e53 },
    { code: "E-53", title: "\u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \xB7 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E", draw: e53b },
    { code: "E-54", title: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442", draw: e54 },
    { code: "E-55", title: "\u0414\u043D\u0435\u0432\u043D\u0438\u043A", draw: e55 },
    { code: "E-56", title: "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441", draw: e56 },
    { code: "E-57", title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", draw: e57 }
  ];
  var SCREEN4_FRAME_NAMES = SCREENS4.map((s) => s.code + " " + s.title + " / 390");
  function buildScreens4(log) {
    const SX = 7980 + 1440 + 240;
    let y = 100;
    for (const s of SCREENS4) {
      const f = openFrame(s.code + " " + s.title + " / 390", SX, y, W, H);
      try {
        f.fills = [{ fillColor: C.D_BG, fillOpacity: 1 }];
      } catch (_) {
      }
      try {
        s.draw(f);
      } catch (e) {
        log.push("\xD7 " + s.code + " " + s.title + ": " + e);
      }
      y += 950;
    }
  }

  // src/screens5.ts
  var A128 = { w: 1280, h: 800, kind: "desktop" };
  function ralign(t, xRight) {
    try {
      if (t && typeof t.width === "number" && t.width > 0) t.x = xRight - t.width;
    } catch (_) {
    }
  }
  var TINT = {
    g: ["DCFCE7", "#166534"],
    b: ["E0F2FE", "#0C4A6E"],
    y: ["FEF3C7", "#92400E"],
    r: ["FEE2E2", "#991B1B"],
    n: ["F1F5F9", "#475569"],
    v: ["EDE9FE", "#5B21B6"]
  };
  function chipStat(f, x, y, label, kind) {
    const w = Math.round(label.length * 6.4) + 22;
    const c = rect(f, x, y, w, 24, "#" + TINT[kind][0], 12);
    c.name = "status-chip / " + label;
    txt(f, x + 11, y + 5, label, 11, 500, TINT[kind][1]);
    return w;
  }
  function kpi(f, x, y, w, label, value, delta, kind) {
    cardBox(f, x, y, w, 92, "kpi / " + label);
    txt(f, x + 16, y + 14, label, 12, 500, C.INK3);
    txt(f, x + 16, y + 34, value, 22, 700, C.INK);
    chipStat(f, x + 16, y + 60, delta, kind);
  }
  function sideShell(f, m, nav, active, title, role, userName, initials) {
    const sbw = 240;
    const sb = rect(f, 0, 0, sbw, m.h, C.BG2, 0);
    sb.name = "sidebar";
    rect(f, 24, 20, 28, 28, C.ACCENT, 8);
    txt(f, 62, 22, "Platform", 16, 700, C.INK);
    txt(f, 62, 43, role, 10, 600, C.ACCENT);
    nav.forEach((it, i) => {
      const ny = 100 + i * 44;
      const on = i === active;
      if (on) {
        const bg = rect(f, 12, ny - 9, sbw - 24, 40, C.WHITE, 10);
        setStroke(bg, C.BD, 1, "inner");
        bg.name = "nav-active";
      }
      ic(f, it[0], 28, ny, 18, on ? C.ACCENT : C.INK2);
      txt(f, 58, ny + 1, it[1], 13, on ? 600 : 500, on ? C.INK : C.INK2);
    });
    const uy = m.h - 76;
    avatar(f, 24, uy, 36, initials);
    txt(f, 72, uy + 2, userName, 13, 600, C.INK);
    txt(f, 72, uy + 22, role, 11, 400, C.INK3);
    txt(f, 272, 22, title, 16, 700, C.INK);
    avatar(f, m.w - 60, 16, 32, "AD");
    return { cx: 272, cy: 72, cw: m.w - 272 - 32, ch: m.h - 72 - 24 };
  }
  function adminShell(f, m, active, title) {
    return sideShell(f, m, [
      ["home", "\u041E\u0431\u0437\u043E\u0440"],
      ["users", "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438"],
      ["badge-check", "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F"],
      ["book-open", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438"],
      ["file-text", "\u0410\u0443\u0434\u0438\u0442"],
      ["settings", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"]
    ], active, title, "\u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440", "\u0418\u0440\u0438\u043D\u0430 \u0414.", "\u0418\u0414");
  }
  function supShell(f, m, active, title) {
    return sideShell(f, m, [
      ["chart-column", "\u041E\u0431\u0437\u043E\u0440"],
      ["users", "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0440\u0443\u0435\u043C\u044B\u0435"],
      ["message-circle", "\u0420\u0430\u0437\u0431\u043E\u0440\u044B"],
      ["graduation-cap", "\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B"],
      ["file-text", "\u041E\u0442\u0447\u0451\u0442\u044B"]
    ], active, title, "\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440", "\u041C\u0430\u0440\u0438\u044F \u0421.", "\u041C\u0421");
  }
  function auditRow(f, x, y, w, time, actor, action, target) {
    txt(f, x, y + 3, time, 11, 500, C.INK3);
    txt(f, x + 70, y, actor, 12, 600, C.INK);
    txt(f, x + 70, y + 18, action, 12, 400, C.INK2);
    ralign(txt(f, 0, y + 3, target, 11, 400, C.INK3), x + w);
    rect(f, x, y + 40, w, 1, C.BD, 0);
  }
  function lineChartSvg2(w, h, points, color) {
    const min = Math.min(...points) - 8;
    const max = Math.max(...points) + 8;
    const px = (i) => Math.round(14 + i * (w - 28) / (points.length - 1));
    const py = (v) => Math.round(h - 12 - (v - min) * (h - 24) / (max - min));
    const poly = points.map((v, i) => px(i) + "," + py(v)).join(" ");
    const dots2 = points.map((v, i) => '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3.5" fill="' + color + '"/>').join("");
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="' + (h - 12) + '" x2="' + (w - 10) + '" y2="' + (h - 12) + '" stroke="#E2E8F0"/><polyline points="' + poly + '" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/>' + dots2 + "</svg>";
  }
  function supComment(f, x, y, w, tc, author, l1, l2) {
    const h = 108;
    const c = rect(f, x, y, w, h, C.BG2, 12);
    setStroke(c, C.BD, 1, "inner");
    c.name = "SupervisionComment / " + tc;
    avatar(f, x + 14, y + 14, 32, "\u041C\u0421");
    txt(f, x + 58, y + 14, author, 13, 600, C.INK);
    const tcw = Math.round(tc.length * 6.2) + 20;
    const tchip = rect(f, x + w - tcw - 14, y + 14, tcw, 22, "#EDE9FE", 11);
    tchip.name = "timecode-chip";
    txt(f, x + w - tcw - 14 + 10, y + 18, tc, 11, 600, "#5B21B6");
    txt(f, x + 58, y + 40, l1, 12, 400, C.INK2);
    txt(f, x + 58, y + 58, l2, 12, 400, C.INK2);
    txt(f, x + 58, y + 80, "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \xB7 \u0420\u0435\u0448\u0438\u0442\u044C", 11, 500, C.ACCENT);
    return h + 12;
  }
  function e60(f, m) {
    const box = adminShell(f, m, 0, "\u041E\u0431\u0437\u043E\u0440 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B");
    let y = box.cy;
    const W2 = box.cw;
    const kw = Math.round((W2 - 72) / 4);
    kpi(f, box.cx, y, kw, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438", "12 480", "+8 %", "g");
    kpi(f, box.cx + (kw + 24), y, kw, "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438", "1 240", "+24 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446", "g");
    kpi(f, box.cx + 2 * (kw + 24), y, kw, "\u0421\u0435\u0441\u0441\u0438\u0438 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", "3 120", "+12 %", "g");
    kpi(f, box.cx + 3 * (kw + 24), y, kw, "\u0416\u0430\u043B\u043E\u0431\u044B", "2", "\u22123", "y");
    y += 116;
    const chH = 264;
    const mainW = Math.round(W2 * 0.62);
    cardBox(f, box.cx, y, mainW, chH, "card/chart");
    txt(f, box.cx + 20, y + 16, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C, 12 \u043D\u0435\u0434\u0435\u043B\u044C", 14, 600, C.INK);
    chipStat(f, box.cx + mainW - 76, y + 14, "\u043D\u0435\u0434\u0435\u043B\u044F", "n");
    try {
      const svg = penpot.createShapeFromSvg(lineChartSvg2(
        mainW - 40,
        170,
        [820, 910, 880, 1040, 1120, 1090, 1260, 1380, 1340, 1520, 1660, 1580],
        C.ACCENT
      ));
      if (svg) {
        f.appendChild(svg);
        svg.x = box.cx + 20;
        svg.y = y + 52;
        svg.name = "line-chart";
      }
    } catch (_) {
    }
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y, rw, chH, "card/system");
    txt(f, rx + 20, y + 16, "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B", 14, 600, C.INK);
    const sys = [["API", "99,98 %"], ["\u0411\u0414", "\u043D\u043E\u0440\u043C\u0430"], ["\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043F\u0438\u0441\u0435\u043C", "\u043D\u043E\u0440\u043C\u0430"], ["Telegram-\u0431\u043E\u0442", "\u043D\u043E\u0440\u043C\u0430"]];
    sys.forEach((s, i) => {
      const sy = y + 48 + i * 32;
      makeEllipse(f, rx + 20, sy + 4, 8, 8, C.SUCCESS);
      txt(f, rx + 38, sy, s[0], 13, 500, C.INK);
      ralign(txt(f, 0, sy, s[1], 12, 400, C.INK3), rx + rw - 20);
    });
    txt(f, rx + 20, y + 186, "\u0411\u044D\u043A\u0430\u043F: \u0441\u0435\u0433\u043E\u0434\u043D\u044F 03:00 \xB7 OK", 11, 400, C.INK3);
    y += chH + 20;
    cardBox(f, box.cx, y, W2, 296, "card/recent-audit");
    txt(f, box.cx + 20, y + 16, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F", 14, 600, C.INK);
    const evs = [
      ["12:04", "\u0418\u0440\u0438\u043D\u0430 \u0414. (\u0430\u0434\u043C\u0438\u043D)", "\u041E\u0434\u043E\u0431\u0440\u0438\u043B\u0430 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430", "\u041E\u043B\u044C\u0433\u0430 \u0412."],
      ["11:37", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0414\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u0442\u0451\u043A \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0412."],
      ["10:52", "\u041C\u0430\u0440\u0438\u044F \u0421. (\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440)", "\u041E\u0441\u0442\u0430\u0432\u0438\u043B\u0430 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0440\u0430\u0437\u0431\u043E\u0440\u0443", "\u0421\u0435\u0441\u0441\u0438\u044F #812"],
      ["09:15", "\u0410\u043D\u043D\u0430 \u041A. (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433)", "\u0412\u044B\u0434\u0430\u043B\u0430 \u0438\u0433\u0440\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443", "A7X9-Q2"]
    ];
    evs.forEach((e, i) => auditRow(f, box.cx + 20, y + 48 + i * 56, W2 - 40, e[0], e[1], e[2], e[3]));
  }
  function e61(f, m) {
    const box = adminShell(f, m, 1, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438");
    let y = box.cy;
    const W2 = box.cw;
    const sf = rect(f, box.cx, y - 6, 320, 40, C.WHITE, 8);
    setStroke(sf, C.BD, 1, "inner");
    sf.name = "Input / search";
    ic(f, "search", box.cx + 12, y + 4, 16, C.INK3);
    txt(f, box.cx + 36, y + 2, "\u0418\u043C\u044F \u0438\u043B\u0438 email\u2026", 13, 400, C.INK3);
    const roles = [["\u0412\u0441\u0435", true], ["\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438", false], ["\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B", false], ["\u041A\u043B\u0438\u0435\u043D\u0442\u044B", false], ["\u0410\u0434\u043C\u0438\u043D\u044B", false]];
    let cx = box.cx + 344;
    roles.forEach((r) => {
      const cwd = Math.round(r[0].length * 6.8) + 26;
      const chipEl = rect(f, cx, y - 1, cwd, 30, r[1] ? C.ACCENT : C.WHITE, 15);
      if (!r[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "filter-chip";
      txt(f, cx + 12, y + 6, r[0], 12, r[1] ? 600 : 500, r[1] ? "#FFFFFF" : C.INK2);
      cx += cwd + 8;
    });
    btn(f, box.cx + W2 - 130, y - 6, 130, "\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C", "primary", { icon: "plus", h: 40 });
    y += 58;
    const rows = [
      ["\u0410\u043D\u043D\u0430 \u041A.", "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", "badge", "anna@psy.ru", "312 \u0441\u0435\u0441\u0441\u0438\u0439", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u041C\u0430\u0440\u0438\u044F \u0421.", "\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440", "badge", "maria@psy.ru", "148 \u0440\u0430\u0437\u0431\u043E\u0440\u043E\u0432", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u041E\u043B\u044C\u0433\u0430 \u0412.", "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", "wait", "olga@psy.ru", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u041F\u0451\u0442\u0440 \u0421.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442", "none", "petya@uni.ru", "24 \u0441\u0435\u0441\u0441\u0438\u0438", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0410", "\u043A\u043B\u0438\u0435\u043D\u0442", "none", "\u2014", "5 \u0438\u0433\u0440", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u0414\u0435\u043D\u0438\u0441 \u041C.", "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", "badge", "denis@psy.ru", "201 \u0441\u0435\u0441\u0441\u0438\u044F", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"],
      ["\u041A\u043B\u0438\u0435\u043D\u0442 \u0413", "\u043A\u043B\u0438\u0435\u043D\u0442", "none", "\u2014", "\u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u0432", "\u0431\u043B\u043E\u043A"],
      ["\u041D\u0438\u043D\u0430 \u0422.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442", "none", "nina@uni.ru", "12 \u0441\u0435\u0441\u0441\u0438\u0439", "\u0430\u043A\u0442\u0438\u0432\u043D\u0430"]
    ];
    const rowH = 54;
    const tableH = 52 + rows.length * rowH + 8;
    cardBox(f, box.cx, y, W2, tableH, "card/users-table");
    const hy = y + 16;
    txt(f, box.cx + 20, hy, "\u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u042C", 11, 500, C.INK3);
    txt(f, box.cx + 220, hy, "\u0420\u041E\u041B\u042C", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.5), hy, "\u0410\u041A\u0422\u0418\u0412\u041D\u041E\u0421\u0422\u042C", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.72), hy, "\u0421\u0422\u0410\u0422\u0423\u0421", 11, 500, C.INK3);
    ralign(txt(f, 0, hy, "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F", 11, 500, C.INK3), box.cx + W2 - 20);
    rows.forEach((r, i) => {
      const ry = y + 46 + i * rowH;
      avatar(f, box.cx + 20, ry + 4, 32, r[0].slice(0, 2).toUpperCase());
      txt(f, box.cx + 62, ry + 4, r[0], 13, 600, C.INK);
      txt(f, box.cx + 62, ry + 22, r[3], 11, 400, C.INK3);
      if (r[2] === "badge") {
        ic(f, "badge-check", box.cx + 220, ry + 2, 16, C.ACCENT);
        txt(f, box.cx + 242, ry + 4, r[1], 12, 500, C.INK);
      } else if (r[2] === "wait") {
        ic(f, "clock", box.cx + 220, ry + 2, 16, C.WARNING);
        txt(f, box.cx + 242, ry + 4, r[1], 12, 500, C.INK);
      } else {
        txt(f, box.cx + 220, ry + 4, r[1], 12, 500, C.INK2);
      }
      txt(f, box.cx + Math.round(W2 * 0.5), ry + 8, r[4], 12, 400, C.INK2);
      if (r[5] === "\u0430\u043A\u0442\u0438\u0432\u043D\u0430") chipStat(f, box.cx + Math.round(W2 * 0.72), ry + 4, "\u0430\u043A\u0442\u0438\u0432\u043D\u0430", "g");
      else chipStat(f, box.cx + Math.round(W2 * 0.72), ry + 4, "\u0437\u0430\u0431\u043B\u043E\u043A.", "r");
      ic(f, "settings", box.cx + W2 - 44, ry + 6, 18, C.INK3);
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 6, W2 - 40, 1, C.BD, 0);
    });
  }
  function e62(f, m) {
    const box = adminShell(f, m, 1, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \xB7 \u041E\u043B\u044C\u0433\u0430 \u0412.");
    let y = box.cy;
    const W2 = box.cw;
    const mainW = Math.round(W2 * 0.58);
    cardBox(f, box.cx, y, mainW, 288, "card/profile");
    avatar(f, box.cx + 24, y + 24, 64, "\u041E\u0412");
    txt(f, box.cx + 104, y + 26, "\u041E\u043B\u044C\u0433\u0430 \u0412.", 20, 700, C.INK);
    ic(f, "clock", box.cx + 104, y + 56, 16, C.WARNING);
    txt(f, box.cx + 126, y + 57, "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \xB7 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", 12, 500, C.INK2);
    const facts = [
      ["Email", "olga@psy.ru"],
      ["Telegram", "@olga_psy"],
      ["\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", "02.09.2026"],
      ["\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0432\u0445\u043E\u0434", "\u0441\u0435\u0433\u043E\u0434\u043D\u044F, 09:41"],
      ["2FA", "\u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430"],
      ["\u0421\u0435\u0441\u0441\u0438\u0439", "0 (\u043D\u043E\u0432\u0430\u044F)"]
    ];
    facts.forEach((fc, i) => {
      const fx = box.cx + 24 + i % 2 * Math.round((mainW - 48) / 2);
      const fy = y + 108 + Math.floor(i / 2) * 56;
      txt(f, fx, fy, fc[0].toUpperCase(), 10, 500, C.INK3);
      txt(f, fx, fy + 18, fc[1], 13, 600, C.INK);
    });
    y += 312;
    cardBox(f, box.cx, y, mainW, 268, "card/verification-docs");
    txt(f, box.cx + 20, y + 16, "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438", 14, 600, C.INK);
    const docs = [["\u0414\u0438\u043F\u043B\u043E\u043C.pdf", "2,4 \u041C\u0411"], ["\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u041A\u041F\u0422.pdf", "1,1 \u041C\u0411"], ["\u0421\u043A\u0430\u043D \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430.pdf", "860 \u041A\u0411"]];
    docs.forEach((d, i) => {
      const dy = y + 48 + i * 52;
      const dr = rect(f, box.cx + 20, dy, mainW - 40, 44, C.BG2, 10);
      dr.name = "doc-row";
      ic(f, "file-text", box.cx + 34, dy + 13, 18, C.ACCENT);
      txt(f, box.cx + 62, dy + 6, d[0], 13, 500, C.INK);
      txt(f, box.cx + 62, dy + 24, d[1], 10, 400, C.INK3);
      ralign(txt(f, 0, dy + 13, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u2192", 12, 500, C.ACCENT), box.cx + mainW - 36);
    });
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y - 312, rw, 188, "card/activity");
    txt(f, rx + 20, y - 296, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C", 14, 600, C.INK);
    auditRow(f, rx + 20, y - 264, rw - 40, "09:41", "\u041E\u043B\u044C\u0433\u0430 \u0412.", "\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443", "87.229.\u2026");
    auditRow(f, rx + 20, y - 208, rw - 40, "\u0432\u0447\u0435\u0440\u0430", "\u041E\u043B\u044C\u0433\u0430 \u0412.", "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E", "3 \u0444\u0430\u0439\u043B\u0430");
    auditRow(f, rx + 20, y - 152, rw - 40, "02.09", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043F\u043E \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044E", "\u2014");
    cardBox(f, rx, y, rw, 268, "card/danger");
    txt(f, rx + 20, y + 16, "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430", 14, 600, C.INK);
    txt(f, rx + 20, y + 40, "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0440\u0435\u0448\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0435 E-64.", 11, 400, C.INK3);
    btn(f, rx + 20, y + 64, rw - 40, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E", "secondary", { h: 40 });
    btn(f, rx + 20, y + 116, rw - 40, "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C", "ghost", { h: 40 });
    const db = rect(f, rx + 20, y + 164, rw - 40, 40, C.WHITE, 20);
    setStroke(db, "#FECACA", 1, "inner");
    db.name = "Button / danger";
    txt(f, rx + 20, y + 175, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442", 14, 600, C.ERROR);
    try {
      if (typeof db.characters !== "string") {
        const t = txt(f, 0, y + 175, "", 1, 400, C.INK);
        ralign(t, rx + 20 + (rw - 40) / 2);
      }
    } catch (_) {
    }
  }
  function e63(f, m) {
    const box = adminShell(f, m, 2, "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u043E\u0432");
    let y = box.cy;
    const W2 = box.cw;
    const bn = rect(f, box.cx, y, W2, 48, "#EFF6FF", 10);
    bn.name = "info-banner";
    ic(f, "info", box.cx + 14, y + 15, 18, C.ACCENT);
    txt(f, box.cx + 42, y + 15, "5 \u0437\u0430\u044F\u0432\u043E\u043A \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \xB7 SLA \u043E\u0442\u0432\u0435\u0442\u0430 \u2014 48 \u0447\u0430\u0441\u043E\u0432 \xB7 \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0445 \u043D\u0435\u0442", 13, 500, "#1D4ED8");
    y += 68;
    const rows = [
      ["\u041E\u043B\u044C\u0433\u0430 \u0412.", "\u0441\u0435\u0433\u043E\u0434\u043D\u044F, 10:12", "3 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430", "\u043D\u043E\u0432\u0430\u044F"],
      ["\u0418\u0433\u043E\u0440\u044C \u041B.", "\u0441\u0435\u0433\u043E\u0434\u043D\u044F, 08:47", "3 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"],
      ["\u0421\u0432\u0435\u0442\u043B\u0430\u043D\u0430 \u0420.", "\u0432\u0447\u0435\u0440\u0430, 19:30", "2 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"],
      ["\u041C\u0430\u043A\u0441\u0438\u043C \u0414.", "\u0432\u0447\u0435\u0440\u0430, 14:05", "3 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"],
      ["\u0415\u043B\u0435\u043D\u0430 \u041F.", "2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", "1 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442", "\u0434\u043E\u0441\u043E\u0431\u0440\u0430\u0442\u044C"]
    ];
    const rowH = 72;
    const tableH = 56 + rows.length * rowH + 8;
    cardBox(f, box.cx, y, W2, tableH, "card/verification-queue");
    const hy = y + 18;
    txt(f, box.cx + 20, hy, "\u0417\u0410\u042F\u0412\u0418\u0422\u0415\u041B\u042C", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.32), hy, "\u041F\u041E\u0414\u0410\u041D\u0410", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.52), hy, "\u0414\u041E\u041A\u0423\u041C\u0415\u041D\u0422\u042B", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.7), hy, "\u0421\u0422\u0410\u0422\u0423\u0421", 11, 500, C.INK3);
    ralign(txt(f, 0, hy, "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F", 11, 500, C.INK3), box.cx + W2 - 20);
    rows.forEach((r, i) => {
      const ry = y + 50 + i * rowH;
      avatar(f, box.cx + 20, ry + 6, 36, r[0].slice(0, 2).toUpperCase());
      txt(f, box.cx + 68, ry + 8, r[0], 14, 600, C.INK);
      txt(f, box.cx + 68, ry + 28, "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \xB7 1 \u0437\u0430\u044F\u0432\u043A\u0430", 11, 400, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.32), ry + 16, r[1], 13, 400, C.INK2);
      txt(f, box.cx + Math.round(W2 * 0.52), ry + 16, r[2], 13, 400, C.INK2);
      chipStat(
        f,
        box.cx + Math.round(W2 * 0.7),
        ry + 12,
        r[3] === "\u043D\u043E\u0432\u0430\u044F" ? "\u043D\u043E\u0432\u0430\u044F" : r[3] === "\u0434\u043E\u0441\u043E\u0431\u0440\u0430\u0442\u044C" ? "\u0434\u043E\u0441\u043E\u0431\u0440\u0430\u0442\u044C" : "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435",
        r[3] === "\u043D\u043E\u0432\u0430\u044F" ? "b" : r[3] === "\u0434\u043E\u0441\u043E\u0431\u0440\u0430\u0442\u044C" ? "y" : "n"
      );
      btn(f, box.cx + W2 - 160, ry + 12, 140, "\u0420\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C", "secondary", { h: 36, fs: 13 });
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 8, W2 - 40, 1, C.BD, 0);
    });
  }
  function e64(f, m) {
    const box = adminShell(f, m, 2, "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u041E\u043B\u044C\u0433\u0430 \u0412.");
    let y = box.cy;
    const W2 = box.cw;
    const mainW = Math.round(W2 * 0.6);
    cardBox(f, box.cx, y, mainW, 300, "card/applicant");
    avatar(f, box.cx + 24, y + 24, 56, "\u041E\u0412");
    txt(f, box.cx + 96, y + 26, "\u041E\u043B\u044C\u0433\u0430 \u0412.", 18, 700, C.INK);
    txt(f, box.cx + 96, y + 52, "olga@psy.ru \xB7 @olga_psy", 12, 400, C.INK3);
    chipStat(f, box.cx + 96, y + 72, "\u0437\u0430\u044F\u0432\u043A\u0430 \u043F\u043E\u0434\u0430\u043D\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F", "b");
    txt(f, box.cx + 24, y + 108, "\u041E\u0411\u0420\u0410\u0417\u041E\u0412\u0410\u041D\u0418\u0415", 10, 500, C.INK3);
    txt(f, box.cx + 24, y + 126, "\u041C\u0413\u0423, \u043A\u043B\u0438\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044F (2019)", 13, 600, C.INK);
    txt(f, box.cx + 24, y + 150, "\u041A\u041F\u0422-\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F, 480 \u0447\u0430\u0441\u043E\u0432 (2023)", 13, 400, C.INK2);
    txt(f, box.cx + 24, y + 186, "\u041E\u041F\u042B\u0422", 10, 500, C.INK3);
    txt(f, box.cx + 24, y + 204, "\u0427\u0430\u0441\u0442\u043D\u0430\u044F \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430, 3 \u0433\u043E\u0434\u0430 \xB7 \u043E\u0447\u043D\u043E \u0438 \u043E\u043D\u043B\u0430\u0439\u043D", 13, 400, C.INK2);
    const docs = [["\u0414\u0438\u043F\u043B\u043E\u043C.pdf", "2,4 \u041C\u0411"], ["\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u041A\u041F\u0422.pdf", "1,1 \u041C\u0411"], ["\u0421\u043A\u0430\u043D \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430.pdf", "860 \u041A\u0411"]];
    docs.forEach((d, i) => {
      const dy = y + 48 + i * 52;
      const dr = rect(f, box.cx + 20, dy, mainW - 40, 44, C.BG2, 10);
      dr.name = "doc-row";
      ic(f, "file-text", box.cx + 34, dy + 13, 18, C.ACCENT);
      txt(f, box.cx + 62, dy + 6, d[0], 13, 500, C.INK);
      txt(f, box.cx + 62, dy + 24, d[1], 10, 400, C.INK3);
      ralign(txt(f, 0, dy + 13, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u2192", 12, 500, C.ACCENT), box.cx + mainW - 36);
    });
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y, rw, 264, "card/checklist");
    txt(f, rx + 20, y + 16, "\u0427\u0435\u043A-\u043B\u0438\u0441\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438", 14, 600, C.INK);
    const checks = [
      ["\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0447\u0438\u0442\u0430\u0435\u043C\u044B \u0438 \u043F\u043E\u043B\u043D\u044B", true],
      ["\u0414\u0430\u043D\u043D\u044B\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442 \u0441 \u043F\u0440\u043E\u0444\u0438\u043B\u0435\u043C", true],
      ["\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E", false],
      ["\u041D\u0435\u0442 \u0434\u0443\u0431\u043B\u0435\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430", true]
    ];
    checks.forEach((ck, i) => {
      const cy2 = y + 48 + i * 40;
      const cb = rect(f, rx + 20, cy2, 20, 20, ck[1] ? C.ACCENT : C.WHITE, 6);
      cb.name = "checkbox / " + (ck[1] ? "checked" : "unchecked");
      setStroke(cb, ck[1] ? C.ACCENT : C.BD, 1, "inner");
      if (ck[1]) ic(f, "check", rx + 24, cy2 + 3, 13, "#FFFFFF");
      txt(f, rx + 52, cy2 + 1, ck[0], 13, 400, C.INK2);
    });
    const cm = rect(f, rx + 20, y + 212, rw - 40, 1, C.BD, 0);
    cardBox(f, rx, y + 288, rw, 208, "card/decision");
    txt(f, rx + 20, y + 304, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0440\u0435\u0448\u0435\u043D\u0438\u044E", 14, 600, C.INK);
    const ta = rect(f, rx + 20, y + 328, rw - 40, 64, C.WHITE, 8);
    setStroke(ta, C.BD, 1, "inner");
    ta.name = "Input / textarea";
    txt(f, rx + 32, y + 340, "\u0414\u0438\u043F\u043B\u043E\u043C \u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435\u2026", 12, 400, C.INK3);
    btn(f, rx + 20, y + 408, Math.round((rw - 52) / 2), "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C", "ghost", { h: 44 });
    btn(f, rx + 32 + Math.round((rw - 52) / 2), y + 408, Math.round((rw - 52) / 2), "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C", "primary", { icon: "badge-check", h: 44 });
  }
  function e65(f, m) {
    const box = adminShell(f, m, 3, "\u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432");
    let y = box.cy;
    const W2 = box.cw;
    const tabs = [["\u0412\u0441\u0435", false], ["\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", true], ["\u0421 \u0436\u0430\u043B\u043E\u0431\u0430\u043C\u0438", false], ["\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435", false]];
    let tx = box.cx;
    tabs.forEach((t) => {
      const twd = Math.round(t[0].length * 6.8) + 28;
      const chipEl = rect(f, tx, y, twd, 32, t[1] ? C.ACCENT : C.WHITE, 16);
      if (!t[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "tab-pill";
      txt(f, tx + 14, y + 8, t[0], 13, t[1] ? 600 : 500, t[1] ? "#FFFFFF" : C.INK2);
      tx += twd + 10;
    });
    y += 56;
    const rows = [
      ["\u0422\u0440\u0435\u0432\u043E\u0433\u0430 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u043E\u043C", "\u0410\u043D\u043D\u0430 \u041A.", "\u0436\u0430\u043B\u043E\u0431\u0430", "1", "\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C"],
      ["\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u0441 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u043C", "\u0414\u0435\u043D\u0438\u0441 \u041C.", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", "\u2014", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C"],
      ["\u041F\u0440\u043E\u0449\u0430\u043D\u0438\u0435 \u0441 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u043C", "\u041E\u043B\u044C\u0433\u0430 \u0412.", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", "\u2014", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C"],
      ["\u0421\u0438\u043D\u0434\u0440\u043E\u043C \u0441\u0430\u043C\u043E\u0437\u0432\u0430\u043D\u0446\u0430", "\u0410\u043D\u043D\u0430 \u041A.", "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", "\u2014", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C"],
      ["\u0412\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435 \u043C\u0430\u043C\u044B", "\u041C\u0430\u0440\u0438\u044F \u0421.", "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", "\u2014", "\u043E\u0442\u043A\u0440\u044B\u0442\u044C"],
      ["\u041F\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0430\u0442\u0430\u043A\u0438", "\u0414\u0435\u043D\u0438\u0441 \u041C.", "\u0441\u043A\u0440\u044B\u0442", "1", "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"]
    ];
    const rowH = 60;
    const tableH = 56 + rows.length * rowH + 8;
    cardBox(f, box.cx, y, W2, tableH, "card/moderation-table");
    const hy = y + 18;
    txt(f, box.cx + 20, hy, "\u0421\u0426\u0415\u041D\u0410\u0420\u0418\u0419", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.44), hy, "\u0410\u0412\u0422\u041E\u0420", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.6), hy, "\u0421\u0422\u0410\u0422\u0423\u0421", 11, 500, C.INK3);
    txt(f, box.cx + Math.round(W2 * 0.76), hy, "\u0416\u0410\u041B\u041E\u0411\u042B", 11, 500, C.INK3);
    ralign(txt(f, 0, hy, "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F", 11, 500, C.INK3), box.cx + W2 - 20);
    rows.forEach((r, i) => {
      const ry = y + 52 + i * rowH;
      txt(f, box.cx + 20, ry + 8, r[0], 14, 600, C.INK);
      txt(f, box.cx + 20, ry + 28, "\u0438\u0437\u043C\u0435\u043D\u0451\u043D 2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", 10, 400, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.44), ry + 16, r[1], 13, 400, C.INK2);
      chipStat(
        f,
        box.cx + Math.round(W2 * 0.6),
        ry + 10,
        r[2],
        r[2] === "\u0436\u0430\u043B\u043E\u0431\u0430" ? "r" : r[2] === "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435" ? "y" : r[2] === "\u0441\u043A\u0440\u044B\u0442" ? "n" : "g"
      );
      txt(f, box.cx + Math.round(W2 * 0.76), ry + 16, r[3], 13, 500, C.INK);
      ralign(txt(f, 0, ry + 14, r[4] + " \u2192", 13, 500, C.ACCENT), box.cx + W2 - 20);
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 8, W2 - 40, 1, C.BD, 0);
    });
  }
  function e66(f, m) {
    const box = adminShell(f, m, 4, "\u0410\u0443\u0434\u0438\u0442-\u043B\u043E\u0433");
    let y = box.cy;
    const W2 = box.cw;
    const kinds = [["\u0412\u0441\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F", true], ["\u0412\u0445\u043E\u0434\u044B", false], ["\u0414\u043E\u0441\u0442\u0443\u043F\u044B", false], ["\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", false], ["\u0414\u0430\u043D\u043D\u044B\u0435", false]];
    let kx = box.cx;
    kinds.forEach((k) => {
      const kwd = Math.round(k[0].length * 6.8) + 26;
      const chipEl = rect(f, kx, y, kwd, 30, k[1] ? C.ACCENT : C.WHITE, 15);
      if (!k[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "filter-chip";
      txt(f, kx + 12, y + 6, k[0], 12, k[1] ? 600 : 500, k[1] ? "#FFFFFF" : C.INK2);
      kx += kwd + 8;
    });
    const per = rect(f, box.cx + W2 - 180, y - 2, 180, 34, C.WHITE, 8);
    setStroke(per, C.BD, 1, "inner");
    per.name = "Input / period";
    ic(f, "calendar", box.cx + W2 - 168, y + 7, 16, C.INK3);
    txt(f, box.cx + W2 - 144, y + 6, "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \xB7 00:00\u201323:59", 12, 400, C.INK2);
    y += 54;
    const evs = [
      ["12:04", "\u0418\u0440\u0438\u043D\u0430 \u0414. (\u0430\u0434\u043C\u0438\u043D)", "\u041E\u0434\u043E\u0431\u0440\u0438\u043B\u0430 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430", "\u041E\u043B\u044C\u0433\u0430 \u0412."],
      ["11:58", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0420\u043E\u0442\u0430\u0446\u0438\u044F \u043A\u043B\u044E\u0447\u0435\u0439 \u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u0438\u044F", "\u2014"],
      ["11:37", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0414\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u0442\u0451\u043A \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438", "\u041A\u043B\u0438\u0435\u043D\u0442 \u0412."],
      ["11:02", "\u0410\u043D\u043D\u0430 \u041A. (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433)", "\u0421\u043E\u0437\u0434\u0430\u043B\u0430 ClientAccess", "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u044D\u043C\u043E\u0446\u0438\u0439"],
      ["10:52", "\u041C\u0430\u0440\u0438\u044F \u0421. (\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440)", "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0440\u0430\u0437\u0431\u043E\u0440\u0443", "\u0421\u0435\u0441\u0441\u0438\u044F #812"],
      ["10:15", "\u041F\u0451\u0442\u0440 \u0421. (\u0441\u0442\u0443\u0434\u0435\u043D\u0442)", "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u0441\u0435\u0441\u0441\u0438\u0438", "\u0421\u0435\u0441\u0441\u0438\u044F #790"],
      ["09:41", "\u041E\u043B\u044C\u0433\u0430 \u0412. (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433)", "\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \xB7 2FA", "87.229.\u2026"],
      ["09:15", "\u0410\u043D\u043D\u0430 \u041A. (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433)", "\u0412\u044B\u0434\u0430\u043B\u0430 \u0438\u0433\u0440\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443", "A7X9-Q2"],
      ["08:47", "\u0418\u0433\u043E\u0440\u044C \u041B. (\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433)", "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E", "3 \u0444\u0430\u0439\u043B\u0430"],
      ["03:00", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u041D\u043E\u0447\u043D\u043E\u0439 \u0431\u044D\u043A\u0430\u043F \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D", "OK \xB7 12 \u0413\u0411"]
    ];
    const tableH = 48 + evs.length * 56 + 8;
    cardBox(f, box.cx, y, W2, tableH, "card/audit-log");
    evs.forEach((e, i) => auditRow(f, box.cx + 20, y + 20 + i * 56, W2 - 40, e[0], e[1], e[2], e[3]));
    const t = txt(f, box.cx, y + tableH + 14, "\u0416\u0443\u0440\u043D\u0430\u043B \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F 3 \u0433\u043E\u0434\u0430 (152-\u0424\u0417); \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u2014 \u0431\u0435\u0437 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F.", 12, 400, C.INK3);
  }
  function e67(f, m) {
    const box = adminShell(f, m, 5, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B");
    let y = box.cy;
    const W2 = box.cw;
    const colW = Math.round((W2 - 48) / 3);
    cardBox(f, box.cx, y, colW, 356, "card/limits");
    txt(f, box.cx + 20, y + 16, "\u041B\u0438\u043C\u0438\u0442\u044B", 14, 600, C.INK);
    const lims = [["\u0421\u0435\u0441\u0441\u0438\u0439 \u0432 \u0434\u0435\u043D\u044C (\u0441\u0442\u0443\u0434\u0435\u043D\u0442)", "10"], ["\u0418\u0433\u0440 \u043D\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430", "\u221E"], ["\u0420\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430", "25 \u041C\u0411"], ["\u0414\u043D\u0435\u0439 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u043E\u0432", "30"]];
    lims.forEach((l, i) => {
      const ly = y + 52 + i * 58;
      txt(f, box.cx + 20, ly, l[0], 12, 500, C.INK2);
      const inp = rect(f, box.cx + 20, ly + 20, colW - 40, 34, C.WHITE, 8);
      setStroke(inp, C.BD, 1, "inner");
      inp.name = "Input / number";
      txt(f, box.cx + 32, ly + 28, l[1], 13, 600, C.INK);
    });
    const tX = box.cx + colW + 24;
    cardBox(f, tX, y, colW, 356, "card/telegram");
    txt(f, tX + 20, y + 16, "Telegram-\u0431\u043E\u0442", 14, 600, C.INK);
    txt(f, tX + 20, y + 44, "BOT TOKEN", 10, 500, C.INK3);
    const tk = rect(f, tX + 20, y + 60, colW - 40, 34, C.WHITE, 8);
    setStroke(tk, C.BD, 1, "inner");
    tk.name = "Input / password";
    txt(f, tX + 32, y + 68, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022:AAH\u2026", 13, 400, C.INK2);
    txt(f, tX + 20, y + 110, "WEBHOOK", 10, 500, C.INK3);
    const wh = rect(f, tX + 20, y + 126, colW - 40, 34, C.WHITE, 8);
    setStroke(wh, C.BD, 1, "inner");
    wh.name = "Input / url";
    txt(f, tX + 32, y + 134, "api.platform.ru/tg/hook", 12, 400, C.INK2);
    const sws = [["\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F\u0445", true], ["\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C", true], ["\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F", false]];
    sws.forEach((s, i) => {
      const sy = y + 184 + i * 40;
      txt(f, tX + 20, sy + 4, s[0], 12, 500, C.INK2);
      const p = rect(f, tX + colW - 60, sy, 40, 22, s[1] ? C.ACCENT : "#CBD5E1", 11);
      p.name = "switch / " + (s[1] ? "on" : "off");
      makeEllipse(f, tX + colW - 60 + (s[1] ? 20 : 2), sy + 2, 18, 18, "#FFFFFF");
    });
    const iX = box.cx + 2 * (colW + 24);
    cardBox(f, iX, y, colW, 356, "card/integrations");
    txt(f, iX + 20, y + 16, "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438", 14, 600, C.INK);
    const ints = [["SMTP-\u043F\u043E\u0447\u0442\u0430", "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E"], ["S3-\u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435", "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E"], ["Sentry-\u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433", "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E"], ["\u041F\u043B\u0430\u0442\u0451\u0436\u043D\u044B\u0439 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440", "\u0441\u043A\u043E\u0440\u043E"]];
    ints.forEach((it, i) => {
      const iy = y + 52 + i * 62;
      const ir = rect(f, iX + 20, iy, colW - 40, 50, C.BG2, 10);
      ir.name = "integration-row";
      txt(f, iX + 34, iy + 8, it[0], 13, 600, C.INK);
      chipStat(f, iX + 34, iy + 26, it[1], it[1] === "\u0441\u043A\u043E\u0440\u043E" ? "y" : "g");
    });
    btn(f, box.cx + W2 - 190, y + 388, 190, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", "primary", { h: 44 });
  }
  function e68(f, m) {
    const box = supShell(f, m, 0, "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u044F \xB7 \u043E\u0431\u0437\u043E\u0440");
    let y = box.cy;
    const W2 = box.cw;
    const kw = Math.round((W2 - 72) / 4);
    kpi(f, box.cx, y, kw, "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0440\u0443\u0435\u043C\u044B\u0445", "8", "+1", "g");
    kpi(f, box.cx + (kw + 24), y, kw, "\u0420\u0430\u0437\u0431\u043E\u0440\u043E\u0432 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", "14", "+3", "g");
    kpi(f, box.cx + 2 * (kw + 24), y, kw, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B", "7,8", "+0,4", "g");
    kpi(f, box.cx + 3 * (kw + 24), y, kw, "\u0416\u0434\u0443\u0442 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F", "3", "\u0434\u0435\u0434\u043B\u0430\u0439\u043D 2 \u0434\u043D\u044F", "y");
    y += 116;
    const mainW = Math.round(W2 * 0.62);
    cardBox(f, box.cx, y, mainW, 320, "card/recent-reviews");
    txt(f, box.cx + 20, y + 16, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0440\u0430\u0437\u0431\u043E\u0440\u044B", 14, 600, C.INK);
    const rows = [
      ["\u041F\u0451\u0442\u0440 \u0421.", "\u0422\u0440\u0435\u0432\u043E\u0433\u0430 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u043E\u043C", "\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "\u0436\u0434\u0451\u0442"],
      ["\u041D\u0438\u043D\u0430 \u0422.", "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u0441 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u043C", "\u0413\u0440\u0430\u043D\u0438\u0446\u044B", "\u0436\u0434\u0451\u0442"],
      ["\u041F\u0451\u0442\u0440 \u0421.", "\u0421\u0438\u043D\u0434\u0440\u043E\u043C \u0441\u0430\u043C\u043E\u0437\u0432\u0430\u043D\u0446\u0430", "\u042D\u043C\u043F\u0430\u0442\u0438\u044F", "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D"],
      ["\u0410\u043B\u0438\u043D\u0430 \u0416.", "\u0412\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435 \u043C\u0430\u043C\u044B", "\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D"]
    ];
    rows.forEach((r, i) => {
      const ry = y + 50 + i * 64;
      avatar(f, box.cx + 20, ry + 4, 36, r[0].slice(0, 2).toUpperCase());
      txt(f, box.cx + 68, ry + 2, r[0] + " \xB7 " + r[1], 13, 600, C.INK);
      txt(f, box.cx + 68, ry + 22, "\u0444\u043E\u043A\u0443\u0441: " + r[2] + " \xB7 \u0441\u0435\u0441\u0441\u0438\u044F 24 \u043C\u0438\u043D", 11, 400, C.INK3);
      chipStat(f, box.cx + mainW - 116, ry + 8, r[3], r[3] === "\u0436\u0434\u0451\u0442" ? "y" : "g");
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + 52, mainW - 40, 1, C.BD, 0);
    });
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y, rw, 320, "card/supervision-sessions");
    txt(f, rx + 20, y + 16, "\u0413\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", 14, 600, C.INK);
    const evs = [
      ["\u043F\u0442, 18:00", "\u0413\u0440\u0443\u043F\u043F\u0430 \xB7 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B 2 \u043A\u0443\u0440\u0441\u0430", "4 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430"],
      ["\u043F\u043D, 11:00", "\u0418\u043D\u0442\u0435\u0440\u0432\u0438\u0437\u0438\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u043E\u0432", "6 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"]
    ];
    evs.forEach((e, i) => {
      const ey = y + 50 + i * 84;
      const er = rect(f, rx + 20, ey, rw - 40, 72, C.BG2, 10);
      er.name = "event-row";
      txt(f, rx + 34, ey + 10, e[0], 13, 600, C.ACCENT);
      txt(f, rx + 34, ey + 30, e[1], 12, 500, C.INK);
      txt(f, rx + 34, ey + 48, e[2], 11, 400, C.INK3);
    });
    txt(f, rx + 20, y + 224, "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0432\u0441\u0442\u0440\u0435\u0447\u0443 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0437\u0430 \u0447\u0430\u0441.", 11, 400, C.INK3);
    btn(f, rx + 20, y + 248, rw - 40, "\u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C", "secondary", { h: 40 });
  }
  function e69(f, m) {
    const box = supShell(f, m, 1, "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0440\u0443\u0435\u043C\u044B\u0435");
    let y = box.cy;
    const W2 = box.cw;
    const sf = rect(f, box.cx, y - 6, 320, 40, C.WHITE, 8);
    setStroke(sf, C.BD, 1, "inner");
    sf.name = "Input / search";
    ic(f, "search", box.cx + 12, y + 4, 16, C.INK3);
    txt(f, box.cx + 36, y + 2, "\u0418\u043C\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u2026", 13, 400, C.INK3);
    chipStat(f, box.cx + 344, y + 4, "8 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445", "n");
    btn(f, box.cx + W2 - 170, y - 6, 170, "\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", "primary", { icon: "plus", h: 40 });
    y += 58;
    const rows = [
      ["\u041F\u0451\u0442\u0440 \u0421.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442 \xB7 2 \u043A\u0443\u0440\u0441", "24 \u0441\u0435\u0441\u0441\u0438\u0438 \xB7 \u0441\u0440. 7,2", 72, "\u043F\u043E \u043F\u043B\u0430\u043D\u0443"],
      ["\u041D\u0438\u043D\u0430 \u0422.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442 \xB7 2 \u043A\u0443\u0440\u0441", "12 \u0441\u0435\u0441\u0441\u0438\u0439 \xB7 \u0441\u0440. 6,8", 55, "\u043F\u043E \u043F\u043B\u0430\u043D\u0443"],
      ["\u0410\u043B\u0438\u043D\u0430 \u0416.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442 \xB7 3 \u043A\u0443\u0440\u0441", "41 \u0441\u0435\u0441\u0441\u0438\u044F \xB7 \u0441\u0440. 8,1", 88, "\u043E\u0442\u043B\u0438\u0447\u043D\u043E"],
      ["\u0413\u043B\u0435\u0431 \u041A.", "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \xB7 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430", "9 \u0441\u0435\u0441\u0441\u0438\u0439 \xB7 \u0441\u0440. 7,5", 63, "\u043F\u043E \u043F\u043B\u0430\u043D\u0443"],
      ["\u0414\u0430\u0448\u0430 \u0420.", "\u0441\u0442\u0443\u0434\u0435\u043D\u0442 \xB7 1 \u043A\u0443\u0440\u0441", "4 \u0441\u0435\u0441\u0441\u0438\u0438 \xB7 \u0441\u0440. 6,1", 30, "\u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435"]
    ];
    const rowH = 76;
    const tableH = rows.length * rowH + 8;
    cardBox(f, box.cx, y, W2, tableH, "card/supervisees");
    rows.forEach((r, i) => {
      const ry = y + 8 + i * rowH;
      avatar(f, box.cx + 20, ry + 12, 44, r[0].slice(0, 2).toUpperCase());
      txt(f, box.cx + 80, ry + 12, r[0], 15, 600, C.INK);
      txt(f, box.cx + 80, ry + 34, r[1], 12, 400, C.INK3);
      txt(f, box.cx + Math.round(W2 * 0.34), ry + 22, r[2], 13, 400, C.INK2);
      txt(f, box.cx + Math.round(W2 * 0.58), ry + 8, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B", 10, 500, C.INK3);
      rect(f, box.cx + Math.round(W2 * 0.58), ry + 26, 180, 8, C.BD, 4);
      rect(f, box.cx + Math.round(W2 * 0.58), ry + 26, Math.round(180 * r[3] / 100), 8, C.ACCENT, 4).name = "progress-fill";
      txt(f, box.cx + Math.round(W2 * 0.58) + 192, ry + 22, r[3] + "%", 12, 600, C.INK);
      chipStat(f, box.cx + Math.round(W2 * 0.8), ry + 18, r[4], r[4] === "\u043E\u0442\u043B\u0438\u0447\u043D\u043E" ? "g" : r[4] === "\u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435" ? "y" : "n");
      ralign(txt(f, 0, ry + 20, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u2192", 13, 500, C.ACCENT), box.cx + W2 - 20);
      if (i < rows.length - 1) rect(f, box.cx + 20, ry + rowH - 6, W2 - 40, 1, C.BD, 0);
    });
  }
  function e70(f, m) {
    const box = supShell(f, m, 2, "\u0420\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438 #812");
    let y = box.cy;
    const W2 = box.cw;
    const mainW = Math.round(W2 * 0.58);
    cardBox(f, box.cx, y, mainW, 560, "card/session-transcript");
    txt(f, box.cx + 20, y + 16, "\u041F\u0451\u0442\u0440 \u0421. \xB7 \xAB\u0422\u0440\u0435\u0432\u043E\u0433\u0430 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u043E\u043C\xBB", 15, 600, C.INK);
    txt(f, box.cx + 20, y + 40, "\u0441\u0435\u0433\u043E\u0434\u043D\u044F, 14:00 \xB7 24 \u043C\u0438\u043D \xB7 \u0444\u043E\u043A\u0443\u0441: \u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 12, 400, C.INK3);
    chipStat(f, box.cx + mainW - 96, y + 14, "04:12", "v");
    let cy2 = y + 72;
    cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, "\u041A\u043B\u0438\u0435\u043D\u0442: \xAB\u042F \u0432\u0441\u0435\u0433\u0434\u0430 \u043F\u0430\u043D\u0438\u043A\u0443\u044E \u043F\u0435\u0440\u0435\u0434", "\u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430\u043C\u0438, \u0440\u0443\u043A\u0438 \u0445\u043E\u043B\u043E\u0434\u0435\u044E\u0442\xBB.", "left") + 8;
    cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433: \xAB\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043C\u0441\u044F \u043D\u0430", "\u044D\u0442\u043E\u043C \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0438. \u0413\u0434\u0435 \u0432 \u0442\u0435\u043B\u0435 \u043E\u043D\u043E?\xBB", "right") + 8;
    cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, "\u041A\u043B\u0438\u0435\u043D\u0442: \xAB\u0412 \u0433\u0440\u0443\u0434\u0438 \u0438 \u0433\u043E\u0440\u043B\u0435. \u0421\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F", "\u0441\u0442\u0440\u0430\u0448\u043D\u043E \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u043E\u0431 \u044D\u0442\u043E\u043C\xBB.", "left") + 8;
    cy2 += bubble(f, box.cx + 20, cy2, mainW - 40, "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433: \xAB\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442\u0435.", "\u041A\u0430\u043A\u0443\u044E \u044D\u043C\u043E\u0446\u0438\u044E \u0432\u044B \u0441\u043B\u044B\u0448\u0438\u0442\u0435 \u0432\u043D\u0443\u0442\u0440\u0438?\xBB", "right") + 8;
    txt(f, box.cx + 20, cy2 + 6, "\u042D\u041C\u041E\u0426\u0418\u0418 \u041A\u041B\u0418\u0415\u041D\u0422\u0410 \u041F\u041E \u0425\u041E\u0414\u0423 \u0421\u0415\u0421\u0421\u0418\u0418", 10, 500, C.INK3);
    const emos = [["\u0442\u0440\u0435\u0432\u043E\u0433\u0430 \u2014 \u0432\u044B\u0441\u043E\u043A\u0430\u044F", "r"], ["\u043D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435 \u2014 \u0441\u0440\u0435\u0434\u043D\u0435\u0435", "y"], ["\u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u2014 \u0440\u0430\u0441\u0442\u0451\u0442", "g"]];
    let ex = box.cx + 20;
    emos.forEach((em) => {
      ex += chipStat(f, ex, cy2 + 26, em[0], em[1]) + 8;
    });
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y, rw, 560, "card/supervision-comments");
    txt(f, rx + 20, y + 16, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", 14, 600, C.INK);
    let sy = y + 48;
    sy += supComment(f, rx + 20, sy, rw - 40, "04:12", "\u041C\u0430\u0440\u0438\u044F \u0421.", "\u0425\u043E\u0440\u043E\u0448\u0430\u044F \u0444\u043E\u043A\u0443\u0441\u0438\u0440\u043E\u0432\u043A\u0430 \u043D\u0430 \u0442\u0435\u043B\u0435\u0441\u043D\u043E\u043C", "\u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0438 \u2014 \u0443\u0442\u043E\u0447\u043D\u044F\u044E\u0449\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0443\u043C\u0435\u0441\u0442\u0435\u043D.");
    sy += supComment(f, rx + 20, sy, rw - 40, "11:40", "\u041C\u0430\u0440\u0438\u044F \u0421.", "\u0422\u0443\u0442 \u043C\u043E\u0436\u043D\u043E \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u044D\u043C\u043E\u0446\u0438\u0438 \u0438", "\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0435\u0451 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C.");
    const ta = rect(f, rx + 20, sy + 8, rw - 40, 64, C.WHITE, 8);
    setStroke(ta, C.BD, 1, "inner");
    ta.name = "Input / textarea";
    txt(f, rx + 32, sy + 20, "\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\u2026", 12, 400, C.INK3);
    txt(f, rx + 32, sy + 48, "\u03C4 \u0442\u0430\u0439\u043C\u043A\u043E\u0434 \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438", 10, 400, C.INK3);
    btn(f, rx + rw - 164, sy + 84, 144, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "primary", { icon: "send", h: 40 });
  }
  function e71(f, m) {
    const box = supShell(f, m, 2, "\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439");
    let y = box.cy;
    const W2 = box.cw;
    const fw = 720;
    cardBox(f, box.cx + Math.round((W2 - fw) / 2), y, fw, 520, "card/comment-form");
    const px = box.cx + Math.round((W2 - fw) / 2) + 24;
    const pw = fw - 48;
    let cy2 = y + 22;
    txt(f, px, cy2, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", 17, 700, C.INK);
    txt(f, px, cy2 + 24, "\u0421\u0435\u0441\u0441\u0438\u044F #812 \xB7 \u041F\u0451\u0442\u0440 \u0421. \xB7 04:12\u201304:58", 12, 400, C.INK3);
    cy2 += 56;
    txt(f, px, cy2, "\u0424\u0420\u0410\u0413\u041C\u0415\u041D\u0422", 10, 500, C.INK3);
    const frag = rect(f, px, cy2 + 16, pw, 64, C.BG2, 10);
    frag.name = "quoted-fragment";
    txt(f, px + 14, cy2 + 28, "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433: \xAB\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043C\u0441\u044F \u043D\u0430 \u044D\u0442\u043E\u043C", 13, 400, C.INK2);
    txt(f, px + 14, cy2 + 50, "\u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0438. \u0413\u0434\u0435 \u0432 \u0442\u0435\u043B\u0435 \u043E\u043D\u043E?\xBB", 13, 400, C.INK2);
    ralign(txt(f, 0, cy2 + 32, "04:12", 11, 600, "#5B21B6"), px + pw - 14);
    cy2 += 100;
    txt(f, px, cy2, "\u0424\u041E\u041A\u0423\u0421-\u041D\u0410\u0412\u042B\u041A", 10, 500, C.INK3);
    const sk = [["\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", true], ["\u042D\u043C\u043F\u0430\u0442\u0438\u044F", false], ["\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", false], ["\u0413\u0440\u0430\u043D\u0438\u0446\u044B", false]];
    let sx = px;
    sk.forEach((s) => {
      const swd = Math.round(s[0].length * 6.8) + 26;
      const chipEl = rect(f, sx, cy2 + 18, swd, 30, s[1] ? C.ACCENT : C.WHITE, 15);
      if (!s[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "skill-chip";
      txt(f, sx + 12, cy2 + 24, s[0], 12, s[1] ? 600 : 500, s[1] ? "#FFFFFF" : C.INK2);
      sx += swd + 8;
    });
    cy2 += 68;
    txt(f, px, cy2, "\u0428\u0410\u0411\u041B\u041E\u041D", 10, 500, C.INK3);
    const tpl = [["\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0441\u0438\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u043E\u0440\u043E\u043D\u0443", true], ["\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u0443", false]];
    sx = px;
    tpl.forEach((t) => {
      const twd = Math.round(t[0].length * 6.4) + 24;
      const chipEl = rect(f, sx, cy2 + 18, twd, 28, t[1] ? "#EDE9FE" : C.WHITE, 14);
      if (!t[1]) setStroke(chipEl, C.BD, 1, "inner");
      chipEl.name = "template-chip";
      txt(f, sx + 12, cy2 + 23, t[0], 12, t[1] ? 600 : 500, t[1] ? "#5B21B6" : C.INK2);
      sx += twd + 8;
    });
    cy2 += 66;
    txt(f, px, cy2, "\u041A\u041E\u041C\u041C\u0415\u041D\u0422\u0410\u0420\u0418\u0419", 10, 500, C.INK3);
    const ta = rect(f, px, cy2 + 16, pw, 88, C.WHITE, 8);
    setStroke(ta, C.ACCENT, 2, "inner");
    ta.name = "Input / textarea / focus";
    txt(f, px + 14, cy2 + 30, "\u0421\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430: \u0442\u044B \u043D\u0435 \u0443\u0448\u0451\u043B \u043E\u0442 \u0442\u0435\u043B\u0435\u0441\u043D\u043E\u0433\u043E \u0444\u043E\u043A\u0443\u0441\u0430", 13, 400, C.INK2);
    txt(f, px + 14, cy2 + 52, "\u0438 \u0443\u0434\u0435\u0440\u0436\u0430\u043B \u0442\u0435\u043C\u043F. \u0420\u044F\u0434\u043E\u043C \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u044D\u043C\u043E\u0446\u0438\u0438", 13, 400, C.INK2);
    txt(f, px + 14, cy2 + 74, "\u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C (\xAB\u044D\u0442\u043E \u0442\u0440\u0435\u0432\u043E\u0433\u0430 \u0438\u043B\u0438 \u0441\u0442\u0440\u0430\u0445?\xBB).", 13, 400, C.INK2);
    cy2 += 124;
    const cb = rect(f, px, cy2 + 2, 18, 18, C.ACCENT, 5);
    cb.name = "checkbox-checked";
    ic(f, "check", px + 3, cy2 + 5, 12, "#FFFFFF");
    txt(f, px + 28, cy2, "\u0412\u0438\u0434\u0438\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442 (\u043D\u0435 \u043A\u043B\u0438\u0435\u043D\u0442)", 12, 400, C.INK2);
    cy2 += 40;
    btn(f, px, cy2, 130, "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C", "secondary", { h: 44 });
    btn(f, px + 146, cy2, 150, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "primary", { icon: "send", h: 44 });
  }
  function e72(f, m) {
    const box = supShell(f, m, 3, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430 \xB7 \u041F\u0451\u0442\u0440 \u0421.");
    let y = box.cy;
    const W2 = box.cw;
    const mainW = Math.round(W2 * 0.44);
    cardBox(f, box.cx, y, mainW, 320, "card/skills-radar");
    txt(f, box.cx + 20, y + 16, "\u041D\u0430\u0432\u044B\u043A\u0438 (8) \xB7 \u0441\u0435\u0439\u0447\u0430\u0441 / \u043D\u0430\u0447\u0430\u043B\u043E", 14, 600, C.INK);
    try {
      const svg = penpot.createShapeFromSvg(radarSvg(230));
      if (svg) {
        f.appendChild(svg);
        svg.x = box.cx + Math.round((mainW - 230) / 2);
        svg.y = y + 52;
        svg.name = "radar-chart";
      }
    } catch (_) {
    }
    const rx = box.cx + mainW + 24;
    const rw = W2 - mainW - 24;
    cardBox(f, rx, y, rw, 320, "card/dynamics");
    txt(f, rx + 20, y + 16, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u043F\u043E \u043D\u0435\u0434\u0435\u043B\u044F\u043C", 14, 600, C.INK);
    const bars = [[46, "\u043D1", false], [54, "\u043D2", false], [58, "\u043D3", false], [64, "\u043D4", true], [71, "\u043D5", true]];
    bars.forEach((b, i) => {
      const bx = rx + 28 + i * 56;
      rect(f, bx, y + 268 - b[0] * 2, 32, b[0] * 2, b[2] ? C.ACCENT : C.BD, 8).name = "bar";
      const t = txt(f, 0, y + 276, b[1], 10, b[2] ? 600 : 400, b[2] ? C.ACCENT : C.INK3);
      ralign(t, bx + 32 + 14);
      const vt = txt(f, 0, y + 236 - b[0] * 2, String(b[0] / 10).replace(".", ","), 11, 600, C.INK);
      ralign(vt, bx + 32 + 14);
    });
    y += 344;
    cardBox(f, box.cx, y, W2, 224, "card/achievements");
    txt(f, box.cx + 20, y + 16, "\u0414\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", 14, 600, C.INK);
    const ach = [
      ["\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", "86", "91", "+5"],
      ["\u042D\u043C\u043F\u0430\u0442\u0438\u044F", "78", "84", "+6"],
      ["\u0413\u0440\u0430\u043D\u0438\u0446\u044B", "64", "71", "+7"],
      ["\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", "80", "83", "+3"]
    ];
    const awd = Math.round((W2 - 40 - 3 * 16) / 4);
    ach.forEach((a, i) => {
      const ax = box.cx + 20 + i * (awd + 16);
      const ac = rect(f, ax, y + 44, awd, 128, C.BG2, 12);
      ac.name = "skill-delta";
      txt(f, ax + 14, y + 58, a[0], 13, 600, C.INK);
      txt(f, ax + 14, y + 84, a[1] + " \u2192 " + a[2], 20, 700, C.INK);
      chipStat(f, ax + 14, y + 122, a[3], "g");
      txt(f, ax + 14, y + 152, "\u0437\u0430 5 \u043D\u0435\u0434\u0435\u043B\u044C", 10, 400, C.INK3);
    });
    ralign(txt(f, 0, y + 186, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F: \u0433\u043E\u0442\u043E\u0432 \u043A \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438 \u043F\u043E\u0434 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435\u043C \u2192", 13, 500, C.ACCENT), box.cx + W2 - 20);
  }
  function e73(f, m) {
    const box = supShell(f, m, 4, "\u041E\u0442\u0447\u0451\u0442 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438");
    let y = box.cy;
    const W2 = box.cw;
    const fw = 860;
    const fx0 = box.cx + Math.round((W2 - fw) / 2);
    cardBox(f, fx0, y, fw, 520, "card/report");
    const px = fx0 + 32;
    const pw = fw - 64;
    txt(f, px, y + 24, "\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", 18, 700, C.INK);
    chipStat(f, fx0 + fw - 120, y + 24, "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A", "y");
    txt(f, px, y + 52, "\u041F\u0451\u0442\u0440 \u0421. \xB7 \u0441\u0442\u0443\u0434\u0435\u043D\u0442, 2 \u043A\u0443\u0440\u0441 \xB7 \u043F\u0435\u0440\u0438\u043E\u0434: \u043C\u0430\u0439\u2013\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C 2026 \xB7 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440 \u041C\u0430\u0440\u0438\u044F \u0421.", 12, 400, C.INK3);
    const secs = [
      ["1. \u041E\u0431\u044A\u0451\u043C \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438", ["12 \u0441\u0435\u0441\u0441\u0438\u0439 \u043F\u043E\u0434 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435\u043C \xB7 2 \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438 \xB7 4 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u0441 \u0442\u0430\u0439\u043C\u043A\u043E\u0434\u0430\u043C\u0438."]],
      ["2. \u0421\u0438\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u044B", ["\u0423\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0442\u0435\u043B\u0435\u0441\u043D\u044B\u0439 \u0444\u043E\u043A\u0443\u0441, \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B.", "\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435 86\u219291, \u044D\u043C\u043F\u0430\u0442\u0438\u044F 78\u219284."]],
      ["3. \u0417\u043E\u043D\u044B \u0440\u043E\u0441\u0442\u0430", ["\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0439 \u044D\u043C\u043E\u0446\u0438\u0439 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C; \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u043C\u043E\u043B\u0447\u0430\u043D\u0438\u0435\u043C;", "\u0442\u0430\u0439\u043C-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442 \u0441\u0435\u0441\u0441\u0438\u0438 (\u0444\u0438\u043D\u0430\u043B \u0442\u043E\u0440\u043E\u043F\u0438\u0442\u0441\u044F)."]],
      ["4. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F", ["\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438 \u043F\u043E\u0434 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435\u043C; \u043F\u043E\u043B\u043D\u044B\u0439 \u0434\u043E\u043F\u0443\u0441\u043A \u2014", "\u043F\u043E\u0441\u043B\u0435 6 \u0441\u0435\u0441\u0441\u0438\u0439 \u0438 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u0434\u0432\u0443\u0445 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u0435\u0432."]]
    ];
    let cy2 = y + 84;
    secs.forEach((s) => {
      txt(f, px, cy2, s[0], 14, 600, C.INK);
      cy2 += 24;
      s[1].forEach((ln) => {
        txt(f, px, cy2, ln, 13, 400, C.INK2);
        cy2 += 20;
      });
      cy2 += 12;
    });
    const sig = rect(f, px, y + 448, pw, 1, C.BD, 0);
    txt(f, px, y + 460, "\u041C\u0430\u0440\u0438\u044F \u0421. \xB7 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440, badge verified \xB7 16.09.2026", 11, 400, C.INK3);
    btn(f, px, y + 484, 170, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 PDF", "secondary", { icon: "download", h: 40 });
    btn(f, px + 186, y + 484, 200, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0443", "primary", { icon: "send", h: 40 });
  }
  var SCREENS5 = [
    { code: "E-60", title: "\u041E\u0431\u0437\u043E\u0440 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B", draw: e60 },
    { code: "E-61", title: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438", draw: e61 },
    { code: "E-62", title: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \xB7 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430", draw: e62 },
    { code: "E-63", title: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u043E\u0447\u0435\u0440\u0435\u0434\u044C", draw: e63 },
    { code: "E-64", title: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u0440\u0435\u0448\u0435\u043D\u0438\u0435", draw: e64 },
    { code: "E-65", title: "\u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432", draw: e65 },
    { code: "E-66", title: "\u0410\u0443\u0434\u0438\u0442-\u043B\u043E\u0433", draw: e66 },
    { code: "E-67", title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B", draw: e67 },
    { code: "E-68", title: "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u044F \xB7 \u0434\u0430\u0448\u0431\u043E\u0440\u0434", draw: e68 },
    { code: "E-69", title: "\u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0440\u0443\u0435\u043C\u044B\u0435", draw: e69 },
    { code: "E-70", title: "\u0420\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438", draw: e70 },
    { code: "E-71", title: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", draw: e71 },
    { code: "E-72", title: "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", draw: e72 },
    { code: "E-73", title: "\u041E\u0442\u0447\u0451\u0442 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438", draw: e73 }
  ];
  var SCREEN5_FRAME_NAMES = SCREENS5.flatMap((s) => ["1440", "1280"].map((bp) => s.code + " " + s.title + " / " + bp));
  function buildScreens5(log) {
    const SX = 9660 + 390 + 240;
    let y = 100;
    for (const s of SCREENS5) {
      for (const m of [D, A128]) {
        const bp = m.w === 1440 ? "1440" : "1280";
        const fr = openFrame(s.code + " " + s.title + " / " + bp, SX, y, m.w, m.h);
        try {
          s.draw(fr, m);
        } catch (e) {
          log.push("\xD7 " + s.code + " " + s.title + "/" + bp + ": " + e);
        }
        y += m.h + 100;
      }
    }
  }

  // src/screens6.ts
  var F6 = null;
  var M6 = null;
  function skel(f, x, y, w, h, r = 8) {
    const s = rect(f, x, y, w, h, C.BG2, r);
    s.name = "skeleton";
  }
  function emptyState2(f, cx, cy, title, sub1, sub2) {
    ic(f, "inbox", cx - 28, cy - 28, 56, C.INK3);
    const t = txt(f, cx - 140, cy + 44, title, 17, 700, C.INK);
    try {
      if (t.width) t.x = cx - t.width / 2;
    } catch (_) {
    }
    const s1 = txt(f, cx - 180, cy + 74, sub1, 13, 400, C.INK2);
    const s2 = txt(f, cx - 180, cy + 94, sub2, 13, 400, C.INK2);
    try {
      if (s1.width) s1.x = cx - s1.width / 2;
      if (s2.width) s2.x = cx - s2.width / 2;
    } catch (_) {
    }
  }
  function e80(f, m) {
    const box = shell(f, m, 0, "\u0414\u0430\u0448\u0431\u043E\u0440\u0434");
    let y = box.cy;
    const W2 = box.cw;
    skel(f, box.cx, y, 220, 24, 6);
    skel(f, box.cx, y + 36, 150, 14, 6);
    y += 74;
    const kw = Math.round((W2 - 72) / 4);
    for (let i = 0; i < 4; i++) {
      cardBox(f, box.cx + i * (kw + 24), y, kw, 92, "skeleton / kpi");
      skel(f, box.cx + i * (kw + 24) + 16, y + 16, kw - 60, 12, 6);
      skel(f, box.cx + i * (kw + 24) + 16, y + 40, 90, 22, 6);
    }
    y += 116;
    const mainW = m.kind === "desktop" ? Math.round(W2 * 0.62) : W2;
    cardBox(f, box.cx, y, mainW, 264, "skeleton / chart");
    skel(f, box.cx + 20, y + 16, 180, 14, 6);
    skel(f, box.cx + 20, y + 56, mainW - 40, 170, 10);
    if (m.kind === "desktop") {
      cardBox(f, box.cx + mainW + 24, y, W2 - mainW - 24, 264, "skeleton / system");
      skel(f, box.cx + mainW + 44, y + 16, 150, 14, 6);
      for (let i = 0; i < 4; i++) skel(f, box.cx + mainW + 44, y + 52 + i * 40, W2 - mainW - 64, 14, 6);
    }
    y += 288;
    cardBox(f, box.cx, y, W2, 232, "skeleton / list");
    skel(f, box.cx + 20, y + 16, 160, 14, 6);
    for (let i = 0; i < 3; i++) {
      skel(f, box.cx + 20, y + 56 + i * 56, 36, 36, 18);
      skel(f, box.cx + 72, y + 60 + i * 56, W2 - 220, 12, 6);
      skel(f, box.cx + 72, y + 78 + i * 56, (W2 - 220) * 0.6, 12, 6);
    }
  }
  function e81(f, m) {
    const box = shell(f, m, 1, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438");
    const y = box.cy;
    const W2 = box.cw;
    emptyState2(
      f,
      box.cx + Math.round(W2 / 2),
      y + 120,
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0435\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
      "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439",
      "\u0438\u0437 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u2014 \u044D\u0442\u043E \u0437\u0430\u0439\u043C\u0451\u0442 \u043F\u0430\u0440\u0443 \u043C\u0438\u043D\u0443\u0442."
    );
    const bw = 200;
    const bx = box.cx + Math.round((W2 - bw) / 2);
    btn(f, bx, y + 236, bw, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439", "primary", { icon: "plus", h: 44 });
    btn(f, bx, y + 296, bw, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u044B", "secondary", { h: 44 });
    const t = txt(f, box.cx, y + 368, "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430: \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0434\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0434 \u043A\u043B\u0438\u0435\u043D\u0442\u0430.", 12, 400, C.INK3);
    try {
      if (t.width) t.x = box.cx + (W2 - t.width) / 2;
    } catch (_) {
    }
  }
  function e82(f, m) {
    const box = shell(f, m, 1, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438");
    let y = box.cy;
    const W2 = box.cw;
    const cw = Math.min(520, W2 - 32);
    const cx = box.cx + Math.round((W2 - cw) / 2);
    cardBox(f, cx, y + 40, cw, 300, "card / error");
    const circ = rect(f, cx + Math.round((cw - 72) / 2), y + 76, 72, 72, "FEE2E2", 36);
    circ.name = "error-circle";
    ic(f, "triangle-alert", cx + Math.round((cw - 72) / 2) + 20, y + 96, 32, C.ERROR);
    const t = txt(f, cx, y + 170, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438", 17, 700, C.INK);
    try {
      if (t.width) t.x = cx + (cw - t.width) / 2;
    } catch (_) {
    }
    const s1 = txt(f, cx, y + 202, "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0443 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.", 13, 400, C.INK2);
    try {
      if (s1.width) s1.x = cx + (cw - s1.width) / 2;
    } catch (_) {
    }
    const s2 = txt(f, cx, y + 222, "\u041E\u0448\u0438\u0431\u043A\u0430: NETWORK_504 \xB7 16.09.2026, 14:02", 11, 400, C.INK3);
    try {
      if (s2.width) s2.x = cx + (cw - s2.width) / 2;
    } catch (_) {
    }
    const bw = Math.min(200, cw - 40);
    btn(f, cx + Math.round((cw - bw) / 2), y + 256, bw, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C", "primary", { icon: "rotate-ccw", h: 44 });
    const l = txt(f, cx, y + 380, "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F.", 12, 500, C.ACCENT);
    try {
      if (l.width) l.x = cx + (W2 - l.width) / 2;
    } catch (_) {
    }
  }
  function e83(f, m) {
    const box = shell(f, m, 2, "\u0418\u0433\u0440\u044B");
    let y = box.cy;
    const W2 = box.cw;
    const tw = Math.min(420, W2 - 32);
    const tr = rect(f, box.cx, y, tw, 56, "F0FDF4", 12);
    tr.name = "Toast / success";
    ic(f, "circle-check", box.cx + 16, y + 18, 20, C.SUCCESS);
    txt(f, box.cx + 46, y + 10, "\u0414\u043E\u0441\u0442\u0443\u043F \u0441\u043E\u0437\u0434\u0430\u043D", 13, 700, "#166534");
    txt(f, box.cx + 46, y + 30, "\u041A\u043E\u0434 \u0438 \u0441\u0441\u044B\u043B\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u0443", 12, 400, "#15803D");
    y += 80;
    const cw = Math.min(520, W2 - 32);
    const cx = box.cx + Math.round((W2 - cw) / 2);
    cardBox(f, cx, y, cw, 260, "card / success");
    const circ = rect(f, cx + Math.round((cw - 72) / 2), y + 28, 72, 72, "DCFCE7", 36);
    circ.name = "success-circle";
    ic(f, "circle-check", cx + Math.round((cw - 72) / 2) + 20, y + 48, 32, C.SUCCESS);
    const t = txt(f, cx, y + 116, "\u0418\u0433\u0440\u0430 \xAB\u0414\u044B\u0445\u0430\u043D\u0438\u0435 4-7-8\xBB \u0432\u044B\u0434\u0430\u043D\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0443", 16, 700, C.INK);
    try {
      if (t.width) t.x = cx + (cw - t.width) / 2;
    } catch (_) {
    }
    const s = txt(f, cx, y + 144, "\u041A\u043B\u0438\u0435\u043D\u0442 \u043F\u043E\u043B\u0443\u0447\u0438\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0432 Telegram", 13, 400, C.INK2);
    try {
      if (s.width) s.x = cx + (cw - s.width) / 2;
    } catch (_) {
    }
    if (m.kind !== "tablet") {
      codeDisplay(f, cx + Math.round((cw - 280) / 2), y + 176, F6, M6);
    }
    const bw = 160;
    btn(f, cx + Math.round((cw - bw) / 2), y + 330, bw, "\u0413\u043E\u0442\u043E\u0432\u043E", "primary", { h: 44 });
  }
  function e84(f, m) {
    const box = shell(f, m, 4, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441");
    let y = box.cy;
    const W2 = box.cw;
    const mainW = m.kind === "desktop" ? Math.round(W2 * 0.5) : W2;
    cardBox(f, box.cx, y, mainW, 300, "card / partial-radar");
    txt(f, box.cx + 20, y + 16, "\u0420\u0430\u0434\u0430\u0440 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", 15, 600, C.INK);
    const warn = rect(f, box.cx + 20, y + 48, mainW - 40, 64, "FEF3C7", 10);
    warn.name = "partial-warning";
    ic(f, "info", box.cx + 34, y + 68, 20, C.WARNING);
    txt(f, box.cx + 64, y + 60, "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445: \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E 2 \u0438\u0437 5 \u0441\u0435\u0441\u0441\u0438\u0439.", 12, 500, "#92400E");
    txt(f, box.cx + 64, y + 80, "\u0420\u0430\u0434\u0430\u0440 \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u043F\u043E\u043B\u043D\u0443\u044E \u043A\u0430\u0440\u0442\u0438\u043D\u0443 \u043F\u043E\u0441\u043B\u0435 5-\u0439 \u0441\u0435\u0441\u0441\u0438\u0438.", 11, 400, "#92400E");
    const rows = [
      ["\u0421\u043B\u0443\u0448\u0430\u043D\u0438\u0435", 86, "2563EB", true],
      ["\u042D\u043C\u043F\u0430\u0442\u0438\u044F", 78, "16A34A", true],
      ["\u0413\u0440\u0430\u043D\u0438\u0446\u044B", 64, "D97706", true],
      ["\u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F", 0, "94A3B8", false],
      ["\u0421\u0430\u043C\u043E\u0430\u043D\u0430\u043B\u0438\u0437", 0, "94A3B8", false]
    ];
    let ry = y + 132;
    rows.forEach((r) => {
      if (r[3]) {
        skillBarRow(f, box.cx + 24, ry, mainW - 48, r[0], r[1], "#" + r[2]);
      } else {
        txt(f, box.cx + 24, ry, r[0], 12, 500, C.INK3);
        const nd = rect(f, box.cx + mainW - 130, ry - 2, 82, 22, "F1F5F9", 11);
        nd.name = "chip / \u043D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445";
        txt(f, box.cx + mainW - 122, ry + 2, "\u043D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", 10, 500, "64748B");
      }
      ry += 34;
    });
    if (m.kind === "desktop") {
      const rx = box.cx + mainW + 24;
      const rw = W2 - mainW - 24;
      cardBox(f, rx, y, rw, 300, "card / partial-sessions");
      txt(f, rx + 20, y + 16, "\u0421\u0435\u0441\u0441\u0438\u0438", 15, 600, C.INK);
      const ss = [
        ["02.09", "\u0422\u0440\u0435\u0432\u043E\u0433\u0430 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u043E\u043C", "86"],
        ["09.09", "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u0441 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u043C", "78"],
        ["??", "\u0421\u0435\u0441\u0441\u0438\u044F 3 \u0438\u0437 5", "\u041D\u0414"],
        ["??", "\u0421\u0435\u0441\u0441\u0438\u044F 4 \u0438\u0437 5", "\u041D\u0414"],
        ["??", "\u0421\u0435\u0441\u0441\u0438\u044F 5 \u0438\u0437 5", "\u041D\u0414"]
      ];
      ss.forEach((s, i) => {
        const sy = y + 52 + i * 46;
        const on = s[2] !== "\u041D\u0414";
        const cell = rect(f, rx + 20, sy, 40, 28, on ? "EFF6FF" : "F8FAFC", 8);
        cell.name = on ? "session-cell" : "session-cell / empty";
        if (!on) setStroke(cell, C.BD, 1, "inner");
        txt(f, rx + 72, sy + 7, s[1], 13, on ? 500 : 400, on ? C.INK : C.INK3);
        txt(f, rx + rw - 56, sy + 7, s[2], 13, 600, on ? C.ACCENT : C.INK3);
      });
    }
  }
  function e85(f, m) {
    const box = shell(f, m, 1, "\u0421\u0435\u0441\u0441\u0438\u044F \xB7 \u0442\u0440\u0435\u0432\u043E\u0436\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430");
    let y = box.cy;
    const W2 = box.cw;
    const bh = 96;
    const bn = rect(f, box.cx, y, W2, bh, "FEF2F2", 12);
    bn.name = "CriticalErrorBanner / session";
    setStroke(bn, "FECACA", 1, "inner");
    ic(f, "alert-octagon", box.cx + 20, y + 20, 28, C.ERROR);
    txt(f, box.cx + 62, y + 16, "\u0412 \u043E\u0442\u0432\u0435\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043F\u0440\u0438\u0437\u043D\u0430\u043A\u0438 \u043E\u0441\u0442\u0440\u043E\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F", 15, 700, "#991B1B");
    txt(f, box.cx + 62, y + 40, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044E \u0438 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u044D\u043F\u0438\u0437\u043E\u0434", 13, 400, "#B91C1C");
    txt(f, box.cx + 62, y + 58, "\u0441 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u043E\u043C. \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0441\u0435\u0441\u0441\u0438\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (14:03).", 13, 400, "#B91C1C");
    btn(f, box.cx + W2 - 170, y + 14, 150, "\u0420\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441", "primary", { h: 40 });
    btn(f, box.cx + W2 - 170, y + 60, 150, "\u041E\u0442\u043B\u043E\u0436\u0438\u0442\u044C", "secondary", { h: 36, fs: 12 });
    y += bh + 20;
    const mainW = m.kind === "desktop" ? Math.round(W2 * 0.62) : W2;
    cardBox(f, box.cx, y, mainW, 300, "card / session-paused");
    txt(f, box.cx + 20, y + 16, "\u0421\u0435\u0441\u0441\u0438\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \xB7 \u044D\u043F\u0438\u0437\u043E\u0434 12 \u0438\u0437 20", 14, 600, C.INK);
    const ch = rect(f, box.cx + 20, y + 48, mainW - 40, 60, C.BG2, 10);
    ch.name = "ClientMessageBubble / critical";
    setStroke(ch, "FECACA", 1, "inner");
    txt(f, box.cx + 36, y + 60, "\u041A\u043B\u0438\u0435\u043D\u0442: \xAB\u0414\u0430\u043B\u044C\u0448\u0435 \u043D\u0435 \u043C\u043E\u0433\u0443\u2026 \u0441\u0435\u0439\u0447\u0430\u0441 \u043A\u0430\u043A \u0431\u0443\u0434\u0442\u043E", 13, 400, C.INK);
    txt(f, box.cx + 36, y + 80, "\u0441\u043D\u043E\u0432\u0430 \u0442\u0430\u043C. \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u044E, \u0442\u043E\u043B\u044C\u043A\u043E \u0448\u0443\u043C\xBB.", 13, 400, C.INK);
    txt(f, box.cx + 20, y + 124, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u044B:", 12, 600, C.INK2);
    const recs = [
      ["\u0412\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043D\u0435 \u0443\u0433\u043B\u0443\u0431\u043B\u044F\u0442\u044C \u0434\u0440\u0430\u043C\u0443", true],
      ["\u0422\u0435\u0445\u043D\u0438\u043A\u0430 \u0437\u0430\u0437\u0435\u043C\u043B\u0435\u043D\u0438\u044F \xAB5-4-3-2-1\xBB", true],
      ["\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u043F\u0430\u0443\u0437\u0443 \u0438 \u0432\u044B\u0439\u0442\u0438 \u0438\u0437 \u0440\u043E\u043B\u0438", false]
    ];
    recs.forEach((r, i) => {
      const cb = rect(f, box.cx + 20, y + 152 + i * 36, 18, 18, r[1] ? C.ACCENT : C.WHITE, 5);
      cb.name = "checkbox / " + (r[1] ? "checked" : "unchecked");
      if (!r[1]) setStroke(cb, C.BD, 1, "inner");
      else ic(f, "check", box.cx + 24, y + 155 + i * 36, 12, "#FFFFFF");
      txt(f, box.cx + 48, y + 152 + i * 36, r[0], 12, 400, C.INK2);
    });
    if (m.kind === "desktop") {
      const rx = box.cx + mainW + 24;
      const rw = W2 - mainW - 24;
      cardBox(f, rx, y, rw, 300, "card / guidance");
      txt(f, rx + 20, y + 16, "\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0443", 14, 600, C.INK);
      const steps = [
        "\u0420\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0440\u0438\u0433\u0433\u0435\u0440 \u044D\u043F\u0438\u0437\u043E\u0434\u0430 \u0441 \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442\u043E\u043C",
        "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0440\u0435\u0430\u043A\u0446\u0438\u044E \u043F\u0430\u0443\u0437\u044B \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435",
        "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u043E\u0441\u0442\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F",
        "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E"
      ];
      steps.forEach((s, i) => {
        const sy = y + 52 + i * 40;
        txt(f, rx + 20, sy, i + 1 + ".", 12, 600, C.ACCENT);
        txt(f, rx + 40, sy, s, 12, 400, C.INK2);
      });
      btn(f, rx + 20, y + 232, rw - 40, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0440\u0430\u0437\u0431\u043E\u0440", "secondary", { icon: "message-circle", h: 40 });
    }
  }
  var SCREENS6 = [
    { code: "E-80", title: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430", mobileH: 844, draw: e80 },
    { code: "E-81", title: "\u041F\u0443\u0441\u0442\u043E", mobileH: 720, draw: e81 },
    { code: "E-82", title: "\u041E\u0448\u0438\u0431\u043A\u0430", mobileH: 700, draw: e82 },
    { code: "E-83", title: "\u0423\u0441\u043F\u0435\u0445", mobileH: 780, draw: e83 },
    { code: "E-84", title: "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", mobileH: 800, draw: e84 },
    { code: "E-85", title: "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0441\u0441\u0438\u0438", mobileH: 844, draw: e85 }
  ];
  var SCREEN6_FRAME_NAMES = SCREENS6.flatMap((s) => ["1440", "768", "390"].map((bp) => s.code + " " + s.title + " / " + bp));
  function buildScreens6(log) {
    F6 = pickFont(FONT_FALLBACKS);
    try {
      M6 = pickFont(["JetBrains Mono"]);
    } catch (_) {
      M6 = F6;
    }
    const SX = 11970;
    const XOFF = [[D, "1440", 0], [T, "768", 1680], [MB, "390", 2688]];
    let y = 100;
    for (const s of SCREENS6) {
      for (const [base, bp, xo] of XOFF) {
        const h = base.kind === "mobile" ? s.mobileH : base.h;
        const m = { w: base.w, h, kind: base.kind };
        const f = openFrame(s.code + " " + s.title + " / " + bp, SX + xo, y, m.w, h);
        try {
          s.draw(f, m);
        } catch (e) {
          log.push("\xD7 " + s.code + " " + s.title + "/" + bp + ": " + e);
        }
      }
      y += 1200;
    }
  }

  // src/prototypes.ts
  var FLOWS = [
    ["7.1 \u0413\u043E\u0441\u0442\u044C \u2192 \u0434\u0435\u043C\u043E \u2192 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F", [
      ["E-01 \u041B\u0435\u043D\u0434\u0438\u043D\u0433 / 1440", "E-02 \u0414\u0435\u043C\u043E-\u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044F / 1440"],
      ["E-02 \u0414\u0435\u043C\u043E-\u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u044F / 1440", "E-04 \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F / 1440"]
    ]],
    ["7.2 \u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u2192 \u0441\u0435\u0441\u0441\u0438\u044F \u2192 \u0440\u0430\u0437\u0431\u043E\u0440", [
      ["E-03 \u0412\u0445\u043E\u0434 / 1440", "E-10 \u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430 / 1440"],
      ["E-10 \u0414\u0430\u0448\u0431\u043E\u0440\u0434 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430 / 1440", "E-22 \u0421\u0435\u0441\u0441\u0438\u044F / 1440"],
      ["E-22 \u0421\u0435\u0441\u0441\u0438\u044F / 1440", "E-25 \u0420\u0430\u0437\u0431\u043E\u0440 / 1440"]
    ]],
    ["7.3 \u041A\u043B\u0438\u0435\u043D\u0442 web: \u0441\u0441\u044B\u043B\u043A\u0430 \u2192 \u0438\u0433\u0440\u0430 \u2192 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442", [
      ["E-40 \u041E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0433\u0440\u044B / 390", "E-41 \u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 / 390"],
      ["E-41 \u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 / 390", "E-42 \u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 / 390"],
      ["E-42 \u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 / 390", "E-43 \u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435 / 390"]
    ]],
    ["7.4 \u041A\u043B\u0438\u0435\u043D\u0442 TMA: \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u2192 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442", [
      ["E-50 \u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 / 390", "E-52 \u0418\u0433\u0440\u044B / 390"],
      ["E-52 \u0418\u0433\u0440\u044B / 390", "E-53 \u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 / 390"],
      ["E-53 \u041F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 / 390", "E-54 \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 / 390"]
    ]],
    ["7.5 \u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440 \u2192 \u0440\u0430\u0437\u0431\u043E\u0440 \u2192 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439", [
      ["E-68 \u0421\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u044F \xB7 \u0434\u0430\u0448\u0431\u043E\u0440\u0434 / 1440", "E-70 \u0420\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438 / 1440"],
      ["E-70 \u0420\u0430\u0437\u0431\u043E\u0440 \u0441\u0435\u0441\u0441\u0438\u0438 / 1440", "E-71 \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438 / 1440"]
    ]],
    ["7.6 \u0410\u0434\u043C\u0438\u043D \u2192 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u2192 \u0440\u0435\u0448\u0435\u043D\u0438\u0435", [
      ["E-60 \u041E\u0431\u0437\u043E\u0440 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B / 1440", "E-63 \u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u043E\u0447\u0435\u0440\u0435\u0434\u044C / 1440"],
      ["E-63 \u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u043E\u0447\u0435\u0440\u0435\u0434\u044C / 1440", "E-64 \u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 / 1440"]
    ]]
  ];
  var FLOW_NAMES = FLOWS.map((fl) => fl[0]);
  var FLOW_TOTAL_LINKS = FLOWS.reduce((n, fl) => n + fl[1].length, 0);
  function buildFlows(log) {
    const page = penpot.currentPage;
    const byName = /* @__PURE__ */ new Map();
    try {
      for (const s of page.findShapes()) {
        if (s && typeof s.name === "string" && /^E-\d\d /.test(s.name)) byName.set(s.name, s);
      }
    } catch (_) {
    }
    try {
      for (const fl of page.flows || []) if (FLOW_NAMES.includes(fl.name)) fl.remove();
    } catch (_) {
    }
    let ok = 0;
    for (const [name, steps] of FLOWS) {
      try {
        const start = byName.get(steps[0][0]);
        if (!start) {
          log.push("! \u043F\u043E\u0442\u043E\u043A \xAB" + name + "\xBB: \u043D\u0435\u0442 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u0444\u0440\u0435\u0439\u043C\u0430");
          continue;
        }
        page.createFlow(name, start);
        let linked = 0;
        for (const [from, to] of steps) {
          const a = byName.get(from);
          const b = byName.get(to);
          if (!a || !b) continue;
          try {
            for (const it of a.interactions || []) it.remove();
          } catch (_) {
          }
          a.addInteraction("click", { type: "navigate-to", destination: b });
          linked++;
        }
        log.push("\u2713 \u043F\u043E\u0442\u043E\u043A \xAB" + name + "\xBB: " + linked + " \u0441\u0432\u044F\u0437\u0435\u0439");
        if (linked === steps.length) ok++;
      } catch (e) {
        log.push("\xD7 \u043F\u043E\u0442\u043E\u043A \xAB" + name + "\xBB: " + e);
      }
    }
    log.push("\u043F\u043E\u0442\u043E\u043A\u043E\u0432 \u0433\u043E\u0442\u043E\u0432\u043E: " + ok + " \u0438\u0437 " + FLOWS.length);
  }

  // src/handoff.ts
  var HANDOFF_BOARD_NAME = "13_Handoff / handoff";
  var MOTION = [
    ["150 \u043C\u0441", "fast", "\u0425\u043E\u0432\u0435\u0440\u044B, \u0444\u043E\u043A\u0443\u0441, \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043E\u043A \u2014 ease-out"],
    ["250 \u043C\u0441", "base", "\u0410\u043A\u043A\u043E\u0440\u0434\u0435\u043E\u043D\u044B, \u0442\u0443\u043B\u0442\u0438\u043F\u044B, \u0442\u043E\u0441\u0442\u044B, \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u2014 ease-in-out"],
    ["400 \u043C\u0441", "slow", "\u041C\u043E\u0434\u0430\u043B\u043A\u0438, \u043E\u0432\u0435\u0440\u043B\u0435\u0438, \u0441\u043C\u0435\u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u2014 ease-in-out"],
    ["500 \u043C\u0441", "spring", "\u041F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433\u0430 \u2014 spring (\u043B\u0451\u0433\u043A\u0438\u0439 overshoot)"]
  ];
  var CHANGELOG = [
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 1 \xB7 Foundations", "33 \u0446\u0432\u0435\u0442\u0430 + 10 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439 \u0432 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435; WCAG-\u0430\u0443\u0434\u0438\u0442; \u0441\u0435\u0442\u043A\u0438 4 \u0431\u0440\u0435\u0439\u043A\u043F\u043E\u0438\u043D\u0442\u043E\u0432"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 2 \xB7 UI-kit", "72 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430: \u043A\u043D\u043E\u043F\u043A\u0438, \u043F\u043E\u043B\u044F, \u0447\u0438\u043F\u044B, \u0442\u043E\u0441\u0442\u044B, \u0442\u0430\u0431\u043B\u0438\u0446\u044B; \u0434\u0435\u043C\u043E-\u043F\u043E\u043B\u043E\u0441\u0430 \u0442\u0451\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u044B"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 3 \xB7 Domain", "34 \u0434\u043E\u043C\u0435\u043D\u043D\u044B\u0445 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430: ScenarioCard, GameCard, \u0440\u0430\u0434\u0430\u0440, CodeDisplay, BottomNav\u2026"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 4 \xB7 Auth + \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u044B", "33 \u0444\u0440\u0435\u0439\u043C\u0430 E-01\u2026E-12 \xD7 1440/768/390 (\u0433\u043E\u0441\u0442\u044C, \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433, \u0441\u0442\u0443\u0434\u0435\u043D\u0442)"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 5 \xB7 \u0421\u0438\u043C\u0443\u043B\u044F\u0442\u043E\u0440", "27 \u0444\u0440\u0435\u0439\u043C\u043E\u0432 E-20\u2026E-28: \u0441\u0435\u0441\u0441\u0438\u044F, \u043F\u0430\u0443\u0437\u0430, \u0440\u0430\u0437\u0431\u043E\u0440, \u0440\u0430\u0434\u0430\u0440\u044B, \u0438\u0441\u0442\u043E\u0440\u0438\u044F"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 6 \xB7 \u0418\u0433\u0440\u044B + \u043A\u043B\u0438\u0435\u043D\u0442", "30 \u0444\u0440\u0435\u0439\u043C\u043E\u0432 E-30\u2026E-44: \u0434\u043E\u0441\u0442\u0443\u043F\u044B \u043F\u043E \u043A\u043E\u0434\u0443/\u0441\u0441\u044B\u043B\u043A\u0435, \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0432 \u0442\u0451\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u0435"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 7 \xB7 TMA", "9 \u0444\u0440\u0435\u0439\u043C\u043E\u0432 E-50\u2026E-57, \u0442\u043E\u043B\u044C\u043A\u043E 390, safe areas 56/80, MainButton \u0438 BottomNav"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 8 \xB7 \u0410\u0434\u043C\u0438\u043D\u043A\u0430 + \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u044F", "28 \u0444\u0440\u0435\u0439\u043C\u043E\u0432 E-60\u2026E-73, \u0442\u043E\u043B\u044C\u043A\u043E 1440/1280: \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F, \u0430\u0443\u0434\u0438\u0442 152-\u0424\u0417, \u0440\u0430\u0437\u0431\u043E\u0440\u044B"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 9 \xB7 \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F + \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F\u044B", "18 \u0444\u0440\u0435\u0439\u043C\u043E\u0432 E-80\u2026E-85 + 6 \u043F\u043E\u0442\u043E\u043A\u043E\u0432 createFlow \u0441 15 \u043A\u043B\u0438\u043A-\u0441\u0432\u044F\u0437\u044F\u043C\u0438"],
    ["\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044F 10 \xB7 Handoff", "\u042D\u0442\u043E\u0442 \u0431\u043E\u0440\u0434, \u0441\u043F\u0435\u043A\u0430 10-handoff.html: \u0442\u043E\u043A\u0435\u043D\u044B, Tailwind, \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438, \u0447\u0435\u043A-\u043B\u0438\u0441\u0442"]
  ];
  var NAMING = [
    ["\u0424\u0440\u0435\u0439\u043C\u044B \u044D\u043A\u0440\u0430\u043D\u043E\u0432", "E-XX \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 / 1440 \xB7 768 \xB7 390   (\u043F\u0440\u0438\u043C\u0435\u0440: \xABE-22 \u0421\u0435\u0441\u0441\u0438\u044F / 768\xBB)"],
    ["\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B", "ComponentName / Variant / State   (\u043F\u0440\u0438\u043C\u0435\u0440: \xABButton / primary / hover\xBB)"],
    ["\u0421\u0442\u0438\u043B\u0438 \u0446\u0432\u0435\u0442\u043E\u0432", "color/<\u0433\u0440\u0443\u043F\u043F\u0430>/<\u0440\u043E\u043B\u044C>   (\u043F\u0440\u0438\u043C\u0435\u0440: \xABcolor/accent/primary\xBB)"],
    ["\u0421\u0442\u0438\u043B\u0438 \u0442\u0435\u043A\u0441\u0442\u0430", "text/<\u0440\u043E\u043B\u044C>   (\u043F\u0440\u0438\u043C\u0435\u0440: \xABtext/h2\xBB, \xABtext/mono\xBB)"]
  ];
  function buildHandoffBoard(log) {
    const font = pickFont(FONT_FALLBACKS);
    const SX = 11970 + 2160 + 240;
    const W2 = 1240;
    const M3 = 24;
    const f = openFrame(HANDOFF_BOARD_NAME, SX, 100, W2, 4400);
    try {
      f.resize(W2, 4400);
    } catch (_) {
    }
    let y = M3;
    rect(f, M3, y, 40, 40, "#2563EB", 10);
    txt(f, M3 + 56, y + 2, "Handoff Kit", 22, 700, "#0F172A");
    txt(f, M3 + 56, y + 26, "Platform \xB7 \u043E\u0431\u0443\u0447\u0430\u044E\u0449\u0435-\u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0434\u043B\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u043E\u0432 + \u0438\u0433\u0440\u044B \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432", 13, 400, "#475569");
    txt(f, W2 - 320, y + 6, "\u0422\u0417 v1.0 \xB7 \u0432\u0441\u0435 10 \u0438\u0442\u0435\u0440\u0430\u0446\u0438\u0439 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B", 12, 600, "#16A34A");
    txt(f, W2 - 320, y + 26, "\u0442\u043E\u043A\u0435\u043D\u044B \xB7 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \xB7 \u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \xB7 changelog", 11, 400, "#94A3B8");
    y += 64;
    cardBox(f, M3, y, W2 - 2 * M3, 470, "section / color tokens");
    txt(f, M3 + 20, y + 16, "1 \xB7 \u0426\u0432\u0435\u0442\u043E\u0432\u044B\u0435 \u0442\u043E\u043A\u0435\u043D\u044B", 15, 700, "#0F172A");
    txt(f, M3 + 20, y + 38, "33 \u0441\u0442\u0438\u043B\u044F \u0432 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435 Penpot (color/\u2026) \u2014 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A: tokens/design-tokens.json (DTCG)", 12, 400, "#475569");
    const swW = 132;
    LIGHT_COLORS.forEach((c, i) => {
      const col = i % 8;
      const row = Math.floor(i / 8);
      const sx = M3 + 20 + col * swW;
      const sy = y + 66 + row * 78;
      const sw = rect(f, sx, sy, swW - 14, 30, c.value, 8);
      setStroke(sw, "#E2E8F0", 1, "inner");
      sw.name = "swatch " + c.name;
      txt(f, sx, sy + 36, c.name.replace("color/", ""), 9, 600, "#0F172A");
      txt(f, sx, sy + 50, c.value + " \xB7 " + c.use.slice(0, 18), 8, 400, "#94A3B8");
    });
    const dY = y + 66 + 4 * 78;
    txt(f, M3 + 20, dY - 6, "\u0422\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430 (\u0422\u0417 11.1) \u2014 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430 \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u0438 TMA:", 11, 600, "#475569");
    DARK_COLORS.forEach((c, i) => {
      const sx = M3 + 20 + i * swW;
      const sw = rect(f, sx, dY + 12, swW - 14, 30, c.value, 8);
      setStroke(sw, "#E2E8F0", 1, "inner");
      sw.name = "swatch " + c.name;
      txt(f, sx, dY + 48, c.name.replace("color/dark/", ""), 9, 600, "#0F172A");
      txt(f, sx, dY + 62, c.value, 8, 400, "#94A3B8");
    });
    txt(f, M3 + 740, dY - 6, "\u041A\u043E\u043D\u0442\u0440\u0430\u0441\u0442 \u043F\u0430\u0440 \u0442\u0435\u043A\u0441\u0442/\u0444\u043E\u043D \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D (WCAG 2.1 AA);", 10, 400, "#94A3B8");
    txt(f, M3 + 740, dY + 12, "\u0440\u0438\u0441\u043A\u0438 \u2014 \u0432 foundations/01-foundations.html #wcag.", 10, 400, "#94A3B8");
    y += 470 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 420, "section / type tokens");
    txt(f, M3 + 20, y + 16, "2 \xB7 \u0422\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u2014 Inter, 10 \u0441\u0442\u0438\u043B\u0435\u0439 (text/\u2026)", 15, 700, "#0F172A");
    txt(f, M3 + 20, y + 38, "\u041A\u043E\u0434\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u2014 JetBrains Mono (text/mono). \u0428\u043A\u0430\u043B\u0430 40\u219212 \u0431\u0435\u0437 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u0447\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439.", 12, 400, "#475569");
    TYPE_STYLES.forEach((t, i) => {
      const ty = y + 70 + i * 33;
      txt(f, M3 + 20, ty + 4, t.name, 11, 600, "#2563EB");
      txt(f, M3 + 190, ty + (t.size > 24 ? -2 : 0), t.sample, Math.min(t.size, 22), t.weight, "#0F172A");
      txt(f, W2 - 340, ty + 4, t.size + "/" + t.lineHeight + " \xB7 " + t.weight + " \xB7 " + t.use, 11, 400, "#94A3B8");
    });
    y += 420 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 190, "section / space radius shadow");
    txt(f, M3 + 20, y + 16, "3 \xB7 \u041E\u0442\u0441\u0442\u0443\u043F\u044B, \u0440\u0430\u0434\u0438\u0443\u0441\u044B, \u0442\u0435\u043D\u0438", 15, 700, "#0F172A");
    txt(f, M3 + 20, y + 40, "SPACE (space/1\u20139):", 11, 600, "#475569");
    SPACE.forEach((s, i) => {
      const sx = M3 + 130 + i * 84;
      rect(f, sx, y + 38, Math.min(s, 64), 14, "#2563EB", 4).name = "space/" + (i + 1);
      txt(f, sx, y + 58, String(s), 10, 500, "#0F172A");
    });
    txt(f, M3 + 20, y + 96, "RADIUS:", 11, 600, "#475569");
    RADII.forEach((r, i) => {
      const sx = M3 + 130 + i * 110;
      const rr = rect(f, sx, y + 88, 72, 26, "#EEF0F4", Math.min(r[1], 13));
      setStroke(rr, "#E2E8F0", 1, "inner");
      txt(f, sx, y + 120, r[0].replace("radius/", "") + " " + (r[1] === 9999 ? "\u221E" : r[1]), 9, 500, "#475569");
    });
    txt(f, M3 + 20, y + 156, "SHADOW:", 11, 600, "#475569");
    SHADOWS.forEach((s, i) => {
      const sx = M3 + 130 + i * 150;
      txt(f, sx, y + 150, s[0] + " \xB7 0 " + s[1].y + " " + s[1].b + " / " + s[1].op, 10, 500, "#475569");
    });
    y += 190 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 210, "section / motion");
    txt(f, M3 + 20, y + 16, "4 \xB7 \u0410\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u2014 150 / 250 / 400 / 500 \u043C\u0441", 15, 700, "#0F172A");
    txt(f, M3 + 20, y + 38, "motion/fast \xB7 base \xB7 slow \xB7 spring. \u041A\u0440\u0438\u0432\u044B\u0435: ease-out (0,0,.58,1) \xB7 ease-in-out (.42,0,.58,1) \xB7 spring (.34,1.56,.64,1)", 12, 400, "#475569");
    MOTION.forEach((mrow, i) => {
      const my = y + 70 + i * 32;
      const dur = rect(f, M3 + 20, my, 76, 24, "#EFF6FF", 12);
      dur.name = "motion / " + mrow[1];
      txt(f, M3 + 34, my + 5, mrow[0], 12, 700, "#2563EB");
      txt(f, M3 + 110, my + 5, mrow[1], 11, 600, "#7C3AED");
      txt(f, M3 + 200, my + 5, mrow[2], 12, 400, "#475569");
    });
    y += 210 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 176, "section / naming");
    txt(f, M3 + 20, y + 16, "5 \xB7 \u0418\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 (\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0442\u0442\u0435\u0440\u043D \u0422\u0417)", 15, 700, "#0F172A");
    NAMING.forEach((n, i) => {
      const ny = y + 50 + i * 30;
      txt(f, M3 + 20, ny, n[0], 12, 600, "#0F172A");
      txt(f, M3 + 260, ny, n[1], 12, 400, "#475569");
    });
    y += 176 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 402, "section / changelog");
    txt(f, M3 + 20, y + 16, "6 \xB7 Changelog \u2014 \u0432\u0441\u0435 10 \u0438\u0442\u0435\u0440\u0430\u0446\u0438\u0439", 15, 700, "#0F172A");
    CHANGELOG.forEach((c, i) => {
      const cy2 = y + 48 + i * 34;
      const num = rect(f, M3 + 20, cy2, 22, 22, i === 9 ? "#16A34A" : "#EEF0F4", 11);
      num.name = "changelog / " + (i + 1);
      txt(f, M3 + 26, cy2 + 4, String(i + 1), 11, 700, i === 9 ? "#FFFFFF" : "#475569");
      txt(f, M3 + 56, cy2 + 3, c[0], 12, 600, "#0F172A");
      txt(f, M3 + 340, cy2 + 3, c[1], 11, 400, "#475569");
    });
    y += 402 + 16;
    cardBox(f, M3, y, W2 - 2 * M3, 236, "section / handoff process");
    txt(f, M3 + 20, y + 16, "7 \xB7 \u041A\u0430\u043A \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443", 15, 700, "#0F172A");
    const steps = [
      ["inspect", "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0441\u043B\u043E\u0439 \u2192 \u043F\u0440\u0430\u0432\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C: \u0440\u0430\u0437\u043C\u0435\u0440\u044B, \u0441\u0442\u0438\u043B\u0438 \u0443\u0436\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u043A color/\u2026 \u0438 text/\u2026"],
      ["\u0442\u043E\u043A\u0435\u043D\u044B", "tokens/design-tokens.json (DTCG) + tokens/tokens.css \u2192 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435; Tailwind-\u043C\u0430\u043F\u043F\u0438\u043D\u0433 \u2014 \u0441\u043F\u0435\u043A\u0430 10"],
      ["\u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438", "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 motion (150/250/400/500 + \u043A\u0440\u0438\u0432\u044B\u0435) \u2014 \u0441\u043F\u0435\u043A\u0430 10, \u0440\u0430\u0437\u0434\u0435\u043B 4"],
      ["\u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F\u044B", "\u0420\u0435\u0436\u0438\u043C Present: 6 \u043F\u043E\u0442\u043E\u043A\u043E\u0432 7.1\u20137.6 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B (navigate-to)"],
      ["\u043F\u0440\u0438\u0451\u043C\u043A\u0430", "\u0427\u0435\u043A-\u043B\u0438\u0441\u0442\u044B docs/03-checklists.md; WCAG \u2014 foundations/01 #wcag; \u0442\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430 \u0432 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445"]
    ];
    steps.forEach((s, i) => {
      const sy = y + 48 + i * 36;
      const tag = rect(f, M3 + 20, sy, 110, 26, "#F5F3FF", 13);
      tag.name = "handoff-step / " + s[0];
      txt(f, M3 + 32, sy + 6, s[0], 11, 700, "#7C3AED");
      txt(f, M3 + 150, sy + 6, s[1], 12, 400, "#475569");
    });
    y += 236 + 16;
    const fin = rect(f, M3, y, W2 - 2 * M3, 44, "#F0FDF4", 10);
    fin.name = "final-note";
    ic(f, "badge-check", M3 + 16, y + 13, 18, "#16A34A");
    txt(f, M3 + 44, y + 8, "149 \u0431\u043E\u0440\u0434\u043E\u0432: 3 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 + 145 \u044D\u043A\u0440\u0430\u043D\u043E\u0432 E-01\u2026E-85 + \u044D\u0442\u043E\u0442 \u0431\u043E\u0440\u0434 \xB7 106 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \xB7 6 \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F\u043E\u0432", 12, 600, "#166534");
    txt(f, M3 + 44, y + 26, "9 HTML-\u0441\u043F\u0435\u043A \u0432 screens/ \xB7 \u0442\u043E\u043A\u0435\u043D\u044B \u0432 tokens/ \xB7 \u043F\u043B\u0430\u0433\u0438\u043D Platform Builder v1.0 (\u0438\u0434\u0435\u043C\u043F\u043E\u0442\u0435\u043D\u0442\u0435\u043D)", 11, 400, "#15803D");
    try {
      f.resize(W2, y + 44 + M3);
    } catch (_) {
    }
  }

  // src/plugin.ts
  function main() {
    const problems = [];
    let colorsCreated = 0;
    let textOk = 0;
    try {
      const page = penpot.currentPage;
      const r1 = removeShapesByName(page, "01_Foundations / audit");
      const r2 = removeShapesByName(page, "02_Components / UI-kit");
      const r3 = removeShapesByName(page, "03_Patterns / Domain");
      let rS = 0;
      for (const nm of SCREEN_FRAME_NAMES) rS += removeShapesByName(page, nm);
      for (const nm of SCREEN2_FRAME_NAMES) rS += removeShapesByName(page, nm);
      for (const nm of SCREEN3_FRAME_NAMES) rS += removeShapesByName(page, nm);
      for (const nm of SCREEN4_FRAME_NAMES) rS += removeShapesByName(page, nm);
      for (const nm of SCREEN5_FRAME_NAMES) rS += removeShapesByName(page, nm);
      for (const nm of SCREEN6_FRAME_NAMES) rS += removeShapesByName(page, nm);
      rS += removeShapesByName(page, HANDOFF_BOARD_NAME);
      if (r1 || r2 || r3 || rS) problems.push("\u2139 \u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0440\u0430\u043D\u043E \u0444\u0440\u0435\u0439\u043C\u043E\u0432: " + (r1 + r2 + r3 + rS));
    } catch (_) {
    }
    try {
      colorsCreated = createColorStyles(problems);
    } catch (e) {
      problems.push("\xD7 \u0446\u0432\u0435\u0442\u043E\u0432\u044B\u0435 \u0441\u0442\u0438\u043B\u0438: " + e);
    }
    try {
      textOk = createTextStyles(problems);
    } catch (e) {
      problems.push("\xD7 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u0442\u0438\u043B\u0438: " + e);
    }
    try {
      buildFoundationsBoard(colorsCreated, textOk, problems, pickFont(FONT_FALLBACKS));
    } catch (e) {
      problems.push("\xD7 \u0431\u043E\u0440\u0434 Foundations: " + e);
    }
    try {
      buildUIKitBoard(problems);
    } catch (e) {
      problems.push("\xD7 \u0431\u043E\u0440\u0434 UI-kit: " + e);
    }
    try {
      buildDomainBoard(problems);
    } catch (e) {
      problems.push("\xD7 \u0431\u043E\u0440\u0434 Domain: " + e);
    }
    try {
      buildScreens(problems);
    } catch (e) {
      problems.push("\xD7 \u044D\u043A\u0440\u0430\u043D\u044B: " + e);
    }
    try {
      buildScreens2(problems);
    } catch (e) {
      problems.push("\xD7 \u044D\u043A\u0440\u0430\u043D\u044B \u0441\u0438\u043C\u0443\u043B\u044F\u0442\u043E\u0440\u0430: " + e);
    }
    try {
      buildScreens3(problems);
    } catch (e) {
      problems.push("\xD7 \u044D\u043A\u0440\u0430\u043D\u044B \u0438\u0433\u0440/\u043A\u043B\u0438\u0435\u043D\u0442\u0430: " + e);
    }
    try {
      buildScreens4(problems);
    } catch (e) {
      problems.push("\xD7 TMA \u044D\u043A\u0440\u0430\u043D\u044B: " + e);
    }
    try {
      buildScreens5(problems);
    } catch (e) {
      problems.push("\xD7 \u044D\u043A\u0440\u0430\u043D\u044B \u0430\u0434\u043C\u0438\u043D\u043A\u0438/\u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u0438\u0438: " + e);
    }
    try {
      buildScreens6(problems);
    } catch (e) {
      problems.push("\xD7 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F: " + e);
    }
    try {
      buildHandoffBoard(problems);
    } catch (e) {
      problems.push("\xD7 Handoff: " + e);
    }
    try {
      buildFlows(problems);
    } catch (e) {
      problems.push("\xD7 \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F\u044B: " + e);
    }
  }
  main();
})();
