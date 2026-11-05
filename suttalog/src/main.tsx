import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { runMigrations } from './utils/migrate'
import { applySavedDisplayPrefs } from './utils/display-prefs'

// 새로고침 복원: 404.html이 ?p=원래경로(+?쿼리 +#해시) 로 보내주면 그 주소로 되돌림
try {
  const p = new URLSearchParams(window.location.search).get('p')
  if (p && p.startsWith('/palistudy/suttalog/')) {
    window.history.replaceState(null, '', p)
  }
} catch (e) {
  console.error('주소 복원 실패', e)
}

// 예전 형식으로 저장된 진도·메모를 새 형식으로 옮김(한 번만 실제로 바뀜)
runMigrations()

// 앱 시작 시 빠알리 글자 크기 적용(설정 화면과 같은 변수)
const savedFontSize = localStorage.getItem('suttalog-fontsize')
if (savedFontSize) {
  document.documentElement.style.setProperty('--pali-fontsize', `${savedFontSize}px`)
}

// 큰 글씨 모드
applySavedDisplayPrefs()

// 서비스워커 — 같은 빌드에서는 같은 주소(?v=빌드시각)로 등록해 캐시를 유지.
// 강제 새로고침은 하지 않음: 새 빌드는 앱을 닫았다 다시 열 때 자연스럽게 적용됨.
if ('serviceWorker' in navigator) {
  if (__BUILD_TIME__ === 'dev') {
    // 개발 중: 등록하지 않고, 남아 있는 이 앱의 서비스워커·캐시만 정리
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.filter(r => r.scope.includes('/palistudy/suttalog/')).forEach(r => r.unregister())
    })
    if (window.caches) {
      caches.keys().then(keys => keys.filter(k => k.startsWith('suttalog-')).forEach(k => caches.delete(k)))
    }
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`/palistudy/suttalog/sw.js?v=${__BUILD_TIME__}`, { scope: '/palistudy/suttalog/' })
        .catch(e => console.warn('서비스워커 등록 실패', e))
    })
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
