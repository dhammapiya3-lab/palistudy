"""경전으로 배우기 — 수업 데이터 재생성

python3 build_lessons.py report   → 단어 학습이 빠진 형태 목록(gloss 필요) 출력
python3 build_lessons.py write    → src/features/lessons/lesson-data-*.ts 다시 씀
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from pali_hangul import to_hangul  # noqa: E402

APP = HERE.parent / 'suttalog' / 'src' / 'features' / 'lessons'
OLD = json.load(open('/home/claude/vri/lessons.json'))


def _apply_spelling(old):
    f = HERE / 'spelling_fixes.json'
    fixes = json.load(open(f)) if f.exists() else {}
    for k, pairs in fixes.items():
        if k.startswith('_') or k not in old:
            continue
        for st in old[k]:
            for a, b in pairs:
                if a.startswith('@word:'):
                    if st.get('word') == a[6:]:
                        st['word'] = b
                        st['_repron'] = True
                    continue
                for fld, v in list(st.items()):
                    if isinstance(v, str) and a in v:
                        st[fld] = v.replace(a, b)
                        if fld in ('pali', 'word'):
                            st['_repron'] = True
                    elif isinstance(v, list):
                        nv = [x.replace(a, b) if isinstance(x, str) else x for x in v]
                        if nv != v:
                            st[fld] = nv
    return old


OLD = _apply_spelling(OLD)
GLOSS_FILE = HERE / 'glosses.json'
GLOSS = json.load(open(GLOSS_FILE)) if GLOSS_FILE.exists() else {}

FILES = {
    'namo': ('lesson-data-namo', 'LESSON_NAMO', '1과: 나모 땃사'),
    'trisarana': ('lesson-data-trisarana', 'LESSON_TRISARANA', '2과: 삼귀의'),
    'pancasila': ('lesson-data-pancasila', 'LESSON_PANCASILA', '3과: 오계'),
    'tisarana-guna': ('lesson-data-tisarana-guna', 'LESSON_TISARANA_GUNA', '4과: 삼보 공덕'),
    'sn45-8': ('lesson-data-sn45-8', 'LESSON_SN45_8', '5과: 도 분별경 (SN 45.8)'),
    'mangala': ('lesson-data-mangala', 'LESSON_MANGALA', '6과: 축복경 (Snp 2.4)'),
    'sn56-11': ('lesson-data-sn56-11', 'LESSON_SN56_11', '7과: 초전법륜경 (SN 56.11)'),
    'metta': ('lesson-data-metta', 'LESSON_METTA', '8과: 자애경 (Snp 1.8)'),
    'sn22-59': ('lesson-data-sn22-59', 'LESSON_SN22_59', '9과: 무아상경 (SN 22.59)'),
    'ratana': ('lesson-data-ratana', 'LESSON_RATANA', '10과: 보배경 (Snp 2.1)'),
    'mn10': ('lesson-data-mn10', 'LESSON_MN10', '11과: 대념처경 (DN 22)'),
}
REBUILD = {'sn56-11', 'sn22-59', 'sn45-8'}


# ---------- 공통 ----------
def norm(w):
    w = unicodedata.normalize('NFC', w.lower()).replace('ṁ', 'ṃ')
    return re.sub(r"[’‘“”'\"`.,;:!?—–\-()\[\]…|/·]", '', w).strip()


def surface_tokens(text):
    """[(표면형, 정규형)] — 문장 순서대로"""
    text = re.sub(r'…\s*pe\s*…|\.\s*pe\s*\.', ' ', text)
    out = []
    for raw in re.split(r'[\s—–/·]+', text):
        s = raw.strip(" ,.;:!?\"“”‘’'()[]…")
        s = re.sub(r'[“”‘’"]', '', s)  # 단어 안쪽 인용부호 (bhikkhavo”ti → bhikkhavoti)
        n = norm(s)
        if n and not n.isdigit():
            out.append((s, n))
    return out


def vri_quotes(t):
    return t.replace('‘‘‘', '“‘').replace('’’’', '’”').replace('‘‘', '“').replace('’’', '”')


def pron(pali):
    return to_hangul(vri_quotes(pali)).replace('“', '"').replace('”', '"')


def truncated(s):
    return bool(re.search(r'…|\.\.\.', s or ''))


def teach_covers(step):
    """이 단어 학습 단계가 가르치는 정규형들 (4단어 이상 묶음은 개별 학습으로 치지 않음)"""
    toks = [n for _, n in surface_tokens(step.get('word', ''))]
    return set(toks) if len(toks) <= 3 else set()


def covered(tok, known, depth=0):
    if tok in known:
        return True
    if depth > 3:
        return False
    # 붙어 쓰인 불변화사: -ñca/-mpi (앞이 ṃ), -ca/-pi/-va/-hi
    for suf, rep in (('ñca', 'ṃ'), ('mpi', 'ṃ'), ('ñceva', 'ṃ'), ('ca', ''), ('pi', ''), ('va', ''), ('hi', '')):
        if tok.endswith(suf) and len(tok) > len(suf) + 2 and covered(tok[:-len(suf)] + rep, known, depth + 1):
            return True
    # 복합어: 이미 배운 형태(3글자 이상)들로 나뉘면 배운 것으로
    for i in range(3, len(tok) - 2):
        if tok[:i] in known and covered(tok[i:], known, depth + 1):
            return True
    for suf, rep in (('nti', 'ṃ'), ('nti', ''), ('ti', ''), ('āti', 'a'), ('īti', 'i'), ('ūti', 'u'), ('ti', 'ṃ')):
        if tok.endswith(suf) and len(tok) > len(suf) + 2 and (tok[:-len(suf)] + rep) in known:
            return True
    return False


# ---------- 단위(게송) 만들기 ----------
def load_spec(k):
    ns = {}
    exec((HERE / 'units' / f'{k}.py').read_text(encoding='utf-8'), ns)
    return ns


def overlap(a, b):
    A = [n for _, n in surface_tokens(a)]
    B = set(n for _, n in surface_tokens(b))
    return sum(1 for x in A if x in B) / max(1, len(A))


def build_rebuild(k):
    """원문 단위로 게송을 새로 세우고, 기존 단계를 앞뒤에 배치"""
    old = OLD[k]
    spec = load_spec(k)['UNITS']
    units = [{'type': 'verse', 'pali': vri_quotes(p), 'pronKo': pron(p), 'translation': t} for p, t, _ in spec]
    # 기존 게송 → 가장 많이 겹치는 새 게송
    vmap = {}
    for i, s in enumerate(old):
        if s['type'] == 'verse':
            best = max(range(len(units)), key=lambda u: overlap(s['pali'], units[u]['pali']))
            vmap[i] = best
            for f in ('note', 'highlight'):
                if s.get(f):
                    if f == 'note':
                        units[best]['note'] = (units[best].get('note', '') + '\n' + s['note']).strip()
                    else:
                        units[best]['highlight'] = sorted(set(units[best].get('highlight', [])) | set(s['highlight']))
    pre = {u: [] for u in range(len(units))}
    post = {u: [] for u in range(len(units))}
    head = []
    verse_idx = [i for i in vmap]
    unit_toks = [[n for _, n in surface_tokens(u['pali'])] for u in units]

    def next_unit(i):
        for j in verse_idx:
            if j > i:
                return vmap[j]
        return len(units) - 1

    def prev_unit(i):
        p = None
        for j in verse_idx:
            if j < i:
                p = vmap[j]
        return p

    for i, s in enumerate(old):
        t = s['type']
        if t == 'verse':
            continue
        if t == 'teach':
            toks = [n for _, n in surface_tokens(s['word'])]
            found = None
            for u, ut in enumerate(unit_toks):
                if toks and all(x in ut for x in toks):
                    found = u
                    break
            u = found if found is not None else next_unit(i)
            pos = unit_toks[u].index(toks[0]) if toks and toks[0] in unit_toks[u] else 10 ** 6
            pre[u].append((2, pos, i, s))
        elif t in ('intro', 'teach-grammar'):
            if i < (verse_idx[0] if verse_idx else 0) and t == 'intro' and not head:
                head.append(s)
            else:
                pre[next_unit(i)].append((0 if t == 'intro' else 1, -1, i, s))
        else:
            p = prev_unit(i)
            if p is None:
                pre[next_unit(i)].append((1, -1, i, s))
            else:
                post[p].append((0, 0, i, s))
    return units, head, pre, post


def build_keep(k):
    """기존 순서를 유지 — 줄인 게송은 펼치고, 끊긴 발음·번역을 채움"""
    old = [dict(s) for s in OLD[k]]
    rep, rep_speak = {}, {}
    if (HERE / 'units' / f'{k}.py').exists():
        ns = load_spec(k)
        rep, rep_speak = ns.get('REPLACE', {}), ns.get('REPLACE_SPEAK', {})
    fixes = json.load(open(HERE / 'translation_fixes.json')).get(k, {}) if (HERE / 'translation_fixes.json').exists() else {}
    out = []
    for i, s in enumerate(old):
        if i in rep:
            for n, (p, t) in enumerate(rep[i]):
                u = {'type': 'verse', 'pali': vri_quotes(p), 'pronKo': pron(p), 'translation': t}
                if n == 0:
                    for f in ('note', 'highlight'):
                        if s.get(f):
                            u[f] = s[f]
                out.append(u)
            continue
        if i in rep_speak:
            s['pali'] = vri_quotes(rep_speak[i])
            s['pronKo'] = pron(rep_speak[i])
        if s.pop('_repron', False):
            src = s.get('pali') if s['type'] in ('verse', 'speak') else s.get('word')
            if src:
                s['pronKo'] = pron(src)
        if s['type'] in ('verse', 'speak'):
            if truncated(s.get('pronKo')) or not s.get('pronKo'):
                s['pronKo'] = pron(s['pali'])
            if str(i) in fixes:
                s['translation'] = fixes[str(i)]
        out.append(s)
        for extra in INSERTS.get(k, {}).get(str(i), []):
            e = dict(extra)
            if not e.get('pronKo'):
                e['pronKo'] = pron(e.get('pali') or e.get('word'))
            out.append(e)
    return out


INSERTS = json.load(open(HERE / 'inserts.json')) if (HERE / 'inserts.json').exists() else {}


# ---------- 빠진 단어 학습 넣기 ----------
SKIP = {'pe', 'ti', 'iti'}  # 생략 표시 등


def gloss_for(surface):
    g = GLOSS.get(norm(surface))
    if g:
        return g
    return None


def make_teach(surface, verse):
    g = gloss_for(surface)
    step = {'type': 'teach', 'icon': g.get('icon', '📖') if g else '📖', 'word': surface,
            'pronKo': pron(surface), 'meaning': g['meaning'] if g else '??',
            'grammar': g.get('grammar', '') if g else '', 'baseForm': g.get('baseForm', '') if g else ''}
    if g and g.get('formNote'):
        step['formNote'] = g['formNote']
    step['verseLine'] = verse['pali']
    step['verseLineKo'] = verse.get('translation', '')
    step['audio'] = True
    return step


def insert_missing(steps, k, missing_log):
    """게송마다 처음 나오는데 아직 학습하지 않은 형태 → 그 게송 바로 앞에 단어 단계"""
    known = set()
    out = []
    pending_teach = []  # 게송 앞에 모인 단어 단계
    for s in steps:
        if s['type'] == 'teach':
            known |= teach_covers(s)
            out.append(s)
            continue
        if s['type'] == 'verse':
            new = []
            seen = set()
            for surf, n in surface_tokens(s['pali']):
                if n in SKIP or n in seen or covered(n, known):
                    continue
                seen.add(n)
                known.add(n)  # 같은 게송 안의 -ti 형태 등은 방금 배운 것으로
                new.append(surf)
            for surf in new:
                t = make_teach(surf, s)
                if t['meaning'] == '??':
                    missing_log.append((k, norm(surf), surf, s['pali'], s.get('translation', '')))
                out.append(t)
                known.add(norm(surf))
        out.append(s)
    return out


def assemble(k):
    if k in REBUILD:
        units, head, pre, post = build_rebuild(k)
        steps = list(head)
        for u, v in enumerate(units):
            for _, _, _, s in sorted(pre[u], key=lambda x: (x[0], x[1], x[2])):
                steps.append(s)
            steps.append(v)
            for _, _, _, s in sorted(post[u], key=lambda x: x[2]):
                steps.append(s)
    else:
        steps = build_keep(k)
    # 남은 게송·따라읽기의 끊긴 발음 채우기
    for s in steps:
        if s['type'] in ('verse', 'speak') and (truncated(s.get('pronKo')) or not s.get('pronKo')):
            s['pronKo'] = pron(s['pali'])
    return steps


def to_ts(k, steps):
    fname, const, title = FILES[k]
    head = f'// {title} — VRI 6차 결집본 대조: 전문(반복 생략 복원) + 모든 단어 형태 학습\n'
    if k == 'sn56-11':
        src = (APP / f'{fname}.ts').read_text(encoding='utf-8')
        m = re.search(r'export type StepType =.*?\n\n', src, re.S)
        typedef = m.group(0)
        body = head + '\n' + typedef
    else:
        body = head + "import type { StepType } from './lesson-data-sn56-11'\n\n"
    body += f'export const {const}: StepType[] = [\n'
    for s in steps:
        body += '  ' + json.dumps(s, ensure_ascii=False) + ',\n'
    body += ']\n'
    return body


if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'report'
    log = []
    result = {}
    for k in FILES:
        steps = assemble(k)
        steps = insert_missing(steps, k, log)
        result[k] = steps
    if mode == 'report':
        uniq = {}
        for k, n, surf, p, t in log:
            uniq.setdefault(n, (k, surf, p, t))
        print('gloss 필요한 형태:', len(uniq), '/ 전체 빠진 곳', len(log))
        json.dump([{'form': n, 'surface': v[1], 'lesson': v[0], 'pali': v[2][:300], 'ko': v[3][:300]} for n, v in uniq.items()],
                  open('/tmp/need_gloss.json', 'w'), ensure_ascii=False, indent=1)
        for k in FILES:
            c = sum(1 for s in result[k] if s['type'] == 'teach')
            v = sum(1 for s in result[k] if s['type'] == 'verse')
            print(f'{k:14} 단계 {len(result[k]):4}  단어 {c:4}  게송 {v:3}  새 단어(풀이 없음) {sum(1 for x in log if x[0]==k):3}')
    elif mode == 'write':
        if log:
            print('풀이가 없는 단어가 있어 쓰지 않음:', len(log))
            sys.exit(1)
        for k, steps in result.items():
            (APP / f'{FILES[k][0]}.ts').write_text(to_ts(k, steps), encoding='utf-8')
            print('썼음', FILES[k][0], len(steps))
