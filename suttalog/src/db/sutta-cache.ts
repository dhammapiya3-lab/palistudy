// 경전 캐시 CRUD
import { getDB } from './index'
import type { CacheEntry } from '../types'

export async function getCache<T>(key: string): Promise<CacheEntry<T> | undefined> {
  const db = await getDB()
  const entry = await db.get('sutta-cache', key)
  if (!entry) return undefined
  return {
    data: entry.data as T,
    cachedAt: entry.cachedAt,
    expiresAt: entry.expiresAt,
  }
}

export async function setCache<T>(key: string, entry: CacheEntry<T>): Promise<void> {
  const db = await getDB()
  await db.put('sutta-cache', {
    key,
    data: entry.data,
    cachedAt: entry.cachedAt,
    expiresAt: entry.expiresAt,
  })
}

// 만료된 캐시 정리
export async function cleanExpiredCache(): Promise<number> {
  const db = await getDB()
  const tx = db.transaction('sutta-cache', 'readwrite')
  const store = tx.objectStore('sutta-cache')
  let cursor = await store.openCursor()
  let deleted = 0
  const now = Date.now()

  while (cursor) {
    if (cursor.value.expiresAt < now) {
      await cursor.delete()
      deleted++
    }
    cursor = await cursor.continue()
  }

  await tx.done
  return deleted
}
