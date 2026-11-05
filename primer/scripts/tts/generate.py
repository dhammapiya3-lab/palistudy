"""빠알리 발음 mp3 생성 (edge-tts)

사용법:
  python generate.py sample          → 문제 단어를 여러 목소리로 만들어 비교용 폴더에 저장
  python generate.py full <목소리키>  → 앱에서 쓰는 모든 문장을 고른 목소리로 다시 만듦
  python generate.py add <목소리키>   → extra-texts.json 중 아직 녹음이 없는 것만 새로 만듦
"""
import asyncio
import json
import sys
from pathlib import Path

import edge_tts

from pali_script import CONSONANTS, VOWELS_IND, to_script

HERE = Path(__file__).resolve().parent
PRIMER = HERE.parent.parent
RATE = '-30%'

# 비교할 목소리: 키 → (edge-tts 목소리, 문자, 설명)
VOICES = {
    'hi': ('hi-IN-MadhurNeural', 'devanagari', '힌디어 (지금 쓰는 목소리)'),
    'kn': ('kn-IN-GaganNeural', 'kannada', '칸나다어'),
    'kn_ph': ('kn-IN-GaganNeural', 'kannada_ph', '칸나다어 남 · p와 h 따로 적기 (ph 든 낱말 하나)'),
    'te_ph': ('te-IN-MohanNeural', 'telugu_ph', '텔루구어 남 · p와 h 따로 적기 (ph 든 낱말·문장)'),
    'te': ('te-IN-MohanNeural', 'telugu', '텔루구어 (ñ → ny 보정)'),
    'te0': ('te-IN-MohanNeural', 'telugu_raw', '텔루구어 (보정 전)'),
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


# 텔루구어 목소리는 글자 하나만 주면 소리를 못 냄 → 낱글자(자모와 발음 2의 41자)는 칸나다어 목소리로
LETTER_VOICE = 'kn'


def is_letter(text: str) -> bool:
    t = text.strip().lower()
    return t in CONSONANTS or t in VOWELS_IND or t in ('ṃ', 'ṁ')


def spoken_form(text: str) -> str:
    """자음 글자 하나(k, kh …)는 '까'처럼 a를 붙여 읽고, ṃ은 '앙'으로 읽음"""
    t = text.strip()
    if t.lower() in CONSONANTS:
        return t + 'a'
    if t in ('ṃ', 'ṁ'):
        return 'aṃ'
    return t


# ñ 들어간 단어 확인용
NY_SAMPLES = [
    'sabbaññū', 'vadaññū', 'mattaññū', 'puñña', 'paññā', 'kaññā',
    'kataññutā', 'ñāṇa', 'dānañca', 'pañca', 'Buddhaṃ saraṇaṃ gacchāmi',
]


async def speak(text: str, voice_key: str, out: Path, retries: int = 3) -> str:
    # ph가 든 녹음(낱말·문장)은 사용자가 고른 소리: 텔루구어 남 · p와 h 따로 적기
    # (글자 ph 하나는 글자 녹음을 씀)
    if voice_key == 'te' and 'ph' in text.lower() and not is_letter(text):
        voice_key = 'te_ph'
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


async def run_sample(keys=None, texts=None, folder='tts-samples'):
    keys = keys or [k for k in VOICES if k != 'te0']
    out_dir = PRIMER / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    rows = []
    for i, text in enumerate(texts or SAMPLES):
        row = {'text': text, 'files': {}, 'native': {}}
        for key in keys:
            name = f'{i:02d}_{key}.mp3'
            row['native'][key] = await speak(text, key, out_dir / name)
            row['files'][key] = name
            print(f'{name}  {text}  →  {row["native"][key]}')
        rows.append(row)
    voices = {k: VOICES[k][2] for k in keys}
    (out_dir / 'samples.json').write_text(
        json.dumps({'voices': voices, 'rows': rows}, ensure_ascii=False, indent=1), encoding='utf-8')


async def run_add(voice_key: str):
    """extra-texts.json 중 manifest에 없는 문장만 새로 녹음"""
    audio = PRIMER / 'public' / 'audio'
    manifest = json.loads((audio / 'manifest.json').read_text(encoding='utf-8'))
    extra = json.loads((HERE / 'extra-texts.json').read_text(encoding='utf-8'))
    known = {t.lower() for t in manifest}
    used = set(manifest.values())
    n = 0
    todo = []
    for text in extra:
        if text.lower() in known:
            continue
        while f'add_{n:04d}.mp3' in used:
            n += 1
        fname = f'add_{n:04d}.mp3'
        used.add(fname)
        todo.append((fname, text))
        known.add(text.lower())
    sem = asyncio.Semaphore(3)
    failed = []

    async def one(fname, text):
        async with sem:
            try:
                vk = LETTER_VOICE if is_letter(text) else voice_key
                await speak(text, vk, audio / fname, retries=2)
            except Exception:
                failed.append((fname, text))

    rest = list(todo)
    for rnd in range(1, 6):
        failed.clear()
        await asyncio.gather(*(one(f, t) for f, t in rest))
        if not failed:
            break
        print(f'[{rnd}회차] 실패 {len(failed)}개 → 다시')
        rest = list(failed)
        await asyncio.sleep(30 * rnd)
    if failed:
        raise SystemExit(f'끝까지 실패: {[t for _, t in failed]}')
    for fname, text in todo:
        manifest[text] = fname
    (audio / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'새로 녹음: {len(todo)}개')


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

    # 음성 서버가 너무 빠른 요청을 막으므로: 동시 3개, 실패한 것은 쉬었다가 다시 (최대 5번)
    sem = asyncio.Semaphore(3)
    failed = []

    async def one(fname, text):
        async with sem:
            try:
                vk = LETTER_VOICE if is_letter(text) else voice_key
                await speak(text, vk, audio / fname, retries=2)
            except Exception:
                failed.append((fname, text))

    todo = sorted(file_to_text.items())
    for rnd in range(1, 6):
        failed.clear()
        for start in range(0, len(todo), 60):
            await asyncio.gather(*(one(f, t) for f, t in todo[start:start + 60]))
            print(f'[{rnd}회차] {min(start + 60, len(todo))}/{len(todo)}')
        if not failed:
            break
        print(f'[{rnd}회차] 실패 {len(failed)}개 → {30 * rnd}초 쉬고 다시')
        todo = list(failed)
        await asyncio.sleep(30 * rnd)
    if failed:
        raise SystemExit(f'끝까지 실패: {[t for _, t in failed]}')
    items = file_to_text

    (audio / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'완료: 파일 {len(items)}개, 새 단어 {n}개')


if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'sample'
    if mode == 'sample':
        asyncio.run(run_sample())
    elif mode == 'ny':
        asyncio.run(run_sample(['te0', 'te'], NY_SAMPLES, 'tts-samples/ny'))
    elif mode == 'add':
        asyncio.run(run_add(sys.argv[2]))
    elif mode == 'full':
        asyncio.run(run_full(sys.argv[2]))
    else:
        raise SystemExit('sample 또는 full')
