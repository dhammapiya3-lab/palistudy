"""빠알리 로마자 → 한글 발음 표기 (경전으로 배우기·빠알리 프라이머 관례)

- 장음 ā ī ū, 그리고 겹자음·ṃ 앞이 아닌 e·o 뒤에 '-'
- 겹자음 앞 자음은 받침 (kk→ㄱ, tt·cc·jj·dd·ss→ㅅ, pp·bb→ㅂ, mm→ㅁ, nn·ññ·ṇṇ→ㄴ, ṅ→ㅇ)
- 모음 사이 l·ḷ 은 앞 음절에 ㄹ 받침을 더함 — 장모음 뒤에도 (kusala 꾸살라, kāla 깔-라, sīla 실-라)
- ṃ → ㅇ 받침
- 받침은 ㄱ·ㄴ·ㄹ·ㅁ·ㅂ·ㅅ·ㅇ 일곱 가지만 (겹자음의 앞 자음, 비음+자음의 비음, ḷh의 ḷ)
- 그 밖의 모음 없는 자음은 '으'를 넣음: tv→뜨와(katvā 까뜨와-), dv→드웨, sv→스와, tr→뜨라, br→브라, sm→스마, hm→흐마
- mh→ㅁ받침+히, yy→이야, 자음+y는 한 음절로 합침(sakya 사꺄, vy→뱌), vo→오-
"""
import re
import unicodedata

CHO = {c: i for i, c in enumerate('ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ')}
JUNG = {c: i for i, c in enumerate('ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ')}
JONG = {c: i for i, c in enumerate(['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'])}

CONS = ['kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh',
        'k', 'g', 'ṅ', 'c', 'j', 'ñ', 'ṭ', 'ḍ', 'ṇ', 't', 'd', 'n', 'p', 'b', 'm',
        'y', 'r', 'l', 'ḷ', 'v', 's', 'h']
ONSET = {'k': 'ㄲ', 'kh': 'ㅋ', 'g': 'ㄱ', 'gh': 'ㄱ', 'c': 'ㅉ', 'ch': 'ㅊ', 'j': 'ㅈ', 'jh': 'ㅈ',
         'ṭ': 'ㄸ', 'ṭh': 'ㅌ', 'ḍ': 'ㄷ', 'ḍh': 'ㄷ', 'ṇ': 'ㄴ', 't': 'ㄸ', 'th': 'ㅌ', 'd': 'ㄷ', 'dh': 'ㄷ',
         'n': 'ㄴ', 'p': 'ㅃ', 'ph': 'ㅍ', 'b': 'ㅂ', 'bh': 'ㅂ', 'm': 'ㅁ', 'r': 'ㄹ', 'l': 'ㄹ', 'ḷ': 'ㄹ',
         's': 'ㅅ', 'h': 'ㅎ', 'ṅ': 'ㅇ', 'y': 'ㅇ', 'v': 'ㅇ', 'ñ': 'ㄴ'}
CODA = {'k': 'ㄱ', 'kh': 'ㄱ', 'g': 'ㄱ', 'gh': 'ㄱ', 'c': 'ㅅ', 'ch': 'ㅅ', 'j': 'ㅅ', 'jh': 'ㅅ',
        'ṭ': 'ㅅ', 'ṭh': 'ㅅ', 'ḍ': 'ㅅ', 'ḍh': 'ㅅ', 't': 'ㅅ', 'th': 'ㅅ', 'd': 'ㅅ', 'dh': 'ㅅ',
        'p': 'ㅂ', 'ph': 'ㅂ', 'b': 'ㅂ', 'bh': 'ㅂ', 'm': 'ㅁ', 'n': 'ㄴ', 'ṇ': 'ㄴ', 'ñ': 'ㄴ', 'ṅ': 'ㅇ',
        'l': 'ㄹ', 'ḷ': 'ㄹ', 's': 'ㅅ', 'r': 'ㄹ'}
BASE_V = {'a': 'ㅏ', 'ā': 'ㅏ', 'i': 'ㅣ', 'ī': 'ㅣ', 'u': 'ㅜ', 'ū': 'ㅜ', 'e': 'ㅔ', 'o': 'ㅗ'}
Y_V = {'a': 'ㅑ', 'ā': 'ㅑ', 'i': 'ㅣ', 'ī': 'ㅣ', 'u': 'ㅠ', 'ū': 'ㅠ', 'e': 'ㅖ', 'o': 'ㅛ'}
W_V = {'a': 'ㅘ', 'ā': 'ㅘ', 'i': 'ㅟ', 'ī': 'ㅟ', 'u': 'ㅜ', 'ū': 'ㅜ', 'e': 'ㅞ', 'o': 'ㅗ'}
VOWELS = 'aāiīuūeo'
# 같은 자리 쌍: 앞 자음이 받침이 되는 덩어리
PAIR = {('k', 'kh'), ('g', 'gh'), ('c', 'ch'), ('j', 'jh'), ('ṭ', 'ṭh'), ('ḍ', 'ḍh'), ('t', 'th'), ('d', 'dh'),
        ('p', 'ph'), ('b', 'bh')}


def tokenize(w):
    out, i = [], 0
    while i < len(w):
        if w[i] in 'ṃṁ':
            out.append(('M', 'ṃ')); i += 1; continue
        if w[i] in VOWELS:
            out.append(('V', w[i])); i += 1; continue
        for c in CONS:
            if w.startswith(c, i):
                out.append(('C', c)); i += len(c); break
        else:
            i += 1
    return out


