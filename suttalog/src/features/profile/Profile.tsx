// 프로필/나 화면 — 통계와 업적은 실제 저장된 학습 기록으로 계산
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countMemos } from '../../utils/memo'
import { isSecretStorageKey } from '../../utils/memo-github'
import { getAllProgress } from '../../utils/lesson-progress'
import { countBasicDone } from '../lessons/basics'
import { localDateStr } from '../../utils/local-date'
import { forgivingStreak, longestStreak, readStudyDates, thisWeek } from '../../utils/study-time'
import { MILESTONES, milestoneReached } from '../../utils/lesson-sections'
import { RECITE_LESSONS } from '../../utils/lessons-meta'

// 학습 데이터 내보내기 — 이 앱(suttalog-) 데이터만, GitHub 토큰 같은 비밀 값은 제외
function exportData() {
  const data: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('suttalog-') && !isSecretStorageKey(key)) {
      data[key] = localStorage.getItem(key) || ''
    }
  }
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `suttalog-backup-${localDateStr()}.json`
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
        if (key.startsWith('suttalog-') && !isSecretStorageKey(key) && typeof value === 'string') {
          localStorage.setItem(key, value)
          count++
        }
      }
      alert(`${count}개 항목을 가져왔습니다. 화면을 새로 불러옵니다.`)
      window.location.reload()
    } catch {
      alert('파일 형식이 올바르지 않습니다. 이 앱에서 내보낸 백업 파일(.json)인지 확인해 주세요.')
    }
  }
  reader.readAsText(file)
}

function countLearnedWords(): number {
  try { return Object.keys(JSON.parse(localStorage.getItem('suttalog-word-counts') || '{}')).length } catch { return 0 }
}

const HELP = [
  { q: '어떻게 공부하나요?', a: '홈의 주황색 카드를 누르면 지금 배울 경전이 열립니다. 단어 → 퀴즈 → 경전 구절 순서로 한 단계씩 넘어가요. 학습맵에서 원하는 과를 골라도 됩니다.' },
  { q: '중간에 그만둬도 되나요?', a: '네. 진도는 자동으로 저장되어 다음에 그 자리부터 이어집니다.' },
  { q: '발음이 안 들려요', a: '설정의 ‘발음 소리’가 켜져 있는지, 기기 소리가 켜져 있는지 확인해 주세요. 기기에 따라 음성 엔진이 없으면 소리가 나지 않을 수 있습니다.' },
  { q: '글자가 작아요', a: '설정의 ‘큰 글씨’를 켜면 한국어 해설까지 함께 커집니다. 빠알리 글자 크기는 따로 키울 수 있어요.' },
  { q: '메모는 어떻게 남기나요?', a: '학습 화면 오른쪽 아래 ✏️(내 메모) 단추를 누르면 그 단계에 메모를 남길 수 있어요. 남긴 메모는 프로필 → 내 메모에서 모아 봅니다.' },
  { q: '배운 낱말을 다시 보려면?', a: '복습 탭 맨 위 ‘오늘 복습할 낱말’을 누르면 몇 분 안에 뜻 고르기·듣고 고르기로 복습할 수 있어요. 틀린 문제가 먼저 나와요.' },
  { q: '다른 기기로 옮기려면?', a: '이 화면의 ‘학습 데이터 내보내기’로 파일을 저장한 뒤, 새 기기에서 ‘학습 데이터 가져오기’로 불러오세요.' },
]

