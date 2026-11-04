import { useState } from 'react'
import { getMonthStudyDates, getDayLog, type DayLog } from '../../../utils/study-log'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function StudyCalendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<DayLog | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const studyDates = getMonthStudyDates(year, month)
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* 월 이동 */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <p className="text-sm font-bold">{year}년 {month + 1}월</p>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map(dayName => (
          <div
            key={dayName}
            className="text-center text-[10px] font-semibold py-1"
            style={{ color: dayName === '일' ? '#EF5350' : dayName === '토' ? '#42A5F5' : 'var(--color-text-tertiary)' }}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }, (_, i) => (
          <div key={`e${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasStudy = studyDates.has(dateStr)
          const isToday = dateStr === today

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(getDayLog(dateStr))}
              className="aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-all active:scale-90"
              style={{
                backgroundColor: hasStudy ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)' : 'transparent',
                border: isToday ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: hasStudy ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: hasStudy ? 700 : 400,
              }}
            >
              {day}
              {hasStudy && (
                <span
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 선택 날짜 상세 */}
      {selectedDay && (
        <div className="mt-3 pt-3 space-y-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">{selectedDay.date}</p>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              닫기
            </button>
          </div>
          <div className="flex gap-3 text-center">
            <div className="flex-1 rounded-xl py-2" style={{ backgroundColor: 'var(--color-surface-elevated, var(--color-bg))' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>{selectedDay.sessionCount}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>학습 횟수</p>
            </div>
            <div className="flex-1 rounded-xl py-2" style={{ backgroundColor: 'var(--color-surface-elevated, var(--color-bg))' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>{selectedDay.totalMinutes}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>분</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {selectedDay.entries.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg"
                style={{ backgroundColor: 'var(--color-surface-elevated, var(--color-bg))' }}
              >
                <span className="font-bold truncate flex-1">{entry.lessonTitle}</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{entry.minutes}분</span>
                <span style={{ color: 'var(--color-accent)' }}>{entry.score}/{entry.totalSteps}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
