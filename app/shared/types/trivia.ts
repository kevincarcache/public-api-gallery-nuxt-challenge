export interface TriviaCategory {
  id: number
  name: string
}

export interface TriviaAnswerOption {
  id: string
  label: string
}

export interface TriviaQuestion {
  id: string
  prompt: string
  category: string
  difficulty: string
  type: 'multiple' | 'boolean'
  answers: TriviaAnswerOption[]
  correctAnswerId: string
}

export interface TriviaQuizConfig {
  amount: number
  category?: number
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface TriviaCategoriesResponse {
  items: TriviaCategory[]
}

export interface TriviaQuizResponse {
  items: TriviaQuestion[]
  total: number
}
