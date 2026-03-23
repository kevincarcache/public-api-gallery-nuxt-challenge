<script setup lang="ts">
type CardStat = {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    image?: string | null
    badges?: string[]
    stats?: CardStat[]
    description?: string
    to?: string
  }>(),
  {
    badges: () => [],
    stats: () => []
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
        <div>
          <div class="text-h6 font-weight-bold text-high-emphasis">{{ props.title }}</div>
          <div v-if="props.subtitle" class="text-body-2 text-medium-emphasis">{{ props.subtitle }}</div>
          <div v-if="props.description" class="text-body-2 text-medium-emphasis mt-2">
            {{ props.description }}
          </div>
        </div>

        <div v-if="props.badges.length" class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="badge in props.badges"
            :key="badge"
            size="small"
            variant="outlined"
          >
            {{ badge }}
          </v-chip>
        </div>

        <v-row v-if="props.stats.length" class="mt-auto" density="comfortable">
          <v-col v-for="stat in props.stats" :key="stat.label" cols="6">
            <v-sheet color="surface-light" border rounded="lg" class="pa-3">
              <div class="text-caption text-medium-emphasis">{{ stat.label }}</div>
              <div class="text-body-2 text-high-emphasis">{{ stat.value }}</div>
            </v-sheet>
          </v-col>
        </v-row>
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
        <div>
          <div class="text-h6 font-weight-bold text-high-emphasis">{{ props.title }}</div>
          <div v-if="props.subtitle" class="text-body-2 text-medium-emphasis">{{ props.subtitle }}</div>
          <div v-if="props.description" class="text-body-2 text-medium-emphasis mt-2">
            {{ props.description }}
          </div>
        </div>

        <div v-if="props.badges.length" class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="badge in props.badges"
            :key="badge"
            size="small"
            variant="outlined"
          >
            {{ badge }}
          </v-chip>
        </div>

        <v-row v-if="props.stats.length" class="mt-auto" density="comfortable">
          <v-col v-for="stat in props.stats" :key="stat.label" cols="6">
            <v-sheet color="surface-light" border rounded="lg" class="pa-3">
              <div class="text-caption text-medium-emphasis">{{ stat.label }}</div>
              <div class="text-body-2 text-high-emphasis">{{ stat.value }}</div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
