---
name: nuxt-page-pattern
description: Build a Nuxt page using the shared project shell, SEO, fetch states, responsive layout, and reusable page sections.
---

# Nuxt Page Pattern

## Use this skill when
- Creating a new page under `pages/`
- Refactoring an API demo page to match project standards
- Adding a new route that should feel consistent with the rest of the app

## Goal
Ensure every page in the API gallery follows the same structural pattern and does not drift visually or architecturally.

## Required page structure
Each page should, when applicable, include:

1. `useSeoMeta` with a meaningful title and description
2. `PageContainer` or equivalent shared wrapper
3. `SectionHeader` with page title and short description
4. a controls area for search/filter/sort if needed
5. a results area
6. explicit loading state
7. explicit error state
8. explicit empty state
9. null-safe rendering for remote fields
10. responsive layout

## Standard implementation checklist
- Add page title and description
- Use shared layout components
- Avoid inline one-off spacing patterns if shared utilities already exist
- Keep the main content width readable
- Prefer card-based result layouts
- Use consistent gap, padding, and hierarchy
- Do not dump raw JSON

## Preferred component usage
- `PageContainer`
- `SectionHeader`
- `SearchBar`
- `FilterBar`
- `LoadingGrid`
- `ErrorState`
- `EmptyState`

## Anti-patterns
- Building each page from scratch with unrelated layout conventions
- Missing loading/error/empty states
- Full-page custom styling that visually disconnects the route from the app
- Hardcoding data directly in the page instead of using real fetch logic

## Done when
- The page looks and behaves like it belongs to the same product as the other routes
- The fetch flow is explicit and robust
- The page is responsive
- Missing fields do not break the UI