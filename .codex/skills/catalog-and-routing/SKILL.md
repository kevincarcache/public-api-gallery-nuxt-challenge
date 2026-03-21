---
name: catalog-and-routing
description: Maintain the homepage API catalog, route consistency, and metadata-driven navigation across the Nuxt project.
---

# Catalog and Routing

## Use this skill when
- Editing `data/api-catalog.ts`
- Adding or renaming API routes
- Updating homepage cards
- Verifying route consistency

## Goal
Keep the homepage and page routes driven by a single source of truth.

## Rules
- The homepage must render cards from `data/api-catalog.ts`
- Do not hardcode individual cards inline on the homepage
- Keep route names aligned with actual files under `pages/apis/`
- Ensure each catalog item has complete metadata

## Required metadata per catalog entry
- `slug`
- `name`
- `category`
- `auth`
- `priority`
- `description`
- `route`
- `docsUrl`
- `status`

## Routing conventions
- use stable, readable slugs
- avoid route duplication
- keep naming consistent between route path and catalog entry
- if a detail page exists, link to it using predictable params

## Anti-patterns
- homepage card content duplicated in multiple places
- broken card links
- stale docs URLs
- route names that drift from file names

## Done when
- homepage cards are fully data-driven
- all routes referenced in the catalog resolve correctly
- metadata is clean and current