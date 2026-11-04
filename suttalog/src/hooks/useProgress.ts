// 학습 진도 훅
import { useState, useEffect, useCallback } from 'react'
import { getProgress, saveProgress, getRecentProgress } from '../db/progress-db'
import type { StudyProgress } from '../types'

// 특정 경전 진도
export function useSuttaProgress(suttaUid: string | undefined) {
  const [progress, setProgress] = useState<StudyProgress | null>(null)

  useEffect(() => {
    if (!suttaUid) return
    getProgress(suttaUid).then(p => setProgress(p ?? null))
  }, [suttaUid])

  const updateProgress = useCallback(async (update: Partial<StudyProgress>) => {
    if (!suttaUid) return
    const current = await getProgress(suttaUid)
    const updated: StudyProgress = {
      suttaUid,
      lastSegmentId: '',
      totalSegments: 0,
      readSegments: 0,
      lastReadAt: Date.now(),
      ...current,
      ...update,
    }
    await saveProgress(updated)
    setProgress(updated)
  }, [suttaUid])

  return { progress, updateProgress }
}

// 최근 읽은 경전 목록
export function useRecentSuttas(limit = 5) {
  const [recent, setRecent] = useState<StudyProgress[]>([])

  useEffect(() => {
    getRecentProgress(limit).then(setRecent)
  }, [limit])

  return recent
}
