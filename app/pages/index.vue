<script setup lang="ts">
import { apiCatalog } from '~/data/api-catalog'
</script>

<template>
  <div class="space-y-10">
    <HeroSection :total="apiCatalog.length" />

    <section class="space-y-4">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Catalog</p>
          <h2 class="text-2xl font-semibold text-white">API Demos</h2>
        </div>
        <p class="text-sm text-slate-400">{{ apiCatalog.length }} experiences</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ApiCard v-for="item in apiCatalog" :key="item.slug" :item="item" />
      </div>
    </section>
  </div>
</template>
