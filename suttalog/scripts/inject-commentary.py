"""뜻 깊이 이해하기(cmt) 넣기 — scripts/commentary/<과>.json → lesson-data-<과>.ts 의 teach 카드
각 항목: {"raw": 단계 번호, "word": 낱말(확인용), "cmt": [{"text": 해설, "src": "MA 1.247"}]}
해설은 모두 VRI(6차 결집본) 주석서·복주석서(·청정도론)에 근거한 것만 적음.
실행: python3 scripts/inject-commentary.py"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
LESSONS = HERE.parent / 'src/features/lessons'
total = 0
for src in sorted((HERE / 'commentary').glob('*.json')):
    lid = src.stem
    want = {e['raw']: e for e in json.loads(src.read_text(encoding='utf-8'))}
    f = LESSONS / f'lesson-data-{lid}.ts'
    lines = f.read_text(encoding='utf-8').split('\n')
    raw = -1; n = 0
    for i, ln in enumerate(lines):
        st = ln.strip(); body = st.rstrip(',')
        if not body.startswith('{"type"'):
            continue
        raw += 1
        o = json.loads(body)
        if o.get('type') != 'teach':
            continue
        e = want.pop(raw, None)
        new = e['cmt'] if e else None
        if e and e['word'] != o['word']:
            raise SystemExit(f'{lid} raw {raw}: {e["word"]} ≠ {o["word"]}')
        if o.get('cmt') != new:
            if new: o['cmt'] = new
            else: o.pop('cmt', None)
            lines[i] = ln[:len(ln) - len(ln.lstrip())] + json.dumps(o, ensure_ascii=False) + st[len(body):]
        if new: n += 1
    if want:
        raise SystemExit(f'{lid}: 못 찾은 항목 {list(want)}')
    f.write_text('\n'.join(lines), encoding='utf-8')
    print(lid, n); total += n
print('합계', total)
