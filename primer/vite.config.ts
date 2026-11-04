import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// 빌드 시 version.json 생성 + sw.js에 배포 번호 써 넣기
// (앱이 새 판을 알아채고, 서비스워커 캐시 이름이 배포마다 바뀌어 예전 파일이 쌓이지 않게)
function versionPlugin(): Plugin {
  return {
    name: 'version-json',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir || 'dist'
      const v = Date.now().toString(36)
      const version = {
        v,
        t: new Date().toISOString(),
      }
      writeFileSync(
        resolve(outDir, 'version.json'),
        JSON.stringify(version),
      )
      const swPath = resolve(outDir, 'sw.js')
      if (existsSync(swPath)) {
        writeFileSync(swPath, readFileSync(swPath, 'utf8').replace(/__BUILD_VERSION__/g, v))
      }
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
