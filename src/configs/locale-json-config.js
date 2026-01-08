import pluginI18nJson from 'eslint-plugin-i18n-json';
import { i18nJsonRules } from '../rules/i18n.js';

export default [
	{
		files: ['**/*.json'],
		ignores: ['**/node_modules/*', '**/dist/*', '**/build/*'],
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
	}
];
