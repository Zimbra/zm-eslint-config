export const styleRules = {
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
