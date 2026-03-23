<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <v-sheet
    color="surface"
    border
    rounded="xl"
    class="pa-8"
    style="background: linear-gradient(135deg, #020617 0%, #0f172a 55%, #111c35 100%);"
  >
    <div class="text-overline text-medium-emphasis">Public API Gallery</div>
    <div class="text-h3 text-sm-h2 font-weight-bold text-high-emphasis mt-3">
      Explore {{ total }} API demos in one cohesive product.
    </div>
    <p class="text-body-1 text-medium-emphasis mt-4" style="max-width: 720px;">
      This gallery curates real public APIs into a consistent, portfolio-ready experience with shared UX and reusable patterns.
    </p>
  </v-sheet>
</template>
