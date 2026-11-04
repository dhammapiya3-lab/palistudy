// 전역 앱 상태 (Zustand)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode } from '../types'

interface AppState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  isOnline: boolean
  setOnline: (online: boolean) => void
  fontSize: number // 기본 16
  setFontSize: (size: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      isOnline: navigator.onLine,
      setOnline: (isOnline) => set({ isOnline }),
      fontSize: 16,
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'suttalog-app',
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    },
  ),
)
