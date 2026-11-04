// Nikaya 내부 경전 목록
import { useParams, useNavigate } from 'react-router-dom'
import { useSuttaplex } from '../../hooks/useSutta'
import Card from '../../components/Card'
import { NIKAYAS } from '../../config/paths'

export default function NikayaPage() {
  const { nikayaId } = useParams<{ nikayaId: string }>()
  const navigate = useNavigate()
  const { suttaplex, loading, error } = useSuttaplex(nikayaId)
  const nikaya = NIKAYAS.find(n => n.id === nikayaId)

  if (!nikaya) {
    return <p>알 수 없는 Nikaya입니다.</p>
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/browse')}
        className="text-sm"
        style={{ color: 'var(--color-primary)' }}
      >
        ← 경전 탐색
      </button>

      <div>
        <h1 className="text-xl font-bold">{nikaya.nameKo}</h1>
        <p className="text-sm pali-text" style={{ color: 'var(--color-primary)' }}>
          {nikaya.name}
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p style={{ color: 'var(--color-text-secondary)' }}>경전 목록 로딩 중...</p>
        </div>
      )}

      {error && (
        <Card>
          <p className="text-red-500 text-sm">오류: {error}</p>
        </Card>
      )}

      {suttaplex && (
        <div className="space-y-2">
          {suttaplex.map(s => (
            <Card key={s.uid} onClick={() => navigate(`/read/${s.uid}`)}>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-primary)' }}>
                      {s.acronym || s.uid.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm pali-text mt-1">{s.original_title}</p>
                  {s.translated_title && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {s.translated_title}
                    </p>
                  )}
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>→</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
