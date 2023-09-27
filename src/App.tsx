import { ThemeProvider } from '@material-tailwind/react'
import type { ReactElement } from 'react'
import { StrictMode } from 'react'

import { NoteContextProvider } from 'contexts'
import Home from 'pages/Home'

export default function App(): ReactElement {
	return (
		<StrictMode>
			<ThemeProvider>
				<NoteContextProvider>
					<Home />
				</NoteContextProvider>
			</ThemeProvider>
		</StrictMode>
	)
}
