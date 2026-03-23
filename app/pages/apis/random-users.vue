<script setup lang="ts">
import type { RandomUserResponse } from '~/shared/types/random-user'

useSeoMeta({
  title: 'Random User Generator | Catalogo de APIs Publicas',
  description: 'Genera lotes de usuarios reales y compara como responde la UI a cambios constantes en la data.'
})

const count = ref(12)

const userQuery = computed(() => ({
  count: count.value
}))

const {
  data,
  pending,
  error,
  refresh
} = useSafeFetch<RandomUserResponse>('/api/random-users', {
  query: userQuery,
  defaultValue: { items: [] }
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Random User Generator" subtitle="Grilla de perfiles" />
      <p class="text-body-2 text-medium-emphasis">
        Esta demo trabaja con lotes variables de personas para mostrar como cambia la interfaz cuando la fuente devuelve perfiles completamente distintos en cada carga.
      </p>
    </div>

    <CommonFilterBar>
      <v-select
        v-model="count"
        :items="[
          { title: '6 usuarios', value: 6 },
          { title: '12 usuarios', value: 12 },
          { title: '18 usuarios', value: 18 }
        ]"
        hide-details
        label="Tamano del lote"
        variant="outlined"
        density="comfortable"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-account-multiple-plus"
        variant="tonal"
        @click="refresh"
      >
        Regenerar usuarios
      </v-btn>
    </CommonFilterBar>

    <v-row v-if="pending">
      <v-col v-for="index in count" :key="index" cols="12" sm="6" md="4" lg="2">
        <v-skeleton-loader class="border random-users-skeleton" color="surface" type="image, article, actions" />
      </v-col>
    </v-row>

    <CommonErrorState
      v-else-if="error"
      title="No fue posible cargar usuarios"
      message="Prueba generando un lote nuevo."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="La API no devolvio usuarios"
      message="El lote llego vacio. Intenta nuevamente."
    />

    <v-row v-else>
      <v-col v-for="user in data.items" :key="user.id" cols="12" sm="6" md="4" lg="2">
        <CardsUserCard
          :name="user.name"
          :email="user.email"
          :location="user.location"
          :avatar="user.avatar"
          :role="user.role"
          :age="user.age"
          :nationality="user.nationality"
        />
      </v-col>
    </v-row>

    <SectionsIntegrationNote
      api-name="Random User Generator"
      summary="La pagina consume un endpoint interno que controla el tamano del lote y normaliza nombre, email, ubicacion y avatar para alimentar tarjetas consistentes aunque la fuente cambie por completo en cada request."
      :bullets="[
        'El selector de lote modifica la consulta y fuerza una nueva generacion de perfiles reales.',
        'La respuesta se mapea a un formato simple para evitar acoplar la UI a la API externa.',
        'El valor tecnico esta en manejar variabilidad constante sin romper el sistema visual.'
      ]"
    />
  </v-container>
</template>

<style scoped>
.random-users-skeleton {
  height: 430px;
}
</style>
