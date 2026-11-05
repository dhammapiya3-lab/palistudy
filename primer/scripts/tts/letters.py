"""자모 발음 비교용 샘플: 여러 목소리로 자음 33개(+모음 8개)를 녹음해 비교"""
import asyncio, json
from pathlib import Path
import edge_tts
from pali_script import CONSONANTS, VOWELS_IND, to_devanagari, telugu_ny, shift_block

OUT = Path(__file__).resolve().parent.parent.parent / 'tts-samples' / 'letters'
RATE = '-30%'

def conv(deva: str, script: str) -> str:
    if script == 'devanagari':
        return deva
    if script == 'kannada':
        return shift_block(deva, 0x0C80)
    if script == 'telugu':
        return telugu_ny(shift_block(deva, 0x0C00))
    from aksharamukha import transliterate
    name = {'sinhala': 'Sinhala', 'malayalam': 'Malayalam', 'gujarati': 'Gujarati',
            'bengali': 'Bengali', 'oriya': 'Oriya', 'tamil': 'TamilGrantha'}[script]
    return transliterate.process('Devanagari', name, deva)

VOICES = {
    'kn_m': ('kn-IN-GaganNeural', 'kannada', '칸나다어 남 (지금 자모에 쓰는 목소리)'),
    'kn_f': ('kn-IN-SapnaNeural', 'kannada', '칸나다어 여'),
    'te_m': ('te-IN-MohanNeural', 'telugu', '텔루구어 남 (지금 낱말·문장에 쓰는 목소리)'),
    'te_f': ('te-IN-ShrutiNeural', 'telugu', '텔루구어 여'),
    'hi_m': ('hi-IN-MadhurNeural', 'devanagari', '힌디어 남'),
    'hi_f': ('hi-IN-SwaraNeural', 'devanagari', '힌디어 여'),
    'mr_m': ('mr-IN-ManoharNeural', 'devanagari', '마라티어 남'),
    'ne_m': ('ne-NP-SagarNeural', 'devanagari', '네팔어 남'),
    'ml_m': ('ml-IN-MidhunNeural', 'malayalam', '말라얄람어 남'),
    'gu_m': ('gu-IN-NiranjanNeural', 'gujarati', '구자라트어 남'),
    'bn_m': ('bn-IN-BashkarNeural', 'bengali', '벵골어 남'),
    'si_m': ('si-LK-SameeraNeural', 'sinhala', '싱할라어 남 (스리랑카)'),
}
# 적는 방식: 글자만 / 두 번 / 'a'를 길게 이어 붙인 음절과 함께
FORMS = {
    'one': lambda d: d,
    'two': lambda d: d + ' ' + d,
}
LETTERS = list(CONSONANTS.keys())
ORDER = ['k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','v','s','h','ḷ']
LETTERS = [x for x in ORDER if x in CONSONANTS] + ['ṃ']

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(3)
    rows = {}
    failed = []

    async def one(letter, vk, form):
        voice, script, _ = VOICES[vk]
        deva = to_devanagari('aṃ' if letter == 'ṃ' else letter + 'a')
        text = FORMS[form](conv(deva, script))
        f = f"{ORDER.index(letter) if letter in ORDER else 99:02d}_{vk}_{form}.mp3"
        async with sem:
            for n in range(4):
                try:
                    await edge_tts.Communicate(text, voice, rate=RATE).save(str(OUT / f))
                    if (OUT / f).stat().st_size > 0:
                        rows.setdefault(letter, {})[f'{vk}_{form}'] = {'file': f, 'text': text}
                        return
                except Exception:
                    await asyncio.sleep(3 * (n + 1))
            failed.append(f)

    jobs = [one(l, vk, fm) for l in LETTERS for vk in VOICES for fm in FORMS]
    for i in range(0, len(jobs), 45):
        await asyncio.gather(*jobs[i:i + 45])
        print(min(i + 45, len(jobs)), '/', len(jobs))
    (OUT / 'letters.json').write_text(json.dumps({
        'voices': {k: v[2] for k, v in VOICES.items()}, 'forms': list(FORMS),
        'letters': LETTERS, 'rows': rows, 'failed': failed}, ensure_ascii=False, indent=1), encoding='utf-8')
    print('실패', failed)

asyncio.run(main())
