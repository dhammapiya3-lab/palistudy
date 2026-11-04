"""빠알리 e·o 장음 표시 추가 도구

빠알리 원문과 한글 발음 표기를 음절 단위로 맞춘 뒤,
길게 읽는 e·o(뒤에 겹자음이 오지 않는 것)에 해당하는 한글 음절 뒤에 장음 기호를 붙인다.

사용: python3 eo_long.py <앱폴더> <장음기호> [--apply]
  --apply 없으면 보고만 함
"""
import re
import sys
import unicodedata
from pathlib import Path

ASPIRATES = ('kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh')
VOWELS = 'aāiīuūeo'
CONS = set('kgṅcjñṭḍṇtdnpbmyrlḷvsh')

# 한글 음절 → (초성, 중성, 종성) 번호
def jamo(ch):
    c = ord(ch) - 0xAC00
    return c // 588, (c % 588) // 28, c % 28

def is_hangul(ch):
    return 0xAC00 <= ord(ch) <= 0xD7A3

V_EU = 18                       # ㅡ : 빠알리에 없는 소리 → 자음 덩어리용 덧소리(뜨·브·스)
E_VOWELS = {5, 7, 15, 1, 3, 10}  # ㅔ ㅖ ㅞ ㅐ ㅒ ㅙ  (e 계열: 에·예·웨)
O_VOWELS = {8, 12, 14}          # ㅗ ㅛ ㅝ (o 계열: 오·요·워 — vo를 '워'로 적은 경우)
Y_VOWELS = {2, 6, 12, 17, 7, 3}  # ㅑ ㅕ ㅛ ㅠ ㅖ ㅒ (y로 시작하는 모음)


def pali_nuclei(text):
    """빠알리 원문의 모음 목록: [(모음, 길게 읽는 e/o인가)]"""
    s = unicodedata.normalize('NFC', text.lower())
    out = []
    i = 0
    while i < len(s):
        ch = s[i]
        if ch in VOWELS:
            long_eo = False
            if ch in 'eo':
                # 뒤따르는 자음 수 세기 (기식음 kh 등은 한 자음)
                j, n = i + 1, 0
                while j < len(s) and n < 2:
                    if s[j:j + 2] in ASPIRATES:
                        n += 1; j += 2
                    elif s[j] in CONS:
                        n += 1; j += 1
                    else:
                        break
                nxt = s[i + 1] if i + 1 < len(s) else ''
                long_eo = n < 2 and nxt not in ('ṃ', 'ṁ')
            out.append((ch, long_eo))
        i += 1
    return out


def hangul_slots(ko):
    """한글 표기의 음절 위치 목록 (덧소리 '으' 계열 음절은 제외)"""
    slots = []
    for idx, ch in enumerate(ko):
        if not is_hangul(ch):
            continue
        c, v, t = jamo(ch)
        if v == V_EU and t == 0:
            continue
        # -eyya → '에이야': 'e' 뒤 yy를 '이'로 덧붙여 적은 것 → 빠알리 모음 아님
        if ch == '이' and slots and idx + 1 < len(ko) and is_hangul(ko[idx + 1]):
            prev = ko[slots[-1]]
            nc, nv, _ = jamo(ko[idx + 1])
            if slots[-1] == idx - 1 and jamo(prev)[1] in E_VOWELS and nc == 11 and nv in Y_VOWELS:
                continue
        slots.append(idx)
    return slots


SPLIT_P = re.compile(r"(?:\\n|[\s,.;:!?—–/·()\"“”‘’'\[\]])+")
SPLIT_K = re.compile(r"(?:\\n|[\s,.;:!?—–/·()\"“”‘’'\[\]])+")


KCLASS = {0: 'a', 2: 'a', 9: 'a', 20: 'i', 16: 'i', 19: 'i', 13: 'u', 17: 'u',
          5: 'e', 7: 'e', 15: 'e', 1: 'e', 3: 'e', 10: 'e', 8: 'o', 12: 'o', 14: 'o'}


def sig_pali(w):
    return ''.join({'ā': 'a', 'ī': 'i', 'ū': 'u'}.get(v, v) for v, _ in pali_nuclei(w))


