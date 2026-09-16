#!/usr/bin/env python3
"""Собирает screens/05-simulator.html: 9 экранов симулятора (E-20…E-28) × 3 брейкпоинта.
Разметка одна, адаптив — container queries (ТЗ 6.3). Шаблоны с макросами __X__,
иконки/радар/график подставляются на финальном проходе."""
import os, re, math

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '05-simulator.html')

def icon(name, size, color, extra=''):
    s = open(os.path.join(ROOT, 'icons', 'lucide', f'{name}.svg')).read()
    s = re.sub(r'<\?xml[^>]*\?>', '', s)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S).strip()
    s = re.sub(r'\s+', ' ', s)
    s = s.replace('width="24"', f'width="{size}"').replace('height="24"', f'height="{size}"')
    s = s.replace('stroke="currentColor"', f'stroke="{color}"')
    if extra:
        s = s.replace('<svg', f'<svg {extra}', 1)
    return s

def radar_svg(size=210):
    SK = [('Слушание', 86), ('Эмпатия', 72), ('Границы', 64), ('Эмоции', 58),
          ('Структура', 77), ('Сопрот.', 49), ('Вопросы', 81), ('Рефлексия', 68)]
    cx, cy, R = size/2, size/2+8, size/2-30
    def pt(i, r):
        a = -math.pi/2 + i*math.pi/4
        return (round(cx+r*math.cos(a),1), round(cy+r*math.sin(a),1))
    parts = []
    for lv in (0.25, 0.5, 0.75, 1.0):
        pts = ' '.join(f'{pt(i,R*lv)[0]},{pt(i,R*lv)[1]}' for i in range(8))
        parts.append(f'<polygon points="{pts}" fill="{"#F8FAFC" if lv==1 else "none"}" stroke="#E2E8F0"/>')
    for i in range(8):
        px, py = pt(i, R)
        parts.append(f'<line x1="{cx}" y1="{cy}" x2="{px}" y2="{py}" stroke="#E2E8F0"/>')
    data = ' '.join(f'{pt(i,R*s[1]/100)[0]},{pt(i,R*s[1]/100)[1]}' for i, s in enumerate(SK))
    parts.append(f'<polygon points="{data}" fill="#2563EB" fill-opacity=".18" stroke="#2563EB" stroke-width="2"/>')
    return f'<svg width="{size}" height="{int(size*0.95)}" viewBox="0 0 {size} {int(size*0.95)}" fill="none" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'

def line_chart(w=420, h=140):
    pts = [58, 61, 60, 64, 66, 65, 69, 70, 68, 71, 74, 71]
    mn, mx = min(pts)-8, max(pts)+8
    px = lambda i: round(14 + i*(w-28)/11)
    py = lambda v: round(h-12 - (v-mn)*(h-24)/(mx-mn))
    poly = ' '.join(f'{px(i)},{py(v)}' for i, v in enumerate(pts))
    dots = ''.join(f'<circle cx="{px(i)}" cy="{py(v)}" r="3.5" fill="#2563EB"/>' for i, v in enumerate(pts))
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" xmlns="http://www.w3.org/2000/svg">'
            f'<line x1="10" y1="{h-12}" x2="{w-10}" y2="{h-12}" stroke="#E2E8F0"/>'
            f'<polyline points="{poly}" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>{dots}</svg>')

SUBS = {
    '__SEARCH__': icon('search', 16, '#94A3B8'), '__SLIDERS__': icon('sliders-horizontal', 18, '#475569'),
    '__PAUSE__': icon('pause', 16, '#475569'), '__FROWN__': icon('frown', 14, '#DC2626'),
    '__CLOCK__': icon('clock', 15, '#94A3B8'), '__MSG__': icon('message-circle', 15, '#94A3B8'),
    '__PLAY_W__': icon('play', 16, '#FFFFFF'), '__SEND_W__': icon('send', 16, '#FFFFFF'),
    '__OK_G__': icon('circle-check', 18, '#16A34A'), '__OK_G_SM__': icon('circle-check', 16, '#166534'),
    '__WARN_Y__': icon('triangle-alert', 20, '#F59E0B'), '__WARN_SM__': icon('triangle-alert', 18, '#F59E0B'),
    '__TROPHY_Y__': icon('trophy', 18, '#B45309'), '__ZAP_Y__': icon('zap', 18, '#B45309'),
    '__ARROW_W__': icon('arrow-right', 16, '#FFFFFF'), '__ROTATE__': icon('rotate-ccw', 16, '#475569'),
    '__SHARE__': icon('share-2', 16, '#475569'), '__DL__': icon('download', 16, '#475569'),
    '__FILE__': icon('file-text', 16, '#475569'), '__CHEV__': icon('chevron-right', 16, '#94A3B8'),
    '__CHEVL__': icon('chevron-left', 14, '#94A3B8'), '__CHEVR__': icon('chevron-right', 14, '#475569'),
    '__CHEVUP__': icon('chevron-up', 13, '#2563EB'), '__X_W__': icon('x', 14, '#FFFFFF'),
    '__RADAR__': radar_svg(210), '__CHART__': line_chart(430, 140),
}

