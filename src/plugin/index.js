import noDirectMemoize from './rules/no-direct-memoize.js';
import noUnsafeWindowOpen from './rules/no-unsafe-window-open.js';
import requireIconImportSuffix from './rules/require-icon-import-suffix.js';

/**
 * The Zimbra custom ESLint plugin.
 *
 * Holds all project-specific rules in one place so they can be registered
 * under a single `custom/` namespace (and, later, extracted into a
 * standalone `@zimbra/eslint-plugin` package without touching the rules).
 */
const plugin = {
	meta: {
		name: '@zimbra/eslint-config/custom'
	},
	rules: {
		'no-direct-memoize': noDirectMemoize,
		'no-unsafe-window-open': noUnsafeWindowOpen,
		'require-icon-import-suffix': requireIconImportSuffix
	}
};

export default plugin;
