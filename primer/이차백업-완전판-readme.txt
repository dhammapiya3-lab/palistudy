===============================================
SuttaLog2 프로젝트 이차백업 (완전판)
===============================================

백업 일시: 2026-04-13 08:40
백업 파일: 이차백업-완전판.tar.gz
파일 크기: 36MB
총 파일 수: 1,105개

===============================================
백업 내용
===============================================

✅ 포함된 항목 (모든 소스 + 데이터 + 오디오):

1. 소스 코드
   - src/ : 전체 React + TypeScript 소스
   - 모든 주석(코멘트) 포함

2. 메모 시스템
   - memo-images/ : 메모 첨부 이미지 12개
   - memos-backup.json : 메모 데이터 백업

3. 이미지 리소스
   - pdf-images/ : PDF 추출 이미지 (격변화 도표 등) 77개
   - test-*.png : 테스트 스크린샷 13개

4. 오디오 파일 (★ 포함됨)
   - pali-audio.zip (342KB)
   - pali-audio2.zip (2.4MB)
   - pali-audio3.zip (1.0MB)
   - pali-audio4.zip (749KB)
   - pali-audio5.zip (779KB)
   - pali-audio6.zip (726KB)
   - public/audio/pali-audio-2.zip

5. 정적 리소스
   - public/ : 아이콘, TTS manifest, 오디오 파일 등

6. 문서
   - PRD.md : 제품 요구사항 명세서
   - Tasks.md : 작업 체크리스트
   - TaskExecution.md : 테스트/검증 계획
   - CLAUDE.md : 프로젝트 규칙
   - README.md : 프로젝트 설명

7. 설정 파일
   - package.json, package-lock.json
   - tsconfig.*.json (TypeScript 설정)
   - vite.config.ts (Vite 설정)
   - firebase.json, firestore.* (Firebase 설정)
   - eslint.config.js

8. 데이터 파일
   - data/ : 데이터 파일
   - tts-texts.json, tts-batch-*.json
   - english-textbook.txt, korean-textbook.txt

9. 스크립트
   - *.mjs : 추출/처리 스크립트
   - *.ipynb : Colab 노트북 (TTS 생성용)

❌ 제외된 항목 (복원 시 재생성 가능):
   - node_modules/ : npm install로 재설치
   - dist/ : npm run build로 재생성
   - .git/ : Git 리포지토리 히스토리
   - .devbrowser/ : 개발 브라우저 세션
   - uploads/ : 업로드 임시 파일

===============================================
복원 방법
===============================================

1. 압축 해제:
   tar -xzf 이차백업-완전판.tar.gz -C 복원할경로/

2. 복원 경로로 이동:
   cd 복원할경로/

3. 의존성 설치:
   npm install

4. 개발 서버 실행:
   npm run dev
   # http://localhost:3023 에서 확인

5. 프로덕션 빌드:
   npm run build
   # dist/ 폴더에 빌드 결과 생성

6. 빌드 미리보기:
   npm run preview

===============================================
주요 파일 위치
===============================================

학습 데이터:
  - src/features/grammar/lesson-00.ts ~ lesson-29.ts
  - src/features/grammar/lessons.ts (전체 과 목록)

격변화 도표:
  - src/features/grammar/declension-tables.ts (19개 표)

TTS 시스템:
  - src/utils/pali-tts.ts (빠알리 음성 재생)
  - public/tts-manifest.json (853개 단어 매핑)
  - public/audio/ (mp3 파일들)

Firebase 동기화:
  - src/utils/sync.ts (Google 로그인, Firestore 동기화)

학습 기록:
  - src/utils/study-log.ts (날짜별 학습 시간/점수)

메모 시스템:
  - src/utils/memo.ts (메모 저장/관리)
  - src/components/MemoFab.tsx (메모 FAB)
  - memo-images/ (첨부 이미지)

화면:
  - src/features/home/Home.tsx (홈)
  - src/features/courses/Courses.tsx (과목)
  - src/features/grammar/GrammarLearn.tsx (학습 엔진)
  - src/features/review/Review.tsx (복습)
  - src/features/settings/Settings.tsx (설정)

===============================================
백업 완전성 확인
===============================================

✅ 소스 코드 (모든 주석 포함)
✅ 메모 + 이미지
✅ 오디오 파일 (대용량 zip 포함)
✅ 문서 및 명세서
✅ 설정 파일
✅ 데이터 파일
✅ 스크립트

이 백업으로 프로젝트를 100% 복원할 수 있습니다.

===============================================
