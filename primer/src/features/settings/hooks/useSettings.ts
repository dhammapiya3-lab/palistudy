import { useState, useEffect } from 'react'
import { isSyncConfigured, isSyncLoggedIn, getSyncUser, initSync, syncLogin, syncLogout, pushToCloud, pullFromCloud, overwriteCloud } from '../../../utils/sync'
import { setFontSize as applyFontSize, getSavedFontSize, type FontSizeKey } from '../../../utils/font-size'
import { isDarkTheme } from '../../../utils/theme'
import { useStore } from '../../../store/useStore'
import { useWordSrs } from '../../../store/useWordSrs'
import { isPrefetchEnabled, setPrefetchEnabled } from '../offline-prefetch'

export function useSettings() {
  const store = useStore()
  
  const [syncLoggedIn, setSyncLoggedIn] = useState(isSyncLoggedIn())
  const [syncLoading, setSyncLoading] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(getSavedFontSize())
  
  const syncUser = getSyncUser()
  const syncAvailable = isSyncConfigured()

  // 설정 화면을 열면 로그인 준비 (Firebase는 이때 처음 불러옴)
  useEffect(() => {
    if (syncAvailable) {
      initSync((loggedIn) => setSyncLoggedIn(loggedIn))
    }
  }, [syncAvailable])

  const toggleWriting = () => store.setWritingEnabled(!store.writingEnabled)

  // 쉬운 화면 — 켜면 글씨를 '매우 크게'로 (끄면 전에 쓰던 크기로 되돌림)
  const toggleEasyMode = () => {
    const on = !store.easyMode
    store.setEasyMode(on)
    try {
      if (on) {
        localStorage.setItem('primer-font-before-easy', getSavedFontSize())
        changeFontSize('xlarge')
      } else {
        const prev = localStorage.getItem('primer-font-before-easy') as FontSizeKey | null
        if (prev) changeFontSize(prev)
        localStorage.removeItem('primer-font-before-easy')
      }
    } catch { /* 무시 */ }
  }
  const setAudioRate = (r: 0.75 | 1) => store.setAudioRate(r)
  const setDailyGoal = (m: 5 | 10 | 15) => store.setDailyGoalMin(m)
  // 처음 안내 다시 보기 — 홈으로 가면 안내가 다시 뜸
  const replayOnboarding = () => store.setOnboardingSeen(false)

  const [prefetch, setPrefetchState] = useState(isPrefetchEnabled())
  const togglePrefetch = () => { setPrefetchEnabled(!prefetch); setPrefetchState(!prefetch) }
  
  // 다크 모드 스위치: 지금 화면 기준으로 반대로 (휴대폰 설정 따르기 → 직접 고른 값)
  const isDark = isDarkTheme(store.theme)
  const toggleTheme = () => store.setTheme(isDark ? 'light' : 'dark')
  const followSystemTheme = () => store.setTheme('system')

  const changeFontSize = (key: FontSizeKey) => {
    store.setFontSize(key)
    applyFontSize(key)
    setFontSizeState(key)
  }

  const handleSyncLogin = async () => {
    setSyncLoading(true)
    const ok = await syncLogin()
    setSyncLoading(false)
    if (ok) { setSyncLoggedIn(true); setSyncMessage('로그인했어요. 진도·연속 학습일·설정을 맞추는 중입니다.') }
    else setSyncMessage('로그인하지 못했어요. 다시 시도해 주세요.')
    setTimeout(() => setSyncMessage(''), 3000)
  }

  const handleSyncLogout = async () => {
    await syncLogout()
    setSyncLoggedIn(false)
    setSyncMessage('로그아웃되었습니다.')
    setTimeout(() => setSyncMessage(''), 3000)
  }

  const handlePush = async () => {
    setSyncLoading(true)
    const ok = await pushToCloud()
    setSyncLoading(false)
    setSyncMessage(ok ? '클라우드에 저장했어요. (다른 기기의 진도와 합쳐서 저장)' : '저장하지 못했어요. 인터넷 연결을 확인해 주세요.')
    setTimeout(() => setSyncMessage(''), 3000)
  }

  const handlePull = async () => {
    setSyncLoading(true)
    const ok = await pullFromCloud()
    setSyncLoading(false)
    setSyncMessage(ok ? '클라우드에서 가져왔어요. 진도는 더 많이 한 쪽으로 맞췄습니다.' : '가져오지 못했어요. 인터넷 연결을 확인해 주세요.')
    setTimeout(() => setSyncMessage(''), 3000)
  }

  const resetAllData = async () => {
    const msg = syncLoggedIn
      ? '모든 진도를 초기화하시겠습니까?\n(연속 학습일, 학습 기록도 함께 초기화되고, 클라우드에 저장된 진도도 지워집니다)'
      : '모든 진도를 초기화하시겠습니까?\n(연속 학습일, 학습 기록도 함께 초기화됩니다)'
    if (!confirm(msg)) return
    store.resetProgress()
    store.resetStats()
    useWordSrs.getState().reset()
    useStore.setState({ studySeconds: {}, quizRecords: {}, seenWords: {} })
    localStorage.removeItem('primer-milestones-seen')
    localStorage.removeItem('primer-resume')
    // 레거시 키 삭제 (호환성)
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('pali-primer-') || key?.startsWith('pali-study-')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    localStorage.removeItem('pali-lesson-session')
    localStorage.removeItem('pali-review-order')
    // 로그인 중이면 클라우드도 비움 (그러지 않으면 다음 동기화 때 진도가 되살아남)
    if (syncLoggedIn) await overwriteCloud()
    // 앱 첫 화면으로 (사이트 최상위가 아니라 /palistudy/primer/)
    window.location.href = import.meta.env.BASE_URL || '/palistudy/primer/'
  }

  return {
    settings: {
      writing: store.writingEnabled,
      easyMode: store.easyMode,
      audioRate: store.audioRate,
      dailyGoal: store.dailyGoalMin,
      prefetch,
      theme: store.theme,
      isDark,
      fontSize,
    },
    sync: {
      available: syncAvailable,
      loggedIn: syncLoggedIn,
      loading: syncLoading,
      message: syncMessage,
      user: syncUser,
    },
    actions: {
      toggleWriting,
      toggleEasyMode,
      setAudioRate,
      setDailyGoal,
      replayOnboarding,
      togglePrefetch,
      toggleTheme,
      followSystemTheme,
      changeFontSize,
      handleSyncLogin,
      handleSyncLogout,
      handlePush,
      handlePull,
      resetAllData,
    }
  }
}
