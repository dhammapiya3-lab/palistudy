// 자주 나오는 불규칙 동사 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_IRREGULAR: StepWithoutId[] = [
  {"type": "intro", "title": "자주 나오는 불규칙 동사", "subtitle": "atthi·hoti · avoca·āha · akāsi · addasa", "description": "경전에 가장 많이 나오는 동사들은\n모양이 불규칙합니다.\n\n과거·미래·절대분사 꼴을 함께 익혀 두면\n경전 문장이 훨씬 잘 보입니다.", "icon": "🌀"},
  {"type": "teach-grammar", "title": "atthi (있다) · hoti (있다, 되다)", "example": "atthi / santi\nasmi(amhi) / asma(amha)\nsiyā\nahosi / ahesuṃ\nbhavissati\nhotu, bhavatu", "exampleKo": "있다 (그는 / 그들은)\n나는 있다 / 우리는 있다\n있을 것이다, ~이리라 (원망형)\n있었다, 되었다 (과거)\n있을 것이다 (미래)\n있어라, ~이 되기를 (명령)", "explanation": "atthi는 과거·미래를 대개 hoti(bhavati)의 꼴로 씁니다.\n  ahosi (과거), bhavissati (미래)\n  sumanā bhavantu = 기쁜 마음이 되기를"},
  {"type": "teach-grammar", "title": "말하다 · 하다 · 주다 · 보다 · 가다", "example": "avoca, āha / avocuṃ, āhu\nakāsi · karissati · katvā · kata\nadāsi · dassati · datvā · dinna\naddasa · dakkhati · disvā · diṭṭha\nagamāsi · gamissati · gantvā · gata", "exampleKo": "말했다 / 그들은 말했다\n했다 · 할 것이다 · 하고서 · 행해진\n주었다 · 줄 것이다 · 주고서 · 주어진\n보았다 · 볼 것이다 · 보고서 · 보인\n갔다 · 갈 것이다 · 가고서 · 간", "explanation": "왼쪽부터: 과거 · 미래 · 절대분사 · 과거분사\n\nIdamavoca bhagavā = idaṃ + avoca (세존께서 이것을 말씀하셨다)"},
  {"type": "teach", "word": "avoca", "pronKo": "아오-짜", "meaning": "말했다", "icon": "🗣️", "grammar": "동사 과거형(aorist), 3인칭 단수", "baseForm": "vatti (말하다)", "formNote": "Idamavoca = idaṃ + avoca"},
  {"type": "teach", "word": "siyā", "pronKo": "시야-", "meaning": "~이리라, ~일 것이다", "icon": "🤔", "grammar": "동사 원망형, 3인칭 단수", "baseForm": "atthi (있다)"},
  {"type": "teach", "word": "bhavantu", "pronKo": "바완뚜", "meaning": "~이 되기를, ~이어라", "icon": "🙏", "grammar": "동사 명령형, 3인칭 복수", "baseForm": "bhavati (있다, 되다)"},
  {"type": "teach", "word": "addasa", "pronKo": "앗다사", "meaning": "보았다", "icon": "👁️", "grammar": "동사 과거형(aorist), 3인칭 단수", "baseForm": "passati (보다)", "formNote": "절대분사 disvā, 과거분사 diṭṭha"},
  {"type": "verse", "pali": "Idamavoca bhagavā.", "pronKo": "이다마오-짜 바가와-.", "translation": "세존께서 이렇게 말씀하셨다.", "highlight": ["Idamavoca"], "note": "경의 끝맺음 정형구\nidaṃ + avoca (연성)"},
  {"type": "verse", "pali": "Sabbeva bhūtā sumanā bhavantu.", "pronKo": "삽베-와 부-따- 수마나- 바완뚜.", "translation": "모든 존재가 기쁜 마음이 되기를.", "highlight": ["bhavantu"], "note": "보배경\nbhavantu = bhavati의 명령형 3인칭 복수"},
  {"type": "verse", "pali": "Attā hi attano nātho, ko hi nātho paro siyā.", "pronKo": "앗따- 히 앗따노- 나-토-, 꼬- 히 나-토- 빠로- 시야-.", "translation": "자기야말로 자기의 의지처이니, 다른 누가 의지처가 되겠는가.", "highlight": ["siyā"], "note": "법구경 160게\nsiyā = atthi의 원망형"},
  {"type": "quiz", "question": "\"Idamavoca bhagavā\"의 avoca는?", "options": ["vatti(말하다)의 과거형", "vatti의 미래형", "명령형", "명사"], "answer": 0, "hint": "aorist", "explain": "avoca는 \"말했다\"라는 과거형입니다."},
  {"type": "quiz", "question": "\"disvā\"의 뜻은?", "options": ["보고서", "보았다", "볼 것이다", "보인"], "answer": 0, "hint": "절대분사 -tvā와 같은 역할", "explain": "disvā는 passati의 절대분사(보고서)입니다."},
  {"type": "quiz", "question": "\"bhavantu\"는 어떤 꼴?", "options": ["명령형 (~이 되기를)", "과거형", "미래형", "현재분사"], "answer": 0, "hint": "-ntu", "explain": "3인칭 복수 명령형 어미 -ntu입니다."},
  {"type": "speak", "pali": "Sabbeva bhūtā sumanā bhavantu.", "pronKo": "삽베-와 부-따- 수마나- 바완뚜.", "translation": "모든 존재가 기쁜 마음이 되기를."},
]
