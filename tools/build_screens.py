#!/usr/bin/env python3
"""Собирает screens/04-auth-dashboard.html: 11 экранов (E-01…E-12),
каждый в 3 брейкпоинтах — разметка одна, адаптив через CSS container queries
(по правилам ТЗ 6.3: desktop sidebar → tablet иконки → mobile bottom nav)."""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '04-auth-dashboard.html')

# ---------------------------------------------------------------- иконки ----
def icon(name, size, color, extra=''):
    import re
    s = open(os.path.join(ROOT, 'icons', 'lucide', f'{name}.svg')).read()
    s = re.sub(r'<\?xml[^>]*\?>', '', s)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S).strip()
    s = re.sub(r'\s+', ' ', s)
    s = s.replace('width="24"', f'width="{size}"').replace('height="24"', f'height="{size}"')
    s = s.replace('stroke="currentColor"', f'stroke="{color}"')
    if extra:
        s = s.replace('<svg', f'<svg {extra}', 1)
    return s

I = {
    'logo': '', 'search': icon('search', 18, '#475569'),
    'home': icon('home', 20, 'currentColor'), 'book': icon('book-open', 20, 'currentColor'),
    'spark': icon('sparkles', 20, 'currentColor'), 'users': icon('users', 20, 'currentColor'),
    'chart': icon('chart-column', 20, 'currentColor'), 'gear': icon('settings', 20, 'currentColor'),
    'user': icon('user', 20, 'currentColor'), 'play': icon('play', 16, '#FFFFFF'),
    'send': icon('send', 16, '#FFFFFF'), 'send2': icon('send', 16, '#475569'),
    'info': icon('info', 18, '#2563EB'), 'frown': icon('frown', 14, '#DC2626'),
    'clock': icon('clock', 14, '#94A3B8'), 'check': icon('check', 14, '#FFFFFF'),
    'chev': icon('chevron-right', 16, '#94A3B8'), 'target': icon('target', 24, '#2563EB'),
    'trophy': icon('trophy', 22, '#2563EB'), 'zap': icon('zap', 22, '#2563EB'),
    'star': icon('star', 22, '#2563EB'), 'file': icon('file-text', 24, '#2563EB'),
    'file2': icon('file-text', 20, '#475569'), 'ok': icon('circle-check', 18, '#16A34A'),
    'warn': icon('triangle-alert', 18, '#F59E0B'), 'download': icon('download', 16, '#475569'),
    'grad': icon('graduation-cap', 20, 'currentColor'),
    'tg': icon('send', 18, '#FFFFFF'),
}

def radar_svg(size=190):
    import math
    SK = [('Слушание', 86), ('Эмпатия', 72), ('Границы', 64), ('Эмоции', 58),
          ('Структура', 77), ('Сопрот.', 49), ('Вопросы', 81), ('Рефлексия', 68)]
    cx, cy, R = size/2, size/2+6, size/2-26
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
    return f'<svg width="{size}" height="{int(size*0.92)}" viewBox="0 0 {size} {int(size*0.92)}" fill="none" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'

AVAT = '<span class="ava">АК</span>'

# ------------------------------------------------------------- партиалы ----

P_LANDING = '''
<div class="topnav">
  <span class="logo"><i class="mark"></i>Platform</span>
  <nav class="links"><a>Возможности</a><a>Сценарии</a><a>Игры</a><a>Тарифы</a></nav>
  <span class="grow"></span>
  <a class="lnk">Войти</a><button class="btn primary sm">Начать</button>
</div>
<div class="content landing">
  <div class="hero">
    <div class="hero-l">
      <span class="eyebrow">ОБУЧАЮЩАЯ ПЛАТФОРМА ДЛЯ ПСИХОЛОГОВ</span>
      <h1>Отработайте консультацию <b>до встречи с клиентом</b></h1>
      <p>Симулятор с ИИ-клиентом, разбор по 8 навыкам и терапевтические игры для ваших клиентов — в вебе и Telegram.</p>
      <div class="btns"><button class="btn primary lg">' + __PLAY__ + ' Попробовать демо</button><button class="btn secondary lg">Регистрация</button></div>
    </div>
    <div class="hero-r">
      <div class="preview">
        <div class="pv-bar"><i class="d r"></i><i class="d y"></i><i class="d g"></i><span>Демо · сценарий «Первичная консультация»</span></div>
        <div class="bub left">Здравствуйте… Честно, я уже не знаю, куда себя девать. Всё валится из рук.</div>
        <div class="bubmeta"><span class="emo">' + __FROWN__ + ' эмоция 3/10 · низкий фон</span></div>
        <div class="ao">' + __OPT1__ + '</div>
        <div class="ao">' + __OPT2__ + '</div>
      </div>
    </div>
  </div>
  <div class="advs">
    <div class="adv">' + __TARGET__ + '<div><b>8 навыков с разбором</b><span>Активное слушание, эмпатия, границы — с баллами и альтернативными ходами</span></div></div>
    <div class="adv">' + __CHART__ + '<div><b>Супервизия и прогресс</b><span>Комментарии супервизора, радар навыков, динамика по неделям</span></div></div>
    <div class="adv">' + __SPARK__ + '<div><b>Игры для клиентов</b><span>Выдавайте игры по ссылке и коду — в Telegram или вебе</span></div></div>
  </div>
</div>
<footer class="foot">© 2026 Platform · Политика конфиденциальности · Оферта</footer>
'''

