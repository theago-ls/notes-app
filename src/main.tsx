import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import App from 'App'

import './index.css'

registerSW()

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(<App />)
}
