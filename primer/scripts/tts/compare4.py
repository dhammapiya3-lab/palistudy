"""ph 든 문장 비교: 지금(텔루구어) / 칸나다어 남 · p와 h 따로 / 텔루구어 · p와 h 따로"""
import asyncio, json
from pathlib import Path
import edge_tts
from pali_script import to_devanagari, telugu_ny, shift_block

OUT = Path(__file__).resolve().parent.parent.parent / 'tts-samples' / 'compare4'
RATE = '-30%'
TEXTS = [
    'Vānarā rukkhaṃ āruyha phalāni khādanti.',
    'Kumāra, pupphaṃ āhara! Kumārā, pupphāni āharatha!',
    'Cakkhusamphasso, sotasamphasso, ghānasamphasso.',
    'Pharusāya vācāya veramaṇī.',
    'Tassa dvinnaṃ phalānaṃ aññataraṃ phalaṃ pāṭikaṅkhaṃ.',
]
def ph(d): return d.replace('फ', 'प्ह')
FORMS = {
    'now':   ('te-IN-MohanNeural', lambda d: telugu_ny(shift_block(d, 0x0C00))),
    'kn_ph': ('kn-IN-GaganNeural', lambda d: shift_block(ph(d), 0x0C80)),
    'te_ph': ('te-IN-MohanNeural', lambda d: telugu_ny(shift_block(ph(d), 0x0C00))),
}
async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for i, t in enumerate(TEXTS):
        d = to_devanagari(t)
        for k, (voice, fn) in FORMS.items():
            f = OUT / f's{i}_{k}.mp3'
            for n in range(4):
                try:
                    await edge_tts.Communicate(fn(d), voice, rate=RATE).save(str(f))
                    if f.stat().st_size > 1500: break
                except Exception:
                    await asyncio.sleep(3 * (n + 1))
            print(f.name, t)
asyncio.run(main())
