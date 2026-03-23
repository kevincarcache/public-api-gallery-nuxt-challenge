<template>
  <v-app-bar color="background" flat border="b" height="92">
    <v-container class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between ga-3">
      <div>
        <NuxtLink class="text-h6 font-weight-bold text-high-emphasis" to="/">
          Public API Gallery
        </NuxtLink>
        <div class="text-body-2 text-medium-emphasis">
          10 real-data demos built as one Nuxt product.
        </div>
      </div>

      <div class="d-flex align-center ga-2 flex-wrap justify-start justify-sm-end">
        <v-chip color="surface-light" variant="tonal" label size="small">Nuxt 4</v-chip>
        <v-chip color="surface-light" variant="tonal" label size="small">TypeScript</v-chip>
      </div>
    </v-container>
  </v-app-bar>
</template>
