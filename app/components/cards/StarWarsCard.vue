<script setup lang="ts">
import type { StarWarsResource, StarWarsStat } from '~/shared/types/star-wars'

const props = defineProps<{
  title: string
  subtitle: string
  description: string
  stats: StarWarsStat[]
  resource: StarWarsResource
}>()

const resourceConfig: Record<StarWarsResource, { label: string; color: string }> = {
  people: { label: 'Personas', color: '#4bd8a8' },
  planets: { label: 'Planetas', color: '#54a8ff' },
  starships: { label: 'Naves', color: '#bb7cff' }
}

const accent = computed(() => resourceConfig[props.resource])
const displayStats = computed(() => props.stats.slice(0, 4))
</script>

<template>
  <v-card class="h-100 star-wars-card editorial-panel" color="surface">
    <div class="star-wars-card__frame" :style="{ '--sw-accent': accent.color }">
      <div class="star-wars-card__cap" />

      <v-card-text class="pa-4 d-flex flex-column fill-height">
        <div class="d-flex justify-space-between align-start ga-3 mb-3">
          <v-chip size="x-small" variant="flat" class="star-wars-card__chip">
            {{ accent.label }}
          </v-chip>
          <div class="text-caption text-medium-emphasis">SWAPI live</div>
        </div>

        <div class="d-flex flex-column ga-2">
          <div class="text-h6 font-weight-bold text-high-emphasis star-wars-card__title">
            {{ props.title }}
          </div>
          <div class="text-caption text-medium-emphasis star-wars-card__subtitle">
            {{ props.subtitle }}
          </div>
          <div class="text-body-2 text-medium-emphasis star-wars-card__description">
            {{ props.description }}
          </div>
        </div>

        <div class="star-wars-card__divider my-4" />

        <div class="text-overline font-weight-bold star-wars-card__section-title">
          Atributos principales
        </div>

        <div class="star-wars-card__stats mt-2">
          <div v-for="stat in displayStats" :key="stat.label" class="star-wars-card__stat-row">
            <span class="text-body-2 text-medium-emphasis star-wars-card__stat-label">{{ stat.label }}</span>
            <span class="text-body-2 text-high-emphasis font-weight-medium star-wars-card__stat-value">{{ stat.value }}</span>
          </div>
        </div>

        <div class="star-wars-card__footer mt-auto pt-4">
          <div class="star-wars-card__footer-item">
            <v-icon icon="mdi-star-four-points-outline" size="18" />
            <div>
              <div class="text-h6 font-weight-bold">{{ displayStats.length }}</div>
              <div class="text-caption">atributos</div>
            </div>
          </div>
          <div class="star-wars-card__footer-item">
            <v-icon icon="mdi-radar" size="18" />
            <div>
              <div class="text-h6 font-weight-bold">1</div>
              <div class="text-caption">fuente</div>
            </div>
          </div>
          <div class="star-wars-card__footer-item">
            <v-icon icon="mdi-sync" size="18" />
            <div>
              <div class="text-h6 font-weight-bold">live</div>
              <div class="text-caption">estado</div>
            </div>
          </div>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<style scoped>
.star-wars-card {
  min-height: 420px;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.06), transparent 38%),
    linear-gradient(180deg, rgba(10, 18, 32, 0.98), rgba(9, 15, 26, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.star-wars-card__frame {
  position: relative;
  height: 100%;
  border: 1px solid color-mix(in srgb, var(--sw-accent) 60%, transparent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 0 24px color-mix(in srgb, var(--sw-accent) 18%, transparent);
}

.star-wars-card__cap {
  position: absolute;
  top: 0;
  left: 50%;
  width: 132px;
  height: 12px;
  transform: translateX(-50%);
  background: color-mix(in srgb, var(--sw-accent) 92%, white 8%);
  clip-path: polygon(8% 0, 92% 0, 84% 100%, 16% 100%);
}

.star-wars-card__chip {
  background: color-mix(in srgb, var(--sw-accent) 22%, rgba(255, 255, 255, 0.04));
  color: white;
}

.star-wars-card__title,
.star-wars-card__description,
.star-wars-card__stat-label,
.star-wars-card__stat-value {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.star-wars-card__title {
  line-height: 1.05;
  -webkit-line-clamp: 2;
}

.star-wars-card__subtitle {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.star-wars-card__description {
  min-height: 4.2rem;
  -webkit-line-clamp: 3;
}

.star-wars-card__divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--sw-accent) 45%, transparent), transparent);
}

.star-wars-card__section-title,
.star-wars-card__footer-item .v-icon {
  color: color-mix(in srgb, var(--sw-accent) 86%, white 14%);
}

.star-wars-card__stats {
  display: grid;
  gap: 10px;
}

.star-wars-card__stat-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
}

.star-wars-card__stat-label {
  -webkit-line-clamp: 1;
}

.star-wars-card__stat-value {
  text-align: right;
  word-break: break-word;
  -webkit-line-clamp: 2;
}

.star-wars-card__footer {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.star-wars-card__footer-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
