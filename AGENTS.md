# AGENTS.md

## Mission

Build a **Nuxt-based public API gallery website** where:

- the homepage displays a grid of API cards
- each card links to a dedicated demo page
- each demo page consumes **real data** from a public API
- the overall product feels coherent, reusable, and portfolio-ready

This repository is not a random collection of demos.  
It must feel like **one product** with shared UX, shared architecture, and consistent implementation quality.

---

## Product Scope

The app must include demos for these 11 APIs:

1. The Simpsons API
2. PokéAPI
3. Rick and Morty API
4. Harry Potter API
5. Studio Ghibli API
6. Dog API
7. SWAPI
8. Open Trivia DB
9. Random User Generator
10. TheMealDB
11. Open Library API

---

## Required Stack

Use:

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- Composition API
- `useFetch` / `$fetch`
- Nuxt server routes when useful

Do not add dependencies unless they clearly simplify implementation or improve maintainability.

---

## High-Level Goals

The implementation must optimize for:

- clarity
- consistency
- maintainability
- incremental delivery
- null-safe rendering
- responsive design
- real API integration

---

## Non-Goals

Do not optimize for:

- excessive abstraction
- speculative architecture
- complex state management without need
- visually disconnected demo pages
- placeholder-only routes
- fake data masquerading as real integrations

---

## Autonomy Rules

### 1. Act autonomously by default
Default to autonomous execution.

Do not stop for confirmation for normal Git, implementation, verification, or commit steps unless blocked by:
- a real ambiguity that prevents safe progress
- missing required secrets or environment configuration
- unsafe unrelated local changes
- missing project artifacts required for the workflow

If multiple reasonable implementation options exist:
- choose the simpler option
- prefer consistency with the existing codebase
- prefer maintainability over novelty

### 2. Make sensible defaults
When details are not fully specified, choose practical defaults that fit the mission of the repository.

Examples:
- use shared components when repetition is real
- use server routes when integration logic becomes noisy
- use responsive card-based layouts
- use safe fallbacks for missing API data

### 3. Prefer repo skills for repeatable workflows
When a relevant skill exists in `.agents/skills/`, prefer using that skill instead of re-deriving the workflow from scratch.

This applies especially to:
- milestone execution
- Gitflow workflows
- API integration patterns
- fetch state handling
- final polish and verification

### 4. Finish functional slices
Prefer completing one functional slice at a time over scattering partial scaffolding across many files.

Do not leave behind:
- empty placeholder pages
- dead routes
- incomplete components without integration
- unused abstractions

### 5. Keep the app runnable
At the end of each milestone, the app must still run and remain navigable.

---

## Planning Source of Truth

Use `PLANS.md` as the execution roadmap for the repository.

Rules:
- execute milestones sequentially from `PLANS.md`
- complete one milestone at a time, but continue to the next pending milestone when an autonomous roadmap skill explicitly defines a continuous execution loop
- use the milestone scope, acceptance criteria, and verification steps defined in `PLANS.md`
- update milestone status in `PLANS.md` when milestone-based workflows require it
- do not invent milestone scope outside `PLANS.md` unless required to fix blocking issues

---

## Gitflow Integration Policy

Autonomous milestone workflows may:
- create feature branches from `develop`
- commit completed milestone work
- merge completed milestones back into `develop` after successful verification

Autonomous workflows must never:
- merge into `main` unless explicitly instructed
- discard unrelated local changes
- push unless explicitly instructed

---

## Verification Rules

### 1. Validate changes before considering work complete
After each milestone or significant implementation step:

- run lint if configured
- run typecheck if configured
- run tests if present
- fix introduced errors
- verify the affected routes render without obvious breakage

### 2. Review UI behavior
For UI work, verify:
- loading state exists
- error state exists
- empty state exists
- layout works on small and large screens
- missing API fields do not break rendering

### 3. Do not mark work complete if broken
If the feature is partially implemented but build, route behavior, or rendering is broken, continue until it reaches a stable state.

---

## Execution Rules

### 1. Prefer server routes when integration complexity grows
Use `server/api/*` when:
- external API URLs are messy
- response mapping is required
- pagination/filtering logic becomes repetitive
- the page becomes too coupled to the raw external schema

### 2. Do not over-abstract early
Only extract shared components/composables when there is actual repetition.

### 3. Keep visual consistency
All pages must feel like they belong to the same product.

### 4. Handle incomplete data safely
Never assume:
- image exists
- description exists
- list is non-empty
- optional fields are present
- the remote API response is perfectly stable

---

## Required Routes

Implement these routes:

