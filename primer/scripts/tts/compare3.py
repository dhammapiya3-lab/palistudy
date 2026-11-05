"""pañha 발음 비교 샘플 — ñ + h 를 어떻게 적어 읽힐지 비교 (지금: '빠니하'로 들림)"""
import asyncio, json, re
from pathlib import Path
import edge_tts
from pali_script import to_devanagari, telugu_ny, shift_block

OUT = Path(__file__).resolve().parent.parent.parent / 'tts-samples' / 'compare3'
RATE = '-30%'
TE = 'te-IN-MohanNeural'
HI = 'hi-IN-MadhurNeural'
NY, YA, VIR, H = 'న', 'య', '్', 'హ'

TEXTS = ['pañha', 'pañhaṃ', 'pañhe', 'Putto mātulamhā pañhaṃ pucchati.']


def te(roman):
    return telugu_ny(shift_block(to_devanagari(roman), 0x0C00))


# 적는 방식 (모두 텔루구어 남 목소리 — 지금 앱 문장 목소리, 마지막 하나만 힌디어 남)
FORMS = {
    'now': ('지금 (ny+h)', TE, lambda r: te(r)),
    'n_h': ('n + h (న్హ)', TE, lambda r: te(r).replace(NY + VIR + YA + VIR + H, NY + VIR + H)),
    'nn_h': ('혀 만 n + h (ణ్హ)', TE, lambda r: te(r).replace(NY + VIR + YA + VIR + H, 'ణ' + VIR + H)),
    'n_zwnj_h': ('n 끊고 + h (న్‌హ)', TE, lambda r: te(r).replace(NY + VIR + YA + VIR + H, NY + VIR + '‌' + H)),
    'hi': ('힌디어 남 (पन्ह)', HI, lambda r: to_devanagari(r).replace('ञ्ह', 'न्ह')),
}


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for i, t in enumerate(TEXTS):
        for k, (label, voice, fn) in FORMS.items():
            text = fn(t)
            f = f'p{i}_{k}.mp3'
            for n in range(4):
                try:
                    await edge_tts.Communicate(text, voice, rate=RATE).save(str(OUT / f))
                    if (OUT / f).stat().st_size > 1500:
                        break
                except Exception:
                    await asyncio.sleep(3 * (n + 1))
            rows.append({'text': t, 'form': k, 'label': label, 'native': text, 'file': f})
            print(f, t, text)
    (OUT / 'samples.json').write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')

asyncio.run(main())
