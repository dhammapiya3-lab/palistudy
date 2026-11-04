// 10과: 부정사 -(i)tuṃ + 현재분사 -nta/-māna + 중성명사 새 단어
// 교재 10과(부정사) + 11과(현재분사+중성명사) 통합
import type { StepWithoutId } from './types'

export const LESSON_10: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '10과: 부정사 + 현재분사', subtitle: 'Tuṃ-paccaya / Nta-māna-paccaya', description: '부정사: ~하기 위해, ~할 (-(i)tuṃ)\n현재분사: ~하면서, ~하는 (-nta/-māna)\n새 단어: 중성명사 + 동사\n\n경전: "Dānaṃ dadāmānā sagge uppajjanti"', icon: '📚' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Dānaṃ dadāmānā sīlāni rakkhamānā\nmanussā sagge uppajjanti.', pronKo: '다-낭 다다-마-나- 시-라-니 락카마-나-\n마눗사- 삭게 웁빠잔띠', translation: '보시하면서(dadāmānā) 계를 지키면서(rakkhamānā)\n사람들은 천상에 태어난다.', highlight: ['dadāmānā', 'rakkhamānā', 'sagge'], note: 'dadāmānā = dadāti(주다)의 현재분사 복수 주격\nrakkhamānā = rakkhati(지키다)의 현재분사 복수 주격\n-māna 형태의 현재분사가 주어를 수식!' },

  // === 부정사 문법 ===
  { type: 'teach-grammar', title: '부정사 -(i)tuṃ — ~하기 위해, ~할', example: 'pacati → pacituṃ (요리할, 요리하기 위해)\nkhādati → khādituṃ (먹을)\ngacchati → gantuṃ (갈)\ndadāti → dātuṃ (줄)\ntiṭṭhati → ṭhātuṃ (설)\npibati → pātuṃ (마실)', exampleKo: '어간 + (i)tuṃ = ~할, ~하기 위해', explanation: '부정사는 목적이나 의도를 표현합니다.\n\n규칙형: 어간 + ituṃ\n• pacituṃ, khādituṃ, vasituṃ\n\n불규칙형: 어근 + tuṃ\n• gantuṃ (← gam), dātuṃ (← dā)\n• ṭhātuṃ (← ṭhā), pātuṃ (← pā)\n• sotuṃ (← su, 듣다)\n• ñātuṃ (← ñā, 알다)\n\n용법: sakkoti/ussahati + 부정사\n"~할 수 있다/감히 ~하다"' },

  // === 부정사 예문 ===
  { type: 'verse', pali: 'Dārako bhattaṃ bhuñjituṃ icchati.', pronKo: '다-라꼬 밧땅 분지뚱 잇차띠', translation: '아이는 밥을 먹기를(bhuñjituṃ) 원한다.', highlight: ['bhuñjituṃ', 'icchati'], note: 'bhuñjituṃ = 먹을/먹기를 (부정사)\nicchati = 원하다' },
  { type: 'verse', pali: 'Samaṇo dhammaṃ desetuṃ vihāraṃ gacchati.', pronKo: '사마노 담망 데세뚱 위하-랑 갓차띠', translation: '사문은 법을 가르치기 위해(desetuṃ) 정사에 간다.', highlight: ['desetuṃ', 'dhammaṃ'], note: 'desetuṃ = 가르칠/가르치기 위해 (부정사)' },
  { type: 'verse', pali: 'Kumāro udakaṃ pātuṃ nadiṃ gacchati.', pronKo: '꾸마-로 우다깡 빠-뚱 나딩 갓차띠', translation: '소년은 물을 마시기 위해(pātuṃ) 강에 간다.', highlight: ['pātuṃ', 'udakaṃ'], note: 'pātuṃ = 마실 (불규칙 부정사: pā + tuṃ)' },
  { type: 'verse', pali: 'Kassako nagaraṃ gantuṃ ussahati.', pronKo: '깟사꼬 나가랑 간뚱 웃사하띠', translation: '농부는 도시에 가려고(gantuṃ) 노력한다.', highlight: ['gantuṃ', 'ussahati'], note: 'gantuṃ = 갈 (불규칙: gam + tuṃ)\nussahati = 노력하다' },

  // === 현재분사 문법 ===
  { type: 'teach-grammar', title: '현재분사 -nta/-māna — ~하면서, ~하는', example: 'pacati → pacanta / pacamāna (요리하면서)\ngacchati → gacchanta / gacchamāna (가면서)\nvasati → vasanta / vasamāna (살면서)\ndeseti → desenta / desemāna (가르치면서)', exampleKo: '어간 + nta 또는 māna', explanation: '현재분사는 동시 진행 동작을 표현합니다.\n두 형태가 있으며 의미 차이는 거의 없습니다.\n\n-nta형 (능동):\n• pac + anta → pacanta\n• gacch + anta → gacchanta\n\n-māna형 (중간태):\n• pac + amāna → pacamāna\n• gacch + amāna → gacchamāna\n\n현재분사는 형용사처럼 격변화합니다:\n주격 단수: -anto (남성)\n주격 복수: -antā (남성)\n목적격 단수: -antaṃ\n도구격 단수: -antena' },

  // === 현재분사 격변화 ===
  { type: 'teach-grammar', title: '현재분사 격변화 (-nta형)', example: '주격 단: gacchanto (가는 자가)\n주격 복: gacchantā (가는 자들이)\n목적격 단: gacchantaṃ (가는 자를)\n목적격 복: gacchante (가는 자들을)\n도구격 단: gacchantena (가는 자에 의해)', exampleKo: '남성 형용사처럼 격변화', explanation: '현재분사 -nta는 남성 -a형처럼 변화합니다.\n\n• 주격: -anto / -antā\n• 목적격: -antaṃ / -ante\n• 도구격: -antena / -antehi\n• 처소격: -ante / -antesu\n\n-māna형은 일반 -a형과 동일:\n• -māno / -mānā (주격)\n• -mānaṃ / -māne (목적격)\n\n경전 예: "āgacchantaṃ" = 오는 자를' },

  // === 현재분사 예문 ===
  { type: 'verse', pali: 'Magge gacchanto naro rukkhaṃ passati.', pronKo: '막게 갓찬또 나로 룩캉 빳사띠', translation: '길에서 가고 있는(gacchanto) 사람은 나무를 본다.', highlight: ['gacchanto', 'Magge'], note: 'gacchanto = 가고 있는 (현재분사 주격 단수)\nmagge = 길에서 (처소격)' },
  { type: 'verse', pali: 'Bhikkhū piṇḍāya carantā gāmaṃ pavisanti.', pronKo: '빅쿠- 삔다-야 짜란따- 가-망 빠위산띠', translation: '비구들은 탁발하며 다니면서(carantā) 마을에 들어간다.', highlight: ['carantā', 'piṇḍāya'], note: 'carantā = 다니면서 (현재분사 복수 주격)\npiṇḍāya = 탁발을 위해' },

  // === 새 단어: 중성명사 (11과) ===
  { type: 'teach', word: 'āpaṇa', pronKo: '아-빠나', meaning: '가게, 상점', icon: '🏪', grammar: '중성명사', baseForm: 'āpaṇa', formNote: '주격: āpaṇaṃ / āpaṇā,āpaṇāni\n처소격: āpaṇe (가게에서)' },
  { type: 'teach', word: 'puñña', pronKo: '뿐냐', meaning: '공덕, 선행', icon: '✨', grammar: '중성명사', baseForm: 'puñña', formNote: '주격: puññaṃ / puññā,puññāni', buddhism: 'puñña = 공덕. dāna(보시)·sīla(지계)·bhāvanā(수행)으로 쌓음' },
  { type: 'teach', word: 'pāpa', pronKo: '빠-빠', meaning: '악, 악업', icon: '👿', grammar: '중성명사', baseForm: 'pāpa', formNote: '주격: pāpaṃ / pāpā,pāpāni', buddhism: 'pāpa ↔ puñña (악 ↔ 공덕)\n"Sabbapāpassa akaraṇaṃ" = 모든 악을 짓지 말라' },
  { type: 'teach', word: 'kamma', pronKo: '깜마', meaning: '업, 행위', icon: '⚖️', grammar: '중성명사', baseForm: 'kamma', formNote: '주격: kammaṃ / kammā,kammāni', buddhism: 'kamma = 업(業). 의도적 행위\nkusala-kamma = 선업, akusala-kamma = 악업' },
  { type: 'teach', word: 'kusala', pronKo: '꾸살라', meaning: '선(善), 선한', icon: '👼', grammar: '중성명사 / 형용사', baseForm: 'kusala', formNote: '명사: kusalaṃ (선)\n형용사: kusala kamma (선업)', buddhism: 'kusala ↔ akusala (선 ↔ 불선)' },
  { type: 'teach', word: 'dhana', pronKo: '다나', meaning: '재산, 부', icon: '💰', grammar: '중성명사', baseForm: 'dhana', formNote: '주격: dhanaṃ / dhanā,dhanāni', buddhism: 'ariya-dhana = 성스러운 재산 (7가지)\nsaddhā, sīla, hirī, ottappa, suta, cāga, paññā' },
  { type: 'teach', word: 'paduma', pronKo: '빠두마', meaning: '연꽃', icon: '🪷', grammar: '중성명사', baseForm: 'paduma', formNote: '주격: padumaṃ / padumā,padumāni', buddhism: '연꽃 = 진흙에서 피나 더럽히지 않음\n깨달은 자의 상징' },
  { type: 'teach', word: 'sacca', pronKo: '삿짜', meaning: '진리, 진실', icon: '💎', grammar: '중성명사', baseForm: 'sacca', formNote: '주격: saccaṃ / saccā,saccāni', buddhism: 'cattāri ariya-saccāni = 사성제\n고·집·멸·도' },
  { type: 'teach', word: 'citta', pronKo: '찟따', meaning: '마음', icon: '🧠', grammar: '중성명사', baseForm: 'citta', formNote: '주격: cittaṃ / cittā,cittāni', buddhism: 'citta = 마음. 아비담마에서 89/121가지\ncittānupassanā = 마음관찰 (사념처 중 하나)' },
  { type: 'teach', word: 'pariyesati', pronKo: '빠리예사띠', meaning: '찾다, 구하다', icon: '🔍', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pariyesati', formNote: '복수: pariyesanti\npari + esati(구하다)' },
  { type: 'teach', word: 'ārabhati', pronKo: '아-라바띠', meaning: '시작하다', icon: '🚀', grammar: '동사 · 현재 3인칭 단수', baseForm: 'ārabhati', formNote: '복수: ārabhanti\nā + rabhati\nviriyārambha = 정진(精進)' },

  // === 연습문제 10과 (부정사) ===
  { type: 'quiz', question: '1. Dārako bhattaṃ bhuñjituṃ icchati.', options: ['아이는 밥을 먹기를 원한다', '아이는 밥을 요리하기를 원한다', '아이들은 밥을 먹기를 원한다', '아이는 밥을 먹고서 원한다'], answer: 0, hint: 'bhuñjituṃ=먹기를(부정사), icchati=원하다' },
  { type: 'quiz', question: '2. Kassako nagaraṃ gantuṃ ussahati.', options: ['농부는 도시에 가려고 노력한다', '농부는 도시에서 오려고 노력한다', '농부들은 도시에 가려고 노력한다', '농부는 마을에 가려고 노력한다'], answer: 0, hint: 'gantuṃ=갈(부정사), ussahati=노력하다' },
  { type: 'quiz', question: '3. Kumāro udakaṃ pātuṃ nadiṃ gacchati.', options: ['소년은 물을 마시려고 강에 간다', '소년은 물을 마시고 강에 간다', '소년들은 물을 마시려고 강에 간다', '소년은 물을 가져오려고 강에 간다'], answer: 0, hint: 'pātuṃ=마시려고(부정사), nadiṃ=강에(방향)' },
  { type: 'quiz', question: '4. Samaṇo dhammaṃ desetuṃ vihāraṃ gacchati.', options: ['사문은 법을 가르치기 위해 정사에 간다', '사문은 법을 듣기 위해 정사에 간다', '사문들은 법을 가르치기 위해 정사에 간다', '사문은 법을 가르치고서 정사에 간다'], answer: 0, hint: 'desetuṃ=가르치기 위해(부정사)' },
  { type: 'quiz', question: '5. Coro bhaṇḍaṃ corituṃ gehaṃ pavisati.', options: ['도둑은 물건을 훔치려고 집에 들어간다', '도둑은 물건을 훔치고서 집에 들어간다', '도둑들은 물건을 훔치려고 집에 들어간다', '도둑은 물건을 부수려고 집에 들어간다'], answer: 0, hint: 'corituṃ=훔치려고(부정사), pavisati=들어가다' },

  // === 연습문제 11과 (현재분사 + 중성명사) ===
  { type: 'quiz', question: '6. Magge gacchanto naro rukkhaṃ passati.', options: ['길에서 가고 있는 사람은 나무를 본다', '길에서 오고 있는 사람은 나무를 본다', '길에서 가고 있는 사람들은 나무를 본다', '길에서 가고 있는 사람은 꽃을 본다'], answer: 0, hint: 'gacchanto=가고 있는(현재분사 주격 단수)' },
  { type: 'quiz', question: '7. Dānaṃ dadāmānā manussā sagge uppajjanti.', options: ['보시하면서 사람들은 천상에 태어난다', '보시하고서 사람들은 천상에 태어난다', '보시하면서 사람은 천상에 태어난다', '보시하면서 사람들은 지상에 태어난다'], answer: 0, hint: 'dadāmānā=주면서(현재분사 복수), sagge=천상에' },
  { type: 'quiz', question: '8. Bhikkhū piṇḍāya carantā gāmaṃ pavisanti.', options: ['비구들은 탁발하며 다니면서 마을에 들어간다', '비구는 탁발하며 다니면서 마을에 들어간다', '비구들은 탁발하며 다니고서 마을에 들어간다', '비구들은 탁발하며 다니면서 도시에 들어간다'], answer: 0, hint: 'carantā=다니면서(현재분사 복수), piṇḍāya=탁발을 위해' },
  { type: 'quiz', question: '9. Kumāro rodamāno mātaraṃ oloketi.', options: ['소년은 울면서 어머니를 바라본다', '소년은 울고서 어머니를 바라본다', '소년들은 울면서 어머니를 바라본다', '소년은 웃으면서 어머니를 바라본다'], answer: 0, hint: 'rodamāno=울면서(현재분사 -māna형)' },
  { type: 'quiz', question: '10. Kassako khette kammaṃ karonto gāyati.', options: ['농부는 밭에서 일하면서 노래한다', '농부는 밭에서 일하고서 노래한다', '농부들은 밭에서 일하면서 노래한다', '농부는 밭에서 일하면서 운다'], answer: 0, hint: 'karonto=하면서(현재분사), kammaṃ=일을/업을' },

  // === 추가 연습 (중성명사 + 부정사/현재분사 혼합) ===
  { type: 'quiz', question: '11. Manusso puññaṃ kātuṃ dānaṃ deti.', options: ['사람은 공덕을 짓기 위해 보시를 행한다', '사람은 공덕을 짓고서 보시를 행한다', '사람들은 공덕을 짓기 위해 보시를 행한다', '사람은 악을 짓기 위해 보시를 행한다'], answer: 0, hint: 'kātuṃ=하기 위해(부정사), puññaṃ=공덕을' },
  { type: 'quiz', question: '12. Paṇḍito saccaṃ pariyesanto dhammaṃ suṇāti.', options: ['현자는 진리를 구하면서 법을 듣는다', '현자는 진리를 구하고서 법을 듣는다', '현자들은 진리를 구하면서 법을 듣는다', '현자는 진리를 구하면서 법을 가르친다'], answer: 0, hint: 'pariyesanto=구하면서(현재분사), saccaṃ=진리를' },
  { type: 'quiz', question: '13. Upāsako kusalaṃ kammaṃ karoti.', options: ['우바새는 선한 업을 짓는다', '우바새는 악한 업을 짓는다', '우바새들은 선한 업을 짓는다', '우바새는 선한 업을 버린다'], answer: 0, hint: 'kusalaṃ=선한(형용사), kammaṃ=업을(중성 목적격)' },
  { type: 'quiz', question: '14. Coro dhanaṃ pariyesanto pāpaṃ karoti.', options: ['도둑은 재산을 구하면서 악을 짓는다', '도둑은 재산을 구하고서 악을 짓는다', '도둑들은 재산을 구하면서 악을 짓는다', '도둑은 재산을 구하면서 선을 짓는다'], answer: 0, hint: 'pariyesanto=구하면서, pāpaṃ=악을' },
  { type: 'quiz', question: '15. Bhikkhū vihāre vasantā cittaṃ bhāventi.', options: ['비구들은 정사에서 살면서 마음을 계발한다', '비구는 정사에서 살면서 마음을 계발한다', '비구들은 정사에서 살고서 마음을 계발한다', '비구들은 숲에서 살면서 마음을 계발한다'], answer: 0, hint: 'vasantā=살면서(현재분사 복수), cittaṃ=마음을' },
  { type: 'quiz', question: '16. Padumāni udake phalanti.', options: ['연꽃들은 물에서 열매 맺는다', '연꽃은 물에서 열매 맺는다', '연꽃들은 물에서 자란다', '연꽃들은 땅에서 열매 맺는다'], answer: 0, hint: 'padumāni=연꽃들(중성 복수 주격), udake=물에서' },
  { type: 'quiz', question: '17. Dārako āpaṇaṃ gantuṃ icchati.', options: ['아이는 가게에 가기를 원한다', '아이는 가게에서 오기를 원한다', '아이들은 가게에 가기를 원한다', '아이는 가게에 가고서 원한다'], answer: 0, hint: 'āpaṇaṃ=가게에(방향), gantuṃ=가기를(부정사)' },
  { type: 'quiz', question: '18. Samaṇo kammaṃ ārabhanto vīriyaṃ karoti.', options: ['사문은 일을 시작하면서 정진한다', '사문은 일을 시작하고서 정진한다', '사문들은 일을 시작하면서 정진한다', '사문은 일을 끝내면서 정진한다'], answer: 0, hint: 'ārabhanto=시작하면서(현재분사), vīriyaṃ=정진을' },
  { type: 'quiz', question: '19. Pāpaṃ akusalaṃ hoti.', options: ['악은 불선하다', '선은 불선하다', '악은 선하다', '공덕은 불선하다'], answer: 0, hint: 'pāpaṃ=악(중성), akusalaṃ=불선한, hoti=~이다' },
  { type: 'quiz', question: '20. Paṇḍitā saccaṃ jānituṃ ussahanti.', options: ['현자들은 진리를 알려고 노력한다', '현자는 진리를 알려고 노력한다', '현자들은 진리를 알고서 노력한다', '현자들은 진리를 가르치려고 노력한다'], answer: 0, hint: 'jānituṃ=알기를(부정사), ussahanti=노력하다(복수)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Dānaṃ dadāmānā sagge uppajjanti', pronKo: '다-낭 다다-마-나- 삭게 웁빠잔띠' },
]
