<script setup lang="ts">
import type { ApiCatalogItem } from '~/shared/types/api-catalog'

defineProps<{
  item: ApiCatalogItem
}>()
</script>

<template>
  <NuxtLink
    :to="item.route"
    class="d-block h-100 catalog-link"
  >
    <v-card color="surface" border rounded="lg" class="h-100 d-flex flex-column editorial-panel catalog-card" hover>
      <div class="catalog-card__media" :style="{ background: item.coverBackground }">
        <div class="catalog-card__media-grid" />
        <v-img
          :src="item.coverImage"
          :alt="item.coverAlt"
          :cover="item.coverMode !== 'contain'"
          :position="item.coverPosition ?? 'center'"
          class="catalog-card__image"
          :class="{ 'catalog-card__image--contain': item.coverMode === 'contain' }"
        />
        <div class="catalog-card__overlay" />

        <div class="catalog-card__badges">
          <v-chip size="small" color="surface" variant="elevated" class="catalog-card__chip catalog-card__chip--dark">
            API publica
          </v-chip>
        </div>
      </div>

      <v-card-text class="d-flex flex-column fill-height ga-4">
        <div class="d-flex align-start justify-space-between ga-4">
          <div>
            <div class="text-overline text-medium-emphasis">Catalogo curado</div>
            <div class="text-h6 font-weight-bold text-high-emphasis">
              {{ item.name }}
            </div>
          </div>
          <div class="text-caption text-medium-emphasis text-right">
            {{ item.category }}
          </div>
        </div>

        <div class="text-body-2 text-medium-emphasis">
          {{ item.description }}
        </div>

        <div class="text-body-2 text-medium-emphasis">
          <span class="text-overline d-block mb-1">Demo construido</span>
          <span class="text-high-emphasis font-weight-medium">{{ item.interaction }}</span>
        </div>

        <div class="mt-auto">
          <v-row density="comfortable">
            <v-col cols="4">
              <div class="text-overline text-medium-emphasis">Dominio</div>
              <div class="text-body-2">{{ item.category }}</div>
            </v-col>
            <v-col cols="4">
              <div class="text-overline text-medium-emphasis">Auth</div>
              <div class="text-body-2">{{ item.auth }}</div>
            </v-col>
            <v-col cols="4">
              <div class="text-overline text-medium-emphasis">Estado</div>
              <div class="text-body-2 text-capitalize">{{ item.status }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>
</template>
