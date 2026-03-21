export type SimpsonsCharacter = {
  name: string
  quote: string
  image: string | null
}

export type SimpsonsResponse = {
  items: SimpsonsCharacter[]
}
