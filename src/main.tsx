import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import App from 'App'

import { ThemeProvider } from '@material-tailwind/react'
import NoteContextProvider from 'contexts/NoteContext'
import './index.css'

registerSW()

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<ThemeProvider>
				<NoteContextProvider>
					<App />
				</NoteContextProvider>
			</ThemeProvider>
		</StrictMode>
	)
}
