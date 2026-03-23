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
  <v-alert
    border="start"
    color="error"
    variant="tonal"
    rounded="xl"
    :title="props.title"
    :text="props.message"
  >
    <v-btn
      v-if="props.showRetry"
      type="button"
      color="error"
      variant="outlined"
      @click="emit('retry')"
    >
      {{ props.actionLabel }}
    </v-btn>
  </v-alert>
</template>
