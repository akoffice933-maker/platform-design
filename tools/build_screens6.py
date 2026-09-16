#!/usr/bin/env python3
"""Собирает screens/06-games-client.html: E-30…E-33 (психолог, light) и
E-40…E-44 (клиент, dark — ТЗ 11.1), × 3 брейкпоинта + галерея типов шагов E-42."""
import os, re, math

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '06-games-client.html')

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

def ring(pct, size=180, dark=True, label='8'):
    r = 16; circ = round(2 * 3.14159265 * r, 1); off = round(circ * (1 - pct / 100), 1)
    track = '#1F2937' if dark else '#EEF0F4'
    txtc = '#F8FAFC' if dark else '#0F172A'
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">'
            f'<circle cx="20" cy="20" r="{r}" stroke="{track}" stroke-width="3"/>'
            f'<circle cx="20" cy="20" r="{r}" stroke="#2563EB" stroke-width="3" stroke-linecap="round" '
            f'stroke-dasharray="{circ}" stroke-dashoffset="{off}" transform="rotate(-90 20 20)"/>'
            f'<text x="20" y="22.5" text-anchor="middle" font-size="6" font-weight="700" fill="{txtc}" font-family="Inter,sans-serif">{label}</text></svg>')

SUBS = {
    '__SEARCH__': icon('search', 16, '#94A3B8'), '__CHEV_D__': icon('chevron-down', 16, '#475569'),
    '__SPARK__': icon('sparkles', 18, '#2563EB'), '__KEY_W__': icon('key-round', 16, '#FFFFFF'),
    '__OK_G__': icon('circle-check', 20, '#16A34A'), '__OK_BIG__': icon('circle-check', 56, '#16A34A'),
    '__OCT_Y__': icon('alert-octagon', 52, '#F59E0B'), '__LOCK__': icon('lock', 13, '#94A3B8'),
    '__GEAR__': icon('settings', 18, '#475569'), '__PLUS_W__': icon('plus', 16, '#FFFFFF'),
    '__COPY__': icon('copy', 14, '#475569'), '__SEND_W__': icon('send', 16, '#FFFFFF'),
    '__CHECK_W__': icon('check', 14, '#FFFFFF'), '__PAUSE_W__': icon('pause', 18, '#FFFFFF'),
    '__QR__': '',
}

# ------------------------------------------------------------ app shell ----
NAV_IC = {
    '{NAV0}': icon('home', 20, 'currentColor'), '{NAV1}': icon('book-open', 20, 'currentColor'),
    '{NAV2}': icon('sparkles', 20, 'currentColor'), '{NAV3}': icon('users', 20, 'currentColor'),
    '{NAV4}': icon('chart-column', 20, 'currentColor'), '{NAV5}': icon('user', 20, 'currentColor'),
}

def app_shell(title, content, active=0, role='психолог'):
    a = ['on' if i == active else '' for i in range(6)]
    nav_lbl = [('home','Дашборд'),('book-open','Сценарии'),('sparkles','Игры'),('users','Клиенты'),('chart-column','Прогресс'),('settings','Настройки')]
    nav_d = ''.join(f'<a class="{a[i]}">{{NAV{i}}} {nav_lbl[i][1]}</a>' for i in range(6))
    nav_i = ''.join(f'<a class="{a[i]}">{{NAV{i}}}</a>' for i in range(6))
    nav_m = ''.join(f'<a class="{a[i]}">{{NAV{i}}} {nav_lbl[i][1]}</a>' for i in [0,1,2,4]) + '<a>{NAV5} Профиль</a>'
    return ('<div class="screen d">'
            '<div class="sb"><span class="logo"><i class="mark"></i>Platform</span>'
            f'<nav>{nav_d}</nav>'
            '<div class="ucard"><span class="ava">АК</span><div><b style="font-size:13px">Анна К.</b><br>'
            f'<span style="font-size:11px;color:var(--ink3)">{role}</span></div></div></div>'
            f'<div class="sbi"><span style="margin-bottom:10px"><i class="mark"></i></span>{nav_i}</div>'
            f'<div class="main"><div class="topb"><b>{title}</b><span class="grow"></span><span class="ava"></span></div>{content}</div>'
            f'<div class="mnav">{nav_m}</div></div>')

