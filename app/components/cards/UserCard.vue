<script setup lang="ts">
defineProps<{
  name: string
  email: string
  location: string
  avatar?: string | null
  role: string
  age?: number | null
  nationality: string
}>()
</script>

<template>
  <v-card color="surface" border class="h-100 editorial-panel user-card">
    <v-card-text class="pa-3 pa-sm-4 d-flex flex-column fill-height">
      <v-sheet color="surface-light" class="user-card__portrait pa-2">
        <v-img
          v-if="avatar"
          :src="avatar"
          :alt="name"
          cover
          class="user-card__portrait-image"
        />
        <div v-else class="user-card__portrait-image d-flex align-center justify-center text-caption text-medium-emphasis">
          Sin foto
        </div>
      </v-sheet>

      <div class="d-flex flex-column ga-2 mt-4 min-w-0">
        <div class="d-flex align-center ga-2 flex-wrap">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis user-card__name">{{ name }}</div>
          <v-icon color="success" icon="mdi-check-decagram" size="18" />
        </div>

        <div class="text-body-2 text-medium-emphasis user-card__role">
          {{ role }}
        </div>

        <div class="text-caption text-medium-emphasis text-truncate user-card__email">
          {{ email }}
        </div>
      </div>

      <div class="d-flex flex-column ga-2 mt-auto pt-4 min-w-0 user-card__footer">
        <div class="d-flex align-center ga-3 text-medium-emphasis min-w-0 user-card__metrics">
          <div class="d-flex align-center ga-1">
            <v-icon icon="mdi-map-marker-outline" size="16" />
            <span class="text-caption user-card__meta">{{ nationality }}</span>
          </div>
          <div class="d-flex align-center ga-1">
            <v-icon icon="mdi-cake-variant-outline" size="16" />
            <span class="text-caption user-card__meta">{{ age ?? 'N/D' }}</span>
          </div>
        </div>

        <div class="min-w-0">
          <v-chip color="surface-light" variant="elevated" size="small" class="user-card__location">
            {{ location }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.user-card {
  min-height: 430px;
}

.user-card__portrait {
  border-radius: 22px;
}

.user-card__portrait-image {
  aspect-ratio: 1 / 1.18;
  border-radius: 18px;
  overflow: hidden;
}

.user-card__name,
.user-card__email,
.user-card__role,
.user-card__meta,
.user-card__location {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.user-card__name {
  -webkit-line-clamp: 2;
}

.user-card__role {
  min-height: 3.3rem;
  -webkit-line-clamp: 3;
}

.user-card__email {
  display: block;
}

.user-card__meta {
  -webkit-line-clamp: 1;
}

.user-card__footer {
  min-width: 0;
}

.user-card__metrics {
  flex: 1 1 auto;
  flex-wrap: wrap;
}

.user-card__location {
  display: inline-flex;
  max-width: 100%;
  -webkit-line-clamp: 2;
  white-space: normal;
}
</style>
