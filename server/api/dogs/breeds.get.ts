import { mapDogBreedOptions } from '~/shared/utils/mappers/dogs'
import type { DogBreedOption } from '~/shared/types/dogs'

const DOG_API = 'https://dog.ceo/api'

export default defineEventHandler(async (): Promise<DogBreedOption[]> => {
  try {
    const response = await $fetch<{ message?: Record<string, string[]> }>(`${DOG_API}/breeds/list/all`)
    return mapDogBreedOptions(response.message)
  } catch {
    return []
  }
})
