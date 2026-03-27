import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

import prettierRules from '../rules/prettier.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		prettier: pluginPrettier
	},

	rules: {
		...prettierConfig.rules,
		...prettierRules
	}
};
