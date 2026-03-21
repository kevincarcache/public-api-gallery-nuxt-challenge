<script setup lang="ts">
import type { ApiCatalogItem } from '~/types/api-catalog'

defineProps<{
  item: ApiCatalogItem
}>()
</script>

<template>
  <NuxtLink
    :to="item.route"
    class="group flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-600 hover:bg-slate-900"
  >
    <div class="space-y-3">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-lg font-semibold text-white">
          {{ item.name }}
        </h3>
        <span class="rounded-full border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          P{{ item.priority }}
        </span>
      </div>
      <p class="text-sm text-slate-300">
        {{ item.description }}
      </p>
    </div>

    <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
      <span class="rounded-full border border-slate-800 px-2 py-1">
        {{ item.category }}
      </span>
      <span class="rounded-full border border-slate-800 px-2 py-1">
        Auth: {{ item.auth }}
      </span>
      <span class="rounded-full border border-slate-800 px-2 py-1 capitalize">
        {{ item.status }}
      </span>
    </div>
  </NuxtLink>
</template>
