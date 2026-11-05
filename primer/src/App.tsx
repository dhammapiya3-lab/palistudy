// 라우트 정의 + 동기화 초기화 + 하단 네비게이션
import { useEffect, lazy, Suspense } from 'react'
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
import { schedulePrefetch } from './features/settings/offline-prefetch'

// 복습 안쪽 화면·문법표는 열 때만 받음 (첫 화면을 가볍게)
const ReviewQuiz = lazy(() => import('./features/review/ReviewQuiz'))
const WordBook = lazy(() => import('./features/review/WordBook'))
const Recite = lazy(() => import('./features/review/Recite'))
const GrammarTables = lazy(() => import('./features/reference/GrammarTables'))

// 과가 바뀌면 화면 상태(단계 위치)를 새로 시작
function KeyedGrammarLearn() {
  const { lessonId } = useParams()
  return <GrammarLearn key={lessonId} />
}

export default function App() {
  // 로그인한 적이 있을 때만 Firebase를 불러와 동기화 (처음 방문자는 Firebase를 받지 않음)
  useEffect(() => {
    initSyncIfSignedIn()
    // 와이파이일 때 한가한 틈에 모든 과를 미리 받아 둠 (오프라인 대비, 설정에서 끌 수 있음)
    schedulePrefetch()
  }, [])

  return (
    <div className="overflow-x-clip min-h-screen">
      <UpdateBanner />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/quiz" element={<ReviewQuiz />} />
        <Route path="/review/words" element={<WordBook />} />
        <Route path="/review/recite" element={<Recite />} />
        <Route path="/tables" element={<GrammarTables />} />
        <Route path="/profile" element={<Settings />} />
        <Route path="/learn/:lessonId" element={<KeyedGrammarLearn />} />
        {/* 기존 경로 호환 */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </Suspense>
      <BottomNav />
      <MemoFab />
    </div>
  )
}
