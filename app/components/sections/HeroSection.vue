<script setup lang="ts">
const highlights = [
  {
    title: 'Origen',
    body: 'De una idea central a un catalogo navegable con criterio de producto.',
    icon: 'mdi-arrow-top-right'
  },
  {
    title: 'Velocidad',
    body: 'Resuelto en 3 dias sin sacrificar arquitectura, estados ni lectura.',
    icon: 'mdi-timer-outline'
  },
  {
    title: 'Datos reales',
    body: 'Cada caso consume fuentes publicas y data vigente en el momento de consulta.',
    icon: 'mdi-database-outline'
  },
  {
    title: 'IA asistida',
    body: 'La implementacion usa IA como soporte de ejecucion, no como sustituto del criterio.',
    icon: 'mdi-brain'
  }
] as const

defineProps<{
  total: number
}>()
</script>

<template>
  <v-row class="hero-layout">
    <v-col cols="12" lg="6">
      <v-sheet
        color="surface"
        border
        rounded="lg"
        class="pa-6 pa-sm-8 editorial-panel hero-panel hero-panel--main position-relative overflow-hidden"
      >
        <div class="hero-panel__visual" />
        <div class="position-relative" style="z-index: 1;">
          <div class="text-overline text-medium-emphasis">Portafolio tecnico en Nuxt</div>
          <div class="text-h3 text-sm-h2 font-weight-bold text-high-emphasis mt-3">
            Catalogo de APIs publicas construido desde cero en 3 dias.
          </div>
          <div class="d-flex flex-column ga-3 mt-5">
            <div class="d-flex align-center ga-3 text-body-1">
              <v-icon color="secondary" icon="mdi-calendar-blank-outline" />
              <span>Construido en 3 dias con {{ total }} integraciones reales.</span>
            </div>
            <div class="d-flex align-center ga-3 text-body-1">
              <v-icon color="secondary" icon="mdi-database-outline" />
              <span>Datos reales de fuentes publicas, mapeados para una UX coherente.</span>
            </div>
            <div class="d-flex align-center ga-3 text-body-1">
              <v-icon color="secondary" icon="mdi-robot-outline" />
              <span>Uso practico de IA como asistencia para acelerar desarrollo y ejecucion.</span>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="12" lg="6">
      <v-row class="hero-highlights h-100">
        <v-col v-for="highlight in highlights" :key="highlight.title" cols="12" sm="6">
          <v-sheet color="surface" border rounded="lg" class="pa-5 editorial-panel hero-panel hero-panel--stat h-100">
            <div class="hero-stat__icon mb-5">
              <v-icon :icon="highlight.icon" color="secondary" />
            </div>
            <div class="text-h6 font-weight-bold">{{ highlight.title }}</div>
            <div class="text-body-2 text-medium-emphasis mt-3">
              {{ highlight.body }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
