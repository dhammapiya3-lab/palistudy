// 경전 구절 낱말 풀이 — 같은 과의 낱말 카드(teach)와 그 구절의 노트에서 찾음
import type { StepType } from './types'
import { SHORT_GLOSS, VERSE_GLOSS_EXTRA } from './verse-gloss-extra'
import { GLOSS_ROWS } from './gloss-index.generated'

export interface Gloss {
  word: string
  pronKo?: string
  meaning: string
  grammar?: string
}

/** 찾기용 열쇠 — 대소문자·앞뒤 문장부호 무시 */
export const glossKey = (s: string) =>
  s.normalize('NFC').toLowerCase().replace(/^[\p{P}\s]+|[\p{P}\s]+$/gu, '')

let globalMap: Map<string, Gloss> | null = null
/** 모든 과·경전 앱의 낱말 카드 — 이 과에서 못 찾을 때 */
export function globalGloss(k: string): Gloss | undefined {
  if (!globalMap) {
    globalMap = new Map()
    for (const [word, pronKo, meaning, grammar] of GLOSS_ROWS) {
      const g = glossKey(word)
      if (g && !globalMap.has(g)) globalMap.set(g, { word, pronKo: pronKo || undefined, meaning, grammar: grammar || undefined })
    }
  }
  const short = SHORT_GLOSS[k]
  return globalMap.get(k) ?? (short ? { word: k, meaning: short[0], grammar: short[1] } : undefined)
}

/** 과의 낱말 카드 + 이 과의 보충 풀이(verse-gloss-extra.ts)로 풀이 사전 만들기 */
export function buildGlossary(steps: StepType[], lessonId?: string): Map<string, Gloss> {
  const map = new Map<string, Gloss>()
  for (const [w, [meaning, grammar]] of Object.entries((lessonId && VERSE_GLOSS_EXTRA[lessonId]) || {})) {
    map.set(glossKey(w), { word: w, meaning, grammar })
  }
  for (const s of steps) {
    if (s.type !== 'teach') continue
    const k = glossKey(s.word)
    if (!k || [...k].length <= 2) continue // 자모 한두 글자는 빼기
    if (map.has(k) && !map.get(k)!.pronKo) { map.set(k, { ...map.get(k)!, pronKo: s.pronKo }); continue }
    if (map.has(k)) continue
    map.set(k, { word: s.word, pronKo: s.pronKo, meaning: s.meaning, grammar: s.grammar })
  }
  return map
}

/**
 * 구절 노트의 '• 낱말 — 풀이' 줄을 풀이로 (낱말 카드에 없는 낱말 보충)
 * 예) '• bhagavato — 세존께 (여격; 형태는 소유격과 동일)'
 */
export function noteGlossary(note?: string): Map<string, Gloss> {
  const map = new Map<string, Gloss>()
  if (!note) return map
  for (const line of note.split('\n')) {
    const m = line.match(/^\s*(?:[•·-]\s*)?([\p{L}\p{M}]+)\s*[—–=]\s*(.+)$/u)
    if (m) {
      const k = glossKey(m[1])
      if (k && !map.has(k)) map.set(k, { word: m[1], meaning: m[2].trim() })
      continue
    }
    // 'bhagavā(세존)는 주격' 꼴 — 괄호 안 뜻만
    for (const p of line.matchAll(/([\p{L}\p{M}]{3,})\(([^()]+)\)/gu)) {
      if (!/[\u3131-\uD79D]/.test(p[2])) continue // 한글 풀이일 때만
      const k = glossKey(p[1])
      if (k && !map.has(k)) map.set(k, { word: p[1], meaning: p[2].trim() })
    }
  }
  return map
}
