<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  image?: string | null
  releaseYear?: string
  director?: string
  producer?: string
  runtime?: string
  score?: string
}>()
</script>

<template>
  <article class="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
    <div class="flex h-56 items-center justify-center bg-slate-900">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
        No poster
      </div>
    </div>

    <div class="space-y-4 p-5">
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <span>{{ props.releaseYear || 'Unknown year' }}</span>
          <span>{{ props.runtime || 'Unknown runtime' }}</span>
          <span>{{ props.score || 'No score' }}</span>
        </div>

        <h3 class="text-xl font-semibold text-white">{{ props.title }}</h3>
        <p class="text-sm text-slate-300">{{ props.description }}</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-slate-800 px-4 py-3">
          <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Director</p>
          <p class="text-sm text-slate-100">{{ props.director || 'Unknown' }}</p>
        </div>
        <div class="rounded-2xl border border-slate-800 px-4 py-3">
          <p class="text-[10px] uppercase tracking-[0.22em] text-slate-500">Producer</p>
          <p class="text-sm text-slate-100">{{ props.producer || 'Unknown' }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
