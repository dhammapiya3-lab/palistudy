// 5과: -a 남성명사 여격 (교재 5과 완전 수록)
// 경전: 삼귀의 — 붓다·담마·상가에게 귀의하다 (여격 개념)
import type { StepWithoutId } from './types'

const V_SARANA = 'Namo tassa bhagavato arahato sammāsambuddhassa.'
const V_SARANA_K = '저 세존이시며, 아라한이시며, 정등각이신 분께 경배합니다.'

export const LESSON_05: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '5과: 남성명사 여격 (Dative)', subtitle: 'Catutthī vibhatti (Dative)', description: '여격은 수여·목적·대상을 나타냅니다.\n~에게, ~를 위하여, ~를 목적으로\n\n경전: "Namo tassa bhagavato"\n(저 세존께 경배합니다)', icon: '🎁' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_SARANA, pronKo: '나모 땃사 바가와또 아라하또 삼마-삼붓닷사', translation: V_SARANA_K, highlight: ['tassa', 'bhagavato', 'arahato', 'sammāsambuddhassa'], note: 'tassa = ta(그)의 여격/소유격 "저~에게"\nbhagavato = bhagavant(세존)의 여격\narahato = arahant(아라한)의 여격\nsammāsambuddhassa = sammāsambuddha + ssa(여격)\n※ 여격과 소유격 형태 유사!' },

  // === 여격 문법 ===
  { type: 'teach-grammar', title: '여격 (Dative) — ~에게/위하여/목적으로', example: 'nara + āya = narāya (사람에게)\nnara + ssa = narassa (사람에게)\nnara + ānaṃ = narānaṃ (사람들에게)', exampleKo: '단수: -āya / -ssa\n복수: -ānaṃ', explanation: '여격의 주요 의미:\n• 수여 대상: narāya dadāti (사람에게 준다)\n• 목적/이유: lābhāya gacchati (이득을 위해 간다)\n• 이익/불이익의 대상: kassakassa āharati (농부를 위해 가져온다)\n\n-a 남성명사:\n• 단수: -āya (narāya), -ssa (narassa)\n• 복수: -ānaṃ (narānaṃ)\n※ -ssa는 속격(소유)과 형태 동일!' },

  // === 명사 10개 (교재 전체) ===
  { type: 'teach', word: 'tāpasa', pronKo: '따-빠사', meaning: '고행자', icon: '🧘', grammar: '남성명사', baseForm: 'tāpasa', formNote: '여격 단수: tāpasāya / tāpasassa\n여격 복수: tāpasānaṃ' },
  { type: 'teach', word: 'ācariya', pronKo: '아-짜리야', meaning: '스승', icon: '👨‍🏫', grammar: '남성명사', baseForm: 'ācariya', formNote: '여격 단수: ācariyāya / ācariyassa\n여격 복수: ācariyānaṃ' },
  { type: 'teach', word: 'vejja', pronKo: '웻자', meaning: '의사', icon: '👨‍⚕️', grammar: '남성명사', baseForm: 'vejja', formNote: '여격 단수: vejjāya / vejjassa\n여격 복수: vejjānaṃ' },
  { type: 'teach', word: 'sīha', pronKo: '시-하', meaning: '사자', icon: '🦁', grammar: '남성명사', baseForm: 'sīha', formNote: '여격 단수: sīhāya / sīhassa\n여격 복수: sīhānaṃ' },
  { type: 'teach', word: 'luddaka', pronKo: '룻다까', meaning: '사냥꾼', icon: '🏹', grammar: '남성명사', baseForm: 'luddaka', formNote: '여격 단수: luddakāya / luddakassa\n여격 복수: luddakānaṃ' },
  { type: 'teach', word: 'aja', pronKo: '아자', meaning: '염소', icon: '🐐', grammar: '남성명사', baseForm: 'aja', formNote: '여격 단수: ajāya / ajassa\n여격 복수: ajānaṃ' },
  { type: 'teach', word: 'vānara', pronKo: '와-나라', meaning: '원숭이 (= makkaṭa)', icon: '🐒', grammar: '남성명사', baseForm: 'vānara / makkaṭa', formNote: '여격 단수: vānarāya / vānarassa\n여격 복수: vānarānaṃ' },
  { type: 'teach', word: 'lābha', pronKo: '라-바', meaning: '이득, 이익', icon: '💰', grammar: '남성명사', baseForm: 'lābha', formNote: '여격 단수: lābhāya\n"lābhāya gacchati" = 이득을 위해 간다' },
  { type: 'teach', word: 'mañca', pronKo: '만짜', meaning: '침대', icon: '🛏️', grammar: '남성명사', baseForm: 'mañca', formNote: '여격 단수: mañcāya / mañcassa\n여격 복수: mañcānaṃ' },
  { type: 'teach', word: 'kuddāla', pronKo: '꿋달-라', meaning: '괭이', icon: '⛏️', grammar: '남성명사', baseForm: 'kuddāla', formNote: '여격 단수: kuddālāya / kuddālassa\n여격 복수: kuddālānaṃ' },

  // === 동사 10개 (교재 전체) ===
  { type: 'teach', word: 'rodati', pronKo: '로다띠', meaning: '울다', icon: '😢', grammar: '동사 · 현재 3인칭 단수', baseForm: 'rodati', formNote: '복수: rodanti' },
  { type: 'teach', word: 'hasati', pronKo: '하사띠', meaning: '웃다', icon: '😄', grammar: '동사 · 현재 3인칭 단수', baseForm: 'hasati', formNote: '복수: hasanti' },
  { type: 'teach', word: 'labhati', pronKo: '라바띠', meaning: '얻다', icon: '🤲', grammar: '동사 · 현재 3인칭 단수', baseForm: 'labhati', formNote: '복수: labhanti' },
  { type: 'teach', word: 'pavisati', pronKo: '빠위사띠', meaning: '들어가다', icon: '🚶', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pavisati', formNote: '복수: pavisanti' },
  { type: 'teach', word: 'dadāti', pronKo: '다다-띠', meaning: '주다', icon: '🤝', grammar: '동사 · 현재 3인칭 단수', baseForm: 'dadāti', formNote: '복수: dadanti\n여격과 함께 사용: narāya dadāti (사람에게 준다)' },
  { type: 'teach', word: 'ādadāti', pronKo: '아-다다-띠', meaning: '얻다, 가지다', icon: '✊', grammar: '동사 · 현재 3인칭 단수', baseForm: 'ādadāti', formNote: '복수: ādadanti' },
  { type: 'teach', word: 'kīḷati', pronKo: '낄라띠', meaning: '놀다', icon: '🎮', grammar: '동사 · 현재 3인칭 단수', baseForm: 'kīḷati', formNote: '복수: kīḷanti' },
  { type: 'teach', word: 'nahāyati', pronKo: '나하-야띠', meaning: '목욕하다', icon: '🛁', grammar: '동사 · 현재 3인칭 단수', baseForm: 'nahāyati', formNote: '복수: nahāyanti' },
  { type: 'teach', word: 'ākaḍḍhati', pronKo: '아-깟다띠', meaning: '끌다', icon: '🪢', grammar: '동사 · 현재 3인칭 단수', baseForm: 'ākaḍḍhati', formNote: '복수: ākaḍḍhanti' },
  { type: 'teach', word: 'pajahati', pronKo: '빠자하띠', meaning: '버리다', icon: '🗑️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pajahati', formNote: '복수: pajahanti' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Dhīvaro narāya macchaṃ āharati.\nDhīvarā narānaṃ macche āharanti.', pronKo: '디-와로 나라-야 맛참 아-하라띠\n디-와라- 나라-남 맛체 아-하란띠', translation: '어부는 사람에게 물고기를 가져온다.\n어부들은 사람들에게 물고기들을 가져온다.', highlight: ['narāya', 'narānaṃ'] },
  { type: 'verse', pali: 'Putto mātulassa odanaṃ dadāti.\nPuttā mātulānaṃ odanaṃ dadanti.', pronKo: '뿟또 마-뚤랏사 오다낭 다다-띠\n뿟따- 마-뚤라-남 오다낭 다단띠', translation: '아들은 삼촌에게 밥을 준다.\n아들들은 삼촌들에게 밥을 준다.', highlight: ['mātulassa', 'mātulānaṃ'] },
  { type: 'verse', pali: 'Vāṇijo kassakassa ajaṃ dadāti.\nVāṇijā kassakānaṃ aje dadanti.', pronKo: '와-니조 깟사깟사 아잠 다다-띠\n와-니자- 깟사까-남 아제 다단띠', translation: '상인은 농부에게 염소를 준다.\n상인들은 농부들에게 염소들을 준다.', highlight: ['kassakassa', 'kassakānaṃ'] },

  // === 연습문제 5 (10문제) ===
  { type: 'quiz', question: '1. Upāsako ācariyassa phalaṃ dadāti.', options: ['우바새는 스승에게 과일을 준다', '우바새는 스승으로부터 과일을 받는다', '우바새들은 스승에게 과일을 준다', '우바새는 스승과 함께 과일을 먹는다'], answer: 0, hint: 'ācariyassa=스승에게(여격), dadāti=주다' },
  { type: 'quiz', question: '2. Tāpaso vejjassa pattaṃ āharati.', options: ['고행자는 의사에게서 발우를 받는다', '고행자는 의사에게 발우를 가져온다', '고행자들은 의사에게 발우를 가져온다', '고행자는 의사와 함께 발우를 가져온다'], answer: 1, hint: 'vejjassa=의사에게(여격), āharati=가져오다' },
  { type: 'quiz', question: '3. Luddako sīhāya macchaṃ khādāpeti.', options: ['사냥꾼은 사자에게 물고기를 먹인다', '사냥꾼은 사자로부터 물고기를 얻는다', '사냥꾼들은 사자에게 물고기를 먹인다', '사냥꾼은 사자와 함께 물고기를 먹는다'], answer: 0, hint: 'sīhāya=사자에게(여격), khādāpeti=먹이다' },
  { type: 'quiz', question: '4. Kumārā vānarānaṃ phale dadanti.', options: ['소년들은 원숭이에게 과일을 준다', '소년들은 원숭이들에게 과일들을 준다', '소년은 원숭이들에게 과일들을 준다', '소년들은 원숭이들로부터 과일들을 얻는다'], answer: 1, hint: 'vānarānaṃ=원숭이들에게(여격 복수), phale=과일들을' },
  { type: 'quiz', question: '5. Bhūpālo amaccassa lābhāya sakaṭaṃ dadāti.', options: ['왕은 신하에게 이득을 위해 짐수레를 준다', '왕은 신하의 이득을 위해 짐수레를 준다', '왕들은 신하에게 짐수레를 준다', '왕은 신하에게서 짐수레를 받는다'], answer: 1, hint: 'amaccassa lābhāya=신하의 이득을 위해, sakaṭaṃ=짐수레를' },
  { type: 'quiz', question: '6. Dhīvarā ajānaṃ bhattaṃ āharanti.', options: ['어부들은 염소들에게 쌀을 가져온다', '어부는 염소에게 쌀을 가져온다', '어부들은 염소들로부터 쌀을 가져온다', '어부들은 염소들에게 물고기를 가져온다'], answer: 0, hint: 'ajānaṃ=염소들에게(여격 복수), bhattaṃ=쌀을' },
  { type: 'quiz', question: '7. Putto ācariyāya mañcaṃ āharati.', options: ['아들은 스승을 위해 침대를 가져온다', '아들은 스승으로부터 침대를 가져온다', '아들들은 스승을 위해 침대를 가져온다', '아들은 스승과 함께 침대를 만든다'], answer: 0, hint: 'ācariyāya=스승을 위해(여격), mañcaṃ=침대를' },
  { type: 'quiz', question: '8. Kassakā vejjānaṃ kuddāle dadanti.', options: ['농부들은 의사들에게 괭이들을 준다', '농부는 의사에게 괭이를 준다', '농부들은 의사들로부터 괭이들을 받는다', '농부들은 의사들과 함께 괭이들을 쓴다'], answer: 0, hint: 'vejjānaṃ=의사들에게(여격 복수), kuddāle=괭이들을' },
  { type: 'quiz', question: '9. Vāṇijo tāpasānaṃ sāṭake dadāti.', options: ['상인은 고행자들에게서 옷들을 받는다', '상인들은 고행자들에게 옷들을 준다', '상인은 고행자들에게 옷들을 준다', '상인은 고행자들과 함께 옷들을 씻는다'], answer: 2, hint: 'tāpasānaṃ=고행자들에게(여격 복수), sāṭake=옷들을' },
  { type: 'quiz', question: '10. Dārakā makkaṭānaṃ phale āharanti.', options: ['아이들은 원숭이들에게 과일들을 가져온다', '아이들은 원숭이들로부터 과일들을 받는다', '아이는 원숭이들에게 과일들을 가져온다', '아이들은 원숭이들과 함께 과일들을 먹는다'], answer: 0, hint: 'makkaṭānaṃ=원숭이들에게(여격 복수), phale=과일들을' },

  // === 마무리 ===
  { type: 'speak', pali: 'Namo tassa bhagavato arahato sammāsambuddhassa', pronKo: '나모 땃사 바가와또 아라하또 삼마-삼붓닷사' },
]
