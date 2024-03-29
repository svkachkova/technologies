module.exports = {
	// env - среда выполнения кода
	// подключает глобальные переменные и доступные фичи ECMAScript 6, браузера и Node.js
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	// extends – дополнительные конфигурации, последовательно расширяющие друг друга
	extends: ['airbnb', 'plugin:jest/recommended'],
	//  plugins - плагины, определяющие способ форматирования кода
	plugins: ['babel', 'import', 'prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
		jsx: true,
		},
	},
	// rules – в этой секции можно переопределить любые правила
	rules: {
		'linebreak-style': 'off', // с Windows работает плохо

		'arrow-parens': 'off', // несовместимо с prettier
		'object-curly-newline': 'off', // несовместимо с prettier
		'no-mixed-operators': 'off', // несовместимо с prettier
		'arrow-body-style': 'off',
		'function-paren-newline': 'off', // несовместимо с prettier
		'no-plusplus': 'off',
		'space-before-function-paren': 0, // несовместимо с prettier

		'max-len': [ 'error', 100, 2, { ignoreUrls: true } ],
		'no-console': 'error',	// airbnb использует warn
		'no-alert': 'error',	// airbnb использует warn

		'no-param-reassign': 'off',
		'radix': 'off',

		'react/require-default-props': 'off',	// airbnb использует error
		'react/forbid-prop-types': 'off',	// airbnb использует error
		'react/jsx-filename-extension': [ 'error', { extensions: ['.js'] } ],	// airbnb is использует .jsx

		'prefer-destructuring': 'off',

		'react/no-find-dom-node': 'off',
		'react/no-did-mount-set-state': 'off',
		'react/no-unused-prop-types': 'off',
		'react/jsx-one-expression-per-line': 'off',

		'jsx-a11y/anchor-is-valid': [ 'error', { components: ['Link'], specialLink: ['to'] } ],
		'jsx-a11y/label-has-for': [
			2,
			{
				required: {
				every: ['id'],
				},
			},
		],

		'prettier/prettier': ['error'],
	},
};
