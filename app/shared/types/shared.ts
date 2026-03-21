export type FetchState = 'idle' | 'loading' | 'success' | 'error'

export type SelectOption = {
  label: string
  value: string
}

export type PaginationMeta = {
  page: number
  totalPages: number
}
