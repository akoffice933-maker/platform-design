#!/usr/bin/env python3
"""Собирает 01-foundations.html: инжектит палитру, типографику, шкалы,
SVG-сетки, иконки Lucide и WCAG-таблицу из design-tokens.json."""
import json, html, os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(ROOT, 'foundations', '01-foundations.html')
TOKENS = json.load(open(os.path.join(ROOT, 'tokens', 'design-tokens.json')))

def esc(s): return html.escape(str(s), quote=True)

def lum(hexc):
    hexc = hexc.lstrip('#')
    r, g, b = (int(hexc[i:i+2], 16)/255 for i in (0, 2, 4))
    f = lambda c: c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
    r, g, b = f(r), f(g), f(b)
    return 0.2126*r + 0.7152*g + 0.0722*b

def contrast(fg, bg):
    la, lb = lum(fg), lum(bg)
    return (max(la, lb)+0.05)/(min(la, lb)+0.05)

def verdict(ratio):
    if ratio >= 7: return ('ok', 'AAA')
    if ratio >= 4.5: return ('aa', 'AA')
    if ratio >= 3: return ('aal', 'AA · крупный/UI')
    return ('fail', 'FAIL')

# ---------- Палитра ----------
def cat_of(name, idx=1): return name.split('/')[idx]

def flatten(group, prefix):
    out = {}
    for k, v in group.items():
        if k.startswith('$'): continue
        if '$value' in v: out[f'{prefix}/{k}'] = v
        else: out.update(flatten(v, f'{prefix}/{k}'))
    return out

ALL_COLOR_FLAT = flatten(TOKENS['color'], 'color')
LIGHT_FLAT = {k: v for k, v in ALL_COLOR_FLAT.items() if '/dark/' not in k}
DARK_FLAT = {k: v for k, v in ALL_COLOR_FLAT.items() if '/dark/' in k}

GROUP_TITLES = {
    'bg': 'Фоны', 'text': 'Текст', 'border': 'Границы', 'accent': 'Акценты',
    'semantic': 'Семантика', 'emotion': 'Эмоции (шкала 0–10)', 'skill': 'Навыки (8)',
}
def palette_cards(group, wrap_class='g4', idx=1):
    out = []
    cats = []
    for name, tok in group.items():
        c = cat_of(name, idx)
        if c not in cats: cats.append(c)
    for c in cats:
        out.append(f'<div class="grouph">{esc(GROUP_TITLES.get(c, c))}</div>')
        out.append(f'<div class="grid {wrap_class}">')
        for name, tok in group.items():
            if cat_of(name, idx) != c: continue
            v = tok['$value']; d = tok.get('$description', '')
            out.append(
                f'<div class="card"><div class="sw" style="background:{v}"></div>'
                f'<div class="meta"><div class="nm">{esc(name)}</div><div class="hx">{v}</div>'
                f'<div class="use">{esc(d)}</div></div></div>')
        out.append('</div>')
    return '\n'.join(out)

# ---------- Типографика ----------
def typo_rows():
    rows = []
    samples = {
        'display': 'Симуляция консультации', 'h1': 'Библиотека сценариев',
        'h2': 'Активное слушание', 'h3': 'Карточка сценария',
        'body-lg': 'Клиент делится сложной ситуацией', 'body': 'Основной текст интерфейса',
        'body-sm': 'Подпись под полем ввода', 'caption': 'МЕТА · ШАГ 2 ИЗ 7',
        'button': 'Начать симуляцию', 'mono': 'A7X9-Q2',
    }
    for name, tok in TOKENS['typography'].items():
        if name.startswith('$'): continue
        v = tok['$value']
        fam = v['fontFamily'][0]
        weight = v['fontWeight']; size = v['fontSize']; lh = v['lineHeight']
        style = (f"font-family:{'JetBrains Mono, ui-monospace, monospace' if name=='mono' else 'Inter, sans-serif'};"
                 f"font-size:{size};line-height:{lh};font-weight:{weight};color:#0F172A")
        use = tok.get('$description', '')
        rows.append(
            f'<div class="typeRow"><div class="typeSpec"><div class="nm">text/{esc(name)}</div>'
            f'<div class="sp">{esc(size)}/{esc(lh)} · {weight} · {esc(fam)} · {esc(use)}</div></div>'
            f'<div style="{esc(style)}">{esc(samples.get(name, name))}</div></div>')
    return '\n'.join(rows)

