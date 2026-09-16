#!/usr/bin/env python3
"""Собирает screens/08-admin-supervision.html: E-60…E-67 (админ) и
E-68…E-73 (супервизор) — только 1440/1280 (ТЗ 5.7–5.8), светлые кабинеты."""
import os, re, math

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'screens', '08-admin-supervision.html')

# Реюз CSS/иконок из генератора итерации 6 (его запуск идемпотентен)
import build_screens6 as b6
icon = b6.icon
CSS = b6.CSS

ADMIN_CSS = '''
/* админка + супервизия (Итерация 8) */
.stc.v{background:#EDE9FE;color:#5B21B6}
.kpis{display:flex;gap:24px}
.kpi{flex:1;background:#fff;border:1px solid var(--bd);border-radius:12px;padding:16px;box-shadow:0 4px 12px rgba(15,23,42,.08)}
.kpi b{font-size:22px;display:block;margin:6px 0 8px}
.kpi .kl{font-size:12px;color:var(--ink3)}
.aud{display:flex;gap:14px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--bd);font-size:12px}
.aud:last-child{border-bottom:none}
.aud .t{color:var(--ink3);width:56px;flex:none;font-size:11px;padding-top:2px}
.aud>div{flex:1}
.aud b{font-size:12px;display:block}
.aud span{font-size:12px;color:var(--ink2)}
.aud .r{color:var(--ink3);font-size:11px;text-align:right}
.docrow{display:flex;gap:12px;align-items:center;background:var(--bg2);border-radius:10px;padding:10px 14px;margin-top:10px;font-size:13px}
.docrow b{font-weight:500}
.docrow span{font-size:11px;color:var(--ink3);display:block}
.docrow>div{flex:1}
.docrow a{font-size:12px;color:var(--acc);font-weight:500;text-decoration:none}
.sysrow{display:flex;gap:10px;align-items:center;padding:8px 0;font-size:13px}
.dot{width:8px;height:8px;border-radius:50%;background:var(--ok);flex:none}
.sw8{width:40px;height:22px;border-radius:9999px;background:var(--acc);position:relative;flex:none;display:inline-block}
.sw8 i{position:absolute;top:2px;right:2px;width:18px;height:18px;background:#fff;border-radius:50%}
.sw8.off{background:#CBD5E1}.sw8.off i{right:auto;left:2px}
.setl{display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:12px;color:var(--ink2)}
.pbar3{height:8px;background:var(--bd);border-radius:4px;overflow:hidden;width:180px}
.pbar3 b{display:block;height:100%;background:var(--acc)}
.mrow{display:flex;gap:12px;align-items:center;padding:12px 4px;border-bottom:1px solid var(--bd)}
.mrow:last-child{border-bottom:none}
.mrow>div{flex:1}
.mrow b{font-size:14px;display:block}
.mrow span{font-size:11px;color:var(--ink3)}
.qfrag{background:var(--bg2);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--ink2);margin-top:8px;position:relative}
.qfrag .tc{position:absolute;right:12px;top:10px;font-size:11px;font-weight:600;color:#5B21B6}
.skchip{border:1px solid var(--bd);background:#fff;border-radius:9999px;padding:6px 14px;font-size:12px;color:var(--ink2)}
.skchip.on{background:var(--acc);border-color:var(--acc);color:#fff;font-weight:600}
.tplchip{border:1px solid var(--bd);background:#fff;border-radius:9999px;padding:6px 12px;font-size:12px;color:var(--ink2)}
.tplchip.on{background:#EDE9FE;border-color:#EDE9FE;color:#5B21B6;font-weight:600}
.rpt h3{font-size:14px;margin:14px 0 4px}
.rpt p{font-size:13px;color:var(--ink2);margin:2px 0}
.repl{flex:1.15}
.repl2{flex:1}
'''

def adshell(role, nav, active, title, user, ini, content):
    a = ['on' if i == active else '' for i in range(len(nav))]
    nav_d = ''.join('<a class="' + a[i] + '">' + icon(n[0], 18, 'currentColor') + ' ' + n[1] + '</a>' for i, n in enumerate(nav))
    nav_i = ''.join('<a class="' + a[i] + '">' + icon(n[0], 18, 'currentColor') + '</a>' for i, n in enumerate(nav))
    return ('<div class="screen d">'
            '<div class="sb"><span class="logo"><i class="mark"></i>Platform</span>'
            '<span class="rolelbl">' + role + '</span>'
            '<nav>' + nav_d + '</nav>'
            '<div class="ucard"><span class="ava">' + ini + '</span><div><b style="font-size:13px">' + user + '</b><br>'
            '<span style="font-size:11px;color:var(--ink3)">' + role + '</span></div></div></div>'
            '<div class="sbi"><span style="margin-bottom:10px"><i class="mark"></i></span>' + nav_i + '</div>'
            '<div class="main"><div class="topb"><b>' + title + '</b><span class="grow"></span><span class="ava">АД</span></div>'
            + content + '</div></div>')

def stc(label, kind):
    return '<span class="stc ' + kind + '">' + label + '</span>'

def kpis(items):
    return '<div class="kpis">' + ''.join(
        '<div class="kpi"><span class="kl">' + k + '</span><b>' + v + '</b>' + stc(d, kd) + '</div>'
        for k, v, d, kd in items) + '</div>'

def audit_html(rows):
    return ''.join('<div class="aud"><span class="t">' + t + '</span><div><b>' + who + '</b><span>' + act +
                   '</span></div><span class="r">' + tgt + '</span></div>' for t, who, act, tgt in rows)

