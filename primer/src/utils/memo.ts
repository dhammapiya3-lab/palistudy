// 메모 시스템 — Firestore에 base64 이미지 저장
// 기기별 ID로 "내 메모" 구분, 수정 가능

const COLLECTION = 'pali-primer-memos'
const DEVICE_ID_KEY = 'pali-memo-device-id'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fb: any = null

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA',
  authDomain: 'panditarama-video.firebaseapp.com',
  projectId: 'panditarama-video',
  storageBucket: 'panditarama-video.firebasestorage.app',
  messagingSenderId: '504794613271',
  appId: '1:504794613271:web:ac565d6c6e82d9b72c7e52',
}

const MAX_IMAGE_WIDTH = 800

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

// Firebase 초기화
async function ensureFirebase() {
  if (db) return

  const { initializeApp, getApps, getApp } = await import('firebase/app')
  const { getFirestore, collection, addDoc, getDocs, doc, updateDoc,
    deleteDoc, query, orderBy, where } = await import('firebase/firestore')

  fb = { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where }

  const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG)
  db = getFirestore(app)
}

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
    img.onerror = reject
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
  try {
    await ensureFirebase()
    const images: MemoImage[] = []
    for (let i = 0; i < imageFiles.length; i++) {
      const dataUrl = await fileToDataUrl(imageFiles[i])
      images.push({ order: i + 1, dataUrl, name: imageFiles[i].name })
    }
    const memo: Omit<Memo, 'id'> = {
      page,
      stepId,  // 추가
      text,
      images,
      createdAt: new Date().toISOString(),
      deviceId: getDeviceId(),
      userAgent: navigator.userAgent.slice(0, 150),
    }
    await fb.addDoc(fb.collection(db, COLLECTION), memo)
    return true
  } catch (e) {
    console.error('메모 저장 실패:', e)
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
  try {
    await ensureFirebase()
    const ref = fb.doc(db, COLLECTION, memoId)
    const updateData: Record<string, unknown> = {
      text,
      images,
      updatedAt: new Date().toISOString(),
    }
    if (stepId !== undefined) {
      updateData.stepId = stepId
    }
    await fb.updateDoc(ref, updateData)
    return true
  } catch (e) {
    console.error('메모 수정 실패:', e)
    return false
  }
}

// 메모 삭제
export async function deleteMemo(memoId: string): Promise<boolean> {
  try {
    await ensureFirebase()
    await fb.deleteDoc(fb.doc(db, COLLECTION, memoId))
    return true
  } catch (e) {
    console.error('메모 삭제 실패:', e)
    return false
  }
}

// 내 메모 조회 (현재 기기 — 클라이언트 필터링)
export async function getMyMemos(): Promise<Memo[]> {
  try {
    const all = await getMemos()
    const myId = getDeviceId()
    return all.filter(m => m.deviceId === myId)
  } catch (e) {
    console.error('메모 조회 실패:', e)
    return []
  }
}

// 전체 메모 조회 (스크립트용)
export async function getMemos(): Promise<Memo[]> {
  try {
    await ensureFirebase()
    const q = fb.query(
      fb.collection(db, COLLECTION),
      fb.orderBy('createdAt', 'desc'),
    )
    const snap = await fb.getDocs(q)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('메모 조회 실패:', e)
    return []
  }
}

// 메모 상태 업데이트 (승인/보류/미승인)
export async function updateMemoStatus(
  memoId: string,
  status: MemoStatus | null,  // null이면 상태 제거
): Promise<boolean> {
  try {
    await ensureFirebase()
    const ref = fb.doc(db, COLLECTION, memoId)
    await fb.updateDoc(ref, { status: status ?? null, updatedAt: new Date().toISOString() })
    return true
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
    await ensureFirebase()
    const ref = fb.doc(db, COLLECTION, memoId)
    await fb.updateDoc(ref, { stepId })
    return true
  } catch (e) {
    console.error('stepId 업데이트 실패:', e)
    return false
  }
}
