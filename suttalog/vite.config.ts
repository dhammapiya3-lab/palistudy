import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: '/dhammapiya/suttalog/',
  // 빌드 타임스탬프 — 서비스워커 캐시 버전 관리에 사용
  // dev에서는 고정 값: HMR마다 값이 바뀌면 SW URL이 매번 새로 인식되어
  // controllerchange → reload 루프가 발생함.
  define: {
    __BUILD_TIME__: JSON.stringify(mode === 'production' ? Date.now().toString() : 'dev'),
  },
  server: {
    port: 3022,
    host: true,
  },
  preview: {
    port: 3022,
  },
}))
