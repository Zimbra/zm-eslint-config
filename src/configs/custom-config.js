import customRules from "../rules/custom-rules/custom-rules.js";
import noDirectMemoize from "../rules/custom-rules/no-direct-memoize.js";

export default [
	{
		files: ["**/*.{js,jsx}"],
		ignores: ["**/node_modules/*", "**/dist/*", "**/build/*"],
		plugins: {
			custom: {
				rules: {
					"no-direct-memoize": noDirectMemoize
				}
			}
		},
		rules: {
			...customRules
		}
	}
];
