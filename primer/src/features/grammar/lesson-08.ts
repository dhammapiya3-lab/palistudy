// 8과: 호격 + 남성명사 격변화 총정리 + 중성명사 도입
// 경전: "bhikkhave!" (호격), "Rūpaṃ bhikkhave anattā" (SN 22.59)
import type { StepWithoutId } from './types'

const V_RUPA = 'Rūpaṃ bhikkhave anattā.'
const V_RUPA_K = '비구들이여, 물질은 무아이다.'
// bhikkhave 호격은 V_RUPA 안에서 사용

export const LESSON_08: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '8과: 호격 + 남성 총정리 + 중성명사', subtitle: 'Ālapana vibhatti (Vocative) + Napuṃsakaliṅga', description: '호격: ~여, ~이여 (부름)\n남성명사 전체 격변화 총정리\n중성명사(-a) 도입\n\n경전: "Bhikkhave!(비구들이여!)"\n"Rūpaṃ anattā(색은 무아이다)"', icon: '📢' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_RUPA, pronKo: '루-빵 빅카웨 아낫따-', translation: V_RUPA_K, highlight: ['Rūpaṃ', 'bhikkhave', 'anattā'], note: 'Rūpaṃ = rūpa(물질/색)의 중성명사 주격 단수\nbhikkhave = bhikkhu(비구)의 호격 복수\nanattā = 무아(無我)\n— 무아경(SN 22.59) 핵심 구절!' },

  // === 호격 문법 ===
  { type: 'teach-grammar', title: '호격 (Vocative) — ~여, ~이여', example: '남성 단수: nara → nara (원형 그대로)\n남성 복수: nara → narā', exampleKo: '단수: 원형과 동일(-a)\n복수: 주격과 동일(-ā)', explanation: '호격은 상대를 부를 때 사용합니다.\n\n남성 -a 명사:\n• 단수: -a (원형) — purisa! (이 사람이여!)\n• 복수: -ā — purisā! (사람들이여!)\n\n경전에서 가장 많이 나오는 호격:\n• bhikkhu → bhikkhave! (비구들이여!)\n• rāja → rāja! (왕이여!)\n\n문장 첫머리나 중간에 삽입됩니다.' },

  // === 남성명사 전체 격변화표 (nara 기준) ===
  { type: 'teach-grammar', title: '남성명사 -a 전체 격변화 (nara)', example: '주격: naro / narā\n목적격: naraṃ / nare\n도구격: narena / narehi\n여격: narāya / narānaṃ\n탈격: naramhā,narā / narehi\n소유격: narassa / narānaṃ\n처소격: nare,naramhi / naresu\n호격: nara / narā', exampleKo: '8격 × 2수 = 16가지 형태', explanation: '남성명사 -a형 격변화 총정리:\n\n격 | 단수 | 복수\n주격(~은) | -o | -ā\n목적격(~을) | -aṃ | -e\n도구격(~로) | -ena | -ehi/-ebhi\n여격(~에게) | -āya/-ssa | -ānaṃ\n탈격(~에서) | -mhā/-smā/-ā | -ehi/-ebhi\n소유격(~의) | -ssa | -ānaṃ\n처소격(~에) | -e/-mhi/-smiṃ | -esu\n호격(~이여) | -a | -ā\n\n여격 복수 = 소유격 복수 (-ānaṃ)\n탈격 복수 = 도구격 복수 (-ehi)' },

  // === 중성명사 도입 ===
  { type: 'teach-grammar', title: '중성명사 -a형 격변화 (phala 기준)', example: '주격: phalaṃ / phalā,phalāni\n목적격: phalaṃ / phale,phalāni\n호격: phala / phalāni\n나머지: 남성과 동일', exampleKo: '중성은 주격=목적격, 복수에 -āni 추가', explanation: '중성명사는 남성과 거의 동일하되\n주격·목적격·호격만 다릅니다.\n\n격 | 단수 | 복수\n주격 | -aṃ | -ā/-āni\n목적격 | -aṃ | -e/-āni\n호격 | -a | -āni\n도구격 | -ena | -ehi\n여격 | -assa/-āya | -ānaṃ\n탈격 | -amhā/-asmā | -ehi\n소유격 | -assa | -ānaṃ\n처소격 | -e/-amhi | -esu\n\n핵심: 주격 단수 -aṃ (남성은 -o)\n복수에 -āni 형태 추가!' },

  // === 중성명사 단어 18개 ===
  { type: 'teach', word: 'nayana / locana', pronKo: '나야나 / 로짜나', meaning: '눈', icon: '👁️', grammar: '중성명사', baseForm: 'nayana, locana', formNote: '주격: nayanaṃ / nayanā,nayanāni\n두 동의어 모두 중성' },
  { type: 'teach', word: 'udaka / jala', pronKo: '우다까 / 잘라', meaning: '물', icon: '💧', grammar: '중성명사', baseForm: 'udaka, jala', formNote: '주격: udakaṃ / udakā\n처소격: udake (물에서)' },
  { type: 'teach', word: 'arañña / vana', pronKo: '아란냐 / 와나', meaning: '숲', icon: '🌳', grammar: '중성명사', baseForm: 'arañña, vana', formNote: '주격: araññaṃ / araññā\n처소격: arañña/vane (숲에서)', buddhism: 'araññavāsī = 숲에 사는 자 (두타행)' },
  { type: 'teach', word: 'puppha / kusuma', pronKo: '뿝파 / 꾸수마', meaning: '꽃', icon: '🌸', grammar: '중성명사', baseForm: 'puppha, kusuma', formNote: '주격: pupphaṃ / pupphā,pupphāni' },
  { type: 'teach', word: 'geha / ghara', pronKo: '게하 / 가라', meaning: '집', icon: '🏘️', grammar: '중성명사', baseForm: 'geha, ghara', formNote: '주격: gehaṃ / gehā\n처소격: gehe (집에서)' },
  { type: 'teach', word: 'āsana', pronKo: '아-사나', meaning: '자리, 좌석', icon: '💺', grammar: '중성명사', baseForm: 'āsana', formNote: '주격: āsanaṃ / āsanā,āsanāni', buddhism: 'āsana = 좌선의 자리\npaññatt-āsana = 마련된 자리' },
  { type: 'teach', word: 'paṇṇa', pronKo: '빤냐', meaning: '나뭇잎', icon: '🍃', grammar: '중성명사', baseForm: 'paṇṇa', formNote: '주격: paṇṇaṃ / paṇṇā,paṇṇāni' },
  { type: 'teach', word: 'tiṇa', pronKo: '띠나', meaning: '풀', icon: '🌿', grammar: '중성명사', baseForm: 'tiṇa', formNote: '주격: tiṇaṃ / tiṇā,tiṇāni' },
  { type: 'teach', word: 'khīra', pronKo: '키-라', meaning: '우유', icon: '🥛', grammar: '중성명사', baseForm: 'khīra', formNote: '주격: khīraṃ\n처소격: khīre' },
  { type: 'teach', word: 'nagara', pronKo: '나가라', meaning: '도시', icon: '🏙️', grammar: '중성명사', baseForm: 'nagara', formNote: '주격: nagaraṃ / nagarā\n처소격: nagare (도시에서)' },
  { type: 'teach', word: 'uyyāna', pronKo: '웃야-나', meaning: '공원, 동산', icon: '🏞️', grammar: '중성명사', baseForm: 'uyyāna', formNote: '주격: uyyānaṃ / uyyānā\n처소격: uyyāne (공원에서)' },
  { type: 'teach', word: 'khetta', pronKo: '켓따', meaning: '들, 논, 밭', icon: '🌾', grammar: '중성명사', baseForm: 'khetta', formNote: '주격: khettaṃ / khettā,khettāni\n처소격: khette (들에서)', buddhism: 'puññakhetta = 공덕의 밭 (승가)' },
  { type: 'teach', word: 'bhaṇḍa', pronKo: '반다', meaning: '상품, 물건', icon: '📦', grammar: '중성명사', baseForm: 'bhaṇḍa', formNote: '주격: bhaṇḍaṃ / bhaṇḍā,bhaṇḍāni' },
  { type: 'teach', word: 'sīla', pronKo: '시-라', meaning: '계, 덕, 도덕', icon: '📿', grammar: '중성명사', baseForm: 'sīla', formNote: '주격: sīlaṃ / sīlā,sīlāni', buddhism: 'sīla = 계율. 삼학(三學) 중 첫째\nsīla → samādhi → paññā' },
  { type: 'teach', word: 'dāna', pronKo: '다-나', meaning: '보시, 베풂', icon: '🎁', grammar: '중성명사', baseForm: 'dāna', formNote: '주격: dānaṃ / dānā,dānāni', buddhism: 'dāna = 보시(布施). 바라밀 첫째\ndānaṃ deti = 보시를 행하다' },
  { type: 'teach', word: 'rūpa', pronKo: '루-빠', meaning: '색, 물질, 형태', icon: '🔮', grammar: '중성명사', baseForm: 'rūpa', formNote: '주격: rūpaṃ / rūpā,rūpāni', buddhism: '오온(五蘊) 첫째: rūpa(색)\nrūpaṃ anattā = 색은 무아' },
  { type: 'teach', word: 'dvāra', pronKo: '드와-라', meaning: '문', icon: '🚪', grammar: '중성명사', baseForm: 'dvāra', formNote: '주격: dvāraṃ / dvārā,dvārāni', buddhism: '6근의 문: dvāra\ncakkhu-dvāra = 눈의 문' },
  { type: 'teach', word: 'vattha', pronKo: '왓타', meaning: '옷, 천', icon: '👘', grammar: '중성명사', baseForm: 'vattha', formNote: '주격: vatthaṃ / vatthā,vatthāni' },

  // === 동사 12개 ===
  { type: 'teach', word: 'vivarati', pronKo: '위와라띠', meaning: '열다', icon: '🔓', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vivarati', formNote: '복수: vivaranti\nvi + var(덮다) → 열다' },
  { type: 'teach', word: 'naccati', pronKo: '낫짜띠', meaning: '춤추다', icon: '💃', grammar: '동사 · 현재 3인칭 단수', baseForm: 'naccati', formNote: '복수: naccanti\nnacca = 춤' },
  { type: 'teach', word: 'nikkhipati', pronKo: '닉키빠띠', meaning: '버리다, 내려놓다', icon: '🗑️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'nikkhipati', formNote: '복수: nikkhipanti\nni + khip(던지다)' },
  { type: 'teach', word: 'uṭṭhahati', pronKo: '웃타하띠', meaning: '일어나다', icon: '🧗', grammar: '동사 · 현재 3인칭 단수', baseForm: 'uṭṭhahati', formNote: '복수: uṭṭhahanti\nud + ṭhā(서다)' },
  { type: 'teach', word: 'phusati', pronKo: '푸사띠', meaning: '접촉하다, 닿다', icon: '👆', grammar: '동사 · 현재 3인칭 단수', baseForm: 'phusati', formNote: '복수: phusanti\nphassa = 접촉(촉)', buddhism: 'phassa = 촉(觸). 12연기 중 하나' },
  { type: 'teach', word: 'anusāsati', pronKo: '아누사-사띠', meaning: '가르치다, 교훈하다', icon: '👨‍🏫', grammar: '동사 · 현재 3인칭 단수', baseForm: 'anusāsati', formNote: '복수: anusāsanti\nanu + sās(가르치다)' },
  { type: 'teach', word: 'ovadati', pronKo: '오와다띠', meaning: '충고하다, 훈계하다', icon: '🗣️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'ovadati', formNote: '복수: ovadanti\nova = 충고', buddhism: 'ovāda-pāṭimokkha = 교계경' },
  { type: 'teach', word: 'saṃharati', pronKo: '상하라띠', meaning: '모으다, 거두다', icon: '🧺', grammar: '동사 · 현재 3인칭 단수', baseForm: 'saṃharati', formNote: '복수: saṃharanti\nsaṃ + har(운반하다)' },
  { type: 'teach', word: 'āsiñcati', pronKo: '아-신짜띠', meaning: '물을 뿌리다, 관개하다', icon: '🚿', grammar: '동사 · 현재 3인칭 단수', baseForm: 'āsiñcati', formNote: '복수: āsiñcanti\nā + siñc(뿌리다)' },
  { type: 'teach', word: 'akkosati', pronKo: '악꼬사띠', meaning: '꾸짖다, 욕하다', icon: '😤', grammar: '동사 · 현재 3인칭 단수', baseForm: 'akkosati', formNote: '복수: akkosanti\nā + kus(꾸짖다)' },
  { type: 'teach', word: 'bhindati', pronKo: '빈다띠', meaning: '자르다, 부수다', icon: '🪓', grammar: '동사 · 현재 3인칭 단수', baseForm: 'bhindati', formNote: '복수: bhindanti\nbhid(부수다)에서 파생' },
  { type: 'teach', word: 'pibati / pivati', pronKo: '삐바띠 / 삐와띠', meaning: '마시다', icon: '🍵', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pibati, pivati', formNote: '복수: pibanti/pivanti\n두 형태 모두 사용' },

  // === 교재 예문 3쌍 (호격 + 중성명사) ===
  { type: 'verse', pali: 'Purisa, dānaṃ dehi!\nPurisā, dānāni detha!', pronKo: '뿌리사, 다-낭 데히\n뿌리사-, 다-나-니 데타', translation: '이 사람이여, 보시를 행하라!\n사람들이여, 보시들을 행하라!', highlight: ['Purisa', 'Purisā', 'dānaṃ', 'dānāni'], note: 'purisa=호격 단수, purisā=호격 복수\ndānaṃ=중성 주격 단수, dānāni=중성 복수' },
  { type: 'verse', pali: 'Kumāra, pupphaṃ āhara!\nKumārā, pupphāni āharatha!', pronKo: '꾸마-라, 뿝팜 아-하라\n꾸마-라-, 뿝파-니 아-하라타', translation: '소년이여, 꽃을 가져오라!\n소년들이여, 꽃들을 가져오라!', highlight: ['Kumāra', 'Kumārā', 'pupphaṃ', 'pupphāni'] },
  { type: 'verse', pali: 'Rūpaṃ aniccaṃ.\nRūpāni aniccāni.', pronKo: '루-빵 아닛짱\n루-빠-니 아닛짜-니', translation: '물질은 무상하다.\n물질들은 무상하다.', highlight: ['Rūpaṃ', 'Rūpāni'], note: '중성명사 주격: 단수 -aṃ / 복수 -āni\naniccaṃ/aniccāni도 중성 형용사!' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Bhikkhave, rūpaṃ anattā.', options: ['비구들이여, 물질은 무아이다', '비구여, 물질은 무상하다', '비구들이여, 물질들은 무아이다', '비구들이여, 물질은 고통이다'], answer: 0, hint: 'bhikkhave=비구들이여(호격), rūpaṃ=물질(중성 주격 단수)' },
  { type: 'quiz', question: '2. Kassako khette tiṇaṃ saṃharati.', options: ['농부는 들에서 풀을 모은다', '농부는 들에서 풀을 심는다', '농부들은 들에서 풀을 모은다', '농부는 들에서 꽃을 모은다'], answer: 0, hint: 'khette=들에서(처소격), tiṇaṃ=풀을(중성 목적격)' },
  { type: 'quiz', question: '3. Kumāra, gehamhā nikkhamā!', options: ['소년이여, 집에서 나와라!', '소년들이여, 집에서 나와라!', '소년이여, 집으로 가라!', '소년이여, 숲에서 나와라!'], answer: 0, hint: 'kumāra=소년이여(호격 단수), gehamhā=집에서(탈격)' },
  { type: 'quiz', question: '4. Manussā nagaramhi bhaṇḍāni āharanti.', options: ['사람들은 도시에서 상품들을 가져온다', '사람은 도시에서 상품을 가져온다', '사람들은 도시로 상품들을 가져간다', '사람들은 도시에서 물을 가져온다'], answer: 0, hint: 'nagaramhi=도시에서(처소격), bhaṇḍāni=상품들을(중성 복수)' },
  { type: 'quiz', question: '5. Upāsako vihāre āsanaṃ nikkhipati.', options: ['우바새는 정사에서 자리를 놓는다', '우바새는 정사에서 자리를 치운다', '우바새들은 정사에서 자리를 놓는다', '우바새는 정사에서 꽃을 놓는다'], answer: 0, hint: 'āsanaṃ=자리를(중성 목적격), nikkhipati=내려놓다' },
  { type: 'quiz', question: '6. Puttā uyyāne pupphāni saṃharanti.', options: ['아들들은 공원에서 꽃들을 모은다', '아들은 공원에서 꽃을 모은다', '아들들은 공원에서 나뭇잎들을 모은다', '아들들은 숲에서 꽃들을 모은다'], answer: 0, hint: 'uyyāne=공원에서(처소격), pupphāni=꽃들을(중성 복수)' },
  { type: 'quiz', question: '7. Samaṇo udakaṃ pibati.', options: ['사문은 물을 마신다', '사문은 우유를 마신다', '사문들은 물을 마신다', '사문은 물을 뿌린다'], answer: 0, hint: 'udakaṃ=물을(중성 목적격), pibati=마시다' },
  { type: 'quiz', question: '8. Brāhmaṇa, sīlaṃ rakkha!', options: ['바라문이여, 계를 지켜라!', '바라문들이여, 계를 지켜라!', '바라문이여, 보시를 행하라!', '바라문이여, 계율들을 지켜라!'], answer: 0, hint: 'brāhmaṇa=바라문이여(호격 단수), sīlaṃ=계를(중성 목적격)' },
  { type: 'quiz', question: '9. Kassako khīraṃ nagaraṃ āharati.', options: ['농부는 우유를 도시로 가져온다', '농부는 물을 도시로 가져온다', '농부들은 우유를 도시로 가져온다', '농부는 우유를 마을로 가져온다'], answer: 0, hint: 'khīraṃ=우유를, nagaraṃ=도시로(목적격=방향)' },
  { type: 'quiz', question: '10. Samaṇā araññe viharanti.', options: ['사문들은 숲에서 머문다', '사문은 숲에서 머문다', '사문들은 숲으로 간다', '사문들은 마을에서 머문다'], answer: 0, hint: 'araññe=숲에서(처소격), viharanti=머물다(복수)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Rūpaṃ bhikkhave anattā', pronKo: '루-빵 빅카웨 아낫따-' },
]
