import eslint from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import path from 'path';

import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginMocha from 'eslint-plugin-mocha';
import pluginPreactI18n from 'eslint-plugin-preact-i18n';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

import styleRules from '../rules/style.js';
import reactRules from '../rules/react.js';
import reactHooksRules from '../rules/react-hooks.js';
import securityRules from '../rules/security.js';
import importRules from '../rules/import.js';
import { i18nRules, LANGUAGE_FILES_RELATIVE, i18nTextComponents } from '../rules/i18n.js';
import prettierRules from '../rules/prettier.js';
import parserConfig from '../rules/parser.js';

const intlPath = process.env.ESLINT_INTL_PATH ?? 'src/intl';
const disableIntl = process.env.ESLINT_DISABLE_INTL === 'true';

const coreRules = {
	...styleRules,
	...reactRules,
	...reactHooksRules,
	...importRules,
	...prettierRules,
	...securityRules,
	...(disableIntl ? {} : i18nRules)
};

const languageFilesAbsolute = LANGUAGE_FILES_RELATIVE.map(entry => ({
	name: entry.name,
	path: path.join(intlPath, entry.filename)
}));

export default [
	{
		files: ['**/*.{js,jsx,mjs,cjs}'],

		ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.graphql', '**/*.gql'],

		languageOptions: {
			...parserConfig,
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
			mocha: fixupPluginRules(pluginMocha),
			prettier: pluginPrettier,
			import: importPlugin,
			...(disableIntl
				? {}
				: {
						// TODO: Upgrade `pluginPreactI18n` to a modern version to ensure compatibility with current tooling and React/Preact best practices
						'preact-i18n': fixupPluginRules(pluginPreactI18n)
					})
		},

		rules: {
			...eslint.configs.recommended.rules,
			...prettierConfig.rules,
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
			...importPlugin.configs.recommended.rules,
			...coreRules
		},

		settings: {
			// Requires exactly version 16.0. See: https://github.com/jsx-eslint/eslint-plugin-react/issues/1754
			react: { pragma: 'createElement', version: '16.0' },
			...(disableIntl
				? {}
				: {
						'preact-i18n': {
							languageFiles: languageFilesAbsolute,
							textComponents: i18nTextComponents
						}
					})
		}
	}
];
