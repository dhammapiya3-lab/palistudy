// 학습 진도 CRUD
import { getDB } from './index'
import type { StudyProgress, PathProgress, StudyActivity } from '../types'

// --- 경전 진도 ---

export async function getProgress(suttaUid: string): Promise<StudyProgress | undefined> {
  const db = await getDB()
  return db.get('progress', suttaUid)
}

export async function saveProgress(progress: StudyProgress): Promise<void> {
  const db = await getDB()
  await db.put('progress', progress)
}

export async function getRecentProgress(limit = 5): Promise<StudyProgress[]> {
  const db = await getDB()
  const all = await db.getAllFromIndex('progress', 'by-lastRead')
  return all.reverse().slice(0, limit)
}

export async function getProgressByPath(pathId: string): Promise<StudyProgress[]> {
  const db = await getDB()
  return db.getAllFromIndex('progress', 'by-path', pathId)
}

// --- 학습 경로 ---

export async function getPathProgress(pathId: string): Promise<PathProgress | undefined> {
  const db = await getDB()
  return db.get('path-progress', pathId)
}

export async function savePathProgress(progress: PathProgress): Promise<void> {
  const db = await getDB()
  await db.put('path-progress', progress)
}

export async function getAllPathProgress(): Promise<PathProgress[]> {
  const db = await getDB()
  return db.getAll('path-progress')
}

// --- 활동 기록 ---

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getTodayActivity(): Promise<StudyActivity> {
  const db = await getDB()
  const key = todayKey()
  const existing = await db.get('activity', key)
  return existing ?? { date: key, minutesStudied: 0, suttasRead: 0, cardsReviewed: 0 }
}

export async function updateActivity(
  updates: Partial<Omit<StudyActivity, 'date'>>,
): Promise<void> {
  const db = await getDB()
  const current = await getTodayActivity()
  await db.put('activity', {
    ...current,
    minutesStudied: current.minutesStudied + (updates.minutesStudied ?? 0),
    suttasRead: current.suttasRead + (updates.suttasRead ?? 0),
    cardsReviewed: current.cardsReviewed + (updates.cardsReviewed ?? 0),
  })
}

export async function getActivityRange(startDate: string, endDate: string): Promise<StudyActivity[]> {
  const db = await getDB()
  return db.getAll('activity', IDBKeyRange.bound(startDate, endDate))
}
