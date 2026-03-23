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
    imageContain?: boolean
    hideMedia?: boolean
    statsLayout?: 'featured' | 'inline'
  }>(),
  {
    badges: () => [],
    stats: () => [],
    imageContain: false,
    hideMedia: false,
    statsLayout: 'featured'
  }
)

const displayStats = computed(() => props.stats.slice(0, 4))
const primaryStat = computed(() => displayStats.value[0])
const secondaryStats = computed(() => displayStats.value.slice(1))
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="d-block h-100"
  >
    <v-card
      color="surface"
      border
      class="h-100 d-flex flex-column editorial-panel character-card"
      :class="{ 'character-card--compact': props.hideMedia }"
      hover
    >
      <div v-if="!props.hideMedia" class="character-card__profile-top pa-4">
        <div class="d-flex justify-space-between align-start">
          <div v-if="props.badges.length" class="character-card__badge-wrap">
            <v-chip size="x-small" color="primary" variant="flat">
              {{ props.badges[0] }}
            </v-chip>
          </div>
          <div v-else />
        </div>

        <div class="d-flex justify-center mt-2">
          <v-avatar size="116" class="character-card__avatar" color="surface-light">
            <v-img
              v-if="props.image"
              :src="props.image"
              :alt="props.title"
              :cover="!props.imageContain"
              :contain="props.imageContain"
              class="character-card__image"
              :class="{ 'character-card__image--contain': props.imageContain }"
            />
            <div v-else class="d-flex align-center justify-center fill-height text-overline text-medium-emphasis">
              S/D
            </div>
          </v-avatar>
        </div>
      </div>

      <v-card-text
        class="d-flex flex-column ga-4 fill-height pa-4"
        :class="{ 'align-center text-center': !props.hideMedia }"
      >
        <div class="d-flex flex-column ga-2" :class="{ 'align-center': !props.hideMedia }">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis character-card__title">{{ props.title }}</div>
          <div
            v-if="props.subtitle"
            class="text-body-2 text-medium-emphasis character-card__subtitle"
            :class="{ 'character-card__subtitle--profile': !props.hideMedia }"
          >
            {{ props.subtitle }}
          </div>
          <div v-if="props.description" class="text-body-2 text-medium-emphasis character-card__description">
            {{ props.description }}
          </div>
        </div>

        <div v-if="props.badges.length > 1" class="d-flex flex-wrap ga-2" :class="{ 'justify-center': !props.hideMedia }">
          <v-chip
            v-for="badge in props.badges.slice(props.hideMedia ? 0 : 1)"
            :key="badge"
            size="small"
            variant="outlined"
          >
            {{ badge }}
          </v-chip>
        </div>

        <div
          v-if="displayStats.length"
          class="mt-auto w-100"
        >
          <div v-if="props.statsLayout === 'inline'" class="character-card__inline-stats">
            <div
              v-for="stat in displayStats"
              :key="stat.label"
              class="character-card__inline-row"
            >
              <span class="text-body-2 text-medium-emphasis character-card__inline-label">{{ stat.label }}</span>
              <span class="text-body-2 text-high-emphasis font-weight-medium character-card__inline-value">{{ stat.value }}</span>
            </div>
          </div>

          <div
            v-else
            class="d-flex flex-column ga-3"
            :class="{ 'character-card__profile-stats': !props.hideMedia }"
          >
          <v-sheet
            v-if="primaryStat"
            color="surface-light"
            border
            class="pa-3 character-card__primary-stat"
          >
            <div class="text-overline text-medium-emphasis character-card__stat-label">{{ primaryStat.label }}</div>
            <div class="text-h6 text-high-emphasis font-weight-bold character-card__primary-value">
              {{ primaryStat.value }}
            </div>
          </v-sheet>

          <div v-if="secondaryStats.length" class="character-card__meta-list">
            <div
              v-for="stat in secondaryStats"
              :key="stat.label"
              class="character-card__meta-item"
            >
              <span class="text-caption text-medium-emphasis character-card__meta-label">{{ stat.label }}</span>
              <span class="text-body-2 text-high-emphasis font-weight-medium character-card__meta-value">
                {{ stat.value }}
              </span>
            </div>
          </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>

  <div
  v-else
  class="h-100"
  >
    <v-card
      color="surface"
      border
      class="h-100 d-flex flex-column editorial-panel character-card"
      :class="{ 'character-card--compact': props.hideMedia }"
    >
      <div v-if="!props.hideMedia" class="character-card__profile-top pa-4">
        <div class="d-flex justify-space-between align-start">
          <div v-if="props.badges.length" class="character-card__badge-wrap">
            <v-chip size="x-small" color="primary" variant="flat">
              {{ props.badges[0] }}
            </v-chip>
          </div>
          <div v-else />
        </div>

        <div class="d-flex justify-center mt-2">
          <v-avatar size="116" class="character-card__avatar" color="surface-light">
            <v-img
              v-if="props.image"
              :src="props.image"
              :alt="props.title"
              :cover="!props.imageContain"
              :contain="props.imageContain"
              class="character-card__image"
              :class="{ 'character-card__image--contain': props.imageContain }"
            />
            <div v-else class="d-flex align-center justify-center fill-height text-overline text-medium-emphasis">
              S/D
            </div>
          </v-avatar>
        </div>
      </div>

      <v-card-text
        class="d-flex flex-column ga-4 fill-height pa-4"
        :class="{ 'align-center text-center': !props.hideMedia }"
      >
        <div class="d-flex flex-column ga-2" :class="{ 'align-center': !props.hideMedia }">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis character-card__title">{{ props.title }}</div>
          <div
            v-if="props.subtitle"
            class="text-body-2 text-medium-emphasis character-card__subtitle"
            :class="{ 'character-card__subtitle--profile': !props.hideMedia }"
          >
            {{ props.subtitle }}
          </div>
          <div v-if="props.description" class="text-body-2 text-medium-emphasis character-card__description">
            {{ props.description }}
          </div>
        </div>

        <div v-if="props.badges.length > 1" class="d-flex flex-wrap ga-2" :class="{ 'justify-center': !props.hideMedia }">
          <v-chip
            v-for="badge in props.badges.slice(props.hideMedia ? 0 : 1)"
            :key="badge"
            size="small"
            variant="outlined"
          >
            {{ badge }}
          </v-chip>
        </div>

        <div
          v-if="displayStats.length"
          class="mt-auto w-100"
        >
          <div v-if="props.statsLayout === 'inline'" class="character-card__inline-stats">
            <div
              v-for="stat in displayStats"
              :key="stat.label"
              class="character-card__inline-row"
            >
              <span class="text-body-2 text-medium-emphasis character-card__inline-label">{{ stat.label }}</span>
              <span class="text-body-2 text-high-emphasis font-weight-medium character-card__inline-value">{{ stat.value }}</span>
            </div>
          </div>

          <div
            v-else
            class="d-flex flex-column ga-3"
            :class="{ 'character-card__profile-stats': !props.hideMedia }"
          >
          <v-sheet
            v-if="primaryStat"
            color="surface-light"
            border
            class="pa-3 character-card__primary-stat"
          >
            <div class="text-overline text-medium-emphasis character-card__stat-label">{{ primaryStat.label }}</div>
            <div class="text-h6 text-high-emphasis font-weight-bold character-card__primary-value">
              {{ primaryStat.value }}
            </div>
          </v-sheet>

          <div v-if="secondaryStats.length" class="character-card__meta-list">
            <div
              v-for="stat in secondaryStats"
              :key="stat.label"
              class="character-card__meta-item"
            >
              <span class="text-caption text-medium-emphasis character-card__meta-label">{{ stat.label }}</span>
              <span class="text-body-2 text-high-emphasis font-weight-medium character-card__meta-value">
                {{ stat.value }}
              </span>
            </div>
          </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.character-card {
  min-height: 410px;
}

