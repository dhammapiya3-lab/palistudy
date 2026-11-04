"""낱글자 발음 시험: 여러 적는 방식으로 만들어 보고 소리가 나는 방식을 찾음"""
import asyncio, json
from pathlib import Path
import edge_tts
from pali_script import to_script

OUT = Path(__file__).resolve().parent.parent.parent / 'tts-samples' / 'probe'
TESTS = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o', 'jha']
VARIANTS = {
    'plain': lambda x: x,
    'dot': lambda x: x + '.',
    'danda': lambda x: x + '।',
    'quote': lambda x: '"' + x + '"',
    'double': lambda x: x + ' ' + x,
    'dash': lambda x: x + ' -',
}
VOICES = {'te': ('te-IN-MohanNeural', 'telugu'), 'kn': ('kn-IN-GaganNeural', 'kannada')}


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for t in TESTS:
        for vk, (voice, script) in VOICES.items():
            for name, fn in VARIANTS.items():
                text = fn(to_script(t, script))
                f = f'{t}_{vk}_{name}.mp3'
                try:
                    await edge_tts.Communicate(text, voice, rate='-30%').save(str(OUT / f))
                except Exception as e:
                    print('실패', f, e)
                    continue
                rows.append({'t': t, 'voice': vk, 'variant': name, 'text': text, 'file': f})
                await asyncio.sleep(0.3)
    (OUT / 'probe.json').write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')

asyncio.run(main())
