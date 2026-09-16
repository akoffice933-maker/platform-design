# Platform Design v1.0

Дизайн-система **«обучающе-симуляционной платформы для психологов + терапевтических
игр для клиентов»**, выполненная по ТЗ v1.0 в экосистеме Penpot:
токены (W3C DTCG) → UI-kit → доменные компоненты → 145 экранов (E-01…E-85) →
6 кликабельных прототипов → Handoff. Два продукта (симулятор + игры), три контекста
(web 1440/768/390 · Telegram Mini App 390 · админка 1440/1280), шесть ролей, WCAG 2.1 AA.

## Быстрый старт: плагин в Penpot за 5 минут

1. Включите GitHub Pages: **Settings → Pages → Branch `main` / `(root)` → Save**.
2. URL манифеста плагина:
   `https://<ВАШ_ЛОГИН>.github.io/<ИМЯ_РЕПО>/penpot-plugin/manifest.json`
3. Penpot → меню → **Plugins → Plugin manager** (`Ctrl/Cmd + Alt + P`) → вставьте URL → **Install**.
4. Откройте файл проекта → чистую страницу → **Plugins → Platform Builder → Run**.

Плагин создаст **149 бордов**: `01_Foundations`, `02_Components` (72 компонента),
`03_Patterns` (34), экраны **E-01…E-85** (web ×1440/768/390 · TMA ×390 · админка ×1440/1280),
борд `13_Handoff` и **6 кликабельных потоков** (режим Present). В библиотеку лягут
43 стиля и 106 компонентов. Повторные запуски **идемпотентны** — ничего не дублируется.

Подробная инструкция (хостинг, передача заказчику, known issues): **[README-УСТАНОВКА.md](README-УСТАНОВКА.md)**

## Структура репозитория

```
├── penpot-plugin/        # ХОСТИНГ ДЛЯ PENPOT: manifest.json + plugin.js + icon.svg
├── plugin-src/           # Исходники плагина (TypeScript)
├── tokens/               # design-tokens.json (DTCG) + tokens.css + motion.css + tailwind-пресет
├── docs/                 # 01 установка Penpot · 02 workflow · 03 чек-листы
│                         # 04 юристу (152-ФЗ) · 05 методисту · 06 матрица ТЗ
│                         # 07 план доработок · 08 фронтенду · 09 схема сценария
│                         # 10 motion · 11 графики
├── foundations/ uikit/ patterns/ screens/   # 10 HTML-спек (открываются на Pages)
├── schemas/ scenarios/   # JSON-контракт сценария + эталон «Тревога перед экзаменом»
├── storybook/            # Заготовка: 5 компонентов в живом коде (npm run storybook)
├── charts/               # RadarSkills.jsx (recharts) + SVG-референс радара
├── icons/lucide/         # 76 иконок Lucide v0.544
└── tools/                # Генераторы спек, валидатор сценариев, смоук-тест
```

## Спеки (после включения Pages доступны по ссылкам)

| Спека | Содержимое |
|---|---|
| [foundations/01](foundations/01-foundations.html) | 33 цвета, Inter-шкала, WCAG-аудит |
| [uikit/02](uikit/02-components.html) | 72 компонента со состояниями |
| [patterns/03](patterns/03-domain.html) | 34 доменных компонента |
| [screens/04](screens/04-auth-dashboard.html) | E-01…E-12 · auth + дашборды |
| [screens/05](screens/05-simulator.html) | E-20…E-28 · симулятор сессий |
| [screens/06](screens/06-games-client.html) | E-30…E-44 · игры + клиент (тёмная тема) |
| [screens/07](screens/07-tma.html) | E-50…E-57 · Telegram Mini App |
| [screens/08](screens/08-admin-supervision.html) | E-60…E-73 · админка + супервизия |
| [screens/09](screens/09-states-prototypes.html) | E-80…E-85 · состояния + 6 потоков |
| [screens/10](screens/10-handoff.html) | Handoff Kit: токены, Tailwind, анимации |

## Документы организационных шагов

- **docs/03-checklists.md** — чек-листы всех итераций (открытые пункты помечены `[ ]`)
- **docs/04-юристу-152фз.md** — что учтено в дизайне + 7 открытых вопросов (РКН, локализация БД, Telegram…)
- **docs/05-методисту-тексты.md** — шаблоны текстов с лимитами символов из макетов

## Сборка плагина из исходников

```bash
cd plugin-src
npm install
npm run typecheck && npm run build   # → dist/plugin.js
# заменить penpot-plugin/plugin.js и запушить — Penpot подхватит при следующем запуске
```

## Статус

Все 10 итераций ТЗ v1.0 выполнены (см. docs/02-workflow — приложения по каждой).
Остались организационные пункты: перенос в аккаунт заказчика, юрист (152-ФЗ),
реальные тексты методиста — полный список в docs/03.

---
*Лицензия не назначена: права на дизайн и код передаются заказчику по договору.*
