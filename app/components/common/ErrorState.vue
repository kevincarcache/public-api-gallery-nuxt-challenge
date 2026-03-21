<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    actionLabel?: string
    showRetry?: boolean
  }>(),
  {
    title: 'Something went wrong',
    message: 'We could not load this data. Please try again.',
    actionLabel: 'Retry',
    showRetry: true
  }
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-6 py-5">
    <h3 class="text-base font-semibold text-rose-100">{{ props.title }}</h3>
    <p class="mt-2 text-sm text-rose-200/80">{{ props.message }}</p>
    <button
      v-if="props.showRetry"
      class="mt-4 rounded-full border border-rose-400/60 px-4 py-2 text-sm text-rose-100 transition hover:border-rose-300"
      type="button"
      @click="emit('retry')"
    >
      {{ props.actionLabel }}
    </button>
  </div>
</template>
