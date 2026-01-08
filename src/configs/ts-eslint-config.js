import pluginPrettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import typescriptRules from '../rules/typescript.js';
import prettierRules from '../rules/prettier.js';

export default [
	{
		ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/*.d.ts']
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			sourceType: 'module',
			ecmaVersion: 'latest',
			parserOptions: {
				project: true
			}
		},
		plugins: {
			'@typescript-eslint': pluginTypescript,
			import: importPlugin,
			prettier: pluginPrettier
		},
		rules: {
			...pluginTypescript.configs.recommended.rules,
			...prettierRules,
			...typescriptRules
		}
	}
];
