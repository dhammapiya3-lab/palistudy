// 모든 단계에 붙일 수 있는 선택 항목
// - more: '더 알아보기' 묶음 이름 — 있으면 평소 흐름에서는 건너뛰고, 사용자가 열었을 때만 보여 줌
// - fixedId: 단계 ID를 직접 정함 (과 순서를 바꿔도 예전 진도·메모 위치가 그대로 맞도록)
export type StepExtras = { more?: string; fixedId?: string }

// ID가 없는 스텝 타입 (lesson 파일에서 사용)
export type StepWithoutId = StepExtras & (
  | { type: 'intro'; title: string; subtitle: string; description: string; icon: string }
  | { type: 'teach'; word: string; pronKo: string; meaning: string; icon: string; audio?: boolean; grammar?: string; baseForm?: string; formNote?: string; buddhism?: string; verseLine?: string; verseLineKo?: string }
  | { type: 'teach-grammar'; title: string; example: string; exampleKo: string; explanation: string }
  | { type: 'quiz'; question: string; options: string[]; answer: number; hint?: string; explain?: string }
  | { type: 'match-listen'; instruction: string; word: string; pronKo: string; options: string[]; answer: number }
  | { type: 'match-reverse'; instruction: string; meaning: string; options: string[]; answer: number }
  | { type: 'writing'; instruction: string; meaning: string; pronKo: string; answer: string; hint?: string }
  | { type: 'speak'; pali: string; pronKo: string; translation?: string }
  | { type: 'arrange'; instruction: string; translation: string; blocks: string[]; correctOrder: number[] }
  | { type: 'verse'; pali: string; pronKo: string; translation: string; highlight: string[]; note?: string }
)

// 문법 학습 스텝 타입 정의 (ID 포함)
export type StepType = StepWithoutId & { id: string }

export type IntroStep = Extract<StepType, { type: 'intro' }>
export type TeachStep = Extract<StepType, { type: 'teach' }>
export type TeachGrammarStep = Extract<StepType, { type: 'teach-grammar' }>
export type QuizStep = Extract<StepType, { type: 'quiz' }>
export type MatchListenStep = Extract<StepType, { type: 'match-listen' }>
export type MatchReverseStep = Extract<StepType, { type: 'match-reverse' }>
export type WritingStep = Extract<StepType, { type: 'writing' }>
export type SpeakStep = Extract<StepType, { type: 'speak' }>
export type ArrangeStep = Extract<StepType, { type: 'arrange' }>
export type VerseStep = Extract<StepType, { type: 'verse' }>

// 과 요약 — 늘 들고 있는 가벼운 정보 (과 내용 없이)
export interface LessonMeta {
  id: string
  title: string
  subtitle: string
  icon: string
  stepCount: number
  /** 과목 검색용: 배우는 낱말·뜻 (검색용으로 정리된 글자, 줄바꿈으로 구분) */
  search: string
}

// 과 정보 (내용 포함) — loadLesson()으로 받음
export interface LessonInfo {
  id: string
  title: string
  subtitle: string
  icon: string
  steps: StepType[]
}
