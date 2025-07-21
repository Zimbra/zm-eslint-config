import testcafePlugin from "eslint-plugin-testcafe";
import { automationRules } from "../rules/automation.js";

export default [
	{
		files: ["test/**/*.{js,jsx}", "tests/**/*.{js,jsx}"],
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
