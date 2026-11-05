"""프라이머 manifest에서 지정한 문장만 다시 녹음하거나 새로 추가 (새 파일 이름으로 — 옛 캐시를 피함)
사용: python redo_texts.py redo_texts.json   (["문장", ...])"""
import asyncio, json, sys, hashlib, re
from pathlib import Path
from generate import speak, is_letter, LETTER_VOICE

AUDIO = Path(__file__).resolve().parent.parent.parent / 'public' / 'audio'

def clean(t):
    t = t.replace('\\n', ' ')
    t = re.sub(r'\s*[/·]\s*', ', ', t)
    return re.sub(r'\s+', ' ', t).strip()

async def main():
    texts = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    mp = AUDIO / 'manifest.json'
    m = json.loads(mp.read_text(encoding='utf-8'))
    for text in texts:
        new = 'r_' + hashlib.sha1((text + '|v3').encode()).hexdigest()[:12] + '.mp3'
        sp = clean(text)
        await speak(sp, LETTER_VOICE if is_letter(sp) else 'te', AUDIO / new, retries=4)
        old = m.get(text) or m.get(text.lower())
        keys = [k for k, f in m.items() if old and f == old] or [text, text.lower()]
        for k in set(keys) | {text, text.lower()}:
            m[k] = new
        print(text, '→', new)
    mp.write_text(json.dumps(m, ensure_ascii=False, indent=1), encoding='utf-8')

asyncio.run(main())
