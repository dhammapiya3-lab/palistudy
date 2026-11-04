// 과목 리스트 — 카테고리별 접이식 + 검색 + 진도 표시
import { useNavigate } from 'react-router-dom'
import { useCourses } from './hooks/useCourses'
import CourseHeader from './components/CourseHeader'
import SearchBar from './components/SearchBar'
import CategorySection from './components/CategorySection'

export default function Courses() {
  const nav = useNavigate()
  const {
    search, setSearch,
    openSections, toggleSection,
    recordStudy,
    filteredCategories,
    getLessonState,
    getSectionCompletion,
    stats
  } = useCourses()

  return (
    <div className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
     <div className="max-w-lg mx-auto px-4">

      <CourseHeader 
        completed={stats.completed} 
        total={stats.total} 
      />

      <SearchBar 
        value={search} 
        onChange={setSearch} 
      />

      <div className="px-5 space-y-3 animate-slideUp delay-2">
        {filteredCategories.map(cat => {
          const { done, total } = getSectionCompletion(cat.range)
          
          return (
            <CategorySection
              key={cat.key}
              category={cat}
              isOpen={openSections[cat.key] ?? false}
              onToggle={() => toggleSection(cat.key)}
              isSearchActive={!!search.trim()}
              done={done}
              total={total}
              getLessonState={getLessonState}
              onCourseClick={(lesson) => {
                recordStudy()
                nav(`/learn/${lesson.id}`)
              }}
            />
          )
        })}
      </div>
     </div>
    </div>
  )
}
