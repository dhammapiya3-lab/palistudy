// Global type declarations

declare global {
  interface Window {
    currentLessonInfo?: {
      lessonId: string
      stepIndex: number
    }
  }
}

export {}
