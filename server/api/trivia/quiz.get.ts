import type { TriviaAnswerOption, TriviaQuestion, TriviaQuizResponse } from '~/shared/types/trivia'

interface TriviaQuizApiQuestion {
  category?: string
  type?: 'multiple' | 'boolean'
  difficulty?: string
  question?: string
  correct_answer?: string
  incorrect_answers?: string[]
}

interface TriviaQuizApiResponse {
  response_code?: number
  results?: TriviaQuizApiQuestion[]
}

const decodeHtmlEntities = (value: string) => {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'e')
    .replace(/&uuml;/g, 'u')
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
}

const shuffleAnswers = (answers: TriviaAnswerOption[]) => {
  const shuffled = [...answers]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    const current = shuffled[index]

    shuffled[index] = shuffled[target]
    shuffled[target] = current
  }

  return shuffled
}

const toQuestion = (question: TriviaQuizApiQuestion, index: number): TriviaQuestion => {
  const correctAnswer = decodeHtmlEntities(question.correct_answer ?? 'Respuesta no disponible')
  const answers = [
    ...(question.incorrect_answers ?? []).map((label, answerIndex) => ({
      id: `q${index}-i${answerIndex}`,
      label: decodeHtmlEntities(label)
    })),
    {
      id: `q${index}-correct`,
      label: correctAnswer
    }
  ]

  const shuffledAnswers = shuffleAnswers(answers)
  const correctAnswerId = shuffledAnswers.find((answer) => answer.label === correctAnswer)?.id ?? shuffledAnswers[0]?.id ?? ''

  return {
    id: `question-${index}`,
    prompt: decodeHtmlEntities(question.question ?? 'Untitled question'),
    category: decodeHtmlEntities(question.category ?? 'General'),
    difficulty: question.difficulty ?? 'unknown',
    type: question.type === 'boolean' ? 'boolean' : 'multiple',
    answers: shuffledAnswers,
    correctAnswerId
  }
}

export default defineEventHandler(async (event): Promise<TriviaQuizResponse> => {
  const query = getQuery(event)
  const amount = Math.min(Math.max(Number(query.amount) || 5, 1), 10)
  const category = Number(query.category)
  const difficulty = typeof query.difficulty === 'string' ? query.difficulty : undefined

  const searchParams = new URLSearchParams({
    amount: String(amount)
  })

  if (Number.isFinite(category) && category > 0) {
    searchParams.set('category', String(category))
  }

  if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
    searchParams.set('difficulty', difficulty)
  }

  const response = await $fetch<TriviaQuizApiResponse>(`https://opentdb.com/api.php?${searchParams.toString()}`)

  if (response.response_code && response.response_code !== 0) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Trivia API returned no questions for this configuration.'
    })
  }

  const items = (response.results ?? []).map(toQuestion)

  return {
    items,
    total: items.length
  }
})
