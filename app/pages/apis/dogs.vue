<script setup lang="ts">
import type { DogBreedOption, DogImageResult } from '~/shared/types/dogs'

useSeoMeta({
  title: 'Dog API | Public API Gallery',
  description: 'Pick a breed and regenerate a fresh dog photo.'
})

const selectedBreed = ref('')

const {
  data: breeds,
  pending: breedsPending,
  error: breedsError,
  refresh: refreshBreeds
} = useSafeFetch<DogBreedOption[]>('/api/dogs/breeds', {
  defaultValue: []
})

watch(
  breeds,
  (items) => {
    if (!selectedBreed.value && items?.length) {
      selectedBreed.value = items[0].value
    }
  },
  { immediate: true }
)

const imageQuery = computed(() => ({
  breed: selectedBreed.value || undefined
}))

const {
  data: dogImage,
  pending: imagePending,
  error: imageError,
  refresh: refreshImage
} = useSafeFetch<DogImageResult>('/api/dogs/image', {
  query: imageQuery,
  immediate: false,
  watch: [imageQuery],
  defaultValue: null
})

watch(
  selectedBreed,
  (breed) => {
    if (breed) {
      refreshImage()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Dog API" subtitle="Breed Picker" />
      <p class="max-w-2xl text-sm text-slate-300">
        Select a breed and regenerate a new image whenever you want a different pup on screen.
      </p>
    </div>

    <CommonFilterBar>
      <select
        v-model="selectedBreed"
        class="min-w-52 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm capitalize text-slate-100"
      >
        <option value="" disabled>Select a breed</option>
        <option v-for="breed in breeds" :key="breed.value" :value="breed.value">
          {{ breed.label }}
        </option>
      </select>

      <button
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600 disabled:opacity-50"
        type="button"
        :disabled="!selectedBreed || imagePending"
        @click="refreshImage"
      >
        New image
      </button>
    </CommonFilterBar>

    <CommonErrorState
      v-if="breedsError"
      title="Unable to load breeds"
      message="Try refreshing the breed list."
      @retry="refreshBreeds"
    />

    <div v-else-if="breedsPending && !breeds.length" class="max-w-3xl">
      <CommonLoadingGrid :count="1" />
    </div>

    <CommonEmptyState
      v-else-if="!breeds.length"
      title="No breeds available"
      message="The Dog API did not return any breeds."
    />

    <CommonErrorState
      v-else-if="imageError"
      title="Unable to load dog image"
      message="Try another breed or request a fresh image."
      @retry="refreshImage"
    />

    <div
      v-else
      class="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.25)]"
    >
      <div class="flex min-h-[24rem] items-center justify-center rounded-[1.5rem] bg-white/70 p-4">
        <div
          v-if="imagePending && !dogImage?.image"
          class="h-80 w-full animate-pulse rounded-[1.25rem] bg-slate-200"
        />
        <img
          v-else-if="dogImage?.image"
          :src="dogImage.image"
          :alt="selectedBreed"
          class="max-h-[32rem] w-full rounded-[1.25rem] object-contain"
        />
        <div v-else class="text-sm text-slate-500">
          Choose a breed to see a dog image.
        </div>
      </div>
    </div>
  </div>
</template>
