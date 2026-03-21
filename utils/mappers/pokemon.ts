import type { PokemonDetail, PokemonListItem, PokemonStat } from '~/types/pokemon'

const fallbackImage = (raw: any): string | null => {
  return (
    raw?.sprites?.other?.['official-artwork']?.front_default ||
    raw?.sprites?.front_default ||
    null
  )
}

const mapStats = (raw: any): PokemonStat[] => {
  if (!Array.isArray(raw?.stats)) return []

  return raw.stats.map((stat: any) => ({
    label: stat?.stat?.name ?? 'stat',
    value: Number(stat?.base_stat ?? 0)
  }))
}

export const mapPokemonListItem = (raw: any): PokemonListItem => {
  return {
    id: Number(raw?.id ?? 0),
    name: raw?.name ?? 'Unknown',
    image: fallbackImage(raw),
    types: Array.isArray(raw?.types)
      ? raw.types.map((type: any) => type?.type?.name ?? 'unknown')
      : [],
    stats: mapStats(raw)
  }
}

export const mapPokemonDetail = (raw: any): PokemonDetail => {
  return {
    ...mapPokemonListItem(raw),
    height: Number(raw?.height ?? 0),
    weight: Number(raw?.weight ?? 0),
    abilities: Array.isArray(raw?.abilities)
      ? raw.abilities.map((ability: any) => ability?.ability?.name ?? 'unknown')
      : []
  }
}
