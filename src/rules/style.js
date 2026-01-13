export const styleRules = {
	'new-cap': 1,
	'no-console': [1, { allow: ['warn', 'error'] }],
	'no-shadow-restricted-names': 2,
	'no-shadow': 'error',
	eqeqeq: ['error', 'smart'],
	camelcase: [1, { properties: 'never' }],
	'guard-for-in': 2,
	'prefer-rest-params': 2,
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
