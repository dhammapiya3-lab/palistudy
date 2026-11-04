import type { StepType, StepWithoutId } from '../features/grammar/types'

/**
 * 스텝 배열에 고유 ID 자동 부여
 *
 * 형식: {lessonId}-{type}-{순번}
 * 예: "lesson-01-teach-1", "lesson-01-quiz-2"
 *
 * @param lessonId - 과 ID (예: "lesson-01")
 * @param steps - ID가 없는 스텝 배열
 * @returns ID가 부여된 스텝 배열
 */
export function assignStepIds(
  lessonId: string,
  steps: StepWithoutId[]
): StepType[] {
  // 타입별 카운터 초기화
  const typeCounters: Record<string, number> = {}

  return steps.map((step) => {
    const stepType = step.type

    // 타입별 카운터 증가
    if (!typeCounters[stepType]) {
      typeCounters[stepType] = 0
    }
    typeCounters[stepType]++

    // ID 생성: {lessonId}-{type}-{순번}
    const id = `${lessonId}-${stepType}-${typeCounters[stepType]}`

    // ID 필드 추가하여 반환
    return {
      ...step,
      id,
    } as StepType
  })
}
