import type { DeclensionTable } from '../declension-tables'

interface ReferenceSheetProps {
  refTables: DeclensionTable[]
  onClose: () => void
}

export default function ReferenceSheet({
  refTables,
  onClose
}: ReferenceSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-3xl overflow-hidden animate-slideUp"
        style={{ backgroundColor: 'var(--color-bg)', maxHeight: '80vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold">격변화 도표</h3>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}>✕</button>
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
                <span className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>
                  {tbl.word}
                </span>
                {' '}({tbl.meaning})
              </div>
              <div className="rounded-xl overflow-hidden"
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
                    {tbl.rows.map((row, ri) => (
                      <tr key={ri} style={{
                        backgroundColor: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-elevated)',
                        borderTop: '1px solid var(--color-border-light)',
                      }}>
                        <td className="px-3 py-2 font-medium"
                          style={{ color: 'var(--color-text-secondary)' }}>{row.case}</td>
                        <td className="px-3 py-2 pali-text" style={{ fontSize: '0.75rem' }}>{row.sg}</td>
                        <td className="px-3 py-2 pali-text" style={{ fontSize: '0.75rem' }}>{row.pl}</td>
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
