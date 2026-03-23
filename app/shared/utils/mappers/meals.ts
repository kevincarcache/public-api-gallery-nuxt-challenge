import type { MealDetail, MealIngredient, MealSummary } from '~/shared/types/meals'

interface RawMealRecord {
  idMeal?: string
  strMeal?: string
  strCategory?: string
  strArea?: string
  strMealThumb?: string
  strTags?: string
  strInstructions?: string
  strYoutube?: string
  strSource?: string
  [key: `strIngredient${number}`]: string | undefined
  [key: `strMeasure${number}`]: string | undefined
}

const toInstructions = (value?: string) => {
  return (value ?? '')
    .split(/\r?\n+/)
    .map((step) => step.trim())
    .filter(Boolean)
}

const toInstructionPreview = (steps: string[]) => {
  if (!steps.length) {
    return 'No hay instrucciones disponibles para esta receta.'
  }

  return steps[0]
}

const toIngredients = (meal: RawMealRecord): MealIngredient[] => {
  const ingredients: MealIngredient[] = []

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`]?.trim()
    const measure = meal[`strMeasure${index}`]?.trim()

    if (!ingredient) {
      continue
    }

    ingredients.push({
      name: ingredient,
      measure: measure || 'A gusto'
    })
  }

  return ingredients
}

const toTags = (value?: string) => {
  return (value ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export const mapMealSummary = (meal: RawMealRecord): MealSummary => {
  const instructions = toInstructions(meal.strInstructions)

  return {
    id: meal.idMeal ?? crypto.randomUUID(),
    name: meal.strMeal ?? 'Receta sin titulo',
    category: meal.strCategory ?? 'Sin categoria',
    area: meal.strArea ?? 'Origen no indicado',
    image: meal.strMealThumb ?? null,
    tags: toTags(meal.strTags),
    instructionsPreview: toInstructionPreview(instructions)
  }
}

export const mapMealDetail = (meal: RawMealRecord): MealDetail => {
  const summary = mapMealSummary(meal)

  return {
    ...summary,
    instructions: toInstructions(meal.strInstructions),
    ingredients: toIngredients(meal),
    videoUrl: meal.strYoutube ?? null,
    sourceUrl: meal.strSource ?? null
  }
}
