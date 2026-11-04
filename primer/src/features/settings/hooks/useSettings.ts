import { useState, useEffect } from 'react'
import { isSyncConfigured, isSyncLoggedIn, getSyncUser, initSync, syncLogin, syncLogout, pushToCloud, pullFromCloud } from '../../../utils/sync'
import { setFontSize as applyFontSize, type FontSizeKey } from '../../../utils/font-size'
import { useStore } from '../../../store/useStore'

export function useSettings() {
  const store = useStore()
  
  const [syncLoggedIn, setSyncLoggedIn] = useState(isSyncLoggedIn())
  const [syncLoading, setSyncLoading] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  
  const syncUser = getSyncUser()
  const syncAvailable = isSyncConfigured()

  useEffect(() => {
    if (syncAvailable) {
      initSync((loggedIn) => setSyncLoggedIn(loggedIn))
    }
  }, [syncAvailable])

  const toggleWriting = () => store.setWritingEnabled(!store.writingEnabled)
  
  const toggleTheme = () => {
    const next = store.theme === 'dark' ? 'light' : 'dark'
    store.setTheme(next)
  }

  const changeFontSize = (key: FontSizeKey) => {
    store.setFontSize(key as any)
    applyFontSize(key)
  }

  const handleSyncLogin = async () => {
    setSyncLoading(true)
    const ok = await syncLogin()
    setSyncLoading(false)
    if (ok) setSyncMessage('로그인 성공! 진도를 동기화합니다.')
    else setSyncMessage('로그인 실패. 다시 시도해주세요.')
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
    setSyncMessage(ok ? '클라우드에 저장 완료!' : '저장 실패')
    setTimeout(() => setSyncMessage(''), 3000)
  }

  const handlePull = async () => {
    setSyncLoading(true)
    const ok = await pullFromCloud()
    setSyncLoading(false)
    setSyncMessage(ok ? '클라우드에서 가져오기 완료!' : '가져오기 실패')
    if (ok) setTimeout(() => window.location.reload(), 1000)
    else setTimeout(() => setSyncMessage(''), 3000)
  }

  const resetAllData = () => {
    if (!confirm('모든 진도를 초기화하시겠습니까?\n(연속 학습일, 학습 기록도 함께 초기화됩니다)')) return
    store.resetProgress()
    store.resetStats()
    // 레거시 키 삭제 (호환성)
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('pali-primer-') || key?.startsWith('pali-study-')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    window.location.href = '/'
  }

  return {
    settings: {
      writing: store.writingEnabled,
      theme: store.theme,
      fontSize: store.fontSize as FontSizeKey,
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
      toggleTheme,
      changeFontSize,
      handleSyncLogin,
      handleSyncLogout,
      handlePush,
      handlePull,
      resetAllData,
    }
  }
}
