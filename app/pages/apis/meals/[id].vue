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
  <div class="space-y-6">
    <NuxtLink class="text-sm text-slate-400 hover:text-white" to="/apis/meals">
      Back to recipes
    </NuxtLink>

    <CommonSectionHeader title="Recipe Detail" subtitle="TheMealDB" />

    <div v-if="pending" class="h-72 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/40" />

    <CommonErrorState
      v-else-if="error || !data"
      title="Recipe not available"
      message="We could not load this recipe. Try opening another one."
      @retry="refresh"
    />

    <div v-else class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <div class="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <img
            v-if="data.image"
            :src="data.image"
            :alt="data.name"
            class="h-full min-h-72 w-full object-cover"
          />
          <div v-else class="flex min-h-72 items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
            No image
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <div class="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span>{{ data.category }}</span>
              <span>{{ data.area }}</span>
            </div>
            <h1 class="mt-2 text-3xl font-semibold text-white">{{ data.name }}</h1>
          </div>

          <div v-if="data.tags.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in data.tags"
              :key="tag"
              class="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-300"
            >
              {{ tag }}
            </span>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <a
              v-if="data.videoUrl"
              :href="data.videoUrl"
              target="_blank"
              rel="noreferrer"
              class="rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
            >
              Watch video
            </a>
            <a
              v-if="data.sourceUrl"
              :href="data.sourceUrl"
              target="_blank"
              rel="noreferrer"
              class="rounded-2xl border border-slate-800 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
            >
              Open source
            </a>
          </div>

          <div class="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
            <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Ingredients</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div
                v-for="ingredient in data.ingredients"
                :key="`${ingredient.name}-${ingredient.measure}`"
                class="rounded-2xl border border-slate-800 px-4 py-3"
              >
                <p class="text-sm font-medium text-slate-100">{{ ingredient.name }}</p>
                <p class="text-xs uppercase tracking-[0.22em] text-slate-500">{{ ingredient.measure }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Instructions</p>
        <ol class="mt-4 space-y-3 text-sm text-slate-300">
          <li
            v-for="(step, index) in data.instructions"
            :key="`${index}-${step}`"
            class="rounded-2xl border border-slate-800 px-4 py-4"
          >
            <span class="mr-3 text-xs uppercase tracking-[0.22em] text-amber-300">Step {{ index + 1 }}</span>
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
