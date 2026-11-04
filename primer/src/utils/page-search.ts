// 레슨 콘텐츠 텍스트 검색 — 메모의 원문/수정문으로 페이지(스텝) 매칭
import { LESSONS } from '../features/grammar/lessons'
import type { StepType } from '../features/grammar/types'

// 메인 페이지 ID 상수
export const PAGE_IDS = {
  HOME: 'page-home',
  COURSES: 'page-courses',
  REVIEW: 'page-review',
  SETTINGS: 'page-settings',
} as const

// 경로 → pageId 변환
export const PATH_TO_PAGE_ID: Record<string, string> = {
  '/': PAGE_IDS.HOME,
  '/courses': PAGE_IDS.COURSES,
  '/review': PAGE_IDS.REVIEW,
  '/profile': PAGE_IDS.SETTINGS,
  '/settings': PAGE_IDS.SETTINGS,
}

// pageId → 한글 이름
export const PAGE_ID_NAMES: Record<string, string> = {
  [PAGE_IDS.HOME]: '홈',
  [PAGE_IDS.COURSES]: '과목',
  [PAGE_IDS.REVIEW]: '복습',
  [PAGE_IDS.SETTINGS]: '설정',
}

/** 현재 경로에서 통합 pageId 반환 */
export function getPageId(path: string, stepId?: string): string {
  // 학습 페이지: stepId 우선
  if (stepId) return stepId
  if (path.startsWith('/learn/')) {
    // stepId 없으면 lessonId 기반
    const lessonId = path.replace('/learn/', '').split('?')[0]
    return lessonId
  }
  return PATH_TO_PAGE_ID[path] || path
}

/** pageId → 사람이 읽을 수 있는 이름 */
export function getPageLabel(pageId: string): string {
  // 메인 페이지
  if (PAGE_ID_NAMES[pageId]) return PAGE_ID_NAMES[pageId]
  // stepId 형식: lesson-XX-type-N → "XX과 type #N"
  const stepMatch = pageId.match(/^(lesson-\w+)-(\w+)-(\d+)$/)
  if (stepMatch) {
    const [, lessonId, stepType, num] = stepMatch
    const lesson = LESSONS.find(l => l.id === lessonId)
    const title = lesson?.title || lessonId
    return `${title} · ${stepType}#${num}`
  }
  // lessonId만 있는 경우
  const lesson = LESSONS.find(l => l.id === pageId)
  if (lesson) return lesson.title
  return pageId
}

// 검색 결과 타입
export interface PageSearchResult {
  stepId: string
  lessonId: string
  lessonTitle: string
  stepIndex: number
  stepType: string
  matchField: string   // 어떤 필드에서 매칭됐는지
  matchText: string    // 매칭된 텍스트 (발췌)
  score: number        // 관련도 (높을수록 좋음)
}

/** 스텝에서 검색 가능한 텍스트 필드 추출 */
function getSearchableFields(step: StepType): Array<{ field: string; text: string }> {
  const fields: Array<{ field: string; text: string }> = []
  const s = step as Record<string, unknown>

  // 공통 텍스트 필드들
  const textKeys = [
    'word', 'meaning', 'pronKo', 'grammar', 'baseForm', 'formNote',
    'buddhism', 'verseLine', 'verseLineKo',
    'title', 'subtitle', 'description', 'example', 'exampleKo', 'explanation',
    'question', 'hint', 'instruction', 'translation',
    'pali', 'answer', 'note',
  ]

  for (const key of textKeys) {
    if (typeof s[key] === 'string' && s[key]) {
      fields.push({ field: key, text: s[key] as string })
    }
  }

  // options 배열
  if (Array.isArray(s.options)) {
    for (const opt of s.options) {
      if (typeof opt === 'string') {
        fields.push({ field: 'options', text: opt })
      }
    }
  }

  // blocks 배열 (arrange)
  if (Array.isArray(s.blocks)) {
    for (const block of s.blocks) {
      if (typeof block === 'string') {
        fields.push({ field: 'blocks', text: block })
      }
    }
  }

  // highlight 배열 (verse)
  if (Array.isArray(s.highlight)) {
    for (const h of s.highlight) {
      if (typeof h === 'string') {
        fields.push({ field: 'highlight', text: h })
      }
    }
  }

  return fields
}

/** 레슨 콘텐츠에서 텍스트 검색 — 메모 매칭용 */
export function searchLessonContent(query: string): PageSearchResult[] {
  if (!query.trim()) return []

  const q = query.trim().toLowerCase()
  const results: PageSearchResult[] = []

  for (const lesson of LESSONS) {
    for (let i = 0; i < lesson.steps.length; i++) {
      const step = lesson.steps[i]
      const fields = getSearchableFields(step)

      for (const { field, text } of fields) {
        const lower = text.toLowerCase()
        if (!lower.includes(q)) continue

        // 점수 계산: 정확한 매칭이 높은 점수
        let score = 1
        if (lower === q) score = 10         // 완전 일치
        else if (lower.startsWith(q)) score = 7  // 시작 일치
        else score = 3                      // 부분 일치

        // 주요 필드일수록 가산점
        if (['word', 'pali', 'question'].includes(field)) score += 2
        if (['meaning', 'title'].includes(field)) score += 1

        results.push({
          stepId: step.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          stepIndex: i,
          stepType: step.type,
          matchField: field,
          matchText: text.length > 80 ? text.slice(0, 80) + '…' : text,
          score,
        })
      }
    }
  }

  // 점수 내림차순 정렬, 중복 stepId 제거 (최고 점수만)
  const best = new Map<string, PageSearchResult>()
  for (const r of results) {
    const existing = best.get(r.stepId)
    if (!existing || r.score > existing.score) {
      best.set(r.stepId, r)
    }
  }

  return [...best.values()].sort((a, b) => b.score - a.score)
}

/** stepId로 레슨/스텝 인덱스 조회 */
export function findStepById(stepId: string): { lessonId: string; stepIndex: number } | null {
  for (const lesson of LESSONS) {
    const idx = lesson.steps.findIndex(s => s.id === stepId)
    if (idx >= 0) return { lessonId: lesson.id, stepIndex: idx }
  }
  return null
}
