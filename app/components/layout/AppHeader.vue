<template>
  <header class="border-b border-slate-900/60 bg-slate-950/80 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <NuxtLink class="text-lg font-semibold text-white" to="/">
          Public API Gallery
        </NuxtLink>
        <p class="text-sm text-slate-400">11 real-data demos built as one Nuxt product.</p>
      </div>

      <div class="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
        <span class="rounded-full border border-slate-800 px-3 py-1">Nuxt 4</span>
        <span class="rounded-full border border-slate-800 px-3 py-1">TypeScript</span>
      </div>
    </div>
  </header>
</template>
