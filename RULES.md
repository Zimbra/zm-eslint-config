# RULES

This file is generated from `src/rules/` and `src/rules/custom-rules/`. It lists the rule modules and explains, in simple language, what each rule or setting does. Keep this file up to date when rules change.

---

## **src/rules/automation.js**

Purpose: Rules for automation scripts (CI, build tools, scripts). These relax some checks that are noisy or unnecessary in short scripts.

Rules and what they do:

- `prettier/prettier`: off — do not run Prettier formatting checks in automation blocks.
- `prefer-const`: off — allow `let` even when a variable could be `const` (useful in scripting patterns).
- `require-atomic-updates`: off — do not warn about certain async update race conditions.
- `guard-for-in`: off — do not require `hasOwnProperty` checks in `for..in` loops.
- `react/jsx-no-useless-fragment`: off — allow fragments even if they look redundant.
- `lines-around-comment`: off — disable rules enforcing blank lines around comments.
- `no-unexpected-multiline`: off — do not warn for some ambiguous multi-line expressions.
- `no-spaced-func`: off — allow `function` call spacing (compatibility choice).
- `new-cap`: off — do not require constructor names to be capitalized.
- `no-undef-init`: off — allow `var x = undefined` style patterns.
- `no-shadow`: off — allow variable shadowing in automation scripts.
- `no-case-declarations`: off — allow declarations inside `switch` cases.
- `no-constant-binary-expression`: off — do not warn for constant expressions in binary operators.
- `semi`: ["error", "always"] — require semicolons at the end of statements.

Source: `src/rules/automation.js`

---

## **src/rules/i18n.js**

Purpose: Checks for localization (i18n) JSON files and i18n usage in templates.

Rules and what they do:

- `i18n-json/sorted-keys` — enforces a stable, custom key order in locale JSON files (uses `scripts/intl/lint-custom-sort.cjs`). This keeps translations sorted in a consistent order.
- `i18n-json/identical-keys` — ensures locale files have the same keys as the primary language file (defaults to `src/intl/en_US.json`).
- `preact-i18n/no-missing-template-field` — reports when a template expects a field that's not provided.
- `preact-i18n/no-text-as-attribute` — prevents raw text used directly in attributes instead of using translations.
- `preact-i18n/no-text-as-children` — prevents raw text as children in i18n-aware components (ignores small punctuation-only strings).
- `preact-i18n/no-unknown-key` — reports when a translation key used in code is not found in the locale files.

Notes:
- Use `ESLINT_INTL_PATH` environment variable to change where locale files are read from.

Source: `src/rules/i18n.js`

---

## **src/rules/import.js**

Purpose: Small adjustments for import-related checks.

Rules and what they do:

- `import/no-unresolved`: off — do not treat unresolved imports as errors (useful when bundlers or custom resolvers are in use).
- `import/no-named-as-default`: off — allow using a named export as default in some patterns.

Source: `src/rules/import.js`

---

## **src/rules/security.js**

Purpose: Security-focused rules that disallow unsafe JavaScript patterns.

Rules and what they do:

- `no-eval`: error — disallow `eval()` usage (runtime injection risk).
- `no-implied-eval`: error — disallow `setTimeout/string` and similar implicit eval patterns.
- `no-new-func`: error — disallow `new Function(...)` creation (runtime code execution risk).

Source: `src/rules/security.js`

---

## **src/rules/parser.js**

Purpose: Central parser configuration used for TypeScript-enabled linting blocks.

What it sets:

- `parser`: `@typescript-eslint/parser` — enables TypeScript-aware parsing.
- `sourceType`: `module` — treat files as ES modules.
- `ecmaVersion`: `latest` — allow modern JavaScript syntax.
- `parserOptions.requireConfigFile`: false — parser won't require a tsconfig for basic parsing.
- `parserOptions.ecmaFeatures.jsx`: true — enable JSX parsing.

Use this parser settings block when enabling TypeScript rules or type-aware checks.

Source: `src/rules/parser.js`

---

## **src/rules/prettier.js**

Purpose: Configure Prettier options surfaced through ESLint.

Rule and options:

- `prettier/prettier`: `error` — formatting issues are reported as ESLint errors. Options set:
  - `singleQuote: true` — prefer single quotes.
  - `printWidth: 100` — wrap lines at 100 characters.
  - `trailingComma: 'none'` — do not add trailing commas.
  - `arrowParens: 'avoid'` — omit parentheses for single-arg arrow functions where possible.

