import { defineConfig } from 'cypress'

export default defineConfig({
	fileServerFolder: 'dist',
	fixturesFolder: false,
	projectId: 'etow1b',
	e2e: {
		baseUrl: 'http://localhost:4173/notes-app/',
		specPattern: 'cypress/e2e/**/*.ts'
	},
	experimentalSourceRewriting: true
})
