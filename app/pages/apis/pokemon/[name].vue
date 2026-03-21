<script setup lang="ts">
import type { PokemonDetail } from '~/shared/types/pokemon'

const route = useRoute()

const pokemonName = computed(() => String(route.params.name ?? '').toLowerCase())

const { data, pending, error, refresh } = useSafeFetch<PokemonDetail>(
  computed(() => `/api/pokemon/${pokemonName.value}`),
  {
    defaultValue: null
  }
)

useSeoMeta({
  title: computed(() => `PokeAPI | ${data.value?.name ?? pokemonName.value}`),
  description: computed(() =>
    data.value
      ? `Stats and details for ${data.value.name}.`
      : 'Pokemon detail view.'
  )
})

const formatLabel = (value: string) => value.replace('-', ' ')
</script>

<template>
  <div class="space-y-6">
    <NuxtLink class="text-sm text-slate-400 hover:text-white" to="/apis/pokemon">
      Back to Pokedex
    </NuxtLink>

    <CommonSectionHeader title="Pokemon Detail" subtitle="PokeAPI" />

    <div v-if="pending" class="h-64 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/40" />

    <CommonErrorState
      v-else-if="error || !data"
      title="Pokemon not available"
      message="We could not load this Pokemon. Check the name or try again."
      @retry="refresh"
    />

    <div v-else class="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
      <div class="flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <img
          v-if="data.image"
          :src="data.image"
          :alt="data.name"
          class="h-72 w-full object-contain"
        />
        <div v-else class="text-xs uppercase tracking-[0.3em] text-slate-500">No image</div>
      </div>

      <div class="space-y-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">{{ data.id }}</p>
          <h1 class="text-3xl font-semibold text-white">{{ data.name }}</h1>
        </div>

        <div class="flex flex-wrap gap-2 text-xs text-slate-300">
          <span
            v-for="type in data.types"
            :key="type"
            class="rounded-full border border-slate-800 px-3 py-1 capitalize"
          >
            {{ type }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Height</p>
            <p class="text-lg text-slate-100">{{ data.height }}</p>
          </div>
          <div class="rounded-2xl border border-slate-800 px-4 py-3">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Weight</p>
            <p class="text-lg text-slate-100">{{ data.weight }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-800 px-4 py-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Abilities</p>
          <div class="mt-2 flex flex-wrap gap-2 text-sm text-slate-200">
            <span
              v-for="ability in data.abilities"
              :key="ability"
              class="rounded-full border border-slate-800 px-3 py-1 capitalize"
            >
              {{ formatLabel(ability) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="data" class="space-y-3">
      <h2 class="text-lg font-semibold text-white">Base stats</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="stat in data.stats"
          :key="stat.label"
          class="rounded-2xl border border-slate-800 px-4 py-3"
        >
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">{{ formatLabel(stat.label) }}</p>
          <p class="text-lg text-slate-100">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
