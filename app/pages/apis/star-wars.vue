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
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="SWAPI" subtitle="Galaxy Explorer" />
      <p class="max-w-2xl text-sm text-slate-300">
        Jump across key Star Wars resources, search live results, and compare the most useful details in a readable card grid.
      </p>
    </div>

    <CommonFilterBar>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in resources"
          :key="item.value"
          class="rounded-full border px-4 py-2 text-sm transition"
          :class="resource === item.value ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-slate-800 text-slate-200 hover:border-slate-600'"
          type="button"
          @click="resource = item.value"
        >
          {{ item.label }}
        </button>
      </div>

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

    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <CardsCharacterCard
        v-for="item in data.items"
        :key="item.id"
        :title="item.name"
        :subtitle="item.subtitle"
        :description="item.description"
        :stats="item.stats"
      />
    </div>
  </div>
</template>
