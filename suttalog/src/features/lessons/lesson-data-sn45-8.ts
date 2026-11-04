// 5과: 도분별경 (Vibhaṅga Sutta, SN 45.8) — text/제5과. 도 분별경.txt 전문 기반
import type { StepType } from './lesson-data-sn56-11'

const V1 = '"Ariyaṃ vo, bhikkhave, aṭṭhaṅgikaṃ maggaṃ desessāmi vibhajissāmi. Taṃ suṇātha, sādhukaṃ manasi karotha; bhāsissāmī"ti.'
const V1K = '"비구들이여, 나는 그대들에게 성스러운 팔정도를 설하고 분석하겠다. 그것을 들으라, 잘 새겨라; 나는 말하겠다."'

const V_OPEN = '"Evaṃ, bhante"ti kho te bhikkhū bhagavato paccassosuṃ. Bhagavā etadavoca —'
const V_OPENK = '"예, 세존이시여" 하고 비구들이 세존께 응답하였다. 세존께서 이렇게 말씀하셨다 —'

const V2 = '"Katamo ca, bhikkhave, ariyo aṭṭhaṅgiko maggo? Seyyathidaṃ — sammādiṭṭhi, sammāsaṅkappo, sammāvācā, sammākammanto, sammāājīvo, sammāvāyāmo, sammāsati, sammāsamādhi."'
const V2K = '"비구들이여, 성스러운 팔정도란 무엇인가? 곧 — 정견·정사유·정어·정업·정명·정정진·정념·정정이다."'

const V3 = '"Katamā ca, bhikkhave, sammādiṭṭhi? Yaṃ kho, bhikkhave, dukkhe ñāṇaṃ, dukkhasamudaye ñāṇaṃ, dukkhanirodhe ñāṇaṃ, dukkhanirodhagāminiyā paṭipadāya ñāṇaṃ — ayaṃ vuccati, bhikkhave, sammādiṭṭhi."'
const V3K = '"비구들이여, 정견이란 무엇인가? 괴로움에 대한 앎, 괴로움의 일어남에 대한 앎, 괴로움의 소멸에 대한 앎, 괴로움의 소멸로 이끄는 길에 대한 앎 — 이것을 정견이라 한다."'

const V4 = '"Katamo ca, bhikkhave, sammāsaṅkappo? Yo kho, bhikkhave, nekkhammasaṅkappo, abyāpādasaṅkappo, avihiṃsāsaṅkappo — ayaṃ vuccati, bhikkhave, sammāsaṅkappo."'
const V4K = '"비구들이여, 정사유란 무엇인가? 출리의 사유, 악의 없음의 사유, 해치지 않음의 사유 — 이것을 정사유라 한다."'

const V5 = '"Katamā ca, bhikkhave, sammāvācā? Yā kho, bhikkhave, musāvādā veramaṇī, pisuṇāya vācāya veramaṇī, pharusāya vācāya veramaṇī, samphappalāpā veramaṇī — ayaṃ vuccati, bhikkhave, sammāvācā."'
const V5K = '"비구들이여, 정어란 무엇인가? 거짓말을 삼가는 것, 이간하는 말을 삼가는 것, 거친 말을 삼가는 것, 잡담을 삼가는 것 — 이것을 정어라 한다."'

const V6 = '"Katamo ca, bhikkhave, sammākammanto? Yā kho, bhikkhave, pāṇātipātā veramaṇī, adinnādānā veramaṇī, abrahmacariyā veramaṇī — ayaṃ vuccati, bhikkhave, sammākammanto."'
const V6K = '"비구들이여, 정업이란 무엇인가? 살생을 삼가는 것, 도둑질을 삼가는 것, 범행 아닌 것(음행)을 삼가는 것 — 이것을 정업이라 한다."'

const V7 = '"Katamo ca, bhikkhave, sammāājīvo? Idha, bhikkhave, ariyasāvako micchāājīvaṃ pahāya sammāājīvena jīvitaṃ kappeti — ayaṃ vuccati, bhikkhave, sammāājīvo."'
const V7K = '"비구들이여, 정명이란 무엇인가? 여기 성스러운 제자가 그릇된 생계를 버리고 바른 생계로 생활을 영위한다 — 이것을 정명이라 한다."'

