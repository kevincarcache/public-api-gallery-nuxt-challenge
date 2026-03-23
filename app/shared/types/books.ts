export interface BookSearchItem {
  workId: string
  title: string
  author: string
  coverUrl: string | null
  firstPublishYear: string
  publisher: string
  editions: string
  subjects: string[]
}

export interface BookSearchResponse {
  items: BookSearchItem[]
  search: string
}
