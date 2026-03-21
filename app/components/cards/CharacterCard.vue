<script setup lang="ts">
type CardStat = {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    image?: string | null
    badges?: string[]
    stats?: CardStat[]
    description?: string
    to?: string
  }>(),
  {
    badges: () => [],
    stats: () => []
  }
)
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:border-slate-600"
  >
    <div class="flex h-44 items-center justify-center bg-slate-900">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        class="h-full w-full object-contain p-4"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
        No image
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ props.title }}</h3>
        <p v-if="props.subtitle" class="text-sm text-slate-400">{{ props.subtitle }}</p>
        <p v-if="props.description" class="mt-2 text-sm text-slate-300">
          {{ props.description }}
        </p>
      </div>

      <div v-if="props.badges.length" class="flex flex-wrap gap-2 text-xs text-slate-300">
        <span
          v-for="badge in props.badges"
          :key="badge"
          class="rounded-full border border-slate-800 px-2 py-1 capitalize"
        >
          {{ badge }}
        </span>
      </div>

      <div v-if="props.stats.length" class="mt-auto grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div v-for="stat in props.stats" :key="stat.label" class="rounded-lg border border-slate-800 px-2 py-2">
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">{{ stat.label }}</p>
          <p class="text-sm text-slate-100">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>

  <div
    v-else
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:border-slate-600"
  >
    <div class="flex h-44 items-center justify-center bg-slate-900">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        class="h-full w-full object-contain p-4"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
        No image
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ props.title }}</h3>
        <p v-if="props.subtitle" class="text-sm text-slate-400">{{ props.subtitle }}</p>
        <p v-if="props.description" class="mt-2 text-sm text-slate-300">
          {{ props.description }}
        </p>
      </div>

      <div v-if="props.badges.length" class="flex flex-wrap gap-2 text-xs text-slate-300">
        <span
          v-for="badge in props.badges"
          :key="badge"
          class="rounded-full border border-slate-800 px-2 py-1 capitalize"
        >
          {{ badge }}
        </span>
      </div>

      <div v-if="props.stats.length" class="mt-auto grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div v-for="stat in props.stats" :key="stat.label" class="rounded-lg border border-slate-800 px-2 py-2">
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">{{ stat.label }}</p>
          <p class="text-sm text-slate-100">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