Note: Consumer projects should install `prettier` to get fixes via `eslint --fix`.

Source: `src/rules/prettier.js`

---

## **src/rules/react-hooks.js**

Purpose: Adjust React Hooks plugin rules for Zimbra code style.

Rules and what they do:

- `react-hooks/refs`: off — disables the `refs` rule from the react-hooks plugin.
- `react-hooks/immutability`: off — disables immutability checks for hooks-related code.

These are turned off to avoid false positives or to match our patterns across codebases.

Source: `src/rules/react-hooks.js`

---

## **src/rules/react.js**

Purpose: React-specific rule adjustments for modern code (often TypeScript-based).

Rules and what they do:

- `react/prop-types`: off — do not require PropTypes (TypeScript or other systems handle type checks).
- `react/no-unknown-property`: off — allow some non-standard attributes (project-specific usage).
- `react/react-in-jsx-scope`: off — no longer required with newer JSX transforms.
- `react/jsx-key`: off — JSX key warnings are disabled (teams may use different patterns).

Source: `src/rules/react.js`

---

## **src/rules/style.js**

Purpose: Style and code-shape rules that affect common JavaScript patterns.

Rules and what they do:

- `new-cap`: warn — require constructor function names to be capitalized, but at warn level.
- `no-console`: ['warn', { allow: ['warn', 'error'] }] — warn on console calls except `console.warn` and `console.error`.
- `no-shadow-restricted-names`: error — disallow shadowing of restricted names such as `arguments`.
- `no-shadow`: error — disallow variable shadowing.
- `eqeqeq`: ['error', 'smart'] — require strict equality except for some safe special cases.
- `camelcase`: ['warn', { properties: 'never' }] — warn on non-camelcase identifiers while allowing property names.
- `guard-for-in`: error — require `hasOwnProperty` checks in `for..in` loops.
- `prefer-rest-params`: error — prefer rest parameters over `arguments`.
- `no-alert`: error — disallow alert/confirm/prompt usage.
- `no-unused-vars`: ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, caughtErrors: 'none' }] — report unused variables while allowing common ignore patterns.
- `no-empty`: off — allow empty blocks in some cases.
- `no-empty-pattern`: off — allow empty destructuring patterns.
- `no-unsafe-optional-chaining`: off — allow optional chaining in conditions that would otherwise be invalid.

Source: `src/rules/style.js`

---

## **src/rules/typescript.js**

Purpose: Turn off some `@typescript-eslint` rules that are noisy by default across many projects.

Rules and what they do:

- `@typescript-eslint/no-explicit-any`: off — allow `any` types in code without lint errors.
- `@typescript-eslint/no-empty-object-type`: off — allow `{} as type` patterns.
- `@typescript-eslint/no-unused-expressions`: off — allow certain unused expressions.
- `@typescript-eslint/no-unsafe-function-type`: off — do not error on some unsafe function types.
- `@typescript-eslint/no-unused-vars`: off — TypeScript-based unused-var handling may be preferred or tightened per-project.

Note: Projects that want stricter TypeScript rules should override these settings in their local config.

Source: `src/rules/typescript.js`

---

## **src/rules/custom-rules/custom-rules.js**

Purpose: Enables custom (project-specific) rules located in `src/rules/custom-rules/`.

Key setting:

- `custom/no-direct-memoize`: `error` — enable the rule that blocks direct memoize imports.

Source: `src/rules/custom-rules/custom-rules.js`

---

## **src/rules/custom-rules/no-direct-memoize.js**

Purpose: A custom rule that prevents importing certain memoize helpers directly.

What it enforces:

- Disallows imports of `es-toolkit/compat/memoize` and `es-toolkit/memoize`.
- Reports an error and recommends using `createLRUMemoize` instead.

Why: Centralizes use of a specific memoize implementation (LRU-based) and avoids inconsistent memoization helpers.

Example that triggers the rule:

```js
import memoize from 'es-toolkit/memoize'; // ❌ triggers rule
const x = memoize(fn);
```

Example that follows the rule:

```js
import { createLRUMemoize } from 'some-lru-helper'; // ✅ allowed
const memo = createLRUMemoize(...);
```

Source: `src/rules/custom-rules/no-direct-memoize.js`

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
