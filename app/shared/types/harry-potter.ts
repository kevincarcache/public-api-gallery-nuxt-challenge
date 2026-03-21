export type HarryPotterCharacter = {
  name: string
  house: string
  image: string | null
  species: string
  ancestry: string
  patronus: string
  actor: string
}

export type HarryPotterResponse = {
  items: HarryPotterCharacter[]
}
