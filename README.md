# Public API Gallery

Galería de integraciones construida con Nuxt 4, Vue 3, TypeScript y Vuetify. El objetivo del proyecto es mostrar cómo convertir APIs públicas reales en una experiencia de producto coherente, reusable y lista para portafolio.

La app no está pensada como una colección aislada de demos: comparte layout, catálogo central, componentes reutilizables, estados de carga/error/vacío y rutas consistentes para que todo se sienta como un solo producto.

## Qué incluye

- Homepage con 9 tarjetas generadas desde un catálogo central.
- 9 demos funcionales consumiendo datos reales de APIs públicas.
- Rutas de detalle para casos donde aporta más contexto.
- Server routes en Nuxt para encapsular fetches, mapeos y normalización.
- Componentes compartidos para búsqueda, filtros, paginación y estados de UI.
- Diseño responsive con Vuetify y una identidad visual unificada.

## APIs integradas

| API | Ruta | Interacción principal |
| --- | --- | --- |
| PokeAPI | `/apis/pokemon` | Búsqueda, paginación y detalle |
| Rick and Morty API | `/apis/rick-morty` | Filtros, paginación y detalle |
| Harry Potter API | `/apis/harry-potter` | Búsqueda local y filtro por casa |
| Studio Ghibli API | `/apis/ghibli` | Búsqueda, orden y película destacada |
| Dog API | `/apis/dogs` | Selector de raza y regeneración de imagen |
| Open Trivia DB | `/apis/trivia` | Configuración de quiz, progreso y resultados |
| Random User Generator | `/apis/random-users` | Tamaño de lote y regeneración |
| TheMealDB | `/apis/meals` | Búsqueda y detalle de receta |
| Open Library API | `/apis/books` | Búsqueda y panel de selección |

## Stack

- Nuxt 4
- Vue 3
- TypeScript
- Vuetify 4
- Composition API
- `useFetch` / `$fetch`
- Server routes con Nitro en `server/api/*`

## Estructura principal

```bash
.
├── app/
│   ├── app.vue
│   ├── assets/css/main.css
│   ├── components/
│   │   ├── cards/
│   │   ├── common/
│   │   ├── layout/
│   │   └── sections/
│   ├── composables/
│   ├── data/api-catalog.ts
│   ├── pages/
│   │   ├── index.vue
│   │   └── apis/
│   └── shared/
│       ├── types/
│       └── utils/mappers/
├── server/
│   └── api/
├── nuxt.config.ts
├── package.json
└── PLANS.md
```

## Arquitectura y convenciones

### 1. Catálogo central

La homepage renderiza desde [`app/data/api-catalog.ts`](./app/data/api-catalog.ts). Cada entrada define metadatos como:

- `slug`
- `name`
- `category`
- `auth`
- `priority`
- `description`
- `route`
- `docsUrl`
- `status`

Esto evita duplicación de contenido y mantiene alineados navegación, copy y cards.

### 2. UI compartida

El proyecto reutiliza componentes base para mantener consistencia entre demos:

- Layout: `LayoutAppHeader`, `LayoutPageContainer`, `LayoutAppFooter`
- Cards: `CardsApiCard`, `CardsCharacterCard`, `CardsMovieCard`, `CardsRecipeCard`, `CardsUserCard`
- Common: `CommonSearchBar`, `CommonFilterBar`, `CommonPaginationControls`, `CommonLoadingGrid`, `CommonErrorState`, `CommonEmptyState`, `CommonSectionHeader`

### 3. Integración segura con APIs

Cuando la API externa necesita limpieza o una mejor forma para el frontend, la integración pasa por `server/api/*`. Ahí se encapsulan:

- URLs externas
- parámetros de búsqueda o paginación
- mapeo de respuestas
- tolerancia a datos incompletos

Luego la UI consume modelos más estables y legibles desde `app/shared/types/*` y `app/shared/utils/mappers/*`.

### 4. Estados de fetch consistentes

Cada demo implementa explícitamente:

- loading state
- error state
- empty state
- null-safe rendering

El composable `useSafeFetch` ayuda a mantener ese patrón de forma uniforme.

## Rutas principales

### Home

- `/`

### Demos

- `/apis/pokemon`
- `/apis/rick-morty`
- `/apis/harry-potter`
- `/apis/ghibli`
- `/apis/dogs`
- `/apis/trivia`
- `/apis/random-users`
- `/apis/meals`
- `/apis/books`

### Detalle

- `/apis/pokemon/[name]`
- `/apis/rick-morty/character/[id]`
- `/apis/meals/[id]`

## Desarrollo local

### Requisitos

- Node.js 20+ recomendado
- npm instalado

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

La app queda disponible en [http://localhost:3000](http://localhost:3000).

### Build de producción

```bash
npm run build
```

### Preview local del build

```bash
npm run preview
```

### Generación estática

```bash
npm run generate
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run generate
```

## Configuración

Actualmente el proyecto no requiere variables de entorno para funcionar en local. Todas las integraciones usan APIs públicas.

La configuración principal está en [`nuxt.config.ts`](./nuxt.config.ts), donde se define:

- Vuetify como módulo principal
- tema visual `galleryDark`
- estilos globales
- metadata base de la app

## Roadmap

El archivo [`PLANS.md`](./PLANS.md) funciona como source of truth para la ejecución por hitos del proyecto. Ahí están definidos:

- milestones
- alcance por etapa
- criterios de aceptación
- reglas de verificación

## Estado actual

El repositorio ya cuenta con:

- estructura unificada de producto
- catálogo central de 9 APIs
- páginas demo activas
- server routes para integraciones reales
- componentes compartidos para UX consistente

## Próximas mejoras posibles

- agregar `lint` y `typecheck` como scripts explícitos en `package.json`
- sumar pruebas de smoke o integración para rutas clave
- incorporar capturas de pantalla o GIFs al README
- documentar decisiones de diseño o arquitectura por página

## Licencia

Este repositorio no declara una licencia en este momento.
