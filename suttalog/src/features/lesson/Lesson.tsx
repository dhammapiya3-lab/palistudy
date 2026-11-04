// 레거시 리다이렉트 → ScriptureLearn으로
import { Navigate } from 'react-router-dom'

export default function Lesson() {
  return <Navigate to="/learn/scripture/dhp1-alphabet" replace />
}
