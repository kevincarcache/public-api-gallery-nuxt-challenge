<script setup lang="ts">
import type { GhibliFilm, GhibliFilmsResponse } from '~/shared/types/ghibli'

useSeoMeta({
  title: 'Studio Ghibli API | Public API Gallery',
  description: 'Browse Studio Ghibli films with search, sort controls, and richly described movie cards.'
})

const search = ref('')
const sort = ref<'year' | 'title'>('year')

const { data, pending, error, refresh } = useSafeFetch<GhibliFilmsResponse>('/api/ghibli', {
  defaultValue: { items: [] }
})

const filteredFilms = computed(() => {
  const query = search.value.trim().toLowerCase()
  const sorted = [...data.value.items].sort((first, second) => {
    if (sort.value === 'title') {
      return first.title.localeCompare(second.title)
    }

    return Number(first.releaseYear) - Number(second.releaseYear)
  })

  if (!query) {
    return sorted
  }

  return sorted.filter((film) =>
    [film.title, film.director, film.producer].some((value) => value.toLowerCase().includes(query))
  )
})

const featuredFilm = computed<GhibliFilm | null>(() => filteredFilms.value[0] ?? null)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Studio Ghibli API" subtitle="Film Library" />
      <p class="max-w-2xl text-sm text-slate-300">
        Search the Ghibli catalog, sort the library, and compare each film’s team, release year, and synopsis.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search by title, director, or producer" />

      <label class="flex items-center gap-3 text-sm text-slate-300">
        <span class="text-xs uppercase tracking-[0.25em] text-slate-500">Sort</span>
        <select
          v-model="sort"
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100"
        >
          <option value="year">Release year</option>
          <option value="title">Title</option>
        </select>
      </label>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load films"
      message="The Ghibli catalog is unavailable right now. Try again in a moment."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredFilms.length"
      title="No films matched"
      message="Try a different title or clear the search to browse the full catalog."
    />

    <div v-else class="space-y-6">
      <div
        v-if="featuredFilm"
        class="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 lg:grid lg:grid-cols-[1.2fr,0.8fr]"
      >
        <img
          v-if="featuredFilm.banner"
          :src="featuredFilm.banner"
          :alt="featuredFilm.title"
          class="h-full min-h-64 w-full object-cover"
        />
        <div v-else class="flex min-h-64 items-center justify-center bg-slate-900 text-xs uppercase tracking-[0.3em] text-slate-500">
          No banner
        </div>

        <div class="space-y-4 p-6">
          <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Featured film</p>
          <h3 class="text-3xl font-semibold text-white">{{ featuredFilm.title }}</h3>
          <p class="text-sm text-slate-300">{{ featuredFilm.description }}</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-slate-800 px-4 py-3">
              <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Director</p>
              <p class="text-sm text-slate-100">{{ featuredFilm.director }}</p>
            </div>
            <div class="rounded-2xl border border-slate-800 px-4 py-3">
              <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Producer</p>
              <p class="text-sm text-slate-100">{{ featuredFilm.producer }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <CardsMovieCard
          v-for="film in filteredFilms"
          :key="film.id"
          :title="film.title"
          :description="film.description"
          :image="film.image"
          :release-year="film.releaseYear"
          :director="film.director"
          :producer="film.producer"
          :runtime="film.runtime"
          :score="film.score"
        />
      </div>
    </div>
  </div>
</template>
