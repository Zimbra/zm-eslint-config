import { fixupPluginRules } from '@eslint/compat';
import path from 'node:path';

import pluginPreactI18n from 'eslint-plugin-preact-i18n';

import { i18nRules, LANGUAGE_FILES_RELATIVE, i18nTextComponents } from '../rules/i18n.js';

const intlPath = process.env.ESLINT_INTL_PATH ?? 'src/intl';

const languageFilesAbsolute = LANGUAGE_FILES_RELATIVE.map(entry => ({
	name: entry.name,
	path: path.join(intlPath, entry.filename)
}));

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		// TODO: Upgrade `pluginPreactI18n` to a modern version to ensure compatibility with current tooling and React/Preact best practices
		'preact-i18n': fixupPluginRules(pluginPreactI18n)
	},

	rules: i18nRules,

	settings: {
		'preact-i18n': {
			languageFiles: languageFilesAbsolute,
			textComponents: i18nTextComponents
		}
	}
};
