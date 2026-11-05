// 비교급·최상급 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_COMPARISON: StepWithoutId[] = [
  {"type": "intro", "title": "비교급·최상급", "subtitle": "더 ~한 / 가장 ~한", "description": "형용사에 어미를 붙여 \"더 ~한\", \"가장 ~한\"을 만듭니다.\n\n축복경 후렴 maṅgalamuttamaṃ(최상의 축복)의\nuttama도 최상급입니다.", "icon": "📈"},
  {"type": "teach-grammar", "title": "두 가지 방법", "example": "-tara / -tama:\n  pāpa → pāpatara → pāpatama\n-iya(-yya) / -iṭṭha:\n  pāpa → pāpiya → pāpiṭṭha", "exampleKo": "나쁜 → 더 나쁜 → 가장 나쁜\n\n나쁜 → 더 나쁜 → 가장 나쁜", "explanation": "두 방법 모두 쓰입니다.\n\n특별한 꼴 (꼭 외우기):\n• seyyo (더 나은) ↔ seṭṭha (가장 뛰어난)\n• uttama (최상의)\n• jeṭṭha (가장 나이 많은, 맏이)"},
  {"type": "teach-grammar", "title": "비교 대상은 탈격", "example": "Sīlaṃ dhanato seyyo.", "exampleKo": "계는 재물보다 낫다.", "explanation": "\"~보다\"는 탈격(-to, -ā, -mhā, -smā)으로 나타냅니다.\n  dhanato = 재물보다\n\n최상급은 소유격·처소격과 함께\n\"~ 가운데 가장\"을 나타냅니다."},
  {"type": "teach", "word": "seyyo", "pronKo": "세이요-", "meaning": "더 나은", "icon": "👍", "grammar": "형용사 비교급, 주격 단수", "formNote": "최상급: seṭṭha (가장 뛰어난)"},
  {"type": "teach", "word": "seṭṭha", "pronKo": "셋타", "meaning": "가장 뛰어난, 으뜸인", "icon": "🥇", "grammar": "형용사 최상급", "formNote": "manoseṭṭhā = 마음이 으뜸인"},
  {"type": "teach", "word": "uttama", "pronKo": "웃따마", "meaning": "최상의, 최상인", "icon": "🏆", "grammar": "형용사 최상급", "baseForm": "ud (위) + tama", "formNote": "maṅgalamuttamaṃ = maṅgalaṃ + uttamaṃ (최상의 축복)"},
  {"type": "verse", "pali": "Ekaṃ atthapadaṃ seyyo, yaṃ sutvā upasammati.", "pronKo": "에-깡 앗타빠당 세이요-, 양 수뜨와- 우빠삼마띠.", "translation": "들으면 고요해지는 이로운 한 구절이 (뜻 없는 천 마디보다) 더 낫다.", "highlight": ["seyyo"], "note": "법구경 100게의 뒷부분\nseyyo = 더 나은 (비교급)"},
  {"type": "verse", "pali": "Manopubbaṅgamā dhammā, manoseṭṭhā manomayā.", "pronKo": "마노-뿝방가마- 담마-, 마노-셋타- 마노-마야-.", "translation": "마음이 모든 법의 선구자이고, 마음이 으뜸이며, 마음으로 만들어진다.", "highlight": ["manoseṭṭhā"], "note": "법구경 1게\nmanoseṭṭhā = mano(마음) + seṭṭha(으뜸) — 소유 복합어\n\n왜 소유 복합어인가?\n법구경 주석서(Dhammapada-aṭṭhakathā)는 이 낱말을\n\"마음이 이들(etesaṃ)의 으뜸이다\"라고 풀이합니다.\n이처럼 관계대명사 소유격(etesaṃ, yassa …)으로 풀어 쓰는 것이\n소유 복합어의 전형적인 풀이 방식입니다.\n→ \"마음을 으뜸(지배자)으로 가지는 [정신적 법들]\""},
  {"type": "verse", "pali": "Etaṃ maṅgalamuttamaṃ.", "pronKo": "에-땅 망갈라뭇따망.", "translation": "이것이 최상의 축복이다.", "highlight": ["maṅgalamuttamaṃ"], "note": "축복경의 후렴\nmaṅgalaṃ + uttamaṃ (연성)"},
  {"type": "quiz", "question": "\"seyyo\"의 뜻은?", "options": ["더 나은", "가장 나쁜", "나쁜", "처음의"], "answer": 0, "hint": "비교급", "explain": "seyyo는 \"더 나은\"이라는 비교급입니다. 최상급은 seṭṭha."},
  {"type": "quiz", "question": "\"재물보다\"처럼 비교 대상은 무슨 격?", "options": ["탈격", "소유격", "도구격", "주격"], "answer": 0, "hint": "dhanato", "explain": "비교 대상(~보다)은 탈격으로 나타냅니다."},
  {"type": "quiz", "question": "\"maṅgalamuttamaṃ\"을 풀면?", "options": ["maṅgalaṃ + uttamaṃ (최상의 축복)", "maṅgala + muttamaṃ", "maṅgalam + uttama (축복의 위)", "maṅga + lamuttamaṃ"], "answer": 0, "hint": "연성", "explain": "ṃ 뒤에 모음이 오면 m으로 이어집니다."},
  {"type": "speak", "pali": "Etaṃ maṅgalamuttamaṃ.", "pronKo": "에-땅 망갈라뭇따망.", "translation": "이것이 최상의 축복이다."},
]
