import { fitImages, withTimeout, friendlyError } from './memo-fit'
import { rpc, deviceKey, getAdminCode, type MemoRow } from './memo-store'
// 메모 시스템 — 온라인 저장소(Supabase 'memos', app: 'primer')에 사진(base64)과 함께 저장
// 보통 기기는 이 기기에서 쓴 메모만, 관리자 암호가 맞을 때만 모든 메모를 받음 (저장소가 직접 확인)

const APP = 'primer'
const DEVICE_ID_KEY = 'pali-memo-device-id'
const MAX_IMAGE_WIDTH = 800
const SAVE_TIMEOUT = 25000 // 25초 안에 저장 안 되면 실패로 안내

export interface MemoImage {
  order: number
  dataUrl: string
  name: string
}

export type MemoStatus = '승인' | '보류' | '미승인'

export interface Memo {
  id?: string
  page: string
  stepId?: string  // 고유 스텝 ID (페이지 추가/삭제에도 안정적)
  status?: MemoStatus  // 검토 상태
  text: string
  images: MemoImage[]
  createdAt: string
  updatedAt?: string
  deviceId: string
  userAgent: string
}

// 기기 고유 ID (localStorage 기반)
export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY)
  if (!id) {
    id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    localStorage.setItem(DEVICE_ID_KEY, id)
  }
  return id
}

const adminCode = () => getAdminCode() || null

function fromRow(r: MemoRow): Memo {
  return {
    id: r.id, page: r.page, stepId: r.step_id || undefined, status: (r.status || undefined) as MemoStatus | undefined,
    text: r.text, images: Array.isArray(r.images) ? (r.images as MemoImage[]) : [],
    createdAt: r.created_at, updatedAt: r.updated_at || undefined,
    deviceId: r.mine ? getDeviceId() : (r.device_id || ''),
    userAgent: r.user_agent || '',
  }
}

// 마지막 저장 실패 이유 (화면에 보여주기용)
export let lastMemoError = ''

// 이미지 → 리사이즈 → base64 data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > MAX_IMAGE_WIDTH) {
        height = Math.round(height * (MAX_IMAGE_WIDTH / width))
        width = MAX_IMAGE_WIDTH
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.onerror = () => reject(new Error('image-read'))
    img.src = URL.createObjectURL(file)
  })
}

// 메모 저장
export async function saveMemo(
  page: string,
  text: string,
  imageFiles: File[],
  stepId?: string,  // 고유 스텝 ID
): Promise<boolean> {
  lastMemoError = ''
  try {
    let images: MemoImage[] = []
    for (let i = 0; i < imageFiles.length; i++) {
      const dataUrl = await fileToDataUrl(imageFiles[i])
      images.push({ order: i + 1, dataUrl, name: imageFiles[i].name || `image-${i + 1}.jpg` })
    }
    // 1MB 제한에 맞게 사진 줄이기
    const fitted = await fitImages(text, images)
    if (!fitted) throw new Error('too-big')
    images = fitted
    await withTimeout(rpc('memo_add', {
      p_app: APP, p_page: page, p_text: text, p_images: images, p_step_id: stepId ?? null, p_snapshot: null,
      p_device_id: getDeviceId(), p_device_key: deviceKey(), p_user_agent: navigator.userAgent.slice(0, 150),
    }), SAVE_TIMEOUT)
    return true
  } catch (e) {
    console.error('메모 저장 실패:', e)
    lastMemoError = friendlyError(e)
    return false
  }
}

// 메모 수정
export async function updateMemo(
  memoId: string,
  text: string,
  images: MemoImage[],
  stepId?: string,  // 고유 스텝 ID (옵션)
): Promise<boolean> {
  lastMemoError = ''
  try {
    const fitted = await fitImages(text, images)
    if (!fitted) throw new Error('too-big')
    const ok = await withTimeout(rpc<boolean>('memo_update', {
      p_id: memoId, p_text: text, p_images: fitted, p_step_id: stepId ?? null, p_device_key: deviceKey(), p_admin_code: adminCode(),
    }), SAVE_TIMEOUT)
    if (!ok) throw Object.assign(new Error('denied'), { code: 'permission-denied' })
    return true
  } catch (e) {
    console.error('메모 수정 실패:', e)
    lastMemoError = friendlyError(e)
    return false
  }
}

// 메모 삭제
export async function deleteMemo(memoId: string): Promise<boolean> {
  try {
    return await rpc<boolean>('memo_delete', { p_id: memoId, p_device_key: deviceKey(), p_admin_code: adminCode() })
  } catch (e) {
    console.error('메모 삭제 실패:', e)
    return false
  }
}

// 내 메모 조회 (이 기기에서 쓴 것)
export async function getMyMemos(): Promise<Memo[]> {
  const all = await getMemos()
  return all.filter(m => m.deviceId === getDeviceId())
}

// 메모 조회 — 관리자는 전체, 보통 기기는 이 기기에서 쓴 것만
export async function getMemos(): Promise<Memo[]> {
  try {
    const rows = await rpc<MemoRow[]>('memo_list', { p_app: APP, p_device_key: deviceKey(), p_admin_code: adminCode() })
    return (rows || []).map(fromRow)
  } catch (e) {
    console.error('메모 조회 실패:', e)
    return []
  }
}

// 메모 상태 업데이트 (승인/보류/미승인) — 관리자만
export async function updateMemoStatus(
  memoId: string,
  status: MemoStatus | null,  // null이면 상태 제거
): Promise<boolean> {
  try {
    return await rpc<boolean>('memo_set_status', { p_id: memoId, p_status: status, p_admin_code: adminCode() })
  } catch (e) {
    console.error('메모 상태 업데이트 실패:', e)
    return false
  }
}

// 단일 메모 stepId 업데이트 (마이그레이션용)
export async function updateMemoStepId(
  memoId: string,
  stepId: string,
): Promise<boolean> {
  try {
    return await rpc<boolean>('memo_update', { p_id: memoId, p_text: null, p_images: null, p_step_id: stepId, p_device_key: deviceKey(), p_admin_code: adminCode() })
  } catch (e) {
    console.error('stepId 업데이트 실패:', e)
    return false
  }
}