def client_shell(step, content):
    return ('<div class="screen d darkc">'
            '<div class="chead2"><i class="mark"></i><b>Platform</b><span class="grow"></span><span class="stp">' + step + '</span></div>'
            + content + '</div>')

# ---------------------------------------------------------------- экраны ----
def e30():
    chips = ('<div class="chips"><span class="fchip on">Все типы</span>'
             '<span class="fchip">Упражнение</span><span class="fchip">Медитация</span>'
             '<span class="fchip">Дневник</span><span class="fchip">Техника</span>'
             '<span class="fchip">Тревога</span><span class="fchip">Стресс</span><span class="fchip">Эмоции</span></div>')
    games = [
        ('Упражнение', 'Тревога', 'Дыхание 4-7-8', 'Техника дыхания для снижения тревоги.', '5 мин', '12 клиентов'),
        ('Медитация', 'Стресс', 'Сканирование тела', 'Короткая медитация на расслабление.', '10 мин', '8 клиентов'),
        ('Дневник', 'Эмоции', 'Дневник эмоций', 'Ежедневные заметки о состоянии.', '5 мин/день', '15 клиентов'),
        ('Техника', 'Тревога', 'Заземление 5-4-3-2-1', 'Техника сенсорного заземления.', '4 мин', '9 клиентов'),
        ('Упражнение', 'Эмоции', 'Название эмоции', 'Учимся точно называть чувства.', '6 мин', '7 клиентов'),
        ('Медитация', 'Тревога', 'Безопасное место', 'Визуализация спокойного места.', '12 мин', '5 клиентов'),
    ]
    cards = ''
    for typ, theme, name, desc, dur, cnt in games:
        cards += ('<div class="gcard"><div style="display:flex;gap:8px">'
                  f'<span class="stc b">{typ}</span><span class="stc y">{theme}</span></div>'
                  f'<b style="margin-top:10px">{name}</b><p>{desc}</p>'
                  f'<div class="meta">⏱ {dur} · 👤 {cnt}</div>'
                  '<button class="btn primary" style="width:100%">__SEND_W__ Выдать клиенту</button></div>')
    content = ('<div class="srch"><span class="sinp">__SEARCH__ Игра или тема…</span><span class="cnt">12 игр</span></div>'
               + chips + '<div class="grid3">' + cards + '</div>')
    return app_shell('Библиотека игр', '<div class="content">' + content + '</div>', 2)

def e31():
    form = ('<div class="card big"><div class="chead"><b>Выдать игру клиенту</b></div>'
            '<div class="gsel">__SPARK__<div><b>Дыхание 4-7-8</b><span>Упражнение · Тревога · 5 мин</span></div>__CHEV_D__</div>'
            '<a class="lnk" style="font-size:12px">Выбрать другую игру →</a>'
            '<div class="field"><span class="lbl">Метка клиента</span><div class="inp">Клиент А</div>'
            '<span class="muted" style="font-size:11px">Псевдоним вместо имени — виден только вам</span></div>'
            '<div class="field"><span class="lbl">Срок доступа</span>'
            '<div class="segrow"><span class="seg">7 дней</span><span class="seg on">30 дней</span><span class="seg">90 дней</span></div></div>'
            '<div class="field"><span class="lbl">Лимит входов</span>'
            '<div class="segrow"><span class="seg">1</span><span class="seg">3</span><span class="seg on">5</span><span class="seg">∞</span></div></div>'
            '<div class="cbrow"><span class="sw on"><i></i></span>Уведомлять о прохождении</div>'
            '<button class="btn primary">__KEY_W__ Создать доступ</button></div>')
    result = ('<div class="oktoast">__OK_G__<div><b>Доступ создан</b><span>Отправьте клиенту код или ссылку</span></div></div>'
              '<div class="card codec"><span class="lab">КОД ДОСТУПА</span><div class="codeval">A7X9-Q2</div>'
              '<span class="muted" style="font-size:11px">Клиент введёт код на странице игры</span>'
              '<button class="btn secondary" style="margin-top:10px">__COPY__ Скопировать</button></div>'
              '<div class="card deepl"><span class="lab">ССЫЛКА ДЛЯ КЛИЕНТА</span>'
              '<div class="urlrow"><span class="u">app.platform.ru/g/A7X9Q2</span><span class="cp">__COPY__</span></div>'
              '<div class="qrph"></div>'
              '<span class="muted" style="font-size:11px">Или отсканируйте QR-код в мобильном</span>'
              '<button class="btn secondary" style="margin-top:10px">__COPY__ Скопировать ссылку</button></div>')
    cols = ('<div class="cols"><div class="col-l">' + form + '</div><div class="col-r">' + result + '</div></div>')
    return app_shell('Новый доступ', '<div class="content">' + cols + '</div>', 2)

