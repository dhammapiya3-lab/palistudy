import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { localDateStr, localDateStrDaysAgo } from '../utils/date'
import { applyTheme, type ThemeSetting } from '../utils/theme'
import { markStudyDate } from '../utils/study-log'
import { LESSON_00_ID, migrateLesson00Index, migrateLesson00Best, migrateLesson00Session } from '../features/grammar/lesson-00-order'

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

  // 소리 속도 — 0.75(느리게) 또는 1(보통)
  audioRate: 0.75 | 1
  setAudioRate: (rate: 0.75 | 1) => void

  // 쉬운 화면 — 메모·쓰기 숨김, 큰 글씨, 경전 소리 자동 재생, 2지선다, 연꽃잎 없음
  easyMode: boolean
  setEasyMode: (on: boolean) => void

  // 하루 목표(분)
  dailyGoalMin: 5 | 10 | 15
  setDailyGoalMin: (min: 5 | 10 | 15) => void

  // 처음 실행 안내를 봤는지
  onboardingSeen: boolean
  setOnboardingSeen: (seen: boolean) => void

  // 1과를 마친 뒤 '글자 쓰기도 해 볼까요?'를 이미 물었는지
  writingOffered: boolean
  setWritingOffered: (offered: boolean) => void

  // --- 학습 통계 ---
  // 날짜별 공부 시간(초) — YYYY-MM-DD: 초
  studySeconds: Record<string, number>
  addStudySeconds: (sec: number) => void

  // 문제별 정답·오답 기록 — stepId: { ok, ng, last(YYYY-MM-DD) }
  quizRecords: Record<string, { ok: number; ng: number; last: string }>
  recordQuiz: (stepId: string, ok: boolean) => void

  // 본 낱말 — teach 단계 stepId: { lessonId, word, meaning, pronKo }
  seenWords: Record<string, { lessonId: string; word: string; meaning: string; pronKo: string }>
  markWordSeen: (stepId: string, info: { lessonId: string; word: string; meaning: string; pronKo: string }) => void

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
      // 처음 사용자는 쓰기 꺼짐 (기존 사용자는 저장된 값이 그대로 쓰임)
      writingEnabled: false,
      fontSize: 'large',
      theme: 'system',
      audioRate: 1,
      easyMode: false,
      dailyGoalMin: 10,
      onboardingSeen: false,
      writingOffered: false,
      studySeconds: {},
      quizRecords: {},
      seenWords: {},
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

      setAudioRate: (rate) => set({ audioRate: rate }),
      setEasyMode: (on) => set({ easyMode: on }),
      setDailyGoalMin: (min) => set({ dailyGoalMin: min }),
      setOnboardingSeen: (seen) => set({ onboardingSeen: seen }),
      setWritingOffered: (offered) => set({ writingOffered: offered }),

      addStudySeconds: (sec) => {
        if (!(sec > 0)) return
        const today = localDateStr()
        set((state) => ({
          studySeconds: { ...state.studySeconds, [today]: (state.studySeconds[today] || 0) + Math.round(sec) },
        }))
      },

      recordQuiz: (stepId, ok) => {
        if (!stepId) return
        const today = localDateStr()
        set((state) => {
          const prev = state.quizRecords[stepId] || { ok: 0, ng: 0, last: today }
          return {
            quizRecords: {
              ...state.quizRecords,
              [stepId]: { ok: prev.ok + (ok ? 1 : 0), ng: prev.ng + (ok ? 0 : 1), last: today },
            },
          }
        })
      },

      markWordSeen: (stepId, info) => {
        if (!stepId || !info.word) return
        if (get().seenWords[stepId]) return
        set((state) => ({ seenWords: { ...state.seenWords, [stepId]: info } }))
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
      // 저장 형식 판 — 1: 0과 순서 변경(예전 단계 번호를 새 번호로 옮김)
      version: 1,
      migrate: (persisted, version) => {
        const p = (persisted || {}) as Partial<AppState>
        if (version < 1) {
          const lid = LESSON_00_ID
          const newProg = p.progress && typeof p.progress[lid] === 'number'
            ? migrateLesson00Index(p.progress[lid]) : undefined
          if (newProg !== undefined) p.progress = { ...p.progress, [lid]: newProg }
          if (p.best && typeof p.best[lid] === 'number') {
            p.best = { ...p.best, [lid]: migrateLesson00Best(p.best[lid], newProg ?? 0) }
          }
          migrateLesson00Session()
        }
        return p as AppState
      },
      // 저장하는 값만 (함수 제외)
      partialize: (s) => ({
        progress: s.progress,
        best: s.best,
        completed: s.completed,
        writingEnabled: s.writingEnabled,
        fontSize: s.fontSize,
        theme: s.theme,
        audioRate: s.audioRate,
        easyMode: s.easyMode,
        dailyGoalMin: s.dailyGoalMin,
        onboardingSeen: s.onboardingSeen,
        writingOffered: s.writingOffered,
        studySeconds: s.studySeconds,
        quizRecords: s.quizRecords,
        seenWords: s.seenWords,
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
          studySeconds: p.studySeconds || {},
          quizRecords: p.quizRecords || {},
          seenWords: p.seenWords || {},
          // 예전 사용자(진도가 있음)는 처음 안내를 이미 지나간 것으로 본다
          onboardingSeen: p.onboardingSeen ?? Object.keys(p.progress || {}).length > 0,
          // 예전 사용자는 쓰기 권유를 다시 묻지 않는다(이미 설정을 알고 있음)
          writingOffered: p.writingOffered ?? p.writingEnabled !== undefined,
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
