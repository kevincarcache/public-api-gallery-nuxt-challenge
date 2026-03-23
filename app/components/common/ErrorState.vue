<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    actionLabel?: string
    showRetry?: boolean
  }>(),
  {
    title: 'Ocurrio un problema',
    message: 'No fue posible cargar estos datos. Intenta nuevamente.',
    actionLabel: 'Reintentar',
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
