// 긴 경전의 소단원(레슨 데이터의 intro 단계) 위치 — 학습맵의 소단원 점과 업적(경전 이정표)에 사용.
// 홈·학습맵에서 레슨 데이터(약 2MB)를 받지 않으려고 시작 위치(원본 단계 번호)만 상수로 둠.
// (레슨 데이터의 intro 위치가 바뀌면 함께 고칠 것)
import { getLessonProgress } from './lesson-progress'

type RawSection = [start: number, title: string]

const SECTIONS: Record<string, RawSection[]> = {
  'tisarana-guna': [[0, '붓다 9덕'], [15, '담마 6덕'], [27, '상가 9덕']],
  'sn45-8': [[0, '서문'], [53, '바른 견해'], [64, '바른 사유'], [70, '바른 말'], [78, '바른 행위'], [83, '바른 생계'], [110, '바른 정진'], [119, '바른 마음챙김'], [139, '바른 삼매']],
  'mangala': [[0, '서문'], [43, '게송'], [109, '낱말 보강']],
  'sn56-11': [[0, '서문'], [45, '두 극단'], [59, '중도'], [127, '집성제'], [138, '멸성제'], [150, '3전 12행'], [200, '깨달음 선언'], [217, '콘단냐의 법안'], [231, '천신들의 환호']],
  'sn22-59': [[0, '서문'], [31, '색 무아'], [53, '나머지 4온 무아'], [75, '무상·고·무아 문답'], [103, '11측면 결론'], [143, '해탈 4단계'], [170, '낱말 보강']],
  'ratana': [[0, '천신 초청'], [45, '붓다 보배'], [70, '담마 보배'], [94, '상가 보배'], [205, '결어']],
  'mn10': [
    [0, '서문'], [65, '① 호흡'], [137, '② 자세'], [158, '③ 분명한 앎'], [183, '④ 32부정관'], [258, '⑤ 사대'], [280, '⑥ 묘지관'],
    [361, '수념처'], [379, '심념처'], [406, '법념처 ① 5장애'], [448, '법념처 ② 5취온'], [467, '법념처 ③ 6내외처'],
    [500, '법념처 ④ 7각지'], [538, '법념처 ⑤ 4성제'], [550, '고성제'], [709, '집성제'], [803, '멸성제'], [828, '도성제'], [941, '수행의 과보'],
  ],
}

export type SectionState = { title: string; start: number; end: number; done: boolean; current: boolean }

/** 과의 소단원 목록과 각 소단원을 마쳤는지 (소단원이 없으면 빈 배열) */
export function getSections(id: string): SectionState[] {
  const raw = SECTIONS[id]
  if (!raw) return []
  const p = getLessonProgress(id)
  return raw.map(([start, title], i) => {
    const end = i + 1 < raw.length ? raw[i + 1][0] - 1 : p.total - 1
    const done = p.done || p.step > end
    const current = !done && p.step >= start
    return { title, start, end, done, current }
  })
}

/** 경전 이정표 업적 — 긴 경전 중간 지점을 넘으면 얻음 */
export const MILESTONES: { icon: string; title: string; desc: string; lesson: string; reach: number }[] = [
  { icon: '☸️', title: '사성제 편', desc: '초전법륜경 사성제까지', lesson: 'sn56-11', reach: 150 },
  { icon: '🧍', title: '신념처 완료', desc: '대념처경 몸 관찰까지', lesson: 'mn10', reach: 361 },
  { icon: '💭', title: '수념처·심념처', desc: '대념처경 느낌·마음 관찰까지', lesson: 'mn10', reach: 406 },
  { icon: '🧘', title: '법념처 완료', desc: '대념처경 법 관찰까지', lesson: 'mn10', reach: 941 },
]

export function milestoneReached(m: { lesson: string; reach: number }): boolean {
  const p = getLessonProgress(m.lesson)
  return p.done || p.step >= m.reach
}
