export const styleRules = {
	'new-cap': 'warn',
	'no-console': ['warn', { allow: ['warn', 'error'] }],
	'no-shadow-restricted-names': 'error',
	'no-shadow': 'error',
	eqeqeq: ['error', 'smart'],
	camelcase: ['warn', { properties: 'never' }],
	'guard-for-in': 'error',
	'prefer-rest-params': 'error',
	'no-alert': 'error',

	// TODO: Fully enable this rule once the codebase is updated to follow best practices
	'no-unused-vars': [
		'error',
		{ vars: 'all', args: 'after-used', ignoreRestSiblings: true, caughtErrors: 'none' }
	],
	'no-empty': 'off',
	'no-empty-pattern': 'off',
	'no-unsafe-optional-chaining': 'off'
};

export default styleRules;
