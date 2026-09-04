// Receivers that refer to a window object, both as a bare identifier
// (`window.open()`) and as a property in a chain (`window.top.open()`).
const WINDOW_NAMES = new Set(['window', 'globalThis', 'self', 'top', 'parent']);

// Targets that reuse an existing browsing context, so no `window.opener` is created.
const SAME_CONTEXT_TARGETS = new Set(['_self', '_parent', '_top']);

// Returns the string a node evaluates to, or undefined when it cannot be
// determined at lint time.
function getStaticString(node) {
	if (!node) {
		return undefined;
	}

	if (node.type === 'Literal' && typeof node.value === 'string') {
		return node.value;
	}

	if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
		return node.quasis[0].value.cooked;
	}

	return undefined;
}

// True when `name` resolves to a global rather than a local binding, so that
// a locally declared or imported `open` is not mistaken for `window.open`.
function isGlobal(scope, name) {
	for (let current = scope; current; current = current.upper) {
		const variable = current.variables.find(v => v.name === name);

		if (variable) {
			// Globals supplied by languageOptions.globals have no definitions.
			return variable.defs.length === 0;
		}
	}

	return true;
}

function isWindowReceiver(node, scope) {
	if (node.type === 'Identifier') {
		return WINDOW_NAMES.has(node.name) && isGlobal(scope, node.name);
	}

	if (node.type === 'MemberExpression' && !node.computed && node.property.type === 'Identifier') {
		return WINDOW_NAMES.has(node.property.name) && isWindowReceiver(node.object, scope);
	}

	return false;
}

// Mirrors the HTML spec's window-features tokenizer: `=`, `,` and whitespace
// all separate tokens, so 'noopener noreferrer' and 'width=500,noopener=yes'
// are both valid. https://html.spec.whatwg.org/#concept-window-open-features-tokenize
function parseFeatures(value) {
	const features = new Map();

	for (const entry of value.split(/[\s,]+/)) {
		const separator = entry.indexOf('=');
		const name = (separator === -1 ? entry : entry.slice(0, separator)).toLowerCase();

		if (name) {
			features.set(name, separator === -1 ? '' : entry.slice(separator + 1).toLowerCase());
		}
	}

	return features;
}

// https://html.spec.whatwg.org/#concept-window-open-features-parse-boolean
function isFeatureEnabled(features, name) {
	if (!features.has(name)) {
		return false;
	}

	const value = features.get(name);

	if (value === '' || value === 'yes' || value === 'true') {
		return true;
	}

	const parsed = parseInt(value, 10);

	return isNaN(parsed) ? false : parsed !== 0;
}

export default {
	meta: {
		type: 'problem',
		docs: {
			description:
				"Require 'noopener' in window.open() when the target opens a new browsing context",
			recommended: true
		},
		// Not fixable: window.open() returns null once 'noopener' is set, so adding
		// it would break callers that use the returned window handle.
		fixable: null,
		messages: {
			requireNoopener:
				"Security risk: open() with target '{{target}}' gives the opened page access to window.opener. Pass 'noopener' (or 'noreferrer') in the 3rd argument, e.g. 'noopener,noreferrer'."
		},
		schema: [
			{
				type: 'object',
				properties: {
					// Named targets also create a new browsing context with an opener,
					// but flagging them is opt-in to keep the rule focused on '_blank'.
					includeNamedTargets: { type: 'boolean' }
				},
				additionalProperties: false
			}
		]
	},

	create(context) {
		const { includeNamedTargets = false } = context.options[0] ?? {};
		const sourceCode = context.sourceCode;

		return {
			CallExpression(node) {
				const { callee } = node;
				const scope = sourceCode.getScope(node);
				const isWindowOpen =
					callee.type === 'MemberExpression' &&
					!callee.computed &&
					callee.property.type === 'Identifier' &&
					callee.property.name === 'open' &&
					isWindowReceiver(callee.object, scope);
				const isBareOpen =
					callee.type === 'Identifier' && callee.name === 'open' && isGlobal(scope, 'open');

				if (!isWindowOpen && !isBareOpen) {
					return;
				}

				let target;

				if (node.arguments.length < 2) {
					// window.open(url) defaults to '_blank'.
					target = '_blank';
				} else {
					const staticTarget = getStaticString(node.arguments[1]);

					if (staticTarget === undefined) {
						// Skips genuinely dynamic values to avoid false positives
						return;
					}

					// An empty target becomes '_blank'.
					// https://html.spec.whatwg.org/#window-open-steps
					target = staticTarget === '' ? '_blank' : staticTarget.toLowerCase();
				}

				if (SAME_CONTEXT_TARGETS.has(target)) {
					return;
				}

				if (target !== '_blank' && !includeNamedTargets) {
					return;
				}

				if (node.arguments.length > 2) {
					const staticFeatures = getStaticString(node.arguments[2]);

					if (staticFeatures === undefined) {
						return;
					}

					const features = parseFeatures(staticFeatures);

					// 'noreferrer' implies 'noopener'.
					if (isFeatureEnabled(features, 'noopener') || isFeatureEnabled(features, 'noreferrer')) {
						return;
					}
				}

				context.report({
					node,
					messageId: 'requireNoopener',
					data: { target }
				});
			}
		};
	}
};
