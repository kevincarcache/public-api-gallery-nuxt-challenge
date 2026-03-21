import type { RandomUserCard } from '~/shared/types/random-user'

export const mapRandomUserCard = (raw: any): RandomUserCard => {
  const first = raw?.name?.first ?? 'Unknown'
  const last = raw?.name?.last ?? 'User'
  const city = raw?.location?.city ?? 'Unknown city'
  const country = raw?.location?.country ?? 'Unknown country'

  return {
    id: raw?.login?.uuid ?? `${first}-${last}-${city}`,
    name: `${first} ${last}`.trim(),
    email: raw?.email ?? 'No email provided',
    location: `${city}, ${country}`,
    avatar: raw?.picture?.large ?? raw?.picture?.medium ?? null
  }
}
