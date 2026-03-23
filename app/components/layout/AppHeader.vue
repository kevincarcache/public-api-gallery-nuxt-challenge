<template>
  <v-app-bar color="background" flat border="b" :height="headerHeight" class="app-header">
    <v-container class="page-shell app-header__shell">
      <div class="app-header__brand">
        <NuxtLink class="app-header__title text-high-emphasis" to="/">
          Catalogo de APIs Publicas
        </NuxtLink>
        <div class="app-header__subtitle text-body-2 text-medium-emphasis">
          Proyecto editorial en Nuxt con integraciones reales, criterio tecnico y ejecucion rapida.
        </div>
      </div>

      <div class="app-header__chips d-flex align-center ga-2 flex-wrap justify-start justify-sm-end">
        <v-chip color="success" variant="tonal" size="small" class="header-chip">Nuxt 4</v-chip>
        <v-chip color="secondary" variant="tonal" size="small" class="header-chip">TypeScript</v-chip>
        <v-chip color="warning" variant="tonal" size="small" class="header-chip">3 dias</v-chip>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const { smAndUp } = useDisplay()

const headerHeight = computed(() => (smAndUp.value ? 112 : 96))
</script>

<style scoped>
.app-header__shell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.app-header__brand {
  min-width: 0;
}

.app-header__title {
  display: block;
  font-family: "Manrope", "IBM Plex Sans", sans-serif;
  font-size: clamp(1.4rem, 4vw, 1.7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.app-header__subtitle {
  margin-top: 6px;
  max-width: 62ch;
  font-size: 0.9rem;
  line-height: 1.35;
}

@media (min-width: 600px) {
  .app-header__shell {
    flex-direction: row;
    align-items: center;
  }

  .app-header__chips {
    justify-content: flex-end;
  }
}

@media (max-width: 599px) {
  .app-header {
    height: 96px !important;
  }

  .app-header :deep(.v-toolbar__content) {
    height: 96px !important;
    padding-top: 0;
    padding-bottom: 0;
    align-items: center;
  }

  .app-header__shell {
    justify-content: center;
    gap: 8px;
  }

  .app-header__subtitle {
    display: none;
  }
}
</style>
