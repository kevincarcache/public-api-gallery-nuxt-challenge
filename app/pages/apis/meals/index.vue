<script setup lang="ts">
import type { MealListResponse } from '~/shared/types/meals'

useSeoMeta({
  title: 'TheMealDB | Catalogo de APIs Publicas',
  description: 'Busca recetas reales, compara resultados y entra a un detalle con ingredientes e instrucciones normalizadas.'
})

const search = ref('chicken')
const submittedSearch = ref('chicken')

const query = computed(() => ({
  search: submittedSearch.value
}))

const { data, pending, error, refresh } = useSafeFetch<MealListResponse>('/api/meals', {
  query,
  defaultValue: {
    items: [],
    query: 'chicken'
  }
})

const submitSearch = () => {
  submittedSearch.value = search.value.trim() || 'chicken'
}
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="TheMealDB" subtitle="Buscador de recetas" />
      <p class="text-body-2 text-medium-emphasis">
        Esta vista convierte respuestas extensas de TheMealDB en un flujo claro de descubrimiento: busqueda, comparacion visual y acceso a detalle tecnico.
      </p>
    </div>

    <CommonFilterBar>
      <form class="w-100 d-flex flex-column flex-md-row ga-3" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Buscar recetas como pasta, curry o sopa" />
        <v-btn
          color="primary"
          prepend-icon="mdi-silverware-fork-knife"
          type="submit"
          variant="tonal"
        >
          Buscar recetas
        </v-btn>
      </form>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar las recetas"
      message="Prueba con otro termino o intenta nuevamente en un momento."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No se encontraron recetas"
      :message="`No encontramos recetas para “${submittedSearch}”. Prueba con un termino mas amplio.`"
      action-label="Probar con chicken"
      action-to="/apis/meals"
    />

    <div v-else class="d-flex flex-column ga-4">
      <div class="text-body-2 text-medium-emphasis">
        Mostrando {{ data.items.length }} recetas para <span class="font-weight-bold text-high-emphasis">{{ data.query }}</span>.
      </div>

      <v-row>
        <v-col v-for="meal in data.items" :key="meal.id" cols="12" sm="6" xl="4">
          <CardsRecipeCard
            :title="meal.name"
            :image="meal.image"
            :category="meal.category"
            :area="meal.area"
            :tags="meal.tags"
            :description="meal.instructionsPreview"
            :to="`/apis/meals/${meal.id}`"
          />
        </v-col>
      </v-row>

      <SectionsIntegrationNote
        api-name="TheMealDB"
        summary="La pagina delega la busqueda a un endpoint interno y luego usa mappers para resumir instrucciones, tags y metadatos antes de renderizar tarjetas. Asi la UI trabaja con un modelo limpio y consistente."
        :bullets="[
          'La consulta por texto se resuelve server-side para encapsular la fuente y preparar la respuesta.',
          'Cada receta se resume a una tarjeta comparable que prioriza categoria, origen y lectura rapida.',
          'El valor tecnico esta en pasar de un resultado crudo a una experiencia de descubrimiento mas clara.'
        ]"
      />
    </div>
  </v-container>
</template>
