// 메모 목록을 화면에서 쓰기 — 한 번 받아 둔 목록을 같이 쓰고, 바뀌면 다시 그림
import { useEffect, useState } from 'react'
import { cachedMemos, getMemos, onMemosChanged, type Memo } from '../../utils/memo-cloud'

let started = false
export function useMemos(): Memo[] {
  const [list, setList] = useState<Memo[]>(() => cachedMemos() || [])
  useEffect(() => {
    const off = onMemosChanged(() => setList(cachedMemos() || []))
    if (!started) { started = true; getMemos() }
    return off
  }, [])
  return list
}
