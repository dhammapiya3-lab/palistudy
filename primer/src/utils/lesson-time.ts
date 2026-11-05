// 과 예상 시간과 '마디'(5~10분 묶음) 수 — 과목 카드와 학습 화면이 같은 기준을 씀
// 마디는 과 데이터를 바꾸지 않고 화면에서만 나눈 묶음 (단계 번호·ID는 그대로)

/** 한 단계에 걸리는 평균 시간(초) — 설명·낱말·문제를 섞어 본 어림값 */
export const SECONDS_PER_STEP = 15

/** 한 마디의 목표 길이(분) */
export const CHUNK_TARGET_MIN = 6

/** 과 하나를 공부하는 데 걸리는 예상 시간(분, 1분 이상) */
export function estimateMinutes(stepCount: number): number {
  if (!(stepCount > 0)) return 0
  return Math.max(1, Math.round((stepCount * SECONDS_PER_STEP) / 60))
}

/** 과를 몇 마디로 나누는지 (짧은 과는 1마디) */
export function chunkCount(stepCount: number): number {
  if (!(stepCount > 0)) return 1
  const min = (stepCount * SECONDS_PER_STEP) / 60
  return Math.max(1, Math.round(min / CHUNK_TARGET_MIN))
}

/**
 * 마디 나누기 — 보이는 단계 번호 목록을 받아 마디마다 [첫 단계 번호, …] 묶음으로 나눔
 * 경계는 가능하면 새 설명(문법·소개·경전)이 시작하는 곳으로 조금 옮겨 자연스럽게 끊음
 * @param visible 보이는 단계 번호 (오름차순)
 * @param isGoodStart 이 단계에서 마디를 시작해도 자연스러운지
 */
export function splitChunks(visible: number[], isGoodStart: (idx: number) => boolean): number[][] {
  const n = chunkCount(visible.length)
  if (n <= 1 || visible.length < 2) return [visible]
  const size = visible.length / n
  const starts: number[] = [0]
  for (let k = 1; k < n; k++) {
    const ideal = Math.round(k * size)
    // 앞뒤 3단계 안에서 자연스러운 시작점 찾기 (가까운 쪽 먼저)
    let pick = ideal
    for (let d = 0; d <= 3; d++) {
      if (ideal + d < visible.length && isGoodStart(visible[ideal + d])) { pick = ideal + d; break }
      if (ideal - d > starts[starts.length - 1] + 1 && isGoodStart(visible[ideal - d])) { pick = ideal - d; break }
    }
    if (pick > starts[starts.length - 1] && pick < visible.length) starts.push(pick)
  }
  return starts.map((s, i) => visible.slice(s, starts[i + 1] ?? visible.length))
}
