// 빠알리어 사전 API
import { API_CONFIG } from '../config/api'
import { cachedFetch } from './client'

const { ENDPOINTS, CACHE_DURATION } = API_CONFIG

// 사전 전체 엔트리
export interface DictionaryFullEntry {
  dictname: string
  lang: string
  entry: string
  grammar?: string
  definition: string
  xr?: string[]
}

export async function lookupWord(word: string): Promise<DictionaryFullEntry[]> {
  // 소문자 + 발음부호 제거 없이 그대로 조회
  const normalized = word.toLowerCase().trim()
  return cachedFetch<DictionaryFullEntry[]>(
    `${ENDPOINTS.DICTIONARY}/${normalized}`,
    CACHE_DURATION.DICTIONARY,
  )
}