def sig_ko(w):
    return ''.join(KCLASS.get(jamo(w[i])[1], 'x') for i in hangul_slots(w))


def add_marks(pali, ko, mark):
    """여러 단어면: 단어마다 모음 모양이 같은 짝을 순서대로 찾아(LCS) 짝지은 단어만 처리"""
    pw = [w for w in SPLIT_P.split(pali.replace('-', '')) if w.strip()]
    spans = [(m.start(), m.end()) for m in re.finditer(r"[^\s,.;:!?—–/·()\"“”‘’'\[\]\\]+(?:\\(?!n)[^\s]*)?", ko)]
    spans = [(a, b) for a, b in spans if any(is_hangul(c) for c in ko[a:b])]
    if len(pw) <= 1 and len(spans) <= 1:
        return add_marks_one(pali, ko, mark)
    sp = [sig_pali(w) for w in pw]
    sk = [sig_ko(ko[a:b]) for a, b in spans]
    n, m = len(sp), len(sk)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            dp[i][j] = dp[i + 1][j + 1] + 1 if sp[i] == sk[j] and sp[i] else max(dp[i + 1][j], dp[i][j + 1])
    pairs, i, j = [], 0, 0
    while i < n and j < m:
        if sp[i] == sk[j] and sp[i] and dp[i][j] == dp[i + 1][j + 1] + 1:
            pairs.append((i, j)); i += 1; j += 1
        elif dp[i + 1][j] >= dp[i][j + 1]:
            i += 1
        else:
            j += 1
    matched_p = {a for a, _ in pairs}
    missed = [pw[k] for k in range(n) if k not in matched_p and any(l for _, l in pali_nuclei(pw[k]))]
    out, last, changed = [], 0, False
    for pi, kj in pairs:
        a, b = spans[kj]
        new, st = add_marks_one(pw[pi], ko[a:b], mark)
        if st.startswith('skip'):
            missed.append(pw[pi]); new = ko[a:b]
        out.append(ko[last:a]); out.append(new); last = b
        changed = changed or st == 'ok'
    out.append(ko[last:])
    res = ''.join(out)
    if missed:
        return res, ('ok-part:' if changed else 'skip:') + '못 맞춘 장음 단어 ' + ','.join(missed[:6])
    return res, ('ok' if changed else 'same')


def add_marks_one(pali, ko, mark):
    """반환: (새 한글 표기, 상태) 상태 = ok / same / 'skip:이유'"""
    nuc = pali_nuclei(pali)
    slots = hangul_slots(ko)
    if len(nuc) != len(slots):
        return ko, f'skip:음절수 {len(nuc)}≠{len(slots)}'
    marks = ('-', '~')
    # 맞춤 검증: 이미 있는 장음 기호가 ā ī ū 자리와 맞는지
    for (v, _), pos in zip(nuc, slots):
        has_mark = pos + 1 < len(ko) and ko[pos + 1] in marks
        if v in 'āīū' and not has_mark:
            pass  # 원래 표기에서 빠진 곳은 문제 삼지 않음
        if v in 'aiu' and has_mark:
            return ko, f'skip:정렬불일치({ko[pos]})'
    out = list(ko)
    inserts = []
    for (v, long_eo), pos in zip(nuc, slots):
        if not long_eo:
            continue
        vj = jamo(ko[pos])[1]
        ok_vowel = (v == 'e' and vj in E_VOWELS) or (v == 'o' and vj in O_VOWELS)
        if not ok_vowel:
            return ko, f'skip:모음불일치({v}↔{ko[pos]})'
        if pos + 1 < len(ko) and ko[pos + 1] in marks:
            continue
        inserts.append(pos + 1)
    for p in reversed(inserts):
        out.insert(p, mark)
    new = ''.join(out)
    return new, ('ok' if new != ko else 'same')


