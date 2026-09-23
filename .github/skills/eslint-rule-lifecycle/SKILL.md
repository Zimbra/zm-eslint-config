---
name: 'eslint-rule-lifecycle'
description: 'Use when adding, updating, or removing ESLint rules, plugins, configs, or exports in this repository so implementation, tests, README, and RULES.md stay consistent.'
---

# ESLint Rule Lifecycle

Use this skill whenever work changes this repository's linting surface area, including:

- adding a rule
- updating a rule level or options
- deleting a rule
- adding or removing an ESLint plugin
- changing config composition or rule precedence
- changing package exports related to lint configs

## Repository-specific goals

Keep every linting change consistent across implementation, docs, tests, and validation.

This repository is a shareable ESLint config package. A rule change is not complete until all relevant surfaces are updated together.

## Required workflow

1. **Inspect the current shape before editing**
   - Read the relevant files in `src/rules/`, `src/configs/`, `src/index.js`, `src/typescript.js`, `src/sonarjs.js`, `package.json`, `README.md`, and `RULES.md`.
   - Check whether the change affects JavaScript, React, hooks, TypeScript, automation, i18n, Prettier, custom rules, or an exported config block.
   - Search for existing tests before creating new ones.

2. **Choose the right home for the change**
   - Put rule toggles and options in the appropriate file under `src/rules/` when they belong to an existing rule group.
   - Put plugin wiring and combined config behavior in `src/configs/`.
   - Put package-level exports in `src/index.js`, `src/typescript.js`, `src/sonarjs.js` or dedicated export entrypoints when needed.
   - If a change introduces a new reusable config block, export it consistently from the package.

3. **Handle plugin and dependency changes completely**
   - Update `package.json` when a new ESLint plugin or dependency is introduced or removed.
   - Update `package-lock.json` via the package manager rather than editing it manually.
   - Preserve the repository's dependency conventions unless there is a clear reason to diverge.

4. **Resolve rule overlap intentionally**
   - Check for overlap with ESLint core, `@typescript-eslint`, React, React Hooks, Import, Prettier, custom rules, and SonarJS.
   - Pick a single source of truth for overlapping checks.
   - If one config should have higher priority, keep the preferred rule enabled and disable the overlapping rule in the lower-priority config block.
   - Document unusual precedence decisions in code comments only when the reasoning would otherwise be hard to infer.

5. **Keep docs in sync**
   - Update `README.md` when exports, installation steps, usage examples, or config behavior change.
   - Update `RULES.md` whenever a rule/config is added, updated, removed, or reprioritized.
   - In `RULES.md`, describe both the user-facing behavior and any important precedence or overlap handling.

6. **Add or update tests**
   - For custom rule logic, add or update focused tests under `tests/` using the existing Node test runner and `RuleTester` patterns.
   - For config-level behavior, add regression tests that assert exported config objects contain the intended rules and precedence decisions.
   - Prefer small targeted assertions that lock in behavior without over-specifying unrelated details.

7. **Validate with existing commands**
   - Run the smallest existing command set that proves the change is correct.
   - For rule/config changes in this repo, default to:
     - `npm test`
     - `npm run lint`
   - If the change is docs-only, tests are optional unless docs depend on generated or verified output.

8. **Final review checklist**
   - Are all touched configs exported correctly?
   - Are all new plugin dependencies declared?
   - Are overlapping rules handled deliberately?
   - Are README examples still valid?
   - Is `RULES.md` updated?
   - Do the existing tests and lint pass?

## Common file impact map

- `src/rules/*.js` — raw rule enable/disable/option decisions
- `src/configs/*.js` — plugin wiring and composed config behavior
- `src/index.js` — package exports for shared config blocks
- `src/typescript.js` — TypeScript export entrypoint
- `src/sonarjs.js` — SonarJS export entrypoint
- `package.json` / `package-lock.json` — dependency and export path changes
- `tests/*.test.js` — custom rule and config regression coverage
- `README.md` — public usage and export documentation
- `RULES.md` — detailed rule/config behavior reference

## SonarJS-specific guidance

When changing SonarJS integration:

- Keep `sonarjs.configs.recommended.rules` intact unless there is a strong reason not to.
- Prefer disabling overlapping lower-priority base rules in the SonarJS config instead of disabling SonarJS itself when SonarJS is intended to be authoritative.
- Add regression tests that verify both halves of the precedence contract:
  - the preferred SonarJS rules remain enabled
  - the overlapping lower-priority rules are disabled

## Output expectations

When using this skill, complete the implementation end-to-end instead of stopping at analysis. A finished change should include code/config updates, docs updates, targeted tests, and validation results unless the user explicitly asks for only a plan or review.
