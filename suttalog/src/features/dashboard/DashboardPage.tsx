// 홈 대시보드
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import { useRecentSuttas } from '../../hooks/useProgress'
import { useSrs } from '../../hooks/useSrs'
import { LEARNING_PATHS } from '../../config/paths'
import { useState, useEffect } from 'react'
import { getAllPathProgress, getTodayActivity } from '../../db/progress-db'
import type { PathProgress, StudyActivity } from '../../types'

export default function DashboardPage() {
  const navigate = useNavigate()
  const recentSuttas = useRecentSuttas(3)
  const { dueCount } = useSrs()
  const [pathProgressList, setPathProgressList] = useState<PathProgress[]>([])
  const [activity, setActivity] = useState<StudyActivity | null>(null)

  useEffect(() => {
    getAllPathProgress().then(setPathProgressList)
    getTodayActivity().then(setActivity)
  }, [])

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          🪷 SuttaLog
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          빠알리어 경전 학습
        </p>
      </div>

      {/* 오늘의 활동 */}
      {activity && (
        <Card>
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            오늘의 학습
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {activity.minutesStudied}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>분</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {activity.suttasRead}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>경전</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-light)' }}>
                {activity.cardsReviewed}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>카드</p>
            </div>
          </div>
        </Card>
      )}

      {/* 이어서 읽기 */}
      {recentSuttas.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            이어서 읽기
          </h2>
          <div className="space-y-2">
            {recentSuttas.map(s => {
              const percent = s.totalSegments > 0
                ? Math.round((s.readSegments / s.totalSegments) * 100)
                : 0
              return (
                <Card key={s.suttaUid} onClick={() => navigate(`/read/${s.suttaUid}`)}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{s.suttaUid.toUpperCase()}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {percent}%
                    </span>
                  </div>
                  <ProgressBar value={percent} />
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* 복습 카드 */}
      {dueCount > 0 && (
        <Card onClick={() => navigate('/srs')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">🔄 복습 대기</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {dueCount}장의 카드가 복습을 기다리고 있습니다
              </p>
            </div>
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {dueCount}
            </span>
          </div>
        </Card>
      )}

      {/* 학습 경로 */}
      <div>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          학습 경로
        </h2>
        <div className="space-y-2">
          {LEARNING_PATHS.filter(p => p.id !== 'free').map(path => {
            const pp = pathProgressList.find(p2 => p2.pathId === path.id)
            const totalSuttas = path.steps.reduce((sum, step) => sum + step.suttas.length, 0)
            const completed = pp?.completedSuttas.length ?? 0
            const percent = totalSuttas > 0 ? Math.round((completed / totalSuttas) * 100) : 0

            return (
              <Card key={path.id} onClick={() => navigate(`/path/${path.id}`)}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{path.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{path.name}</h3>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>
                      {path.description}
                    </p>
                    <ProgressBar value={percent} className="mt-2" />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {completed}/{totalSuttas}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* 빠른 탐색 */}
      <Card onClick={() => navigate('/browse')}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h3 className="font-semibold">경전 탐색</h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              5 Nikaya에서 자유롭게 읽기
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
