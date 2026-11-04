// 16과: 명령형 (Imperative) — 명령 + 금지(mā)
// 교재 16과 완전 수록
import type { StepWithoutId } from './types'

const V_IMP = 'Caratha bhikkhave cārikaṃ bahujanahitāya.'
const V_IMP_K = '비구들이여, 많은 사람의 이익을 위해 편력하라.'

export const LESSON_15: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '16과: 명령형', subtitle: 'Pañcamī vibhatti (Imperative)', description: '명령형: ~하라, ~하시오\n금지형: mā + 명령형 = ~하지 마라\n\n3인칭: pacatu / pacantu\n2인칭: paca(pacāhi) / pacatha\n1인칭: pacāmi / pacāma\n\n경전: "Caratha bhikkhave!\n(비구들이여, 행하라!)"', icon: '📣' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_IMP, pronKo: '짜라타 빅카웨 짜-리깡 바후자나히따-야', translation: V_IMP_K, highlight: ['Caratha', 'bhikkhave'], note: 'caratha = carati(행하다)의 명령형 2인칭 복수\ncārikaṃ = 편력(遍歷)을\nbahujanahitāya = 많은 사람(bahujana)의 이익(hita)을 위해\n— 최초 전법 선언(Mv 1.11.1)' },

  // === 명령형 문법 ===
  { type: 'teach-grammar', title: '명령형 활용 — pacati 기준', example: '3인칭: pacatu / pacantu\n2인칭: paca (pacāhi) / pacatha\n1인칭: pacāmi / pacāma', exampleKo: '단수 / 복수', explanation: '명령형 인칭별 어미:\n\n인칭 | 단수 | 복수\n3인칭 | -atu/-etu | -antu/-entu\n2인칭 | -a/-āhi | -atha\n1인칭 | -āmi | -āma\n\n인칭별 의미:\n• 3인칭 명령형 = ~하게 하라 / ~하기를! (기원)\n• 2인칭 단수 두 형태:\n  - paca = 짧은 형 (일상적)\n  - pacāhi = 긴 형 (강조/경전)\n• 1인칭 명령형 = "~합시다" (청유)' },

  // === 금지형 ===
  { type: 'teach-grammar', title: '금지형 — mā + 명령형', example: 'mā gaccha = 가지 마라\nmā gacchatha = 가지 마라 (복수)\nmā bhāyatha = 두려워하지 마라', exampleKo: 'mā + 동사 명령형 = ~하지 마라', explanation: '금지형 구성:\nmā + 명령형(또는 과거형)\n\n예문:\n• mā paca = 요리하지 마라\n• mā pacantu = 요리하지 마라 (3인칭)\n• mā gacchatha = 가지 마라 (너희)\n\n경전 용례:\n• mā bhāyatha = 두려워하지 마라\n• mā pamādaṃ anuyuñjetha\n  = 방일에 빠지지 마라\n\nmā는 동사 바로 앞에 위치합니다.' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pacatu', pronKo: '빠짜뚜', meaning: '그가 요리하게 하라', icon: '🍳', grammar: '명령형 3인칭 단수', baseForm: 'pacati', formNote: '현재: pacati\n명령: pacatu (3인칭)\n복수: pacantu' },
  { type: 'teach', word: 'gaccha / gacchāhi', pronKo: '갓차 / 갓차-히', meaning: '가라!', icon: '🚶', grammar: '명령형 2인칭 단수', baseForm: 'gacchati', formNote: '현재: gacchati\n명령: gaccha / gacchāhi\n복수: gacchatha' },
  { type: 'teach', word: 'tiṭṭha / tiṭṭhāhi', pronKo: '띳타 / 띳타-히', meaning: '서라! 멈춰라!', icon: '✋', grammar: '명령형 2인칭 단수', baseForm: 'tiṭṭhati', formNote: '현재: tiṭṭhati\n명령: tiṭṭha\n복수: tiṭṭhatha' },
  { type: 'teach', word: 'dehi / detha', pronKo: '데히 / 데타', meaning: '주어라!', icon: '🤲', grammar: '명령형 2인칭', baseForm: 'dadāti', formNote: '현재: dadāti/deti\n명령 단수: dehi\n명령 복수: detha' },
  { type: 'teach', word: 'karohi / karotha', pronKo: '까로히 / 까로타', meaning: '행하라!', icon: '⚒️', grammar: '명령형 2인칭', baseForm: 'karoti', formNote: '현재: karoti\n명령 단수: karohi\n명령 복수: karotha\n3인칭: karotu/karontu' },
  { type: 'teach', word: 'suṇāhi / suṇātha', pronKo: '수나-히 / 수나-타', meaning: '들어라!', icon: '👂', grammar: '명령형 2인칭', baseForm: 'suṇāti', formNote: '현재: suṇāti\n명령 단수: suṇāhi\n명령 복수: suṇātha' },
  { type: 'teach', word: 'mā', pronKo: '마-', meaning: '~하지 마라 (금지)', icon: '🚫', grammar: '금지 불변사', baseForm: 'mā', formNote: 'mā + 명령형 = 금지\nmā gaccha = 가지 마라' },
  { type: 'teach', word: 'bhāyati', pronKo: '바-야띠', meaning: '두려워하다', icon: '😨', grammar: '동사 · 현재 3인칭 단수', baseForm: 'bhāyati', formNote: '복수: bhāyanti\n명령: bhāya / bhāyatha\nmā bhāyatha = 두려워하지 마라' },

  // === 예문 (단수+복수+금지) ===
  { type: 'verse', pali: 'Bhikkhu, dhammaṃ suṇāhi!\nBhikkhave, dhammaṃ suṇātha!', pronKo: '빅쿠, 담망 수나-히\n빅카웨, 담망 수나-타', translation: '비구여, 법을 들어라!\n비구들이여, 법을 들어라!', highlight: ['suṇāhi', 'suṇātha'], note: '2인칭 명령형: suṇāhi(단수) / suṇātha(복수)' },
  { type: 'verse', pali: 'Dānaṃ dadātu so.\nDānaṃ dadantu te.', pronKo: '다-낭 다다-뚜 소\n다-낭 다단뚜 떼', translation: '그가 보시를 하기를!\n그들이 보시를 하기를!', highlight: ['dadātu', 'dadantu'], note: '3인칭 명령형 = ~하게 하라 / ~하기를! (기원)\ndadātu(단수) / dadantu(복수)\nso=그, te=그들' },
  { type: 'verse', pali: 'Mā pāpaṃ karohi!\nMā pāpāni karotha!', pronKo: '마- 빠-빵 까로히\n마- 빠-빠-니 까로타', translation: '악을 행하지 마라!\n악들을 행하지 마라!', highlight: ['Mā', 'karohi', 'karotha'], note: 'mā + 명령형 = 금지\nkarohi(단수) / karotha(복수)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Bhikkhu, vihāraṃ gacchāhi!', options: ['비구여, 정사에 가라!', '비구들이여, 정사에 가라!', '비구여, 정사에 간다', '비구여, 정사에 가지 마라!'], answer: 0, hint: 'gacchāhi = 명령형 2인칭 단수 (긴 형)' },
  { type: 'quiz', question: '2. Mā bhāyatha, upāsakā!', options: ['두려워하지 마라, 우바새들이여!', '두려워하라, 우바새들이여!', '두려워하지 마라, 우바새여!', '두려워하지 않는다, 우바새들이여!'], answer: 0, hint: 'mā + bhāyatha(명령 복수) = 두려워하지 마라' },
  { type: 'quiz', question: '3. Dānaṃ dehi, upāsaka!', options: ['보시를 주어라, 우바새여!', '보시를 주어라, 우바새들이여!', '보시를 주지 마라, 우바새여!', '보시를 줬다, 우바새여!'], answer: 0, hint: 'dehi = dadāti의 명령형 2인칭 단수' },
  { type: 'quiz', question: '4. Samaṇā dhammaṃ desentu.', options: ['사문들이 법을 설하게 하라', '사문은 법을 설하게 하라', '사문들은 법을 설한다', '사문들이 법을 설할 것이다'], answer: 0, hint: 'desentu = deseti의 명령형 3인칭 복수' },
  { type: 'quiz', question: '5. Mā pāpaṃ karohi!', options: ['악을 행하지 마라!', '악을 행하라!', '악을 행하지 않는다', '악을 행해야 한다'], answer: 0, hint: 'mā + karohi = 행하지 마라 (금지형)' },
  { type: 'quiz', question: '6. Kumāra, udakaṃ āharāhi!', options: ['소년이여, 물을 가져오라!', '소년들이여, 물을 가져오라!', '소년이여, 물을 마셔라!', '소년이여, 물을 가져오지 마라!'], answer: 0, hint: 'āharāhi = āharati의 명령형 2인칭 단수' },
  { type: 'quiz', question: '7. Gāmaṃ gacchāma.', options: ['마을에 갑시다', '마을에 간다', '마을에 가라', '마을에 갈 것이다'], answer: 0, hint: 'gacchāma = 1인칭 복수 명령형 (청유: ~합시다)' },
  { type: 'quiz', question: '8. Bhikkhave, mā pamādaṃ anuyuñjatha!', options: ['비구들이여, 방일에 빠지지 마라!', '비구여, 방일에 빠지지 마라!', '비구들이여, 방일에 빠져라!', '비구들이여, 방일에 빠지지 않는다!'], answer: 0, hint: 'mā + anuyuñjatha = ~에 빠지지 마라(금지 복수)' },
  { type: 'quiz', question: '9. So sīlaṃ rakkhatu.', options: ['그가 계를 지키게 하라', '그는 계를 지킨다', '그가 계를 지킬 것이다', '그들이 계를 지키게 하라'], answer: 0, hint: 'rakkhatu = 명령형 3인칭 단수, so=그' },
  { type: 'quiz', question: '10. Caratha bhikkhave cārikaṃ!', options: ['비구들이여, 편력하라!', '비구여, 편력하라!', '비구들이여, 편력하지 마라!', '비구들이여, 편력할 것이다!'], answer: 0, hint: 'caratha = carati의 명령형 2인칭 복수' },

  // === 마무리 ===
  { type: 'speak', pali: 'Caratha bhikkhave cārikaṃ bahujanahitāya', pronKo: '짜라타 빅카웨 짜-리깡 바후자나히따-야' },
]
