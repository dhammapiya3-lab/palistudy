// Firebase 동기화 모듈
// Google 로그인 + Firestore로 기기간 학습 진도 동기화

// panditarama-video Firebase 프로젝트 공유 (컬렉션만 분리)
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA',
  authDomain: 'panditarama-video.firebaseapp.com',
  projectId: 'panditarama-video',
  storageBucket: 'panditarama-video.firebasestorage.app',
  messagingSenderId: '504794613271',
  appId: '1:504794613271:web:ac565d6c6e82d9b72c7e52',
}

// 동기화 대상 localStorage 키 접두사
const SYNC_PREFIX = 'pali-primer-'
const SYNC_EXTRA_KEYS = ['pali-study-streak', 'pali-study-last-date', 'suttalog2-sound']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let auth: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let currentUser: any = null

export function isSyncConfigured(): boolean {
  return !!FIREBASE_CONFIG.apiKey
}

export function isSyncLoggedIn(): boolean {
  return !!currentUser
}

export function getSyncUser() {
  if (!currentUser) return null
  return {
    displayName: currentUser.displayName || '',
    email: currentUser.email || '',
    photoURL: currentUser.photoURL || '',
    uid: currentUser.uid || '',
  }
}

// Firebase 동적 로드 (번들 크기 최적화)
async function loadFirebase() {
  const { initializeApp } = await import('firebase/app')
  const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } =
    await import('firebase/auth')
  const { getFirestore, doc, getDoc, setDoc } =
    await import('firebase/firestore')
  return { initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getFirestore, doc, getDoc, setDoc }
}

let fb: Awaited<ReturnType<typeof loadFirebase>> | null = null

// 동기화 초기화
export async function initSync(onStateChange: (loggedIn: boolean) => void) {
  if (!isSyncConfigured()) return
  try {
    fb = await loadFirebase()
    const app = fb.initializeApp(FIREBASE_CONFIG)
    auth = fb.getAuth(app)
    db = fb.getFirestore(app)
    fb.onAuthStateChanged(auth, async (user: unknown) => {
      currentUser = user
      onStateChange(!!user)
      if (user) await pullFromCloud()
    })
  } catch (e) {
    console.error('Firebase 초기화 실패:', e)
  }
}

// Google 로그인
export async function syncLogin(): Promise<boolean> {
  if (!auth || !fb) return false
  try {
    const provider = new fb.GoogleAuthProvider()
    await fb.signInWithPopup(auth, provider)
    return true
  } catch { return false }
}

// 로그아웃
export async function syncLogout() {
  if (!auth || !fb) return
  await fb.signOut(auth)
  currentUser = null
}

// 동기화 대상 키인지 확인
function isSyncKey(key: string): boolean {
  return key.startsWith(SYNC_PREFIX) || SYNC_EXTRA_KEYS.includes(key)
}

// 클라우드에서 가져오기 (진도는 더 높은 값 유지)
export async function pullFromCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.doc(db, 'pali-primer-users', currentUser.uid)
    const docSnap = await fb.getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      for (const [key, value] of Object.entries(data)) {
        if (!isSyncKey(key) || typeof value !== 'string') continue
        // 진도 데이터: 더 높은 값 유지
        if (key.startsWith(SYNC_PREFIX + 'lesson-')) {
          const local = Number(localStorage.getItem(key) || '0')
          const cloud = Number(value)
          localStorage.setItem(key, String(Math.max(local, cloud)))
        } else {
          localStorage.setItem(key, value)
        }
      }
      return true
    } else {
      // 클라우드에 데이터 없으면 로컬 데이터 업로드
      await pushToCloud()
      return true
    }
  } catch (e) {
    console.error('동기화 실패:', e)
    return false
  }
}

// 클라우드에 저장
export async function pushToCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.doc(db, 'pali-primer-users', currentUser.uid)
    const data: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && isSyncKey(key)) {
        data[key] = localStorage.getItem(key) || ''
      }
    }
    data['lastSyncAt'] = new Date().toISOString()
    data['deviceInfo'] = navigator.userAgent.slice(0, 100)
    await fb.setDoc(docRef, data, { merge: true })
    return true
  } catch (e) {
    console.error('클라우드 저장 실패:', e)
    return false
  }
}

// 디바운스 푸시 (진도 변경 시 3초 후 자동 동기화)
let syncTimer: ReturnType<typeof setTimeout> | null = null
export function debouncedPush() {
  if (!currentUser) return
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => pushToCloud(), 3000)
}
