import type { HarryPotterCharacter } from '~/shared/types/harry-potter'

export const mapHarryPotterCharacter = (raw: any): HarryPotterCharacter => {
  return {
    name: raw?.name ?? 'Unknown',
    house: raw?.house ?? 'Unknown',
    image: raw?.image ?? null,
    species: raw?.species ?? 'unknown',
    ancestry: raw?.ancestry ?? 'unknown',
    patronus: raw?.patronus ?? 'unknown',
    actor: raw?.actor ?? 'unknown'
  }
}
