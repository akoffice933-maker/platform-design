#!/usr/bin/env python3
"""Собирает screens/10-handoff.html — финальная спека Handoff (Итерация 10):
токены (из tokens/design-tokens.json — источник истины), анимации, Tailwind-маппинг,
именование, changelog итераций 1–10, чек-лист приёмки."""
import os, json, re

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '10-handoff.html')

T = json.load(open(os.path.join(ROOT, 'tokens', 'design-tokens.json')))

base = open(os.path.join(ROOT, 'build_screens5.py')).read()
i5 = base.index("CSS = '''") + len("CSS = '''")
CSS = base[i5:base.index("'''", i5)]

HANDOFF_CSS = '''
.handgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin-top:14px}
.sw{background:#fff;border:1px solid var(--bd);border-radius:10px;overflow:hidden}
.sw .c{height:44px}
.sw .m{padding:8px 10px}
.sw b{font-size:11px;display:block;font-family:ui-monospace,monospace}
.sw span{font-size:10px;color:var(--ink3);display:block;margin-top:2px;line-height:1.35}
.typrow{display:flex;gap:18px;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--bd)}
.typrow:last-child{border-bottom:none}
.typrow .tn{width:130px;flex:none;font-size:11px;font-weight:600;color:var(--acc);font-family:ui-monospace,monospace}
.typrow .tm{margin-left:auto;font-size:11px;color:var(--ink3);flex:none}
.spacebar{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px}
.spacebar>div{text-align:center}
.spacebar i{display:block;background:var(--acc);border-radius:4px;height:14px}
.radrow{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px}
.radrow>div{text-align:center}
.radrow i{display:block;width:76px;height:30px;background:var(--bg3);border:1px solid var(--bd)}
.shrow{display:flex;gap:18px;flex-wrap:wrap;margin-top:12px}
.shrow .sh{width:150px;height:52px;background:#fff;border-radius:10px;display:flex;align-items:flex-end;justify-content:center;font-size:11px;color:var(--ink2);padding-bottom:6px}
.motioncards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:14px}
.mcard{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px}
.mcard b{font-size:22px;color:var(--acc);display:block}
.mcard .mn{font-size:11px;font-weight:600;color:var(--acc2);margin-top:2px}
.mcard p{font-size:12px;color:var(--ink2);margin-top:8px}
.mcard code{font-size:10px;color:var(--ink3);display:block;margin-top:8px;font-family:ui-monospace,monospace}
pre{background:#0F172A;color:#E2E8F0;border-radius:12px;padding:18px;font-size:12px;line-height:1.6;overflow:auto;font-family:ui-monospace,monospace}
pre .cm{color:#64748B}
pre .k{color:#93C5FD}
.clog{display:flex;gap:14px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--bd);font-size:13px}
.clog:last-child{border-bottom:none}
.clog .n{width:26px;height:26px;border-radius:50%;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--ink2);flex:none}
.clog:last-child .n{background:var(--ok);color:#fff}
.clog b{width:270px;flex:none}
.clog span{color:var(--ink2)}
.inv{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:14px}
.inv>div{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px;text-align:center}
.inv b{font-size:26px;display:block;color:var(--acc)}
.inv span{font-size:11px;color:var(--ink3)}
.cl{display:flex;gap:10px;align-items:flex-start;font-size:13px;padding:7px 0}
.cl i{width:18px;height:18px;border-radius:5px;background:var(--ok);flex:none;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-style:normal;font-size:11px}
.cl.open i{background:#fff;border:1px solid var(--bd);color:transparent}
.namet{display:flex;gap:16px;padding:10px 0;border-bottom:1px solid var(--bd);font-size:13px}
.namet:last-child{border-bottom:none}
.namet b{width:200px;flex:none}
.namet code{font-family:ui-monospace,monospace;color:var(--ink2);font-size:12px}
'''

def flat_colors(node, prefix=''):
    out = []
    for k, v in node.items():
        if k.startswith('$'):
            continue
        if isinstance(v, dict) and '$value' in v and isinstance(v['$value'], str) and v['$value'].startswith('#'):
            out.append((prefix + k, v['$value'], v.get('$description', '')))
        elif isinstance(v, dict):
            out.extend(flat_colors(v, prefix + k + '/'))
    return out

colors = flat_colors(T['color'])
light = [c for c in colors if not c[0].startswith('dark/')]
dark = [c for c in colors if c[0].startswith('dark/')]

def swatch_grid(items):
    return '<div class="handgrid">' + ''.join(
        '<div class="sw"><div class="c" style="background:' + v + ';border-bottom:1px solid var(--bd)"></div>'
        '<div class="m"><b>color/' + n + '</b><span>' + v + ' · ' + d + '</span></div></div>'
        for n, v, d in items) + '</div>'