P_DEMO = '''
<div class="topnav slim">
  <span class="logo"><i class="mark"></i>Platform</span>
  <span class="grow"></span><a class="lnk">Войти</a>
</div>
<div class="content">
  <div class="banner">' + __INFO__ + '<div><b>Зарегистрируйтесь, чтобы сохранить прогресс</b><span>Демо: 1 короткий сценарий · без сохранения</span></div></div>
  <div class="session">
    <div class="sess-prog"><span class="cap2">ШАГ 1 ИЗ 3</span><span class="sname">Первичная консультация</span></div>
    <div class="pbar"><i style="width:33%"></i></div>
    <div class="bub left">Здравствуйте… Честно, я уже не знаю, куда себя девать. Всё валится из рук.</div>
    <div class="bubmeta"><span class="emo">' + __FROWN__ + ' эмоция 3/10 · низкий фон</span><span class="tm">14:02</span></div>
    <div class="ao">' + __OPT3__ + '</div>
    <div class="ao">' + __OPT1__ + '</div>
    <div class="ao">' + __OPT4__ + '</div>
    <div class="own">Написать свой вариант… (beta)</div>
  </div>
</div>
<button class="mobile-cta">' + 'Зарегистрироваться и сохранить' + '</button>
'''

P_LOGIN = '''
<div class="authlogo"><i class="mark"></i>Platform</div>
<div class="authcard">
  <h1>Вход</h1>
  <button class="btn primary full">' + __TG__ + ' Войти через Telegram</button>
  <div class="div"><i></i><span>или</span><i></i></div>
  <div class="field"><span class="lbl">Email</span><div class="inp">name@example.com</div></div>
  <div class="field"><span class="lbl">Пароль</span><div class="inp">•••••••• <u>' + __EYE__ + '</u></div></div>
  <button class="btn primary full">Войти</button>
  <a class="center lnk">Забыли пароль?</a>
  <div class="switch">Нет аккаунта? <a>Регистрация</a></div>
</div>
'''

P_REGISTER = '''
<div class="authlogo"><i class="mark"></i>Platform</div>
<div class="authcard wide">
  <h1>Регистрация</h1>
  <div class="roles">
    <div class="role sel">' + __USER_A__ + '<div><b>Психолог</b><span>Практикующий специалист</span></div>' + __OKSM__ + '</div>
    <div class="role">' + __GRAD_A__ + '<div><b>Студент</b><span>Отрабатываю навыки</span></div></div>
    <div class="role">' + __USERS_A__ + '<div><b>Супервизор</b><span>По приглашению</span></div></div>
  </div>
  <div class="field"><span class="lbl">Email</span><div class="inp">name@example.com</div></div>
  <div class="field"><span class="lbl">Пароль</span><div class="inp">Придумайте пароль</div></div>
  <div class="cbrow"><span class="cbox on">' + __CHECK__ + '</span>Принимаю условия и политику конфиденциальности</div>
  <button class="btn primary full">Создать аккаунт</button>
  <div class="switch">Уже есть аккаунт? <a>Войти</a></div>
</div>
'''

P_RESET = '''
<div class="authlogo"><i class="mark"></i>Platform</div>
<div class="authcard">
  <h1>Восстановление пароля</h1>
  <p class="muted">Отправим ссылку для смены пароля на указанный email.</p>
  <div class="field"><span class="lbl">Email</span><div class="inp">name@example.com</div></div>
  <button class="btn primary full">Отправить ссылку</button>
  <a class="lnk">← Ко входу</a>
</div>
'''

def onboarding(tag, title, steps, cur, body):
    st = ''
    for i, s in enumerate(steps):
        cls = 'done' if i < cur else ('act' if i == cur else '')
        bub = ('✓' if i < cur else str(i+1))
        st += f'<div class="step {cls}"><span class="line"></span><span class="bub">{bub}</span><span class="lbl">{s}</span></div>'
    return f'''
<div class="authlogo"><i class="mark"></i>Platform</div>
<div class="obtag">{tag}</div>
<div class="steps">{st}</div>
<div class="authcard wide">
  <h1>{title}</h1>
  {body}
</div>'''

P_ONB_PSY = onboarding('ОНБОРДИНГ ПСИХОЛОГА', 'Выберите специализацию', ['Профиль','Специализация','Верификация','Готово'], 1,
'''<p class="muted">Можно выбрать несколько — подберём сценарии.</p>
<div class="chipsel">
  <span class="csel on">Тревожность ✓</span><span class="csel on">Выгорание ✓</span>
  <span class="csel">Отношения</span><span class="csel">ОКР</span><span class="csel">ПТСР</span>
  <span class="csel">Подростки</span><span class="csel">Дети</span><span class="csel">Кризисы</span>
</div>
<div class="btns"><button class="btn primary">Далее</button><a class="lnk muted">Пропустить</a></div>''')

P_ONB_STU = onboarding('ОНБОРДИНГ СТУДЕНТА', 'Вуз и группа', ['Профиль','Вуз / группа','Готово'], 1,
'''<p class="muted">Необязательно. Данные увидит только ваш супервизор.</p>
<div class="field"><span class="lbl">Вуз</span><div class="inp">МГУ, факультет психологии</div></div>
<div class="field"><span class="lbl">Группа</span><div class="inp">ПС-304</div></div>
<div class="cbrow"><span class="cbox"></span>Скрыть в профиле</div>
<div class="btns"><button class="btn primary">Далее</button><a class="lnk muted">Пропустить</a></div>''')

