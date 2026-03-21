<script setup lang="ts">
import type { RickMortyListResponse } from '~/types/rick-morty'

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
  <div class="space-y-8">
    <div class="space-y-3">
      <SectionHeader title="Rick and Morty" subtitle="Character Explorer" />
      <p class="max-w-2xl text-sm text-slate-300">
        Search characters, filter by status, and open detailed profiles.
      </p>
    </div>

    <FilterBar>
      <SearchBar v-model="search" placeholder="Search characters" />
      <select
        v-model="status"
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100"
      >
        <option value="">All statuses</option>
        <option v-for="option in statusOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <input
        v-model="species"
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100"
        placeholder="Filter by species"
        type="text"
      />
    </FilterBar>

    <LoadingGrid v-if="pending" :count="12" />

    <ErrorState
      v-else-if="error"
      title="Unable to load characters"
      message="Try again in a moment."
      @retry="refresh"
    />

    <EmptyState
      v-else-if="!data.items.length"
      title="No characters found"
      message="Try adjusting the filters or search term."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CharacterCard
        v-for="character in data.items"
        :key="character.id"
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
    </div>

    <PaginationControls
      v-if="data.totalPages > 1"
      :page="page"
      :total-pages="data.totalPages"
      @update:page="page = $event"
    />
  </div>
</template>
