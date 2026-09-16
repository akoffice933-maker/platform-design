# Инструменты сборки

Генераторы HTML-спек и смоук-тест плагина. Скрипты ожидают запуск из корня проекта (рядом с icons/, screens/):

```bash
cp tools/*.py . && mkdir -p tests && cp tools/mock-penpot-test.cjs tests/
python3 build_screens10.py        # пересборка спеки
node tests/mock-penpot-test.cjs   # смоук плагина (нужен dist/plugin.js)
```

Плагин: `cd plugin-src && npm install && npm run build` → обновить penpot-plugin/.