P_VERIFY = onboarding('ВЕРИФИКАЦИЯ', 'Подтвердите квалификацию', ['Профиль','Специализация','Верификация','Готово'], 2,
'''<p class="muted">Документ видит только модератор. После проверки — бейдж «Верифицирован» и доступ к выдаче игр.</p>
<div class="dropzone">' + __FILE__ + '<div><b>Загрузите диплом</b><span>PDF или JPG, до 10 МБ</span></div></div>
<div class="filerow">' + __FILE2__ + '<div><b>diploma.pdf</b><span>2,4 МБ · загружено</span></div>' + __OKSM__ + '</div>
<div class="strow"><span class="stchip">' + __CLOCK_Y__ + ' На проверке</span><span class="muted">обычно до 24 часов</span></div>
<button class="btn primary">Отправить на проверку</button>''')

def dash_psych():
    sess = ''
    for i in range(3):
        sess += ('<div class="trow"><span class="tm">16.09 · 14:0' + str(i) + '</span>'
                 '<b>Работа с сопротивлением</b>'
                 '<span class="score">' + str(86 - i * 4) + '</span>__CHEV__</div>')
    clients = ''
    names = ['А', 'Б', 'В']
    stcls = ['g', 'b', 'y']
    stlbl = ['активен', 'завершён', 'истёк']
    for i in range(3):
        clients += ('<div class="trow"><span class="ava sm">К' + names[i] + '</span>'
                    '<div><b>Клиент ' + names[i] + '</b><span>Дневник эмоций · ' + str(i + 2) + ' дн.</span></div>'
                    '<span class="stc ' + stcls[i] + '">' + stlbl[i] + '</span></div>')
    tiles = ''
    tdata = [('trophy', '10 сессий', 'за месяц'), ('zap', 'Серия 5 дней', 'тренировки'),
             ('star', 'Эмпатия 80+', 'новый уровень')]
    for tk, t1, t2 in tdata:
        tiles += ('<div class="tile">__' + tk.upper() + '__<div><b>' + t1 + '</b><span>' + t2 + '</span></div></div>')
    bars = ''
    bardata = [('Активное слушание', 86, '#2563EB'), ('Эмпатия', 72, '#7C3AED'),
               ('Структура', 77, '#65A30D'), ('Сопротивление', 49, '#EA580C')]
    for nm, val, col in bardata:
        bars += ('<div class="sbrow"><span class="lab">' + nm + '</span><span class="v">' + str(val) + '</span>'
                 '<i style="width:' + str(val) + '%;background:' + col + '"></i></div>')
    return (
'<div class="content dash">'
'<div class="greet"><h1>Добрый день, Анна</h1><span>понедельник, 16 сентября · 3 сессии на этой неделе</span></div>'
'<div class="ctas"><button class="btn primary">__PLAY__ Начать симуляцию</button>'
'<button class="btn secondary">__SEND2__ Выдать игру</button></div>'
'<div class="cols"><div class="col-l">'
'<div class="card"><div class="chead"><b>Прогресс навыков</b><span>средний балл 72/100</span></div>'
'<div class="radar-flex">' + radar_svg(200) + '<div class="skillbars">' + bars + '</div></div></div>'
'<div class="card"><div class="chead"><b>Последние сессии</b></div>' + sess + '</div>'
'</div><div class="col-r">'
'<div class="card"><div class="chead"><b>Активные клиенты</b></div>' + clients + '</div>'
'<div class="card"><div class="chead"><b>Достижения</b></div><div class="tiles">' + tiles + '</div></div>'
'</div></div></div>')


def dash_student():
    recs = ''
    for t, d in [('Работа с сопротивлением', 4), ('Циркулярные вопросы', 3)]:
        recs += ('<div class="card screc"><div><b>' + t + '</b>'
                 '<span class="dots">' + '●' * d + '○' * (5 - d) + '</span>'
                 '<span class="muted"> · 15 мин · рекомендовано</span></div>'
                 '<button class="btn primary sm">Начать</button></div>')
    bars = ''
    bardata = [('Слушание', 81, '#2563EB'), ('Рефлексия', 68, '#9333EA'), ('Границы', 64, '#0891B2')]
    for nm, val, col in bardata:
        bars += ('<div class="sbrow"><span class="lab">' + nm + '</span><span class="v">' + str(val) + '</span>'
                 '<i style="width:' + str(val) + '%;background:' + col + '"></i></div>')
    tiles = ''
    for tk, t1 in [('trophy', 'Первый сценарий'), ('zap', 'Серия 3 дня'), ('star', 'Слушание 80+')]:
        tiles += ('<div class="tile">__' + tk.upper() + '__<div><b>' + t1 + '</b></div></div>')
    return (
'<div class="content dash">'
'<div class="greet"><h1>Привет, Дмитрий</h1><span>рекомендовано супервизором: 2 сценария</span></div>'
'<div class="cols"><div class="col-l">' + recs +
'<div class="card"><div class="chead"><b>Мой прогресс</b></div>'
'<div class="radar-flex">' + radar_svg(180) + '<div class="skillbars">' + bars + '</div></div>'
'<span class="gr">средний балл 71 · +6 за неделю</span></div>'
'</div><div class="col-r">'
'<div class="card comment"><div class="chead"><span class="ava sm">МП</span>'
'<div><b>М. Петрова</b><span>супервизор · вчера</span></div></div>'
'<p>Хороший ход на 4-й реплике. На моменте 06:40 уместен циркулярный вопрос. Оценка: <b>82/100</b>.</p>'
'<a class="lnk">Открыть сессию →</a></div>'
'<div class="card"><div class="chead"><b>Достижения</b></div><div class="tiles">' + tiles + '</div></div>'
'</div></div></div>')


