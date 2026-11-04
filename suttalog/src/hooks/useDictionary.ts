// 사전 조회 훅
import { useState, useCallback } from 'react'
import { lookupWord, type DictionaryFullEntry } from '../api/dictionary'

interface UseDictionaryResult {
  entries: DictionaryFullEntry[]
  loading: boolean
  error: string | null
  lookup: (word: string) => void
  clear: () => void
}

export function useDictionary(): UseDictionaryResult {
  const [entries, setEntries] = useState<DictionaryFullEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const lookup = useCallback((word: string) => {
    if (!word.trim()) return

    setLoading(true)
    setError(null)

    lookupWord(word)
      .then(data => setEntries(data))
      .catch(err => setError(err instanceof Error ? err.message : '사전 조회 실패'))
      .finally(() => setLoading(false))
  }, [])

  const clear = useCallback(() => {
    setEntries([])
    setError(null)
  }, [])

  return { entries, loading, error, lookup, clear }
}
