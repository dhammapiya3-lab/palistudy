"""복합어·구(句) 카드 뒤에 그것을 이루는 낱말을 독립된 낱말 카드로 넣기 (한 번 실행용, 다시 실행해도 중복 없음)
- 부분 낱말: 원형(baseForm)/형태 설명의 'a(뜻) + b(뜻)', 또는 띄어 쓴 구의 각 낱말
- 같은 과에 이미 카드가 있는 낱말, 접두사·접미사 조각은 넣지 않음
- 뜻 깊이 이해하기(scripts/commentary)의 raw 번호도 함께 고침
실행: python3 scripts/add-part-cards.py /tmp/parts_all.json"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
LESSONS = HERE.parent / 'src/features/lessons'
sys.path.insert(0, str(HERE.parent.parent / 'scripts'))
from pali_hangul import to_hangul

parts_all = json.load(open(sys.argv[1]))
MARK = '이루는 낱말'
SKIP = {'a', 'an', 'du', 'saṃ', 'sam', 'upa', 'pa', 'vi', 'ni', 'nis', 'nir', 'ā', 'abhi', 'adhi', 'anu', 'apa', 'ava', 'o', 'ud', 'u', 'pari', 'paṭi', 'pati', 'ci', 'to', 'h'}  # 접두사·접미 조각만 제외 (ca·pi·eva 같은 불변화사도 낱말로 넣음)
def norm(w): return re.sub(r'[^a-zāīūṃṅñṭḍṇḷ]', '', w.lower())

total = 0
for f in sorted(LESSONS.glob('lesson-data-*.ts')):
    lid = f.stem.replace('lesson-data-', '')
    lines = f.read_text(encoding='utf-8').split('\n')
    steps = [(i, json.loads(l.strip().rstrip(','))) for i, l in enumerate(lines) if l.strip().startswith('{"type"')]
    def keys(o):
        ks = {norm(o['word'])}
        b = (o.get('baseForm') or '').split('(')[0].split('<')[0].strip()
        if b and ' ' not in b and '+' not in b: ks.add(norm(b))
        return ks
    seg_known = set()
    out = list(lines); inserts = {}  # line index -> new lines after
    remap = {}; newraw = 0; add = 0
    for raw, (li, o) in enumerate(steps):
        remap[raw] = newraw; newraw += 1
        if o['type'] == 'verse':
            seg_known = set()
        if o['type'] != 'teach':
            continue
        seg_known |= keys(o)
        if o.get('label', '').startswith(MARK):
            continue
        parts = parts_all.get(f'{lid}|{raw}') or []
        # 바로 뒤에 이미 붙어 있는 구성 낱말 카드, 그리고 곧 이어 나올(8장 안) 낱말 카드
        j = raw + 1; tail_li = li
        while j < len(steps) and steps[j][1].get('label', '').startswith(MARK):
            tail_li = steps[j][0]; j += 1
        # 바로 앞뒤 3장 안에 같은 낱말 카드가 있으면 건너뜀 (그 밖에는 복합어마다 빠짐없이 넣음)
        near = set()
        for x in list(range(max(0, raw - 3), raw)) + list(range(j, min(len(steps), j + 3))):
            if steps[x][1]['type'] == 'teach': near |= keys(steps[x][1])
        for x in range(raw + 1, j): near |= keys(steps[x][1])
        known = near
        new = []
        for p in parts:
            w = re.sub(r'^-|-$', '', p['w']).strip()
            k = norm(w)
            m = p.get('m') or ''
            if not k or k in SKIP or k in known or not m:
                continue
            if re.match(r'^(ññ|tt|kk|pp|cc|bb|dd|gg|jj|ll|mm|nn|ss|ṭṭ|ḍḍ|tv)', w) or re.search(r'접미사|접두사|분사|어미|격 |소유격|목적격', m):
                continue   # 조각·문법 설명뿐인 것은 낱말 카드로 만들지 않음
            m = m.replace('/', ', ')
            if re.search(r'[aiu]$', w):   # 원형(어간)이면 격조사 뗀 뜻으로
                m = ', '.join(re.sub(r'(을 위해|를 위해|에서|으로|을|를|에게)$', '', x.strip()) if len(re.sub(r'[^가-힣]', '', x)) >= 3 else x.strip() for x in m.split(','))
            p = dict(p, m=m)
            known.add(k)
            card = {'type': 'teach', 'icon': '🧩', 'word': w, 'pronKo': to_hangul(w), 'meaning': p['m'],
                    'grammar': '구성 낱말', 'label': f'{MARK} · {o["word"]}', 'verseLine': o.get('verseLine', ''),
                    'verseLineKo': o.get('verseLineKo', ''), 'formInVerse': o.get('formInVerse') or o['word'], 'audio': True}
            if o.get('occurrence'): card['occurrence'] = o['occurrence']
            if not card['verseLine']: del card['verseLine']; del card['verseLineKo']; del card['formInVerse']
            new.append(card)
        if new:
            ind = lines[li][:len(lines[li]) - len(lines[li].lstrip())]
            li = tail_li
            inserts[li] = [ind + json.dumps(c, ensure_ascii=False) + ',' for c in new]
            newraw += len(new); add += len(new)
    if not add:
        continue
    res = []
    for i, l in enumerate(lines):
        if i in inserts and not l.rstrip().endswith(','):
            l = l.rstrip() + ','
            inserts[i][-1] = inserts[i][-1].rstrip(',')
        res.append(l)
        if i in inserts: res.extend(inserts[i])
    f.write_text('\n'.join(res), encoding='utf-8')
    cf = HERE / 'commentary' / f'{lid}.json'
    if cf.exists():
        data = json.loads(cf.read_text(encoding='utf-8'))
        for e in data: e['raw'] = remap[e['raw']]
        cf.write_text('[\n' + ',\n'.join(json.dumps(e, ensure_ascii=False) for e in data) + '\n]\n', encoding='utf-8')
    print(lid, add); total += add
print('합계', total)
