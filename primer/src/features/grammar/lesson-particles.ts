// 강조·담화 불변화사 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_PARTICLES: StepWithoutId[] = [
  {"type": "intro", "title": "강조·담화 불변화사", "subtitle": "kho · pana · hi · eva · api · nu …", "description": "경전 문장 곳곳에 붙는 짧은 말들입니다.\n뜻이 작아 보이지만 문장의 흐름과 강조를 알려 줍니다.\n\n대부분 문장 첫 낱말 바로 뒤에 옵니다.", "icon": "✨"},
  {"type": "teach-grammar", "title": "자주 나오는 불변화사 ①", "example": "kho\npana\nhi\neva (va)\napi (pi)", "exampleKo": "실로, 참으로 (가벼운 강조)\n그런데, 또한 (화제 전환)\n실로, 왜냐하면\n바로, 오직 (강조)\n~도, ~조차", "explanation": "• tatra kho = 거기서 (실로)\n• idaṃ kho pana = 그런데 이것이\n• sabbeva = sabbe + eva (모두 다)\n• dutiyampi = dutiyaṃ + pi (두 번째에도)"},
  {"type": "teach-grammar", "title": "자주 나오는 불변화사 ②", "example": "nu\nkira\nnāma\natha\ntena hi", "exampleKo": "~인가? (의문)\n~라고 한다 (전해 들음)\n~라는 (이름), 참으로\n그때, 그러자\n그렇다면", "explanation": "• kiṃ nu = 무엇인가?\n• kammāsadhammaṃ nāma = 깜마사담마라는\n• tena hi, bhikkhave = 그렇다면, 비구들이여"},
  {"type": "teach", "word": "kho", "pronKo": "코-", "meaning": "실로, 참으로", "icon": "✨", "grammar": "불변화사 (강조)"},
  {"type": "teach", "word": "pana", "pronKo": "빠나", "meaning": "그런데, 또한", "icon": "↪️", "grammar": "불변화사 (화제 전환)"},
  {"type": "teach", "word": "eva", "pronKo": "에-와", "meaning": "바로, 오직", "icon": "☝️", "grammar": "불변화사 (강조)", "formNote": "줄어서 va, 연성으로 -eva (sabbeva)"},
  {"type": "teach", "word": "nāma", "pronKo": "나-마", "meaning": "~라는 (이름), 참으로", "icon": "🏷️", "grammar": "불변화사"},
  {"type": "verse", "pali": "Tatra kho bhagavā bhikkhū āmantesi.", "pronKo": "따뜨라 코- 바가와- 빅쿠- 아-만떼-시.", "translation": "거기서 세존께서는 비구들을 부르셨다.", "highlight": ["kho"], "note": "경 첫머리의 정형구\nkho = 가벼운 강조"},
  {"type": "verse", "pali": "Idaṃ kho pana, bhikkhave, dukkhaṃ ariyasaccaṃ.", "pronKo": "이당 코- 빠나, 빅카웨-, 둑캉 아리야삿짱.", "translation": "비구들이여, 그런데 이것이 괴로움의 성스러운 진리이다.", "highlight": ["kho", "pana"], "note": "초전법륜경(SN 56.11)\nkho pana = 그런데 (새 화제)"},
  {"type": "quiz", "question": "\"sabbeva\"를 풀면?", "options": ["sabbe + eva (모두 다)", "sabba + iva", "sabbe + va (또는)", "sabbe + vā"], "answer": 0, "hint": "강조 eva", "explain": "sabbe(모두) + eva(바로) = 모두 다"},
  {"type": "quiz", "question": "\"kiṃ nu\"의 nu는?", "options": ["의문 (~인가?)", "부정 (아니다)", "강조 (바로)", "인용 (~라고)"], "answer": 0, "hint": "물음", "explain": "nu는 의문을 나타냅니다."},
  {"type": "quiz", "question": "\"tena hi\"의 뜻은?", "options": ["그렇다면", "그러므로 그는", "그에 의해", "그것도"], "answer": 0, "hint": "관용구", "explain": "tena hi = 그렇다면"},
  {"type": "speak", "pali": "Idaṃ kho pana, bhikkhave, dukkhaṃ ariyasaccaṃ.", "pronKo": "이당 코- 빠나, 빅카웨-, 둑캉 아리야삿짱.", "translation": "비구들이여, 그런데 이것이 괴로움의 성스러운 진리이다."},
]
