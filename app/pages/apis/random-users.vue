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
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Random User Generator" subtitle="People Grid" />
      <p class="max-w-2xl text-sm text-slate-300">
        Generate a fresh cast of people cards and change the batch size to explore different layouts.
      </p>
    </div>

    <CommonFilterBar>
      <label class="flex items-center gap-3 text-sm text-slate-300">
        <span class="text-xs uppercase tracking-[0.25em] text-slate-500">Batch size</span>
        <select
          v-model="count"
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100"
        >
          <option :value="6">6 users</option>
          <option :value="9">9 users</option>
          <option :value="12">12 users</option>
        </select>
      </label>

      <button
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-slate-600"
        type="button"
        @click="refresh"
      >
        Regenerate users
      </button>
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

    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <CardsUserCard
        v-for="user in data.items"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :location="user.location"
        :avatar="user.avatar"
      />
    </div>
  </div>
</template>
