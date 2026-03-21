export type ApiCatalogItem = {
  slug: string
  name: string
  category: string
  auth: string
  priority: number
  description: string
  route: string
  docsUrl: string
  status: 'active' | 'beta' | 'planned'
}
