<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  image?: string | null
  releaseYear?: string
  director?: string
  producer?: string
  runtime?: string
  score?: string
}>()
</script>

<template>
  <v-card color="surface" border class="h-100">
    <v-img
      v-if="props.image"
      :src="props.image"
      :alt="props.title"
      cover
      height="240"
    />
    <v-sheet
      v-else
      color="surface-light"
      height="240"
      class="d-flex align-center justify-center text-overline text-medium-emphasis"
    >
      No poster
    </v-sheet>

    <v-card-text class="d-flex flex-column ga-4">
      <div class="d-flex flex-wrap ga-2">
        <v-chip size="small" variant="outlined">{{ props.releaseYear || 'Unknown year' }}</v-chip>
        <v-chip size="small" variant="outlined">{{ props.runtime || 'Unknown runtime' }}</v-chip>
        <v-chip size="small" variant="outlined">{{ props.score || 'No score' }}</v-chip>
      </div>

      <div>
        <div class="text-h5 font-weight-bold text-high-emphasis">{{ props.title }}</div>
        <p class="text-body-2 text-medium-emphasis mt-2">{{ props.description }}</p>
      </div>

      <v-row density="comfortable">
        <v-col cols="12" sm="6">
          <v-sheet color="surface-light" border rounded="lg" class="pa-3">
            <div class="text-caption text-medium-emphasis">Director</div>
            <div class="text-body-2 text-high-emphasis">{{ props.director || 'Unknown' }}</div>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet color="surface-light" border rounded="lg" class="pa-3">
            <div class="text-caption text-medium-emphasis">Producer</div>
            <div class="text-body-2 text-high-emphasis">{{ props.producer || 'Unknown' }}</div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
