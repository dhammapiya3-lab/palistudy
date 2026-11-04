import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Onboarding from './features/onboarding/Onboarding'
import Home from './features/home/Home'
import StudyMap from './features/studymap/StudyMap'
import SkillDetail from './features/studymap/SkillDetail'
import AlphabetLesson from './features/lessons/AlphabetLesson'
import VocabLesson from './features/lessons/VocabLesson'
import GrammarLesson from './features/lessons/GrammarLesson'
import ReadingLesson from './features/lessons/ReadingLesson'
import ScriptureLearn from './features/lessons/ScriptureLearn'
import Lesson from './features/lesson/Lesson'
import LessonComplete from './features/lesson/LessonComplete'
import Review from './features/review/Review'
import Profile from './features/profile/Profile'
import Settings from './features/settings/SettingsPage'
import MemoList from './features/memo/MemoList'
import { useState } from 'react'

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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<StudyMap />} />
          <Route path="/skill/:skillId" element={<SkillDetail />} />
          <Route path="/review" element={<Review />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/memos" element={<MemoList />} />
        </Route>
        {/* 학습 화면도 하단 메뉴 표시 */}
        <Route element={<Layout />}>
          <Route path="/learn/alphabet/:lessonId" element={<AlphabetLesson />} />
          <Route path="/learn/vocab/:lessonId" element={<VocabLesson />} />
          <Route path="/learn/grammar/:lessonId" element={<GrammarLesson />} />
          <Route path="/learn/reading/:lessonId" element={<ReadingLesson />} />
          <Route path="/learn/scripture/:lessonId" element={<ScriptureLearn />} />
          <Route path="/lesson/:skillId" element={<Lesson />} />
          <Route path="/lesson-complete" element={<LessonComplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
