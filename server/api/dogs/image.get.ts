import { getQuery } from 'h3'
import { mapDogImageResult } from '~/shared/utils/mappers/dogs'
import type { DogImageResult } from '~/shared/types/dogs'

const DOG_API = 'https://dog.ceo/api'

export default defineEventHandler(async (event): Promise<DogImageResult> => {
  const breed = String(getQuery(event).breed ?? '').trim().toLowerCase()

  if (!breed) {
    throw createError({ statusCode: 400, statusMessage: 'Breed is required.' })
  }

  try {
    const response = await $fetch<{ message?: string }>(`${DOG_API}/breed/${breed}/images/random`)
    return mapDogImageResult(breed, response.message ?? null)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Dog image not found.' })
  }
})
