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
    stats,
    wordHits,
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

      {/* 문법표 바로가기 */}
      {!search.trim() && (
        <button onClick={() => nav('/tables')}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 mb-3 text-left active:scale-[0.99] transition-transform"
          style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', minHeight: 48 }}>
          <span className="text-xl" aria-hidden="true">📊</span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-sm">문법표</span>
            <span className="block text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>명사 격변화 · 동사 활용 · 대명사를 한눈에 · 경전 연결</span>
          </span>
          <span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        </button>
      )}

      {/* 검색: 낱말 줄 (뜻 + 그 단계로 가기) */}
      {wordHits.length > 0 && (
        <section aria-label="낱말 검색 결과" className="mb-3 rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
          <p className="text-[11px] font-semibold px-4 pt-3 pb-1" style={{ color: 'var(--color-text-secondary)' }}>낱말</p>
          <ul>
            {wordHits.map(w => (
              <li key={w.stepId}>
                <button onClick={() => nav(`/learn/${w.lessonId}?step=${w.index}`, { state: { from: '/courses' } })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left" style={{ borderTop: '1px solid var(--color-border)', minHeight: 48 }}>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm"><b lang="pi" style={{ color: 'var(--color-primary)' }}>{w.word}</b> <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{w.pronKo}</span></span>
                    <span className="block text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{w.meaning}</span>
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {w.lessonTitle.split(':')[0]} {w.index + 1}단계로 ›
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-3 animate-slideUp delay-2">
        {filteredCategories.length === 0 && wordHits.length === 0 && (
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
