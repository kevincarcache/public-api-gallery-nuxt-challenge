<script setup lang="ts">
import type { RickMortyListResponse } from '~/shared/types/rick-morty'

useSeoMeta({
  title: 'Rick and Morty API | Catalogo de APIs Publicas',
  description: 'Explora personajes con filtros combinados, resultados paginados y perfiles consistentes.'
})

const page = ref(1)
const search = ref('')
const status = ref('')
const species = ref('')

const query = computed(() => ({
  page: page.value,
  search: search.value || undefined,
  status: status.value || undefined,
  species: species.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<RickMortyListResponse>('/api/rick-morty', {
  query,
  defaultValue: {
    items: [],
    page: 1,
    totalPages: 1,
    count: 0
  }
})

watch([search, status, species], () => {
  page.value = 1
})

const statusOptions = ['alive', 'dead', 'unknown']
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Rick and Morty" subtitle="Explorador de personajes" />
      <p class="text-body-2 text-medium-emphasis">
        Esta pagina demuestra como una fuente con muchos resultados puede traducirse a filtros utiles, lectura rapida y acceso natural a detalle.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Buscar personajes" />
      <v-select
        v-model="status"
        :items="statusOptions"
        clearable
        hide-details
        label="Estado"
        variant="outlined"
        density="comfortable"
      />
      <v-text-field
        v-model="species"
        hide-details
        label="Especie"
        placeholder="Filtrar por especie"
        >
      </v-text-field>
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in 12" :key="index" cols="12" sm="6" lg="3">
        <v-skeleton-loader class="border rick-morty-skeleton" color="surface" type="image, article" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar los personajes"
      message="Intenta nuevamente en un momento."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No se encontraron personajes"
      message="Ajusta los filtros o cambia el termino de busqueda."
    />

    <v-row v-else>
      <v-col v-for="character in data.items" :key="character.id" cols="12" sm="6" lg="3">
        <CardsCharacterCard
          :title="character.name"
          :subtitle="`${character.species} • ${character.status}`"
          :image="character.image"
          :badges="[character.status, character.gender]"
          :stats="[
            { label: 'Origin', value: character.origin },
            { label: 'Location', value: character.location }
          ]"
          :to="`/apis/rick-morty/character/${character.id}`"
        />
      </v-col>
    </v-row>

    <CommonPaginationControls
      v-if="data.totalPages > 1"
      :page="page"
      :total-pages="data.totalPages"
      @update:page="page = $event"
    />

    <SectionsIntegrationNote
      api-name="Rick and Morty API"
      summary="La conexion se canaliza por `server/api/rick-morty` para resolver filtros, paginacion y mapping de origen, ubicacion y metadata antes de renderizar la UI."
      :bullets="[
        'La pagina envia estado, especie y busqueda a un endpoint interno desacoplado de la API externa.',
        'Los datos se modelan para alimentar tarjetas reutilizables y un detalle consistente.',
        'El caso demuestra composicion de filtros y paginacion sin degradar la lectura del producto.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.rick-morty-skeleton {
  height: 410px;
}
</style>
