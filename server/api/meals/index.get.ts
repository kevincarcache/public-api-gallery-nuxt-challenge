import { mapMealSummary } from '~/shared/utils/mappers/meals'
import type { MealListResponse } from '~/shared/types/meals'

interface MealsApiResponse {
  meals?: Array<Record<string, string | undefined>>
}

export default defineEventHandler(async (event): Promise<MealListResponse> => {
  const query = getQuery(event)
  const search = typeof query.search === 'string' && query.search.trim() ? query.search.trim() : 'chicken'
  const response = await $fetch<MealsApiResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
  )

  return {
    items: (response.meals ?? []).map((meal) => mapMealSummary(meal)),
    query: search
  }
})
