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
python pali_tts.py "Buddhaṃ saraṇaṃ gacchāmi" buddham.mp3
python pali_tts.py --script "cakkaṃva vahato padaṃ"     # 바뀐 텔루구 글자만 보기
```

여러 문장은 Python에서 `to_telugu()`와 `make_mp3()`를 불러 쓰면 됩니다.

### 2. 웹페이지에서 기기 목소리로 읽기 (JavaScript)

브라우저에 깔린 목소리 가운데 **텔루구어 → 칸나다어 → 힌디어** 순으로 골라, 그 언어에 맞게 글자를 바꿔 읽힙니다. 힌디어 목소리밖에 없을 때는 낱말 끝 a가 빠지지 않게 보정합니다.

```js
import { pickPaliVoice, textForVoice } from './pali-voice.js'

const voice = pickPaliVoice(speechSynthesis.getVoices())
const u = new SpeechSynthesisUtterance(textForVoice('Buddhaṃ saraṇaṃ gacchāmi', voice.lang))
u.voice = voice; u.lang = voice.lang; u.rate = 0.6
speechSynthesis.speak(u)
```

## 알아 둘 점

- 장모음과 단모음을 구분하기는 하지만, 빠알리어처럼 정확히 두 배 길이는 아닙니다.
- `edge-tts`는 마이크로소프트의 온라인 읽어 주기 서비스를 쓰는 비공식 도구입니다. 만든 소리를 상업적으로 쓰려면 마이크로소프트의 이용 조건을 따로 확인하세요.
- 앱에서 실제로 쓰는 원본 코드: [`primer/scripts/tts/`](../../primer/scripts/tts/) (녹음 만들기), [`shared/pali-voice.ts`](../../shared/pali-voice.ts) (기기 목소리)

## 라이선스

이 폴더의 코드는 MIT 라이선스입니다. 자유롭게 쓰고, 고치고, 나눠 주세요.

---

### English (short)

Pali has no TTS voice of its own. Feeding Pali to a Hindi voice drops word-final *a* and reads *ph* as "f". This method converts IAST Pali → Devanagari → **Telugu script** (same Unicode layout), respells **ñ as "ny"** and **ph as p + h**, and reads it with Microsoft's Telugu voice `te-IN-MohanNeural` at −30% speed. Telugu keeps final vowels and vowel length, so it sounds much closer to Pali. `pali_tts.py` makes mp3 files (edge-tts); `pali-voice.js` does the same with the browser's own voices (Telugu → Kannada → Hindi). MIT License.
