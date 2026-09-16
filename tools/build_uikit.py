#!/usr/bin/env python3
"""Собирает uikit/02-components.html: инжектит специмены компонентов и иконки."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(ROOT, 'uikit', '02-components.html')

def icon(name, size, color, extra=''):
    s = open(os.path.join(ROOT, 'icons', 'lucide', f'{name}.svg')).read()
    s = re.sub(r'<\?xml[^>]*\?>', '', s)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S).strip()
    s = re.sub(r'\s+', ' ', s)
    s = s.replace('width="24"', f'width="{size}"').replace('height="24"', f'height="{size}"')
    s = s.replace('stroke="currentColor"', f'stroke="{color}"')
    s = s.replace('<svg', f'<svg {extra}', 1)
    return s

CHECK = icon('check', 14, '#FFFFFF')
MINUS = icon('minus', 14, '#FFFFFF')
X_INK3 = icon('x', 14, '#94A3B8')
CHEV_D = icon('chevron-down', 16, '#475569')
CHEV_U = icon('chevron-up', 16, '#475569')
CHEV_L = icon('chevron-left', 14, '#94A3B8')
CHEV_R = icon('chevron-right', 14, '#475569')
CHEV_U_ACC = icon('chevron-up', 13, '#2563EB')
CHECK_ACC16 = icon('check', 16, '#2563EB')
CHECK_W12 = icon('check', 12, '#FFFFFF')
SEARCH16 = icon('search', 16, '#94A3B8')
CX16 = icon('circle-x', 16, '#DC2626')
USER24 = icon('user', 24, '#94A3B8')

# ---------- Кнопки ----------
BTN_VARIANTS = [
    ('primary', 'Продолжить', {'default': 'var(--acc)', 'hover': 'var(--acc-h)', 'active': 'var(--acc-a)'}),
    ('secondary', 'Вторичная', {'default': 'var(--bg2)', 'hover': 'var(--bg3)', 'active': 'var(--bd)'}),
    ('ghost', 'Отмена', {'default': 'transparent', 'hover': 'var(--bg3)', 'active': 'var(--bd)'}),
    ('danger', 'Удалить', {'default': 'var(--err)', 'hover': 'var(--err-h)', 'active': '#991B1B'}),
    ('link', 'Ссылка', {'default': 'transparent', 'hover': 'transparent', 'active': 'transparent'}),
]
STATES = ['default', 'hover', 'active', 'focus', 'disabled', 'loading']

def buttons_matrix():
    out = []
    for vname, label, bgs in BTN_VARIANTS:
        out.append(f'<div style="min-width:100%"><div style="font-family:ui-monospace,monospace;font-size:12px;font-weight:600;color:var(--acc);margin-bottom:10px">{vname}</div>')
        out.append('<div style="display:flex;gap:16px;flex-wrap:wrap">')
        for st in STATES:
            style = f'style="background:{bgs[st]}"' if st in ('hover', 'active') else ''
            cls = 'btn primary md' if vname == 'primary' else f'btn {vname} md'
            extra_cls, attr = '', ''
            inner = label
            if st == 'focus': extra_cls = ' focus-ring'
            if st == 'disabled': extra_cls, attr = ' disabled', ' disabled'
            if st == 'loading': extra_cls, inner = ' loading', '<span class="spin"></span>' + label
            out.append(f'<div class="spec"><button class="{cls}{extra_cls}" {attr} {style}>{inner}</button><span class="cap">{st}</span></div>')
        out.append('</div></div>')
    return '\n'.join(out)

# ---------- Инпуты ----------
INPUT_ERR = f'''<div class="field"><span class="lbl">Email</span>
<div class="errwrap"><input class="inp err" value="ivan@" style="padding-right:36px">{CX16}</div>
<span class="help err">Введите корректный email</span><span class="cap">error + иконка (не только цвет)</span></div>'''
INPUT_SEARCH = f'''<div class="field"><span class="lbl">Поиск</span>
<div class="searchwrap">{SEARCH16}<input class="inp" placeholder="Сценарий или навык…" style="padding-left:36px"></div>
<span class="help">Подсказка под полем</span><span class="cap">search · префикс-иконка</span></div>'''

# ---------- Select ----------
SELECT_OPEN = f'''<div class="spec"><div class="sel"><div class="inp"><span>Еженедельно</span>{CHEV_D}</div>
<div class="menu">
<div class="opt">Ежедневно</div>
<div class="opt hl"><span>Еженедельно</span>{CHECK_ACC16}</div>
<div class="opt">Ежемесячно</div>
</div></div><span class="cap">open · выбранное выделено</span></div>'''

# ---------- Чекбоксы/радио/свитчи ----------
def checkboxes():
    spec = '''<style>
.cb .box svg{display:none}
.cb input:checked + .box svg{display:block}
.sw.dis .track{background:var(--bg3)}
.sw.dis input:checked ~ .track{background:var(--bg3)}
.sw.dis .knob{background:var(--bg2)}
.step .line{display:none}
.step + .step .line{display:block}
.step:first-child .line{display:none !important}
</style>'''
    items = [
        ('unchecked', False, False, ''),
        ('checked', True, False, ''),
        ('indeterminate', True, False, 'ind'),
        ('disabled', False, False, 'dis'),
        ('focus', False, False, 'focus'),
    ]
    out = [spec]
    for name, checked, _, cls in items:
        box_inner = CHECK if name != 'indeterminate' else MINUS
        if name == 'indeterminate':
            out.append(f'<div class="spec"><div class="cb"><input type="checkbox" checked><span class="box" style="background:var(--acc);border-color:var(--acc)">{box_inner}</span>Согласен с условиями</div><span class="cap">{name} (−)</span></div>')
        elif name == 'disabled':
            out.append(f'<div class="spec"><div class="cb dis"><input type="checkbox" disabled><span class="box">{CHECK}</span>Согласен с условиями</div><span class="cap">{name}</span></div>')
        elif name == 'focus':
            out.append(f'<div class="spec"><div class="cb"><input type="checkbox"><span class="box" style="outline:2px solid var(--acc);outline-offset:3px">{CHECK}</span>Согласен с условиями</div><span class="cap">{name} · кольцо 2px</span></div>')
        else:
            out.append(f'<div class="spec"><label class="cb"><input type="checkbox"{" checked" if checked else ""}><span class="box">{CHECK}</span>Согласен с условиями</label><span class="cap">{name} · кликабельно</span></div>')
    return '\n'.join(out)

def radios():
    out = []
    for name, checked, disabled in [('unchecked', False, False), ('checked', True, False), ('disabled', False, True)]:
        if disabled:
            out.append(f'<div class="spec"><div class="cb rd dis"><input type="radio" disabled><span class="box"></span>Вариант</div><span class="cap">{name}</span></div>')
        else:
            out.append(f'<div class="spec"><label class="cb rd"><input type="radio" name="rd-demo"{" checked" if checked else ""}><span class="box"></span>Вариант</label><span class="cap">{name} · кликабельно</span></div>')
    return '\n'.join(out)

def switches():
    out = []
    for on, dis, cap in [(False, False, 'off'), (True, False, 'on · кликабельно'), (False, True, 'off + disabled'), (True, True, 'on + disabled')]:
        cls = 'sw dis' if dis else 'sw'
        out.append(f'''<div class="spec"><label class="{cls}"><input type="checkbox"{" checked" if on else ""}{" disabled" if dis else ""}>
<span class="track"></span><span class="knob"></span></label>
<span style="font-size:14px;color:{'var(--ink3)' if dis else 'var(--ink)'};margin-top:2px">Уведомления</span><span class="cap">{cap}</span></div>''')
    return '\n'.join(out)

# ---------- Чипы ----------
CHIPS_MD = ''.join([
    f'<div class="spec"><span class="chip neutral md">Черновик</span><span class="cap">neutral</span></div>',
    f'<div class="spec"><span class="chip info md">Инфо</span><span class="cap">info</span></div>',
    f'<div class="spec"><span class="chip success md">Пройдено</span><span class="cap">success</span></div>',
    f'<div class="spec"><span class="chip warning md">На проверке</span><span class="cap">warning</span></div>',
    f'<div class="spec"><span class="chip error md">Ошибка</span><span class="cap">error</span></div>',
])
SKILLS = [('активное слушание', '#2563EB'), ('эмпатия', '#7C3AED'), ('границы', '#0891B2'),
          ('эмоции', '#DB2777'), ('структура', '#65A30D'), ('сопротивление', '#EA580C'),
          ('вопрошание', '#0EA5E9'), ('рефлексия', '#9333EA')]
CHIPS_SKILLS = ''.join(
    f'<span class="chip skill sm"><span class="dot" style="background:{c}"></span>{n}</span>'
    for n, c in SKILLS)

# ---------- Аватары ----------
def avatars():
    row1 = []
    for sz in [24, 32, 40, 48, 64]:
        fs = round(sz * 0.36)
        row1.append(f'<div class="spec"><span class="ava" style="width:{sz}px;height:{sz}px;font-size:{fs}px">АК</span><span class="cap">initials · {sz}</span></div>')
    row2 = []
    for sz in [24, 32, 40, 48, 64]:
        isz = round(sz * 0.6)
        row2.append(f'<div class="spec"><span class="ava fb" style="width:{sz}px;height:{sz}px">{icon("user", isz, "#94A3B8")}</span><span class="cap">fallback · {sz}</span></div>')
    return ('<div style="display:flex;gap:24px;flex-wrap:wrap;width:100%">' + ''.join(row1) + '</div>'
            + '<div style="display:flex;gap:24px;flex-wrap:wrap;width:100%;margin-top:8px">' + ''.join(row2) + '</div>')

# ---------- Ring + steps ----------
def ring(pct, size=48):
    r = 16; circ = round(2 * 3.14159265 * r, 1); off = round(circ * (1 - pct / 100), 1)
    return f'''<svg width="{size}" height="{size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="{r}" stroke="#EEF0F4" stroke-width="5"/>
<circle cx="20" cy="20" r="{r}" stroke="#2563EB" stroke-width="5" stroke-linecap="round" stroke-dasharray="{circ}" stroke-dashoffset="{off}" transform="rotate(-90 20 20)"/></svg>'''

def steps():
    labels = ['Профиль', 'Специализация', 'Верификация', 'Готово']
    out = ['<div class="steps">']
    for i, lb in enumerate(labels):
        cls = 'step done' if i < 1 else ('step act' if i == 1 else 'step')
        bub = CHECK_W12 if i < 1 else str(i + 1)
        out.append(f'<div class="{cls}"><span class="line"></span><span class="bub">{bub}</span><span class="lbl">{lb}</span></div>')
    out.append('</div>')
    return '\n'.join(out)

# ---------- Аккордеон ----------
ACCORDION = f'''<div class="spec"><div class="acc">
<div class="item"><div class="head">Что входит в разбор сессии? {CHEV_U}</div>
<div class="body">Полный разбор: баллы по 8 навыкам, ключевые моменты, альтернативные ходы и комментарий супервизора.</div></div>
<div class="item"><div class="head">Как начисляются очки? {CHEV_D}</div></div>
</div><span class="cap">expanded (первый пункт)</span></div>
<div class="spec"><div class="acc">
<div class="item"><div class="head">Что входит в разбор сессии? {CHEV_D}</div></div>
<div class="item"><div class="head">Как начисляются очки? {CHEV_D}</div></div>
</div><span class="cap">collapsed</span></div>'''

# ---------- Таблица ----------
TABLE = f'''<div class="spec">
<table class="data">
<thead><tr><th>ДАТА</th><th>СЦЕНАРИЙ</th><th>БАЛЛ {CHEV_U_ACC}</th><th>ДЛИТЕЛЬНОСТЬ</th></tr></thead>
<tbody>
<tr><td>12.09.2026</td><td class="name">Работа с сопротивлением</td><td class="score">86</td><td>14 мин</td></tr>
<tr><td>10.09.2026</td><td class="name">Первичная консультация</td><td class="score">74</td><td>18 мин</td></tr>
<tr><td>08.09.2026</td><td class="name">Активное слушание</td><td class="score">91</td><td>12 мин</td></tr>
<tr><td>05.09.2026</td><td class="name">Границы и контракт</td><td class="score">68</td><td>21 мин</td></tr>
</tbody></table>
<div class="pager">{CHEV_L}<span class="pg act">1</span><span class="pg">2</span><span class="pg">3</span><span>…</span><span class="pg">12</span>{CHEV_R}</div>
<span class="cap">сортировка по «Балл» · пагинация</span></div>'''

# ---------- Тосты ----------
def toasts():
    data = [
        ('info', 'Инфо', 'Сессия сохранена автоматически', 'info', '#0EA5E9'),
        ('success', 'Готово', 'Сценарий опубликован', 'circle-check', '#16A34A'),
        ('warning', 'Внимание', 'Сессия не завершена', 'triangle-alert', '#F59E0B'),
        ('error', 'Ошибка', 'Не удалось отправить ответ', 'circle-x', '#DC2626'),
    ]
    out = []
    for cls, title, text, ic, color in data:
        out.append(f'''<div class="toast {cls}">{icon(ic, 20, color, 'style="margin:4px 0 0 14px"')}
<div style="flex:1"><b>{title}</b><span>{text}</span></div>
<button class="x" aria-label="Закрыть">{X_INK3}</button></div>''')
    return '\n'.join(out)

# ---------- Модалка ----------
MODAL = f'''<div class="spec"><div class="modal">
<button class="x" aria-label="Закрыть">{icon('x', 16, '#94A3B8')}</button>
<h3>Удалить сценарий?</h3>
<p>Сценарий «Работа с сопротивлением» будет удалён для всех студентов. Действие необратимо.</p>
<div class="foot"><button class="btn secondary md">Отмена</button><button class="btn danger md">Удалить</button></div>
</div><span class="cap">modal md 560 · shadow/lg · Esc = отмена</span></div>'''

# ---------- Скелетоны ----------
SKELETONS = f'''<div class="spec"><div class="skl-card">
<div style="display:flex;gap:12px"><span class="skl" style="width:40px;height:40px;border-radius:50%"></span>
<div style="flex:1;padding-top:4px"><span class="skl" style="display:block;width:60%;height:10px"></span>
<span class="skl" style="display:block;width:40%;height:10px;margin-top:8px"></span></div></div>
<span class="skl" style="display:block;width:100%;height:84px;margin-top:16px;border-radius:8px"></span>
</div><span class="cap">skeleton card · pulse 1.5s</span></div>
<div class="spec"><div>
<span class="skl" style="display:block;width:320px;height:12px"></span>
<span class="skl" style="display:block;width:260px;height:12px;margin-top:10px"></span>
<span class="skl" style="display:block;width:300px;height:12px;margin-top:10px"></span>
</div><span class="cap">skeleton text lines</span></div>'''

# ---------- Сборка ----------
doc = open(HTML).read()
repl = {
    '<!--BUTTONS_MATRIX-->': buttons_matrix(),
    '<!--INPUT_ERR-->': INPUT_ERR,
    '<!--INPUT_SEARCH-->': INPUT_SEARCH,
    '<!--SELECT_OPEN-->': SELECT_OPEN,
    '<!--CHECKBOXES-->': checkboxes(),
    '<!--RADIOS-->': radios(),
    '<!--SWITCHES-->': switches(),
    '<!--CHIPS_MD-->': CHIPS_MD,
    '<!--CHIPS_SKILLS-->': CHIPS_SKILLS,
    '<!--AVATARS-->': avatars(),
    '<!--RING_40-->': ring(40),
    '<!--STEPS-->': steps(),
    '<!--ACCORDION-->': ACCORDION,
    '<!--TABLE-->': TABLE,
    '<!--TOASTS-->': toasts(),
    '<!--MODAL-->': MODAL,
    '<!--SKELETONS-->': SKELETONS,
    '<!--ICON_PLUS-->': icon('plus', 16, '#FFFFFF'),
    '<!--ICON_CHEV_DOWN-->': CHEV_D,
    '<!--ICON_X-->': X_INK3,
    '<!--ICON_CIRCLE_CHECK_PATH-->': icon('circle-check', 20, '#16A34A', 'style="margin:4px 0 0 14px"'),
}
for k, v in repl.items():
    if k not in doc:
        raise SystemExit(f'placeholder {k} not found')
    doc = doc.replace(k, v)
open(HTML, 'w').write(doc)
print('OK:', HTML, len(doc), 'bytes')