def dash_supervisor():
    students = ''
    sdata = [('ДК', 'Дмитрий К.', 'ПС-304 · 2 ч назад', 72), ('АС', 'Анна С.', 'ПС-301 · 5 ч назад', 64),
             ('МЛ', 'Мария Л.', 'ПС-304 · вчера', 81), ('ИП', 'Игорь П.', 'ПС-298 · 2 дн.', 45)]
    for ini, nm, gr, p in sdata:
        students += ('<div class="trow"><span class="ava sm">' + ini + '</span>'
                     '<div><b>' + nm + '</b><span>' + gr + '</span></div>'
                     '<div class="minibar"><i style="width:' + str(p) + '%"></i></div>'
                     '<span class="v">' + str(p) + '%</span>__CHEV__</div>')
    return (
'<div class="content dash">'
'<div class="greet"><h1>Кабинет супервизора</h1></div>'
'<div class="stats">'
'<div class="stat"><b>12</b><span>студентов</span></div>'
'<div class="stat"><b>38</b><span>сессий за неделю</span></div>'
'<div class="stat warn"><b>3</b><span>требуют внимания</span></div>'
'</div>'
'<div class="cols"><div class="col-l">'
'<div class="card"><div class="chead"><b>Мои студенты</b></div>' + students + '</div>'
'</div><div class="col-r">'
'<div class="card"><div class="chead"><b>Требуют внимания</b></div>'
'<div class="trow">__WARN__<div><b>Сессия без разбора 3 дня</b><span>Дмитрий К. · <a>открыть →</a></span></div></div>'
'<div class="trow">__WARN__<div><b>Критическая ошибка</b><span>Анна С. · <a>открыть →</a></span></div></div>'
'<button class="btn secondary">__DL__ Экспорт отчёта</button>'
'</div></div></div>')

# подстановки иконок в партиалах
SUBS = {
    '__PLAY__': I['play'], '__SEND2__': I['send2'], '__INFO__': I['info'],
    '__FROWN__': I['frown'], '__TARGET__': I['target'], '__CHART__': I['chart'],
    '__SPARK__': I['spark'], '__TG__': I['tg'], '__CHECK__': I['check'],
    '__FILE__': I['file'], '__FILE2__': I['file2'], '__OKSM__': I['ok'],
    '__WARN__': I['warn'], '__DL__': I['download'], '__TROPHY__': I['trophy'],
    '__ZAP__': I['zap'], '__STAR__': I['star'], '__CHEV__': I['chev'],
    '__EYE__': icon('eye-off', 14, '#94A3B8'), '__CLOCK_Y__': icon('clock', 13, '#92400E'),
    '__USER_A__': icon('user', 20, '#2563EB'), '__GRAD_A__': icon('graduation-cap', 20, '#94A3B8'),
    '__USERS_A__': icon('users', 20, '#94A3B8'),
}
def sub(html):
    for ok_, ov in OPTS.items():
        html = html.replace(ok_, answer_html(ov))
    for k, v in SUBS.items():
        html = html.replace("'" + k + "'", v).replace(k, v)
    html = html.replace("' + ", '').replace(" + '", '')
    return html

OPTS = {
    '__OPT1__': ('Отражаю чувство: «Похоже, сейчас для вас всё слишком»', 'эмпатия'),
    '__OPT2__': ('Расскажите, что вы уже пробовали менять?', 'вопрошание'),
    '__OPT3__': ('Рад, что вы написали. Что изменилось за последнюю неделю?', 'вопрошание'),
    '__OPT4__': ('Начнём с дыхательных упражнений, это поможет.', 'совет без запроса'),
}
def answer_html(text_tech):
    t, tech = text_tech
    return (f'<div class="ao-txt">{t}</div>'
            f'<span class="tech"><i style="background:#2563EB"></i>{tech}</span>')

