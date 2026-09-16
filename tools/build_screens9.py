#!/usr/bin/env python3
"""Собирает screens/09-states-prototypes.html: E-80…E-85 — состояния данных
(loading/empty/error/success/partial/critical) × 1440/768/390 + секция
6 кликабельных потоков прототипов (ТЗ 7.1–7.6)."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '09-states-prototypes.html')

# Реюз CSS/иконок/app_shell из генератора итерации 6 (его запуск идемпотентен)
import build_screens6 as b6
icon = b6.icon
CSS = b6.CSS
app_shell = b6.app_shell

STATE_CSS = '''
/* состояния данных (Итерация 9) */
.skl{background:#EEF0F4;border-radius:8px;display:block}
.sklrow{display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd)}
.sklrow:last-child{border-bottom:none}
.centerbox{display:flex;flex-direction:column;align-items:center;text-align:center;padding:56px 20px}
.centerbox h3{font-size:17px;margin:18px 0 6px}
.centerbox p{font-size:13px;color:var(--ink2);margin:2px 0}
.bigicon{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.bigicon.r{background:#FEE2E2}.bigicon.g{background:#DCFCE7}
.errcode{font-family:ui-monospace,monospace;font-size:11px;color:var(--ink3);margin-top:6px}
.warnbox{background:#FEF3C7;border:1px solid #FDE68A;border-radius:10px;padding:12px 16px;display:flex;gap:10px;margin-bottom:14px}
.warnbox b{font-size:12px;color:#92400E;display:block}
.warnbox span{font-size:11px;color:#92400E}
.skrow{display:flex;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid var(--bd);font-size:12px}
.skrow:last-child{border-bottom:none}
.skrow b{width:110px;font-weight:500;color:var(--ink2)}
.skbar{flex:1;height:8px;background:var(--bd);border-radius:4px;overflow:hidden}
.skbar i{display:block;height:100%;background:var(--acc)}
.ndchip{background:#F1F5F9;color:#64748B;border-radius:11px;padding:3px 10px;font-size:10px;font-weight:500}
.sess5{display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--bd);font-size:12px}
.sess5:last-child{border-bottom:none}
.sess5 .cell{width:40px;height:28px;border-radius:8px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--acc)}
.sess5 .cell.e{background:#F8FAFC;border:1px dashed var(--bd);color:var(--ink3)}
.sess5 span{flex:1}
.crit{background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;padding:16px 18px;display:flex;gap:14px;margin-bottom:18px}
.crit>div{flex:1}
.crit b{font-size:15px;color:#991B1B;display:block}
.crit p{font-size:12px;color:#B91C1C;margin:4px 0}
.crit .cb{display:flex;flex-direction:column;gap:8px}
.cbubble{background:var(--bg2);border:1px solid #FECACA;border-radius:10px;padding:12px 14px;font-size:13px;color:var(--ink2);margin:10px 0}
.reco{display:flex;gap:10px;align-items:flex-start;font-size:12px;color:var(--ink2);margin:8px 0}
.reco .cbox{width:16px;height:16px;border-radius:4px;background:var(--acc);flex:none;display:inline-flex;align-items:center;justify-content:center}
.reco .cbox.e{background:#fff;border:1px solid var(--bd)}
.gstep{display:flex;gap:10px;font-size:12px;color:var(--ink2);padding:6px 0}
.gstep b{color:var(--acc);font-weight:600}
/* секция потоков */
.flow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#fff;border:1px solid var(--bd);border-radius:12px;padding:14px 18px;margin-top:10px}
.flow .fname{width:230px;flex:none;font-size:13px;font-weight:600}
.flow .chain{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.fstep{background:var(--bg2);border:1px solid var(--bd);border-radius:9999px;padding:5px 12px;font-size:11px;font-weight:600;color:var(--ink2)}
.fstep.dst{background:#EFF6FF;border-color:#BFDBFE;color:var(--acc)}
.farr{color:var(--ink3)}
'''

def skl(w, h=12, r=6, style=''):
    return '<span class="skl" style="width:' + str(w) + 'px;height:' + str(h) + 'px;border-radius:' + str(r) + 'px;' + style + '"></span>'

def e80():
    kpis = ''.join('<div class="card" style="flex:1;padding:14px">' + skl(90) + '<div style="margin-top:10px">' + skl(80, 20, 6) + '</div></div>' for _ in range(4))
    rows = ''.join('<div class="sklrow">' + skl(36, 36, 18) + '<div style="flex:1">' + skl(300) + '<div style="margin-top:6px">' + skl(180) + '</div></div></div>' for _ in range(3))
    content = ('<div style="margin-bottom:16px">' + skl(200, 22) + '<div style="margin-top:8px">' + skl(140) + '</div></div>'
               '<div style="display:flex;gap:16px">' + kpis + '</div>'
               '<div class="cols" style="margin-top:16px"><div class="col-l" style="flex:1.6"><div class="card">' + skl(160) + '<div style="margin-top:12px">' + skl(520, 150, 10) + '</div></div></div>'
               '<div class="col-r" style="flex:1"><div class="card">' + skl(130) + ''.join('<div style="margin-top:14px">' + skl(220, 12) + '</div>' for _ in range(4)) + '</div></div></div>'
               '<div class="card" style="margin-top:16px">' + skl(140) + rows + '</div>')
    return app_shell('Дашборд', '<div class="content">' + content + '</div>', 0)

def e81():
    content = ('<div class="centerbox">' + icon('inbox', 56, '#94A3B8') +
               '<h3>Сценариев пока нет</h3>'
               '<p>Создайте свой первый сценарий или выберите готовый</p>'
               '<p>из библиотеки — это займёт пару минут.</p>'
               '<div class="ctas" style="margin-top:18px"><button class="btn primary">' + icon('plus', 16, '#FFFFFF') + ' Создать сценарий</button>'
               '<button class="btn secondary">Открыть шаблоны</button></div>'
               '<p class="muted" style="font-size:12px;margin-top:16px">Подсказка: сценарий можно продублировать и адаптировать под клиента.</p></div>')
    return app_shell('Сценарии', '<div class="content">' + content + '</div>', 1)

def e82():
    content = ('<div class="centerbox"><div class="bigicon r">' + icon('triangle-alert', 32, '#DC2626') + '</div>'
               '<h3>Не удалось загрузить сценарии</h3>'
               '<p>Проверьте подключение к интернету и попробуйте ещё раз.</p>'
               '<span class="errcode">Ошибка: NETWORK_504 · 16.09.2026, 14:02</span>'
               '<div class="ctas" style="margin-top:18px"><button class="btn primary">' + icon('rotate-ccw', 16, '#FFFFFF') + ' Повторить</button></div>'
               '<a class="lnk" style="margin-top:14px;font-size:12px">Повторная ошибка? Напишите в поддержку — ответим в течение дня.</a></div>')
    return app_shell('Сценарии', '<div class="content">' + content + '</div>', 1)

def e83():
    content = ('<div class="oktoast">' + icon('circle-check', 20, '#16A34A') + '<div><b>Доступ создан</b>'
               '<span>Код и ссылка отправлены клиенту</span></div></div>'
               '<div class="centerbox"><div class="bigicon g">' + icon('circle-check', 32, '#16A34A') + '</div>'
               '<h3>Игра «Дыхание 4-7-8» выдана клиенту</h3>'
               '<p>Клиент получит уведомление в Telegram</p>'
               '<div class="card codec" style="margin-top:14px;text-align:left"><span class="lab">КОД ДОСТУПА</span>'
               '<div class="codeval">A7X9-Q2</div></div>'
               '<button class="btn primary" style="margin-top:14px;min-width:160px">Готово</button></div>')
    return app_shell('Игры', '<div class="content">' + content + '</div>', 2)

def e84():
    rows = [('Слушание', 86, '#2563EB'), ('Эмпатия', 78, '#16A34A'), ('Границы', 64, '#D97706'),
            ('Рефлексия', None, None), ('Самоанализ', None, None)]
    rhtml = ''.join('<div class="skrow"><b>' + r[0] + '</b>' +
                    ('<span class="skbar"><i style="width:' + str(r[1]) + '%;background:' + r[2] + '"></i></span><b style="width:30px;text-align:right">' + str(r[1]) + '</b>'
                     if r[1] is not None else '<span style="flex:1"></span><span class="ndchip">нет данных</span>') + '</div>'
                    for r in rows)
    warn = ('<div class="warnbox">' + icon('info', 20, '#D97706') + '<div><b>Недостаточно данных: пройдено 2 из 5 сессий.</b>'
            '<span>Радар покажет полную картину после 5-й сессии.</span></div></div>')
    sess = ''.join('<div class="sess5"><span class="cell' + ('' if s[1] else ' e') + '">' + s[1] + '</span><span' + ('' if s[1] else ' class="muted"') + '>' + s[0] + '</span></div>'
                   for s in [('02.09 · Тревога перед экзаменом', '86'), ('09.09 · Конфликт с руководителем', '78'),
                             ('Сессия 3 из 5', 'НД'), ('Сессия 4 из 5', 'НД'), ('Сессия 5 из 5', 'НД')])
    content = (warn + '<div class="cols"><div class="col-l" style="flex:1.2"><div class="card"><div class="chead"><b>Навыки</b></div>' + rhtml + '</div></div>'
               '<div class="col-r" style="flex:1"><div class="card"><div class="chead"><b>Сессии</b></div>' + sess + '</div></div></div>')
    return app_shell('Прогресс', '<div class="content">' + content + '</div>', 4)

def e85():
    crit = ('<div class="crit">' + icon('alert-octagon', 28, '#DC2626') +
            '<div><b>В ответе клиента признаки острого состояния</b>'
            '<p>Система рекомендует остановить симуляцию и разобрать эпизод</p>'
            '<p>с супервизором. Черновик сессии сохранён автоматически (14:03).</p></div>'
            '<div class="cb"><button class="btn primary sm">Разобрать сейчас</button>'
            '<button class="btn secondary sm">Отложить</button></div></div>')
    recos = ''.join('<div class="reco"><span class="cbox' + ('' if c else ' e') + '">' + (icon('check', 12, '#FFFFFF') if c else '') + '</span>' + t + '</div>'
                    for t, c in [('Валидация состояния клиента, не углублять драму', True),
                                 ('Техника заземления «5-4-3-2-1»', True),
                                 ('Предложить паузу и выйти из роли', False)])
    left = ('<div class="card"><div class="chead"><b>Сессия остановлена · эпизод 12 из 20</b></div>'
            '<div class="cbubble">Клиент: «Дальше не могу… сейчас как будто снова там. Ничего не чувствую, только шум».</div>'
            '<b style="font-size:12px">Рекомендации системы:</b>' + recos + '</div>')
    right = ('<div class="card"><div class="chead"><b>Что делать супервизору</b></div>'
             + ''.join('<div class="gstep"><b>' + str(i + 1) + '.</b>' + s + '</div>' for i, s in enumerate(
                 ['Разобрать триггер эпизода с кандидатом', 'Отметить реакцию паузы в журнале',
                  'Проверить настройки интенсивности сценария', 'Назначить повторную сессию']))
             + '<button class="btn secondary sm" style="margin-top:10px">' + icon('message-circle', 14, '#475569') + ' Создать разбор</button></div>')
    content = crit + '<div class="cols"><div class="col-l" style="flex:1.6">' + left + '</div><div class="col-r" style="flex:1">' + right + '</div></div>'
    return app_shell('Сессия · тревожный ответ', '<div class="content">' + content + '</div>', 1)

# ---------------------------------------------------------------- сборка ----
SECTIONS = [
    ('E-80', 'Состояния · загрузка', e80(), 'Скелетоны вместо спиннеров: структура страницы сохраняется, контент подгружается ≤ 300 мс (ТЗ E-80, 6.5).'),
    ('E-81', 'Состояния · пусто', e81(), 'EmptyState с объяснением и двумя действиями; без тупиковых экранов (ТЗ E-81, 6.5).'),
    ('E-82', 'Состояния · ошибка', e82(), 'Ошибка с человекочитаемым текстом + технический код для поддержки + «Повторить» (ТЗ E-82, 6.5).'),
    ('E-83', 'Состояния · успех', e83(), 'Успех действия: toast + карточка с кодом доступа (CodeDisplay), одно подтверждение (ТЗ E-83, 6.5).'),
    ('E-84', 'Состояния · частичные данные', e84(), 'Partial: предупреждающий бокс, «нет данных» по 2 навыкам, пустые ячейки сессий с dashed-границей (ТЗ E-84, 6.5).'),
    ('E-85', 'Критическая ошибка сессии', e85(), 'CriticalErrorBanner: остановка симуляции, автосохранение черновика, рекомендации и эскалация супервизору (ТЗ E-85, 6.5).'),
]

FLOWS = [
    ('7.1 · Гость → демо → регистрация', [('E-01', 'Лендинг'), ('E-02', 'Демо-симуляция'), ('E-04', 'Регистрация')]),
    ('7.2 · Психолог: вход → сессия → разбор', [('E-03', 'Вход'), ('E-10', 'Дашборд'), ('E-22', 'Сессия'), ('E-25', 'Разбор')]),
    ('7.3 · Клиент web: ссылка → результат', [('E-40', 'Открытие'), ('E-41', 'Согласие'), ('E-42', 'Прохождение'), ('E-43', 'Завершение')]),
    ('7.4 · Клиент TMA: онбординг → результат', [('E-50', 'Онбординг'), ('E-52', 'Игры'), ('E-53', 'Шаг'), ('E-54', 'Результат')]),
    ('7.5 · Супервизор: разбор → комментарий', [('E-68', 'Дашборд'), ('E-70', 'Разбор'), ('E-71', 'Комментарий')]),
    ('7.6 · Админ: верификация → решение', [('E-60', 'Обзор'), ('E-63', 'Очередь'), ('E-64', 'Решение')]),
]

parts = []
for code, title, html, note in SECTIONS:
    def frame(bp):
        return html.replace('screen d', 'screen ' + bp)
    boxes = ('<div class="fbox"><p class="flabel">Desktop · 1440</p><div class="clip">' + frame('d') + '</div></div>'
             '<div class="fbox"><p class="flabel">Tablet · 768</p><div class="clip">' + frame('t') + '</div></div>'
             '<div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip" style="max-height:880px">' + frame('m') + '</div></div>')
    parts.append('<section class="scr" id="' + code + '">\n<h2>' + code + ' · ' + title +
                 '<span class="tok">1440 / 768 / 390</span></h2>\n<p class="note">' + note + '</p>\n'
                 '<div class="frames">\n<div class="fbox" style="grid-column:1/-1"><p class="flabel">Desktop · 1440</p><div class="clip">' + frame('d') + '</div></div>\n'
                 '<div class="frow">' +
                 '<div class="fbox"><p class="flabel">Tablet · 768</p><div class="clip">' + frame('t') + '</div></div>'
                 '<div class="fbox"><p class="flabel">Mobile · 390</p><div class="clip" style="max-height:880px">' + frame('m') + '</div></div>'
                 '</div></div></section>')

# собираем цепочку явно
flow_html = ''
for fname, steps in FLOWS:
    chain = '<span class="fstep">' + steps[0][0] + ' · ' + steps[0][1] + '</span>'
    for c, n in steps[1:]:
        chain += '<span class="farr">→</span><span class="fstep dst">' + c + ' · ' + n + '</span>'
    flow_html += '<div class="flow"><span class="fname">' + fname + '</span><span class="chain">' + chain + '</span></div>'

parts.append('<section class="scr" id="flows"><h2>Прототипы · 6 потоков<span class="tok">ТЗ 7.1–7.6 · createFlow + addInteraction</span></h2>'
             '<p class="note">Связи созданы плагином v0.9 автоматически: у фрейма-источника стоит клик-переход (navigate-to) на фрейм-цель; каждый поток начинается со стартового борда. В режиме Present в Penpot потоки кликабельны.</p>'
             + flow_html + '</section>')

toc = ''.join('<a href="#' + c + '">' + c + '</a>' for c, *_ in SECTIONS) + '<a href="#flows">Потоки</a>'

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 09 States + Prototypes · v1.0</title>\n<style>' + CSS + STATE_CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 9: состояния + прототипы — готово</span>\n'
       '<h1 class="pt">09 · Состояния E-80…E-85 и прототипы</h1>\n'
       '<p class="lead">Шесть состояний данных (загрузка-скелетоны, пусто, ошибка с повтором, успех, частичные данные, критическая ошибка сессии) на экранах психолога — во всех трёх брейкпоинтах. Ниже — карта 6 кликабельных потоков ТЗ 7: связи созданы плагином v0.9 (createFlow + addInteraction) прямо в Penpot.</p>\n'
       '<nav class="toc">' + toc + '</nav>\n</header>\n'
       + '\n'.join(parts) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · States + Prototypes v1.0 · плагин v0.9 · источник: tokens/design-tokens.json</footer>\n'
       '</div></body></html>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
for k, v in b6.NAV_IC.items():
    doc = doc.replace(k, v)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
