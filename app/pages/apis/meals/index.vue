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
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="TheMealDB" subtitle="Recipe Search" />
      <p class="text-body-2 text-medium-emphasis">
        Search by meal name, compare visual recipe cards, and open a detail view with parsed ingredients and steps.
      </p>
    </div>

    <CommonFilterBar>
      <form class="w-100 d-flex flex-column flex-md-row ga-3" @submit.prevent="submitSearch">
        <CommonSearchBar v-model="search" placeholder="Search meals like pasta, curry, or soup" />
        <v-btn
          color="primary"
          prepend-icon="mdi-silverware-fork-knife"
          type="submit"
          variant="tonal"
        >
          Search recipes
        </v-btn>
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

    <div v-else class="d-flex flex-column ga-4">
      <div class="text-body-2 text-medium-emphasis">
        Showing {{ data.items.length }} recipes for <span class="font-weight-bold text-high-emphasis">{{ data.query }}</span>.
      </div>

      <v-row>
        <v-col v-for="meal in data.items" :key="meal.id" cols="12" sm="6" xl="4">
          <CardsRecipeCard
            :title="meal.name"
            :image="meal.image"
            :category="meal.category"
            :area="meal.area"
            :tags="meal.tags"
            :description="meal.instructionsPreview"
            :to="`/apis/meals/${meal.id}`"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
