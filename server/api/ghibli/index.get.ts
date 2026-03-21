import type { GhibliFilmsResponse } from '~/shared/types/ghibli'

interface GhibliFilmApiRecord {
  id?: string
  title?: string
  description?: string
  director?: string
  producer?: string
  release_date?: string
  running_time?: string
  rt_score?: string
  image?: string
  movie_banner?: string
}

export default defineEventHandler(async (): Promise<GhibliFilmsResponse> => {
  const response = await $fetch<GhibliFilmApiRecord[]>('https://ghibliapi.vercel.app/films')

  return {
    items: (response ?? []).map((film) => ({
      id: film.id ?? crypto.randomUUID(),
      title: film.title ?? 'Untitled film',
      description: film.description ?? 'Description unavailable.',
      director: film.director ?? 'Unknown director',
      producer: film.producer ?? 'Unknown producer',
      releaseYear: film.release_date ?? 'Unknown year',
      runtime: film.running_time ? `${film.running_time} min` : 'Unknown runtime',
      score: film.rt_score ? `${film.rt_score}/100` : 'No score',
      image: film.image ?? film.movie_banner ?? null,
      banner: film.movie_banner ?? null
    }))
  }
})
