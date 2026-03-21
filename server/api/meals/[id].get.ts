import { mapMealDetail } from '~/shared/utils/mappers/meals'
import type { MealDetail } from '~/shared/types/meals'

interface MealDetailApiResponse {
  meals?: Array<Record<string, string | undefined>>
}

export default defineEventHandler(async (event): Promise<MealDetail> => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Meal id is required.'
    })
  }

  const response = await $fetch<MealDetailApiResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
  )

  const meal = response.meals?.[0]

  if (!meal) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Meal not found.'
    })
  }

  return mapMealDetail(meal)
})
