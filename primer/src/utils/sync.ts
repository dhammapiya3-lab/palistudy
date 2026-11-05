// Firebase 동기화 모듈
// Google 로그인 + Firestore로 기기간 학습 진도·연속 학습일·학습 기록·설정 동기화
//
// - Firebase(약 350KB)는 로그인한 적이 있거나 설정 화면을 열 때만 불러온다.
// - 합칠 때 진도는 과마다 '더 많이 한 쪽'을, 완료 기록은 양쪽을 모두 남긴다.

import { useStore } from '../store/useStore'
import { applyTheme } from './theme'
import { applyFontSize } from './font-size'
import { normalizeProgress } from './lesson-progress'
import { useWordSrs, mergeWordCards, WORD_SRS_KEY, type WordCard } from '../store/useWordSrs'

// panditarama-video Firebase 프로젝트 공유 (컬렉션만 분리)
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA',
  authDomain: 'panditarama-video.firebaseapp.com',
  projectId: 'panditarama-video',
  storageBucket: 'panditarama-video.firebasestorage.app',
  messagingSenderId: '504794613271',
  appId: '1:504794613271:web:ac565d6c6e82d9b72c7e52',
}

const COLLECTION = 'pali-primer-users'
const SIGNED_IN_FLAG = 'pali-sync-signed-in' // 로그인 기록 (있을 때만 앱 시작 시 Firebase를 불러옴)

// 동기화하는 localStorage 키
const STORE_KEY = 'suttalog2-storage'      // 진도·완료·연속 학습·설정 (zustand)
const LOG_KEY = 'pali-study-log'           // 날짜별 학습 기록
const DATES_KEY = 'pali-study-dates'       // 공부한 날
const ORDER_KEY = 'pali-review-order'      // 복습 목록 순서
const FONT_KEY = 'pali-primer-fontsize'    // 글씨 크기
const SOUND_KEY = 'suttalog2-sound'        // 소리 켜기/끄기
const LEGACY_LESSON_PREFIX = 'pali-primer-lesson-' // 예전 판 진도 키
const MILESTONES_KEY = 'primer-milestones-seen' // 이미 축하한 이정표
// WORD_SRS_KEY ('primer-word-srs')          // 내 단어장 낱말 카드 복습 상태

/** 클라우드에 올리는 키 */
const SYNC_KEYS = [STORE_KEY, LOG_KEY, DATES_KEY, ORDER_KEY, FONT_KEY, SOUND_KEY, WORD_SRS_KEY, MILESTONES_KEY]

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

/** 이 기기에서 로그인한 적이 있는지 (앱 시작 때 Firebase를 불러올지 결정) */
export function hasSyncLoginRecord(): boolean {
  try { return localStorage.getItem(SIGNED_IN_FLAG) === '1' } catch { return false }
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
  const { initializeApp, getApps, getApp } = await import('firebase/app')
  const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } =
    await import('firebase/auth')
  const { getFirestore, initializeFirestore, doc, getDoc, setDoc } =
    await import('firebase/firestore')
  return { initializeApp, getApps, getApp, getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getFirestore, initializeFirestore, doc, getDoc, setDoc }
}

let fb: Awaited<ReturnType<typeof loadFirebase>> | null = null
let initPromise: Promise<void> | null = null
const listeners = new Set<(loggedIn: boolean) => void>()
let unsubscribeStore: (() => void) | null = null

/** 동기화 초기화 (여러 번 불러도 Firebase는 한 번만 준비) */
export function initSync(onStateChange?: (loggedIn: boolean) => void): Promise<void> {
  if (onStateChange) {
    listeners.add(onStateChange)
    if (auth) onStateChange(!!currentUser)
  }
  if (!isSyncConfigured()) return Promise.resolve()
  if (initPromise) return initPromise
  initPromise = (async () => {
    try {
      fb = await loadFirebase()
      // 메모 기능이 먼저 Firebase를 준비했으면 그것을 같이 씀
      const app = fb.getApps().length > 0 ? fb.getApp() : fb.initializeApp(FIREBASE_CONFIG)
      auth = fb.getAuth(app)
      try {
        // 카카오톡 등 앱 안 브라우저에서 실시간 연결이 막히면 자동으로 롱폴링 사용 (메모와 같은 설정)
        db = fb.initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
      } catch {
        db = fb.getFirestore(app)
      }
      fb.onAuthStateChanged(auth, async (user: unknown) => {
        currentUser = user
        try {
          if (user) localStorage.setItem(SIGNED_IN_FLAG, '1')
          else localStorage.removeItem(SIGNED_IN_FLAG)
        } catch { /* 무시 */ }
        listeners.forEach(fn => fn(!!user))
        if (user) {
          await pullFromCloud()
          // 로그인 중에는 진도·설정이 바뀔 때마다 몇 초 뒤 자동 저장
          if (!unsubscribeStore) {
            const a = useStore.subscribe(() => debouncedPush())
            const b = useWordSrs.subscribe(() => debouncedPush())
            unsubscribeStore = () => { a(); b() }
          }
        } else if (unsubscribeStore) {
          unsubscribeStore()
          unsubscribeStore = null
        }
      })
    } catch (e) {
      console.error('Firebase 초기화 실패:', e)
      initPromise = null
    }
  })()
  return initPromise
}

