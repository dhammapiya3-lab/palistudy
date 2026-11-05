"""경전 문장 낱말 뜻 색인 만들기 — 모든 경전 과의 낱말 카드 + gloss-extra.ts
사용: cd suttalog && npx tsx /tmp/dump.mts > /tmp/lessons.json && python3 scripts/gen-gloss.py /tmp/lessons.json
결과: src/features/lessons/gloss-index.generated.ts"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent.parent / 'scripts'))
import pali_hangul as h  # noqa: E402

data = json.load(open(sys.argv[1]))
rows, seen = [], set()
def add(w, p, m, g):
    k = w.lower()
    if not w or not m or k in seen: return
    seen.add(k); rows.append([w, p or h.to_hangul(w.lower()), m, g or ''])
for lid, st in data.items():
    for s in (st if isinstance(st, list) else st.get('steps', [])):
        if s.get('type') != 'teach': continue
        add(s['word'], s.get('pronKo'), s.get('meaning'), s.get('grammar'))
        f = s.get('formInVerse')
        for x in (f if isinstance(f, list) else [f] if f else []):
            add(x, h.to_hangul(x.lower()), s.get('meaning'), s.get('grammar'))
src = (HERE.parent / 'src/features/lessons/gloss-extra.ts').read_text(encoding='utf-8')
for m in re.finditer(r"^\s*'?([^':\n]+?)'?:\s*\{ meaning: '((?:[^'\\]|\\.)*)', grammar: '((?:[^'\\]|\\.)*)' \}", src, re.M):
    add(m.group(1), None, m.group(2), m.group(3))
out = ('// 자동 생성 — scripts/gen-gloss.py (경전 과 낱말 카드 + gloss-extra.ts). 직접 고치지 마세요.\n'
       '// [낱말, 한글 발음, 뜻, 문법]\n'
       'export const GLOSS_ROWS: [string, string, string, string][] = ' + json.dumps(rows, ensure_ascii=False) + '\n')
(HERE.parent / 'src/features/lessons/gloss-index.generated.ts').write_text(out, encoding='utf-8')
print('rows', len(rows))
