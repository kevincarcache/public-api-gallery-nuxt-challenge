import type { HarryPotterCharacter } from '~/shared/types/harry-potter'

export const mapHarryPotterCharacter = (raw: any): HarryPotterCharacter => {
  return {
    name: raw?.name ?? 'Sin nombre',
    house: raw?.house ?? 'Sin casa',
    image: raw?.image ?? null,
    species: raw?.species ?? 'Sin dato',
    ancestry: raw?.ancestry ?? 'Sin dato',
    patronus: raw?.patronus ?? 'Sin dato',
    actor: raw?.actor ?? 'Sin dato'
  }
}
