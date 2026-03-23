<script setup lang="ts">
import type { PokemonStat } from '~/shared/types/pokemon'

const props = defineProps<{
  id: number
  name: string
  image?: string | null
  types: string[]
  stats: PokemonStat[]
  to: string
}>()

const typeColors: Record<string, string> = {
  normal: '#b9b38f',
  fire: '#f59a23',
  water: '#5ea7ff',
  electric: '#f0c53a',
  grass: '#34d67b',
  ice: '#7ad7f0',
  fighting: '#d86f55',
  poison: '#a86fe4',
  ground: '#cb9e62',
  flying: '#7f9cff',
  psychic: '#f36ca8',
  bug: '#35d97d',
  rock: '#b7a46c',
  ghost: '#7d6af0',
  dragon: '#566ef2',
  dark: '#6d5b4d',
  steel: '#8aa3b4',
  fairy: '#f3a6db'
}

const statValue = (label: string) => {
  return props.stats.find((stat) => stat.label === label)?.value ?? 0
}

const hp = computed(() => statValue('hp'))
const attack = computed(() => statValue('attack'))
const defense = computed(() => statValue('defense'))
const speed = computed(() => statValue('speed'))
const primaryType = computed(() => props.types[0] ?? 'normal')
const accentColor = computed(() => typeColors[primaryType.value] ?? typeColors.normal)
const formattedName = computed(() => {
  return props.name.length ? `${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}` : 'Pokemon'
})
</script>

<template>
  <NuxtLink :to="props.to" class="d-block h-100 text-decoration-none">
    <v-card
      color="white"
      class="h-100 d-flex flex-column pokemon-card"
      hover
    >
      <div class="pokemon-card__hero" :style="{ '--pokemon-accent': accentColor }">
        <div class="pokemon-card__bubble" />

        <v-chip
          color="white"
          class="pokemon-card__hp"
          size="small"
          variant="elevated"
        >
          <span class="text-caption font-weight-bold">HP {{ hp }}</span>
        </v-chip>

        <div class="pokemon-card__art">
          <v-img
            v-if="props.image"
            :src="props.image"
            :alt="formattedName"
            contain
            class="pokemon-card__image"
          />
          <div v-else class="pokemon-card__image d-flex align-center justify-center text-body-2 text-medium-emphasis">
            Sin imagen
          </div>
        </div>
      </div>

      <v-card-text class="d-flex flex-column align-center text-center ga-4 px-4 pb-5 pt-3">
        <div class="text-h5 font-weight-bold text-black pokemon-card__name">
          {{ formattedName }}
        </div>

        <v-chip
          :style="{ backgroundColor: accentColor, color: '#ffffff' }"
          size="small"
          class="pokemon-card__type-chip"
        >
          {{ primaryType }}
        </v-chip>

        <div class="pokemon-card__stats">
          <div class="pokemon-card__stat">
            <div class="text-h6 font-weight-bold text-black">{{ attack }}</div>
            <div class="text-body-2 pokemon-card__stat-label">ATK</div>
          </div>
          <div class="pokemon-card__stat">
            <div class="text-h6 font-weight-bold text-black">{{ defense }}</div>
            <div class="text-body-2 pokemon-card__stat-label">DEF</div>
          </div>
          <div class="pokemon-card__stat">
            <div class="text-h6 font-weight-bold text-black">{{ speed }}</div>
            <div class="text-body-2 pokemon-card__stat-label">SPD</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>
</template>

<style scoped>
.pokemon-card {
  overflow: hidden;
  min-height: 410px;
}

.pokemon-card__hero {
  position: relative;
  padding: 18px 18px 0;
  min-height: 235px;
}

.pokemon-card__bubble {
  position: absolute;
  inset: 0 0 auto;
  height: 190px;
  background: var(--pokemon-accent);
  border-bottom-left-radius: 50% 90px;
  border-bottom-right-radius: 50% 90px;
}

.pokemon-card__hp {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 2;
}

.pokemon-card__art {
  position: relative;
  z-index: 1;
  padding-top: 26px;
}

.pokemon-card__image {
  height: 200px;
}

.pokemon-card__name {
  line-height: 1.15;
}

.pokemon-card__type-chip {
  min-width: 66px;
  justify-content: center;
  text-transform: lowercase;
  font-weight: 700;
}

.pokemon-card__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
}

.pokemon-card__stat {
  min-width: 0;
}

.pokemon-card__stat-label {
  color: rgba(17, 24, 39, 0.8);
  font-weight: 600;
}
</style>
