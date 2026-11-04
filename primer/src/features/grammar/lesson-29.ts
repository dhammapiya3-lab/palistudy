// 32과: 관계·지시·의문 대명사 + 대명사적 부사
import type { StepWithoutId } from './types'

export const LESSON_29: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '32과: 관계·지시·의문 대명사', subtitle: 'yo / so / ko + sabbanāma-kiriyāvisesana', description: '관계대명사: yo (…하는 자)\n지시대명사: so (그)\n의문대명사: ko (누구)\n\n+ 불변화사 ci (어떤~)\n+ 대명사적 부사 대조표', icon: '🔗' },

  // === 관계대명사 yo 격변화 (남성) ===
  { type: 'teach-grammar', title: '관계대명사 남성 격변화 (yo)', example: '       단수      복수\n주격: yo        ye\n목적격: yaṃ      ye\n도구격: yena      yehi\n여격: yassa     yesaṃ,yesānaṃ\n탈격: yasmā,yamhā  yehi\n소유격: yassa    yesaṃ,yesānaṃ\n처소격: yasmiṃ,yamhi  yesu\n호격: —         —', exampleKo: 'yo = …하는 그 자, …하는 바의', explanation: '관계대명사 yo는 뒤에 오는 지시대명사 so와 쌍으로 사용:\n• yo … so … = …하는 그 자는 …하다\n• yaṃ … taṃ … = …하는 그것은 …하다\n\n남성·중성·여성 3성 변화' },

  // === 관계대명사 중성/여성 ===
  { type: 'teach-grammar', title: '관계대명사 중성·여성 격변화', example: '【중성】\n주격: yaṃ / ye,yāni\n목적격: yaṃ / ye,yāni\n(나머지 남성과 동일)\n\n【여성】\n주격: yā / yā,yāyo\n목적격: yaṃ / yā,yāyo\n도구격: yāya / yāhi\n여격: yāya,yassā / yāsaṃ,yāsānaṃ\n탈격: yāya / yāhi\n소유격: yāya,yassā / yāsaṃ,yāsānaṃ\n처소격: yāyaṃ,yassaṃ / yāsu', exampleKo: '중성: 주·목적격만 다름 (yaṃ/yāni)\n여성: yā- 어간', explanation: '중성: 남성과 거의 동일, 주·목적격만 yaṃ/yāni\n여성: -ā 여성명사 패턴과 유사\n• yāya = 구·여·탈·소유격 단수 공통' },

  // === 지시대명사 so 격변화 (남성) ===
  { type: 'teach-grammar', title: '지시대명사 남성 격변화 (so 그)', example: '       단수      복수\n주격: so        te\n목적격: taṃ      te\n도구격: tena      tehi\n여격: tassa     tesaṃ,tesānaṃ\n탈격: tasmā,tamhā  tehi\n소유격: tassa    tesaṃ,tesānaṃ\n처소격: tasmiṃ,tamhi  tesu\n호격: —         —', exampleKo: 'so = 그(남성 단수), te = 그들(복수)', explanation: '지시대명사 so는 관계대명사 yo와 구조 대응:\n• yo → so (y- → s-/t-)\n• yaṃ → taṃ, yena → tena\n• yassa → tassa, yesu → tesu\n\n주의: te(그들)와 te(너에게) 구분은 문맥으로!' },

  // === 지시대명사 중성/여성 ===
  { type: 'teach-grammar', title: '지시대명사 중성·여성 격변화', example: '【중성】\n주격: taṃ / te,tāni\n목적격: taṃ / te,tāni\n(나머지 남성과 동일)\n\n【여성】\n주격: sā / tā,tāyo\n목적격: taṃ / tā,tāyo\n도구격: tāya / tāhi\n여격: tāya,tassā / tāsaṃ,tāsānaṃ\n탈격: tāya / tāhi\n소유격: tāya,tassā / tāsaṃ,tāsānaṃ\n처소격: tāyaṃ,tassaṃ / tāsu', exampleKo: '여성 주격: sā(그녀), 복수: tā(그녀들)', explanation: '여성 지시대명사:\n• sā = 그녀 (주격 단수만 특수)\n• 나머지: tā- 어간 + 관계대명사 yā-와 동일 패턴' },

  // === 의문대명사 ko 격변화 ===
  { type: 'teach-grammar', title: '의문대명사 격변화 (ko 누구)', example: '【남성】\n주격: ko / ke\n목적격: kaṃ / ke\n도구격: kena / kehi\n여격: kassa,kissa / kesaṃ,kesānaṃ\n탈격: kasmā,kamhā / kehi\n소유격: kassa,kissa / kesaṃ\n처소격: kasmiṃ,kamhi / kesu\n\n【중성】주·목적: kiṃ / ke,kāni\n【여성】주격: kā / kā,kāyo', exampleKo: 'ko = 누구(남성), kā = 누구(여성), kiṃ = 무엇(중성)', explanation: '의문대명사 ko도 yo/so와 동일 구조:\n• yo → so → ko (y- → t- → k-)\n• yassa → tassa → kassa\n• yasmiṃ → tasmiṃ → kasmiṃ\n\n3대명사 어간 대응: y- / t-(s-) / k-' },

  // === 3대명사 대조 ===
  { type: 'teach-grammar', title: '관계·지시·의문 대명사 대조 (남성 단수)', example: '       관계(yo)  지시(so)  의문(ko)\n주격: yo       so       ko\n목적: yaṃ      taṃ      kaṃ\n도구격: yena     tena     kena\n여격: yassa    tassa    kassa\n탈격: yasmā    tasmā    kasmā\n소유: yassa    tassa    kassa\n처소: yasmiṃ   tasmiṃ   kasmiṃ', exampleKo: 'y- / t-(s-) / k- 규칙적 대응', explanation: '어간만 바꾸면 3대명사 완성!\ny- → t- → k-\n\n예: yena maggena → tena maggena\n(어떤 길로 → 그 길로)' },

  // === 불변화사 ci ===
  { type: 'teach-grammar', title: '불변화사 ci — 부정(不定)대명사', example: 'ko + ci → koci puriso (어떤 사람)\nkiṃ + ci → kiñci phalaṃ (어떤 과일)\nkā + ci → kāci itthī (어떤 여자)\nkaṃ + ci → kañci purisaṃ (어떤 사람을)\nkassa + ci → kassaci (어떤 이의)', exampleKo: 'ci를 붙이면 "어떤~, 누군가"의 뜻', explanation: '의문대명사 + ci = 부정대명사:\n• koci = 누군가 (ko + ci)\n• kiñci = 무언가 (kiṃ + ci, ṃ→ñ 비음동화)\n• kāci = 어떤 여자 (kā + ci)\n\nci는 모든 격에 붙을 수 있음' },

  // === 대명사적 부사 대조표 ===
  { type: 'teach-grammar', title: '대명사적 부사 대조표', example: '의미      관계    지시    의문\n어디에:   yattha  tattha  kattha\n어디로부터: yato   tato    kuto\n어떻게:   yathā   tathā   kathaṃ\n왜:      yasmā   tasmā   kasmā\n언제:     yadā    tadā    kadā', exampleKo: '관계(y-) / 지시(t-) / 의문(k-) 규칙 동일', explanation: '부사도 y-/t-/k- 대응:\n• yattha tattha kattha (어디에)\n  → "yattha Bhagavā, tattha gacchāmi"\n  (세존 계신 곳에, 거기로 나는 간다)\n\n• yathā tathā kathaṃ (어떻게)\n• yasmā tasmā kasmā (왜/그러므로)' },

  // === 예문 12개 (교재 32과 + quiz 변환) ===
  { type: 'quiz', question: '1. Yo atthaññū hoti so paṇḍito.', options: ['이치를 아는 자, 그가 현자이다', '현자는 이치를 안다', '그는 이치를 아는 현자이다', '현자가 되고자 하는 자는 이치를 안다'], answer: 0, hint: 'yo…so = …하는 그 자는, atthaññū = 이치를 아는' },
  { type: 'quiz', question: '2. Yaṃ ahaṃ ākaṅkhamāno āsiṃ taṃ me paripūraṃ ahosi.', options: ['내가 소망하고 있었던 것, 그것이 나에게 성취되었다', '나는 소망한 것을 모두 가졌다', '그것을 내가 소망했으므로 성취되었다', '성취된 것이 나의 소망이었다'], answer: 0, hint: 'yaṃ…taṃ = …하는 것, 그것은, ākaṅkhamāno = 소망하면서' },
  { type: 'quiz', question: '3. Yena maggena āgato tena maggena gaccha.', options: ['어떤 길로 왔든, 그 길로 가라', '그 길로 가서 다시 오라', '길을 따라 오고 가라', '왔던 그 길은 가는 길이 아니다'], answer: 0, hint: 'yena…tena = 어떤~으로…그~으로, maggena = 길로' },
  { type: 'quiz', question: '4. Ko taṃ jānāti?', options: ['누가 그것을 아는가?', '그것을 어떻게 아는가?', '무엇을 아는가?', '그는 누구를 아는가?'], answer: 0, hint: 'ko = 누가, taṃ = 그것을, jānāti = 안다' },
  { type: 'quiz', question: '5. Kiṃ tvaṃ icchasi?', options: ['너는 ~이다 무엇을 원하느냐?', '누가 너를 원하느냐?', '너는 ~이다 왜 원하느냐?', '무엇이 너를 원하느냐?'], answer: 0, hint: 'kiṃ = 무엇을, tvaṃ = 너, icchasi = 원하다' },
  { type: 'quiz', question: '6. Yattha Bhagavā viharati tattha gacchāmi.', options: ['세존 계신 곳에 나는 간다', '나는 세존과 함께 머문다', '세존이 가시는 곳에 나도 머문다', '거기서 세존이 머무신다'], answer: 0, hint: 'yattha…tattha = 어디에…거기에' },
  { type: 'quiz', question: '7. Koci puriso āgacchati.', options: ['어떤 사람이든 온다', '누가 오는가?', '그 사람이 온다', '사람들이 온다'], answer: 0, hint: 'koci = 어떤, ko+ci = 부정대명사' },
  { type: 'quiz', question: '8. Yathā Bhagavā dhammaṃ deseti tathā paṭipajjatha.', options: ['세존께서 법을 가르치시는 대로 그렇게 실천하라', '세존의 법을 가르치고 처신하라', '법대로 세존께 나아가라', '그렇게 법을 설하시는 세존이시다'], answer: 0, hint: 'yathā…tathā = …하는 대로…그렇게' },
  { type: 'quiz', question: '9. Yasmā so dhammaṃ jānāti tasmā paṇḍito.', options: ['그가 법을 알기 때문에 현자이다', '현자이므로 법을 안다', '법을 알면 현자가 될 것이다', '현자는 왜 법을 아는가'], answer: 0, hint: 'yasmā…tasmā = …때문에…그러므로' },
  { type: 'quiz', question: '10. Yadā so āgacchati tadā mayaṃ pūjessāma.', options: ['그가 올 때 우리는 공양할 것이다', '우리가 공양할 때 그가 올 것이다', '그가 왔으므로 우리는 공양했다', '언제 그가 오는가 우리가 공양하려 한다'], answer: 0, hint: 'yadā…tadā = …할 때…그때' },
  { type: 'quiz', question: '11. Kassaci dosaṃ na kareyya.', options: ['누구에게도 해를 끼치지 말아야 한다', '어떤 허물도 짓지 말라', '그의 잘못을 하지 마라', '누군가가 해를 끼쳤다'], answer: 0, hint: 'kassaci = 누구에게도(kassa+ci), na = 아니다' },
  { type: 'quiz', question: '12. Kuto āgato asi?', options: ['어디서 왔느냐?', '왜 왔느냐?', '언제 왔느냐?', '누구와 왔느냐?'], answer: 0, hint: 'kuto = 어디로부터, āgato = 온, asi = 너는 ~이다(2인칭)' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Yathā Bhagavā dhammaṃ deseti,\ntathā tumhehi paṭipajjitabbaṃ.', pronKo: '야타- 바가와- 담망 데세띠,\n따타- 뚬헤히 빠띠빳지땁방.', translation: '세존께서 법을 가르치신 대로\n그처럼 당신들은 실천해야 한다.', highlight: ['Yathā', 'tathā', 'tumhehi'], note: 'yathā…tathā = …하는 대로…그렇게\ntumhehi = 너희에 의해 (도구격, 수동문)\npaṭipajjitabbaṃ = 실천되어야 할 것 (미래수동분사)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Yathā Bhagavā dhammaṃ deseti tathā paṭipajjatha', pronKo: '야타- 바가와- 담망 데세띠 따타- 빠띠빳자타' },
]
