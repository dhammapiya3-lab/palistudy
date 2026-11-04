// SuttaLog 서비스워커 — 캐시 완전 제어
// 빌드 시 CACHE_VERSION이 변경되어 항상 최신 버전 로드

// index.html에서 ?v=BUILD_TIME 쿼리로 버전 전달받음
const params = new URL(self.location.href).searchParams
const CACHE_VERSION = params.get('v') || 'v1'
const CACHE_NAME = `suttalog-${CACHE_VERSION}`

// 설치 — waiting 상태로 머묾. 다음 세션에서 자연 적용.
// skipWaiting을 쓰면 즉시 activate → controllerchange → 강제 reload 루프가 생김.
self.addEventListener('install', () => {})

// 활성화 — 이전 버전 캐시 전부 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          // 같은 주소의 다른 앱(빠알리 프라이머) 캐시는 건드리지 않음
          .filter(key => key.startsWith('suttalog-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch — HTML(네비게이션)은 항상 네트워크 우선, JS/CSS는 캐시 우선
self.addEventListener('fetch', event => {
  const { request } = event

  // HTML 페이지: 항상 최신 버전 fetch (캐시 무시)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() =>
        caches.match(request)
      )
    )
    return
  }

  // JS/CSS/이미지 (content hash 포함): 캐시 우선
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached
      return fetch(request).then(response => {
        if (response.ok && request.url.includes('/assets/')) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
    })
  )
})
