# PLANS.md

## Objective

Build a **Nuxt website** that acts as a **gallery of public API demos**.

The app must include:

- a homepage with 11 API cards
- one dedicated page per API
- real API consumption
- consistent UI/UX
- reusable shared components
- responsive layouts
- loading, error, and empty states across demos

This plan is organized as executable milestones for an implementation agent.

## Nuxt Component Naming

With the current `app/components/*` folder structure, Nuxt auto-imports components using directory-based prefixes by default.
Use names such as:

- `LayoutAppHeader`
- `LayoutPageContainer`
- `CommonSearchBar`
- `CommonFilterBar`
- `CommonSectionHeader`
- `CommonLoadingGrid`
- `CommonErrorState`
- `CommonEmptyState`
- `CommonPaginationControls`
- `CardsApiCard`
- `CardsCharacterCard`
- `SectionsHeroSection`

If this naming is changed in the future, it must be done explicitly via Nuxt component configuration rather than by assuming flat component names.

---

# Milestone 0 — Project Scaffold

## Goal

Create the initial Nuxt project foundation and ensure the repository is runnable.

## Tasks

- initialize Nuxt project with TypeScript
- configure Tailwind CSS
- verify base app runs locally
- create top-level folder structure
- create placeholder route structure for all API pages
- ensure navigation can be added incrementally without breaking the app

## Files to create or modify

- `package.json`
- `nuxt.config.ts`
- `app/app.vue`
- `app/pages/index.vue`
- `app/pages/apis/simpsons.vue`
- `app/pages/apis/pokemon/index.vue`
- `app/pages/apis/rick-morty/index.vue`
- `app/pages/apis/harry-potter.vue`
- `app/pages/apis/ghibli.vue`
- `app/pages/apis/dogs.vue`
- `app/pages/apis/star-wars.vue`
- `app/pages/apis/trivia.vue`
- `app/pages/apis/random-users.vue`
- `app/pages/apis/meals/index.vue`
- `app/pages/apis/books.vue`

## Acceptance Criteria

- Nuxt app boots successfully
- Tailwind is working
- all required route files exist
- the app is navigable and does not crash
- no route returns an unhandled runtime error

## Status

Completed ✅

Completion: 2026-03-20 — feature/m0-project-scaffold — commit TBD

## Notes

Pages may be minimal at this stage, but the app must remain structurally sound.

---

# Milestone 1 — Homepage, Layout, and Catalog

## Goal

Build the shared product shell and the homepage grid driven by a central API catalog.

## Tasks

- create shared layout components
- create central `api-catalog` data source
- build homepage hero/intro section
- render a responsive grid of 11 API cards
- make each card navigate to its demo page
- display API metadata on each card:
  - name
  - category
  - auth
  - demo idea
  - priority

## Files to create or modify

- `app/data/api-catalog.ts`
- `app/components/layout/AppHeader.vue`
- `app/components/layout/AppFooter.vue`
- `app/components/layout/PageContainer.vue`
- `app/components/cards/ApiCard.vue`
- `app/components/sections/HeroSection.vue`
- `app/pages/index.vue`

## Acceptance Criteria

- homepage renders 11 cards from catalog data
- card rendering is not hardcoded inline per API
- layout is responsive
- navigation from cards works
- app has a coherent header/footer/page shell

## Status

Completed ✅

Completion: 2026-03-20 — feature/m1-homepage-layout-catalog — commit TBD

## Notes

This milestone establishes the visual identity and navigation pattern for the whole app.

---

# Milestone 2 — Shared UI Infrastructure

## Goal

Create reusable UI primitives and basic fetch-state patterns used across demo pages.

## Tasks

- create reusable loading component
- create reusable error component
- create reusable empty-state component
- create shared search input component
- create shared filter container/component
- create pagination controls
- create a small composable or helper for fetch-state ergonomics if useful
- define initial shared types for catalog and reusable card-like UI models

## Files to create or modify

- `app/components/common/SearchBar.vue`
- `app/components/common/FilterBar.vue`
- `app/components/common/PaginationControls.vue`
- `app/components/common/LoadingGrid.vue`
- `app/components/common/ErrorState.vue`
- `app/components/common/EmptyState.vue`
- `app/components/common/SectionHeader.vue`
- `app/composables/useSafeFetch.ts` or equivalent
- `app/shared/types/api-catalog.ts`
- `app/shared/types/shared.ts`

## Acceptance Criteria

- shared components are visually consistent
- components are usable by multiple pages
- loading/error/empty states are available for all later milestones
- the codebase is more prepared for rapid page implementation

## Status

Completed ✅

Completion: 2026-03-20 — feature/m2-shared-ui — commit TBD

## Notes

Do not over-engineer a generic framework. Keep components practical.

