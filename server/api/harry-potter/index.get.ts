import { getQuery } from 'h3'
import { mapHarryPotterCharacter } from '~/shared/utils/mappers/harry-potter'
import type { HarryPotterResponse } from '~/shared/types/harry-potter'

const HARRY_POTTER_API = 'https://hp-api.onrender.com/api/characters'

export default defineEventHandler(async (event): Promise<HarryPotterResponse> => {
  const query = getQuery(event)
  const house = String(query.house ?? '').trim().toLowerCase()

  const endpoint = house ? `${HARRY_POTTER_API}/house/${house}` : HARRY_POTTER_API

  try {
    const data = await $fetch<any>(endpoint)
    const items = Array.isArray(data) ? data.map(mapHarryPotterCharacter) : []
    return { items }
  } catch {
    return { items: [] }
  }
})
