import sonarjs from 'eslint-plugin-sonarjs';

// Keep SonarJS fully enabled and switch off overlapping base rules in this
// later config block so consumers can make SonarJS authoritative by placing it
// after coreJsConfig / tsEslintConfig in the flat config array.
const disabledOverlappingBaseRules = {
	'no-control-regex': 'off',
	'no-delete-var': 'off',
	'no-empty-character-class': 'off',
	'no-eval': 'off',
	'no-fallthrough': 'off',
	'no-implied-eval': 'off',
	'no-invalid-regexp': 'off',
	'no-misleading-character-class': 'off',
	'no-new-func': 'off',
	'no-regex-spaces': 'off',
	'no-useless-catch': 'off'
};

export default {
	files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],

	plugins: {
		sonarjs
	},

	rules: {
		...sonarjs.configs.recommended.rules,
		...disabledOverlappingBaseRules
	}
};
