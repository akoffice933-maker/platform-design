# 10 · Motion: кодовая спека анимаций (P1)

Закрывает пункт аудита «анимации есть токенами, нет в CSS». Источник истины —
`tokens/design-tokens.json` (группы `motion`, `easing`); этот документ описывает
применение `tokens/motion.css` и одноимённых значений из tailwind-пресета.

## 1. Токены

| Токен | Значение | Кривая | Применение |
|---|---|---|---|
| `motion/fast` | 150ms | ease-out `(0, 0, 0.58, 1)` | ховеры, фокус, нажатие |
| `motion/base` | 250ms | ease-in-out `(0.42, 0, 0.58, 1)` | переходы, модалки, тултипы |
| `motion/slow` | 400ms | ease-in-out | крупные переходы (панели, колонки) |
| `motion/spring` | 500ms | spring `(0.34, 1.56, 0.64, 1)` | появление карточек, результаты |
| — | 1600ms loop | ease-in-out | пульс скелетонов (E-80) |

CSS-переменные: `--motion-fast/base/slow/spring`, `--ease-out/ease-in-out/spring`
(объявлены в `tokens/tokens.css`, keyframes и утилиты — в `tokens/motion.css`).

## 2. Утилиты motion.css

| Класс | Анимация | Типовой экран |
|---|---|---|
| `.m-fade-in` / `.m-fade-out` | прозрачность 250ms | тултипы, оверлеи |
| `.m-slide-up` | снизу 12px, 500ms ease-out | карточки библиотеки, списки сессий |
| `.m-slide-right` / `.m-slide-left` | 24px по X, 250ms | **смена шагов сценария** (вперёд/назад) |
| `.m-scale-in` | 0.96→1, 150ms | модалки, поповеры |
| `.m-spring-pop` | 0.9→1.02→1, 500ms spring | карточки игр, «Результат» (E-54, E-43) |
| `.m-skeleton` | пульс 1.6s | E-80 «Загрузка» (все скелетон-блоки) |
| `.m-grow-x` | scaleX 0→1, 400ms | прогресс шага, шкалы эмоций, bar-чарты |
| `.m-press` | active: scale(0.97), 150ms | все кнопки, option-строки choice |
| `.m-lift` | hover: −2px + shadow-md, 150ms | карточки в каталогах (E-20, E-30) |
| `.m-focusable` | focus-visible: ring 2px accent | вся интерактивная триггер-зона |
| `.m-stagger > *` | slide-up + задержка 40ms×n | списки (до 8 элементов, дальше без стаггера) |

Пример — переход шага симулятора:

```html
<!-- рендер нового шага: направление зависит от порядка -->
<section class="m-slide-right"> …question + options… </section>
```

```css
.answer-option { transition: transform var(--motion-fast) var(--ease-out); }
.answer-option:active { transform: scale(0.97); } /* = .m-press */
```

## 3. Подключение

1. **CSS**: `@import './tokens.css'; @import './motion.css';`
2. **Tailwind**: пресет `tokens/tailwind.config.preset.js` уже маппит
   `duration-fast/base/slow/spring` и `ease-out/ease-in-out/ease-spring` —
   связка `class="transition duration-fast ease-spring"` эквивалентна утилитам.
3. **Инлайн**: `style="transition: opacity var(--motion-base) var(--ease-in-out)"`.

## 4. Правила

- **Один смысл — одна длительность.** Не вводить новых durations: любые
  анимации собираются из четырёх токенов и трёх кривых.
- **Spring — только на появление.** Пружинная кривая перелетает через 1.0;
  для исчезновений и перемещений использовать ease-out / ease-in-out.
- **Движение ≤ 24px** для входов, чтобы контент не «плавал» (симулятор — рабочая
  среда, не лендинг).
- **ТMA:** анимации не блокируют MainButton; скелетоны E-80 обязательны вместо
  спиннеров (Telegram-контекст чувствителен к «подвисаниям»).
- **Игры (дыхание и т.п.):** циклические анимации техник — отдельная логика
  шага (timer-узлы сценария, см. `docs/09`), motion.css их не описывает.

## 5. Доступность

`@media (prefers-reduced-motion: reduce)` в конце motion.css гасит все анимации
и переходы автоматически (0.01ms, iteration-count: 1). Дополнительно:

- стаггер дольше 360ms не наращивать (последний элемент ждёт < 0.5с);
- ничего критичного для понимания UI не должно существовать только в анимации
  (прогресс шага дублируется текстом «ШАГ 3 ИЗ 6»);
- focus-ring не анимируется по transform — только box-shadow (не «прыгает»).

## 6. Статус

- [x] `tokens/motion.css` — keyframes, утилиты, reduced-motion
- [x] Маппинг в tailwind-пресете (`duration-*`, `ease-*`)
- [ ] Подключение в пилотном приложении (спринт 0, `docs/08`)
