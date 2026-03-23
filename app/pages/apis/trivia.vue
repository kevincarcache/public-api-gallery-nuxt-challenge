<script setup lang="ts">
import type { TriviaCategoriesResponse, TriviaQuizConfig, TriviaQuizResponse } from '~/shared/types/trivia'

useSeoMeta({
  title: 'Open Trivia DB | Catalogo de APIs Publicas',
  description: 'Configura un quiz con parametros reales, responde preguntas y revisa resultados dentro de un flujo completo.'
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
      quizError.value = 'No hubo preguntas para esa configuracion. Prueba una categoria mas amplia o cambia la dificultad.'
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
      <CommonSectionHeader title="Open Trivia DB" subtitle="Modo quiz" />
      <p class="text-body-2 text-medium-emphasis">
        Esta demo toma una API de preguntas y la convierte en una experiencia completa con configuracion, progreso, feedback y resultados.
      </p>
    </div>

    <CommonErrorState
      v-if="categoriesError"
      title="No fue posible cargar las categorias"
      message="El formulario necesita las categorias disponibles antes de iniciar el quiz."
      @retry="refreshCategories"
    />

    <v-card
      v-else-if="stage === 'setup'"
      color="surface"
      class="pa-6"
    >
      <v-row>
        <v-col cols="12" lg="7">
          <div class="d-flex flex-column ga-6">
            <div class="d-flex flex-column ga-2">
              <h3 class="text-h5 font-weight-bold">Configura tu quiz</h3>
              <p class="text-body-2 text-medium-emphasis">
                Define cantidad de preguntas, categoria opcional y nivel de dificultad antes de iniciar la ronda.
              </p>
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="config.amount"
                  :items="questionOptions.map((option) => ({ title: `${option} preguntas`, value: option }))"
                  hide-details
                  label="Preguntas"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="config.difficulty"
                  :items="[
                    { title: 'Cualquier dificultad', value: undefined },
                    { title: 'Easy', value: 'easy' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Hard', value: 'hard' }
                  ]"
                  hide-details
                  label="Dificultad"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>

            <v-select
              v-model="config.category"
              :disabled="categoriesPending"
              :items="[
                { title: 'Cualquier categoria', value: undefined },
                ...categoriesData.items.map((category) => ({ title: category.name, value: category.id }))
              ]"
              hide-details
              label="Categoria"
              variant="outlined"
              density="comfortable"
            />

            <CommonErrorState
              v-if="quizError"
              title="Hay que ajustar la configuracion"
              :message="quizError"
              :show-retry="false"
            />

            <v-btn
              color="primary"
              prepend-icon="mdi-play-circle"
              :disabled="quizPending || categoriesPending"
              @click="startQuiz"
            >
              {{ quizPending ? 'Iniciando quiz...' : 'Iniciar quiz' }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" lg="5">
          <v-sheet color="surface-bright" class="pa-5 fill-height">
            <div class="text-overline text-medium-emphasis">Que demuestra esta demo</div>
            <v-list bg-color="transparent" density="comfortable">
              <v-list-item title="Flujo pregunta por pregunta que se adapta bien a mobile." />
              <v-list-item title="Scoring inmediato cuando el usuario fija una respuesta." />
              <v-list-item title="Reinicio limpio para repetir la experiencia con otra configuracion." />
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>

    <CommonLoadingGrid v-else-if="quizPending" :count="config.amount" />

    <v-card
      v-else-if="stage === 'playing' && currentQuestion"
      color="surface"
      class="pa-6"
    >
      <div class="d-flex flex-column ga-5">
        <div class="d-flex flex-column ga-3">
          <div class="d-flex flex-wrap align-center justify-space-between ga-3">
            <div class="d-flex flex-column ga-1">
              <div class="text-overline text-medium-emphasis">
                Pregunta {{ currentIndex + 1 }} de {{ quiz.total }}
              </div>
              <h3 class="text-h5 font-weight-bold">{{ currentQuestion.prompt }}</h3>
            </div>

            <v-chip color="success" variant="tonal" size="large">
              Puntaje: {{ score }}
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
                ? 'Selecciona la mejor respuesta para fijarla.'
                : answeredCorrectly
                  ? 'Respuesta correcta. Puedes continuar a la siguiente.'
                  : 'No era la opcion correcta, pero el flujo sigue disponible.'
            }}
          </p>

          <v-btn
            color="primary"
            :disabled="!hasAnswered"
            @click="goToNextQuestion"
          >
            {{ currentIndex === quiz.total - 1 ? 'Ver resultados' : 'Siguiente pregunta' }}
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-card
      v-else-if="stage === 'results'"
      color="surface"
      class="pa-6"
    >
      <div class="d-flex flex-column ga-5">
        <div class="d-flex flex-column ga-3">
          <div class="text-overline text-medium-emphasis">Ronda completada</div>
          <h3 class="text-h3 font-weight-bold">{{ score }} / {{ quiz.total }}</h3>
          <p class="text-body-2 text-medium-emphasis">
            {{
              score === quiz.total
              ? 'Puntaje perfecto. Todas las respuestas fueron correctas.'
              : score >= Math.ceil(quiz.total / 2)
                  ? 'Buen resultado. Puedes subir la dificultad para forzar mas el caso.'
                  : 'Buen calentamiento. Reinicia con otra categoria para explorar un nuevo flujo.'
            }}
          </p>
        </div>

        <div class="d-flex flex-wrap ga-3">
          <v-btn color="primary" prepend-icon="mdi-refresh" @click="startQuiz">
            Jugar otra vez
          </v-btn>
          <v-btn variant="outlined" @click="resetQuiz">
            Cambiar configuracion
          </v-btn>
        </div>
      </div>
    </v-card>

    <SectionsIntegrationNote
      api-name="Open Trivia DB"
      summary="Esta pagina usa dos endpoints internos: uno para categorias y otro para generar el quiz. La API externa solo aporta preguntas; el flujo, el scoring y la experiencia de producto viven en la capa de aplicacion."
      :bullets="[
        'La configuracion del quiz viaja al server y vuelve como una ronda lista para jugar.',
        'El cliente controla progreso, respuesta seleccionada y resultado final sin depender de la API externa.',
        'El valor tecnico esta en convertir datos de preguntas en un flujo interactivo completo.'
      ]"
    />
  </v-container>
</template>
