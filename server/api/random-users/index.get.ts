import { getQuery } from 'h3'
import { mapRandomUserCard } from '~/shared/utils/mappers/random-user'
import type { RandomUserResponse } from '~/shared/types/random-user'

const RANDOM_USER_API = 'https://randomuser.me/api/'

export default defineEventHandler(async (event): Promise<RandomUserResponse> => {
  const count = Math.min(18, Math.max(6, Number(getQuery(event).count ?? 9)))

  try {
    const response = await $fetch<{ results?: any[] }>(RANDOM_USER_API, {
      query: { results: count }
    })

    return {
      items: Array.isArray(response.results)
        ? response.results.map(mapRandomUserCard)
        : []
    }
  } catch {
    return { items: [] }
  }
})
