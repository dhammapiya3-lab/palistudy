import { useState, type ReactNode } from 'react'

interface AnswerExplainProps {
  /** 맞혔는지 — 틀렸으면 펼친 채로, 맞혔으면 접힌 채로 */
  ok: boolean
  /** 해설 (없으면 정답만) */
  explain?: string
  /** 정답 줄 (예: 'puttā (아들들은)') */
  answer?: ReactNode
}

/** 채점 뒤 해설 카드 — 틀린 직후 "왜?"를 바로 보여 주고, 맞혔을 때는 눌러서 봄 */
export default function AnswerExplain({ ok, explain, answer }: AnswerExplainProps) {
  const [open, setOpen] = useState(!ok)
  if (!explain && !answer) return null

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="self-start mt-4 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium active:scale-95 transition-transform"
        style={{ color: 'var(--color-text-secondary)', border: '1px dashed var(--color-border)', minHeight: 36 }}
        aria-expanded={false}
      >
        <span aria-hidden="true">💡</span> 풀이 보기
      </button>
    )
  }

  return (
    <div
      className="mt-4 rounded-2xl p-4 text-sm leading-relaxed reveal-down"
      role="status"
      style={{
        backgroundColor: ok ? 'var(--color-success-bg)' : 'var(--color-warn-bg)',
        border: `1px solid ${ok ? 'var(--color-success-border)' : 'var(--color-warn-border)'}`,
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: ok ? 'var(--color-success-strong)' : 'var(--color-text)' }}>
        {ok ? '✓ 맞았어요' : '💡 이렇게 기억해요'}
      </p>
      {answer && (
        <p className="font-semibold">
          <span className="text-xs font-normal mr-1" style={{ color: 'var(--color-text-secondary)' }}>정답</span>
          {answer}
        </p>
      )}
      {explain && <p className={`whitespace-pre-line ${answer ? 'mt-1' : ''}`}>{explain}</p>}
    </div>
  )
}