def line_svg(w, h, pts):
    mn, mx = min(pts) - 8, max(pts) + 8
    px = lambda i: round(14 + i * (w - 28) / (len(pts) - 1))
    py = lambda v: round(h - 12 - (v - mn) * (h - 24) / (mx - mn))
    poly = ' '.join(str(px(i)) + ',' + str(py(v)) for i, v in enumerate(pts))
    dots = ''.join('<circle cx="' + str(px(i)) + '" cy="' + str(py(v)) + '" r="3.5" fill="#2563EB"/>' for i, v in enumerate(pts))
    return ('<svg width="' + str(w) + '" height="' + str(h) + '" viewBox="0 0 ' + str(w) + ' ' + str(w * h // w) +
            '" fill="none" xmlns="http://www.w3.org/2000/svg">'
            '<line x1="10" y1="' + str(h - 12) + '" x2="' + str(w - 10) + '" y2="' + str(h - 12) + '" stroke="#E2E8F0"/>'
            '<polyline points="' + poly + '" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>' + dots + '</svg>')

def radar_svg(size=230):
    cx = cy = size / 2
    R = size / 2 - 28
    axes = 8
    def pt(i, r):
        ang = -math.pi / 2 + i * 2 * math.pi / axes
        return (round(cx + r * math.cos(ang), 1), round(cy + r * math.sin(ang), 1))
    rings = ''
    for frac in (0.25, 0.5, 0.75, 1.0):
        pts = ' '.join(str(x) + ',' + str(y) for x, y in (pt(i, R * frac) for i in range(axes)))
        rings += '<polygon points="' + pts + '" fill="none" stroke="#E2E8F0"/>'
    spokes = ''.join('<line x1="' + str(cx) + '" y1="' + str(cy) + '" x2="' + str(pt(i, R)[0]) + '" y2="' + str(pt(i, R)[1]) + '" stroke="#E2E8F0"/>' for i in range(axes))
    now = [91, 84, 71, 83, 78, 74, 80, 68]
    old = [72, 70, 55, 68, 74, 62, 70, 60]
    def poly(vals, color, op):
        pts = ' '.join(str(x) + ',' + str(y) for x, y in (pt(i, R * v / 100) for i, v in enumerate(vals)))
        return '<polygon points="' + pts + '" fill="' + color + '" fill-opacity="' + op + '" stroke="' + color + '" stroke-width="2"/>'
    labels = ['Слу', 'Эмп', 'Гра', 'Стр', 'Реф', 'Точ', 'Пау', 'Сам']
    lbls = ''.join('<text x="' + str(pt(i, R + 14)[0]) + '" y="' + str(pt(i, R + 14)[1] + 3) + '" text-anchor="middle" font-size="9" fill="#64748B" font-family="Inter,sans-serif">' + labels[i] + '</text>' for i in range(axes))
    return ('<svg width="' + str(size) + '" height="' + str(size) + '" viewBox="0 0 ' + str(size) + ' ' + str(size) + '" xmlns="http://www.w3.org/2000/svg">'
            + rings + spokes + poly(old, '#94A3B8', '.25') + poly(now, '#2563EB', '.18') + lbls + '</svg>')

AD_NAV = [('home', 'Обзор'), ('users', 'Пользователи'), ('badge-check', 'Верификация'),
          ('book-open', 'Сценарии'), ('file-text', 'Аудит'), ('settings', 'Настройки')]
SUP_NAV = [('chart-column', 'Обзор'), ('users', 'Супервизируемые'), ('message-circle', 'Разборы'),
           ('graduation-cap', 'Студенты'), ('file-text', 'Отчёты')]

# ---------------------------------------------------------------- админка ----
def e60():
    chart = '<div class="card"><div class="chead"><b>Активность, 12 недель</b><span class="grow"></span>' + stc('неделя', 'n') + '</div>' + line_svg(640, 170, [820, 910, 880, 1040, 1120, 1090, 1260, 1380, 1340, 1520, 1660, 1580]) + '</div>'
    sysr = ('<div class="card"><div class="chead"><b>Состояние системы</b></div>' + ''.join(
        '<div class="sysrow"><i class="dot"></i><span style="flex:1">' + s + '</span><span class="muted" style="font-size:12px">' + v + '</span></div>'
        for s, v in [('API', '99,98 %'), ('БД', 'норма'), ('Очередь писем', 'норма'), ('Telegram-бот', 'норма')])
        + '<p class="muted" style="font-size:11px;margin-top:8px">Бэкап: сегодня 03:00 · OK</p></div>')
    evs = audit_html([('12:04', 'Ирина Д. (админ)', 'Одобрила верификацию психолога', 'Ольга В.'),
                      ('11:37', 'система', 'Доступ истёк автоматически', 'Клиент В.'),
                      ('10:52', 'Мария С. (супервизор)', 'Комментарий к разбору', 'Сессия #812'),
                      ('09:15', 'Анна К. (психолог)', 'Выдала игру клиенту', 'A7X9-Q2')])
    content = (kpis([('Пользователи', '12 480', '+8 %', 'g'), ('Психологи', '1 240', '+24 за месяц', 'g'),
                     ('Сессии за неделю', '3 120', '+12 %', 'g'), ('Жалобы', '2', '−3', 'y')])
               + '<div class="cols" style="margin-top:20px"><div class="col-l" style="flex:1.6">' + chart + '</div>'
               + '<div class="col-r" style="flex:1">' + sysr + '</div></div>'
               + '<div class="card" style="margin-top:20px"><div class="chead"><b>Последние события</b></div>' + evs + '</div>')
    return adshell('администратор', AD_NAV, 0, 'Обзор платформы', 'Ирина Д.', 'ИД', '<div class="content">' + content + '</div>')

def e61():
    roles = '<div style="display:flex;gap:8px;align-items:center">' + \
            '<div class="srch" style="flex:1"><span class="sinp">' + icon('search', 16, '#94A3B8') + ' Имя или email…</span></div>' + \
            ''.join('<span class="fchip' + (' on' if i == 0 else '') + '">' + r + '</span>' for i, r in enumerate(['Все', 'Психологи', 'Студенты', 'Клиенты', 'Админы'])) + \
            '<button class="btn primary">' + icon('plus', 16, '#FFFFFF') + ' Пригласить</button></div>'
    rows = [('Анна К.', 'anna@psy.ru', 'психолог', 'badge', '312 сессий', 'активна', 'g'),
            ('Мария С.', 'maria@psy.ru', 'супервизор', 'badge', '148 разборов', 'активна', 'g'),
            ('Ольга В.', 'olga@psy.ru', 'психолог', 'wait', 'на проверке', 'активна', 'g'),
            ('Пётр С.', 'petya@uni.ru', 'студент', 'none', '24 сессии', 'активна', 'g'),
            ('Клиент А', '—', 'клиент', 'none', '5 игр', 'активна', 'g'),
            ('Денис М.', 'denis@psy.ru', 'психолог', 'badge', '201 сессия', 'активна', 'g'),
            ('Клиент Г', '—', 'клиент', 'none', 'нет доступов', 'заблок.', 'e'),
            ('Нина Т.', 'nina@uni.ru', 'студент', 'none', '12 сессий', 'активна', 'g')]
    trs = ''
    for nm, mail, role, vi, act, st, kd in rows:
        vic = {'badge': icon('badge-check', 14, '#2563EB'), 'wait': icon('clock', 14, '#F59E0B'), 'none': ''}[vi]
        trs += ('<div class="trow"><b style="width:200px"><span class="ava" style="width:28px;height:28px;display:inline-flex;font-size:10px;vertical-align:middle;margin-right:8px">' + nm[:2].upper() + '</span>' + nm + '<br><span style="font-weight:400;font-size:11px;color:var(--ink3);margin-left:36px">' + mail + '</span></b>'
                '<span class="game">' + vic + ' ' + role + '</span><span class="tm2" style="width:130px">' + act + '</span>'
                '<span>' + stc(st, kd) + '</span><span class="tr muted">⋯</span></div>')
    content = ('<div class="content">' + roles +
               '<div class="card tablec" style="margin-top:14px">'
               '<div class="thead"><span>ПОЛЬЗОВАТЕЛЬ</span><span>РОЛЬ</span><span>АКТИВНОСТЬ</span><span>СТАТУС</span><span class="tr">ДЕЙСТВИЯ</span></div>' + trs + '</div></div>')
    return adshell('администратор', AD_NAV, 1, 'Пользователи', 'Ирина Д.', 'ИД', content)

def e62():
    facts = ''.join('<div><span class="lab">' + k + '</span><div style="font-size:13px;font-weight:600;margin-top:4px">' + v + '</div></div>'
                    for k, v in [('EMAIL', 'olga@psy.ru'), ('TELEGRAM', '@olga_psy'), ('РЕГИСТРАЦИЯ', '02.09.2026'),
                                 ('ПОСЛЕДНИЙ ВХОД', 'сегодня, 09:41'), ('2FA', 'включена'), ('СЕССИЙ', '0 (новая)')])
    prof = ('<div class="card"><div style="display:flex;gap:16px;align-items:center">'
            '<span class="ava" style="width:64px;height:64px;font-size:18px">ОВ</span>'
            '<div><b style="font-size:18px">Ольга В.</b><div style="font-size:12px;color:var(--ink2);margin-top:2px">'
            + icon('clock', 14, '#F59E0B') + ' психолог · верификация на проверке</div></div></div>'
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px">' + facts + '</div></div>')
    docs = ''.join('<div class="docrow">' + icon('file-text', 18, '#2563EB') + '<div><b>' + d + '</b><span>' + s + '</span></div><a>Открыть →</a></div>'
                   for d, s in [('Диплом.pdf', '2,4 МБ'), ('Сертификат КПТ.pdf', '1,1 МБ'), ('Скан паспорта.pdf', '860 КБ')])
    act = ('<div class="card"><div class="chead"><b>Активность</b></div>' + audit_html([
        ('09:41', 'Ольга В.', 'Вход в систему', '87.229.…'),
        ('вчера', 'Ольга В.', 'Заявка на верификацию', '3 файла'),
        ('02.09', 'система', 'Регистрация по приглашению', '—')]) + '</div>')
    danger = ('<div class="card"><div class="chead"><b>Действия администратора</b></div>'
              '<p class="muted" style="font-size:11px">Верификация решается на экране E-64.</p>'
              '<div class="ctas" style="flex-direction:column;align-items:stretch;margin-top:10px">'
              '<button class="btn secondary">Написать пользователю</button>'
              '<button class="btn secondary">Заблокировать</button>'
              '<button class="btn secondary" style="color:var(--err);border-color:#FECACA">Удалить аккаунт</button></div></div>')
    content = ('<div class="content"><div class="cols">'
               '<div class="col-l" style="flex:1.4">' + prof +
               '<div class="card" style="margin-top:20px"><div class="chead"><b>Документы верификации</b></div>' + docs + '</div></div>'
               '<div class="col-r" style="flex:1">' + act + danger + '</div></div></div>')
    return adshell('администратор', AD_NAV, 1, 'Пользователи · Ольга В.', 'Ирина Д.', 'ИД', content)

def e63():
    banner = ('<div class="oktoast" style="background:#EFF6FF;border-color:#BFDBFE">'
              + icon('info', 20, '#2563EB') + '<div><b style="color:#1D4ED8">5 заявок в очереди</b>'
              '<span style="color:#1D4ED8">SLA ответа — 48 часов · просроченных нет</span></div></div>')
    rows = [('Ольга В.', 'сегодня, 10:12', '3 документа', 'новая', 'b'),
            ('Игорь Л.', 'сегодня, 08:47', '3 документа', 'на проверке', 'n'),
            ('Светлана Р.', 'вчера, 19:30', '2 документа', 'на проверке', 'n'),
            ('Максим Д.', 'вчера, 14:05', '3 документа', 'на проверке', 'n'),
            ('Елена П.', '2 дня назад', '1 документ', 'дособрать', 'y')]
    trs = ''.join('<div class="trow" style="padding:14px 4px"><b style="width:26%"><span class="ava" style="width:32px;height:32px;display:inline-flex;font-size:11px;vertical-align:middle;margin-right:10px">' + r[0][:2].upper() + '</span>' + r[0] + '<br><span style="font-weight:400;font-size:11px;color:var(--ink3);margin-left:42px">психолог · 1 заявка</span></b>'
                  '<span class="game" style="flex:0 0 20%">' + r[1] + '</span><span class="tm2" style="flex:0 0 16%">' + r[2] + '</span>'
                  '<span style="flex:0 0 14%">' + stc(r[3], r[4]) + '</span><span class="tr"><button class="btn secondary sm">Рассмотреть</button></span></div>'
                  for r in rows)
    content = ('<div class="content">' + banner +
               '<div class="card tablec"><div class="thead"><span>ЗАЯВИТЕЛЬ</span><span>ПОДАНА</span><span>ДОКУМЕНТЫ</span><span>СТАТУС</span><span class="tr">ДЕЙСТВИЯ</span></div>' + trs + '</div></div>')
    return adshell('администратор', AD_NAV, 2, 'Верификация психологов', 'Ирина Д.', 'ИД', content)

def e64():
    left = ('<div class="card"><div style="display:flex;gap:14px;align-items:center">'
            '<span class="ava" style="width:56px;height:56px;font-size:16px">ОВ</span>'
            '<div><b style="font-size:17px">Ольга В.</b><div class="muted" style="font-size:12px">olga@psy.ru · @olga_psy</div>'
            '<div style="margin-top:6px">' + stc('заявка подана сегодня', 'b') + '</div></div></div>'
            '<div style="margin-top:16px"><span class="lab">ОБРАЗОВАНИЕ</span>'
            '<p style="font-size:13px;font-weight:600;margin:4px 0 0">МГУ, клиническая психология (2019)</p>'
            '<p style="font-size:13px;color:var(--ink2);margin:2px 0">КПТ-сертификация, 480 часов (2023)</p></div>'
            '<div style="margin-top:10px"><span class="lab">ОПЫТ</span>'
            '<p style="font-size:13px;color:var(--ink2);margin:4px 0 0">Частная практика, 3 года · очно и онлайн</p></div></div>'
            '<div class="card" style="margin-top:20px"><div class="chead"><b>Документы</b></div>'
            + ''.join('<div class="docrow">' + icon('file-text', 18, '#2563EB') + '<div><b>' + d + '</b><span>' + s + '</span></div><a>Открыть →</a></div>'
                      for d, s in [('Диплом.pdf', '2,4 МБ'), ('Сертификат КПТ.pdf', '1,1 МБ'), ('Скан паспорта.pdf', '860 КБ')]) + '</div>')
    checks = ''.join('<div class="setl"><span style="display:flex;gap:10px;align-items:center"><span class="cbrow" style="margin:0"><span class="sw on" style="width:18px;height:18px;border-radius:5px' + ('' if c else ';background:#fff;border:1px solid var(--bd)') + '"><i style="' + ('' if c else 'display:none') + '"></i></span></span>' + t + '</span></div>'
                     for t, c in [('Документы читаемы и полны', True), ('Данные совпадают с профилем', True),
                                  ('Образование подтверждено', False), ('Нет дублей аккаунта', True)])
    right = ('<div class="card"><div class="chead"><b>Чек-лист проверки</b></div>' + checks + '</div>'
             '<div class="card" style="margin-top:20px"><div class="chead"><b>Комментарий к решению</b></div>'
             '<div class="field"><div class="inp" style="min-height:64px">Диплом и сертификат в порядке…</div></div>'
             '<div class="ctas" style="margin-top:14px">'
             '<button class="btn secondary">Отклонить</button>'
             '<button class="btn primary">' + icon('badge-check', 16, '#FFFFFF') + ' Одобрить</button></div></div>')
    content = ('<div class="content"><div class="cols"><div class="col-l" style="flex:1.4">' + left + '</div>'
               '<div class="col-r" style="flex:1">' + right + '</div></div></div>')
    return adshell('администратор', AD_NAV, 2, 'Верификация · Ольга В.', 'Ирина Д.', 'ИД', content)

def e65():
    tabs = ''.join('<span class="seg' + (' on' if i == 1 else '') + '">' + t + '</span>' for i, t in enumerate(['Все', 'На проверке', 'С жалобами', 'Опубликованные']))
    rows = [('Тревога перед экзаменом', 'Анна К.', 'жалоба', 'r', '1', 'проверить'),
            ('Конфликт с руководителем', 'Денис М.', 'на проверке', 'y', '—', 'открыть'),
            ('Прощание с партнёром', 'Ольга В.', 'на проверке', 'y', '—', 'открыть'),
            ('Синдром самозванца', 'Анна К.', 'опубликован', 'g', '—', 'открыть'),
            ('Выгорание мамы', 'Мария С.', 'опубликован', 'g', '—', 'открыть'),
            ('Панические атаки', 'Денис М.', 'скрыт', 'n', '1', 'восстановить')]
    trs = ''.join('<div class="trow"><b style="width:34%">' + r[0] + '<br><span style="font-weight:400;font-size:11px;color:var(--ink3)">изменён 2 дня назад</span></b>'
                  '<span class="game" style="flex:0 0 16%">' + r[1] + '</span><span style="flex:0 0 16%">' + stc(r[2], r[3]) + '</span>'
                  '<span class="tm2" style="flex:0 0 8%">' + r[4] + '</span><span class="tr" style="color:var(--acc);font-weight:500;font-size:13px">' + r[5] + ' →</span></div>'
                  for r in rows)
    content = ('<div class="content"><div class="segrow" style="margin-bottom:14px">' + tabs + '</div>'
               '<div class="card tablec"><div class="thead"><span>СЦЕНАРИЙ</span><span>АВТОР</span><span>СТАТУС</span><span>ЖАЛОБЫ</span><span class="tr">ДЕЙСТВИЯ</span></div>' + trs + '</div></div>')
    return adshell('администратор', AD_NAV, 3, 'Модерация сценариев', 'Ирина Д.', 'ИД', content)

def e66():
    chips = ''.join('<span class="fchip' + (' on' if i == 0 else '') + '">' + k + '</span>' for i, k in enumerate(['Все события', 'Входы', 'Доступы', 'Верификация', 'Данные']))
    per = '<span class="cpb" style="width:auto;padding:0 12px;font-size:12px;color:var(--ink2)">' + icon('calendar', 14, '#64748B') + ' сегодня · 00:00–23:59</span>'
    evs = audit_html([('12:04', 'Ирина Д. (админ)', 'Одобрила верификацию психолога', 'Ольга В.'),
                      ('11:58', 'система', 'Ротация ключей шифрования', '—'),
                      ('11:37', 'система', 'Доступ истёк автоматически', 'Клиент В.'),
                      ('11:02', 'Анна К. (психолог)', 'Создала ClientAccess', 'Дневник эмоций'),
                      ('10:52', 'Мария С. (супервизор)', 'Комментарий к разбору', 'Сессия #812'),
                      ('10:15', 'Пётр С. (студент)', 'Экспорт разбора сессии', 'Сессия #790'),
                      ('09:41', 'Ольга В. (психолог)', 'Вход в систему · 2FA', '87.229.…'),
                      ('09:15', 'Анна К. (психолог)', 'Выдала игру клиенту', 'A7X9-Q2'),
                      ('08:47', 'Игорь Л. (психолог)', 'Заявка на верификацию', '3 файла'),
                      ('03:00', 'система', 'Ночной бэкап завершён', 'OK · 12 ГБ')])
    content = ('<div class="content"><div style="display:flex;gap:8px;align-items:center"><div style="display:flex;gap:8px;flex-wrap:wrap">' + chips + '</div>'
               '<span class="grow"></span>' + per + '</div>'
               '<div class="card" style="margin-top:14px">' + evs + '</div>'
               '<p class="muted" style="font-size:12px;margin-top:10px">Журнал хранится 3 года (152-ФЗ); действия администраторов — без удаления.</p></div>')
    return adshell('администратор', AD_NAV, 4, 'Аудит-лог', 'Ирина Д.', 'ИД', content)

def e67():
    lims = ''.join('<div class="field"><span class="lbl">' + l + '</span><div class="inp">' + v + '</div></div>'
                   for l, v in [('Сессий в день (студент)', '10'), ('Игр на клиента', '∞'),
                                ('Размер файла', '25 МБ'), ('Дней хранения черновиков', '30')])
    col1 = '<div class="card"><div class="chead"><b>Лимиты</b></div>' + lims + '</div>'
    sws = ''.join('<div class="setl"><span>' + s + '</span><span class="sw8' + (' off' if not c else '') + '"><i></i></span></div>'
                  for s, c in [('Уведомлять о прохождениях', True), ('Напоминания клиентам', True), ('Тестовые сообщения', False)])
    col2 = ('<div class="card"><div class="chead"><b>Telegram-бот</b></div>'
            '<div class="field"><span class="lbl">BOT TOKEN</span><div class="inp">••••••••••••:AAH…</div></div>'
            '<div class="field"><span class="lbl">WEBHOOK</span><div class="inp">api.platform.ru/tg/hook</div></div>'
            + sws + '</div>')
    ints = ''.join('<div class="docrow" style="margin-top:8px"><div><b>' + n + '</b></div>' + stc(st, 'g' if st != 'скоро' else 'y') + '</div>'
                   for n, st in [('SMTP-почта', 'подключено'), ('S3-хранилище', 'подключено'), ('Sentry-мониторинг', 'подключено'), ('Платёжный провайдер', 'скоро')])
    col3 = '<div class="card"><div class="chead"><b>Интеграции</b></div>' + ints + '</div>'
    content = ('<div class="content"><div class="grid3" style="grid-template-columns:1fr 1fr 1fr">' + col1 + col2 + col3 + '</div>'
               '<div class="ctas" style="justify-content:flex-end;margin-top:16px"><button class="btn primary">Сохранить настройки</button></div></div>')
    return adshell('администратор', AD_NAV, 5, 'Настройки платформы', 'Ирина Д.', 'ИД', content)

# ------------------------------------------------------------ супервизия ----
def e68():
    rows = [('Пётр С.', 'Тревога перед экзаменом', 'Слушание', 'ждёт', 'y'),
            ('Нина Т.', 'Конфликт с руководителем', 'Границы', 'ждёт', 'y'),
            ('Пётр С.', 'Синдром самозванца', 'Эмпатия', 'завершён', 'g'),
            ('Алина Ж.', 'Выгорание мамы', 'Рефлексия', 'завершён', 'g')]
    rr = ''.join('<div class="crow"><span class="ava" style="opacity:.9">' + r[0][:2].upper() + '</span>'
                 '<div><b>' + r[0] + ' · ' + r[1] + '</b><span>фокус: ' + r[2] + ' · сессия 24 мин</span></div>' + stc(r[3], r[4]) + '</div>'
                 for r in rows)
    evs = ''.join('<div class="docrow"><div><b style="color:var(--acc)">' + e[0] + '</b><span style="font-size:12px;color:var(--ink)">' + e[1] + '</span></div><span class="muted" style="font-size:11px">' + e[2] + '</span></div>'
                  for e in [('пт, 18:00', 'Группа · студенты 2 курса', '4 участника'),
                            ('пн, 11:00', 'Интервизия психологов', '6 участников')])
    content = ('<div class="content">'
               + kpis([('Супервизируемых', '8', '+1', 'g'), ('Разборов за неделю', '14', '+3', 'g'),
                       ('Средний балл', '7,8', '+0,4', 'g'), ('Ждут комментария', '3', 'дедлайн 2 дня', 'y')])
               + '<div class="cols" style="margin-top:20px"><div class="col-l" style="flex:1.6">'
               + '<div class="card"><div class="chead"><b>Последние разборы</b></div>' + rr + '</div></div>'
               + '<div class="col-r" style="flex:1"><div class="card"><div class="chead"><b>Групповые супервизии</b></div>' + evs
               + '<p class="muted" style="font-size:11px;margin-top:8px">Ссылка на встречу приходит за час.</p>'
               + '<button class="btn secondary sm" style="margin-top:8px">Запланировать</button></div></div></div></div>')
    return adshell('супервизор', SUP_NAV, 0, 'Супервизия · обзор', 'Мария С.', 'МС', content)

def e69():
    rows = [('Пётр С.', 'студент · 2 курс', '24 сессии · ср. 7,2', 72, 'по плану', 'n'),
            ('Нина Т.', 'студент · 2 курс', '12 сессий · ср. 6,8', 55, 'по плану', 'n'),
            ('Алина Ж.', 'студент · 3 курс', '41 сессия · ср. 8,1', 88, 'отлично', 'g'),
            ('Глеб К.', 'психолог · практика', '9 сессий · ср. 7,5', 63, 'по плану', 'n'),
            ('Даша Р.', 'студент · 1 курс', '4 сессии · ср. 6,1', 30, 'внимание', 'y')]
    rr = ''.join('<div class="crow" style="padding:14px 8px"><span class="ava">' + r[0][:2].upper() + '</span>'
                 '<div><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'
                 '<span class="muted" style="font-size:12px;flex:0 0 22%">' + r[2] + '</span>'
                 '<span style="flex:0 0 24%"><span class="lab">ПРОГРЕСС ПРОГРАММЫ</span><span class="pbar3" style="display:block;margin-top:4px"><b style="width:' + str(r[3]) + '%"></b></span></span>'
                 '<span>' + stc(r[4], r[5]) + '</span><a class="lnk" style="font-size:12px">Открыть →</a></div>'
                 for r in rows)
    content = ('<div class="content"><div style="display:flex;gap:8px;align-items:center">'
               '<div class="srch" style="flex:1"><span class="sinp">' + icon('search', 16, '#94A3B8') + ' Имя студента…</span></div>'
               + stc('8 активных', 'n') + '<span class="grow"></span><button class="btn primary">' + icon('plus', 16, '#FFFFFF') + ' Пригласить студента</button></div>'
               '<div class="card" style="margin-top:14px">' + rr + '</div></div>')
    return adshell('супервизор', SUP_NAV, 1, 'Супервизируемые', 'Мария С.', 'МС', content)

def e70():
    bubbles = ('<div class="bubble left">Клиент: «Я всегда паникую перед<br>экзаменами, руки холодеют».</div>'
               '<div class="bubble right">Психолог: «Давайте остановимся на<br>этом ощущении. Где в теле оно?»</div>'
               '<div class="bubble left">Клиент: «В груди и горле. Становится<br>страшно говорить об этом».</div>'
               '<div class="bubble right">Психолог: «Спасибо, что замечаете.<br>Какую эмоцию вы слышите внутри?»</div>')
    emos = ''.join(stc(e, k) + ' ' for e, k in [('тревога — высокая', 'e'), ('напряжение — среднее', 'y'), ('доверие — растёт', 'g')])
    comments = ''.join('<div class="crow" style="align-items:flex-start;background:var(--bg2);border-radius:12px;margin-top:10px;padding:12px">'
                       '<span class="ava" style="width:32px;height:32px;font-size:10px">МС</span>'
                       '<div style="flex:1"><b style="font-size:13px">Мария С. ' + stc(tc, 'v') + '</b>'
                       '<span style="font-size:12px;color:var(--ink2);display:block;margin-top:4px">' + l1 + '<br>' + l2 + '</span>'
                       '<a class="lnk" style="font-size:11px;display:block;margin-top:6px">Ответить · Решить</a></div></div>'
                       for tc, l1, l2 in [('04:12', 'Хорошая фокусировка на телесном', 'ощущении — уточняющий вопрос уместен.'),
                                          ('11:40', 'Тут можно вернуться к эмоции и', 'проверить её название вместе с клиентом.')])
    content = ('<div class="content"><div class="cols"><div class="col-l" style="flex:1.4">'
               '<div class="card"><div class="chead"><b>Пётр С. · «Тревога перед экзаменом»</b><span class="grow"></span>' + stc('04:12', 'v') + '</div>'
               '<p class="muted" style="font-size:12px">сегодня, 14:00 · 24 мин · фокус: Слушание</p>'
               '<div style="margin-top:10px">' + bubbles + '</div>'
               '<div style="margin-top:14px"><span class="lab">ЭМОЦИИ КЛИЕНТА ПО ХОДУ СЕССИИ</span><div style="margin-top:6px">' + emos + '</div></div></div></div>'
               '<div class="col-r" style="flex:1"><div class="card"><div class="chead"><b>Комментарии супервизии</b></div>' + comments +
               '<div class="field" style="margin-top:12px"><div class="inp" style="min-height:56px">Новый комментарий…<br><span class="muted" style="font-size:10px">τ таймкод вставится автоматически</span></div></div>'
               '<div class="ctas" style="justify-content:flex-end;margin-top:8px"><button class="btn primary">' + icon('send', 16, '#FFFFFF') + ' Отправить</button></div></div></div></div></div>')
    return adshell('супервизор', SUP_NAV, 2, 'Разбор сессии #812', 'Мария С.', 'МС', content)

def e71():
    sk = ''.join('<span class="skchip' + (' on' if i == 0 else '') + '">' + s + '</span>' for i, s in enumerate(['Слушание', 'Эмпатия', 'Рефлексия', 'Границы']))
    tpl = ''.join('<span class="tplchip' + (' on' if i == 0 else '') + '">' + t + '</span>' for i, t in enumerate(['Отметить сильную сторону', 'Предложить альтернативу']))
    content = ('<div class="content"><div class="card" style="max-width:720px;margin:0 auto;padding:24px">'
               '<b style="font-size:17px">Комментарий супервизии</b>'
               '<p class="muted" style="font-size:12px;margin-top:2px">Сессия #812 · Пётр С. · 04:12–04:58</p>'
               '<span class="lab" style="display:block;margin-top:16px">ФРАГМЕНТ</span>'
               '<div class="qfrag">Психолог: «Давайте остановимся на этом ощущении. Где в теле оно?»<span class="tc">04:12</span></div>'
               '<span class="lab" style="display:block;margin-top:16px">ФОКУС-НАВЫК</span><div style="display:flex;gap:8px;margin-top:8px">' + sk + '</div>'
               '<span class="lab" style="display:block;margin-top:16px">ШАБЛОН</span><div style="display:flex;gap:8px;margin-top:8px">' + tpl + '</div>'
               '<span class="lab" style="display:block;margin-top:16px">КОММЕНТАРИЙ</span>'
               '<div class="inp" style="min-height:88px;margin-top:8px;border:2px solid var(--acc)">Сильная сторона: ты не ушёл от телесного фокуса и удержал темп. Рядом — проверка названия эмоции вместе с клиентом («это тревога или страх?»).</div>'
               '<div class="cbrow" style="margin-top:14px"><span class="sw on" style="width:18px;height:18px;border-radius:5px"><i></i></span>Видит только студент (не клиент)</div>'
               '<div class="ctas" style="margin-top:16px"><button class="btn secondary">Отменить</button><button class="btn primary">' + icon('send', 16, '#FFFFFF') + ' Отправить</button></div></div></div>')
    return adshell('супервизор', SUP_NAV, 2, 'Новый комментарий', 'Мария С.', 'МС', content)

def e72():
    bars = ''.join('<div style="text-align:center"><span style="font-size:11px;font-weight:600;color:' + ('var(--acc)' if b[2] else 'var(--ink3)') + '">' + str(b[0] / 10).replace('.', ',') + '</span>'
                   '<div style="width:32px;height:' + str(b[0] * 2) + 'px;border-radius:8px;background:' + ('var(--acc)' if b[2] else 'var(--bd)') + ';margin-top:4px"></div>'
                   '<span style="font-size:10px;color:var(--ink3)">' + b[1] + '</span></div>'
                   for b in [(46, 'н1', False), (54, 'н2', False), (58, 'н3', False), (64, 'н4', True), (71, 'н5', True)])
    ach = ''.join('<div class="kpi"><span class="kl">' + a[0] + '</span><b style="font-size:20px">' + a[1] + ' → ' + a[2] + '</b>' + stc(a[3], 'g') + '<br><span class="muted" style="font-size:10px;margin-top:6px;display:block">за 5 недель</span></div>'
                  for a in [('Слушание', '86', '91', '+5'), ('Эмпатия', '78', '84', '+6'), ('Границы', '64', '71', '+7'), ('Структура', '80', '83', '+3')])
    content = ('<div class="content"><div class="cols"><div class="col-l" style="flex:1">'
               '<div class="card"><div class="chead"><b>Навыки (8) · сейчас / начало</b></div>'
               '<div style="display:flex;justify-content:center">' + radar_svg(240) + '</div></div></div>'
               '<div class="col-r" style="flex:1.2"><div class="card"><div class="chead"><b>Средний балл по неделям</b></div>'
               '<div style="display:flex;gap:24px;align-items:flex-end;margin-top:10px">' + bars + '</div></div></div></div>'
               '<div class="card" style="margin-top:20px"><div class="chead"><b>Динамика навыков</b></div>'
               '<div class="kpis" style="margin-top:8px">' + ach + '</div>'
               '<a class="lnk" style="display:block;text-align:right;margin-top:12px;font-size:13px">Рекомендация: готов к работе с клиентами под наблюдением →</a></div></div>')
    return adshell('супервизор', SUP_NAV, 3, 'Прогресс студента · Пётр С.', 'Мария С.', 'МС', content)

def e73():
    secs = [('1. Объём практики', ['12 сессий под наблюдением · 2 групповые супервизии · 4 разбора с таймкодами.']),
            ('2. Сильные стороны', ['Устойчивый контакт, телесный фокус, корректные границы.', 'Слушание 86→91, эмпатия 78→84.']),
            ('3. Зоны роста', ['Проверка названий эмоций с клиентом; работа с молчанием;', 'тайм-менеджмент сессии (финал торопится).']),
            ('4. Рекомендация', ['Допустить к работе с клиентами под наблюдением; полный допуск —', 'после 6 сессий и разбора двух сложных случаев.'])]
    body = ''.join('<h3>' + h + '</h3>' + ''.join('<p>' + l + '</p>' for l in ls) for h, ls in secs)
    content = ('<div class="content"><div class="card rpt" style="max-width:860px;margin:0 auto;padding:28px">'
               '<div style="display:flex;align-items:center"><b style="font-size:18px">Итоговый отчёт супервизии</b><span class="grow"></span>' + stc('черновик', 'y') + '</div>'
               '<p class="muted" style="font-size:12px;margin-top:4px">Пётр С. · студент, 2 курс · период: май–сентябрь 2026 · супервизор Мария С.</p>'
               + body +
               '<div style="border-top:1px solid var(--bd);margin-top:18px;padding-top:10px">'
               '<p class="muted" style="font-size:11px">' + icon('badge-check', 13, '#2563EB') + ' Мария С. · супервизор, verified · 16.09.2026</p></div>'
               '<div class="ctas" style="margin-top:14px"><button class="btn secondary">' + icon('download', 16, '#475569') + ' Экспорт PDF</button>'
               '<button class="btn primary">' + icon('send', 16, '#FFFFFF') + ' Отправить студенту</button></div></div></div>')
    return adshell('супервизор', SUP_NAV, 4, 'Отчёт супервизии', 'Мария С.', 'МС', content)

# ---------------------------------------------------------------- сборка ----
SECTIONS = [
    ('E-60', 'Обзор платформы', e60(), 'KPI платформы, график активности, состояние системы, свежие события аудита (ТЗ E-60).'),
    ('E-61', 'Пользователи', e61(), 'Поиск + роли-фильтры, таблица с верификацией и статусами, приглашения (ТЗ E-61).'),
    ('E-62', 'Пользователь · карточка', e62(), 'Профиль, документы верификации, активность, danger zone администратора (ТЗ E-62).'),
    ('E-63', 'Верификация · очередь', e63(), 'Очередь заявок с SLA 48 ч: новая / на проверке / дособрать (ТЗ E-63).'),
    ('E-64', 'Верификация · решение', e64(), 'Заявитель + документы, чек-лист проверки, решение «Одобрить/Отклонить» (ТЗ E-64).'),
    ('E-65', 'Модерация сценариев', e65(), 'Табы статусов, жалобы, скрытие/восстановление сценариев (ТЗ E-65).'),
    ('E-66', 'Аудит-лог', e66(), 'Фильтры по типам событий, период, хранение 3 года (152-ФЗ) — компонент AuditLogRow (ТЗ E-66).'),
    ('E-67', 'Настройки платформы', e67(), 'Лимиты, Telegram-бот, интеграции (ТЗ E-67).'),
    ('E-68', 'Супервизия · дашборд', e68(), 'KPI супервизора, разборы «ждут комментария», групповые сессии (ТЗ E-68).'),
    ('E-69', 'Супервизируемые', e69(), 'Студенты с прогрессом программы и средним баллом (ТЗ E-69).'),
    ('E-70', 'Разбор сессии', e70(), 'Транскрипт с репликами, эмоции по ходу, комментарии супервизии с таймкодами — SupervisionComment (ТЗ E-70).'),
    ('E-71', 'Комментарий супервизии', e71(), 'Фрагмент с таймкодом, фокус-навык, шаблоны, приватность «видит только студент» (ТЗ E-71).'),
    ('E-72', 'Прогресс студента', e72(), 'Радар 8 навыков (сейчас/начало), баллы по неделям, динамика навыков (ТЗ E-72).'),
    ('E-73', 'Отчёт супервизии', e73(), 'Структура отчёта, рекомендация, экспорт PDF (ТЗ E-73).'),
]

parts = []
for code, title, html, note in SECTIONS:
    boxes = ('<div class="fbox repl"><p class="flabel">Desktop · 1440</p><div class="clip">' + html + '</div></div>'
             '<div class="fbox repl2"><p class="flabel">Desktop · 1280</p><div class="clip">' + html + '</div></div>')
    parts.append('<section class="scr" id="' + code + '">\n<h2>' + code + ' · ' + title +
                 '<span class="tok">1440 / 1280 · без мобильных (ТЗ 5.7–5.8)</span></h2>\n<p class="note">' + note + '</p>\n'
                 '<div class="frow">' + boxes + '</div></section>')

toc = ''.join('<a href="#' + c + '">' + c + '</a>' for c, *_ in SECTIONS)

doc = ('<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
       '<title>Platform Design · 08 Admin + Supervision · v1.0</title>\n<style>' + CSS + b6.DARK_CSS + ADMIN_CSS + '</style></head><body>\n'
       '<div class="wrap">\n<header class="page">\n'
       '<span class="chip-top">● Platform Design</span> '
       '<span class="chip-top" style="background:#F7F8FA;color:#475569;border-color:#E2E8F0">Итерация 8: админка + супервизия — готово</span>\n'
       '<h1 class="pt">08 · Экраны E-60…E-73</h1>\n'
       '<p class="lead">Кабинет администратора (обзор, пользователи, верификация психологов, модерация, аудит-лог 152-ФЗ, настройки) и кабинет супервизора (разборы сессий с таймкодами, прогресс студентов, итоговые отчёты). Только 1440/1280 — мобильные версии для этих ролей не проектируются (ТЗ 5.7–5.8). В Penpot — 28 фреймов плагина v0.8.</p>\n'
       '<nav class="toc">' + toc + '</nav>\n</header>\n'
       + '\n'.join(parts) +
       '\n<footer style="text-align:center;color:#94A3B8;font-size:13px;margin-top:40px">Platform Design · Admin + Supervision v1.0 · плагин v0.8 · источник: tokens/design-tokens.json</footer>\n'
       '</div></body></html>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w').write(doc)
print('OK:', OUT, len(doc), 'bytes')
