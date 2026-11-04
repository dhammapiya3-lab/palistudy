// IndexedDB 초기화 (idb 라이브러리 사용)
import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

interface SuttaLogDB extends DBSchema {
  'sutta-cache': {
    key: string
    value: { key: string; data: unknown; cachedAt: number; expiresAt: number }
  }
  'progress': {
    key: string // suttaUid
    value: {
      suttaUid: string
      lastSegmentId: string
      totalSegments: number
      readSegments: number
      completedAt?: number
      lastReadAt: number
      pathId?: string
    }
    indexes: { 'by-lastRead': number; 'by-path': string }
  }
  'flashcards': {
    key: string // id
    value: {
      id: string
      suttaUid: string
      segmentId: string
      front: string
      back: string
      context?: string
      interval: number
      easeFactor: number
      repetitions: number
      nextReviewAt: number
      createdAt: number
      lastReviewAt?: number
    }
    indexes: { 'by-nextReview': number; 'by-sutta': string }
  }
  'path-progress': {
    key: string // pathId
    value: {
      pathId: string
      currentStepIndex: number
      completedSuttas: string[]
      startedAt: number
      lastActivityAt: number
    }
  }
  'activity': {
    key: string // date (YYYY-MM-DD)
    value: {
      date: string
      minutesStudied: number
      suttasRead: number
      cardsReviewed: number
    }
  }
}

const DB_NAME = 'suttalog'
const DB_VERSION = 1

let dbInstance: IDBPDatabase<SuttaLogDB> | null = null

export async function getDB(): Promise<IDBPDatabase<SuttaLogDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<SuttaLogDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 캐시 스토어
      if (!db.objectStoreNames.contains('sutta-cache')) {
        db.createObjectStore('sutta-cache', { keyPath: 'key' })
      }
      // 학습 진도
      if (!db.objectStoreNames.contains('progress')) {
        const progressStore = db.createObjectStore('progress', { keyPath: 'suttaUid' })
        progressStore.createIndex('by-lastRead', 'lastReadAt')
        progressStore.createIndex('by-path', 'pathId')
      }
      // 플래시카드
      if (!db.objectStoreNames.contains('flashcards')) {
        const cardStore = db.createObjectStore('flashcards', { keyPath: 'id' })
        cardStore.createIndex('by-nextReview', 'nextReviewAt')
        cardStore.createIndex('by-sutta', 'suttaUid')
      }
      // 학습 경로 진도
      if (!db.objectStoreNames.contains('path-progress')) {
        db.createObjectStore('path-progress', { keyPath: 'pathId' })
      }
      // 활동 기록
      if (!db.objectStoreNames.contains('activity')) {
        db.createObjectStore('activity', { keyPath: 'date' })
      }
    },
  })

  return dbInstance
}

export type { SuttaLogDB }
