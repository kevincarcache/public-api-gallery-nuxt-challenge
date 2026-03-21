<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 6
  }
)
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="index in props.count"
      :key="index"
      class="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40"
    />
  </div>
</template>
