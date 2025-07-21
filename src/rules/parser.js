import tsParser from "@typescript-eslint/parser";

export default {
	parser: tsParser,
	sourceType: "module",
	ecmaVersion: "latest",
	parserOptions: {
		requireConfigFile: false,
		ecmaFeatures: { jsx: true }
	}
};