- `/`
- `/apis/simpsons`
- `/apis/pokemon`
- `/apis/rick-morty`
- `/apis/harry-potter`
- `/apis/ghibli`
- `/apis/dogs`
- `/apis/star-wars`
- `/apis/trivia`
- `/apis/random-users`
- `/apis/meals`
- `/apis/books`

Recommended dynamic detail routes when appropriate:

- `/apis/pokemon/[name]`
- `/apis/rick-morty/character/[id]`
- `/apis/meals/[id]`
- `/apis/books/[workId]`

---

## Required Shared Structure

The project should converge toward this structure:

```bash
/
├── app/
│   ├── app.vue
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── cards/
│   │   ├── common/
│   │   └── sections/
│   ├── composables/
│   ├── data/
│   │   └── api-catalog.ts
│   ├── pages/
│   │   ├── index.vue
│   │   └── apis/
│   │       ├── simpsons.vue
│   │       ├── pokemon.vue
│   │       ├── rick-morty.vue
│   │       ├── harry-potter.vue
│   │       ├── ghibli.vue
│   │       ├── dogs.vue
│   │       ├── star-wars.vue
│   │       ├── trivia.vue
│   │       ├── random-users.vue
│   │       ├── meals.vue
│   │       └── books.vue
│   └── shared/
│       ├── types/
│       └── utils/
├── nuxt.config.ts
├── server/
│   └── api/
└── public/
```

---

## Required Shared Data Source

Create and use a central catalog file:

* `app/data/api-catalog.ts`

Each item should include:

* `slug`
* `name`
* `category`
* `auth`
* `priority`
* `description`
* `route`
* `docsUrl`
* `status`

The homepage must render from this catalog, not from duplicated inline content.

---

## Required Shared Components

At minimum, implement these reusable components or equivalents if naming differs consistently:

### Layout

* `AppHeader.vue`
* `AppFooter.vue`
* `PageContainer.vue`

### Cards

* `ApiCard.vue`
* `CharacterCard.vue`
* `MovieCard.vue`
* `RecipeCard.vue`
* `UserCard.vue`

### Common

* `SearchBar.vue`
* `FilterBar.vue`
* `PaginationControls.vue`
* `LoadingGrid.vue`
* `ErrorState.vue`
* `EmptyState.vue`
* `SectionHeader.vue`

Equivalent alternatives are acceptable if they are clearly named and consistently used.

---

## Page-Level UX Requirements

Every API page must implement:

### Loading state

* visible skeletons or loaders
* no blank data area during fetch

### Error state

* human-readable message
* visually integrated with the page

### Empty state

* clear message for no results
* no broken layout

### Null-safe rendering

* placeholder or fallback for missing images
* safe handling of missing text fields
* safe iteration over possibly empty arrays

---

## Required Functional Behavior

Each demo page must include at least one meaningful interaction.

Acceptable interactions include:

* search
* filtering
* pagination
* view switching
* detail view
* selector-based fetch
* quiz flow
* reload/generate action
* sorting

A page that only fetches and dumps raw JSON is not acceptable.

---

## TypeScript Rules

* Prefer explicit interfaces/types for meaningful data structures
* Avoid `any` unless the usage is narrowly scoped and justified
* Type API mapping layers when practical
* Keep types readable; do not create overly complex generic systems

---

## Styling Rules

* Use Tailwind consistently
* Maintain spacing rhythm across pages
* Avoid one-off styles that break visual consistency
* Responsive behavior is required
* Prefer clean, modern, card-based layouts

---

## Code Quality Rules

### Do

* use clear names
* keep files focused
* extract duplication when repetition is real
* use composables for repeated fetch/filter logic
* keep page components readable
* use server routes where they simplify code
* keep route names, catalog entries, and page files aligned
* update project documentation when structural changes are introduced

### Do not

* leave dead code
* create giant utility dumping grounds
* hardcode mock datasets as the main experience
* create empty placeholder pages
* introduce unnecessary global state
* build a design system far beyond project needs

---

## Definition of Done

The repository is done when:

* homepage renders 11 API cards
* all 11 demo routes exist and work
* each demo consumes real remote data
* each demo has loading, error, and empty states
* the design is visually consistent
* the app is responsive
* the codebase is clean enough for future extension

---

## Delivery Expectations

Implement the project milestone by milestone.

For each milestone:

* complete all required tasks
* verify acceptance criteria
* keep the app working
* avoid partial unfinished scaffolding unless explicitly planned

When in doubt:

* choose the simpler implementation
* preserve maintainability
* prefer consistency over novelty
* continue making progress without asking for confirmation unless truly blocked
