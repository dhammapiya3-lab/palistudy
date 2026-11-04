// SuttaCentral API 응답 타입

// 메뉴 트리
export interface MenuItem {
  uid: string
  acronym?: string
  translated_name?: string
  root_name?: string
  node_type?: string
  children?: MenuItem[]
}

// Suttaplex (경전 메타데이터)
export interface Suttaplex {
  uid: string
  acronym: string
  original_title: string
  translated_title?: string
  root_lang: string
  type: string
  blurb?: string
  translations: SuttaplexTranslation[]
}

export interface SuttaplexTranslation {
  author: string
  author_uid: string
  lang: string
  title: string
  id: string
}

// Bilara (경전 본문 - 세그먼트 기반)
export interface BilaraSutta {
  root_text: Record<string, string>      // 빠알리 원문 { "seg_id": "text" }
  translation_text: Record<string, string> // 번역 { "seg_id": "text" }
  suttaplex: Suttaplex
}

// 사전
export interface DictionaryEntry {
  word: string
  definitions: DictionaryDefinition[]
}

export interface DictionaryDefinition {
  definition: string
  grammar?: string
  xr?: string[]  // 교차 참조
}

// API 에러
export interface ApiError {
  status: number
  message: string
}
