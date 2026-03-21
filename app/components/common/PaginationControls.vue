<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [number]
}>()

const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < props.totalPages)

const goPrev = () => {
  if (canPrev.value) {
    emit('update:page', props.page - 1)
  }
}

const goNext = () => {
  if (canNext.value) {
    emit('update:page', props.page + 1)
  }
}
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <button
      class="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="!canPrev"
      type="button"
      @click="goPrev"
    >
      Previous
    </button>

    <span class="text-sm text-slate-400">Page {{ page }} of {{ totalPages }}</span>

    <button
      class="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="!canNext"
      type="button"
      @click="goNext"
    >
      Next
    </button>
  </div>
</template>