.character-card--compact {
  min-height: 312px;
}

.character-card__image--contain :deep(.v-img__img),
.character-card__image--contain :deep(.v-img__picture) {
  object-fit: contain;
  padding: 12px;
}

.character-card__profile-top {
  background: linear-gradient(180deg, rgba(var(--v-theme-primary), 0.08), rgba(var(--v-theme-primary), 0));
}

.character-card__avatar {
  border: 3px solid rgba(var(--v-theme-primary), 0.35);
  box-shadow: 0 12px 28px rgba(8, 15, 28, 0.18);
}

.character-card__title,
.character-card__subtitle,
.character-card__description,
.character-card__primary-value,
.character-card__meta-value {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.character-card__title {
  -webkit-line-clamp: 2;
}

.character-card__subtitle {
  -webkit-line-clamp: 2;
}

.character-card__subtitle--profile {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.character-card__description {
  min-height: 3rem;
  -webkit-line-clamp: 3;
}

.character-card__primary-stat {
  min-height: 86px;
}

.character-card__profile-stats .character-card__primary-stat {
  text-align: center;
}

.character-card__stat-label {
  letter-spacing: 0.06em;
}

.character-card__primary-value {
  margin-top: 4px;
  -webkit-line-clamp: 2;
}

.character-card__meta-list {
  display: grid;
  gap: 10px;
}

.character-card__inline-stats {
  display: grid;
  gap: 10px;
}

.character-card__inline-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
  padding-top: 10px;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  text-align: left;
}

.character-card__inline-label,
.character-card__inline-value {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.character-card__inline-label {
  -webkit-line-clamp: 1;
}

.character-card__inline-value {
  text-align: right;
  word-break: break-word;
  -webkit-line-clamp: 2;
}

.character-card__profile-stats .character-card__meta-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  text-align: left;
}

.character-card__meta-item {
  display: grid;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.character-card__meta-label {
  letter-spacing: 0.04em;
}

.character-card__meta-value {
  line-height: 1.35;
  word-break: break-word;
  -webkit-line-clamp: 2;
}
</style>
