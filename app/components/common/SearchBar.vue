<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
    <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Search</span>
    <input
      class="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
      :placeholder="props.placeholder ?? 'Search by name'"
      :value="props.modelValue"
      aria-label="Search"
      @input="onInput"
    />
  </div>
</template>
