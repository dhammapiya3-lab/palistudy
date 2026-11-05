// 메모 위치 이름·ID, 날짜 표시 (빠알리 프라이머 memo-utils와 같은 역할)
import { getMemoContext } from '../../utils/memo-cloud'
import { getLessonTitle } from '../../utils/lessons-meta'

const PAGE_NAMES: Record<string, string> = {
  '/': '홈', '/map': '학습 지도', '/review': '복습', '/profile': '내 정보',
  '/settings': '설정', '/memos': '메모', '/words': '단어장', '/review/words': '단어 복습',
}

/** 사람이 읽는 위치 이름 */
export function getPageName(path: string): string {
  const c = getMemoContext()
  if (c && path.startsWith('/learn/scripture/')) return c.page
  const m = path.match(/^\/learn\/(alphabet|vocab|grammar|reading|scripture)\/([^/?#]+)/)
  if (m) return `${m[1] === 'scripture' ? '경전' : '기초'}: ${getLessonTitle(m[2]) || m[2]}`
  if (path.startsWith('/recite/')) return `외우기: ${getLessonTitle(path.split('/')[2]) || path.split('/')[2]}`
  return PAGE_NAMES[path] || path
}

/** 위치 ID — 경전 과는 '{lessonId}:{원본 단계 번호}', 그 밖은 화면 주소 */
export function getCurrentPageId(path: string): string {
  const c = getMemoContext()
  if (c && path.startsWith('/learn/scripture/')) return c.stepId
  return path
}

/** 지금 보고 있는 과 ID (없으면 null) */
export function currentLessonId(path: string): string | null {
  const c = getMemoContext()
  if (c?.lessonId && path.startsWith('/learn/scripture/')) return c.lessonId
  const m = path.match(/^\/(?:learn\/[a-z]+|recite)\/([^/?#]+)/)
  return m ? m[1] : null
}

/** 메모 위치 ID → 이동할 화면 주소 */
export function memoPath(stepId?: string): string | null {
  if (!stepId) return null
  if (stepId.startsWith('/')) return stepId
  const m = stepId.match(/^([^:]+):(\d+)$/)
  return m ? `/learn/scripture/${m[1]}?step=${m[2]}` : null
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export interface ImageItem { file?: File; preview: string; dataUrl?: string; name: string; order: number }
export type Tab = 'write' | 'list'
