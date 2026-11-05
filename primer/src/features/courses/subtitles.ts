// 과 부제 — 처음 배우는 사람을 위해 한국어 뜻을 앞에, 어미 표기는 뒤에 (화면 표시용)
// 과 데이터(lesson-sources.ts)의 원래 부제는 그대로 두고, 없는 과는 원래 부제를 씀
const KO_FIRST: Record<string, string> = {
  'lesson-00': '글자와 소리 익히기 · 모음 8 · 자음 33',
  'lesson-alphabet-2': '41자를 하나씩 · 행복경 예시',
  'lesson-01': '~은/는, ~한다 · -o/-ā · -ti/-nti',
  'lesson-02': '~을/를 (목적) · -ṃ/-e',
  'lesson-03': '~으로, ~와 함께 (도구) · -ena/-ehi',
  'lesson-04': '~로부터 (출발점) · -ā/-mhā/-smā',
  'lesson-05': '~에게, ~을 위해 · -āya/-ssa',
  'lesson-06': '~의 (소유) · -ssa/-ānaṃ',
  'lesson-07': '~에, ~에서 (장소) · -e/-mhi/-smiṃ',
  'lesson-08': '~여! (부르는 말) · 총정리 · 중성명사',
  'lesson-09': '~하고서 · -(i)tvā/-ya',
  'lesson-10': '~하려고, ~하면서 · -tuṃ · -nta/-māna',
  'lesson-11': '나·너·그 — 인칭에 따라 바뀌는 동사',
  'lesson-12': '-e·-nā로 끝나는 동사 · deseti · kiṇāti',
  'lesson-13': '~할 것이다 (미래) · -(i)ssa',
  'lesson-14': '~하기를, 만약 ~한다면 · -eyya',
  'lesson-15': '~하라, ~하지 마라 · -atu · mā',
  'lesson-16': '~했다 (과거) · Aorist',
  'lesson-17': '-ā로 끝나는 여성명사 · vanitā',
  'lesson-18': '~된, ~한 (과거분사) · -(i)ta/-na',
  'lesson-19': '-i·-ī로 끝나는 여성명사 · bhūmi/nadī',
  'lesson-20': '~하는 (여성형) · -ntī/-mānā',
  'lesson-21': '~해야 할 · -tabba/-anīya',
  'lesson-22': '~하게 하다 (사역) · -āpe/-āpaya',
  'lesson-23': '-u 여성 · -i/-ī 남성 명사',
  'lesson-24': '-u·-ū로 끝나는 남성명사 · bhikkhu',
  'lesson-25': '스승·아버지·어머니 · satthā/pitā/mātā',
  'lesson-26': '-i·-u로 끝나는 중성명사 · aṭṭhi/cakkhu',
  'lesson-27': '~을 지닌 · Bhagavā · -vantu/-mantu',
  'lesson-28': '나·너·우리·너희 · ahaṃ/tvaṃ',
  'lesson-29': '누구·그·~하는 이 · yo/so/ko',
  'lesson-sandhi': '낱말이 붙을 때 소리 변화 · Sandhi',
}

export function friendlySubtitle(id: string, original: string): string {
  return KO_FIRST[id] || original
}
