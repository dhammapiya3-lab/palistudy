// 격변화 도표 데이터 — PDF 기반 (210803_명사_전체_도표화)
// 각 도표: id, 제목, 예시단어, 8격 단수/복수

export interface DeclensionTable {
  id: string
  title: string
  word: string
  meaning: string
  gender: string
  rows: { case: string; sg: string; pl: string }[]
}

export const DECLENSION_TABLES: DeclensionTable[] = [
  {
    id: 'a-m', title: '§1 -a 남성', word: 'deva', meaning: '신', gender: 'm.',
    rows: [
      { case: '주격(N.)', sg: 'devo', pl: 'devā' },
      { case: '호격(V.)', sg: 'deva', pl: 'devā' },
      { case: '대격(Ac.)', sg: 'devaṃ', pl: 'deve' },
      { case: '구격(Ins.)', sg: 'devena', pl: 'devehi' },
      { case: '탈격(Abl.)', sg: 'devā / devasmā', pl: 'devehi' },
      { case: '여격(D.)', sg: 'devassa / devāya', pl: 'devānaṃ' },
      { case: '속격(G.)', sg: 'devassa', pl: 'devānaṃ' },
      { case: '처격(L.)', sg: 'deve / devasmiṃ', pl: 'devesu' },
    ],
  },
  {
    id: 'a-n', title: '§2 -a 중성', word: 'rūpa', meaning: '색(형태)', gender: 'n.',
    rows: [
      { case: '주격(N.)', sg: 'rūpaṃ', pl: 'rūpāni / rūpā' },
      { case: '호격(V.)', sg: 'rūpa', pl: 'rūpāni / rūpā' },
      { case: '대격(Ac.)', sg: 'rūpaṃ', pl: 'rūpāni / rūpe' },
      { case: '구격(Ins.)', sg: 'rūpena', pl: 'rūpehi' },
      { case: '탈격(Abl.)', sg: 'rūpā / rūpasmā', pl: 'rūpehi' },
      { case: '여격(D.)', sg: 'rūpassa', pl: 'rūpānaṃ' },
      { case: '속격(G.)', sg: 'rūpassa', pl: 'rūpānaṃ' },
      { case: '처격(L.)', sg: 'rūpe / rūpasmiṃ', pl: 'rūpesu' },
    ],
  },
  {
    id: 'aa-f', title: '§3 -ā 여성', word: 'kaññā', meaning: '소녀', gender: 'f.',
    rows: [
      { case: '주격(N.)', sg: 'kaññā', pl: 'kaññā / kaññāyo' },
      { case: '호격(V.)', sg: 'kaññe', pl: 'kaññā / kaññāyo' },
      { case: '대격(Ac.)', sg: 'kaññaṃ', pl: 'kaññā / kaññāyo' },
      { case: '구격(Ins.)', sg: 'kaññāya', pl: 'kaññāhi' },
      { case: '탈격(Abl.)', sg: 'kaññāya', pl: 'kaññāhi' },
      { case: '여/속격(D./G.)', sg: 'kaññāya', pl: 'kaññānaṃ' },
      { case: '처격(L.)', sg: 'kaññāya / kaññāyaṃ', pl: 'kaññāsu' },
    ],
  },
  {
    id: 'i-m', title: '§4 -i 남성', word: 'aggi', meaning: '불(火)', gender: 'm.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'aggi', pl: 'aggayo / aggī' },
      { case: '대격(Ac.)', sg: 'aggiṃ', pl: 'aggayo / aggī' },
      { case: '구격(Ins.)', sg: 'agginā', pl: 'aggīhi' },
      { case: '탈격(Abl.)', sg: 'agginā / aggismā', pl: 'aggīhi' },
      { case: '여/속격(D./G.)', sg: 'aggino / aggissa', pl: 'aggīnaṃ' },
      { case: '처격(L.)', sg: 'aggismiṃ / aggimhi', pl: 'aggīsu' },
    ],
  },
  {
    id: 'i-n', title: '§5 -i 중성', word: 'akkhi', meaning: '눈(眼)', gender: 'n.',
    rows: [
      { case: '주/호/대(N./V./Ac.)', sg: 'akkhi / akkhiṃ', pl: 'akkhī / akkhīni' },
      { case: '구격(Ins.)', sg: 'akkhinā', pl: 'akkhīhi' },
      { case: '탈격(Abl.)', sg: 'akkhinā / akkhismā', pl: 'akkhīhi' },
      { case: '여/속격(D./G.)', sg: 'akkhino / akkhissa', pl: 'akkhīnaṃ' },
      { case: '처격(L.)', sg: 'akkhismiṃ / akkhimhi', pl: 'akkhīsu' },
    ],
  },
  {
    id: 'i-f', title: '§6 -i 여성', word: 'jāti', meaning: '태어남(生)', gender: 'f.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'jāti', pl: 'jātiyo / jātī' },
      { case: '대격(Ac.)', sg: 'jātiṃ', pl: 'jātiyo / jātī' },
      { case: '구/탈격(Ins./Abl.)', sg: 'jātiyā', pl: 'jātīhi' },
      { case: '여/속격(D./G.)', sg: 'jātiyā', pl: 'jātīnaṃ' },
      { case: '처격(L.)', sg: 'jātiyaṃ', pl: 'jātīsu' },
    ],
  },
  {
    id: 'ii-m', title: '§7 -ī 남성', word: 'senānī', meaning: '사령관', gender: 'm.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'senānī', pl: 'senānī / senānino' },
      { case: '대격(Ac.)', sg: 'senāniṃ', pl: 'senānī / senānino' },
      { case: '구격(Ins.)', sg: 'senāninā', pl: 'senānīhi' },
      { case: '탈격(Abl.)', sg: 'senāninā / senānismā', pl: 'senānīhi' },
      { case: '여/속격(D./G.)', sg: 'senānissa / senānino', pl: 'senānīnaṃ' },
      { case: '처격(L.)', sg: 'senānismiṃ / senānimhi', pl: 'senānīsu' },
    ],
  },
  {
    id: 'ii-f', title: '§8 -ī 여성', word: 'nadī', meaning: '강', gender: 'f.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'nadī', pl: 'nadiyo / nadī' },
      { case: '대격(Ac.)', sg: 'nadiṃ / nadiyaṃ', pl: 'nadiyo / nadī' },
      { case: '구/탈격(Ins./Abl.)', sg: 'nadiyā', pl: 'nadīhi' },
      { case: '여/속격(D./G.)', sg: 'nadiyā', pl: 'nadīnaṃ' },
      { case: '처격(L.)', sg: 'nadiyaṃ', pl: 'nadīsu' },
    ],
  },
  {
    id: 'u-m', title: '§9 -u 남성', word: 'bhikkhu', meaning: '비구', gender: 'm.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'bhikkhu', pl: 'bhikkhū / bhikkhavo' },
      { case: '대격(Ac.)', sg: 'bhikkhuṃ', pl: 'bhikkhū / bhikkhavo' },
      { case: '구격(Ins.)', sg: 'bhikkhunā', pl: 'bhikkhūhi' },
      { case: '탈격(Abl.)', sg: 'bhikkhunā / bhikkhusmā', pl: 'bhikkhūhi' },
      { case: '여/속격(D./G.)', sg: 'bhikkhuno / bhikkhussa', pl: 'bhikkhūnaṃ' },
      { case: '처격(L.)', sg: 'bhikkhusmiṃ / bhikkhumhi', pl: 'bhikkhūsu' },
    ],
  },
  {
    id: 'u-n', title: '§10 -u 중성', word: 'dāru', meaning: '나무(木材)', gender: 'n.',
    rows: [
      { case: '주/호/대(N./V./Ac.)', sg: 'dāru / dāruṃ', pl: 'dārūni / dārū' },
      { case: '구격(Ins.)', sg: 'dārunā', pl: 'dārūhi' },
      { case: '탈격(Abl.)', sg: 'dārunā / dārusmā', pl: 'dārūhi' },
      { case: '여/속격(D./G.)', sg: 'dāruno / dārussa', pl: 'dārūnaṃ' },
      { case: '처격(L.)', sg: 'dārusmiṃ / dārumhi', pl: 'dārūsu' },
    ],
  },
  {
    id: 'u-f', title: '§11 -u 여성', word: 'dhenu', meaning: '소(牛)', gender: 'f.',
    rows: [
      { case: '주/호격(N./V.)', sg: 'dhenu', pl: 'dhenū / dhenuyo' },
      { case: '대격(Ac.)', sg: 'dhenuṃ', pl: 'dhenū / dhenuyo' },
      { case: '구격(Ins.)', sg: 'dhenuyā', pl: 'dhenūhi' },
      { case: '탈격(Abl.)', sg: 'dhenuyā', pl: 'dhenūhi' },
      { case: '여/속격(D./G.)', sg: 'dhenuyā', pl: 'dhenūnaṃ' },
      { case: '처격(L.)', sg: 'dhenuyā / dhenuyaṃ', pl: 'dhenūsu' },
    ],
  },
  {
    id: 'ar-m', title: '§15 -ar 남성', word: 'pitar', meaning: '아버지(父)', gender: 'm.',
    rows: [
      { case: '주격(N.)', sg: 'pitā', pl: 'pitaro' },
      { case: '호격(V.)', sg: 'pita / pitā', pl: 'pitaro' },
      { case: '대격(Ac.)', sg: 'pitaraṃ / pituṃ', pl: 'pitaro / pitū' },
      { case: '구격(Ins.)', sg: 'pitarā / pitunā', pl: 'pitarehi / pitūhi' },
      { case: '탈격(Abl.)', sg: 'pitarā / pitu', pl: 'pitarehi / pitūhi' },
      { case: '여/속격(D./G.)', sg: 'pitu / pituno', pl: 'pitarānaṃ / pitūnaṃ' },
      { case: '처격(L.)', sg: 'pitari', pl: 'pitaresu / pitūsu' },
    ],
  },
  {
    id: 'ar-f', title: '§16 -ar 여성', word: 'mātar', meaning: '어머니(母)', gender: 'f.',
    rows: [
      { case: '주격(N.)', sg: 'mātā', pl: 'mātaro' },
      { case: '호격(V.)', sg: 'māta / mātā', pl: 'mātaro' },
      { case: '대격(Ac.)', sg: 'mātaraṃ', pl: 'mātaro / mātare' },
      { case: '구격(Ins.)', sg: 'mātarā / mātuyā', pl: 'mātarehi / mātūhi' },
      { case: '탈격(Abl.)', sg: 'mātarā / mātuyā', pl: 'mātarehi / mātūhi' },
      { case: '여/속격(D./G.)', sg: 'mātu / mātuyā', pl: 'mātarānaṃ / mātūnaṃ' },
      { case: '처격(L.)', sg: 'mātari / mātuyā', pl: 'mātaresu / mātūsu' },
    ],
  },
  {
    id: 'an-m', title: '§17 -an 남성', word: 'rājan', meaning: '왕', gender: 'm.',
    rows: [
      { case: '주격(N.)', sg: 'rājā', pl: 'rājāno / rājā' },
      { case: '호격(V.)', sg: 'rāja / rājā', pl: 'rājāno / rājā' },
      { case: '대격(Ac.)', sg: 'rājānaṃ / rājaṃ', pl: 'rājano / rājāno' },
      { case: '구격(Ins.)', sg: 'raññā / rājena', pl: 'rājūhi / rajehi' },
      { case: '탈격(Abl.)', sg: 'raññā / rājasmā', pl: 'rājūhi / rajehi' },
      { case: '여/속격(D./G.)', sg: 'rañño / rājino', pl: 'raññaṃ / rājūnaṃ' },
      { case: '처격(L.)', sg: 'raññi / rājini', pl: 'rājūsu / rājesu' },
    ],
  },
  {
    id: 'vant', title: '§21 -vant/-mant', word: 'sīlavant', meaning: '계를 지닌', gender: 'adj.',
    rows: [
      { case: '주격(N.)', sg: 'sīlavā', pl: 'sīlavanto / sīlavantā' },
      { case: '호격(V.)', sg: 'sīlavā / sīlava', pl: 'sīlavanto / sīlavantā' },
      { case: '대격(Ac.)', sg: 'sīlavantaṃ', pl: 'sīlavanto / sīlavante' },
      { case: '구격(Ins.)', sg: 'sīlavatā / sīlavantena', pl: 'sīlavantehi' },
      { case: '탈격(Abl.)', sg: 'sīlavatā / sīlavantasmā', pl: 'sīlavantehi' },
      { case: '여/속격(D./G.)', sg: 'sīlavato / sīlavantassa', pl: 'sīlavantānaṃ' },
      { case: '처격(L.)', sg: 'sīlavati / sīlavantasmiṃ', pl: 'sīlavantesu' },
    ],
  },
  {
    id: 'pron-1', title: '§26 1인칭 대명사', word: 'ahaṃ', meaning: '나', gender: '—',
    rows: [
      { case: '주격(N.)', sg: 'ahaṃ', pl: 'mayaṃ / amhe' },
      { case: '대격(Ac.)', sg: 'maṃ / mamaṃ', pl: 'asme / amhe' },
      { case: '구격(Ins.)', sg: 'mayā / me', pl: 'amhehi' },
      { case: '탈격(Abl.)', sg: 'mayā', pl: 'amhehi' },
      { case: '여/속격(D./G.)', sg: 'mama / mayhaṃ / me', pl: 'amhākaṃ / no' },
      { case: '처격(L.)', sg: 'mayi', pl: 'amhesu' },
    ],
  },
  {
    id: 'pron-2', title: '§27 2인칭 대명사', word: 'tvaṃ', meaning: '너', gender: '—',
    rows: [
      { case: '주격(N.)', sg: 'tvaṃ / tuvaṃ', pl: 'tumhe' },
      { case: '대격(Ac.)', sg: 'tvaṃ / taṃ', pl: 'tumhe' },
      { case: '구격(Ins.)', sg: 'tvayā / tayā / te', pl: 'tumhehi' },
      { case: '탈격(Abl.)', sg: 'tvayā / tayā', pl: 'tumhehi' },
      { case: '여/속격(D./G.)', sg: 'tuyhaṃ / tava / te', pl: 'tumhākaṃ / vo' },
      { case: '처격(L.)', sg: 'tvayi / tayi', pl: 'tumhesu' },
    ],
  },
  {
    id: 'pron-3m', title: '§28 3인칭 남성', word: 'so/ta', meaning: '그', gender: 'm.',
    rows: [
      { case: '주격(N.)', sg: 'so / sa', pl: 'te' },
      { case: '대격(Ac.)', sg: 'taṃ', pl: 'te' },
      { case: '구격(Ins.)', sg: 'tena', pl: 'tehi' },
      { case: '탈격(Abl.)', sg: 'tasmā / tamhā', pl: 'tehi' },
      { case: '여/속격(D./G.)', sg: 'tassa', pl: 'tesaṃ / tesānaṃ' },
      { case: '처격(L.)', sg: 'tasmiṃ / tamhi', pl: 'tesu' },
    ],
  },
  {
    id: 'pron-3f', title: '§28 3인칭 여성', word: 'sā/tā', meaning: '그녀', gender: 'f.',
    rows: [
      { case: '주격(N.)', sg: 'sā', pl: 'tā / tāyo' },
      { case: '대격(Ac.)', sg: 'taṃ', pl: 'tā / tāyo' },
      { case: '구격(Ins.)', sg: 'tāya', pl: 'tāhi' },
      { case: '탈격(Abl.)', sg: 'tāya', pl: 'tāhi' },
      { case: '여/속격(D./G.)', sg: 'tassā / tāya', pl: 'tāsaṃ / tāsānaṃ' },
      { case: '처격(L.)', sg: 'tassaṃ / tāyaṃ', pl: 'tāsu' },
    ],
  },
]

