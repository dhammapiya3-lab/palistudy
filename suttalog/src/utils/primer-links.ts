// 문법 칩 → 빠알리 프라이머 과 연결표 + 한 줄 설명
// - 낱말 카드의 문법 표시(예: '남성명사, 여격/소유격 단수')에서 문법 용어를 찾아
//   쉬운 한 줄 설명, 격 번호를 함께 적은 이름('목적격(2격)'), 프라이머 과 주소를 돌려줍니다.
// - 프라이머 과 id·제목은 primer/src/features/grammar/lesson-sources.ts 기준입니다.
//   (프라이머 과 번호는 교재 번호를 따르므로 id 숫자와 'n과'가 다를 수 있음: lesson-11 = 12과)

const PRIMER_BASE = '/palistudy/primer/#/learn/'

type PrimerLesson = { id: string; title: string }
const P = {
  nom: { id: 'lesson-01', title: '1과: 주격' },
  acc: { id: 'lesson-02', title: '2과: 목적격' },
  ins: { id: 'lesson-03', title: '3과: 도구격' },
  abl: { id: 'lesson-04', title: '4과: 탈격' },
  dat: { id: 'lesson-05', title: '5과: 여격' },
  gen: { id: 'lesson-06', title: '6과: 소유격' },
  loc: { id: 'lesson-07', title: '7과: 처소격' },
  voc: { id: 'lesson-08', title: '8과: 호격' },
  abs: { id: 'lesson-09', title: '9과: 절대분사' },
  ppr: { id: 'lesson-10', title: '10-11과: 부정사·현재분사' },
  pres: { id: 'lesson-11', title: '12과: 동사 인칭변화(현재)' },
  fut: { id: 'lesson-13', title: '14과: 미래형' },
  opt: { id: 'lesson-14', title: '15과: 원망형' },
  imp: { id: 'lesson-15', title: '16과: 명령형' },
  aor: { id: 'lesson-16', title: '17과: 과거형(아오리스트)' },
  pp: { id: 'lesson-18', title: '19과: 과거분사' },
  fpp: { id: 'lesson-21', title: '22과: 미래수동분사(의무분사)' },
  caus: { id: 'lesson-22', title: '23과: 사역형' },
  sandhi: { id: 'lesson-sandhi', title: '연성법' },
} satisfies Record<string, PrimerLesson>

type Rule = {
  /** 문법 표시에서 찾을 말(앞의 것이 같은 자리면 더 긴 말이 이김) */
  terms: string[]
  /** 칩 쪽지에 보일 이름 — 두 앱 용어 병기 */
  name: string
  /** 처음 배우는 사람용 한 줄 설명 */
  desc: string
  lesson?: PrimerLesson
}

