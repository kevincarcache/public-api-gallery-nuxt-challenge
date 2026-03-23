import type { TriviaCategoriesResponse } from '~/shared/types/trivia'

interface TriviaCategoryApiResponse {
  trivia_categories?: Array<{
    id?: number
    name?: string
  }>
}

export default defineEventHandler(async (): Promise<TriviaCategoriesResponse> => {
  const response = await $fetch<TriviaCategoryApiResponse>('https://opentdb.com/api_category.php')

  return {
    items: (response.trivia_categories ?? [])
      .filter((category) => typeof category.id === 'number' && typeof category.name === 'string')
      .map((category) => ({
        id: category.id as number,
        name: category.name as string
      }))
  }
})
