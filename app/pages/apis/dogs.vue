<script setup lang="ts">
import type { DogBreedOption, DogImageResult } from '~/shared/types/dogs'

useSeoMeta({
  title: 'Dog API | Catalogo de APIs Publicas',
  description: 'Selecciona una raza, dispara peticiones encadenadas y refresca imagenes reales desde una API publica.'
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
      <CommonSectionHeader title="Dog API" subtitle="Selector de raza" />
      <p class="text-body-2 text-medium-emphasis">
        Este caso demuestra un flujo corto pero muy util: obtener un listado base, seleccionar una raza y regenerar imagenes desde una segunda fuente conectada.
      </p>
    </div>

    <CommonFilterBar>
      <v-select
        v-model="selectedBreed"
        :items="breeds"
        item-title="label"
        item-value="value"
        hide-details
        label="Raza"
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
        Nueva imagen
      </v-btn>
    </CommonFilterBar>

    <CommonErrorState
      v-if="breedsError"
      title="No fue posible cargar las razas"
      message="Prueba recargando el listado de razas."
      @retry="refreshBreeds"
    />

    <div v-else-if="breedsPending && !breeds.length">
      <CommonLoadingGrid :count="1" />
    </div>

    <CommonEmptyState
      v-else-if="!breeds.length"
      title="No hay razas disponibles"
      message="La Dog API no devolvio razas en este momento."
    />

    <CommonErrorState
      v-else-if="imageError"
      title="No fue posible cargar la imagen"
      message="Prueba otra raza o solicita una imagen nueva."
      @retry="refreshImage"
    />

    <v-card
      v-else
      color="surface"
      class="pa-4"
    >
      <v-sheet
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
          Selecciona una raza para ver una imagen.
        </div>
      </v-sheet>
    </v-card>

    <SectionsIntegrationNote
      api-name="Dog API"
      summary="La pagina separa la carga de razas y la carga de imagenes en dos consultas distintas, coordinadas desde el cliente pero encapsuladas en endpoints internos para simplificar la UI."
      :bullets="[
        'Primero se obtiene el catalogo de razas y luego se dispara la peticion de imagen segun la seleccion actual.',
        'El flujo muestra como manejar dependencias entre fetches sin complicar la interfaz.',
        'El valor de producto esta en hacer visible una integracion simple pero bien orquestada.'
      ]"
    />
  </v-container>
</template>
