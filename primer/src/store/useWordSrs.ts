// 내 단어장 — 낱말 카드 간격 복습 상태 (teach 단계 stepId 기준)
// '알아요'를 누르면 다음 복습일이 1일 → 3일 → 7일 … 처럼 늘고, '모름'이면 오늘 다시 봅니다.
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { localDateStr } from '../utils/date'

export const WORD_SRS_KEY = 'primer-word-srs'

export interface WordCard {
  due: string      // 다음에 볼 날 (YYYY-MM-DD)
  interval: number // 날 수
  ease: number     // 늘어나는 비율
  reps: number     // 연달아 '알아요'를 누른 횟수
  last: string     // 마지막으로 본 날
}

interface WordSrsState {
  cards: Record<string, WordCard>
  grade: (stepId: string, known: boolean) => void
  reset: () => void
}

function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + n)
  return localDateStr(dt)
}

export const useWordSrs = create<WordSrsState>()(
  persist(
    (set) => ({
      cards: {},
      grade: (stepId, known) => set(state => {
        const today = localDateStr()
        const prev = state.cards[stepId]
        let next: WordCard
        if (!known) {
          next = { due: today, interval: 0, ease: Math.max(1.3, (prev?.ease ?? 2.5) - 0.2), reps: 0, last: today }
        } else {
          const reps = (prev?.reps ?? 0) + 1
          const ease = prev?.ease ?? 2.5
          const interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(Math.max(prev?.interval || 3, 3) * ease)
          next = { due: addDays(today, interval), interval, ease, reps, last: today }
        }
        return { cards: { ...state.cards, [stepId]: next } }
      }),
      reset: () => set({ cards: {} }),
    }),
    {
      name: WORD_SRS_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: s => ({ cards: s.cards }),
    },
  ),
)

/** 오늘 볼 차례인지 (처음 보는 낱말도 포함) */
export function isWordDue(card: WordCard | undefined, today = localDateStr()): boolean {
  return !card || card.due <= today
}

/** 두 기기의 카드 상태 합치기 — 더 최근에 본 쪽 (같은 날이면 더 많이 외운 쪽) */
export function mergeWordCards(a: Record<string, WordCard>, b: Record<string, WordCard>): Record<string, WordCard> {
  const out: Record<string, WordCard> = { ...a }
  for (const [id, c] of Object.entries(b || {})) {
    const mine = out[id]
    if (!c || typeof c.due !== 'string') continue
    if (!mine || (c.last || '') > (mine.last || '') || ((c.last || '') === (mine.last || '') && c.reps > mine.reps)) out[id] = c
  }
  return out
}
