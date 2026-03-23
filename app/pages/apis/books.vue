<script setup lang="ts">
import type { BookSearchItem, BookSearchResponse } from '~/shared/types/books'

useSeoMeta({
  title: 'Open Library API | Catalogo de APIs Publicas',
  description: 'Busca libros por texto, compara resultados bibliograficos y selecciona una obra para revisar su ficha resumida.'
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
      <CommonSectionHeader title="Open Library API" subtitle="Busqueda bibliografica" />
      <p class="text-body-2 text-medium-emphasis">
        Esta pagina organiza resultados bibliograficos incompletos en una experiencia clara: busqueda, comparacion por portada y un panel de seleccion sin abandonar la vista.
      </p>
    </div>

    <CommonFilterBar>
      <form class="w-100 d-flex flex-column flex-md-row ga-3" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Buscar libros por titulo o autor" />
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          type="submit"
          variant="tonal"
        >
          Buscar libros
        </v-btn>
      </form>
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in 12" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-skeleton-loader class="border books-skeleton" color="surface" type="image, article" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar libros"
      message="La busqueda de Open Library no esta disponible por ahora."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No se encontraron libros"
      message="Prueba con una busqueda mas amplia por autor o titulo."
    />

    <template v-else>
      <v-row>
        <v-col v-for="book in data.items" :key="book.workId" cols="12" sm="6" md="4" lg="3" xl="2">
          <CardsBookProductCard
            :title="book.title"
            :author="book.author"
            :cover-url="book.coverUrl"
            :first-publish-year="book.firstPublishYear"
            :editions="book.editions"
            :selected="selectedBook?.workId === book.workId"
            @click="selectedWorkId = book.workId"
          />
        </v-col>
      </v-row>

      <v-card v-if="selectedBook" color="surface" class="pa-6 editorial-panel books-detail">
        <div class="d-flex flex-column flex-lg-row ga-6">
          <div class="books-detail__cover-col">
            <v-img
              v-if="selectedBook.coverUrl"
              :src="selectedBook.coverUrl"
              :alt="selectedBook.title"
              cover
              class="books-detail__cover"
            />
            <v-sheet
              v-else
              color="surface-light"
              class="books-detail__cover d-flex align-center justify-center text-body-2 text-medium-emphasis"
            >
              Portada no disponible
            </v-sheet>
          </div>

          <div class="flex-1-1 d-flex flex-column">
            <div class="text-overline text-medium-emphasis">Libro seleccionado</div>
            <h3 class="text-h4 font-weight-bold mt-3">{{ selectedBook.title }}</h3>
            <p class="text-body-1 text-medium-emphasis mt-2">
              {{ selectedBook.author }}
            </p>
            <p class="text-body-2 text-medium-emphasis mt-1">
              Primera publicacion: {{ selectedBook.firstPublishYear }}
            </p>

            <v-row class="mt-4">
              <v-col cols="12" sm="6" lg="4">
                <v-sheet color="surface-bright" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Editorial</div>
                  <div class="text-body-1">{{ selectedBook.publisher }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6" lg="4">
                <v-sheet color="surface-bright" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Ediciones registradas</div>
                  <div class="text-body-1">{{ selectedBook.editions }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6" lg="4">
                <v-sheet color="surface-bright" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Consulta</div>
                  <div class="text-body-1">{{ submittedSearch }}</div>
                </v-sheet>
              </v-col>
            </v-row>

            <div class="mt-6">
              <div class="text-overline text-medium-emphasis mb-3">Temas</div>
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
                  Sin temas registrados
                </v-chip>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <SectionsIntegrationNote
      api-name="Open Library API"
      summary="La pagina consulta Open Library desde un endpoint interno y transforma resultados incompletos en un modelo consistente con portada opcional, autor principal, editorial y temas para comparacion inmediata."
      :bullets="[
        'La busqueda por texto se encapsula para normalizar resultados y resolver fallbacks de portada.',
        'El panel lateral evita saltos de ruta y permite revisar una obra con foco sin perder contexto.',
        'El valor tecnico esta en dar forma util a datos bibliograficos que suelen llegar incompletos.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.books-skeleton {
  height: 420px;
}

.books-detail__cover-col {
  width: min(100%, 240px);
}

.books-detail__cover {
  aspect-ratio: 0.72;
  border-radius: 18px;
  overflow: hidden;
}
</style>
