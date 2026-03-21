<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <section class="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-8 shadow-[0_0_80px_rgba(15,23,42,0.45)]">
    <div class="space-y-4">
      <p class="text-xs uppercase tracking-[0.3em] text-slate-400">
        Public API Gallery
      </p>
      <h1 class="text-3xl font-semibold text-white sm:text-4xl">
        Explore {{ total }} API demos in one cohesive product.
      </h1>
      <p class="max-w-2xl text-slate-300">
        This gallery curates real public APIs into a consistent, portfolio-ready experience with shared UX and reusable patterns.
      </p>
    </div>
  </section>
</template>
