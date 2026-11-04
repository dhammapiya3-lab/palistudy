// 현재 학습 세션 상태 (Zustand)
import { create } from 'zustand'
import type { ReadingMode } from '../types'

interface StudyState {
  // 현재 읽기 상태
  currentSuttaUid: string | null
  readingMode: ReadingMode
  setCurrentSutta: (uid: string | null) => void
  setReadingMode: (mode: ReadingMode) => void
  // 사전 팝업
  selectedWord: string | null
  setSelectedWord: (word: string | null) => void
  // 학습 세션 타이머
  sessionStartedAt: number | null
  startSession: () => void
  endSession: () => number // 경과 분 반환
}

export const useStudyStore = create<StudyState>()((set, get) => ({
  currentSuttaUid: null,
  readingMode: 'parallel',
  setCurrentSutta: (uid) => set({ currentSuttaUid: uid }),
  setReadingMode: (mode) => set({ readingMode: mode }),

  selectedWord: null,
  setSelectedWord: (word) => set({ selectedWord: word }),

  sessionStartedAt: null,
  startSession: () => set({ sessionStartedAt: Date.now() }),
  endSession: () => {
    const start = get().sessionStartedAt
    set({ sessionStartedAt: null })
    if (!start) return 0
    return Math.round((Date.now() - start) / 60000)
  },
}))