# ---------------------------------------------------------------- шаблоны ----
APP = {
    'E-20': '''
<div class="content">
  <div class="srch"><span class="sinp">__SEARCH__ Сценарий или навык…</span><span class="fbtn">__SLIDERS__ Фильтры</span><span class="cnt">24 сценария</span></div>
  <div class="chips">
    <span class="fchip on">Все навыки __X_W__</span>
    <span class="fchip"><i style="background:#7C3AED"></i>эмпатия</span>
    <span class="fchip"><i style="background:#EA580C"></i>сопротивление</span>
    <span class="fchip"><i style="background:#0891B2"></i>границы</span>
    <span class="fchip"><i style="background:#0EA5E9"></i>вопрошание</span>
    <span class="fchip"><i style="background:#9333EA"></i>рефлексия</span>
  </div>
  <div class="sortrow"><span>Сложность</span><span class="sb">1–2</span><span class="sb on">3</span><span class="sb">4–5</span><span style="margin-left:20px">Длительность</span><span class="sb">до 10</span><span class="sb on">10–20</span><span class="sb">20+</span></div>
  <div class="grid3">
    <div class="sccard"><b>Работа с сопротивлением</b><p>Клиент избегает темы и переводит разговор.</p>
      <div class="meta"><span class="dots"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></span> 4/5 · <span>⏱ 15 мин</span></div>
      <div class="tags"><span class="tag"><i style="background:#EA580C"></i>сопротивление</span><span class="tag"><i style="background:#0891B2"></i>границы</span></div>
      <div class="foot"><span class="muted">Не пройден</span><button class="btn primary sm">Начать</button></div></div>
    <div class="sccard"><b>Первичная консультация</b><p>Сбор анамнеза и установление контакта.</p>
      <div class="meta"><span class="dots"><i class="on"></i><i class="on"></i><i></i><i></i><i></i></span> 2/5 · <span>⏱ 20 мин</span></div>
      <div class="tags"><span class="tag"><i style="background:#2563EB"></i>слушание</span><span class="tag"><i style="background:#0EA5E9"></i>вопрошание</span></div>
      <div class="foot"><span class="gr">Пройден · 86</span><button class="btn secondary sm">Повторить</button></div></div>
    <div class="sccard locked"><b>🔒 Границы и контракт</b><p>Откроется после «Активного слушания».</p>
      <div class="meta"><span class="dots"><i></i><i></i><i></i><i></i><i></i></span> 3/5 · <span>⏱ 20 мин</span></div>
      <div class="foot"><span class="muted">Закрыто</span><button class="btn disabled sm">Начать</button></div></div>
    <div class="sccard"><b>Эмпатия в конфликте</b><p>Пара на грани развода, эмоции накаляются.</p>
      <div class="meta"><span class="dots"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span> 5/5 · <span>⏱ 25 мин</span></div>
      <div class="tags"><span class="tag"><i style="background:#7C3AED"></i>эмпатия</span><span class="tag"><i style="background:#DB2777"></i>эмоции</span></div>
      <div class="foot"><span class="muted">Не пройден</span><button class="btn primary sm">Начать</button></div></div>
    <div class="sccard slim"><div><b>Активное слушание</b><span class="dots">●●○○○</span><span class="muted"> · 10 мин</span></div><button class="btn secondary sm">Начать</button></div>
    <div class="sccard locked"><b>🔒 Циркулярные вопросы</b><p>Откроется после «Работы с сопротивлением».</p>
      <div class="meta"><span class="dots"><i></i><i></i><i></i><i></i><i></i></span> 4/5 · <span>⏱ 15 мин</span></div>
      <div class="foot"><span class="muted">Закрыто</span><button class="btn disabled sm">Начать</button></div></div>
  </div>
</div>''',
    'E-21': '''
<div class="content">
  <a class="back">← Библиотека</a>
  <div class="cols">
    <div class="col-l">
      <div class="card big">
        <h1>Работа с сопротивлением</h1>
        <p>Клиент 34 года, избегает темы развода, переводит разговор, отшучивается, обесценивает важность проблемы. Ваша задача — удержать фокус и работать с сопротивлением без давления.</p>
        <div class="meta2"><span class="dots"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></span> 4/5</div>
        <div class="meta2">__CLOCK__ 15 мин · 7 шагов &nbsp;&nbsp; __MSG__ ИИ-клиент «Марина»</div>
        <div class="tags"><span class="tag"><i style="background:#EA580C"></i>сопротивление</span><span class="tag"><i style="background:#0891B2"></i>границы</span><span class="tag"><i style="background:#7C3AED"></i>эмпатия</span></div>
        <div class="btns"><button class="btn primary">__PLAY_W__ Начать сценарий</button><button class="btn secondary">В демо</button><span class="muted">пройден 2 раза · лучший балл 86</span></div>
      </div>
    </div>
    <div class="col-r">
      <div class="card"><div class="chead"><b>Что тренируем</b></div>
        <div class="sbrow"><span class="lab">Сопротивление</span><span class="v">49</span><i style="width:49%;background:#EA580C"></i></div>
        <div class="sbrow"><span class="lab">Границы</span><span class="v">64</span><i style="width:64%;background:#0891B2"></i></div>
        <div class="sbrow"><span class="lab">Эмпатия</span><span class="v">72</span><i style="width:72%;background:#7C3AED"></i></div>
        <span class="muted" style="font-size:11px">Рекомендовано: средний балл ниже 75</span>
      </div>
    </div>
  </div>
</div>''',
    'E-22': '''
<div class="content sess">
  <div class="cols">
    <div class="col-l sesscol">
      <div class="card session">
        <div class="sp-top"><span class="cap2">ШАГ 3 ИЗ 7</span><b>Уточнение запроса</b><span class="pause">__PAUSE__</span></div>
        <div class="pbar"><i style="width:43%"></i></div>
        <div class="eic"><b>3/10</b><span>низкий фон</span><i class="edot"></i></div>
        <div class="bub left">Я не знаю, с чего начать… Как будто всё идёт не так, и я уже не справляюсь.</div>
        <div class="bubmeta"><span class="emo">__FROWN__ эмоция 3/10</span><span class="tm">14:02</span></div>
        <div class="bub right">Расскажите, что вы чувствуете, когда говорите об этом?</div>
        <div class="bubmeta"><span class="tm">14:03</span></div>
        <div class="ao"><span class="ao-txt">Отражаю чувство: «Похоже, сейчас для вас всё слишком»</span><span class="tech"><i style="background:#2563EB"></i>эмпатия</span></div>
        <div class="ao"><span class="ao-txt">Что для вас значит «не справляетесь»?</span><span class="tech"><i style="background:#0EA5E9"></i>вопрошание</span></div>
        <div class="ao"><span class="ao-txt">Молчу и выдерживаю паузу</span><span class="tech"><i style="background:#9333EA"></i>пауза</span></div>
        <div class="own">Написать свой вариант… <span class="beta">beta</span></div>
      </div>
    </div>
    <div class="col-r histcol">
      <div class="card hist"><div class="chead"><b>История реплик</b><span>шаг 3/7</span></div>
        <div class="hb l">Здравствуйте… я не знаю, с чего начать.</div>
        <div class="hb r">Расскажите, что чувствуете сейчас?</div>
        <div class="hb l">Как будто всё идёт не так. Я устала.</div>
        <div class="hb r">Усталость — от чего она у вас?</div>
        <div class="hb l">От работы. И от того, что всё откладываю.</div>
      </div>
    </div>
  </div>
</div>''',
    'E-23': '''
<div class="content sess">
  <div class="cols">
    <div class="col-l sesscol">
      <div class="card session">
        <div class="sp-top"><span class="cap2">ШАГ 3 ИЗ 7</span><b>Уточнение запроса</b><span class="pause">__PAUSE__</span></div>
        <div class="pbar"><i style="width:43%"></i></div>
        <div class="eic"><b>3/10</b><span>низкий фон</span><i class="edot"></i></div>
        <div class="bub left">Как будто всё идёт не так, и я уже не справляюсь.</div>
        <div class="ta focus"><span class="ph">Ваш ответ клиенту…</span><span class="cnt2">184 / 500</span></div>
        <div class="ta-foot"><span class="beta">beta · свободный ввод</span><button class="btn primary">__SEND_W__ Отправить</button></div>
      </div>
    </div>
    <div class="col-r histcol">
      <div class="card hist"><div class="chead"><b>История реплик</b><span>шаг 3/7</span></div>
        <div class="hb l">Здравствуйте… я не знаю, с чего начать.</div>
        <div class="hb r">Расскажите, что чувствуете сейчас?</div>
        <div class="hb l">Как будто всё идёт не так. Я устала.</div>
        <div class="hb r">Усталость — от чего она у вас?</div>
      </div>
    </div>
  </div>
</div>''',
    'E-24': '''
<div class="content sess">
  <div class="cols">
    <div class="col-l sesscol">
      <div class="card session dim">
        <div class="sp-top"><span class="cap2">ШАГ 3 ИЗ 7</span><b>Уточнение запроса</b><span class="pause">__PAUSE__</span></div>
        <div class="pbar"><i style="width:43%"></i></div>
        <div class="bub left">Я не знаю, с чего начать…</div>
        <div class="bub right">Расскажите, что вы чувствуете?</div>
        <div class="ao"><span class="ao-txt">Отражаю чувство: «Похоже, сейчас всё слишком»</span></div>
        <div class="own">Написать свой вариант… <span class="beta">beta</span></div>
      </div>
    </div>
    <div class="col-r histcol"><div class="card hist dim"><div class="chead"><b>История реплик</b></div><div class="hb l">…</div><div class="hb r">…</div></div></div>
  </div>
</div>
<div class="overlay"></div>
<div class="pmodal">
  <h1>Пауза</h1>
  <p>Сессия приостановлена на шаге 3 из 7.<br>Прогресс сохранён автоматически.</p>
  <button class="btn primary full">Продолжить</button>
  <button class="btn secondary full">Завершить сессию</button>
  <span class="muted" style="font-size:11px">Завершённая сессия попадёт в разбор</span>
</div>''',
    'E-25': '''
<div class="content">
  <div class="cols">
    <div class="col-l">
      <div class="card big result">
        <span class="cap2">Сценарий «Работа с сопротивлением» · 15 мин</span>
        <div class="scorerow"><span class="bigscore">78</span><span class="of100">/ 100</span><span class="upbadge">__OK_G_SM__ +6 к прошлому</span></div>
        <span class="points">Очки: +120 · критических ошибок нет</span>
        <div class="achrow"><span class="ach">__TROPHY_Y__ Сценарий пройден</span><span class="ach">__ZAP_Y__ Серия 5 дней</span></div>
      </div>
      <div class="card warnbanner"><div>__WARN_Y__</div><div><b>Почти критично: дважды уходили от эмоции</b>
        <span>На шагах 4 и 6 переводили разговор на факты, когда клиент говорил о чувствах. Отразите чувство до вопроса.</span></div></div>
      <div class="card"><div class="chead"><b>Навыки сессии</b></div>
        <div class="radar-flex">__RADAR__
          <div class="skillbars">
            <div class="sbrow"><span class="lab">Слушание</span><span class="v">86</span><i style="width:86%;background:#2563EB"></i></div>
            <div class="sbrow"><span class="lab">Эмпатия</span><span class="v">72</span><i style="width:72%;background:#7C3AED"></i></div>
            <div class="sbrow"><span class="lab">Сопрот.</span><span class="v">49</span><i style="width:49%;background:#EA580C"></i></div>
            <div class="sbrow"><span class="lab">Рефлексия</span><span class="v">68</span><i style="width:68%;background:#9333EA"></i></div>
          </div></div></div>
      <div class="ctas"><button class="btn primary">__ARROW_W__ Следующий сценарий</button><button class="btn secondary">__ROTATE__ Повторить</button><button class="btn secondary">__SHARE__ Поделиться</button><button class="btn secondary">__DL__ PDF</button></div>
    </div>
    <div class="col-r">
      <div class="card"><div class="chead"><b>Ключевые моменты</b></div>
        <div class="mom ok">__OK_G__<div><b>Шаг 2 · Отражение чувства</b><span>«Похоже, сейчас всё слишком» — клиент раскрылся</span></div></div>
        <div class="mom ok">__OK_G__<div><b>Шаг 5 · Пауза выдержана</b><span>Дали пространство — клиент вернулся к теме сам</span></div></div>
        <div class="mom wr">__WARN_SM__<div><b>Шаг 4 · Уход от эмоции</b><span>Перевели на факты — отразите чувство до вопроса</span></div></div>
        <div class="mom wr">__WARN_SM__<div><b>Шаг 6 · Закрытый вопрос</b><span>«Вы устали?» — лучше «Что вы чувствуете?»</span></div></div>
        <a class="lnk">Полный разбор →</a>
      </div>
    </div>
  </div>
</div>''',
    'E-26': '''
<div class="content">
  <a class="back">← К итогам</a>
  <h1 class="pt2">Работа с сопротивлением · разбор</h1>
  <div class="card okc"><div class="chead"><b style="color:#166534">Что сработало</b></div>
    <div class="mom ok">__OK_G__<div><b>Шаг 2 · Отражение чувства</b><span>«Похоже, сейчас для вас всё слишком» — клиент раскрылся и перешёл к главному.</span></div></div>
    <div class="mom ok">__OK_G__<div><b>Шаг 5 · Выдержанная пауза</b><span>Вы не заполнили тишину — клиент сам вернулся к теме и уточнил запрос.</span></div></div>
  </div>
  <div class="card impc"><div class="chead"><b style="color:#92400E">Что улучшить</b></div>
    <div class="mom wr">__WARN_SM__<div><b>Шаг 4 · Уход от эмоции</b><span>Дважды переводили разговор на факты. Отражайте чувство до вопроса.</span></div></div>
    <div class="mom wr">__WARN_SM__<div><b>Шаг 6 · Закрытый вопрос</b><span>«Вы устали?» закрывает разговор. Открытое: «Что вы чувствуете сейчас?»</span></div></div>
  </div>
  <div class="card"><div class="chead"><b>Альтернативные удачные ходы · шаг 4</b></div>
    <div class="alt"><span>«Звучит, как вы держитесь из последних сил. Как это — нести это всё самостоятельно?»</span>
      <span class="tech"><i style="background:#7C3AED"></i>эмпатия · валидация</span></div>
  </div>
</div>''',
    'E-27': '''
<div class="content">
  <div class="card tablec">
    <div class="thead"><span>ДАТА</span><span>СЦЕНАРИЙ</span><span class="tc">БАЛЛ __CHEVUP__</span><span>ВРЕМЯ</span><span class="tr">ДЕЙСТВИЕ</span></div>
    <div class="trow"><span class="tm">16.09 · 14:00</span><b>Работа с сопротивлением</b><span class="score y">78</span><span class="tm2">15 мин</span><button class="btn secondary sm">Открыть</button></div>
    <div class="trow"><span class="tm">14.09 · 12:30</span><b>Первичная консультация</b><span class="score y">74</span><span class="tm2">18 мин</span><button class="btn secondary sm">Открыть</button></div>
    <div class="trow"><span class="tm">12.09 · 18:00</span><b>Активное слушание</b><span class="score g">91</span><span class="tm2">12 мин</span><button class="btn secondary sm">Открыть</button></div>
    <div class="trow"><span class="tm">10.09 · 11:00</span><b>Границы и контракт</b><span class="score o">68</span><span class="tm2">21 мин</span><button class="btn primary sm">Продолжить</button></div>
    <div class="trow"><span class="tm">08.09 · 09:30</span><b>Циркулярные вопросы</b><span class="score g">82</span><span class="tm2">14 мин</span><button class="btn secondary sm">Открыть</button></div>
    <div class="trow"><span class="tm">05.09 · 16:00</span><b>Эмпатия в конфликте</b><span class="score o">61</span><span class="tm2">19 мин</span><button class="btn secondary sm">Открыть</button></div>
    <div class="pager">__CHEVL__<span class="pg on">1</span><span class="pg">2</span><span class="pg">3</span><span class="muted">…</span><span class="pg">12</span>__CHEVR__</div>
  </div>
  <div class="ctas"><button class="btn secondary">__DL__ Экспорт CSV</button><button class="btn secondary">__FILE__ Экспорт PDF</button></div>
</div>''',
    'E-28': '''
<div class="content">
  <div class="cols">
    <div class="col-l">
      <div class="card"><div class="chead"><b>Радар навыков</b><span>средний 71/100</span></div>
        <div class="radar-c">__RADAR__</div></div>
      <div class="card"><div class="chead"><b>Динамика среднего балла</b><span>12 недель</span></div>__CHART__</div>
    </div>
    <div class="col-r">
      <div class="card"><div class="chead"><b>Навыки</b></div>
        <div class="sbrow"><span class="lab">Активное слушание</span><span class="v">86</span><em>+12</em><i style="width:86%;background:#2563EB"></i></div>
        <div class="sbrow"><span class="lab">Вопросы</span><span class="v">81</span><em>+9</em><i style="width:81%;background:#0EA5E9"></i></div>
        <div class="sbrow"><span class="lab">Структура</span><span class="v">77</span><em>+5</em><i style="width:77%;background:#65A30D"></i></div>
        <div class="sbrow"><span class="lab">Эмпатия</span><span class="v">72</span><em>+8</em><i style="width:72%;background:#7C3AED"></i></div>
        <div class="sbrow"><span class="lab">Рефлексия</span><span class="v">68</span><em>+4</em><i style="width:68%;background:#9333EA"></i></div>
        <div class="sbrow"><span class="lab">Границы</span><span class="v">64</span><em>+6</em><i style="width:64%;background:#0891B2"></i></div>
        <div class="sbrow"><span class="lab">Эмоции</span><span class="v">58</span><em>+3</em><i style="width:58%;background:#DB2777"></i></div>
        <div class="sbrow"><span class="lab">Сопротивление</span><span class="v">49</span><em>+7</em><i style="width:49%;background:#EA580C"></i></div>
      </div>
    </div>
  </div>
</div>''',
}

