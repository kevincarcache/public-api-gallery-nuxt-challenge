import type { RickMortyCharacter } from '~/shared/types/rick-morty'

export const mapRickMortyCharacter = (raw: any): RickMortyCharacter => {
  return {
    id: Number(raw?.id ?? 0),
    name: raw?.name ?? 'Unknown',
    status: raw?.status ?? 'unknown',
    species: raw?.species ?? 'unknown',
    gender: raw?.gender ?? 'unknown',
    origin: raw?.origin?.name ?? 'unknown',
    location: raw?.location?.name ?? 'unknown',
    image: raw?.image ?? null,
    episodeCount: Array.isArray(raw?.episode) ? raw.episode.length : 0
  }
}
