import { getQuery } from 'h3'
import { mapRickMortyCharacter } from '~/shared/utils/mappers/rick-morty'
import type { RickMortyListResponse } from '~/shared/types/rick-morty'

const RICK_MORTY_API = 'https://rickandmortyapi.com/api/character'

export default defineEventHandler(async (event): Promise<RickMortyListResponse> => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page ?? 1))
  const search = String(query.search ?? '').trim()
  const status = String(query.status ?? '').trim()
  const species = String(query.species ?? '').trim()

  try {
    const data = await $fetch<any>(RICK_MORTY_API, {
      query: {
        page,
        name: search || undefined,
        status: status || undefined,
        species: species || undefined
      }
    })

    const results = Array.isArray(data?.results) ? data.results : []

    return {
      items: results.map(mapRickMortyCharacter),
      page,
      totalPages: Number(data?.info?.pages ?? 1),
      count: Number(data?.info?.count ?? results.length)
    }
  } catch {
    return {
      items: [],
      page,
      totalPages: 1,
      count: 0
    }
  }
})