---

# Milestone 3 — PokéAPI Demo

## Goal

Implement a full Pokédex experience.

## Tasks

- create Pokémon list page
- fetch paginated Pokémon data
- display cards with image and name
- add search by Pokémon name
- show Pokémon types
- show Pokémon stats
- implement detail view or detail panel
- add loading/error/empty states

## Recommended Files

- `app/pages/apis/pokemon/index.vue`
- `app/pages/apis/pokemon/[name].vue` recommended
- `app/components/cards/CharacterCard.vue` or Pokémon-specific card if needed
- `server/api/pokemon/*` if encapsulation is useful
- `app/shared/types/pokemon.ts`
- `app/shared/utils/mappers/pokemon.ts`

## Acceptance Criteria

- Pokémon list renders successfully
- search works
- detail experience exists
- types and stats are visible
- page is responsive
- fetch states are handled explicitly

## Status

Completed ✅

Completion: 2026-03-20 — feature/m3-pokemon-demo — commit TBD

## Notes

This is one of the flagship demos and should feel polished.

---

# Milestone 4 — Rick and Morty Demo

## Goal

Implement a character explorer with search and filters.

## Tasks

- fetch characters
- render character cards with images
- implement search by name
- implement filter by status and/or species
- support pagination
- optionally add character detail route
- handle loading/error/empty states

## Recommended Files

- `app/pages/apis/rick-morty/index.vue`
- `app/pages/apis/rick-morty/character/[id].vue` optional
- `server/api/rick-morty/*`
- `app/shared/types/rick-morty.ts`
- `app/shared/utils/mappers/rick-morty.ts`

## Acceptance Criteria

- characters render correctly
- search works
- at least one meaningful filter works
- pagination works or navigation between result sets is clear
- UI is consistent with rest of app

## Status

Completed ✅

Completion: 2026-03-20 — feature/m4-rick-morty-demo — commit TBD

---

# Milestone 5 — Simpsons and Harry Potter Demos

## Goal

Implement two entertainment-focused demos with filtering and gallery behavior.

## Tasks — Simpsons
- fetch Simpsons characters
- show image-based gallery
- support search by name
- show brief character details
- optionally include episodes if cleanly feasible

## Tasks — Harry Potter
- fetch characters
- support filtering by house
- support search by name
- display house information clearly
- optionally include spells section if practical

## Recommended Files

- `app/pages/apis/simpsons.vue`
- `app/pages/apis/harry-potter.vue`
- `server/api/simpsons/*`
- `server/api/harry-potter/*`
- `app/shared/types/simpsons.ts`
- `app/shared/types/harry-potter.ts`

## Acceptance Criteria

- both pages consume real API data
- both pages provide useful interaction
- both pages use shared UI patterns
- missing images or fields do not break rendering
- both pages are responsive

## Status

Completed ✅

Completion: 2026-03-20 — feature/m5-simpsons-harry-potter — commit TBD

---

# Milestone 6 — Dog API and Random User Demos

## Goal

Implement two lighter but highly visual demos.

## Tasks — Dog API
- fetch list of breeds
- allow breed selection
- display image for selected breed
- support reload/regenerate image
- keep page fast and visually clean

## Tasks — Random User
- fetch a batch of users
- display cards with image, name, email, and location
- allow regenerate/reload
- optionally support batch size or simple filter

## Recommended Files

- `app/pages/apis/dogs.vue`
- `app/pages/apis/random-users.vue`
- `app/components/cards/UserCard.vue`
- `server/api/dogs/*`
- `server/api/random-users/*`
- `app/shared/types/dogs.ts`
- `app/shared/types/random-user.ts`

## Acceptance Criteria

- both demos are functional
- dog breed selection works
- random users reload cleanly
- cards are consistent and responsive
- empty/loading/error states are implemented

## Status

Completed ✅

Completion: 2026-03-20 — feature/m6-dogs-random-users — commit TBD

---

# Milestone 7 — Open Trivia DB Demo

## Goal

Implement a complete interactive quiz flow.

## Tasks

- create quiz setup form
- allow configuration of:
  - number of questions
  - category
  - difficulty
- fetch questions using selected config
- render question flow
- handle answer selection
- track score
- show result screen
- add reset/restart flow
- ensure entities/encoded text are displayed properly if needed

## Recommended Files

- `app/pages/apis/trivia.vue`
- `server/api/trivia/*`
- `app/shared/types/trivia.ts`
- quiz-specific components if needed

## Acceptance Criteria

- quiz setup works
- questions load correctly
- answers can be selected
- score is calculated correctly
- quiz can restart without app breakage
- experience is understandable on mobile

## Notes

This is one of the most interactive demos and should feel complete.

