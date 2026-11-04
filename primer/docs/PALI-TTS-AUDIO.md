# 빠알리어 TTS 음성 생성 가이드

## 현재 구성 (2026-03-23 성공)

| 항목 | 값 |
|------|-----|
| TTS 엔진 | **edge-tts** (Microsoft Edge 내장 TTS) |
| 음성 | `hi-IN-MadhurNeural` (힌디어 남성) |
| 속도 | `-30%` (30% 감속) |
| 변환 | 빠알리 로마자 → 데바나가리 → edge-tts |
| mp3 총 개수 | 853개 |
| manifest 엔트리 | 1037개 (대소문자 변형 포함) |
| 실행 환경 | Google Colab (GPU 불필요) |
| 비용 | 무료, 인증 불필요 |

## 파일 구조

```
프로젝트 루트/
├── public/audio/
│   ├── b1_0000.mp3 ~ b1_0426.mp3   # 배치1 (427개)
│   ├── b2_0000.mp3 ~ b2_0425.mp3   # 배치2 (426개)
│   ├── fix_0000.mp3 ~ fix_0031.mp3  # 슬래시 수정 (32개)
│   └── manifest.json                # 텍스트→파일명 매핑
├── tts-texts.json          # 전체 텍스트 목록 (854개)
├── tts-batch-1.json        # 배치1 텍스트 (427개)
├── tts-batch-2.json        # 배치2 텍스트 (426개)
├── tts-batch-fix.json      # 슬래시 포함 텍스트 (32개)
├── extract-tts-texts.mjs   # 텍스트 추출 스크립트
├── colab-tts-ai4bharat.ipynb   # 테스트 노트북 (원본, 7개 샘플)
├── colab-tts-batch-1.ipynb     # 배치1 생성 노트북
├── colab-tts-batch-2.ipynb     # 배치2 생성 노트북
├── colab-tts-fix.ipynb         # 슬래시 수정 노트북
└── src/utils/pali-tts.ts       # 앱 재생 로직
```

## 재생 흐름 (앱)

```
사용자 클릭 → speakPali(text)
  → manifest에서 mp3 파일명 조회 (대소문자 무시)
    → 있으면: Audio(mp3) 재생
    → 없으면: Web Speech API 폴백 (데바나가리 변환 → hi-IN)
```

## Colab 노트북 구조 (성공한 형태)

4개 셀로 구성. **이 구조를 변경하면 안 됨.**

### 셀 0: 마크다운 (제목)
### 셀 1: 패키지 설치
```python
!pip install -q edge-tts
print('설치 완료!')
```

### 셀 2: 데바나가리 변환 함수
- `pali_to_devanagari(roman)` — 로마자→데바나가리 변환
- 자음 33개 + 모음 8개 매핑
- 특수문자: `ṃ` → `ं` (아누스바라)
- 이 셀은 테스트/배치 노트북 모두 **동일**

### 셀 3: 생성 + ZIP 다운로드
- `edge_tts.Communicate(text, VOICE, rate=RATE)` → mp3 저장
- manifest.json 생성 (텍스트→파일명 매핑)
- ZIP 압축 → `files.download()` 자동 다운로드

## 새 텍스트 추가 시 절차

### 1단계: 텍스트 추출
```bash
node extract-tts-texts.mjs
# → tts-texts.json 갱신 (현재 854개)
```

### 2단계: 배치 분할
```javascript
// 기존 manifest에 없는 텍스트만 추출
const manifest = JSON.parse(fs.readFileSync('public/audio/manifest.json'));
const newTexts = allTexts.filter(t => !manifest[t] && !manifest[t.toLowerCase()]);
fs.writeFileSync('tts-batch-new.json', JSON.stringify(newTexts));
```

### 3단계: Colab 노트북 복사 + 실행
1. `colab-tts-ai4bharat.ipynb`를 복사
2. 셀 3의 텍스트 소스만 변경 (GitHub URL 또는 직접 배열)
3. 파일명 접두사 변경 (`b3_`, `fix2_` 등)
4. Colab 런타임 → 모두 실행
5. ZIP 다운로드 → `public/audio/`에 풀기

### 4단계: manifest 합치기
```bash
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('public/audio/manifest.json'));
// 새 배치 manifest 합치기
const newBatch = JSON.parse(fs.readFileSync('tts-batch-new.json'));
newBatch.forEach((text, i) => {
  const fname = 'b3_' + String(i).padStart(4, '0') + '.mp3';
  if (fs.existsSync('public/audio/' + fname)) {
    manifest[text] = fname;
    const lower = text.toLowerCase();
    if (lower !== text) manifest[lower] = fname;
  }
});
fs.writeFileSync('public/audio/manifest.json', JSON.stringify(manifest, null, 2));
"
```

### 5단계: 미사용 mp3 정리
```bash
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('public/audio/manifest.json'));
const used = new Set(Object.values(manifest));
fs.readdirSync('public/audio').filter(f => f.endsWith('.mp3')).forEach(f => {
  if (!used.has(f)) { fs.unlinkSync('public/audio/' + f); console.log('삭제:', f); }
});
"
```

## 주의사항 (실패 교훈)

### 슬래시(`/`) 처리
- `/` 포함 텍스트는 힌디어로 "바" 또는 "바따"로 읽힘
- **생성 시**: `text.replace('/', ',')` 로 쉼표 치환 후 생성
- **앱 폴백 시**: `paliToDevanagari()`에서 `/` → `,` 치환 (pali-tts.ts:79)

### Colab 노트북 이스케이프 주의
- ipynb JSON에서 `\n`, `\s` 등 이스케이프가 깨지기 쉬움
- **절대 JS로 ipynb 셀 내용을 문자열 조합하지 말 것**
- 방법: 성공한 노트북을 `cp`로 복사 → `NotebookEdit`로 셀 3만 교체
- 또는 Python 스크립트로 `json.dump()` 사용

### ❌ 실패한 TTS 모델 (사용 금지)
| 모델 | 실패 사유 |
|------|----------|
| `facebook/mms-tts-san` | 2026-03 비공개 전환, 인증 필요 |
| `facebook/mms-tts-hin` | 발음 품질 부족 — 음절 수 불일치, 속도 불균형 |
| `ai4bharat/indic-parler-tts` | Gated repo, HuggingFace 인증 필요 |

### ✅ 성공한 TTS
| 모델 | 결과 |
|------|------|
| **edge-tts `hi-IN-MadhurNeural`** | 고품질, 무료, 인증 불필요, 음절 정확 |
| Web Speech API (hi-IN) | 기기 의존적이지만 대체로 정확 |

## Colab 링크

| 용도 | 링크 |
|------|------|
| 테스트 (7개 샘플) | `colab-tts-ai4bharat.ipynb` |
| 배치 1 (427개) | `colab-tts-batch-1.ipynb` |
| 배치 2 (426개) | `colab-tts-batch-2.ipynb` |
| 슬래시 수정 (32개) | `colab-tts-fix.ipynb` |

Colab 열기 URL 형식:
```
https://colab.research.google.com/github/ReachToWisdom/SuttaLog2/blob/main/{노트북파일명}
```
