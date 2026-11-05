// 동사 활용표 — 문법표 화면용 (과 안의 설명과 같은 형태·같은 순서)
// 기준: pacati(요리하다, -a어간). 형태는 Duroiselle·Buddhadatta·Warder의 표준 활용과 같고,
// 프라이머 각 과의 설명(12·13·14·15·16·17과)과 똑같이 맞췄다.
// 인칭 순서는 빠알리 문법 전통대로 3인칭 → 2인칭 → 1인칭.

export interface VerbTable {
  id: string
  title: string
  word: string
  meaning: string
  /** 이 표를 배우는 과 */
  lessonId: string
  note?: string
  rows: { person: string; sg: string; pl: string }[]
}

const P3 = '3인칭 (그·그들)', P2 = '2인칭 (너·너희)', P1 = '1인칭 (나·우리)'

export const VERB_TABLES: VerbTable[] = [
  {
    id: 'v-pres', title: '현재 (~한다)', word: 'pacati', meaning: '요리하다', lessonId: 'lesson-11',
    note: '어간 pac- + 어미 -ati/-anti, -asi/-atha, -āmi/-āma',
    rows: [
      { person: P3, sg: 'pacati', pl: 'pacanti' },
      { person: P2, sg: 'pacasi', pl: 'pacatha' },
      { person: P1, sg: 'pacāmi', pl: 'pacāma' },
    ],
  },
  {
    id: 'v-pres-e', title: '현재 -e어간', word: 'deseti', meaning: '설하다, 가르치다', lessonId: 'lesson-12',
    note: '-e어간: -eti/-enti, -esi/-etha, -emi/-ema',
    rows: [
      { person: P3, sg: 'deseti', pl: 'desenti' },
      { person: P2, sg: 'desesi', pl: 'desetha' },
      { person: P1, sg: 'desemi', pl: 'desema' },
    ],
  },
  {
    id: 'v-pres-na', title: '현재 -nā어간', word: 'suṇāti', meaning: '듣다', lessonId: 'lesson-12',
    note: '-nā어간: -āti/-anti, -āsi/-ātha, -āmi/-āma',
    rows: [
      { person: P3, sg: 'suṇāti', pl: 'suṇanti' },
      { person: P2, sg: 'suṇāsi', pl: 'suṇātha' },
      { person: P1, sg: 'suṇāmi', pl: 'suṇāma' },
    ],
  },
  {
    id: 'v-atthi', title: '있다 · ~이다', word: 'atthi', meaning: '있다, ~이다', lessonId: 'lesson-11',
    note: '3인칭 복수 santi가 불규칙',
    rows: [
      { person: P3, sg: 'atthi', pl: 'santi' },
      { person: P2, sg: 'asi', pl: 'attha' },
      { person: P1, sg: 'asmi / amhi', pl: 'asma / amha' },
    ],
  },
  {
    id: 'v-fut', title: '미래 (~할 것이다)', word: 'pacissati', meaning: '요리할 것이다', lessonId: 'lesson-13',
    note: '어근 + -issa- + 현재 어미 (-e어간은 -essa-: coressati)',
    rows: [
      { person: P3, sg: 'pacissati', pl: 'pacissanti' },
      { person: P2, sg: 'pacissasi', pl: 'pacissatha' },
      { person: P1, sg: 'pacissāmi', pl: 'pacissāma' },
    ],
  },
  {
    id: 'v-opt', title: '원망 (~하기를, 만약 ~한다면)', word: 'paceyya', meaning: '요리하기를 / 요리한다면', lessonId: 'lesson-14',
    note: '어근 + -eyya- + 인칭 어미 (sace·yadi와 함께 조건)',
    rows: [
      { person: P3, sg: 'paceyya', pl: 'paceyyuṃ' },
      { person: P2, sg: 'paceyyāsi', pl: 'paceyyātha' },
      { person: P1, sg: 'paceyyāmi', pl: 'paceyyāma' },
    ],
  },
  {
    id: 'v-imp', title: '명령 (~하라)', word: 'pacatu', meaning: '요리하게 하라', lessonId: 'lesson-15',
    note: 'mā + 명령형 = ~하지 마라 (금지)',
    rows: [
      { person: P3, sg: 'pacatu', pl: 'pacantu' },
      { person: P2, sg: 'paca / pacāhi', pl: 'pacatha' },
      { person: P1, sg: 'pacāmi', pl: 'pacāma' },
    ],
  },
  {
    id: 'v-aor', title: '과거 · 아오리스트 (~했다)', word: 'apaci', meaning: '요리했다', lessonId: 'lesson-16',
    note: '앞의 a-(어두첨자)는 붙여도 빼도 같은 뜻',
    rows: [
      { person: P3, sg: 'apaci / paci', pl: 'apaciṃsu / paciṃsu' },
      { person: P2, sg: 'apaco / paco', pl: 'apacittha / pacittha' },
      { person: P1, sg: 'apaciṃ / paciṃ', pl: 'apacimhā / pacimhā' },
    ],
  },
  {
    id: 'v-aor-e', title: '과거 -e어간', word: 'coresi', meaning: '훔쳤다', lessonId: 'lesson-16',
    note: '-esi형과 -ayi형 두 가지',
    rows: [
      { person: P3, sg: 'coresi / corayi', pl: 'coresuṃ / corayiṃsu' },
      { person: P2, sg: 'coresi / corayo', pl: 'coresittha / corayittha' },
      { person: P1, sg: 'coresiṃ / corayiṃ', pl: 'coresimhā / corayimhā' },
    ],
  },
]
