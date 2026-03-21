<script setup lang="ts">
import type { BookSearchItem, BookSearchResponse } from '~/shared/types/books'

useSeoMeta({
  title: 'Open Library API | Public API Gallery',
  description: 'Search books by title or author, compare cover art, and inspect lightweight book details.'
})

const search = ref('tolkien')
const submittedSearch = ref('tolkien')
const selectedWorkId = ref<string | null>(null)

const query = computed(() => ({
  search: submittedSearch.value
}))

const { data, pending, error, refresh } = useSafeFetch<BookSearchResponse>('/api/books', {
  query,
  defaultValue: {
    items: [],
    search: 'tolkien'
  }
})

const selectedBook = computed<BookSearchItem | null>(() => {
  if (!selectedWorkId.value) {
    return data.value.items[0] ?? null
  }

  return data.value.items.find((book) => book.workId === selectedWorkId.value) ?? data.value.items[0] ?? null
})

const submitSearch = () => {
  submittedSearch.value = search.value.trim() || 'tolkien'
}

watch(
  () => data.value.items,
  (items) => {
    selectedWorkId.value = items[0]?.workId ?? null
  },
  { immediate: true }
)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Open Library API" subtitle="Book Search" />
      <p class="max-w-2xl text-sm text-slate-300">
        Search for books by title or author, keep covers optional, and inspect a focused detail panel without leaving the page.
      </p>
    </div>

    <CommonFilterBar>
      <form class="flex w-full flex-col gap-3 md:flex-row" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Search books by title or author" />
        <button
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
          type="submit"
        >
          Search books
        </button>
      </form>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load books"
      message="The Open Library search is unavailable right now."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No books found"
      message="Try a broader author or title search to get more matches."
    />

    <div v-else class="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <div class="grid gap-4 sm:grid-cols-2">
        <button
          v-for="book in data.items"
          :key="book.workId"
          class="overflow-hidden rounded-3xl border text-left transition"
          :class="selectedBook?.workId === book.workId ? 'border-amber-300 bg-slate-900' : 'border-slate-800 bg-slate-900/60 hover:border-slate-600'"
          type="button"
          @click="selectedWorkId = book.workId"
        >
          <div class="flex h-56 items-center justify-center bg-slate-950">
            <img
              v-if="book.coverUrl"
              :src="book.coverUrl"
              :alt="book.title"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div v-else class="flex h-full w-full items-center justify-center px-6 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Cover unavailable
            </div>
          </div>

          <div class="space-y-3 p-4">
            <div>
              <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">{{ book.firstPublishYear }}</p>
              <h3 class="text-lg font-semibold text-white">{{ book.title }}</h3>
              <p class="text-sm text-slate-400">{{ book.author }}</p>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div class="rounded-2xl border border-slate-800 px-3 py-2">
                <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Publisher</p>
                <p>{{ book.publisher }}</p>
              </div>
              <div class="rounded-2xl border border-slate-800 px-3 py-2">
                <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Editions</p>
                <p>{{ book.editions }}</p>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div v-if="selectedBook" class="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6">
        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Selected book</p>
        <h3 class="mt-3 text-3xl font-semibold text-white">{{ selectedBook.title }}</h3>
        <p class="mt-2 text-sm text-slate-300">
          {{ selectedBook.author }} · First published {{ selectedBook.firstPublishYear }}
        </p>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Publisher</p>
            <p class="text-sm text-slate-100">{{ selectedBook.publisher }}</p>
          </div>
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Editions tracked</p>
            <p class="text-sm text-slate-100">{{ selectedBook.editions }}</p>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Subjects</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="subject in selectedBook.subjects"
              :key="subject"
              class="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-300"
            >
              {{ subject }}
            </span>
            <span
              v-if="!selectedBook.subjects.length"
              class="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-500"
            >
              No subjects listed
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
