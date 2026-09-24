import { fixupPluginRules } from '@eslint/compat';
import pluginPreactI18n from '@zimbra/eslint-plugin-preact-i18n';

export default {
	files: ['**/*.json'],
	plugins: {
		'preact-i18n': fixupPluginRules(pluginPreactI18n)
	},
	processor: 'preact-i18n/translation-json',
	rules: {
		'preact-i18n/no-unsafe-template': 'error'
	}
};
