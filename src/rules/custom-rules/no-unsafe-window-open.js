export default {
	meta: {
		type: 'problem',
		docs: {
			description: "Require 'noopener' in window.open() when target is '_blank'",
			recommended: true
		},
		fixable: null,
		messages: {
			requireNoopener:
				"Security risk: open() with '_blank' must include 'noopener' in the 3rd argument (e.g. 'noopener,noreferrer')."
		},
		schema: []
	},

	create(context) {
		return {
			CallExpression(node) {
				const isWindowOpen =
					node.callee.type === 'MemberExpression' &&
					node.callee.object.name === 'window' &&
					node.callee.property.name === 'open';

				const isBareOpen = node.callee.type === 'Identifier' && node.callee.name === 'open';

				if (!isWindowOpen && !isBareOpen) {
					return;
				}

				const targetArg = node.arguments[1];
				let isBlank = false;

				if (!targetArg) {
					isBlank = true;
				} else if (targetArg.type === 'Literal' && typeof targetArg.value === 'string') {
					if (targetArg.value.toLowerCase() === '_blank') {
						isBlank = true;
					}
				} else {
					// Skips genuinely dynamic values to avoid false positives
					return;
				}

				if (!isBlank) {
					return;
				}

				const featuresArg = node.arguments[2];

				if (!featuresArg) {
					context.report({
						node,
						messageId: 'requireNoopener'
					});
					return;
				}

				if (featuresArg.type === 'Literal' && typeof featuresArg.value === 'string') {
					const features = featuresArg.value.split(',').map(s => s.trim().toLowerCase());
					if (!features.includes('noopener')) {
						context.report({
							node,
							messageId: 'requireNoopener'
						});
					}
				}
			}
		};
	}
};
