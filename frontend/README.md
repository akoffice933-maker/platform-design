# Platform · Фронтенд (v0.1)

Рабочий фронтенд всей платформы на стеке из `docs/08`: **React 18 + Vite + TypeScript +
Tailwind** (пресет дизайн-токенов из корня репо) + **recharts**. Данные — мок-API
в `src/lib/api.ts` с персистом в localStorage; сигнатуры совпадают с будущим бэкендом.

## Запуск

**Живое демо (Pages, HashRouter):** https://akoffice933-maker.github.io/platform-design/app/

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 (BrowserRouter)
npm run build:demo # сборка для Pages → dist (base /platform-design/app/, HashRouter)
```

Деплой демо: `npm run build:demo`, затем заменить каталог `app/` в корне репо содержимым `dist/`.
CI (`.github/workflows/ci.yml`) проверяет: сценарии (docs/09), сборку плагина + smoke 151 борд + свежесть бандла, tsc + vite build фронтенда.

`predev`/`prebuild` синхронизируют артефакты дизайн-системы из корня репо
(`tokens/tokens.css`, `tokens/motion.css`, эталонный сценарий `scenarios/exam-anxiety.json`).

## Что внутри

| Зона | Маршруты | Экраны ТЗ |
|---|---|---|
| Лендинг, вход/регистрация | `/`, `/login`, `/register` | E-01, E-03, E-04 |
| Кабинет психолога | `/app`, `/app/scenarios`, `/app/history`, `/app/progress` | E-10, E-20, E-27, E-28 |
| **Симулятор сессии** | `/app/session/exam-anxiety` | E-22 · настоящий рантайм docs/09: choice/critical/scale/timer/input, ветвления (option.next + branch.emotionAtLeast), баллы 8 навыков |
| **Разбор сессии** | `/app/debrief/:id` | E-25 · радар (recharts), дельты навыков, сильные стороны/зоны роста |
| Клиент веб | `/client`, `/client/game/breathing` | E-30, E-40–E-43 · дыхание 4-7-8 с анимацией, доступ по коду `DEMO-2026` |
| **Telegram Mini App** | `/tma` | E-50…E-57 + **E-53o offline**: телефон 390×844, тёмная тема, safe-area; тумблер «сеть» показывает экран «Нет соединения» |
| Админ | `/admin` | E-63/E-64 (верификация с чек-листом) + аудит-лог E-66 |
| Супервизор | `/supervisor`, `/supervisor/review/:id` | E-68, E-70–E-73 · хронология шагов реальной сессии, комментарии |
| Стейты | `/states` | E-80…E-85 |

## Архитектура

- `src/lib/engine.ts` — рантайм сценария по контракту `schemas/scenario.schema.json`:
  `startRun / nodeOf / applyOption / advance / evalBranch / buildResult`.
  Прогресс = `RunState.nodeId` → возобновление сессии бесплатно (docs/09, гайд бэкенду).
- `src/lib/api.ts` — мок-API (сессии, клиенты, верификации, аудит, дневник, игры,
  комментарии). Замена на реальный бэкенд — правкой только этого файла.
- `src/components/` — UI-кит на токенах (`ui.tsx`), Shell с демо-переключателем ролей,
  графики (`charts.tsx`: радар/линия/бары по docs/11 — только токены, 0–10).
- Стили — только классы токенов: `bg-*`, `ink`, `line`, `accent`, `ok/warn/err`,
  `emo-*`, `skill-*`, типографика `text-h1…caption`, motion `duration-fast`,
  `ease-platform-out`, анимации `m-*` из `tokens/motion.css`.

## Сборка

```bash
npm run build       # vite build → dist/
npm run typecheck   # tsc --noEmit
```
