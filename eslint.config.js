// eslint.config.js
const { ESLint } = require("eslint");

module.exports = [
	{
		languageOptions: {
			globals: {
				node: true,
				es2021: true,
			},
			ecmaVersion: "latest",
			sourceType: "module",
			parser: require("@typescript-eslint/parser"),
		},
		plugins: {
			"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
			"react": require("eslint-plugin-react"),
			"react-hooks": require("eslint-plugin-react-hooks"),
		},
		rules: {
			"import/order": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"react/react-in-jsx-scope": "off",
			"react/display-name": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
