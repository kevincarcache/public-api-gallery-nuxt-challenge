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
      ? `Profile details for ${data.value.name}.`
      : 'Rick and Morty character profile.'
  )
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/rick-morty">
        Back to explorer
      </v-btn>
    </div>

    <CommonSectionHeader title="Character Detail" subtitle="Rick and Morty" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Character not available"
      message="We could not load this character. Try again."
      @retry="refresh"
    />

    <v-row v-else>
      <v-col cols="12" lg="7">
        <v-card color="surface" rounded="xl" class="overflow-hidden fill-height">
          <v-img v-if="data.image" :src="data.image" :alt="data.name" cover min-height="420" />
          <div v-else class="pa-16 text-center text-overline text-medium-emphasis">No image</div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card color="surface" rounded="xl" class="pa-6">
          <div class="text-overline text-medium-emphasis">ID {{ data.id }}</div>
          <h1 class="text-h4 font-weight-bold mb-4">{{ data.name }}</h1>

          <div class="d-flex flex-wrap ga-2 mb-4">
            <v-chip color="primary" variant="outlined">{{ data.status }}</v-chip>
            <v-chip color="secondary" variant="outlined">{{ data.species }}</v-chip>
            <v-chip color="info" variant="outlined">{{ data.gender }}</v-chip>
          </div>

          <v-row class="mb-1">
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                <div class="text-overline text-medium-emphasis">Origin</div>
                <div class="text-body-1">{{ data.origin }}</div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="6">
              <v-sheet color="surface-bright" rounded="lg" class="pa-4">
                <div class="text-overline text-medium-emphasis">Location</div>
                <div class="text-body-1">{{ data.location }}</div>
              </v-sheet>
            </v-col>
          </v-row>

          <v-sheet color="surface-bright" rounded="lg" class="pa-4">
            <div class="text-overline text-medium-emphasis">Episodes</div>
            <div class="text-h6">{{ data.episodeCount }}</div>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
