<script setup lang="ts">
import type { MealListResponse } from '~/shared/types/meals'

useSeoMeta({
  title: 'TheMealDB | Public API Gallery',
  description: 'Search recipes, scan meal cards, and open detailed ingredient and instruction views.'
})

const search = ref('chicken')
const submittedSearch = ref('chicken')

const query = computed(() => ({
  search: submittedSearch.value
}))

const { data, pending, error, refresh } = useSafeFetch<MealListResponse>('/api/meals', {
  query,
  defaultValue: {
    items: [],
    query: 'chicken'
  }
})

const submitSearch = () => {
  submittedSearch.value = search.value.trim() || 'chicken'
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="TheMealDB" subtitle="Recipe Search" />
      <p class="max-w-2xl text-sm text-slate-300">
        Search by meal name, compare visual recipe cards, and open a detail view with parsed ingredients and steps.
      </p>
    </div>

    <CommonFilterBar>
      <form class="flex w-full flex-col gap-3 md:flex-row" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Search meals like pasta, curry, or soup" />
        <button
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
          type="submit"
        >
          Search recipes
        </button>
      </form>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="6" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load recipes"
      message="Try another meal name or retry in a moment."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No meals found"
      :message="`We could not find recipes for “${submittedSearch}”. Try a broader term.`"
      action-label="Try chicken"
      action-to="/apis/meals"
    />

    <div v-else class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <p>Showing {{ data.items.length }} recipes for <span class="text-slate-100">{{ data.query }}</span>.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <CardsRecipeCard
          v-for="meal in data.items"
          :key="meal.id"
          :title="meal.name"
          :image="meal.image"
          :category="meal.category"
          :area="meal.area"
          :tags="meal.tags"
          :description="meal.instructionsPreview"
          :to="`/apis/meals/${meal.id}`"
        />
      </div>
    </div>
  </div>
</template>
