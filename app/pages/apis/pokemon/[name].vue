<script setup lang="ts">
import type { PokemonDetail } from '~/shared/types/pokemon'

const route = useRoute()

const pokemonName = computed(() => String(route.params.name ?? '').toLowerCase())

const { data, pending, error, refresh } = useSafeFetch<PokemonDetail>(
  computed(() => `/api/pokemon/${pokemonName.value}`),
  {
    defaultValue: null
  }
)

useSeoMeta({
  title: computed(() => `PokeAPI | ${data.value?.name ?? pokemonName.value}`),
  description: computed(() =>
    data.value
      ? `Ficha tecnica y datos base de ${data.value.name}.`
      : 'Vista de detalle de Pokemon.'
  )
})

const formatLabel = (value: string) => value.replace('-', ' ')
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/pokemon">
        Volver al explorador
      </v-btn>
    </div>

    <CommonSectionHeader title="Detalle de Pokemon" subtitle="PokeAPI" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Pokemon no disponible"
      message="No fue posible cargar este Pokemon. Verifica el nombre o intenta nuevamente."
      @retry="refresh"
    />

    <template v-else>
      <v-row>
        <v-col cols="12" lg="7">
          <v-card color="surface" class="pa-6 d-flex align-center justify-center fill-height editorial-panel">
            <v-img
              v-if="data.image"
              :src="data.image"
              :alt="data.name"
              max-height="320"
              contain
            />
            <div v-else class="text-overline text-medium-emphasis">Sin imagen</div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="5">
          <v-card color="surface" class="pa-6 editorial-panel">
            <div class="text-overline text-medium-emphasis">{{ data.id }}</div>
            <h1 class="text-h4 font-weight-bold mb-4">{{ data.name }}</h1>

            <div class="d-flex flex-wrap ga-2 mb-4">
              <v-chip v-for="type in data.types" :key="type" color="primary" variant="outlined">
                {{ type }}
              </v-chip>
            </div>

            <v-row class="mb-1">
              <v-col cols="6">
                <v-sheet color="surface-bright" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Altura</div>
                  <div class="text-h6">{{ data.height }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="6">
                <v-sheet color="surface-bright" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Peso</div>
                  <div class="text-h6">{{ data.weight }}</div>
                </v-sheet>
              </v-col>
            </v-row>

            <v-sheet color="surface-bright" class="pa-4">
              <div class="text-overline text-medium-emphasis mb-2">Habilidades</div>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="ability in data.abilities"
                  :key="ability"
                  color="secondary"
                  variant="tonal"
                >
                  {{ formatLabel(ability) }}
                </v-chip>
              </div>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>

      <section>
        <h2 class="text-h6 font-weight-bold mb-3">Stats base</h2>
        <v-row>
          <v-col v-for="stat in data.stats" :key="stat.label" cols="12" sm="6" lg="4">
            <v-sheet color="surface" class="pa-4 editorial-panel">
              <div class="text-overline text-medium-emphasis">{{ formatLabel(stat.label) }}</div>
              <div class="text-h6">{{ stat.value }}</div>
            </v-sheet>
          </v-col>
        </v-row>
      </section>

      <SectionsIntegrationNote
        api-name="PokeAPI"
        summary="La vista de detalle reutiliza el flujo server-side para pedir una entidad individual, resolver abilities, stats y artwork, y exponer una ficha tecnica limpia sin acoplar la UI al payload original."
        :bullets="[
          'La ruta dinamica recibe el nombre del Pokemon y consulta un endpoint interno propio.',
          'El mapper prepara labels y valores para que el detalle no necesite logica compleja en plantilla.',
          'El resultado demuestra capacidad de pasar de lista a detalle manteniendo consistencia de producto.'
        ]"
      />
    </template>
  </v-container>
</template>
