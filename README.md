# eslint-config-zimbra

The official, centralized ESLint shareable configuration for **Zimbra** projects. This package utilizes the modern **ESLint Flat Config** format (v9+), providing a modular and high-performance linting experience for JavaScript, TypeScript, and JSON.

## Installation

Install the package and its required peer dependencies into your project:

```bash
npm install --save-dev eslint-config-zimbra eslint @typescript-eslint/eslint-plugin
```

## Usage
In ESLint v9+, configurations are composed in an eslint.config.js file at the root of your project. You can import and spread the specific configuration blocks you need.

<h4>Basic JavaScript / React Project</h4>

```bash
// eslint.config.js
import { coreJsConfig, customConfig } from "eslint-config-zimbra";

export default [
    ...coreJsConfig,
    ...customConfig,
];
```

<h4>TypeScript Project</h4>

```bash
// eslint.config.js
import { coreJsConfig } from "eslint-config-zimbra";
import tslintConfig from "eslint-config-zimbra/typescript";

export default [
    ...coreJsConfig,
    ...tslintConfig,
];
```

<h4>Full Enterprise Stack (Web + Tests + i18n)</h4>

```bash
import { 
    coreJsConfig, 
    customConfig, 
    localeJsonConfig, 
    automationConfig 
} from "eslint-config-zimbra";

export default [
    ...coreJsConfig,
    ...customConfig,
    ...localeJsonConfig,
    ...automationConfig,
];
```

## Available Modules

| Config Block     | Export Path | Targeted Files        | Key Features                                            |
|------------------|-------------|-----------------------|---------------------------------------------------------|
| coreJsConfig     | index.js    | .js, .jsx, .mjs, .cjs | React (v16.3), Preact-i18n, Mocha, Security, Prettier.  |
| tslintConfig     | /typescript | .ts, .tsx             | Type-aware linting,  @typescript-eslint, Import plugin. |
| customConfig     | index.js    | .js, .jsx, .mjs, .cjs | Zimbra-specific rules (e.g.,  no-direct-memoize).       |
| localeJsonConfig | index.js    | .json                 | i18n JSON validation via  eslint-plugin-i18n-json       |
| automationConfig | index.js    | .js, .jsx, .mjs, .cjs (under test or tests folder)    | TestCafe recommended rules and automation patterns.     |


## Configuration & Features
<h4>Internationalization (i18n)</h4>
The coreJsConfig is configured for Preact-i18n.

1. It automatically maps translation files based on src/intl.
2. Custom Path: You can override the lookup directory by setting the ESLINT_INTL_PATH environment variable:

```bash
export ESLINT_INTL_PATH="src/my-custom-locales"
```

<h4>Prettier Integration</h4>
Prettier is integrated directly into the linting process. This ensures that code style issues are reported as ESLint errors and can be fixed automatically via eslint --fix. This package depends on eslint-config-prettier to disable conflicting rules.

<h4>TypeScript Requirements</h4>
When using tslintConfig, a tsconfig.json must exist in your project root. The config uses project: true, which enables type-aware linting for more powerful rules.