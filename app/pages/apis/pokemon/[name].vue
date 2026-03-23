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
      ? `Stats and details for ${data.value.name}.`
      : 'Pokemon detail view.'
  )
})

const formatLabel = (value: string) => value.replace('-', ' ')
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/pokemon">
        Back to Pokedex
      </v-btn>
    </div>

    <CommonSectionHeader title="Pokemon Detail" subtitle="PokeAPI" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Pokemon not available"
      message="We could not load this Pokemon. Check the name or try again."
      @retry="refresh"
    />

    <template v-else>
      <v-row>
        <v-col cols="12" lg="7">
          <v-card color="surface" rounded="xl" class="pa-6 d-flex align-center justify-center fill-height">
            <v-img
              v-if="data.image"
              :src="data.image"
              :alt="data.name"
              max-height="320"
              contain
            />
            <div v-else class="text-overline text-medium-emphasis">No image</div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="5">
          <v-card color="surface" rounded="xl" class="pa-6">
            <div class="text-overline text-medium-emphasis">{{ data.id }}</div>
            <h1 class="text-h4 font-weight-bold mb-4">{{ data.name }}</h1>

            <div class="d-flex flex-wrap ga-2 mb-4">
              <v-chip v-for="type in data.types" :key="type" color="primary" variant="outlined">
                {{ type }}
              </v-chip>
            </div>

            <v-row class="mb-1">
              <v-col cols="6">
                <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Height</div>
                  <div class="text-h6">{{ data.height }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="6">
                <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                  <div class="text-overline text-medium-emphasis">Weight</div>
                  <div class="text-h6">{{ data.weight }}</div>
                </v-sheet>
              </v-col>
            </v-row>

            <v-sheet color="surface-bright" rounded="lg" class="pa-4">
              <div class="text-overline text-medium-emphasis mb-2">Abilities</div>
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
        <h2 class="text-h6 font-weight-bold mb-3">Base stats</h2>
        <v-row>
          <v-col v-for="stat in data.stats" :key="stat.label" cols="12" sm="6" lg="4">
            <v-sheet color="surface" rounded="lg" class="pa-4">
              <div class="text-overline text-medium-emphasis">{{ formatLabel(stat.label) }}</div>
              <div class="text-h6">{{ stat.value }}</div>
            </v-sheet>
          </v-col>
        </v-row>
      </section>
    </template>
  </v-container>
</template>
