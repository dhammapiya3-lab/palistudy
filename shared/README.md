# 공용 코드 (두 앱이 함께 씀)

이 폴더의 파일은 **경전으로 배우기(suttalog)** 와 **빠알리 프라이머(primer)** 가 함께 씁니다.

- 빌드·개발 서버를 켤 때 `scripts/sync-shared.mjs` 가 이 폴더를 각 앱의 `src/shared/` 로 복사합니다.
- `src/shared/` 는 복사본이라 git에 올리지 않습니다. **고칠 때는 언제나 여기(/shared)를 고치세요.**
- 앱마다 다른 것(저장 이름, 소리 재생, 과 이름)은 각 앱이 넘겨줍니다.

| 파일 | 하는 일 |
|---|---|
| `pali-hangul.ts` | 빠알리 로마자 → 한글 발음 (scripts/pali_hangul.py 와 같은 규칙) |
| `pali-voice.ts` | 기기 목소리로 읽을 때의 목소리 고르기·글자 변환 (녹음 mp3와 같은 규칙) |
| `library-store.ts` | 내 서재 저장소 (책갈피·붙여넣은 글) |
| `Library.tsx` | 내 서재 화면 |
