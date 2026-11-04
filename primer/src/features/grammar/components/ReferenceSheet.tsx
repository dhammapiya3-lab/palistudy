import { useEffect } from 'react'
import type { DeclensionTable } from '../declension-tables'

// 과 순서와 같은 격 순서 (주1·목2·도구3·탈4·여5·소유6·처소7·호8) — 표시 순서만 바꾸고 형태는 그대로
const CASE_ORDER = ['주', '목', '도구', '탈', '여', '소유', '처소', '호']
function caseRank(label: string): number {
  const i = CASE_ORDER.findIndex(c => label.startsWith(c))
  return i === -1 ? 99 : i
}
function orderedRows(rows: DeclensionTable['rows']) {
  return rows.map((r, i) => ({ r, i })).sort((a, b) => caseRank(a.r.case) - caseRank(b.r.case) || a.i - b.i).map(x => x.r)
}

interface ReferenceSheetProps {
  refTables: DeclensionTable[]
  onClose: () => void
}

export default function ReferenceSheet({
  refTables,
  onClose
}: ReferenceSheetProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="격변화 도표">
      <div className="w-full max-w-lg rounded-t-3xl overflow-hidden animate-slideUp"
        style={{ backgroundColor: 'var(--color-bg)', maxHeight: '80vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-2 px-5 pt-4 pb-2">
          <h3 className="text-base font-bold">격변화 도표</h3>
          <button onClick={onClose} autoFocus
            className="w-11 h-11 flex items-center justify-center rounded-full shrink-0
                       active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="도표 닫기">✕</button>
        </div>
        <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: 'calc(80vh - 60px)' }}>
          {refTables.map((tbl: DeclensionTable) => (
            <div key={tbl.id} className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                  {tbl.title}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
                  {tbl.gender}
                </span>
              </div>
              <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                <span lang="pi" className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>
                  {tbl.word}
                </span>
                {' '}({tbl.meaning})
              </div>
              <div className="rounded-xl overflow-x-auto"
                style={{ border: '1px solid var(--color-border)' }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-hover)' }}>
                      <th className="text-left px-3 py-2 font-bold"
                        style={{ color: 'var(--color-text-secondary)', width: '30%' }}>격</th>
                      <th className="text-left px-3 py-2 font-bold"
                        style={{ color: 'var(--color-text-secondary)', width: '35%' }}>단수</th>
                      <th className="text-left px-3 py-2 font-bold"
                        style={{ color: 'var(--color-text-secondary)', width: '35%' }}>복수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedRows(tbl.rows).map((row, ri) => (
                      <tr key={ri} style={{
                        backgroundColor: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-elevated)',
                        borderTop: '1px solid var(--color-border-light)',
                      }}>
                        <td className="px-3 py-2 font-medium"
                          style={{ color: 'var(--color-text-secondary)' }}>{row.case}</td>
                        <td lang="pi" className="px-3 py-2 pali-text" style={{ fontSize: '0.75rem' }}>{row.sg}</td>
                        <td lang="pi" className="px-3 py-2 pali-text" style={{ fontSize: '0.75rem' }}>{row.pl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
