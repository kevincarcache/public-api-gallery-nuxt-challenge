---
name: autonomous-roadmap-runner
description: Autonomously execute the full roadmap from PLANS.md using Gitflow. For each pending milestone, create a feature branch from develop, implement only that milestone, verify it, mark it completed in PLANS.md, commit it, merge it back into develop, and continue with the next pending milestone until all milestones are completed or a real blocker is encountered. Never merge into main.
---

# Autonomous Roadmap Runner

## Use this skill when
- The user asks to continue the roadmap autonomously
- The user asks to execute all pending milestones
- The user wants Codex to handle milestone execution end-to-end
- The repo uses `develop` as the base branch for feature work
- `PLANS.md` is the source of milestone truth

## Mission
Execute the roadmap from `PLANS.md` autonomously, one milestone at a time, until there are no pending milestones left or a real blocker prevents safe progress.

The agent must:
- inspect the roadmap
- select the next pending milestone
- create a feature branch from `develop`
- implement only that milestone
- verify it
- update `PLANS.md`
- commit the milestone work
- merge it into `develop`
- repeat with the next pending milestone

Never merge into `main`.

---

## Autonomy defaults
Act autonomously by default.

Do not ask for confirmation unless blocked by:
- missing `develop` branch
- missing `PLANS.md`
- no valid milestone structure can be inferred
- unsafe unrelated local changes
- missing secrets that prevent critical validation
- milestone ambiguity that makes safe implementation impossible
- merge conflicts that cannot be resolved safely
- persistent failing verification that cannot be fixed within milestone scope

Choose the simplest valid implementation that matches existing repo conventions.

---

## Preconditions
Before starting the roadmap loop, verify:
- current directory is a Git repository
- `develop` exists locally or remotely
- root `PLANS.md` exists
- `PLANS.md` contains at least one milestone not marked Completed
- working tree is safe to modify

If unrelated uncommitted changes create risk:
- stop
- report the issue clearly
- do not discard or rewrite those changes

---

## Scope rules
- Execute milestones sequentially from `PLANS.md`
- Only implement one milestone at a time
- Do not mix milestone scopes in the same feature branch
- Do not implement future milestones early
- Merge each completed milestone into `develop`
- Do not merge into `main`
- Do not open, update, or close PRs
- Do not push unless explicitly asked
- Do not use destructive Git commands
- Do not invent project commands not defined by the repo, except safe Git inspection commands and clearly implied verification commands already supported by the repo

---

## Roadmap loop

Repeat the following workflow until:
- all milestones are completed, or
- a blocker prevents safe continuation

---

### 1. Inspect repository state
Before each milestone:
- check current branch
- check working tree status
- verify `develop` exists
- verify `PLANS.md` exists

If the repo state is unsafe, stop and report why.

---

### 2. Select the next pending milestone
Open `PLANS.md` and select the first milestone not marked Completed.

Extract:
- milestone id
- title
- scope
- files to touch
- acceptance criteria
- verification steps

If the file structure is inconsistent, infer conservatively.
If a safe interpretation is not possible, stop and report the ambiguity.

---

### 3. Create a feature branch from develop
For the selected milestone:

- switch to `develop`
- update `develop` safely if appropriate
- create a new feature branch from `develop`
- switch to that feature branch

Branch naming:
- `feature/<milestone-id>-<short-slug>`
- lowercase
- hyphen-separated
- concise

Examples:
- `feature/m1-home-shell`
- `feature/m4-pokemon-detail`

If the intended branch name already exists:
- create a readable deterministic variant
- report the final branch name in the summary

---

### 4. Implement only the selected milestone
Apply only the changes required by the selected milestone.

Rules:
- keep diffs focused
- follow existing conventions
- touch only milestone files unless extra files are strictly necessary
- avoid opportunistic refactors outside milestone scope
- if additional files are necessary, keep the set minimal and report them

---

### 5. Verify the milestone
Run the milestone’s verification steps.

If the milestone does not define enough verification, use existing repo-supported checks where available:
- install/build
- lint
- typecheck
- tests
- route-level checks
- UI checks implied by the milestone

If a check fails:
- fix the issue
- rerun the check
- continue until the milestone is stable or a real blocker is reached

If secrets are missing:
- validate everything else
- document exactly what could not be validated

Do not mark the milestone complete if critical verification is still failing.

---

### 6. Update `PLANS.md`
Update only the executed milestone entry.

Required changes:
- set `Status: Completed ✅`
- add a short completion note with:
  - date in `YYYY-MM-DD`
  - feature branch name
  - commit hash placeholder `TBD`

Do not modify any unrelated milestone entry.
Do not reorder milestones.
Do not perform unrelated formatting cleanup.

---

### 7. Commit the milestone
Stage only:
- milestone implementation files
- the `PLANS.md` update

Commit message format:
- `feat(<milestone-id>): <short title>`
- or `fix(<milestone-id>): <short title>` when more accurate

After commit:
- capture the commit hash
- if practical, replace `TBD` in `PLANS.md` with the actual hash and amend once
- otherwise leave `TBD` and report the real hash in the final summary

---

### 8. Merge into develop
After successful verification and commit:

- switch to `develop`
- update `develop` safely if needed
- merge the completed feature branch into `develop`

Rules:
- complete the merge if it is conflict-free
- if conflicts occur and they can be resolved safely within the milestone scope, resolve them
- if conflicts cannot be resolved safely, stop and report the blocker
- do not merge into `main`
- do not push unless explicitly requested

---

### 9. Continue automatically
After a successful merge into `develop`:

- re-open `PLANS.md`
- check whether another pending milestone exists
- if another pending milestone exists, repeat the workflow from milestone selection
- if no pending milestones remain, stop and provide the final summary

Do not stop after a successful milestone unless:
- the roadmap is complete, or
- a real blocker prevents safe continuation

---

## Allowed actions
The agent may autonomously:
- inspect Git state
- switch branches
- update `develop`
- create and switch feature branches
- edit files
- run repo-defined verification commands
- run clearly implied repo-supported verification commands
- stage selected files
- commit milestone work
- merge completed feature branches into `develop`
- continue through multiple milestones without waiting for confirmation

---

## Not allowed
Without explicit user request, do not:
- merge into `main`
- push
- delete branches
- open PRs
- close PRs
- rebase interactively
- use `git reset --hard`
- discard unrelated local changes
- rewrite unrelated milestone history

---

## Failure handling
If blocked, stop and report:
- what milestone was being executed
- what was checked
- what failed
- whether the milestone was committed
- whether it was merged into `develop`
- what remains unvalidated
- what the user must resolve manually

A blocker is valid only if it prevents safe continuation.

---

## Completion condition
The roadmap run is complete only when:
- all milestones in `PLANS.md` are marked Completed, or
- a real blocker prevents safe progress

---

## Final report
At the end of the full autonomous run, output:

- Milestones completed:
  - `<id — title>`
- Branches created:
  - `...`
- Commits created:
  - `...`
- Merged into `develop`:
  - `yes/no per milestone`
- Files changed:
  - `...`
- Commands run:
  - `...`
- Manual verification:
  - `...`
- Notes / limitations:
  - `...`
- Remaining blockers, if any:
  - `...`
- Next manual steps:
  - run any missing secret-dependent validation
  - push `develop` when ready