typ_rows = ''
for name, tv in T['typography'].items():
    if name.startswith('$'):
        continue
    val = tv['$value']
    fs = int(str(val['fontSize']).replace('px', ''))
    lh = str(val['lineHeight']).replace('px', '')
    fw = val['fontWeight']
    fam = val.get('fontFamily', ['Inter'])[0]
    samples = {
        'display': 'Симуляция консультации', 'h1': 'Библиотека сценариев', 'h2': 'Активное слушание',
        'h3': 'Карточка сценария', 'body-lg': 'Клиент делится сложной ситуацией', 'body': 'Основной текст интерфейса',
        'body-sm': 'Подпись под полем ввода', 'caption': 'МЕТА · ШАГ 2 ИЗ 7', 'button': 'Начать симуляцию',
        'mono': 'A7X9-Q2',
    }
    style = 'font-size:' + str(min(fs, 34)) + 'px;font-weight:' + str(fw) + ';line-height:1.2'
    if fam == 'JetBrains Mono':
        style += ';font-family:ui-monospace,monospace'
    if name == 'caption':
        style += ';letter-spacing:.06em'
    typ_rows += ('<div class="typrow"><span class="tn">text/' + name + '</span>'
                 '<span style="' + style + '">' + samples.get(name, name) + '</span>'
                 '<span class="tm">' + str(fs) + '/' + lh + ' · ' + str(fw) + ' · ' + fam + ' · ' + tv.get('$description', '') + '</span></div>')

space_html = '<div class="spacebar">' + ''.join(
    '<div><i style="width:' + str(min(int(str(sv['$value']).replace("px", "")), 96)) + 'px"></i>'
    '<span style="font-size:10px;color:var(--ink3)">space/' + k + ' · ' + sv['$value'] + '</span></div>'
    for k, sv in T['space'].items() if not k.startswith('$')) + '</div>'

rad_html = '<div class="radrow">' + ''.join(
    '<div><i style="border-radius:' + ('9999px' if sv['$value'] == '9999px' else sv['$value']) + '"></i>'
    '<span style="font-size:10px;color:var(--ink3)">' + k + ' · ' + sv['$value'] + '</span></div>'
    for k, sv in T['radius'].items() if not k.startswith('$')) + '</div>'

sh_html = '<div class="shrow">' + ''.join(
    '<div class="sh" style="box-shadow:' + sv['$value']['offsetX'] + ' ' + sv['$value']['offsetY'] + ' ' + sv['$value']['blur'] + ' ' + sv['$value'].get('spread', '0px') + ' ' + sv['$value']['color'] + '">' + k + '</div>'
    for k, sv in T['shadow'].items() if not k.startswith('$')) + '</div>'

motion_html = '<div class="motioncards">' + ''.join(
    '<div class="mcard"><b>' + sv['$value'] + '</b><span class="mn">motion/' + k + '</span><p>' + sv.get('$description', '') + '</p>'
    '<code>cubic-bezier(' + ', '.join(str(x) for x in T['easing'].get(('ease-out' if k == 'fast' else 'spring' if k == 'spring' else 'ease-in-out'))['$value']) + ')</code></div>'
    for k, sv in T['motion'].items() if not k.startswith('$')) + '</div>'

tailwind_code = """<span class="cm">&lt;!-- tokens/tokens.css --&gt;</span>
:root {
  --bg-primary: #FFFFFF;   --bg-secondary: #F7F8FA;  --bg-tertiary: #EEF0F4;
  --text-primary: #0F172A; --text-secondary: #475569; --text-tertiary: #94A3B8;
  --border-default: #E2E8F0; --accent-primary: #2563EB;
  --success: #16A34A; --warning: #F59E0B; --error: #DC2626;
  --dark-bg-primary: #0B1220; --dark-bg-secondary: #111827;
}
<span class="cm">// tailwind.config.js (фрагмент) — токены как CSS-переменные</span>
module.exports = {
  theme: { extend: {
    colors: {
      bg: { primary: 'var(--bg-primary)', secondary: 'var(--bg-secondary)' },
      ink: { DEFAULT: 'var(--text-primary)', 2: 'var(--text-secondary)' },
      accent: { DEFAULT: 'var(--accent-primary)', dark: { bg: 'var(--dark-bg-primary)', card: 'var(--dark-bg-secondary)' } },
    },
    borderRadius: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
    transitionDuration: { fast: '150ms', base: '250ms', slow: '400ms', spring: '500ms' },
    fontFamily: { sans: ['Inter'], mono: ['JetBrains Mono'] },
  } },
}"""

