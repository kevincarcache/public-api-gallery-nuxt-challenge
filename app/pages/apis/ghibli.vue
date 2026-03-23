<script setup lang="ts">
import type { GhibliFilm, GhibliFilmsResponse } from '~/shared/types/ghibli'

useSeoMeta({
  title: 'Studio Ghibli API | Catalogo de APIs Publicas',
  description: 'Explora peliculas de Studio Ghibli con enfoque editorial, orden, busqueda y metadata normalizada.'
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
      <CommonSectionHeader title="Studio Ghibli API" subtitle="Biblioteca de peliculas" />
      <p class="text-body-2 text-medium-emphasis">
        Esta pagina transforma una libreria de peliculas en una lectura comparativa, priorizando metadata, sinopsis y un bloque destacado para la pieza principal.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Buscar por titulo, direccion o produccion" />
      <v-select
        v-model="sort"
        :items="[
          { title: 'Ano de estreno', value: 'year' },
          { title: 'Titulo', value: 'title' }
        ]"
        hide-details
        label="Orden"
        variant="outlined"
        density="comfortable"
      />
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar las peliculas"
      message="El catalogo de Ghibli no esta disponible por ahora. Intenta nuevamente en un momento."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredFilms.length"
      title="No hubo coincidencias"
      message="Prueba con otro titulo o limpia la busqueda para revisar el catalogo completo."
    />

    <div v-else class="d-flex flex-column ga-6">
      <v-card
        v-if="featuredFilm"
        color="surface"
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
              Sin banner
            </div>
          </v-col>
          <v-col cols="12" lg="5">
            <div class="pa-6 d-flex flex-column ga-4">
              <div class="text-overline text-medium-emphasis">Pelicula destacada</div>
              <h3 class="text-h4 font-weight-bold">{{ featuredFilm.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ featuredFilm.description }}</p>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-sheet color="surface-bright" class="pa-4">
                    <div class="text-overline text-medium-emphasis">Direccion</div>
                    <div class="text-body-1">{{ featuredFilm.director }}</div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-sheet color="surface-bright" class="pa-4">
                    <div class="text-overline text-medium-emphasis">Produccion</div>
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

      <SectionsIntegrationNote
        api-name="Studio Ghibli API"
        summary="La fuente se encapsula en un endpoint interno y se mapea a un modelo de pelicula con artwork, metadatos y textos largos, para que la interfaz pueda trabajar con piezas consistentes y comparables."
        :bullets="[
          'La busqueda y el orden se hacen sobre una coleccion ya normalizada, no sobre el payload original.',
          'La UI combina una pelicula destacada con tarjetas de comparacion para dar contexto y ritmo.',
          'El valor tecnico esta en convertir datos ricos en una experiencia editorial clara y estable.'
        ]"
      />
    </div>
  </v-container>
</template>