const V8 = '"Katamo ca, bhikkhave, sammāvāyāmo? Idha, bhikkhave, bhikkhu anuppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ anuppādāya chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati; uppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ pahānāya...; anuppannānaṃ kusalānaṃ dhammānaṃ uppādāya...; uppannānaṃ kusalānaṃ dhammānaṃ ṭhitiyā asammosāya bhiyyobhāvāya vepullāya bhāvanāya pāripūriyā chandaṃ janeti... — ayaṃ vuccati, bhikkhave, sammāvāyāmo."'
const V8K = '"비구들이여, 정정진이란 무엇인가? 여기 비구는 ① 일어나지 않은 악·불선법이 일어나지 않게 의욕을 일으키고 노력하고 정진하며 마음을 다잡고 힘쓴다; ② 일어난 악·불선법을 끊기 위해; ③ 일어나지 않은 선법을 일어나게; ④ 일어난 선법을 유지·증장·완성을 위해 노력한다 — 이것을 정정진(四正勤)이라 한다."'

const V9 = '"Katamā ca, bhikkhave, sammāsati? Idha, bhikkhave, bhikkhu kāye kāyānupassī viharati ātāpī sampajāno satimā, vineyya loke abhijjhādomanassaṃ; vedanāsu vedanānupassī...; citte cittānupassī...; dhammesu dhammānupassī viharati ātāpī sampajāno satimā, vineyya loke abhijjhādomanassaṃ — ayaṃ vuccati, bhikkhave, sammāsati."'
const V9K = '"비구들이여, 정념이란 무엇인가? 여기 비구는 몸에서 몸을, 느낌에서 느낌을, 마음에서 마음을, 법에서 법을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서. 이것을 정념(四念處)이라 한다."'

const V10 = '"Katamo ca, bhikkhave, sammāsamādhi? Idha, bhikkhave, bhikkhu vivicceva kāmehi vivicca akusalehi dhammehi savitakkaṃ savicāraṃ vivekajaṃ pītisukhaṃ paṭhamaṃ jhānaṃ upasampajja viharati. Vitakkavicārānaṃ vūpasamā... dutiyaṃ jhānaṃ upasampajja viharati. Pītiyā ca virāgā upekkhako ca viharati... tatiyaṃ jhānaṃ upasampajja viharati. Sukhassa ca pahānā dukkhassa ca pahānā... catutthaṃ jhānaṃ upasampajja viharati — ayaṃ vuccati, bhikkhave, sammāsamādhī"ti.'
const V10K = '"비구들이여, 정정이란 무엇인가? 여기 비구는 ① 욕망과 불선법에서 떨어져 사유와 고찰이 있고 떨침에서 생긴 희열과 행복이 있는 초선에 들어 머문다. ② 사유와 고찰이 가라앉아 제2선. ③ 희열이 빛바래 평정에 머무는 제3선. ④ 행복과 괴로움이 사라져 평정과 마음챙김의 청정이 있는 제4선 — 이것을 정정(四禪)이라 한다."'

