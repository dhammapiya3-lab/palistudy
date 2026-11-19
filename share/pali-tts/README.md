# 빠알리어 발음 소리 만들기 — 텔루구어 목소리 방식

[palistudy](https://dhammapiya3-lab.github.io/palistudy/)(빠알리 프라이머 · 경전으로 배우기)에서 빠알리어 발음 소리를 만드는 방식입니다. 법보시로 공개하니 자유롭게 가져다 쓰세요.

## 한눈에

빠알리어 전용 음성 합성(TTS) 목소리는 없습니다. 그래서 흔히 **힌디어 목소리**에 빠알리어를 읽히는데, 힌디어는 낱말 끝 a를 빼고 읽습니다(cakkaṃva → "짝깡우"). 또 ph를 f로 읽는 등 빠알리어와 어긋나는 데가 많습니다.

이 방식은 **텔루구어 목소리**를 씁니다. 텔루구어는 낱말 끝 모음을 그대로 읽고 장모음과 단모음을 구분해서 빠알리어에 훨씬 가깝습니다. 여러 언어의 목소리(힌디어, 칸나다어, 텔루구어, 싱할라어)를 직접 들어 비교한 끝에 고른 것입니다.

| 단계 | 하는 일 |
|---|---|
| 1 | 빠알리 로마자(ā ī ū ṃ ṅ ñ ṭ ḍ ṇ ḷ)를 데바나가리로 바꿈 |
| 2 | 데바나가리를 텔루구 문자로 옮김. 두 문자는 유니코드 배열이 같아 글자 위치만 옮기면 됨 |
| 3 | 텔루구어 목소리가 잘못 읽는 두 가지를 고쳐 적음 |
| 4 | 마이크로소프트 텔루구어 목소리 `te-IN-MohanNeural`로 30% 느리게 읽힘 |

3단계에서 고치는 두 가지는 이렇습니다.
- **ñ:** 텔루구어 목소리는 ఞ(ñ)를 n으로 읽어 버립니다. 그래서 'ny'로 적습니다. 예: ñāṇa → ny-āṇa, puñña → pun-nya. 단 ñc·ñj·ñh는 n으로 충분합니다(pañca, pañha).
- **ph:** f로 읽지 않도록 p와 h를 따로 적습니다(phala).

## 파일

| 파일 | 쓰임 |
|---|---|
| [`pali_tts.py`](pali_tts.py) | mp3 녹음 만들기 (Python, edge-tts) |
| [`pali-voice.js`](pali-voice.js) | 웹페이지에서 휴대폰·컴퓨터의 기기 목소리로 바로 읽기 (JavaScript) |

### 1. mp3 녹음 만들기 (Python)

```bash
pip install edge-tts
python pali_tts.py "Buddhaṃ saraṇaṃ gacchāmi" buddham.mp3            # 남성 목소리 (Mohan)
python pali_tts.py --female "Buddhaṃ saraṇaṃ gacchāmi" buddham-f.mp3  # 여성 목소리 (Shruti)
python pali_tts.py --script "cakkaṃva vahato padaṃ"     # 바뀐 텔루구 글자만 보기
```

여러 문장은 Python에서 `to_telugu()`와 `make_mp3(text, out, female=False)`를 불러 쓰면 됩니다.

### 2. 웹페이지에서 기기 목소리로 읽기 (JavaScript)

브라우저에 깔린 목소리 가운데 **텔루구어 → 칸나다어 → 힌디어** 순으로 골라, 그 언어에 맞게 글자를 바꿔 읽힙니다. 힌디어 목소리밖에 없을 때는 낱말 끝 a가 빠지지 않게 보정합니다.

```js
import { pickPaliVoice, textForVoice } from './pali-voice.js'

const voice = pickPaliVoice(speechSynthesis.getVoices())        // 여성 목소리를 먼저: pickPaliVoice(voices, 'f')
const u = new SpeechSynthesisUtterance(textForVoice('Buddhaṃ saraṇaṃ gacchāmi', voice.lang))
u.voice = voice; u.lang = voice.lang; u.rate = 0.6
speechSynthesis.speak(u)
```

### 3. 이미 만든 녹음 가져다 쓰기

앱에서 쓰는 빠알리어 문장 녹음(mp3)이 남성·여성 두 가지로 들어 있습니다. 각 폴더의 `manifest.json`이 `{ "빠알리어 글": "파일 이름" }` 목록입니다.

| 앱 | 남성 (Mohan) | 여성 (Shruti) |
|---|---|---|
| 빠알리 프라이머 (낱말·예문) | [`primer/public/audio/`](../../primer/public/audio/) | [`primer/public/audio-f/`](../../primer/public/audio-f/) |
| 경전으로 배우기 (경전 구절) | [`suttalog/public/audio/`](../../suttalog/public/audio/) | [`suttalog/public/audio-f/`](../../suttalog/public/audio-f/) |

앱에 문장이 늘어나면 두 목소리 녹음도 자동으로 함께 늘어납니다. 녹음은 마이크로소프트 목소리로 만든 것이라 아래 '알아 둘 점'의 이용 조건이 그대로 적용됩니다(MIT 라이선스는 코드에만 해당).

## 알아 둘 점

- 장모음과 단모음을 구분하기는 하지만, 빠알리어처럼 정확히 두 배 길이는 아닙니다.
- `edge-tts`는 마이크로소프트의 온라인 읽어 주기 서비스를 쓰는 비공식 도구입니다. 만든 소리를 상업적으로 쓰려면 마이크로소프트의 이용 조건을 따로 확인하세요.
- 앱에서 실제로 쓰는 원본 코드: [`primer/scripts/tts/`](../../primer/scripts/tts/) (녹음 만들기), [`shared/pali-voice.ts`](../../shared/pali-voice.ts) (기기 목소리)

## 늘 최신으로

이 폴더는 palistudy 앱이 실제로 쓰는 규칙과 **자동으로 같게 유지**됩니다. 앱에서 발음 규칙을 고치면 이 폴더도 바로 바뀝니다.

- `pali_tts.py`가 Python 규칙의 원본입니다. 앱의 녹음 스크립트가 이 파일을 그대로 가져다 씁니다.
- `pali-voice.js`는 앱의 `shared/pali-voice.ts`에서 자동으로 만들어집니다. 두 규칙이 서로 같은지 앱 문장 2천여 개로 매번 확인합니다.

## 라이선스

이 폴더의 코드는 [MIT 라이선스](LICENSE)입니다. 자유롭게 쓰고, 고치고, 나눠 주세요. 가져다 쓸 때 라이선스 문구만 함께 남겨 주시면 됩니다.

---

### English (short)

Pali has no TTS voice of its own. Feeding Pali to a Hindi voice drops word-final *a* and reads *ph* as "f". This method converts IAST Pali → Devanagari → **Telugu script** (same Unicode layout), respells **ñ as "ny"** and **ph as p + h**, and reads it with Microsoft's Telugu voice at −30% speed — male `te-IN-MohanNeural` (default) or female `te-IN-ShrutiNeural` (`--female`). Telugu keeps final vowels and vowel length, so it sounds much closer to Pali. `pali_tts.py` makes mp3 files (edge-tts); `pali-voice.js` does the same with the browser's own voices (Telugu → Kannada → Hindi; `pickPaliVoice(voices, 'f')` prefers a female voice). Ready-made mp3s (male and female, with `manifest.json`) are in `primer/public/audio(-f)/` and `suttalog/public/audio(-f)/`; as Microsoft voice output, Microsoft's terms apply to them (the MIT License covers the code only). MIT License.
