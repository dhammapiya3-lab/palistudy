// 기초 과정(발음·단어·문법·독해) — 실제 데이터가 있는 일반 레슨만 모은 목록과 완료 기록.
// 학습맵의 '기초 다지기'와 과 상세(/skill/:id)에서 사용.
import type { NavigateFunction } from 'react-router-dom'
import { localDateStr } from '../../utils/local-date'

export type BasicKind = 'alphabet' | 'vocab' | 'grammar' | 'reading'

export type BasicLesson = { kind: BasicKind; id: string; title: string; desc: string }
export type BasicSkill = { id: string; title: string; icon: string; desc: string; source: string; lessons: BasicLesson[] }

export const BASIC_SKILLS: BasicSkill[] = [
  {
    id: '1', title: '알파벳·발음', icon: '🔤', desc: '빠알리어 문자와 발음부호', source: 'Dhammapada 1게',
    lessons: [
      { kind: 'alphabet', id: 'vowels', title: '모음 (a ā i ī u ū e o)', desc: 'Dhp 1게로 배우는 단모음·장모음' },
      { kind: 'alphabet', id: 'consonants1', title: '자음 기초 (k c t p 계열 · y r l v s h)', desc: 'Dhp 1게로 배우는 점 없는 자음 24자' },
      { kind: 'alphabet', id: 'special', title: '특수 발음부호 (ṃ ṅ ñ ṭ ṭh ḍ ḍh ṇ ḷ)', desc: '아래 점·위 점·물결표가 붙은 글자' },
    ],
  },
  {
    id: '2', title: '기초 단어', icon: '💬', desc: '경전에 자주 나오는 낱말', source: 'Khp · Dhp',
    lessons: [
      { kind: 'vocab', id: 'refuge', title: '삼보 (Buddha, Dhamma, Saṅgha)', desc: 'Khp 1 삼귀의문' },
      { kind: 'vocab', id: 'mind', title: '마음 (citta, mano, vedanā)', desc: 'Dhp 1~2게 마음 관련 단어' },
      { kind: 'vocab', id: 'numbers', title: '수사 (eka~dasa)', desc: '경전 속 숫자 표현' },
    ],
  },
  {
    id: '3', title: '문장 구조', icon: '📝', desc: '어순과 주격·목적격', source: 'Dhammapada',
    lessons: [
      { kind: 'grammar', id: 'sov', title: '주어-목적어-동사 (SOV)', desc: '예문으로 배우는 SOV 어순' },
      { kind: 'grammar', id: 'nom-acc', title: '주격과 목적격 (-o, -aṃ)', desc: '누가(주격) 무엇을(목적격)' },
    ],
  },
  {
    id: '4', title: '격변화', icon: '🔀', desc: '8격 체계', source: '빠알리 문법',
    lessons: [
      { kind: 'grammar', id: 'declension-a', title: '남성 -a 어간 8격', desc: 'buddha의 격변화표' },
    ],
  },
  {
    id: '5', title: '동사 활용', icon: '🏃', desc: '현재시제', source: '빠알리 문법',
    lessons: [
      { kind: 'grammar', id: 'present', title: '현재시제 활용', desc: 'gacchati, passati, karoti' },
    ],
  },
  {
    id: '6', title: '경전 독해', icon: '📖', desc: '정형구 읽기', source: 'SN',
    lessons: [
      { kind: 'reading', id: 'evam', title: '"Evaṃ me sutaṃ" 공식', desc: '경전 서두 정형구 분석' },
      { kind: 'reading', id: 'sn56-11', title: 'SN 56.11 초전법륜경 첫 부분', desc: '사성제 첫 설법 독해' },
    ],
  },
]

const DONE_KEY = 'suttalog-basic-done' // JSON 배열: ['alphabet/vowels', ...]

function readDone(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(DONE_KEY) || '[]')
    return Array.isArray(v) ? v : []
  } catch { return [] }
}

export function isBasicDone(kind: BasicKind, id: string): boolean {
  return readDone().includes(`${kind}/${id}`)
}

export function basicRoute(l: Pick<BasicLesson, 'kind' | 'id'>): string {
  return `/learn/${l.kind}/${l.id}`
}

export function skillOfLesson(kind: BasicKind, id: string): BasicSkill | undefined {
  return BASIC_SKILLS.find(s => s.lessons.some(l => l.kind === kind && l.id === id))
}

export function countBasicDone(): { done: number; total: number } {
  const all = BASIC_SKILLS.flatMap(s => s.lessons)
  const done = readDone()
  return { done: all.filter(l => done.includes(`${l.kind}/${l.id}`)).length, total: all.length }
}

/** 일반 레슨을 끝까지 마쳤을 때: 완료 기록 + 학습일 기록 후 과 상세로 돌아감 */
export function finishBasicLesson(nav: NavigateFunction, kind: BasicKind, id: string, title: string): void {
  const done = readDone()
  const key = `${kind}/${id}`
  if (!done.includes(key)) { done.push(key); localStorage.setItem(DONE_KEY, JSON.stringify(done)) }
  markStudyToday()
  const skill = skillOfLesson(kind, id)
  nav(skill ? `/skill/${skill.id}` : '/map', { replace: true, state: { justDone: title } })
}

/** 오늘(현지 날짜)을 학습일로 기록 */
export function markStudyToday(): void {
  const today = localDateStr()
  let dates: string[] = []
  try { dates = JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]') } catch { /* 무시 */ }
  if (!dates.includes(today)) { dates.push(today); localStorage.setItem('suttalog-study-dates', JSON.stringify(dates)) }
}

/** 레슨 닫기(✕): 앱 안에서 들어왔으면 뒤로, 주소로 바로 열었으면 과 상세(없으면 학습맵)로 */
export function closeBasicLesson(nav: NavigateFunction, kind: BasicKind, id: string | undefined): void {
  const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
  if (idx > 0) { nav(-1); return }
  const skill = id ? skillOfLesson(kind, id) : undefined
  nav(skill ? `/skill/${skill.id}` : '/map', { replace: true })
}
