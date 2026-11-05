// 메모 저장 보조 — 사진 크기 맞추기, 시간 제한, 알기 쉬운 오류 문구
// Firestore 문서 하나는 최대 1MB → 사진을 메모 안에 넣으므로 전체를 그보다 작게 줄여야 함

import type { MemoImage } from './memo-cloud'

const LIMIT = 900 * 1024 // 여유를 두고 900KB
// 점점 더 작게: [가로 최대 px, JPEG 품질]
const STEPS: [number, number][] = [[800, 0.8], [700, 0.7], [600, 0.6], [480, 0.55], [360, 0.5]]

// data URL을 다른 크기·품질로 다시 압축
function recompress(dataUrl: string, maxWidth: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      try {
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width))
          width = maxWidth
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      } catch {
        resolve(dataUrl)
      }
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

// 메모 전체(글 + 사진)의 대략적인 크기
export function memoSize(text: string, images: MemoImage[]): number {
  return text.length * 3 + images.reduce((s, i) => s + i.dataUrl.length + i.name.length, 0) + 2000
}

/** 메모가 1MB 안에 들어가도록 사진을 점점 줄임. 그래도 넘으면 null */
export async function fitImages(text: string, images: MemoImage[]): Promise<MemoImage[] | null> {
  if (memoSize(text, images) <= LIMIT) return images
  for (const [w, q] of STEPS) {
    const smaller: MemoImage[] = []
    for (const img of images) {
      smaller.push({ ...img, dataUrl: await recompress(img.dataUrl, w, q) })
    }
    if (memoSize(text, smaller) <= LIMIT) return smaller
  }
  return null
}

/** 정해진 시간 안에 끝나지 않으면 실패로 처리 */
export function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms)
    p.then(v => { clearTimeout(t); resolve(v) }, e => { clearTimeout(t); reject(e) })
  })
}

/** 오류를 사용자에게 보여줄 한국어 문구로 */
export function friendlyError(e: unknown): string {
  const msg = String((e as { message?: string })?.message || e || '')
  const code = String((e as { code?: string })?.code || '')
  if (msg === 'too-big') return '사진이 너무 많거나 커서 저장할 수 없어요. 사진 수를 줄여 다시 보내 주세요.'
  if (msg === 'image-read') return '첨부한 사진을 읽지 못했어요. 다른 사진(화면 캡처 등)으로 바꿔 보세요.'
  if (msg === 'timeout' || code === 'unavailable' || code === 'deadline-exceeded')
    return '서버에 연결하지 못했어요. 인터넷 연결을 확인하거나, 카카오톡 안에서 열었다면 크롬·사파리로 열어 다시 시도해 주세요.'
  if (code === 'permission-denied') return '저장 권한이 거부되었어요. 관리자에게 알려 주세요.'
  if (code === 'invalid-argument' || msg.includes('exceeds the maximum'))
    return '메모가 너무 커요. 사진 수를 줄여 다시 보내 주세요.'
  return `저장하지 못했어요 (${code || msg.slice(0, 80) || '알 수 없는 오류'})`
}
