export default {
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow direct import of es-toolkit/compat/memoize; use createLRUMemoize",
			recommended: true
		},
		fixable: null,
		messages: {
			useCreateLRU:
				"Do not import 'es-toolkit/compat/memoize' directly. Use 'createLRUMemoize' instead."
		},
		schema: []
	},

	create(context) {
		return {
			ImportDeclaration(node) {
				if (node.source.value === "es-toolkit/compat/memoize") {
					context.report({
						node,
						messageId: "useCreateLRU"
					});
				}
			},

			CallExpression(node) {
				if (
					node.callee.name === "require" &&
					node.arguments[0] &&
					node.arguments[0].value === "es-toolkit/compat/memoize"
				) {
					context.report({
						node,
						messageId: "useCreateLRU"
					});
				}
			}
		};
	}
};
