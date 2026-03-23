import type { RickMortyCharacter } from '~/shared/types/rick-morty'

export const mapRickMortyCharacter = (raw: any): RickMortyCharacter => {
  return {
    id: Number(raw?.id ?? 0),
    name: raw?.name ?? 'Sin nombre',
    status: raw?.status ?? 'Sin dato',
    species: raw?.species ?? 'Sin dato',
    gender: raw?.gender ?? 'Sin dato',
    origin: raw?.origin?.name ?? 'Sin dato',
    location: raw?.location?.name ?? 'Sin dato',
    image: raw?.image ?? null,
    episodeCount: Array.isArray(raw?.episode) ? raw.episode.length : 0
  }
}
