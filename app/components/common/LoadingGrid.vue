<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 6
  }
)
</script>

<template>
  <v-row>
    <v-col
      v-for="index in props.count"
      :key="index"
      cols="12"
      sm="6"
      lg="4"
    >
      <v-skeleton-loader
        class="border"
        color="surface"
        rounded="xl"
        type="image, article"
      />
    </v-col>
  </v-row>
</template>
