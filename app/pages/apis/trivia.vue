<script setup lang="ts">
import type { TriviaCategoriesResponse, TriviaQuizConfig, TriviaQuizResponse } from '~/shared/types/trivia'

useSeoMeta({
  title: 'Open Trivia DB | Public API Gallery',
  description: 'Build a custom quiz, answer each question, and track your score in a clean game flow.'
})

const questionOptions = [5, 7, 10]

const config = reactive<TriviaQuizConfig>({
  amount: 5
})

const stage = ref<'setup' | 'playing' | 'results'>('setup')
const currentIndex = ref(0)
const selectedAnswerId = ref<string | null>(null)
const score = ref(0)
const quiz = ref<TriviaQuizResponse>({ items: [], total: 0 })
const quizPending = ref(false)
const quizError = ref<string | null>(null)

const { data: categoriesData, pending: categoriesPending, error: categoriesError, refresh: refreshCategories } =
  useSafeFetch<TriviaCategoriesResponse>('/api/trivia/categories', {
    defaultValue: { items: [] }
  })

const currentQuestion = computed(() => quiz.value.items[currentIndex.value] ?? null)
const progressValue = computed(() => {
  if (!quiz.value.total) {
    return 0
  }

  return ((currentIndex.value + 1) / quiz.value.total) * 100
})

const hasAnswered = computed(() => selectedAnswerId.value !== null)
const answeredCorrectly = computed(() => {
  if (!currentQuestion.value || !selectedAnswerId.value) {
    return false
  }

  return currentQuestion.value.correctAnswerId === selectedAnswerId.value
})

const resetQuiz = () => {
  stage.value = 'setup'
  currentIndex.value = 0
  selectedAnswerId.value = null
  score.value = 0
  quizError.value = null
}

const startQuiz = async () => {
  quizPending.value = true
  quizError.value = null
  currentIndex.value = 0
  selectedAnswerId.value = null
  score.value = 0

  try {
    const response = await $fetch<TriviaQuizResponse>('/api/trivia/quiz', {
      query: {
        amount: config.amount,
        category: config.category || undefined,
        difficulty: config.difficulty || undefined
      }
    })

    quiz.value = response

    if (!response.items.length) {
      quizError.value = 'No questions matched that setup. Try a broader category or another difficulty.'
      stage.value = 'setup'
      return
    }

    stage.value = 'playing'
  }
  catch (error) {
    quizError.value = error instanceof Error ? error.message : 'We could not start the quiz right now.'
    stage.value = 'setup'
  }
  finally {
    quizPending.value = false
  }
}

const selectAnswer = () => {
  if (!currentQuestion.value || !selectedAnswerId.value) {
    return
  }

  if (answeredCorrectly.value) {
    score.value += 1
  }
}

const goToNextQuestion = () => {
  if (!quiz.value.items.length) {
    resetQuiz()
    return
  }

  if (currentIndex.value >= quiz.value.items.length - 1) {
    stage.value = 'results'
    return
  }

  currentIndex.value += 1
  selectedAnswerId.value = null
}

watch(selectedAnswerId, (value, previousValue) => {
  if (value && !previousValue) {
    selectAnswer()
  }
})
</script>

