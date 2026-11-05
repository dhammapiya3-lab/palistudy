"""ph가 든 문장·낱말 녹음을 '칸나다어 남 · p와 h 따로 적기'로 다시 만듦 (두 앱, 새 파일 이름으로 — 옛 캐시를 피함)"""
import asyncio, json, hashlib
from pathlib import Path
from generate import speak, is_letter

ROOT = Path(__file__).resolve().parent.parent.parent.parent

def clean(t):
    import re
    t = t.replace('\\n', ' ')
    t = re.sub(r'\s*[/·]\s*', ', ', t)
    t = t.replace('[', '').replace(']', '')
    return re.sub(r'\s+', ' ', t).strip()

async def main():
    sem = asyncio.Semaphore(4)
    for app, indent in (('primer', 1), ('suttalog', 0)):
        audio = ROOT / app / 'public' / 'audio'
        mp = audio / 'manifest.json'
        m = json.loads(mp.read_text(encoding='utf-8'))
        groups = {}
        for k, f in m.items():
            if 'ph' in k.lower() and not is_letter(k):
                groups.setdefault(f, k)
        done = {}
        async def one(old, text):
            new = 'ph_' + hashlib.sha1((text + '|kn_ph').encode()).hexdigest()[:12] + '.mp3'
            async with sem:
                for n in range(3):
                    try:
                        await speak(clean(text), 'te', audio / new, retries=4)
                        done[old] = new
                        return
                    except Exception as e:
                        print('재시도', text[:40], e)
                        await asyncio.sleep(10)
        await asyncio.gather(*(one(o, t) for o, t in groups.items()))
        for k, f in list(m.items()):
            if f in done:
                m[k] = done[f]
        mp.write_text(json.dumps(m, ensure_ascii=False, indent=indent), encoding='utf-8')
        print(app, '다시 만듦', len(done), '/', len(groups))

asyncio.run(main())
