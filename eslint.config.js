import parserBabel from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		ignores: [
			'node_modules/',
			'build/',
			'dist/',
			'public/',
			'*.config.js',
			'*.config.ts',
		],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: parserBabel,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
				requireConfigFile: false,
				babelOptions: {
					plugins: ['@babel/plugin-syntax-jsx'],
				},
			},
		},
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
			'jsx-a11y': pluginJsxA11y,
			import: pluginImport,
			'simple-import-sort': pluginSimpleImportSort,
			'unused-imports': pluginUnusedImports,
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
			'react/react-in-jsx-scope': 'off',
			'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
			'import/order': 'off',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^.+\\.css$', '^.+\\.scss$', '^.+\\.sass$'],
						['^react', '^@?\\w'],
						['^(@|components|utils|lib|hooks|config|services)(/.*|$)'],
						[
							'^\\.\\.(?!/?$)',
							'^\\.\\./?$',
							'^\\./(?=.*/)(?!/?$)',
							'^\\.(?!/?$)',
							'^\\./?$',
						],
						['^'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['hrefLeft', 'hrefRight'],
					aspects: ['invalidHref', 'preferButton'],
				},
			],
		},
	},
	// Allow unused React import and define jest globals in test files
	{
		files: ['**/*.test.{js,jsx}'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'off',
		},
	},
];
