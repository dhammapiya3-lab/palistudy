// 예전 주소(/lesson/:skillId) → 경전 학습 화면으로
// 숫자면 학습맵의 과 번호(1부터)로, 경전 ID면 그 경전으로, 모르는 값이면 초전법륜경으로 보냄
import { Navigate, useParams } from 'react-router-dom'
import { LESSON_ORDER, LESSON_META, canonicalLessonId } from '../../utils/lessons-meta'

export default function Lesson() {
  const { skillId = '' } = useParams<{ skillId: string }>()
  const n = Number(skillId)
  const byNumber = Number.isInteger(n) && n >= 1 && n <= LESSON_ORDER.length ? LESSON_ORDER[n - 1] : null
  const byId = canonicalLessonId(skillId) in LESSON_META ? canonicalLessonId(skillId) : null
  const target = byNumber ?? byId ?? 'sn56-11'
  return <Navigate to={`/learn/scripture/${target}`} replace />
}