naming = [
    ('Фреймы экранов', '"E-XX Название / 1440 · 768 · 390" → пример: E-22 Сессия / 768'),
    ('Компоненты', '"ComponentName / Variant / State" → пример: Button / primary / hover'),
    ('Цветовые стили', 'color/&lt;группа&gt;/&lt;роль&gt; → пример: color/accent/primary'),
    ('Текстовые стили', 'text/&lt;роль&gt; → пример: text/h2, text/mono'),
    ('Потоки прототипов', '"7.X Название" → пример: «7.3 Клиент web: ссылка → игра → результат»'),
]

changelog = [
    ('1 · Foundations', '33 цвета + 10 текстовых стилей в библиотеке Penpot, WCAG-аудит, сетки 4 брейкпоинтов, 75 иконок Lucide'),
    ('2 · UI-kit', '72 компонента со состояниями (Button ×30, Input, Select, Table, Toast…), демо тёмной темы'),
    ('3 · Domain', '34 доменных компонента: ScenarioCard, GameCard, ClientAccessCard, SkillRadarChart, CodeDisplay, BottomNav…'),
    ('4 · Auth + дашборды', '33 фрейма E-01…E-12 × 3 бп: лендинг, демо, вход/регистрация, онбординг, дашборды психолога и студента'),
    ('5 · Симулятор', '27 фреймов E-20…E-28: библиотека сценариев, сессия (чаты, эмоции), пауза, разбор с радарами, история'),
    ('6 · Игры + клиент', '30 фреймов E-30…E-44: выдача доступа (код/ссылка/QR), клиенты, доступы; клиентский сценарий в тёмной теме'),
    ('7 · TMA', '9 фреймов E-50…E-57 × 390: онбординг, главная, игры, шаги, результат, дневник, прогресс, профиль; safe area 56/80'),
    ('8 · Админка + супервизия', '28 фреймов E-60…E-73 × 1440/1280: верификация с SLA, аудит 152-ФЗ, разборы с таймкодами, отчёты'),
    ('9 · Состояния + прототипы', '18 фреймов E-80…E-85 × 3 бп (loading/empty/error/success/partial/critical) + 6 потоков, 15 связей'),
    ('10 · Handoff', 'Этот документ + борд «13_Handoff»: токены, Tailwind, анимации, именование, чек-лист приёмки'),
]

inventory = [('149', 'бордов в Penpot'), ('145', 'фреймов E-01…E-85'), ('106', 'компонентов в Assets'),
             ('6', 'кликабельных потоков'), ('43', 'стилей (33+10)'), ('9+1', 'HTML-спек в screens/')]

accept = [
    ('Двухпродуктовая платформа: симулятор + игры для клиентов', True),
    ('3 контекста: web 1440/768/390, TMA 390 (safe area 56/80); админка 1440/1280', True),
    ('6 ролей: психолог, студент, супервизор, клиент, админ, гость', True),
    ('Foundations токенами (не сырые hex): цвет, текст, space, radius, shadow, motion', True),
    ('UI-kit + 20 доменных компонентов из ТЗ 4.2 — все в Assets', True),
    ('Экраны E-01…E-85 (разделы 5.1–5.9 ТЗ)', True),
    ('Тёмная тема обязательна: Mini App + клиентские экраны (ТЗ 11.1)', True),
    ('WCAG 2.1 AA: контраст проверен, риски задокументированы', True),
    ('6 кликабельных потоков (ТЗ 7.1–7.6) — Present в Penpot', True),
    ('Состояния данных loading/empty/error/success/partial/critical', True),
    ('Именование фреймов и компонентов по паттернам', True),
    ('Token JSON (DTCG) + tokens.css + Tailwind-маппинг', True),
    ('Вне скоупа (по ТЗ): иллюстрации сценариев, логотип, маркетинг-лендинг, email-шаблоны', True),
]

def sec(idx, title, body, note=''):
    n = '<p class="note">' + note + '</p>' if note else ''
    return '<section class="scr"><h2>' + idx + ' · ' + title + '</h2>' + n + body + '</section>'

