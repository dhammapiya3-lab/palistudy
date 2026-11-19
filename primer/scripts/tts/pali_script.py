"""빠알리 로마자 → 인도계 문자 변환 (발음 녹음용)

- 기본 규칙(데바나가리·텔루구 변환, ñ·ph 보정)의 원본은 share/pali-tts/pali_tts.py 하나뿐 — 여기서는 가져다 씀.
  (그 폴더는 다른 사람들에게 공개하는 곳이라, 규칙을 고치면 앱 녹음과 공개본에 함께 반영됨)
- 칸나다·싱할라 등 비교용 변환만 여기에 있음
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'share' / 'pali-tts'))
from pali_tts import CONSONANTS, VOWELS_IND, VOWELS_DEP, VIRAMA, to_devanagari, shift_block, telugu_ny  # noqa: E402,F401


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
    if script == 'telugu_ph':  # 문장 속 ph: 같은 텔루구어 목소리에서 ph만 p + h로 따로 적음 (사용자 선택)
        return telugu_ny(shift_block(deva.replace('फ', 'प्ह'), 0x0C00))
    if script == 'sinhala':
        from aksharamukha import transliterate
        return transliterate.process('Devanagari', 'Sinhala', deva)
    raise ValueError(f'모르는 문자: {script}')
