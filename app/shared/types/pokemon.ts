export type PokemonStat = {
  label: string
  value: number
}

export type PokemonListItem = {
  id: number
  name: string
  image: string | null
  types: string[]
  stats: PokemonStat[]
}

export type PokemonDetail = PokemonListItem & {
  height: number
  weight: number
  abilities: string[]
}

export type PokemonListResponse = {
  items: PokemonListItem[]
  page: number
  totalPages: number
  count: number
}
