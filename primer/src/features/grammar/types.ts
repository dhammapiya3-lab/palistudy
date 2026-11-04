// ID가 없는 스텝 타입 (lesson 파일에서 사용)
export type StepWithoutId =
  | { type: 'intro'; title: string; subtitle: string; description: string; icon: string }
  | { type: 'teach'; word: string; pronKo: string; meaning: string; icon: string; audio?: boolean; grammar?: string; baseForm?: string; formNote?: string; buddhism?: string; verseLine?: string; verseLineKo?: string }
  | { type: 'teach-grammar'; title: string; example: string; exampleKo: string; explanation: string }
  | { type: 'quiz'; question: string; options: string[]; answer: number; hint?: string }
  | { type: 'match-listen'; instruction: string; word: string; pronKo: string; options: string[]; answer: number }
  | { type: 'match-reverse'; instruction: string; meaning: string; options: string[]; answer: number }
  | { type: 'writing'; instruction: string; meaning: string; pronKo: string; answer: string; hint?: string }
  | { type: 'speak'; pali: string; pronKo: string }
  | { type: 'arrange'; instruction: string; translation: string; blocks: string[]; correctOrder: number[] }
  | { type: 'verse'; pali: string; pronKo: string; translation: string; highlight: string[]; note?: string }

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

// 과 정보
export interface LessonInfo {
  id: string
  title: string
  subtitle: string
  icon: string
  steps: StepType[]
}
