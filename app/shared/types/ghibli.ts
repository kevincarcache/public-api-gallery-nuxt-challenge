export interface GhibliFilm {
  id: string
  title: string
  description: string
  director: string
  producer: string
  releaseYear: string
  runtime: string
  score: string
  image: string | null
  banner: string | null
}

export interface GhibliFilmsResponse {
  items: GhibliFilm[]
}
