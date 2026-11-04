// 단계 이름 (목차·진도 막대 말풍선에서 같이 사용)
import type { StepType } from '../types'

/** 길면 잘라서 '…' — 실제로 잘렸을 때만 붙임 */
export function clip(text: string, max = 30): string {
  const t = text.replace(/\s*\n\s*/g, ' ').trim()
  return t.length > max ? t.slice(0, max).trimEnd() + '…' : t
}

export function stepLabel(s: StepType, i: number): string {
  return s.type === 'intro' ? `${s.title}`
    : s.type === 'teach' ? `${s.word} — ${s.meaning}`
    : s.type === 'teach-grammar' ? s.title
    : s.type === 'quiz' ? `퀴즈: ${clip(s.question)}`
    : s.type === 'match-listen' ? `듣기: ${clip(s.instruction)}`
    : s.type === 'match-reverse' ? `뜻맞추기: ${s.meaning}`
    : s.type === 'writing' ? `쓰기: ${s.answer}`
    : s.type === 'speak' ? `따라읽기: ${clip(s.pali)}`
    : s.type === 'arrange' ? `배열: ${clip(s.instruction)}`
    : s.type === 'verse' ? `경전: ${clip(s.pali)}`
    : `스텝 ${i + 1}`
}
