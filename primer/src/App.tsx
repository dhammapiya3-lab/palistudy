// 라우트 정의 + 동기화 초기화 + 하단 네비게이션
import { useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Home from './features/home/Home'
import Courses from './features/courses/Courses'
import Review from './features/review/Review'
import GrammarLearn from './features/grammar/GrammarLearn'
import Settings from './features/settings/Settings'
import BottomNav from './components/BottomNav'
import MemoFab from './components/MemoFab'
import UpdateBanner from './components/UpdateBanner'
import { initSyncIfSignedIn } from './utils/sync'

// 과가 바뀌면 화면 상태(단계 위치)를 새로 시작
function KeyedGrammarLearn() {
  const { lessonId } = useParams()
  return <GrammarLearn key={lessonId} />
}

export default function App() {
  // 로그인한 적이 있을 때만 Firebase를 불러와 동기화 (처음 방문자는 Firebase를 받지 않음)
  useEffect(() => {
    initSyncIfSignedIn()
  }, [])

  return (
    <div className="overflow-x-clip min-h-screen">
      <UpdateBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Settings />} />
        <Route path="/learn/:lessonId" element={<KeyedGrammarLearn />} />
        {/* 기존 경로 호환 */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
      <MemoFab />
    </div>
  )
}
