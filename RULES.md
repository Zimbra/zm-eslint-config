# RULES

This file was generated automatically from the source files under `src/rules/` and `src/rules/custom-rules/`. It summarizes the purpose and key settings for each rule/config module exported by the package. If you change rules in `src/rules`, regenerate this file or update it manually.

---

## **src/rules/automation.js**

Purpose: Relax or adjust linting rules for automation and CI scripts. The automation rules turn off several stylistic and runtime checks that are commonly noisy in automation scripts and set a required semicolon style.

Key settings (excerpt):

- `prettier/prettier`: off
- `prefer-const`: off
- `require-atomic-updates`: off
- `guard-for-in`: off
- `semi`: ["error", "always"]

Use when: applying lint rules to scripts used in CI, build tooling, or non-interactive environments where stricter runtime style checks may be unnecessary.

Source: `src/rules/automation.js`

---

## **src/rules/i18n.js**

Purpose: Provide i18n-related rules and configuration for both JSON locale files and Preact/Preact-i18n usage.

What it contains:

- `i18nJsonRules` — configuration for `eslint-plugin-i18n-json`, including a custom sort function (`scripts/intl/lint-custom-sort.cjs`) and reference to the primary language file (defaults to `src/intl/en_US.json` or overridden via `ESLINT_INTL_PATH`).
- `i18nRules` — runtime/template checks for Preact i18n (e.g. `no-missing-template-field`, `no-text-as-attribute`).
- `LANGUAGE_FILES_RELATIVE` — a list of supported language filename mappings included for reference.
- `i18nTextComponents` — helper patterns used to identify text-containing components for i18n checks.

Notes:

- `ESLINT_INTL_PATH` env var can override the default locale path.
- Useful for projects that validate JSON locale files and enforce i18n usage in templates.

Source: `src/rules/i18n.js`

---

## **src/rules/import.js**

Purpose: Minimal adjustments for `eslint-plugin-import` rules in this config.

Key settings (excerpt):

- `import/no-unresolved`: off
- `import/no-named-as-default`: off

Source: `src/rules/import.js`

---

## **src/rules/parser.js**

Purpose: Centralized parser configuration for TypeScript-aware parsing.

Key settings:

- `parser`: `@typescript-eslint/parser`
- `sourceType`: `module`
- `ecmaVersion`: `latest`
- `parserOptions.requireConfigFile`: false
- `parserOptions.ecmaFeatures.jsx`: true

Use when: enabling TypeScript rules or type-aware linting blocks.

Source: `src/rules/parser.js`

---

## **src/rules/prettier.js**

Purpose: Prettier integration settings exposed as an ESLint rule block.

Key settings (excerpt):

- `prettier/prettier`: `error` with options: `singleQuote: true`, `printWidth: 100`, `trailingComma: 'none'`, `arrowParens: 'avoid'`.

This file configures Prettier rules so that formatting errors are surfaced by ESLint and can be fixed with `eslint --fix` when `prettier` and `eslint-plugin-prettier` are present.

Source: `src/rules/prettier.js`

---

## **src/rules/react-hooks.js**

Purpose: Adjust React Hooks-related rules. This config disables certain rules from `eslint-plugin-react-hooks` that are not desired across Zimbra codebases.

Key settings:

- `react-hooks/refs`: off
- `react-hooks/immutability`: off

Source: `src/rules/react-hooks.js`

---

## **src/rules/react.js**

Purpose: React-specific rule adjustments. The config turns off prop-types and other rules that are unnecessary in modern TypeScript/React codebases or in projects that use other type systems.

Key settings (excerpt):

- `react/prop-types`: off
- `react/no-unknown-property`: off
- `react/react-in-jsx-scope`: off
- `react/jsx-key`: off

Source: `src/rules/react.js`

---

## **src/rules/style.js**

Purpose: Style and basic code-shape rules. Controls undefined variables, empty patterns, and unused variable behavior.

Key settings (excerpt):

- `no-undef`: off
- `no-empty`: off
- `no-unused-vars`: `['error',{vars:'all',args:'after-used',ignoreRestSiblings:true,caughtErrors:'none'}]`

Source: `src/rules/style.js`

---

## **src/rules/typescript.js**

Purpose: TypeScript-focused rule overrides using `@typescript-eslint` plugin.

Key settings (excerpt):

- `@typescript-eslint/no-explicit-any`: off
- `@typescript-eslint/no-unused-vars`: off
- `@typescript-eslint/no-empty-object-type`: off

These relax certain strict checks which may otherwise be noisy across the codebase; enable stronger checks by overriding in a project's local config if desired.

Source: `src/rules/typescript.js`

---

## **src/rules/custom-rules/custom-rules.js**

Purpose: Enable custom rules defined in `src/rules/custom-rules/`.

Key setting:

- `custom/no-direct-memoize`: `error`

This file acts as a small wrapper to enable Zimbra-specific custom rules.

Source: `src/rules/custom-rules/custom-rules.js`

---

## **src/rules/custom-rules/no-direct-memoize.js**

Purpose: Custom lint rule that disallows direct imports of `es-toolkit/compat/memoize` and `es-toolkit/memoize` and instructs developers to use `createLRUMemoize` instead.

Metadata from the rule (auto-extracted):

- **Description**: Disallow direct import of es-toolkit/compat/memoize or es-toolkit/memoize; use createLRUMemoize
- **Type**: problem
- **Recommended**: true
- **Message**: "Do not import es-toolkit/compat/memoize or es-toolkit/memoize; directly. Use 'createLRUMemoize' instead."

Behavior summary:

- Reports on ES module `ImportDeclaration` nodes when the source matches any disallowed module.
- Reports on `require()` calls with the same disallowed modules.

Source: `src/rules/custom-rules/no-direct-memoize.js`

---

How this file was generated

This `RULES.md` was produced by extracting obvious descriptions, top-level settings, and JSDoc-like metadata from the rule/config source files. It is intended as a concise human-readable summary; for implementation details and exact rule shapes, refer to the original source files under `src/rules/`.
