// 9과: 절대분사 (Absolutive) — ~하고서, ~한 뒤에
// -(i)tvā / -ya 형태, 불규칙 동사 절대분사
import type { StepWithoutId } from './types'

export const LESSON_09: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '9과: 절대분사 (Absolutive)', subtitle: 'Tvā-paccaya / Ya-paccaya', description: '절대분사: ~하고서, ~한 뒤에\n-(i)tvā 규칙과 -ya 형태\n불규칙 동사 절대분사\n\n"먼저 하고 → 다음 동작"\n경전에서 매우 자주 등장!', icon: '🔗' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Atha kho āyasmā mahāmoggallāno Bhagavantaṃ vanditvā padakkhiṇaṃ katvā pakkāmi.', pronKo: '아타 코 아-야스마- 마하-목갈라-노 바가완땅 완디뜨와- 빠닥키낭 깟뜨와- 빡까-미', translation: '그때 존자 마하목갈라나는 세존께 예배하고서(vanditvā), 오른쪽으로 도는 예를 행하고서(katvā) 떠나갔다.', highlight: ['vanditvā', 'katvā', 'pakkāmi'], note: 'vanditvā = vandati(예배하다)의 절대분사\nkatvā = karoti(하다)의 불규칙 절대분사\npadakkhiṇaṃ katvā = 오른쪽으로 도는 예를 행하다\npakkāmi = pakkamati(떠나다)의 과거형\n※ 두 개의 절대분사가 연속으로 사용됨' },

  // === -itvā 규칙 ===
  { type: 'teach-grammar', title: '절대분사 -(i)tvā 규칙', example: '-ati → -itvā: pacati → pacitvā (요리하고서)\n-āti → -itvā: khādāti → khāditvā (먹고서)\n-oti → -itvā: karoti → karitvā (하고서)', exampleKo: '어간 + itvā = ~하고서', explanation: '절대분사는 "~하고서, ~한 뒤에"를 뜻합니다.\n주절 동사보다 먼저 일어난 동작을 표현합니다.\n\n기본 규칙:\n• -ati 어미 동사 → 어간 + itvā\n• pacati(요리하다) → pacitvā\n• vasati(살다) → vasitvā\n• rakkhati(지키다) → rakkhitvā\n\n어간이 짧은 동사는 -tvā만:\n• gantvā(가고서), hantvā(죽이고서)' },

  // === -etvā 규칙 ===
  { type: 'teach-grammar', title: '-eti 동사 → -etvā', example: '-eti → -etvā: deseti → desetvā (가르치고서)\ncinteti → cintetvā (생각하고서)\npūjeti → pūjetvā (공경하고서)', exampleKo: '-e 어간은 -etvā', explanation: '-eti로 끝나는 동사(제7류)는\n어간의 -e를 유지하고 -tvā를 붙입니다.\n\n• deseti(가르치다) → desetvā\n• cinteti(생각하다) → cintetvā\n• katheti(말하다) → kathetvā\n• pūjeti(공경하다) → pūjetvā' },

  // === -ya 형태 ===
  { type: 'teach-grammar', title: '접두사 동사 → -ya 형태', example: 'āgacchati → āgamma (와서)\nādadāti → ādāya (가지고)\nāruhati → āruyha (오르고서)\noruhati → oruyha (내려와서)', exampleKo: '접두사 + 어근 + ya', explanation: '접두사(ā-, upa-, vi- 등)가 있는 동사는\n-ya 형태의 절대분사를 취하는 경우가 많습니다.\n\n• āgamma (← ā + gam + ya) = 와서\n• ādāya (← ā + dā + ya) = 가지고\n• āruyha (← ā + ruh + ya) = 오르고서\n• oruyha (← o + ruh + ya) = 내려와서\n• paṭicca (← paṭi + i + ya) = 의지하여\n• samādāya (← sam + ā + dā + ya) = 받아들여' },

  // === 불규칙 절대분사 ===
  { type: 'teach-grammar', title: '주의할 불규칙 절대분사', example: 'bhuñjati → bhuñjitvā / bhutvā (먹고서)\nāgacchati → āgantvā / āgamma (와서)\nhanati → hanitvā / hantvā (죽이고서)\ndadāti → daditvā / datvā (주고서)\npassati → passitvā / disvā (보고서)\nuṭṭhahati → uṭṭhahitvā / uṭṭhāya (일어나서)', exampleKo: '두 형태 모두 사용 가능', explanation: '많은 동사가 규칙형과 불규칙형 두 가지를 가집니다.\n경전에서는 짧은 형태가 더 자주 쓰입니다.\n\n특히 자주 나오는 것:\n• disvā (보고서) — passati의 절대분사\n• sutvā (듣고서) — suṇāti의 절대분사\n• ñatvā (알고서) — jānāti의 절대분사\n• gantvā (가고서) — gacchati의 절대분사\n• āgamma (와서) — āgacchati의 절대분사' },

  // === 핵심 단어 ===
  { type: 'teach', word: 'pacitvā', pronKo: '빠찌뜨와-', meaning: '요리하고서', icon: '🍳', grammar: '절대분사', baseForm: 'pacati → pacitvā', formNote: '규칙: -ati → -itvā' },
  { type: 'teach', word: 'khāditvā', pronKo: '카-디뜨와-', meaning: '먹고서, 씹고서', icon: '🦷', grammar: '절대분사', baseForm: 'khādati → khāditvā', formNote: '규칙: -ati → -itvā' },
  { type: 'teach', word: 'gantvā', pronKo: '간뜨와-', meaning: '가고서', icon: '🚶', grammar: '절대분사', baseForm: 'gacchati → gantvā', formNote: '불규칙: gam + tvā\n어간 gam- 사용' },
  { type: 'teach', word: 'disvā', pronKo: '디스와-', meaning: '보고서', icon: '👁️', grammar: '절대분사', baseForm: 'passati → disvā', formNote: '불규칙: dis + vā\npasstitvā도 가능하나 disvā가 일반적' },
  { type: 'teach', word: 'sutvā', pronKo: '숫뜨와-', meaning: '듣고서', icon: '👂', grammar: '절대분사', baseForm: 'suṇāti → sutvā', formNote: '불규칙: su + tvā\nsuṇitvā도 가능' },
  { type: 'teach', word: 'āgamma', pronKo: '아-감마', meaning: '와서, 도착하고서', icon: '🏃', grammar: '절대분사(-ya형)', baseForm: 'āgacchati → āgamma', formNote: 'ā + gam + ya → āgamma\nāgantvā도 가능' },
  { type: 'teach', word: 'ādāya', pronKo: '아-다-야', meaning: '가지고서, 취하여', icon: '🤲', grammar: '절대분사(-ya형)', baseForm: 'ādadāti → ādāya', formNote: 'ā + dā + ya → ādāya' },
  { type: 'teach', word: 'āruyha', pronKo: '아-룻야', meaning: '오르고서', icon: '⬆️', grammar: '절대분사(-ya형)', baseForm: 'āruhati → āruyha', formNote: 'ā + ruh + ya → āruyha' },
  { type: 'teach', word: 'yācitvā', pronKo: '야-찌뜨와-', meaning: '구걸하고서, 청하고서', icon: '🙏', grammar: '절대분사', baseForm: 'yācati → yācitvā', formNote: '규칙: -ati → -itvā' },
  { type: 'teach', word: 'vandati', pronKo: '완다띠', meaning: '예배하다, 절하다', icon: '🙇', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vandati', formNote: '복수: vandanti\nvandana = 예배, 경배' },

  // === 교재 예문 ===
  { type: 'verse', pali: 'Kassako khettamhā āgantvā bhattaṃ bhuñjati.', pronKo: '깟사꼬 켓땀하- 아-간뜨와- 밧땅 분자띠', translation: '농부는 밭에서 돌아와서(āgantvā) 밥을 먹는다.', highlight: ['āgantvā', 'khettamhā', 'bhattaṃ'], note: 'āgantvā = 와서 (절대분사)\nkhettamhā = 밭에서 (탈격)\nbhattaṃ = 밥을 (목적격)' },
  { type: 'verse', pali: 'Vānarā rukkhaṃ āruyha phalāni khādanti.', pronKo: '와-나라- 룩캉 아-룻야 팔라-니 카-단띠', translation: '원숭이들은 나무에 올라서(āruyha) 과일들을 먹는다.', highlight: ['āruyha', 'rukkhaṃ', 'phalāni'], note: 'āruyha = 올라서 (-ya형 절대분사)\nrukkhaṃ = 나무를 (방향의 목적격)' },
  { type: 'verse', pali: 'Dārako bhattaṃ yācitvā rodati.', pronKo: '다-라꼬 밧땅 야-찌뜨와- 로다띠', translation: '아이는 밥을 구걸하고서(yācitvā) 운다.', highlight: ['yācitvā', 'bhattaṃ', 'rodati'], note: 'yācitvā = 구걸하고서 (절대분사)\nrodati = 울다' },
  { type: 'verse', pali: 'Samaṇo Buddhaṃ passitvā vandati.', pronKo: '사마노 붓당 빳씻뜨와- 완다띠', translation: '사문은 부처님을 보고서(passitvā) 예배한다.', highlight: ['passitvā', 'Buddhaṃ', 'vandati'], note: 'passitvā = 보고서 (disvā와 동의)\nvandati = 예배하다' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Kassako khettamhā āgantvā bhattaṃ bhuñjati.', options: ['농부는 밭에서 와서 밥을 먹는다', '농부는 밭으로 가서 밥을 먹는다', '농부들은 밭에서 와서 밥을 먹는다', '농부는 밭에서 와서 밥을 짓는다'], answer: 0, hint: 'āgantvā=와서(절대분사), khettamhā=밭에서(탈격)' },
  { type: 'quiz', question: '2. Vānarā rukkhaṃ āruyha phalāni khādanti.', options: ['원숭이들은 나무에 올라 과일들을 먹는다', '원숭이는 나무에 올라 과일을 먹는다', '원숭이들은 나무에서 내려와 과일들을 먹는다', '원숭이들은 나무에 올라 나뭇잎들을 먹는다'], answer: 0, hint: 'āruyha=올라서, phalāni=과일들을(복수)' },
  { type: 'quiz', question: '3. Dārako bhattaṃ yācitvā rodati.', options: ['아이는 밥을 구걸하고서 운다', '아이는 밥을 먹고서 운다', '아이들은 밥을 구걸하고서 운다', '아이는 밥을 구걸하고서 웃는다'], answer: 0, hint: 'yācitvā=구걸하고서, rodati=울다' },
  { type: 'quiz', question: '4. Samaṇo Buddhaṃ passitvā vandati.', options: ['사문은 부처님을 보고서 예배한다', '사문은 부처님을 보고서 가르친다', '사문들은 부처님을 보고서 예배한다', '사문은 부처님을 듣고서 예배한다'], answer: 0, hint: 'passitvā=보고서(절대분사), vandati=예배하다' },
  { type: 'quiz', question: '5. Coro gehaṃ pavisitvā bhaṇḍaṃ coreti.', options: ['도둑은 집에 들어가서 물건을 훔친다', '도둑은 집에서 나와서 물건을 훔친다', '도둑들은 집에 들어가서 물건을 훔친다', '도둑은 집에 들어가서 물건을 부순다'], answer: 0, hint: 'pavisitvā=들어가서, coreti=훔치다' },
  { type: 'quiz', question: '6. Kumāro rukkhamhā oruyha gehaṃ dhāvati.', options: ['소년은 나무에서 내려와서 집으로 달린다', '소년은 나무에 올라서 집으로 달린다', '소년들은 나무에서 내려와서 집으로 달린다', '소년은 나무에서 내려와서 숲으로 달린다'], answer: 0, hint: 'oruyha=내려와서(-ya형), gehaṃ=집으로(방향)' },
  { type: 'quiz', question: '7. Upāsako pupphaṃ ādāya vihāraṃ gacchati.', options: ['우바새는 꽃을 가지고 정사에 간다', '우바새는 꽃을 버리고 정사에 간다', '우바새들은 꽃을 가지고 정사에 간다', '우바새는 과일을 가지고 정사에 간다'], answer: 0, hint: 'ādāya=가지고서(-ya형), vihāraṃ=정사로(방향)' },
  { type: 'quiz', question: '8. Brāhmaṇo Buddhaṃ disvā dhammaṃ suṇāti.', options: ['바라문은 부처님을 보고서 법을 듣는다', '바라문은 부처님을 보고서 법을 가르친다', '바라문들은 부처님을 보고서 법을 듣는다', '바라문은 부처님을 듣고서 법을 본다'], answer: 0, hint: 'disvā=보고서(불규칙), suṇāti=듣다' },
  { type: 'quiz', question: '9. Mātā bhattaṃ pacitvā puttānaṃ deti.', options: ['어머니는 밥을 요리하고서 아들들에게 준다', '어머니는 밥을 요리하고서 아들에게 준다', '어머니는 밥을 먹고서 아들들에게 준다', '아버지는 밥을 요리하고서 아들들에게 준다'], answer: 0, hint: 'pacitvā=요리하고서, puttānaṃ=아들들에게(여격)' },
  { type: 'quiz', question: '10. Bhikkhū āsanamhā uṭṭhāya Buddhaṃ vandanti.', options: ['비구들은 자리에서 일어나서 부처님께 예배한다', '비구는 자리에서 일어나서 부처님께 예배한다', '비구들은 자리에 앉아서 부처님께 예배한다', '비구들은 자리에서 일어나서 법을 듣는다'], answer: 0, hint: 'uṭṭhāya=일어나서(-ya형), āsanamhā=자리에서(탈격)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Bhagavantaṃ vanditvā padakkhiṇaṃ katvā pakkāmi', pronKo: '바가완땅 완디뜨와- 빠닥키낭 깟뜨와- 빡까-미' },
]
