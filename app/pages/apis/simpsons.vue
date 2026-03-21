<script setup lang="ts">
import type { SimpsonsResponse } from '~/shared/types/simpsons'

useSeoMeta({
  title: 'The Simpsons API | Public API Gallery',
  description: 'Browse Simpsons quotes with character visuals and quick search.'
})

const count = 12
const search = ref('')

const { data, pending, error, refresh } = useSafeFetch<SimpsonsResponse>('/api/simpsons', {
  query: { count },
  defaultValue: { items: [] }
})

const filteredItems = computed(() => {
  const items = data.value?.items ?? []
  if (!search.value) return items
  const query = search.value.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(query))
})
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="The Simpsons" subtitle="Quote Gallery" />
      <p class="max-w-2xl text-sm text-slate-300">
        Refresh the gallery for new quotes, or search by character name.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search by character" />
      <button
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
        type="button"
        @click="refresh"
      >
        Reload quotes
      </button>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="count" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load quotes"
      message="Try refreshing again."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredItems.length"
      title="No quotes found"
      message="Try a different character name or refresh the gallery."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CardsCharacterCard
        v-for="item in filteredItems"
        :key="item.name + item.quote"
        :title="item.name"
        :image="item.image"
        :description="item.quote"
      />
    </div>
  </div>
</template>
