// 설정 화면 — 그룹 섹션, 애니메이션 토글, 아이콘, About, 위험 구역, 동기화
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FONT_SIZES } from '../../utils/font-size'
import { APP_NAME, APP_VERSION } from '../../config/constants'
import { useSettings } from './hooks/useSettings'

/** 애니메이션 토글 스위치 */
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-[50px] h-[28px] rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: value ? 'var(--color-accent)' : 'var(--color-border)' }}
      role="switch"
      aria-checked={value}
    >
      <span
        className="absolute inset-0.5 rounded-full transition-opacity duration-300"
        style={{
          background: value ? 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' : 'none',
        }}
      />
      <span
        className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          left: value ? '25px' : '3px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        }}
      />
    </button>
  )
}

/** 설정 항목 카드 */
function SettingRow({
  icon, title, desc, right, onClick, danger,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  right?: React.ReactNode
  onClick?: () => void
  danger?: boolean
}) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all ${onClick ? 'active:scale-[0.98]' : ''}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${danger ? 'var(--color-error-light, #EF5350)' : 'var(--color-border)'}`,
      }}
    >
      <span
        className="flex items-center justify-center w-9 h-9 rounded-xl text-base flex-shrink-0"
        style={{
          backgroundColor: danger ? 'rgba(198,40,40,0.08)' : 'var(--color-surface-elevated)',
        }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${danger ? 'text-red-500' : ''}`}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
      </div>
      {right}
    </Tag>
  )
}

export default function Settings() {
  const nav = useNavigate()
  const { settings, sync, actions } = useSettings()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
     <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 sticky top-0 z-10" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
        <button onClick={() => nav(-1)} className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-surface)] active:scale-90 transition-transform">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">설정</h1>
      </div>

      <div className="px-4 py-5 space-y-6 pb-safe animate-fadeIn">
        {/* 학습 설정 */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider px-1 mb-2 opacity-60">학습 및 화면</h2>
          <div className="space-y-3">
            <SettingRow
              icon={<span>✍️</span>}
              title="쓰기 모드"
              desc="손글씨 쓰기 단계 포함"
              right={<Toggle value={settings.writing} onChange={actions.toggleWriting} />}
            />
            <SettingRow
              icon={<span>🌓</span>}
              title="다크 모드"
              desc="어두운 배경 테마 적용"
              right={<Toggle value={settings.theme === 'dark'} onChange={actions.toggleTheme} />}
            />
          </div>
        </section>

        {/* 글씨 크기 */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider px-1 mb-2 opacity-60">글씨 크기</h2>
          <div className="p-4 rounded-2xl space-y-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="text-center py-2 rounded-xl" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>Dhammaṃ care sucaritaṃ</p>
              <p className="text-sm mt-1 opacity-60">법을 잘 실천하라</p>
            </div>
            <div className="flex gap-2">
              {FONT_SIZES.map(s => (
                <button key={s.key} onClick={() => actions.changeFontSize(s.key)}
                  className={`flex-1 py-2.5 rounded-xl text-center font-semibold transition-all active:scale-95`}
                  style={{
                    fontSize: `${s.px - 4}px`,
                    backgroundColor: settings.fontSize === s.key ? 'var(--color-primary)' : 'var(--color-surface-elevated)',
                    color: settings.fontSize === s.key ? 'white' : 'var(--color-text)',
                    border: settings.fontSize === s.key ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 클라우드 동기화 */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider px-1 mb-2 opacity-60">클라우드 동기화</h2>
          {!sync.available ? (
            <div className="p-4 rounded-2xl text-center text-xs opacity-60" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              Firebase 설정이 필요합니다.
            </div>
          ) : !sync.loggedIn ? (
            <SettingRow icon={<span>☁️</span>} title="Google 로그인" desc="기기간 진도 동기화" onClick={actions.handleSyncLogin}
              right={sync.loading ? <span className="animate-spin text-sm">⏳</span> : <span className="opacity-30">›</span>} />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-accent)' }}>
                {sync.user?.photoURL ? <img src={sync.user.photoURL} alt="" className="w-9 h-9 rounded-full" /> : <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">👤</span>}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{sync.user?.displayName || sync.user?.email}</p>
                  <p className="text-xs truncate opacity-60">{sync.user?.email}</p>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">연결됨</span>
              </div>
              <div className="flex gap-2">
                <button onClick={actions.handlePush} disabled={sync.loading} className="flex-1 py-3 rounded-xl text-sm font-bold bg-[var(--color-surface)] border border-[var(--color-border)] active:scale-95 transition-transform">
                  {sync.loading ? '⏳' : '⬆️'} 업로드
                </button>
                <button onClick={actions.handlePull} disabled={sync.loading} className="flex-1 py-3 rounded-xl text-sm font-bold bg-[var(--color-surface)] border border-[var(--color-border)] active:scale-95 transition-transform">
                  {sync.loading ? '⏳' : '⬇️'} 다운로드
                </button>
              </div>
              <SettingRow icon={<span>🚪</span>} title="로그아웃" desc="동기화 연결 해제" onClick={actions.handleSyncLogout} />
            </div>
          )}
          {sync.message && <div className="mt-2 p-3 rounded-xl text-center text-xs font-medium animate-fadeIn" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)', color: 'var(--color-accent)' }}>{sync.message}</div>}
        </section>

        {/* 데이터 및 정보 */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider px-1 mb-2 opacity-60">기타</h2>
          <div className="space-y-3">
            <SettingRow icon={<span>🗑️</span>} title="진도 초기화" desc="전체 데이터 삭제" onClick={actions.resetAllData} danger right={<span className="opacity-30">›</span>} />
            <div className="p-5 rounded-2xl space-y-3 bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-11 h-11 rounded-2xl text-xl bg-[var(--color-primary-gradient)] text-white">📿</span>
                <div>
                  <p className="font-bold text-sm">{APP_NAME}</p>
                  <p className="text-xs opacity-60">{APP_VERSION}</p>
                </div>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div className="space-y-1 text-xs">
                <p className="flex justify-between"><span className="opacity-60">교재</span><span>Pāli Primer (2008)</span></p>
                <p className="flex justify-between"><span className="opacity-60">개발</span><span>SuttaLog2 Project</span></p>
              </div>
            </div>
          </div>
        </section>
      </div>
     </div>
    </div>
  )
}
