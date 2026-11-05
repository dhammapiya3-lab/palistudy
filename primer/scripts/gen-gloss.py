"""프라이머 구절 낱말 풀이 전체 색인 — 프라이머 모든 과의 낱말 카드 + 경전 앱 색인
사용: cd primer && npx tsx /tmp/pdump2.mts > /tmp/primer_all.json && python3 scripts/gen-gloss.py /tmp/primer_all.json
결과: src/features/grammar/gloss-index.generated.ts"""
import json, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
data = json.load(open(sys.argv[1]))
rows, seen = [], set()
def add(w, p, m, g):
    k = w.lower()
    if not w or not m or k in seen or len(k) <= 2: return
    seen.add(k); rows.append([w, p or '', m, g or ''])
for st in data.values():
    for s in st:
        if s.get('type') == 'teach' and '/' not in s.get('word', ''):
            add(s['word'], s.get('pronKo'), s.get('meaning'), s.get('grammar'))
src = (HERE.parent.parent / 'suttalog/src/features/lessons/gloss-index.generated.ts').read_text(encoding='utf-8')
for r in json.loads(src[src.index('= ') + 2:]):
    add(*r)
out = ('// 자동 생성 — scripts/gen-gloss.py (프라이머 낱말 카드 + 경전 앱 색인). 직접 고치지 마세요.\n'
       '// [낱말, 한글 발음, 뜻, 문법]\n'
       'export const GLOSS_ROWS: [string, string, string, string][] = ' + json.dumps(rows, ensure_ascii=False) + '\n')
(HERE.parent / 'src/features/grammar/gloss-index.generated.ts').write_text(out, encoding='utf-8')
print('rows', len(rows))
