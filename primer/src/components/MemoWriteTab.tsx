// 메모 작성/수정 탭 UI
import { useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { saveMemo, updateMemo, fileToDataUrl } from '../utils/memo'
import type { MemoImage } from '../utils/memo'
import { getPageName, getCurrentPageId, type ImageItem } from './memo-utils'

interface Props {
  text: string
  setText: (v: string) => void
  images: ImageItem[]
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
  editingId: string | null
  sending: boolean
  setSending: (v: boolean) => void
  done: boolean
  setDone: (v: boolean) => void
  resetForm: () => void
  setTab: (t: 'write' | 'list') => void
  loadMemos: () => void
  orderCounter: React.MutableRefObject<number>
}

export default function MemoWriteTab({
  text, setText, images, setImages,
  editingId, sending, setSending, done, setDone,
  resetForm, setTab, loadMemos, orderCounter,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const location = useLocation()

  // 이미지 추가
  const addImages = useCallback((files: FileList | File[]) => {
    setImages(prev => {
      const next = [...prev]
      for (const f of Array.from(files)) {
        if (f.size > 5 * 1024 * 1024) continue
        orderCounter.current += 1
        next.push({
          file: f,
          preview: URL.createObjectURL(f),
          name: f.name,
          order: orderCounter.current,
        })
      }
      return next
    })
  }, [setImages, orderCounter])

  // 붙여넣기
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return
    const files: File[] = []
    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const f = item.getAsFile()
        if (f) files.push(f)
      }
    }
    if (files.length > 0) {
      e.preventDefault()
      addImages(files)
    }
  }, [addImages])

  const removeImage = (order: number) => {
    setImages(prev => {
      const item = prev.find(i => i.order === order)
      if (item?.file) URL.revokeObjectURL(item.preview)
      return prev.filter(i => i.order !== order)
    })
  }

  // 새 메모 전송 또는 수정 저장
  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0) return
    setSending(true)

    const pageId = getCurrentPageId(location.pathname)

    let ok: boolean
    if (editingId) {
      const finalImages: MemoImage[] = []
      const sorted = [...images].sort((a, b) => a.order - b.order)
      for (let i = 0; i < sorted.length; i++) {
        const img = sorted[i]
        if (img.file) {
          const dataUrl = await fileToDataUrl(img.file)
          finalImages.push({ order: i + 1, dataUrl, name: img.name })
        } else if (img.dataUrl) {
          finalImages.push({ order: i + 1, dataUrl: img.dataUrl, name: img.name })
        }
      }
      ok = await updateMemo(editingId, text, finalImages, pageId)
    } else {
      const files = images.sort((a, b) => a.order - b.order).map(i => i.file!)
      ok = await saveMemo(getPageName(location.pathname), text, files, pageId)
    }

    setSending(false)
    if (ok) {
      setDone(true)
      setTimeout(() => {
        setDone(false)
        resetForm()
        if (editingId) {
          setTab('list')
          loadMemos()
        }
      }, 1200)
    }
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {editingId && (
          <p className="text-xs text-amber-600 font-medium">수정 중...</p>
        )}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {editingId
            ? '내용을 수정하고 저장하세요.'
            : `기능 개선, 버그, 아이디어를 자유롭게 — ${getPageName(location.pathname)}`}
        </p>
        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
          ID: {getCurrentPageId(location.pathname)}
        </p>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onPaste={handlePaste}
          placeholder="메모 내용을 입력하세요..."
          rows={5}
          className="w-full rounded-lg border border-neutral-300
            dark:border-neutral-600 bg-transparent p-3 text-sm
            resize-none focus:outline-none focus:ring-2
            focus:ring-amber-500"
        />

        {/* 이미지 미리보기 */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {[...images].sort((a, b) => a.order - b.order).map(img => (
              <div key={img.order} className="relative group">
                <img src={img.preview} alt={`이미지 ${img.order}`}
                  className="w-full h-24 object-cover rounded-lg
                    border border-neutral-200 dark:border-neutral-600" />
                <span className="absolute top-1 left-1 bg-amber-600
                  text-white text-xs w-5 h-5 rounded-full flex
                  items-center justify-center font-bold">
                  {img.order}
                </span>
                <button onClick={() => removeImage(img.order)}
                  className="absolute top-1 right-1 bg-red-500
                    text-white w-5 h-5 rounded-full flex items-center
                    justify-center text-xs">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input ref={fileRef} type="file" accept="image/*" multiple
          className="hidden"
          onChange={e => e.target.files && addImages(e.target.files)} />
        <button onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 text-sm text-amber-600
            hover:text-amber-700 dark:text-amber-400">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
            stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          이미지 첨부
        </button>
      </div>

      {/* 하단 버튼 */}
      <div className="px-4 py-3 border-t border-neutral-200
        dark:border-neutral-700 flex gap-2">
        {editingId && (
          <button onClick={() => { resetForm(); setTab('list') }}
            className="px-4 py-2.5 rounded-lg border border-neutral-300
              dark:border-neutral-600 text-sm">
            취소
          </button>
        )}
        <div className="flex-1">
          {done ? (
            <div className="text-center text-green-600 font-medium py-2">
              {editingId ? '수정 완료!' : '전송 완료!'}
            </div>
          ) : (
            <button onClick={handleSubmit} disabled={sending}
              className="w-full py-2.5 rounded-lg bg-amber-600 text-white
                font-medium hover:bg-amber-700 disabled:opacity-50
                transition-colors">
              {sending ? '저장 중...' : editingId ? '수정 저장' : '메모 보내기'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
