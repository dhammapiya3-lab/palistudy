// 메모 관련 유틸 함수 — 페이지 이름/ID 변환, 날짜 포맷, 검색어 추출
import { getLessonById } from '../features/grammar/lessons'
import { PATH_TO_PAGE_ID } from '../utils/page-search'

// 페이지 경로 → 한글 이름 (레거시 호환 + 표시용)
const PAGE_NAMES: Record<string, string> = {
  '/': '홈',
  '/courses': '과목',
  '/review': '복습',
  '/profile': '설정',
  '/settings': '설정',
}

export function getPageName(path: string): string {
  if (path.startsWith('/learn/')) {
    const lessonId = path.replace('/learn/', '').split('?')[0]
    const currentInfo = window.currentLessonInfo
    if (currentInfo?.lessonId === lessonId) {
      const lesson = getLessonById(lessonId)
      const step = lesson?.steps[currentInfo.stepIndex]
      if (step?.id) return `학습: ${step.id}`
      return `학습: ${lessonId}#${currentInfo.stepIndex}`
    }
    return `학습: ${lessonId}`
  }
  return PAGE_NAMES[path] || path
}

/** 현재 위치의 pageId 반환 (stepId 또는 메인 페이지 ID) */
export function getCurrentPageId(path: string): string {
  if (path.startsWith('/learn/')) {
    const lessonId = path.replace('/learn/', '').split('?')[0]
    const currentInfo = window.currentLessonInfo
    if (currentInfo?.lessonId === lessonId) {
      const lesson = getLessonById(lessonId)
      const step = lesson?.steps[currentInfo.stepIndex]
      if (step?.id) return step.id
    }
    return lessonId
  }
  return PATH_TO_PAGE_ID[path] || path
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

/** 메모 텍스트에서 검색 문장 추출 (문장 우선, 단어는 fallback) */
export function extractSearchTerms(memoText: string): string[] {
  const sentences: string[] = []

  // 1순위: "원래문구 => 바꿀문구" 패턴에서 문장 추출
  const arrowMatch = memoText.match(/(.+?)\s*(?:=>|→|->)\s*(.+)/)
  if (arrowMatch) {
    const left = arrowMatch[1].trim().split('\n')[0].trim()
    const right = arrowMatch[2].trim().split('\n')[0].trim()
    if (left) sentences.push(left)
    if (right) sentences.push(right)
  }

  // 2순위: 따옴표 안의 텍스트
  const quoted = memoText.match(/["""]([^"""]+)["""]/g)
  if (quoted) {
    quoted.forEach(q => sentences.push(q.replace(/["""]/g, '').trim()))
  }

  // 3순위: 문장이 없으면 각 줄을 문장으로 사용 (5자 이상)
  if (sentences.length === 0) {
    const lines = memoText.split('\n').map(l => l.trim()).filter(l => l.length >= 5)
    sentences.push(...lines)
  }

  return [...new Set(sentences)]
}

// 이미지 아이템 타입 (작성/수정 공용)
export interface ImageItem {
  file?: File
  preview: string
  dataUrl?: string
  name: string
  order: number
}

// 탭 타입
export type Tab = 'write' | 'list'
