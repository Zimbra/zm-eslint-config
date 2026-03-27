export const reactRules = {
	'react/prop-types': 'off',
	'react/no-did-mount-set-state': 'error',
	'react/no-did-update-set-state': 'error',
	'react/prefer-stateless-function': 'error',
	'react/jsx-fragments': ['error', 'element'],
	'react/jsx-no-useless-fragment': 'error',
	'react/display-name': ['error', { ignoreTranspilerName: false }],
	'react/no-find-dom-node': 'error',
	'react/no-is-mounted': 'error',
	'react/require-render-return': 'error',
	'react/jsx-no-bind': ['error', { ignoreRefs: true }],
	'react/jsx-no-comment-textnodes': 'error',
	'react/jsx-no-duplicate-props': 'error',
	'react/jsx-pascal-case': 'error',

	// Security related rules
	'react/no-danger': 'error',

	// TODO: Enable these rules once the codebase is updated to follow best practices
	'react/react-in-jsx-scope': 'off',
	'react/jsx-key': 'off',
	'react/no-string-refs': 'off',
	'react/no-unknown-property': 'off'
};

export default reactRules;
