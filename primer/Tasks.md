# Tasks — 빠알리 프라이머 (SuttaLog2)

## 초기 구축 (완료)

- [x] React + Vite + TypeScript 프로젝트 생성
- [x] Tailwind CSS 4 설정 + CSS 변수 테마 (라이트/다크)
- [x] HashRouter 라우팅 설정
- [x] 하단 네비게이션 (홈/과목/복습/프로필)
- [x] GitHub Pages 배포 (Actions 워크플로우)
- [x] vite.config.ts base 경로 `/SuttaLog2/` 설정

## 학습 데이터 (완료)

- [x] types.ts — StepType 10종, LessonInfo 인터페이스
- [x] lesson-00 ~ lesson-29 전체 30개 데이터 파일
- [x] lessons.ts — 32과 배열 + getLessonById
- [x] 카테고리: 기초(2) + 남성명사(8) + 동사(9) + 여성+분사(6) + 고급(5)

## 화면 구현 (완료)

- [x] Home — 히어로 카드, 프로그레스 링, 통계, 게송
- [x] Courses — 카테고리 접이식, 검색, 원형 진도
- [x] GrammarLearn — 학습 엔진 (10가지 스텝 타입)
- [x] Review — 완료 과 랜덤 복습
- [x] Settings — 쓰기/소리 토글, 동기화, 초기화, 앱 정보
- [x] WritingCanvas — 손글씨 캔버스
- [x] pali-tts — 빠알리→데바나가리 TTS

## Firebase 동기화 (완료)

- [x] sync.ts — Firebase Auth + Firestore 동기화 모듈
- [x] panditarama-video 프로젝트 설정값 입력
- [x] Google 로그인/로그아웃
- [x] push/pull (디바운스 자동 + 수동)
- [x] 앱 시작 시 동기화 초기화

## 2026-03-22: UX 개선

- [x] 과목 잠금 해제 — 진도 무관 모든 과 자유 접근
- [x] 건너뛰기 — 퀴즈뿐 아니라 모든 스텝에서 가능
- [x] 목차 오버레이 — 상단 목차 버튼 → 스텝 목록 → 바로 이동
- [x] 캐시 방지 — index.html no-cache 메타태그
- [x] 캐시 방지 — vite 빌드 파일명 콘텐츠 해시 명시

## 2026-03-22: 학습 UX 개선 (추가)

- [x] 글씨 크기 조절 — 4단계 (작게/보통/크게/아주크게), 기본값 '크게'
- [x] 문법 상세 바로 표시 — 접이식(details) 제거, 즉시 노출

## 2026-03-22: 심화 자료

- [x] 격변화 도표 오버레이 — PDF 기반 19개 표 (`declension-tables.ts`)
- [x] 명사/대명사/형용사 8격 × 단수/복수

## 2026-03-22~23: TTS 음성 — 상세: [docs/PALI-TTS-AUDIO.md](docs/PALI-TTS-AUDIO.md)

- [x] edge-tts mp3 853개 생성 (hi-IN-MadhurNeural, 30% 감속)
- [x] manifest.json 1037엔트리 (대소문자 변형 포함)
- [x] teach/teach-grammar/verse 단어 클릭 → mp3 우선 + Web Speech API 폴백
- [x] TTS 텍스트 추출 스크립트 — `extract-tts-texts.mjs` (854개)
- [x] 슬래시(/) 수정 — 32개 재생성 (/ → 쉼표 치환)

### ❌ 실패 기록 (반복 방지)
- MMS-TTS-SAN: 비공개 전환 | MMS-TTS-HIN: 음절 불일치 | AI4Bharat: 인증 필요
- **교훈**: 샘플 검증 먼저, 배치 생성은 나중에

## 명세서 구축

- [x] PRD.md 작성
- [x] Tasks.md 작성
- [x] TaskExecution.md 작성
- [x] CLAUDE.md 갱신

## 2026-03-23: 학습 기록 + PWA + UX

- [x] 학습 캘린더 — 홈 화면 월별 달력, 날짜 클릭 → 상세 기록
- [x] study-log.ts — 날짜별 학습 시간/과목/점수/횟수/하트 저장
- [x] GrammarLearn 완료 시 학습 기록 자동 저장
- [x] 상단 브레드크럼 — 과 제목 + 현재 스텝 유형 표시
- [x] PWA 서비스워커 (`sw.js`) + 매니페스트 (`manifest.json`)
- [x] 진도 초기화에 연속학습일 + 학습기록 포함

## 2026-04-13: 사용자 메모 반영 작업 (총 125개 메모)

### 1. 한글 표기 수정 (우선순위: 높음)
- [x] ṃ 받침 → ㅇ 변경 (담맘→담망, 루-빰→루-빵, 짠담→짠당, 가-맘→가-망 등 50+곳)
- [x] 붓토 → 붓도 (전체)
- [x] 구격 → 도구격 (전체)
- [x] 사밧티 → 사왓티
- [x] cattasso → catasso, 짯따쏘 → 짜땃소 (lesson-17)
- [x] 사-랑 → 살-랑, 사-라- → 살-라- (lesson-17)
- [x] 아-로까 → 알-로까 (lesson-07)
- [x] 위야-디 → 뱌-디 (lesson-23)

