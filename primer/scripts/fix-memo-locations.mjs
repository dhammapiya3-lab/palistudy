// 메모 위치 자동 매칭 스크립트
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { glob } from 'glob';

const config = {
  apiKey: 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA',
  authDomain: 'panditarama-video.firebaseapp.com',
  projectId: 'panditarama-video',
  storageBucket: 'panditarama-video.firebasestorage.app',
  messagingSenderId: '504794613271',
  appId: '1:504794613271:web:ac565d6c6e82d9b72c7e52',
};

initializeApp(config);
const db = getFirestore();

// 레슨 파일 로드
function loadLesson(lessonId) {
  try {
    const content = readFileSync(`./src/features/grammar/${lessonId}.ts`, 'utf-8');
    // steps 배열 추출
    const stepsMatch = content.match(/export const [A-Z_]+: StepType\[\] = \[([\s\S]+?)\]/);
    if (!stepsMatch) return [];

    const stepsText = stepsMatch[1];
    const steps = [];
    let currentStep = {};
    let braceCount = 0;
    let currentText = '';

    for (let i = 0; i < stepsText.length; i++) {
      const char = stepsText[i];
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;

      currentText += char;

      if (braceCount === 0 && currentText.trim()) {
        // 스텝 파싱
        const typeMatch = currentText.match(/type:\s*['"]([^'"]+)['"]/);
        const wordMatch = currentText.match(/word:\s*['"]([^'"]+)['"]/);
        const questionMatch = currentText.match(/question:\s*['"]([^'"]+)['"]/);
        const paliMatch = currentText.match(/pali:\s*['"]([^'"]+)['"]/);
        const meaningMatch = currentText.match(/meaning:\s*['"]([^'"]+)['"]/);

        const step = {
          type: typeMatch ? typeMatch[1] : null,
          word: wordMatch ? wordMatch[1] : null,
          question: questionMatch ? questionMatch[1] : null,
          pali: paliMatch ? paliMatch[1] : null,
          meaning: meaningMatch ? meaningMatch[1] : null,
          fullText: currentText
        };

        steps.push(step);
        currentText = '';
      }
    }

    return steps;
  } catch (e) {
    console.error(`Error loading ${lessonId}:`, e.message);
    return [];
  }
}

// 메모 내용으로 스텝 찾기
function findStepByMemoContent(lessonId, memoText) {
  const steps = loadLesson(lessonId);

  // 메모 텍스트에서 키워드 추출
  const keywords = {
    '사냥꾼은 사자를 위해': { search: 'Luddako sīhāya', type: 'quiz' },
    '사냥꾼은 사자에게': { search: 'Luddako sīhāya', type: 'quiz' },
    '개를 구한다': { search: 'soṇaṃ yācati', type: 'quiz' },
    '개를 요청한다': { search: 'soṇaṃ yācati', type: 'quiz' },
    '어부들은': { search: 'Dhīvarā', type: 'quiz' },
    '어부는': { search: 'Dhīvaro', type: 'quiz' },
  };

  // 간단한 매칭 로직
  for (const [key, value] of Object.entries(keywords)) {
    if (memoText.includes(key)) {
      // 해당 텍스트를 포함하는 스텝 찾기
      const stepIndex = steps.findIndex(step =>
        step.type === value.type &&
        (step.question?.includes(value.search) || step.pali?.includes(value.search))
      );

      if (stepIndex >= 0) {
        return stepIndex;
      }
    }
  }

  // 번호로 찾기 (예: "3번째 문장"은 퀴즈 3번)
  const numberMatch = memoText.match(/(\d+)번째/);
  if (numberMatch) {
    const num = parseInt(numberMatch[1]);
    const quizIndex = steps.findIndex((step, idx) =>
      step.type === 'quiz' && step.question && step.question.startsWith(`${num}.`)
    );
    if (quizIndex >= 0) return quizIndex;
  }

  return null;
}

async function main() {
  console.log('📝 메모 위치 자동 매칭 시작...\n');

  // 모든 메모 가져오기
  const memosSnap = await getDocs(collection(db, 'pali-primer-memos'));
  const memos = memosSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  console.log(`총 ${memos.length}개의 메모 발견\n`);

  let updated = 0;
  let skipped = 0;

  for (const memo of memos) {
    // 이미 스텝 정보가 있으면 스킵
    if (memo.page.includes('#')) {
      skipped++;
      continue;
    }

    // lesson-XX 형식에서 lessonId 추출
    const match = memo.page.match(/학습:\s*([^#]+)/);
    if (!match) {
      console.log(`⚠️  스킵: ${memo.id} - 레슨 ID 추출 실패`);
      skipped++;
      continue;
    }

    const lessonId = match[1].trim();
    const stepIndex = findStepByMemoContent(lessonId, memo.text);

    if (stepIndex !== null) {
      const newPage = `학습: ${lessonId}#${stepIndex}`;

      // Firestore 업데이트
      await updateDoc(doc(db, 'pali-primer-memos', memo.id), {
        page: newPage
      });

      console.log(`✅ 업데이트: ${memo.id}`);
      console.log(`   ${memo.page} → ${newPage}`);
      console.log(`   내용: ${memo.text.substring(0, 50)}...`);
      updated++;
    } else {
      console.log(`❌ 매칭 실패: ${memo.id} (${lessonId})`);
      console.log(`   내용: ${memo.text.substring(0, 50)}...`);
      skipped++;
    }
  }

  console.log(`\n\n📊 완료:`);
  console.log(`   업데이트: ${updated}개`);
  console.log(`   스킵: ${skipped}개`);
}

main().then(() => process.exit(0)).catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
