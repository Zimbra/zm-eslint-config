export default {
	meta: {
		type: 'suggestion',
		docs: {
			description:
				"Require the local binding of an icon import to end with 'Icon' (e.g. import { ChartPieIcon } from 'lucide-preact' or import { pdf as pdfIcon } from '@zimbra/lucide-lab')",
			recommended: true
		},
		fixable: null,
		messages: {
			missingSuffix:
				"Icon import '{{local}}' from '{{source}}' must end with 'Icon'. Use '{{suggestion}}' to improve readability.",
			noNamespace:
				"Namespace import from '{{source}}' is not allowed for icons; import individual icons with an 'Icon'-suffixed name instead.",
			noDefault:
				"Default import from '{{source}}' is not allowed for icons; use a named import with an 'Icon'-suffixed name instead."
		},
		schema: [
			{
				type: 'object',
				properties: {
					modules: {
						type: 'array',
						items: { type: 'string' },
						uniqueItems: true
					},
					suffix: {
						type: 'string'
					}
				},
				additionalProperties: false
			}
		]
	},

	create(context) {
		const options = context.options[0] || {};
		const modules = options.modules || ['lucide-preact', '@zimbra/lucide-lab'];
		const suffix = options.suffix || 'Icon';

		return {
			ImportDeclaration(node) {
				if (!modules.includes(node.source.value)) {
					return;
				}

				const source = node.source.value;

				for (const specifier of node.specifiers) {
					// import Foo from '...'
					if (specifier.type === 'ImportDefaultSpecifier') {
						context.report({
							node: specifier,
							messageId: 'noDefault',
							data: { source }
						});
						continue;
					}

					// import * as Foo from '...'
					if (specifier.type === 'ImportNamespaceSpecifier') {
						context.report({
							node: specifier,
							messageId: 'noNamespace',
							data: { source }
						});
						continue;
					}

					// import { Foo } / import { Foo as Bar } from '...'
					if (specifier.type === 'ImportSpecifier') {
						const local = specifier.local.name;

						if (local.endsWith(suffix)) {
							continue;
						}

						// Build a readable suggestion:
						// - if the imported name already ends with the suffix, prefer the bare form
						// - otherwise suggest aliasing the imported name with the suffix appended
						const imported = specifier.imported.name;
						const suggestion = imported.endsWith(suffix)
							? imported
							: `${imported} as ${imported}${suffix}`;

						context.report({
							node: specifier,
							messageId: 'missingSuffix',
							data: { local, source, suggestion }
						});
					}
				}
			}
		};
	}
};
