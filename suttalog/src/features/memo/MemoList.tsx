// 메모 목록 — 본인 + GitHub 공유, JSON 내보내기, AI patch 승인 UI
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  decidePatch, deleteMemo, downloadMemosJson, listMemos, saveMemo, type Memo,
} from '../../utils/memo'
import {
  fetchGithubMemos, githubIsConfigured, mergeMemos, pushMemoToGithub,
} from '../../utils/memo-github'
import PatchCard from './PatchCard'

function subtitleOf(m: Memo): string {
  const s = m.stepSnapshot
  if (s.stepType === 'teach' && s.word) return `단어 · ${s.word}`
  if (s.stepType === 'teach-grammar' && s.title) return `문법 · ${s.title}`
  if (s.stepType === 'verse' && s.pali) return `경문 · ${s.pali.slice(0, 40)}`
  if (s.stepType === 'quiz' && s.question) return `퀴즈 · ${s.question.slice(0, 40)}`
  if (s.stepType === 'speak' && s.pali) return `따라읽기 · ${s.pali.slice(0, 40)}`
  if (s.stepType === 'arrange' && s.instruction) return `배열 · ${s.instruction.slice(0, 40)}`
  if (s.stepType === 'writing' && s.instruction) return `쓰기 · ${s.instruction.slice(0, 40)}`
  if (s.stepType === 'intro' && s.title) return `소개 · ${s.title}`
  return s.stepType
}

export default function MemoList() {
  const nav = useNavigate()
  const [version, setVersion] = useState(0)
  const [remote, setRemote] = useState<Memo[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)

  const local = useMemo(() => listMemos(), [version])
  const merged = useMemo(() => mergeMemos(local, remote), [local, remote])

  useEffect(() => {
    let cancelled = false
    setSyncing(true); setSyncError(null)
    fetchGithubMemos()
      .then(rs => { if (!cancelled) setRemote(rs) })
      .catch(e => { if (!cancelled) setSyncError(String(e?.message ?? e)) })
      .finally(() => { if (!cancelled) setSyncing(false) })
    return () => { cancelled = true }
  }, [version])

  const handleDelete = (pageId: string) => {
    if (!confirm('이 메모를 삭제할까요?')) return
    deleteMemo(pageId); setVersion(v => v + 1)
  }
  const handleOpen = (m: Memo) => {
    localStorage.setItem(`suttalog-progress-${m.lessonId}`, String(m.stepIdx))
    nav(`/learn/scripture/${m.lessonId}`)
  }
  const handleApprove = async (m: Memo) => {
    if (!m.patch) return
    if (!confirm('이 수정 제안을 승인하시겠습니까?')) return
    const updated = decidePatch(m.pageId, 'approved')
    if (updated && githubIsConfigured()) { try { await pushMemoToGithub(updated) } catch { /**/ } }
    setVersion(v => v + 1)
  }
  const handleReject = async (m: Memo) => {
    if (!m.patch) return
    const updated = decidePatch(m.pageId, 'rejected')
    if (updated && githubIsConfigured()) { try { await pushMemoToGithub(updated) } catch { /**/ } }
    setVersion(v => v + 1)
  }
  const handleImportRemote = (m: Memo) => {
    saveMemo(m.lessonId, m.stepIdx, m.body, m.stepSnapshot)
    setVersion(v => v + 1)
  }

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">📝 메모</h1>
        <button onClick={() => nav(-1)} className="text-sm px-3 py-1 rounded-full active:scale-95"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>← 뒤로</button>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          총 {merged.length}개 · 본인 {local.length} · 공유 {remote.length}
        </span>
        {syncing && <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>🌐 동기화…</span>}
        {syncError && <span className="text-[10px]" style={{ color: '#EF5350' }} title={syncError}>⚠️ sync 실패</span>}
        <button onClick={() => setVersion(v => v + 1)} className="ml-auto text-xs px-3 py-1 rounded-full active:scale-95"
          style={{ border: '1px solid var(--color-border)' }}>🔄 새로고침</button>
        <button onClick={downloadMemosJson} disabled={local.length === 0}
          className="text-xs px-3 py-1.5 rounded-full active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>📤 내보내기</button>
      </div>

      {!githubIsConfigured() && (
        <div className="rounded-xl p-3 mb-4 text-xs" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
          💡 <b>GitHub 토큰 미설정</b> — 공유 메모는 읽기만 가능합니다.
          {' '}<button onClick={() => nav('/settings')} className="underline font-bold">설정</button>에서 PAT를 등록하세요.
        </div>
      )}

      {merged.length === 0 ? (
        <div className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
          <p className="text-3xl mb-2">📝</p>
          <p className="text-sm font-semibold">아직 작성한 메모가 없습니다</p>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            학습 중 우하단 ✏️ 버튼으로 단계마다 메모를 남길 수 있습니다.<br />
            메모는 JSON으로 내보내 AI에게 전달하면 lesson-data를 자동 수정합니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {merged.map(m => {
            const isRemoteOnly = m.source === 'github' && !local.find(l => l.memoId === m.memoId)
            return (
              <div key={m.memoId} className="rounded-xl p-3"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))', color: 'var(--color-primary)' }}>
                      {m.lessonTitle || m.lessonId}
                    </span>
                    <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>📍 {m.pageId}</span>
                    <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>🆔 {m.memoId.slice(0, 8)}</span>
                    <span className="text-[10px] shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isRemoteOnly ? '🌐' : '📱'} {m.author || (isRemoteOnly ? 'community' : 'me')}
                    </span>
                  </div>
                  <p className="text-[10px] shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                    {new Date(m.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-primary)' }}>{subtitleOf(m)}</p>
                <p className="text-sm mt-2 whitespace-pre-wrap leading-relaxed">{m.body}</p>

                {m.patch && (
                  <PatchCard memo={m} isRemoteOnly={isRemoteOnly}
                    onApprove={() => handleApprove(m)} onReject={() => handleReject(m)} />
                )}

                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleOpen(m)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold active:scale-95"
                    style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>→ 해당 단계로</button>
                  {isRemoteOnly ? (
                    <button onClick={() => handleImportRemote(m)}
                      className="px-3 py-1.5 rounded-lg text-xs active:scale-95"
                      style={{ border: '1px solid var(--color-border)' }}>📥 내 메모로</button>
                  ) : (
                    <button onClick={() => handleDelete(m.pageId)}
                      className="px-3 py-1.5 rounded-lg text-xs active:scale-95"
                      style={{ border: '1px solid var(--color-border)', color: '#EF5350' }}>삭제</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