def e32():
    clients = [
        ('КА', 'Клиент А', 'Дневник эмоций · 2 ч назад', 'g', 'активен', True),
        ('КБ', 'Клиент Б', 'Дыхание 4-7-8 · вчера', 'b', 'завершён', False),
        ('КВ', 'Клиент В', 'Дневник эмоций · 3 дн.', 'y', 'истёк', False),
        ('КГ', 'Клиент Г', '—', 'n', 'нет доступов', False),
    ]
    rows = ''
    for ini, nm, act, cls, lbl, sel in clients:
        on = ' selrow' if sel else ''
        rows += (f'<div class="crow{on}"><span class="ava" style="opacity:{1 if sel else .75}">{ini}</span>'
                 f'<div><b>{nm}</b><span>{act}</span></div><span class="stc {cls}">{lbl}</span></div>')
    detail = ('<div class="card"><div class="chead"><span class="ava">КА</span><div><b>Клиент А</b>'
              '<span>в доступе с 01.09.2026 · 3 игры</span></div><span style="margin-left:auto">__GEAR__</span></div></div>'
              '<div style="font-size:14px;font-weight:600;margin:6px 0 10px">Активные доступы</div>'
              '<div class="card"><div class="chead"><b>Дневник эмоций</b><span class="stc g">активен</span></div>'
              '<div class="meta2">до 30.09 · входы 3/5</div>'
              '<div class="btns"><button class="btn secondary sm">__COPY__ Копировать</button><button class="btn secondary sm" style="color:var(--err);border-color:#FECACA">Отозвать</button></div></div>'
              '<div class="card"><div class="chead"><b>Дыхание 4-7-8</b><span class="stc y">истёк</span></div>'
              '<div class="meta2">до 12.09 · входы 3/3</div></div>'
              '<div style="font-size:14px;font-weight:600;margin:14px 0 10px">Заметки __LOCK__ <span class="muted" style="font-size:11px;font-weight:400">шифруются (E2E)</span></div>'
              '<div class="card notes">Реагирует тревожно на тему работы. Дыхательные практики заходят лучше.</div>')
    cols = ('<div class="cols"><div class="col-l" style="flex:1"><div class="card">' + rows + '</div></div>'
            '<div class="col-r" style="flex:1.3">' + detail + '</div></div>')
    return app_shell('Клиенты', '<div class="content">' + cols + '</div>', 3)

def e33():
    rows = [
        ('Клиент А', 'Дневник эмоций', 'g', 'активен', 'до 30.09', '3/5', True),
        ('Клиент А', 'Дыхание 4-7-8', 'g', 'активен', 'до 15.10', '1/5', True),
        ('Клиент Б', 'Дыхание 4-7-8', 'b', 'завершён', '—', '5/5', True),
        ('Клиент В', 'Дневник эмоций', 'y', 'истёк', '12.09', '3/3', False),
        ('Клиент Г', 'Скрипт сна', 'e', 'отозван', '—', '0/3', False),
    ]
    trs = ''
    for cl, game, cls, st, term, uses, act in rows:
        actions = ('<span class="cpb">__COPY__</span><span class="rvb">Отозвать</span>' if act
                   else '<span class="muted">—</span>')
        trs += (f'<div class="trow"><b>{cl}</b><span class="game">{game}</span>'
                f'<span class="stc {cls}">{st}</span><span class="tm2">{term}</span>'
                f'<span class="v">{uses}</span>{actions}</div>')
    content = ('<div class="ctas" style="justify-content:flex-end"><button class="btn primary">__PLUS_W__ Новый доступ</button></div>'
               '<div class="card tablec">'
               '<div class="thead"><span>КЛИЕНТ</span><span>ИГРА</span><span>СТАТУС</span><span>СРОК</span><span>ВХОДЫ</span><span class="tr">ДЕЙСТВИЯ</span></div>'
               + trs + '</div>'
               '<p class="muted" style="font-size:12px;margin-top:10px">Отзыв доступа немедленно закрывает ссылку и код. Данные прохождений сохраняются.</p>')
    return app_shell('Доступы', '<div class="content">' + content + '</div>', 3)

