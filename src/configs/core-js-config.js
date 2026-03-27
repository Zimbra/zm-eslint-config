import eslint from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';

import pluginMocha from 'eslint-plugin-mocha';
import importPlugin from 'eslint-plugin-import';

import styleRules from '../rules/style.js';
import securityRules from '../rules/security.js';
import importRules from '../rules/import.js';
import parserConfig from '../rules/parser.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	languageOptions: {
		...parserConfig,
		globals: {
			...globals.browser,
			...globals.node
		}
	},

	plugins: {
		mocha: fixupPluginRules(pluginMocha),
		import: importPlugin
	},

	rules: {
		...eslint.configs.recommended.rules,
		...importPlugin.configs.recommended.rules,
		...styleRules,
		...importRules,
		...securityRules
	}
};
