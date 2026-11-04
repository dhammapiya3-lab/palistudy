// 경전 데이터 훅 (API→UI 브릿지)
import { useState, useEffect } from 'react'
import { fetchSuttaText } from '../api/bilara'
import { fetchSuttaplex } from '../api/suttaplex'
import type { BilaraSutta, Suttaplex } from '../api/types'

interface UseSuttaResult {
  sutta: BilaraSutta | null
  loading: boolean
  error: string | null
}

export function useSutta(uid: string | undefined): UseSuttaResult {
  const [sutta, setSutta] = useState<BilaraSutta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!uid) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchSuttaText(uid)
      .then(data => {
        if (!cancelled) setSutta(data)
      })
      .catch(err => {
        if (!cancelled) setError(err instanceof Error ? err.message : '경전 로드 실패')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [uid])

  return { sutta, loading, error }
}

interface UseSuttaplexResult {
  suttaplex: Suttaplex[] | null
  loading: boolean
  error: string | null
}

export function useSuttaplex(uid: string | undefined): UseSuttaplexResult {
  const [suttaplex, setSuttaplex] = useState<Suttaplex[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!uid) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchSuttaplex(uid)
      .then(data => {
        if (!cancelled) setSuttaplex(data)
      })
      .catch(err => {
        if (!cancelled) setError(err instanceof Error ? err.message : '메타데이터 로드 실패')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [uid])

  return { suttaplex, loading, error }
}
