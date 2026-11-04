# 무아상경 SN 22.59 — VRI 6차 결집본 전문 (…pe…와 '…' 반복 복원), 문장 단위

UNITS = [
    ('Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.',
     '한때 세존께서 바라나시의 이시빠따나 녹야원에 머무셨다.', [1]),
    ('Tatra kho bhagavā pañcavaggiye bhikkhū āmantesi – ‘‘bhikkhavo’’ti. ‘‘Bhadante’’ti te bhikkhū bhagavato paccassosuṃ. Bhagavā etadavoca –',
     '거기서 세존께서 다섯 비구에게 “비구들이여” 하고 부르셨다. 그 비구들은 “존자시여” 하고 세존께 응답하였다. 세존께서 이렇게 말씀하셨다.', [3]),
]

# (주격, 처격(~에 대해), 소원형 동사 hotu/hontu, 금지 ahosi/ahesuṃ, 자아라면 abhavissa/abhavissaṃsu,
#  이끌 것 saṃvatteyya/-yyuṃ, 이끈다 saṃvattati/-nti, 한국어 이름, ca 결합형)
KHANDHA = [
    ('rūpaṃ', 'rūpe', 'hotu', 'ahosī’ti', 'ahosī’’’ti', 'abhavissa', 'saṃvatteyya', 'saṃvattati', '물질', 'Rūpañca', 'Rūpaṃ'),
    ('vedanā', 'vedanāya', 'hotu', 'ahosī’ti', 'ahosī’’’ti', 'abhavissa', 'saṃvatteyya', 'saṃvattati', '느낌', 'Vedanā ca', 'Vedanā'),
    ('saññā', 'saññāya', 'hotu', 'ahosī’ti', 'ahosī’’’ti', 'abhavissa', 'saṃvatteyya', 'saṃvattati', '인식', 'Saññā ca', 'Saññā'),
    ('saṅkhārā', 'saṅkhāresu', 'hontu', 'ahesu’nti', 'ahesu’’’nti', 'abhavissaṃsu', 'saṃvatteyyuṃ', 'saṃvattanti', '형성들', 'Saṅkhārā ca', 'Saṅkhārā'),
    ('viññāṇaṃ', 'viññāṇe', 'hotu', 'ahosī’ti', 'ahosī’’’ti', 'abhavissa', 'saṃvatteyya', 'saṃvattati', '의식', 'Viññāṇañca', 'Viññāṇaṃ'),
]
for i, (nom, loc, hotu, aho, aho3, abhav, sv_opt, sv, ko, nom_ca, Nom) in enumerate(KHANDHA):
    voc = ', bhikkhave,' if i == 0 else ''
    ko_voc = '비구들이여, ' if i == 0 else ''
    is_pl = nom == 'saṅkhārā'
    top, sub = ko + '은', ko + '이'
    UNITS.append((
        f'‘‘{Nom}{voc} anattā. {nom_ca} hidaṃ, bhikkhave, attā {abhav}, nayidaṃ {nom} ābādhāya {sv_opt}, labbhetha ca {loc} – ‘evaṃ me {nom} {hotu}, evaṃ me {nom} mā {aho}.',
        f'“{ko_voc}{top} 자아가 아니다. 비구들이여, 만약 {sub} 자아라면 {top} 병고로 이어지지 않을 것이고, {ko}에 대해 ‘나의 {top} 이렇게 되어라, 나의 {top} 이렇게 되지 마라’라고 할 수 있을 것이다.',
        [11] if i == 0 else [21] if i == 1 else []))
    UNITS.append((
        f'Yasmā ca kho, bhikkhave, {nom} anattā, tasmā {nom} ābādhāya {sv}, na ca labbhati {loc} – ‘evaṃ me {nom} {hotu}, evaṃ me {nom} mā {aho3}.',
        f'비구들이여, {top} 자아가 아니기 때문에 병고로 이어지고, {ko}에 대해 ‘나의 {top} 이렇게 되어라, 나의 {top} 이렇게 되지 마라’라고 할 수 없다.”',
        [15] if i == 0 else []))

