# 대념처경 DN 22 — 기존 수업을 유지하면서, VRI의 '…'·'…pe…'로 줄인 문단만 전문으로 펼침
# REPLACE = {기존 단계 번호: [(빠알리, 번역), ...]}  — 그 게송 하나를 여러 게송으로 바꿈


def josa(word, pair):
    """받침 유무에 따라 조사 선택: pair=('이','가') 등"""
    ch = word[-1]
    has = 0xAC00 <= ord(ch) <= 0xD7A3 and (ord(ch) - 0xAC00) % 28 != 0
    return word + (pair[0] if has else pair[1])


ARISE = ('etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati', '그곳에서 이 갈애가 일어나고 자리 잡는다')
CEASE = ('etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati', '그곳에서 이 갈애가 끊어지고 사라진다')

GROUPS = [
    (['Cakkhu', 'Sotaṃ', 'Ghānaṃ', 'Jivhā', 'Kāyo', 'Mano'], ['눈', '귀', '코', '혀', '몸', '마노']),
    (['Rūpā', 'Saddā', 'Gandhā', 'Rasā', 'Phoṭṭhabbā', 'Dhammā'], ['형색', '소리', '냄새', '맛', '감촉', '법']),
    (['Cakkhuviññāṇaṃ', 'Sotaviññāṇaṃ', 'Ghānaviññāṇaṃ', 'Jivhāviññāṇaṃ', 'Kāyaviññāṇaṃ', 'Manoviññāṇaṃ'], ['안식', '이식', '비식', '설식', '신식', '의식']),
    (['Cakkhusamphasso', 'Sotasamphasso', 'Ghānasamphasso', 'Jivhāsamphasso', 'Kāyasamphasso', 'Manosamphasso'],
     ['눈의 접촉', '귀의 접촉', '코의 접촉', '혀의 접촉', '몸의 접촉', '마노의 접촉']),
    (['Cakkhusamphassajā vedanā', 'Sotasamphassajā vedanā', 'Ghānasamphassajā vedanā', 'Jivhāsamphassajā vedanā', 'Kāyasamphassajā vedanā', 'Manosamphassajā vedanā'],
     ['눈의 접촉에서 생긴 느낌', '귀의 접촉에서 생긴 느낌', '코의 접촉에서 생긴 느낌', '혀의 접촉에서 생긴 느낌', '몸의 접촉에서 생긴 느낌', '마노의 접촉에서 생긴 느낌']),
    (['Rūpasaññā', 'Saddasaññā', 'Gandhasaññā', 'Rasasaññā', 'Phoṭṭhabbasaññā', 'Dhammasaññā'],
     ['형색의 인식', '소리의 인식', '냄새의 인식', '맛의 인식', '감촉의 인식', '법의 인식']),
    (['Rūpasañcetanā', 'Saddasañcetanā', 'Gandhasañcetanā', 'Rasasañcetanā', 'Phoṭṭhabbasañcetanā', 'Dhammasañcetanā'],
     ['형색의 의도', '소리의 의도', '냄새의 의도', '맛의 의도', '감촉의 의도', '법의 의도']),
    (['Rūpataṇhā', 'Saddataṇhā', 'Gandhataṇhā', 'Rasataṇhā', 'Phoṭṭhabbataṇhā', 'Dhammataṇhā'],
     ['형색의 갈애', '소리의 갈애', '냄새의 갈애', '맛의 갈애', '감촉의 갈애', '법의 갈애']),
    (['Rūpavitakko', 'Saddavitakko', 'Gandhavitakko', 'Rasavitakko', 'Phoṭṭhabbavitakko', 'Dhammavitakko'],
     ['형색의 사유', '소리의 사유', '냄새의 사유', '맛의 사유', '감촉의 사유', '법의 사유']),
    (['Rūpavicāro', 'Saddavicāro', 'Gandhavicāro', 'Rasavicāro', 'Phoṭṭhabbavicāro', 'Dhammavicāro'],
     ['형색의 고찰', '소리의 고찰', '냄새의 고찰', '맛의 고찰', '감촉의 고찰', '법의 고찰']),
]
ARISE_OLD = [611, 618, 625, 628, 630, 632, 634, 636, 639, 641]
CEASE_OLD = [654, 655, 656, 657, 658, 659, 660, 661, 662, 663]

REPLACE = {}