# --------------------------------------------------------------- шаблон ----
CSS = '''
:root{--bg:#fff;--bg2:#F7F8FA;--bg3:#EEF0F4;--ink:#0F172A;--ink2:#475569;--ink3:#94A3B8;--bd:#E2E8F0;--acc:#2563EB;--err:#DC2626;--warn:#F59E0B;--r:12px;--sh:0 4px 12px rgba(0,0,0,.08);--f:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:var(--f);background:#EEF1F6;color:var(--ink);font-size:15px}
.wrap{max-width:1240px;margin:0 auto;padding:24px 24px 120px}
header.page{padding:32px 0 8px}
.chip-top{display:inline-flex;background:#EEF2FF;color:var(--acc);border:1px solid #C7D7FE;border-radius:9999px;padding:4px 12px;font-size:12px;font-weight:600}
h1.pt{font-size:34px;margin:14px 0 6px}.lead{color:var(--ink2);max-width:820px}
nav.toc{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 8px}
nav.toc a{font-size:13px;color:var(--ink2);background:#fff;border:1px solid var(--bd);border-radius:9999px;padding:5px 12px;text-decoration:none}
section.scr{background:#F7F8FA;border:1px solid var(--bd);border-radius:16px;padding:28px;margin-top:28px}
.scr>h2{font-size:21px}.scr>h2 .tok{font-size:11px;color:var(--ink3);font-family:ui-monospace,monospace;font-weight:500;margin-left:8px}
.scr>.note{font-size:13px;color:var(--ink2);margin-top:4px;max-width:860px}
.frames{display:flex;flex-direction:column;gap:20px;margin-top:18px}
.frow{display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start}
.fbox{background:#DDE3EC;border-radius:14px;padding:10px;flex:none}
.fbox .flabel{font-family:ui-monospace,monospace;font-size:11px;color:#475569;margin:0 0 6px 4px}
.clip{overflow:hidden;border-radius:8px;box-shadow:0 10px 30px rgba(15,23,42,.18)}
/* ---------- ЭКРАН ---------- */
.screen{container-type:inline-size;position:relative;background:var(--bg);display:flex;width:100%;overflow:hidden}
.screen.d{height:760px}.screen.t{width:768px;height:1024px}.screen.m{width:390px}
/* сайдбары/панели */
.sb{display:flex;flex-direction:column;width:240px;background:var(--bg2);border-right:1px solid var(--bd);flex:none}
.sb .logo{display:flex;align-items:center;gap:10px;font-weight:700;padding:20px 24px 12px}
.mark{width:24px;height:24px;border-radius:8px;background:var(--acc);display:inline-block;flex:none}
.sb nav{display:flex;flex-direction:column;gap:2px;padding:12px}
.sb nav a{display:flex;gap:10px;align-items:center;padding:9px 12px;border-radius:10px;color:var(--ink2);font-size:14px;text-decoration:none}
.sb nav a.on{background:#fff;color:var(--ink);font-weight:600;box-shadow:inset 3px 0 0 var(--acc)}
.sb nav a svg{color:var(--ink3)}.sb nav a.on svg{color:var(--acc)}
.sb .ucard{margin-top:auto;display:flex;gap:10px;align-items:center;padding:16px 20px;border-top:1px solid var(--bd)}
.sbi{display:none;flex-direction:column;width:64px;background:var(--bg2);border-right:1px solid var(--bd);align-items:center;padding:16px 0;gap:6px;flex:none}
.sbi a{padding:10px;border-radius:10px;color:var(--ink3)}.sbi a.on{background:#fff;color:var(--acc)}
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topb{display:flex;align-items:center;gap:14px;height:64px;border-bottom:1px solid var(--bd);padding:0 24px;flex:none}
.topb b{font-size:18px}
.topb .grow,.topnav .grow{flex:1}
.mnav{display:none;position:absolute;left:0;right:0;bottom:0;height:64px;background:#fff;border-top:1px solid var(--bd);z-index:5}
.mnav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:9px;color:var(--ink3);text-decoration:none}
.mnav a.on{color:var(--acc);font-weight:600}
.content{flex:1;padding:24px;overflow:hidden}
/* общие элементы */
.ava{width:32px;height:32px;border-radius:50%;background:#7C3AED;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex:none}
.ava.sm{width:32px;height:32px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:9999px;font-family:var(--f);font-weight:600;font-size:14px;height:40px;padding:0 16px;cursor:pointer}
.btn.sm{height:32px;font-size:13px;padding:0 14px}
.btn.lg{height:48px;font-size:15px}
.btn.primary{background:var(--acc);color:#fff}.btn.secondary{background:#fff;border:1px solid var(--bd);color:var(--ink)}
.btn.full{width:100%}
.lnk{color:var(--acc);font-weight:500;text-decoration:none;font-size:14px}
.muted{color:var(--ink3)}.cap2{font-size:11px;letter-spacing:.05em;color:var(--ink3);font-weight:500}
.card{background:#fff;border:1px solid var(--bd);border-radius:var(--r);box-shadow:0 1px 2px rgba(0,0,0,.04);padding:18px}
.chead{display:flex;align-items:center;gap:10px;margin-bottom:10px}.chead b{font-size:15px}.chead>span{font-size:12px;color:var(--ink2);margin-left:auto}
.trow{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd);font-size:13px}
.trow:last-of-type{border-bottom:none}
.trow b{font-size:13px}.trow .tm{color:var(--ink3);font-size:12px;width:92px;flex:none}
.trow>div{flex:1;min-width:0}.trow>div span{display:block;font-size:11px;color:var(--ink3)}
.score{background:#DCFCE7;color:#166534;border-radius:12px;padding:2px 10px;font-size:12px;font-weight:600}
.stc{border-radius:12px;padding:3px 10px;font-size:11px;font-weight:500}
.stc.g{background:#DCFCE7;color:#166534}.stc.b{background:#E0F2FE;color:#0C4A6E}.stc.y{background:#FEF3C7;color:#92400E}
.minibar{width:100px;height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;flex:none}
.minibar i{display:block;height:100%;background:var(--acc)}
.v{font-weight:600;font-size:12px}
/* лендинг */
.topnav{display:flex;align-items:center;gap:20px;padding:16px 24px;border-bottom:1px solid var(--bd)}
.topnav .logo{display:flex;align-items:center;gap:10px;font-weight:700}
.topnav .links{display:flex;gap:22px}.topnav .links a{color:var(--ink2);font-size:14px;text-decoration:none}
.landing{padding:0}
.hero{display:flex;gap:32px;padding:40px 24px 24px;align-items:flex-start}
.hero-l{flex:1;min-width:0}
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--acc)}
.hero h1{font-size:38px;line-height:1.15;margin:12px 0}
.hero h1 b{color:var(--acc)}
.hero p{color:var(--ink2);font-size:16px;max-width:520px}
.btns{display:flex;gap:14px;margin-top:22px;flex-wrap:wrap}
.hero-r{flex:1.05;min-width:0}
.preview{background:#fff;border:1px solid var(--bd);border-radius:14px;box-shadow:var(--sh);padding:16px}
.pv-bar{display:flex;gap:6px;align-items:center;margin-bottom:14px}
.pv-bar .d{width:10px;height:10px;border-radius:50%}.d.r{background:#FCA5A5}.d.y{background:#FCD34D}.d.g{background:#86EFAC}
.pv-bar span{font-size:11px;color:var(--ink3);margin-left:8px}
.bub{background:var(--bg2);border-radius:12px;padding:10px 14px;font-size:14px;max-width:92%}
.bub.right{background:var(--acc);color:#fff;margin-left:auto}
.bubmeta{display:flex;gap:8px;font-size:11px;margin:6px 0 12px}
.emo{color:var(--err);font-weight:500;display:inline-flex;gap:5px;align-items:center}
.tm{margin-left:auto;color:var(--ink3)}
.ao{border:1px solid var(--bd);border-radius:12px;padding:9px 14px;font-size:13px;margin-top:10px;background:#fff}
.ao .ao-txt{display:block}
.ao .tech,.tech{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:9999px;border:1px solid var(--bd);background:#fff;font-size:11px;font-weight:500;color:#1D4ED8;margin-top:8px}
.tech i{width:8px;height:8px;border-radius:50%}
.advs{display:flex;gap:16px;padding:8px 24px 28px}
.adv{flex:1;background:#fff;border:1px solid var(--bd);border-radius:14px;padding:18px;display:flex;gap:14px}
.adv b{font-size:14px;display:block}.adv span{font-size:12px;color:var(--ink2)}
.foot{background:var(--ink);color:var(--ink3);font-size:12px;padding:18px 24px}
/* баннер и сессия */
.banner{display:flex;gap:12px;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:12px 16px;margin-bottom:16px}
.banner b{font-size:13px;color:#1E40AF;display:block}.banner span{font-size:12px;color:#3B82F6}
.session{max-width:680px;margin:0 auto}
.sess-prog{display:flex;gap:12px;align-items:baseline;margin-bottom:6px}
.sname{font-size:13px;font-weight:600}
.pbar{height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:16px}
.pbar i{display:block;height:100%;background:var(--acc)}
.own{border:1px dashed var(--ink3);border-radius:10px;padding:12px 16px;font-size:13px;color:var(--ink3);margin-top:4px}
.mobile-cta{display:none}
/* auth */
.screen.auther{display:block}
.authlogo{display:flex;align-items:center;gap:10px;font-weight:700;padding:18px 22px}
.authcard{width:400px;max-width:calc(100% - 32px);margin:6vh auto 0;background:#fff;border:1px solid var(--bd);border-radius:16px;box-shadow:var(--sh);padding:26px}
.authcard.wide{width:480px}
.authcard h1{font-size:22px;margin-bottom:18px}
.authcard .muted{font-size:13px;margin-bottom:14px}
.div{display:flex;align-items:center;gap:10px;margin:14px 0;color:var(--ink3);font-size:12px}
.div i{flex:1;height:1px;background:var(--bd)}
.field{margin-bottom:12px}
.field .lbl{font-size:12px;font-weight:500;color:var(--ink2);display:block;margin-bottom:5px}
.inp{height:40px;border:1px solid var(--bd);border-radius:8px;padding:10px 12px;font-size:14px;color:var(--ink);background:#fff;display:flex;align-items:center;justify-content:space-between}
.inp u{display:inline-flex;text-decoration:none}
.center{display:block;text-align:center;margin-top:12px}
.switch{text-align:center;font-size:13px;color:var(--ink2);margin-top:14px}
.roles{display:flex;gap:8px;margin-bottom:14px}
.role{flex:1;border:1px solid var(--bd);border-radius:10px;padding:10px;display:flex;gap:8px;align-items:flex-start}
.role b{font-size:12px;display:block}.role span{font-size:10px;color:var(--ink3)}
.role svg{flex:none;margin-top:2px}
.role.sel{background:#EFF6FF;border-color:var(--acc);border-width:2px}
.role.sel b{color:var(--acc)}
.cbrow{display:flex;gap:9px;align-items:center;font-size:12px;color:var(--ink2);margin:6px 0 14px}
.cbox{width:18px;height:18px;border:1px solid var(--bd);border-radius:5px;background:#fff;flex:none;display:inline-flex;align-items:center;justify-content:center}
.cbox.on{background:var(--acc);border-color:var(--acc)}
.obtag{font-size:11px;font-weight:500;color:var(--ink3);letter-spacing:.06em;padding:0 24px}
.steps{display:flex;justify-content:center;padding:16px 0 20px}
.step{display:flex;flex-direction:column;align-items:center;width:96px;position:relative}
.step .line{position:absolute;top:12px;right:48px;width:96px;height:2px;background:var(--bg3)}
.step:first-child .line{display:none}
.step.done .line,.step.act .line{background:var(--acc)}
.step .bub{width:24px;height:24px;border-radius:50%;background:var(--bg3);color:var(--ink3);font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;z-index:1}
.step.done .bub,.step.act .bub{background:var(--acc);color:#fff}
.step .lbl{font-size:10px;color:var(--ink2);margin-top:7px}
.chipsel{display:flex;flex-wrap:wrap;gap:9px;margin:6px 0 18px}
.csel{border:1px solid var(--bd);border-radius:9999px;padding:7px 14px;font-size:13px;color:var(--ink2)}
.csel.on{background:#EFF6FF;border:2px solid var(--acc);color:var(--acc);font-weight:600}
.dropzone{border:1.5px dashed var(--acc);background:var(--bg2);border-radius:12px;padding:18px;display:flex;gap:14px;align-items:center;margin:8px 0 10px}
.dropzone b{font-size:14px;display:block}.dropzone span{font-size:12px;color:var(--ink3)}
.filerow{display:flex;gap:12px;align-items:center;border:1px solid var(--bd);border-radius:10px;padding:10px 14px;margin-bottom:10px}
.filerow b{font-size:13px;display:block}.filerow span{font-size:11px;color:var(--ink3)}
.filerow>div{flex:1}
.strow{display:flex;gap:10px;align-items:center;margin-bottom:16px}
.stchip{display:inline-flex;gap:6px;align-items:center;background:#FEF3C7;color:#92400E;border-radius:9999px;padding:5px 12px;font-size:12px;font-weight:500}
/* dashboards */
.greet h1{font-size:23px}.greet span{font-size:13px;color:var(--ink2)}
.ctas{display:flex;gap:12px;margin:16px 0}
.cols{display:flex;gap:18px;align-items:flex-start}
.col-l{flex:1.5;display:flex;flex-direction:column;gap:16px;min-width:0}
.col-r{flex:1;display:flex;flex-direction:column;gap:16px;min-width:0}
.radar-flex{display:flex;gap:16px;align-items:center}
.skillbars{flex:1;display:flex;flex-direction:column;gap:12px;min-width:120px}
.sb-r{font-size:12px}
.sb-r span:first-child{color:var(--ink2);font-size:12px}
.sb-r .v{margin-left:8px}
.sb-r i{display:block;height:6px;background:var(--bg3);border-radius:3px;margin-top:4px;position:relative}
.sb-r i{background:var(--bg3)} 
.sbrow{font-size:12px}.sbrow .lab{color:var(--ink2)}
.tiles{display:flex;gap:10px}
.tile{flex:1;background:var(--bg2);border-radius:10px;padding:12px}
.tile b{font-size:12px;display:block;margin-top:6px}.tile span{font-size:10px;color:var(--ink3)}
.comment p{font-size:13px;color:var(--ink2);margin:6px 0}
.gr{font-size:12px;color:#16A34A;font-weight:500}
.stats{display:flex;gap:12px;margin:14px 0}
.stat{background:var(--bg2);border-radius:12px;padding:14px 18px;min-width:130px}
.stat b{font-size:22px}.stat span{font-size:11px;color:var(--ink3);display:block}
.stat.warn b{color:#B45309}
.screc{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px}
.screc b{font-size:14px;display:block}
.dots{color:var(--acc);font-size:10px;letter-spacing:2px}
/* ---------- container queries ---------- */
@container (max-width: 900px) {
  .sb{display:none}.sbi{display:flex}
  .hero{flex-direction:column}.hero-r{width:100%}
  .advs{flex-direction:column}
  .cols{flex-direction:column}.col-l,.col-r{width:100%}
  .content{padding:20px}
}
@container (max-width: 500px) {
  .sbi{display:none}
  .mnav{display:flex}
  .topb{padding:0 16px}.topb b{font-size:16px}
  .content{padding:16px 16px 80px}
  .hero h1{font-size:28px}
  .links{display:none}
  .roles{flex-direction:column}
  .ctas{flex-direction:column}.ctas .btn{width:100%}
  .authcard{margin-top:3vh}
  .stats{flex-wrap:wrap}.stat{flex:1;min-width:100px}
  .radar-flex{flex-direction:column;align-items:flex-start}
  .mobile-cta{display:block;position:absolute;bottom:76px;left:16px;right:16px;height:48px;border-radius:24px;background:var(--acc);color:#fff;font-weight:600;font-size:14px;border:none;z-index:6}
  .radar-flex svg{margin:0 auto}
}
'''

