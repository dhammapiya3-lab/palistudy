"""낱말 카드 순서 맞추기 — 같은 경전 문장(verseLine)을 이어서 배우는 teach 카드들을 문장 속 위치 순서로 정렬.
위치를 못 찾는 카드(원형 등)는 바로 앞 카드에 붙어 함께 움직임. 같은 위치(복합어 → 부분)는 원래 순서 유지.
SKIP: 의도적으로 '복합어 → 이루는 낱말' 순서로 둔 구간(과, 첫 raw).
뜻 깊이 이해하기(scripts/commentary/*.json)의 raw 번호도 함께 고침.
실행: python3 scripts/order-teach.py [--write]"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
LESSONS = HERE.parent / 'src/features/lessons'
SKIP_WORDS = {('ratana', 'Yānīdha'), ('ratana', 'buddhaseṭṭho'), ('ratana', 'Khīṇaṃ purāṇaṃ'), ('ratana', 'Sahāvassa'), ('ratana', 'so')}  # 일부러 '복합어 → 이루는 낱말' 순서로 두거나 손으로 맞춘 구간(첫 카드 낱말)
MANUAL: dict = {  # (과, 구간 첫 raw): 새 순서(원래 raw 목록) — 한 번 적용한 뒤에는 SKIP으로 옮길 것
}

def toks(s):
    return re.sub(r'[^a-zāīūṃṅñṭḍṇḷ ]', ' ', s.lower().replace('-', '').replace('’', '').replace('‘', '')).split()

def find(line, form, occ):
    L, F = toks(line) if isinstance(line, str) else line, toks(form)
    if not F:
        return -1
    hits = [i for i in range(len(L) - len(F) + 1) if L[i:i + len(F)] == F]
    bump = 0
    if not hits:  # 연성: 앞부분(yanta-)이거나, 앞 낱말 끝에 붙은 경우(yanta+santaṃ)
        hits = [i for i in range(len(L) - len(F) + 1) if L[i].startswith(F[0]) and L[i + 1:i + len(F)] == F[1:]]
        bump = 0.3
    if not hits and (len(F) > 1 or len(F[0]) >= 4):
        hits = [i for i in range(len(L) - len(F) + 1) if L[i].endswith(F[0]) and L[i + 1:i + len(F)] == F[1:]]
        bump = 0.6
    return (hits[occ - 1] if len(hits) >= occ else hits[0]) + bump if hits else -1

def sub_at(T, L):
    """T(토큰 목록) 안에서 L(토큰 목록)이 처음 나오는 자리"""
    for i in range(len(T) - len(L) + 1):
        if T[i:i + len(L)] == L:
            return i
    return -1

def pos_of(o, target=None):
    f = o.get('formInVerse') or o['word']
    f = f[0] if isinstance(f, list) else f
    p = find(o['verseLine'], f.split(' / ')[0].split('·')[0], o.get('occurrence', 1))
    if target is None or p < 0:
        return p
    off = sub_at(target, toks(o['verseLine']))
    return -1 if off < 0 else off + p

write = '--write' in sys.argv
total = 0
for f in sorted(LESSONS.glob('lesson-data-*.ts')):
    lid = f.stem.replace('lesson-data-', '')
    lines = f.read_text(encoding='utf-8').split('\n')
    steps = []  # (line_idx, obj)
    for i, ln in enumerate(lines):
        body = ln.strip().rstrip(',')
        if body.startswith('{"type"'):
            steps.append((i, json.loads(body)))
    perm = list(range(len(steps)))  # new raw -> old raw
    k = 0
    while k < len(steps):
        o = steps[k][1]
        if o['type'] != 'teach' or not o.get('verseLine'):
            k += 1; continue
        j = k
        while j + 1 < len(steps) and steps[j + 1][1]['type'] == 'teach' and steps[j + 1][1].get('verseLine'):
            j += 1
        run = list(range(k, j + 1))
        nxt = next((steps[x][1] for x in range(j + 1, len(steps)) if steps[x][1]['type'] == 'verse'), None)
        target = toks(nxt['pali']) if nxt else None
        if (lid, k) in MANUAL:
            new = MANUAL[(lid, k)]
            assert sorted(new) == run, (lid, k)
        elif (lid, steps[k][1]['word']) in SKIP_WORDS or len(run) < 2:
            new = run
        else:
            ps = {r: pos_of(steps[r][1], target) for r in run}
            if target is not None and sum(p >= 0 for p in ps.values()) < len(run) / 2:
                ps = {r: pos_of(steps[r][1]) for r in run}   # 다음 구절에 없으면 같은 문장끼리만
                same = len({steps[r][1]['verseLine'] for r in run}) == 1
                if not same:
                    k = j + 1; continue
            groups = []
            for r in run:
                p = ps[r]
                if p < 0 and groups:
                    groups[-1][1].append(r)
                else:
                    groups.append([p, [r]])
            groups.sort(key=lambda g: g[0])  # 안정 정렬
            new = [r for g in groups for r in g[1]]
        if new != run:
            total += 1
            print(lid, k, ' '.join(steps[r][1]['word'] for r in new)[:200])
            for a, r in zip(run, new):
                perm[a] = r
        k = j + 1
    if write and perm != list(range(len(steps))):
        texts = [lines[i] for i, _ in steps]
        for newraw, oldraw in enumerate(perm):
            ind = lines[steps[newraw][0]]
            lines[steps[newraw][0]] = texts[oldraw].rstrip(',') + (',' if ind.rstrip().endswith(',') else '')
        f.write_text('\n'.join(lines), encoding='utf-8')
        cf = HERE / 'commentary' / f'{lid}.json'
        if cf.exists():
            inv = {old: new for new, old in enumerate(perm)}
            data = json.loads(cf.read_text(encoding='utf-8'))
            for e in data:
                e['raw'] = inv[e['raw']]
            data.sort(key=lambda e: e['raw'])
            cf.write_text('[\n' + ',\n'.join(json.dumps(e, ensure_ascii=False) for e in data) + '\n]\n', encoding='utf-8')
print('바뀐 구간', total)
