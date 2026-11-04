// 학습 경로 목록
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import { LEARNING_PATHS } from '../../config/paths'
import { useState, useEffect } from 'react'
import { getAllPathProgress } from '../../db/progress-db'
import type { PathProgress } from '../../types'

export default function PathListPage() {
  const navigate = useNavigate()
  const [progressList, setProgressList] = useState<PathProgress[]>([])

  useEffect(() => {
    getAllPathProgress().then(setProgressList)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">🪷 학습 경로</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        체계적으로 빠알리 경전을 공부하세요
      </p>

      <div className="space-y-3">
        {LEARNING_PATHS.map(path => {
          const pp = progressList.find(p => p.pathId === path.id)
          const totalSuttas = path.steps.reduce((sum, step) => sum + step.suttas.length, 0)
          const completed = pp?.completedSuttas.length ?? 0
          const percent = totalSuttas > 0 ? Math.round((completed / totalSuttas) * 100) : 0

          // 자유 선택은 탐색 페이지로
          const target = path.id === 'free' ? '/browse' : `/path/${path.id}`

          return (
            <Card key={path.id} onClick={() => navigate(target)}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{path.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{path.name}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {path.description}
                  </p>
                  {totalSuttas > 0 && (
                    <>
                      <ProgressBar value={percent} className="mt-3" />
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        {completed}/{totalSuttas} 경전 완료 ({percent}%)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
