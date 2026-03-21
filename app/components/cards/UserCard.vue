<script setup lang="ts">
defineProps<{
  name: string
  email: string
  location: string
  avatar?: string | null
}>()
</script>

<template>
  <article class="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
    <div class="flex items-center gap-4">
      <div class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-950">
        <img
          v-if="avatar"
          :src="avatar"
          :alt="name"
          class="h-full w-full object-cover"
          loading="lazy"
        />
        <span v-else class="text-[10px] uppercase tracking-[0.2em] text-slate-500">No image</span>
      </div>

      <div class="min-w-0">
        <h3 class="text-lg font-semibold text-white">{{ name }}</h3>
        <p class="truncate text-sm text-slate-400">{{ email }}</p>
      </div>
    </div>

    <div class="mt-4 rounded-xl border border-slate-800 px-3 py-3">
      <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500">Location</p>
      <p class="mt-1 text-sm text-slate-200">{{ location }}</p>
    </div>
  </article>
</template>
