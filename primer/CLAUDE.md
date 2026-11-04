# 빠알리 프라이머 (SuttaLog2)

빠알리어 문법 학습앱 — De Silva's Pali Primer 기반, Duolingo 스타일

## 기술 스택

React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + Firebase (동기화)
배포: GitHub Pages (Actions) | 포트: 3023 (변경 금지)

## 핵심 규칙

1. **SSOT**: 설정값/상수는 config 한 곳에 정의
2. **코드 주석 한국어**, 에러 처리 필수 (try-catch)
3. **Safe Parsing**: 모든 parseFloat에 기본값 필수
4. **파일 200줄 제한**
5. **과목 자유 접근** — 진도 잠금 없음 (모든 과 바로 진입)
6. **캐시 방지** — 빌드 해시 + no-cache 메타태그

## 개발 명령어

```bash
npm run dev       # 개발서버 :3023
npm run build     # tsc + vite build → dist/
npm run preview   # 프로덕션 프리뷰 :3023
```

## 명세서

- [PRD.md](PRD.md) — 기능 명세, 폴더 구조, 배포
- [Tasks.md](Tasks.md) — 작업 체크리스트
- [TaskExecution.md](TaskExecution.md) — 테스트/검증 계획

## 자기 검증

위 규칙을 위반하는 코드를 작성하려 할 때:
1. 즉시 중단하고 "⚠️ SPEC 위반: [항목]" 경고 출력
2. 사용자에게 승인 요청
3. 승인 없이 진행 금지
