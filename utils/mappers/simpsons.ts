import type { SimpsonsCharacter } from '~/types/simpsons'

export const mapSimpsonsCharacter = (raw: any): SimpsonsCharacter => {
  return {
    name: raw?.character ?? 'Unknown',
    quote: raw?.quote ?? 'No quote available.',
    image: raw?.image ?? null
  }
}
