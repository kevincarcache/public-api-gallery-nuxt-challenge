export type StarWarsResource = 'people' | 'planets' | 'starships'

export interface StarWarsStat {
  label: string
  value: string
}

export interface StarWarsItem {
  id: string
  name: string
  subtitle: string
  description: string
  stats: StarWarsStat[]
}

export interface StarWarsResponse {
  items: StarWarsItem[]
  resource: StarWarsResource
  search: string
}
