#!/usr/bin/env python3
"""Собирает patterns/03-domain.html: инжектит иконки, радар и QR."""
import os, re, math

ROOT = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(ROOT, 'patterns', '03-domain.html')

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

# ---------- Радар ----------
SKILLS = [('Слушание', '#2563EB', 86), ('Эмпатия', '#7C3AED', 72), ('Границы', '#0891B2', 64),
          ('Эмоции', '#DB2777', 58), ('Структура', '#65A30D', 77), ('Сопротивл.', '#EA580C', 49),
          ('Вопросы', '#0EA5E9', 81), ('Рефлексия', '#9333EA', 68)]

def radar_svg():
    cx, cy, R = 140, 120, 88
    def pt(i, r):
        a = -math.pi / 2 + i * math.pi / 4
        return (round(cx + r * math.cos(a), 1), round(cy + r * math.sin(a), 1))
    parts = []
    for level in (0.25, 0.5, 0.75, 1.0):
        pts = ' '.join(f'{pt(i, R*level)[0]},{pt(i, R*level)[1]}' for i in range(8))
        fill = '#F8FAFC' if level == 1.0 else 'none'
        parts.append(f'<polygon points="{pts}" fill="{fill}" stroke="#E2E8F0" stroke-width="1"/>')
    for i in range(8):
        px, py = pt(i, R)
        parts.append(f'<line x1="{cx}" y1="{cy}" x2="{px}" y2="{py}" stroke="#E2E8F0" stroke-width="1"/>')
    data = ' '.join(f'{pt(i, R*s[2]/100)[0]},{pt(i, R*s[2]/100)[1]}' for i, s in enumerate(SKILLS))
    parts.append(f'<polygon points="{data}" fill="#2563EB" fill-opacity="0.18" stroke="#2563EB" stroke-width="2"/>')
    labels = []
    for i, (name, color, _) in enumerate(SKILLS):
        lx, ly = pt(i, R + 22)
        anchor = 'middle' if abs(math.cos(-math.pi/2 + i*math.pi/4)) < 0.1 else ('start' if math.cos(-math.pi/2 + i*math.pi/4) > 0 else 'end')
        dy = 4 if math.sin(-math.pi/2 + i*math.pi/4) >= 0 else -2
        labels.append(f'<text x="{lx}" y="{ly + dy}" text-anchor="{anchor}" font-size="11" font-weight="500" fill="#475569" font-family="Inter,sans-serif">{name}</text>')
    return (f'<svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">'
            + ''.join(parts) + ''.join(labels) + '</svg>')

# ---------- QR-плейсхолдер ----------
def qr_svg(px=64):
    n = 21; m = px / n
    cells = []
    def finder(fx, fy):
        for i in range(7):
            for j in range(7):
                edge = i in (0, 6) or j in (0, 6)
                core = 2 <= i <= 4 and 2 <= j <= 4
                if edge or core:
                    cells.append(f'<rect x="{(fx+j)*m:.1f}" y="{(fy+i)*m:.1f}" width="{m:.1f}" height="{m:.1f}" fill="#0F172A"/>')
    finder(0, 0); finder(n-7, 0); finder(0, n-7)
    for y in range(n):
        for x in range(n):
            in_finder = (x < 8 and y < 8) or (x > n-9 and y < 8) or (x < 8 and y > n-9)
            if in_finder:
                continue
            if (x*7 + y*13 + (x*y) % 5) % 3 == 0:
                cells.append(f'<rect x="{x*m:.1f}" y="{y*m:.1f}" width="{m:.1f}" height="{m:.1f}" fill="#0F172A"/>')
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 {px} {px}" fill="none" xmlns="http://www.w3.org/2000/svg">'
            '<rect width="64" height="64" fill="#FFFFFF"/>' + ''.join(cells) + '</svg>')

REPL = {
    # ScenarioCard / GameCard / Access
    '<!--I_CLOCK-->': icon('clock', 14, '#94A3B8'),
    '<!--I_LOCK-->': icon('lock', 16, '#94A3B8'),
    '<!--I_TIMER-->': icon('timer', 14, '#94A3B8'),
    '<!--I_USERS-->': icon('users', 14, '#94A3B8'),
    '<!--I_SEND-->': icon('send', 15, '#FFFFFF'),
    '<!--I_CAL-->': icon('calendar', 14, '#94A3B8'),
    '<!--I_KEY-->': icon('key-round', 14, '#94A3B8'),
    '<!--I_LINK-->': icon('link-2', 14, '#475569'),
    '<!--I_X_SM-->': icon('x', 14, '#DC2626'),
    '<!--I_CHECK_SM-->': icon('circle-check', 13, '#166534'),
    '<!--I_CLOCK_SM-->': icon('clock', 13, '#92400E'),
    # Bubbles / Emotion
    '<!--I_FROWN-->': icon('frown', 14, '#DC2626'),
    '<!--I_FROWN_L-->': icon('frown', 18, '#DC2626'),
    '<!--I_FROWN_R-->': icon('frown', 20, '#DC2626'),
    # Answers
    '<!--I_CHECK_OK-->': icon('circle-check', 14, '#16A34A'),
    '<!--I_X_BAD-->': icon('circle-x', 14, '#DC2626'),
    '<!--I_MSG-->': icon('message-circle', 15, '#2563EB'),
    '<!--I_OCT_W-->': icon('alert-octagon', 18, '#FFFFFF'),
    '<!--I_OCT_R-->': icon('alert-octagon', 20, '#DC2626'),
    # Consent / Code / Deep
    '<!--I_CHECK_W-->': icon('check', 14, '#FFFFFF'),
    '<!--I_COPY-->': icon('copy', 14, '#475569'),
    '<!--I_COPY_SM-->': icon('copy', 16, '#475569'),
    '<!--QR-->': qr_svg(64),
    # Misc
    '<!--I_INBOX-->': icon('inbox', 32, '#94A3B8'),
    '<!--I_USER_SM-->': icon('user', 14, '#475569'),
    '<!--I_BADGE-->': icon('badge-check', 14, '#166534'),
    '<!--I_X_CIRC-->': icon('circle-x', 14, '#991B1B'),
    '<!--I_FINGER-->': icon('fingerprint', 16, '#94A3B8'),
    '<!--I_PAUSE-->': icon('pause', 16, '#475569'),
    # TMA
    '<!--I_HOME-->': icon('home', 20, '#2563EB'),
    '<!--I_BOOK-->': icon('book-open', 20, '#94A3B8'),
    '<!--I_SPARK-->': icon('sparkles', 20, '#94A3B8'),
    '<!--I_CHART-->': icon('chart-column', 20, '#94A3B8'),
    '<!--I_USER-->': icon('user', 20, '#94A3B8'),
    '<!--RADAR-->': radar_svg(),
}

doc = open(HTML).read()
for k, v in REPL.items():
    if k not in doc:
        raise SystemExit(f'placeholder {k} not found')
    doc = doc.replace(k, v)
open(HTML, 'w').write(doc)
print('OK:', HTML, len(doc), 'bytes')