CSS = '''
:root{--bg:#fff;--bg2:#F7F8FA;--bg3:#EEF0F4;--ink:#0F172A;--ink2:#475569;--ink3:#94A3B8;--bd:#E2E8F0;--acc:#2563EB;--ok:#16A34A;--err:#DC2626;--warn:#F59E0B;--r:12px;--sh:0 4px 12px rgba(0,0,0,.08);--f:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:var(--f);background:#EEF1F6;color:var(--ink);font-size:15px}
.wrap{max-width:1240px;margin:0 auto;padding:24px 24px 120px}
header.page{padding:32px 0 8px}
.chip-top{display:inline-flex;background:#EEF2FF;color:var(--acc);border:1px solid #C7D7FE;border-radius:9999px;padding:4px 12px;font-size:12px;font-weight:600}
h1.pt{font-size:34px;margin:14px 0 6px}.lead{color:var(--ink2);max-width:840px}
nav.toc{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 8px}
nav.toc a{font-size:13px;color:var(--ink2);background:#fff;border:1px solid var(--bd);border-radius:9999px;padding:5px 12px;text-decoration:none}
section.scr{background:#F7F8FA;border:1px solid var(--bd);border-radius:16px;padding:28px;margin-top:28px}
.scr>h2{font-size:21px}.scr>h2 .tok{font-size:11px;color:var(--ink3);font-family:ui-monospace,monospace;font-weight:500;margin-left:8px}
.scr>.note{font-size:13px;color:var(--ink2);margin-top:4px;max-width:880px}
.frames{display:flex;flex-direction:column;gap:20px;margin-top:18px}
.frow{display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start}
.fbox{background:#DDE3EC;border-radius:14px;padding:10px;flex:none}
.fbox .flabel{font-family:ui-monospace,monospace;font-size:11px;color:#475569;margin:0 0 6px 4px}
.clip{overflow:hidden;border-radius:8px;box-shadow:0 10px 30px rgba(15,23,42,.18)}
.screen{container-type:inline-size;position:relative;background:var(--bg);display:flex;width:100%;overflow:hidden}
.screen.d{height:780px}.screen.t{width:768px;height:1024px}.screen.m{width:390px}
.sb{display:flex;flex-direction:column;width:240px;background:var(--bg2);border-right:1px solid var(--bd);flex:none}
.sb .logo{display:flex;align-items:center;gap:10px;font-weight:700;padding:20px 24px 12px}
.mark{width:24px;height:24px;border-radius:8px;background:var(--acc);display:inline-block;flex:none}
.sb nav{display:flex;flex-direction:column;gap:2px;padding:12px}
.sb nav a{display:flex;gap:10px;align-items:center;padding:9px 12px;border-radius:10px;color:var(--ink2);font-size:14px;text-decoration:none}
.sb nav a.on{background:#fff;color:var(--ink);font-weight:600;box-shadow:inset 3px 0 0 var(--acc)}
.sb nav a svg{color:var(--ink3)}.sb nav a.on svg{color:var(--acc)}
.sb .ucard{margin-top:auto;display:flex;gap:10px;align-items:center;padding:16px 20px;border-top:1px solid var(--bd)}
.ava{width:32px;height:32px;border-radius:50%;background:#7C3AED;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex:none}
.sbi{display:none;flex-direction:column;width:64px;background:var(--bg2);border-right:1px solid var(--bd);align-items:center;padding:16px 0;gap:6px;flex:none}
.sbi a{padding:10px;border-radius:10px;color:var(--ink3)}.sbi a.on{background:#fff;color:var(--acc)}
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topb{display:flex;align-items:center;gap:14px;height:64px;border-bottom:1px solid var(--bd);padding:0 24px;flex:none}
.topb b{font-size:18px}.topb .grow{flex:1}
.mnav{display:none;position:absolute;left:0;right:0;bottom:0;height:64px;background:#fff;border-top:1px solid var(--bd);z-index:5}
.mnav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:9px;color:var(--ink3);text-decoration:none}
.mnav a.on{color:var(--acc);font-weight:600}
.content{flex:1;padding:22px;overflow:hidden}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:9999px;font-family:var(--f);font-weight:600;font-size:14px;height:40px;padding:0 16px;cursor:pointer}
.btn.sm{height:30px;font-size:12px;padding:0 12px}
.btn.primary{background:var(--acc);color:#fff}.btn.secondary{background:#fff;border:1px solid var(--bd);color:var(--ink)}
.btn.full{width:100%}.btn.disabled{background:var(--bg3);color:var(--ink3);cursor:not-allowed}
.lnk{color:var(--acc);font-weight:500;text-decoration:none;font-size:13px}
.muted{color:var(--ink3)}.gr{color:#16A34A;font-weight:500;font-size:12px}.cap2{font-size:11px;letter-spacing:.05em;color:var(--ink3);font-weight:500}
.card{background:#fff;border:1px solid var(--bd);border-radius:var(--r);padding:16px;margin-bottom:14px}
.chead{display:flex;align-items:center;gap:10px;margin-bottom:10px}.chead b{font-size:15px}.chead>span{font-size:12px;color:var(--ink2);margin-left:auto}
.cols{display:flex;gap:18px;align-items:flex-start}
.col-l{flex:1.6;min-width:0}.col-r{flex:1;min-width:0}
/* E-20 */
.srch{display:flex;gap:16px;align-items:center;margin-bottom:14px}
.sinp{flex:0 1 420px;height:40px;border:1px solid var(--bd);border-radius:8px;display:inline-flex;align-items:center;gap:8px;padding:0 12px;color:var(--ink3);font-size:14px;background:#fff}
.fbtn{display:inline-flex;gap:8px;align-items:center;font-size:13px;font-weight:500;color:var(--ink2)}
.cnt{margin-left:auto;color:var(--ink3);font-size:13px}
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:12px}
.fchip{display:inline-flex;align-items:center;gap:7px;height:30px;padding:0 12px;border-radius:9999px;border:1px solid var(--bd);background:#fff;font-size:12px;font-weight:500;color:var(--ink2)}
.fchip i{width:8px;height:8px;border-radius:50%}
.fchip.on{background:var(--acc);border-color:var(--acc);color:#fff;font-weight:600}
.sortrow{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--ink2);margin-bottom:14px}
.sortrow .sb{border:1px solid var(--bd);border-radius:9999px;padding:3px 12px;background:#fff}
.sortrow .sb.on{background:var(--bg3);color:var(--ink);font-weight:600}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.sccard{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.sccard b{font-size:15px}.sccard p{font-size:13px;color:var(--ink2);margin:6px 0}
.sccard.locked{background:var(--bg2);box-shadow:none}
.sccard.slim{display:flex;align-items:center;justify-content:space-between}
.meta{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink3);margin:8px 0}
.dots{display:inline-flex;gap:5px}.dots i{width:8px;height:8px;border-radius:50%;background:var(--bg3)}.dots i.on{background:var(--acc)}
.tags{display:flex;gap:8px;margin:8px 0}
.tag{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 9px;border-radius:9999px;border:1px solid var(--bd);background:#fff;font-size:11px;font-weight:500;color:var(--ink2)}
.tag i{width:8px;height:8px;border-radius:50%}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:10px}
/* E-21 */
.back{color:var(--acc);font-weight:500;font-size:13px;text-decoration:none;display:block;margin-bottom:12px}
.card.big{padding:22px}
.card.big h1{font-size:22px;margin-bottom:10px}
.card.big p{font-size:14px;color:var(--ink2);margin-bottom:12px}
.meta2{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink2);margin:6px 0}
.btns{display:flex;gap:12px;align-items:center;margin-top:16px;flex-wrap:wrap}
/* session */
.sesscol{max-width:640px}
.session{padding:18px}
.session.dim,.hist.dim{opacity:.45;filter:grayscale(0.2)}
.sp-top{display:flex;gap:12px;align-items:center}
.sp-top b{font-size:13px}
.pause{margin-left:auto;width:34px;height:34px;border:1px solid var(--bd);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:var(--bg2)}
.pbar{height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;margin:10px 0 14px}
.pbar i{display:block;height:100%;background:var(--acc)}
.eic{display:flex;align-items:center;gap:8px;border:1px solid var(--bd);border-radius:10px;padding:8px 14px;width:190px;margin-bottom:14px}
.eic b{font-size:14px}.eic span{font-size:11px;color:var(--err)}
.eic .edot{margin-left:auto;width:8px;height:8px;border-radius:50%;background:var(--err)}
.bub{background:var(--bg2);border-radius:12px;padding:10px 14px;font-size:14px;max-width:92%}
.bub.right{background:var(--acc);color:#fff;margin-left:auto;max-width:86%}
.bubmeta{display:flex;font-size:11px;margin:6px 0 12px}
.emo{color:var(--err);font-weight:500;display:inline-flex;gap:5px;align-items:center}
.tm{margin-left:auto;color:var(--ink3)}
.ao{border:1px solid var(--bd);border-radius:12px;padding:9px 14px;margin-top:10px;background:#fff}
.ao .ao-txt{font-size:13px;display:block}
.tech{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:9999px;border:1px solid var(--bd);background:#fff;font-size:11px;font-weight:500;color:#1D4ED8;margin-top:8px}
.tech i{width:8px;height:8px;border-radius:50%}
.own{border:1px dashed var(--ink3);border-radius:10px;padding:12px 16px;font-size:13px;color:var(--ink3);margin-top:12px;display:flex;justify-content:space-between;align-items:center}
.beta{background:#EFF6FF;color:var(--acc);border-radius:9999px;padding:2px 10px;font-size:11px;font-weight:600}
.hist .hb{background:var(--bg2);border-radius:8px;padding:8px 12px;font-size:11px;margin-bottom:8px}
.hist .hb.r{background:#EFF6FF;color:#1D4ED8;margin-left:24px}
.hist .hb.l{margin-right:24px}
.ta{border:1px solid var(--bd);border-radius:10px;padding:12px 14px;min-height:96px;display:flex;flex-direction:column;justify-content:space-between;margin-top:12px}
.ta.focus{border-color:var(--acc);border-width:2px}
.ta .ph{color:var(--ink3);font-size:14px}
.ta .cnt2{align-self:flex-end;color:var(--ink3);font-size:11px}
.ta-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px}
/* overlay/modal */
.overlay{display:none}
.pmodal{display:none}
@container (min-width: 1px) { }
/* renders overlay inside screen: */
.screen .overlay{position:absolute;inset:0;background:rgba(15,23,42,.5);display:block;z-index:8}
.screen .pmodal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:380px;background:#fff;border-radius:16px;box-shadow:0 12px 32px rgba(0,0,0,.25);padding:24px;display:block;z-index:9}
.screen .pmodal h1{font-size:20px;margin-bottom:10px}
.screen .pmodal p{font-size:14px;color:var(--ink2);margin-bottom:16px}
.screen .pmodal .btn{margin-bottom:10px}
/* E-25 */
.result .bigscore{font-size:52px;font-weight:700}
.scorerow{display:flex;align-items:center;gap:10px;margin:6px 0}
.of100{font-size:18px;color:var(--ink3);font-weight:600}
.upbadge{display:inline-flex;gap:6px;align-items:center;background:#DCFCE7;color:#166534;border-radius:9999px;padding:4px 12px;font-size:12px;font-weight:600;margin-left:14px}
.points{font-size:13px;color:var(--ink2);font-weight:500}
.achrow{display:flex;gap:10px;margin-top:12px}
.ach{display:inline-flex;gap:7px;align-items:center;background:#FEF3C7;color:#92400E;border-radius:9999px;padding:6px 12px;font-size:12px;font-weight:500}
.warnbanner{display:flex;gap:14px;background:#FFFBEB;border-color:#FDE68A;border-left:4px solid var(--warn)}
.warnbanner b{color:#92400E;font-size:13px;display:block}
.warnbanner span{font-size:12px;color:#B45309}
.radar-flex{display:flex;gap:16px;align-items:center}
.skillbars{flex:1;display:flex;flex-direction:column;gap:11px;min-width:120px}
.sbrow{font-size:12px}
.sbrow .lab{color:var(--ink2)}
.sbrow .v{margin-left:8px;font-weight:600}
.sbrow em{color:#16A34A;font-style:normal;font-size:11px;margin-left:6px}
.sbrow i{display:block;height:6px;background:var(--bg3);border-radius:3px;margin-top:4px}
.mom{display:flex;gap:10px;padding:8px 0;border-bottom:1px dashed var(--bd)}
.mom:last-of-type{border-bottom:none}
.mom b{font-size:12px;display:block}.mom span{font-size:11px;color:var(--ink2)}
.mom>div{flex:1}
.ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:4px}
/* E-26 */
.pt2{font-size:20px;margin-bottom:14px}
.okc{border-left:4px solid var(--ok)}.impc{border-left:4px solid var(--warn)}
.alt{background:#F0FDF4;border:2px solid var(--ok);border-radius:12px;padding:12px 16px}
.alt>span:first-child{font-size:13px;display:block;margin-bottom:4px}
/* E-27 */
.tablec{padding:6px 16px}
.thead{display:flex;gap:12px;padding:12px 4px;font-size:11px;letter-spacing:.05em;color:var(--ink3);font-weight:500;border-bottom:1px solid var(--bd)}
.thead span:first-child{width:110px}.thead span:nth-child(2){flex:1}.thead .tc{width:70px}.thead .tr{margin-left:auto}
.trow{display:flex;gap:12px;align-items:center;padding:11px 4px;border-bottom:1px solid var(--bd);font-size:13px}
.trow .tm{color:var(--ink3);font-size:12px;width:110px;flex:none}
.trow b{flex:1;font-size:13px}
.trow .tm2{color:var(--ink2);font-size:12px;width:60px}
.score{border-radius:12px;padding:2px 10px;font-size:12px;font-weight:700}
.score.g{background:#DCFCE7;color:#166534}.score.y{background:#FEF9C3;color:#854D0E}.score.o{background:#FFEDD5;color:#9A3412}
.trow .btn{margin-left:auto}
.pager{display:flex;gap:8px;align-items:center;padding:14px 4px 8px;font-size:12px;color:var(--ink2)}
.pg{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px}
.pg.on{background:var(--acc);color:#fff;font-weight:600}
.radar-c{display:flex;justify-content:center}
/* ---------- container queries ---------- */
@container (max-width: 900px) {
  .sb{display:none}.sbi{display:flex}
  .cols{flex-direction:column}.col-l,.col-r{width:100%}
  .grid3{grid-template-columns:1fr 1fr}
  .sortrow{display:none}
  .histcol{display:none}
  .content{padding:18px}
}
@container (max-width: 500px) {
  .sbi{display:none}
  .mnav{display:flex}
  .grid3{grid-template-columns:1fr}
  .content{padding:14px 14px 80px}
  .fbtn,.cnt{display:none}
  .sinp{flex:1}
  .radar-flex{flex-direction:column}
  .pmodal{width:calc(100% - 32px)}
  .thead .tc,.thead span:nth-child(4){display:none}
  .trow .tm2,.trow .score{display:none}
  .ctas .btn{flex:1}
}
'''

