import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// 빌드 시 version.json 생성 — 캐시 버스팅 자동 감지용
function versionPlugin(): Plugin {
  return {
    name: 'version-json',
    writeBundle(options) {
      const outDir = options.dir || 'dist'
      const version = {
        v: Date.now().toString(36),
        t: new Date().toISOString(),
      }
      writeFileSync(
        resolve(outDir, 'version.json'),
        JSON.stringify(version),
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), versionPlugin()],
  base: '/palistudy/primer/',
  server: {
    port: 3023,
    host: true,
  },
  preview: {
    port: 3023,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})
