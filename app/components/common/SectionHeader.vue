<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <v-row align="end" justify="space-between" class="ga-3" style="border-bottom: 1px solid rgba(228, 233, 237, 0.12); padding-bottom: 12px;">
    <v-col cols="12" sm="auto">
      <div v-if="props.subtitle" class="text-overline text-medium-emphasis">
        {{ props.subtitle }}
      </div>
      <div class="text-h4 font-weight-bold text-high-emphasis">
        {{ props.title }}
      </div>
    </v-col>
    <v-col cols="12" sm="auto" class="d-flex justify-start justify-sm-end">
      <slot />
    </v-col>
  </v-row>
</template>