APP_SHELL = '''<div class="screen d">
<div class="sb">
  <span class="logo"><i class="mark"></i>Platform</span>
  <nav>
    <a class="{a0}">' + __HOME__ + ' Дашборд</a>
    <a class="{a1}">' + __BOOK__ + ' Сценарии</a>
    <a class="{a2}">' + __SPARK__ + ' Игры</a>
    <a class="{a3}">' + __USERS__ + ' Клиенты</a>
    <a class="{a4}">' + __CHART__ + ' Прогресс</a>
    <a class="{a5}">' + __GEAR__ + ' Настройки</a>
  </nav>
  <div class="ucard">' + AVAT + '<div><b style="font-size:13px">Анна К.</b><br><span style="font-size:11px;color:var(--ink3)">{role}</span></div></div>
</div>
<div class="sbi">
  <span style="margin-bottom:10px"><i class="mark"></i></span>
  <a class="{a0}">' + __HOME__ + '</a><a class="{a1}">' + __BOOK__ + '</a><a class="{a2}">' + __SPARK__ + '</a>
  <a class="{a3}">' + __USERS__ + '</a><a class="{a4}">' + __CHART__ + '</a><a class="{a5}">' + __GEAR__ + '</a>
</div>
<div class="main">
  <div class="topb"><b>{title}</b><span class="grow"></span>' + __SEARCH__ + AVAT + '</div>
  {content}
</div>
<div class="mnav">
  <a class="{a0}">' + __HOME__ + ' Главная</a><a class="{a1}">' + __BOOK__ + ' Сценарии</a>
  <a class="{a2}">' + __SPARK__ + ' Игры</a><a class="{a4}">' + __CHART__ + ' Прогресс</a>
  <a>' + __USER__ + ' Профиль</a>
</div>
</div>'''