### 2. 번역/의미 수정 (우선순위: 높음)
- [x] 처신하다 → 실천하다 (lesson-29)
- [x] 세존은 → 세존께서는 (전체, lesson-27)
- [x] 나는 그것이 아니며 → 그것은 내가 아니며 (lesson-26)
- [x] SN35.16 삭제 (lesson-26)
- [x] 너그러운 자 → 너그러운 자, 잘 베푸는 자 (lesson-24)
- [x] 이득(이치)를 아는 자 → 이치를 아는 자 (lesson-24)
- [x] 맛탄뉴- → 맛딴뉴-, 유명인 삭제 (lesson-24)
- [x] 선인들은 지혜롭게 된다 → 선인들은 지혜로운 자들이었다 (lesson-24)
- [x] 먹어야 할 → 먹어져야 할 (수동형, lesson-21 전체)
- [x] 우는 → 울고 있는, 가는 → 가고 있는 (lesson-20)
- [x] āhvayanti → avhayanti (lesson-20)
- [x] Ācariya → Ācariyo (lesson-19, lesson-22)
- [x] 막는다 → 막는다(피한다) (lesson-17)
- [x] 3인칭 명령형 설명 추가: ~하게 하라/~하기를! (기원) (lesson-15)
- [x] 그가 보시를 하게 해라 → 그가 보시를 하기를! (lesson-15)
- [x] sassamhi → sassaṃ (lesson-14)
- [x] 서게 될 것이다 → 설 것이다 (lesson-13)
- [x] 진리를 가르치기를 감행한다 → 진리를 가르치려고 노력한다 (lesson-10)
- [x] ussahanti = 노력하다/애쓰다 (lesson-10)
- [x] 핀다 → 열매 맺는다 (lesson-10)
- [x] rūpaṃ=색 → rūpaṃ=물질, 물질(색)은 → 물질은 (lesson-08)
- [x] ~에게서 → ~에서/~에 대해서 (처격, lesson-07)
- [x] 발우 → 그릇 (lesson-03)
- [x] 구덩이에서 → 구덩이로 (lesson-03)
- [x] saggena 삭게나 하늘로 (도구격 단수) (lesson-03)
- [x] yācakaṃ 거지를 (목적격) (lesson-02)
- [x] 사냥꾼은 사자를 위해 → 사냥꾼은 사자에게 (lesson-05, lesson-04)
- [x] 개를 구한다 → 개를 요청한다 (lesson-04)
- [x] 어부들은 → 어부는 (lesson-04)
- [x] Buddha 설명: "경전에서 가장 많이 만나는 단어. '진리를 깨달으신 분'이라는 뜻" (lesson-00)
- [x] 한 때 → 한때 (lesson-00)

### 3. TTS 발음 수정 (우선순위: 중간)
- [ ] 끝 'a' 발음 살리기: 꾸숨→꾸수마, 완→와나, 잘→잘라, 나윅→나위까, 데브→데와 (전체)
- [ ] 뿐나 → 뿐냐, 빤나 → 빤냐, 깐나 → 깐냐 (lesson-17, lesson-10)
- [ ] 삽반누 → 삽반뉴, 와단 → 와단뉴 (lesson-24)
- [ ] 맛탄뉴 → 맛딴뉴 (lesson-24)
- [ ] 끼띠 → 낄라띠 (lesson-05)
- [ ] 라테 → 라테나 (lesson-03 등)
- [ ] 아리야삿쯔 → 아리야삿짱 (lesson-02)
- [ ] 윗잣자띠 → 윗자띠 (lesson-02)
- [ ] 꼬렛사띠 → 쪼렛사띠, 타쌋띠 → 탓사티 (lesson-13)
- [ ] 웁빠띠 → 웁빠따띠, 산니빠띠 → 산니빠따띠 (lesson-07)
- [ ] 찟소 → 짜땃소 (lesson-17)

### 4. 예문 교체 (우선순위: 높음)
- [x] lesson-09: AI 예문 → atha kho āyasmā mahāmoggallāno... 로 교체
- [x] lesson-06: 소유격 예문 → esa bhagavato sāvakasaṅgho... 로 교체
- [x] lesson-05: 여격 예문 → Namo tassa bhagavato... 로 교체
- [x] lesson-04: 탈격 예문 → pānātipātā veramaṇi-sikkhāpadaṃ... (오계) 로 교체

### 5. 내용 삭제 (우선순위: 중간)
- [x] lesson-22: '직접 사역', '간접 사역' 표현 및 설명 전체 삭제
- [x] lesson-24: '유명인' 삭제
- [x] lesson-00: 자모 클릭 발음 기능 삭제 (제대로 작동 안 함)

### 6. 기능 추가/변경 (우선순위: 낮음)
- [x] 앱 제목: '빠알리어 공부 2' → '빠알리 프라이머' 변경
- [x] 퀴즈 하트 개수: 3개 → 5개로 증가
- [x] 퀴즈 3번 오답 시 퀴즈부터 재시작 옵션 추가
- [ ] 복습 화면: 드래그앤드롭으로 과목 순서 변경 기능
- [x] lesson-01-sandhi (연성법) 위치 → 마지막으로 이동
- [ ] 자모와 발음 2 추가 (3번째 앱 내용 기반)

## 미완료 / 향후 작업 (보류)

<!--
- [ ] 다크 모드 전환 UI (현재 CSS만 준비, 토글 없음)
- [ ] Zustand 상태 관리 활용 (설치됨, 미사용)
- [ ] 교재 내용 검증 — 32과 데이터 정확성 확인
- [ ] 접근성 개선 — 키보드 탐색, 스크린리더 지원
-->
