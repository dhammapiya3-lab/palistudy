import ChevronIcon from './ChevronIcon'
import CourseCard from './CourseCard'
import { LESSONS } from '../../grammar/lessons'
import type { LessonMeta } from '../../grammar/types'

interface LessonState {
  isCompleted: boolean
  isLocked: boolean
  isCurrent: boolean
  pct: number
}

interface CategorySectionProps {
  category: {
    key: string
    label: string
    desc: string
    range: readonly [number, number]
  }
  lessons: LessonMeta[]          // 보여 줄 과 (검색 중이면 맞는 과만)
  isOpen: boolean
  onToggle: () => void
  isSearchActive: boolean
  done: number
  total: number
  getLessonState: (idx: number) => LessonState
  onCourseClick: (lesson: LessonMeta) => void
}

export default function CategorySection({
  category,
  lessons,
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
  const effectivelyOpen = isOpen || isSearchActive
  const panelId = `cat-${category.key}`

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
        aria-expanded={effectivelyOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left
          transition-all duration-300 active:scale-[0.99]"
        style={{ minHeight: '48px' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm">{category.label}</span>
            <span className="badge text-[10px] shrink-0">{done}/{total}</span>
          </div>
          {/* 설명 + 미니 진행률 (둘째 줄 — 묶음 이름이 잘리지 않게) */}
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[11px] truncate"
              style={{ color: 'var(--color-text-secondary)' }}>
              {category.desc}
            </p>
            <div className="w-12 h-1.5 rounded-full overflow-hidden shrink-0"
              style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true">
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${sectionPct}%`,
                  backgroundColor: isAllDone ? 'var(--color-accent)' : 'var(--color-primary)',
                }} />
            </div>
          </div>
        </div>

        <span className="shrink-0"><ChevronIcon open={effectivelyOpen} /></span>
      </button>

      {/* 접이식 과 목록 — 내용 높이만큼 자연스럽게 펼침 (큰 글씨에서도 잘리지 않음) */}
      <div
        id={panelId}
        className="grid transition-all duration-500"
        style={{
          gridTemplateRows: effectivelyOpen ? '1fr' : '0fr',
          opacity: effectivelyOpen ? 1 : 0,
        }}
        inert={!effectivelyOpen}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-3 pb-3 space-y-2">
            {lessons.map(lesson => {
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
    </div>
  )
}
