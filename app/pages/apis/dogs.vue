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
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Dog API" subtitle="Breed Picker" />
      <p class="text-body-2 text-medium-emphasis">
        Select a breed and regenerate a new image whenever you want a different pup on screen.
      </p>
    </div>

    <CommonFilterBar>
      <v-select
        v-model="selectedBreed"
        :items="breeds"
        item-title="label"
        item-value="value"
        hide-details
        label="Breed"
        variant="outlined"
        density="comfortable"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-image-refresh"
        variant="tonal"
        :disabled="!selectedBreed || imagePending"
        @click="refreshImage"
      >
        New image
      </v-btn>
    </CommonFilterBar>

    <CommonErrorState
      v-if="breedsError"
      title="Unable to load breeds"
      message="Try refreshing the breed list."
      @retry="refreshBreeds"
    />

    <div v-else-if="breedsPending && !breeds.length">
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

    <v-card
      v-else
      color="surface"
      rounded="xl"
      class="pa-4"
    >
      <v-sheet
        rounded="xl"
        color="surface-bright"
        class="d-flex align-center justify-center pa-4"
        min-height="420"
      >
        <v-skeleton-loader
          v-if="imagePending && !dogImage?.image"
          class="w-100"
          type="image"
        />
        <v-img
          v-else-if="dogImage?.image"
          :src="dogImage.image"
          :alt="selectedBreed"
          max-height="520"
          contain
        />
        <div v-else class="text-body-2 text-medium-emphasis">
          Choose a breed to see a dog image.
        </div>
      </v-sheet>
    </v-card>
  </v-container>
</template>
