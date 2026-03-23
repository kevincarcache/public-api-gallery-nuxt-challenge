export type ApiCatalogItem = {
  slug: string
  name: string
  category: string
  auth: string
  priority: number
  description: string
  interaction: string
  challenge: string
  coverImage: string
  coverAlt: string
  coverMode?: 'cover' | 'contain'
  coverPosition?: string
  coverBackground?: string
  route: string
  docsUrl: string
  status: 'active' | 'beta' | 'planned'
}
