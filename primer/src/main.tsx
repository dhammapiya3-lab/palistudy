import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { startVersionCheck } from './utils/version-check'
import { applyFontSize } from './utils/font-size'
import { applyTheme } from './utils/theme'
import { useStore } from './store/useStore'
import { normalizeProgress } from './utils/lesson-progress'

// 글씨 크기 적용 (localStorage에서 읽어 html font-size 설정)
applyFontSize()

// 저장된 화면 테마 적용 (밝게/어둡게/휴대폰 설정 따르기)
applyTheme(useStore.getState().theme)

// 예전 판에 저장된 진도를 새 형식으로 정리
normalizeProgress()

// 새 배포 확인 — 강제 새로고침 없이 '새 버전' 안내만
startVersionCheck()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