def app_shell(title, content, active=0, role='психолог'):
    a = ['on' if i == active else '' for i in range(6)]
    nav_lbl = [('home','Дашборд'),('book-open','Сценарии'),('sparkles','Игры'),('users','Клиенты'),('chart-column','Прогресс'),('settings','Настройки')]
    nav_d = ''.join(f'<a class="{a[i]}">' + f'{{NAV{i}}}' + f' {nav_lbl[i][1]}</a>' for i in range(6))
    nav_i = ''.join(f'<a class="{a[i]}">' + f'{{NAV{i}}}' + '</a>' for i in range(6))
    nav_m = ''.join((f'<a class="{a[i]}">' + f'{{NAV{i}}}' + f' {nav_lbl[i][1]}</a>') for i in [0,1,2,4]) + '<a>{NAV5} Профиль</a>'
    return ('<div class="screen d">'
            '<div class="sb"><span class="logo"><i class="mark"></i>Platform</span>'
            '<nav>' + nav_d + '</nav>'
            '<div class="ucard"><span class="ava">АК</span><div><b style="font-size:13px">Анна К.</b><br>'
            '<span style="font-size:11px;color:var(--ink3)">' + role + '</span></div></div></div>'
            '<div class="sbi"><span style="margin-bottom:10px"><i class="mark"></i></span>' + nav_i + '</div>'
            '<div class="main"><div class="topb"><b>' + title + '</b><span class="grow"></span>'
            '<span class="ava"></span></div>' + content + '</div>'
            '<div class="mnav">' + nav_m + '</div></div>')

