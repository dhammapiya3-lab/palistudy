"""경전으로 배우기 발음 mp3 만들기 — 프라이머 문장 목소리(텔루구어 남)와 같은 방식
suttalog/scripts/tts-texts.json (ttsKey로 정리된 문장 목록) → suttalog/public/audio/<hash>.mp3 + manifest.json
이미 manifest에 있는 문장은 건너뜀 (여러 번 돌려도 안전)"""
import asyncio, hashlib, json
from pathlib import Path
from generate import speak, is_letter, LETTER_VOICE

ROOT = Path(__file__).resolve().parent.parent.parent.parent
TEXTS = ROOT / 'suttalog' / 'scripts' / 'tts-texts.json'
AUDIO = ROOT / 'suttalog' / 'public' / 'audio'
VOICE = 'te'

async def main():
    AUDIO.mkdir(parents=True, exist_ok=True)
    mpath = AUDIO / 'manifest.json'
    manifest = json.loads(mpath.read_text(encoding='utf-8')) if mpath.exists() else {}
    texts = json.loads(TEXTS.read_text(encoding='utf-8'))
    todo = []
    for t in texts:
        if t in manifest and (AUDIO / manifest[t]).exists():
            continue
        fname = 's_' + hashlib.sha1(t.encode('utf-8')).hexdigest()[:12] + '.mp3'
        todo.append((t, fname))
    print('새로 만들 문장', len(todo), '/ 전체', len(texts))
    sem = asyncio.Semaphore(4)
    failed = []
    done = []

    async def one(t, f):
        async with sem:
            try:
                await speak(t, LETTER_VOICE if is_letter(t) else VOICE, AUDIO / f, retries=3)
                done.append((t, f))
            except Exception:
                failed.append((t, f))

    rest = todo
    for rnd in range(1, 6):
        failed.clear()
        for i in range(0, len(rest), 80):
            await asyncio.gather(*(one(t, f) for t, f in rest[i:i + 80]))
            print(f'[{rnd}회차] {min(i + 80, len(rest))}/{len(rest)}', flush=True)
        if not failed:
            break
        rest = list(failed)
        await asyncio.sleep(30 * rnd)
    for t, f in done:
        manifest[t] = f
    # 목록에서 빠진 문장은 manifest에서 지움(파일은 남겨 둠)
    keep = set(texts)
    manifest = {k: v for k, v in manifest.items() if k in keep}
    mpath.write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding='utf-8')
    print('완료', len(done), '실패', len(failed), [t for t, _ in failed][:20])

asyncio.run(main())
