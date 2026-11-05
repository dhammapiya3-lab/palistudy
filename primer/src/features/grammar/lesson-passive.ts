// 수동태 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_PASSIVE: StepWithoutId[] = [
  {"type": "intro", "title": "수동태", "subtitle": "-ya- · ~되다, ~라고 불린다", "description": "동사 어간에 -ya-(-īya-)를 넣으면\n\"~되다, ~받다\"라는 수동의 뜻이 됩니다.\n\n경전의 정의문 \"ayaṃ vuccati … (이것을 …라고 한다)\"가\n바로 수동태입니다.", "icon": "🔁"},
  {"type": "teach-grammar", "title": "수동태 만드는 법", "example": "pac + ya → paccati\nlabh + ya → labbhati\nvac + ya → vuccati\nkar + īya → karīyati", "exampleKo": "요리된다\n얻어진다\n불린다, 말해진다\n행해진다", "explanation": "어근 + ya (+ 현재 어미 -ti / -nti)\n\n• ya가 앞 자음과 닮아 겹자음이 되기도 함\n  pac-ya → pacca-, labh-ya → labbha-\n• 어근 모양이 바뀌기도 함\n  vac → vuc-cati, dā → dīyati\n\n행위자(~에 의해)는 도구격으로 나타냅니다."},
  {"type": "teach", "word": "vuccati", "pronKo": "웃짜띠", "meaning": "불린다, ~라고 한다", "icon": "🗣️", "grammar": "수동태 동사, 현재 3인칭 단수", "baseForm": "vatti (말하다) → vuccati", "formNote": "ayaṃ vuccati … = 이것을 …라고 한다"},
  {"type": "teach", "word": "labbhati", "pronKo": "랍바띠", "meaning": "얻어진다, 가능하다", "icon": "🤲", "grammar": "수동태 동사, 현재 3인칭 단수", "baseForm": "labhati (얻다) → labbhati", "formNote": "na labbhati = 얻어지지 않는다, 될 수 없다"},
  {"type": "teach", "word": "dīyati", "pronKo": "디-야띠", "meaning": "주어진다", "icon": "🎁", "grammar": "수동태 동사, 현재 3인칭 단수", "baseForm": "deti/dadāti (주다) → dīyati"},
  {"type": "teach", "word": "karīyati", "pronKo": "까리-야띠", "meaning": "행해진다", "icon": "🛠️", "grammar": "수동태 동사, 현재 3인칭 단수", "baseForm": "karoti (하다) → karīyati (kayirati로도 씀)"},
  {"type": "teach-grammar", "title": "행위자는 도구격", "example": "Bhikkhunā dhammo desīyati.", "exampleKo": "비구에 의해 법이 설해진다.", "explanation": "능동: Bhikkhu dhammaṃ deseti. (비구가 법을 설한다)\n수동: Bhikkhunā dhammo desīyati.\n\n• 행위자 bhikkhu → 도구격 bhikkhunā\n• 목적어 dhammaṃ → 주격 dhammo\n• 동사 deseti → desīyati (수동)"},
  {"type": "verse", "pali": "Ayaṃ vuccati, bhikkhave, sammāsati.", "pronKo": "아양 웃짜띠, 빅카웨-, 삼마-사띠.", "translation": "비구들이여, 이것을 바른 마음챙김이라고 한다.", "highlight": ["vuccati"], "note": "팔정도 분석경(SN 45.8)\n문자 그대로: \"이것이 바른 마음챙김이라고 불린다\""},
  {"type": "verse", "pali": "Na ca labbhati rūpe: ‘evaṃ me rūpaṃ hotu, evaṃ me rūpaṃ mā ahosī’ti.", "pronKo": "나 짜 랍바띠 루-뻬-: '에-왕 메- 루-빵 호-뚜, 에-왕 메- 루-빵 마- 아호-시-'띠.", "translation": "그리고 물질에 대해 '나의 물질은 이렇게 되어라, 나의 물질은 이렇게 되지 마라'라고 할 수 없다.", "highlight": ["labbhati", "rūpe"], "note": "무아상경(SN 22.59)\nna labbhati = 얻어지지 않는다 → 할 수 없다\nrūpe = 물질에 관하여 (처소격)"},
  {"type": "quiz", "question": "\"vuccati\"의 뜻은?", "options": ["불린다, ~라고 한다", "말한다", "말했다", "말하게 한다"], "answer": 0, "hint": "vac + ya", "explain": "vuccati는 vatti(말하다)의 수동태입니다."},
  {"type": "quiz", "question": "수동태 문장에서 행위자(~에 의해)는 무슨 격?", "options": ["도구격", "주격", "목적격", "소유격"], "answer": 0, "hint": "bhikkhunā", "explain": "수동태의 행위자는 도구격으로 나타냅니다."},
  {"type": "quiz", "question": "\"na labbhati\"의 뜻으로 알맞은 것은?", "options": ["얻어지지 않는다 (할 수 없다)", "얻지 않는다", "얻었다", "얻게 하라"], "answer": 0, "hint": "labhati의 수동태 + 부정", "explain": "labbhati는 labhati(얻다)의 수동태입니다."},
  {"type": "speak", "pali": "Ayaṃ vuccati, bhikkhave, sammāsati.", "pronKo": "아양 웃짜띠, 빅카웨-, 삼마-사띠."},
]
