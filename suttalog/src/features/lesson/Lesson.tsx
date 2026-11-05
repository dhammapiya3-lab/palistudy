// 예전 주소(/lesson/:skillId) → 경전 학습 화면으로
// 숫자면 예전 학습맵의 과 번호(1부터, 순서를 바꾸기 전 번호 — 옛 주소가 같은 경전을 가리키도록)로, 경전 ID면 그 경전으로, 모르는 값이면 초전법륜경으로 보냄
import { Navigate, useParams } from 'react-router-dom'
import { LESSON_META, canonicalLessonId } from '../../utils/lessons-meta'

// 예전 주소의 번호 → 경전 (학습맵 순서를 바꾸기 전)
const LEGACY_ORDER = [
  'namo', 'trisarana', 'pancasila', 'tisarana-guna', 'sn45-8', 'mangala',
  'sn56-11', 'metta', 'sn22-59', 'ratana', 'mn10',
]

export default function Lesson() {
  const { skillId = '' } = useParams<{ skillId: string }>()
  const n = Number(skillId)
  const byNumber = Number.isInteger(n) && n >= 1 && n <= LEGACY_ORDER.length ? LEGACY_ORDER[n - 1] : null
  const byId = canonicalLessonId(skillId) in LESSON_META ? canonicalLessonId(skillId) : null
  const target = byNumber ?? byId ?? 'sn56-11'
  return <Navigate to={`/learn/scripture/${target}`} replace />
}
