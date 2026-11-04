// SRS (Spaced Repetition System) 설정 (SSOT)
export const SRS_CONFIG = {
  // 일일 한도
  DAILY_NEW: 20,
  DAILY_REVIEW: 100,
  // SM-2 기본값
  INITIAL_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
  // 등급별 라벨
  GRADE_LABELS: {
    0: '다시',      // complete blackout
    1: '어려움',    // incorrect, but remembered
    2: '좋음',      // correct with difficulty
    3: '쉬움',      // perfect response
  } as Record<number, string>,
  // 초기 간격 (일)
  INITIAL_INTERVALS: [1, 6] as readonly number[],
} as const
