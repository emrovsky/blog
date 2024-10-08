module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'next',
		'next/core-web-vitals',
		'plugin:react/recommended',
		'xo',
		'xo-typescript',
		'xo-react',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {jsx: true},
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['react', '@typescript-eslint'],
	ignorePatterns: ['**/*.js'],
	rules: {
		// Next.js
		'@typescript-eslint/triple-slash-reference': 'off',
		'react/react-in-jsx-scope': 'off',

		// Doesn't work with next zero js
		'@next/next/no-img-element': 'off',

		// Prettier handles these
		'@typescript-eslint/comma-dangle': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-tag-spacing': 'off',
		'react/no-unescaped-entities': 'off',
		'no-mixed-operators': 'off',
		'operator-linebreak': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'quote-props': 'off',
		'@typescript-eslint/quotes': 'off',
		'react/jsx-curly-newline': 'off',
		'@typescript-eslint/indent': 'off',
		'jsx-quotes': 'off',
	},
};
