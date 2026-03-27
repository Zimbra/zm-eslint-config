import customRules from '../rules/custom-rules/custom-rules.js';
import noDirectMemoize from '../rules/custom-rules/no-direct-memoize.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		custom: {
			rules: {
				'no-direct-memoize': noDirectMemoize
			}
		}
	},

	rules: {
		...customRules
	}
};
