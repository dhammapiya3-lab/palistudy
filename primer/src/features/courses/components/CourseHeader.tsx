
interface CourseHeaderProps {
  completed: number
  total: number
}

export default function CourseHeader({ completed, total }: CourseHeaderProps) {
  return (
    <div className="pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
      <h1 className="text-2xl font-bold tracking-tight">과목</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
        {completed}/{total}과 완료
      </p>
    </div>
  )
}