def group_unit(gi, kind):
    items, kos = GROUPS[gi]
    tail, tail_k = ARISE if kind == 'arise' else CEASE
    pali, ko = [], []
    if gi == 0:
        pali.append('‘‘Kiñca loke piyarūpaṃ sātarūpaṃ?')
        ko.append('“세상에서 무엇이 사랑스럽고 만족스러운 모습인가?')
    for n, (it, k) in enumerate(zip(items, kos)):
        q = '‘‘' if (gi > 0 and n == 0) else ''
        pali.append(f'{q}{it} loke piyarūpaṃ sātarūpaṃ, {tail}.')
        ko.append(('“' if q else '') + f'{josa(k, ("이", "가"))} 세상에서 사랑스럽고 만족스러운 모습이니, {tail_k}.')
    if gi == len(GROUPS) - 1:
        truth = 'dukkhasamudayaṃ' if kind == 'arise' else 'dukkhanirodhaṃ'
        truth_k = '괴로움의 일어남의' if kind == 'arise' else '괴로움의 소멸의'
        pali.append(f'Idaṃ vuccati, bhikkhave, {truth} ariyasaccaṃ.')
        ko.append(f'비구들이여, 이를 일러 {truth_k} 성스러운 진리라 한다.')
    return [(' '.join(pali), ' '.join(ko))]


for gi in range(len(GROUPS)):
    REPLACE[ARISE_OLD[gi]] = group_unit(gi, 'arise')
    REPLACE[CEASE_OLD[gi]] = group_unit(gi, 'cease')

# 수행 기간 (…pe… 복원)
FRUIT = 'tassa dvinnaṃ phalānaṃ aññataraṃ phalaṃ pāṭikaṅkhaṃ diṭṭheva dhamme aññā; sati vā upādisese anāgāmitā'
FRUIT_K = '그에게는 두 가지 결과 가운데 하나가 기대된다. 지금 여기에서 구경의 지혜를 얻거나, 집착의 남음이 있으면 불환과를 얻는다'
PRACT = 'Yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya'
PRACT_K = '누구든지 이 네 가지 마음챙김의 확립을 이와 같이'


def periods(chain, last_end):
    """chain: [(그만둘 기간, 그만둘 기간 번역, 단수여부), ...] 다음 기간으로 이어짐"""
    out = []
    for (stop, stop_k, sing), (cur, cur_k, _) in zip(chain, chain[1:]):
        verb = 'Tiṭṭhatu' if sing else 'Tiṭṭhantu'
        end = last_end if cur == chain[-1][0] else '.'
        out.append((f'‘‘{verb}, bhikkhave, {stop}. {PRACT} {cur}, {FRUIT}{end}',
                    f'“비구들이여, {stop_k}은 그만두자. {PRACT_K} {cur_k} 동안 닦으면, {FRUIT_K}.'))
    return out


YEARS = [('sattavassāni', '칠 년', False), ('cha vassāni', '육 년', False), ('pañca vassāni', '오 년', False),
         ('cattāri vassāni', '사 년', False), ('tīṇi vassāni', '삼 년', False), ('dve vassāni', '이 년', False),
         ('ekaṃ vassaṃ', '일 년', True), ('sattamāsāni', '칠 개월', False)]
MONTHS = [('satta māsāni', '칠 개월', False), ('cha māsāni', '육 개월', False), ('pañca māsāni', '오 개월', False),
          ('cattāri māsāni', '사 개월', False), ('tīṇi māsāni', '삼 개월', False), ('dve māsāni', '이 개월', False),
          ('ekaṃ māsaṃ', '한 달', True), ('aḍḍhamāsaṃ', '보름', True), ('sattāhaṃ', '칠 일', True)]
# aḍḍhamāsaṃ을 그만둘 때 VRI는 주격 aḍḍhamāso
REPLACE[792] = periods(YEARS, '.')
_m = periods(MONTHS, 'ti.')
_m[-1] = (_m[-1][0].replace('bhikkhave, aḍḍhamāsaṃ.', 'bhikkhave, aḍḍhamāso.'), _m[-1][1])
REPLACE[796] = _m

# 마지막 따라 읽기: 생략 없이
REPLACE_SPEAK = {
    814: 'Ekāyano ayaṃ, bhikkhave, maggo sattānaṃ visuddhiyā, sokaparidevānaṃ samatikkamāya dukkhadomanassānaṃ atthaṅgamāya ñāyassa adhigamāya nibbānassa sacchikiriyāya, yadidaṃ cattāro satipaṭṭhānā.',
}

# 경의 첫머리 'Evaṃ me sutaṃ' 복원 (VRI)
REPLACE[11] = [('Evaṃ me sutaṃ – ekaṃ samayaṃ bhagavā kurūsu viharati kammāsadhammaṃ nāma kurūnaṃ nigamo.',
                '이와 같이 나는 들었다. 한 때 세존께서 꾸루 나라의 깜마사담마라는 꾸루 사람들의 마을에 머무셨다.')]
