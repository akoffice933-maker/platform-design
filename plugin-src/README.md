# Platform Builder — плагин для Penpot (v0.2)

Создаёт в открытом файле Penpot:
1. **33 цветовых стиля** — `color/bg/*`, `color/text/*`, `color/border/*`, `color/accent/*`,
   `color/semantic/*`, `color/emotion/*`, `color/skill/*` (28) + `color/dark/*` (5).
2. **10 текстовых стилей** — `text/display … text/mono` (Inter; mono — JetBrains Mono, с фолбэками).
3. **Борд-аудит `01_Foundations / audit`** — свотчи, типографика, spacing, радиусы, тени, сетки.
4. **Борд `02_Components / UI-kit` + 72 компонента** (Итерация 2, ТЗ 4.1/6.1):
   Button (5 вариантов × 6 состояний + sm/lg + icon), Input (6 видов), Select (3),
   Checkbox (5 состояний), Radio, Switch, Chip (нейтральные/семантика/навыки),
   Avatar, Tooltip, Modal, Toast ×4, Progress (linear/circular/steps), Tabs ×2,
   Accordion ×2, Table, Skeleton. Нейминг — `Name / Variant / State` (ТЗ 9.3).
   Иконки Lucide импортируются как векторы через `createShapeFromSvg`.

Плагин **идемпотентен**: стили обновляются, борды пересобираются, компоненты не дублируются.

## Установка в Penpot (Plugin manager)

Открыть Penpot → меню → **Plugins → Plugin manager** (`Ctrl/Cmd+Alt+P`) →
вставить URL манифеста → Install → запустить из меню Plugins.

## Где хостить манифест (3 способа)

### Способ 1 — локально на своём компьютере (быстрее всего)
```bash
cd plugin/dist
npx serve -l 4400 .          # или: python3 -m http.server 4400
```
В Plugin manager вставить: `http://localhost:4400/manifest.json`

### Способ 2 — GitHub Pages (постоянная ссылка для команды)
```bash
# в репозитории: скопировать plugin/dist/* в папку docs/ (или ветку gh-pages)
git add dist && git commit -m "plugin v0.1" && git push
# Settings → Pages → deploy from branch
```
URL: `https://<user>.github.io/<repo>/manifest.json`

### Способ 3 — попросить агента поднять сервер
В этой рабочей среде можно поднять статический сервер с папкой `plugin/dist` —
манифест будет доступен по публичному preview-URL. Запросите: «подними сервер плагина».

## Разработка

```bash
cd plugin
npm install
npm run typecheck   # проверка типов
npm run build       # esbuild → dist/plugin.js
cd .. && node tests/mock-penpot-test.cjs   # смоук-тест против мока Penpot API (23 проверки)
```

Используемый API (проверено по @penpot/plugin-types):
`penpot.library.local.createColor/createTypography/createComponent`,
`penpot.createBoard/createRectangle/createEllipse/createText/createShapeFromSvg`,
`penpot.fonts.findByName`, `penpot.currentPage.findShapes` (идемпотентность).
Разрешения манифеста: content:read/write, library:read/write.

Структура исходников: `plugin.ts` (вход) → `foundations.ts` (стили + борд 01) →
`uikit.ts` (борд 02 + компоненты) → `draw.ts` (хелперы рисования) →
`tokens-data.ts` (токены ТЗ) → `icons.ts` (Lucide, автогенерирован).

## Дорожная карта плагина

- ~~v0.2 (Итерация 2): UI-kit~~ — готово (72 компонента)
- ~~v0.3 (Итерация 3): доменные компоненты~~ — готово (+33, итого 106; радар и QR — SVG-плейсхолдеры)
- ~~v0.4 (Итерация 4): экраны E-01…E-12~~ — готово (33 фрейма 1440/768/390, адаптив по ТЗ 6.3,
  координаты через setOrigin — absolute canvas в Penpot API)
- ~~v0.5 (Итерация 5): симулятор E-20…E-28~~ — готово (+27 фреймов: библиотека, сессия,
  свободный ввод, пауза, разбор, история, прогресс; line chart — SVG-плейсхолдер)
- ~~v0.6 (Итерация 6): игры + клиент E-30…E-44~~ — готово (+30 фреймов, итого 93;
  клиентские экраны — тёмная тема по ТЗ 11.1; 4 типа шагов + 3 причины ошибки)
- ~~v0.7 (Итерация 7): TMA E-50…E-57~~ — готово (+9 фреймов, итого 99; только 390×844,
  тёмная тема, safe areas: шапка Telegram 56 / MainButton·BottomNav 80; состояние disabled)
- ~~v0.8 (Итерация 8): админка + супервизия~~ — готово (+28 фреймов, итого 127; только
  1440/1280; свои сайдбары ролей «админ»/«супервизор», AuditLogRow/SupervisionComment в экранах)
- ~~v0.9 (Итерация 9): состояния + прототипы~~ — готово (+18 фреймов E-80…E-85 ×3,
  итого 145; 6 потоков ТЗ 7.1–7.6: `createFlow` + клик-переходы `navigate-to`, 15 связей;
  идемпотентность: пересоздание фреймов чистит взаимодействия, потоки сносятся по именам)
- ~~v1.0 (Итерация 10, финал): Handoff~~ — готово (+борд «13_Handoff / handoff»: токены,
  типографика, шкалы, motion, именование, changelog ×10, процесс передачи). **Итого: 149
  бордов = 3 контента + 145 экранов E-01…E-85 + Handoff; 106 компонентов; 6 потоков.**

## Известные ограничения

- Описания (`$description`) токенов в color styles Penpot не переносятся —
  они живут в `design-tokens.json` и на борде-аудите.
- Если в self-hosted инстансе нет Inter, плагин берёт первый доступный фолбэк
  и пишет предупреждение на борде. Установите Inter и перезапустите.
- Токен-сеты (Tools → Tokens) плагин не создаёт — они импортируются нативно
  из `tokens/design-tokens.json`.
