import customPlugin from '../plugin/index.js';

// Enable every rule the plugin exposes as an error. Change a value here
// (or drop a rule from this map) to tune severity per rule.
const rules = {
	'custom/no-direct-memoize': 'error',
	'custom/no-unsafe-window-open': 'error',
	'custom/require-icon-import-suffix': 'error'
};

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		custom: customPlugin
	},

	rules
};
