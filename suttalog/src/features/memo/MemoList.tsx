// 메모 화면 — 빠알리 프라이머와 같은 메모 목록 (온라인 저장소)
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMemos, type Memo } from '../../utils/memo-cloud'
import { useMemos } from '../../components/memo/useMemos'
import MemoListTab from '../../components/memo/MemoListTab'
import MemoModal from '../../components/memo/MemoModal'

export default function MemoList() {
  const nav = useNavigate()
  const memos = useMemos()
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<{ open: boolean; edit: Memo | null }>({ open: false, edit: null })
  const load = useCallback(async () => { setLoading(true); await getMemos(); setLoading(false) }, [])

  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex flex-col" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
      <header className="flex items-center gap-2 px-4 pt-4 pb-2">
        <button onClick={() => nav(-1)} aria-label="뒤로" className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-lg font-bold flex-1">📝 메모</h1>
        <button onClick={() => setModal({ open: true, edit: null })}
          className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700">새 메모</button>
      </header>
      <MemoListTab memos={memos} loading={loading} loadMemos={load}
        startEdit={m => setModal({ open: true, edit: m })} />
      <MemoModal open={modal.open} onClose={() => setModal({ open: false, edit: null })}
        initialTab="write" editMemo={modal.edit} />
    </div>
  )
}
