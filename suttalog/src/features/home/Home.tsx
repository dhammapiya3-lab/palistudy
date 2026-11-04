// 홈 화면 — 스마트폰 1화면 (스크롤 없이)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_META, LESSON_ORDER } from '../../utils/lessons-meta'
import { getAllProgress, getCurrentLessonId, getLessonProgress } from '../../utils/lesson-progress'
import { localDateStr } from '../../utils/local-date'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6) return { text: '새벽 수행의 시간입니다', emoji: '🌙', bg: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', tc: '#fff' }
  if (h < 12) return { text: '좋은 아침입니다', emoji: '🌅', bg: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', tc: '#1E1B16' }
  if (h < 18) return { text: '좋은 오후입니다', emoji: '☀️', bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', tc: '#1E1B16' }
  return { text: '고요한 저녁입니다', emoji: '🌿', bg: 'linear-gradient(135deg, #2c3e50 0%, #3d5866 100%)', tc: '#fff' }
}

const QUOTES = [
  { pali: 'Manopubbaṅgamā dhammā', ko: '마음이 모든 법의 선구자이다', src: 'Dhp 1' },
  { pali: 'Sabbe saṅkhārā aniccā', ko: '모든 형성된 것은 무상하다', src: 'Dhp 277' },
  { pali: 'Attā hi attano nātho', ko: '자기 자신이 자신의 의지처이다', src: 'Dhp 160' },
  { pali: 'Dhammo have rakkhati dhammacāriṃ', ko: '법은 법대로 행하는 자를 보호한다', src: 'Thag 303' },
  { pali: 'Khantī paramaṃ tapo titikkhā', ko: '참고 견디는 인내가 최상의 고행이다', src: 'Dhp 184' },
  { pali: 'Appamādo amatapadaṃ', ko: '방일하지 않음이 불사의 길', src: 'Dhp 21' },
  { pali: 'Manoseṭṭhā manomayā', ko: '마음이 으뜸이며, 마음이 만들어낸다', src: 'Dhp 1' },
]

/** 오늘(또는 어제)부터 거슬러 올라가며 끊기지 않은 학습일 수 */
function getStreak(dates: Set<string>): number {
  const d = new Date()
  if (!dates.has(localDateStr(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (dates.has(localDateStr(d))) { n++; d.setDate(d.getDate() - 1) }
  return n
}

const R = 24, C = 2 * Math.PI * R

function getStudyDates(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]'))
}

export default function Home() {
  const nav = useNavigate()
  const g = getGreeting()
  const quote = QUOTES[new Date().getDate() % QUOTES.length]
  const all = getAllProgress()
  const currentId = getCurrentLessonId()
  const current = LESSON_META[currentId]
  const cur = getLessonProgress(currentId)
  const currentPct = Math.round(cur.ratio * 100)
  const lessonNo = (LESSON_ORDER as readonly string[]).indexOf(currentId) + 1
  const completed = all.filter(p => p.done).length
  const totalPct = Math.round((all.reduce((s, p) => s + p.ratio, 0) / all.length) * 100)
  const studyDates = getStudyDates()

  return (
    <div className="px-4 pt-5 max-w-lg mx-auto">

      {/* ── 인사 카드 ── */}
      <div className="rounded-2xl p-3.5 mb-3  intro-fade-up" style={{ background: g.bg, color: g.tc, boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{g.emoji}</span>
          <div>
            <p className="text-xs opacity-80 font-medium">{g.text}</p>
            <h1 className="text-lg font-bold tracking-tight">경전으로 배우기</h1>
          </div>
        </div>
      </div>

      {/* ── 히어로: 현재 학습 ── */}
      <button onClick={() => nav(`/learn/scripture/${currentId}`)}
        aria-label={`${currentPct > 0 ? '이어서 학습하기' : '학습 시작하기'}: 제${lessonNo}과 ${current.title}, 진도 ${currentPct}%`}
        className="w-full rounded-2xl text-left mb-3  intro-fade-up-delay active:scale-[0.98] transition-transform"
        style={{ background: 'var(--color-primary-gradient)', boxShadow: '0 4px 16px rgba(192,107,10,0.3)', border: 'none', padding: 0 }}>
        <div className="relative overflow-hidden rounded-2xl p-4">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative shrink-0" aria-hidden="true">
              <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" />
                <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - currentPct / 100)} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-bold">{currentPct}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold tracking-wide text-white/90">{currentPct > 0 ? '이어서 학습하기' : '학습 시작하기'} · 제{lessonNo}과</p>
              <p className="text-base font-bold text-white truncate leading-tight">{current.icon} {current.title}</p>
              <p className="text-xs text-white/90 truncate">{current.subtitle}</p>
              <div className="mt-2 h-1 rounded-full overflow-hidden bg-white/20">
                <div className="h-full rounded-full" style={{ width: `${currentPct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))' }} />
              </div>
            </div>
            <div aria-hidden="true" className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </button>

      {/* ── 통계 3칸 ── */}
      <div className="grid grid-cols-3 gap-2 mb-3 ">
        {[
          { icon: '📚', label: '완료한 과', value: `${completed}/${all.length}`, bg: 'rgba(192,107,10,0.1)' },
          { icon: '🔥', label: '연속 학습', value: `${getStreak(studyDates)}일`, bg: 'rgba(239,83,80,0.1)' },
          { icon: '📖', label: '전체 진도', value: `${totalPct}%`, bg: 'rgba(46,125,50,0.1)' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-2.5 text-center"
            style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)' }}>
            <div aria-hidden="true" className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs mb-1" style={{ background: s.bg }}>{s.icon}</div>
            <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
            <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── 명구 (컴팩트) ── */}
      <div className="rounded-xl overflow-hidden mb-3 "
        style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-light)' }}>
        <div className="flex">
          <div className="w-0.5 shrink-0" style={{ background: 'linear-gradient(180deg, var(--color-primary-light), var(--color-primary-dark))' }} />
          <div className="px-3 py-2.5 flex-1">
            <p lang="pi" className="pali-text text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{quote.pali}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{quote.ko} <span style={{ color: 'var(--color-text-tertiary)' }}>· {quote.src}</span></p>
          </div>
        </div>
      </div>

      {/* ── 캘린더 ── */}
      <StudyCalendar />

      {/* 다른 공부 앱 */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href="/palistudy/primer/" className="rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center justify-between"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-text)' }}>
          <span><span aria-hidden="true">📿 </span>빠알리 프라이머</span><span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        </a>
        <a href="/palistudy/" className="rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center justify-between"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-text)' }}>
          <span><span aria-hidden="true">🏠 </span>빠알리어 공부 대문</span><span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        </a>
      </div>

      {/* 푸터 */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>제작: 정성광, 담마삐야</p>
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
  const today = localDateStr()

  return (
    <div className="rounded-2xl p-4"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-2 ">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} aria-label="이전 달"
          className="w-10 h-10 -m-1.5 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <p className="text-xs font-bold" aria-live="polite">{year}년 {month + 1}월</p>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="다음 달"
          className="w-10 h-10 -m-1.5 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-0.5 ">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold py-0.5"
            style={{ color: d === '일' ? '#C62828' : d === '토' ? '#1565C0' : 'var(--color-text-tertiary)' }}>{d}</div>
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
              aria-label={`${month + 1}월 ${day}일${hasStudy ? ' 학습함' : ''}${isToday ? ' (오늘)' : ''}`}
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
