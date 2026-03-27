import testcafePlugin from 'eslint-plugin-testcafe';
import { automationRules } from '../rules/automation.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		testcafePlugin: testcafePlugin
	},

	rules: {
		...testcafePlugin.configs.recommended.rules,
		...automationRules
	}
};
