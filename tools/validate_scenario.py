#!/usr/bin/env python3
"""Валидатор сценариев Platform (schema + графовый линтер).

Использование:
    python3 tools/validate_scenario.py scenarios/*.json

Проверяет:
  1. JSON Schema (draft 2020-12, schemas/scenario.schema.json)
  2. Граф: все next/then/else существуют; все узлы достижимы от start;
     достижим хотя бы один end; id вариантов уникальны в узле;
     условия branch ссылаются на существующие варианты; в каждом choice/critical
     есть хотя бы один вариант с неотрицательной суммой очков;
     непустые scores только у focusSkills получают бонус (инфо).
Код выхода: 0 — ок, 1 — ошибки.
"""
import json, sys, os, re

try:
    import jsonschema
except ImportError:
    print('Нужен пакет jsonschema: pip install jsonschema')
    sys.exit(2)

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA = os.path.join(HERE, '..', 'schemas', 'scenario.schema.json')

def targets_of(node):
    """Все узлы-цели из узла (без условий)."""
    t, out = node['type'], []
    if t in ('card', 'text', 'scale', 'timer', 'input'):
        out.append(node['next'])
    elif t in ('choice', 'critical'):
        out += [o['next'] for o in node['options']]
    elif t == 'branch':
        out += [b['then'] for b in node['branches']] + [node['else']]
    return out

def option_ids(node):
    return {o['id'] for o in node.get('options', [])}

def best_score(options):
    return max((sum(o.get('scores', {}).values()) for o in options), default=0)

def validate(path):
    errors, warns, infos = [], [], []
    data = json.load(open(path, encoding='utf-8'))
    schema = json.load(open(SCHEMA, encoding='utf-8'))
    v = jsonschema.Draft202012Validator(schema)
    for e in v.iter_errors(data):
        errors.append(f'schema: {".".join(str(p) for p in e.absolute_path) or "<root>"}: {e.message}')

    g = data.get('graph', {})
    nodes = g.get('nodes', {})
    start = g.get('start', '')
    if not errors:
        # ссылки на узлы
        for nid, node in nodes.items():
            for tgt in targets_of(node):
                if tgt not in nodes:
                    errors.append(f'узел «{nid}»: ссылка на несуществующий узел «{tgt}»')
        # достижимость
        seen, stack = set(), [start]
        while stack:
            n = stack.pop()
            if n in seen or n not in nodes:
                continue
            seen.add(n)
            stack += [t for t in targets_of(nodes[n]) if t in nodes]
        if start not in nodes:
            errors.append(f'start «{start}» не найден')
        unreachable = set(nodes) - seen
        if unreachable:
            warns.append(f'недостижимые узлы: {", ".join(sorted(unreachable))}')
        ends = [n for n, nd in nodes.items() if nd['type'] == 'end']
        if not (seen & set(ends)):
            errors.append('от start не достижим ни один end')
        # критический узел должен вести и на end_early-сценарий (опция ошибки) — рекомендация
        for nid, node in nodes.items():
            if node['type'] in ('choice', 'critical'):
                opts = option_ids(node)
                if len(opts) != len(node['options']):
                    errors.append(f'«{nid}»: дубли id вариантов')
                if node['type'] == 'choice' and len(node['options']) < 2:
                    errors.append(f'«{nid}»: меньше 2 вариантов')
                if best_score(node['options']) <= 0:
                    errors.append(f'«{nid}»: нет ни одного варианта с положительной суммой очков')
            if node['type'] == 'critical':
                if not any(o['next'] in ends and not nodes[o['next']]['outcome']['completed'] for o in node['options']):
                    warns.append(f'«{nid}»: критический узел без варианта «сессия прервана» (рекомендуется)')
            if node['type'] == 'branch':
                for b in node['branches']:
                    ref = b['when'].get('optionSelected')
                    if ref:
                        pn, po = ref.split('.')
                        if pn not in nodes or po not in option_ids(nodes.get(pn, {})):
                            errors.append(f'«{nid}»: optionSelected «{ref}» не найден')
        # фокус-навыки в очках
        focus = data['meta']['focusSkills']
        scored = set()
        for node in nodes.values():
            for o in node.get('options', []):
                scored |= set(o.get('scores', {}))
            if 'scores' in node:
                scored |= set(node['scores'])
        missing = [s for s in focus if s not in scored]
        if missing:
            warns.append(f'focusSkills без очков ни в одном узле: {", ".join(missing)}')
        infos.append(f'узлов: {len(nodes)}, вариантов: {sum(len(option_ids(n)) for n in nodes.values())}, '
                     f'эмоций: {sum(1 for n in nodes.values() if "emotionAfter" in n)}')
    return errors, warns, infos

def main(paths):
    failed = False
    for p in paths:
        print(f'— {p}')
        try:
            errors, warns, infos = validate(p)
        except json.JSONDecodeError as e:
            print(f'  × JSON: {e}'); failed = True; continue
        for i in infos: print(f'  · {i}')
        for w in warns: print(f'  ⚠ {w}')
        for e in errors: print(f'  × {e}')
        print('  ✓ валиден' if not errors else '  ✗ НЕВАЛИДЕН')
        failed |= bool(errors)
    sys.exit(1 if failed else 0)

if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        print(__doc__); sys.exit(2)
    main(args)
