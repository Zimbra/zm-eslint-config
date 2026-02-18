# @zimbra/eslint-config

**Comprehensive ESLint configuration used across Zimbra JavaScript and TypeScript projects.**

This package bundles a set of shareable ESLint configs and rule customizations so teams can apply a consistent linting standard across apps and libraries.

## **Table of contents**

- [Overview](#overview)
- [Quick start](#quick-start)
- [Installation](#installation)
- [Usage examples](#usage-examples)
- [ESLint Flat Config example (eslint.config.mjs)](#eslint-flat-config-example-eslintconfigmjs)
- [Exports & configs](#exports--configs)
- [Rule summary](#rule-summary)
- [Custom rules](#custom-rules)
- [Scripts](#scripts)
- [Publishing](#publishing)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## **Overview**

This package provides:

- **A base ESLint config** (default export) customized or adapted specifically for Zimbra projects.
- **A TypeScript-focused config** (exported at `./src/typescript.js`).
- **Curated configs** in `src/configs/` for special cases:
  - `automation-config` — for automation, build, and test scripts (includes testcafe rules, import checks, and relaxed automation rules).
  - `core-js-config` — for core JavaScript files with React and security checks.
  - `locale-json-config` — for JSON locale files with i18n validation.
  - `ts-eslint-config` — for TypeScript files.
  - `custom-config` — for custom rule applications.
- **Rule definitions and small custom plugins** under `src/rules/`, including `custom-rules` used internally.

## **Quick start**

1. Install the package as a dev dependency in your project.
2. Install `eslint` (peer dependency).
3. Extend `@zimbra/eslint-config` in your ESLint configuration.

## **Installation**

Install the config and core peer dependency:

```bash
npm install --save-dev @zimbra/eslint-config eslint
```

If you're using TypeScript:

```bash
npm install --save-dev @zimbra/eslint-config eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### **Note about consumer installation**

This package ships many commonly-used ESLint plugins and configs as regular dependencies, so in most cases a consumer project does **not** need to manually install every plugin listed below. However, the package lists core items such as `eslint` and `@typescript-eslint/eslint-plugin` as **peer dependencies** — you must install those in your project. If you rely on the TypeScript export, also install `@typescript-eslint/parser` and `typescript`.

Typical plugins/configs that are included or commonly required by the configs in this package:

- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-import`
- `eslint-config-prettier` and `eslint-plugin-prettier`
- `eslint-plugin-i18n-json`

If you publish or use a custom registry where dependency resolution differs, you may need to install additional plugins in the consumer project. The safest minimal installs for a consumer are shown in the Installation section above (eslint + TypeScript plugin when relevant).

## **Prettier integration (important)**

This config integrates Prettier via `eslint-config-prettier` and `eslint-plugin-prettier` to avoid conflicting rules and to report formatting issues through ESLint. **Prettier rules will therefore be applicable to a consumer's code when they run ESLint with this config.**

Recommendation: install `prettier` in consumer projects if you want code formatted or want `eslint --fix` to apply Prettier-based changes. Example:

```bash
npm install --save-dev prettier
```

If a consumer prefers to keep Prettier separate from ESLint (for example, running Prettier via editor integration only), the config will still disable conflicting ESLint rules thanks to `eslint-config-prettier` so you won't get duplicate or contradictory diagnostics.

## **When should I integrate this?**

Integrate `@zimbra/eslint-config` into a project when:

- You want **consistent linting rules** across multiple Zimbra repositories or teams.
- You are starting a **new JavaScript/TypeScript project** and want a tested baseline of rules (React/Prettier/i18n/import rules already wired).
- You want to **centralize and reuse custom rules** implemented by Zimbra (for patterns like `no-direct-memoize`).
- You want a config that is compatible with **ESLint v9+ and the Flat Config** approach used by modern tooling.

Integration is low-risk: drop-in extend the base or TypeScript export in your ESLint config and run `eslint` to see the issues the rules detect.

## **What problem will it resolve?**

Using a centralized, shared ESLint config resolves several common problems:

- Inconsistent code style and rule application across teams and projects.
- Diverging local rule sets that make code reviews harder and increase cognitive load when switching repos.
- Missing project-specific checks for important areas like i18n, import ordering, React best practices, and automation/test patterns.
- Redundant or conflicting rule configurations — this package integrates Prettier properly and disables conflicting ESLint rules to avoid duplicate diagnostics.

Adopting this config helps maintain code quality, reduces time spent configuring tooling in each repository, and provides a shared place to evolve rules and custom checks.

## **Usage examples**

## **ESLint Flat Config example (eslint.config.mjs)**

If your project uses ESLint v9+ with the Flat Config (`eslint.config.mjs` / `eslint.config.cjs`), import the named config blocks exported by this package and spread them into your exported array. Example JS project:

```js
// eslint.config.mjs
import { coreJsConfig, customConfig } from "@zimbra/eslint-config";

export default [
  ...coreJsConfig,
  ...customConfig,
  // Add local overrides or additional blocks here
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      // local rule overrides
    }
  }
];
```

TypeScript project using the package TypeScript export:

```js
// eslint.config.mjs
import { coreJsConfig } from "@zimbra/eslint-config";
import typescriptConfig from "@zimbra/eslint-config/typescript";

export default [
  ...coreJsConfig,
  ...typescriptConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    // local TypeScript overrides (if needed)
  }
];
```

Notes:

- Ensure your project has `type: "module"` in `package.json` or use the `.mjs` extension for the config file so Node treats it as ESM.
- Install peer dependencies (`eslint`, `@typescript-eslint/*`, `prettier`) in the consumer project as described in the Installation section.
- The exported config blocks (`coreJsConfig`, `customConfig`, etc.) are arrays of config blocks — spreading them preserves ordering and allows local blocks to appear before/after as desired.

## **Exports & configs**

- `.` -> `src/index.js` (base config)
- `./typescript` -> `src/typescript.js` (TypeScript-focused config)
- Named exports from `src/index.js`:
  - `coreJsConfig` — base JavaScript/React config for core application files
  - `automationConfig` — relaxed rules for test scripts, build tools, and automation
  - `customConfig` — enables Zimbra custom rules (e.g., `no-direct-memoize`)
  - `localeJsonConfig` — i18n JSON file validation
  - `tsEslintConfig` — TypeScript-specific rule overrides

## **Rules and custom rules**

Rule details and descriptions have moved to `RULES.md`. That file contains a complete list of rule modules and plain-language explanations of what each rule enforces or why a rule is disabled. See `RULES.md` in the repo root for the authoritative list and examples.

### **Automation rules**

The `automation-config` includes relaxed rules for test scripts, build tools, and CI automation. Key rules disabled or adjusted include:
- `no-unexpected-multiline`, `no-case-declarations`, `guard-for-in` — relaxed for scripting patterns.
- `prefer-const`, `new-cap` — more lenient in automation contexts.

This config also includes import checks, testcafe support, and browser/node globals for full automation script support.

## **Scripts**

This repository provides convenience scripts in `package.json` that are useful for developing the config itself:

- `npm run lint` — runs `eslint src`
- `npm run lint:fix` — runs `eslint src --fix`

## **Publishing**

If you plan to publish this package to the npm registry, follow these recommended steps. This package is scoped to `@zimbra` in `package.json`, so scoped publishing requires publishing as public (unless your registry config differs).

1. Ensure `version` in `package.json` is updated (semantic versioning).
2. Run a local pack check:

```bash
npm pack --dry-run
```

3. Login to npm (if necessary):

```bash
npm login
```

4. Publish the package (scoped packages often require `--access public`):

```bash
npm publish --access public
```

5. After publishing, update any downstream repos to use the new version.

### Notes

- If you use a private registry (Artifactory/Nexus), adapt the publish commands and access settings to your registry's requirements.
- Consider automating the publish workflow via CI with a release job that runs tests, bump version, and publishes on tags.

## **Contributing**

- When adding or changing rules, update `src/rules` and corresponding configs in `src/configs/`.
- Run `npm run lint` before submitting changes.
- Provide unit tests for custom rules and document breaking changes clearly.

## **License**

This repository includes a `LICENSE` file at the project root. See `LICENSE` for the full terms.

## **Support**

Open an issue in this repository for questions, or contact the maintainers for onboarding help.
