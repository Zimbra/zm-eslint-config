export const reactRules = {
	"react/jsx-uses-react": "off", // for Preact 10+
	"react/jsx-uses-vars": "error", // crucial
	"react/react-in-jsx-scope": "off",
	"react/jsx-fragments": ["error", "element"],
	"react/jsx-no-useless-fragment": "error",
	"react/jsx-wrap-multilines": "warn",
	"react/jsx-boolean-value": ["error", "never"],
	"react/jsx-closing-bracket-location": "error",
	"react/jsx-curly-spacing": "error",
	"react/display-name": ["error", { ignoreTranspilerName: false }],
	"react/jsx-equals-spacing": "error",
	"react/jsx-indent-props": ["error", "tab"],
	"react/jsx-max-props-per-line": ["error", { maximum: 6 }],
	"react/jsx-no-bind": ["error", { ignoreRefs: true }],
	"react/jsx-no-comment-textnodes": "error",
	"react/jsx-no-duplicate-props": "error",
	// 'react/jsx-no-undef': 'error',
	"react/jsx-pascal-case": "error",
	"react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
	"react/no-danger": "error",
	"react/no-did-mount-set-state": "error",
	"react/no-did-update-set-state": "error",
	"react/no-find-dom-node": "error",
	"react/no-is-mounted": "error",
	"react/no-string-refs": "off", // disabled for now because it does not work with linkref
	"react/prefer-es6-class": "error",
	"react/prefer-stateless-function": "warn",
	"react/require-render-return": "error",
	"react/self-closing-comp": "error"
	// 'react/sort-comp': [
	//   'error',
	//   {
	//     order: [
	//       'properties',
	//       'static-variables',
	//       'static-methods',
	//       'lifecycle',
	//       'everything-else',
	//       'rendering'
	//     ],
	//     groups: { properties: ['state'], rendering: ['/^render.+$/', 'render'] }
	//   }
	// ]
};

export default reactRules;
