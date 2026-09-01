import customRules from '../rules/custom-rules/custom-rules.js';
import noDirectMemoize from '../rules/custom-rules/no-direct-memoize.js';
import noUnsafeWindowOpen from '../rules/custom-rules/no-unsafe-window-open.js';
import noIconImportWithoutSuffix from '../rules/custom-rules/no-icon-import-without-suffix.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		custom: {
			rules: {
				'no-direct-memoize': noDirectMemoize,
				'no-unsafe-window-open': noUnsafeWindowOpen,
				'no-icon-import-without-suffix': noIconImportWithoutSuffix
			}
		}
	},

	rules: {
		...customRules
	}
};
