module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
		ecmaVersion: "latest",
	},
	plugins: ["@typescript-eslint/eslint-plugin", "eslint-plugin-import", "simple-import-sort"],
	extends: ["plugin:@typescript-eslint/recommended"],
	root: true,
	env: {
		node: true,
		jest: true,
		es2022: true,
	},
	ignorePatterns: [".eslintrc.js"],
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/indent": [
			"error",
			"tab",
			{
				SwitchCase: 1,
				ignoredNodes: ["PropertyDefinition"],
			},
		],
		"@typescript-eslint/ban-ts-comment": [
			"error",
			{
				"ts-expect-error": "allow-with-description",
			},
		],
		indent: [
			"error",
			"tab",
			{
				SwitchCase: 1,
				ignoredNodes: ["PropertyDefinition"],
			},
		],
		"brace-style": ["error", "stroustrup"],
		curly: ["error", "all"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "never",
				named: "never",
				asyncArrow: "always",
			},
		],
		semi: [2, "always"],
		quotes: ["error", "double"],
		"no-mixed-spaces-and-tabs": "off",
		"comma-dangle": ["error", "always-multiline"],
		"eol-last": ["error", "always"],
		"object-curly-newline": [
			"error",
			{
				ObjectExpression: {
					multiline: true,
					minProperties: 1,
				},
				ObjectPattern: "never",
			},
		],
		"object-curly-spacing": ["error", "always"],
		"object-property-newline": "error",
		"no-trailing-spaces": ["error"],
		"no-var": "error",
		"arrow-spacing": "error",
		"no-duplicate-imports": "error",
		"arrow-parens": "error",
		"computed-property-spacing": ["error", "never"],
		"func-call-spacing": ["error", "never"],
		"new-parens": "error",
		"prefer-const": "error",
		"array-bracket-spacing": ["error", "never"],
		"comma-spacing": ["error", { before: false, after: true }],
		"array-element-newline": ["error", "consistent"],
		"key-spacing": "error",
		"import/newline-after-import": ["error", { count: 1 }],
		"space-infix-ops": "error",
		"no-multi-spaces": "error",
		"space-before-blocks": "error",
		"keyword-spacing": "error",
		"space-in-parens": "error",
		"simple-import-sort/imports": [
			"error",
			{
				groups: [
					// Side effect imports.
					["^\\u0000"],
					// Node.js builtins prefixed with `node:`.
					["^node:"],
					["^vue"],
					// Packages.
					// Things that start with a letter (or digit or underscore), or `@` followed by a letter.
					["^@?\\w"],
					// Absolute imports and other imports such as Vue-style `@/foo`.
					// Anything not matched in another group.
					["^"],
					// Relative imports.
					// Anything that starts with a dot.
					["^\\."],
				],
			},
		],
	},
};
