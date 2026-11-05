// 화면 표시 설정 — 큰 글씨 모드(suttalog-large-text).
// <html class="large-text"> 를 붙이면 index.css가 글자 크기 변수를 키움:
//   Tailwind text-xs/text-sm/text-base 와 --fs-body(본문)·--fs-note(해설) 가 함께 커짐.
export function applyLargeText(on: boolean): void {
  document.documentElement.classList.toggle('large-text', on)
}

export function applySavedDisplayPrefs(): void {
  applyLargeText(localStorage.getItem('suttalog-large-text') === 'true')
}
