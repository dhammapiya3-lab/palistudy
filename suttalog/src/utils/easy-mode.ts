// 쉬운 화면 — 빠알리 프라이머의 '쉬운 화면'과 같은 동작
// 저장 키: 'suttalog-easy-mode' = 'on' | 'off'(기본)
// 켜면: 큰 글씨 · 메모 버튼·쓰기 문제 숨김 · 보기 2개 · 연꽃잎 없이 공부 · 구절이 나오면 소리 자동 재생
import { applyLargeText } from './display-prefs'

const KEY = 'suttalog-easy-mode'
const BEFORE = 'suttalog-large-before-easy' // 쉬운 화면을 켜기 전의 큰 글씨 설정

export function isEasyMode(): boolean {
  try { return localStorage.getItem(KEY) === 'on' } catch { return false }
}

/** 켜면 큰 글씨도 켬(끄면 켜기 전 상태로 되돌림) */
export function setEasyMode(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
    if (on) {
      localStorage.setItem(BEFORE, localStorage.getItem('suttalog-large-text') === 'true' ? 'true' : 'false')
      localStorage.setItem('suttalog-large-text', 'true')
      applyLargeText(true)
    } else {
      const prev = localStorage.getItem(BEFORE)
      if (prev !== null) {
        localStorage.setItem('suttalog-large-text', prev)
        applyLargeText(prev === 'true')
      }
      localStorage.removeItem(BEFORE)
    }
  } catch { /* 무시 */ }
}

/** 보기를 2개로 줄임 — 정답 + 오답 하나(seed로 늘 같은 오답). 순서는 원래 섞인 순서 유지 */
export function twoChoices(options: string[], answerText: string, seed: number): string[] {
  if (options.length <= 2 || !answerText || !options.includes(answerText)) return options
  const others = options.filter(o => o !== answerText)
  const keep = others[Math.abs(seed) % others.length]
  return options.filter(o => o === answerText || o === keep)
}
