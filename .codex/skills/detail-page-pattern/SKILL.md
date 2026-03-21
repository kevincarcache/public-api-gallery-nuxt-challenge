---
name: detail-page-pattern
description: Build consistent detail pages or detail panels for entities such as Pokémon, recipes, books, or characters.
---

# Detail Page Pattern

## Use this skill when
- Creating dynamic routes like `[name].vue` or `[id].vue`
- Adding modal/detail panel experiences
- Refactoring detail views for consistency

## Goal
Present entity-level details clearly without overcomplicating the route structure.

## Preferred structure
1. top breadcrumb or back navigation
2. title and hero/detail header
3. key metadata block
4. main detail content
5. related structured sections
6. loading/error/empty states

## Good candidates for detail views
- Pokémon
- Meals
- Books
- Rick and Morty characters

## Rules
- use route params safely
- validate param presence before fetch
- handle not-found cases clearly
- avoid huge unstructured text dumps
- group metadata into readable sections

## Anti-patterns
- deeply nested templates with raw API fields everywhere
- no clear way back to the list page
- broken route if ID or name is invalid
- mixing list and detail concerns too heavily in one file unless clearly simpler

## Done when
- the detail experience is readable, robust, and visually aligned with the rest of the app