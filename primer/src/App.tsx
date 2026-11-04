// 라우트 정의 + 동기화 초기화 + 하단 네비게이션
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './features/home/Home'
import Courses from './features/courses/Courses'
import Review from './features/review/Review'
import GrammarLearn from './features/grammar/GrammarLearn'
import Settings from './features/settings/Settings'
import BottomNav from './components/BottomNav'
import MemoFab from './components/MemoFab'
import { initSync, isSyncConfigured } from './utils/sync'

export default function App() {
  // 앱 시작 시 Firebase 동기화 초기화
  useEffect(() => {
    if (isSyncConfigured()) {
      initSync(() => {
        // 로그인 상태 변경 시 페이지 갱신 불필요 (각 컴포넌트에서 처리)
      })
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Settings />} />
        <Route path="/learn/:lessonId" element={<GrammarLearn />} />
        {/* 기존 경로 호환 */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
      <MemoFab />
    </>
  )
}
