// 단계 이름 (목차·진도 막대 말풍선에서 같이 사용)
import type { StepType } from '../types'

export function stepLabel(s: StepType, i: number): string {
  return s.type === 'intro' ? `${s.title}`
    : s.type === 'teach' ? `${s.word} — ${s.meaning}`
    : s.type === 'teach-grammar' ? s.title
    : s.type === 'quiz' ? `퀴즈: ${s.question.slice(0, 30)}...`
    : s.type === 'match-listen' ? `듣기: ${s.instruction.slice(0, 30)}`
    : s.type === 'match-reverse' ? `뜻맞추기: ${s.meaning}`
    : s.type === 'writing' ? `쓰기: ${s.answer}`
    : s.type === 'speak' ? `따라읽기: ${s.pali.slice(0, 30)}`
    : s.type === 'arrange' ? `배열: ${s.instruction.slice(0, 30)}`
    : s.type === 'verse' ? `경전: ${s.pali.slice(0, 30)}`
    : `스텝 ${i + 1}`
}
