// 경전 문장 낱말 뜻 찾기 — 이 과의 낱말 카드에 없을 때 다른 과의 낱말 카드·보충 풀이(gloss-extra.ts)에서 찾음
import { GLOSS_ROWS } from './gloss-index.generated'
import { normPali } from './pali-highlight'

export interface Gloss { type: 'teach'; word: string; pronKo: string; meaning: string; grammar: string; icon: string }

let map: Map<string, Gloss> | null = null
function index(): Map<string, Gloss> {
  if (map) return map
  map = new Map()
  for (const [word, pronKo, meaning, grammar] of GLOSS_ROWS) {
    const k = normPali(word)
    if (k && !map.has(k)) map.set(k, { type: 'teach', word, pronKo, meaning, grammar, icon: '' })
  }
  return map
}

/** 낱말(또는 칠한 글자 조각)의 뜻 — 못 찾으면 null */
export function lookupGloss(text: string): Gloss | null {
  const m = index()
  const k = normPali(text)
  return m.get(k) ?? m.get(k.replace(/n?ti$/, '')) ?? null
}
