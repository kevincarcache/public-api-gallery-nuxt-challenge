import { getQuery } from 'h3'
import { mapSimpsonsCharacter } from '~/shared/utils/mappers/simpsons'
import type { SimpsonsResponse } from '~/shared/types/simpsons'

const SIMPSONS_API = 'https://thesimpsonsquoteapi.glitch.me/quotes'

export default defineEventHandler(async (event): Promise<SimpsonsResponse> => {
  const query = getQuery(event)
  const count = Math.min(20, Math.max(6, Number(query.count ?? 12)))

  try {
    const data = await $fetch<any>(SIMPSONS_API, { query: { count } })
    const items = Array.isArray(data) ? data.map(mapSimpsonsCharacter) : []
    return { items }
  } catch {
    return { items: [] }
  }
})
