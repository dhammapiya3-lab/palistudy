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

      <div className="space-y-3 animate-slideUp delay-2">
        {filteredCategories.length === 0 && (
          <div className="text-center py-12" role="status">
            <p className="text-sm font-bold">검색 결과가 없습니다</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              과 이름이나 배우는 낱말(예: kaññā, 소녀)로 찾아 보세요.
            </p>
          </div>
        )}
        {filteredCategories.map(cat => {
          const { done, total } = getSectionCompletion(cat.range)
          
          return (
            <CategorySection
              key={cat.key}
              category={cat}
              lessons={cat.lessons}
              isOpen={openSections[cat.key] ?? false}
              onToggle={() => toggleSection(cat.key)}
              isSearchActive={!!search.trim()}
              done={done}
              total={total}
              getLessonState={getLessonState}
              onCourseClick={(lesson) => {
                nav(`/learn/${lesson.id}`, { state: { from: '/courses' } })
              }}
            />
          )
        })}
      </div>
     </div>
    </div>
  )
}
