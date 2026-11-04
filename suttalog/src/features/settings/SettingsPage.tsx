// 설정 페이지
import { useState, useEffect } from 'react'
import { isSyncConfigured, isSyncLoggedIn, getSyncUser, initSync, syncLogin, syncLogout, pullFromCloud, pushToCloud } from '../../utils/sync'
import { clearGithubConfig, getGithubUser, githubIsConfigured, setGithubConfig } from '../../utils/memo-github'

export default function SettingsPage() {
  const [soundOn, setSoundOn] = useState(localStorage.getItem('suttalog-sound') !== 'off')
  const [syncLoggedIn, setSyncLoggedIn] = useState(isSyncLoggedIn())
  const [syncUser, setSyncUser] = useState(getSyncUser())
  const [syncing, setSyncing] = useState(false)
  const syncReady = isSyncConfigured()

  useEffect(() => {
    if (syncReady) {
      initSync((loggedIn) => {
        setSyncLoggedIn(loggedIn)
        setSyncUser(getSyncUser())
      })
    }
  }, [syncReady])
  const [writingOn, setWritingOn] = useState(localStorage.getItem('suttalog-writing') !== 'off')

  // GitHub 메모 공유
  const [ghPat, setGhPat] = useState('')
  const [ghUser, setGhUser] = useState(getGithubUser())
  const [ghConfigured, setGhConfigured] = useState(githubIsConfigured())
  const saveGithubConfig = () => {
    if (!ghPat) { alert('PAT를 입력하세요.'); return }
    setGithubConfig(ghPat, ghUser || 'anonymous')
    setGhConfigured(true)
    setGhPat('')
    alert('GitHub 메모 공유가 활성화되었습니다.')
  }
  const removeGithubConfig = () => {
    if (!confirm('GitHub 토큰을 삭제할까요?')) return
    clearGithubConfig()
    setGhUser('')
    setGhConfigured(false)
  }
  const [fontSize, setFontSize] = useState(Number(localStorage.getItem('suttalog-fontsize')) || 16)

  // SSOT: 연꽃(목숨) 개수 — 기본값 5, 범위 1~10
  const [heartsCount, setHeartsCount] = useState(Number(localStorage.getItem('suttalog-hearts-count') || '5'))

  const changeHeartsCount = (n: number) => {
    const clamped = Math.max(1, Math.min(10, n))
    setHeartsCount(clamped)
    localStorage.setItem('suttalog-hearts-count', String(clamped))
  }

  // 단어 설명 단계 설정
  // 'all'   : 모두 표시 (기본)
  // 'first' : 과 내 첫 등장만 (중복 단어 스킵)
  // 'limit' : 전체 x회 이상 학습한 단어 스킵
  const [wordMode, setWordMode] = useState<'all' | 'first' | 'limit'>(
    (localStorage.getItem('suttalog-word-mode') as 'all' | 'first' | 'limit') || 'all'
  )
  const [wordLimit, setWordLimit] = useState(Number(localStorage.getItem('suttalog-word-limit') || '3'))

  const changeWordMode = (mode: 'all' | 'first' | 'limit') => {
    setWordMode(mode)
    localStorage.setItem('suttalog-word-mode', mode)
  }

  const changeWordLimit = (n: number) => {
    const clamped = Math.max(1, Math.min(20, n))
    setWordLimit(clamped)
    localStorage.setItem('suttalog-word-limit', String(clamped))
  }

  const resetWordCounts = () => {
    localStorage.removeItem('suttalog-word-counts')
    alert('단어 학습 횟수가 초기화되었습니다.')
  }

  const toggleWriting = () => {
    const next = !writingOn
    setWritingOn(next)
    localStorage.setItem('suttalog-writing', next ? 'on' : 'off')
  }

  const changeFontSize = (size: number) => {
    const clamped = Math.max(12, Math.min(24, size))
    setFontSize(clamped)
    localStorage.setItem('suttalog-fontsize', String(clamped))
    document.documentElement.style.setProperty('--pali-fontsize', `${clamped}px`)
  }

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('suttalog-sound', next ? 'on' : 'off')
    if (!next) speechSynthesis.cancel()
  }

  const resetAll = () => {
    if (!confirm('모든 학습 데이터를 초기화하시겠습니까?\n진도, 설정이 모두 삭제됩니다.')) return
    localStorage.clear()
    // IndexedDB 삭제
    indexedDB.deleteDatabase('suttalog')
    window.location.href = '/dhammapiya/suttalog/'
  }

  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="text-xl font-bold">⚙️ 설정</h1>

      {/* 소리 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">🔊 발음 소리</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>단어/구절 탭 시 발음 재생</p>
          </div>
          <button onClick={toggleSound}
            className="w-12 h-7 rounded-full transition-all relative"
            style={{ backgroundColor: soundOn ? 'var(--color-accent)' : 'var(--color-border)' }}>
            <div className="absolute w-5 h-5 bg-white rounded-full top-1 transition-all"
              style={{ left: soundOn ? 24 : 4 }} />
          </button>
        </div>
      </div>

      {/* 연꽃(목숨) 개수 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-1">🪷 연꽃 개수 (목숨)</p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          오답 시 차감되는 연꽃 개수 (1~10)
        </p>
        <div className="flex items-center gap-3">
          <button onClick={() => changeHeartsCount(heartsCount - 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold active:scale-90"
            style={{ backgroundColor: 'var(--color-border)' }}>−</button>
          <div className="flex-1 flex items-center justify-center gap-1">
            {Array.from({ length: heartsCount }, (_, i) => (
              <span key={i} className="text-base">🪷</span>
            ))}
          </div>
          <button onClick={() => changeHeartsCount(heartsCount + 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold active:scale-90"
            style={{ backgroundColor: 'var(--color-border)' }}>+</button>
        </div>
        <p className="text-center mt-2 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
          {heartsCount}개
        </p>
      </div>

      {/* 📝 GitHub 메모 공유 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-1">📝 메모 GitHub 공유</p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          작성한 메모를 dhammapiya3-lab/dhammapiya 저장소에 push하여 공유합니다. PAT는 브라우저 localStorage에만 저장.
        </p>
        {ghConfigured ? (
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>
              ✅ 활성화됨 — 사용자명: <b>{ghUser || 'anonymous'}</b>
            </p>
            <button onClick={removeGithubConfig} className="w-full py-2 rounded-lg text-xs"
              style={{ border: '1px solid var(--color-border)', color: '#EF5350' }}>🗑️ 토큰 삭제</button>
          </div>
        ) : (
          <div className="space-y-2">
            <input type="text" value={ghUser} onChange={e => setGhUser(e.target.value)} placeholder="GitHub 사용자명 (선택)"
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
            <input type="password" value={ghPat} onChange={e => setGhPat(e.target.value)} placeholder="GitHub PAT (Contents: write)"
              className="w-full px-3 py-2 rounded-lg text-sm font-mono"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
            <button onClick={saveGithubConfig} className="w-full py-2 rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}>저장</button>
            <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
              GitHub → Settings → Developer settings → Personal access tokens → Fine-grained → Repository: dhammapiya, Permissions: Contents R/W
            </p>
          </div>
        )}
      </div>

      {/* 동기화 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-2">🔄 기기간 동기화</p>
        {!syncReady ? (
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>준비 중 (Firebase 설정 필요)</p>
        ) : syncLoggedIn ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              {syncUser?.photoURL && <img src={syncUser.photoURL} className="w-8 h-8 rounded-full" />}
              <div>
                <p className="text-xs font-medium">{syncUser?.displayName}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{syncUser?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={async () => { setSyncing(true); await pullFromCloud(); setSyncing(false); alert('동기화 완료!') }}
                disabled={syncing}
                className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
                style={{ backgroundColor: 'var(--color-accent)' }}>
                {syncing ? '동기화 중...' : '📥 가져오기'}
              </button>
              <button onClick={async () => { setSyncing(true); await pushToCloud(); setSyncing(false); alert('업로드 완료!') }}
                disabled={syncing}
                className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                📤 올리기
              </button>
              <button onClick={async () => { await syncLogout(); setSyncLoggedIn(false); setSyncUser(null) }}
                className="px-3 py-2 rounded-lg text-xs"
                style={{ border: '1px solid var(--color-border)' }}>
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <button onClick={async () => { await syncLogin(); setSyncLoggedIn(isSyncLoggedIn()); setSyncUser(getSyncUser()) }}
            className="w-full py-3 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: '#4285F4' }}>
            <span>🔑</span> Google 계정으로 로그인
          </button>
        )}
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Google 로그인으로 여러 기기에서 학습 진도를 동기화합니다
        </p>
      </div>

      {/* 쓰기 모드 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">✍️ 쓰기 모드</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>단어 스펠링 직접 입력 (특수문자 키보드 제공)</p>
          </div>
          <button onClick={toggleWriting}
            className="w-12 h-7 rounded-full transition-all relative"
            style={{ backgroundColor: writingOn ? 'var(--color-accent)' : 'var(--color-border)' }}>
            <div className="absolute w-5 h-5 bg-white rounded-full top-1 transition-all"
              style={{ left: writingOn ? 24 : 4 }} />
          </button>
        </div>
      </div>

      {/* 단어 설명 단계 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-1">📚 단어 설명 단계</p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          경전 학습 중 단어 해설(teach) 스텝 표시 기준
        </p>

        {/* 모드 선택 */}
        <div className="space-y-2">
          {([
            { key: 'all',   icon: '📖', label: '모두 표시', desc: '모든 단어 해설 표시 (기본값)' },
            { key: 'first', icon: '1️⃣', label: '과 내 첫 등장만', desc: '같은 과에서 이미 설명한 단어 제외' },
            { key: 'limit', icon: '🔢', label: '학습 횟수 제한', desc: '전체 학습에서 x회 이상 본 단어 제외' },
          ] as const).map(({ key, icon, label, desc }) => (
            <button
              key={key}
              onClick={() => changeWordMode(key)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
              style={{
                backgroundColor: wordMode === key ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))' : 'var(--color-bg)',
                border: wordMode === key ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
              }}
            >
              <span className="text-lg">{icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: wordMode === key ? 'var(--color-primary)' : 'var(--color-text)' }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ border: `2px solid ${wordMode === key ? 'var(--color-primary)' : 'var(--color-border)'}`, backgroundColor: wordMode === key ? 'var(--color-primary)' : 'transparent' }}>
                {wordMode === key && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>

        {/* 횟수 제한 스텝퍼 */}
        {wordMode === 'limit' && (
          <div className="mt-3 pt-3 flex items-center gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="text-sm flex-1">제외 기준 횟수</p>
            <button onClick={() => changeWordLimit(wordLimit - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: 'var(--color-border)' }}>−</button>
            <span className="text-base font-bold w-8 text-center" style={{ color: 'var(--color-primary)' }}>{wordLimit}</span>
            <button onClick={() => changeWordLimit(wordLimit + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: 'var(--color-border)' }}>+</button>
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>회 이상 시 제외</span>
          </div>
        )}

        {/* 학습 횟수 초기화 */}
        {wordMode !== 'all' && (
          <button onClick={resetWordCounts}
            className="mt-3 w-full py-2 rounded-xl text-xs font-medium"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
            🔄 단어 학습 횟수 초기화
          </button>
        )}
      </div>

      {/* 글자 크기 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-3">🔤 경전 글자 크기</p>
        <div className="flex items-center gap-4">
          <button onClick={() => changeFontSize(fontSize - 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: 'var(--color-border)' }}>−</button>
          <span className="text-sm font-mono flex-1 text-center">{fontSize}px</span>
          <button onClick={() => changeFontSize(fontSize + 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: 'var(--color-border)' }}>+</button>
        </div>
        <p className="pali-text mt-3 text-center" style={{ fontSize: `${fontSize}px`, color: 'var(--color-primary)' }}>
          Evaṃ me sutaṃ
        </p>
        <p className="text-center mt-1" style={{ fontSize: `${fontSize - 2}px` }}>
          이와 같이 나는 들었다
        </p>
      </div>

      {/* 정보 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <h3 className="text-sm font-semibold mb-2">경전으로 배우기 정보</h3>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>버전 0.1.0</p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>경전 데이터: SuttaCentral.net (CC BY-NC)</p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>번역: Bhikkhu Sujato (영어)</p>
      </div>

      {/* 초기화 */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <h3 className="text-sm font-semibold mb-2 text-red-500">초기화</h3>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>모든 학습 진도, 설정, 데이터가 삭제됩니다.</p>
        <button onClick={resetAll}
          className="w-full py-3 rounded-xl text-white font-bold text-sm active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#EF4444' }}>
          🗑️ 전체 초기화
        </button>
      </div>
    </div>
  )
}
