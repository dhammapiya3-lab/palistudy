// 7과: 처소격 (Locative) - 교재 7과 완전 수록
// 경전: 초전법륜경 도입부 "bārāṇasiyaṃ viharati isipatane migadāye"
import type { StepWithoutId } from './types'

const V_EKAM = 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.'
const V_EKAM_K = '한때 세존께서 바라나시 이시빠따나의 녹야원에 머물고 계셨다.'

export const LESSON_07: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '7과: 남성명사 처소격', subtitle: 'Sattamī vibhatti (Locative)', description: '처소격은 장소·시간·대상을 나타냅니다.\n~에, ~에서, ~에 관하여, ~가운데\n\n단수: -e/-mhi/-smiṃ\n복수: -esu\n\n경전: "bārāṇasiyaṃ viharati\n(바라나시에 머물다)"', icon: '📍' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_EKAM, pronKo: '에깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네 미가다-예', translation: V_EKAM_K, highlight: ['bārāṇasiyaṃ', 'isipatane', 'migadāye'], note: 'bārāṇasiyaṃ = 바라나시에 (처소격)\nisipatane = 이시빠따나에 (처소격 -e)\nmigadāye = 녹야원(鹿野苑)에 (처소격 -e)\n경전의 거의 모든 경은 이 구절로 시작!' },

  // === 처소격 문법 ===
  { type: 'teach-grammar', title: '처소격 (Locative) — ~에/~에서', example: 'nara + e = nare (사람에서/사람에 대해서)\nnara + mhi = naramhi (사람에서/사람에 대해서)\nnara + smiṃ = narasmiṃ (사람에서/사람에 대해서)\nnara + esu = naresu (사람들에서/사람들에 대해서)', exampleKo: '단수: -e / -mhi / -smiṃ\n복수: -esu', explanation: '처소격의 다양한 의미:\n• 장소: gāme vasati (마을에 산다)\n• 위치: rukkhe nisīdati (나무에 앉다)\n• 대상: Buddhe pasīdati (붓다에 대해 기뻐하다)\n• ~가운데: manussesu (사람들 가운데)\n\n단수 3형태(-e/-mhi/-smiṃ)는 의미 동일\n-e가 가장 보편적' },

  // === 명사 13개 ===
  { type: 'teach', word: 'nāvika', pronKo: '나-위까', meaning: '선원', icon: '⛵', grammar: '남성명사', baseForm: 'nāvika', formNote: '처소격: nāvike/nāvikamhi\n복수: nāvikesu' },
  { type: 'teach', word: 'ākāsa', pronKo: '아-까-사', meaning: '허공, 하늘', icon: '🌌', grammar: '남성명사', baseForm: 'ākāsa', formNote: '처소격: ākāse\n"허공에"' },
  { type: 'teach', word: 'samudda', pronKo: '사뭇다', meaning: '바다', icon: '🌊', grammar: '남성명사', baseForm: 'samudda', formNote: '처소격: samudde\n"바다에서"' },
  { type: 'teach', word: 'deva / sura', pronKo: '데와 / 수라', meaning: '천신, 신', icon: '✨', grammar: '남성명사', baseForm: 'deva, sura', formNote: 'deva = 천신 (더 일반적)\nsura = 신 (동의어)\n처소격: deve/sure' },
  { type: 'teach', word: 'loka', pronKo: '로까', meaning: '세계, 세상', icon: '🌍', grammar: '남성명사', baseForm: 'loka', formNote: '처소격: loke\n"세상에서"', buddhism: '삼계(三界): kāmaloka(욕계), rūpaloka(색계), arūpaloka(무색계)' },
  { type: 'teach', word: 'āloka', pronKo: '알-로까', meaning: '빛, 광명', icon: '💡', grammar: '남성명사', baseForm: 'āloka', formNote: '처소격: āloke\nā(접두사) + loka' },
  { type: 'teach', word: 'sakuṇa', pronKo: '사꾸나', meaning: '새', icon: '🐦', grammar: '남성명사', baseForm: 'sakuṇa', formNote: '처소격: sakuṇe\n복수: sakuṇesu' },
  { type: 'teach', word: 'kāka', pronKo: '까-까', meaning: '까마귀', icon: '🐦‍⬛', grammar: '남성명사', baseForm: 'kāka', formNote: '처소격: kāke\n의성어에서 유래' },
  { type: 'teach', word: 'nivāsa', pronKo: '니와-사', meaning: '집, 거처', icon: '🏠', grammar: '남성명사', baseForm: 'nivāsa', formNote: '처소격: nivāse\n"집에서"' },
  { type: 'teach', word: 'sappurisa / asappurisa', pronKo: '삽뿌리사 / 아삽뿌리사', meaning: '진인(善人) / 악인(惡人)', icon: '⚖️', grammar: '남성명사', baseForm: 'sappurisa, asappurisa', formNote: 'sat(선한) + purisa(사람)\na(부정) + sat + purisa', buddhism: '경전에서 자주 대비되는 쌍' },
  { type: 'teach', word: 'kāya', pronKo: '까-야', meaning: '몸, 신체', icon: '🧍', grammar: '남성명사', baseForm: 'kāya', formNote: '처소격: kāye/kāyasmiṃ\n"몸에/몸에서"', buddhism: 'kāyānupassanā = 몸에 대한 관찰 (사념처)' },
  { type: 'teach', word: 'dūta', pronKo: '두-따', meaning: '심부름꾼, 사자(使者)', icon: '📨', grammar: '남성명사', baseForm: 'dūta', formNote: '처소격: dūte' },
  { type: 'teach', word: 'goṇa', pronKo: '고나', meaning: '황소', icon: '🐂', grammar: '남성명사', baseForm: 'goṇa', formNote: '처소격: goṇe\n복수: goṇesu' },

  // === 동사 12개 ===
  { type: 'teach', word: 'āhiṇḍati', pronKo: '아-힌다띠', meaning: '방황하다, 돌아다니다', icon: '🚶', grammar: '동사 · 현재 3인칭 단수', baseForm: 'āhiṇḍati', formNote: '복수: āhiṇḍanti\nā + hiṇḍ(방황하다)' },
  { type: 'teach', word: 'carati', pronKo: '짜라띠', meaning: '걷다, 행하다', icon: '🚶‍♂️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'carati', formNote: '복수: caranti\n"행(行)" — cariyā(행위)의 어근', buddhism: 'brahmacariyā = 청정한 행위(범행)' },
  { type: 'teach', word: 'nisīdati', pronKo: '니시-다띠', meaning: '앉다', icon: '🪑', grammar: '동사 · 현재 3인칭 단수', baseForm: 'nisīdati', formNote: '복수: nisīdanti\nni + sīd(앉다)' },
  { type: 'teach', word: 'sannipatati', pronKo: '산니빠따띠', meaning: '모이다, 집합하다', icon: '👥', grammar: '동사 · 현재 3인칭 단수', baseForm: 'sannipatati', formNote: '복수: sannipatanti\nsaṃ + ni + pat(떨어지다)' },
  { type: 'teach', word: 'viharati', pronKo: '위하라띠', meaning: '거주하다, 머물다', icon: '🏛️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'viharati', formNote: '복수: viharanti\nvi + har(운반하다)', buddhism: '경전 도입부 필수 동사\n"bhagavā viharati = 세존께서 머물다"' },
  { type: 'teach', word: 'vasati', pronKo: '와사띠', meaning: '살다, 거주하다', icon: '🏡', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vasati', formNote: '복수: vasanti\nviharati와 유사 의미' },
  { type: 'teach', word: 'jīvati', pronKo: '지-와띠', meaning: '살다, 생존하다', icon: '❤️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'jīvati', formNote: '복수: jīvanti\njīva = 생명' },
  { type: 'teach', word: 'tiṭṭhati', pronKo: '띳타띠', meaning: '서 있다, 머물다', icon: '🧍‍♂️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'tiṭṭhati', formNote: '복수: tiṭṭhanti\nṭhā(서다)에서 파생' },
  { type: 'teach', word: 'uppatati', pronKo: '웁빠따띠', meaning: '날다, 날아오르다', icon: '🕊️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'uppatati', formNote: '복수: uppatanti\nud + pat(떨어지다/날다)' },
  { type: 'teach', word: 'tarati', pronKo: '따라띠', meaning: '건너다', icon: '🏊', grammar: '동사 · 현재 3인칭 단수', baseForm: 'tarati', formNote: '복수: taranti\ntarati=건너다 → ogha-taraṇa(폭류를 건넘)' },
  { type: 'teach', word: 'uttarati', pronKo: '웃따라띠', meaning: '(물에서) 나오다, 건너나오다', icon: '🏖️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'uttarati', formNote: '복수: uttaranti\nud + tar(건너다)' },
  { type: 'teach', word: 'pasīdati', pronKo: '빠시-다띠', meaning: '기뻐하다, 정화되다', icon: '😊', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pasīdati', formNote: '복수: pasīdanti\npa + sīd(가라앉다/맑아지다)', buddhism: 'pasāda = 정신의 맑음, 환희\nBuddhe pasīdati = 붓다에 대해 환희하다' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Nāviko samudde tarati.\nNāvikā samuddesu taranti.', pronKo: '나-위꼬 사뭇데 따라띠\n나-위까- 사뭇데수 따란띠', translation: '선원은 바다에서 건넌다.\n선원들은 바다들에서 건넌다.', highlight: ['samudde', 'samuddesu'] },
  { type: 'verse', pali: 'Sakuṇo ākāse uppatati.\nSakuṇā ākāsesu uppatanti.', pronKo: '사꾸노 아-까-세 웁빠따띠\n사꾸나- 아-까-세수 웁빠딴띠', translation: '새는 허공에서 난다.\n새들은 허공들에서 난다.', highlight: ['ākāse', 'ākāsesu'] },
  { type: 'verse', pali: 'Sappuriso loke jīvati.\nSappurisā lokesu jīvanti.', pronKo: '삽뿌리소 로게 지-와띠\n삽뿌리사- 로게수 지-완띠', translation: '선인은 세상에서 산다.\n선인들은 세상들에서 산다.', highlight: ['loke', 'lokesu'] },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Goṇā gāme āhiṇḍanti.', options: ['황소들은 마을에서 돌아다닌다', '황소는 마을에서 돌아다닌다', '황소들은 마을로 달린다', '황소들은 마을에서 산다'], answer: 0, hint: 'gāme=마을에서(처소격), āhiṇḍanti=돌아다니다(복수)' },
  { type: 'quiz', question: '2. Dūto bhūpālassa nivāse tiṭṭhati.', options: ['심부름꾼은 왕의 집에서 서 있다', '심부름꾼은 왕의 마을에서 서 있다', '심부름꾼들은 왕의 집에서 서 있다', '심부름꾼은 왕에게 집에서 서 있다'], answer: 0, hint: 'bhūpālassa nivāse=왕의 집에서(소유격+처소격)' },
  { type: 'quiz', question: '3. Kākā rukkhesu nisīdanti.', options: ['까마귀들은 나무들에 앉는다', '까마귀는 나무에 앉는다', '새들은 나무들에 앉는다', '까마귀들은 나무들에서 난다'], answer: 0, hint: 'rukkhesu=나무들에(처소격 복수), nisīdanti=앉다(복수)' },
  { type: 'quiz', question: '4. Samaṇo vihārasmiṃ viharati.', options: ['사문은 정사에서 머문다', '사문들은 정사에서 머문다', '사문은 정사로 간다', '사문은 마을에서 머문다'], answer: 0, hint: 'vihārasmiṃ=정사에서(처소격 -smiṃ), viharati=머물다' },
  { type: 'quiz', question: '5. Manussā loke caranti.', options: ['사람들은 세상에서 행한다', '사람은 세상에서 걷는다', '사람들은 세상을 본다', '사람들은 세상에서 산다'], answer: 0, hint: 'loke=세상에서(처소격), caranti=행하다/걷다(복수)' },
  { type: 'quiz', question: '6. Nāvikā samudde macche passanti.', options: ['선원들은 바다에서 물고기들을 본다', '선원은 바다에서 물고기를 본다', '선원들은 바다로 물고기를 가져온다', '선원들은 바다에서 물고기를 잡는다'], answer: 0, hint: 'samudde=바다에서(처소격), macche=물고기들을' },
  { type: 'quiz', question: '7. Upāsako Buddhe pasīdati.', options: ['우바새는 붓다에 대해 환희한다', '우바새는 붓다에게 경배한다', '우바새들은 붓다에 대해 환희한다', '우바새는 붓다에게 간다'], answer: 0, hint: 'Buddhe=붓다에 대해(처소격), pasīdati=환희하다' },
  { type: 'quiz', question: '8. Devā ākāse sannipatanti.', options: ['천신들은 허공에 모인다', '천신은 허공에서 난다', '천신들은 하늘로 날아오른다', '천신들은 허공에서 걷는다'], answer: 0, hint: 'ākāse=허공에(처소격), sannipatanti=모이다(복수)' },
  { type: 'quiz', question: '9. Asappurisā pāpe vasanti.', options: ['악인들은 악 속에 산다', '선인들은 악 속에 산다', '악인들은 악을 행한다', '악인은 악 속에 산다'], answer: 0, hint: 'pāpe=악에서(처소격), vasanti=살다(복수)' },
  { type: 'quiz', question: '10. Sakuṇā rukkhamhi nisīdanti.', options: ['새들은 나무에 앉는다', '새는 나무에 앉는다', '새들은 나무에서 난다', '새들은 나무들에 앉는다'], answer: 0, hint: 'rukkhamhi=나무에(처소격 -mhi 단수), nisīdanti=앉다(복수)' },

  // === 마무리 ===
  { type: 'speak', pali: V_EKAM, pronKo: '에깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네 미가다-예' },
]
