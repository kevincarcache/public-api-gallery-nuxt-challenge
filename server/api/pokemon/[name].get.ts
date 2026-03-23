import { mapPokemonDetail } from '~/shared/utils/mappers/pokemon'

const POKE_API = 'https://pokeapi.co/api/v2/pokemon'

export default defineEventHandler(async (event) => {
  const name = event.context.params?.name

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Pokemon name is required.' })
  }

  try {
    const detail = await $fetch(`${POKE_API}/${String(name).toLowerCase()}`)
    return mapPokemonDetail(detail)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Pokemon not found.' })
  }
})
