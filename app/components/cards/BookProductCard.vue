<script setup lang="ts">
defineProps<{
  title: string
  author: string
  coverUrl?: string | null
  firstPublishYear: string
  editions: string
  selected?: boolean
}>()
</script>

<template>
  <v-card
    color="transparent"
    class="h-100 book-product cursor-pointer"
    :class="{ 'book-product--selected': selected }"
  >
    <div class="book-product__cover-wrap">
      <v-img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="title"
        cover
        class="book-product__cover"
      />
      <v-sheet
        v-else
        color="surface-light"
        class="book-product__cover d-flex align-center justify-center text-body-2 text-medium-emphasis"
      >
        Portada no disponible
      </v-sheet>

      <v-chip
        size="small"
        color="white"
        class="book-product__badge"
        variant="elevated"
      >
        {{ editions }} ed.
      </v-chip>
    </div>

    <div class="pt-4 d-flex flex-column ga-2">
      <div class="text-body-2 text-medium-emphasis book-product__author">{{ author }}</div>
      <div class="text-h6 font-weight-medium text-high-emphasis book-product__title">{{ title }}</div>
      <div class="text-body-2 font-weight-bold text-high-emphasis">
        Primera edicion: {{ firstPublishYear }}
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.book-product__cover-wrap {
  position: relative;
}

.book-product__cover {
  aspect-ratio: 0.72;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
}

.book-product__badge {
  position: absolute;
  right: 14px;
  top: 14px;
}

.book-product__author,
.book-product__title {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.book-product__author {
  -webkit-line-clamp: 1;
}

.book-product__title {
  line-height: 1.3;
  -webkit-line-clamp: 2;
}

.book-product--selected .book-product__cover {
  outline: 3px solid rgba(var(--v-theme-primary), 0.75);
  outline-offset: 2px;
}
</style>
