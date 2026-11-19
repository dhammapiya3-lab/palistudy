"""여성 목소리 녹음 만들기 — 남성 녹음(public/audio)과 같은 문장을 여성 목소리(te-IN-ShrutiNeural)로
두 앱(primer, suttalog)의 public/audio/manifest.json 을 읽어 → public/audio-f/<같은 파일 이름> + audio-f/manifest.json
- 이미 만든 파일은 건너뜀 (여러 번 돌려도 안전 — 남성 녹음이 새로 늘면 그만큼만 더 만듦)
- 낱글자(자모)는 여성 녹음을 만들지 않음 → 앱에서 남성 글자 녹음으로 대신 읽음
실행: python female.py            (GitHub Actions: tts/female 가지, 또는 tts/sutta·tts/add-* 뒤에 자동으로)
"""
import asyncio, json, re
from pathlib import Path
from generate import speak, is_letter

ROOT = Path(__file__).resolve().parents[3]
APPS = ['primer', 'suttalog']
VOICE = 'te_f'


def clean(t):  # sutta.py 와 같음: '/', '·', 대괄호는 소리 내지 않음
    t = re.sub(r'\s*[/·]\s*', ', ', t)
    t = t.replace('[', '').replace(']', '')
    return re.sub(r'\s+', ' ', t).strip()


async def one_app(app):
    src = ROOT / app / 'public' / 'audio'
    dst = ROOT / app / 'public' / 'audio-f'
    dst.mkdir(parents=True, exist_ok=True)
    male = json.loads((src / 'manifest.json').read_text(encoding='utf-8'))
    file_to_text = {}
    for text, fname in male.items():
        if not is_letter(text):
            file_to_text.setdefault(fname, text)
    todo = [(f, t) for f, t in sorted(file_to_text.items()) if not (dst / f).exists() or (dst / f).stat().st_size == 0]
    print(f'[{app}] 새로 만들 녹음 {len(todo)} / 전체 {len(file_to_text)}', flush=True)
    sem = asyncio.Semaphore(4)
    failed = []

    async def one(f, t):
        async with sem:
            try:
                (dst / f).parent.mkdir(parents=True, exist_ok=True)
                await speak(clean(t), VOICE, dst / f, retries=3)
            except Exception:
                failed.append((f, t))

    rest = todo
    for rnd in range(1, 6):
        failed.clear()
        for i in range(0, len(rest), 80):
            await asyncio.gather(*(one(f, t) for f, t in rest[i:i + 80]))
            print(f'[{app} {rnd}회차] {min(i + 80, len(rest))}/{len(rest)}', flush=True)
        if not failed:
            break
        rest = list(failed)
        await asyncio.sleep(30 * rnd)
    bad = {f for f, _ in failed}
    manifest = {t: f for t, f in male.items() if f in file_to_text and f not in bad and (dst / f).exists()}
    (dst / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding='utf-8')
    print(f'[{app}] 완료: 목록 {len(manifest)}개, 실패 {len(bad)}개', [t for _, t in failed][:10], flush=True)


async def main():
    for app in APPS:
        await one_app(app)

asyncio.run(main())
