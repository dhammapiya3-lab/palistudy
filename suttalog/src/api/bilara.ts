// 경전 본문 API (Bilara 세그먼트)
import { API_CONFIG } from '../config/api'
import { cachedFetch } from './client'
import type { BilaraSutta } from './types'

const { ENDPOINTS, CACHE_DURATION, DEFAULT_TRANSLATOR } = API_CONFIG

// 경전 본문 (빠알리 + 번역)
export async function fetchSuttaText(
  uid: string,
  translator = DEFAULT_TRANSLATOR,
): Promise<BilaraSutta> {
  return cachedFetch<BilaraSutta>(
    `${ENDPOINTS.BILARA}/${uid}/${translator}`,
    CACHE_DURATION.BILARA,
  )
}
