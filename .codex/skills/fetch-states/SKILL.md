---
name: fetch-states
description: Apply consistent loading, error, empty, retry, and null-safe rendering states to all API-driven pages.
---

# Fetch States

## Use this skill when
- Building any page that fetches remote data
- Refactoring a page that has weak or inconsistent state handling

## Goal
Make remote-data pages resilient and user-friendly.

## Required states

### Loading
- show a visible loading UI
- use skeletons or loaders integrated with the page layout
- avoid blank sections

### Error
- show a clear message
- include retry action where practical
- keep the page shell visible

### Empty
- show a clear “no results” state
- preserve page spacing and layout integrity

### Success
- render data only after checking safety
- avoid assumptions about field completeness

## Retry behavior
If the page structure allows it, include a retry action:
- refetch request
- preserve current filters if sensible

## Null-safe rendering checklist
- fallback for missing images
- fallback for missing descriptions
- guard optional arrays before looping
- do not assume first item exists

## Anti-patterns
- `v-if` chains that produce blank sections without explanation
- error text that is too technical
- loading indicators disconnected from the target content
- empty states that look like bugs

## Done when
- the user can always tell whether the page is loading, broken, empty, or ready
- the page never appears mysteriously blank