"""특정 글자가 든 문장만 다시 녹음 (manifest 파일 이름도 새로 — 옛 캐시를 피함)
사용: python redo.py ñh"""
import asyncio, json, sys, hashlib
from pathlib import Path
from generate import speak, is_letter, LETTER_VOICE

ROOT = Path(__file__).resolve().parent.parent.parent.parent
PAT = sys.argv[1] if len(sys.argv) > 1 else 'ñh'

async def main():
    for app in ('primer', 'suttalog'):
        audio = ROOT / app / 'public' / 'audio'
        mp = audio / 'manifest.json'
        if not mp.exists():
            continue
        m = json.loads(mp.read_text(encoding='utf-8'))
        groups = {}
        for k, f in m.items():
            if PAT in k.lower():
                groups.setdefault(f, k)
        for old, text in groups.items():
            new = 'r_' + hashlib.sha1((text + '|v2').encode()).hexdigest()[:12] + '.mp3'
            spoken = text.replace('\\n', ' ')
            await speak(spoken, LETTER_VOICE if is_letter(spoken) else 'te', audio / new, retries=4)
            for k in [k for k, f in m.items() if f == old]:
                m[k] = new
            print(app, old, '→', new, text)
        indent = 1 if app == 'primer' else 0
        mp.write_text(json.dumps(m, ensure_ascii=False, indent=indent), encoding='utf-8')

asyncio.run(main())