# ---------- Spacing ----------
def spacing_rows():
    out = []
    for i in range(1, 10):
        px = int(TOKENS['space'][str(i)]['$value'].rstrip('px'))
        out.append(f'<div class="spaceRow"><div class="lbl">space/{i} · {px}px</div>'
                   f'<div class="bar" style="width:{min(px*3+px//3, 460)+ (px if px<48 else 48)}px; min-width:8px"><span>{px}px</span></div></div>')
    return '\n'.join(out)

# ---------- Радиусы / Тени ----------
def radii_boxes():
    out = []
    for name, tok in TOKENS['radius'].items():
        if name.startswith('$'): continue
        v = int(tok['$value'].rstrip('px'))
        r = min(v, 28)
        out.append(f'<div class="rbox"><div class="sq" style="border-radius:{r}px"></div>'
                   f'<div class="cap"><b>radius/{esc(name)}</b>{v if v<9999 else "full"}</div></div>')
    return '\n'.join(out)

def shadow_cards():
    out = []
    for i, name in enumerate(['sm', 'md', 'lg']):
        v = TOKENS['shadow'][name]['$value']
        css = f"{v['offsetX']} {v['offsetY']} {v['blur']} {v['spread']} {v['color'].replace('rgba(0, 0, 0','rgba(0,0,0')}"
        spec = f"{v['offsetX']} {v['offsetY']} {v['blur']} · {int(float(v['color'].split(',')[1].strip().rstrip(')'))*100)}%"
        out.append(f'<div class="shadowCard s{i+1}"><div class="sq"></div>'
                   f'<div class="cap"><b>shadow/{esc(name)}</b><span class="mono" style="font-size:11px">{esc(spec)}</span></div></div>')
    return '\n'.join(out)

# ---------- Сетки (SVG) ----------
def grid_svg(width, height, cols, margin, gutter, label, note, tma=False):
    content = width - 2*margin
    col_w = (content - gutter*(cols-1)) / cols
    s = [f'<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="{esc(label)}">']
    s.append(f'<rect width="{width}" height="{height}" rx="10" fill="#F7F8FA" stroke="#E2E8F0"/>')
    if tma:
        s.append(f'<rect width="{width}" height="34" rx="10" fill="#FDE68A"/>')
        s.append(f'<rect y="{height-38}" width="{width}" height="38" fill="#FDE68A"/>')
        s.append(f'<rect y="34" width="{width}" height="{height-72}" fill="#fff"/>')
        fs = 15 if width < 500 else 16
        s.append(f'<text x="{width/2}" y="21" text-anchor="middle" font-size="12" fill="#92400E" font-family="monospace">Telegram header · 56px safe area</text>')
        s.append(f'<text x="{width/2}" y="{height-16}" text-anchor="middle" font-size="12" fill="#92400E" font-family="monospace">MainButton · 80px safe area</text>')
        top = 34; bot = height-38
    else:
        s.append(f'<rect width="{width}" height="{height}" rx="10" fill="#fff"/>')
        top = 0; bot = height
    for i in range(cols):
        x = margin + i*(col_w+gutter)
        s.append(f'<rect x="{x:.0f}" y="{top+8}" width="{col_w:.0f}" height="{bot-top-16}" fill="#DBEAFE" opacity="0.9"/>')
    s.append(f'<rect x="0" y="{top}" width="{margin}" height="{bot-top}" fill="#F1F5F9" opacity="0.7"/>')
    s.append(f'<rect x="{width-margin}" y="{top}" width="{margin}" height="{bot-top}" fill="#F1F5F9" opacity="0.7"/>')
    s.append('</svg>')
    cap = f'<p>{esc(note)}</p>' if note else ''
    return (f'<div class="gcard"><h4>{esc(label)}</h4>{cap}'
            + ''.join(s) + '</div>')

def grids():
    return '\n'.join([
        grid_svg(1440, 220, 12, 120, 24, 'Desktop · 1440',
                 '12 колонок · gutter 24 · margin 120 · контент 1200 · брейкпоинты 1440/1280/1024'),
        grid_svg(768, 200, 8, 32, 16, 'Tablet · 768', '8 колонок · gutter 16 · margin 32 · sidebar → иконки'),
        grid_svg(390, 170, 4, 16, 16, 'Mobile web · 390', '4 колонки · gutter 16 · margin 16 · bottom nav'),
        grid_svg(390, 300, 4, 16, 16, 'Telegram Mini App · 390', 'safe area: header ~56px, MainButton ~80px · пометка «TMA»', tma=True),
    ])

