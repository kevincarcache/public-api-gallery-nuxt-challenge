<script setup lang="ts">
import type { RickMortyCharacter } from '~/shared/types/rick-morty'

const route = useRoute()
const characterId = computed(() => String(route.params.id ?? ''))

const { data, pending, error, refresh } = useSafeFetch<RickMortyCharacter>(
  computed(() => `/api/rick-morty/${characterId.value}`),
  { defaultValue: null }
)

useSeoMeta({
  title: computed(() => `Rick and Morty | ${data.value?.name ?? characterId.value}`),
  description: computed(() =>
    data.value
      ? `Profile details for ${data.value.name}.`
      : 'Rick and Morty character profile.'
  )
})
</script>

<template>
  <div class="space-y-6">
    <NuxtLink class="text-sm text-slate-400 hover:text-white" to="/apis/rick-morty">
      Back to explorer
    </NuxtLink>

    <CommonSectionHeader title="Character Detail" subtitle="Rick and Morty" />

    <div v-if="pending" class="h-64 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/40" />

    <CommonErrorState
      v-else-if="error || !data"
      title="Character not available"
      message="We could not load this character. Try again."
      @retry="refresh"
    />

    <div v-else class="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
      <div class="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <img v-if="data.image" :src="data.image" :alt="data.name" class="h-full w-full object-cover" />
        <div v-else class="flex h-64 items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
          No image
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">ID {{ data.id }}</p>
          <h1 class="text-3xl font-semibold text-white">{{ data.name }}</h1>
        </div>

        <div class="flex flex-wrap gap-2 text-xs text-slate-300">
          <span class="rounded-full border border-slate-800 px-3 py-1 capitalize">{{ data.status }}</span>
          <span class="rounded-full border border-slate-800 px-3 py-1 capitalize">{{ data.species }}</span>
          <span class="rounded-full border border-slate-800 px-3 py-1 capitalize">{{ data.gender }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Origin</p>
            <p class="text-sm text-slate-100">{{ data.origin }}</p>
          </div>
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Location</p>
            <p class="text-sm text-slate-100">{{ data.location }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-800 px-4 py-3">
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Episodes</p>
          <p class="text-lg text-slate-100">{{ data.episodeCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
