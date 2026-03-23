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
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="d-block h-100"
  >
    <v-card color="surface" border class="h-100 d-flex flex-column" hover>
      <v-img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        cover
        height="220"
      />
      <v-sheet
        v-else
        color="surface-light"
        height="220"
        class="d-flex align-center justify-center text-overline text-medium-emphasis"
      >
        No image
      </v-sheet>

      <v-card-text class="d-flex flex-column ga-3 fill-height">
        <div class="d-flex flex-wrap ga-2">
          <v-chip size="small" variant="outlined">{{ props.category || 'Uncategorized' }}</v-chip>
          <v-chip size="small" variant="outlined">{{ props.area || 'Unknown origin' }}</v-chip>
        </div>

        <div class="text-h6 font-weight-bold text-high-emphasis">{{ props.title }}</div>

        <div v-if="props.description" class="text-body-2 text-medium-emphasis">
          {{ props.description }}
        </div>

        <div v-if="props.tags.length" class="mt-auto d-flex flex-wrap ga-2">
          <v-chip
            v-for="tag in props.tags.slice(0, 3)"
            :key="tag"
            size="small"
            variant="outlined"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>

  <div
    v-else
    class="h-100"
  >
    <v-card color="surface" border class="h-100 d-flex flex-column">
      <v-img
        v-if="props.image"
        :src="props.image"
        :alt="props.title"
        cover
        height="220"
      />
      <v-sheet
        v-else
        color="surface-light"
        height="220"
        class="d-flex align-center justify-center text-overline text-medium-emphasis"
      >
        No image
      </v-sheet>

      <v-card-text class="d-flex flex-column ga-3 fill-height">
        <div class="d-flex flex-wrap ga-2">
          <v-chip size="small" variant="outlined">{{ props.category || 'Uncategorized' }}</v-chip>
          <v-chip size="small" variant="outlined">{{ props.area || 'Unknown origin' }}</v-chip>
        </div>

        <div class="text-h6 font-weight-bold text-high-emphasis">{{ props.title }}</div>

        <div v-if="props.description" class="text-body-2 text-medium-emphasis">
          {{ props.description }}
        </div>

        <div v-if="props.tags.length" class="mt-auto d-flex flex-wrap ga-2">
          <v-chip
            v-for="tag in props.tags.slice(0, 3)"
            :key="tag"
            size="small"
            variant="outlined"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
