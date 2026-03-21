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
  <div class="space-y-8">
    <div class="space-y-3">
      <CommonSectionHeader title="Open Trivia DB" subtitle="Quiz Mode" />
      <p class="max-w-2xl text-sm text-slate-300">
        Tune the quiz, answer one question at a time, and see how many points you can keep on the board.
      </p>
    </div>

    <CommonErrorState
      v-if="categoriesError"
      title="Unable to load quiz categories"
      message="The setup form needs category data before the quiz can start."
      @retry="refreshCategories"
    />

    <div
      v-else-if="stage === 'setup'"
      class="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 lg:grid-cols-[1.2fr_0.8fr]"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-xl font-semibold text-white">Build your quiz</h3>
          <p class="text-sm text-slate-300">
            Pick a question count, optional category, and difficulty level before the first round begins.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <label class="space-y-2 text-sm text-slate-300">
            <span class="text-xs uppercase tracking-[0.25em] text-slate-500">Questions</span>
            <select
              v-model="config.amount"
              class="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100"
            >
              <option
                v-for="option in questionOptions"
                :key="option"
                :value="option"
              >
                {{ option }} questions
              </option>
            </select>
          </label>

          <label class="space-y-2 text-sm text-slate-300">
            <span class="text-xs uppercase tracking-[0.25em] text-slate-500">Difficulty</span>
            <select
              v-model="config.difficulty"
              class="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100"
            >
              <option :value="undefined">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <label class="space-y-2 text-sm text-slate-300">
          <span class="text-xs uppercase tracking-[0.25em] text-slate-500">Category</span>
          <select
            v-model="config.category"
            :disabled="categoriesPending"
            class="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 disabled:opacity-50"
          >
            <option :value="undefined">Any category</option>
            <option
              v-for="category in categoriesData.items"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </label>

        <CommonErrorState
          v-if="quizError"
          title="Quiz setup needs a tweak"
          :message="quizError"
          show-retry="false"
        />

        <button
          class="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          :disabled="quizPending || categoriesPending"
          @click="startQuiz"
        >
          {{ quizPending ? 'Starting quiz...' : 'Start quiz' }}
        </button>
      </div>

      <div class="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-5">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">What you get</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li>One-question-at-a-time flow that works well on mobile.</li>
          <li>Instant scoring after you lock an answer.</li>
          <li>Reset-friendly rounds so you can replay with new settings.</li>
        </ul>
      </div>
    </div>

    <CommonLoadingGrid v-else-if="quizPending" :count="config.amount" />

    <div
      v-else-if="stage === 'playing' && currentQuestion"
      class="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6"
    >
      <div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-[0.25em] text-slate-500">
              Question {{ currentIndex + 1 }} of {{ quiz.total }}
            </p>
            <h3 class="text-xl font-semibold text-white">{{ currentQuestion.prompt }}</h3>
          </div>

          <div class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
            Score: {{ score }}
          </div>
        </div>

        <div class="h-2 overflow-hidden rounded-full bg-slate-900">
          <div class="h-full rounded-full bg-amber-300 transition-all duration-300" :style="{ width: `${progressValue}%` }" />
        </div>

        <div class="flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
          <span>{{ currentQuestion.category }}</span>
          <span>{{ currentQuestion.difficulty }}</span>
          <span>{{ currentQuestion.type === 'boolean' ? 'True / False' : 'Multiple choice' }}</span>
        </div>
      </div>

      <div class="grid gap-3">
        <button
          v-for="answer in currentQuestion.answers"
          :key="answer.id"
          class="rounded-2xl border px-4 py-4 text-left text-sm transition"
          :class="[
            selectedAnswerId === answer.id
              ? answer.id === currentQuestion.correctAnswerId
                ? 'border-emerald-400 bg-emerald-500/15 text-emerald-100'
                : 'border-rose-400 bg-rose-500/10 text-rose-100'
              : 'border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-600',
            hasAnswered && answer.id === currentQuestion.correctAnswerId ? 'border-emerald-400 bg-emerald-500/15 text-emerald-100' : ''
          ]"
          type="button"
          :disabled="hasAnswered"
          @click="selectedAnswerId = answer.id"
        >
          {{ answer.label }}
        </button>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm text-slate-300">
          {{
            !hasAnswered
              ? 'Choose the best answer to lock it in.'
              : answeredCorrectly
                ? 'Nice one. That answer was correct.'
                : 'That was not the right pick, but the next question is ready.'
          }}
        </p>

        <button
          class="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          :disabled="!hasAnswered"
          @click="goToNextQuestion"
        >
          {{ currentIndex === quiz.total - 1 ? 'See results' : 'Next question' }}
        </button>
      </div>
    </div>

    <div
      v-else-if="stage === 'results'"
      class="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6"
    >
      <div class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Round complete</p>
        <h3 class="text-3xl font-semibold text-white">{{ score }} / {{ quiz.total }}</h3>
        <p class="max-w-2xl text-sm text-slate-300">
          {{
            score === quiz.total
              ? 'Perfect score. Every answer landed.'
              : score >= Math.ceil(quiz.total / 2)
                ? 'Strong run. Try a harder setting if you want another challenge.'
                : 'Good warm-up. Restart with a new category and see if the next round clicks.'
          }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          class="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          type="button"
          @click="startQuiz"
        >
          Play again
        </button>
        <button
          class="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          type="button"
          @click="resetQuiz"
        >
          Change setup
        </button>
      </div>
    </div>
  </div>
</template>
