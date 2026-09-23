# RULES

This file is generated from `src/rules/`, `src/plugin/`, and `src/configs/`. It lists the rule modules and explains, in simple language, what each rule or setting does. Keep this file up to date when rules change.

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
- `preact-i18n/no-unsafe-template` — prevents unsafe use of template literals (with interpolations) in i18n template strings, ensuring translation content remains static and compatible with translation management systems.

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

## **src/configs/translation-json-config.js**

Purpose: Lint JSON translation files to catch unsafe template patterns in i18n translation strings. This config applies the `preact-i18n` plugin with its JSON processor to detect and prevent template interpolation issues in translation files.

How it works:

- Targets JSON files (`**/*.json`) for linting.
- Registers the `preact-i18n` plugin and enables its `translation-json` processor to pre-process and validate translation files.
- Enables `preact-i18n/no-unsafe-template` rule to prevent unsafe use of template literals (with interpolations) in translation values, ensuring translation content remains static and compatible with translation management systems.

Recommended usage:

- Include `translationJsonConfig` in your flat ESLint config array to validate translation JSON files.
- Place it alongside or after `localeJsonConfig` if both are used in your config, so all translation file checks are applied consistently.

Source: `src/configs/translation-json-config.js`

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

## **src/plugin/index.js**

Purpose: The Zimbra custom ESLint plugin — bundles all project-specific rules (from `src/plugin/rules/`) under a single `custom/` namespace. `src/configs/custom-config.js` registers this plugin and enables each rule.

Rules exposed by the plugin:

- `custom/no-direct-memoize`: `error` — enable the rule that blocks direct memoize imports.
- `custom/no-unsafe-window-open`: `error` — enable the rule that requires `noopener` in `window.open()`.
- `custom/require-icon-import-suffix` — requires icon imports to be bound with an `Icon` suffix.

All three are enabled as `error` in `src/configs/custom-config.js`. Adjust severity (or drop a rule) in that config's `rules` map.

Source: `src/plugin/index.js`

---

## **src/plugin/rules/no-direct-memoize.js**

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

Source: `src/plugin/rules/no-direct-memoize.js`

---

## **src/plugin/rules/require-icon-import-suffix.js**

Purpose: A custom rule that enforces a readable naming convention for icon imports.

What it enforces:

- For imports from the configured icon modules (default `lucide-preact` and `@zimbra/lucide-lab`), the local binding name must end with `Icon`.
- `lucide-preact` exposes `Icon`-suffixed exports, so use them directly: `import { ChartPieIcon } from 'lucide-preact'`.
- Custom icon modules (e.g. `@zimbra/lucide-lab`) do not have the suffix, so alias on import: `import { pdf as pdfIcon } from '@zimbra/lucide-lab'`.
- Default and namespace (`import * as`) imports from these modules are disallowed.

Why: When a binding is used in JSX (e.g. `<ChartPieIcon />`), the `Icon` suffix makes it immediately clear the symbol is an icon, improving readability.

Options (first option object):

- `modules` — array of module names to check (default `['lucide-preact', '@zimbra/lucide-lab']`).
- `suffix` — required suffix (default `'Icon'`).

Examples that trigger the rule:

```jsx
import { ChartPie } from 'lucide-preact'; // ❌ → use { ChartPieIcon }
import { pdf } from '@zimbra/lucide-lab'; // ❌ → use { pdf as pdfIcon }
import * as Icons from 'lucide-preact'; // ❌ namespace import
```

Examples that follow the rule:

```jsx
import { ChartPieIcon } from 'lucide-preact'; // ✅
import { pdf as pdfIcon } from '@zimbra/lucide-lab'; // ✅
```

Source: `src/plugin/rules/require-icon-import-suffix.js`

---

## **src/plugin/rules/no-unsafe-window-open.js**

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

Source: `src/plugin/rules/no-unsafe-window-open.js`

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
- `i18nRules` — runtime/template checks for Preact i18n, including:
  - `no-missing-template-field` — reports when a template expects a field that's not provided.
  - `no-text-as-attribute` — prevents raw text used directly in attributes instead of using translations.
  - `no-text-as-children` — prevents raw text as children in i18n-aware components (ignores small punctuation-only strings).
  - `no-unknown-key` — reports when a translation key used in code is not found in the locale files.
  - `no-unsafe-template` — prevents unsafe use of template literals (with interpolations) in i18n template strings, ensuring translation content remains static and compatible with translation management systems.
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
- `react/no-danger`: error
- `react/jsx-no-target-blank`: `['error', { allowReferrer: true, forms: true }]`

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
- `custom/no-unsafe-window-open`: `error`

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

## **src/rules/custom-rules/no-unsafe-window-open.js**

Purpose: Custom lint rule that requires `noopener` in `window.open()` calls that open a new browsing context, preventing reverse tabnabbing through `window.opener`.

Metadata from the rule (auto-extracted):

- **Description**: Require 'noopener' in window.open() when the target opens a new browsing context
- **Type**: problem
- **Recommended**: true
- **Messages**: `requireNoopener` — "Security risk: open() with target '{{target}}' gives the opened page access to window.opener. Pass 'noopener' (or 'noreferrer') in the 3rd argument, e.g. 'noopener,noreferrer'."; `reviewOpenerAccess` — used when the call's returned window is consumed, since `noopener` would make it `null`.
- **Options**: `includeNamedTargets` (boolean, default `false`)

Behavior summary:

- Reports on `CallExpression` nodes calling `open` on a window global (`window`, `globalThis`, `self`, `top`, `parent`, chains such as `window.top`, or a bare `open()`), using scope analysis so local or imported `open` bindings are ignored.
- Treats a missing or empty target as `_blank`, ignores `_self`/`_parent`/`_top`, and ignores named targets unless `includeNamedTargets` is enabled.
- Accepts `noopener` or `noreferrer` in the features argument, parsed with the browser's tokenizer (`=`, `,` and whitespace as separators) and boolean semantics (`noopener=no` is disabled).
- Ignores arguments whose value is not statically known, to avoid false positives.
- Switches to `reviewOpenerAccess` when the call's return value is consumed, so the rule never suggests adding `noopener` to a call that needs the returned window.

Source: `src/rules/custom-rules/no-unsafe-window-open.js`

---

How this file was generated

This `RULES.md` was produced by extracting obvious descriptions, top-level settings, and JSDoc-like metadata from the rule/config source files. It is intended as a concise human-readable summary; for implementation details and exact rule shapes, refer to the original source files under `src/rules/`.
