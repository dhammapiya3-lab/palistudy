// 경전 탐색 (Nikaya 브라우징)
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import { NIKAYAS } from '../../config/paths'

export default function BrowsePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">📚 경전 탐색</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        빠알리 경전 5부 (Pañca Nikāya)
      </p>

      <div className="grid grid-cols-2 gap-3">
        {NIKAYAS.map(nikaya => (
          <Card
            key={nikaya.id}
            onClick={() => navigate(`/browse/${nikaya.id}`)}
          >
            <h3 className="font-semibold text-sm">{nikaya.nameKo}</h3>
            <p className="text-xs pali-text mt-1" style={{ color: 'var(--color-primary)' }}>
              {nikaya.name}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              {nikaya.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