SCREENS = [
    ('E-20', 'Библиотека сценариев', 1, 'Фильтры по навыкам/сложности/длительности + сетка карточек (ТЗ E-20)', 1520),
    ('E-21', 'Карточка сценария', 1, 'Описание клиента, навыки, CTA «Начать», что тренируем (ТЗ E-21)', 980),
    ('E-22', 'Сессия', 1, 'Прогресс + эмоция + пузыри + варианты + «свой вариант», справа история (ТЗ E-22)', 860),
    ('E-23', 'Сессия · свободный ввод', 1, 'Textarea, счётчик 184/500, beta, Отправить (ТЗ E-23)', 860),
    ('E-24', 'Сессия · пауза', 1, 'Модалка «Продолжить / Завершить» поверх сессии (ТЗ E-24)', 860),
    ('E-25', 'Разбор', 1, 'Балл 78, radar, предупреждение, моменты, CTA ×4 (ТЗ E-25)', 1180),
    ('E-26', 'Разбор · детали', 1, 'Сработало / улучшить + альтернативные ходы (ТЗ E-26)', 1000),
    ('E-27', 'История сессий', 4, 'Таблица с сортировкой, пагинация, экспорт (ТЗ E-27)', 900),
    ('E-28', 'Прогресс навыков', 4, 'Radar + line chart + список 8 навыков (ТЗ E-28)', 1060),
]
NAV_IC = {
    '{NAV0}': icon('home', 20, 'currentColor'), '{NAV1}': icon('book-open', 20, 'currentColor'),
    '{NAV2}': icon('sparkles', 20, 'currentColor'), '{NAV3}': icon('users', 20, 'currentColor'),
    '{NAV4}': icon('chart-column', 20, 'currentColor'), '{NAV5}': icon('user', 20, 'currentColor'),
}