# ---- TS 파일에서 (빠알리, 한글표기) 짝 찾기 ----
STR = r"(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")"
PRON_RE = re.compile(r"""["']?pronKo["']?\s*:\s*(?:""" + STR + r"""|([A-Za-z_][A-Za-z0-9_]*))""")
SRC_RE = re.compile(r"""["']?(word|pali)["']?\s*:\s*(?:""" + STR + r"""|([A-Za-z_][A-Za-z0-9_]*))""")
CONST_RE = re.compile(r"""const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*""" + STR)
INLINE_RE = re.compile(r"""([A-Za-zāīūṃṅñṭḍṇḷĀĪŪ][A-Za-zāīūṃṅñṭḍṇḷĀĪŪ'’ ]*?)\s*\[([가-힣\-~ ]+)\]""")


def process_file(path, mark, apply, report):
    src = path.read_text(encoding='utf-8')
    consts = {m.group(1): (m.group(2) if m.group(2) is not None else m.group(3)) for m in CONST_RE.finditer(src)}
    edits = []  # (start, end, new_text)
    const_edits = {}

    for m in PRON_RE.finditer(src):
        # 같은 단계 객체 안에서 앞쪽의 word/pali 찾기 (직전 'type' 이후)
        start = src.rfind('type', 0, m.start())
        seg = src[start:m.start()]
        sm = None
        for sm in SRC_RE.finditer(seg):
            pass
        if not sm:
            # 쓰기 단계: 빠알리가 뒤쪽 answer 필드에 있음
            nxt = src.find('type', m.end())
            tail = src[m.end(): nxt if nxt > 0 else len(src)]
            am = re.search(r"""["']?answer["']?\s*:\s*""" + STR, tail)
            if am:
                class _M:  # sm과 같은 모양으로
                    def __init__(s, a): s.a = a
                    def group(s, k): return {2: s.a.group(1), 3: s.a.group(2), 4: None}[k]
                sm = _M(am)
        if not sm:
            report.append((path.name, '?', m.group(0)[:40], 'skip:원문없음'))
            continue
        pali = sm.group(2) if sm.group(2) is not None else sm.group(3)
        if pali is None:
            pali = consts.get(sm.group(4), '')
        if m.group(3):  # pronKo가 상수 이름
            name = m.group(3)
            if name in consts:
                const_edits[name] = pali
            continue
        ko = m.group(1) if m.group(1) is not None else m.group(2)
        new, st = add_marks(pali.replace('\\n', ' '), ko, mark)
        report.append((path.name, pali, ko + (' → ' + new if st.startswith('ok') else ''), st))
        if st.startswith('ok'):
            g = 1 if m.group(1) is not None else 2
            edits.append((m.start(g), m.end(g), new))

    for name, pali in const_edits.items():
        cm = re.search(r"const\s+" + name + r"\s*=\s*" + STR, src)
        g = 1 if cm.group(1) is not None else 2
        ko = cm.group(g)
        new, st = add_marks(pali.replace('\\n', ' '), ko, mark)
        report.append((path.name, pali, ko + (' → ' + new if st.startswith('ok') else ''), st))
        if st.startswith('ok'):
            edits.append((cm.start(g), cm.end(g), new))

    # 문자열 안의 "pali [한글]" 형태 (자모와 발음 2의 verseLine 등)
    for m in INLINE_RE.finditer(src):
        pali, ko = m.group(1).strip(), m.group(2)
        new, st = add_marks(pali, ko, mark)
        report.append((path.name, pali, ko + (' → ' + new if st.startswith('ok') else ''), 'inline-' + st))
        if st.startswith('ok'):
            edits.append((m.start(2), m.end(2), new))

    if apply and edits:
        for s0, e0, new in sorted(edits, reverse=True):
            src = src[:s0] + new + src[e0:]
        path.write_text(src, encoding='utf-8')
    return len(edits)


if __name__ == '__main__':
    root, mark = Path(sys.argv[1]), sys.argv[2]
    apply = '--apply' in sys.argv
    files = sorted(root.glob('src/features/**/lesson*.ts'))
    report = []
    total = sum(process_file(f, mark, apply, report) for f in files)
    import collections
    print('파일', len(files), '수정 대상', total)
    print(collections.Counter(r[3].split(':')[0] for r in report))
    out = Path(sys.argv[1]).name + '-eo-report.tsv'
    Path('/tmp/' + out).write_text('\n'.join('\t'.join(map(str, r)) for r in report), encoding='utf-8')
    print('보고서 /tmp/' + out)
