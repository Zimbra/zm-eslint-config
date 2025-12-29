import testcafePlugin from "eslint-plugin-testcafe";
import { automationRules } from "../rules/automation.js";

export default [
	{
		files: ["test/**/*.{js,jsx,mjs,cjs}", "tests/**/*.{js,jsx,mjs,cjs}"],
		ignores: ["**/node_modules/*", "**/dist/*", "**/build/*"],
		plugins: {
			testcafePlugin: testcafePlugin,
		},
		rules: {
			...testcafePlugin.configs.recommended.rules,
			...automationRules
		}
	}
];
