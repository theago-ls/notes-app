const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Roboto', ...defaultConfig.theme.fontFamily.sans]
		},
		colors: {
			lightGray: '#F5F5F5',
			bgGray: '#F4F4F4',
			darkGray: '#282E2999',
			lightBlue: '#69BCFF',
			blue: '#2196F3',
			darkBlue: '#5C6BC0',
			green: '#66BB6A',
			orange: '#FF9100',
			blackText: '#00000099'
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin]
}
module.exports = config
