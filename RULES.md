# RULES

This file is generated from `src/rules/`, `src/rules/custom-rules/`, and `src/configs/`. It lists the rule modules and explains, in simple language, what each rule or setting does. Keep this file up to date when rules change.

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
- `react/no-danger`: error — do not use `dangerouslySetInnerHTML`.
- `react/jsx-no-target-blank`: error with `{ allowReferrer: true, forms: true }` — `target="_blank"` links and forms must carry `rel="noopener"`; `noreferrer` is not additionally required, matching `custom/no-unsafe-window-open`. The rule is already on via `react/recommended`; this entry only adjusts its options.

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

## **src/configs/sonarjs-config.js**

Purpose: Enable SonarJS's recommended JavaScript and TypeScript quality checks while making the SonarJS config authoritative when it is placed after the base config blocks in a flat ESLint config array.

How it works:

- Imports `eslint-plugin-sonarjs` and registers it under the `sonarjs` plugin namespace.
- Spreads `sonarjs.configs.recommended.rules` so the recommended SonarJS rule set is active by default.
- Disables selected core ESLint rules that would otherwise duplicate SonarJS checks, so the SonarJS config wins when both are active in the same lint run.
- This is intentionally a separate opt-in config rather than a mutation of the base `coreJsConfig`, so teams can decide exactly when to include SonarJS.

Overlapping core rules intentionally disabled in this config:

- `no-eval`: off — SonarJS's `sonarjs/code-eval` rule covers the same unsafe pattern and should be the source of truth when SonarJS is included.
- `no-implied-eval`: off — handled by SonarJS's code-eval checks.
- `no-new-func`: off — covered by SonarJS's `code-eval` rule.
- `no-fallthrough`: off — SonarJS's `sonarjs/no-fallthrough` is preferred for the same bug pattern.
- `no-control-regex`: off — SonarJS's regex-focused checks handle this more comprehensively.
- `no-empty-character-class`: off — covered by SonarJS regex checks.
- `no-invalid-regexp`: off — SonarJS's `no-invalid-regexp` is the authoritative rule here.
- `no-misleading-character-class`: off — SonarJS's equivalent regex validation is preferred.
- `no-regex-spaces`: off — SonarJS's regex validation covers it.
- `no-delete-var`: off — SonarJS's rule set is the preferred enforcement for this pattern.
- `no-useless-catch`: off — SonarJS's equivalent rule is used when the SonarJS config is active.

Recommended usage:

- Put `sonarjsConfig` after `coreJsConfig` (and after the spread `tsEslintConfig` if using TypeScript) in the flat config array so its overlap suppressions win last.

Source: `src/configs/sonarjs-config.js`

---

## **src/rules/custom-rules/custom-rules.js**

Purpose: Enables custom (project-specific) rules located in `src/rules/custom-rules/`.

Key setting:

- `custom/no-direct-memoize`: `error` — enable the rule that blocks direct memoize imports.
- `custom/no-unsafe-window-open`: `error` — enable the rule that requires `noopener` in `window.open()`.

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

---

## **src/rules/custom-rules/no-unsafe-window-open.js**

Purpose: A custom rule that requires `noopener` when `window.open()` opens a new browsing context.

What it enforces:

- Flags `open()` calls whose target opens a new browsing context (`_blank`, a missing target, or an empty target — all of which mean `_blank`) unless the third argument enables `noopener` or `noreferrer`.
- Recognises the global reached as `window`, `globalThis`, `self`, `top`, `parent`, a chain such as `window.top`, or a bare `open()`. Locally declared, imported or shadowed names are ignored.
- Reads the features argument the way browsers do: `=`, `,` and whitespace all separate tokens, and `noopener=no`/`noopener=0`/`noopener=false` count as disabled.
- Skips targets that reuse the current context (`_self`, `_parent`, `_top`) and any argument whose value is not known at lint time.
- Reports a call that uses the window it returns under a separate message, since adding `noopener` would make that call return `null`. Such a site needs a deliberate decision — keep the handle and open only trusted URLs, or drop the handle and add `noopener` — so the rule never suggests a change that would break it.

Why: Without `noopener` the opened page can reach the originating page through `window.opener` and navigate it (reverse tabnabbing).

Options:

- `includeNamedTargets` (boolean, default `false`) — also flag named targets such as `window.open(url, 'myWindow')`, which create a new browsing context with an opener too.

Not fixable: `window.open()` returns `null` once `noopener` is set, so adding it automatically would break callers that use the returned window handle.

Example that triggers the rule:

```js
window.open(url, '_blank'); // ❌ opened page gets window.opener
window.open(url, '_blank', 'width=500,noopener=no'); // ❌ noopener explicitly disabled

// ❌ reported under the separate message: 'noopener' would make this return null
const w = window.open(url, '_blank');
w.focus();
```

Example that follows the rule:

```js
window.open(url, '_blank', 'noopener,noreferrer'); // ✅ allowed
window.open(url, '_blank', 'width=500,noopener=yes'); // ✅ allowed
window.open(url, '_self'); // ✅ no new browsing context
```

Source: `src/rules/custom-rules/no-unsafe-window-open.js`
