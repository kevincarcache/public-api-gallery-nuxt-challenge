<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [number]
}>()

</script>

<template>
  <div class="d-flex flex-column align-center ga-3">
    <div class="text-body-2 text-medium-emphasis">Pagina {{ page }} de {{ totalPages }}</div>
    <v-pagination
      :model-value="page"
      :length="totalPages"
      :total-visible="$vuetify.display.smAndDown ? 3 : 5"
      @update:model-value="emit('update:page', $event)"
    />
  </div>
</template>
