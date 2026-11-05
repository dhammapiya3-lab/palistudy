// 프라이머 문법 ↔ '경전으로 배우기' 연결 — 이 문법이 실제로 나오는 경전 구절
// 경전 앱 주소: /palistudy/suttalog/learn/scripture/<id> (같은 사이트 안)
// 구절은 경전 앱 데이터에 실제로 있는 것만 골랐다 (낱말 하나만 보여 주고, 문법 설명은 짧게)

export const SUTTA_APP = '/palistudy/suttalog/'
export const suttaLessonUrl = (id: string) => `/palistudy/suttalog/learn/scripture/${id}`

export interface SuttaLink {
  /** 경전 앱 과 ID */
  sutta: string
  /** 경전 이름 (경전 앱과 같은 이름) */
  title: string
  /** 그 문법이 보이는 구절 (경전 앱 원문 그대로) */
  pali: string
  /** 무엇을 찾아보면 되는지 — 쉬운 말로 */
  note: string
}

const T: Record<string, string> = {
  'namo': '나모땃사',
  'trisarana': '삼귀의',
  'pancasila': '오계',
  'tisarana-guna': '삼보공덕',
  'mangala': '축복경',
  'sn56-11': '초전법륜경',
  'metta': '자애경',
  'ratana': '보배경',
  'mn10': '대념처경',
}

const L = (sutta: string, pali: string, note: string): SuttaLink => ({ sutta, title: T[sutta] || sutta, pali, note })

/** 프라이머 과 ID → 그 문법이 나오는 경전 구절 (1~2개) */
export const SUTTA_LINKS: Record<string, SuttaLink[]> = {
  'lesson-00': [L('namo', 'Namo tassa Bhagavato Arahato Sammāsambuddhassa.', '방금 배운 글자·발음으로 예경문을 한 낱말씩 읽어 보세요')],
  'lesson-alphabet-2': [L('namo', 'Namo tassa Bhagavato Arahato Sammāsambuddhassa.', '긴 소리(ā)·겹자음(mm, ss)을 소리 내어 읽어 보세요')],
  'lesson-01': [L('tisarana-guna', 'Itipi so Bhagavā, Arahaṃ, Sammāsambuddho …', 'Sammāsambuddho, Sugato — -o로 끝나는 주격(~은/는)')],
  'lesson-02': [L('trisarana', 'Buddhaṃ saraṇaṃ gacchāmi.', 'Buddhaṃ, saraṇaṃ — -ṃ으로 끝나는 목적격(~을/를)')],
  'lesson-03': [L('tisarana-guna', '… paccattaṃ veditabbo viññūhī\'ti.', 'viññūhi — -hi로 끝나는 도구격 복수(~에 의해)')],
  'lesson-04': [L('pancasila', 'Pāṇātipātā veramaṇī sikkhāpadaṃ samādiyāmi.', 'pāṇātipātā — -ā로 끝나는 탈격(~로부터, ~을 삼가)')],
  'lesson-05': [L('namo', 'Namo tassa Bhagavato …', 'namo(경배)와 함께 쓰는 여격 — ~께')],
  'lesson-06': [L('tisarana-guna', 'Suppaṭipanno Bhagavato sāvakasaṅgho …', 'Bhagavato sāvakasaṅgho — 세존의 제자 승가 (소유격 ~의)')],
  'lesson-07': [L('sn56-11', 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.', 'isipatane migadāye — -e로 끝나는 처소격(~에서)')],
  'lesson-08': [L('sn56-11', 'Dveme, bhikkhave, antā …', 'bhikkhave — 부르는 말 호격(비구들이여)')],
  'lesson-09': [L('mangala', '… upasaṅkamitvā Bhagavantaṃ abhivādetvā ekamantaṃ aṭṭhāsi.', 'upasaṅkamitvā, abhivādetvā — -tvā 절대분사(~하고서)')],
  'lesson-10': [L('metta', 'Tiṭṭhaṃ caraṃ nisinno va, sayāno …', 'tiṭṭhaṃ, caraṃ — 현재분사(서 있으면서, 걸으면서)')],
  'lesson-11': [L('trisarana', 'Buddhaṃ saraṇaṃ gacchāmi.', 'gacchāmi — 1인칭 단수 현재(나는 갑니다)')],
  'lesson-14': [L('metta', 'Na paro paraṃ nikubbetha …', 'nikubbetha — 원망형(~해서는 안 되리)')],
  'lesson-15': [L('metta', 'Sukhinova khemino hontu, sabbasattā bhavantu sukhitattā.', 'hontu, bhavantu — 3인칭 복수 명령형(~하기를)')],
  'lesson-16': [L('mangala', '… ekamantaṃ aṭṭhāsi. … gāthāya ajjhabhāsi —', 'aṭṭhāsi, ajjhabhāsi — 아오리스트 과거(섰다, 말했다)')],
  'lesson-18': [L('mangala', 'Evaṃ me sutaṃ — …', 'sutaṃ — 과거분사(들은 것)')],
  'lesson-19': [L('sn56-11', 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati …', 'bārāṇasiyaṃ — -ī 여성명사의 처소격(바라나시에)')],
  'lesson-21': [L('metta', 'Karaṇīyamatthakusalena …', 'karaṇīyaṃ — 미래수동분사(의무분사): 행해져야 할')],
  'lesson-22': [L('mn10', '… parimukhaṃ satiṃ upaṭṭhapetvā.', 'upaṭṭhapetvā — 사역(-āpe): 확립시키고서')],
  'lesson-24': [L('sn56-11', 'Dveme, bhikkhave, antā …', 'bhikkhave — -u 남성명사 bhikkhu의 호격 복수')],
  'lesson-25': [L('tisarana-guna', '… Satthā devamanussānaṃ …', 'satthā — -ar 명사(스승)의 주격')],
  'lesson-27': [L('tisarana-guna', 'Itipi so Bhagavā …', 'Bhagavā — -vant 명사(세존)의 주격')],
  'lesson-28': [L('mangala', 'Evaṃ me sutaṃ — …', 'me — 1인칭 대명사 단축형(도구격/소유격: 나에 의해 / 나의)')],
  'lesson-29': [L('tisarana-guna', 'Itipi so Bhagavā …', 'so — 지시대명사(그)')],
  'lesson-sandhi': [L('sn56-11', 'Dveme, bhikkhave, antā …', 'dveme = dve + ime — 연성(두 낱말이 붙음)')],
  'lesson-absolute': [L('sn56-11', 'Pavattite ca pana bhagavatā dhammacakke …', 'pavattite … dhammacakke — 절대 처격(법의 바퀴가 굴려졌을 때)')],
}

export function suttaLinksFor(lessonId: string): SuttaLink[] {
  return SUTTA_LINKS[lessonId] || []
}
