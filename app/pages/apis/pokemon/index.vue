<script setup lang="ts">
import type { PokemonListResponse } from '~/shared/types/pokemon'

useSeoMeta({
  title: 'PokeAPI | Catalogo de APIs Publicas',
  description: 'Explora Pokemon con datos reales, busqueda, paginacion y una vista de detalle consistente.'
})

const page = ref(1)
const limit = 12
const search = ref('')

const query = computed(() => ({
  page: page.value,
  limit,
  search: search.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<PokemonListResponse>('/api/pokemon', {
  query,
  defaultValue: {
    items: [],
    page: 1,
    totalPages: 1,
    count: 0
  }
})

watch(search, () => {
  page.value = 1
})

</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="PokeAPI" subtitle="Explorador de criaturas" />
      <p class="text-body-2 text-medium-emphasis">
        Esta demo convierte una API amplia en una experiencia editorial: busqueda por nombre, lectura rapida de tipos y acceso a detalle sin romper el ritmo del catalogo.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Buscar Pokemon por nombre" />
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in limit" :key="index" cols="12" sm="6" md="4" lg="2">
        <v-skeleton-loader class="border pokemon-skeleton" color="surface" type="image, article" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar los Pokemon"
      message="Intenta nuevamente en un momento."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No se encontraron Pokemon"
      message="Prueba con otro nombre o limpia la busqueda."
    />

    <v-row v-else>
      <v-col v-for="pokemon in data.items" :key="pokemon.id" cols="12" sm="6" md="4" lg="2">
        <CardsPokemonCard
          :id="pokemon.id"
          :name="pokemon.name"
          :image="pokemon.image"
          :types="pokemon.types"
          :stats="pokemon.stats"
          :to="`/apis/pokemon/${pokemon.name}`"
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
      api-name="PokeAPI"
      summary="La UI consulta un endpoint interno en `server/api/pokemon`, donde se encapsulan las llamadas a PokeAPI y se mapean tipos, stats e imagenes para que la pagina no dependa del esquema crudo del proveedor."
      :bullets="[
        'Se usa un fetch server-side para centralizar paginacion y busqueda por nombre.',
        'La respuesta se normaliza a tarjetas consistentes con tipos y stats resumidos.',
        'El valor de producto es convertir una API compleja en una navegacion clara y estable.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.pokemon-skeleton {
  height: 410px;
}
</style>
