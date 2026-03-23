<script setup lang="ts">
import type { ApiCatalogItem } from '~/shared/types/api-catalog'

defineProps<{
  item: ApiCatalogItem
}>()
</script>

<template>
  <NuxtLink
    :to="item.route"
    class="d-block h-100"
  >
    <v-card color="surface" border class="h-100 d-flex flex-column" hover>
      <v-card-text class="d-flex flex-column fill-height ga-4">
        <div class="d-flex align-start justify-space-between ga-4">
          <div class="text-h6 font-weight-bold text-high-emphasis">
            {{ item.name }}
          </div>
          <v-chip color="surface-light" size="small" label>P{{ item.priority }}</v-chip>
        </div>

        <div class="text-body-2 text-medium-emphasis">
          {{ item.description }}
        </div>

        <div class="mt-auto d-flex flex-wrap ga-2">
          <v-chip size="small" variant="outlined">{{ item.category }}</v-chip>
          <v-chip size="small" variant="outlined">Auth: {{ item.auth }}</v-chip>
          <v-chip size="small" variant="outlined">{{ item.status }}</v-chip>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>
</template>
