import { mapRickMortyCharacter } from '~/shared/utils/mappers/rick-morty'

const RICK_MORTY_API = 'https://rickandmortyapi.com/api/character'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Character id is required.' })
  }

  try {
    const detail = await $fetch(`${RICK_MORTY_API}/${id}`)
    return mapRickMortyCharacter(detail)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Character not found.' })
  }
})
