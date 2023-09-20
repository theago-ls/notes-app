import { useLayoutEffect, useState } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => matchMedia(query).matches)

	useLayoutEffect(() => {
		const mediaQuery = matchMedia(query)

		function onMediaQueryChange(): void {
			setMatches(mediaQuery.matches)
		}

		mediaQuery.addEventListener('change', onMediaQueryChange)

		return (): void => {
			mediaQuery.removeEventListener('change', onMediaQueryChange)
		}
	}, [query])

	return matches
}

export function saveToStorage<T = unknown>(key: string, value: T): void {
	localStorage.setItem(key, JSON.stringify(value))
}

export function getFromStorage<T = unknown>(key: string): T[] {
	const data = localStorage.getItem(key)

	if (data) {
		return JSON.parse(data) as T[]
	}

	return []
}
