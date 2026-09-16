# 01 · Настройка Penpot с нуля

> Penpot ещё не заведён — здесь два пути. Оба поддерживают design tokens и плагины.

---

## Вариант A: Penpot Cloud — старт за 5 минут

1. Зайти на **https://design.penpot.app** → Sign up (бесплатно, без лимитов проектов).
2. Создать команду (Team) — например **Platform**.
3. Внутри команды создать **проект** «Platform Design».
4. Дальше по `docs/02-workflow-iteration-1.md`.

⚠️ Данные лежат на серверах Penpot (ЕС). Для персональных данных клиентов психологов
это ок (дизайн-макеты ≠ персданные), но если политика компании строгая — вариант Б.

## Вариант B: Self-hosted на VPS — контроль данных (152-ФЗ)

Минимальный compose-стек: frontend + backend + PostgreSQL + Redis.
Требования: VPS 2 vCPU / 4 GB RAM / 20 GB, Docker + docker-compose.

```yaml
# docker-compose.yml — базовый рабочий каркас.
# Перед продом сверить флаги с официальной инструкцией:
# https://help.penpot.app/technical-guide/configuration/
services:
  penpot-frontend:
    image: penpotapp/frontend:latest
    ports:
      - "9001:80"                      # веб-интерфейс
    depends_on:
      - penpot-backend
    environment:
      PENPOT_PUBLIC_URI: https://penpot.example.com   # или http://VPS_IP:9001
      PENPOT_BACKEND_URI: http://penpot-backend:6060

  penpot-backend:
    image: penpotapp/backend:latest
    depends_on:
      - penpot-postgres
      - penpot-redis
    environment:
      PENPOT_PUBLIC_URI: https://penpot.example.com
      PENPOT_FLAGS: enable-login-with-email disable-email-verification disable-telemetry
      PENPOT_SECRET_KEY: # сгенерировать: openssl rand -base64 48
      PENPOT_DATABASE_URI: postgresql://penpot-postgres/penpot
      PENPOT_DATABASE_USERNAME: penpot
      PENPOT_DATABASE_PASSWORD: change-me-strong
      PENPOT_REDIS_URI: redis://penpot-redis/0
      PENPOT_ASSETS_STORAGE_BACKEND: assets-fs
      PENPOT_STORAGE_ASSETS_FS_DIRECTORY: /opt/data/assets
      PENPOT_TELEMETRY_ENABLED: "0"
    volumes:
      - penpot-assets:/opt/data/assets

  penpot-postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: penpot
      POSTGRES_PASSWORD: change-me-strong
      POSTGRES_DB: penpot
    volumes:
      - penpot-pg:/var/lib/postgresql/data

  penpot-redis:
    image: redis:7-alpine

volumes:
  penpot-assets:
  penpot-pg:
```

Запуск: `docker compose up -d` → открыть `http://VPS_IP:9001` → создать админа.

Рекомендации:
- Домен + HTTPS (Caddy/nginx + Let's Encrypt) — плагины и внешние ссылки требуют не-контекст `https` для публичных URL.
- Бэкапить том `penpot-pg` (pg_dump по cron) — история версий и библиотеки живут там.
- Включить 2FA у всех редакторов; роли Editor/Viewer — по ТЗ 12.2.

---

## После установки: три обязательных шага

### 1. Импорт токенов (нативно)

Penpot первой среди инструментов поддерживает W3C Design Tokens:
1. Открыть любой файл → меню **Tools → Tokens** (вкладка токенов).
2. **Import** → выбрать `tokens/design-tokens.json`.
3. Появятся сеты: color, typography, space, radius, shadow, motion, easing, sizing.

Экспорт обратно для разработчиков: **Tools → Tokens → Export** (тот же DTCG JSON) —
или использовать готовый `tokens/tokens.css` + Tailwind-пример внутри него.

### 2. Подключение плагина Platform Builder (v0.2)

Плагин сам создаёт **33 цветовых стиля + 10 текстовых стилей** и борд-аудит
Foundations (см. `plugin/README.md` — три способа хостинга):

1. Собрать/получить URL манифеста: `…/dist/manifest.json`.
2. В Penpot: меню → **Plugins → Plugin manager** (или `Ctrl/Cmd + Alt + P`).
3. Вставить URL манифеста → Install → запустить плагин из меню Plugins.
4. Плагин отработает на текущей странице: добавит стили в **Assets → Colors/Typographies**
   и построит борд `01_Foundations / audit`.

Разрешения, которые запросит плагин: `content:read/write`, `library:read/write` —
это создание стилей и фигур, без доступа к чему-либо ещё.

### 3. Структура проекта и библиотек (ТЗ 2.1–2.2)

Проект **Platform Design**, страницы:

```
00_Cover · 01_Foundations · 02_Components · 03_Patterns · 04_Flows
05_Web_Psychologist · 06_Web_Student · 07_Web_Supervisor · 08_Web_Admin
09_MiniApp · 10_Client_Game · 11_States · 12_Prototypes · 13_Handoff
```

Библиотеки: **Platform Core** (токены + UI-kit) и **Platform Illustrations**
(иконки Lucide из `icons/lucide/`, иллюстрации-плейсхолдеры) — опубликовать
как shared libraries (меню Assets → Publish library).

Шрифты: Inter + JetBrains Mono. В cloud доступны сразу; в self-hosted —
загружаются на стороне экспортёра (см. docs Penpot → Fonts).