sections = []
for code, title, active, note, mh in SCREENS:
    shell = app_shell(title, APP[code], active)
    desk = shell
    tab = shell.replace('screen d', 'screen t')
    mob = shell.replace('screen d', 'screen m')
    if code == 'E-24':
        # overlay и модалку — внутрь screen (уже в APP), ок для всех вариантов
        pass
    html = ('<section class="scr" id="' + code + '">\n'
            '<h2>' + code + ' · ' + title + '<span class="tok">3 брейкпоинта</span></h2>\n'
            '<p class="note">' + note + '</p>\n<div class="frames">\n'
            '<div class="fbox"><p class="flabel">Desktop · 1440</p><div class="clip">' + desk + '</div></div>\n'
            '<div class="frow">\n'
            '<div class="fbox"><p class="flabel">Tablet · 768</p><div class="clip">' + tab + '</div></div>\n'
            '<div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip" style="max-height:860px">' + mob + '</div></div>\n'
            '</div>\n</div></section>')
    sections.append(html)

toc = ''.join(f'<a href="#{c}">{c}</a>' for c, *_ in SCREENS)

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 05 Screens · Simulator · v1.0</title>\n<style>' + CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 5: экраны симулятора — готово</span>\n'
       '<h1 class="pt">05 · Экраны E-20…E-28</h1>\n'
       '<p class="lead">Библиотека сценариев, сессия с ИИ-клиентом (чат и свободный ввод с beta), пауза, разбор с радаром и моментами, история и прогресс навыков. Каждый экран — в 1440/768/390, адаптив по ТЗ 6.3. В Penpot эти 27 фреймов генерирует плагин Platform Builder v0.5.</p>\n'
       '<nav class="toc">' + toc + '</nav>\n</header>\n'
       + '\n'.join(sections) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · Simulator screens v1.0 · плагин v0.5 · источник: tokens/design-tokens.json</footer>\n'
       '</div></body></html>')

for k, v in SUBS.items():
    doc = doc.replace(k, v)
for k, v in NAV_IC.items():
    doc = doc.replace(k, v)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
