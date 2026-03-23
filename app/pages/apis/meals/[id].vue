<script setup lang="ts">
import type { MealDetail } from '~/shared/types/meals'

const route = useRoute()

const mealId = computed(() => String(route.params.id ?? ''))

const { data, pending, error, refresh } = useSafeFetch<MealDetail>(
  computed(() => `/api/meals/${mealId.value}`),
  {
    defaultValue: null
  }
)

useSeoMeta({
  title: computed(() => `TheMealDB | ${data.value?.name ?? 'Recipe detail'}`),
  description: computed(() =>
    data.value
      ? `Ingredients and instructions for ${data.value.name}.`
      : 'Recipe detail view.'
  )
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/meals">
        Back to recipes
      </v-btn>
    </div>

    <CommonSectionHeader title="Recipe Detail" subtitle="TheMealDB" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Recipe not available"
      message="We could not load this recipe. Try opening another one."
      @retry="refresh"
    />

    <template v-else>
      <v-row>
        <v-col cols="12" lg="7">
          <v-card color="surface" rounded="xl" class="overflow-hidden fill-height">
            <v-img
              v-if="data.image"
              :src="data.image"
              :alt="data.name"
              cover
              min-height="360"
            />
            <div v-else class="pa-16 text-center text-overline text-medium-emphasis">No image</div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="5">
          <v-card color="surface" rounded="xl" class="pa-6 d-flex flex-column ga-4">
            <div>
              <div class="d-flex flex-wrap ga-2 mb-2">
                <v-chip color="secondary" variant="outlined">{{ data.category }}</v-chip>
                <v-chip color="secondary" variant="outlined">{{ data.area }}</v-chip>
              </div>
              <h1 class="text-h4 font-weight-bold">{{ data.name }}</h1>
            </div>

            <div v-if="data.tags.length" class="d-flex flex-wrap ga-2">
              <v-chip v-for="tag in data.tags" :key="tag" color="primary" variant="outlined">
                {{ tag }}
              </v-chip>
            </div>

            <div class="d-flex flex-wrap ga-3">
              <v-btn
                v-if="data.videoUrl"
                :href="data.videoUrl"
                target="_blank"
                rel="noreferrer"
                color="primary"
                variant="tonal"
              >
                Watch video
              </v-btn>
              <v-btn
                v-if="data.sourceUrl"
                :href="data.sourceUrl"
                target="_blank"
                rel="noreferrer"
                variant="outlined"
              >
                Open source
              </v-btn>
            </div>

            <v-sheet color="surface-bright" rounded="xl" class="pa-5">
              <div class="text-overline text-medium-emphasis mb-4">Ingredients</div>
              <v-row>
                <v-col
                  v-for="ingredient in data.ingredients"
                  :key="`${ingredient.name}-${ingredient.measure}`"
                  cols="12"
                  sm="6"
                >
                  <v-sheet color="surface-container-high" rounded="lg" class="pa-4">
                    <div class="text-body-1 font-weight-medium">{{ ingredient.name }}</div>
                    <div class="text-overline text-medium-emphasis">{{ ingredient.measure }}</div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>

      <v-card color="surface" rounded="xl" class="pa-6">
        <div class="text-overline text-medium-emphasis mb-4">Instructions</div>
        <v-timeline density="compact" side="end" align="start">
          <v-timeline-item
            v-for="(step, index) in data.instructions"
            :key="`${index}-${step}`"
            dot-color="primary"
            fill-dot
            size="small"
          >
            <v-card color="surface-bright" rounded="lg">
              <div class="pa-4">
                <div class="text-overline text-primary mb-1">Step {{ index + 1 }}</div>
                <div class="text-body-2">{{ step }}</div>
              </div>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </template>
  </v-container>
</template>
