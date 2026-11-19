# 비교용: samples.json 을 지금 녹음과 같은 방식(텔루구어 목소리, -30%)으로 만듦
import asyncio, json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'primer' / 'scripts' / 'tts'))
import edge_tts
from pali_script import to_script
here = Path(__file__).resolve().parent
S = json.loads((here / 'samples.json').read_text(encoding='utf-8'))
async def main():
    for i, t in enumerate(S):
        await edge_tts.Communicate(to_script(t, 'telugu_ph'), 'te-IN-MohanNeural', rate='-30%').save(str(here / f't{i}.mp3'))
        print(i, 'ok')
asyncio.run(main())
