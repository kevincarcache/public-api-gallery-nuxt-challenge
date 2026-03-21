export type RickMortyCharacter = {
  id: number
  name: string
  status: string
  species: string
  gender: string
  origin: string
  location: string
  image: string | null
  episodeCount: number
}

export type RickMortyListResponse = {
  items: RickMortyCharacter[]
  page: number
  totalPages: number
  count: number
}
