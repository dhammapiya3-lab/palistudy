// 격의 특수 용법 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_CASE_USES: StepWithoutId[] = [
  {"type": "intro", "title": "격의 특수 용법", "subtitle": "기본 뜻 너머의 쓰임", "description": "격에는 기본 뜻 말고도\n경전에 자주 나오는 특별한 쓰임이 있습니다.\n\nekaṃ samayaṃ (한때) — 목적격인데 \"~을\"이 아닙니다.", "icon": "🎯"},
  {"type": "teach-grammar", "title": "때를 나타내는 목적격·도구격", "example": "ekaṃ samayaṃ\nrattiṃ\nkālena", "exampleKo": "한때\n밤에, 밤새\n알맞은 때에", "explanation": "• 목적격: 때·기간 (언제, 얼마 동안)\n  ekaṃ samayaṃ = 한때\n• 도구격: 알맞은 때·방식\n  kālena = 알맞은 때에"},
  {"type": "teach-grammar", "title": "목적의 여격 · 원인의 탈격", "example": "nibbānāya saṃvattati\njātipaccayā jarāmaraṇaṃ", "exampleKo": "열반으로 이끈다 (열반을 위해)\n태어남을 조건으로 늙음과 죽음이 (있다)", "explanation": "• 여격 -āya: 목적·결과 \"~을 위해, ~으로\"\n  abhiññāya, sambodhāya, nibbānāya\n• 탈격: 원인·조건 \"~ 때문에, ~을 조건으로\"\n  jātipaccayā (태어남을 조건으로)"},
  {"type": "teach-grammar", "title": "\"~에 관하여\"의 처소격", "example": "rūpe\nvedanāya\nkāye kāyānupassī", "exampleKo": "물질에 관하여\n느낌에 관하여\n몸에서 (몸에 관하여) 몸을 따라 관찰하는", "explanation": "처소격은 장소(~에)만이 아니라\n\"~에 대하여, ~에 관하여\"를 나타내기도 합니다.\n  na ca labbhati rūpe = 물질에 관해서는 될 수 없다"},
  {"type": "teach", "word": "samayaṃ", "pronKo": "사마양", "meaning": "때 (한때)", "icon": "⏰", "grammar": "남성명사, 목적격 단수 (때)", "baseForm": "samaya (때)", "formNote": "ekaṃ samayaṃ = 한때"},
  {"type": "teach", "word": "kālena", "pronKo": "깔-레-나", "meaning": "알맞은 때에", "icon": "🕰️", "grammar": "남성명사, 도구격 단수 (때)", "baseForm": "kāla (때)"},
  {"type": "teach", "word": "nibbānāya", "pronKo": "닙바-나-야", "meaning": "열반으로, 열반을 위해", "icon": "🪷", "grammar": "중성명사, 여격 단수 (목적)", "baseForm": "nibbāna"},
  {"type": "teach", "word": "jātipaccayā", "pronKo": "자-띠빳짜야-", "meaning": "태어남을 조건으로", "icon": "🌱", "grammar": "복합어, 탈격 단수 (원인)", "baseForm": "jāti (태어남) + paccaya (조건)"},
  {"type": "verse", "pali": "Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.", "pronKo": "에-왕 메- 수땅 — 에-깡 사마양 바가와- 사-왓티양 위하라띠 제-따와네- 아나-타삔디깟사 아-라-메-.", "translation": "이와 같이 나는 들었다. 한때 세존께서는 사왓티의 제따 숲, 아나타삔디까의 동산에 머무셨다.", "highlight": ["samayaṃ"], "note": "ekaṃ samayaṃ = 때를 나타내는 목적격"},
  {"type": "verse", "pali": "Upasamāya abhiññāya sambodhāya nibbānāya saṃvattati.", "pronKo": "우빠사마-야 아빈냐-야 삼보-다-야 닙바-나-야 상왓따띠.", "translation": "고요함으로, 최상의 앎으로, 바른 깨달음으로, 열반으로 이끈다.", "highlight": ["Upasamāya", "abhiññāya", "sambodhāya", "nibbānāya"], "note": "초전법륜경(SN 56.11)의 중도 설명\n-āya 넷 모두 목적의 여격"},
  {"type": "quiz", "question": "\"ekaṃ samayaṃ\"의 samayaṃ은 어떤 용법?", "options": ["때를 나타내는 목적격", "동사의 목적어", "목적의 여격", "처소격"], "answer": 0, "hint": "\"한때\"", "explain": "목적격이 때·기간을 나타냅니다."},
  {"type": "quiz", "question": "\"nibbānāya saṃvattati\"의 nibbānāya는?", "options": ["목적의 여격 (열반으로)", "소유격 (열반의)", "처소격 (열반에서)", "주격"], "answer": 0, "hint": "-āya", "explain": "여격 -āya가 목적·결과를 나타냅니다."},
  {"type": "quiz", "question": "\"jātipaccayā\"의 탈격은 무엇을 나타내나?", "options": ["원인·조건", "장소", "목적", "때"], "answer": 0, "hint": "~을 조건으로", "explain": "탈격은 원인·조건을 나타내기도 합니다."},
  {"type": "speak", "pali": "Upasamāya abhiññāya sambodhāya nibbānāya saṃvattati.", "pronKo": "우빠사마-야 아빈냐-야 삼보-다-야 닙바-나-야 상왓따띠.", "translation": "고요함으로, 최상의 앎으로, 바른 깨달음으로, 열반으로 이끈다."},
]
