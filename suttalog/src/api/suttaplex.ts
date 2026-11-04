// 경전 메타데이터 API
import { API_CONFIG } from '../config/api'
import { cachedFetch } from './client'
import type { Suttaplex, MenuItem } from './types'

const { ENDPOINTS, CACHE_DURATION } = API_CONFIG

// 메뉴 트리 (Nikaya 목록)
export async function fetchMenu(language = 'en'): Promise<MenuItem[]> {
  return cachedFetch<MenuItem[]>(
    `${ENDPOINTS.MENU}?language=${language}`,
    CACHE_DURATION.MENU,
  )
}

// 특정 경전 메타데이터
export async function fetchSuttaplex(uid: string): Promise<Suttaplex[]> {
  return cachedFetch<Suttaplex[]>(
    `${ENDPOINTS.SUTTAPLEX}/${uid}`,
    CACHE_DURATION.SUTTAPLEX,
  )
}
