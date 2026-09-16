# Storybook-заготовка Platform Design (P1)

Пять ключевых компонентов в живом коде — по спеке `uikit/02-components.html`,
все стили только на дизайн-токенах (`tokens/tokens.css` + `tokens/motion.css`).
Задача пункта P1 — задать формат и связку «токен → компонент → story»,
не строить весь каталог (72 UI-kit + domain-компоненты — при старте фронтенда, см. `docs/07`).

## Запуск

```bash
cd storybook
npm install
npm run storybook     # http://localhost:6006
```

## Покрытие

| Story | Компонент | Экраны-референсы |
|---|---|---|
| `UI Kit/Button` | primary/secondary/ghost/danger · 32/40/48px · full | все |
| `UI Kit/Input` | label/hint/error/disabled, focus-ring 2px | E-03, E-04, E-63 |
| `Domain/ScenarioCard` | сложность (1–3), длительность, навыки, прогресс | E-20, E-21 |
| `Domain/GameCard` | статусы новая / в процессе (N/M) / завершена | E-30, E-52 |
| `Domain/EmotionIndicator` | шкала 0–10, зоны low/mid/high | E-22, E-25, E-54, E-55 |

## Правила

1. **Ни одного «сырого» значения** — цвета/радиусы/длительности только через
   `var(--color-*)`, `var(--size-*)`, `var(--motion-*)`. Новое значение = новый
   токен в `tokens/design-tokens.json`, не хардкод.
2. Микровзаимодействия — утилитами из `tokens/motion.css` (`.m-lift`, `.m-press`, `.m-grow-x`).
3. Stories в формате CSF3 + `tags: ['autodocs']`; control-аргументы повторяют
   проп-модели из `docs/08` (раздел «Сущности»).
4. Проверка сборки перед коммитом: `npm run build` ( Storybook строит статику без запуска dev-сервера).

## Связь с репозиторием

- Спека композиций и состояний: `uikit/02-components.html` (источник разметки).
- Токены: `tokens/design-tokens.json` (W3C DTCG) → `tokens/tokens.css` → пресет `tokens/tailwind.config.preset.js`.
- Оценка полного ui-kit: `docs/07`, раздел P2.
