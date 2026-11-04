// 학습 경로 상세 (단계별 경전 목록)
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import { LEARNING_PATHS } from '../../config/paths'
import { getPathProgress, savePathProgress } from '../../db/progress-db'
import type { PathProgress } from '../../types'

export default function PathDetailPage() {
  const { pathId } = useParams<{ pathId: string }>()
  const navigate = useNavigate()
  const path = LEARNING_PATHS.find(p => p.id === pathId)
  const [progress, setProgress] = useState<PathProgress | null>(null)

  useEffect(() => {
    if (!pathId) return
    getPathProgress(pathId).then(p => {
      if (p) {
        setProgress(p)
      } else {
        // 새 경로 시작
        const newProgress: PathProgress = {
          pathId,
          currentStepIndex: 0,
          completedSuttas: [],
          startedAt: Date.now(),
          lastActivityAt: Date.now(),
        }
        savePathProgress(newProgress)
        setProgress(newProgress)
      }
    })
  }, [pathId])

  if (!path) {
    return <p>알 수 없는 학습 경로입니다.</p>
  }

  const completedSet = new Set(progress?.completedSuttas ?? [])

  return (
    <div className="space-y-4">
      <button onClick={() => navigate('/path')} className="text-sm" style={{ color: 'var(--color-primary)' }}>
        ← 학습 경로
      </button>

      <div className="flex items-center gap-3">
        <span className="text-3xl">{path.icon}</span>
        <div>
          <h1 className="text-xl font-bold">{path.name}</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {path.description}
          </p>
        </div>
      </div>

      {/* 단계별 경전 */}
      <div className="space-y-4">
        {path.steps.map((step, stepIndex) => {
          const stepCompleted = step.suttas.every(uid => completedSet.has(uid))
          const isLocked = stepIndex > 0 && !path.steps[stepIndex - 1].suttas.every(uid => completedSet.has(uid))

          return (
            <div key={stepIndex} className={isLocked ? 'opacity-50' : ''}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  stepCompleted ? 'bg-green-500' : ''
                }`} style={!stepCompleted ? { backgroundColor: 'var(--color-primary)' } : {}}>
                  {stepCompleted ? '✓' : stepIndex + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs pali-text" style={{ color: 'var(--color-text-secondary)' }}>
                    {step.titlePali}
                  </p>
                </div>
              </div>

              <p className="text-xs ml-8 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                {step.description}
              </p>

              <div className="ml-8 space-y-1">
                {step.suttas.map(suttaUid => {
                  const isDone = completedSet.has(suttaUid)
                  return (
                    <Card
                      key={suttaUid}
                      onClick={isLocked ? undefined : () => navigate(`/read/${suttaUid}`)}
                      className="!py-2 !px-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isDone ? 'text-green-500' : ''}`}>
                          {isDone ? '✅' : isLocked ? '🔒' : '📖'}
                        </span>
                        <span className="text-sm font-mono">{suttaUid.toUpperCase()}</span>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
