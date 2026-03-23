<script setup lang="ts">
import type { StarWarsResource, StarWarsResponse } from '~/shared/types/star-wars'

useSeoMeta({
  title: 'SWAPI | Catalogo de APIs Publicas',
  description: 'Explora varios recursos de SWAPI desde una sola interfaz y compara resultados heterogeneos con una UI unificada.'
})

const resource = ref<StarWarsResource>('people')
const search = ref('')

const query = computed(() => ({
  resource: resource.value,
  search: search.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<StarWarsResponse>('/api/star-wars', {
  query,
  defaultValue: {
    items: [],
    resource: 'people',
    search: ''
  }
})

const resources: Array<{ label: string; value: StarWarsResource }> = [
  { label: 'Personas', value: 'people' },
  { label: 'Planetas', value: 'planets' },
  { label: 'Naves', value: 'starships' }
]

const resourceLabel = computed(() => {
  return resources.find((item) => item.value === resource.value)?.label.toLowerCase() ?? 'resultados'
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="SWAPI" subtitle="Explorador galactico" />
      <p class="text-body-2 text-medium-emphasis">
        Esta demo muestra como un solo front puede recorrer recursos distintos, traduciendo personas, planetas y naves a un lenguaje visual compartido.
      </p>
    </div>

    <CommonFilterBar>
      <v-btn-toggle
        v-model="resource"
        color="primary"
        mandatory
        selected-class="text-on-primary"
      >
        <v-btn
          v-for="item in resources"
          :key="item.value"
          :value="item.value"
          @click="resource = item.value"
        >
          {{ item.label }}
        </v-btn>
      </v-btn-toggle>

      <CommonSearchBar v-model="search" :placeholder="`Buscar en ${resourceLabel}`" />
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in 6" :key="index" cols="12" sm="6" lg="3">
        <v-skeleton-loader class="border star-wars-skeleton" color="surface" type="article, article, article" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar datos de Star Wars"
      message="Prueba cambiando el recurso o realizando una nueva busqueda."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="Sin coincidencias galacticas"
      message="La busqueda no devolvio resultados para el recurso seleccionado."
    />

    <v-row v-else>
      <v-col v-for="item in data.items" :key="item.id" cols="12" sm="6" lg="3">
        <CardsStarWarsCard
          :title="item.name"
          :subtitle="item.subtitle"
          :description="item.description"
          :stats="item.stats"
          :resource="resource"
        />
      </v-col>
    </v-row>

    <SectionsIntegrationNote
      api-name="SWAPI"
      summary="La conexion se resuelve a traves de un endpoint interno que recibe el recurso activo, consulta SWAPI y devuelve un modelo unificado para que la UI no tenga que conocer tres estructuras distintas."
      :bullets="[
        'El selector cambia entre personas, planetas y naves sin cambiar el componente principal.',
        'La capa de mapping traduce atributos heterogeneos a titulos, subtitulos y stats reutilizables.',
        'El caso demuestra criterio para unificar dominios distintos con una sola experiencia.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.star-wars-skeleton {
  height: 420px;
}
</style>
