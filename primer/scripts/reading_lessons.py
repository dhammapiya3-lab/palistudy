"""'경전 읽기 문법' 묶음 단원 만들기 — python3 primer/scripts/reading_lessons.py
각 단원: primer/src/features/grammar/lesson-<id>.ts  (한글 발음은 scripts/pali_hangul.py로 자동)
녹음할 빠알리 글 목록: primer/scripts/tts/redo_texts.json"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT / 'scripts'))
import pali_hangul as h  # noqa: E402

P = h.to_hangul
OUT = ROOT / 'primer' / 'src' / 'features' / 'grammar'


def intro(title, sub, desc, icon):
    return {'type': 'intro', 'title': title, 'subtitle': sub, 'description': desc, 'icon': icon}


def tg(title, ex, exko, expl):
    return {'type': 'teach-grammar', 'title': title, 'example': ex, 'exampleKo': exko, 'explanation': expl}


def teach(word, meaning, icon, grammar, base='', note=''):
    s = {'type': 'teach', 'word': word, 'pronKo': P(word), 'meaning': meaning, 'icon': icon, 'grammar': grammar}
    if base: s['baseForm'] = base
    if note: s['formNote'] = note
    return s


def verse(pali, ko, hl, note=''):
    s = {'type': 'verse', 'pali': pali, 'pronKo': P(pali), 'translation': ko, 'highlight': hl}
    if note: s['note'] = note
    return s


def quiz(q, opts, ans, hint, explain):
    return {'type': 'quiz', 'question': q, 'options': opts, 'answer': ans, 'hint': hint, 'explain': explain}


def speak(pali):
    return {'type': 'speak', 'pali': pali, 'pronKo': P(pali)}


L = {}

# ───────── 1. 복합어 ─────────
L['compound'] = ('복합어 (samāsa)', '여러 낱말이 한 낱말로 · 6가지', '🧩', 'LESSON_COMPOUND', [
    intro('복합어 (Samāsa)', '여러 낱말이 한 낱말로', '빠알리 경전의 긴 낱말은 대부분 복합어입니다.\n\n• 앞쪽 낱말은 어간 그대로(격어미 없음)\n• 마지막 낱말만 격변화\n\n6가지 종류를 알면 dukkhanirodhagāminī 같은\n긴 낱말도 풀어 읽을 수 있습니다.', '🧩'),
    tg('복합어란?', 'dhamma + cakka → dhammacakka\nariya + sacca → ariyasacca', '법의 바퀴\n성스러운 진리', '두 개 이상의 낱말이 붙어 한 낱말이 됩니다.\n\n• 앞말: 어간 그대로 (dhamma-, ariya-)\n• 뒷말: 문장 속 역할에 따라 격변화\n  dhammacakkaṃ (목적격), dhammacakke (처소격)\n\n풀어 읽을 때는 뒤에서부터,\n"뒷말을 앞말이 꾸민다"고 생각하면 됩니다.'),
    tg('복합어 6가지', 'mātāpitaro\ndhammacakka\nariyasacca\npañcasīla\nmahāpañña\nyathābhūtaṃ', '① 병렬 (dvanda): 어머니와 아버지\n② 격한정 (tappurisa): 법의 바퀴\n③ 동격한정 (kammadhāraya): 성스러운 진리\n④ 수사 (digu): 다섯 계\n⑤ 소유 (bahubbīhi): 큰 지혜를 가진\n⑥ 불변 (abyayībhāva): 있는 그대로', '① 병렬: A와 B (그리고)\n② 격한정: 앞말이 뒷말과 격 관계 (~의, ~으로 …)\n③ 동격한정: 앞말이 형용사처럼 뒷말을 꾸밈\n④ 수사: 숫자 + 명사\n⑤ 소유: 복합어 전체가 형용사 — "~을 가진, ~인"\n⑥ 불변: 부사처럼 쓰이고 격변화하지 않음'),
    teach('mātāpitaro', '부모님 (어머니와 아버지)', '👪', '병렬 복합어 (dvanda), 주격 복수', 'mātā (어머니) + pitā (아버지)', '두 사람이므로 복수로 씁니다.\n소유격: mātāpitūnaṃ (부모님의)'),
    teach('dhammacakka', '법의 바퀴', '☸️', '격한정 복합어 (tappurisa)', 'dhamma (법) + cakka (바퀴)', '앞말이 소유격 관계: dhammassa cakkaṃ (법의 바퀴)'),
    tg('격한정 복합어 — 앞말의 격은 여러 가지', 'saraṇagata\ndevadatta\nsallaviddha\nbuddhabhāsita\nrājabhaya\ndhammacakka\nvanavāsa', '귀의처로 간 (목적격)\n천신에 의해 주어진 (도구격)\n화살에 꿰뚫린 (도구격)\n붓다에 의해 말씀된 (도구격)\n왕으로부터의 두려움 (탈격)\n법의 바퀴 (소유격)\n숲에 삶 (처소격)', '격한정 복합어(tappurisa)는 앞말을\n알맞은 격으로 풀어 읽습니다.\n\n도구격으로 읽는 경우: "~에 의해 ~된"\n• deva-datta = devena dinna\n  천신에 의해 주어진 (= 천신의 선물, 사람 이름으로도 씀)\n• salla-viddha = sallena viddha\n  화살에 의해 꿰뚫린\n• buddha-bhāsita = buddhena bhāsita\n  붓다에 의해 말씀된\n\n뒷말이 과거분사(-ta, -na)이면\n앞말을 도구격("~에 의해")으로 읽는 경우가 많습니다.'),
    teach('devadatta', '천신에 의해 주어진 (천신의 선물)', '🎁', '격한정 복합어 (tappurisa) — 앞말 도구격', 'deva (천신) + datta (주어진, 과거분사)', '풀어 쓰면 devena dinna (천신에 의해 주어진)\n사람 이름(데와닷따)으로도 쓰임'),
    quiz('"buddhabhāsita"를 풀어 읽으면?', ['붓다에 의해 말씀된', '붓다의 말하는 이', '붓다와 말씀', '붓다에게 말한'], 0, '뒷말이 과거분사 → 앞말은 도구격', 'buddhena bhāsita = 붓다에 의해 말씀된 (도구격으로 읽는 격한정 복합어)'),
    teach('ariyasacca', '성스러운 진리', '💎', '동격한정 복합어 (kammadhāraya)', 'ariya (성스러운) + sacca (진리)', '앞말 ariya가 형용사로 sacca를 꾸밈'),
    teach('pañcasīla', '다섯 가지 계 (오계)', '🖐️', '수사 복합어 (digu)', 'pañca (다섯) + sīla (계)'),
    teach('mahāpañño', '큰 지혜를 가진 (이)', '🦉', '소유 복합어 (bahubbīhi), 남성 주격 단수', 'mahā (큰) + paññā (지혜)', '"큰 지혜"가 아니라 "큰 지혜를 가진 사람"\n복합어 전체가 형용사로 사람을 가리킴'),
    teach('yathābhūtaṃ', '있는 그대로', '🔍', '불변 복합어 (abyayībhāva)', 'yathā (~대로) + bhūta (있는 것)', '부사처럼 쓰이며 격변화하지 않음'),
    tg('소유 복합어 — 과거분사 + 명사', 'vīta + rāga → vītarāgo\njita + indriya → jitindriyo\nkata + kicca → katakicco', '탐욕이 사라진 (이)\n감관을 이긴 (이)\n해야 할 일을 마친 (이)', '앞말이 과거분사(-ta, -na)이고 뒷말이 명사이면\n"(뒷말)이 (앞말)된 사람"을 뜻하는 소유 복합어가 많습니다.\n\n• vītarāgo = vīto rāgo yassa so\n  "탐욕이 사라진 그 사람" → 탐욕을 떠난 이\n• jitindriyo = 감관(indriya)이 정복된(jita) 이\n\n아라한을 가리키는 말에 자주 나옵니다.'),
    teach('vītarāgo', '탐욕이 사라진 (이)', '🍃', '소유 복합어 (bahubbīhi), 남성 주격 단수', 'vīta (사라진, 과거분사) + rāga (탐욕)', '풀어 쓰면 vīto rāgo yassa (탐욕이 사라진 그 사람)\n과거분사 + 명사 꼴의 소유 복합어'),
    tg('소유 복합어 (bahubbīhi) 읽는 법', 'mahāpañño bhikkhu\nsumanā devā\nattamanā bhikkhū', '큰 지혜를 가진 비구\n기쁜 마음인 신들\n흡족한 마음인 비구들', '소유 복합어는 그 자체로 "~을 가진 사람"을 가리키는\n형용사입니다.\n\n• mahā(큰) + paññā(지혜) = mahāpañña\n  → "큰 지혜"가 아니라 "큰 지혜를 가진 (사람)"\n• 꾸미는 명사와 성·수·격이 같아집니다\n  mahāpañño (남성 주격 단수) — bhikkhu와 짝\n\n"~의"(소유격)로 옮기면 뜻이 달라지므로\n"~을 가진", "~인"으로 옮깁니다.'),
    verse('Attamanā pañcavaggiyā bhikkhū bhagavato bhāsitaṃ abhinanduṃ.', '다섯 비구들은 흡족한 마음으로 세존의 말씀을 기뻐하였다.', ['Attamanā', 'pañcavaggiyā'], '초전법륜경(SN 56.11)의 마지막 구절입니다.\nattamanā: 소유 복합어 / pañcavaggiyā: 수사 복합어(다섯 무리인)에서 나온 형용사'),
    verse('Idaṃ kho pana, bhikkhave, dukkhanirodhagāminī paṭipadā ariyasaccaṃ.', '비구들이여, 이것이 괴로움의 소멸로 이끄는 길이라는 성스러운 진리이다.', ['dukkhanirodhagāminī', 'ariyasaccaṃ'], 'dukkha-nirodha-gāminī = 괴로움의 + 소멸로 + 가는(이끄는)\n뒤에서부터: 이끄는 ← 소멸로 ← 괴로움의'),
    quiz('"mātāpitaro"는 어떤 복합어?', ['병렬 (어머니와 아버지)', '격한정 (어머니의 아버지)', '소유 (어머니를 가진)', '불변'], 0, '두 낱말이 "그리고"로 이어짐', '어머니와 아버지가 나란히 이어진 병렬 복합어(dvanda)입니다.'),
    quiz('"mahāpañño bhikkhu"의 바른 뜻은?', ['큰 지혜를 가진 비구', '비구의 큰 지혜', '큰 비구의 지혜', '지혜로 큰 비구에게'], 0, '소유 복합어 = 형용사', 'mahāpañño는 bhikkhu를 꾸미는 소유 복합어(큰 지혜를 가진)입니다.'),
    quiz('"pañcasīla"는 어떤 복합어?', ['수사 복합어 (digu)', '병렬 복합어', '소유 복합어', '불변 복합어'], 0, '숫자 + 명사', 'pañca(다섯) + sīla(계) = 오계, 수사 복합어입니다.'),
    speak('Attamanā pañcavaggiyā bhikkhū bhagavato bhāsitaṃ abhinanduṃ.'),
])

# ───────── 2. iti ─────────
L['iti'] = ('인용 표시 iti (’ti)', '"~라고" · 말과 생각의 끝 표시', '💬', 'LESSON_ITI', [
    intro('인용 표시 iti', '"~라고" — 말과 생각을 닫는 표시', '경전에서 대화·생각·이름은 iti("~라고")로 닫습니다.\n\n연성 때문에 앞말에 붙어 \'ti, -nti 로\n짧아지는 경우가 많아 처음에는 알아보기 어렵습니다.', '💬'),
    tg('iti가 붙는 모양', 'bhikkhavo + iti → bhikkhavo’ti\nariyasaccaṃ + iti → ariyasacca’nti\ngacchāmi + iti → gacchāmī’ti', '"비구들이여"라고\n"성스러운 진리"라고\n"나는 간다"라고', 'iti의 i가 앞말과 합쳐집니다.\n\n• 모음 뒤: \'ti (앞 모음 a·i·u는 길어지기도 함)\n  gacchāmi → gacchāmī\'ti\n• ṃ 뒤: \'nti (ṃ이 n으로 바뀜)\n  saccaṃ → sacca\'nti\n\n따옴표(‘ ’ 또는 “ ”) 바로 뒤의 ti / nti를 찾으면 됩니다.'),
    tg('iti의 쓰임', '“Bhikkhavo”ti.\n‘gacchāmī’ti pajānāti\nItipi so bhagavā …', '"비구들이여"라고 (부르셨다)\n"나는 간다"라고 분명히 안다\n이렇게 그분 세존께서는 …', '① 말 인용: 누가 한 말의 끝\n② 생각·앎의 내용: pajānāti(분명히 안다), maññati(여긴다) 앞\n③ 문장 처음의 iti: "이와 같이, 이렇게"\n  (Itipi so bhagavā = 이렇게 그분 세존께서는)'),
    teach('iti', '~라고, 이와 같이', '💬', '불변화사 (인용)', '', "모음 뒤에서 'ti, ṃ 뒤에서 'nti로 줄어듦"),
    teach('pajānāti', '분명히 안다', '💡', '동사, 현재 3인칭 단수', 'pa (앞으로·분명히) + jānāti (안다)', "‘…’ti pajānāti = '…'라고 분명히 안다"),
    verse('“Bhikkhavo”ti. “Bhadante”ti te bhikkhū bhagavato paccassosuṃ.', '"비구들이여"라고 (세존께서 부르셨다). "존자시여"라고 그 비구들은 세존께 대답하였다.', ['Bhikkhavo', 'Bhadante', 'paccassosuṃ'], "경의 첫머리마다 나오는 정형구입니다.\n“…”ti 가 두 번: 세존의 말 / 비구들의 대답"),
    verse('Gacchanto vā ‘gacchāmī’ti pajānāti.', '걸어갈 때는 "나는 걷는다"라고 분명히 안다.', ['gacchāmī', 'pajānāti'], "대념처경(MN 10)의 한 구절입니다.\ngacchāmi + iti → gacchāmī'ti (i가 길어짐)"),
    verse('‘Idaṃ dukkhaṃ ariyasacca’nti me, bhikkhave, pubbe ananussutesu dhammesu cakkhuṃ udapādi.', "비구들이여, '이것이 괴로움의 성스러운 진리이다'라고, 전에 들어 보지 못한 법들에 대해 나에게 눈이 생겨났다.", ['ariyasacca'], "초전법륜경(SN 56.11)\nariyasaccaṃ + iti → ariyasacca'nti (ṃ → n)"),
    quiz("\"ariyasacca'nti\"에서 'nti는?", ['ariyasaccaṃ + iti (인용 표시)', '동사 3인칭 복수 어미', '부정어', '처소격 어미'], 0, 'ṃ + iti → nti', "ṃ으로 끝나는 말에 iti가 붙으면 'nti가 됩니다. 동사 어미 -nti와 헷갈리지 마세요."),
    quiz("\"‘gacchāmī’ti pajānāti\"의 뜻은?", ['"나는 간다"라고 분명히 안다', '가면서 분명히 안다', '나는 가서 안다', '"그는 간다"라고 말한다'], 0, "따옴표 안 = 생각의 내용", "'…'ti 안의 gacchāmi(나는 간다)가 아는 내용입니다."),
    quiz('문장 처음의 "Itipi so bhagavā"에서 iti의 뜻은?', ['이와 같이, 이렇게', '~라고 말했다', '그러므로', '만약'], 0, '문장 처음의 iti', '문장 처음에 오면 "이와 같이"의 뜻입니다.'),
    speak('Gacchanto vā ‘gacchāmī’ti pajānāti.'),
])

# ───────── 3. 수동태 ─────────
L['passive'] = ('수동태', '-ya- · ~되다, ~라고 불린다', '🔁', 'LESSON_PASSIVE', [
    intro('수동태', '-ya- · ~되다, ~라고 불린다', '동사 어간에 -ya-(-īya-)를 넣으면\n"~되다, ~받다"라는 수동의 뜻이 됩니다.\n\n경전의 정의문 "ayaṃ vuccati … (이것을 …라고 한다)"가\n바로 수동태입니다.', '🔁'),
    tg('수동태 만드는 법', 'pac + ya → paccati\nlabh + ya → labbhati\nvac + ya → vuccati\nkar + īya → karīyati', '요리된다\n얻어진다\n불린다, 말해진다\n행해진다', '어근 + ya (+ 현재 어미 -ti / -nti)\n\n• ya가 앞 자음과 닮아 겹자음이 되기도 함\n  pac-ya → pacca-, labh-ya → labbha-\n• 어근 모양이 바뀌기도 함\n  vac → vuc-cati, dā → dīyati\n\n행위자(~에 의해)는 도구격으로 나타냅니다.'),
    teach('vuccati', '불린다, ~라고 한다', '🗣️', '수동태 동사, 현재 3인칭 단수', 'vatti (말하다) → vuccati', 'ayaṃ vuccati … = 이것을 …라고 한다'),
    teach('labbhati', '얻어진다, 가능하다', '🤲', '수동태 동사, 현재 3인칭 단수', 'labhati (얻다) → labbhati', 'na labbhati = 얻어지지 않는다, 될 수 없다'),
    teach('dīyati', '주어진다', '🎁', '수동태 동사, 현재 3인칭 단수', 'deti/dadāti (주다) → dīyati'),
    teach('karīyati', '행해진다', '🛠️', '수동태 동사, 현재 3인칭 단수', 'karoti (하다) → karīyati (kayirati로도 씀)'),
    tg('행위자는 도구격', 'Bhikkhunā dhammo desīyati.', '비구에 의해 법이 설해진다.', '능동: Bhikkhu dhammaṃ deseti. (비구가 법을 설한다)\n수동: Bhikkhunā dhammo desīyati.\n\n• 행위자 bhikkhu → 도구격 bhikkhunā\n• 목적어 dhammaṃ → 주격 dhammo\n• 동사 deseti → desīyati (수동)'),
    verse('Ayaṃ vuccati, bhikkhave, sammāsati.', '비구들이여, 이것을 바른 마음챙김이라고 한다.', ['vuccati'], '팔정도 분석경(SN 45.8)\n문자 그대로: "이것이 바른 마음챙김이라고 불린다"'),
    verse('Na ca labbhati rūpe: ‘evaṃ me rūpaṃ hotu, evaṃ me rūpaṃ mā ahosī’ti.', "그리고 물질에 대해 '나의 물질은 이렇게 되어라, 나의 물질은 이렇게 되지 마라'라고 할 수 없다.", ['labbhati', 'rūpe'], '무아상경(SN 22.59)\nna labbhati = 얻어지지 않는다 → 할 수 없다\nrūpe = 물질에 관하여 (처소격)'),
    quiz('"vuccati"의 뜻은?', ['불린다, ~라고 한다', '말한다', '말했다', '말하게 한다'], 0, 'vac + ya', 'vuccati는 vatti(말하다)의 수동태입니다.'),
    quiz('수동태 문장에서 행위자(~에 의해)는 무슨 격?', ['도구격', '주격', '목적격', '소유격'], 0, 'bhikkhunā', '수동태의 행위자는 도구격으로 나타냅니다.'),
    quiz('"na labbhati"의 뜻으로 알맞은 것은?', ['얻어지지 않는다 (할 수 없다)', '얻지 않는다', '얻었다', '얻게 하라'], 0, 'labhati의 수동태 + 부정', 'labbhati는 labhati(얻다)의 수동태입니다.'),
    speak('Ayaṃ vuccati, bhikkhave, sammāsati.'),
])

# ───────── 4. 자음 어간 명사 ─────────
L['consonant-stem'] = ('자음 어간 명사 (-an, -as)', 'attā·rājā·brahmā · mano·ceto', '🧱', 'LESSON_CONSONANT_STEM', [
    intro('자음 어간 명사', '-an (attā, rājā) · -as (mano, ceto)', '어간이 자음으로 끝나는 명사는\n격변화가 -a 명사와 조금 다릅니다.\n\n• -an 남성: attan(자아), rājan(왕), brahman(범천)\n• -as 중성: manas(마음), cetas(마음), vacas(말)', '🧱'),
    tg('-an 남성명사: attan (자아)', '주격  attā\n목적격 attānaṃ\n도구격 attanā\n여격·소유격 attano\n처소격 attani', '자아는\n자아를\n자아에 의해, 스스로\n자아의, 자기의\n자아에', '어간 attan-의 n이 격에 따라 나타났다 사라집니다.\n\n같은 무리: rājan (왕)\n  rājā (주격), rājānaṃ (목적격)\n  raññā (도구격), rañño (여격·소유격)\nbrahman (범천)\n  brahmā (주격), brahmunā (도구격), brahmuno (소유격)'),
    tg('-as 중성명사: manas (마음)', '주격·목적격 mano\n도구격 manasā\n여격·소유격 manaso\n처소격 manasi', '마음은, 마음을\n마음으로\n마음의\n마음에', '주격은 -o로 끝나 남성명사처럼 보이지만\n중성명사입니다.\n\n도구격 -asā가 특징:\n  manasā (마음으로), cetasā (마음으로), vacasā (말로)\n\n복합어 앞에서는 mano-:\n  manoseṭṭhā, manomayā'),
    teach('attā', '자아, 자기', '🪞', '-an 남성명사, 주격 단수', 'attan', '무아(anattā) = an(아님) + attā'),
    teach('attano', '자기의, 자신에게', '👤', '-an 남성명사, 소유격 단수', 'attan'),
    teach('rañño', '왕의, 왕에게', '👑', '-an 남성명사, 소유격 단수', 'rājan (왕)', '주격 rājā'),
    teach('manasā', '마음으로', '🧠', '-as 중성명사, 도구격 단수', 'manas (마음)'),
    teach('cetasā', '마음으로', '💭', '-as 중성명사, 도구격 단수', 'cetas (마음)'),
    verse('Manasā ce paduṭṭhena, bhāsati vā karoti vā.', '만일 더러워진 마음으로 말하거나 행하면,', ['Manasā'], '법구경 1게\nmanasā paduṭṭhena = 더러워진 마음으로 (도구격 + 도구격 과거분사)'),
    verse('Attā hi attano nātho, ko hi nātho paro siyā.', '자기야말로 자기의 의지처이니, 다른 누가 의지처가 되겠는가.', ['Attā', 'attano'], '법구경 160게\nattā (주격) / attano (소유격)'),
    quiz('"attano"는 무슨 격?', ['소유격 (자기의)', '주격', '목적격', '처소격'], 0, 'attan의 -o 꼴', 'attano는 attan의 여격·소유격 꼴이며, 여기서는 "자기의"입니다.'),
    quiz('"manasā"의 뜻은?', ['마음으로', '마음은', '마음의', '마음에'], 0, '-as 중성의 도구격 -asā', 'manasā는 manas(마음)의 도구격입니다.'),
    quiz('"mano"는 무슨 성(性)의 명사?', ['중성', '남성', '여성', '성이 없음'], 0, '-as 어간', '-o로 끝나지만 -as 어간 중성명사입니다.'),
    speak('Attā hi attano nātho, ko hi nātho paro siyā.'),
])

# ───────── 5. 조건법 ─────────
L['conditional'] = ('조건법 (-issa)', '~했더라면 ~했을 텐데', '🔀', 'LESSON_CONDITIONAL', [
    intro('조건법', '~했더라면 ~했을 텐데', '사실과 반대되는 가정을 나타냅니다.\n"만약 ~했더라면 (그러나 실제로는 아니다)"\n\n무아상경의 핵심 논증이 이 조건법으로 되어 있습니다.', '🔀'),
    tg('조건법 만드는 법', 'a + bhav + issa → abhavissa\na + kar + issa → akarissa\na + gam + issa → agamissa', '(그것이) ~였더라면\n(그가) 했더라면\n(그가) 갔더라면', '앞에 a- (과거형처럼) + 어간 + -issa\n\n• 3인칭 단수: -issa (-issā)\n• 3인칭 복수: -issaṃsu\n\n미래형 -issati와 모양이 비슷하지만\n앞에 a-가 붙고 어미가 짧습니다.'),
    tg('조건법 문장 읽기', 'attā abhavissa, … na saṃvatteyya', '자아였더라면, … 이끌지 않을 것이다', '앞부분 (조건법): 사실과 반대되는 가정\n  "물질이 자아였더라면"\n뒷부분 (원망형 -eyya 등): 그 결과\n  "병으로 이끌지 않을 것이다"\n\n실제로는 물질이 병으로 이끄므로\n→ 물질은 자아가 아니다 (무아)'),
    teach('abhavissa', '~였더라면', '🔀', '조건법, 3인칭 단수', 'bhavati (있다, 되다)'),
    teach('saṃvatteyya', '이끌 것이다', '➡️', '원망형, 3인칭 단수', 'saṃvattati (이끌다, 되다)', 'ābādhāya saṃvatteyya = 병으로 이끌 것이다'),
    teach('ābādhāya', '병으로, 괴로움으로', '🤒', '남성명사, 여격 단수 (목적)', 'ābādha (병, 괴로움)'),
    verse('Rūpañca hidaṃ, bhikkhave, attā abhavissa, nayidaṃ rūpaṃ ābādhāya saṃvatteyya.', '비구들이여, 만약 이 물질이 자아였더라면, 이 물질은 병으로 이끌지 않을 것이다.', ['abhavissa', 'saṃvatteyya'], '무아상경(SN 22.59)\nabhavissa = 조건법 (사실과 반대되는 가정)\nnayidaṃ = na + idaṃ (연성)'),
    quiz('"abhavissa"의 뜻은?', ['~였더라면', '~일 것이다', '~였다', '~이어라'], 0, 'a- + 어간 + -issa', 'abhavissa는 bhavati의 조건법입니다.'),
    quiz('조건법과 미래형의 차이는?', ['조건법은 앞에 a-가 붙고 어미가 -issa', '조건법은 -tvā로 끝남', '둘은 같은 형태', '미래형에 a-가 붙음'], 0, 'abhavissa / bhavissati', '조건법: a-bhav-issa / 미래형: bhav-issati'),
    quiz('무아상경의 이 조건법 문장이 말하려는 것은?', ['물질은 자아가 아니다', '물질은 자아이다', '물질은 병이 없다', '물질은 영원하다'], 0, '사실과 반대되는 가정', '"자아였더라면 병들지 않을 텐데, 병드니 자아가 아니다"라는 논증입니다.'),
    speak('Rūpañca hidaṃ, bhikkhave, attā abhavissa, nayidaṃ rūpaṃ ābādhāya saṃvatteyya.'),
])

# ───────── 6. 수사 ─────────
L['numerals'] = ('수사', 'eka·dve·tayo·cattāro · 서수', '🔢', 'LESSON_NUMERALS', [
    intro('수사', '하나에서 열까지 · 첫째·둘째', '경전의 교리는 숫자로 정리되어 있습니다.\n(두 극단, 사성제, 팔정도, 사념처 …)\n\n1~4는 성·격에 따라 형태가 바뀌므로 꼭 익혀 두세요.', '🔢'),
    tg('1부터 10까지', 'eka · dve · tayo · cattāro · pañca\ncha · satta · aṭṭha · nava · dasa', '1 · 2 · 3 · 4 · 5\n6 · 7 · 8 · 9 · 10', '복합어 앞에서는 짧은 꼴을 씁니다.\n  dvi- / ti- / catu-\n  예) tiratana (삼보), catusacca (사성제)\n\n5 이상은 성별 구분 없이 거의 같은 꼴입니다.'),
    tg('1~4의 형태 변화', '2: dve (주격·목적격), dvinnaṃ (소유격)\n3: tayo (남) · tisso (여) · tīṇi (중)\n4: cattāro (남) · catasso (여) · cattāri (중)', '둘 / 둘의\n셋 (성에 따라)\n넷 (성에 따라)', '수사가 꾸미는 명사의 성·격에 맞춥니다.\n\n• cattāro satipaṭṭhānā (남성: 네 가지 마음챙김의 확립)\n• cattāri ariyasaccāni (중성: 네 가지 성스러운 진리)\n• dvinnaṃ phalānaṃ (소유격: 두 가지 결과 중)'),
    tg('서수와 횟수', 'paṭhama · dutiya · tatiya · catuttha · pañcama\ndutiyampi · tatiyampi', '첫째 · 둘째 · 셋째 · 넷째 · 다섯째\n두 번째에도 · 세 번째에도', 'dutiyampi = dutiyaṃ + pi (두 번째에도)\n삼귀의에서 세 번 반복할 때 씁니다.'),
    teach('dve', '둘, 두 가지', '✌️', '수사, 주격 복수', '', 'dveme = dve + ime (이 두 가지)'),
    teach('cattāro', '넷, 네 가지', '4️⃣', '수사, 남성 주격 복수', 'catu', '여성 catasso, 중성 cattāri'),
    teach('dvinnaṃ', '둘의, 두 가지 중', '⚖️', '수사, 소유격 복수', 'dve'),
    teach('dutiyampi', '두 번째에도', '🔁', '서수 dutiya + pi', 'dutiya (둘째)'),
    verse('Dveme, bhikkhave, antā pabbajitena na sevitabbā.', '비구들이여, 출가자가 따르지 말아야 할 이 두 가지 극단이 있다.', ['Dveme'], '초전법륜경(SN 56.11)\ndveme = dve(둘) + ime(이것들)'),
    verse('Ekāyano ayaṃ, bhikkhave, maggo, yadidaṃ cattāro satipaṭṭhānā.', '비구들이여, 이것은 하나로 가는 길이니, 곧 네 가지 마음챙김의 확립이다.', ['Ekāyano', 'cattāro'], '대념처경(MN 10)\nekāyano = eka(하나) + ayana(길)\ncattāro: 남성 satipaṭṭhānā와 짝'),
    verse('Dutiyampi buddhaṃ saraṇaṃ gacchāmi.', '두 번째에도 붓다께 귀의합니다.', ['Dutiyampi'], '삼귀의'),
    quiz('"cattāri ariyasaccāni"에서 cattāri가 중성인 이유는?', ['sacca가 중성명사라서', '복수라서', '주격이라서', '숫자는 늘 중성'], 0, '꾸미는 명사의 성', 'sacca는 중성명사이므로 중성 cattāri를 씁니다.'),
    quiz('"dveme"를 풀면?', ['dve + ime (이 두 가지)', 'dve + me (나의 둘)', 'dvi + eme', 'de + veme'], 0, '연성', 'dve + ime → dveme (모음 연성)'),
    quiz('"tatiyampi"의 뜻은?', ['세 번째에도', '셋이서', '세 가지의', '세 번 하라'], 0, 'tatiya + pi', 'tatiya(셋째) + pi(~에도) = 세 번째에도'),
    speak('Ekāyano ayaṃ, bhikkhave, maggo, yadidaṃ cattāro satipaṭṭhānā.'),
])

# ───────── 7. 동사 접두사 ─────────
L['prefix'] = ('동사 접두사 (upasagga)', 'ā·upa·pa·abhi·saṃ·vi·ni·pari·anu…', '➕', 'LESSON_PREFIX', [
    intro('동사 접두사 (Upasagga)', '앞에 붙어 뜻을 바꾸는 말', '같은 동사라도 앞에 무엇이 붙느냐에 따라\n뜻이 달라집니다.\n\ngacchati (가다) → āgacchati (오다)\njānāti (알다) → pajānāti (분명히 알다)\n\n접두사 뜻을 알면 처음 보는 동사도 짐작할 수 있습니다.', '➕'),
    tg('자주 나오는 접두사 ①', 'ā-   āgacchati\nupa- upagacchati\npa-  pajānāti\nabhi- abhijānāti\nsaṃ- saṃvattati', '이쪽으로 → 오다\n가까이 → 다가가다\n앞으로·분명히 → 분명히 알다\n뛰어나게·향하여 → 철저히 알다\n함께·완전히 → (함께) 일어나다, 이끌다', '접두사 끝소리와 동사 첫소리가 만나\n소리가 바뀌기도 합니다 (연성).\n  saṃ + vattati → saṃvattati\n  ud + gacchati → uggacchati'),
    tg('자주 나오는 접두사 ②', 'vi-  viharati\nni-  nisīdati\npari- parinibbāyati\nanu- anupassati\nud-  uggacchati\npaṭi- paṭipajjati', '나누어·떨어져 → 머물다\n아래로 → 앉다\n둘레·완전히 → 완전한 열반에 들다\n따라 → 따라 관찰하다\n위로 → 떠오르다\n거슬러·향하여 → 실천하다', '명사에도 같은 접두사가 붙습니다.\n  anupassī (따라 관찰하는 이)\n  paṭipadā (실천, 길)\n  sampajāno (분명히 아는)'),
    teach('anupassī', '따라 관찰하는 이', '👀', '형용사(명사적), 남성 주격 단수', 'anu (따라) + passati (보다)', 'kāye kāyānupassī = 몸에서 몸을 따라 관찰하는'),
    teach('viharati', '머문다, 지낸다', '🏡', '동사, 현재 3인칭 단수', 'vi + harati (가져가다)'),
    teach('nisīdati', '앉는다', '🪑', '동사, 현재 3인칭 단수', 'ni (아래로) + sīdati (가라앉다)'),
    teach('sampajāno', '분명히 알아차리는', '🔆', '형용사, 남성 주격 단수', 'saṃ + pa + jānāti'),
    verse('Kāye kāyānupassī viharati ātāpī sampajāno satimā.', '몸에서 몸을 따라 관찰하며 머문다, 열심히, 분명히 알아차리며, 마음챙기며.', ['kāyānupassī', 'viharati', 'sampajāno'], '대념처경(MN 10)\nanu-passī, vi-harati, saṃ-pa-jāno — 접두사 셋'),
    verse('Nisīdati pallaṅkaṃ ābhujitvā, ujuṃ kāyaṃ paṇidhāya.', '가부좌를 틀고, 몸을 곧게 세우고 앉는다.', ['Nisīdati', 'ābhujitvā', 'paṇidhāya'], '대념처경(MN 10)\nā-bhujitvā (구부려서), pa-ṇidhāya (향하여 두고)'),
    quiz('"āgacchati"의 뜻은?', ['오다', '가다', '떠나다', '앉다'], 0, 'ā = 이쪽으로', 'ā(이쪽으로) + gacchati(가다) = 오다'),
    quiz('"anupassī"의 anu-는 무슨 뜻?', ['따라', '아래로', '위로', '함께'], 0, 'anu-passati', 'anu(따라) + passati(보다) = 따라 관찰하다'),
    quiz('"uggacchati"는 어떻게 만들어졌나?', ['ud(위로) + gacchati', 'ug + acchati', 'u + gacchati', 'uggha + cchati'], 0, '연성 d + g → gg', 'ud + gacchati → uggacchati (떠오르다)'),
    speak('Kāye kāyānupassī viharati ātāpī sampajāno satimā.'),
])

# ───────── 8. 비교급·최상급 ─────────
L['comparison'] = ('비교급·최상급', '-tara/-tama · seyyo/seṭṭha', '📈', 'LESSON_COMPARISON', [
    intro('비교급·최상급', '더 ~한 / 가장 ~한', '형용사에 어미를 붙여 "더 ~한", "가장 ~한"을 만듭니다.\n\n축복경 후렴 maṅgalamuttamaṃ(최상의 축복)의\nuttama도 최상급입니다.', '📈'),
    tg('두 가지 방법', '-tara / -tama:\n  pāpa → pāpatara → pāpatama\n-iya(-yya) / -iṭṭha:\n  pāpa → pāpiya → pāpiṭṭha', '나쁜 → 더 나쁜 → 가장 나쁜\n\n나쁜 → 더 나쁜 → 가장 나쁜', '두 방법 모두 쓰입니다.\n\n특별한 꼴 (꼭 외우기):\n• seyyo (더 나은) ↔ seṭṭha (가장 뛰어난)\n• uttama (최상의)\n• jeṭṭha (가장 나이 많은, 맏이)'),
    tg('비교 대상은 탈격', 'Sīlaṃ dhanato seyyo.', '계는 재물보다 낫다.', '"~보다"는 탈격(-to, -ā, -mhā, -smā)으로 나타냅니다.\n  dhanato = 재물보다\n\n최상급은 소유격·처소격과 함께\n"~ 가운데 가장"을 나타냅니다.'),
    teach('seyyo', '더 나은', '👍', '형용사 비교급, 주격 단수', '', '최상급: seṭṭha (가장 뛰어난)'),
    teach('seṭṭha', '가장 뛰어난, 으뜸인', '🥇', '형용사 최상급', '', 'manoseṭṭhā = 마음이 으뜸인'),
    teach('uttama', '최상의', '🏆', '형용사 최상급', 'ud (위) + tama', 'maṅgalamuttamaṃ = maṅgalaṃ + uttamaṃ (최상의 축복)'),
    verse('Ekaṃ atthapadaṃ seyyo, yaṃ sutvā upasammati.', '들으면 고요해지는 이로운 한 구절이 (뜻 없는 천 마디보다) 더 낫다.', ['seyyo'], '법구경 100게의 뒷부분\nseyyo = 더 나은 (비교급)'),
    verse('Manopubbaṅgamā dhammā, manoseṭṭhā manomayā.', '마음이 모든 법의 선구자이고, 마음이 으뜸이며, 마음으로 만들어진다.', ['manoseṭṭhā'], '법구경 1게\nmanoseṭṭhā = mano(마음) + seṭṭha(으뜸) — 소유 복합어'),
    verse('Etaṃ maṅgalamuttamaṃ.', '이것이 최상의 축복이다.', ['maṅgalamuttamaṃ'], '축복경의 후렴\nmaṅgalaṃ + uttamaṃ (연성)'),
    quiz('"seyyo"의 뜻은?', ['더 나은', '가장 나쁜', '나쁜', '처음의'], 0, '비교급', 'seyyo는 "더 나은"이라는 비교급입니다. 최상급은 seṭṭha.'),
    quiz('"재물보다"처럼 비교 대상은 무슨 격?', ['탈격', '소유격', '도구격', '주격'], 0, 'dhanato', '비교 대상(~보다)은 탈격으로 나타냅니다.'),
    quiz('"maṅgalamuttamaṃ"을 풀면?', ['maṅgalaṃ + uttamaṃ (최상의 축복)', 'maṅgala + muttamaṃ', 'maṅgalam + uttama (축복의 위)', 'maṅga + lamuttamaṃ'], 0, '연성', 'ṃ 뒤에 모음이 오면 m으로 이어집니다.'),
    speak('Etaṃ maṅgalamuttamaṃ.'),
])

# ───────── 9. 파생 접미사 ─────────
L['taddhita'] = ('파생 접미사 (taddhita)', '-ika · -tā/-tta · -ya', '🌱', 'LESSON_TADDHITA', [
    intro('파생 접미사 (Taddhita)', '명사에서 새 낱말 만들기', '명사·형용사 뒤에 접미사를 붙여\n"~에 속한", "~함(추상명사)" 같은 새 낱말을 만듭니다.\n\nkāyika (몸의), kataññutā (은혜를 앎)처럼\n경전에 자주 나옵니다.', '🌱'),
    tg('-ika: ~에 속한, ~와 관련된', 'kāya → kāyika\ncetas → cetasika\ndhamma → dhammika', '몸 → 몸의, 육체적인\n마음 → 마음의, 정신적인\n법 → 법다운, 여법한', '첫 모음이 길어지기도 합니다 (vuddhi).\n  puthujjana → pothujjanika (범부에 속한)'),
    tg('-tā / -tta / -ya: 추상명사 (~함, ~임)', 'kataññu → kataññutā\nmanussa → manussatta\npaṇḍita → paṇḍicca', '은혜를 아는 이 → 은혜를 앎\n사람 → 사람임\n현명한 이 → 현명함', '• -tā: 여성명사 (kataññutā)\n• -tta: 중성명사 (manussatta)\n• -ya: 중성명사, 앞 자음과 닮기도 함\n  paṇḍita + ya → paṇḍicca'),
    teach('kāyika', '몸의, 육체적인', '🧍', '형용사 (taddhita -ika)', 'kāya (몸) + -ika'),
    teach('cetasika', '마음의, 정신적인', '💭', '형용사 (taddhita -ika)', 'cetas (마음) + -ika'),
    teach('kataññutā', '은혜를 앎, 감사함', '🙏', '여성명사 (taddhita -tā)', 'kataññu (은혜를 아는 이) + -tā'),
    verse('Gāravo ca nivāto ca, santuṭṭhi ca kataññutā; Kālena dhammassavanaṃ, etaṃ maṅgalamuttamaṃ.', '공경과 겸손, 만족과 은혜를 앎, 알맞은 때에 법을 듣는 것, 이것이 최상의 축복이다.', ['kataññutā'], '축복경\nkataññutā = kataññu + tā (추상명사)'),
    verse('Yaṃ kho, bhikkhave, kāyikaṃ dukkhaṃ kāyikaṃ asātaṃ, idaṃ vuccati, bhikkhave, dukkhaṃ.', '비구들이여, 몸의 괴로움, 몸의 불쾌함, 이것을 괴로움이라고 한다.', ['kāyikaṃ'], '대념처경(MN 10)의 괴로움 정의 (줄임)\nkāyika = kāya + ika'),
    quiz('"cetasika"의 뜻은?', ['마음의, 정신적인', '마음을 가진 이', '마음이 없는', '마음으로'], 0, 'cetas + ika', '-ika는 "~에 속한, ~와 관련된"을 뜻합니다.'),
    quiz('"kataññutā"는 어떤 낱말?', ['추상명사 (은혜를 앎)', '동사', '소유격', '부사'], 0, '-tā', '-tā는 "~함, ~임"을 뜻하는 추상명사를 만듭니다.'),
    quiz('"paṇḍicca"는 어떻게 만들어졌나?', ['paṇḍita + ya', 'paṇḍi + cca', 'paṇḍa + icca', 'paṇḍita + ika'], 0, '-ya가 앞 자음과 닮음', 'paṇḍita + ya → paṇḍicca (현명함)'),
    speak('Gāravo ca nivāto ca, santuṭṭhi ca kataññutā.'),
])

# ───────── 10. 상관 구문 ─────────
L['correlative'] = ('상관 구문 (ya … ta …)', 'yathā…tathā · yasmā…tasmā · yo…so', '🔗', 'LESSON_CORRELATIVE', [
    intro('상관 구문', 'ya- … ta- … 짝 맞추기', '관계사(ya-)로 시작한 앞부분을\n지시사(ta-)가 받는 구문입니다.\n\nyathā … tathā … (~하는 대로 그렇게)\nyasmā … tasmā … (~이기 때문에 그러므로)', '🔗'),
    tg('짝 목록', 'yo … so …\nyathā … tathā …\nyattha … tattha …\nyadā … tadā …\nyasmā … tasmā …\nyāva … tāva …', '~하는 사람은, 그는\n~하는 대로, 그렇게\n~하는 곳에, 거기에\n~할 때, 그때\n~이기 때문에, 그러므로\n~하는 만큼(동안), 그만큼(그동안)', '앞부분(ya-)은 조건·이유·때를,\n뒷부분(ta-)은 결과를 나타냅니다.\n\n옮길 때는 ya- 부분을 먼저 묶고\nta- 부분에서 문장을 닫으면 됩니다.'),
    teach('yathā', '~하는 대로, ~처럼', '📏', '관계 부사'),
    teach('tathā', '그렇게, 그와 같이', '📐', '지시 부사'),
    teach('yasmā', '~이기 때문에', '❔', '관계 대명사 탈격 (부사적)', 'ya-'),
    teach('tasmā', '그러므로', '✅', '지시 대명사 탈격 (부사적)', 'ta-'),
    verse('Yathā yathā vā panassa kāyo paṇihito hoti, tathā tathā naṃ pajānāti.', '그의 몸이 어떤 자세로 놓여 있든, 그대로 그것을 분명히 안다.', ['Yathā', 'tathā'], '대념처경(MN 10)\nyathā yathā … tathā tathā … = 어떻게 ~하든 그대로'),
    verse('Yasmā ca kho, bhikkhave, rūpaṃ anattā, tasmā rūpaṃ ābādhāya saṃvattati.', '비구들이여, 물질은 자아가 아니기 때문에, 그러므로 물질은 병으로 이끈다.', ['Yasmā', 'tasmā'], '무아상경(SN 22.59)\nyasmā … tasmā … = ~이기 때문에, 그러므로'),
    quiz('"yasmā … tasmā …"의 뜻은?', ['~이기 때문에, 그러므로', '~하는 곳에, 거기에', '~할 때, 그때', '~하는 대로, 그렇게'], 0, '탈격 (이유)', 'yasmā(때문에) … tasmā(그러므로)'),
    quiz('"yathā"와 짝을 이루는 말은?', ['tathā', 'tasmā', 'tattha', 'tadā'], 0, '~하는 대로 … 그렇게', 'yathā … tathā … (~하는 대로 그렇게)'),
    quiz('"yattha … tattha …"의 뜻은?', ['~하는 곳에, 거기에', '~할 때, 그때', '~이기 때문에, 그러므로', '~하는 만큼, 그만큼'], 0, '-ttha = 장소', 'yattha(~하는 곳에) … tattha(거기에)'),
    speak('Yasmā ca kho, bhikkhave, rūpaṃ anattā, tasmā rūpaṃ ābādhāya saṃvattati.'),
])

# ───────── 11. 격의 특수 용법 ─────────
L['case-uses'] = ('격의 특수 용법', '때의 목적격 · 목적의 여격 · 관하여의 처소격', '🎯', 'LESSON_CASE_USES', [
    intro('격의 특수 용법', '기본 뜻 너머의 쓰임', '격에는 기본 뜻 말고도\n경전에 자주 나오는 특별한 쓰임이 있습니다.\n\nekaṃ samayaṃ (한때) — 목적격인데 "~을"이 아닙니다.', '🎯'),
    tg('때를 나타내는 목적격·도구격', 'ekaṃ samayaṃ\nrattiṃ\nkālena', '한때\n밤에, 밤새\n알맞은 때에', '• 목적격: 때·기간 (언제, 얼마 동안)\n  ekaṃ samayaṃ = 한때\n• 도구격: 알맞은 때·방식\n  kālena = 알맞은 때에'),
    tg('목적의 여격 · 원인의 탈격', 'nibbānāya saṃvattati\njātipaccayā jarāmaraṇaṃ', '열반으로 이끈다 (열반을 위해)\n태어남을 조건으로 늙음과 죽음이 (있다)', '• 여격 -āya: 목적·결과 "~을 위해, ~으로"\n  abhiññāya, sambodhāya, nibbānāya\n• 탈격: 원인·조건 "~ 때문에, ~을 조건으로"\n  jātipaccayā (태어남을 조건으로)'),
    tg('"~에 관하여"의 처소격', 'rūpe\nvedanāya\nkāye kāyānupassī', '물질에 관하여\n느낌에 관하여\n몸에서 (몸에 관하여) 몸을 따라 관찰하는', '처소격은 장소(~에)만이 아니라\n"~에 대하여, ~에 관하여"를 나타내기도 합니다.\n  na ca labbhati rūpe = 물질에 관해서는 될 수 없다'),
    teach('samayaṃ', '때 (한때)', '⏰', '남성명사, 목적격 단수 (때)', 'samaya (때)', 'ekaṃ samayaṃ = 한때'),
    teach('kālena', '알맞은 때에', '🕰️', '남성명사, 도구격 단수 (때)', 'kāla (때)'),
    teach('nibbānāya', '열반으로, 열반을 위해', '🪷', '중성명사, 여격 단수 (목적)', 'nibbāna'),
    teach('jātipaccayā', '태어남을 조건으로', '🌱', '복합어, 탈격 단수 (원인)', 'jāti (태어남) + paccaya (조건)'),
    verse('Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.', '이와 같이 나는 들었다. 한때 세존께서는 사왓티의 제따 숲, 아나타삔디까의 동산에 머무셨다.', ['samayaṃ'], 'ekaṃ samayaṃ = 때를 나타내는 목적격'),
    verse('Upasamāya abhiññāya sambodhāya nibbānāya saṃvattati.', '고요함으로, 최상의 앎으로, 바른 깨달음으로, 열반으로 이끈다.', ['Upasamāya', 'abhiññāya', 'sambodhāya', 'nibbānāya'], '초전법륜경(SN 56.11)의 중도 설명\n-āya 넷 모두 목적의 여격'),
    quiz('"ekaṃ samayaṃ"의 samayaṃ은 어떤 용법?', ['때를 나타내는 목적격', '동사의 목적어', '목적의 여격', '처소격'], 0, '"한때"', '목적격이 때·기간을 나타냅니다.'),
    quiz('"nibbānāya saṃvattati"의 nibbānāya는?', ['목적의 여격 (열반으로)', '소유격 (열반의)', '처소격 (열반에서)', '주격'], 0, '-āya', '여격 -āya가 목적·결과를 나타냅니다.'),
    quiz('"jātipaccayā"의 탈격은 무엇을 나타내나?', ['원인·조건', '장소', '목적', '때'], 0, '~을 조건으로', '탈격은 원인·조건을 나타내기도 합니다.'),
    speak('Upasamāya abhiññāya sambodhāya nibbānāya saṃvattati.'),
])

# ───────── 12. 불규칙 동사 ─────────
L['irregular'] = ('자주 나오는 불규칙 동사', 'atthi·hoti · āha · karoti · deti · passati', '🌀', 'LESSON_IRREGULAR', [
    intro('자주 나오는 불규칙 동사', 'atthi·hoti · avoca·āha · akāsi · addasa', '경전에 가장 많이 나오는 동사들은\n모양이 불규칙합니다.\n\n과거·미래·절대분사 꼴을 함께 익혀 두면\n경전 문장이 훨씬 잘 보입니다.', '🌀'),
    tg('atthi (있다) · hoti (있다, 되다)', 'atthi / santi\nasmi(amhi) / asma(amha)\nsiyā\nahosi / ahesuṃ\nbhavissati\nhotu, bhavatu', '있다 (그는 / 그들은)\n나는 있다 / 우리는 있다\n있을 것이다, ~이리라 (원망형)\n있었다, 되었다 (과거)\n있을 것이다 (미래)\n있어라, ~이 되기를 (명령)', 'atthi는 과거·미래를 대개 hoti(bhavati)의 꼴로 씁니다.\n  ahosi (과거), bhavissati (미래)\n  sumanā bhavantu = 기쁜 마음이 되기를'),
    tg('말하다 · 하다 · 주다 · 보다 · 가다', 'avoca, āha / avocuṃ, āhu\nakāsi · karissati · katvā · kata\nadāsi · dassati · datvā · dinna\naddasa · dakkhati · disvā · diṭṭha\nagamāsi · gamissati · gantvā · gata', '말했다 / 그들은 말했다\n했다 · 할 것이다 · 하고서 · 행해진\n주었다 · 줄 것이다 · 주고서 · 주어진\n보았다 · 볼 것이다 · 보고서 · 보인\n갔다 · 갈 것이다 · 가고서 · 간', '왼쪽부터: 과거 · 미래 · 절대분사 · 과거분사\n\nIdamavoca bhagavā = idaṃ + avoca (세존께서 이것을 말씀하셨다)'),
    teach('avoca', '말했다', '🗣️', '동사 과거형(aorist), 3인칭 단수', 'vatti (말하다)', 'Idamavoca = idaṃ + avoca'),
    teach('siyā', '~이리라, ~일 것이다', '🤔', '동사 원망형, 3인칭 단수', 'atthi (있다)'),
    teach('bhavantu', '~이 되기를, ~이어라', '🙏', '동사 명령형, 3인칭 복수', 'bhavati (있다, 되다)'),
    teach('addasa', '보았다', '👁️', '동사 과거형(aorist), 3인칭 단수', 'passati (보다)', '절대분사 disvā, 과거분사 diṭṭha'),
    verse('Idamavoca bhagavā.', '세존께서 이렇게 말씀하셨다.', ['Idamavoca'], '경의 끝맺음 정형구\nidaṃ + avoca (연성)'),
    verse('Sabbeva bhūtā sumanā bhavantu.', '모든 존재가 기쁜 마음이 되기를.', ['bhavantu'], '보배경\nbhavantu = bhavati의 명령형 3인칭 복수'),
    verse('Attā hi attano nātho, ko hi nātho paro siyā.', '자기야말로 자기의 의지처이니, 다른 누가 의지처가 되겠는가.', ['siyā'], '법구경 160게\nsiyā = atthi의 원망형'),
    quiz('"Idamavoca bhagavā"의 avoca는?', ['vatti(말하다)의 과거형', 'vatti의 미래형', '명령형', '명사'], 0, 'aorist', 'avoca는 "말했다"라는 과거형입니다.'),
    quiz('"disvā"의 뜻은?', ['보고서', '보았다', '볼 것이다', '보인'], 0, '절대분사 -tvā와 같은 역할', 'disvā는 passati의 절대분사(보고서)입니다.'),
    quiz('"bhavantu"는 어떤 꼴?', ['명령형 (~이 되기를)', '과거형', '미래형', '현재분사'], 0, '-ntu', '3인칭 복수 명령형 어미 -ntu입니다.'),
    speak('Sabbeva bhūtā sumanā bhavantu.'),
])

# ───────── 13. 불변화사 총정리 ─────────
L['particles'] = ('강조·담화 불변화사', 'kho·pana·hi·eva·api·nu·nāma…', '✨', 'LESSON_PARTICLES', [
    intro('강조·담화 불변화사', 'kho · pana · hi · eva · api · nu …', '경전 문장 곳곳에 붙는 짧은 말들입니다.\n뜻이 작아 보이지만 문장의 흐름과 강조를 알려 줍니다.\n\n대부분 문장 첫 낱말 바로 뒤에 옵니다.', '✨'),
    tg('자주 나오는 불변화사 ①', 'kho\npana\nhi\neva (va)\napi (pi)', '실로, 참으로 (가벼운 강조)\n그런데, 또한 (화제 전환)\n실로, 왜냐하면\n바로, 오직 (강조)\n~도, ~조차', '• tatra kho = 거기서 (실로)\n• idaṃ kho pana = 그런데 이것이\n• sabbeva = sabbe + eva (모두 다)\n• dutiyampi = dutiyaṃ + pi (두 번째에도)'),
    tg('자주 나오는 불변화사 ②', 'nu\nkira\nnāma\natha\ntena hi', '~인가? (의문)\n~라고 한다 (전해 들음)\n~라는 (이름), 참으로\n그때, 그러자\n그렇다면', '• kiṃ nu = 무엇인가?\n• kammāsadhammaṃ nāma = 깜마사담마라는\n• tena hi, bhikkhave = 그렇다면, 비구들이여'),
    teach('kho', '실로, 참으로', '✨', '불변화사 (강조)'),
    teach('pana', '그런데, 또한', '↪️', '불변화사 (화제 전환)'),
    teach('eva', '바로, 오직', '☝️', '불변화사 (강조)', '', '줄어서 va, 연성으로 -eva (sabbeva)'),
    teach('nāma', '~라는 (이름), 참으로', '🏷️', '불변화사'),
    verse('Tatra kho bhagavā bhikkhū āmantesi.', '거기서 세존께서는 비구들을 부르셨다.', ['kho'], '경 첫머리의 정형구\nkho = 가벼운 강조'),
    verse('Idaṃ kho pana, bhikkhave, dukkhaṃ ariyasaccaṃ.', '비구들이여, 그런데 이것이 괴로움의 성스러운 진리이다.', ['kho', 'pana'], '초전법륜경(SN 56.11)\nkho pana = 그런데 (새 화제)'),
    quiz('"sabbeva"를 풀면?', ['sabbe + eva (모두 다)', 'sabba + iva', 'sabbe + va (또는)', 'sabbe + vā'], 0, '강조 eva', 'sabbe(모두) + eva(바로) = 모두 다'),
    quiz('"kiṃ nu"의 nu는?', ['의문 (~인가?)', '부정 (아니다)', '강조 (바로)', '인용 (~라고)'], 0, '물음', 'nu는 의문을 나타냅니다.'),
    quiz('"tena hi"의 뜻은?', ['그렇다면', '그러므로 그는', '그에 의해', '그것도'], 0, '관용구', 'tena hi = 그렇다면'),
    speak('Idaṃ kho pana, bhikkhave, dukkhaṃ ariyasaccaṃ.'),
])

# ───────── 14. 줄임 표시·정형구 ─────────
L['peyyala'] = ('줄임 표시와 정형구', 'pe · …pa… · 처음과 끝의 정형구', '📜', 'LESSON_PEYYALA', [
    intro('줄임 표시와 정형구', 'pe · 처음과 끝의 정형구', '경전은 같은 말을 여러 번 되풀이합니다.\n그래서 반복되는 부분은 pe(…)로 줄여 적습니다.\n\n또 경의 처음과 끝에는 늘 같은 정형구가 옵니다.', '📜'),
    tg('줄임 표시 pe (peyyāla)', '… pe …\n…pa…', '이하 같음 (앞에 나온 대로 되풀이)', 'pe = peyyāla (반복 생략)\n\n앞에 나온 문장을 그대로 넣어 읽으면 됩니다.\n예) 네 가지 마음챙김 각각에 같은 문장이 되풀이될 때\n두 번째부터 "… pe …"로 줄여 적음\n\n※ 이 앱의 경전 과는 줄이지 않고 다 풀어 적었습니다.'),
    tg('경의 처음 — 이와 같이 나는 들었다', 'Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā … viharati …', '이와 같이 나는 들었다. 한때 세존께서는 …에 머무셨다.', '거의 모든 경이 이 말로 시작합니다.\n아난다 존자가 1차 결집에서 경을 외우며 한 말입니다.\n\n• evaṃ = 이와 같이\n• me = 나에 의해 / 나의 (도구격/소유격)\n• sutaṃ = 들은 (과거분사)\n• ekaṃ samayaṃ = 한때 (때의 목적격)'),
    tg('경의 끝 — 비구들은 기뻐하였다', 'Idamavoca bhagavā. Attamanā te bhikkhū bhagavato bhāsitaṃ abhinandunti.', '세존께서 이렇게 말씀하셨다. 그 비구들은 흡족한 마음으로 세존의 말씀을 기뻐하였다.', '• Idamavoca = idaṃ + avoca (이것을 말씀하셨다)\n• attamanā = 흡족한 마음인 (소유 복합어)\n• bhagavato bhāsitaṃ = 세존의 말씀 (소유격)\n• abhinanduṃ + iti → abhinandunti'),
    teach('pe', '이하 같음 (반복 생략)', '✂️', '줄임 표시', 'peyyāla'),
    teach('sutaṃ', '들은 (것)', '👂', '과거분사, 중성 주격 단수', 'suṇāti (듣다) → suta'),
    teach('abhinanduṃ', '기뻐하였다', '😊', '동사 과거형, 3인칭 복수', 'abhi + nandati (기뻐하다)'),
    verse('Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.', '이와 같이 나는 들었다. 한때 세존께서는 사왓티의 제따 숲, 아나타삔디까의 동산에 머무셨다.', ['Evaṃ', 'me', 'sutaṃ'], '경의 처음 정형구'),
    verse('Idamavoca bhagavā. Attamanā te bhikkhū bhagavato bhāsitaṃ abhinandunti.', '세존께서 이렇게 말씀하셨다. 그 비구들은 흡족한 마음으로 세존의 말씀을 기뻐하였다.', ['Idamavoca', 'abhinandunti'], '대념처경(MN 10)의 끝맺음\nabhinandunti = abhinanduṃ + iti'),
    quiz('경전의 "… pe …"는?', ['앞에 나온 말을 되풀이한다는 줄임 표시', '"~라고"', '부정어', '문장의 끝'], 0, 'peyyāla', 'pe는 반복되는 부분을 줄였다는 표시입니다.'),
    quiz('"abhinandunti"를 풀면?', ['abhinanduṃ + iti', 'abhinandati + nti', 'abhi + nandunti (현재)', 'abhinanda + unti'], 0, 'ṃ + iti → nti', '과거형 abhinanduṃ(기뻐하였다)에 인용 표시 iti가 붙었습니다.'),
    quiz('"Evaṃ me sutaṃ"의 sutaṃ은?', ['과거분사 (들은)', '동사 현재형', '명령형', '부사'], 0, 'suṇāti → suta', 'sutaṃ은 suṇāti(듣다)의 과거분사입니다.'),
    speak('Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.'),
])

ORDER = ['compound', 'iti', 'passive', 'consonant-stem', 'conditional', 'numerals', 'prefix', 'comparison',
         'taddhita', 'correlative', 'case-uses', 'irregular', 'particles', 'peyyala']

if __name__ == '__main__':
    texts = []
    for key in ORDER:
        title, sub, icon, const, steps = L[key]
        body = (f"// {title} — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)\n"
                "import type { StepWithoutId } from './types'\n\n"
                f"export const {const}: StepWithoutId[] = [\n"
                + ''.join('  ' + json.dumps(s, ensure_ascii=False) + ',\n' for s in steps) + ']\n')
        (OUT / f'lesson-{key}.ts').write_text(body, encoding='utf-8')
        for s in steps:
            for k in ('pali', 'word'):
                if s.get(k) and s['type'] in ('teach', 'verse', 'speak'):
                    texts.append(s[k])
        print(key, len(steps))
    seen = []
    for t in texts:
        if t not in seen:
            seen.append(t)
    (ROOT / 'primer' / 'scripts' / 'tts' / 'redo_texts.json').write_text(json.dumps(seen, ensure_ascii=False, indent=1), encoding='utf-8')
    print('texts', len(seen))
