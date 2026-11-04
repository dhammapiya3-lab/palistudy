import ChevronIcon from './ChevronIcon'
import CourseCard from './CourseCard'
import { LESSONS } from '../../grammar/lessons'

interface CategorySectionProps {
  category: {
    key: string
    label: string
    desc: string
    range: readonly [number, number]
  }
  isOpen: boolean
  onToggle: () => void
  isSearchActive: boolean
  done: number
  total: number
  getLessonState: (idx: number) => any
  onCourseClick: (lesson: any) => void
}

export default function CategorySection({
  category,
  isOpen,
  onToggle,
  isSearchActive,
  done,
  total,
  getLessonState,
  onCourseClick
}: CategorySectionProps) {
  const isAllDone = done === total && total > 0
  const sectionPct = total > 0 ? Math.round((done / total) * 100) : 0
  const catLessons = LESSONS.slice(category.range[0], category.range[1] + 1)
  const effectivelyOpen = isOpen || isSearchActive

  return (
    <div
      className="rounded-2xl overflow-hidden card-shadow transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: isAllDone
          ? '1.5px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))'
          : '1.5px solid var(--color-border)',
      }}>
      
      {/* 카테고리 헤더 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left
          transition-all duration-300 active:scale-[0.99]"
        style={{ minHeight: '48px' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm truncate">{category.label}</span>
            <span className="badge text-[10px]">{done}/{total}</span>
          </div>
          <p className="text-[11px] mt-0.5 truncate"
            style={{ color: 'var(--color-text-secondary)' }}>
            {category.desc}
          </p>
        </div>

        {/* 미니 진행률 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-12 h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-border)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${sectionPct}%`,
                backgroundColor: isAllDone ? 'var(--color-accent)' : 'var(--color-primary)',
              }} />
          </div>
          <ChevronIcon open={effectivelyOpen} />
        </div>
      </button>

      {/* 접이식 과 목록 */}
      <div className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: effectivelyOpen ? `${catLessons.length * 80 + 16}px` : '0px',
          opacity: effectivelyOpen ? 1 : 0,
        }}>
        <div className="px-3 pb-3 space-y-2">
          {catLessons.map(lesson => {
            const globalIdx = LESSONS.findIndex(l => l.id === lesson.id)
            const { isCompleted, isCurrent, pct } = getLessonState(globalIdx)

            return (
              <CourseCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                pct={pct}
                onClick={() => onCourseClick(lesson)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
