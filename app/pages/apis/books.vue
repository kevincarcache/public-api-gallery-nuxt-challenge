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
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Open Library API" subtitle="Book Search" />
      <p class="text-body-2 text-medium-emphasis">
        Search for books by title or author, keep covers optional, and inspect a focused detail panel without leaving the page.
      </p>
    </div>

    <CommonFilterBar>
      <form class="w-100 d-flex flex-column flex-md-row ga-3" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Search books by title or author" />
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          type="submit"
          variant="tonal"
        >
          Search books
        </v-btn>
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

    <v-row v-else>
      <v-col cols="12" xl="7">
        <v-row>
          <v-col v-for="book in data.items" :key="book.workId" cols="12" sm="6">
            <v-card
              :color="selectedBook?.workId === book.workId ? 'surface-bright' : 'surface'"
              rounded="xl"
              class="overflow-hidden cursor-pointer"
              @click="selectedWorkId = book.workId"
            >
              <v-img
                v-if="book.coverUrl"
                :src="book.coverUrl"
                :alt="book.title"
                height="224"
                cover
              />
              <div v-else class="d-flex align-center justify-center text-overline text-medium-emphasis" style="height: 224px;">
                Cover unavailable
              </div>

              <div class="pa-4 d-flex flex-column ga-3">
                <div>
                  <div class="text-overline text-medium-emphasis">{{ book.firstPublishYear }}</div>
                  <h3 class="text-h6 font-weight-bold">{{ book.title }}</h3>
                  <div class="text-body-2 text-medium-emphasis">{{ book.author }}</div>
                </div>

                <v-row>
                  <v-col cols="6">
                    <v-sheet color="surface-container-high" rounded="lg" class="pa-3">
                      <div class="text-overline text-medium-emphasis">Publisher</div>
                      <div class="text-body-2">{{ book.publisher }}</div>
                    </v-sheet>
                  </v-col>
                  <v-col cols="6">
                    <v-sheet color="surface-container-high" rounded="lg" class="pa-3">
                      <div class="text-overline text-medium-emphasis">Editions</div>
                      <div class="text-body-2">{{ book.editions }}</div>
                    </v-sheet>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xl="5">
        <v-card v-if="selectedBook" color="surface" rounded="xl" class="pa-6">
          <div class="text-overline text-medium-emphasis">Selected book</div>
          <h3 class="text-h4 font-weight-bold mt-3">{{ selectedBook.title }}</h3>
          <p class="text-body-2 text-medium-emphasis mt-2">
            {{ selectedBook.author }} · First published {{ selectedBook.firstPublishYear }}
          </p>

          <v-row class="mt-4">
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                <div class="text-overline text-medium-emphasis">Publisher</div>
                <div class="text-body-1">{{ selectedBook.publisher }}</div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                <div class="text-overline text-medium-emphasis">Editions tracked</div>
                <div class="text-body-1">{{ selectedBook.editions }}</div>
              </v-sheet>
            </v-col>
          </v-row>

          <div class="mt-6">
            <div class="text-overline text-medium-emphasis mb-3">Subjects</div>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="subject in selectedBook.subjects"
                :key="subject"
                color="secondary"
                variant="outlined"
              >
                {{ subject }}
              </v-chip>
              <v-chip v-if="!selectedBook.subjects.length" color="secondary" variant="tonal">
                No subjects listed
              </v-chip>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
