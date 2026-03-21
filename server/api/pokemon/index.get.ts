import { getQuery } from 'h3'
import { mapPokemonListItem } from '~/utils/mappers/pokemon'
import type { PokemonListResponse } from '~/types/pokemon'

const POKE_API = 'https://pokeapi.co/api/v2/pokemon'

export default defineEventHandler(async (event): Promise<PokemonListResponse> => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page ?? 1))
  const limit = Math.min(24, Math.max(6, Number(query.limit ?? 12)))
  const search = String(query.search ?? '').trim().toLowerCase()

  if (search) {
    try {
      const detail = await $fetch(`${POKE_API}/${search}`)
      return {
        items: [mapPokemonListItem(detail)],
        page: 1,
        totalPages: 1,
        count: 1
      }
    } catch {
      return {
        items: [],
        page: 1,
        totalPages: 1,
        count: 0
      }
    }
  }

  const offset = (page - 1) * limit
  const list = await $fetch<any>(POKE_API, {
    query: { offset, limit }
  })

  const results = Array.isArray(list?.results) ? list.results : []
  const detailRequests = results.map((item: any) => $fetch(item.url))
  const detailResults = await Promise.allSettled(detailRequests)

  const items = detailResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => mapPokemonListItem((result as PromiseFulfilledResult<any>).value))

  const count = Number(list?.count ?? items.length)
  const totalPages = Math.max(1, Math.ceil(count / limit))

  return {
    items,
    page,
    totalPages,
    count
  }
})