# ------------------------------------------------------- клиентские dark ----
def e40():
    content = ('<div class="ccard"><span class="stc b">Упражнение</span><span class="theme">Тревога</span>'
               '<h1>Дыхание 4-7-8</h1><span class="dur">5 мин · 6 шагов</span>'
               '<p>Простая техника дыхания, которая помогает снизить тревогу и вернуться в спокойное состояние. Не требует подготовки.</p>'
               '<div class="invited"><span class="ava">АК</span><div><b>Вас пригласила Анна К.</b><span>ваш психолог</span></div></div>'
               '<button class="btn primary full" style="height:48px">Начать</button>'
               '<span class="foot2">Откроется по ссылке или коду · без регистрации</span></div>')
    return client_shell('без входа', '<div class="cwrap">' + content + '</div>')

def e41():
    content = ('<div class="cwrap"><div class="pbar2"><span>ШАГ 1 ИЗ 6</span><i><b style="width:16%"></b></i></div>'
               '<div class="ccard"><h1>Согласие</h1>'
               '<p>Перед началом коротко о том, как устроена игра и что происходит с вашими ответами.</p>'
               '<div class="ck">__CHECK_W__ Участие добровольное, можно остановиться в любой момент</div>'
               '<div class="ck">__CHECK_W__ Ответы видит только ваш психолог</div>'
               '<div class="ck">__CHECK_W__ Я прочитал(а) политику конфиденциальности</div>'
               '<a class="dlnk">Политика конфиденциальности</a><a class="dlnk">Условия использования</a>'
               '<button class="btn primary full" style="height:48px;margin-top:18px">Продолжить</button></div></div>')
    return client_shell('шаг 1 из 6', content)

def e42():
    content = ('<div class="cwrap"><div class="pbar2"><span>ШАГ 2 ИЗ 6</span><i><b style="width:33%"></b></i></div>'
               '<div class="ccard"><h1 style="font-size:17px">Как вы себя чувствуете сейчас?</h1>'
               '<div class="copt"><i></i>Спокойно, ровно</div>'
               '<div class="copt on"><i class="on"></i>Немного тревожно</div>'
               '<div class="copt"><i></i>Очень тревожно</div>'
               '<div class="copt"><i></i>Другое (опишу словами)</div>'
               '<button class="btn primary full" style="height:48px;margin-top:16px">Далее</button></div></div>')
    return client_shell('шаг 2 из 6', content)

def e42_scale():
    segs = ''
    for i in range(10):
        col = '#DC2626' if i < 3 else '#F59E0B' if i < 6 else '#16A34A'
        op = '' if i == 5 else 'opacity:.35'
        segs += f'<i style="background:{col};{op}"></i>'
    content = ('<div class="cwrap"><div class="pbar2"><span>ШАГ 3 ИЗ 6</span><i><b style="width:50%"></b></i></div>'
               '<div class="ccard"><h1 style="font-size:17px">Оцените тревогу прямо сейчас</h1>'
               '<div class="bignum" style="color:#F59E0B">6<span>/ 10</span></div>'
               f'<div class="scale2">{segs}</div>'
               '<div class="scl"><span>0–3 низкая</span><span>4–6 средняя</span><span>7–10 высокая</span></div>'
               '<button class="btn primary full" style="height:48px;margin-top:20px">Далее</button></div></div>')
    return client_shell('шаг 3 из 6', content)

