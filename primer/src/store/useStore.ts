import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { localDateStr, localDateStrDaysAgo } from '../utils/date'
import { applyTheme, type ThemeSetting } from '../utils/theme'
import { markStudyDate } from '../utils/study-log'

interface AppState {
  // --- 진도 데이터 ---
  // 지금 보고 있는 단계 위치 — lessonId: stepIndex (예: 'lesson-01': 5)
  progress: Record<string, number>
  // 가장 멀리 간 단계 (되돌아가 다시 봐도 줄어들지 않음)
  best: Record<string, number>
  // 끝까지 마친 과 — 다시 학습해도 지워지지 않음
  completed: Record<string, boolean>
  setProgress: (lessonId: string, stepIndex: number) => void
  markCompleted: (lessonId: string) => void
  resetProgress: () => void

  // --- 사용자 설정 ---
  writingEnabled: boolean
  setWritingEnabled: (enabled: boolean) => void

  fontSize: string
  setFontSize: (size: string) => void

  theme: ThemeSetting
  setTheme: (theme: ThemeSetting) => void

  // --- 학습 통계 ---
  streak: number
  lastStudyDate: string | null // YYYY-MM-DD (기기 시간 기준)
  recordStudy: () => void
  resetStats: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      progress: {},
      best: {},
      completed: {},
      writingEnabled: true,
      fontSize: 'large',
      theme: 'system',
      streak: 0,
      lastStudyDate: null,

      // 진도 업데이트 (위치 + 가장 멀리 간 곳)
      setProgress: (lessonId, stepIndex) =>
        set((state) => ({
          progress: { ...state.progress, [lessonId]: stepIndex },
          best: { ...state.best, [lessonId]: Math.max(state.best[lessonId] || 0, stepIndex) },
        })),

      markCompleted: (lessonId) =>
        set((state) => ({ completed: { ...state.completed, [lessonId]: true } })),

      resetProgress: () => set({ progress: {}, best: {}, completed: {} }),

      // 설정 업데이트
      setWritingEnabled: (enabled) => set({ writingEnabled: enabled }),

      setFontSize: (size) => set({ fontSize: size }),

      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },

      // 학습 기록 — 하루 한 번, 한 단계 이상 공부했을 때 호출
      recordStudy: () => {
        const today = localDateStr()
        markStudyDate(today)
        const { lastStudyDate, streak } = get()

        if (lastStudyDate === today) return // 이미 오늘 기록됨

        const yesterday = localDateStrDaysAgo(1)
        const nextStreak = lastStudyDate === yesterday ? streak + 1 : 1

        set({
          lastStudyDate: today,
          streak: nextStreak
        })
      },

      resetStats: () => set({ streak: 0, lastStudyDate: null }),
    }),
    {
      name: 'suttalog2-storage', // localStorage 키 이름 (바꾸면 기존 진도가 사라지므로 유지)
      storage: createJSONStorage(() => localStorage),
      // 저장하는 값만 (함수 제외)
      partialize: (s) => ({
        progress: s.progress,
        best: s.best,
        completed: s.completed,
        writingEnabled: s.writingEnabled,
        fontSize: s.fontSize,
        theme: s.theme,
        streak: s.streak,
        lastStudyDate: s.lastStudyDate,
      }),
      // 예전 저장 형식에 없던 값 채우기
      merge: (persisted, current) => {
        const p = (persisted || {}) as Partial<AppState>
        return {
          ...current,
          ...p,
          progress: p.progress || {},
          best: p.best || {},
          completed: p.completed || {},
        }
      },
    }
  )
)

/** 홈에 보여 줄 연속 학습일 — 어제·오늘 공부하지 않았으면 끊긴 것(0) */
export function getDisplayStreak(streak: number, lastStudyDate: string | null): number {
  if (!lastStudyDate) return 0
  if (lastStudyDate === localDateStr() || lastStudyDate === localDateStrDaysAgo(1)) return streak
  return 0
}
