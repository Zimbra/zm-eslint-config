export default {
	"@typescript-eslint/member-ordering": [
		"error",
		{
			default: {
				memberTypes: [
					// 1. Static fields
					"public-static-field",
					"protected-static-field",
					"private-static-field",

					// 2. Instance fields
					"public-instance-field",
					"protected-instance-field",
					"private-instance-field",

					// 3. Static methods
					"public-static-method",
					"protected-static-method",
					"private-static-method",

					// 4. Constructors
					"public-constructor",
					"protected-constructor",
					"private-constructor",

					// 5. Instance methods
					"public-instance-method",
					"protected-instance-method",
					"private-instance-method",
				],
				order: "alphabetically-case-insensitive",
			},
		},
	],
	"@typescript-eslint/naming-convention": "off", // replaces function-name and variable-name
	"@typescript-eslint/array-type": "off", // replaces prefer-array-literal
	// replaces ordered-imports
	"import/order": [
		"error",
		{
			groups: [
				"builtin",
				["external", "sibling", "parent", "internal", "index"]
			]
		}
	]
};
