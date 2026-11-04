// SuttaCentral API 설정 (SSOT)
export const API_CONFIG = {
  BASE_URL: 'https://suttacentral.net/api',
  ENDPOINTS: {
    MENU: '/menu',
    SUTTAPLEX: '/suttaplex',
    BILARA: '/bilarasuttas',
    DICTIONARY: '/dictionary_full',
  },
  // 캐시 기간 (밀리초)
  CACHE_DURATION: {
    MENU: 7 * 24 * 60 * 60 * 1000,       // 7일
    SUTTAPLEX: 7 * 24 * 60 * 60 * 1000,   // 7일
    BILARA: 30 * 24 * 60 * 60 * 1000,     // 30일
    DICTIONARY: 30 * 24 * 60 * 60 * 1000,  // 30일
  },
  // 재시도 설정
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 2000, // 2초 (지수 백오프)
  },
  // 기본 번역자 (한국어 번역 부재 → 영어)
  DEFAULT_TRANSLATOR: 'sujato',
  DEFAULT_LANGUAGE: 'en',
} as const
