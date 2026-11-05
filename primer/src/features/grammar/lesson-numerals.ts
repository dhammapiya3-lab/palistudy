// 수사 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_NUMERALS: StepWithoutId[] = [
  {"type": "intro", "title": "수사", "subtitle": "하나에서 열까지 · 첫째·둘째", "description": "경전의 교리는 숫자로 정리되어 있습니다.\n(두 극단, 사성제, 팔정도, 사념처 …)\n\n1~4는 성·격에 따라 형태가 바뀌므로 꼭 익혀 두세요.", "icon": "🔢"},
  {"type": "teach-grammar", "title": "1부터 10까지", "example": "eka · dve · tayo · cattāro · pañca\ncha · satta · aṭṭha · nava · dasa", "exampleKo": "1 · 2 · 3 · 4 · 5\n6 · 7 · 8 · 9 · 10", "explanation": "복합어 앞에서는 짧은 꼴을 씁니다.\n  dvi- / ti- / catu-\n  예) tiratana (삼보), catusacca (사성제)\n\n5 이상은 성별 구분 없이 거의 같은 꼴입니다."},
  {"type": "teach-grammar", "title": "1~4의 형태 변화", "example": "2: dve (주격·목적격), dvinnaṃ (소유격)\n3: tayo (남) · tisso (여) · tīṇi (중)\n4: cattāro (남) · catasso (여) · cattāri (중)", "exampleKo": "둘 / 둘의\n셋 (성에 따라)\n넷 (성에 따라)", "explanation": "수사가 꾸미는 명사의 성·격에 맞춥니다.\n\n• cattāro satipaṭṭhānā (남성: 네 가지 마음챙김의 확립)\n• cattāri ariyasaccāni (중성: 네 가지 성스러운 진리)\n• dvinnaṃ phalānaṃ (소유격: 두 가지 결과 중)"},
  {"type": "teach-grammar", "title": "서수와 횟수", "example": "paṭhama · dutiya · tatiya · catuttha · pañcama\ndutiyampi · tatiyampi", "exampleKo": "첫째 · 둘째 · 셋째 · 넷째 · 다섯째\n두 번째에도 · 세 번째에도", "explanation": "dutiyampi = dutiyaṃ + pi (두 번째에도)\n삼귀의에서 세 번 반복할 때 씁니다."},
  {"type": "teach", "word": "dve", "pronKo": "드웨-", "meaning": "둘, 두 가지", "icon": "✌️", "grammar": "수사, 주격 복수", "formNote": "dveme = dve + ime (이 두 가지)"},
  {"type": "teach", "word": "cattāro", "pronKo": "짯따-로-", "meaning": "넷, 네 가지", "icon": "4️⃣", "grammar": "수사, 남성 주격 복수", "baseForm": "catu", "formNote": "여성 catasso, 중성 cattāri"},
  {"type": "teach", "word": "dvinnaṃ", "pronKo": "드윈낭", "meaning": "둘의, 두 가지 중", "icon": "⚖️", "grammar": "수사, 소유격 복수", "baseForm": "dve"},
  {"type": "teach", "word": "dutiyampi", "pronKo": "두띠얌삐", "meaning": "두 번째에도", "icon": "🔁", "grammar": "서수 dutiya + pi", "baseForm": "dutiya (둘째)"},
  {"type": "verse", "pali": "Dveme, bhikkhave, antā pabbajitena na sevitabbā.", "pronKo": "드웨-메-, 빅카웨-, 안따- 빱바지떼-나 나 세-위땁바-.", "translation": "비구들이여, 출가자가 따르지 말아야 할 이 두 가지 극단이 있다.", "highlight": ["Dveme"], "note": "초전법륜경(SN 56.11)\ndveme = dve(둘) + ime(이것들)"},
  {"type": "verse", "pali": "Ekāyano ayaṃ, bhikkhave, maggo, yadidaṃ cattāro satipaṭṭhānā.", "pronKo": "에-까-야노- 아양, 빅카웨-, 막고-, 야디당 짯따-로- 사띠빳타-나-.", "translation": "비구들이여, 이것은 하나로 가는 길이니, 곧 네 가지 마음챙김의 확립이다.", "highlight": ["Ekāyano", "cattāro"], "note": "대념처경(MN 10)\nekāyano = eka(하나) + ayana(길)\ncattāro: 남성 satipaṭṭhānā와 짝"},
  {"type": "verse", "pali": "Dutiyampi buddhaṃ saraṇaṃ gacchāmi.", "pronKo": "두띠얌삐 붓당 사라낭 갓차-미.", "translation": "두 번째에도 붓다께 귀의합니다.", "highlight": ["Dutiyampi"], "note": "삼귀의"},
  {"type": "quiz", "question": "\"cattāri ariyasaccāni\"에서 cattāri가 중성인 이유는?", "options": ["sacca가 중성명사라서", "복수라서", "주격이라서", "숫자는 늘 중성"], "answer": 0, "hint": "꾸미는 명사의 성", "explain": "sacca는 중성명사이므로 중성 cattāri를 씁니다."},
  {"type": "quiz", "question": "\"dveme\"를 풀면?", "options": ["dve + ime (이 두 가지)", "dve + me (나의 둘)", "dvi + eme", "de + veme"], "answer": 0, "hint": "연성", "explain": "dve + ime → dveme (모음 연성)"},
  {"type": "quiz", "question": "\"tatiyampi\"의 뜻은?", "options": ["세 번째에도", "셋이서", "세 가지의", "세 번 하라"], "answer": 0, "hint": "tatiya + pi", "explain": "tatiya(셋째) + pi(~에도) = 세 번째에도"},
  {"type": "speak", "pali": "Ekāyano ayaṃ, bhikkhave, maggo, yadidaṃ cattāro satipaṭṭhānā.", "pronKo": "에-까-야노- 아양, 빅카웨-, 막고-, 야디당 짯따-로- 사띠빳타-나-.", "translation": "비구들이여, 이것은 하나로 가는 길이니, 곧 네 가지 마음챙김의 확립이다."},
]
