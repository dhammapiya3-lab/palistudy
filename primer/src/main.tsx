import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { startVersionCheck } from './utils/version-check'
import { applyFontSize } from './utils/font-size'

// 글씨 크기 적용 (localStorage에서 읽어 html font-size 설정)
applyFontSize()

// 새 배포 감지 → 자동 새로고침
startVersionCheck()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
