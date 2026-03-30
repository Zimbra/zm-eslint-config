import eslint from '@eslint/js';
import globals from 'globals';

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
		import: importPlugin
	},

	rules: {
		...eslint.configs.recommended.rules,
		...importPlugin.configs.recommended.rules,
		...styleRules,
		...importRules,
		...securityRules
	},

	settings: {
		'import/node-version': '18.20.0'
	}
};
