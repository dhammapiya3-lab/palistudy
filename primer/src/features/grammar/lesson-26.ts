// 29과: -i/-u 중성명사 격변화
import type { StepWithoutId } from './types'

export const LESSON_26: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '29과: -i/-u 중성명사', subtitle: 'Napuṃsakaliṅga -i/-u nāma', description: '-i 중성명사 (aṭṭhi 기준)\n-u 중성명사 (cakkhu 기준)\n\n중성명사는 주격=목적격이 핵심!', icon: '🦴' },

  // === -i 중성명사 격변화 (aṭṭhi) ===
  { type: 'teach-grammar', title: '-i 중성명사 격변화 (aṭṭhi 뼈)', example: '주격: aṭṭhi / aṭṭhī,aṭṭhīni\n목적격: aṭṭhiṃ / aṭṭhī,aṭṭhīni\n도구격: aṭṭhinā / aṭṭhīhi\n여격: aṭṭhino,aṭṭhissa / aṭṭhīnaṃ\n탈격: aṭṭhinā / aṭṭhīhi\n소유격: aṭṭhino,aṭṭhissa / aṭṭhīnaṃ\n처소격: aṭṭhini,aṭṭhimhi / aṭṭhīsu\n호격: aṭṭhi / aṭṭhī,aṭṭhīni', exampleKo: '단수: -inā(도구격), -ino/-issa(여/소유)\n복수: -ī/-īni/-īhi/-īnaṃ/-īsu', explanation: '-i 중성명사 핵심:\n• 주격=목적격 (중성의 특징)\n• 단수 주격: -i / 복수 주격: -ī 또는 -īni\n• 도구격/탈격 단수: -inā\n• 처소격 단수: -ini 또는 -imhi\n• 남성 -i와 비교: 주격/목적격만 차이' },

  // === -i 중성명사 단어 ===
  { type: 'teach', word: 'aṭṭhi', pronKo: '앗티', meaning: '뼈', icon: '🦴', grammar: '-i 중성명사', formNote: '주격: aṭṭhi / aṭṭhī,aṭṭhīni' },
  { type: 'teach', word: 'vāri', pronKo: '와-리', meaning: '물', icon: '💧', grammar: '-i 중성명사', formNote: '주격: vāri / vārī,vārīni' },
  { type: 'teach', word: 'akkhi', pronKo: '악키', meaning: '눈(目)', icon: '👁️', grammar: '-i 중성명사', formNote: '주격: akkhi / akkhī,akkhīni' },
  { type: 'teach', word: 'sappi', pronKo: '삽삐', meaning: '정제버터', icon: '🧈', grammar: '-i 중성명사', formNote: '주격: sappi / sappī,sappīni' },
  { type: 'teach', word: 'dadhi', pronKo: '다디', meaning: '응유(凝乳)', icon: '🥛', grammar: '-i 중성명사', formNote: '주격: dadhi / dadhī,dadhīni' },
  { type: 'teach', word: 'acci', pronKo: '앗찌', meaning: '불꽃', icon: '🕯️', grammar: '-i 중성명사', formNote: '주격: acci / accī,accīni' },
  { type: 'teach', word: 'satthi', pronKo: '삿티', meaning: '넓적다리', icon: '🦵', grammar: '-i 중성명사', formNote: '주격: satthi / satthī,satthīni' },

  // === -u 중성명사 격변화 (cakkhu) ===
  { type: 'teach-grammar', title: '-u 중성명사 격변화 (cakkhu 눈)', example: '주격: cakkhu / cakkhū,cakkhūni\n목적격: cakkhuṃ / cakkhū,cakkhūni\n도구격: cakkhunā / cakkhūhi\n여격: cakkhuno,cakkhussa / cakkhūnaṃ\n탈격: cakkhunā / cakkhūhi\n소유격: cakkhuno,cakkhussa / cakkhūnaṃ\n처소격: cakkhuni,cakkhumhi / cakkhūsu\n호격: cakkhu / cakkhū,cakkhūni', exampleKo: '단수: -unā(도구격), -uno/-ussa(여/소유)\n복수: -ū/-ūni/-ūhi/-ūnaṃ/-ūsu', explanation: '-u 중성명사 핵심:\n• 주격=목적격 (중성의 특징)\n• -i 중성과 동일 패턴: i→u 치환\n• 단수 처소격: -uni 또는 -umhi\n• 복수 주격: -ū 또는 -ūni' },

  // === -u 중성명사 단어 ===
  { type: 'teach', word: 'cakkhu', pronKo: '짝쿠', meaning: '눈(目)', icon: '👁️', grammar: '-u 중성명사', formNote: '주격: cakkhu / cakkhū,cakkhūni', buddhism: '6근(saḷāyatana) 중 하나' },
  { type: 'teach', word: 'dhanu', pronKo: '다누', meaning: '활', icon: '🏹', grammar: '-u 중성명사', formNote: '주격: dhanu / dhanū,dhanūni' },
  { type: 'teach', word: 'madhu', pronKo: '마두', meaning: '꿀', icon: '🍯', grammar: '-u 중성명사', formNote: '주격: madhu / madhū,madhūni' },
  { type: 'teach', word: 'assu', pronKo: '앗수', meaning: '눈물', icon: '😢', grammar: '-u 중성명사', formNote: '주격: assu / assū,assūni' },
  { type: 'teach', word: 'jāṇu', pronKo: '자-누', meaning: '무릎', icon: '🦵', grammar: '-u 중성명사', formNote: '주격: jāṇu / jāṇū,jāṇūni' },
  { type: 'teach', word: 'dāru', pronKo: '다-루', meaning: '장작', icon: '🪵', grammar: '-u 중성명사', formNote: '주격: dāru / dārū,dārūni' },
  { type: 'teach', word: 'ambu', pronKo: '암부', meaning: '물', icon: '🌊', grammar: '-u 중성명사', formNote: '주격: ambu / ambū,ambūni' },
  { type: 'teach', word: 'vasu', pronKo: '와수', meaning: '재산', icon: '💰', grammar: '-u 중성명사', formNote: '주격: vasu / vasū,vasūni' },
  { type: 'teach', word: 'vatthu', pronKo: '왓투', meaning: '사건, 토지', icon: '📋', grammar: '-u 중성명사', formNote: '주격: vatthu / vatthū,vatthūni' },

  // === 동사 ===
  { type: 'teach', word: 'anukampati', pronKo: '아누깜빠띠', meaning: '연민하다', icon: '🙏', grammar: '동사 (anu + kampati)' },
  { type: 'teach', word: 'vāceti', pronKo: '와-쩨띠', meaning: '가르치다, 읽게 하다', icon: '📖', grammar: '동사 (사역형)' },
  { type: 'teach', word: 'sammisseti', pronKo: '삼밋세띠', meaning: '섞다', icon: '🔄', grammar: '동사 (saṃ + misseti)' },
  { type: 'teach', word: 'pabbajati', pronKo: '빱바자띠', meaning: '출가하다', icon: '🧘', grammar: '동사', buddhism: '재가→출가 전환' },
  { type: 'teach', word: 'parājeti', pronKo: '빠라-제띠', meaning: '패배시키다', icon: '⚔️', grammar: '동사 (parā + jeti)' },
  { type: 'teach', word: 'anugacchati', pronKo: '아누갓차띠', meaning: '따르다', icon: '🚶', grammar: '동사 (anu + gacchati)' },
  { type: 'teach', word: 'vibhajati', pronKo: '위바자띠', meaning: '분배하다', icon: '⚖️', grammar: '동사 (vi + bhajati)', buddhism: 'vibhajjavāda = 분별설부' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Aṭṭhīni sarīre honti.', options: ['뼈들은 몸에 있다', '뼈는 몸에 있다', '뼈들은 몸을 만든다', '뼈들은 몸에서 나온다'], answer: 0, hint: 'aṭṭhīni = 뼈들(복수), sarīre = 몸에서' },
  { type: 'quiz', question: '2. cakkhu의 도구격 단수는?', options: ['cakkhunā', 'cakkhuṃ', 'cakkhūhi', 'cakkhussa'], answer: 0, hint: '-u 중성명사 도구격 단수 = -unā' },
  { type: 'quiz', question: '3. Vārinā khettaṃ siñcati.', options: ['물로 밭에 물을 준다', '물을 밭에서 가져온다', '물이 밭으로 흐른다', '물로 밭을 씻는다'], answer: 0, hint: 'vārinā = 물로(도구격), siñcati = 물을 주다' },
  { type: 'quiz', question: '4. aṭṭhi의 처소격 단수는?', options: ['aṭṭhini 또는 aṭṭhimhi', 'aṭṭhīsu', 'aṭṭhiyā', 'aṭṭhismiṃ'], answer: 0, hint: '-i 중성명사 처소격 단수 = -ini/-imhi' },
  { type: 'quiz', question: '5. Bhikkhu dadhiṃ bhuñjati.', options: ['비구는 응유를 먹는다', '비구들은 응유를 먹는다', '비구는 응유를 만든다', '비구는 우유를 먹는다'], answer: 0, hint: 'dadhiṃ = 응유를(목적격), bhuñjati = 먹다' },
  { type: 'quiz', question: '6. Sappiṃ madhunā sammisseti.', options: ['버터를 꿀과 섞는다', '꿀을 버터로 섞는다', '버터와 꿀을 먹는다', '버터는 꿀에 있다'], answer: 0, hint: 'sappi = 버터(목적격=주격), madhunā = 꿀로(도구격)' },
  { type: 'quiz', question: '7. Kumāro dārunā aggiṃ karoti.', options: ['소년은 장작으로 불을 만든다', '소년은 장작에 불을 놓는다', '소년은 장작을 불에 넣는다', '소년은 장작과 불을 가져온다'], answer: 0, hint: 'dārunā = 장작으로(도구격), aggiṃ = 불을' },
  { type: 'quiz', question: '8. Bhagavā loke anukampati.', options: ['세존께서는 세상 사람들을 연민한다', '세존께서는 세상에서 머문다', '세존께서는 세상을 가르친다', '세존께서는 세상으로 간다'], answer: 0, hint: 'anukampati = 연민하다' },
  { type: 'quiz', question: '9. Dārako pabbajati.', options: ['소년은 출가한다', '소년은 돌아온다', '소년들은 출가한다', '소년은 도망간다'], answer: 0, hint: 'pabbajati = 출가하다' },
  { type: 'quiz', question: '10. Cakkhuṃ aniccaṃ, cakkhuṃ anattā.', options: ['눈은 무상하고, 눈은 무아이다', '눈은 영원하고, 눈은 자아이다', '눈을 보고, 눈을 감는다', '눈이 아프고, 눈이 닫힌다'], answer: 0, hint: 'aniccaṃ = 무상, anattā = 무아 (SN 35)' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Cakkhuṃ bhikkhave anattā.\nYadanattā taṃ netaṃ mama,\nnesohamasmi, na meso attāti.', pronKo: '짝쿵 빅카웨 아낫따-. 야다낫따- 땅 네땅 마마, 네소하마스미, 나 메소 앗따-띠.', translation: '비구들이여, 눈은 무아이다.\n무아인 것, 그것은 나의 것이 아니고,\n그것은 내가 아니며, 그것은 나의 자아가 아니다.', highlight: ['Cakkhuṃ', 'anattā'], note: '여기서 cakkhuṃ은 cakkhu의 주격.' },

  // === 마무리 ===
  { type: 'speak', pali: 'Cakkhuṃ aniccaṃ, cakkhuṃ anattā', pronKo: '짝쿵 아닛짱, 짝쿵 아낫따-.' },
]
