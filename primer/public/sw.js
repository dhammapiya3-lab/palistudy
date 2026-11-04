// 서비스워커 — 오프라인 지원 (앱 셸 + 오디오 캐싱)
// 빌드할 때 __BUILD_VERSION__ 자리에 배포 번호가 들어감 (vite.config.ts의 versionPlugin)
// → 배포마다 캐시 이름이 바뀌고, 새 판이 켜질 때 예전 파일 캐시를 지움
const VERSION = '__BUILD_VERSION__'
const CACHE_NAME = 'pali-primer-' + VERSION
const AUDIO_CACHE = 'pali-audio-v6'  // 2026-11-05 텔루구어 목소리로 전체 재생성 → 예전 소리 캐시 정리

// 앱 셸: 핵심 파일 (빌드 시 해시 포함되므로 index만 사전 캐싱)
const APP_SHELL = [
  '/palistudy/primer/',
  '/palistudy/primer/manifest.json',
]

// 설치: 앱 셸 사전 캐싱
// 공부 중인 화면을 바꾸지 않도록 바로 켜지지 않고 기다림 — 앱을 다시 열거나 '새로고침'을 누르면 켜짐
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  )
})

// 앱에서 '새 버전 — 새로고침'을 누르면 바로 켜짐
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

// 활성화: 이전 버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          // 같은 주소의 다른 앱(경전으로 배우기) 캐시는 건드리지 않음 — pali- 로 시작하는 것만 정리
          .filter((key) => key.startsWith('pali-') && key !== CACHE_NAME && key !== AUDIO_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// 요청 가로채기
self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // 다른 주소(Firebase·Google·글꼴 등)는 가로채지 않음
  if (url.origin !== self.location.origin) return
  // 이 앱 밖(대문·경전으로 배우기)은 건드리지 않음
  if (!url.pathname.startsWith('/palistudy/primer/')) return
  // 새 판 확인용 파일은 항상 서버에서
  if (url.pathname.endsWith('/version.json')) return

  // 오디오 파일: 캐시 우선, 없으면 네트워크 → 캐시 저장
  if (url.pathname.includes('/audio/') && url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          if (cached) return cached
          return fetch(req).then((response) => {
            if (response.ok) cache.put(req, response.clone())
            return response
          })
        })
      )
    )
    return
  }

  // JS/CSS 에셋 (해시 포함): 캐시 우선
  if (url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((cached) => {
          if (cached) return cached
          return fetch(req).then((response) => {
            if (response.ok) cache.put(req, response.clone())
            return response
          })
        })
      )
    )
    return
  }

  // 화면(HTML): 네트워크 우선, 끊겼으면 저장해 둔 앱 화면
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put('/palistudy/primer/', clone))
          }
          return response
        })
        .catch(() => caches.match('/palistudy/primer/'))
    )
    return
  }

  // 그 외 (manifest·아이콘 등): 네트워크 우선, 실패 시 캐시
  event.respondWith(
    fetch(req)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone))
        }
        return response
      })
      .catch(() => caches.match(req).then((r) => r || Response.error()))
  )
})
