// import fs from 'fs';
import pluginPrettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import typescriptRules from "../rules/typescript.js";
import prettierRules from "../rules/prettier.js";

export default [
	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["**/dist/*", "**/build/*", "**/node-modules/*", "**/*.d.ts"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
			ecmaVersion: "latest",
			parserOptions: {
				project: true
			}
		},
		plugins: {
			"@typescript-eslint": pluginTypescript,
			import: importPlugin,
			prettier: pluginPrettier
		},
		rules: {
			...prettierRules,
			...typescriptRules
		}
	}
];
