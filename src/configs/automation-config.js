import globals from 'globals';
import eslint from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import pluginMocha from 'eslint-plugin-mocha';
import importPlugin from 'eslint-plugin-import';
import testcafePlugin from 'eslint-plugin-testcafe';

import { automationRules } from '../rules/automation.js';
import parserConfig from '../rules/parser.js';

import styleRules from '../rules/style.js';
import importRules from '../rules/import.js';

const coreRules = {
	...styleRules,
	...importRules
};

export default [
	{
		files: ['**/*.{js,jsx,mjs,cjs}'],
		ignores: ['**/node_modules/*', '**/dist/*', '**/build/*'],

		languageOptions: {
			...parserConfig,
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			testcafePlugin: testcafePlugin,
			mocha: fixupPluginRules(pluginMocha),
			import: importPlugin
		},

		rules: {
			...eslint.configs.recommended.rules,
			...importPlugin.configs.recommended.rules,
			...coreRules,

			...testcafePlugin.configs.recommended.rules,
			...automationRules
		},

		settings: {
			'import/node-version': '18.20.0'
		}
	}
];
