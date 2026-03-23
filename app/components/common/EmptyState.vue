<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    actionLabel?: string
    actionTo?: string
  }>(),
  {
    title: 'Sin resultados disponibles',
    message: 'Prueba ajustando tus filtros o cambiando el termino de busqueda.',
    actionLabel: 'Volver al inicio',
    actionTo: '/'
  }
)
</script>

<template>
  <v-sheet color="surface" border class="pa-6 editorial-panel">
    <div class="text-h6 font-weight-semibold text-high-emphasis">{{ props.title }}</div>
    <p class="mt-2 text-body-2 text-medium-emphasis">{{ props.message }}</p>
    <v-btn
      class="mt-4"
      color="primary"
      variant="outlined"
      :to="props.actionTo"
    >
      {{ props.actionLabel }}
    </v-btn>
  </v-sheet>
</template>