export const LESSON_SN45_8: StepType[] = [
  { type: 'intro', icon: '☸️', title: '도분별경', subtitle: 'Vibhaṅga Sutta (SN 45.8)',
    description: '팔정도 8항목의 정의를 상세히 분석하는 경.\n\n11과 MN10의 사성제 도성제 부분(V_MAG)과 거의 동일한 내용 — 부처님이 팔정도를 따로 설하신 별도 경.\n\n구조:\n① 정견 ② 정사유 ③ 정어 ④ 정업\n⑤ 정명 ⑥ 정정진 ⑦ 정념 ⑧ 정정' },

  // ===== 도입 =====
  { type: 'teach', icon: '🏛️', word: 'sāvatthinidānaṃ', pronKo: '사~왓티니다~낭', meaning: '사왓티 인연 (도입)',
    grammar: '복합어, 주격', baseForm: 'sāvatthi(사왓티) + nidāna(인연)',
    formNote: '"사왓티에서 일어난 일" — 경전 도입 약어',
    buddhism: '경전이 사왓티(슈라바스티) 제따와나에서 설해짐을 의미.',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🎓', word: 'ariyaṃ', pronKo: '아리양', meaning: '성스러운 (대격)',
    grammar: '형용사, 대격 남성 단수', baseForm: 'ariya',
    formNote: 'ariya → ariyaṃ: 대격 -aṃ (maggaṃ 수식)',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '👥', word: 'vo', pronKo: '워', meaning: '그대들에게',
    grammar: '대명사, 여격/대격 복수 (단축)', baseForm: 'tvaṃ → vo',
    formNote: 'tumhe(그대들)의 단축 형태',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '8️⃣', word: 'aṭṭhaṅgikaṃ', pronKo: '앗탕기깡', meaning: '8개 가지의 (대격)',
    grammar: '형용사, 대격 남성', baseForm: 'aṭṭhaṅgika',
    formNote: '11과 MN10 V_MAG0의 aṭṭhaṅgiko(주격)와 같은 단어 — 여기는 대격',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🛣️', word: 'maggaṃ', pronKo: '막강', meaning: '길을 (대격)',
    grammar: '남성명사, 대격', baseForm: 'magga',
    formNote: '11과 V2의 maggo(주격)와 같은 단어',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '📢', word: 'desessāmi', pronKo: '데셋사~미', meaning: '나는 설하겠다 (미래)',
    grammar: '동사, 미래 1인칭 단수', baseForm: 'deseti (설하다, √dis)',
    formNote: 'deseti → desessāmi (미래 어미 -ssāmi)\n미래 1인칭',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🔬', word: 'vibhajissāmi', pronKo: '위바짓사~미', meaning: '나는 분석하겠다 (미래)',
    grammar: '동사, 미래 1인칭 단수', baseForm: 'vibhajati (vi- + √bhaj)',
    formNote: 'vi(분리) + √bhaj(나누다) → 분석하다',
    buddhism: '경의 제목 vibhaṅga와 같은 어근.',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '👂', word: 'suṇātha', pronKo: '수나~타', meaning: '들으라 (2인칭 복수 명령)',
    grammar: '동사, 2인칭 복수 명령형', baseForm: 'suṇāti (듣다, √su)',
    formNote: '√su(듣다) — 명령 복수 -tha',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🎯', word: 'sādhukaṃ', pronKo: '사~두깡', meaning: '잘, 훌륭하게',
    grammar: '부사', baseForm: 'sādhuka',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🧠', word: 'manasi karotha', pronKo: '마나시 까로타', meaning: '마음에 새기라 (작의)',
    grammar: '처격 + 동사 2인칭 복수 명령', baseForm: 'mano(처격 manasi) + karoti',
    formNote: '"마음에 두라 = 작의(作意)하라"',
    buddhism: '여리작의(如理作意, yoniso manasikāra)의 manasikāra.',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '💬', word: 'bhāsissāmi', pronKo: '바~싯사~미', meaning: '나는 말하겠다 (미래)',
    grammar: '동사, 미래 1인칭 단수', baseForm: 'bhāsati (말하다)',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'verse', pali: V1, pronKo: '아리양 워, 빅카웨, 앗탕기깡 막강 데셋사~미 위바짓사~미. 땅 수나~타, 사~두깡 마나시 까로타; 바~싯사~미~띠.',
    translation: V1K, highlight: ['ariyaṃ','vo','aṭṭhaṅgikaṃ','maggaṃ','desessāmi','vibhajissāmi','suṇātha','sādhukaṃ','manasi karotha','bhāsissāmi'],
    note: '☸️ 설법 선언 — 미래시제 4개.' },

  { type: 'teach', icon: '✅', word: 'Evaṃ, bhante', pronKo: '에왕, 반떼', meaning: '"예, 세존이시여"',
    grammar: '부사 + 호격', baseForm: 'evaṃ(그렇게) + bhante(존자시여)',
    formNote: 'bhante = 비구가 부처님을 부를 때 호격\n11과 MN10의 bhaddante와 비슷',
    verseLine: V_OPEN, verseLineKo: V_OPENK, audio: true },
  { type: 'verse', pali: V_OPEN, pronKo: '에왕, 반떼띠 코 떼 빅쿠~ 바가와또 빳짯소숭. 바가와~ 에따다오짜 —',
    translation: V_OPENK, highlight: ['Evaṃ','bhante','paccassosuṃ','etadavoca'] },

  // ===== 팔정도 선언 =====
  { type: 'verse', pali: V2, pronKo: '까따모 짜, 빅카웨, 아리요 앗탕기꼬 막고? 셋야티당 — 삼마~딧티, 삼마~상깝뽀, 삼마~와~짜~, 삼마~깜만또, 삼마~아~지~오, 삼마~와~야~모, 삼마~사띠, 삼마~사마~디.',
    translation: V2K, highlight: ['sammādiṭṭhi','sammāsaṅkappo','sammāvācā','sammākammanto','sammāājīvo','sammāvāyāmo','sammāsati','sammāsamādhi'],
    note: '☸️ 팔정도 8항목. 11과 MN10 V_MAG0과 동일.' },

  // ===== ① 정견 =====
  { type: 'intro', icon: '👁️', title: '— ① sammādiṭṭhi (정견) —', subtitle: '바른 견해',
    description: '사성제에 대한 앎.' },
  { type: 'teach', icon: '🧠', word: 'ñāṇaṃ', pronKo: '냐~낭', meaning: '앎, 지혜',
    grammar: '중성명사, 주격 단수', baseForm: 'ñāṇa (√ñā)',
    formNote: '√ñā(알다) + ṇa — paññā(지혜)와 같은 어근',
    buddhism: '지(智). 단순 지식이 아닌 통찰적 앎.',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🔥', word: 'dukkhasamudaye', pronKo: '둑카사무다예', meaning: '괴로움의 일어남에 (처격)',
    grammar: '복합어, 처격', baseForm: 'dukkha + samudaya',
    formNote: '11과 MN10 V_SAC0의 dukkhasamudayo(주격)과 같은 단어 — 처격',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'dukkhanirodhe', pronKo: '둑카니로데', meaning: '괴로움의 소멸에 (처격)',
    grammar: '복합어, 처격', baseForm: 'dukkha + nirodha',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🛤️', word: 'dukkhanirodhagāminiyā paṭipadāya', pronKo: '둑카니로다가~미니야~ 빠띠빠다~야', meaning: '괴로움의 소멸로 이끄는 길에 (처격)',
    grammar: '복합어 + 명사, 처격', baseForm: 'dukkhanirodhagāminī + paṭipadā',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🏷️', word: 'vuccati', pronKo: '웃짜띠', meaning: '~라 불린다',
    grammar: '동사 3인칭 단수 수동', baseForm: '√vac (말하다) 수동',
    formNote: '"ayaṃ vuccati X" = "이것이 X라 불린다" — 정의 결론 정형구',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'verse', pali: V3, pronKo: '까따마~ 짜, 빅카웨, 삼마~딧티? 양 코, 빅카웨, 둑케 냐~낭, 둑카사무다예 냐~낭, 둑카니로데 냐~낭, 둑카니로다가~미니야~ 빠띠빠다~야 냐~낭 — 아양 웃짜띠, 빅카웨, 삼마~딧티.',
    translation: V3K, highlight: ['sammādiṭṭhi','ñāṇaṃ','dukkhasamudaye','dukkhanirodhe','vuccati'],
    note: '👁️ 정견 = 사성제에 대한 앎.' },

  // ===== ② 정사유 =====
  { type: 'intro', icon: '💭', title: '— ② sammāsaṅkappo (정사유) —', subtitle: '바른 사유',
    description: '출리·악의없음·해치지않음의 세 가지 의도.' },
  { type: 'teach', icon: '🚪', word: 'nekkhammasaṅkappo', pronKo: '넥캄마상깝뽀', meaning: '출리의 사유',
    grammar: '복합어, 주격', baseForm: 'nekkhamma(출리) + saṅkappa',
    formNote: '11과 MN10 V_MAG2와 동일',
    buddhism: '출리(出離). 감각욕에서 떠남.',
    verseLine: V4, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '☮️', word: 'abyāpādasaṅkappo', pronKo: '아뱌~빠~다상깝뽀', meaning: '악의 없음의 사유',
    grammar: '복합어, 주격', baseForm: 'a + byāpāda + saṅkappa',
    buddhism: '무에(無恚). 자애.', verseLine: V4, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'avihiṃsāsaṅkappo', pronKo: '아위힝사~상깝뽀', meaning: '해치지 않음의 사유',
    grammar: '복합어, 주격', baseForm: 'a + vihiṃsā + saṅkappa',
    formNote: 'a(부정) + vihiṃsā(해침) → ahimsā와 같은 어원',
    buddhism: '불해(不害). 비폭력.', verseLine: V4, verseLineKo: V4K, audio: true },
  { type: 'verse', pali: V4, pronKo: '까따모 짜, 빅카웨, 삼마~상깝뽀? 요 코, 빅카웨, 넥캄마상깝뽀, 아뱌~빠~다상깝뽀, 아위힝사~상깝뽀 — 아양 웃짜띠, 빅카웨, 삼마~상깝뽀.',
    translation: V4K, highlight: ['sammāsaṅkappo','nekkhammasaṅkappo','abyāpādasaṅkappo','avihiṃsāsaṅkappo'],
    note: '💭 정사유 = 출리·무에·무해.' },

  // ===== ③ 정어 =====
  { type: 'intro', icon: '🗣️', title: '— ③ sammāvācā (정어) —', subtitle: '바른 말',
    description: '거짓말·이간·거친말·잡담 4가지를 삼감.' },
  { type: 'teach', icon: '🤥', word: 'musāvādā', pronKo: '무사~와~다~', meaning: '거짓말에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'musā + vāda',
    formNote: '3과 오계 4계와 동일',
    verseLine: V5, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '🛑', word: 'veramaṇī', pronKo: '웨라마니~', meaning: '삼감',
    grammar: '여성명사, 주격', baseForm: 'veramaṇī',
    formNote: '3과 오계의 veramaṇī와 동일',
    verseLine: V5, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'pisuṇāya vācāya', pronKo: '삐수나~야 와~짜~야', meaning: '이간하는 말에서 (도구격/탈격)',
    grammar: '형용사+명사', baseForm: 'pisuṇa(이간하는) + vācā',
    verseLine: V5, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'pharusāya vācāya', pronKo: '파루사~야 와~짜~야', meaning: '거친 말에서',
    grammar: '형용사+명사', baseForm: 'pharusa(거친) + vācā',
    verseLine: V5, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '💬', word: 'samphappalāpā', pronKo: '삼팝빨라~빠~', meaning: '잡담에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'samphappalāpa',
    verseLine: V5, verseLineKo: V5K, audio: true },
  { type: 'verse', pali: V5, pronKo: '까따마~ 짜, 빅카웨, 삼마~와~짜~? 야~ 코, 빅카웨, 무사~와~다~ 웨라마니~, 삐수나~야 와~짜~야 웨라마니~, 파루사~야 와~짜~야 웨라마니~, 삼팝빨라~빠~ 웨라마니~ — 아양 웃짜띠, 빅카웨, 삼마~와~짜~.',
    translation: V5K, highlight: ['sammāvācā','musāvādā','veramaṇī','pisuṇāya','pharusāya','samphappalāpā'],
    note: '🗣️ 정어 = 4가지 말 삼감.' },

  // ===== ④ 정업 =====
  { type: 'intro', icon: '🤲', title: '— ④ sammākammanto (정업) —', subtitle: '바른 행위',
    description: '살생·도둑질·음행 3가지를 삼감.' },
  { type: 'teach', icon: '🛡️', word: 'pāṇātipātā', pronKo: '빠~나~띠빠~따~', meaning: '살생에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'pāṇa + atipāta',
    formNote: '3과 오계 1계와 동일',
    verseLine: V6, verseLineKo: V6K, audio: true },
  { type: 'teach', icon: '✋', word: 'adinnādānā', pronKo: '아딘나~다~나~', meaning: '도둑질에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'adinna + ādāna',
    formNote: '3과 오계 2계와 동일',
    verseLine: V6, verseLineKo: V6K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'abrahmacariyā', pronKo: '아브라흐마짜리야~', meaning: '범행 아닌 것에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'a + brahmacariya (범행)',
    formNote: 'brahmacariya = "성스러운 행 = 정행 = 비음행"\n출가자용 — 3과 오계 kāmesumicchācārā(재가용 사음 금지)보다 엄격: 모든 음행 금지',
    buddhism: '범행(梵行) 아닌 것 = 음행. 출가자 표준.',
    verseLine: V6, verseLineKo: V6K, audio: true },
  { type: 'verse', pali: V6, pronKo: '까따모 짜, 빅카웨, 삼마~깜만또? 야~ 코, 빅카웨, 빠~나~띠빠~따~ 웨라마니~, 아딘나~다~나~ 웨라마니~, 아브라흐마짜리야~ 웨라마니~ — 아양 웃짜띠, 빅카웨, 삼마~깜만또.',
    translation: V6K, highlight: ['sammākammanto','pāṇātipātā','adinnādānā','abrahmacariyā'],
    note: '🤲 정업 = 살생·도둑질·음행 삼감. 출가용은 abrahmacariyā (범행).' },

  // ===== ⑤ 정명 =====
  { type: 'intro', icon: '🥢', title: '— ⑤ sammāājīvo (정명) —', subtitle: '바른 생계',
    description: '그릇된 생계를 버리고 바른 생계로 영위함.' },
  { type: 'teach', icon: '🎓', word: 'ariyasāvako', pronKo: '아리야사~와꼬', meaning: '성스러운 제자',
    grammar: '복합어, 주격', baseForm: 'ariya + sāvaka',
    formNote: '11과 MN10 V_MAG5와 동일',
    verseLine: V7, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '❌', word: 'micchāājīvaṃ', pronKo: '밋차~아~지~왕', meaning: '그릇된 생계를 (대격)',
    grammar: '복합어, 대격', baseForm: 'micchā + ājīva',
    verseLine: V7, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '🧹', word: 'pahāya', pronKo: '빠하~야', meaning: '버리고 (절대분사)',
    grammar: '절대분사', baseForm: 'pajahati (버리다)',
    verseLine: V7, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '💰', word: 'sammāājīvena', pronKo: '삼마~아~지~웨나', meaning: '바른 생계로 (도구격)',
    grammar: '복합어, 도구격', baseForm: 'sammā + ājīva',
    verseLine: V7, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '🌾', word: 'jīvitaṃ kappeti', pronKo: '지~위땅 깝뻬띠', meaning: '생계를 영위한다',
    grammar: '명사 대격 + 동사', baseForm: 'jīvita + kappeti',
    verseLine: V7, verseLineKo: V7K, audio: true },
  { type: 'verse', pali: V7, pronKo: '까따모 짜, 빅카웨, 삼마~아~지~오? 이다, 빅카웨, 아리야사~와꼬 밋차~아~지~왕 빠하~야 삼마~아~지~웨나 지~위땅 깝뻬띠 — 아양 웃짜띠, 빅카웨, 삼마~아~지~오.',
    translation: V7K, highlight: ['sammāājīvo','ariyasāvako','micchāājīvaṃ','pahāya','jīvitaṃ','kappeti'],
    note: '🥢 정명 = 그릇된 생계 버리고 바른 생계.' },

  // ===== ⑥ 정정진 =====
  { type: 'intro', icon: '💪', title: '— ⑥ sammāvāyāmo (정정진) —', subtitle: '바른 노력 — 4정근(四正勤)',
    description: '미생악 불생, 기생악 단, 미생선 생, 기생선 증장의 4가지 노력.' },
  { type: 'teach', icon: '4️⃣', word: '4정근 (cattāro sammappadhānā)', pronKo: '짯따~로 삼맙빠다~나~', meaning: '네 가지 바른 노력',
    grammar: '교리 분류', baseForm: '①미생악 불생 ②기생악 단 ③미생선 생 ④기생선 증장',
    formNote: '11과 MN10 V_MAG6A-D와 동일 4구조',
    buddhism: '사정근(四正勤). 37조도품 중 4가지.',
    verseLine: V8, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '😈', word: 'pāpakānaṃ akusalānaṃ', pronKo: '빠~빠까~낭 아꾸살라~낭', meaning: '악하고 불선한 (속격 복수)',
    grammar: '형용사 복합', baseForm: 'pāpaka + akusala',
    formNote: '11과 MN10 V_MAG6A와 동일',
    verseLine: V8, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '💭', word: 'chandaṃ janeti', pronKo: '찬당 자네띠', meaning: '의욕을 일으킨다',
    grammar: '대격 + 동사', baseForm: 'chanda + janeti',
    verseLine: V8, verseLineKo: V8K, audio: true },
  { type: 'verse', pali: V8, pronKo: '까따모 짜, 빅카웨, 삼마~와~야~모? 이다, 빅카웨, 빅쿠 (1) 아눕빤나~낭 빠~빠까~낭 아꾸살라~낭 담마~낭 아눕빠~다~야 찬당 자네띠... (2) 웁빤나~낭... 빠하~나~야... (3) 아눕빤나~낭 꾸살라~낭... 웁빠~다~야... (4) 웁빤나~낭 꾸살라~낭... 티띠야~ 아삼모사~야 빗요바~와~야 웨뿔라~야 바~와나~야 빠~리뿌~리야~ 찬당 자네띠...',
    translation: V8K, highlight: ['sammāvāyāmo','anuppannānaṃ','uppannānaṃ','pāpakānaṃ','kusalānaṃ','chandaṃ','janeti'],
    note: '💪 정정진 = 4정근.' },

  // ===== ⑦ 정념 =====
  { type: 'intro', icon: '🧘', title: '— ⑦ sammāsati (정념) —', subtitle: '바른 마음챙김 = 사념처',
    description: '신·수·심·법을 관찰. 11과 MN10 전체가 이것의 상세 설명.' },
  { type: 'teach', icon: '🧘', word: 'sammāsati = 사념처', pronKo: '삼마~사띠', meaning: '정념 = 4념처',
    grammar: '복합어', baseForm: 'sammā + sati',
    formNote: '11과 MN10 전체가 sammāsati의 상세 설명!\n신·수·심·법 4가지 관찰.',
    buddhism: '11과 마하사띠빳타나경 참조.',
    verseLine: V9, verseLineKo: V9K, audio: true },
  { type: 'verse', pali: V9, pronKo: '까따마~ 짜, 빅카웨, 삼마~사띠? 이다, 빅카웨, 빅쿠 까~예 까~야~누빳시~ 위하라띠 아~따~삐~ 삼빠자~노 사띠마~, 위네이야 로께 아빗자~도마낫상; 웨다나~수... 찟떼... 담메수 담마~누빳시~ 위하라띠 아~따~삐~ 삼빠자~노 사띠마~ 위네이야 로께 아빗자~도마낫상 — 아양 웃짜띠, 빅카웨, 삼마~사띠.',
    translation: V9K, highlight: ['sammāsati','kāye','kāyānupassī','vedanāsu','citte','dhammesu','ātāpī','sampajāno','satimā','vineyya','abhijjhādomanassaṃ'],
    note: '🧘 정념 = 사념처 자체. 11과 MN10의 핵심 정형구.' },

  // ===== ⑧ 정정 — 4선 =====
  { type: 'intro', icon: '🌟', title: '— ⑧ sammāsamādhi (정정) —', subtitle: '바른 삼매 = 4선',
    description: '초선·2선·3선·4선의 4단계 선정.' },
  { type: 'teach', icon: '1️⃣', word: 'paṭhamaṃ jhānaṃ', pronKo: '빠타망 자~낭', meaning: '초선',
    grammar: '형용사+명사 대격', baseForm: 'paṭhama + jhāna',
    formNote: '11과 MN10 V_MAG8A와 동일',
    buddhism: '초선: 위딱까·위짜라·삐~띠·수카·에코디바와 (5선지).',
    verseLine: V10, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '2️⃣', word: 'dutiyaṃ jhānaṃ', pronKo: '두띠양 자~낭', meaning: '2선',
    grammar: '형용사+명사', baseForm: 'dutiya + jhāna',
    formNote: '11과 MN10 V_MAG8B와 동일',
    buddhism: '2선: 위딱까·위짜라 사라짐.',
    verseLine: V10, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '3️⃣', word: 'tatiyaṃ jhānaṃ', pronKo: '따띠양 자~낭', meaning: '3선',
    grammar: '형용사+명사', baseForm: 'tatiya + jhāna',
    formNote: '11과 MN10 V_MAG8C와 동일',
    buddhism: '3선: 삐~띠 사라짐, 평정·수카.',
    verseLine: V10, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '4️⃣', word: 'catutthaṃ jhānaṃ', pronKo: '짜뚯탕 자~낭', meaning: '4선',
    grammar: '형용사+명사', baseForm: 'catuttha + jhāna',
    formNote: '11과 MN10 V_MAG8D와 동일',
    buddhism: '4선: 수카·둑카 사라짐, 평정·마음챙김의 청정.',
    verseLine: V10, verseLineKo: V10K, audio: true },
  { type: 'verse', pali: V10, pronKo: '까따모 짜, 빅카웨, 삼마~사마~디? 이다, 빅카웨, 빅쿠 위윗쩨와 까~메히 위윗짜 아꾸살레히 담메히 사위딱깡 사위짜~랑 위웨까장 삐~띠수캉 빠타망 자~낭 우빠삼빳자 위하라띠. 위딱까위짜~라~낭 우~빠사마~... 두띠양 자~낭... 삐~띠야~ 짜 위라~가~... 따띠양 자~낭... 수캇사 짜 빠하~나~ 둑캇사 짜 빠하~나~... 짜뚯탕 자~낭 우빠삼빳자 위하라띠 — 아양 웃짜띠, 빅카웨, 삼마~사마~디~띠.',
    translation: V10K, highlight: ['sammāsamādhi','paṭhamaṃ','dutiyaṃ','tatiyaṃ','catutthaṃ','jhānaṃ','vivicceva','kāmehi','savitakkaṃ','savicāraṃ','pītisukhaṃ','vitakkavicārānaṃ','vūpasamā'],
    note: '🌟 정정 = 4선(四禪). 11과 MN10 V_MAG8과 동일.' },

  // ===== 종합 =====
  { type: 'quiz', question: '"sammādiṭṭhi"의 정의는?',
    options: ['사성제에 대한 앎', '좋은 행동', '깊은 명상', '많은 독경'], answer: 0 },
  { type: 'quiz', question: '정사유의 세 요소는?',
    options: ['출리·무에·무해', '계·정·혜', '고·집·멸', '신·구·의'], answer: 0 },
  { type: 'quiz', question: '정업에서 사음 대신 음행 전체를 금지하는 단어는?',
    options: ['kāmesumicchācārā', 'abrahmacariyā', 'pāṇātipātā', 'musāvādā'], answer: 1,
    hint: '출가자 표준 — "범행 아님"' },
  { type: 'quiz', question: '"sammāsati" = ?',
    options: ['사념처 (몸·느낌·마음·법 관찰)', '4정근', '4선', '오계'], answer: 0 },
  { type: 'quiz', question: '"sammāsamādhi"는 어떤 수행으로 정의됨?',
    options: ['4선(四禪)', '5계', '8정도', '4성제'], answer: 0 },
  { type: 'quiz', question: '"ayaṃ vuccati X"의 의미는?',
    options: ['이것이 X라 불린다 (정의 결론)', 'X가 일어난다', 'X에 대해 모른다', 'X를 본다'], answer: 0 },

  { type: 'writing', instruction: '"앎, 지혜"를 빠알리어로 써보세요',
    meaning: '앎, 지혜', pronKo: '냐~낭', answer: 'ñāṇaṃ', hint: 'ñ로 시작' },

  { type: 'speak', pali: 'sammādiṭṭhi sammāsaṅkappo sammāvācā sammākammanto sammāājīvo sammāvāyāmo sammāsati sammāsamādhi',
    pronKo: '삼마~딧티 삼마~상깝뽀 삼마~와~짜~ 삼마~깜만또 삼마~아~지~오 삼마~와~야~모 삼마~사띠 삼마~사마~디' },
]
