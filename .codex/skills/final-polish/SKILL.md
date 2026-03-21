---
name: final-polish
description: Perform final consistency, cleanup, refactor, and portfolio-readiness review across the full Nuxt API gallery project.
---

# Final Polish

## Use this skill when
- Most or all milestones are implemented
- Preparing the project for demo, portfolio, or handoff

## Goal
Turn a functional build into a coherent, presentable product.

## Final review checklist

### UX consistency
- all pages use the same shell
- headings feel consistent
- loading/error/empty states look related
- cards feel part of one design system

### Code consistency
- remove dead code
- remove unused imports
- reduce obvious duplication
- extract shared logic only where repetition is real
- verify naming consistency

### Content consistency
- homepage metadata matches real routes
- docs links are correct
- page descriptions are clean
- priorities/categories are accurate

### Technical quality
- check route integrity
- verify null-safe rendering across all demos
- verify no page feels unfinished
- confirm responsive behavior

## Anti-patterns
- large refactors with weak payoff at the end
- introducing new abstractions that destabilize working pages
- leaving inconsistent naming unresolved
- shipping pages with obviously different quality levels

## Done when
- the app feels like one product
- the codebase is cleaner than before this pass
- the project is ready to show publicly