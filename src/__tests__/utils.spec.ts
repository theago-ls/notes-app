import { act, renderHook } from '@testing-library/react'
import { getFromStorage, useMediaQuery } from 'utils'

const BELOW_MIN_WIDTH = 599
const MIN_WITDH = 600

describe('utils', () => {
	describe('useMediaQuery', () => {
		it('renders', () => {
			window.resizeTo(BELOW_MIN_WIDTH, 0)
			const { result } = renderHook(() =>
				useMediaQuery(`(min-width: ${MIN_WITDH}px)`)
			)
			expect(result.current).toBeFalsy()

			act(() => window.resizeTo(MIN_WITDH, 0))

			expect(result.current).toBeTruthy()
		})
	})

	describe('getFromStorage', () => {
		it('return array of data if there is data associated with passed key', () => {
			vitest.stubGlobal('localStorage', {
				getItem: vitest.fn().mockReturnValue('["item1", "item2"]')
			})

			expect(getFromStorage('key')).toEqual(['item1', 'item2'])
		})

		it('return empty array if there is no data associated with passed key', () => {
			vitest.stubGlobal('localStorage', {
				getItem: vitest.fn().mockReturnValue(null)
			})

			expect(getFromStorage('key')).toEqual([])
		})
	})
})
