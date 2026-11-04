// 4과: -a 남성명사 탈격 (교재 4과 완전 수록)
// 경전: 중도 — 양극단으로부터 떠나다 (탈격 개념)
import type { StepWithoutId } from './types'

const V_MAJJHIMA = 'Pānātipātā veramaṇī sikkhāpadaṃ samādiyāmi.\nAdinnādānā veramaṇī sikkhāpadaṃ samādiyāmi.\nKāmesumicchācārā veramaṇī sikkhāpadaṃ samādiyāmi.'
const V_MAJJHIMA_K = '살아있는 생명을 죽이는 것으로부터 떠나는 학습계를 받아 지닙니다.\n주지 않은 것을 가지는 것으로부터 떠나는 학습계를 받아 지닙니다.\n욕망에 있어 삿된 행위로부터 떠나는 학습계를 받아 지닙니다.'

export const LESSON_04: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '4과: 남성명사 탈격 (Ablative)', subtitle: 'Pañcamī vibhatti (Ablative)', description: '탈격은 분리·출발·원인을 나타냅니다.\n~로부터, ~에게서, ~때문에\n\n경전: "pānātipātā veramaṇī"\n(살생으로부터 멀어짐)', icon: '🔙' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_MAJJHIMA, pronKo: '빠-나-띠빠-따- 웨라마니- 식카-빠당 사마-디야-미\n아딘나-다-나- 웨라마니- 식카-빠당 사마-디야-미\n까-메수밋차-짜-라- 웨라마니- 식카-빠당 사마-디야-미', translation: V_MAJJHIMA_K, highlight: ['pānātipātā', 'adinnādānā', 'kāmesumicchācārā', 'veramaṇī'], note: 'pānātipātā = 살생(pāṇa+atipāta)으로부터(탈격)\nadinnādānā = 도둑질(adinna+ādāna)로부터(탈격)\nkāmesumicchācārā = 사음(kāma+micchācāra)로부터(탈격)\nveramaṇī = 멀어짐, 삼감\n※ 오계(Pañca Sīla) 중 처음 세 가지' },

  // === 탈격 문법 ===
  { type: 'teach-grammar', title: '탈격 (Ablative) — ~로부터/때문에/에게서', example: 'nara + mhā = naramhā (사람으로부터)\nnara + ehi = narehi (사람들로부터)', exampleKo: '단수: -ā / -mhā / -smā\n복수: -ehi / -ebhi', explanation: '탈격의 주요 의미:\n• 분리/출발: gāmamhā nikkhamati (마을로부터 떠나다)\n• 원인/이유: bhayā palāyati (두려움 때문에 도망치다)\n• 출처: naramhā yācati (사람에게서 구하다)\n\n-a 남성명사:\n• 단수: -ā (narā), -mhā (naramhā), -smā (narasmā)\n• 복수: -ehi/-ebhi (narehi)\n※ 도구격 복수와 탈격 복수 형태 동일!' },

  // === 명사 14개 (교재 전체) ===
  { type: 'teach', word: 'dhīvara', pronKo: '디-와라', meaning: '어부', icon: '🎣', grammar: '남성명사', baseForm: 'dhīvara', formNote: '탈격 단수: dhīvaramhā / dhīvarasmā\n탈격 복수: dhīvarehi' },
  { type: 'teach', word: 'maccha', pronKo: '맛차', meaning: '물고기', icon: '🐟', grammar: '남성명사', baseForm: 'maccha', formNote: '탈격 단수: macchamhā\n탈격 복수: macchehi' },
  { type: 'teach', word: 'piṭaka', pronKo: '삐따까', meaning: '바구니, 장(藏)', icon: '🧺', grammar: '남성명사', baseForm: 'piṭaka', formNote: '탈격 단수: piṭakamhā\n탈격 복수: piṭakehi', buddhism: '삼장(Tipiṭaka)의 piṭaka — 경장·율장·논장' },
  { type: 'teach', word: 'amacca', pronKo: '아맛짜', meaning: '신하, 장관', icon: '🏛️', grammar: '남성명사', baseForm: 'amacca', formNote: '탈격 단수: amaccamhā\n탈격 복수: amaccehi' },
  { type: 'teach', word: 'upāsaka', pronKo: '우빠-사까', meaning: '우바새 (재가남신도)', icon: '🙏', grammar: '남성명사', baseForm: 'upāsaka', formNote: '탈격 단수: upāsakamhā\n탈격 복수: upāsakehi', buddhism: '삼보에 귀의한 재가 남성 신도' },
  { type: 'teach', word: 'pāsāda', pronKo: '빠-사-다', meaning: '궁전, 누각', icon: '🏰', grammar: '남성명사', baseForm: 'pāsāda', formNote: '탈격 단수: pāsādamhā\n탈격 복수: pāsādehi' },
  { type: 'teach', word: 'dāraka', pronKo: '다-라까', meaning: '아이', icon: '👦', grammar: '남성명사', baseForm: 'dāraka', formNote: '탈격 단수: dārakamhā\n탈격 복수: dārakehi' },
  { type: 'teach', word: 'sāṭaka', pronKo: '사-따까', meaning: '옷', icon: '👕', grammar: '남성명사', baseForm: 'sāṭaka', formNote: '탈격 단수: sāṭakamhā\n탈격 복수: sāṭakehi' },
  { type: 'teach', word: 'rajaka', pronKo: '라자까', meaning: '세탁부', icon: '🧺', grammar: '남성명사', baseForm: 'rajaka', formNote: '탈격 단수: rajakamhā\n탈격 복수: rajakehi' },
  { type: 'teach', word: 'sappa', pronKo: '삽빠', meaning: '뱀', icon: '🐍', grammar: '남성명사', baseForm: 'sappa', formNote: '탈격 단수: sappamhā\n탈격 복수: sappehi' },
  { type: 'teach', word: 'pañha', pronKo: '빤하', meaning: '질문', icon: '❓', grammar: '남성명사', baseForm: 'pañha', formNote: '탈격 단수: pañhamhā\n탈격 복수: pañhehi' },
  { type: 'teach', word: 'suka', pronKo: '수까', meaning: '앵무새 (= suva)', icon: '🦜', grammar: '남성명사', baseForm: 'suka / suva', formNote: '탈격 단수: sukamhā\n탈격 복수: sukehi' },
  { type: 'teach', word: 'sopāna', pronKo: '소빠-나', meaning: '층계, 계단', icon: '🪜', grammar: '남성명사', baseForm: 'sopāna', formNote: '탈격 단수: sopānamhā\n탈격 복수: sopānehi' },
  { type: 'teach', word: 'sūkara', pronKo: '수-까라', meaning: '돼지 (= varāha)', icon: '🐖', grammar: '남성명사', baseForm: 'sūkara / varāha', formNote: '탈격 단수: sūkaramhā\n탈격 복수: sūkarehi' },

  // === 동사 10개 (교재 전체) ===
  { type: 'teach', word: 'patati', pronKo: '빠따띠', meaning: '떨어지다', icon: '⬇️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'patati', formNote: '복수: patanti\n예: rukkhasmā patati (나무에서 떨어지다)' },
  { type: 'teach', word: 'dhovati', pronKo: '도와띠', meaning: '씻다', icon: '🫧', grammar: '동사 · 현재 3인칭 단수', baseForm: 'dhovati', formNote: '복수: dhovanti\n예: sāṭake dhovati (옷을 씻다)' },
  { type: 'teach', word: 'icchati', pronKo: '잇차띠', meaning: '원하다', icon: '💭', grammar: '동사 · 현재 3인칭 단수', baseForm: 'icchati', formNote: '복수: icchanti' },
  { type: 'teach', word: 'ḍasati', pronKo: '다사띠', meaning: '물다', icon: '🦷', grammar: '동사 · 현재 3인칭 단수', baseForm: 'ḍasati', formNote: '복수: ḍasanti\n예: sappā ḍasanti (뱀들이 문다)' },
  { type: 'teach', word: 'pucchati', pronKo: '뿟차띠', meaning: '묻다, 질문하다', icon: '🗣️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pucchati', formNote: '복수: pucchanti\n예: pañhaṃ pucchati (질문을 묻다)' },
  { type: 'teach', word: 'pakkosati', pronKo: '빡꼬사띠', meaning: '부르다', icon: '📢', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pakkosati', formNote: '복수: pakkosanti' },
  { type: 'teach', word: 'khādati', pronKo: '카-다띠', meaning: '먹다, 씹다', icon: '🍽️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'khādati', formNote: '복수: khādanti' },
  { type: 'teach', word: 'hanati', pronKo: '하나띠', meaning: '죽이다', icon: '⚔️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'hanati', formNote: '복수: hananti' },
  { type: 'teach', word: 'otarati', pronKo: '오따라띠', meaning: '내려가다, 들어가다', icon: '🔽', grammar: '동사 · 현재 3인칭 단수', baseForm: 'otarati', formNote: '복수: otaranti' },
  { type: 'teach', word: 'nikkhamati', pronKo: '닉카마띠', meaning: '떠나다, 나오다', icon: '🚪', grammar: '동사 · 현재 3인칭 단수', baseForm: 'nikkhamati', formNote: '복수: nikkhamanti\n예: vihārasmā nikkhamati (정사로부터 떠나다)' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Yācako naramhā bhattaṃ yācati.\nYācakā narehi bhattaṃ yācanti.', pronKo: '야-자꼬 나랑하- 밧땅 야-자띠\n야-자까- 나레히 밧땅 야-잔띠', translation: '거지는 사람에게서 쌀을 구한다.\n거지들은 사람들에게서 쌀을 구한다.', highlight: ['naramhā', 'narehi'] },
  { type: 'verse', pali: 'Putto mātulamhā pañhaṃ pucchati.\nPuttā mātulehi pañhe pucchanti.', pronKo: '뿟또 마-뚤랑하- 빤함 뿟차띠\n뿟따- 마-뚤레히 빤헤 뿟찬띠', translation: '아들은 삼촌에게서 질문을 묻는다.\n아들들은 삼촌들에게서 질문들을 묻는다.', highlight: ['mātulamhā', 'mātulehi'] },
  { type: 'verse', pali: 'Kassako rukkhasmā patati.\nKassakā rukkhehi patanti.', pronKo: '깟사꼬 룩카스마- 빠따띠\n깟사까- 룩케히 빠딴띠', translation: '농부는 나무에서 떨어진다.\n농부들은 나무들에서 떨어진다.', highlight: ['rukkhasmā', 'rukkhehi'] },

  // === 연습문제 4 (10문제) ===
  { type: 'quiz', question: '1. Corā gāmamhā pabbataṃ dhāvanti.', options: ['도둑들은 마을로부터 산으로 달린다', '도둑들은 마을에서 산을 본다', '도둑은 마을로부터 산으로 달린다', '도둑들은 산으로부터 마을로 달린다'], answer: 0, hint: 'gāmamhā=마을로부터(탈격), pabbataṃ=산으로' },
  { type: 'quiz', question: '2. Dārako mātulasmā odanaṃ yācati.', options: ['아이는 삼촌에게 밥을 준다', '아이는 삼촌에게서 밥을 구한다', '아이들은 삼촌에게서 밥을 구한다', '아이는 삼촌과 함께 밥을 먹는다'], answer: 1, hint: 'mātulasmā=삼촌에게서(탈격), yācati=구하다' },
  { type: 'quiz', question: '3. Kumāro sopānamhā patati.', options: ['소년은 나무에서 떨어진다', '소년은 계단에서 떨어진다', '소년들은 계단에서 떨어진다', '소년은 계단으로 올라간다'], answer: 1, hint: 'sopānamhā=계단에서(탈격), patati=떨어지다' },
  { type: 'quiz', question: '4. Mātulā sāṭake dhovanti.', options: ['삼촌은 옷을 씻는다', '삼촌들은 옷들을 씻는다', '삼촌들은 옷으로부터 떠난다', '세탁부들은 옷들을 씻는다'], answer: 1, hint: 'Mātulā=삼촌들은(복수), sāṭake=옷들을, dhovanti=씻다' },
  { type: 'quiz', question: '5. Dhīvarā piṭakehi macche āharanti.', options: ['어부들은 바구니들로 물고기들을 가져온다', '어부는 바구니로 물고기를 가져온다', '어부는 바구니들에서 물고기들을 가져온다', '어부는 바구니들로부터 물고기들을 가져온다'], answer: 0, hint: 'piṭakehi=바구니들로(도구격/탈격 복수), macche=물고기들을' },
  { type: 'quiz', question: '6. Upāsakā samaṇehi saddhiṃ vihārasmā nikkhamanti.', options: ['우바새들은 사문들과 함께 정사로 간다', '우바새들은 사문들과 함께 정사로부터 떠난다', '우바새는 사문과 함께 정사로부터 떠난다', '우바새들은 사문들에게서 정사로 간다'], answer: 1, hint: 'vihārasmā=정사로부터(탈격), nikkhamanti=떠나다' },
  { type: 'quiz', question: '7. Brāhmaṇo kakacena rukkhaṃ chindati.', options: ['바라문은 톱으로 나무를 자른다', '바라문은 칼로 나무를 자른다', '바라문들은 톱으로 나무를 자른다', '농부는 톱으로 나무를 자른다'], answer: 0, hint: 'kakacena=톱으로(도구격), rukkhaṃ=나무를' },
  { type: 'quiz', question: '8. Kumārā mittehi saha bhūpālaṃ passanti.', options: ['소년들은 친구들과 함께 왕을 본다', '소년은 친구와 함께 왕을 본다', '소년들은 친구들에게서 왕을 본다', '소년들은 친구들과 함께 현자를 본다'], answer: 0, hint: 'mittehi saha=친구들과 함께(도구격), bhūpālaṃ=왕을' },
  { type: 'quiz', question: '9. Vāṇijo assena saddhiṃ pabbatasmā oruhati.', options: ['상인은 말과 함께 산을 오른다', '상인은 말과 함께 산에서 내려온다', '상인들은 말과 함께 산에서 내려온다', '상인은 말에게서 산으로 달린다'], answer: 1, hint: 'pabbatasmā=산에서(탈격), oruhati=내려오다' },
  { type: 'quiz', question: '10. Yācako kassakasmā soṇaṃ yācati.', options: ['거지는 농부에게 개를 준다', '거지는 농부에게서 개를 요청한다', '거지들은 농부에게서 개를 요청한다', '거지는 농부와 함께 개를 본다'], answer: 1, hint: 'kassakasmā=농부에게서(탈격), soṇaṃ=개를, yācati=구하다' },

  // === 마무리 ===
  { type: 'speak', pali: 'Pānātipātā veramaṇī sikkhāpadaṃ samādiyāmi', pronKo: '빠-나-띠빠-따- 웨라마니- 식카-빠당 사마-디야-미' },
]
