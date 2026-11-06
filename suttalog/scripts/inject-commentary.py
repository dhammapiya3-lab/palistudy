"""뜻 깊이 이해하기(cmt) 넣기 — scripts/commentary/<과>.json → lesson-data-<과>.ts 의 teach 카드
각 항목: {"raw": 단계 번호, "word": 낱말(확인용), "cmt": [{"text": 해설, "src": "MA 1.247"}]}
  ("part": true 는 복합어를 이루는 낱말 카드용 — scripts/commentary 의 해설 문장 가운데 그 낱말을 풀이한 문장)
해설은 모두 VRI(6차 결집본) 주석서·복주석서(·청정도론)에 근거한 것만 적음.
실행: python3 scripts/inject-commentary.py"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
LESSONS = HERE.parent / 'src/features/lessons'
import re
def norm(w):
    return re.sub(r'[^a-zāīūṃṅñṭḍṇḷ]', '', w.split(' / ')[0].lower())
# 같은 과 안에서 같은 낱말(또는 원형 카드)이면 해설을 함께 보여 줌 — 문맥에 따라 뜻이 달라지는 낱말은 제외
NO_COPY = {'me', 'loke', 'ca', 'vā', 'va', 'pi', 'na', 'hi', 'so', 'sā', 'taṃ', 'te', 'yaṃ', 'yo', 'ye', 'idha', 'atthi', 'kāyo', 'evampi', 'rūpaṃ', 'bhūtā', 'cittaṃ', 'dukkho', 'dukkhā'}
def related(a, b):
    a, b = norm(a), norm(b)
    if not a or not b or a in NO_COPY or b in NO_COPY:
        return False
    if a == b:
        return True
    s, l = (a, b) if len(a) <= len(b) else (b, a)
    return len(s) >= 4 and l.startswith(s.rstrip('ṃ')) and len(l) - len(s) <= 4

SHARED = json.loads((HERE / 'commentary' / '_shared.json').read_text(encoding='utf-8'))
def nline(s):
    return ' '.join(re.sub(r'[^a-zāīūṃṅñṭḍṇḷ ]', ' ', s.lower()).split())
def dedupe(items):
    """한 카드 안에 같은 해설이 두 번 들어가지 않게 — 빠알리 괄호·띄어쓰기만 다른 것도 같은 것으로 보고 더 자세한 쪽을 남김"""
    def key(t):
        return re.sub(r'\s+', '', re.sub(r'\([^)]*\)', '', t))
    out = []
    for c in items:
        k = key(c['text'])
        same = next((x for x in out if key(x['text']) == k), None)
        if same is None:
            out.append(c)
        elif len(c['text']) > len(same['text']):
            out[out.index(same)] = c
    return out


def shared_for(o):
    w, line = norm(o['word']), nline(o.get('verseLine') or '')
    for e in SHARED:
        if norm(e['word']) == w and (not e['ctx'] or e['ctx'] in line):
            return e['cmt']
    return None

total = 0
for src in sorted(p for p in (HERE / 'commentary').glob('*.json') if not p.name.startswith('_')):
    lid = src.stem
    want = {e['raw']: e for e in json.loads(src.read_text(encoding='utf-8'))}
    explicit = {k: v for k, v in want.items() if not v.get('part')}  # 구성 낱말 카드 해설은 다른 카드로 옮기지 않음
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
        if not e:
            src_e = next((x for x in explicit.values() if related(x['word'], o['word'])), None)
            new = src_e['cmt'] if src_e else shared_for(o)
        if e and e['word'] != o['word']:
            raise SystemExit(f'{lid} raw {raw}: {e["word"]} ≠ {o["word"]}')
        if new:
            new = dedupe(new)
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
