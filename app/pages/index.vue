<script setup lang="ts">
import { apiCatalog } from '~/data/api-catalog'

useSeoMeta({
  title: 'Catalogo de APIs Publicas',
  description: 'Portafolio en Nuxt con integraciones reales, UX consistente y desarrollo asistido por inteligencia artificial.'
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-7">
    <SectionsHeroSection :total="apiCatalog.length" />

    <section>
      <div class="d-flex flex-wrap align-end justify-space-between ga-3 mb-4">
        <div>
          <div class="text-overline text-medium-emphasis">Catalogo curado</div>
          <h2 class="text-h4 font-weight-bold">Demos e integraciones</h2>
        </div>
        <div class="text-body-2 text-medium-emphasis">{{ apiCatalog.length }} casos construidos</div>
      </div>

      <v-row>
        <v-col v-for="item in apiCatalog" :key="item.slug" cols="12" sm="6" lg="4">
          <CardsApiCard :item="item" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>
