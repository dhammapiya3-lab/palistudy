// 경전으로 배우기 서비스워커
// - 캐시 버전: main.tsx가 빌드 시각(__BUILD_TIME__)을 ?v= 로 넘김 → 같은 빌드에서는 늘 같은 주소라
//   서비스워커가 다시 설치되지 않고 캐시가 유지됨. 새 배포 때만 새 캐시를 만들고 옛것을 지움.
// - 같은 주소의 다른 앱(빠알리 프라이머) 캐시는 건드리지 않음('suttalog-' 접두사만 다룸).

const params = new URL(self.location.href).searchParams
const CACHE_VERSION = params.get('v') || 'v1'
const CACHE_NAME = `suttalog-${CACHE_VERSION}`
const SHELL_URL = '/palistudy/suttalog/'
// 음성 파일(mp3)은 배포와 상관없이 유지 — 녹음을 통째로 다시 만들면 이름 끝 번호를 올려 예전 소리를 지움
const AUDIO_CACHE = 'suttalog-audio-v2' // 2026-11-05 빠알리 프라이머와 같은 목소리(텔루구어 남성) 녹음으로 바꿈

// 설치 — 앱 첫 화면(HTML)을 미리 담아 둠. waiting 상태로 머물고 다음 방문 때 적용(강제 새로고침 없음).
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add(new Request(SHELL_URL, { cache: 'reload' }))).catch(() => {})
  )
})

// 활성화 — 이전 버전 캐시 삭제(음성 캐시는 유지)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('suttalog-') && key !== CACHE_NAME && key !== AUDIO_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  // 다른 도메인(글꼴, GitHub API 등)과 이 앱 밖의 경로는 가로채지 않음
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/palistudy/suttalog/')) return

  // 페이지 이동(HTML): 네트워크 우선 → 받으면 앱 셸로 저장, 오프라인이면 저장된 앱 셸
  // (BrowserRouter라 어느 깊은 주소든 같은 index.html로 열림)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(SHELL_URL, clone))
          }
          return response
        })
        .catch(() =>
          caches.match(SHELL_URL).then(cached => cached || caches.match(request)).then(r => r || Response.error())
        )
    )
    return
  }

  // 녹음 목록(audio/manifest.json·letters.json): 네트워크 우선, 끊겼으면 저장해 둔 것
  if (url.pathname.includes('/audio/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request).then(r => r || Response.error()))
    )
    return
  }

  // 음성 파일(mp3): 별도 음성 캐시에서 캐시 우선(한 번 들은 소리는 오프라인에서도)
  if (url.pathname.includes('/audio/') && url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached
          return fetch(request).then(response => {
            if (response.ok && response.status === 200) cache.put(request, response.clone())
            return response
          })
        })
      )
    )
    return
  }

  // JS/CSS/이미지(파일 이름에 해시 포함)·아이콘: 캐시 우선
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached
      return fetch(request).then(response => {
        if (response.ok && (url.pathname.includes('/assets/') || /\.(png|svg|json)$/.test(url.pathname))) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
    })
  )
})
