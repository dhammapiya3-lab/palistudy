// 프로필/나 화면
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countMemos } from '../../utils/memo'

// 학습 데이터 내보내기
function exportData() {
  const data: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('suttalog-')) {
      data[key] = localStorage.getItem(key) || ''
    }
  }
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `suttalog-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// 학습 데이터 가져오기
function importData(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      let count = 0
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith('suttalog-')) {
          localStorage.setItem(key, value as string)
          count++
        }
      }
      alert(`${count}개 항목을 가져왔습니다. 페이지를 새로고침합니다.`)
      window.location.reload()
    } catch {
      alert('파일 형식이 올바르지 않습니다.')
    }
  }
  reader.readAsText(file)
}

const ACHIEVEMENTS = [
  { icon: '🪷', title: '첫 레슨 완료', desc: '학습의 첫 걸음' },
  { icon: '🔥', title: '7일 연속 학습', desc: '정진의 시작' },
  { icon: '📜', title: '경전 첫 해석', desc: 'Dhammapada 1게 완료' },
  { icon: '💎', title: '100 공덕', desc: '꾸준한 학습의 결실' },
  { icon: '📚', title: '50단어 마스터', desc: '어휘의 기초' },
  { icon: '⭐', title: '완벽 레슨 5회', desc: '오답 없이 완료' },
  { icon: '🔒', title: '???', desc: '14일 연속 학습 시 해제' },
  { icon: '🔒', title: '???', desc: '100단어 마스터 시 해제' },
]

export default function Profile() {
  const nav = useNavigate()
  const importRef = useRef<HTMLInputElement>(null)
  const [memoCount] = useState(countMemos())

  return (
    <div className="px-4 pt-6 space-y-5">
      {/* 숨김 파일 입력 (가져오기용) */}
      <input ref={importRef} type="file" accept=".json" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) importData(f); e.target.value = '' }} />
      {/* 프로필 헤더 */}
      <div className="rounded-2xl p-5 text-center"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="text-5xl mb-3">🧘</div>
        <h2 className="font-bold text-lg">입문자 <span style={{ color: 'var(--color-primary)' }}>Lv.1</span></h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>Sekha</p>

        {/* XP 바 */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            <span>0 / 50 XP</span>
            <span>다음: 학습자</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
            <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: 'var(--color-primary)' }} />
          </div>
        </div>
      </div>

      {/* 통계 4박스 */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: '🔥', value: '0일', label: '연속 학습' },
          { icon: '📚', value: '0', label: '학습 단어' },
          { icon: '⏱', value: '0시간', label: '총 학습' },
          { icon: '🏅', value: '0/20', label: '업적' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-4 text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="font-bold text-lg mt-1" style={{ color: 'var(--color-primary)' }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* 주간 그래프 */}
      <div className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-3">📊 이번 주 학습</p>
        <div className="flex items-end justify-between h-24 gap-2">
          {[0, 0, 0, 0, 0, 0, 0].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor: h > 0 ? 'var(--color-primary)' : 'var(--color-border)',
                  opacity: h > 0 ? 1 : 0.2,
                  minHeight: 4,
                }} />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {['월', '화', '수', '목', '금', '토', '일'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 업적 */}
      <div>
        <p className="text-sm font-semibold mb-3">🏅 업적</p>
        <div className="grid grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="rounded-xl p-3 text-center"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', opacity: a.icon === '🔒' ? 0.4 : 1 }}>
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-medium mt-1 truncate">{a.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        {[
          { icon: '📝', label: `메모 목록 (${memoCount}개)`, action: () => nav('/memos') },
          { icon: '⚙️', label: '설정', action: () => nav('/settings') },
          { icon: '📤', label: '학습 데이터 내보내기', action: exportData },
          { icon: '📥', label: '학습 데이터 가져오기', action: () => importRef.current?.click() },
          { icon: '❓', label: '도움말', action: () => {} },
        ].map((item, i) => (
          <button key={i} onClick={item.action}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-left border-b last:border-b-0"
            style={{ borderColor: 'var(--color-border)' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
            <span className="ml-auto" style={{ color: 'var(--color-text-secondary)' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