const RULES: Rule[] = [
  { terms: ['주격'], name: '주격(1격)', desc: '문장의 주어를 나타냅니다. "~이/가, ~은/는"', lesson: P.nom },
  { terms: ['목적격'], name: '목적격(2격)', desc: '동사의 목적어를 나타냅니다. "~을/를". 때·방향을 나타내기도 합니다.', lesson: P.acc },
  { terms: ['도구격'], name: '도구격(3격)', desc: '수단·도구·함께함을 나타냅니다. "~으로, ~에 의해, ~와 함께"', lesson: P.ins },
  { terms: ['여격'], name: '여격(4격)', desc: '받는 이·목적을 나타냅니다. "~에게, ~께, ~을 위해"', lesson: P.dat },
  { terms: ['탈격'], name: '탈격(5격)', desc: '떠나온 곳·까닭을 나타냅니다. "~로부터, ~ 때문에"', lesson: P.abl },
  { terms: ['소유격'], name: '소유격(6격)', desc: '소유·관계를 나타냅니다. "~의"', lesson: P.gen },
  { terms: ['처소격'], name: '처소격(7격)', desc: '장소·때를 나타냅니다. "~에, ~에서"', lesson: P.loc },
  { terms: ['호격'], name: '호격(8격)', desc: '부르는 말입니다. "~이여!"', lesson: P.voc },
  { terms: ['절대분사'], name: '절대분사', desc: '먼저 한 동작을 나타냅니다. "~하고서, ~한 뒤에" (-tvā, -ya)', lesson: P.abs },
  { terms: ['현재분사'], name: '현재분사', desc: '진행 중인 동작을 꾸밉니다. "~하고 있는, ~하면서" (-nta, -māna)', lesson: P.ppr },
  { terms: ['부정사'], name: '부정사', desc: '"~하기 위해, ~하는 것" (-tuṃ)', lesson: P.ppr },
  { terms: ['미래수동분사', '의무분사'], name: '미래수동분사(의무분사)', desc: '"~해야 할, ~되어야 할" (-tabba, -anīya)', lesson: P.fpp },
  { terms: ['과거분사'], name: '과거분사', desc: '이미 된 일을 나타냅니다. "~된, ~한" (-ta, -na)', lesson: P.pp },
  { terms: ['아오리스트', '과거(aorist)', '과거'], name: '과거형(아오리스트)', desc: '지난 일을 말합니다. "~했다"', lesson: P.aor },
  { terms: ['미래'], name: '미래형', desc: '앞으로의 일을 말합니다. "~할 것이다" (-issa-)', lesson: P.fut },
  { terms: ['원망형', '원망'], name: '원망형', desc: '바람·가정을 나타냅니다. "~하기를, ~한다면, ~해야 한다" (-eyya)', lesson: P.opt },
  { terms: ['명령형', '명령'], name: '명령형', desc: '명령·기원을 나타냅니다. "~하라, ~하기를" (-tu, -hi)', lesson: P.imp },
  { terms: ['사역'], name: '사역형', desc: '"~하게 하다, ~시키다" (-e-, -aya-, -āpe-)', lesson: P.caus },
  { terms: ['현재'], name: '현재형', desc: '지금의 일·늘 그러한 일을 말합니다. 주어의 인칭·수에 따라 어미가 바뀝니다. "~한다"', lesson: P.pres },
  { terms: ['연성'], name: '연성(산디)', desc: '낱말이 이어질 때 소리가 합쳐지거나 바뀌는 규칙입니다.', lesson: P.sandhi },
  { terms: ['복합어'], name: '복합어', desc: '여러 낱말이 하나로 붙은 말입니다. 보통 마지막 낱말만 격변화합니다.' },
]

export type GrammarTerm = {
  /** 쪽지에 보일 이름 (병기 포함) */
  name: string
  desc: string
  link: { label: string; url: string } | null
}

function linkOf(l: PrimerLesson | undefined): { label: string; url: string } | null {
  return l ? { label: l.title, url: PRIMER_BASE + l.id } : null
}

/**
 * 문법 표시에 나오는 용어를 나온 순서대로 돌려줍니다(같은 용어는 한 번).
 * 예: '대명사, 여격/소유격 남성 단수' → [여격(4격), 소유격(6격)]
 */
export function grammarTermsIn(grammar: string | undefined | null): GrammarTerm[] {
  if (!grammar) return []
  type Hit = { pos: number; len: number; rule: Rule }
  const hits: Hit[] = []
  for (const rule of RULES) {
    for (const t of rule.terms) {
      let from = 0
      for (;;) {
        const pos = grammar.indexOf(t, from)
        if (pos < 0) break
        hits.push({ pos, len: t.length, rule })
        from = pos + t.length
      }
    }
  }
  // 같은 자리에서 겹치면 긴 말(현재분사 > 현재, 미래수동분사 > 미래)이 이김
  hits.sort((a, b) => a.pos - b.pos || b.len - a.len)
  const out: GrammarTerm[] = []
  const used = new Set<Rule>()
  let coveredTo = -1
  for (const h of hits) {
    if (h.pos < coveredTo) continue
    coveredTo = h.pos + h.len
    if (used.has(h.rule)) continue
    used.add(h.rule)
    out.push({ name: h.rule.name, desc: h.rule.desc, link: linkOf(h.rule.lesson) })
  }
  return out
}

/** 문법 표시에서 처음 나오는(프라이머 과가 있는) 문법의 프라이머 과 주소 */
export function primerLinkFor(grammar: string): { label: string; url: string } | null {
  for (const t of grammarTermsIn(grammar)) if (t.link) return t.link
  return null
}
