// GitHub Contents API 기반 공유 메모 sync
// - 읽기: PAT 없이도 public repo면 raw로 fetch 가능
// - 쓰기: PAT 필요. Settings에서 사용자가 등록
//
// 파일 경로: memos/{memoId}.json (memo body 그대로 저장)

import type { Memo } from './memo'

const REPO_OWNER = 'dhammapiya3-lab'
const REPO_NAME = 'palistudy'
const BRANCH = 'main'
const MEMO_DIR = 'memos'

const LS_PAT = 'suttalog-github-pat'
const LS_USER = 'suttalog-github-user'

export function githubIsConfigured(): boolean {
  return !!localStorage.getItem(LS_PAT)
}

export function getGithubUser(): string {
  return localStorage.getItem(LS_USER) || ''
}

export function setGithubConfig(pat: string, username: string): void {
  if (pat) localStorage.setItem(LS_PAT, pat)
  else localStorage.removeItem(LS_PAT)
  if (username) localStorage.setItem(LS_USER, username)
  else localStorage.removeItem(LS_USER)
}

export function clearGithubConfig(): void {
  localStorage.removeItem(LS_PAT)
  localStorage.removeItem(LS_USER)
}

function getPat(): string | null {
  return localStorage.getItem(LS_PAT)
}

// === 공유 메모 fetch (PAT 없이도 가능) =======================================

type GithubFile = { name: string; path: string; sha: string; size: number; type: string; download_url: string | null }

export async function listGithubMemoFiles(): Promise<GithubFile[]> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${MEMO_DIR}?ref=${BRANCH}`
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const pat = getPat()
  if (pat) headers.Authorization = `Bearer ${pat}`
  const res = await fetch(url, { headers })
  if (res.status === 404) return [] // 디렉토리가 아직 없으면 빈 리스트
  if (!res.ok) throw new Error(`GitHub list failed: ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) return []
  return data.filter(f => f.type === 'file' && f.name.endsWith('.json') && f.name !== 'index.json')
}

export async function fetchGithubMemos(): Promise<Memo[]> {
  const files = await listGithubMemoFiles()
  const memos: Memo[] = []
  for (const f of files) {
    if (!f.download_url) continue
    try {
      const res = await fetch(f.download_url)
      if (!res.ok) continue
      const memo = await res.json() as Memo
      memo.source = 'github'
      memos.push(memo)
    } catch { /* skip broken file */ }
  }
  return memos
}

// === push (본인 메모 저장, PAT 필요) =======================================

type GithubContentsResp = { sha?: string }

async function getFileSha(path: string): Promise<string | undefined> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`
  const pat = getPat()
  if (!pat) return undefined
  const res = await fetch(url, { headers: { Authorization: `Bearer ${pat}`, Accept: 'application/vnd.github+json' } })
  if (res.status === 404) return undefined
  if (!res.ok) return undefined
  const data = await res.json() as GithubContentsResp
  return data.sha
}

function b64Encode(s: string): string {
  // unicode-safe base64
  return btoa(unescape(encodeURIComponent(s)))
}

export async function pushMemoToGithub(memo: Memo): Promise<void> {
  const pat = getPat()
  if (!pat) throw new Error('GitHub PAT not configured')
  const path = `${MEMO_DIR}/${memo.memoId}.json`
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
  const sha = await getFileSha(path)
  const author = getGithubUser() || 'anonymous'
  const payload = {
    message: `memo: ${memo.lessonTitle} ${memo.pageId} (${author})`,
    content: b64Encode(JSON.stringify({ ...memo, author }, null, 2)),
    branch: BRANCH,
    sha,
  }
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GitHub push failed: ${res.status} ${txt}`)
  }
}

export async function deleteMemoFromGithub(memoId: string): Promise<void> {
  const pat = getPat()
  if (!pat) throw new Error('GitHub PAT not configured')
  const path = `${MEMO_DIR}/${memoId}.json`
  const sha = await getFileSha(path)
  if (!sha) return // 이미 없으면 OK
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: `memo delete: ${memoId}`, sha, branch: BRANCH }),
  })
}

// === 병합 — 로컬 + GitHub, 같은 memoId면 GitHub의 updatedAt 더 최근 것 우선 ========

export function mergeMemos(local: Memo[], remote: Memo[]): Memo[] {
  const byId = new Map<string, Memo>()
  for (const m of local) byId.set(m.memoId, { ...m, source: m.source ?? 'local' })
  for (const m of remote) {
    const existing = byId.get(m.memoId)
    if (!existing) {
      byId.set(m.memoId, m)
    } else if (m.updatedAt > existing.updatedAt) {
      byId.set(m.memoId, m)
    }
  }
  return Array.from(byId.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}
