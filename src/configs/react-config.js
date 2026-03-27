import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

import reactRules from '../rules/react.js';
import reactHooksRules from '../rules/react-hooks.js';

export default {
	files: ['**/*.{js,jsx,mjs,cjs}'],

	plugins: {
		react: pluginReact,
		'react-hooks': pluginReactHooks
	},

	rules: {
		...pluginReact.configs.recommended.rules,
		...pluginReactHooks.configs.recommended.rules,
		...reactRules,
		...reactHooksRules
	},

	settings: {
		// Requires exactly version 16.0. See: https://github.com/jsx-eslint/eslint-plugin-react/issues/1754
		react: { pragma: 'createElement', version: '16.0' }
	}
};
