// 상관 구문 (ya … ta …) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_CORRELATIVE: StepWithoutId[] = [
  {"type": "intro", "title": "상관 구문", "subtitle": "ya- … ta- … 짝 맞추기", "description": "관계사(ya-)로 시작한 앞부분을\n지시사(ta-)가 받는 구문입니다.\n\nyathā … tathā … (~하는 대로 그렇게)\nyasmā … tasmā … (~이기 때문에 그러므로)", "icon": "🔗"},
  {"type": "teach-grammar", "title": "짝 목록", "example": "yo … so …\nyathā … tathā …\nyattha … tattha …\nyadā … tadā …\nyasmā … tasmā …\nyāva … tāva …", "exampleKo": "~하는 사람은, 그는\n~하는 대로, 그렇게\n~하는 곳에, 거기에\n~할 때, 그때\n~이기 때문에, 그러므로\n~하는 만큼(동안), 그만큼(그동안)", "explanation": "앞부분(ya-)은 조건·이유·때를,\n뒷부분(ta-)은 결과를 나타냅니다.\n\n옮길 때는 ya- 부분을 먼저 묶고\nta- 부분에서 문장을 닫으면 됩니다."},
  {"type": "teach", "word": "yathā", "pronKo": "야타-", "meaning": "~하는 대로, ~처럼", "icon": "📏", "grammar": "관계 부사"},
  {"type": "teach", "word": "tathā", "pronKo": "따타-", "meaning": "그렇게, 그와 같이", "icon": "📐", "grammar": "지시 부사"},
  {"type": "teach", "word": "yasmā", "pronKo": "야스마-", "meaning": "~이기 때문에", "icon": "❔", "grammar": "관계 대명사 탈격 (부사적)", "baseForm": "ya-"},
  {"type": "teach", "word": "tasmā", "pronKo": "따스마-", "meaning": "그러므로", "icon": "✅", "grammar": "지시 대명사 탈격 (부사적)", "baseForm": "ta-"},
  {"type": "verse", "pali": "Yathā yathā vā panassa kāyo paṇihito hoti, tathā tathā naṃ pajānāti.", "pronKo": "야타- 야타- 와- 빠낫사 까-요- 빠니히또- 호-띠, 따타- 따타- 낭 빠자-나-띠.", "translation": "그의 몸이 어떤 자세로 놓여 있든, 그대로 그것을 분명히 안다.", "highlight": ["Yathā", "tathā"], "note": "대념처경(MN 10)\nyathā yathā … tathā tathā … = 어떻게 ~하든 그대로"},
  {"type": "verse", "pali": "Yasmā ca kho, bhikkhave, rūpaṃ anattā, tasmā rūpaṃ ābādhāya saṃvattati.", "pronKo": "야스마- 짜 코-, 빅카웨-, 루-빵 아낫따-, 따스마- 루-빵 아-바-다-야 상왓따띠.", "translation": "비구들이여, 물질은 자아가 아니기 때문에, 그러므로 물질은 병으로 이끈다.", "highlight": ["Yasmā", "tasmā"], "note": "무아상경(SN 22.59)\nyasmā … tasmā … = ~이기 때문에, 그러므로"},
  {"type": "quiz", "question": "\"yasmā … tasmā …\"의 뜻은?", "options": ["~이기 때문에, 그러므로", "~하는 곳에, 거기에", "~할 때, 그때", "~하는 대로, 그렇게"], "answer": 0, "hint": "탈격 (이유)", "explain": "yasmā(때문에) … tasmā(그러므로)"},
  {"type": "quiz", "question": "\"yathā\"와 짝을 이루는 말은?", "options": ["tathā", "tasmā", "tattha", "tadā"], "answer": 0, "hint": "~하는 대로 … 그렇게", "explain": "yathā … tathā … (~하는 대로 그렇게)"},
  {"type": "quiz", "question": "\"yattha … tattha …\"의 뜻은?", "options": ["~하는 곳에, 거기에", "~할 때, 그때", "~이기 때문에, 그러므로", "~하는 만큼, 그만큼"], "answer": 0, "hint": "-ttha = 장소", "explain": "yattha(~하는 곳에) … tattha(거기에)"},
  {"type": "speak", "pali": "Yasmā ca kho, bhikkhave, rūpaṃ anattā, tasmā rūpaṃ ābādhāya saṃvattati.", "pronKo": "야스마- 짜 코-, 빅카웨-, 루-빵 아낫따-, 따스마- 루-빵 아-바-다-야 상왓따띠."},
]
