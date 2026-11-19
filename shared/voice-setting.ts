// 발음 목소리 설정 (남성/여성) — 두 앱이 함께 씀
// 같은 사이트라 저장 공간을 같이 쓰므로, 한 앱에서 바꾸면 다른 앱도 같은 목소리로 읽음
// 기본은 남성
// 내 서재는 따로 고를 수 있음(내 서재 안에서만) — 고른 적이 없으면 앱 전체 설정을 따름
import type { VoiceGender } from './pali-voice'

const KEY = 'palistudy-voice'
const listeners = new Set<(g: VoiceGender) => void>()

export function readVoiceGender(): VoiceGender {
  try { return localStorage.getItem(KEY) === 'f' ? 'f' : 'm' } catch { return 'm' }
}

export function saveVoiceGender(g: VoiceGender): void {
  try {
    if (g === 'f') localStorage.setItem(KEY, 'f'); else localStorage.removeItem(KEY)
  } catch { /* 저장 못 해도 이번에는 그대로 씀 */ }
  listeners.forEach(f => f(g))
}

/** 목소리 설정이 바뀔 때 알림 (설정 화면·내 서재가 서로 맞추도록) — 반환값을 부르면 그만 받음 */
export function onVoiceGenderChange(f: (g: VoiceGender) => void): () => void {
  listeners.add(f)
  return () => { listeners.delete(f) }
}

const LIBRARY_KEY = 'palistudy-library-voice'
/** 내 서재에서 고른 목소리 — 고른 적이 없으면 앱 전체 설정 */
export function readLibraryVoice(): VoiceGender {
  try {
    const v = localStorage.getItem(LIBRARY_KEY)
    if (v === 'f' || v === 'm') return v
  } catch { /* 무시 */ }
  return readVoiceGender()
}
export function saveLibraryVoice(g: VoiceGender): void {
  try { localStorage.setItem(LIBRARY_KEY, g) } catch { /* 저장 못 해도 이번에는 그대로 씀 */ }
}