/** lesson ID → 관련 도표 ID 매핑 */
export const LESSON_TABLE_MAP: Record<string, string[]> = {
  'lesson-01': ['a-m'],
  'lesson-02': ['a-m'],
  'lesson-03': ['a-m'],
  'lesson-04': ['a-m'],
  'lesson-05': ['a-m'],
  'lesson-06': ['a-m'],
  'lesson-07': ['a-m'],
  'lesson-08': ['a-m', 'a-n'],
  'lesson-17': ['aa-f'],
  'lesson-18': ['aa-f'],
  'lesson-19': ['i-f', 'ii-f'],
  'lesson-20': ['aa-f', 'vant'],
  'lesson-23': ['u-f', 'i-m', 'ii-m'],
  'lesson-24': ['u-m', 'u-n'],
  'lesson-25': ['ar-m', 'ar-f'],
  'lesson-26': ['i-n', 'u-n'],
  'lesson-27': ['vant', 'an-m'],
  'lesson-28': ['pron-1', 'pron-2'],
  'lesson-29': ['pron-3m', 'pron-3f'],
}

/** lesson ID로 관련 도표 가져오기 */
export function getTablesForLesson(lessonId: string): DeclensionTable[] {
  const ids = LESSON_TABLE_MAP[lessonId] || []
  return ids.map(id => DECLENSION_TABLES.find(t => t.id === id)).filter(Boolean) as DeclensionTable[]
}
