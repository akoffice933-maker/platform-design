#!/usr/bin/env python3
"""Собирает screens/07-tma.html: E-50…E-57 — Telegram Mini App клиента.
Только 390×844, тёмная тема (ТЗ 11.1), safe areas: шапка Telegram 56px (сверху),
MainButton / BottomNav 80px (снизу). 8 секций, 9 фреймов (+состояние MainButton disabled)."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '07-tma.html')

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

# CSS реюз из build_screens5 (база) + build_screens6 (DARK_CSS) — те же файлы-источники
base = open(os.path.join(ROOT, 'build_screens5.py')).read()
start = base.index("CSS = '''") + len("CSS = '''")
CSS = base[start:base.index("'''", start)]
b6 = open(os.path.join(ROOT, 'build_screens6.py')).read()
s6 = b6.index("DARK_CSS = '''") + len("DARK_CSS = '''")
DARK_CSS = b6[s6:b6.index("'''", s6)]

TMA_CSS = '''
/* TMA (Итерация 7): Telegram Mini App, 390×844, тёмная тема, safe areas 56/80 */
.tma{width:390px;height:844px;background:#0B1220;color:#F8FAFC;display:flex;flex-direction:column;position:relative;overflow:hidden;border-radius:20px}
.tghead{height:56px;flex:none;background:#0E1826;border-bottom:1px solid #1F2937;display:flex;align-items:center;padding:0 16px;position:relative}
.tghead .cls{font-size:14px;font-weight:500;color:#60A5FA}
.tghead b{position:absolute;left:50%;transform:translateX(-50%);font-size:15px}
.dots{margin-left:auto;display:flex;gap:4px}
.dots i{width:4px;height:4px;border-radius:50%;background:#CBD5E1;display:block}
.tmain{flex:1;padding:20px 24px 12px;overflow:hidden}
.tma .h1s{font-size:20px;font-weight:700;margin:0}
.tma .sub8{font-size:12px;color:#CBD5E1}
.tma .card8{background:#111827;border:1px solid #1F2937;border-radius:14px;padding:16px}
.tma .tile{width:44px;height:44px;border-radius:10px;background:#1E293B;display:flex;align-items:center;justify-content:center;flex:none}
.tma .lnk8{color:#60A5FA;font-size:12px;font-weight:600;text-decoration:none}
.tma .pbar2{margin-bottom:12px}
.tma .mbtn{height:48px;border-radius:12px;background:var(--acc);color:#fff;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.tma .mbtn.off{background:#1E293B;color:#CBD5E1}\n.obadge{width:88px;height:88px;border-radius:50%;background:#1E293B;display:flex;align-items:center;justify-content:center}
.mzone{flex:none;height:80px;padding:8px 16px 0;background:#0B1220}
.hind{width:134px;height:5px;border-radius:3px;background:rgba(248,250,252,.35);margin:8px auto 0}
.nzone{flex:none;height:80px;background:#111827}
.navbar{display:flex;height:56px;border-top:1px solid #1F2937}
.navbar a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:10px;color:#CBD5E1;text-decoration:none}
.navbar a.on{color:var(--acc);font-weight:600}
.face{width:44px;height:44px;border-radius:50%;background:#111C2E;display:flex;align-items:center;justify-content:center}
.face.on{background:#16233B;outline:2px solid var(--acc)}
.face8{display:flex;justify-content:space-around;text-align:center}
.face8 span{font-size:10px;color:#CBD5E1;display:block;margin-top:4px}
.face8 .fcol.on span{color:var(--acc);font-weight:600}
.stchipy{background:#1E293B;border-radius:11px;padding:3px 10px;font-size:10px;font-weight:600;color:#93C5FD}
.stchipg{background:#1E293B;border-radius:11px;padding:3px 10px;font-size:10px;font-weight:600;color:#86EFAC}
.stchipw{background:#1E293B;border-radius:11px;padding:3px 10px;font-size:10px;font-weight:600;color:#FDE68A}
.stchipn{border-radius:11px;padding:3px 10px;font-size:10px;color:#CBD5E1}
.chip8{border:1px solid #1F2937;background:#111827;border-radius:9999px;padding:6px 14px;font-size:12px;color:#CBD5E1}
.chip8.on{background:var(--acc);border-color:var(--acc);color:#fff;font-weight:600}
.sw8{width:40px;height:22px;border-radius:9999px;background:var(--acc);position:relative;flex:none}
.sw8 i{position:absolute;top:2px;right:2px;width:18px;height:18px;background:#fff;border-radius:50%}
.sw8.off{background:#334155}.sw8.off i{right:auto;left:2px}
.caps8{font-size:11px;font-weight:500;letter-spacing:.06em;color:#CBD5E1;margin:14px 0 8px}
.bars8{display:flex;gap:10px;align-items:flex-end;height:104px}
.bar8{width:24px;border-radius:6px;background:#1E293B}
.bar8.on{background:var(--acc)}
.barlbl{display:flex;gap:10px}
.barlbl span{width:24px;text-align:center;font-size:10px;color:#CBD5E1}
.barlbl span.on{color:var(--acc);font-weight:600}
.setrow{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #1F2937}
.setrow:last-child{border-bottom:none}
.setrow b{font-size:13px;font-weight:500;display:block}
.setrow span{font-size:10px;color:#CBD5E1}
.setrow>div{flex:1}
.lrow{display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #1F2937;font-size:13px;color:#60A5FA}
.lrow:last-child{border-bottom:none}
.lrow span{flex:1}
.hist8{display:flex;gap:12px;align-items:center;padding:10px 0}
.hist8 b{font-size:11px;color:#CBD5E1;font-weight:500;width:44px}
.hist8 span{font-size:12px}
.statrow{display:flex;gap:12px;margin-top:14px}
.statrow .card8{flex:1;padding:12px}
.statrow b{font-size:16px;display:block;margin-top:4px}
.statrow span{font-size:10px;color:#CBD5E1}
'''

def tma_shell(title, content, bottom):
    head = ('<div class="tghead"><span class="cls">Закрыть</span><b>' + title + '</b>'
            '<span class="dots"><i></i><i></i><i></i></span></div>')
    if bottom[0] == 'main':
        lbl, en = bottom[1], bottom[2]
        zone = ('<div class="mzone"><div class="mbtn' + ('' if en else ' off') + '">' + lbl +
                '</div><div class="hind"></div></div>')
    else:
        navs = [('home', 'Главная'), ('sparkles', 'Игры'), ('book-open', 'Дневник'),
                ('chart-column', 'Прогресс'), ('user', 'Профиль')]
        items = ''.join('<a class="' + ('on' if i == bottom[1] else '') + '">' + icon(n, 20, 'currentColor') + l + '</a>'
                        for i, (n, l) in enumerate(navs))
        zone = '<div class="nzone"><div class="navbar">' + items + '</div><div class="hind"></div></div>'
    return '<div class="tma">' + head + '<div class="tmain">' + content + '</div>' + zone + '</div>'

# ---------------------------------------------------------------- экраны ----
def e50():
    feats = [('sparkles', 'Игры и практики от вашего психолога'),
             ('lock', 'Приватность: ответы видит только он'),
             ('key-round', 'Без регистрации — вход по ссылке')]
    rows = ''.join('<div class="setrow">' + icon(f[0], 20, '#60A5FA') + '<div style="flex:1"><b>' + f[1] + '</b></div></div>'
                   for f in feats)
    content = ('<div style="text-align:center;margin-top:36px">'
               '<div class="tile" style="width:64px;height:64px;border-radius:16px;margin:0 auto;background:var(--acc)">'
               + icon('brain', 32, '#FFFFFF') + '</div>'
               '<div class="h1s" style="margin-top:22px">Пространство спокойствия</div>'
               '<p class="sub8" style="margin:8px 0 0">Игры и практики, которые подобрал<br>ваш психолог — под вашу задачу</p></div>'
               '<div class="card8" style="margin-top:30px;padding:6px 16px">' + rows + '</div>')
    return tma_shell('Platform', content, ('main', 'Начать', True))

def e51():
    faces = [('frown', 'тревожно', False), ('meh', 'нормально', True), ('smile', 'спокойно', False)]
    frow = ''.join('<div class="fcol' + (' on' if f[2] else '') + '"><div class="face' + (' on' if f[2] else '') + '">'
                   + icon(f[0], 22, 'var(--acc)' if f[2] else '#CBD5E1') + '</div><span>' + f[1] + '</span></div>'
                   for f in faces)
    content = ('<div style="display:flex;align-items:baseline;justify-content:space-between">'
               '<span class="h1s">Добрый вечер</span><span class="sub8">Среда, 16 сентября</span></div>'
               '<div class="card8" style="margin-top:14px;display:flex;gap:12px;align-items:center;padding:12px 16px;background:#111C2E">'
               + icon('zap', 18, 'var(--warn)') + '<b style="font-size:13px;flex:1">Серия 5 дней подряд</b>'
               '<span class="sub8" style="font-size:11px">лучшая — 12</span></div>'
               '<div class="card8" style="margin-top:12px"><div style="display:flex;gap:14px;align-items:center">'
               '<div class="tile">' + icon('play', 18, 'var(--acc)') + '</div>'
               '<div style="flex:1"><b style="font-size:15px">Дыхание 4-7-8</b><div class="sub8" style="margin-top:2px">Упражнение · шаг 3 из 6</div></div></div>'
               '<div class="pbar2" style="margin-top:12px"><i><b style="width:50%"></b></i></div>'
               '<a class="lnk8">Продолжить →</a></div>'
               '<div class="card8" style="margin-top:12px"><b style="font-size:14px">Как вы себя чувствуете?</b>'
               '<div class="face8" style="margin-top:12px">' + frow + '</div></div>'
               '<div class="card8" style="margin-top:12px;display:flex;gap:10px">'
               + icon('heart', 18, 'var(--err)') + '<div><b style="font-size:12px">Совет дня</b>'
               '<div class="sub8" style="margin-top:2px">Короткая прогулка снижает напряжение быстрее, чем скролл ленты.</div></div></div>')
    return tma_shell('Platform', content, ('nav', 0))

def e52():
    chips = '<span class="chip8 on">Все</span><span class="chip8">Дыхание</span><span class="chip8">Дневник</span><span class="chip8">Медитация</span>'
    games = [('play', 'Дыхание 4-7-8', 'Упражнение · 5 мин', '<span class="stchipy">3/6</span>'),
             ('book-open', 'Дневник эмоций', 'Дневник · ежедневно', '<span class="stchipg">Новое</span>'),
             ('target', 'Заземление 5-4-3-2-1', 'Техника · 3 мин', '<span class="stchipw">Новая</span>'),
             ('timer', 'Скрипт сна', 'Медитация · 10 мин', '<span class="stchipn">Завершена</span>')]
    rows = ''.join('<div class="card8" style="margin-top:10px;display:flex;gap:14px;align-items:center">'
                   '<div class="tile">' + icon(g[0], 18, 'var(--acc)') + '</div>'
                   '<div style="flex:1"><b style="font-size:14px">' + g[1] + '</b><div class="sub8" style="margin-top:2px">' + g[2] + '</div></div>'
                   + g[3] + '</div>' for g in games)
    content = ('<div style="display:flex;align-items:baseline;justify-content:space-between">'
               '<span class="h1s">Мои игры</span><span class="sub8">4 доступно</span></div>'
               '<div style="display:flex;gap:8px;margin-top:12px">' + chips + '</div>' + rows)
    return tma_shell('Игры', content, ('nav', 1))

def e53(selected):
    opts = [('Плечи и спина напряжены', False), ('Сердце бьётся чаще', selected),
            ('Дыхание спокойное', False), ('Тело расслаблено', False)]
    orow = ''.join('<div class="copt' + (' on' if o[1] else '') + '"><i class="' + ('on' if o[1] else '') + '"></i>' + o[0] + '</div>'
                   for o in opts)
    hint = 'Выберите один вариант — можно изменить' if selected else 'Выберите вариант, чтобы продолжить'
    content = ('<div class="pbar2"><span>ШАГ 3 ИЗ 6</span><i><b style="width:50%"></b></i></div>'
               '<div class="ccard"><h1 style="font-size:16px;margin-top:0">Что вы чувствуете в теле сейчас?</h1>'
               + orow +
               '<p class="sub8" style="text-align:center;margin:14px 0 0">' + hint + '</p></div>')
    return tma_shell('Дыхание 4-7-8', content, ('main', 'Ответить', selected))

def e53o():
    content = ('<div class="pbar2"><span>ШАГ 3 ИЗ 6</span><i><b style="width:50%"></b></i></div>'
               '<div style="display:flex;justify-content:center;margin-top:28px"><span class="obadge">' + icon('wifi-off', 36, '#FDE68A') + '</span></div>'
               '<h1 style="text-align:center;font-size:18px;margin:22px 0 0">Нет соединения</h1>'
               '<p class="sub8" style="text-align:center;margin:12px 0 0">Похоже, связь пропала. Проверьте интернет<br>и повторите попытку.</p>'
               '<div class="ccard" style="display:flex;gap:12px;align-items:flex-start;margin-top:24px">'
               + icon('circle-check', 18, '#4ADE80') +
               '<div><b style="font-size:13px">Прогресс не потерян</b>'
               '<p class="sub8" style="margin:4px 0 0">Шаг 3 из 6 · ответы синхронизируются сами</p></div></div>'
               '<p style="text-align:center;margin:42px 0 0"><a class="lnk8" href="#">Продолжить офлайн</a></p>')
    return tma_shell('Дыхание 4-7-8', content, ('main', 'Повторить', True))


def e54():
    stats = [('clock', '4:32', 'время'), ('target', '6/6', 'шаги'), ('zap', '+1', 'серия')]
    srow = ''.join('<div class="card8">' + icon(st[0], 18, '#60A5FA') + '<b>' + st[1] + '</b><span>' + st[2] + '</span></div>'
                   for st in stats)
    content = ('<div style="text-align:center;margin-top:8px">' + icon('circle-check', 64, 'var(--ok)') +
               '<div class="h1s" style="margin-top:12px">Сессия завершена!</div>'
               '<p class="sub8" style="margin:6px 0 0">Вы прошли все 6 шагов упражнения</p></div>'
               '<div class="statrow">' + srow + '</div>'
               '<div class="card8" style="margin-top:12px"><b class="sub8" style="font-size:12px;font-weight:500">Самооценка тревоги (0–10)</b>'
               '<div style="display:flex;gap:12px;align-items:center;margin-top:6px">'
               '<span style="font-size:28px;font-weight:700;color:#CBD5E1">7</span>'
               + icon('arrow-right', 20, '#CBD5E1') +
               '<span style="font-size:28px;font-weight:700;color:var(--acc)">4</span>'
               '<span class="sub8" style="margin-left:6px">после дыхательной практики</span></div></div>'
               '<div class="card8" style="margin-top:12px;display:flex;gap:10px;background:#111C2E">'
               + icon('shield-check', 18, 'var(--ok)') +
               '<div><b style="font-size:12px">Результат автоматически увидит ваш психолог</b>'
               '<div class="sub8" style="margin-top:2px">и подберёт следующую игру</div></div></div>')
    return tma_shell('Готово', content, ('main', 'Отправить психологу', True))

def e55():
    faces = [('frown', 'тяжело', False), ('meh', 'нормально', False), ('smile', 'хорошо', True)]
    frow = ''.join('<div class="fcol' + (' on' if f[2] else '') + '"><div class="face' + (' on' if f[2] else '') + '">'
                   + icon(f[0], 22, 'var(--acc)' if f[2] else '#CBD5E1') + '</div><span>' + f[1] + '</span></div>'
                   for f in faces)
    hist = [('14 сен', 'meh', 'Ровный день, много работы'), ('11 сен', 'smile', 'Прогулка и звонок подруге')]
    hrows = ''.join('<div class="hist8">' + icon(h[1], 20, '#CBD5E1') + '<b>' + h[0] + '</b><span>' + h[2] + '</span></div>'
                    for h in hist)
    content = ('<div style="display:flex;align-items:baseline;justify-content:space-between">'
               '<span class="h1s" style="font-size:18px">Как прошёл день?</span><span class="sub8">16 сентября</span></div>'
               '<div class="card8" style="margin-top:12px"><div class="face8">' + frow + '</div></div>'
               '<div class="card8" style="margin-top:10px"><b class="sub8" style="font-size:12px;font-weight:500">Что повлияло на состояние?</b>'
               '<div class="sub8" style="margin-top:8px;color:#475569;font-size:13px">Пара слов о дне — по желанию…</div>'
               '<div style="border-top:1px solid #1F2937;margin-top:10px;padding-top:6px;text-align:right">'
               '<span class="sub8" style="font-size:10px">0/300</span></div></div>'
               '<div style="display:flex;gap:8px;margin-top:10px">'
               '<span class="chip8 on">Работа</span><span class="chip8">Сон</span><span class="chip8">Спорт</span><span class="chip8">Люди</span></div>'
               '<button class="btn primary" style="width:100%;margin-top:14px;height:44px">Сохранить запись</button>'
               '<div class="caps8" style="margin-top:12px">Последние записи</div>' + hrows)
    return tma_shell('Дневник', content, ('nav', 2))

def e56():
    bars = [(40, 'пн', False), (64, 'вт', False), (28, 'ср', False), (80, 'чт', True),
            (56, 'пт', False), (88, 'сб', True), (48, 'вс', False)]
    bhtml = ''.join('<div class="bar8' + (' on' if b[2] else '') + '" style="height:' + str(b[0]) + 'px"></div>' for b in bars)
    lbls = ''.join('<span class="' + ('on' if b[2] else '') + '">' + b[1] + '</span>' for b in bars)
    rows = [('play', 'Игр пройдено', '12'), ('book-open', 'Записей в дневнике', '8'),
            ('calendar', 'Ближайшая сессия', 'ср, 18:00')]
    rhtml = ''.join('<div class="setrow">' + icon(r[0], 18, '#60A5FA') + '<div><b>' + r[1] + '</b></div>'
                    '<b style="font-size:13px">' + r[2] + '</b></div>' for r in rows)
    content = ('<div class="card8" style="display:flex;gap:14px;align-items:center">'
               '<div class="tile">' + icon('zap', 18, 'var(--warn)') + '</div>'
               '<div><b style="font-size:16px">Серия 5 дней</b><div class="sub8" style="margin-top:2px">лучшая серия — 12 дней</div></div></div>'
               '<div class="caps8">Активность за неделю</div>'
               '<div class="card8"><div class="bars8">' + bhtml + '</div>'
               '<div class="barlbl" style="margin-top:6px">' + lbls + '</div></div>'
               '<div class="card8" style="margin-top:10px;padding:6px 16px">' + rhtml + '</div>')
    return tma_shell('Прогресс', content, ('nav', 3))

def e57():
    sets = [('Напоминания о практике', 'каждый день в 20:00', True),
            ('Синхронизировать с Telegram', 'тема как в приложении', True),
            ('Звук в играх', '', False)]
    srows = ''.join('<div class="setrow"><div><b>' + s[0] + '</b>' + ('<span>' + s[1] + '</span>' if s[1] else '') + '</div>'
                    '<span class="sw8' + ('' if s[2] else ' off') + '"><i></i></span></div>' for s in sets)
    content = ('<div style="display:flex;gap:16px;align-items:center;margin-top:4px">'
               '<span class="ava" style="width:64px;height:64px;font-size:18px">КА</span>'
               '<div><b style="font-size:18px">Клиент А</b><div class="sub8" style="margin-top:2px">@client_a · Telegram</div>'
               '<div class="stchipy" style="display:inline-flex;align-items:center;gap:6px;margin-top:6px">'
               + icon('badge-check', 14, 'var(--acc)') + 'подключён к Анне К.</div></div></div>'
               '<div class="caps8">НАСТРОЙКИ</div>'
               '<div class="card8" style="padding:6px 16px">' + srows + '</div>'
               '<div class="caps8">ПРИВАТНОСТЬ</div>'
               '<div class="card8" style="display:flex;gap:10px">'
               + icon('lock', 18, 'var(--ok)') +
               '<div><b style="font-size:12px">Заметки и ответы шифруются (E2E)</b>'
               '<div class="sub8" style="margin-top:2px">Психолог видит только то, чем вы поделитесь</div>'
               '<a class="lnk8" style="font-size:11px">Подробнее →</a></div></div>'
               '<div class="card8" style="margin-top:10px;padding:6px 16px">'
               '<div class="lrow"><span>Политика конфиденциальности</span>' + icon('chevron-right', 16, '#CBD5E1') + '</div>'
               '<div class="lrow"><span>Поддержка</span>' + icon('external-link', 16, '#CBD5E1') + '</div></div>')
    return tma_shell('Профиль', content, ('nav', 4))

# ---------------------------------------------------------------- сборка ----
SCREENS = [
    ('E-50', 'Онбординг', [('TMA · 390', e50())],
     'Первый вход по deep-link: что внутри, приватность, без регистрации. MainButton «Начать» (ТЗ E-50).'),
    ('E-51', 'Главная', [('TMA · 390', e51())],
     'Серия, продолжение игры (прогресс 3/6), чек-ин настроения, совет дня. BottomNav, вкладка «Главная» (ТЗ E-51).'),
    ('E-52', 'Игры', [('TMA · 390', e52())],
     'Доступные игры со статусами: в процессе / новое / завершена (ТЗ E-52).'),
    ('E-53', 'Прохождение шага', [('выбрано', e53(True)), ('не выбрано · MainButton disabled', e53(False))],
     'Шаг-choice с прогрессом. Справа — состояние без выбора: нативная MainButton Telegram неактивна (ТЗ E-53).'),
    ('E-53o', 'Нет соединения', [('offline · нет сети', e53o())],
     'Экран offline: шаг и ответы сохранены, MainButton «Повторить», переход «Продолжить офлайн»; синхронизация при появлении сети (docs/07, P1).'),
    ('E-54', 'Результат', [('TMA · 390', e54())],
     'Статистика сессии, динамика самооценки тревоги, автоотправка психологу (ТЗ E-54).'),
    ('E-55', 'Дневник', [('TMA · 390', e55())],
     'Чек-ин (3 эмоции), заметка с лимитом, теги-факторы, история записей (ТЗ E-55).'),
    ('E-56', 'Прогресс', [('TMA · 390', e56())],
     'Серия, недельная активность, сводка. Диаграмма — роли color/success по токенам (ТЗ E-56).'),
    ('E-57', 'Профиль', [('TMA · 390', e57())],
     'Привязка к психологу, настройки (тема следует Telegram), приватность E2E (ТЗ E-57).'),
]

def section(code, title, frames, note):
    boxes = ''.join('<div class="fbox"><p class="flabel">' + lbl + ' · Telegram · safe area 56/80</p>'
                    '<div class="clip">' + html + '</div></div>' for lbl, html in frames)
    tok = '390×844 · тёмная тема · safe area 56 / 80' if len(frames) == 1 else '2 состояния MainButton'
    return ('<section class="scr" id="' + code + '">\n<h2>' + code + ' · ' + title +
            '<span class="tok">' + tok + '</span></h2>\n<p class="note">' + note + '</p>\n'
            '<div class="frow">' + boxes + '</div></section>')

parts = [section(c, t, fr, n) for c, t, fr, n in SCREENS]
toc = ''.join(f'<a href="#{c}">{c}</a>' for c, *_ in SCREENS)

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 07 TMA · Telegram Mini App · v1.0</title>\n<style>'
       + CSS + DARK_CSS + TMA_CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 7: Telegram Mini App — готово</span>\n'
       '<h1 class="pt">07 · TMA E-50…E-57</h1>\n'
       '<p class="lead">Клиентский Mini App в Telegram: онбординг по deep-link, главная с серией и чек-ином, игры, прохождение шагов, результат, дневник настроения, прогресс и профиль. Все экраны 390×844 в тёмной теме (ТЗ 11.1) с safe areas: шапка Telegram 56px сверху, MainButton / BottomNav 80px снизу. В Penpot — 10 фреймов плагина (включая offline E-53o).</p>\n'
       '<nav class="toc">' + toc + '</nav>\n</header>\n'
       + '\n'.join(parts) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · TMA v1.0 · плагин v0.7 · источник: tokens/design-tokens.json</footer>\n'
       '</div></body></html>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
