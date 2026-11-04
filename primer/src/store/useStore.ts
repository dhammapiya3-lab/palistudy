import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppState {
  // --- 진도 데이터 ---
  // lessonId: stepIndex (예: 'lesson-01': 5)
  progress: Record<string, number>
  setProgress: (lessonId: string, stepIndex: number) => void
  resetProgress: () => void

  // --- 사용자 설정 ---
  writingEnabled: boolean
  setWritingEnabled: (enabled: boolean) => void
  
  fontSize: 'small' | 'normal' | 'large' | 'huge'
  setFontSize: (size: 'small' | 'normal' | 'large' | 'huge') => void

  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void

  // --- 학습 통계 ---
  streak: number
  lastStudyDate: string | null // YYYY-MM-DD
  recordStudy: () => void
  resetStats: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      progress: {},
      writingEnabled: true,
      fontSize: 'large',
      theme: 'system',
      streak: 0,
      lastStudyDate: null,

      // 진도 업데이트
      setProgress: (lessonId, stepIndex) => 
        set((state) => ({
          progress: { ...state.progress, [lessonId]: stepIndex }
        })),

      resetProgress: () => set({ progress: {} }),

      // 설정 업데이트
      setWritingEnabled: (enabled) => set({ writingEnabled: enabled }),
      
      setFontSize: (size) => set({ fontSize: size }),

      setTheme: (theme) => {
        set({ theme })
        // 실제 DOM 테마 적용 로직은 별도 처리
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else if (theme === 'light') document.documentElement.classList.remove('dark')
      },

      // 학습 기록 로직
      recordStudy: () => {
        const today = new Date().toISOString().slice(0, 10)
        const { lastStudyDate, streak } = get()

        if (lastStudyDate === today) return // 이미 오늘 기록됨

        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const nextStreak = lastStudyDate === yesterday ? streak + 1 : 1

        set({
          lastStudyDate: today,
          streak: nextStreak
        })
      },

      resetStats: () => set({ streak: 0, lastStudyDate: null }),
    }),
    {
      name: 'suttalog2-storage', // localStorage 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
)
