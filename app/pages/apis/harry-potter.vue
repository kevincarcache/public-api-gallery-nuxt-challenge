<script setup lang="ts">
import type { HarryPotterResponse } from '~/shared/types/harry-potter'

useSeoMeta({
  title: 'Harry Potter API | Public API Gallery',
  description: 'Explore Hogwarts characters with house filters and search.'
})

const search = ref('')
const house = ref('')

const query = computed(() => ({
  house: house.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<HarryPotterResponse>('/api/harry-potter', {
  query,
  defaultValue: { items: [] }
})

const filteredItems = computed(() => {
  const items = data.value?.items ?? []
  if (!search.value) return items
  const queryText = search.value.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(queryText))
})

const houseOptions = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Harry Potter" subtitle="Character Roster" />
      <p class="max-w-2xl text-sm text-slate-300">
        Filter by house or search for a character to explore the wizarding world.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search by name" />
      <select
        v-model="house"
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100"
      >
        <option value="">All houses</option>
        <option v-for="option in houseOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <button
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
        type="button"
        @click="refresh"
      >
        Reload
      </button>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="12" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load characters"
      message="Try refreshing again."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredItems.length"
      title="No characters found"
      message="Try another name or house filter."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CardsCharacterCard
        v-for="character in filteredItems"
        :key="character.name"
        :title="character.name"
        :subtitle="character.house || 'No house'"
        :image="character.image"
        :badges="[character.house || 'unknown', character.species]"
        :stats="[
          { label: 'Actor', value: character.actor },
          { label: 'Patronus', value: character.patronus }
        ]"
      />
    </div>
  </div>
</template>