def S(cho, jung, jong=''):
    return chr(0xAC00 + (CHO[cho] * 21 + JUNG[jung]) * 28 + JONG[jong])


def split_cluster(cl, initial):
    """자음 덩어리 → (앞 음절 받침, 덧붙는 '으'음절들, 다음 음절 초성, 활음 y/v)"""
    coda, extra, glide = '', [], None
    cl = list(cl)
    if not cl:
        return coda, extra, None, None
    if not initial and len(cl) >= 2:
        a, b = cl[0], cl[1]
        if a == 'y' and b == 'y':
            extra.append('이'); cl = cl[1:]
        elif a == 'v' and b == 'h':
            cl = ['v'] + cl[2:]
        elif a == b or (a, b) in PAIR or (a in 'ṅñṇnm' and b not in 'yvr'):
            coda = CODA.get(a, ''); cl = cl[1:]
        elif a in ('ṇ', 'n') and b == 'h':
            coda = 'ㄴ'; cl = cl[1:]
        elif a == 'y' and b == 'h':
            extra.append('이'); cl = cl[1:]
        elif a in ('ḷ', 'l') and b == 'h':
            coda = 'ㄹ'; cl = cl[1:]
        elif a == 's' and b in ('m', 'n'):
            extra.append('스'); cl = cl[1:]
        elif b in ('v', 'r') and a not in ('v', 'r', 'y'):
            pass  # 아래에서 '으'음절로
        elif b == 'y':
            pass  # 아래에서 합침
        # 그 밖의 모음 없는 자음은 아래에서 '으'를 넣어 적음 (규칙 1.3)
    # 남은 덩어리: 마지막 자음(또는 활음 앞 자음)이 초성
    if len(cl) >= 2 and cl[-1] == 'y' and cl[-2] not in ('y',):
        glide = 'y'; onset = cl[-2]
        if onset == 'v':
            onset = 'b'  # vy → 뱌 (한 음절로 합침)
        for c in cl[:-2]:
            extra.append(S(ONSET[c], 'ㅡ'))
        return coda, extra, onset, glide
    if len(cl) >= 2 and cl[-1] in ('v', 'r'):
        for c in cl[:-1]:
            extra.append(S(ONSET[c], 'ㅡ'))
        onset = cl[-1]
        return coda, extra, onset, ('v' if onset == 'v' else None)
    for c in cl[:-1]:
        extra.append(S(ONSET[c], 'ㅡ'))
    onset = cl[-1]
    glide = 'y' if onset in ('y', 'ñ') else ('v' if onset == 'v' else None)
    return coda, extra, onset, glide


def word_to_hangul(word):
    w = unicodedata.normalize('NFC', word.lower())
    w = re.sub(r"[’'‘]", '', w)
    t = tokenize(w)
    # 음절 단위로: [(앞자음덩어리, 모음, ṃ여부)] + 끝자음
    sylls, cur, i = [], [], 0
    while i < len(t):
        kind, val = t[i]
        if kind == 'C':
            cur.append(val); i += 1
        elif kind == 'V':
            nas = i + 1 < len(t) and t[i + 1][0] == 'M'
            sylls.append((cur, val, nas)); cur = []
            i += 2 if nas else 1
        else:
            i += 1
    tail = cur
    out = []  # [ [cho, jung, jong, long] ]
    for idx, (cl, v, nas) in enumerate(sylls):
        coda, extra, onset, glide = split_cluster(cl, initial=(idx == 0))
        if extra == ['이'] and onset == 'y' and v in 'iī':
            extra = []  # yyi → '이' 한 번만 (opaneyyiko 오-빠네-이꼬-)
        if out and coda:
            out[-1][2] = coda
        # 모음 사이 홑 l/ḷ → 앞 음절에 ㄹ 받침
        if out and len(cl) == 1 and cl[0] in ('l', 'ḷ') and not out[-1][2] and not sylls[idx - 1][2]:
            out[-1][2] = 'ㄹ'
        for e in extra:
            out.append(['raw', e, '', False])
        if onset is None:
            cho = 'ㅇ'
        else:
            cho = ONSET[onset]
        jung = (Y_V if glide == 'y' else W_V if glide == 'v' else BASE_V)[v]
        # e/o 장단: 뒤에 ṃ 또는 겹자음이 오면 짧게
        nxt = sylls[idx + 1][0] if idx + 1 < len(sylls) else tail
        long_ = v in 'āīū' or (v in 'eo' and not nas and len(nxt) < 2)
        out.append([cho, jung, 'ㅇ' if nas else '', long_])
    for c in tail:
        if out and c in CODA and not out[-1][2]:
            out[-1][2] = CODA[c]
        else:
            out.append(['raw', S(ONSET[c], 'ㅡ'), '', False])
    res = []
    for cho, jung, jong, long_ in out:
        if cho == 'raw':
            ch = jung
            if jong:  # '흘' 등에 받침이 붙는 경우는 없음
                pass
            res.append(ch)
        else:
            res.append(S(cho, jung, jong))
            if long_:
                res.append('-')
    return ''.join(res)


def to_hangul(text):
    out = []
    for tok in re.split(r'(\s+|[,.;:!?—–"“”‘’()\[\]…·/]+)', text):
        if not tok:
            continue
        if re.fullmatch(r'\s+|[,.;:!?—–"“”‘’()\[\]…·/]+', tok):
            out.append(tok.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'"))
        else:
            out.append(word_to_hangul(tok))
    return ''.join(out)


if __name__ == '__main__':
    import sys
    for w in sys.argv[1:]:
        print(w, to_hangul(w))
