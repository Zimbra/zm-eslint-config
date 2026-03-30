import { fixupPluginRules } from '@eslint/compat';

import testcafePlugin from 'eslint-plugin-testcafe';
import pluginMocha from 'eslint-plugin-mocha';

import { automationRules } from '../rules/automation.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		mocha: fixupPluginRules(pluginMocha),
		testcafePlugin: testcafePlugin
	},

	rules: {
		...testcafePlugin.configs.recommended.rules,
		...automationRules
	}
};