/** 앱 시작 시: 로그인 기록이 있을 때만 Firebase를 불러옴 */
export function initSyncIfSignedIn(onStateChange?: (loggedIn: boolean) => void) {
  if (hasSyncLoginRecord()) initSync(onStateChange)
}

// Google 로그인
export async function syncLogin(): Promise<boolean> {
  await initSync()
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
  try { localStorage.removeItem(SIGNED_IN_FLAG) } catch { /* 무시 */ }
}

// ─────────────────────────────────────────────
// 합치기
// ─────────────────────────────────────────────

interface StoreSnapshot {
  progress?: Record<string, number>
  best?: Record<string, number>
  completed?: Record<string, boolean>
  writingEnabled?: boolean
  fontSize?: string
  theme?: 'light' | 'dark' | 'system'
  streak?: number
  lastStudyDate?: string | null
  audioRate?: 0.75 | 1
  easyMode?: boolean
  dailyGoalMin?: 5 | 10 | 15
  onboardingSeen?: boolean
  writingOffered?: boolean
  studySeconds?: Record<string, number>
  quizRecords?: Record<string, { ok: number; ng: number; last: string }>
  seenWords?: Record<string, { lessonId: string; word: string; meaning: string; pronKo: string }>
}

function parseJSON<T>(v: unknown, fallback: T): T {
  if (typeof v !== 'string') return fallback
  try { return JSON.parse(v) as T } catch { return fallback }
}

/** 진도·완료·연속 학습일 합치기 (설정은 adoptSettings일 때만 클라우드 값을 씀) */
function mergeStore(cloud: StoreSnapshot, adoptSettings: boolean) {
  const local = useStore.getState()
  const progress = { ...local.progress }
  const best = { ...local.best }
  const completed = { ...local.completed }

  const cp = cloud.progress || {}
  const cb = cloud.best || {}
  const ids = new Set([...Object.keys(cp), ...Object.keys(cb)])
  for (const id of ids) {
    const cloudReach = Math.max(cb[id] || 0, cp[id] || 0)
    const localReach = Math.max(best[id] || 0, progress[id] || 0)
    // 더 많이 한 쪽의 위치를 이어서 공부
    if (cloudReach > localReach && cp[id] !== undefined) progress[id] = cp[id]
    best[id] = Math.max(cloudReach, best[id] || 0)
  }
  for (const [id, v] of Object.entries(cloud.completed || {})) if (v) completed[id] = true

  // 연속 학습일: 더 최근에 공부한 쪽 (같은 날이면 큰 값)
  let streak = local.streak
  let lastStudyDate = local.lastStudyDate
  if (cloud.lastStudyDate) {
    if (!lastStudyDate || cloud.lastStudyDate > lastStudyDate) {
      lastStudyDate = cloud.lastStudyDate
      streak = cloud.streak || 0
    } else if (cloud.lastStudyDate === lastStudyDate) {
      streak = Math.max(streak, cloud.streak || 0)
    }
  }

  // 날짜별 공부 시간: 같은 날이면 큰 값 (두 기기에서 같은 시간을 두 번 더하지 않게)
  const studySeconds = { ...(local.studySeconds || {}) }
  for (const [d, sec] of Object.entries(cloud.studySeconds || {})) {
    if (typeof sec === 'number') studySeconds[d] = Math.max(studySeconds[d] || 0, sec)
  }
  // 문제 기록: 더 최근에 푼 쪽 (같은 날이면 더 많이 푼 쪽)
  const quizRecords = { ...(local.quizRecords || {}) }
  for (const [id, r] of Object.entries(cloud.quizRecords || {})) {
    if (!r || typeof r.last !== 'string') continue
    const mine = quizRecords[id]
    if (!mine || r.last > mine.last || (r.last === mine.last && r.ok + r.ng > mine.ok + mine.ng)) quizRecords[id] = r
  }
  // 본 낱말: 양쪽 모두
  const seenWords = { ...(cloud.seenWords || {}), ...(local.seenWords || {}) }

  const next: Partial<ReturnType<typeof useStore.getState>> = { progress, best, completed, streak, lastStudyDate, studySeconds, quizRecords, seenWords }
  // 처음 안내·쓰기 권유는 한 기기에서 봤으면 본 것으로
  if (cloud.onboardingSeen) next.onboardingSeen = true
  if (cloud.writingOffered) next.writingOffered = true
  if (adoptSettings) {
    if (cloud.audioRate === 0.75 || cloud.audioRate === 1) next.audioRate = cloud.audioRate
    if (typeof cloud.easyMode === 'boolean') next.easyMode = cloud.easyMode
    if (cloud.dailyGoalMin === 5 || cloud.dailyGoalMin === 10 || cloud.dailyGoalMin === 15) next.dailyGoalMin = cloud.dailyGoalMin
    if (typeof cloud.writingEnabled === 'boolean') next.writingEnabled = cloud.writingEnabled
    if (cloud.theme === 'light' || cloud.theme === 'dark' || cloud.theme === 'system') next.theme = cloud.theme
    if (typeof cloud.fontSize === 'string') next.fontSize = cloud.fontSize
  }
  useStore.setState(next)
  if (next.theme) applyTheme(next.theme)
}

