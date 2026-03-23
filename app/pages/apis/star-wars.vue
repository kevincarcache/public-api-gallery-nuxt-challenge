<script setup lang="ts">
import type { StarWarsResource, StarWarsResponse } from '~/shared/types/star-wars'

useSeoMeta({
  title: 'SWAPI | Public API Gallery',
  description: 'Switch between people, planets, and starships while searching the Star Wars universe.'
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
  { label: 'People', value: 'people' },
  { label: 'Planets', value: 'planets' },
  { label: 'Starships', value: 'starships' }
]
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="SWAPI" subtitle="Galaxy Explorer" />
      <p class="text-body-2 text-medium-emphasis">
        Jump across key Star Wars resources, search live results, and compare the most useful details in a readable card grid.
      </p>
    </div>

    <CommonFilterBar>
      <v-btn-toggle
        v-model="resource"
        color="primary"
        mandatory
        rounded="pill"
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

      <CommonSearchBar v-model="search" :placeholder="`Search ${resource}`" />
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load Star Wars data"
      message="Try switching resources or searching again."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No galactic matches"
      message="This search did not return results for the selected resource."
    />

    <v-row v-else>
      <v-col v-for="item in data.items" :key="item.id" cols="12" sm="6" xl="4">
        <CardsCharacterCard
          :title="item.name"
          :subtitle="item.subtitle"
          :description="item.description"
          :stats="item.stats"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
