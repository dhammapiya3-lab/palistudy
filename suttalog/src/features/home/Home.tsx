// 홈 화면 — 이어서 학습하기, 오늘 목표, 이번 주 학습
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_META, lessonNumber } from '../../utils/lessons-meta'
import { formatDuration, getCurrentLessonId, getLessonProgress, getOverall, getRecommendedNextId } from '../../utils/lesson-progress'
import { localDateStr } from '../../utils/local-date'
import { forgivingStreak, getDailyGoal, readStudyDates, thisWeek, todayStudySeconds } from '../../utils/study-time'
import { backfillSeenWords, getDueSummary } from '../../utils/word-review'

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

const R = 24, C = 2 * Math.PI * R

function countLearnedWords(): number {
  try { return Object.keys(JSON.parse(localStorage.getItem('suttalog-word-counts') || '{}')).length } catch { return 0 }
}

export default function Home() {
  const nav = useNavigate()
  const g = getGreeting()
  const quote = QUOTES[new Date().getDate() % QUOTES.length]
  const [showCal, setShowCal] = useState(false)
  const [, setVer] = useState(0)
  // 예전에 공부한 낱말을 복습 목록에 한 번 채움(복습 낱말 수가 맞게 보이도록)
  useEffect(() => {
    let alive = true
    backfillSeenWords().then(added => { if (alive && added) setVer(v => v + 1) })
    return () => { alive = false }
  }, [])
  const currentId = getCurrentLessonId()
  const current = LESSON_META[currentId]
  const cur = getLessonProgress(currentId)
  const currentPct = Math.round(cur.ratio * 100)
  const lessonNo = lessonNumber(currentId)
  const nextId = getRecommendedNextId(currentId)
  const overall = getOverall()
  const studyDates = readStudyDates()
  const week = thisWeek(studyDates)
  const weekDays = week.filter(d => d.studied).length
  const streak = forgivingStreak(studyDates)
  const goal = getDailyGoal()
  const todayMin = Math.floor(todayStudySeconds() / 60)
  const goalPct = Math.min(100, Math.round((todayMin / goal) * 100))
  const due = getDueSummary()
  const words = countLearnedWords()
  const remainSteps = Math.max(0, cur.total - cur.step)

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
        aria-label={`${cur.started ? '이어서 학습하기' : '학습 시작하기'}: 제${lessonNo}과 ${current.title}, 진도 ${currentPct}%`}
        className="w-full rounded-2xl text-left mb-1.5  intro-fade-up-delay active:scale-[0.98] transition-transform"
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
              <p className="text-[11px] font-semibold tracking-wide text-white/90">{cur.started ? '이어서 학습하기' : '학습 시작하기'} · 제{lessonNo}과</p>
              <p className="text-base font-bold text-white truncate leading-tight">{current.icon} {current.title}</p>
              <p className="text-xs text-white/90 truncate">
                {cur.started ? `남은 분량 ${formatDuration(remainSteps)}` : `${cur.total}단계 · ${formatDuration(cur.total)}`} · {current.subtitle}
              </p>
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

      {/* 추천 다음 과 */}
      {nextId && (
        <button onClick={() => nav(`/learn/scripture/${nextId}`)}
          className="w-full text-left text-xs px-2 py-2 mb-2 flex items-center gap-1"
          style={{ color: 'var(--color-text-secondary)' }}>
          <span>추천 다음 과:</span>
          <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>제{lessonNumber(nextId)}과 {LESSON_META[nextId].title}</span>
          <span aria-hidden="true" className="ml-auto">›</span>
        </button>
      )}

      {/* ── 오늘 목표 ── */}
      <div className="rounded-xl p-3 mb-3 flex items-center gap-3"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)' }}>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold">
            <span aria-hidden="true">{goalPct >= 100 ? '🪷 ' : '⏱️ '}</span>
            {goalPct >= 100 ? `오늘 목표 ${goal}분을 채웠어요!` : `오늘 목표 ${goal}분 중 ${todayMin}분`}
          </p>
          <div className="mt-1.5 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-light)' }}
            role="progressbar" aria-valuenow={goalPct} aria-valuemin={0} aria-valuemax={100} aria-label="오늘 목표 채운 정도">
            <div className="h-full rounded-full" style={{ width: `${Math.max(goalPct, 2)}%`, background: goalPct >= 100 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
          </div>
        </div>
        <button onClick={() => nav(due.total > 0 ? '/review/words' : '/review')}
          className="shrink-0 rounded-lg px-2.5 py-2 text-center"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}>
          <span className="block text-sm font-bold leading-tight">🧠 {due.total}</span>
          <span className="block text-[11px] font-semibold">복습 낱말</span>
        </button>
      </div>

      {/* ── 통계 3칸 ── */}
      <div className="grid grid-cols-3 gap-2 mb-3 ">
        {[
          { icon: '📚', label: '경전 과', value: `${overall.doneLessons}/${overall.lessons}과`, sub: `전체 ${overall.pct}%`, bg: 'rgba(192,107,10,0.1)' },
          { icon: '🔥', label: '이번 주', value: `${weekDays}/7일`, sub: streak > 1 ? `${streak}일째 이어 가요` : '하루 쉼은 괜찮아요', bg: 'rgba(239,83,80,0.1)' },
          { icon: '💬', label: '배운 낱말', value: `${words}개`, sub: '낱말장 보기', bg: 'rgba(46,125,50,0.1)', to: '/words' },
        ].map((s, i) => {
          const body = (
            <>
              <div aria-hidden="true" className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs mb-1" style={{ background: s.bg }}>{s.icon}</div>
              <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{s.sub}</p>
            </>
          )
          const style = { background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)' }
          return s.to
            ? <button key={i} onClick={() => nav(s.to!)} className="rounded-xl p-2.5 text-center active:scale-[0.97]" style={style}>{body}</button>
            : <div key={i} className="rounded-xl p-2.5 text-center" style={style}>{body}</div>
        })}
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

      {/* ── 캘린더 (접어 둠) ── */}
      <button onClick={() => setShowCal(v => !v)} aria-expanded={showCal}
        className="w-full rounded-xl px-3 py-2.5 mb-2 text-xs font-semibold flex items-center justify-between"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-text)' }}>
        <span><span aria-hidden="true">📅 </span>학습 달력 · 모두 {studyDates.size}일 공부</span>
        <span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>{showCal ? '▲' : '▼'}</span>
      </button>
      {showCal && <StudyCalendar />}

      {/* 다른 공부 앱 */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href="/palistudy/primer/" className="rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center justify-between"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-text)' }}>
          <span><span aria-hidden="true">📿 </span>빠알리 프라이머<span className="block text-[10px] font-normal" style={{ color: 'var(--color-text-tertiary)' }}>문법이 막히면 여기서</span></span><span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
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
  const studyDates = readStudyDates()
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
