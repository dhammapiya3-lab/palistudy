"""'소유격(→ 목적어) + 타동사에서 온 명사' 구조 설명을 문법 더 보기(formNote)에 덧붙임 (다시 실행해도 중복 없음)"""
import json
from pathlib import Path
L = Path(__file__).resolve().parent.parent / 'src/features/lessons'
HEAD = '📌 소유격(→ 목적어) + 타동사에서 온 명사 : ~을 ~함'
MIX = '📌 같은 소유격이라도 뒤 명사가 타동사에서 왔으면 목적어(~을 ~함), 자동사에서 왔으면 주어(~이 ~함)로 풉니다.'
def ex(s): return HEAD + '\n' + s
T = {
 'mangala': {
  'bālānaṃ': ex('bālānaṃ asevanā (← sevati 가까이하다) = 어리석은 이들을 가까이하지 않음'),
  'paṇḍitānaṃ': ex('paṇḍitānaṃ sevanā (← sevati 가까이하다) = 지혜로운 이들을 가까이함'),
  'pūjaneyyānaṃ': ex('pūjaneyyānaṃ pūjā (← pūjeti 공경하다) = 공경할 만한 이들을 공경함'),
  'mātāpitu upaṭṭhānaṃ': ex('mātāpitu upaṭṭhānaṃ (← upaṭṭhāti 시중들다) = 부모를 봉양함'),
  'puttadārassa saṅgaho': ex('puttadārassa saṅgaho (← saṅgaṇhāti 돌보다) = 자식과 아내를 돌봄'),
  'ñātakānaṃ saṅgaho': ex('ñātakānaṃ saṅgaho (← saṅgaṇhāti 돌보다) = 친척들을 돌봄'),
  'samaṇānaṃ dassanaṃ': ex('samaṇānaṃ dassanaṃ (← passati 보다) = 사문들을 뵘'),
  'ariyasaccāna dassanaṃ': ex('ariyasaccāna(ṃ) dassanaṃ (← passati 보다) = 성스러운 진리들을 봄'),
 },
 'ratana': {
  'tassa': ex('tassa paṭicchadā (← paṭicchādeti 숨기다) = 그것(그 악업)을 숨김'),
  'paṭicchadāya': ex('tassa paṭicchadāya (← paṭicchādeti 숨기다) = 그것을 숨기는 것에'),
 },
 'sn45-8': {
  'pāpakānaṃ akusalānaṃ': ex('pāpakānaṃ akusalānaṃ dhammānaṃ pahānāya (← pajahati 버리다) = 악하고 불선한 법들을 버리기 위해'),
  'uppannānaṃ': ex('uppannānaṃ … dhammānaṃ pahānāya (← pajahati 버리다) = 일어난 (불선)법들을 버리기 위해'),
  'kusalānaṃ': ex('anuppannānaṃ kusalānaṃ dhammānaṃ uppādāya (← uppādeti 일으키다) = 일어나지 않은 선법들을 일으키기 위해'),
  'Sukhassa': ex('sukhassa pahānā (← pajahati 버리다) = 즐거움을 버림으로부터'),
  'dukkhassa': ex('dukkhassa pahānā (← pajahati 버리다) = 괴로움을 버림으로부터'),
 },
 'mn10': {
  'sokaparidevānaṃ': ex('sokaparidevānaṃ samatikkamāya (← samatikkamati 넘어서다) = 슬픔과 비탄을 넘어서기 위해'),
  'ñāyassa': ex('ñāyassa adhigamāya (← adhigacchati 얻다) = 올바른 방법을 얻기 위해'),
  'nibbānassa': ex('nibbānassa sacchikiriyāya (← sacchikaroti 실현하다) = 열반을 실현하기 위해'),
  'uppannānaṃ': ex('uppannānaṃ … dhammānaṃ pahānāya (← pajahati 버리다) = 일어난 (불선)법들을 버리기 위해'),
  'kusalānaṃ': ex('anuppannānaṃ kusalānaṃ dhammānaṃ uppādāya (← uppādeti 일으키다) = 일어나지 않은 선법들을 일으키기 위해'),
  'sukhassa pahānā': ex('sukhassa pahānā (← pajahati 버리다) = 즐거움을 버림으로부터'),
  'dukkhassa pahānā': ex('dukkhassa pahānā (← pajahati 버리다) = 괴로움을 버림으로부터'),
  'uppannassa': ex('uppannassa kāmacchandassa pahānaṃ (← pajahati 버리다) = 일어난 감각적 욕망을 버림') + '\n' + MIX + ' 예: anuppannassa kāmacchandassa uppādo = 일어나지 않은 감각적 욕망이 일어남',
  'uppannāya': ex('uppannāya vicikicchāya pahānaṃ (← pajahati 버리다) = 일어난 의심을 버림') + '\n' + MIX,
  'saṃyojanassa': ex('uppannassa saṃyojanassa pahānaṃ (← pajahati 버리다) = 일어난 족쇄를 버림') + '\n' + MIX + ' 예: saṃyojanassa uppādo = 족쇄가 일어남',
  'satisambojjhaṅgassa': ex('uppannassa satisambojjhaṅgassa bhāvanā (← bhāveti 닦다) = 일어난 마음챙김의 깨달음 요소를 닦음') + '\n' + MIX + ' 예: satisambojjhaṅgassa uppādo = 마음챙김의 깨달음 요소가 일어남',
  'taṇhāya': ex('tassāyeva taṇhāya cāgo (← cajati 버리다) = 바로 그 갈애를 버림') + '\n' + MIX + ' 예: taṇhāya nirodho = 갈애가 소멸함',
 },
 'sn56-11': {
  'taṇhāya': ex('tassāyeva taṇhāya cāgo (← cajati 버리다) = 바로 그 갈애를 버림') + '\n' + MIX + ' 예: taṇhāya nirodho = 갈애가 소멸함',
 },
}
for b in ['dhammavicaya', 'vīriya', 'pīti', 'passaddhi', 'samādhi', 'upekkhā']:
    T['mn10'][f'{b}sambojjhaṅgassa'] = ex(f'uppannassa {b}sambojjhaṅgassa bhāvanā (← bhāveti 닦다) = 일어난 깨달음 요소를 닦음') + '\n' + MIX
n = 0
for lid, words in T.items():
    f = L / f'lesson-data-{lid}.ts'
    lines = f.read_text(encoding='utf-8').split('\n')
    for i, ln in enumerate(lines):
        st = ln.strip(); body = st.rstrip(',')
        if not body.startswith('{"type": "teach"'):
            continue
        o = json.loads(body)
        add = words.get(o['word'])
        if not add or HEAD in (o.get('formNote') or ''):
            continue
        o['formNote'] = ((o.get('formNote') or '').rstrip() + '\n\n' + add).strip()
        lines[i] = ln[:len(ln) - len(ln.lstrip())] + json.dumps(o, ensure_ascii=False) + st[len(body):]
        n += 1
    f.write_text('\n'.join(lines), encoding='utf-8')
print('적용', n)
