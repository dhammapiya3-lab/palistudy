// 메모 목록 탭 — 검색, 필터, 상세보기, 이동, 상태 관리
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteMemo, getDeviceId, updateMemoStepId, updateMemoStatus } from '../utils/memo'
import type { Memo, MemoStatus } from '../utils/memo'
import {
  getPageLabel, findStepById, searchLessonContent,
  type PageSearchResult,
} from '../utils/page-search'
import { getCurrentPageId, formatDate, extractSearchTerms } from './memo-utils'

interface Props {
  memos: Memo[]
  loading: boolean
  loadMemos: () => void
  startEdit: (memo: Memo) => void
  onClose: () => void
}

// 상태별 스타일
const STATUS_STYLE: Record<string, { badge: string; active: string; btn: string }> = {
  '승인':   { badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
               active: 'bg-green-600 text-white border-green-600',
               btn:    'border-green-400 text-green-600 dark:text-green-400' },
  '보류':   { badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
               active: 'bg-yellow-500 text-white border-yellow-500',
               btn:    'border-yellow-400 text-yellow-600 dark:text-yellow-400' },
  '미승인': { badge: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
               active: 'bg-red-500 text-white border-red-500',
               btn:    'border-red-400 text-red-500 dark:text-red-400' },
}

export default function MemoListTab({ memos, loading, loadMemos, startEdit, onClose }: Props) {
  const [filterMode, setFilterMode] = useState<'lesson' | 'all' | MemoStatus>('미승인')
  const [searchText, setSearchText] = useState('')
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null)
  const [matchResults, setMatchResults] = useState<{ memoId: string; results: PageSearchResult[] } | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // 현재 레슨 ID
  const currentLessonId = location.pathname.startsWith('/learn/')
    ? location.pathname.replace('/learn/', '').split('?')[0] : null

  // stepId → 이동 경로 계산
  const resolveNavPath = (memo: Memo): string | null => {
    if (memo.stepId) {
      const mainRoutes: Record<string, string> = {
        'page-home': '/', 'page-courses': '/courses',
        'page-review': '/review', 'page-settings': '/settings',
      }
      if (mainRoutes[memo.stepId]) return mainRoutes[memo.stepId]
      const found = findStepById(memo.stepId)
      if (found) return `/learn/${found.lessonId}?step=${found.stepIndex}`
    }
    // 텍스트 기반 탐색
    if (memo.text) {
      const terms = extractSearchTerms(memo.text)
      const all: PageSearchResult[] = []
      for (const t of terms) all.push(...searchLessonContent(t))
      const best = new Map<string, PageSearchResult>()
      for (const r of all) {
        const ex = best.get(r.stepId)
        if (!ex || r.score > ex.score) best.set(r.stepId, r)
      }
      const top = [...best.values()].sort((a, b) => b.score - a.score)[0]
      if (top) return `/learn/${top.lessonId}?step=${top.stepIndex}`
    }
    const m = memo.page.match(/학습:\s*([^#]+)(?:#(\d+))?/)
    if (m) return m[2] ? `/learn/${m[1].trim()}?step=${m[2]}` : `/learn/${m[1].trim()}`
    return null
  }

  // 이동 실행
  const handleNavigate = (memo: Memo) => {
    const path = resolveNavPath(memo)
    if (path) { navigate(path); onClose() }
  }

  // 콘텐츠 매칭 검색
  const handleFindMatch = (memo: Memo) => {
    const terms = extractSearchTerms(memo.text)
    const all: PageSearchResult[] = []
    for (const t of terms) all.push(...searchLessonContent(t))
    const best = new Map<string, PageSearchResult>()
    for (const r of all) {
      const ex = best.get(r.stepId)
      if (!ex || r.score > ex.score) best.set(r.stepId, r)
    }
    setMatchResults({ memoId: memo.id!, results: [...best.values()].sort((a, b) => b.score - a.score).slice(0, 5) })
  }

  // 매칭 선택 → stepId 업데이트
  const handleSelectMatch = async (memoId: string, stepId: string) => {
    if (await updateMemoStepId(memoId, stepId)) { setMatchResults(null); loadMemos() }
  }

  // 상태 변경
  const handleStatusChange = async (id: string, status: MemoStatus | null) => {
    await updateMemoStatus(id, status)
    loadMemos()
    // 상세 뷰에서 변경 시 로컬 상태도 즉시 반영
    if (selectedMemo?.id === id) {
      setSelectedMemo(prev => prev ? { ...prev, status: status ?? undefined } : prev)
    }
  }

  // 필터링
  let filtered = memos
  if (filterMode === 'lesson') {
    filtered = filtered.filter(m => {
      if (m.stepId && currentLessonId)
        return m.stepId.startsWith(currentLessonId + '-') || m.stepId === currentLessonId
      if (currentLessonId) return m.page.includes(currentLessonId)
      return false
    })
  } else if (filterMode === '승인' || filterMode === '보류' || filterMode === '미승인') {
    filtered = filtered.filter(m => m.status === filterMode)
  }
  if (searchText.trim()) {
    const q = searchText.trim().toLowerCase()
    filtered = filtered.filter(m => m.text.toLowerCase().includes(q))
  }

  // ── 상세 뷰 ──────────────────────────────────────────────
  if (selectedMemo) {
    const memo = selectedMemo
    const isMyMemo = memo.deviceId === getDeviceId()
    const navPath = resolveNavPath(memo)
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 상단 바 */}
        <div className="flex items-center justify-between">
          <button onClick={() => setSelectedMemo(null)}
            className="flex items-center gap-1 text-sm text-neutral-500
              hover:text-neutral-800 dark:hover:text-neutral-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M15 19l-7-7 7-7"/>
            </svg>목록
          </button>
          <div className="flex gap-2">
            {isMyMemo && (
              <>
                <button onClick={() => { startEdit(memo); setSelectedMemo(null) }}
                  className="text-xs text-amber-600 font-medium px-3 py-1.5 rounded-lg
                    border border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20">수정</button>
                <button onClick={async () => {
                  if (!confirm('이 메모를 삭제할까요?')) return
                  await deleteMemo(memo.id!); loadMemos(); setSelectedMemo(null)
                }}
                  className="text-xs text-red-500 font-medium px-3 py-1.5 rounded-lg
                    border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">삭제</button>
              </>
            )}
            {navPath && (
              <button onClick={() => handleNavigate(memo)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg
                  bg-amber-600 text-white hover:bg-amber-700 flex items-center gap-1">
                이동
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 메타 정보 */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-3 space-y-1.5">
          <p className="text-xs text-neutral-500">
            {formatDate(memo.createdAt)}{memo.updatedAt ? ' · 수정됨' : ''}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            위치: {memo.stepId ? getPageLabel(memo.stepId) : memo.page}
          </p>
          {memo.stepId && (
            <p className="text-[10px] text-neutral-400 font-mono">{memo.stepId}</p>
          )}
        </div>

        {/* 이미지 — 상단 배치 (본문보다 먼저 노출) */}
        {memo.images?.filter(i => i.dataUrl).length > 0 && (
          <div className="space-y-2">
            {[...memo.images]
              .filter(i => i.dataUrl)
              .sort((a, b) => a.order - b.order)
              .map(img => (
                <img key={img.order} src={img.dataUrl} alt={`이미지 ${img.order}`}
                  className="w-full rounded-xl border border-neutral-200
                    dark:border-neutral-700 object-contain"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }} />
              ))}
          </div>
        )}

        {/* 본문 */}
        {memo.text && (
          <p className="text-sm whitespace-pre-wrap text-neutral-900
            dark:text-neutral-100 leading-relaxed">{memo.text}</p>
        )}

        {/* 상태 선택 — 모든 메모에 표시 */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-neutral-500">검토 상태</p>
          <div className="flex gap-2">
            {(['승인', '보류', '미승인'] as MemoStatus[]).map(s => (
              <button key={s}
                onClick={() => handleStatusChange(memo.id!, memo.status === s ? null : s)}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl border-2 transition-colors ${
                  memo.status === s
                    ? STATUS_STYLE[s].active
                    : `border-neutral-200 dark:border-neutral-700 text-neutral-500
                       dark:text-neutral-400 hover:border-current ${STATUS_STYLE[s].btn}`
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {/* 매칭 섹션 (stepId 없을 때) */}
        {isMyMemo && !memo.stepId && (
          <div>
            <button onClick={() => handleFindMatch(memo)}
              className="text-xs text-blue-500 font-medium px-3 py-1.5 rounded-lg
                border border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              위치 자동 매칭
            </button>
            {matchResults && matchResults.memoId === memo.id && (
              <div className="mt-2 rounded-lg border border-blue-200 dark:border-blue-800
                bg-blue-50 dark:bg-blue-900/20 p-2 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">매칭 후보</span>
                  <button onClick={() => setMatchResults(null)} className="text-xs text-neutral-400">닫기</button>
                </div>
                {matchResults.results.length === 0
                  ? <p className="text-xs text-neutral-500">결과 없음</p>
                  : matchResults.results.map(r => (
                    <button key={r.stepId}
                      onClick={() => handleSelectMatch(memo.id!, r.stepId)}
                      className="w-full text-left rounded-md p-1.5 text-xs
                        hover:bg-blue-100 dark:hover:bg-blue-800/30">
                      <span className="font-mono text-blue-600 dark:text-blue-400">{r.stepId}</span>
                      <span className="text-neutral-500 ml-1">({r.lessonTitle} · #{r.stepIndex})</span>
                    </button>
                  ))
                }
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── 목록 뷰 ──────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* 검색창 */}
      <div className="mb-3">
        <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)}
          placeholder="메모 내용 검색..."
          className="w-full px-3 py-2 rounded-lg border border-neutral-300
            dark:border-neutral-600 bg-transparent text-sm
            focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>

      {/* 필터 탭 */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {([
          ['lesson', '이 레슨', 'bg-amber-600'],
          ['all',    '전체',   'bg-amber-600'],
          ['승인',   '승인',   'bg-green-600'],
          ['보류',   '보류',   'bg-yellow-500'],
          ['미승인', '미승인', 'bg-red-500'],
        ] as [string, string, string][]).map(([mode, label, activeColor]) => (
          <button key={mode} onClick={() => setFilterMode(mode as typeof filterMode)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filterMode === mode ? `${activeColor} text-white`
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
            }`}>{label}</button>
        ))}
        <span className="text-xs text-neutral-400 ml-auto">{getCurrentPageId(location.pathname)}</span>
      </div>

      {/* 목록 */}
      {loading ? (
        <p className="text-center text-neutral-400 py-8">불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-neutral-400 py-8">
          {searchText.trim() ? `"${searchText}" 검색 결과가 없습니다.`
            : filterMode === 'lesson' ? `이 레슨(${currentLessonId || '알 수 없음'})에 메모가 없습니다.`
            : filterMode === 'all' ? '아직 메모가 없습니다.'
            : `"${filterMode}" 상태 메모가 없습니다.`}
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map(memo => (
            <button key={memo.id} onClick={() => setSelectedMemo(memo)}
              className="w-full text-left rounded-xl border border-neutral-200
                dark:border-neutral-700 p-3 hover:bg-neutral-50
                dark:hover:bg-neutral-700/50 transition-colors space-y-1.5">
              {/* 상태 배지 + 위치 */}
              <div className="flex items-center gap-2">
                {memo.status && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                    ${STATUS_STYLE[memo.status]?.badge}`}>{memo.status}</span>
                )}
                <span className="text-xs text-neutral-500 truncate">
                  {memo.stepId ? getPageLabel(memo.stepId) : memo.page}
                </span>
                <span className="text-[10px] text-neutral-400 ml-auto flex-shrink-0">
                  {formatDate(memo.createdAt)}
                </span>
              </div>
              {/* 텍스트 미리보기 */}
              {memo.text && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300
                  line-clamp-2">{memo.text}</p>
              )}
              {/* 이미지 썸네일 미리보기 */}
              {memo.images?.filter(i => i.dataUrl).length > 0 && (
                <div className="flex gap-1.5 mt-0.5">
                  {[...memo.images]
                    .filter(i => i.dataUrl)
                    .sort((a, b) => a.order - b.order)
                    .slice(0, 4)
                    .map(img => (
                      <img key={img.order} src={img.dataUrl} alt=""
                        className="w-12 h-12 object-cover rounded-lg border
                          border-neutral-200 dark:border-neutral-600 flex-shrink-0" />
                    ))}
                  {memo.images.filter(i => i.dataUrl).length > 4 && (
                    <div className="w-12 h-12 rounded-lg border border-neutral-200
                      dark:border-neutral-600 flex items-center justify-center
                      bg-neutral-100 dark:bg-neutral-700 text-xs text-neutral-500 flex-shrink-0">
                      +{memo.images.filter(i => i.dataUrl).length - 4}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
