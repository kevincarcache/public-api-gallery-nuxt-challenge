<template>
  <v-app-bar color="background" flat border="b" height="104">
    <v-container class="page-shell d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between ga-3">
      <div>
        <NuxtLink class="text-h5 font-weight-bold text-high-emphasis" to="/">
          Catalogo de APIs Publicas
        </NuxtLink>
        <div class="text-body-2 text-medium-emphasis">
          Proyecto editorial en Nuxt con integraciones reales, criterio tecnico y ejecucion rapida.
        </div>
      </div>

      <div class="d-flex align-center ga-2 flex-wrap justify-start justify-sm-end">
        <v-chip color="success" variant="tonal" size="small" class="header-chip">Nuxt 4</v-chip>
        <v-chip color="secondary" variant="tonal" size="small" class="header-chip">TypeScript</v-chip>
        <v-chip color="warning" variant="tonal" size="small" class="header-chip">3 dias</v-chip>
      </div>
    </v-container>
  </v-app-bar>
</template>
