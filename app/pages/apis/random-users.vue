<script setup lang="ts">
import type { RandomUserResponse } from '~/shared/types/random-user'

useSeoMeta({
  title: 'Random User Generator | Public API Gallery',
  description: 'Load a fresh batch of users with avatars, email, and location.'
})

const count = ref(9)

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
      <CommonSectionHeader title="Random User Generator" subtitle="People Grid" />
      <p class="text-body-2 text-medium-emphasis">
        Generate a fresh cast of people cards and change the batch size to explore different layouts.
      </p>
    </div>

    <CommonFilterBar>
      <v-select
        v-model="count"
        :items="[
          { title: '6 users', value: 6 },
          { title: '9 users', value: 9 },
          { title: '12 users', value: 12 }
        ]"
        hide-details
        label="Batch size"
        variant="outlined"
        density="comfortable"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-account-multiple-plus"
        variant="tonal"
        @click="refresh"
      >
        Regenerate users
      </v-btn>
    </CommonFilterBar>

    <CommonLoadingGrid v-if="pending" :count="count" />

    <CommonErrorState
      v-else-if="error"
      title="Unable to load users"
      message="Try generating a new batch."
      @retry="refresh"
    />

    <CommonEmptyState
      v-else-if="!data.items.length"
      title="No users returned"
      message="The API returned an empty batch. Try again."
    />

    <v-row v-else>
      <v-col v-for="user in data.items" :key="user.id" cols="12" sm="6" xl="4">
        <CardsUserCard
          :name="user.name"
          :email="user.email"
          :location="user.location"
          :avatar="user.avatar"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
