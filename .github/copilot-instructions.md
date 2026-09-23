# Copilot Instructions for zm-eslint-config

## Purpose

This repository is a shared ESLint config package. Rule changes must stay consistent across implementation, docs, tests, package metadata, and public usage examples.

## Required workflow for linting changes

When working on ESLint rules, plugins, configs, or exports:

1. Read the currently relevant files before changing them.
   - `src/rules/*.js`
   - `src/configs/*.js`
   - `src/index.js`
   - `src/typescript.js`
	- `src/sonarjs.js`
   - `package.json`
   - `README.md`
   - `RULES.md`
   - `tests/*.test.js`

2. Keep the rule in the correct layer.
   - Put rule-level settings in the appropriate `src/rules/*.js` file.
   - Put plugin registration or composed behavior in `src/configs/*.js`.
   - Put package-level exports in `src/index.js` or dedicated export entry points.

3. Handle dependencies completely.
   - Update `package.json` and `package-lock.json` whenever a plugin or dependency is added or removed.
   - Do not edit lockfiles by hand.

4. Handle rule overlap intentionally.
   - Check for overlap with ESLint core, `@typescript-eslint`, React, React Hooks, import, Prettier, custom rules, and SonarJS.
   - Pick one source of truth for any overlapping rule.
   - If the preferred config should win, keep the preferred rule enabled and disable the overlapping lower-priority rule in the other config block.
   - Prefer this pattern when adding SonarJS: keep SonarJS recommended rules active and disable only the overlapping base rules in the SonarJS config so it can be authoritative when included later in the flat config array.

5. Update documentation in the same change.
   - Update `README.md` whenever usage examples, exports, or config behavior change.
   - Update `RULES.md` whenever a rule or config is added, removed, changed, or reprioritized.
   - Explain precedence/overlap decisions in `RULES.md` when relevant.

6. Add or update tests.
   - For custom rule logic, add or update focused tests in `tests/` using the existing Node test runner and `RuleTester` patterns.
   - For config-level changes, add regression tests that assert the intended rule precedence and overlap behavior.

7. Validate with the existing repository commands.
   - Run the smallest existing validation that covers the change.
   - For rule or config changes, default to:
     - `npm test`
     - `npm run lint`

## Default expectations

- Do not leave the repo in a half-updated state.
- Do not add a rule without updating the docs and tests that cover it.
- Do not enable a rule in multiple configs without deciding which one is authoritative.
- Do not change config exports without updating the docs and package export surface.
- Prefer small, targeted changes that keep the repo consistent.

## SonarJS note

When integrating or updating SonarJS:

- Keep `sonarjs.configs.recommended.rules` intact unless there is a strong reason to change it.
- Prefer disabling overlapping lower-priority base rules in the SonarJS config instead of disabling SonarJS rules themselves when SonarJS is intended to be authoritative.
- Add regression tests that verify both: the SonarJS rules stay enabled, and overlapping core rules are turned off in the later config block.
