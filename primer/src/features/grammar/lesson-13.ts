// 14과: 미래형 (Future Tense) — -(i/e)ssa + 현재어미
// 어간별 미래형 활용 + 불규칙 미래형
import type { StepWithoutId } from './types'

const V_FUTURE = 'Buddho lokaṃ vicessati.'
const V_FUTURE_K = '붓다께서 세상을 알게 될 것이다.'

export const LESSON_13: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '14과: 미래형', subtitle: 'Anāgatakāla (Future Tense)', description: '동사 미래형: 어간 + -(i)ssa + 현재어미\n\n• -a어간: pac + issa + ti = pacissati\n• -e어간: cor + essa + ti = coressati\n• -nā어간: kiṇ + issa + ti = kiṇissati\n\n불규칙: gacchati→gamissati 등', icon: '🔮' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_FUTURE, pronKo: '붓도 로깡 위쩻사띠', translation: V_FUTURE_K, highlight: ['vicessati'], note: 'vicessati = vijānāti(알다)의 미래형\nvi + ñā → vicessa + ti\n"알게 될 것이다"' },

  // === 미래형 문법: -a어간 ===
  { type: 'teach-grammar', title: '미래형 활용 — -a어간 (pacati)', example: '3인칭: pacissati / pacissanti\n2인칭: pacissasi / pacissatha\n1인칭: pacissāmi / pacissāma', exampleKo: '단수 / 복수', explanation: '미래형 공식: 어근 + issa + 현재어미\n\npac(요리하다) + issa:\n• pacissati = 그는 요리할 것이다\n• pacissanti = 그들은 요리할 것이다\n• pacissasi = 너는 요리할 것이다\n• pacissatha = 너희는 요리할 것이다\n• pacissāmi = 나는 요리할 것이다\n• pacissāma = 우리는 요리할 것이다\n\n"-ssa-"가 미래의 표지입니다.' },

  // === 미래형 문법: -e어간 ===
  { type: 'teach-grammar', title: '미래형 활용 — -e어간 (coreti)', example: '3인칭: coressati / coressanti\n2인칭: coressasi / coressatha\n1인칭: coressāmi / coressāma', exampleKo: '단수 / 복수', explanation: '-e어간 동사의 미래형:\n어근 + essa + 현재어미\n\ncor(훔치다) → coreti(현재)\ncor + essa + ti = coressati(미래)\n\n다른 예:\n• deseti(설하다) → desessati\n• pūjeti(공양하다) → pūjessati\n• rakkheti(보호하다) → rakhessati' },

  // === 미래형 문법: -nā어간 ===
  { type: 'teach-grammar', title: '미래형 활용 — -nā어간 (kiṇāti)', example: '3인칭: kiṇissati / kiṇissanti\n2인칭: kiṇissasi / kiṇissatha\n1인칭: kiṇissāmi / kiṇissāma', exampleKo: '단수 / 복수', explanation: '-nā어간 동사의 미래형:\n-nā를 버리고 어근 + issa + 어미\n\nkiṇāti(사다) → kiṇ + issa = kiṇissati\njānāti(알다) → jānissati\nsuṇāti(듣다) → suṇissati (또는 sossati)' },

  // === 불규칙 미래형 ===
  { type: 'teach-grammar', title: '불규칙 미래형 — 주의!', example: 'gacchati → gamissati\ndadāti → dassati\ntiṭṭhati → ṭhassati\nkaroti → karissati/kāhiti', exampleKo: '가다 → 갈 것이다\n주다 → 줄 것이다\n서다 → 설 것이다\n하다 → 할 것이다', explanation: '불규칙 미래형은 어근이 변합니다:\n\n• gacchati(가다): gam + issa = gamissati\n  — gacch-가 아닌 원래 어근 gam- 사용\n• dadāti(주다): dā → dassati\n  — 어근 축약\n• tiṭṭhati(서다): ṭhā → ṭhassati\n  — 어근 ṭhā 사용\n• karoti(하다): kar + issa = karissati\n  또는 kāhiti (고형)\n\n이 4개는 반드시 암기!' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pacissati', pronKo: '빠찟사띠', meaning: '요리할 것이다', icon: '🍳', grammar: '미래형 3인칭 단수', baseForm: 'pacati', formNote: '현재: pacati\n미래: pacissati\npac + issa + ti' },
  { type: 'teach', word: 'gamissati', pronKo: '가밋사띠', meaning: '갈 것이다', icon: '🚶', grammar: '미래형 3인칭 단수 (불규칙)', baseForm: 'gacchati', formNote: '현재: gacchati\n미래: gamissati\n어근 gam + issa + ti' },
  { type: 'teach', word: 'dassati', pronKo: '닷사띠', meaning: '줄 것이다', icon: '🎁', grammar: '미래형 3인칭 단수 (불규칙)', baseForm: 'dadāti', formNote: '현재: dadāti / deti\n미래: dassati\n어근 dā → dass + ti' },
  { type: 'teach', word: 'ṭhassati', pronKo: '탓사띠', meaning: '설 것이다', icon: '🧍', grammar: '미래형 3인칭 단수 (불규칙)', baseForm: 'tiṭṭhati', formNote: '현재: tiṭṭhati\n미래: ṭhassati\n어근 ṭhā → ṭhass + ti' },
  { type: 'teach', word: 'karissati', pronKo: '까릿사띠', meaning: '할 것이다', icon: '⚒️', grammar: '미래형 3인칭 단수 (불규칙)', baseForm: 'karoti', formNote: '현재: karoti\n미래: karissati / kāhiti\nkar + issa + ti' },
  { type: 'teach', word: 'coressati', pronKo: '쪼렛사띠', meaning: '훔칠 것이다', icon: '🦹', grammar: '미래형 3인칭 단수', baseForm: 'coreti', formNote: '현재: coreti\n미래: coressati\ncor + essa + ti' },
  { type: 'teach', word: 'kiṇissati', pronKo: '끼닛사띠', meaning: '살 것이다 (구매)', icon: '🛒', grammar: '미래형 3인칭 단수', baseForm: 'kiṇāti', formNote: '현재: kiṇāti\n미래: kiṇissati\nkiṇ + issa + ti' },
  { type: 'teach', word: 'desessati', pronKo: '데셋사띠', meaning: '설할 것이다', icon: '📖', grammar: '미래형 3인칭 단수', baseForm: 'deseti', formNote: '현재: deseti\n미래: desessati\ndes + essa + ti', buddhism: 'dhammaṃ desessati = 법을 설할 것이다' },

  // === 예문 ===
  { type: 'verse', pali: 'Buddho dhammaṃ desessati.\nBuddhā dhammaṃ desessanti.', pronKo: '붓도 담망 데셋사띠\n붓다- 담망 데셋산띠', translation: '붓다께서 법을 설할 것이다.\n붓다들께서 법을 설할 것이다.', highlight: ['desessati', 'desessanti'], note: '미래형: -essati(단수) / -essanti(복수)\n-e어간 동사의 미래형 패턴' },
  { type: 'verse', pali: 'Ahaṃ gāmaṃ gamissāmi.\nMayaṃ gāmaṃ gamissāma.', pronKo: '아항 가-망 가밋사-미\n마양 가-망 가밋사-마', translation: '나는 마을에 갈 것이다.\n우리는 마을에 갈 것이다.', highlight: ['gamissāmi', 'gamissāma'], note: '1인칭 미래형: -issāmi(단수) / -issāma(복수)\nahaṃ=나, mayaṃ=우리' },
  { type: 'verse', pali: 'Tvaṃ dānaṃ dassasi.\nTumhe dānaṃ dassatha.', pronKo: '뜨왕 다-낭 닷사시\n뚬헤 다-낭 닷사타', translation: '너는 보시를 줄 것이다.\n너희는 보시를 줄 것이다.', highlight: ['dassasi', 'dassatha'], note: '2인칭 미래형: dassasi(단수) / dassatha(복수)\ndadāti의 불규칙 미래형' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Samaṇo gāmaṃ gamissati.', options: ['사문은 마을에 갈 것이다', '사문은 마을에 간다', '사문은 마을에서 산다', '사문들은 마을에 갈 것이다'], answer: 0, hint: 'gamissati = gacchati의 미래형 (갈 것이다)' },
  { type: 'quiz', question: '2. Kassako khettamhi ṭhassati.', options: ['농부는 들에 설 것이다', '농부는 들에 서 있다', '농부는 들에서 일한다', '농부들은 들에 설 것이다'], answer: 0, hint: 'ṭhassati = tiṭṭhati의 미래형 (설 것이다)' },
  { type: 'quiz', question: '3. Upāsakā dānaṃ dassanti.', options: ['우바새들은 보시를 줄 것이다', '우바새는 보시를 줄 것이다', '우바새들은 보시를 준다', '우바새들은 보시를 받을 것이다'], answer: 0, hint: 'dassanti = dadāti의 미래형 복수 (줄 것이다)' },
  { type: 'quiz', question: '4. Ahaṃ odanaṃ pacissāmi.', options: ['나는 밥을 요리할 것이다', '나는 밥을 요리한다', '너는 밥을 요리할 것이다', '나는 밥을 먹을 것이다'], answer: 0, hint: 'pacissāmi = pacati의 1인칭 단수 미래형' },
  { type: 'quiz', question: '5. Coro bhaṇḍaṃ coressati.', options: ['도둑은 물건을 훔칠 것이다', '도둑은 물건을 훔친다', '도둑들은 물건을 훔칠 것이다', '도둑은 물건을 버릴 것이다'], answer: 0, hint: 'coressati = coreti의 미래형 (-e어간)' },
  { type: 'quiz', question: '6. Tumhe nagaraṃ gamissatha.', options: ['너희는 도시에 갈 것이다', '너는 도시에 갈 것이다', '너희는 도시에 간다', '우리는 도시에 갈 것이다'], answer: 0, hint: 'gamissatha = 2인칭 복수 미래형, tumhe = 너희' },
  { type: 'quiz', question: '7. Bhūpālo sīlaṃ rakkhissati.', options: ['왕은 계를 지킬 것이다', '왕은 계를 지킨다', '왕들은 계를 지킬 것이다', '왕은 법을 지킬 것이다'], answer: 0, hint: 'rakkhissati = rakkhati의 미래형 (지킬 것이다)' },
  { type: 'quiz', question: '8. Mayaṃ vihāre viharissāma.', options: ['우리는 정사에서 머물 것이다', '나는 정사에서 머물 것이다', '우리는 정사에서 머문다', '우리는 마을에서 머물 것이다'], answer: 0, hint: 'viharissāma = viharati의 1인칭 복수 미래형' },
  { type: 'quiz', question: '9. Manusso bhaṇḍāni kiṇissati.', options: ['사람은 물건들을 살 것이다', '사람은 물건을 판다', '사람들은 물건들을 살 것이다', '사람은 물건들을 산다'], answer: 0, hint: 'kiṇissati = kiṇāti의 미래형 (살 것이다)' },
  { type: 'quiz', question: '10. Satthā dhammaṃ desessati.', options: ['스승은 법을 설할 것이다', '스승은 법을 설한다', '스승들은 법을 설할 것이다', '스승은 법을 들을 것이다'], answer: 0, hint: 'desessati = deseti의 미래형 (-e어간)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddho dhammaṃ desessati', pronKo: '붓도 담망 데셋사띠' },
]
