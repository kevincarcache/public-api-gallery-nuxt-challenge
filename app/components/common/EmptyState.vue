<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    actionLabel?: string
    actionTo?: string
  }>(),
  {
    title: 'No results yet',
    message: 'Try adjusting your filters or search terms.',
    actionLabel: 'Back to home',
    actionTo: '/'
  }
)
</script>

<template>
  <div class="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-5">
    <h3 class="text-base font-semibold text-white">{{ props.title }}</h3>
    <p class="mt-2 text-sm text-slate-300">{{ props.message }}</p>
    <NuxtLink
      class="mt-4 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
      :to="props.actionTo"
    >
      {{ props.actionLabel }}
    </NuxtLink>
  </div>
</template>
