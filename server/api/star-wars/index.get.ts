import type { StarWarsResource, StarWarsResponse } from '~/shared/types/star-wars'

type SwapiRecord = Record<string, string | string[] | undefined>

interface SwapiResponse {
  results?: SwapiRecord[]
}

const allowedResources: StarWarsResource[] = ['people', 'planets', 'starships']

const toStatEntries = (record: SwapiRecord, labels: Array<[string, string]>) => {
  return labels
    .map(([key, label]) => ({
      label,
      value: Array.isArray(record[key]) ? record[key].join(', ') : record[key] ?? 'Unknown'
    }))
    .filter((entry) => entry.value && entry.value !== 'n/a')
}

const resourceConfig: Record<
  StarWarsResource,
  {
    titleKey: string
    subtitle: (record: SwapiRecord) => string
    description: (record: SwapiRecord) => string
    stats: Array<[string, string]>
  }
> = {
  people: {
    titleKey: 'name',
    subtitle: (record) => `Birth year: ${record.birth_year ?? 'Unknown'}`,
    description: (record) => `Hair ${record.hair_color ?? 'unknown'}, eyes ${record.eye_color ?? 'unknown'}, gender ${record.gender ?? 'unknown'}.`,
    stats: [
      ['height', 'Height'],
      ['mass', 'Mass'],
      ['skin_color', 'Skin'],
      ['homeworld', 'Homeworld']
    ]
  },
  planets: {
    titleKey: 'name',
    subtitle: (record) => `Climate: ${record.climate ?? 'Unknown'}`,
    description: (record) => `Terrain ${record.terrain ?? 'unknown'} with population ${record.population ?? 'unknown'}.`,
    stats: [
      ['diameter', 'Diameter'],
      ['gravity', 'Gravity'],
      ['population', 'Population'],
      ['terrain', 'Terrain']
    ]
  },
  starships: {
    titleKey: 'name',
    subtitle: (record) => `Model: ${record.model ?? 'Unknown'}`,
    description: (record) => `Manufacturer ${record.manufacturer ?? 'unknown'} with crew ${record.crew ?? 'unknown'}.`,
    stats: [
      ['starship_class', 'Class'],
      ['hyperdrive_rating', 'Hyperdrive'],
      ['crew', 'Crew'],
      ['passengers', 'Passengers']
    ]
  }
}

export default defineEventHandler(async (event): Promise<StarWarsResponse> => {
  const query = getQuery(event)
  const resource = allowedResources.includes(query.resource as StarWarsResource)
    ? (query.resource as StarWarsResource)
    : 'people'
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const searchParams = new URLSearchParams()

  if (search) {
    searchParams.set('search', search)
  }

  const endpoint = `https://swapi.py4e.com/api/${resource}/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await $fetch<SwapiResponse>(endpoint)
  const config = resourceConfig[resource]

  return {
    items: (response.results ?? []).map((record, index) => ({
      id: `${resource}-${index}-${String(record.url ?? record.name ?? record.title ?? index)}`,
      name: String(record[config.titleKey] ?? 'Unknown'),
      subtitle: config.subtitle(record),
      description: config.description(record),
      stats: toStatEntries(record, config.stats)
    })),
    resource,
    search
  }
})
