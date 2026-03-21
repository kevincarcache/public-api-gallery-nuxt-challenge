<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-end justify-between gap-3">
    <div>
      <p v-if="props.subtitle" class="text-xs uppercase tracking-[0.3em] text-slate-500">
        {{ props.subtitle }}
      </p>
      <h2 class="text-2xl font-semibold text-white">{{ props.title }}</h2>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
