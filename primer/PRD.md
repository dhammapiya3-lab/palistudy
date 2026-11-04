# 빠알리 프라이머 (SuttaLog2) — PRD

## 개요

De Silva's Pali Primer (2008) 교재 기반 빠알리어 문법 학습 앱.
Duolingo 스타일 인터랙티브 학습 + 경전 실례 + 손글씨 연습.
GitHub Pages 배포, Firebase 클라우드 동기화 지원.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프론트엔드 | React 19 + TypeScript + Vite 8 |
| 스타일 | Tailwind CSS 4 + CSS 변수 (라이트/다크) |
| 상태 관리 | Zustand (설치됨), localStorage (진도) |
| 동기화 | Firebase Auth (Google) + Firestore |
| 라우팅 | react-router-dom 7 (HashRouter) |
| 배포 | GitHub Pages (Actions 자동 배포) |
| 포트 | 개발서버 3023 (변경 금지) |

## 핵심 기능

### 1. 홈 (`/`)
- 시간대별 인사, 연속 학습일수, 오늘 학습 시간
- 히어로 카드: 현재 진행 과목 + 프로그레스 링 + CTA
- 오늘의 빠알리 게송 카드

### 2. 과목 (`/courses`)
- 5개 카테고리 접이식: 기초, 남성명사, 동사, 여성명사+분사, 고급
- 32과 전체 수록 (lesson-00 ~ lesson-29)
- 검색, 카테고리별 진행률, 원형 진도 표시
- **자유 접근** — 잠금 없이 모든 과목 바로 진입 가능

### 3. 학습 엔진 (`/learn/:lessonId`)
- 10가지 스텝 타입: intro, teach, teach-grammar, quiz, match-listen,
  match-reverse, writing, speak, arrange, verse
- 하트 시스템 (3개, 0이면 게임오버)
- 이어 학습 (localStorage 진도 자동 저장)
- **목차 오버레이** — 특정 스텝 바로 이동
- **건너뛰기** — 모든 스텝에서 가능
- 완료 화면 (정답수, 하트, 소요시간)

### 4. 복습 (`/review`)
- 완료한 과에서 랜덤 선택 복습
- 랜덤 복습 시작 버튼 + 완료 과 목록

### 5. 설정 (`/profile`)
- 쓰기 모드 on/off, 소리 on/off, 글씨 크기 4단계 (작게/보통/크게/아주크게, 기본: 크게)
- Firebase 동기화 (Google 로그인, 업로드/다운로드)
- 진도 초기화

### 6. Firebase 동기화
- panditarama-video 프로젝트 공유 (컬렉션 분리)
- `pali-primer-*` + 학습 통계 키 동기화
- 디바운스 push (학습 중 자동)

### 7. TTS 음성
- **edge-tts** mp3 853개 (hi-IN-MadhurNeural, 30% 감속) + Web Speech API 폴백
- 단어/문법 예문/경전 구절 클릭 시 발음 재생
- 설정에서 소리 on/off 가능
- 상세: [docs/PALI-TTS-AUDIO.md](docs/PALI-TTS-AUDIO.md)

### 8. 심화 자료 — 격변화 도표
- PDF 기반 19개 격변화 표 오버레이 (`declension-tables.ts`)
- 명사/대명사/형용사 격변화 8격 × 단수/복수 표시

## 사용자 시나리오

1. 첫 사용자 → 홈 → "학습 시작하기" → lesson-00 자모
2. 재방문 → 홈 → "이어서 학습하기" → 마지막 진행 과
3. 특정 과 확인 → 과목 → 카테고리 열기 → 원하는 과 선택
4. 복습 → 완료 과 랜덤 선택 → 학습
5. 기기 이동 → 설정 → Google 로그인 → 다운로드

## 폴더 구조

```
src/
├── main.tsx              # 엔트리 (HashRouter)
├── App.tsx               # 라우트 + 동기화 초기화
├── index.css             # 글로벌 스타일 + CSS 변수
├── components/
│   ├── BottomNav.tsx      # 하단 네비게이션
│   └── WritingCanvas.tsx  # 손글씨 캔버스
├── features/
│   ├── home/Home.tsx
│   ├── courses/Courses.tsx
│   ├── review/Review.tsx
│   ├── settings/Settings.tsx
│   └── grammar/
│       ├── types.ts           # StepType, LessonInfo
│       ├── lessons.ts         # LESSONS 배열 (32과)
│       ├── GrammarLearn.tsx   # 학습 UI 엔진
│       ├── lesson-*.ts        # 과별 데이터 (30개)
│       └── declension-tables.ts # 격변화 도표 19개
├── utils/
│   ├── sync.ts            # Firebase 동기화
│   ├── pali-tts.ts        # 빠알리 TTS (Web Speech API)
│   └── study-log.ts       # 학습 기록 (날짜별 시간/과목/점수/횟수)
extract-tts-texts.mjs          # TTS 텍스트 추출 (854개)
```

## 캐시 방지 전략

- index.html: `Cache-Control: no-cache, no-store, must-revalidate` 메타태그
- Vite 빌드: 파일명에 콘텐츠 해시 (`[name]-[hash].js`)
- 코드 변경 시 해시 변경 → 브라우저 강제 최신 로드

## 배포

```bash
npm run build    # tsc + vite build → dist/
git push main    # GitHub Actions → Pages 자동 배포
```

URL: `https://reachtowisdom.github.io/SuttaLog2/`
