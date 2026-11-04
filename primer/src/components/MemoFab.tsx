// 메모 플로팅 버튼 + 모달 셸
// 작성/수정은 MemoWriteTab, 목록은 MemoListTab에 위임

import { useState, useRef, useCallback, useEffect } from 'react'
import { getMemos } from '../utils/memo'
import type { Memo } from '../utils/memo'
import type { ImageItem, Tab } from './memo-utils'
import MemoWriteTab from './MemoWriteTab'
import MemoListTab from './MemoListTab'

const DRAFT_KEY = 'pali-memo-draft'

export default function MemoFab() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>(() => {
    try { return localStorage.getItem(DRAFT_KEY) ? 'write' : 'list' } catch { return 'list' }
  })
  // 쓰던 새 메모는 기기에 임시 저장 → 창을 닫거나 새로고침해도 남아 있음
  const [text, setTextState] = useState(() => {
    try { return localStorage.getItem(DRAFT_KEY) || '' } catch { return '' }
  })
  const setText = useCallback((v: string) => {
    setTextState(v)
    try { if (v) localStorage.setItem(DRAFT_KEY, v); else localStorage.removeItem(DRAFT_KEY) } catch { /* 무시 */ }
  }, [])
  const [images, setImages] = useState<ImageItem[]>([])
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [memos, setMemos] = useState<Memo[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const orderCounter = useRef(0)

  // 메모 불러오기
  const loadMemos = useCallback(async () => {
    setLoading(true)
    const list = await getMemos()
    setMemos(list)
    setLoading(false)
  }, [])

  // 목록 탭 열 때 자동 로드
  useEffect(() => {
    if (open && tab === 'list') loadMemos()
  }, [open, tab, loadMemos])

  // 폼 초기화
  const resetForm = () => {
    setText('')
    images.forEach(i => { if (i.file) URL.revokeObjectURL(i.preview) })
    setImages([])
    orderCounter.current = 0
    setEditingId(null)
  }

  // 수정 모드 진입
  const startEdit = (memo: Memo) => {
    resetForm()
    setText(memo.text)
    setEditingId(memo.id!)
    const restored: ImageItem[] = memo.images.map((img, i) => ({
      preview: img.dataUrl,
      dataUrl: img.dataUrl,
      name: img.name,
      order: i + 1,
    }))
    setImages(restored)
    orderCounter.current = restored.length
    setTab('write')
  }

  const handleClose = () => {
    setOpen(false)
    // 수정 중이던 것만 초기화. 새 메모로 쓰던 글·사진은 남겨 둠 (다시 열면 이어 쓰기)
    if (editingId) resetForm()
    setTab(text || images.length ? 'write' : 'list')
    // 메모 버튼으로 포커스 되돌리기
    requestAnimationFrame(() => fabRef.current?.focus())
  }

  const fabRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const handleCloseRef = useRef(handleClose)
  useEffect(() => { handleCloseRef.current = handleClose })

  // 창이 열리면: Esc로 닫기 + Tab 이동을 창 안에 가둠
  useEffect(() => {
    if (!open) return
    const box = dialogRef.current
    const focusables = () => Array.from(box?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), textarea, input:not([type=hidden]):not(.hidden), [href], select, [tabindex]:not([tabindex="-1"])'
    ) || []).filter(el => el.offsetParent !== null)
    const first = focusables()[0]
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); handleCloseRef.current() }
      if (e.key === 'Tab') {
        const list = focusables()
        if (!list.length) return
        const a = list[0], z = list[list.length - 1]
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* 플로팅 메모 버튼 */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-20 z-40 w-12 h-12 rounded-full
          bg-amber-600 text-white shadow-lg flex items-center justify-center
          hover:bg-amber-700 active:scale-95 transition-all"
        aria-label="메모"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={2} className="w-6 h-6" aria-hidden="true">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {/* 모달 */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center
          justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="memo-title"
            className="bg-white dark:bg-neutral-800 text-neutral-900
            dark:text-neutral-100 w-full max-w-lg rounded-t-2xl sm:rounded-2xl
            max-h-[85vh] flex flex-col animate-[slideUp_0.2s_ease-out]">

            {/* 헤더 + 탭 */}
            <div className="border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <h2 id="memo-title" className="font-bold text-lg">메모</h2>
                <button onClick={handleClose} aria-label="메모 닫기"
                  className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full hover:bg-neutral-100
                    dark:hover:bg-neutral-700">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                    stroke="currentColor" strokeWidth={2}>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex px-4 gap-4" role="tablist">
                <button role="tab" aria-selected={tab === 'write'}
                  onClick={() => {
                    // 수정 중일 때만 비우고 새 메모로. 쓰던 새 메모 초안은 그대로 둠
                    if (editingId) resetForm()
                    setTab('write')
                  }}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    tab === 'write'
                      ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400'
                  }`}>새 메모</button>
                <button role="tab" aria-selected={tab === 'list'} onClick={() => setTab('list')}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    tab === 'list'
                      ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400'
                  }`}>전체 메모</button>
              </div>
            </div>

            {/* 작성/수정 탭 */}
            {tab === 'write' && (
              <MemoWriteTab
                text={text} setText={setText}
                images={images} setImages={setImages}
                editingId={editingId}
                sending={sending} setSending={setSending}
                done={done} setDone={setDone}
                resetForm={resetForm}
                setTab={setTab} loadMemos={loadMemos}
                orderCounter={orderCounter}
              />
            )}

            {/* 목록 탭 */}
            {tab === 'list' && (
              <MemoListTab
                memos={memos} loading={loading}
                loadMemos={loadMemos}
                startEdit={startEdit}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
