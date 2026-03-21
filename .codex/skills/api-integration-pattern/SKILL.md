---
name: api-integration-pattern
description: Integrate external APIs into the Nuxt app using safe fetch patterns, server routes when appropriate, mapping layers, and null-safe UI models.
---

# API Integration Pattern

## Use this skill when
- Adding support for a new external API
- Refactoring a page that consumes raw API responses directly
- Creating `server/api/*` adapters

## Goal
Integrate external APIs cleanly without tightly coupling UI code to raw third-party schemas.

## Decision rules

### Prefer direct page fetch only when
- the endpoint is simple
- the page needs only one request
- there is little or no response transformation
- the page stays readable

### Prefer `server/api/*` when
- multiple external requests are needed
- response mapping is non-trivial
- the external schema is inconsistent
- pagination or query normalization is needed
- the page is becoming noisy

## Recommended layers
1. external API fetch
2. optional server route adapter
3. optional mapper
4. UI-safe model
5. page component

## Mapping rules
- Separate raw API types from UI-facing models
- Normalize missing image fields
- Normalize fallback text
- Avoid spreading raw nested structures directly into templates
- Keep transformations small and obvious

## Null-safety rules
Always assume:
- image may be missing
- text may be empty
- arrays may be empty
- some records may be malformed

## Error handling
- wrap external fetches cleanly
- surface human-readable error messages to the UI
- do not expose raw stack traces in the interface

## Anti-patterns
- giant page components full of raw mapping logic
- directly binding deeply nested external API fields all over the template
- assuming stable third-party schemas
- silently failing without user-visible state

## Done when
- the page reads cleanly
- external quirks are isolated
- the UI receives stable data
- missing or malformed API fields do not crash rendering