<script setup lang="ts">
import type { RickMortyCharacter } from '~/shared/types/rick-morty'

const route = useRoute()
const characterId = computed(() => String(route.params.id ?? ''))

const { data, pending, error, refresh } = useSafeFetch<RickMortyCharacter>(
  computed(() => `/api/rick-morty/${characterId.value}`),
  { defaultValue: null }
)

useSeoMeta({
  title: computed(() => `Rick and Morty | ${data.value?.name ?? characterId.value}`),
  description: computed(() =>
    data.value
      ? `Perfil tecnico y datos clave de ${data.value.name}.`
      : 'Perfil de personaje de Rick and Morty.'
  )
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/rick-morty">
        Volver al explorador
      </v-btn>
    </div>

    <CommonSectionHeader title="Detalle de personaje" subtitle="Rick and Morty" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Personaje no disponible"
      message="No fue posible cargar este personaje. Intenta nuevamente."
      @retry="refresh"
    />

    <v-row v-else>
      <v-col cols="12" lg="7">
        <v-card color="surface" class="overflow-hidden fill-height editorial-panel">
          <v-img v-if="data.image" :src="data.image" :alt="data.name" cover min-height="420" />
          <div v-else class="pa-16 text-center text-overline text-medium-emphasis">Sin imagen</div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card color="surface" class="pa-6 editorial-panel">
          <div class="text-overline text-medium-emphasis">ID {{ data.id }}</div>
          <h1 class="text-h4 font-weight-bold mb-4">{{ data.name }}</h1>

          <div class="d-flex flex-wrap ga-2 mb-4">
            <v-chip color="primary" variant="outlined">{{ data.status }}</v-chip>
            <v-chip color="secondary" variant="outlined">{{ data.species }}</v-chip>
            <v-chip color="info" variant="outlined">{{ data.gender }}</v-chip>
          </div>

          <v-row class="mb-1">
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" class="pa-4">
                <div class="text-overline text-medium-emphasis">Origen</div>
                <div class="text-body-1">{{ data.origin }}</div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" class="pa-4">
                <div class="text-overline text-medium-emphasis">Ubicacion</div>
                <div class="text-body-1">{{ data.location }}</div>
              </v-sheet>
            </v-col>
          </v-row>

          <v-sheet color="surface-bright" class="pa-4">
            <div class="text-overline text-medium-emphasis">Episodes</div>
            <div class="text-h6">{{ data.episodeCount }}</div>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>

    <SectionsIntegrationNote
      api-name="Rick and Morty API"
      summary="El detalle usa la misma capa server-side que el listado, pero concentra solo los campos con valor real para una ficha de personaje: procedencia, ubicacion, estado y volumen de episodios."
      :bullets="[
        'La ruta dinamica consume un endpoint interno con ID para mantener encapsulada la fuente externa.',
        'La UI solo recibe informacion ya seleccionada y lista para lectura, no el objeto crudo del proveedor.',
        'Esto demuestra continuidad entre exploracion masiva y detalle puntual sin duplicar logica.'
      ]"
    />
  </v-container>
</template>
