// 디자인 토큰 (SSOT)
export const THEME = {
  colors: {
    primary: '#D4760A',       // 사프란 오렌지
    primaryLight: '#F5A623',
    accent: '#2E7D32',        // 보디 그린
    accentLight: '#4CAF50',
    background: {
      light: '#FEFCF3',      // 따뜻한 흰색
      dark: '#1A1A2E',
      sepia: '#F4ECD8',
    },
    text: {
      light: '#2C2C2C',
      dark: '#E8E8E8',
      sepia: '#3E2723',
    },
    surface: {
      light: '#FFFFFF',
      dark: '#252540',
      sepia: '#EDE4D0',
    },
    border: {
      light: '#E0D5C0',
      dark: '#3A3A5C',
      sepia: '#C8B99A',
    },
  },
  fonts: {
    pali: "'Noto Serif', Georgia, 'Times New Roman', serif",
    ui: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  lineHeight: {
    pali: 1.8,
    ui: 1.6,
  },
} as const

export type ThemeMode = 'light' | 'dark' | 'sepia'
