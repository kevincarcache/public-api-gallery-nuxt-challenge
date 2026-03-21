<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    image?: string | null
    category?: string
    area?: string
    tags?: string[]
    description?: string
    to?: string
  }>(),
  {
    tags: () => []
  }
)
</script>

<template>
  <component
    :is="props.to ? 'NuxtLink' : 'div'"
    :to="props.to"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:border-slate-600"
  >
    <div class="flex h-48 items-center justify-center bg-slate-900">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
        No image
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <span>{{ props.category || 'Uncategorized' }}</span>
          <span>{{ props.area || 'Unknown origin' }}</span>
        </div>

        <h3 class="text-lg font-semibold text-white">{{ props.title }}</h3>

        <p v-if="props.description" class="text-sm text-slate-300">
          {{ props.description }}
        </p>
      </div>

      <div v-if="props.tags.length" class="mt-auto flex flex-wrap gap-2">
        <span
          v-for="tag in props.tags.slice(0, 3)"
          :key="tag"
          class="rounded-full border border-slate-800 px-2 py-1 text-xs text-slate-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </component>
</template>
