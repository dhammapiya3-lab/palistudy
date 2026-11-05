"""jh·ph 발음 비교 샘플 (글자 jh·ph는 여러 목소리×적는 방식, ph 낱말은 적는 방식 비교)"""
import asyncio, json
from pathlib import Path
import edge_tts
from pali_script import to_devanagari, telugu_ny, shift_block

OUT = Path(__file__).resolve().parent.parent.parent / 'tts-samples' / 'compare2'
RATE = '-30%'

def conv(deva, script):
    if script == 'devanagari': return deva
    if script == 'kannada': return shift_block(deva, 0x0C80)
    if script == 'telugu': return telugu_ny(shift_block(deva, 0x0C00))
    from aksharamukha import transliterate
    name = {'sinhala': 'Sinhala', 'malayalam': 'Malayalam', 'gujarati': 'Gujarati', 'bengali': 'Bengali',
            'oriya': 'Oriya', 'urdu': 'Urdu', 'gurmukhi': 'Gurmukhi', 'tamil': 'TamilGrantha'}[script]
    return transliterate.process('Devanagari', name, deva)

VOICES = {
    'hi_m': ('hi-IN-MadhurNeural', 'devanagari', '힌디어 남'),
    'hi_f': ('hi-IN-SwaraNeural', 'devanagari', '힌디어 여'),
    'mr_m': ('mr-IN-ManoharNeural', 'devanagari', '마라티어 남'),
    'mr_f': ('mr-IN-AarohiNeural', 'devanagari', '마라티어 여'),
    'ne_m': ('ne-NP-SagarNeural', 'devanagari', '네팔어 남'),
    'ne_f': ('ne-NP-HemkalaNeural', 'devanagari', '네팔어 여'),
    'kn_m': ('kn-IN-GaganNeural', 'kannada', '칸나다어 남'),
    'kn_f': ('kn-IN-SapnaNeural', 'kannada', '칸나다어 여'),
    'te_m': ('te-IN-MohanNeural', 'telugu', '텔루구어 남'),
    'te_f': ('te-IN-ShrutiNeural', 'telugu', '텔루구어 여'),
    'ml_m': ('ml-IN-MidhunNeural', 'malayalam', '말라얄람어 남'),
    'ml_f': ('ml-IN-SobhanaNeural', 'malayalam', '말라얄람어 여'),
    'gu_m': ('gu-IN-NiranjanNeural', 'gujarati', '구자라트어 남'),
    'gu_f': ('gu-IN-DhwaniNeural', 'gujarati', '구자라트어 여'),
    'bn_m': ('bn-IN-BashkarNeural', 'bengali', '벵골어(인도) 남'),
    'bn_f': ('bn-IN-TanishaaNeural', 'bengali', '벵골어(인도) 여'),
    'bd_m': ('bn-BD-PradeepNeural', 'bengali', '벵골어(방글라데시) 남'),
    'si_m': ('si-LK-SameeraNeural', 'sinhala', '싱할라어 남'),
    'si_f': ('si-LK-ThiliniNeural', 'sinhala', '싱할라어 여'),
    'or_f': ('or-IN-SubhasiniNeural', 'oriya', '오리야어 여'),
    'pa_m': ('pa-IN-OjasNeural', 'gurmukhi', '펀자브어 남'),
    'ur_m': ('ur-IN-SalmanNeural', 'urdu', '우르두어 남'),
}
# 글자: 짧게(jha) / 길게(jhā) / 두 번(jha jha)
LETTER_FORMS = {'short': lambda d: d, 'long': lambda d: d + 'ा', 'two': lambda d: d + ' ' + d}
LETTERS = {'jh': 'झ', 'ph': 'फ'}

# ph 낱말: 적는 방식 비교 (텔루구어 남 = 지금 낱말에 쓰는 목소리, 그리고 몇 목소리)
PH_WORDS = ['phalāni', 'pharasu', 'phusati', 'pupphaṃ', 'pupphāni']
def ph_split(deva):  # फ → प्ह (p + 숨소리 h 를 따로 적어 f로 읽지 않게)
    return deva.replace('फ', 'प्ह')
WORD_FORMS = {'normal': lambda d: d, 'p_h': ph_split}
WORD_VOICES = ['te_m', 'te_f', 'kn_m', 'kn_f', 'ml_m', 'si_m', 'hi_m', 'mr_m', 'bn_m', 'or_f']

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(3)
    rows = []
    failed = []

    async def one(kind, key, vk, form, text, fname):
        voice = VOICES[vk][0]
        async with sem:
            for n in range(4):
                try:
                    await edge_tts.Communicate(text, voice, rate=RATE).save(str(OUT / fname))
                    if (OUT / fname).stat().st_size > 1500:
                        rows.append({'kind': kind, 'key': key, 'voice': vk, 'form': form, 'text': text, 'file': fname})
                        return
                except Exception:
                    await asyncio.sleep(3 * (n + 1))
            failed.append(fname)

    jobs = []
    for L, d in LETTERS.items():
        for vk, (_, script, _) in VOICES.items():
            for fm, fn in LETTER_FORMS.items():
                jobs.append(one('letter', L, vk, fm, conv(fn(d), script), f'L_{L}_{vk}_{fm}.mp3'))
    for w in PH_WORDS:
        d = to_devanagari(w)
        for vk in WORD_VOICES:
            script = VOICES[vk][1]
            for fm, fn in WORD_FORMS.items():
                jobs.append(one('word', w, vk, fm, conv(fn(d), script), f'W_{w}_{vk}_{fm}.mp3'))
    for i in range(0, len(jobs), 45):
        await asyncio.gather(*jobs[i:i + 45])
        print(min(i + 45, len(jobs)), '/', len(jobs))
    (OUT / 'compare2.json').write_text(json.dumps({'voices': {k: v[2] for k, v in VOICES.items()},
        'rows': rows, 'failed': failed}, ensure_ascii=False, indent=1), encoding='utf-8')
    print('실패', len(failed), failed[:20])

asyncio.run(main())
