---
name: card-ui-pattern
description: Build consistent visual cards for APIs, characters, recipes, films, users, and other catalog items across the project.
---

# Card UI Pattern

## Use this skill when
- Creating or refactoring card components
- Standardizing result grids across pages

## Goal
Make cards feel part of one shared design language.

## Core card anatomy
- optional image area
- title
- subtitle or secondary meta
- optional badges
- optional short description
- clear spacing
- hover/focus feedback
- safe fallback when media is missing

## Visual rules
- consistent border radius
- consistent padding
- consistent vertical rhythm
- no overcrowded metadata blocks
- truncate or clamp long text cleanly

## Interaction rules
- cards should be scannable
- CTA or click target should be obvious
- hover should not radically change layout

## Fallback behavior
- missing image should not collapse the card awkwardly
- missing description should not break alignment
- keep height reasonably stable in grids where practical

## Anti-patterns
- every page inventing its own card proportions
- oversized metadata sections
- raw API field labels exposed directly to users
- inconsistent image sizing

## Done when
- cards across pages look like part of the same app
- cards remain readable with incomplete data