def e42_timer():
    content = ('<div class="cwrap"><div class="pbar2"><span>ШАГ 4 ИЗ 6</span><i><b style="width:66%"></b></i></div>'
               '<div class="ccard" style="text-align:center"><h1 style="font-size:17px">Медленный выдох · 8 секунд</h1>'
               '<p style="text-align:center">Дышите вместе с кругом</p>'
               '<div class="ringwrap">' + ring(70) + '</div>'
               '<div class="trow2"><span class="muted">Пропустить</span>'
               '<span class="playbtn">__PAUSE_W__</span><span class="dlnk">Перезапустить</span></div>'
               '<button class="btn primary full" style="height:48px;margin-top:16px">Далее</button></div></div>')
    return client_shell('шаг 4 из 6', content)

def e42_input():
    content = ('<div class="cwrap"><div class="pbar2"><span>ШАГ 5 ИЗ 6</span><i><b style="width:83%"></b></i></div>'
               '<div class="ccard"><h1 style="font-size:17px">Что помогло вам успокоиться?</h1>'
               '<p>Пара слов — этого достаточно</p>'
               '<div class="ta2">Помогло подышать и выйти на улицу…<span>86 / 300</span></div>'
               '<button class="btn primary full" style="height:48px;margin-top:16px">Отправить</button></div></div>')
    return client_shell('шаг 5 из 6', content)

def e43():
    content = ('<div class="cwrap"><div class="ccard" style="text-align:center">'
               '__OK_BIG__<h1 style="margin-top:14px">Готово!</h1>'
               '<p style="text-align:center">Вы прошли упражнение до конца.<br>Прогресс сохранён — ваш психолог увидит результат и сможет подобрать следующую игру.</p>'
               '<button class="btn primary full" style="height:48px;margin-top:14px">__SEND_W__ Отправить психологу</button>'
               '<a class="dlnk" style="display:block;text-align:center;margin-top:16px">Закрыть</a></div></div>')
    return client_shell('готово', content)

def e44(reason=0):
    reasons = ''
    for i, r in enumerate(['истёк', 'отозван', 'использован']):
        on = ' on' if i == reason else ''
        reasons += f'<span class="rchip{on}">{r}</span>'
    content = ('<div class="cwrap"><div class="ccard" style="text-align:center">'
               '__OCT_Y__<h1 style="margin-top:14px;font-size:18px">Ссылка больше не действует</h1>'
               '<p style="text-align:center">Доступ мог истечь, быть отозван или уже использован.<br>Запросите новую ссылку у вашего психолога.</p>'
               f'<div class="rchips">{reasons}</div>'
               '<button class="btn primary full" style="height:48px;margin-top:14px">Понятно</button>'
               '<a class="dlnk" style="display:block;text-align:center;margin-top:16px">Связаться с психологом</a></div></div>')
    return client_shell('ошибка', content)

# ------------------------------------------------------------------- CSS ----
CSS = open(os.path.join(ROOT, 'build_screens5.py')).read()
# переиспользуем CSS из build_screens5: извлекаем блок между "CSS = '''" и "'''"
start = CSS.index("CSS = '''") + len("CSS = '''")
end = CSS.index("'''", start)
CSS = CSS[start:end]

