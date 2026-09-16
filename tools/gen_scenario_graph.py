#!/usr/bin/env python3
"""Генерирует SVG-схему графа сценария (для методиста и спек).
Использование: python3 tools/gen_scenario_graph.py scenarios/exam-anxiety.json [out.svg]"""
import json, sys, os
from collections import defaultdict

def esc(s):
    return (s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;'))

TYPE_COLOR = {
    'card': ('#64748B', 'карточка'), 'text': ('#2563EB', 'реплика'),
    'choice': ('#7C3AED', 'выбор'), 'scale': ('#0EA5E9', 'шкала'),
    'timer': ('#F59E0B', 'таймер'), 'input': ('#16A34A', 'ввод'),
    'critical': ('#DC2626', 'критический'), 'branch': ('#DB2777', 'ветвление'),
    'end': ('#334155', 'конец'),
}

def label_of(nid, node):
    t = node['type']
    if t in ('text', 'choice', 'critical'):
        s = node.get('clientLine', '')
    elif t == 'card':
        s = node.get('title', '')
    elif t == 'end':
        s = 'сессия завершена' if node['outcome'].get('completed', True) else 'сессия прервана'
    elif t == 'branch':
        conds = []
        for b in node['branches']:
            w = b['when']
            if 'emotionAtLeast' in w:
                conds.append(f'эмоция ≥ {w["emotionAtLeast"]} → {b["then"]}')
            elif 'optionSelected' in w:
                conds.append(f'выбран {w["optionSelected"]} → {b["then"]}')
            elif 'skillTotalAtLeast' in w:
                conds.append(f'очки ≥ {w["skillTotalAtLeast"]} → {b["then"]}')
        s = 'если ' + '; '.join(conds) + f' · иначе → {node["else"]}'
    else:
        s = node.get('prompt', '')
    return (s[:34] + '…') if len(s) > 36 else s

def main(src, out=None):
    data = json.load(open(src, encoding='utf-8'))
    g = data['graph']
    nodes = g['nodes']
    # глубина BFS
    depth = {g['start']: 0}
    queue = [g['start']]
    while queue:
        n = queue.pop(0)
        node = nodes.get(n)
        if not node:
            continue
        tgts = []
        if node['type'] in ('card', 'text', 'scale', 'timer', 'input'):
            tgts = [node['next']]
        elif node['type'] in ('choice', 'critical'):
            tgts = [o['next'] for o in node['options']]
        elif node['type'] == 'branch':
            tgts = [b['then'] for b in node['branches']] + [node['else']]
        for t in tgts:
            if t in nodes and t not in depth:
                depth[t] = depth[n] + 1
                queue.append(t)
    columns = defaultdict(list)
    for n, dp in depth.items():
        columns[dp].append(n)
    for dp in columns:
        columns[dp].sort()
    NW, NH, GAPX, GAPY = 250, 78, 110, 26
    maxcol = max(columns)
    W = 80 + (maxcol + 1) * (NW + GAPX)
    H = 100 + max(len(v) for v in columns.values()) * (NH + GAPY)
    pos = {}
    for dp in sorted(columns):
        for i, nid in enumerate(columns[dp]):
            pos[nid] = (40 + dp * (NW + GAPX), 60 + i * (NH + GAPY))
    edges = []
    for nid, node in nodes.items():
        if nid not in pos:
            continue
        t = node['type']
        if t in ('card', 'text', 'scale', 'timer', 'input'):
            edges.append((nid, node['next'], ''))
        elif t in ('choice', 'critical'):
            for o in node['options']:
                edges.append((nid, o['next'], str(round(sum(o.get('scores', {}).values())))))
        elif t == 'branch':
            for b in node['branches']:
                edges.append((nid, b['then'], 'то'))
            edges.append((nid, node['else'], 'иначе'))
    P = []
    P.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Inter,Segoe UI,sans-serif">')
    P.append(f'''<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#94A3B8"/></marker></defs>''')
    P.append(f'<rect width="{W}" height="{H}" fill="#F7F8FA"/>')
    txt_top = f'Сценарий «{esc(data["meta"]["title"])}» · граф {data["schemaVersion"]} · {len(nodes)} узлов, ветвления: вариант → узел и по состоянию'
    P.append(f'<text x="40" y="36" font-size="20" font-weight="700" fill="#0F172A">{txt_top}</text>')
    for a, b, lbl in edges:
        if a not in pos or b not in pos:
            continue
        x1, y1 = pos[a][0] + NW, pos[a][1] + NH / 2
        x2, y2 = pos[b][0], pos[b][1] + NH / 2
        if x2 < x1:  # обратное ребро — ниже
            y1 = pos[a][1] + NH
            y2 = pos[b][1] + NH
            my = max(y1, y2) + 34
            P.append(f'<path d="M{x1} {y1} C{x1} {my} {x2} {my} {x2} {y2}" fill="none" stroke="#CBD5E1" stroke-width="2" marker-end="url(#a)"/>')
        else:
            mx = (x1 + x2) / 2
            P.append(f'<path d="M{x1} {y1} C{mx} {y1} {mx} {y2} {x2} {y2}" fill="none" stroke="#94A3B8" stroke-width="2" marker-end="url(#a)"/>')
        if lbl:
            P.append(f'<text x="{(x1+x2)/2:.0f}" y="{(y1+y2)/2 - 6:.0f}" font-size="12" fill="#64748B" text-anchor="middle">{esc(lbl)}</text>')
    for nid, (x, y) in pos.items():
        node = nodes[nid]
        color, tname = TYPE_COLOR[node['type']]
        P.append(f'<rect x="{x}" y="{y}" rx="12" width="{NW}" height="{NH}" fill="#FFFFFF" stroke="{color}" stroke-width="2"/>')
        P.append(f'<rect x="{x}" y="{y}" rx="12" width="8" height="{NH}" fill="{color}"/>')
        P.append(f'<text x="{x+20}" y="{y+22}" font-size="12.5" font-weight="700" fill="#0F172A">{esc(nid)}</text>'
                 f'<text x="{x+NW-12}" y="{y+22}" font-size="11" font-weight="600" fill="{color}" text-anchor="end">{tname}</text>')
        lab = esc(label_of(nid, node))
        P.append(f'<text x="{x+20}" y="{y+44}" font-size="11.5" fill="#475569">{lab}</text>')
        emo = node.get('emotionAfter')
        if node['type'] != 'branch' and emo:
            s = f"{emo['label']} · {emo['value']}/10"
            P.append(f'<text x="{x+20}" y="{y+63}" font-size="10.5" fill="#94A3B8">{esc(s)}</text>')
        if node['type'] == 'critical':
            P.append(f'<circle cx="{x+NW-16}" cy="{y+NH-14}" r="5" fill="#DC2626"/>')
    P.append('</svg>')
    out = out or os.path.splitext(src)[0] + '.graph.svg'
    open(out, 'w', encoding='utf-8').write('\n'.join(P))
    print('OK:', out, os.path.getsize(out), 'байт,', len(pos), 'узлов на графе')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
