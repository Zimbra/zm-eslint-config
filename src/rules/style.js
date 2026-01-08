export const styleRules = {
	'no-undef': 'off',
	'no-unsafe-optional-chaining': 'off',
	'no-empty': 'off',
	'no-empty-pattern': 'off',
	'no-unused-vars': [
		'error',
		{ vars: 'all', args: 'after-used', ignoreRestSiblings: true, caughtErrors: 'none' }
	]
};

export default styleRules;
