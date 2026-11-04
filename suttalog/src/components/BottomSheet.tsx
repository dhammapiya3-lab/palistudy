// 바텀시트 (사전 팝업용)
import type { ReactNode } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen) return null

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="bottom-sheet-backdrop" onClick={onClose} />

      {/* 시트 */}
      <div className="bottom-sheet">
        {/* 핸들 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        {title && (
          <div className="px-4 pb-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="font-semibold pali-text">{title}</h3>
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  )
}
