import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 새로고침 복원: 404.html이 ?p=원래경로 로 보내주면 그 주소로 되돌림
try {
  const p = new URLSearchParams(window.location.search).get('p')
  if (p && p.startsWith('/dhammapiya/suttalog/')) {
    window.history.replaceState(null, '', p)
  }
} catch (e) {
  console.error('주소 복원 실패', e)
}

// 앱 시작 시 글자 크기 초기 적용
const savedFontSize = localStorage.getItem('suttalog-fontsize')
if (savedFontSize) {
  document.documentElement.style.setProperty('--font-size-base', `${savedFontSize}px`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
