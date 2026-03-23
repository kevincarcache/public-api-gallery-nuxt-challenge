<script setup lang="ts">
import type { HarryPotterResponse } from '~/shared/types/harry-potter'

useSeoMeta({
  title: 'Harry Potter API | Catalogo de APIs Publicas',
  description: 'Explora personajes de Hogwarts con filtros por casa, busqueda local y UI tolerante a datos incompletos.'
})

const search = ref('')
const house = ref('')
const page = ref(1)
const perPage = 12

const query = computed(() => ({
  house: house.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<HarryPotterResponse>('/api/harry-potter', {
  query,
  defaultValue: { items: [] }
})

const filteredItems = computed(() => {
  const items = data.value?.items ?? []
  if (!search.value) return items
  const queryText = search.value.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(queryText))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / perPage)))

const paginatedItems = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredItems.value.slice(start, start + perPage)
})

const houseOptions = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']

watch([search, house], () => {
  page.value = 1
})

watch(totalPages, (value) => {
  if (page.value > value) {
    page.value = value
  }
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Harry Potter" subtitle="Catalogo de personajes" />
      <p class="text-body-2 text-medium-emphasis">
        Este demo toma una fuente ligera y la convierte en una exploracion ordenada, con filtros utiles y fallbacks para imagenes o campos faltantes.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Buscar por nombre" />
      <v-select
        v-model="house"
        :items="houseOptions"
        clearable
        hide-details
        label="Casa"
        variant="outlined"
        density="comfortable"
      >
      </v-select>
      <v-btn
        color="primary"
        prepend-icon="mdi-refresh"
        variant="tonal"
        @click="refresh"
      >
        Recargar
      </v-btn>
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in 12" :key="index" cols="12" sm="6" lg="3">
        <v-skeleton-loader class="border harry-potter-skeleton" color="surface" type="image, article" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar los personajes"
      message="Prueba recargando nuevamente."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredItems.length"
      title="No se encontraron personajes"
      message="Prueba con otro nombre o cambia la casa."
    />

    <v-row v-else>
      <v-col v-for="character in paginatedItems" :key="character.name" cols="12" sm="6" lg="3">
        <CardsCharacterCard
          :title="character.name"
          :subtitle="character.house || 'Sin casa'"
          :image="character.image"
          :badges="[character.house || 'unknown', character.species]"
          :stats="[
            { label: 'Actor', value: character.actor },
            { label: 'Patronus', value: character.patronus || 'Sin dato' }
          ]"
          stats-layout="inline"
        />
      </v-col>
    </v-row>

    <CommonPaginationControls
      v-if="totalPages > 1"
      :page="page"
      :total-pages="totalPages"
      @update:page="page = $event"
    />

    <SectionsIntegrationNote
      api-name="Harry Potter API"
      summary="La pagina consulta un endpoint interno que trae el roster base y luego aplica busqueda local para mantener la interaccion rapida, incluso cuando la fuente publica es simple y tiene campos incompletos."
      :bullets="[
        'El filtro por casa viaja al server y la busqueda por nombre se resuelve en cliente para responder rapido.',
        'Las tarjetas aplican fallbacks visuales para no depender de imagenes o metadata perfectas.',
        'El valor del demo esta en convertir una API sencilla en una experiencia profesional y estable.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.harry-potter-skeleton {
  height: 410px;
}
</style>
