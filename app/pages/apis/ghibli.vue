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
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Studio Ghibli API" subtitle="Film Library" />
      <p class="text-body-2 text-medium-emphasis">
        Search the Ghibli catalog, sort the library, and compare each film’s team, release year, and synopsis.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search by title, director, or producer" />
      <v-select
        v-model="sort"
        :items="[
          { title: 'Release year', value: 'year' },
          { title: 'Title', value: 'title' }
        ]"
        hide-details
        label="Sort"
        variant="outlined"
        density="comfortable"
      />
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

    <div v-else class="d-flex flex-column ga-6">
      <v-card
        v-if="featuredFilm"
        color="surface"
        rounded="xl"
        class="overflow-hidden"
      >
        <v-row no-gutters>
          <v-col cols="12" lg="7">
            <v-img
              v-if="featuredFilm.banner"
              :src="featuredFilm.banner"
              :alt="featuredFilm.title"
              cover
              min-height="320"
            />
            <div v-else class="d-flex align-center justify-center text-overline text-medium-emphasis" style="min-height: 320px;">
              No banner
            </div>
          </v-col>
          <v-col cols="12" lg="5">
            <div class="pa-6 d-flex flex-column ga-4">
              <div class="text-overline text-medium-emphasis">Featured film</div>
              <h3 class="text-h4 font-weight-bold">{{ featuredFilm.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ featuredFilm.description }}</p>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                    <div class="text-overline text-medium-emphasis">Director</div>
                    <div class="text-body-1">{{ featuredFilm.director }}</div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                    <div class="text-overline text-medium-emphasis">Producer</div>
                    <div class="text-body-1">{{ featuredFilm.producer }}</div>
                  </v-sheet>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-row>
        <v-col v-for="film in filteredFilms" :key="film.id" cols="12" xl="6">
          <CardsMovieCard
            :title="film.title"
            :description="film.description"
            :image="film.image"
            :release-year="film.releaseYear"
            :director="film.director"
            :producer="film.producer"
            :runtime="film.runtime"
            :score="film.score"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
