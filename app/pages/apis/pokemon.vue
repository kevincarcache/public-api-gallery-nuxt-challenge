<script setup lang="ts">
import type { PokemonListResponse } from '~/shared/types/pokemon'

useSeoMeta({
  title: 'PokeAPI | Public API Gallery',
  description: 'Browse Pokemon with search, stats, and detail views.'
})

const page = ref(1)
const limit = 12
const search = ref('')

const query = computed(() => ({
  page: page.value,
  limit,
  search: search.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<PokemonListResponse>('/api/pokemon', {
  query,
  defaultValue: {
    items: [],
    page: 1,
    totalPages: 1,
    count: 0
  }
})

watch(search, () => {
  page.value = 1
})

const statPreview = (stats: PokemonListResponse['items'][number]['stats']) => {
  return stats.slice(0, 2)
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <SectionHeader title="PokeAPI" subtitle="Pokedex" />
      <p class="max-w-2xl text-sm text-slate-300">
        Search Pokemon by name, scan their types and stats, and open a full detail view.
      </p>
    </div>

    <FilterBar>
      <SearchBar v-model="search" placeholder="Search Pokemon by name" />
    </FilterBar>

    <LoadingGrid v-if="pending" :count="limit" />

    <ErrorState
      v-else-if="error"
      title="Unable to load Pokemon"
      message="Try again in a moment."
      @retry="refresh"
    />

    <EmptyState
      v-else-if="!data.items.length"
      title="No Pokemon found"
      message="Try a different name or clear the search."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CharacterCard
        v-for="pokemon in data.items"
        :key="pokemon.id"
        :title="pokemon.name"
        :subtitle="`#${pokemon.id}`"
        :image="pokemon.image"
        :badges="pokemon.types"
        :stats="statPreview(pokemon.stats)"
        :to="`/apis/pokemon/${pokemon.name}`"
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
