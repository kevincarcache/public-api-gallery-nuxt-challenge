<script setup lang="ts">
const props = defineProps<{
  apiName: string
  summary: string
  bullets: string[]
}>()
</script>

<template>
  <v-sheet color="surface" border class="pa-6 editorial-panel">
    <div class="text-overline text-medium-emphasis">Como se conecta esta API</div>
    <h3 class="text-h5 font-weight-bold mt-2">{{ props.apiName }}</h3>
    <p class="text-body-2 text-medium-emphasis mt-3 tech-copy">
      {{ props.summary }}
    </p>

    <v-row class="mt-2">
      <v-col v-for="bullet in props.bullets" :key="bullet" cols="12" md="4">
        <v-sheet color="surface-bright" border class="pa-4 fill-height">
          <div class="text-body-2">{{ bullet }}</div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>
