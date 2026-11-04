// 앱 공유 타입

// 학습 진도
export interface StudyProgress {
  suttaUid: string
  lastSegmentId: string     // 마지막 읽은 세그먼트
  totalSegments: number
  readSegments: number
  completedAt?: number      // 완료 타임스탬프
  lastReadAt: number        // 마지막 읽은 시간
  pathId?: string           // 학습 경로 ID
}

// SRS 플래시카드
export interface FlashCard {
  id: string
  suttaUid: string
  segmentId: string
  front: string             // 빠알리 텍스트
  back: string              // 영어 번역
  context?: string          // 문맥 (앞뒤 세그먼트)
  // SM-2 필드
  interval: number          // 복습 간격 (일)
  easeFactor: number        // 난이도
  repetitions: number       // 연속 성공 횟수
  nextReviewAt: number      // 다음 복습 타임스탬프
  createdAt: number
  lastReviewAt?: number
}

// 학습 경로 진도
export interface PathProgress {
  pathId: string
  currentStepIndex: number
  completedSuttas: string[]  // 완료된 경전 UID 목록
  startedAt: number
  lastActivityAt: number
}

// 학습 활동 (히트맵용)
export interface StudyActivity {
  date: string              // YYYY-MM-DD
  minutesStudied: number
  suttasRead: number
  cardsReviewed: number
}

// 캐시 엔트리
export interface CacheEntry<T> {
  data: T
  cachedAt: number
  expiresAt: number
}

// 읽기 모드
export type ReadingMode = 'pali' | 'translation' | 'parallel'

// 테마
export type ThemeMode = 'light' | 'dark' | 'sepia'
