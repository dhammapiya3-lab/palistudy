"""복합어·연성 낱말 카드에 '이루는 낱말'(parts) 넣기
사용: cd suttalog && npx tsx /tmp/dump.mts > /tmp/lessons.json && python3 scripts/gen-parts.py /tmp/lessons.json [--write]
- baseForm(없으면 formNote)의 'a(뜻) + b(뜻)' 꼴을 나누어 낱말·뜻을 뽑음
- 뜻이 없는 부분은 낱말 색인(gloss-index.generated.ts)·접두사 사전(PREFIX)·보충 사전(PARTS_EXTRA)에서 찾음
- 어근(√), 접미사(-ika 등)는 빼고, 낱말이 둘 이상일 때만 넣음
--write 없이 실행하면 뜻을 못 찾은 부분만 보여 줌"""
import json, re, sys, unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
LESSONS = HERE.parent / 'src/features/lessons'

PREFIX = {
    'a': '아님, ~없는', 'an': '아님, ~없는', 'na': '아니다, ~않다', 'su': '잘, 좋은', 'du': '나쁜, 어려운',
    'saṃ': '함께, 완전히', 'sam': '함께, 완전히', 'vi': '떨어져, 나누어', 'pa': '앞으로, 분명히', 'ā': '이쪽으로, ~까지',
    'upa': '가까이', 'abhi': '향하여, 뛰어나게', 'anu': '따라', 'ni': '아래로, 안으로', 'nir': '밖으로, 없이',
    'pari': '두루, 완전히', 'pati': '거슬러, 다시', 'paṭi': '거슬러, 다시', 'ud': '위로', 'o': '아래로', 'ava': '아래로',
    'adhi': '위에, 넘어', 'ati': '넘어, 지나치게', 'api': '~도', 'pi': '~도', 'ca': '그리고', 'eva': '바로, 오직',
    'va': '바로, ~처럼', 'vā': '또는', 'iti': '~라고', 'ti': '~라고', 'hi': '실로', 'kho': '실로', 'pana': '그런데, 한편',
    'idha': '여기에', 'idāni': '이제', 'atthi': '있다', 'natthi': '없다', 'me': '나의, 나에게', 'te': '그들, 너에게',
    'so': '그는', 'sa': '그는', 'eso': '이것은', 'esa': '이것은', 'ayaṃ': '이것은', 'idaṃ': '이것', 'etaṃ': '이것',
    'imaṃ': '이것을', 'yaṃ': '~인 것', 'yad': '~인 것', 'yo': '~하는 이는', 'ye': '~하는 이들은', 'taṃ': '그것을',
    'ahaṃ': '나는', 'asmi': '나는 ~이다', 'mama': '나의', 'sammā': '바르게, 바른', 'micchā': '그릇되게, 그릇된',
    'mahā': '큰', 'sabba': '모든', 'eka': '하나', 'dvi': '둘', 'ti_num': '셋', 'catu': '넷', 'pañca': '다섯',
    'cha': '여섯', 'satta': '일곱', 'aṭṭha': '여덟', 'nava': '아홉', 'dasa': '열',
}
SKIP_SUFFIX = re.compile(r'^-|^√|^\(|^\[')


def norm(s):
    s = unicodedata.normalize('NFC', s).lower()
    return re.sub(r"[^\w]", '', s)


def load_gloss():
    src = (LESSONS / 'gloss-index.generated.ts').read_text(encoding='utf-8')
    rows = json.loads(src[src.index('= ') + 2:])
    g = {}
    for w, p, m, gr in rows:
        g.setdefault(norm(w), m)
    return g


def stem_index(data):
    """낱말 카드의 원형(baseForm)이 한 낱말이면 그 원형 → 뜻 (조사 떼어 낸 뜻)"""
    idx = {}
    for st in data.values():
        for s in (st if isinstance(st, list) else st.get('steps', [])):
            if s.get('type') != 'teach':
                continue
            b = (s.get('baseForm') or '').strip()
            m = re.match(r"^([A-Za-zāīūṃṅñṭḍṇḷ]+)\s*(?:\(([^()]*)\))?$", b)
            if m:
                mean = m.group(2) if m.group(2) and re.search('[가-힣]', m.group(2)) else s.get('meaning', '')
                idx.setdefault(norm(m.group(1)), mean)
    return idx


def variants(k):
    out = [k]
    for end in ('ṃ', 'o', 'ā', 'aṃ', 'e', 'ī', 'ū', 'ti', 'āni', 'ena'):
        out.append(k + end)
    if k.endswith('in'): out += [k[:-2] + 'ī']
    if k.endswith('a'): out += [k[:-1] + 'o', k[:-1] + 'aṃ', k[:-1] + 'ā']
    return out