export default function Profile() {
  const nav = useNavigate()
  const importRef = useRef<HTMLInputElement>(null)
  const [memoCount] = useState(countMemos())
  const [showHelp, setShowHelp] = useState(false)

  const dates = readStudyDates()
  const streak = forgivingStreak(dates)
  const best = longestStreak(dates)
  const words = countLearnedWords()
  const progress = getAllProgress()
  const doneSuttas = progress.filter(p => p.done).length
  const startedSuttas = progress.filter(p => p.started).length
  const basics = countBasicDone()
  const week = thisWeek(dates)

  const achievements = [
    { icon: '🌱', title: '첫걸음', desc: '경전 학습 시작', got: startedSuttas > 0 || basics.done > 0 },
    { icon: '🪷', title: '첫 과 완료', desc: '경전 한 과를 끝까지', got: doneSuttas >= 1 },
    { icon: '🔥', title: '7일 연속', desc: '7일 연속 학습', got: best >= 7 },
    { icon: '🌕', title: '30일 학습', desc: '모두 30일 공부', got: dates.size >= 30 },
    { icon: '📚', title: '단어 50개', desc: '단어 50개 학습', got: words >= 50 },
    { icon: '📖', title: '단어 200개', desc: '단어 200개 학습', got: words >= 200 },
    { icon: '🔤', title: '기초 완성', desc: '기초 다지기 모두', got: basics.total > 0 && basics.done === basics.total },
    { icon: '🙏', title: '독송문 완료', desc: '독송문 과 모두', got: RECITE_LESSONS.every(id => progress.find(p => p.id === id)?.done) },
    // 긴 경전 중간 이정표
    ...MILESTONES.map(m => ({ icon: m.icon, title: m.title, desc: m.desc, got: milestoneReached(m) })),
    { icon: '🌳', title: '전 과정 완료', desc: `경전 ${progress.length}과 모두`, got: doneSuttas === progress.length },
  ]
  const gotCount = achievements.filter(a => a.got).length

  return (
    <div className="px-4 pt-6 space-y-5 max-w-lg mx-auto">
      {/* 숨김 파일 입력 (가져오기용) */}
      <input ref={importRef} type="file" accept=".json,application/json" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) importData(f); e.target.value = '' }} />

      {/* 프로필 헤더 */}
      <div className="rounded-2xl p-5 text-center"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="text-5xl mb-3" aria-hidden="true">🧘</div>
        <h1 className="font-bold text-lg">나의 공부</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          경전 {doneSuttas}과 완료 · 기초 레슨 {basics.done}/{basics.total} 완료
        </p>
      </div>

      {/* 통계 4박스 */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: '🔥', value: `${streak}일`, label: '이어 가는 학습 (주 1일 쉼 포함)' },
          { icon: '📅', value: `${dates.size}일`, label: '모두 공부한 날' },
          { icon: '📚', value: `${words}개`, label: '배운 낱말 · 낱말장 ›', to: '/words' },
          { icon: '🏅', value: `${gotCount}/${achievements.length}`, label: '업적' },
        ].map((s, i) => {
          const body = (
            <>
              <span className="text-2xl" aria-hidden="true">{s.icon}</span>
              <p className="font-bold text-lg mt-1" style={{ color: 'var(--color-primary)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
            </>
          )
          const style = { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }
          return s.to
            ? <button key={i} onClick={() => nav(s.to!)} className="rounded-xl p-4 text-center active:scale-[0.98]" style={style}>{body}</button>
            : <div key={i} className="rounded-xl p-4 text-center" style={style}>{body}</div>
        })}
      </div>

      {/* 이번 주 학습 */}
      <div className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-3">📊 이번 주 학습 <span className="text-xs font-normal" style={{ color: 'var(--color-text-secondary)' }}>({week.filter(d => d.studied).length}/7일)</span></p>
        <div className="flex justify-between gap-2">
          {week.map(d => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1"
              aria-label={`${d.label}요일 ${d.studied ? '공부함' : '공부 안 함'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: d.studied ? 'var(--color-primary)' : 'var(--color-border-light)',
                  color: d.studied ? '#fff' : 'var(--color-text-tertiary)',
                  outline: d.isToday ? '2px solid var(--color-primary-light)' : undefined,
                  outlineOffset: 2,
                }} aria-hidden="true">
                {d.studied ? '✓' : ''}
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 업적 */}
      <div>
        <p className="text-sm font-semibold mb-3">🏅 업적 <span className="text-xs font-normal" style={{ color: 'var(--color-text-secondary)' }}>({gotCount}/{achievements.length})</span></p>
        <div className="grid grid-cols-4 gap-2">
          {achievements.map(a => (
            <div key={a.title} className="rounded-xl p-2 text-center"
              aria-label={`${a.title}: ${a.desc} — ${a.got ? '얻음' : '아직'}`}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: a.got ? '1.5px solid var(--color-primary-light)' : '1px dashed var(--color-border)',
              }}>
              <span className="text-2xl block" aria-hidden="true" style={{ filter: a.got ? undefined : 'grayscale(1)', opacity: a.got ? 1 : 0.35 }}>{a.icon}</span>
              <p className="text-[11px] font-semibold mt-1 leading-tight" style={{ color: a.got ? 'var(--color-text)' : 'var(--color-text-tertiary)' }}>{a.title}</p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{a.got ? '얻음' : a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        {[
          { icon: '📝', label: `내 메모 (${memoCount}개)`, action: () => nav('/memos') },
          { icon: '⚙️', label: '설정', action: () => nav('/settings') },
          { icon: '📤', label: '학습 데이터 내보내기', action: exportData },
          { icon: '📥', label: '학습 데이터 가져오기', action: () => importRef.current?.click() },
          { icon: '❓', label: '도움말', action: () => setShowHelp(v => !v), expanded: showHelp },
        ].map((item, i) => (
          <button key={i} onClick={item.action}
            aria-expanded={item.expanded}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-left border-b last:border-b-0"
            style={{ borderColor: 'var(--color-border)' }}>
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            <span className="ml-auto" style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true">
              {item.expanded === undefined ? '→' : item.expanded ? '▲' : '▼'}
            </span>
          </button>
        ))}
      </div>

      {showHelp && (
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {HELP.map(h => (
            <div key={h.q}>
              <p className="text-sm font-bold">Q. {h.q}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{h.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