# ---------- Иконки ----------
def icons():
    out = []
    for p in sorted(glob.glob(os.path.join(ROOT, 'icons', 'lucide', '*.svg'))):
        name = os.path.basename(p)[:-4]
        svg = open(p).read()
        svg = re.sub(r'<\?xml[^>]*\?>', '', svg)
        svg = re.sub(r'<!--[^>]*-->', '', svg).strip()
        svg = svg.replace('<svg', '<svg aria-hidden="true"', 1)
        out.append(f'<div class="icell">{svg}<span>{esc(name)}</span></div>')
    return '\n'.join(out)

# ---------- WCAG ----------
PAIRS = [
    ('text/primary на bg/primary', '#0F172A', '#FFFFFF', 'основной текст'),
    ('text/secondary на bg/primary', '#475569', '#FFFFFF', 'подписи'),
    ('text/secondary на bg/secondary', '#475569', '#F7F8FA', 'подписи на карточках'),
    ('text/tertiary на bg/primary', '#94A3B8', '#FFFFFF', '⚠ только disabled/placeholder'),
    ('белый на accent/primary', '#FFFFFF', '#2563EB', 'кнопка CTA'),
    ('белый на accent/primary-hover', '#FFFFFF', '#1D4ED8', 'hover CTA'),
    ('accent/primary на bg/primary', '#2563EB', '#FFFFFF', 'ссылки'),
    ('белый на semantic/success', '#FFFFFF', '#16A34A', 'крупный текст/UI'),
    ('белый на semantic/warning', '#FFFFFF', '#F59E0B', '✗ запрещено → тёмный текст'),
    ('text/primary на semantic/warning', '#0F172A', '#F59E0B', 'правильный вариант'),
    ('белый на semantic/error', '#FFFFFF', '#DC2626', 'кнопка ошибки'),
    ('белый на semantic/info', '#FFFFFF', '#0EA5E9', '✗ запрещено → тёмный текст'),
    ('text/primary на semantic/info', '#0F172A', '#0EA5E9', 'правильный вариант'),
    ('emotion/low на bg/primary', '#DC2626', '#FFFFFF', 'иконка + подпись'),
    ('emotion/high на bg/primary', '#16A34A', '#FFFFFF', 'иконка + подпись · крупный'),
    ('border/focus на bg/primary', '#2563EB', '#FFFFFF', 'фокус-обводка ≥3:1 ✓'),
    ('text/primary-dark на bg/primary-dark', '#F8FAFC', '#0B1220', 'тёмная тема'),
    ('text/secondary-dark на bg/primary-dark', '#CBD5E1', '#0B1220', 'тёмная тема'),
    ('text/secondary-dark на bg/secondary-dark', '#CBD5E1', '#111827', 'тёмная тема, карточки'),
    ('accent/primary на bg/primary-dark', '#2563EB', '#0B1220', 'ссылки в тёмной теме · UI'),
]
def contrast_table():
    rows = []
    for label, fg, bg, use in PAIRS:
        r = round(contrast(fg, bg), 2)
        cls, txt = verdict(r)
        rows.append(f'<tr><td>{esc(label)}</td><td class="mono">{fg} <span style="color:#94A3B8">на</span> {bg}</td>'
                    f'<td class="mono">{r:.2f}:1</td><td><span class="pill {cls}">{txt}</span></td>'
                    f'<td style="color:#475569;font-size:13px">{esc(use)}</td></tr>')
    return ('<table><thead><tr><th>Пара</th><th>Значения</th><th>Контраст</th><th>Вердикт</th><th>Использование</th></tr></thead>'
            '<tbody>' + '\n'.join(rows) + '</tbody></table>')

# ---------- Сборка ----------
doc = open(HTML).read()
repl = {
    '<!--PALETTE_LIGHT-->': palette_cards(LIGHT_FLAT, wrap_class='g4', idx=1),
    '<!--PALETTE_DARK-->': palette_cards(DARK_FLAT, wrap_class='g4', idx=2),
    '<!--TYPOGRAPHY-->': typo_rows(),
    '<!--SPACING-->': spacing_rows(),
    '<!--RADII-->': f'<div class="radiusGrid">{radii_boxes()}</div>',
    '<!--SHADOWS-->': f'<div class="shadowGrid">{shadow_cards()}</div>',
    '<!--GRIDS-->': grids(),
    '<!--ICONS-->': icons(),
    '<!--CONTRAST-->': contrast_table(),
}
for k, v in repl.items():
    if k not in doc:
        raise SystemExit(f'placeholder {k} not found')
    doc = doc.replace(k, v)
open(HTML, 'w').write(doc)
print('OK:', HTML, len(doc), 'bytes')
