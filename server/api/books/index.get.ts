import type { BookSearchResponse } from '~/shared/types/books'

interface OpenLibraryDoc {
  key?: string
  cover_i?: number
  title?: string
  author_name?: string[]
  first_publish_year?: number
  publisher?: string[]
  edition_count?: number
  subject?: string[]
}

interface OpenLibraryResponse {
  docs?: OpenLibraryDoc[]
}

export default defineEventHandler(async (event): Promise<BookSearchResponse> => {
  const query = getQuery(event)
  const search = typeof query.search === 'string' && query.search.trim() ? query.search.trim() : 'tolkien'
  const response = await $fetch<OpenLibraryResponse>(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&limit=12`
  )

  return {
    items: (response.docs ?? []).map((book) => ({
      workId: (book.key ?? '').replace('/works/', '') || crypto.randomUUID(),
      title: book.title ?? 'Untitled book',
      author: book.author_name?.[0] ?? 'Autor no indicado',
      coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
      firstPublishYear: book.first_publish_year ? String(book.first_publish_year) : 'Ano no indicado',
      publisher: book.publisher?.[0] ?? 'Editorial no indicada',
      editions: book.edition_count ? String(book.edition_count) : 'Sin dato',
      subjects: (book.subject ?? []).slice(0, 5)
    })),
    search
  }
})
