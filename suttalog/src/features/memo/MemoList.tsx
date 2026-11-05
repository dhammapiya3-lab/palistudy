// 메모 목록 — 본인 + GitHub 공유, JSON 내보내기, AI patch 승인 UI
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  decidePatch, deleteMemo, downloadMemosJson, listMemos, saveMemo, type Memo,
} from '../../utils/memo'
import {
  deleteMemoFromGithub, fetchGithubMemos, githubIsConfigured, invalidateGithubMemoCache, mergeMemos, pushMemoToGithub,
} from '../../utils/memo-github'
import { canonicalLessonId, getLessonTitle } from '../../utils/lessons-meta'
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
  const [forceFetch, setForceFetch] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [remote, setRemote] = useState<Memo[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)

  const local = useMemo(() => listMemos(), [version])
  const merged = useMemo(() => mergeMemos(local, remote), [local, remote])

  useEffect(() => {
    let cancelled = false
    setSyncing(true); setSyncError(null)
    fetchGithubMemos({ force: forceFetch })
      .then(rs => { if (!cancelled) setRemote(rs) })
      .catch(e => { if (!cancelled) setSyncError(String(e?.message ?? e)) })
      .finally(() => { if (!cancelled) { setSyncing(false); setForceFetch(false) } })
    return () => { cancelled = true }
  }, [version, forceFetch])

  const handleDelete = async (m: Memo) => {
    const shared = githubIsConfigured()
    if (!confirm(shared ? '이 메모를 삭제할까요?\nGitHub에 공유된 사본도 함께 지웁니다.' : '이 메모를 삭제할까요?')) return
    deleteMemo(m.pageId)
    setNotice(null)
    if (shared) {
      // 공유된 사본도 지워야 다시 '공유 메모'로 나타나지 않음
      try {
        await deleteMemoFromGithub(m.memoId)
        setRemote(rs => rs.filter(r => r.memoId !== m.memoId))
      } catch (e) {
        setNotice(`이 기기의 메모는 지웠지만 GitHub 사본은 지우지 못했어요. ${e instanceof Error ? e.message : ''}`)
      }
    } else {
      setRemote(rs => rs.filter(r => r.memoId !== m.memoId))
    }
    invalidateGithubMemoCache()
    setVersion(v => v + 1)
  }
  const handleOpen = (m: Memo) => {
    const id = canonicalLessonId(m.lessonId)
    localStorage.setItem(`suttalog-progress-${id}`, String(m.stepIdx))
    nav(`/learn/scripture/${id}`)
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
    <div className="px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">📝 내 메모</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>공부하다 ✏️ 단추로 남긴 메모를 모아 봐요</p>
        </div>
        <button onClick={() => ((window.history.state as { idx?: number } | null)?.idx ?? 0) > 0 ? nav(-1) : nav('/profile')} className="text-sm px-3 py-2 rounded-full active:scale-95"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>← 뒤로</button>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          총 {merged.length}개 · 본인 {local.length} · 공유 {remote.length}
        </span>
        {syncing && <span className="text-[11px]" role="status" style={{ color: 'var(--color-text-secondary)' }}>🌐 공유 메모 받는 중…</span>}
        <button onClick={() => { setForceFetch(true); setVersion(v => v + 1) }} className="ml-auto text-xs px-3 py-2 rounded-full active:scale-95"
          style={{ border: '1px solid var(--color-border)' }}>🔄 새로고침</button>
        <button onClick={downloadMemosJson} disabled={local.length === 0}
          className="text-xs px-3 py-1.5 rounded-full active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>📤 내보내기</button>
      </div>

      {(syncError || notice) && (
        <div role="alert" className="rounded-xl p-3 mb-4 text-xs leading-relaxed"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-error) 8%, var(--color-surface))', border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)', color: 'var(--color-text)' }}>
          ⚠️ {notice ?? `공유 메모를 불러오지 못했어요. ${syncError}`}
          {!notice && <><br />내 메모는 그대로 볼 수 있습니다.</>}
        </div>
      )}

      {!githubIsConfigured() && localStorage.getItem('suttalog-admin-mode') === 'true' && (
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
            학습 화면 오른쪽 아래 ✏️(내 메모) 단추를 누르면<br />
            그 단계에 생각이나 궁금한 점을 적어 둘 수 있어요.
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
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))', color: 'var(--color-primary)' }}>
                      {getLessonTitle(m.lessonId) || m.lessonTitle}
                    </span>
                    <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>📍 {m.pageId}</span>
                    <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>🆔 {m.memoId.slice(0, 8)}</span>
                    <span className="text-[11px] shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isRemoteOnly ? '🌐' : '📱'} {m.author || (isRemoteOnly ? 'community' : 'me')}
                    </span>
                  </div>
                  <p className="text-[11px] shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
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
                    <button onClick={() => handleDelete(m)}
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
