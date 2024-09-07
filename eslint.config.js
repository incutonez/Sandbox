import eslint from "@eslint/js";
import pluginImport from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
	eslint.configs.recommended,
	// ignores must be by itself?  https://github.com/eslint/eslint/issues/17400#issuecomment-1646873272
	{
		"ignores": [
			"**/dist",
			"ui/src/assets/theme/*",
			"**/generated",
			"**/eslint.config.js"
		],
	},
	{
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
        ...globals.node,
			},
			"parserOptions": {
				"sourceType": "module",
			},
		},
		plugins: {
			"simple-import-sort": pluginImport,
		},
		"rules": {
			"indent": ["error", "tab"],
			"brace-style": ["error", "stroustrup"],
			"curly": ["error", "all"],
			"space-before-function-paren": ["error", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always",
			}],
			"semi": [2, "always"],
			"quotes": ["error", "double"],
			"no-mixed-spaces-and-tabs": "off",
			"comma-dangle": [
				"error",
				"always-multiline",
			],
			"eol-last": [
				"error",
				"always",
			],
			"object-curly-newline": [
				"error",
				{
					"ObjectExpression": {
						"multiline": true,
						"minProperties": 1,
					},
					"ObjectPattern": "never",
				},
			],
			"object-curly-spacing": [
				"error",
				"always",
			],
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
			"array-bracket-newline": "off",
			"array-bracket-spacing": ["error", "never"],
			"comma-spacing": ["error", {
				"before": false,
				"after": true,
			}],
			"array-element-newline": ["error", "consistent"],
			"key-spacing": "error",
			"space-infix-ops": "error",
			"no-multi-spaces": "error",
			"space-before-blocks": "error",
			"keyword-spacing": "error",
			"space-in-parens": "error",
			"simple-import-sort/imports": [
				"error",
				{
					"groups": [
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
	}];