AUTH_SHELL = '''<div class="screen d auther" style="height:{h}px">
{content}
</div>'''

NAV_IC = {'__HOME__': I['home'], '__BOOK__': I['book'], '__SPARK__': I['spark'],
          '__USERS__': I['users'], '__CHART__': I['chart'], '__GEAR__': I['gear'],
          '__USER__': I['user'], '__SEARCH__': I['search']}
SUBS.update(NAV_IC)

def app_shell(title, content, active=0, role='психолог'):
    a = [f'a{i}' for i in range(6)]
    cls = {f'a{i}': ('on' if i == active else '') for i in range(6)}
    shell = APP_SHELL.replace('{title}', title).replace('{content}', content).replace('{role}', role)
    for k, v in cls.items():
        shell = shell.replace('{' + k + '}', v)
    return shell

def auth_shell(content, h=760):
    return AUTH_SHELL.replace('{content}', content).replace('{h}', str(h))

SCREENS = [
    ('E-01', 'Лендинг', 'web', sub(P_LANDING), None, 'Hero + 3 преимущества + демо-превью + футер (ТЗ E-01)'),
    ('E-02', 'Демо-симуляция (гость)', 'app', sub(P_DEMO), 1, 'Баннер «зарегистрируйтесь» + короткий сценарий (ТЗ E-02)'),
    ('E-03', 'Вход', 'auth', sub(P_LOGIN), None, 'Telegram-вход + email/пароль (ТЗ E-03)'),
    ('E-04', 'Регистрация', 'auth', sub(P_REGISTER), None, 'Выбор роли + согласие (ТЗ E-04)'),
    ('E-05', 'Восстановление пароля', 'auth', sub(P_RESET), None, 'ТЗ E-05'),
    ('E-06', 'Онбординг психолога', 'auth', sub(P_ONB_PSY), None, 'Шаги: профиль → специализация → верификация → готово (ТЗ E-06)'),
    ('E-07', 'Онбординг студента', 'auth', sub(P_ONB_STU), None, 'Шаги: профиль → вуз/группа → готово (ТЗ E-07)'),
    ('E-08', 'Верификация', 'auth', sub(P_VERIFY), None, 'Загрузка диплома, статус, комментарий модератора (ТЗ E-08)'),
    ('E-10', 'Дашборд психолога', 'app', dash_psych(), 0, 'Радар + сессии + клиенты + достижения (ТЗ E-10)'),
    ('E-11', 'Дашборд студента', 'app', dash_student(), 0, 'Рекомендации + комментарий супервизора (ТЗ E-11)'),
    ('E-12', 'Дашборд супервизора', 'app', dash_supervisor(), 3, 'Студенты + требуют внимания (ТЗ E-12)'),
]

