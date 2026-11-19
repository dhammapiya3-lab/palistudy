// 브라우저(기기 목소리)로 빠알리어를 읽을 때 쓰는 규칙 — palistudy 앱의 shared/pali-voice.ts 를 JS로 옮긴 것. MIT License.
// ⚠️ 자동으로 만든 파일 — 고칠 때는 shared/pali-voice.ts 를 고치세요 (scripts/build-share.mjs)
// 사용 예: const v = pickPaliVoice(speechSynthesis.getVoices()); const u = new SpeechSynthesisUtterance(textForVoice("Buddhaṃ saraṇaṃ gacchāmi", v.lang)); u.voice = v; u.lang = v.lang; speechSynthesis.speak(u)
const CONSONANTS = {
  "kh": "ख",
  "k": "क",
  "gh": "घ",
  "g": "ग",
  "ṅ": "ङ",
  "ch": "छ",
  "c": "च",
  "jh": "झ",
  "j": "ज",
  "ñ": "ञ",
  "ṭh": "ठ",
  "ṭ": "ट",
  "ḍh": "ढ",
  "ḍ": "ड",
  "ṇ": "ण",
  "th": "थ",
  "t": "त",
  "dh": "ध",
  "d": "द",
  "n": "न",
  "ph": "फ",
  "p": "प",
  "bh": "भ",
  "b": "ब",
  "m": "म",
  "y": "य",
  "r": "र",
  "l": "ल",
  "ḷ": "ळ",
  "v": "व",
  "s": "स",
  "h": "ह"
};
const VOWELS_IND = { "ā": "आ", "a": "अ", "ī": "ई", "i": "इ", "ū": "ऊ", "u": "उ", "e": "ए", "o": "ओ" };
const VOWELS_DEP = { "ā": "ा", "a": "", "ī": "ी", "i": "ि", "ū": "ू", "u": "ु", "e": "े", "o": "ो" };
const VIRAMA = "्";
const isVowel = (ch) => ch in VOWELS_IND;
function paliToDevanagari(roman) {
  let out = "";
  let i = 0;
  const s = roman.normalize("NFC").toLowerCase();
  while (i < s.length) {
    const ch = s[i];
    if (ch === "ṃ" || ch === "ṁ") {
      out += "ं";
      i++;
      continue;
    }
    const two = s.slice(i, i + 2);
    let cons;
    let used = 0;
    if (CONSONANTS[two]) {
      cons = CONSONANTS[two];
      used = 2;
    } else if (CONSONANTS[ch]) {
      cons = CONSONANTS[ch];
      used = 1;
    }
    if (cons) {
      i += used;
      if (i < s.length && isVowel(s[i])) {
        out += cons + VOWELS_DEP[s[i]];
        i++;
      } else out += cons + VIRAMA;
      continue;
    }
    if (isVowel(ch)) {
      out += VOWELS_IND[ch];
      i++;
      continue;
    }
    out += ch === "/" ? "," : ch;
    i++;
  }
  return out;
}
function shiftBlock(deva, base) {
  let out = "";
  for (const c of deva) {
    const code = c.codePointAt(0);
    out += code >= 2304 && code <= 2431 ? String.fromCodePoint(code - 2304 + base) : c;
  }
  return out;
}
function teluguNy(te) {
  const NY = "న", Y = "య", VIR = "్";
  return te.split("ఞ్ఞ").join(NY + VIR + NY + VIR + Y).replace(/ఞ(?=్[చఛజఝ])/g, NY).replace(/ఞ(?=్హ)/g, NY).split("ఞ").join(NY + VIR + Y);
}
function preventSchwa(deva) {
  return deva.split(/(\s+|,)/).map((word) => {
    if (!word.trim() || word === ",") return word;
    const code = word.charCodeAt(word.length - 1);
    return code >= 2325 && code <= 2361 ? word + "ा" : word;
  }).join("");
}
function textForVoice(text, lang) {
  const l = lang.toLowerCase();
  if (l.startsWith("te") || l.startsWith("kn")) {
    const deva = paliToDevanagari(text).split("फ").join("प्ह");
    return l.startsWith("te") ? teluguNy(shiftBlock(deva, 3072)) : shiftBlock(deva, 3200);
  }
  if (l.startsWith("hi") || l.startsWith("sa") || l.startsWith("mr")) return preventSchwa(paliToDevanagari(text));
  return text;
}
function pickPaliVoice(voices) {
  const priorities = ["te-IN", "te", "kn-IN", "kn", "hi-IN", "hi", "sa", "en-IN", "it-IT", "en-US"];
  for (const lang of priorities) {
    const found = voices.find((v) => v.lang.replace("_", "-").startsWith(lang));
    if (found) return found;
  }
  return voices[0] || null;
}
export {
  paliToDevanagari,
  pickPaliVoice,
  textForVoice
};
