// 전체 과 목록(순서·제목) + 과 내용 불러오기 — 교재 32과 + 연성법 + 경전 읽기 문법 15단원
// 과 내용(lesson-*.ts)은 과를 열 때만 따로 받음 (처음 여는 화면을 가볍게)
// ※ 과를 더하거나 순서·내용을 바꾸면 `npm run gen:meta` (빌드할 때는 자동) → lessons-meta.generated.ts 다시 만들어짐
import type { StepWithoutId } from './types'

export interface LessonSource {
  id: string
  title: string
  subtitle: string
  icon: string
  load: () => Promise<StepWithoutId[]>
}

export const LESSON_SOURCES: LessonSource[] = [
  // 기초
  { id: 'lesson-00', title: '자모와 발음', subtitle: '글자와 소리 · 듣고 고르기 · 예경문 읽기', icon: '🔤', load: () => import('./lesson-00-alphabet').then(m => m.LESSON_00) },
  { id: 'lesson-alphabet-2', title: '자모와 발음 2', subtitle: '41자 개별 학습 · 축복경 예시', icon: '🔡', load: () => import('./lesson-alphabet-2').then(m => m.LESSON_ALPHABET_2) },
  // 남성 -a 8격
  { id: 'lesson-01', title: '1과: 주격 + 동사', subtitle: '-o/-ā · -ti/-nti', icon: '📿', load: () => import('./lesson-01').then(m => m.LESSON_01) },
  { id: 'lesson-02', title: '2과: 목적격', subtitle: '-ṃ/-e · ~을/를', icon: '🎯', load: () => import('./lesson-02').then(m => m.LESSON_02) },
  { id: 'lesson-03', title: '3과: 도구격', subtitle: '-ena/-ehi · ~으로/함께', icon: '🤝', load: () => import('./lesson-03').then(m => m.LESSON_03) },
  { id: 'lesson-04', title: '4과: 탈격', subtitle: '-ā/-mhā/-smā · ~로부터', icon: '↩️', load: () => import('./lesson-04').then(m => m.LESSON_04) },
  { id: 'lesson-05', title: '5과: 여격', subtitle: '-āya/-ssa · ~에게/위해', icon: '🎁', load: () => import('./lesson-05').then(m => m.LESSON_05) },
  { id: 'lesson-06', title: '6과: 소유격', subtitle: '-ssa/-ānaṃ · ~의', icon: '👤', load: () => import('./lesson-06').then(m => m.LESSON_06) },
  { id: 'lesson-07', title: '7과: 처소격', subtitle: '-e/-mhi/-smiṃ · ~에', icon: '📍', load: () => import('./lesson-07').then(m => m.LESSON_07) },
  { id: 'lesson-08', title: '8과: 호격 + 중성명사', subtitle: '총정리 · 중성 도입', icon: '📢', load: () => import('./lesson-08').then(m => m.LESSON_08) },
  // 동사 활용
  { id: 'lesson-09', title: '9과: 절대분사', subtitle: '-(i)tvā/-ya · ~하고서', icon: '⏭️', load: () => import('./lesson-09').then(m => m.LESSON_09) },
  { id: 'lesson-10', title: '10-11과: 부정사+현재분사', subtitle: '-tuṃ · -nta/-māna', icon: '🔄', load: () => import('./lesson-10').then(m => m.LESSON_10) },
  { id: 'lesson-11', title: '12과: 동사 인칭변화', subtitle: '1·2·3인칭 현재형', icon: '👥', load: () => import('./lesson-11').then(m => m.LESSON_11) },
  { id: 'lesson-12', title: '13과: -e/-nā 어간', subtitle: 'deseti · kiṇāti · hoti', icon: '📚', load: () => import('./lesson-12').then(m => m.LESSON_12) },
  { id: 'lesson-13', title: '14과: 미래형', subtitle: '-(i)ssa · ~할 것이다', icon: '🔮', load: () => import('./lesson-13').then(m => m.LESSON_13) },
  { id: 'lesson-14', title: '15과: 원망형', subtitle: '-eyya · 만약 ~한다면', icon: '💭', load: () => import('./lesson-14').then(m => m.LESSON_14) },
  { id: 'lesson-15', title: '16과: 명령형', subtitle: '-atu · ~하라 / mā 금지', icon: '📣', load: () => import('./lesson-15').then(m => m.LESSON_15) },
  { id: 'lesson-16', title: '17과: 과거형', subtitle: 'Aorist · ~했다', icon: '⏪', load: () => import('./lesson-16').then(m => m.LESSON_16) },
  // 여성명사 + 분사
  { id: 'lesson-17', title: '18과: -ā 여성명사', subtitle: 'vanitā 격변화', icon: '👩', load: () => import('./lesson-17').then(m => m.LESSON_17) },
  { id: 'lesson-18', title: '19과: 과거분사', subtitle: '-(i)ta/-na', icon: '✅', load: () => import('./lesson-18').then(m => m.LESSON_18) },
  { id: 'lesson-19', title: '20과: -i/-ī 여성명사', subtitle: 'bhūmi/nadī', icon: '🌊', load: () => import('./lesson-19').then(m => m.LESSON_19) },
  { id: 'lesson-20', title: '21과: 현재분사 여성형', subtitle: '-ntī/-mānā', icon: '🔄', load: () => import('./lesson-20').then(m => m.LESSON_20) },
  { id: 'lesson-21', title: '22과: 미래수동분사(의무분사)', subtitle: '-tabba/-anīya', icon: '📋', load: () => import('./lesson-21').then(m => m.LESSON_21) },
  { id: 'lesson-22', title: '23과: 사역형', subtitle: '-āpe/-āpaya', icon: '👉', load: () => import('./lesson-22').then(m => m.LESSON_22) },
  { id: 'lesson-23', title: '24-26과: 기타 명사', subtitle: '-u여성 · -i/-ī남성', icon: '📖', load: () => import('./lesson-23').then(m => m.LESSON_23) },
  // 고급
  { id: 'lesson-24', title: '27과: -u/-ū 남성명사', subtitle: 'bhikkhu/vidū 격변화', icon: '🧘', load: () => import('./lesson-24').then(m => m.LESSON_24) },
  { id: 'lesson-25', title: '28과: -ar 명사(행위자·친족)', subtitle: 'satthā/pitā/mātā', icon: '👨‍👩‍👦', load: () => import('./lesson-25').then(m => m.LESSON_25) },
  { id: 'lesson-26', title: '29과: -i/-u 중성명사', subtitle: 'aṭṭhi/cakkhu', icon: '🦴', load: () => import('./lesson-26').then(m => m.LESSON_26) },
  { id: 'lesson-27', title: '30과: -vantu/-mantu', subtitle: 'Bhagavā · 소유형용사', icon: '🏔️', load: () => import('./lesson-27').then(m => m.LESSON_27) },
  { id: 'lesson-28', title: '31과: 인칭대명사', subtitle: 'ahaṃ/tvaṃ/mayaṃ/tumhe', icon: '🫵', load: () => import('./lesson-28').then(m => m.LESSON_28) },
  { id: 'lesson-29', title: '32과: 관계·지시·의문대명사', subtitle: 'yo/so/ko · yattha/tattha', icon: '❓', load: () => import('./lesson-29').then(m => m.LESSON_29) },
  // 연성법
  { id: 'lesson-sandhi', title: '연성법', subtitle: 'Sandhi ①~⑬ · 억제음 변화', icon: '🔗', load: () => import('./lesson-01-sandhi').then(m => m.LESSON_01_SANDHI) },
  // 경전 읽기 문법
  { id: 'lesson-absolute', title: '절대 처격 · 절대 소유격', subtitle: '처격·소유격 + 분사 · ~할 때 / ~할 때, ~하는데도', icon: '⏳', load: () => import('./lesson-absolute').then(m => m.LESSON_ABSOLUTE) },
  { id: 'lesson-compound', title: '복합어 (samāsa)', subtitle: '여러 낱말이 한 낱말로 · 6가지', icon: '🧩', load: () => import('./lesson-compound').then(m => m.LESSON_COMPOUND) },
  { id: 'lesson-iti', title: '인용 표시 iti (’ti)', subtitle: '"~라고" · 말과 생각의 끝 표시', icon: '💬', load: () => import('./lesson-iti').then(m => m.LESSON_ITI) },
  { id: 'lesson-passive', title: '수동태', subtitle: '-ya- · ~되다, ~라고 불린다', icon: '🔁', load: () => import('./lesson-passive').then(m => m.LESSON_PASSIVE) },
  { id: 'lesson-consonant-stem', title: '자음 어간 명사 (-an, -as)', subtitle: 'attā·rājā·brahmā · mano·ceto', icon: '🧱', load: () => import('./lesson-consonant-stem').then(m => m.LESSON_CONSONANT_STEM) },
  { id: 'lesson-conditional', title: '조건법 (-issa)', subtitle: '~했더라면 ~했을 텐데', icon: '🔀', load: () => import('./lesson-conditional').then(m => m.LESSON_CONDITIONAL) },
  { id: 'lesson-numerals', title: '수사', subtitle: 'eka·dve·tayo·cattāro · 서수', icon: '🔢', load: () => import('./lesson-numerals').then(m => m.LESSON_NUMERALS) },
  { id: 'lesson-prefix', title: '동사 접두사 (upasagga)', subtitle: 'ā·upa·pa·abhi·saṃ·vi·ni·pari·anu…', icon: '➕', load: () => import('./lesson-prefix').then(m => m.LESSON_PREFIX) },
  { id: 'lesson-comparison', title: '비교급·최상급', subtitle: '-tara/-tama · seyyo/seṭṭha', icon: '📈', load: () => import('./lesson-comparison').then(m => m.LESSON_COMPARISON) },
  { id: 'lesson-taddhita', title: '파생 접미사 (taddhita)', subtitle: '-ika · -tā/-tta · -ya', icon: '🌱', load: () => import('./lesson-taddhita').then(m => m.LESSON_TADDHITA) },
  { id: 'lesson-correlative', title: '상관 구문 (ya … ta …)', subtitle: 'yathā…tathā · yasmā…tasmā · yo…so', icon: '🔗', load: () => import('./lesson-correlative').then(m => m.LESSON_CORRELATIVE) },
  { id: 'lesson-case-uses', title: '격의 특수 용법', subtitle: '때의 목적격 · 목적의 여격 · 관하여의 처소격', icon: '🎯', load: () => import('./lesson-case-uses').then(m => m.LESSON_CASE_USES) },
  { id: 'lesson-irregular', title: '자주 나오는 불규칙 동사', subtitle: 'atthi·hoti · āha · karoti · deti · passati', icon: '🌀', load: () => import('./lesson-irregular').then(m => m.LESSON_IRREGULAR) },
  { id: 'lesson-particles', title: '강조·담화 불변화사', subtitle: 'kho·pana·hi·eva·api·nu·nāma…', icon: '✨', load: () => import('./lesson-particles').then(m => m.LESSON_PARTICLES) },
  { id: 'lesson-peyyala', title: '줄임 표시와 정형구', subtitle: 'pe · …pa… · 처음과 끝의 정형구', icon: '📜', load: () => import('./lesson-peyyala').then(m => m.LESSON_PEYYALA) },
]
