export interface MealIngredient {
  name: string
  measure: string
}

export interface MealSummary {
  id: string
  name: string
  category: string
  area: string
  image: string | null
  tags: string[]
  instructionsPreview: string
}

export interface MealDetail extends MealSummary {
  instructions: string[]
  ingredients: MealIngredient[]
  videoUrl: string | null
  sourceUrl: string | null
}

export interface MealListResponse {
  items: MealSummary[]
  query: string
}
