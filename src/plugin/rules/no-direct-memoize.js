export default {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow direct import of es-toolkit/compat/memoize or es-toolkit/memoize; use createLRUMemoize',
			recommended: true
		},
		fixable: null,
		messages: {
			useCreateLRU:
				"Do not import es-toolkit/compat/memoize or es-toolkit/memoize; directly. Use 'createLRUMemoize' instead."
		},
		schema: []
	},

	create(context) {
		// List of disallowed modules
		const disallowedModules = ['es-toolkit/compat/memoize', 'es-toolkit/memoize'];

		return {
			ImportDeclaration(node) {
				if (disallowedModules.includes(node.source.value)) {
					context.report({
						node,
						messageId: 'useCreateLRU',
						data: { module: node.source.value }
					});
				}
			},

			CallExpression(node) {
				if (
					node.callee.name === 'require' &&
					node.arguments[0] &&
					disallowedModules.includes(node.arguments[0].value)
				) {
					context.report({
						node,
						messageId: 'useCreateLRU',
						data: { module: node.arguments[0].value }
					});
				}
			}
		};
	}
};