## Status

Completed ✅

Completion: 2026-03-20 — feature/m7-trivia-demo — commit TBD

---

# Milestone 8 — TheMealDB Demo

## Goal

Implement a recipe search and detail experience.

## Tasks

- create recipe search UI
- support search by meal name
- show visual recipe results
- display recipe detail
- list ingredients in readable format
- show instructions cleanly
- handle no-result cases

## Recommended Files

- `app/pages/apis/meals/index.vue`
- `app/pages/apis/meals/[id].vue` recommended
- `app/components/cards/RecipeCard.vue`
- `server/api/meals/*`
- `app/shared/types/meals.ts`
- `app/shared/utils/mappers/meals.ts`

## Acceptance Criteria

- recipe search works
- results display correctly
- details are readable and complete
- ingredients are parsed safely
- null/incomplete fields do not break UI

## Status

Completed ✅

Completion: 2026-03-20 — feature/m8-mealdb-demo — commit TBD

---

# Milestone 9 — Studio Ghibli, SWAPI, and Open Library

## Goal

Complete the remaining three APIs with clean, useful demos.

## Tasks — Studio Ghibli
- fetch films
- display film list/grid
- show title, image or fallback, year, director, producer
- show detailed description

## Tasks — SWAPI
- build resource selector or tabs
- implement at least two resource categories well, preferably:
  - people
  - planets
  - starships
- support search
- display readable details

## Tasks — Open Library
- implement book search by title and/or author
- show covers when available
- provide fallback when cover is missing
- display useful metadata
- optionally add detail route or expanded book panel

## Recommended Files

- `app/pages/apis/ghibli.vue`
- `app/pages/apis/star-wars.vue`
- `app/pages/apis/books.vue`
- `server/api/ghibli/*`
- `server/api/star-wars/*`
- `server/api/books/*`
- `app/shared/types/ghibli.ts`
- `app/shared/types/star-wars.ts`
- `app/shared/types/books.ts`

## Acceptance Criteria

- all three demos consume real data
- each has at least one meaningful interaction
- shared states are used consistently
- layout remains coherent across pages
- fallbacks exist for missing media/data

## Status

Completed ✅

Completion: 2026-03-20 — feature/m9-remaining-api-demos — commit TBD

---

# Milestone 10 — Polish, Refactor, and Portfolio Readiness

## Goal

Bring the whole project to a consistent, presentable, portfolio-quality finish.

## Tasks

- review spacing, hierarchy, and responsiveness
- ensure all pages use the shared shell consistently
- add basic SEO metadata for homepage and demo pages
- remove dead code and redundant logic
- refactor repeated patterns where clearly beneficial
- verify links and route behavior
- ensure catalog metadata is accurate and useful
- confirm all pages handle loading/error/empty states
- ensure app is coherent on mobile, tablet, and desktop

## Files to review

- all pages under `app/pages`
- shared components under `app/components`
- composables under `app/composables`
- server routes
- `app/data/api-catalog.ts`
- `nuxt.config.ts`

## Status

Completed ✅

Completion: 2026-03-20 — feature/m10-final-polish — commit TBD

## Acceptance Criteria

- the app feels like one coherent product
- homepage and all demos are presentable
- no major visual inconsistency remains
- no demo route feels unfinished
- the codebase is maintainable and easy to extend

---

# Global Constraints

## Must Do

- use real API data
- keep the homepage catalog-driven
- keep the app responsive
- handle null/missing data safely
- keep naming and file structure clear
- prefer practical reuse over copy-paste when repetition is real

## Must Not Do

- leave empty placeholder pages
- fake integrations with static hardcoded datasets
- build a giant abstraction layer too early
- add unnecessary dependencies
- let one page drift visually away from the rest
- dump raw JSON as the main user experience

---

# Global Definition of Done

The project is done when:

- `/` shows 11 cards
- all 11 demo routes work
- each demo consumes real API data
- each demo has loading, error, and empty states
- each demo has at least one useful interaction
- the app is responsive
- the visual language is consistent
- the repository is clean enough for future iteration

---

# Suggested Execution Order

1. Milestone 0 — Project Scaffold
2. Milestone 1 — Homepage, Layout, and Catalog
3. Milestone 2 — Shared UI Infrastructure
4. Milestone 3 — PokéAPI Demo
5. Milestone 4 — Rick and Morty Demo
6. Milestone 5 — Simpsons and Harry Potter Demos
7. Milestone 6 — Dog API and Random User Demos
8. Milestone 7 — Open Trivia DB Demo
9. Milestone 8 — TheMealDB Demo
10. Milestone 9 — Studio Ghibli, SWAPI, and Open Library
11. Milestone 10 — Polish, Refactor, and Portfolio Readiness
