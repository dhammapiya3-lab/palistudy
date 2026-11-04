// 18과: -ā 여성명사 격변화 (vanitā 기준)
// 여성명사 어휘 + 동사 + 경전 용례(parisā)
import type { StepWithoutId } from './types'

const V_PARISA = 'Catasso imā bhikkhave parisā.'
const V_PARISA_K = '비구들이여, 이 네 가지 수행원이 있다.'

export const LESSON_17: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '18과: -ā 여성명사', subtitle: 'Itthiliṅga -ā (Feminine Nouns in -ā)', description: '여성명사 -ā형 격변화:\nvanitā(여인)를 기준으로 8격 학습\n\n여성명사: kaññā(소녀), gaṅgā(갠지스강),\nnāvā(배), ammā(어머니), paññā(지혜)...\n\n경전: "parisā" (수행원/모임)', icon: '👩' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_PARISA, pronKo: '짜땃소 이마- 빅카웨 빠리사-', translation: V_PARISA_K, highlight: ['parisā'], note: 'parisā = 수행원, 모임 (여성명사 -ā)\ncatasso = 네 가지 (여성 복수)\nimā = 이 (여성 복수 지시대명사)\n— DN 16 등 경전에서 "네 가지 모임" 언급' },

  // === 격변화표 ===
  { type: 'teach-grammar', title: '여성명사 -ā 격변화 (vanitā)', example: '주격: vanitā / vanitā,vanitāyo\n목적격: vanitaṃ / vanitā,vanitāyo\n도구격: vanitāya / vanitāhi\n여격: vanitāya / vanitānaṃ\n탈격: vanitāya / vanitāhi\n소유격: vanitāya / vanitānaṃ\n처소격: vanitāya,vanitāyaṃ / vanitāsu\n호격: vanite / vanitā,vanitāyo', exampleKo: '8격 × 2수 = 16가지 형태', explanation: '여성명사 -ā형 격변화 총정리:\n\n격 | 단수 | 복수\n주격(~은) | -ā | -ā/-āyo\n목적격(~을) | -aṃ | -ā/-āyo\n도구격(~로) | -āya | -āhi/-ābhi\n여격(~에게) | -āya | -ānaṃ\n탈격(~에서) | -āya | -āhi/-ābhi\n소유격(~의) | -āya | -ānaṃ\n처소격(~에) | -āya/-āyaṃ | -āsu\n호격(~이여) | -e | -ā/-āyo\n\n특징: 도구격=여격=탈격=소유격=처소격 단수 모두 -āya!' },

  // === 남성 vs 여성 비교 ===
  { type: 'teach-grammar', title: '남성 -a vs 여성 -ā 비교', example: '남성 nara: -o/-ā, -aṃ/-e, -ena/-ehi\n여성 vanitā: -ā/-āyo, -aṃ/-āyo, -āya/-āhi', exampleKo: '주격·목적격·도구격 단수/복수 비교', explanation: '핵심 차이:\n\n① 주격 단수: 남성 -o / 여성 -ā\n② 목적격 복수: 남성 -e / 여성 -ā/-āyo\n③ 도구격~처소격 단수: 남성 다양 / 여성 모두 -āya\n④ 호격 단수: 남성 -a / 여성 -e\n⑤ 처소격 복수: 남성 -esu / 여성 -āsu\n\n여성은 단수 사격(구·여·탈·소·처)이\n모두 -āya로 통일되어 상대적으로 단순합니다.' },

  // === 여성명사 어휘 ===
  { type: 'teach', word: 'kaññā / dārikā', pronKo: '깐냐- / 다-리까-', meaning: '소녀', icon: '👧', grammar: '여성명사 -ā', baseForm: 'kaññā, dārikā', formNote: '주격: kaññā / kaññā,kaññāyo\n두 동의어 모두 -ā형' },
  { type: 'teach', word: 'gaṅgā', pronKo: '강가-', meaning: '갠지스 강', icon: '🏞️', grammar: '여성명사 -ā (고유명사)', baseForm: 'gaṅgā', formNote: '처소격: gaṅgāya/gaṅgāyaṃ\n"갠지스 강에서"' },
  { type: 'teach', word: 'nāvā', pronKo: '나-와-', meaning: '배', icon: '⛵', grammar: '여성명사 -ā', baseForm: 'nāvā', formNote: '도구격: nāvāya (배로)\n처소격: nāvāyaṃ (배에서)' },
  { type: 'teach', word: 'ammā', pronKo: '암마-', meaning: '어머니', icon: '👩‍👦', grammar: '여성명사 -ā', baseForm: 'ammā', formNote: '호격: amme (어머니여!)\n여격: ammāya (어머니에게)' },
  { type: 'teach', word: 'paññā', pronKo: '빤냐-', meaning: '지혜', icon: '🧠', grammar: '여성명사 -ā', baseForm: 'paññā', formNote: '도구격: paññāya (지혜로)\n소유격: paññāya (지혜의)', buddhism: 'paññā = 혜(慧). 삼학 셋째\nsīla → samādhi → paññā' },
  { type: 'teach', word: 'sālā', pronKo: '살-라-', meaning: '강당, 집회소', icon: '🏛️', grammar: '여성명사 -ā', baseForm: 'sālā', formNote: '처소격: sālāyaṃ (강당에서)\n복수: sālā/sālāyo' },
  { type: 'teach', word: 'bhariyā', pronKo: '바리야-', meaning: '아내', icon: '👰', grammar: '여성명사 -ā', baseForm: 'bhariyā', formNote: '여격: bhariyāya (아내에게)\n목적격: bhariyaṃ (아내를)' },
  { type: 'teach', word: 'kathā', pronKo: '까타-', meaning: '이야기, 담화', icon: '💬', grammar: '여성명사 -ā', baseForm: 'kathā', formNote: '목적격: kathaṃ (이야기를)\n복수: kathā/kathāyo', buddhism: 'dhammakathā = 법담(法談)' },
  { type: 'teach', word: 'latā', pronKo: '라따-', meaning: '덩굴', icon: '🌿', grammar: '여성명사 -ā', baseForm: 'latā', formNote: '도구격: latāya (덩굴로)\n복수: latā/latāyo' },
  { type: 'teach', word: 'guhā', pronKo: '구하-', meaning: '동굴', icon: '🕳️', grammar: '여성명사 -ā', baseForm: 'guhā', formNote: '처소격: guhāyaṃ (동굴에서)\n복수: guhā/guhāyo' },
  { type: 'teach', word: 'mālā', pronKo: '마-라-', meaning: '화환', icon: '💐', grammar: '여성명사 -ā', baseForm: 'mālā', formNote: '목적격: mālaṃ (화환을)\n복수: mālā/mālāyo' },
  { type: 'teach', word: 'surā', pronKo: '수라-', meaning: '술', icon: '🍶', grammar: '여성명사 -ā', baseForm: 'surā', formNote: '탈격: surāya (술로부터)', buddhism: 'surāmerayamajjapamādaṭṭhānā\n= 다섯째 계 (음주 금지)' },
  { type: 'teach', word: 'sākhā', pronKo: '사-카-', meaning: '가지 (나뭇가지)', icon: '🌳', grammar: '여성명사 -ā', baseForm: 'sākhā', formNote: '처소격: sākhāyaṃ (가지에)\n복수: sākhā/sākhāyo' },
  { type: 'teach', word: 'devatā', pronKo: '데와따-', meaning: '천신, 신', icon: '✨', grammar: '여성명사 -ā', baseForm: 'devatā', formNote: '복수 주격: devatā/devatāyo\ndeva(남성)의 여성형' },
  { type: 'teach', word: 'parisā', pronKo: '빠리사-', meaning: '수행원, 모임', icon: '👥', grammar: '여성명사 -ā', baseForm: 'parisā', formNote: '처소격: parisāyaṃ (모임에서)\n복수: parisā/parisāyo', buddhism: '4종 수행원: bhikkhu, bhikkhunī,\nupāsaka, upāsikā parisā' },
  { type: 'teach', word: 'saddhā', pronKo: '삿다-', meaning: '믿음, 신심', icon: '🙏', grammar: '여성명사 -ā', baseForm: 'saddhā', formNote: '도구격: saddhāya (믿음으로)\n소유격: saddhāya (믿음의)', buddhism: 'saddhā = 신(信). 다섯 근(五根) 첫째' },
  { type: 'teach', word: 'pipāsā', pronKo: '삐빠-사-', meaning: '갈증', icon: '🥵', grammar: '여성명사 -ā', baseForm: 'pipāsā', formNote: '주격: pipāsā\n탈격: pipāsāya (갈증으로부터)' },
  { type: 'teach', word: 'khudā', pronKo: '쿠다-', meaning: '배고픔, 기아', icon: '😖', grammar: '여성명사 -ā', baseForm: 'khudā', formNote: '주격: khudā\n탈격: khudāya (배고픔으로부터)' },

  // === 동사 ===
  { type: 'teach', word: 'sakkoti', pronKo: '삭꼬띠', meaning: '할 수 있다', icon: '💪', grammar: '동사 · 현재 3인칭 단수', baseForm: 'sakkoti', formNote: '복수: sakkonti\n+ 부정사(tuṃ): gantuṃ sakkoti = 갈 수 있다' },
  { type: 'teach', word: 'parivāreti', pronKo: '빠리와-레띠', meaning: '둘러싸다, 수행하다', icon: '🔄', grammar: '동사 · 현재 3인칭 단수', baseForm: 'parivāreti', formNote: '복수: parivārenti\npari + vār(둘러싸다)' },
  { type: 'teach', word: 'nivāreti', pronKo: '니와-레띠', meaning: '막다, 금하다', icon: '🛡️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'nivāreti', formNote: '복수: nivārenti\nni + vār(막다)' },
  { type: 'teach', word: 'anubandhati', pronKo: '아누반다띠', meaning: '따라가다, 추적하다', icon: '👣', grammar: '동사 · 현재 3인칭 단수', baseForm: 'anubandhati', formNote: '복수: anubandhanti\nanu + bandh(묶다/따르다)' },
  { type: 'teach', word: 'kujjhati', pronKo: '꿋자띠', meaning: '화내다, 성내다', icon: '😠', grammar: '동사 · 현재 3인칭 단수', baseForm: 'kujjhati', formNote: '복수: kujjhanti\nkudh(화내다)에서 파생' },
  { type: 'teach', word: 'namassati', pronKo: '나맛사띠', meaning: '예배하다, 경배하다', icon: '🙇', grammar: '동사 · 현재 3인칭 단수', baseForm: 'namassati', formNote: '복수: namassanti\nnamas(경의) + ati' },
  { type: 'teach', word: 'poseti', pronKo: '뽀세띠', meaning: '먹이다, 양육하다', icon: '🍼', grammar: '동사 · 현재 3인칭 단수', baseForm: 'poseti', formNote: '복수: posenti\npus(먹이다)에서 파생' },
  { type: 'teach', word: 'vāyamati', pronKo: '와-야마띠', meaning: '노력하다, 정진하다', icon: '🏋️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vāyamati', formNote: '복수: vāyamanti\nvāyāma = 정진, 노력', buddhism: 'sammāvāyāma = 정정진(正精進)' },

  // === 예문 ===
  { type: 'verse', pali: 'Vanitā sālaṃ gacchati.\nVanitāyo sālaṃ gacchanti.', pronKo: '와니따- 살-랑 갓차띠\n와니따-요 살-랑 갓찬띠', translation: '여인은 강당에 간다.\n여인들은 강당에 간다.', highlight: ['Vanitā', 'Vanitāyo'], note: '주격: vanitā(단수) / vanitāyo(복수)\n-ā 여성명사의 복수 주격에 -āyo 추가' },
  { type: 'verse', pali: 'Ammā dārikaṃ poseti.\nAmmāyo dārikāyo posenti.', pronKo: '암마- 다-리깡 뽀세띠\n암마-요 다-리까-요 뽀센띠', translation: '어머니는 소녀를 양육한다.\n어머니들은 소녀들을 양육한다.', highlight: ['Ammā', 'Ammāyo', 'dārikaṃ', 'dārikāyo'], note: '목적격: dārikaṃ(단수) / dārikāyo(복수)' },
  { type: 'verse', pali: 'Kaññā saddhāya Buddhaṃ namassati.', pronKo: '깐냐- 삿다-야 붓탕 나맛사띠', translation: '소녀는 믿음으로 붓다께 예배한다.', highlight: ['saddhāya', 'namassati'], note: 'saddhāya = 믿음으로 (도구격 단수 -āya)\n여성명사 도구격=여격=탈격=소유격=처소격 단수 모두 -āya' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Vanitā guhāyaṃ vasati.', options: ['여인은 동굴에서 산다', '여인들은 동굴에서 산다', '여인은 동굴로 간다', '여인은 강당에서 산다'], answer: 0, hint: 'guhāyaṃ = 동굴에서(처소격 -āyaṃ)' },
  { type: 'quiz', question: '2. Dārikāyo gaṅgāyaṃ kīḷanti.', options: ['소녀들은 갠지스 강에서 논다', '소녀는 갠지스 강에서 논다', '소녀들은 갠지스 강에 간다', '소녀들은 바다에서 논다'], answer: 0, hint: 'dārikāyo=소녀들(복수), gaṅgāyaṃ=갠지스 강에서(처소격)' },
  { type: 'quiz', question: '3. Ammā kaññāya kathaṃ katheti.', options: ['어머니는 소녀에게 이야기를 한다', '어머니는 소녀의 이야기를 듣는다', '어머니들은 소녀에게 이야기를 한다', '어머니는 소녀에게서 이야기를 듣는다'], answer: 0, hint: 'kaññāya=소녀에게(여격 -āya), kathaṃ=이야기를' },
  { type: 'quiz', question: '4. Bhariyā mālāhi Buddhaṃ pūjeti.', options: ['아내는 화환들로 붓다를 공양한다', '아내는 화환으로 붓다를 공양한다', '아내들은 화환들로 붓다를 공양한다', '아내는 화환들을 붓다께 드린다'], answer: 0, hint: 'mālāhi=화환들로(도구격 복수 -āhi)' },
  { type: 'quiz', question: '5. Kaññā nāvāya gaṅgaṃ tarati.', options: ['소녀는 배로 갠지스 강을 건넌다', '소녀는 배에서 갠지스 강을 건넌다', '소녀들은 배로 갠지스 강을 건넌다', '소녀는 배를 타고 바다를 건넌다'], answer: 0, hint: 'nāvāya=배로(도구격 -āya), gaṅgaṃ=갠지스 강을' },
  { type: 'quiz', question: '6. Devatāyo sākhāsu nisīdanti.', options: ['천신들은 가지들에 앉는다', '천신은 가지에 앉는다', '천신들은 가지들에서 내려온다', '천신들은 나무들에 앉는다'], answer: 0, hint: 'sākhāsu=가지들에(처소격 복수 -āsu)' },
  { type: 'quiz', question: '7. Parisā sālaṃ sannipatati.', options: ['수행원이 강당에 모인다', '수행원들이 강당에 모인다', '수행원이 강당에서 나간다', '수행원이 마을에 모인다'], answer: 0, hint: 'parisā=수행원(단수 주격), sālaṃ=강당에(목적격=방향)' },
  { type: 'quiz', question: '8. Upāsikā surāya nivāreti.', options: ['우바이는 술로부터 막는다(피한다)', '우바이는 술을 마신다', '우바이들은 술로부터 막는다(피한다)', '우바이는 술을 준다'], answer: 0, hint: 'surāya=술로부터(탈격 -āya), nivāreti=막다' },
  { type: 'quiz', question: '9. Vanite, paññāya vāyama!', options: ['여인이여, 지혜를 위해 노력하라!', '여인들이여, 지혜를 위해 노력하라!', '여인이여, 지혜로 노력하라!', '여인이여, 지혜를 가져라!'], answer: 0, hint: 'vanite=여인이여(호격 단수 -e), paññāya=지혜를 위해(여격)' },
  { type: 'quiz', question: '10. Khudā ca pipāsā ca vanitānaṃ dukkhaṃ.', options: ['배고픔과 갈증은 여인들의 고통이다', '배고픔과 갈증은 여인의 고통이다', '배고픔과 갈증은 사람들의 고통이다', '배고픔과 갈증은 여인들에게 고통을 준다'], answer: 0, hint: 'vanitānaṃ=여인들의(소유격 복수 -ānaṃ), ca=그리고' },

  // === 마무리 ===
  { type: 'speak', pali: 'Catasso imā bhikkhave parisā', pronKo: '짜땃소 이마- 빅카웨 빠리사-' },
]