# 무상·괴로움·무아 문답 (…복원) — 여성 vedanā·saññā, 남성 복수 saṅkhārā, 중성 rūpa·viññāṇa
QA = [
    ('rūpaṃ niccaṃ vā aniccaṃ vā', 'Aniccaṃ', '물질', '‘‘Taṃ kiṃ maññatha, bhikkhave,'),
    ('vedanā niccā vā aniccā vā', 'Aniccā', '느낌', '‘‘Taṃ kiṃ maññatha, bhikkhave,'),
    ('saññā niccā vā aniccā vā', 'Aniccā', '인식', '‘‘Taṃ kiṃ maññatha, bhikkhave,'),
    ('saṅkhārā niccā vā aniccā vā', 'Aniccā', '형성들', '‘‘Taṃ kiṃ maññatha, bhikkhave,'),
    ('viññāṇaṃ niccaṃ vā aniccaṃ vā', 'Aniccaṃ', '의식', '‘‘Taṃ kiṃ maññatha, bhikkhave,'),
]
for i, (q, a, ko, opener) in enumerate(QA):
    UNITS.append((
        f'{opener} {q}’’ti? ‘‘{a}, bhante’’. ‘‘Yaṃ panāniccaṃ dukkhaṃ vā taṃ sukhaṃ vā’’ti? ‘‘Dukkhaṃ, bhante’’. ‘‘Yaṃ panāniccaṃ dukkhaṃ vipariṇāmadhammaṃ, kallaṃ nu taṃ samanupassituṃ – ‘etaṃ mama, esohamasmi, eso me attā’’’ti? ‘‘No hetaṃ, bhante’’.',
        f'“비구들이여, 어떻게 생각하는가? {ko}은 항상한가, 무상한가?” “무상합니다, 세존이시여.” “무상한 것은 괴로운가, 즐거운가?” “괴롭습니다, 세존이시여.” “무상하고 괴롭고 변하기 마련인 것을 ‘이것은 내 것이다, 이것은 나다, 이것은 나의 자아다’라고 여기는 것이 옳은가?” “그렇지 않습니다, 세존이시여.”',
        [24] if i == 0 else []))