def render_screen(kind, content, h):
    if kind == 'auth':
        return auth_shell(content, h)
    if kind == 'web':
        return f'<div class="screen d" style="height:{h}px;flex-direction:column">{content}</div>'
    return app_shell('Дашборд', content, 0)

# E-02 demo — без сайдбара (гость), свой каркас:
def render_demo(content):
    return f'<div class="screen d" style="height:760px;flex-direction:column">{content}</div>'

sections = []
for code, title, kind, content, active, note in SCREENS:
    if code == 'E-02':
        variants = [('1440 (масштаб)', f'<div class="screen d" style="height:760px;flex-direction:column">{content}</div>', 760)]
        mobile = f'<div class="screen m" style="height:844px;flex-direction:column">{content}</div>'
        tablet = None
    else:
        base = render_screen(kind, content, 760)
        variants = [('1440 (масштаб)', base, 760)]
        tablet = None
        mobile = base.replace('screen d', 'screen m').split('</div>')[0]  # не используется
        # простая пересборка: та же разметка в .screen.m
        if kind == 'auth':
            tablet = auth_shell(content, 900).replace('screen d', 'screen t')
            mobile = auth_shell(content, 844).replace('screen d', 'screen m')
        elif kind == 'web':
            tablet = f'<div class="screen t" style="height:1024px;flex-direction:column">{content}</div>'
            mobile = f'<div class="screen m" style="height:900px;flex-direction:column">{content}</div>'
        else:
            tablet = app_shell('Дашборд', content, active if active is not None else 0).replace('screen d', 'screen t')
            mobile = app_shell('Дашборд', content, active if active is not None else 0).replace('screen d', 'screen m')
    html = f'''<section class="scr" id="{code}">
<h2>{code} · {title}<span class="tok">3 брейкпоинта</span></h2>
<p class="note">{note}</p>
<div class="frames">
<div class="fbox"><p class="flabel">Desktop · 1440</p><div class="clip">{variants[0][1]}</div></div>'''
    if tablet:
        html += f'''
<div class="frow">
<div class="fbox"><p class="flabel">Tablet · 768</p><div class="clip">{tablet}</div></div>
<div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip">{mobile}</div></div>
</div>'''
    else:
        html += f'''
<div class="frow"><div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip">{mobile}</div></div></div>'''
    html += '</div></section>'
    sections.append(sub(html))

toc = ''.join(f'<a href="#{c}">{c}</a>' for c, *_ in SCREENS)

doc = f'''<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Platform Design · 04 Screens · Auth + Dashboards · v1.0</title>
<style>{CSS}</style></head><body>
<div class="wrap">
<header class="page">
<span class="chip-top">● Platform Design</span> <span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 4: экраны Auth + Дашборды — готово</span>
<h1 class="pt">04 · Экраны E-01…E-12</h1>
<p class="lead">Каждый экран показан в 3 брейкпоинтах. Разметка одна — адаптив переключается container queries по правилам ТЗ 6.3: desktop — sidebar, tablet — иконки, mobile — bottom nav. В Penpot эти же фреймы (1440/768/390) генерирует плагин Platform Builder v0.4 с именами «E-XX Название / breakpoint».</p>
<nav class="toc">{toc}</nav>
</header>
{chr(10).join(sections)}
<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · Screens v1.0 · плагин v0.4: 33 фрейма E-01…E-12 · источник: tokens/design-tokens.json</footer>
</div></body></html>'''

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
