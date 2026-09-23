import { fixupPluginRules } from '@eslint/compat';
import pluginI18nJson from 'eslint-plugin-i18n-json';
import pluginPreactI18n from '@zimbra/eslint-plugin-preact-i18n';

import { i18nJsonRules } from '../rules/i18n.js';

export default [
	{
		files: ['**/*.json'],

		plugins: {
			'i18n-json': pluginI18nJson
		},

		processor: {
			meta: { name: '.json' },
			...pluginI18nJson.processors['.json']
		},

		rules: {
			...pluginI18nJson.configs.recommended.rules,
			...i18nJsonRules
		}
	},
	{
		files: ['**/intl/**/*.json', '**/i18n/**/*.json', '**/translations/**/*.json'],
		plugins: {
			'preact-i18n': fixupPluginRules(pluginPreactI18n)
		},
		processor: 'preact-i18n/translation-json',
		rules: {
			'preact-i18n/no-unsafe-template': 'error'
		}
	}
];