interface LogDay { date: string; entries: { timestamp: number; lessonId: string; minutes: number }[]; totalMinutes: number; sessionCount: number }

/** 날짜별 학습 기록 합치기 (같은 기록은 한 번만) */
function mergeStudyLog(cloudRaw: unknown) {
  const cloud = parseJSON<Record<string, LogDay>>(cloudRaw, {})
  const local = parseJSON<Record<string, LogDay>>(localStorage.getItem(LOG_KEY), {})
  for (const [date, day] of Object.entries(cloud)) {
    if (!day || !Array.isArray(day.entries)) continue
    const mine = local[date] || { date, entries: [], totalMinutes: 0, sessionCount: 0 }
    const seen = new Set(mine.entries.map(e => `${e.timestamp}|${e.lessonId}`))
    for (const e of day.entries) {
      const k = `${e.timestamp}|${e.lessonId}`
      if (seen.has(k)) continue
      seen.add(k)
      mine.entries.push(e)
    }
    mine.entries.sort((a, b) => a.timestamp - b.timestamp)
    mine.totalMinutes = mine.entries.reduce((n, e) => n + (e.minutes || 0), 0)
    mine.sessionCount = mine.entries.length
    local[date] = mine
  }
  localStorage.setItem(LOG_KEY, JSON.stringify(local))
}

function mergeStudyDates(cloudRaw: unknown) {
  const cloud = parseJSON<string[]>(cloudRaw, [])
  const local = parseJSON<string[]>(localStorage.getItem(DATES_KEY), [])
  const all = Array.from(new Set([...(Array.isArray(local) ? local : []), ...(Array.isArray(cloud) ? cloud : [])])).sort()
  localStorage.setItem(DATES_KEY, JSON.stringify(all))
}