def load_extra():
    p = LESSONS / 'parts-extra.json'
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}


def split_parts(text):
    """'pāṇa(생명) + atipāta(해침)' → [('pāṇa','생명'), ('atipāta','해침')]"""
    if not text or '+' not in text:
        return None
    line = next((l for l in text.split('\n') if '+' in l), '')
    line = re.split(r'\s[=→]\s|\s→|→', line)[0]           # '=' / '→' 앞까지만
    line = re.sub(r'^[^+]*?:\s*', '', line) if ':' in line.split('+')[0] else line
    out = []
    for raw in line.split('+'):
        raw = raw.strip().strip('"“”').strip()
        if not raw:
            continue
        m = re.match(r"^([A-Za-zāīūṃṅñṭḍṇḷĀĪŪṬḌṆṄÑḶṂ'’()\-√]+?)\s*(?:\(([^()]*)\))?\s*(?:\(([^()]*)\))?$", raw)
        if not m:
            m2 = re.match(r"^([A-Za-zāīūṃṅñṭḍṇḷĀĪŪṬḌṆṄÑḶṂ\-√]+)\s+(.*)$", raw)
            if m2 and re.search('[가-힣]', m2.group(2)):
                out.append((m2.group(1), m2.group(2).strip('() ')))
                continue
            return None
        w = m.group(1).strip('()')
        mean = m.group(2) if m.group(2) and re.search('[가-힣]', m.group(2) or '') else (m.group(3) if m.group(3) and re.search('[가-힣]', m.group(3)) else None)
        out.append((w, mean))
    return out


def build(data, gloss, extra):
    stems = stem_index(data)
    parts_by = {}   # (lesson, raw) -> parts
    missing = {}
    for lid, st in data.items():
        steps = st if isinstance(st, list) else st.get('steps', [])
        for raw, s in enumerate(steps):
            if s.get('type') != 'teach':
                continue
            if re.search(r'[\s·]', s.get('word', '')):
                continue
            cand = split_parts(s.get('baseForm')) or split_parts(s.get('formNote'))
            if not cand:
                continue
            res = []
            for w, mean in cand:
                if SKIP_SUFFIX.match(w) or '√' in w or len(norm(w)) == 0:
                    continue
                k = norm(w)
                mean = mean or extra.get(w) or extra.get(k) or stems.get(k) or PREFIX.get(k) or PREFIX.get(w) \
                    or next((gloss[v] for v in variants(k) if v in gloss), None) or next((stems[v] for v in variants(k) if v in stems), None)
                if mean:
                    mean = re.sub(r'(?<=[가-힣])(을|를)$', '', mean.strip())
                if not mean:
                    missing.setdefault(w, []).append(f'{lid}:{s["word"]}')
                res.append({'w': re.sub(r'[()]', '', w), 'm': mean or ''})
            if len(res) >= 2 and norm(''.join(p['w'] for p in res)) != norm(s['word']) or len(res) >= 2:
                res = [p for p in res if p['m']]
                if len(res) >= 2:
                    parts_by[(lid, raw)] = res
    return parts_by, missing


def write(data, parts_by):
    n = 0
    for f in LESSONS.glob('lesson-data-*.ts'):
        lid = f.stem.replace('lesson-data-', '')
        if lid not in data:
            continue
        lines = f.read_text(encoding='utf-8').split('\n')
        raw = -1
        for i, ln in enumerate(lines):
            st = ln.strip()
            body = st.rstrip(',')
            if not body.startswith('{"type"'):
                continue
            raw += 1
            o = json.loads(body)
            p = parts_by.get((lid, raw))
            if o.get('type') == 'teach' and p:
                p = [x for x in p if x['m']]
                if o.get('parts') != p:
                    o['parts'] = p
                    lines[i] = ln[:len(ln) - len(ln.lstrip())] + json.dumps(o, ensure_ascii=False) + st[len(body):]
                    n += 1
        f.write_text('\n'.join(lines), encoding='utf-8')
    return n


if __name__ == '__main__':
    data = json.load(open(sys.argv[1]))
    parts_by, missing = build(data, load_gloss(), load_extra())
    print('cards with parts', len(parts_by))
    if '--write' in sys.argv:
        print('written', write(data, parts_by))
    else:
        print('missing meanings', len(missing))
        for w, where in sorted(missing.items(), key=lambda x: -len(x[1])):
            print(w, len(where), where[:2])
