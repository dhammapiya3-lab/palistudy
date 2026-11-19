"""빠알리어 발음 mp3 만들기 — 텔루구어 목소리 방식 (palistudy 앱에서 쓰는 방식)

Pali pronunciation audio with a Telugu neural voice (the method used in the palistudy apps).

사용법 / Usage:
    pip install edge-tts
    python pali_tts.py "Buddhaṃ saraṇaṃ gacchāmi" buddham.mp3
    python pali_tts.py --script "cakkaṃva vahato padaṃ"      # 변환된 텔루구 글자만 보기 / print converted text only

원리 / How it works:
    1) 빠알리 로마자(IAST: ā ī ū ṃ/ṁ ṅ ñ ṭ ḍ ṇ ḷ) → 데바나가리
    2) 데바나가리 → 텔루구 문자 (유니코드 배열이 같아 글자 위치만 옮김)
    3) 텔루구어 목소리가 잘못 읽는 두 가지를 고쳐 적음
       - ñ: ఞ를 n으로 읽어 버림 → 'ny'(న్య)로 적음 (ññ → nny, ñc/ñj/ñh → n)
       - ph: f로 읽지 않도록 p + h로 따로 적음
    4) 마이크로소프트 텔루구어 목소리(te-IN-MohanNeural)로 30% 느리게 읽힘
    텔루구어는 힌디어와 달리 낱말 끝 모음(a)을 빼지 않고, 장단모음을 구분해 빠알리어에 가까움.

MIT License — 자유롭게 쓰고 고치고 나눠 주세요.
"""
import asyncio
import re
import sys

VOICE = 'te-IN-MohanNeural'
RATE = '-30%'

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
    """빠알리 로마자 → 데바나가리"""
    s = roman.lower().replace('/', ',')
    out, i = '', 0
    while i < len(s):
        ch = s[i]
        if ch in 'ṃṁ':
            out += 'ं'; i += 1; continue
        cons, used = None, 0
        if s[i:i + 2] in CONSONANTS:
            cons, used = CONSONANTS[s[i:i + 2]], 2
        elif ch in CONSONANTS:
            cons, used = CONSONANTS[ch], 1
        if cons:
            i += used
            if i < len(s) and s[i] in VOWELS_IND:
                out += cons + VOWELS_DEP[s[i]]; i += 1
            else:
                out += cons + VIRAMA
            continue
        out += VOWELS_IND.get(ch, ch)  # 모음 또는 공백·문장부호
        i += 1
    return out


def shift_block(deva: str, base: int) -> str:
    """데바나가리(U+0900) → 같은 배열의 다른 인도 문자 (텔루구 0x0C00, 칸나다 0x0C80)"""
    return ''.join(chr(ord(c) - 0x0900 + base) if 0x0900 <= ord(c) <= 0x097F else c for c in deva)


def telugu_ny(te: str) -> str:
    """텔루구어 목소리가 ñ를 n으로 읽는 것을 고침"""
    NY, Y, VIR = 'న', 'య', '్'
    te = te.replace('ఞ్ఞ', NY + VIR + NY + VIR + Y)   # ññ + 모음 (puñña, sabbaññū) → nnya
    te = re.sub('ఞ(?=్[చఛజఝ])', NY, te)               # ñ + c/ch/j/jh (pañca) → n
    te = re.sub('ఞ(?=్హ)', NY, te)                    # ñh (pañha) → n + h
    return te.replace('ఞ', NY + VIR + Y)              # 그 밖의 ñ (ñāṇa) → ny


def to_telugu(roman: str) -> str:
    """빠알리 로마자 → 텔루구어 목소리에 넣을 글 (ph는 p + h로)"""
    deva = to_devanagari(roman).replace('फ', 'प्ह')
    return telugu_ny(shift_block(deva, 0x0C00))


async def make_mp3(text: str, out: str) -> None:
    import edge_tts
    await edge_tts.Communicate(to_telugu(text), VOICE, rate=RATE).save(out)


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        print(__doc__); sys.exit(1)
    if args[0] == '--script':
        print(to_telugu(' '.join(args[1:]))); sys.exit(0)
    text, out = args[0], (args[1] if len(args) > 1 else 'out.mp3')
    asyncio.run(make_mp3(text, out))
    print(f'{out} 저장 / saved')
