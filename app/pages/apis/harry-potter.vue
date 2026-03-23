<script setup lang="ts">
import type { HarryPotterResponse } from '~/shared/types/harry-potter'

useSeoMeta({
  title: 'Harry Potter API | Public API Gallery',
  description: 'Explore Hogwarts characters with house filters and search.'
})

const search = ref('')
const house = ref('')

const query = computed(() => ({
  house: house.value || undefined
}))

const { data, pending, error, refresh } = useSafeFetch<HarryPotterResponse>('/api/harry-potter', {
  query,
  defaultValue: { items: [] }
})

const filteredItems = computed(() => {
  const items = data.value?.items ?? []
  if (!search.value) return items
  const queryText = search.value.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(queryText))
})

const houseOptions = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Harry Potter" subtitle="Character Roster" />
      <p class="text-body-2 text-medium-emphasis">
        Filter by house or search for a character to explore the wizarding world.
      </p>
    </div>

    <CommonFilterBar>
      <CommonSearchBar v-model="search" placeholder="Search by name" />
      <v-select
        v-model="house"
        :items="houseOptions"
        clearable
        hide-details
        label="House"
        variant="outlined"
        density="comfortable"
      >
      </v-select>
      <v-btn
        color="primary"
        prepend-icon="mdi-refresh"
        variant="tonal"
        @click="refresh"
      >
        Reload
      </v-btn>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="12" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load characters"
      message="Try refreshing again."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!filteredItems.length"
      title="No characters found"
      message="Try another name or house filter."
    />

    <v-row v-else>
      <v-col v-for="character in filteredItems" :key="character.name" cols="12" sm="6" lg="4">
        <CardsCharacterCard
          :title="character.name"
          :subtitle="character.house || 'No house'"
          :image="character.image"
          :badges="[character.house || 'unknown', character.species]"
          :stats="[
            { label: 'Actor', value: character.actor },
            { label: 'Patronus', value: character.patronus }
          ]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
