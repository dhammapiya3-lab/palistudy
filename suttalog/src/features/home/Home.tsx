// 홈 화면 — 스마트폰 1화면 (스크롤 없이)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const COURSES = [
  { id: 'dhp1-alphabet', title: '전법륜경', subtitle: '사성제·팔정도', icon: '☸️', total: 45 },
  { id: 'sn22-59', title: '무아경', subtitle: '오온과 무아', icon: '🔍', total: 21 },
  { id: 'sn45-8', title: '팔정도 분별경', subtitle: '팔정도 분석', icon: '📐', total: 20 },
  { id: 'mn10', title: '사념처경', subtitle: '마음챙김 🎯', icon: '🧘', total: 20 },
]

function getProgress(id: string): number {
  return Number(localStorage.getItem(`suttalog-progress-${id}`) || '0')
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6) return { text: '새벽 수행의 시간입니다', emoji: '🌙', bg: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', tc: '#fff' }
  if (h < 12) return { text: '좋은 아침입니다', emoji: '🌅', bg: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', tc: '#1E1B16' }
  if (h < 18) return { text: '좋은 오후입니다', emoji: '☀️', bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', tc: '#1E1B16' }
  return { text: '고요한 저녁입니다', emoji: '🌿', bg: 'linear-gradient(135deg, #2c3e50 0%, #3d5866 100%)', tc: '#fff' }
}

const QUOTES = [
  { pali: 'Manopubbaṅgamā dhammā', ko: '마음이 모든 법의 선구자이다' },
  { pali: 'Sabbe saṅkhārā aniccā', ko: '모든 형성된 것은 무상하다' },
  { pali: 'Attā hi attano nātho', ko: '자기 자신이 자신의 의지처이다' },
  { pali: 'Dhammo have rakkhati dhammacāriṃ', ko: '법은 법대로 행하는 자를 보호한다' },
  { pali: 'Khanti paramaṃ tapo', ko: '인내는 최상의 고행이다' },
  { pali: 'Appamādo amatapadaṃ', ko: '방일하지 않음이 불사의 길' },
  { pali: 'Manosetṭhā manomayā', ko: '마음이 앞서고, 마음이 만든다' },
]

const R = 24, C = 2 * Math.PI * R

function getStudyDates(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]'))
}

export default function Home() {
  const nav = useNavigate()
  const g = getGreeting()
  const quote = QUOTES[new Date().getDate() % QUOTES.length]
  const current = COURSES.find(c => getProgress(c.id) < c.total - 1) ?? COURSES[0]
  const currentPct = Math.round((getProgress(current.id) / current.total) * 100)
  const completed = COURSES.filter(c => getProgress(c.id) >= c.total - 1).length
  const totalPct = Math.round(COURSES.reduce((s, c) => s + (getProgress(c.id) / c.total) * 100, 0) / COURSES.length)

  return (
    <div className="pb-24 px-4 pt-5 max-w-lg mx-auto">

      {/* ── 인사 카드 ── */}
      <div className="rounded-2xl p-3.5 mb-3  intro-fade-up" style={{ background: g.bg, color: g.tc, boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{g.emoji}</span>
          <div>
            <p className="text-xs opacity-80 font-medium">{g.text}</p>
            <h1 className="text-lg font-bold tracking-tight">빠알리어 공부</h1>
          </div>
        </div>
      </div>

      {/* ── 히어로: 현재 학습 ── */}
      <button onClick={() => nav(`/learn/scripture/${current.id}`)}
        className="w-full rounded-2xl text-left mb-3  intro-fade-up-delay active:scale-[0.98] transition-transform"
        style={{ background: 'var(--color-primary-gradient)', boxShadow: '0 4px 16px rgba(192,107,10,0.3)', border: 'none', padding: 0 }}>
        <div className="relative overflow-hidden rounded-2xl p-4">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative flex-">
              <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" />
                <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - currentPct / 100)} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-bold">{currentPct}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/60">{currentPct > 0 ? '이어하기' : '시작하기'}</p>
              <p className="text-base font-bold text-white truncate leading-tight">{current.icon} {current.title}</p>
              <p className="text-xs text-white/70 truncate">{current.subtitle}</p>
              <div className="mt-2 h-1 rounded-full overflow-hidden bg-white/20">
                <div className="h-full rounded-full" style={{ width: `${currentPct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))' }} />
              </div>
            </div>
            <div className="flex- w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </button>

      {/* ── 통계 3칸 ── */}
      <div className="grid grid-cols-3 gap-2 mb-3 ">
        {[
          { icon: '📚', label: '완료', value: `${completed}과`, bg: 'rgba(192,107,10,0.1)' },
          { icon: '🔥', label: '학습일', value: `${getStudyDates().size}일`, bg: 'rgba(239,83,80,0.1)' },
          { icon: '📖', label: '진도', value: `${totalPct}%`, bg: 'rgba(46,125,50,0.1)' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-2.5 text-center"
            style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)' }}>
            <div className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs mb-1" style={{ background: s.bg }}>{s.icon}</div>
            <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
            <p className="text-[0.6rem]" style={{ color: 'var(--color-text-tertiary)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── 명구 (컴팩트) ── */}
      <div className="rounded-xl overflow-hidden mb-3 "
        style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-light)' }}>
        <div className="flex">
          <div className="w-0.5 flex-" style={{ background: 'linear-gradient(180deg, var(--color-primary-light), var(--color-primary-dark))' }} />
          <div className="px-3 py-2.5 flex-1">
            <p className="pali-text text-sm font-semibold" style={{ color: 'var(--color-primary)', fontSize: '14px' }}>{quote.pali}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{quote.ko}</p>
          </div>
        </div>
      </div>

      {/* ── 캘린더 ── */}
      <StudyCalendar />

      {/* 푸터 */}
      <div className="pt-5 pb-3 text-center">
        <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>제작: 정성광, 담마삐야</p>
      </div>
    </div>
  )
}

// ── 학습 캘린더 ──
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function StudyCalendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const studyDates = getStudyDates()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="rounded-2xl p-4"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-2 ">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <p className="text-xs font-bold">{year}년 {month + 1}월</p>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-0.5 ">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-[9px] font-semibold py-0.5"
            style={{ color: d === '일' ? '#EF5350' : d === '토' ? '#42A5F5' : 'var(--color-text-tertiary)' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasStudy = studyDates.has(dateStr)
          const isToday = dateStr === today
          return (
            <div key={day}
              className="aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium"
              style={{
                backgroundColor: hasStudy ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)' : 'transparent',
                border: isToday ? '1.5px solid var(--color-primary)' : '1.5px solid transparent',
                color: hasStudy ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: hasStudy ? 700 : 400,
              }}>
              {day}
              {hasStudy && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
