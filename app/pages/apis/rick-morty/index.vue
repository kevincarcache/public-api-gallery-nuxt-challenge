<script setup lang="ts">
import type { RickMortyListResponse } from '~/shared/types/rick-morty'

useSeoMeta({
  title: 'Rick and Morty API | Public API Gallery',
  description: 'Explore characters with search, filters, and detail views.'
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
      <CommonSectionHeader title="Rick and Morty" subtitle="Character Explorer" />
      <p class="text-body-2 text-medium-emphasis">
        Search characters, filter by status, and open detailed profiles.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search characters" />
      <v-select
        v-model="status"
        :items="statusOptions"
        clearable
        hide-details
        label="Status"
        variant="outlined"
        density="comfortable"
      />
      <v-text-field
        v-model="species"
        hide-details
        label="Species"
        placeholder="Filter by species"
        >
      </v-text-field>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="12" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load characters"
      message="Try again in a moment."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No characters found"
      message="Try adjusting the filters or search term."
    />

    <v-row v-else>
      <v-col v-for="character in data.items" :key="character.id" cols="12" sm="6" lg="4">
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
  </v-container>
</template>
