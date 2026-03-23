<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

</script>

<template>
  <v-text-field
    :model-value="props.modelValue"
    :placeholder="props.placeholder ?? 'Search by name'"
    aria-label="Search"
    clearable
    hide-details
    prepend-inner-icon="mdi-magnify"
    bg-color="surface"
    @update:model-value="emit('update:modelValue', String($event ?? ''))"
  />
</template>
