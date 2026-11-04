// SM-2 알고리즘 (순수 함수)
import { SRS_CONFIG } from '../../config/srs'

interface SM2Input {
  interval: number
  easeFactor: number
  repetitions: number
  grade: number // 0~3 (다시/어려움/좋음/쉬움)
}

interface SM2Output {
  interval: number
  easeFactor: number
  repetitions: number
  nextReviewAt: number
}

const { INITIAL_EASE_FACTOR, MIN_EASE_FACTOR, INITIAL_INTERVALS } = SRS_CONFIG

// grade를 SM-2 표준 0~5 스케일로 매핑
// 앱 0=다시, 1=어려움, 2=좋음, 3=쉬움 → SM-2 0,2,4,5
function mapGrade(appGrade: number): number {
  const mapping = [0, 2, 4, 5]
  return mapping[appGrade] ?? 0
}

export function calculateSM2(input: SM2Input): SM2Output {
  const sm2Grade = mapGrade(input.grade)
  let { interval, easeFactor, repetitions } = input

  if (sm2Grade < 3) {
    // 실패 → 리셋
    repetitions = 0
    interval = INITIAL_INTERVALS[0]
  } else {
    // 성공
    if (repetitions === 0) {
      interval = INITIAL_INTERVALS[0]
    } else if (repetitions === 1) {
      interval = INITIAL_INTERVALS[1]
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions++
  }

  // EF 조정: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - sm2Grade) * (0.08 + (5 - sm2Grade) * 0.02))
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor)

  const nextReviewAt = Date.now() + interval * 24 * 60 * 60 * 1000

  return { interval, easeFactor, repetitions, nextReviewAt }
}

// 새 카드 기본값
export function defaultSM2() {
  return {
    interval: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    repetitions: 0,
  }
}
