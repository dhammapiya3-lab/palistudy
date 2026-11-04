import json,re,sys,collections
sys.path.insert(0,'.')
import importlib,pali_hangul; importlib.reload(pali_hangul)
from pali_hangul import to_hangul as word_to_hangul
L=json.load(open('/home/claude/vri/lessons.json'))
pairs=[]
for k,steps in L.items():
    for s in steps:
        if s['type']=='teach' and ' ' not in s['word'].strip() and '/' not in s['word']:
            pairs.append((s['word'].strip(' .,'),s['pronKo'].strip(' .,')))
pairs=list(dict.fromkeys(pairs))
ok=0; bad=collections.Counter(); ex=[]
for p,k in pairs:
    h=word_to_hangul(p)
    if h==k: ok+=1
    else: ex.append((p,k,h))
print(f'{ok}/{len(pairs)} = {100*ok/len(pairs):.1f}%')
for p,k,h in ex[:int(sys.argv[1]) if len(sys.argv)>1 else 60]: print(f'{p:22} 기존 {k:16} 변환 {h}')
