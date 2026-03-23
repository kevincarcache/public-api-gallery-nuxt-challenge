import type { ApiCatalogItem } from '~/shared/types/api-catalog'

export const apiCatalog: ApiCatalogItem[] = [
  {
    slug: 'pokemon',
    name: 'PokeAPI',
    category: 'Games',
    auth: 'None',
    priority: 5,
    description: 'A polished Pokedex experience with search and detail views.',
    route: '/apis/pokemon',
    docsUrl: 'https://pokeapi.co/docs/v2',
    status: 'active'
  },
  {
    slug: 'rick-morty',
    name: 'Rick and Morty API',
    category: 'Sci-Fi',
    auth: 'None',
    priority: 5,
    description: 'Character explorer with filters, cards, and pagination.',
    route: '/apis/rick-morty',
    docsUrl: 'https://rickandmortyapi.com/documentation',
    status: 'active'
  },
  {
    slug: 'harry-potter',
    name: 'Harry Potter API',
    category: 'Fantasy',
    auth: 'None',
    priority: 4,
    description: 'House-based character browsing with quick filters.',
    route: '/apis/harry-potter',
    docsUrl: 'https://hp-api.onrender.com/',
    status: 'active'
  },
  {
    slug: 'ghibli',
    name: 'Studio Ghibli API',
    category: 'Film',
    auth: 'None',
    priority: 3,
    description: 'Film catalog with artwork, metadata, and long-form summaries.',
    route: '/apis/ghibli',
    docsUrl: 'https://ghibliapi.vercel.app/',
    status: 'active'
  },
  {
    slug: 'dogs',
    name: 'Dog API',
    category: 'Pets',
    auth: 'None',
    priority: 3,
    description: 'Breed selector with fast image refreshes.',
    route: '/apis/dogs',
    docsUrl: 'https://dog.ceo/dog-api/',
    status: 'active'
  },
  {
    slug: 'star-wars',
    name: 'SWAPI',
    category: 'Space',
    auth: 'None',
    priority: 4,
    description: 'Resource browser for people, planets, and starships.',
    route: '/apis/star-wars',
    docsUrl: 'https://swapi.dev/documentation',
    status: 'active'
  },
  {
    slug: 'trivia',
    name: 'Open Trivia DB',
    category: 'Trivia',
    auth: 'None',
    priority: 4,
    description: 'Interactive quiz flow with scoring and resets.',
    route: '/apis/trivia',
    docsUrl: 'https://opentdb.com/api_config.php',
    status: 'active'
  },
  {
    slug: 'random-users',
    name: 'Random User Generator',
    category: 'People',
    auth: 'None',
    priority: 3,
    description: 'User cards with avatars, locations, and refresh controls.',
    route: '/apis/random-users',
    docsUrl: 'https://randomuser.me/documentation',
    status: 'active'
  },
  {
    slug: 'meals',
    name: 'TheMealDB',
    category: 'Food',
    auth: 'None',
    priority: 4,
    description: 'Recipe search and detail view with ingredients parsing.',
    route: '/apis/meals',
    docsUrl: 'https://www.themealdb.com/api.php',
    status: 'active'
  },
  {
    slug: 'books',
    name: 'Open Library API',
    category: 'Books',
    auth: 'None',
    priority: 4,
    description: 'Searchable library results with cover fallbacks.',
    route: '/apis/books',
    docsUrl: 'https://openlibrary.org/developers/api',
    status: 'active'
  }
]