DARK_CSS = '''
/* клиентские тёмные экраны (ТЗ 11.1) */
.screen.darkc{background:#0B1220;display:block}
.chead2{display:flex;align-items:center;gap:10px;height:56px;border-bottom:1px solid #1F2937;padding:0 16px;color:#F8FAFC}
.chead2 b{font-size:15px}.chead2 .stp{margin-left:auto;font-size:11px;color:#CBD5E1}
.cwrap{max-width:480px;margin:0 auto;padding:24px 16px 40px}
.ccard{background:#111827;border:1px solid #1F2937;border-radius:14px;padding:22px;color:#F8FAFC}
.ccard h1{font-size:24px;margin:10px 0 6px}
.ccard p{font-size:13px;color:#CBD5E1;margin:8px 0}
.theme{font-size:12px;color:#CBD5E1;margin-left:10px}
.dur{display:block;font-size:13px;color:#60A5FA;font-weight:500;margin:6px 0}
.invited{display:flex;gap:12px;align-items:center;background:#111C2E;border-radius:12px;padding:12px 14px;margin:14px 0}
.invited b{font-size:13px;display:block}.invited span{font-size:11px;color:#CBD5E1}
.invited .ava{width:32px;height:32px}
.foot2{display:block;text-align:center;font-size:11px;color:#CBD5E1;margin-top:12px;opacity:.7}
.pbar2{margin-bottom:12px}.pbar2 span{font-size:10px;letter-spacing:.05em;color:#CBD5E1;font-weight:500}
.pbar2 i{display:block;height:6px;background:#1F2937;border-radius:3px;margin-top:6px;overflow:hidden}
.pbar2 i b{display:block;height:100%;background:var(--acc)}
.ck{display:flex;gap:10px;align-items:flex-start;font-size:12px;color:#CBD5E1;margin:14px 0}
.ck i:first-child,.cboxd{width:18px;height:18px;border-radius:5px;background:var(--acc);flex:none;display:inline-flex;align-items:center;justify-content:center}
.dlnk{color:#60A5FA;font-weight:500;font-size:13px;text-decoration:none;display:block;margin-top:10px}
.copt{display:flex;gap:12px;align-items:center;border:1px solid #1F2937;background:#111827;border-radius:12px;padding:14px 16px;font-size:14px;color:#CBD5E1;margin-top:10px}
.copt.on{background:#16233B;border:2px solid var(--acc);color:#F8FAFC;font-weight:600}
.copt i{width:18px;height:18px;border-radius:50%;border:2px solid #1F2937;flex:none}
.copt i.on{border-color:var(--acc);background:radial-gradient(circle, var(--acc) 40%, transparent 45%)}
.bignum{font-size:56px;font-weight:700;margin:8px 0}
.bignum span{font-size:18px;color:#CBD5E1;font-weight:600}
.scale2{display:flex;gap:6px;margin-top:10px}
.scale2 i{flex:1;height:16px;border-radius:4px}
.scl{display:flex;justify-content:space-between;font-size:10px;color:#CBD5E1;margin-top:8px}
.ringwrap{display:flex;justify-content:center;margin:14px 0}
.trow2{display:flex;align-items:center;justify-content:space-between;margin-top:6px}
.playbtn{width:56px;height:56px;border-radius:50%;background:var(--acc);display:inline-flex;align-items:center;justify-content:center}
.ta2{background:#111827;border:2px solid var(--acc);border-radius:12px;padding:12px 14px;min-height:110px;font-size:14px;color:#F8FAFC;display:flex;flex-direction:column;justify-content:space-between;margin-top:12px}
.ta2 span{align-self:flex-end;font-size:11px;color:#CBD5E1}
.rchips{display:flex;gap:8px;justify-content:center;margin:12px 0}
.rchip{border:1px solid #1F2937;background:#111827;border-radius:9999px;padding:5px 12px;font-size:11px;color:#CBD5E1}
.rchip.on{background:#1E293B;color:#FCA5A5;font-weight:600}
/* кабинетные (E-30…E-33) */
.gcard{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px}
.gcard b{font-size:15px;display:block}.gcard p{font-size:13px;color:var(--ink2);margin:4px 0}
.gcard .meta{font-size:12px;color:var(--ink3);margin:8px 0 12px}
.gsel{display:flex;gap:12px;align-items:center;background:var(--bg2);border-radius:10px;padding:12px 14px;margin-bottom:6px}
.gsel b{font-size:14px;display:block}.gsel span{font-size:11px;color:var(--ink3)}
.gsel>div{flex:1}
.segrow{display:flex;gap:8px;margin-top:6px}
.seg{border:1px solid var(--bd);border-radius:9999px;padding:6px 14px;font-size:13px;color:var(--ink2);background:#fff}
.seg.on{background:#EFF6FF;border:2px solid var(--acc);color:var(--acc);font-weight:600;padding:5px 13px}
.sw{width:44px;height:24px;border-radius:9999px;background:var(--bd);display:inline-block;position:relative;margin-right:10px;vertical-align:middle}
.sw.on{background:var(--acc)}
.sw i{position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.1)}
.sw.on i{left:23px}
.oktoast{display:flex;gap:12px;align-items:center;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px 16px;margin-bottom:14px}
.oktoast b{font-size:13px;color:#166534;display:block}.oktoast span{font-size:12px;color:#15803D}
.lab{font-size:10px;font-weight:500;color:var(--ink3);letter-spacing:.06em}
.codeval{font-family:ui-monospace,monospace;font-size:30px;font-weight:600;margin:6px 0}
.urlrow{display:flex;gap:8px;margin:8px 0}
.u{flex:1;background:var(--bg2);border:1px solid var(--bd);border-radius:8px;height:32px;display:flex;align-items:center;padding:0 10px;font-family:ui-monospace,monospace;font-size:12px;color:var(--acc)}
.cp{width:32px;height:32px;border:1px solid var(--bd);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:#fff}
.qrph{position:absolute;right:16px;top:52px;width:56px;height:56px;border-radius:6px;background:repeating-conic-gradient(#0F172A 0 25%, #fff 0 50%) 0 0/14px 14px;border:1px solid var(--bd)}
.deepl{position:relative}
.crow{display:flex;gap:12px;align-items:center;padding:12px 8px;border-bottom:1px solid var(--bd)}
.crow:last-child{border-bottom:none}
.crow b{font-size:13px;display:block}.crow span{font-size:11px;color:var(--ink3)}
.crow>div{flex:1}
.crow.selrow{background:var(--bg2);border-radius:10px;border-bottom:none}
.notes{font-size:13px;color:var(--ink2);min-height:70px}
.meta2{font-size:12px;color:var(--ink3);margin:4px 0}
.thead{display:flex;gap:12px;padding:12px 4px;font-size:11px;letter-spacing:.05em;color:var(--ink3);font-weight:500;border-bottom:1px solid var(--bd)}
.thead span:nth-child(2){flex:1}.thead .tr{margin-left:auto}
.trow{display:flex;gap:12px;align-items:center;padding:11px 4px;border-bottom:1px solid var(--bd);font-size:13px}
.trow b{width:90px;flex:none;font-size:13px}
.trow .game{flex:1;color:var(--ink2)}
.trow .tm2{color:var(--ink2);font-size:12px;width:70px}
.trow .v{font-weight:600;width:40px}
.cpb{width:30px;height:28px;border:1px solid var(--bd);border-radius:8px;display:inline-flex;align-items:center;justify-content:center}
.rvb{border:1px solid #FECACA;border-radius:8px;padding:5px 10px;font-size:10px;font-weight:500;color:var(--err)}
.ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px}
'''

