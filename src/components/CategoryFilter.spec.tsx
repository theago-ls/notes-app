import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryFilter from './CategoryFilter'

describe('CategoryFilter', () => {
	beforeAll(() => {
		// Material lib uses the animate function to do the ripple effect, which throws an error during tests
		Element.prototype.animate = vitest.fn()
	})

	it("should render with 'All' filter selected", () => {
		render(<CategoryFilter onChange={() => {}} />)

		const allTab = screen.getByRole('tab', { name: /All/i })

		expect(allTab).toHaveAttribute('aria-selected', 'true')
	})

	it('should change the selected tab on click', async () => {
		render(<CategoryFilter onChange={() => {}} />)

		const homeTab = screen.getByRole('tab', { name: /Home/i })
		await userEvent.click(homeTab)

		expect(homeTab).toHaveAttribute('aria-selected', 'true')

		const workTab = screen.getByRole('tab', { name: /Work/i })
		await userEvent.click(workTab)

		expect(workTab).toHaveAttribute('aria-selected', 'true')

		const personalTab = screen.getByRole('tab', { name: /Personal/i })
		await userEvent.click(personalTab)

		expect(personalTab).toHaveAttribute('aria-selected', 'true')
	})

	it('should call onChange when a tab is selected', async () => {
		const onChangeMock = vitest.fn()
		render(<CategoryFilter onChange={onChangeMock} />)

		const homeTab = screen.getByRole('tab', { name: /Home/i })
		await userEvent.click(homeTab)

		const workTab = screen.getByRole('tab', { name: /Work/i })
		await userEvent.click(workTab)

		const personalTab = screen.getByRole('tab', { name: /Personal/i })
		await userEvent.click(personalTab)

		const allTab = screen.getByRole('tab', { name: /All/i })
		await userEvent.click(allTab)

		expect(onChangeMock).toHaveBeenCalledTimes(4)
		expect(onChangeMock).toHaveBeenNthCalledWith(1, 'home')
		expect(onChangeMock).toHaveBeenNthCalledWith(2, 'work')
		expect(onChangeMock).toHaveBeenNthCalledWith(3, 'personal')
		expect(onChangeMock).toHaveBeenNthCalledWith(4, 'all')
	})
})
