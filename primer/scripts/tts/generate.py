"""빠알리 발음 mp3 생성 (edge-tts)

사용법:
  python generate.py sample          → 문제 단어를 여러 목소리로 만들어 비교용 폴더에 저장
  python generate.py full <목소리키>  → 앱에서 쓰는 모든 문장을 고른 목소리로 다시 만듦
"""
import asyncio
import json
import sys
from pathlib import Path

import edge_tts

from pali_script import CONSONANTS, to_script

HERE = Path(__file__).resolve().parent
PRIMER = HERE.parent.parent
RATE = '-30%'

# 비교할 목소리: 키 → (edge-tts 목소리, 문자, 설명)
VOICES = {
    'hi': ('hi-IN-MadhurNeural', 'devanagari', '힌디어 (지금 쓰는 목소리)'),
    'kn': ('kn-IN-GaganNeural', 'kannada', '칸나다어'),
    'te': ('te-IN-MohanNeural', 'telugu', '텔루구어'),
    'si': ('si-LK-SameeraNeural', 'sinhala', '싱할라어 (스리랑카)'),
}

# 메모에 적힌 문제 단어 + 자주 듣는 문장
SAMPLES = [
    'kusuma', 'vana', 'jala', 'deva', 'nāvika',
    'puñña', 'paññā', 'kaññā',
    'sabbaññū', 'vadaññū', 'mattaññū',
    'kīḷati', 'rathena', 'ariyasaccaṃ', 'vijjhati', 'coressati',
    'uppatati', 'sannipatati',
    'Catasso imā bhikkhave parisā',
    'Buddhaṃ saraṇaṃ gacchāmi',
    'Namo tassa bhagavato arahato sammāsambuddhassa',
]


def spoken_form(text: str) -> str:
    """자음 글자 하나(k, kh …)는 '까'처럼 a를 붙여 읽고, ṃ은 '앙'으로 읽음"""
    t = text.strip()
    if t.lower() in CONSONANTS:
        return t + 'a'
    if t in ('ṃ', 'ṁ'):
        return 'aṃ'
    return t


async def speak(text: str, voice_key: str, out: Path, retries: int = 3) -> str:
    voice, script, _ = VOICES[voice_key]
    native = to_script(spoken_form(text), script)
    for n in range(retries):
        try:
            await edge_tts.Communicate(native, voice, rate=RATE).save(str(out))
            if out.stat().st_size > 0:
                return native
        except Exception as e:  # 네트워크 오류 등 → 잠시 후 재시도
            print(f'  재시도 {n + 1}: {text} ({e})')
            await asyncio.sleep(2 * (n + 1))
    raise RuntimeError(f'생성 실패: {text} / {voice_key}')


async def run_sample():
    out_dir = PRIMER / 'tts-samples'
    out_dir.mkdir(exist_ok=True)
    rows = []
    for i, text in enumerate(SAMPLES):
        row = {'text': text, 'files': {}, 'native': {}}
        for key in VOICES:
            name = f'{i:02d}_{key}.mp3'
            row['native'][key] = await speak(text, key, out_dir / name)
            row['files'][key] = name
            print(f'{name}  {text}  →  {row["native"][key]}')
        rows.append(row)
    voices = {k: v[2] for k, v in VOICES.items()}
    (out_dir / 'samples.json').write_text(
        json.dumps({'voices': voices, 'rows': rows}, ensure_ascii=False, indent=1), encoding='utf-8')


async def run_full(voice_key: str):
    """manifest.json의 모든 문장을 다시 만들고, 빠진 단어도 추가"""
    audio = PRIMER / 'public' / 'audio'
    manifest = json.loads((audio / 'manifest.json').read_text(encoding='utf-8'))
    extra_path = HERE / 'extra-texts.json'
    extra = json.loads(extra_path.read_text(encoding='utf-8')) if extra_path.exists() else []

    # 같은 파일을 가리키는 키(대소문자 변형)는 한 번만 생성
    file_to_text = {}
    for text, fname in manifest.items():
        file_to_text.setdefault(fname, text)
    # 새 단어는 새 파일 이름으로
    known = {t.lower() for t in manifest}
    n = 0
    for text in extra:
        if text.lower() in known:
            continue
        fname = f'add_{n:04d}.mp3'
        n += 1
        manifest[text] = fname
        file_to_text[fname] = text
        known.add(text.lower())

    sem = asyncio.Semaphore(6)

    async def one(fname, text):
        async with sem:
            await speak(text, voice_key, audio / fname)

    items = sorted(file_to_text.items())
    for start in range(0, len(items), 60):
        await asyncio.gather(*(one(f, t) for f, t in items[start:start + 60]))
        print(f'{min(start + 60, len(items))}/{len(items)}')

    (audio / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'완료: 파일 {len(items)}개, 새 단어 {n}개')


if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'sample'
    if mode == 'sample':
        asyncio.run(run_sample())
    elif mode == 'full':
        asyncio.run(run_full(sys.argv[2]))
    else:
        raise SystemExit('sample 또는 full')
