module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.ts?(x)'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname
			},
			env: {
				'cypress/globals': true
			},
			plugins: ['cypress'],
			extends: [
				'eslint:recommended',
				'plugin:import/warnings',
				'plugin:import/errors',
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'airbnb-typescript/base',
				'prettier'
			],
			rules: {
				'import/namespace': 'off',
				'import/no-extraneous-dependencies': 'off',
				'@typescript-eslint/no-unused-expressions': 'off'
			}
		}
	]
}