# ---------------------------------------------------------------- сборка ----
SECTIONS = [
    ('E-30', 'Библиотека игр', e30(), 'Фильтры по типу/теме + сетка GameCard, CTA «Выдать клиенту» (ТЗ E-30)'),
    ('E-31', 'Создание ClientAccess', e31(), 'Игра, метка, срок, лимит, уведомления → код + ссылка + QR (ТЗ E-31)'),
    ('E-32', 'Управление клиентами', e32(), 'Список клиентов + карточка: доступы, заметки E2E (ТЗ E-32)'),
    ('E-33', 'Управление доступами', e33(), 'Таблица: статус/срок/входы, Отозвать/Скопировать (ТЗ E-33)'),
]
CLIENT_SECTIONS = [
    ('E-40', 'Открытие игры · клиент', e40(), 'Публичный экран по ссылке/коду, без авторизации, тёмная тема (ТЗ E-40, 11.1)'),
    ('E-41', 'Согласие · клиент', e41(), 'Добровольность, приватность, ссылки (ТЗ E-41)'),
    ('E-42', 'Прохождение · выбор · клиент', e42(), 'Шаг-choice с радиовариантами (ТЗ E-42)'),
    ('E-43', 'Завершение · клиент', e43(), 'Обратная связь, «Отправить психологу» (ТЗ E-43)'),
    ('E-44', 'Ошибка доступа · клиент', e44(0), 'Истёк/отозван/использован — с понятным текстом (ТЗ E-44)'),
]
STEPS = [
    ('Шаг · choice', e42()),
    ('Шаг · шкала 0–10', e42_scale()),
    ('Шаг · таймер', e42_timer()),
    ('Шаг · ввод', e42_input()),
]
E44S = [e44(i) for i in range(3)]

