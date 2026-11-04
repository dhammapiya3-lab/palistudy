// Firebase 동기화 모듈 (빤디따라마 참고)
// Google 로그인 + Firestore로 기기간 학습 데이터 동기화

// TODO: Firebase 콘솔에서 프로젝트 생성 후 설정값 입력
const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

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
  }
}

// Firebase 동적 로드
async function loadFirebase() {
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js' as string)
  const { getAuth: gAuth, GoogleAuthProvider: GP, signInWithPopup: siwp, signOut: so, onAuthStateChanged: oasc } =
    await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js' as string)
  const { getFirestore: gfs, doc: d, getDoc: gd, setDoc: sd } =
    await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js' as string)
  return { initializeApp, gAuth, GP, siwp, so, oasc, gfs, d, gd, sd }
}

let fb: Awaited<ReturnType<typeof loadFirebase>> | null = null

export async function initSync(onStateChange: (loggedIn: boolean) => void) {
  if (!isSyncConfigured()) return
  try {
    fb = await loadFirebase()
    const app = fb.initializeApp(FIREBASE_CONFIG)
    auth = fb.gAuth(app)
    db = fb.gfs(app)
    fb.oasc(auth, async (user: unknown) => {
      currentUser = user
      onStateChange(!!user)
      if (user) await pullFromCloud()
    })
  } catch (e) {
    console.error('Firebase 초기화 실패:', e)
  }
}

export async function syncLogin(): Promise<boolean> {
  if (!auth || !fb) return false
  try {
    const provider = new fb.GP()
    await fb.siwp(auth, provider)
    return true
  } catch { return false }
}

export async function syncLogout() {
  if (!auth || !fb) return
  await fb.so(auth)
  currentUser = null
}

export async function pullFromCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.d(db, 'suttalog-users', currentUser.uid)
    const docSnap = await fb.gd(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith('suttalog-') && typeof value === 'string') {
          if (key.startsWith('suttalog-progress-')) {
            const local = Number(localStorage.getItem(key) || '0')
            const cloud = Number(value)
            localStorage.setItem(key, String(Math.max(local, cloud)))
          } else {
            localStorage.setItem(key, value)
          }
        }
      }
      return true
    } else {
      await pushToCloud()
      return true
    }
  } catch (e) {
    console.error('동기화 실패:', e)
    return false
  }
}

export async function pushToCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.d(db, 'suttalog-users', currentUser.uid)
    const data: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('suttalog-')) {
        data[key] = localStorage.getItem(key) || ''
      }
    }
    data['lastSyncAt'] = new Date().toISOString()
    await fb.sd(docRef, data, { merge: true })
    return true
  } catch (e) {
    console.error('클라우드 저장 실패:', e)
    return false
  }
}

let syncTimer: ReturnType<typeof setTimeout> | null = null
export function debouncedPush() {
  if (!currentUser) return
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => pushToCloud(), 3000)
}
