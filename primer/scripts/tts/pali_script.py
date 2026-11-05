"""빠알리 로마자 → 인도계 문자 변환 (발음 녹음용)

- 데바나가리: 기존 Colab 노트북과 같은 규칙
- 칸나다·텔루구: 데바나가리와 유니코드 배열이 같아서 글자 위치만 옮김
- 싱할라: aksharamukha 라이브러리 사용 (스리랑카 전통 빠알리 표기)
"""

CONSONANTS = {
    'kh': 'ख', 'k': 'क', 'gh': 'घ', 'g': 'ग', 'ṅ': 'ङ',
    'ch': 'छ', 'c': 'च', 'jh': 'झ', 'j': 'ज', 'ñ': 'ञ',
    'ṭh': 'ठ', 'ṭ': 'ट', 'ḍh': 'ढ', 'ḍ': 'ड', 'ṇ': 'ण',
    'th': 'थ', 't': 'त', 'dh': 'ध', 'd': 'द', 'n': 'न',
    'ph': 'फ', 'p': 'प', 'bh': 'भ', 'b': 'ब', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'ḷ': 'ळ',
    'v': 'व', 's': 'स', 'h': 'ह',
}
VOWELS_IND = {'ā': 'आ', 'a': 'अ', 'ī': 'ई', 'i': 'इ', 'ū': 'ऊ', 'u': 'उ', 'e': 'ए', 'o': 'ओ'}
VOWELS_DEP = {'ā': 'ा', 'a': '', 'ī': 'ी', 'i': 'ि', 'ū': 'ू', 'u': 'ु', 'e': 'े', 'o': 'ो'}
VIRAMA = '्'


def to_devanagari(roman: str) -> str:
    s = roman.lower().replace('/', ',')
    out, i = '', 0
    while i < len(s):
        ch = s[i]
        if ch in 'ṃṁ':
            out += 'ं'
            i += 1
            continue
        cons, used = None, 0
        if s[i:i + 2] in CONSONANTS:
            cons, used = CONSONANTS[s[i:i + 2]], 2
        elif ch in CONSONANTS:
            cons, used = CONSONANTS[ch], 1
        if cons:
            i += used
            if i < len(s) and s[i] in VOWELS_IND:
                out += cons + VOWELS_DEP[s[i]]
                i += 1
            else:
                out += cons + VIRAMA
            continue
        if ch in VOWELS_IND:
            out += VOWELS_IND[ch]
        else:
            out += ch  # 공백·문장부호 등
        i += 1
    return out


def shift_block(deva: str, base: int) -> str:
    """데바나가리(U+0900) 글자를 같은 배열의 다른 문자 블록으로 옮김"""
    res = []
    for c in deva:
        code = ord(c)
        res.append(chr(code - 0x0900 + base) if 0x0900 <= code <= 0x097F else c)
    return ''.join(res)


def telugu_ny(te: str) -> str:
    """텔루구어 목소리는 ఞ(ñ)를 'n'으로 읽어 버림 → 'ny'(న్య)로 적어 '냐·뉴'로 읽게 함
    - ññ + 모음 (puñña, sabbaññū) → న్న్య (nnya)
    - ñ + c/ch/j/jh (pañca, kuñjara) → న (같은 자리 비음이라 n으로 충분)
    - ñ + h (pañha) → న (n + h로 적어 '빤하'로 읽게 함)
    - 그 밖의 ñ + 모음 (ñāṇa) → న్య
    """
    import re
    NY, N, VIR = 'న', 'య', '్'
    te = te.replace('ఞ్ఞ', NY + VIR + NY + VIR + N)
    te = re.sub('ఞ(?=్[చఛజఝ])', NY, te)
    te = re.sub('ఞ(?=్హ)', NY, te)  # ñh → n + h (pañha 빤하; 'ny'로 적으면 '빠니하'로 들림)
    te = te.replace('ఞ', NY + VIR + N)
    return te


def to_script(roman: str, script: str) -> str:
    deva = to_devanagari(roman)
    if script == 'devanagari':
        return deva
    if script == 'kannada':
        return shift_block(deva, 0x0C80)
    if script == 'kannada_ph':  # ph를 p + h로 따로 적어 f처럼 읽지 않게 (사용자가 고른 ph 낱말 소리)
        return shift_block(deva.replace('फ', 'प्ह'), 0x0C80)
    if script == 'telugu_raw':
        return shift_block(deva, 0x0C00)
    if script == 'telugu':
        return telugu_ny(shift_block(deva, 0x0C00))
    if script == 'sinhala':
        from aksharamukha import transliterate
        return transliterate.process('Devanagari', 'Sinhala', deva)
    raise ValueError(f'모르는 문자: {script}')