/** 클라우드 문서를 이 기기 데이터와 합침 */
function mergeCloudData(data: Record<string, unknown>, adoptSettings: boolean) {
  // 1) 진도·연속 학습·설정
  const cloudStore = parseJSON<{ state?: StoreSnapshot }>(data[STORE_KEY], {})
  if (cloudStore.state) mergeStore(cloudStore.state, adoptSettings)

  // 2) 예전 판 앱이 올린 진도 키 → 새 저장소로 옮김 (더 큰 값)
  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith(LEGACY_LESSON_PREFIX) || typeof value !== 'string') continue
    const local = Number(localStorage.getItem(key) || '0')
    localStorage.setItem(key, String(Math.max(local, Number(value) || 0)))
  }
  if (!cloudStore.state) {
    // 예전 판의 연속 학습 키
    const ls = data['pali-study-last-date'], st = data['pali-study-streak']
    if (typeof ls === 'string' && ls) mergeStore({ lastStudyDate: ls, streak: Number(st) || 0 }, false)
  }

  // 3) 학습 기록·공부한 날
  if (data[LOG_KEY] !== undefined) mergeStudyLog(data[LOG_KEY])
  if (data[DATES_KEY] !== undefined) mergeStudyDates(data[DATES_KEY])

  // 3-1) 내 단어장 카드 복습 상태 (더 최근에 본 쪽)
  const cloudSrs = parseJSON<{ state?: { cards?: Record<string, WordCard> } }>(data[WORD_SRS_KEY], {})
  if (cloudSrs.state?.cards) {
    useWordSrs.setState({ cards: mergeWordCards(useWordSrs.getState().cards, cloudSrs.state.cards) })
  }
  // 3-2) 이미 축하한 이정표 (양쪽 모두)
  if (data[MILESTONES_KEY] !== undefined) {
    const a = parseJSON<string[]>(data[MILESTONES_KEY], [])
    const b = parseJSON<string[]>(localStorage.getItem(MILESTONES_KEY), [])
    const all = Array.from(new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]))
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(all))
  }

  // 4) 기타 설정
  if (adoptSettings) {
    if (typeof data[FONT_KEY] === 'string' && data[FONT_KEY]) { localStorage.setItem(FONT_KEY, data[FONT_KEY] as string); applyFontSize() }
    if (typeof data[SOUND_KEY] === 'string' && data[SOUND_KEY]) localStorage.setItem(SOUND_KEY, data[SOUND_KEY] as string)
  }
  if (typeof data[ORDER_KEY] === 'string' && data[ORDER_KEY] && !localStorage.getItem(ORDER_KEY)) {
    localStorage.setItem(ORDER_KEY, data[ORDER_KEY] as string)
  }

  normalizeProgress()
}

/** 클라우드에서 가져오기 — 진도는 더 많이 한 쪽, 설정은 클라우드 값 */
export async function pullFromCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.doc(db, COLLECTION, currentUser.uid)
    const docSnap = await fb.getDoc(docRef)
    if (docSnap.exists()) {
      mergeCloudData(docSnap.data(), true)
      // 합친 결과를 다시 올려 두 기기가 같은 상태가 되게
      await writeLocalToCloud()
      return true
    } else {
      // 클라우드에 데이터 없으면 로컬 데이터 업로드
      await writeLocalToCloud()
      return true
    }
  } catch (e) {
    console.error('동기화 실패:', e)
    return false
  }
}

async function writeLocalToCloud() {
  if (!currentUser || !db || !fb) return
  const docRef = fb.doc(db, COLLECTION, currentUser.uid)
  const data: Record<string, string> = {}
  for (const key of SYNC_KEYS) {
    const v = localStorage.getItem(key)
    if (v !== null) data[key] = v
  }
  data['lastSyncAt'] = new Date().toISOString()
  data['deviceInfo'] = navigator.userAgent.slice(0, 100)
  await fb.setDoc(docRef, data, { merge: true })
}

/** 이 기기 데이터로 클라우드를 덮어씀 (진도 초기화 때 — 합치면 지운 진도가 되살아나므로) */
export async function overwriteCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.doc(db, COLLECTION, currentUser.uid)
    const data: Record<string, string> = {}
    for (const key of SYNC_KEYS) {
      data[key] = localStorage.getItem(key) ?? ''
    }
    data['lastSyncAt'] = new Date().toISOString()
    data['deviceInfo'] = navigator.userAgent.slice(0, 100)
    await fb.setDoc(docRef, data) // 합치지 않고 통째로 바꿈 (예전 판의 진도 키도 지워짐)
    return true
  } catch (e) {
    console.error('클라우드 초기화 실패:', e)
    return false
  }
}

/** 클라우드에 저장 — 먼저 클라우드 진도와 합친 뒤 올림 (다른 기기의 진도를 덮어쓰지 않도록) */
export async function pushToCloud(): Promise<boolean> {
  if (!currentUser || !db || !fb) return false
  try {
    const docRef = fb.doc(db, COLLECTION, currentUser.uid)
    const docSnap = await fb.getDoc(docRef)
    if (docSnap.exists()) mergeCloudData(docSnap.data(), false)
    await writeLocalToCloud()
    return true
  } catch (e) {
    console.error('클라우드 저장 실패:', e)
    return false
  }
}

// 디바운스 푸시 (진도 변경 시 3초 후 자동 동기화)
let syncTimer: ReturnType<typeof setTimeout> | null = null
let pushing = false
export function debouncedPush() {
  if (!currentUser || pushing) return
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(async () => {
    pushing = true
    try { await pushToCloud() } finally {
      // pushToCloud 안에서 합치느라 저장소가 바뀌어도 다시 올리지 않게 잠시 막음
      setTimeout(() => { pushing = false }, 500)
    }
  }, 3000)
}