parts = []
parts.append(sec('1', 'Процесс передачи', 
    '<div class="inv">'
    + ''.join('<div><b style="font-size:14px">' + t + '</b><span>' + d + '</span></div>' for t, d in [
        ('Inspect', 'Выделить слой → правая панель: размеры и привязанные стили color/… text/…'),
        ('Токены', 'design-tokens.json (DTCG) + tokens.css; Tailwind-маппинг — раздел 5'),
        ('Анимации', 'motion 150/250/400/500 + кривые — раздел 4'),
        ('Прототипы', 'Present: кликабельные потоки 7.1–7.6'),
        ('Приёмка', 'Чек-листы docs/03; WCAG — foundations/01 #wcag'),
        ('Именование', 'Паттерны раздела 6 — искать и фильтровать слои'),
    ]) + '</div>'))
parts.append(sec('2', 'Цветовые токены — 33 стиля', swatch_grid(light), 'Light-тема: bg · text · border · accent · semantic · emotion (low/mid/high) · skill (8 навыков). Все стили уже в библиотеке Penpot.'))
parts.append(sec('2.1', 'Тёмная тема — 5 токенов (ТЗ 11.1)', swatch_grid(dark), 'Обязательна для клиентских экранов и Telegram Mini App: фоны #0B1220/#111827, текст #F8FAFC/#CBD5E1, границы #1F2937.'))
parts.append(sec('3', 'Типографика — Inter, 10 стилей', '<div class="card" style="padding:8px 20px">' + typ_rows + '</div>', 'Коды доступа — JetBrains Mono. Шкала 40→12, без промежуточных значений.'))
parts.append(sec('3.1', 'Отступы · Радиусы · Тени', space_html + rad_html + sh_html, 'space/1–9 (4…96) · radius xs–full · shadow sm/md/lg.'))
parts.append(sec('4', 'Анимации — motion', motion_html, 'Движение сдержанное (ТЗ 3.7): никаких пружинящих вылетов, кроме онбординга.'))
parts.append(sec('5', 'Экспорт токенов → CSS / Tailwind', '<pre>' + tailwind_code + '</pre>', 'Источник истины — tokens/design-tokens.json (DTCG). Плагин создаёт те же значения стилями Penpot.'))
parts.append(sec('6', 'Именование', '<div class="card" style="padding:8px 20px">' + ''.join('<div class="namet"><b>' + a + '</b><code>' + b + '</code></div>' for a, b in naming) + '</div>', 'Паттерны обязательны — по ним ищутся слои и собирается документация.'))
parts.append(sec('7', 'Changelog — все 10 итераций', '<div class="card" style="padding:8px 20px">' + ''.join('<div class="clog"><span class="n">' + c[0].split(' ·')[0] + '</span><b>' + c[0] + '</b><span>' + c[1] + '</span></div>' for c in changelog) + '</div>'))
parts.append(sec('8', 'Инвентарь — итоги проекта', '<div class="inv">' + ''.join('<div><b>' + a + '</b><span>' + b + '</span></div>' for a, b in inventory) + '</div>'
    + '<p class="note" style="margin-top:14px">Спеки: 01 foundations · 02 uikit · 03 domain · 04 auth-dashboard · 05 simulator · 06 games-client · 07 tma · 08 admin-supervision · 09 states-prototypes · 10 handoff. Плагин «Platform Builder v1.0» пересоздаёт всё идемпотентно.</p>'))
parts.append(sec('9', 'Чек-лист приёмки (ТЗ 14)', '<div class="card" style="padding:14px 20px">' + ''.join(
    '<div class="cl' + ('' if ok else ' open') + '"><i>✓</i>' + t + '</div>' for t, ok in accept) + '</div>',
    'Критерии приёмки ТЗ выполнены; открытые пункты — организационные (перенос фреймов в аккаунт заказчика, реальные тексты методиста, юрист по 152-ФЗ).'))

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 10 Handoff · v1.0</title>\n<style>' + CSS + HANDOFF_CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F0FDF4;color:#166534;border-color:#BBF7D0">Итерация 10: Handoff — проект завершён ✓</span>\n'
       '<h1 class="pt">10 · Handoff Kit</h1>\n'
       '<p class="lead">Финальная передача в разработку: 33+5 цветовых и 10 текстовых токенов, шкалы отступов/радиусов/теней, спека анимаций (150/250/400/500 мс), Tailwind-маппинг, паттерны именования, changelog всех 10 итераций и чек-лист приёмки. Всё выполнено по ТЗ v1.0: 2 продукта, 3 контекста, 6 ролей, 145 экранов E-01…E-85, 106 компонентов, 6 кликабельных потоков — в одном проекте Penpot.</p>\n'
       '</header>\n' + '\n'.join(parts) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · Handoff v1.0 · плагин v1.0 · источник: tokens/design-tokens.json (DTCG) · ТЗ v1.0 выполнено полностью</footer>\n'
       '</div></body></html>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes · цветов:', len(light), '+', len(dark))
