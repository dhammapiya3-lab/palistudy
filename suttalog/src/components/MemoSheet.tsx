// 메모 편집 바텀 시트
import { useEffect, useState } from 'react'
import { deleteMemo, getMemo, pageIdOf, saveMemo, type StepSnapshot } from '../utils/memo'
import { pushMemoToGithub, githubIsConfigured } from '../utils/memo-github'
import { getLessonTitle } from '../utils/lessons-meta'

type Props = {
  open: boolean
  onClose: () => void
  lessonId: string
  stepIdx: number
  snapshot: StepSnapshot
  onSaved?: () => void
}

export default function MemoSheet({ open, onClose, lessonId, stepIdx, snapshot, onSaved }: Props) {
  const pageId = pageIdOf(lessonId, stepIdx)
  const [body, setBody] = useState('')
  const [existing, setExisting] = useState<ReturnType<typeof getMemo>>(null)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!open) return
    const m = getMemo(pageId)
    setExisting(m)
    setBody(m?.body ?? '')
  }, [open, pageId])

  if (!open) return null

  const handleSave = async () => {
    const text = body.trim()
    let saved = null
    if (!text) {
      if (existing) deleteMemo(pageId)
    } else {
      saved = saveMemo(lessonId, stepIdx, text, snapshot)
    }
    if (saved && githubIsConfigured()) {
      setSyncing(true)
      try { await pushMemoToGithub(saved) } catch { /* local OK */ }
      setSyncing(false)
    }
    onSaved?.()
    onClose()
  }

  const handleDelete = () => {
    deleteMemo(pageId)
    onSaved?.()
    onClose()
  }

  const subtitle = (() => {
    if (snapshot.stepType === 'teach' && snapshot.word) return `단어 · ${snapshot.word}`
    if (snapshot.stepType === 'teach-grammar' && snapshot.title) return `문법 · ${snapshot.title}`
    if (snapshot.stepType === 'verse' && snapshot.pali) return `경문 · ${snapshot.pali.slice(0, 36)}`
    if (snapshot.stepType === 'quiz' && snapshot.question) return `퀴즈 · ${snapshot.question.slice(0, 36)}`
    if (snapshot.stepType === 'speak' && snapshot.pali) return `따라읽기 · ${snapshot.pali.slice(0, 36)}`
    if (snapshot.stepType === 'arrange' && snapshot.instruction) return `배열 · ${snapshot.instruction.slice(0, 36)}`
    if (snapshot.stepType === 'writing' && snapshot.instruction) return `쓰기 · ${snapshot.instruction.slice(0, 36)}`
    if (snapshot.stepType === 'intro' && snapshot.title) return `소개 · ${snapshot.title}`
    return snapshot.stepType
  })()

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-3xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg)', maxHeight: '80vh' }} onClick={e => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))', color: 'var(--color-primary)' }}>
                {getLessonTitle(lessonId)}
              </span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>📍 {pageId}</span>
              {existing && (
                <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>🆔 {existing.memoId.slice(0, 8)}</span>
              )}
            </div>
            <p className="text-sm font-semibold mt-1.5 truncate">{subtitle}</p>
            {existing && (
              <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                마지막 수정: {new Date(existing.updatedAt).toLocaleString()}
                {existing.source === 'github' && <span className="ml-1">· 🌐 공유됨</span>}
              </p>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
            style={{ color: 'var(--color-text-secondary)' }} aria-label="닫기">✕</button>
        </div>

        <div className="px-5 pb-5">
          <textarea value={body} onChange={e => setBody(e.target.value)}
            placeholder="이 단계에 대한 메모를 작성하세요. 차후 AI가 이 메모를 보고 일괄 수정합니다."
            className="w-full p-3 rounded-xl text-sm leading-relaxed resize-none"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', minHeight: 160, color: 'var(--color-text)' }}
            autoFocus />

          {existing?.patch && (
            <div className="mt-3 rounded-xl p-3 text-xs" style={{ backgroundColor: '#E3F2FD', border: '1px solid #BBDEFB' }}>
              <p className="font-bold mb-1">🤖 AI 수정 제안 ({existing.patch.status})</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{existing.patch.summary}</p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>메모 목록에서 수정 전/후를 확인하고 승인하세요.</p>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            {existing && (
              <button onClick={handleDelete} className="px-4 py-3 rounded-xl text-sm font-bold active:scale-[0.97]"
                style={{ border: '1.5px solid var(--color-border)', color: '#EF5350' }}>삭제</button>
            )}
            <button onClick={handleSave} disabled={syncing}
              className="flex-1 py-3 rounded-xl text-white font-bold text-sm active:scale-[0.97] disabled:opacity-60"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              {syncing ? '저장 중…' : existing ? '수정 저장' : '저장'}
            </button>
          </div>

          {!githubIsConfigured() && (
            <p className="text-[10px] mt-2 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
              💡 설정에서 GitHub 토큰을 등록하면 메모가 공유 저장소에도 자동 저장됩니다.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
