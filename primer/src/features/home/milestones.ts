// 이정표 — 과목 묶음(기초, 1~8과 …)을 다 마쳤을 때 축하 + '이제 읽을 수 있는 구절'
// 묶음 범위는 과목 화면(CATEGORIES)과 같다.
import { CATEGORIES } from '../courses/hooks/useCourses'
import { LESSONS } from '../grammar/lessons'
import { isLessonCompleted } from '../../utils/lesson-progress'
import { suttaLessonUrl } from '../reference/sutta-links'

export interface Milestone {
  key: string
  badge: string
  short: string
  title: string
  /** 이제 읽을 수 있는 구절 */
  pali: string
  ko: string
  /** 배운 문법으로 무엇을 알아보는지 */
  explain: string
  sutta: { title: string; url: string }
}

export const MILESTONES: Record<string, Milestone> = {
  basic: {
    key: 'basic', short: '글자·발음', badge: '🔤', title: '글자와 발음을 익혔어요',
    pali: 'Namo tassa Bhagavato Arahato Sammāsambuddhassa.',
    ko: '저 세존, 아라한, 완전히 바르게 깨달은 분께 경배드립니다.',
    explain: '이제 예경문을 로마자 그대로 소리 내어 읽을 수 있어요. 긴 소리(ā)와 겹자음(mm, ss)도 알아봅니다.',
    sutta: { title: '나모땃사', url: suttaLessonUrl('namo') },
  },
  masculine: {
    key: 'masculine', short: '남성명사 8격', badge: '📿', title: '남성명사 8격을 모두 배웠어요',
    pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.',
    ko: '한때 세존께서 바라나시의 이시빠따나 녹야원에 머무셨다.',
    explain: 'isipatane migadāye가 -e로 끝나는 처소격(~에서), samayaṃ이 목적격, viharati가 3인칭 단수 동사라는 것을 알아볼 수 있어요.',
    sutta: { title: '초전법륜경', url: suttaLessonUrl('sn56-11') },
  },
  verb: {
    key: 'verb', short: '동사 활용', badge: '🙏', title: '동사 활용을 모두 배웠어요',
    pali: 'Buddhaṃ saraṇaṃ gacchāmi.',
    ko: '저는 붓다께 귀의합니다.',
    explain: 'Buddhaṃ·saraṇaṃ은 목적격, gacchāmi는 1인칭 단수 현재 — 이제 이 세 낱말의 문법을 모두 압니다.',
    sutta: { title: '삼귀의', url: suttaLessonUrl('trisarana') },
  },
  feminine: {
    key: 'feminine', short: '여성명사·분사', badge: '💛', title: '여성명사와 분사를 배웠어요',
    pali: 'Karaṇīyamatthakusalena, yantasantaṃ padaṃ abhisamecca.',
    ko: '선(이익)에 능숙한 이가 고요한 경지를 깨닫고서 해야 할 일은 이것이니.',
    explain: 'karaṇīyaṃ(해야 할)은 미래수동분사(의무분사), atthakusalena(선에 능숙한 이에 의해)는 도구격이에요.',
    sutta: { title: '자애경', url: suttaLessonUrl('metta') },
  },
  advanced: {
    key: 'advanced', short: '고급 문법', badge: '☸️', title: '고급 문법까지 마쳤어요',
    pali: 'Itipi so Bhagavā, Arahaṃ, Sammāsambuddho …',
    ko: '그러므로 그 세존께서는 아라한이시고, 완전히 바르게 깨달은 분이시고 …',
    explain: 'so는 지시대명사(그), Bhagavā는 -vant 명사의 주격 — 삼보공덕의 첫 구절을 문법으로 풀어 읽을 수 있어요.',
    sutta: { title: '삼보공덕', url: suttaLessonUrl('tisarana-guna') },
  },
  sandhi: {
    key: 'sandhi', short: '연성법', badge: '🔗', title: '연성법까지 마쳤어요',
    pali: 'Dveme, bhikkhave, antā pabbajitena na sevitabbā.',
    ko: '비구들이여, 출가자가 따르지 말아야 할 두 극단이 있다.',
    explain: 'dveme = dve + ime — 낱말이 붙어 소리가 바뀌는 연성을 풀어 읽을 수 있어요.',
    sutta: { title: '초전법륜경', url: suttaLessonUrl('sn56-11') },
  },
}

const SEEN_KEY = 'primer-milestones-seen'

export function getSeenMilestones(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')
    return Array.isArray(v) ? v : []
  } catch { return [] }
}

export function markMilestoneSeen(key: string) {
  const seen = getSeenMilestones()
  if (seen.includes(key)) return
  seen.push(key)
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)) } catch { /* 무시 */ }
}

interface ProgressState {
  progress: Record<string, number>
  best: Record<string, number>
  completed: Record<string, boolean>
}

/** 다 마친 묶음 (과목 화면 순서) */
export function doneMilestones(st: ProgressState): Milestone[] {
  return CATEGORIES.filter(cat => {
    const ls = LESSONS.slice(cat.range[0], cat.range[1] + 1)
    return ls.length > 0 && ls.every(l => isLessonCompleted(st, l.id, l.stepCount))
  }).map(cat => MILESTONES[cat.key]).filter(Boolean)
}
