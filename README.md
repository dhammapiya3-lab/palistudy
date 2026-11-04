# dhammapiya

테라와다불교 빠알리어 공부 법보시 앱 모음

사이트: https://dhammapiya3-lab.github.io/dhammapiya/

| 폴더 | 주소 | 내용 |
|---|---|---|
| `portal/` | `/dhammapiya/` | 대문 — 앱 고르는 첫 화면 |
| `primer/` | `/dhammapiya/primer/` | 빠알리 프라이머 — De Silva의 Pali Primer 기반 문법 학습 (구 SuttaLog2) |
| `suttalog/` | `/dhammapiya/suttalog/` | 경전으로 배우기 — 삼귀의·오계부터 대념처경까지 (SuttaLog) |
| `memos/` | — | 앱에서 올린 교정 메모 (자동 생성) |

## 배포

`main` 브랜치에 올리면 `.github/workflows/deploy.yml`이 두 앱을 빌드하고 대문과 합쳐서 GitHub Pages에 자동 배포합니다.

## 각 앱 따로 실행 (개발)

```bash
cd primer   && npm install && npm run dev   # http://localhost:3023/dhammapiya/primer/
cd suttalog && npm install && npm run dev   # http://localhost:3022/dhammapiya/suttalog/
```

## 새 앱 추가하기

1. 새 폴더를 만들고 `vite.config.ts`의 `base`를 `/dhammapiya/<폴더이름>/`으로 설정
2. `deploy.yml`에 빌드 단계와 `cp -r <폴더>/dist site/<폴더>` 추가
3. `portal/index.html`에 버튼 추가
4. 캐시·저장소 이름이 다른 앱과 겹치지 않게 고유한 접두어 사용 (`pali-`, `suttalog-` 등)