# 결론 정형구 (…pe… 복원)
TAIL = '– ‘netaṃ mama, nesohamasmi, na meso attā’ti evametaṃ yathābhūtaṃ sammappaññāya daṭṭhabbaṃ.'
TAIL_K = '‘이것은 내 것이 아니다, 이것은 내가 아니다, 이것은 나의 자아가 아니다’라고 이와 같이 있는 그대로 바른 지혜로 보아야 한다.'
CONCL = [
    ('‘‘Tasmātiha, bhikkhave, yaṃ kiñci rūpaṃ atītānāgatapaccuppannaṃ ajjhattaṃ vā bahiddhā vā oḷārikaṃ vā sukhumaṃ vā hīnaṃ vā paṇītaṃ vā yaṃ dūre santike vā, sabbaṃ rūpaṃ',
     '“그러므로 비구들이여, 과거·미래·현재의 것이든, 안의 것이든 밖의 것이든, 거친 것이든 미세한 것이든, 저열한 것이든 뛰어난 것이든, 멀리 있는 것이든 가까이 있는 것이든 어떤 물질이든, 모든 물질을', [27]),
    ('Yā kāci vedanā atītānāgatapaccuppannā ajjhattā vā bahiddhā vā oḷārikā vā sukhumā vā hīnā vā paṇītā vā yā dūre santike vā, sabbā vedanā',
     '과거·미래·현재의 것이든, 안의 것이든 밖의 것이든, 거친 것이든 미세한 것이든, 저열한 것이든 뛰어난 것이든, 멀리 있는 것이든 가까이 있는 것이든 어떤 느낌이든, 모든 느낌을', []),
    ('‘‘Yā kāci saññā atītānāgatapaccuppannā ajjhattā vā bahiddhā vā oḷārikā vā sukhumā vā hīnā vā paṇītā vā yā dūre santike vā, sabbā saññā',
     '“과거·미래·현재의 것이든, 안의 것이든 밖의 것이든, 거친 것이든 미세한 것이든, 저열한 것이든 뛰어난 것이든, 멀리 있는 것이든 가까이 있는 것이든 어떤 인식이든, 모든 인식을', []),
    ('Ye keci saṅkhārā atītānāgatapaccuppannā ajjhattaṃ vā bahiddhā vā oḷārikā vā sukhumā vā hīnā vā paṇītā vā ye dūre santike vā, sabbe saṅkhārā',
     '과거·미래·현재의 것이든, 안의 것이든 밖의 것이든, 거친 것이든 미세한 것이든, 저열한 것이든 뛰어난 것이든, 멀리 있는 것이든 가까이 있는 것이든 어떤 형성들이든, 모든 형성들을', []),
    ('‘‘Yaṃ kiñci viññāṇaṃ atītānāgatapaccuppannaṃ ajjhattaṃ vā bahiddhā vā oḷārikaṃ vā sukhumaṃ vā hīnaṃ vā paṇītaṃ vā yaṃ dūre santike vā, sabbaṃ viññāṇaṃ',
     '“과거·미래·현재의 것이든, 안의 것이든 밖의 것이든, 거친 것이든 미세한 것이든, 저열한 것이든 뛰어난 것이든, 멀리 있는 것이든 가까이 있는 것이든 어떤 의식이든, 모든 의식을', []),
]
for p, k, old in CONCL:
    UNITS.append((f'{p} {TAIL}', f'{k} {TAIL_K}', old))

UNITS += [
    ('‘‘Evaṃ passaṃ, bhikkhave, sutavā ariyasāvako rūpasmimpi nibbindati, vedanāyapi nibbindati, saññāyapi nibbindati, saṅkhāresupi nibbindati, viññāṇasmimpi nibbindati.',
     '“비구들이여, 이와 같이 보는 잘 배운 성스러운 제자는 물질에 대해서도 싫어하여 떠나고, 느낌에 대해서도 싫어하여 떠나고, 인식에 대해서도 싫어하여 떠나고, 형성들에 대해서도 싫어하여 떠나고, 의식에 대해서도 싫어하여 떠난다.', [30]),
    ('Nibbindaṃ virajjati; virāgā vimuccati. Vimuttasmiṃ vimuttamiti ñāṇaṃ hoti.',
     '싫어하여 떠나면 탐욕이 빛바래고, 탐욕이 빛바래므로 해탈한다. 해탈하면 ‘해탈했다’는 앎이 있다.', []),
    ('‘Khīṇā jāti, vusitaṃ brahmacariyaṃ, kataṃ karaṇīyaṃ, nāparaṃ itthattāyā’ti pajānātī’’ti.',
     '‘태어남은 다했고, 청정한 삶은 완성되었고, 해야 할 일은 다 해 마쳤으며, 더 이상 이 상태로 [돌아올 일은] 없다’라고 분명히 안다.”', [33]),
    ('Idamavoca bhagavā. Attamanā pañcavaggiyā bhikkhū bhagavato bhāsitaṃ abhinanduṃ.',
     '세존께서 이와 같이 말씀하셨다. 다섯 비구는 흡족하여 세존의 말씀을 크게 기뻐하였다.', [36]),
    ('Imasmiñca pana veyyākaraṇasmiṃ bhaññamāne pañcavaggiyānaṃ bhikkhūnaṃ anupādāya āsavehi cittāni vimucciṃsūti.',
     '그리고 이 설명이 설해지고 있을 때 다섯 비구의 마음은 취착 없이 번뇌들로부터 해탈하였다.', []),
]
