<script setup lang="ts">
defineProps<{
  name: string
  email: string
  location: string
  avatar?: string | null
}>()
</script>

<template>
  <v-card color="surface" border class="h-100">
    <v-card-text class="d-flex flex-column ga-4">
      <div class="d-flex align-center ga-4">
        <v-avatar size="64" color="surface-light">
          <v-img v-if="avatar" :src="avatar" :alt="name" cover />
          <span v-else class="text-caption text-medium-emphasis">N/A</span>
        </v-avatar>

        <div class="min-w-0">
          <div class="text-h6 font-weight-bold text-high-emphasis">{{ name }}</div>
          <div class="text-body-2 text-medium-emphasis text-truncate">{{ email }}</div>
        </div>
      </div>

      <v-sheet color="surface-light" border rounded="lg" class="pa-3">
        <div class="text-caption text-medium-emphasis">Location</div>
        <div class="text-body-2 text-high-emphasis mt-1">{{ location }}</div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
