import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import Layout from './components/Layout'
import Onboarding from './features/onboarding/Onboarding'
import Home from './features/home/Home'

// 홈 외의 화면은 필요할 때 불러옴(첫 로딩을 가볍게). 경전 데이터(약 2MB)는 경전 학습 화면을 열 때만 받음.
const StudyMap = lazy(() => import('./features/studymap/StudyMap'))
const SkillDetail = lazy(() => import('./features/studymap/SkillDetail'))
const AlphabetLesson = lazy(() => import('./features/lessons/AlphabetLesson'))
const VocabLesson = lazy(() => import('./features/lessons/VocabLesson'))
const GrammarLesson = lazy(() => import('./features/lessons/GrammarLesson'))
const ReadingLesson = lazy(() => import('./features/lessons/ReadingLesson'))
const ScriptureLearn = lazy(() => import('./features/lessons/ScriptureLearn'))
const Lesson = lazy(() => import('./features/lesson/Lesson'))
const LessonComplete = lazy(() => import('./features/lesson/LessonComplete'))
const Review = lazy(() => import('./features/review/Review'))
const Profile = lazy(() => import('./features/profile/Profile'))
const Settings = lazy(() => import('./features/settings/SettingsPage'))
const MemoList = lazy(() => import('./features/memo/MemoList'))
const NotFound = lazy(() => import('./features/notfound/NotFound'))

function Loading() {
  return (
    <div className="flex items-center justify-center pt-32" role="status" aria-live="polite">
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>불러오는 중…</span>
    </div>
  )
}

export default function App() {
  const [onboarded, setOnboarded] = useState(
    localStorage.getItem('suttalog-onboarded') === 'true' || window.location.search.includes('skip')
  )

  const completeOnboarding = () => {
    localStorage.setItem('suttalog-onboarded', 'true')
    setOnboarded(true)
  }

  if (!onboarded) {
    return (
      <BrowserRouter basename="/palistudy/suttalog">
        <Onboarding onComplete={completeOnboarding} />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter basename="/palistudy/suttalog">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<StudyMap />} />
            <Route path="/skill/:skillId" element={<SkillDetail />} />
            <Route path="/review" element={<Review />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/memos" element={<MemoList />} />
            {/* 학습 화면(/learn/*)과 레슨 완료 화면은 Layout이 하단 메뉴를 숨김 */}
            <Route path="/learn/alphabet/:lessonId" element={<AlphabetLesson />} />
            <Route path="/learn/vocab/:lessonId" element={<VocabLesson />} />
            <Route path="/learn/grammar/:lessonId" element={<GrammarLesson />} />
            <Route path="/learn/reading/:lessonId" element={<ReadingLesson />} />
            <Route path="/learn/scripture/:lessonId" element={<ScriptureLearn />} />
            <Route path="/lesson/:skillId" element={<Lesson />} />
            <Route path="/lesson-complete" element={<LessonComplete />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
