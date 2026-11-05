// 메모 창 아래 — 관리자 암호 넣기 / 관리자 모드 끄기
import { useState } from 'react'
import { lockAdmin, unlockAdmin } from '../utils/admin'

export default function AdminUnlock({ admin, onChange }: { admin: boolean; onChange: (v: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [err, setErr] = useState(false)
  if (admin) {
    return (
      <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs text-neutral-500">
        <span>🛠️ 관리자 모드 — 모든 메모와 검토 상태를 볼 수 있어요</span>
        <button onClick={() => { lockAdmin(); onChange(false) }} className="underline">끄기</button>
      </div>
    )
  }
  if (!open) {
    return (
      <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-right">
        <button onClick={() => setOpen(true)} className="text-[11px] text-neutral-400 underline">관리자</button>
      </div>
    )
  }
  const submit = async () => {
    const ok = await unlockAdmin(code)
    setErr(!ok)
    if (ok) { setCode(''); setOpen(false); onChange(true) }
  }
  return (
    <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
      <input type="password" value={code} onChange={e => { setCode(e.target.value); setErr(false) }}
        onKeyDown={e => { if (e.key === 'Enter') submit() }}
        placeholder="관리자 암호" aria-label="관리자 암호" autoFocus
        className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-sm" />
      <button onClick={submit} className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-sm">확인</button>
      {err && <span className="text-xs text-red-500" role="alert">암호가 달라요</span>}
    </div>
  )
}
