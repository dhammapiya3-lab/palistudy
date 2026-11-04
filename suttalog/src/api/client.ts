// API 클라이언트 - fetch 래퍼 (캐시, 재시도, 오프라인)
import { API_CONFIG } from '../config/api'
import type { CacheEntry } from '../types'
import { getCache, setCache } from '../db/sutta-cache'

const { BASE_URL, RETRY } = API_CONFIG

// 지수 백오프 재시도
async function fetchWithRetry(url: string, attempt = 1): Promise<Response> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response
  } catch (error) {
    if (attempt >= RETRY.MAX_ATTEMPTS) throw error
    const delay = RETRY.BASE_DELAY * Math.pow(2, attempt - 1)
    await new Promise(resolve => setTimeout(resolve, delay))
    return fetchWithRetry(url, attempt + 1)
  }
}

// 캐시 우선 fetch
export async function cachedFetch<T>(
  endpoint: string,
  cacheDuration: number,
): Promise<T> {
  const cacheKey = endpoint

  // 1. 캐시 확인
  const cached = await getCache<T>(cacheKey)
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data
  }

  // 2. 오프라인이면 만료 캐시라도 반환
  if (!navigator.onLine && cached) {
    return cached.data
  }

  // 3. API 호출
  const url = `${BASE_URL}${endpoint}`
  const response = await fetchWithRetry(url)
  const data = await response.json() as T

  // 4. 캐시 저장
  const entry: CacheEntry<T> = {
    data,
    cachedAt: Date.now(),
    expiresAt: Date.now() + cacheDuration,
  }
  await setCache(cacheKey, entry)

  return data
}
