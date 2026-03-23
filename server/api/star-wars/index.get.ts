import type { StarWarsResource, StarWarsResponse } from '~/shared/types/star-wars'

type SwapiRecord = Record<string, string | string[] | undefined>

interface SwapiResponse {
  results?: SwapiRecord[]
}

const allowedResources: StarWarsResource[] = ['people', 'planets', 'starships']

const isMeaningfulValue = (value: string) => value !== 'n/a' && value !== 'unknown' && value !== 'none'

const toReadableValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    const items = value.map((entry) => String(entry).trim()).filter(Boolean)
    return items.length ? items.join(', ') : 'Sin dato'
  }

  const normalized = String(value ?? '').trim()
  if (!normalized || !isMeaningfulValue(normalized.toLowerCase())) {
    return 'Sin dato'
  }

  return normalized
}

const toSentenceValue = (value: string | string[] | undefined, fallback = 'sin dato') => {
  const readable = toReadableValue(value)
  return readable === 'Sin dato' ? fallback : readable
}

const toStatEntries = (record: SwapiRecord, labels: Array<[string, string]>) => {
  return labels
    .map(([key, label]) => ({
      label,
      value: toReadableValue(record[key])
    }))
    .filter((entry) => entry.value !== 'Sin dato')
}

const linkedNameCache = new Map<string, string>()

const resolveLinkedName = async (url: string | undefined) => {
  if (!url) {
    return 'Sin dato'
  }

  const normalizedUrl = url.trim()
  if (!normalizedUrl) {
    return 'Sin dato'
  }

  const cachedValue = linkedNameCache.get(normalizedUrl)
  if (cachedValue) {
    return cachedValue
  }

  try {
    const response = await $fetch<Record<string, unknown>>(normalizedUrl)
    const resolved = String(response.name ?? response.title ?? 'Sin dato')
    linkedNameCache.set(normalizedUrl, resolved)
    return resolved
  }
  catch {
    return 'Sin dato'
  }
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
    subtitle: (record) => `Nacimiento: ${toSentenceValue(record.birth_year, 'Sin dato')}`,
    description: (record) => `Cabello ${toSentenceValue(record.hair_color)}, ojos ${toSentenceValue(record.eye_color)}, genero ${toSentenceValue(record.gender)}.`,
    stats: [
      ['height', 'Altura'],
      ['mass', 'Masa'],
      ['skin_color', 'Piel'],
      ['homeworld', 'Planeta']
    ]
  },
  planets: {
    titleKey: 'name',
    subtitle: (record) => `Clima: ${toSentenceValue(record.climate, 'Sin dato')}`,
    description: (record) => `Terreno ${toSentenceValue(record.terrain)} con poblacion ${toSentenceValue(record.population)}.`,
    stats: [
      ['diameter', 'Diametro'],
      ['gravity', 'Gravedad'],
      ['population', 'Poblacion'],
      ['terrain', 'Terreno']
    ]
  },
  starships: {
    titleKey: 'name',
    subtitle: (record) => `Modelo: ${toSentenceValue(record.model, 'Sin dato')}`,
    description: (record) => `Fabricante ${toSentenceValue(record.manufacturer)} con tripulacion ${toSentenceValue(record.crew)}.`,
    stats: [
      ['starship_class', 'Clase'],
      ['hyperdrive_rating', 'Hyperdrive'],
      ['crew', 'Tripulacion'],
      ['passengers', 'Pasajeros']
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
  const records = response.results ?? []

  const items = await Promise.all(records.map(async (record, index) => {
    const normalizedRecord = { ...record }

    if (resource === 'people') {
      normalizedRecord.homeworld = await resolveLinkedName(String(record.homeworld ?? ''))
    }

    return {
      id: `${resource}-${index}-${String(record.url ?? record.name ?? record.title ?? index)}`,
      name: String(record[config.titleKey] ?? 'Sin nombre'),
      subtitle: config.subtitle(normalizedRecord),
      description: config.description(normalizedRecord),
      stats: toStatEntries(normalizedRecord, config.stats)
    }
  }))

  return {
    items,
    resource,
    search
  }
})
