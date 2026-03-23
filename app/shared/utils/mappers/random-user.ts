import type { RandomUserCard } from '~/shared/types/random-user'

export const mapRandomUserCard = (raw: any): RandomUserCard => {
  const first = raw?.name?.first ?? 'Usuario'
  const last = raw?.name?.last ?? 'sin apellido'
  const city = raw?.location?.city ?? 'Ciudad desconocida'
  const country = raw?.location?.country ?? 'Pais desconocido'
  const age = typeof raw?.dob?.age === 'number' ? raw.dob.age : null
  const nat = typeof raw?.nat === 'string' && raw.nat.trim() ? raw.nat.trim() : 'N/D'

  return {
    id: raw?.login?.uuid ?? `${first}-${last}-${city}`,
    name: `${first} ${last}`.trim(),
    email: raw?.email ?? 'Correo no disponible',
    location: `${city}, ${country}`,
    avatar: raw?.picture?.large ?? raw?.picture?.medium ?? null,
    role: `Perfil real normalizado para validar estados, grillas y variabilidad visual en una interfaz consistente.`,
    age,
    nationality: nat
  }
}
