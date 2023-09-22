import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'

describe('Search', () => {
	it('should render', () => {
		render(<Search placeholder='Search test' onChange={() => {}} />)

		expect(screen.getByPlaceholderText('Search test')).toBeInTheDocument()
	})

	it('should call onChange when the input value changes', async () => {
		const onChangeMock = vitest.fn()

		render(<Search placeholder='Search test' onChange={onChangeMock} />)

		const searchInput = screen.getByRole('textbox')

		await userEvent.type(searchInput, 'Search test')

		expect(onChangeMock).toBeCalledWith('Search test')
	})
})