<template>
  <v-container class="pa-0 d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-3">
      <CommonSectionHeader title="Open Trivia DB" subtitle="Quiz Mode" />
      <p class="text-body-2 text-medium-emphasis">
        Tune the quiz, answer one question at a time, and see how many points you can keep on the board.
      </p>
    </div>

    <CommonErrorState
      v-if="categoriesError"
      title="Unable to load quiz categories"
      message="The setup form needs category data before the quiz can start."
      @retry="refreshCategories"
    />

    <v-card
      v-else-if="stage === 'setup'"
      color="surface"
      rounded="xl"
      class="pa-6"
    >
      <v-row>
        <v-col cols="12" lg="7">
          <div class="d-flex flex-column ga-6">
            <div class="d-flex flex-column ga-2">
              <h3 class="text-h5 font-weight-bold">Build your quiz</h3>
              <p class="text-body-2 text-medium-emphasis">
            Pick a question count, optional category, and difficulty level before the first round begins.
              </p>
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="config.amount"
                  :items="questionOptions.map((option) => ({ title: `${option} questions`, value: option }))"
                  hide-details
                  label="Questions"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="config.difficulty"
                  :items="[
                    { title: 'Any difficulty', value: undefined },
                    { title: 'Easy', value: 'easy' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Hard', value: 'hard' }
                  ]"
                  hide-details
                  label="Difficulty"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>

            <v-select
              v-model="config.category"
              :disabled="categoriesPending"
              :items="[
                { title: 'Any category', value: undefined },
                ...categoriesData.items.map((category) => ({ title: category.name, value: category.id }))
              ]"
              hide-details
              label="Category"
              variant="outlined"
              density="comfortable"
            />

            <CommonErrorState
              v-if="quizError"
              title="Quiz setup needs a tweak"
              :message="quizError"
              :show-retry="false"
            />

            <v-btn
              color="primary"
              prepend-icon="mdi-play-circle"
              :disabled="quizPending || categoriesPending"
              @click="startQuiz"
            >
              {{ quizPending ? 'Starting quiz...' : 'Start quiz' }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" lg="5">
          <v-sheet color="surface-bright" rounded="xl" class="pa-5 fill-height">
            <div class="text-overline text-medium-emphasis">What you get</div>
            <v-list bg-color="transparent" density="comfortable">
              <v-list-item title="One-question-at-a-time flow that works well on mobile." />
              <v-list-item title="Instant scoring after you lock an answer." />
              <v-list-item title="Reset-friendly rounds so you can replay with new settings." />
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>

    <CommonLoadingGrid v-else-if="quizPending" :count="config.amount" />

    <v-card
      v-else-if="stage === 'playing' && currentQuestion"
      color="surface"
      rounded="xl"
      class="pa-6"
    >
      <div class="d-flex flex-column ga-5">
        <div class="d-flex flex-column ga-3">
          <div class="d-flex flex-wrap align-center justify-space-between ga-3">
            <div class="d-flex flex-column ga-1">
              <div class="text-overline text-medium-emphasis">
                Question {{ currentIndex + 1 }} of {{ quiz.total }}
              </div>
              <h3 class="text-h5 font-weight-bold">{{ currentQuestion.prompt }}</h3>
            </div>

            <v-chip color="success" variant="tonal" size="large">
              Score: {{ score }}
            </v-chip>
          </div>

          <v-progress-linear :model-value="progressValue" color="primary" rounded height="10" />

          <div class="d-flex flex-wrap ga-2">
            <v-chip color="secondary" variant="outlined">{{ currentQuestion.category }}</v-chip>
            <v-chip color="secondary" variant="outlined">{{ currentQuestion.difficulty }}</v-chip>
            <v-chip color="secondary" variant="outlined">
              {{ currentQuestion.type === 'boolean' ? 'True / False' : 'Multiple choice' }}
            </v-chip>
          </div>
        </div>

        <div class="d-flex flex-column ga-3">
          <v-btn
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            block
            class="justify-start"
            size="large"
            :color="
              selectedAnswerId === answer.id
                ? answer.id === currentQuestion.correctAnswerId
                  ? 'success'
                  : 'error'
                : hasAnswered && answer.id === currentQuestion.correctAnswerId
                  ? 'success'
                  : undefined
            "
            :disabled="hasAnswered"
            :variant="
              selectedAnswerId === answer.id || (hasAnswered && answer.id === currentQuestion.correctAnswerId)
                ? 'tonal'
                : 'outlined'
            "
            @click="selectedAnswerId = answer.id"
          >
            {{ answer.label }}
          </v-btn>
        </div>

        <div class="d-flex flex-wrap align-center justify-space-between ga-3">
          <p class="text-body-2 text-medium-emphasis">
            {{
              !hasAnswered
                ? 'Choose the best answer to lock it in.'
                : answeredCorrectly
                  ? 'Nice one. That answer was correct.'
                  : 'That was not the right pick, but the next question is ready.'
            }}
          </p>

          <v-btn
            color="primary"
            :disabled="!hasAnswered"
            @click="goToNextQuestion"
          >
            {{ currentIndex === quiz.total - 1 ? 'See results' : 'Next question' }}
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-card
      v-else-if="stage === 'results'"
      color="surface"
      rounded="xl"
      class="pa-6"
    >
      <div class="d-flex flex-column ga-5">
        <div class="d-flex flex-column ga-3">
          <div class="text-overline text-medium-emphasis">Round complete</div>
          <h3 class="text-h3 font-weight-bold">{{ score }} / {{ quiz.total }}</h3>
          <p class="text-body-2 text-medium-emphasis">
            {{
              score === quiz.total
                ? 'Perfect score. Every answer landed.'
                : score >= Math.ceil(quiz.total / 2)
                  ? 'Strong run. Try a harder setting if you want another challenge.'
                  : 'Good warm-up. Restart with a new category and see if the next round clicks.'
            }}
          </p>
        </div>

        <div class="d-flex flex-wrap ga-3">
          <v-btn color="primary" prepend-icon="mdi-refresh" @click="startQuiz">
            Play again
          </v-btn>
          <v-btn variant="outlined" @click="resetQuiz">
            Change setup
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
