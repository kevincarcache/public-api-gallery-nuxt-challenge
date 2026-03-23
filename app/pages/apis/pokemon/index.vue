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
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="PokeAPI" subtitle="Pokedex" />
      <p class="text-body-2 text-medium-emphasis">
        Search Pokemon by name, scan their types and stats, and open a full detail view.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search Pokemon by name" />
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="limit" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load Pokemon"
      message="Try again in a moment."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No Pokemon found"
      message="Try a different name or clear the search."
    />

    <v-row v-else>
      <v-col v-for="pokemon in data.items" :key="pokemon.id" cols="12" sm="6" lg="4">
        <CardsCharacterCard
          :title="pokemon.name"
          :subtitle="`#${pokemon.id}`"
          :image="pokemon.image"
          :badges="pokemon.types"
          :stats="statPreview(pokemon.stats)"
          :to="`/apis/pokemon/${pokemon.name}`"
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
