<script setup lang="ts">
import type { MealDetail } from '~/shared/types/meals'

const route = useRoute()

const mealId = computed(() => String(route.params.id ?? ''))

const { data, pending, error, refresh } = useSafeFetch<MealDetail>(
  computed(() => `/api/meals/${mealId.value}`),
  {
    defaultValue: null
  }
)

useSeoMeta({
  title: computed(() => `TheMealDB | ${data.value?.name ?? 'Detalle de receta'}`),
  description: computed(() =>
    data.value
      ? `Ingredientes, enlaces y pasos de preparacion para ${data.value.name}.`
      : 'Vista de detalle de receta.'
  )
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-5">
    <div>
      <v-btn prepend-icon="mdi-arrow-left" slim variant="text" to="/apis/meals">
        Volver a recetas
      </v-btn>
    </div>

    <CommonSectionHeader title="Detalle de receta" subtitle="TheMealDB" />

    <v-skeleton-loader
      v-if="pending"
      class="rounded-xl"
      color="surface-variant"
      type="image, article"
    />

    <CommonErrorState
      v-else-if="error || !data"
      title="Receta no disponible"
      message="No fue posible cargar esta receta. Prueba abriendo otra."
      @retry="refresh"
    />

    <template v-else>
      <v-row>
        <v-col cols="12" lg="7">
          <v-card color="surface" class="overflow-hidden fill-height editorial-panel">
            <v-img
              v-if="data.image"
              :src="data.image"
              :alt="data.name"
              cover
              min-height="360"
            />
            <div v-else class="pa-16 text-center text-overline text-medium-emphasis">Sin imagen</div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="5">
          <v-card color="surface" class="pa-6 d-flex flex-column ga-4 editorial-panel">
            <div>
              <div class="d-flex flex-wrap ga-2 mb-2">
                <v-chip color="secondary" variant="outlined">{{ data.category }}</v-chip>
                <v-chip color="secondary" variant="outlined">{{ data.area }}</v-chip>
              </div>
              <h1 class="text-h4 font-weight-bold">{{ data.name }}</h1>
            </div>

            <div v-if="data.tags.length" class="d-flex flex-wrap ga-2">
              <v-chip v-for="tag in data.tags" :key="tag" color="primary" variant="outlined">
                {{ tag }}
              </v-chip>
            </div>

            <div class="d-flex flex-wrap ga-3">
              <v-btn
                v-if="data.videoUrl"
                :href="data.videoUrl"
                target="_blank"
                rel="noreferrer"
                color="primary"
                variant="tonal"
              >
                Ver video
              </v-btn>
              <v-btn
                v-if="data.sourceUrl"
                :href="data.sourceUrl"
                target="_blank"
                rel="noreferrer"
                variant="outlined"
              >
                Ver fuente
              </v-btn>
            </div>

            <v-sheet color="surface-bright" class="pa-5">
              <div class="text-overline text-medium-emphasis mb-4">Ingredientes</div>
              <v-row>
                <v-col
                  v-for="ingredient in data.ingredients"
                  :key="`${ingredient.name}-${ingredient.measure}`"
                  cols="12"
                  sm="6"
                >
                  <v-sheet color="surface-container-high" class="pa-4">
                    <div class="text-body-1 font-weight-medium">{{ ingredient.name }}</div>
                    <div class="text-overline text-medium-emphasis">{{ ingredient.measure }}</div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>

      <v-card color="surface" class="pa-6 editorial-panel">
        <div class="text-overline text-medium-emphasis mb-4">Instrucciones</div>
        <v-timeline density="compact" side="end" align="start">
          <v-timeline-item
            v-for="(step, index) in data.instructions"
            :key="`${index}-${step}`"
            dot-color="primary"
            fill-dot
            size="small"
          >
            <v-card color="surface-bright">
              <div class="pa-4">
                <div class="text-overline text-primary mb-1">Paso {{ index + 1 }}</div>
                <div class="text-body-2">{{ step }}</div>
              </div>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>

      <SectionsIntegrationNote
        api-name="TheMealDB"
        summary="El detalle consume una receta individual desde un endpoint interno que parsea ingredientes, medidas y pasos a un formato mas util para la lectura. La UI recibe una ficha ya preparada para contenido largo."
        :bullets="[
          'La ruta dinamica consulta un ID y transforma una estructura extensa en bloques listos para mostrar.',
          'Los ingredientes y pasos se separan para que la informacion se entienda rapido y sin ruido.',
          'El caso demuestra capacidad de estructurar contenido abundante sin perder consistencia visual.'
        ]"
      />
    </template>
  </v-container>
</template>
