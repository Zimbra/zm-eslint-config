export default {
	meta: {
    type: "suggestion",
    docs: {
      description: "Disallow importing icons without the `Icon` suffix",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
    messages: {
      iconSuffixViolation: "Icon imported without the `Icon` suffix.",
    },
  },
	create(context) {
    return {
      ImportDeclaration(node) {
        if (["lucide-preact"].includes(node.source.value)) {
          node.specifiers
            .filter(({ type }) => type === "ImportSpecifier")
            .filter(
              ({ imported, local }) =>
                !imported.name.endsWith("Icon") && !local.name.endsWith("Icon")
            )
            .forEach((specifier) => {
              context.report({
                node: specifier,
                messageId: "iconSuffixViolation",
              });
            });
        }
      },
    };
  }
};