def section(code, title, html, note):
    desk = html
    tab = html.replace('screen d', 'screen t')
    mob = html.replace('screen d', 'screen m')
    mobclip = ' style="max-height:880px"'
    return ('<section class="scr" id="' + code + '">\n<h2>' + code + ' · ' + title +
            '<span class="tok">1440 / 768 / 390</span></h2>\n<p class="note">' + note + '</p>\n'
            '<div class="frames">\n<div class="fbox"><p class="flabel">Desktop · 1440</p><div class="clip">' + desk + '</div></div>\n'
            '<div class="frow">\n<div class="fbox"><p class="flabel">Tablet · 768</p><div class="clip">' + tab + '</div></div>\n'
            '<div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip"' + mobclip + '>' + mob + '</div></div>\n'
            '</div></section>')

parts = []
for code, title, html, note in SECTIONS:
    parts.append(section(code, title, html, note))
for code, title, html, note in CLIENT_SECTIONS:
    parts.append(section(code, title, html, note))

# галерея шагов (только 390, dark)
steps_html = ''.join('<div class="fbox"><p class="flabel">390 · ' + name + '</p><div class="clip" style="max-height:880px">'
                     + h.replace('screen d', 'screen m') + '</div></div>' for name, h in STEPS)
parts.append('<section class="scr" id="E-42steps"><h2>E-42 · Типы шагов прохождения<span class="tok">7 типов: text · timer · scale · choice · input · card · branch</span></h2>'
             '<p class="note">Четыре показанных варианта покрывают все интерактивные типы; text/card — статичные карточки, branch — ветвление choice-шага (логика описывается комментариями, ТЗ 12.4). Клиентские экраны — тёмная тема.</p>'
             '<div class="frow">' + steps_html + '</div></section>')

# варианты ошибок
e44_html = ''.join('<div class="fbox"><p class="flabel">390 · ' + ['истёк', 'отозван', 'использован'][i] + '</p><div class="clip" style="max-height:860px">'
                   + h.replace('screen d', 'screen m') + '</div></div>' for i, h in enumerate(E44S))
parts.append('<section class="scr" id="E-44v"><h2>E-44 · Причины ошибки доступа<span class="tok">3 варианта</span></h2>'
             '<p class="note">Один экран, три активных причины-чипа: иконка + цвет + текст (WCAG).</p>'
             '<div class="frow">' + e44_html + '</div></section>')

toc = ''.join(f'<a href="#{c}">{c}</a>' for c, *_ in SECTIONS + CLIENT_SECTIONS) + '<a href="#E-42steps">Шаги</a><a href="#E-44v">E-44 ×3</a>'

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 06 Screens · Games + Client · v1.0</title>\n<style>' + CSS + DARK_CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 6: игры + клиент — готово</span>\n'
       '<h1 class="pt">06 · Экраны E-30…E-44</h1>\n'
       '<p class="lead">Кабинет психолога: библиотека игр, выдача доступа (код/ссылка/QR), клиенты и доступы. Клиентский сценарий: открытие по ссылке, согласие, прохождение (7 типов шагов), завершение и ошибка доступа — в тёмной теме (ТЗ 11.1). В Penpot — 30 фреймов плагина v0.6.</p>\n'
       '<nav class="toc">' + toc + '</nav>\n</header>\n'
       + '\n'.join(parts) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · Games + Client v1.0 · плагин v0.6 · источник: tokens/design-tokens.json</footer>\n'
       '</div></body></html>')

for k, v in SUBS.items():
    doc = doc.replace(k, v)
for k, v in NAV_IC.items():
    doc = doc.replace(k, v)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
