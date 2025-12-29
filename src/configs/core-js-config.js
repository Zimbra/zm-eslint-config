import eslint from "@eslint/js";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import path from "path";

import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginMocha from "eslint-plugin-mocha";
import pluginPreactI18n from "eslint-plugin-preact-i18n";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

import styleRules from "../rules/style.js";
import reactRules from "../rules/react.js";
import reactHooksRules from "../rules/react-hooks.js";
import securityRules from "../rules/security.js";
import {
	i18nRules,
	LANGUAGE_FILES_RELATIVE,
	i18nTextComponents,
} from "../rules/i18n.js";
import prettierRules from "../rules/prettier.js";
import parserConfig from "../rules/parser.js";

const coreRules = {
	...styleRules,
	...reactRules,
	...reactHooksRules,
	...securityRules,
	...prettierRules,
	...i18nRules,
};

const intlPath = process.env.ESLINT_INTL_PATH ?? "src/intl";

const languageFilesAbsolute = LANGUAGE_FILES_RELATIVE.map((entry) => ({
	name: entry.name,
	path: path.join(intlPath, entry.filename),
}));

export default [
	{
		files: ["**/*.{js,jsx,mjs,cjs}"],

		ignores: [
			"**/node_modules/*",
			"**/dist/*",
			"**/build/*",
			"**/*.graphql",
			"**/*.gql"
		],

		languageOptions: {
			...parserConfig,
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			react: pluginReact,
			"react-hooks": pluginReactHooks,
			mocha: fixupPluginRules(pluginMocha),
			prettier: pluginPrettier,
			"preact-i18n": fixupPluginRules(pluginPreactI18n)
		},

		rules: {
			// ...eslint.configs.recommended.rules,
			// ...prettierConfig.rules,
			...coreRules 
		},

		settings: {
			react: { pragma: "createElement", version: "16.3" },
			"preact-i18n": {
				languageFiles: languageFilesAbsolute,
				textComponents: i18nTextComponents
			}
		}
	}
];
