// AI patch diff + 승인/거부 카드 (MemoList에서 사용)
import type { Memo } from '../../utils/memo'

type Props = {
  memo: Memo
  isRemoteOnly: boolean
  onApprove: () => void
  onReject: () => void
}

export default function PatchCard({ memo, isRemoteOnly, onApprove, onReject }: Props) {
  const p = memo.patch
  if (!p) return null

  const bg =
    p.status === 'approved' ? '#E8F5E9' :
    p.status === 'rejected' ? '#FFEBEE' :
    p.status === 'applied' ? '#E3F2FD' : '#FFF8E1'
  const fg =
    p.status === 'approved' ? '#2E7D32' :
    p.status === 'rejected' ? '#C62828' :
    p.status === 'applied' ? '#1565C0' : '#E65100'
  const label =
    p.status === 'proposed' ? '검토 대기' :
    p.status === 'approved' ? '✅ 승인됨' :
    p.status === 'rejected' ? '❌ 거부됨' : '🚀 적용됨'

  return (
    <div className="mt-3 rounded-xl p-3"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-bg))', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold">🤖 AI 수정 제안</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: bg, color: fg }}>{label}</span>
        <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{p.patchId.slice(0, 6)}</span>
      </div>
      <p className="text-xs font-semibold mb-2">{p.summary}</p>
      <p className="text-[10px] mb-1" style={{ color: 'var(--color-text-tertiary)' }}>📄 {p.filePath}</p>
      <div className="space-y-1.5">
        <div className="rounded p-2 text-[11px] font-mono whitespace-pre-wrap"
          style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2' }}>
          <span className="font-bold" style={{ color: '#C62828' }}>- 수정 전</span>
          {'\n'}{p.before}
        </div>
        <div className="rounded p-2 text-[11px] font-mono whitespace-pre-wrap"
          style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9' }}>
          <span className="font-bold" style={{ color: '#2E7D32' }}>+ 수정 후</span>
          {'\n'}{p.after}
        </div>
      </div>
      {p.status === 'proposed' && !isRemoteOnly && (
        <div className="flex gap-2 mt-2">
          <button onClick={onApprove}
            className="flex-1 py-2 rounded-lg text-xs font-bold active:scale-95"
            style={{ backgroundColor: '#4CAF50', color: '#fff' }}>✅ 승인</button>
          <button onClick={onReject}
            className="flex-1 py-2 rounded-lg text-xs font-bold active:scale-95"
            style={{ backgroundColor: '#EF5350', color: '#fff' }}>❌ 거부</button>
        </div>
      )}
    </div>
  )
}
