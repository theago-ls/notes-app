import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Category } from 'types'
import AddNoteDialog from './AddNoteDialog'

vitest.mock('utils')

vitest.stubGlobal('matchMedia', {
	writable: true,
	value: vitest.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vitest.fn(),
		removeListener: vitest.fn(),
		addEventListener: vitest.fn(),
		removeEventListener: vitest.fn(),
		dispatchEvent: vitest.fn()
	}))
})

describe('AddNoteDialog', () => {
	beforeAll(() => {
		// Material lib uses the animate function to do the ripple effect, which throws an error during tests
		Element.prototype.animate = vitest.fn()
	})

	it('should render the dialog when the isOpen prop is true', () => {
		render(<AddNoteDialog isOpen onClose={() => {}} onSubmit={() => {}} />)

		expect(screen.getByPlaceholderText('Add title...')).toBeInTheDocument()
		expect(
			screen.getByPlaceholderText('Add description...')
		).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})

	it('should call onClose when the Cancel button is clicked', async () => {
		const onCloseMock = vitest.fn()
		render(<AddNoteDialog isOpen onClose={onCloseMock} onSubmit={() => {}} />)

		const closeBtn = screen.getByText('Cancel')

		await userEvent.click(closeBtn)

		expect(onCloseMock).toHaveBeenCalled()
	})

	it('should only call onSubmit when all inputs are filled', async () => {
		const onSubmitMock = vitest.fn()
		render(<AddNoteDialog isOpen onClose={() => {}} onSubmit={onSubmitMock} />)

		const addBtn = screen.getByRole('button', { name: 'Add' })
		await userEvent.click(addBtn)

		expect(screen.getByText(/Title is required/i)).toBeInTheDocument()

		const titleInput = screen.getByPlaceholderText('Add title...')
		await userEvent.type(titleInput, 'Title test')

		await userEvent.click(addBtn)

		await waitFor(() => {
			expect(screen.getByText(/Category is required./i)).toBeInTheDocument()
		})

		const categorySelectBtn = screen.getByRole('combobox')
		await userEvent.click(categorySelectBtn)
		await userEvent.click(screen.getByRole('option', { name: /Home/i }))

		await userEvent.click(addBtn)

		await waitFor(() => {
			expect(screen.getByText(/Description is required./i)).toBeInTheDocument()
		})

		const descriptionInput = screen.getByPlaceholderText('Add description...')
		await userEvent.type(descriptionInput, 'Description test')

		await userEvent.click(addBtn)

		expect(onSubmitMock).toHaveBeenCalledWith({
			title: 'Title test',
			description: 'Description test',
			category: 'home'
		})
	})

	it('should render the edit dialog when a note is passed', () => {
		render(
			<AddNoteDialog
				isOpen
				note={{
					title: 'Title edit',
					description: 'Description edit',
					category: 'home' as Category
				}}
				onClose={() => {}}
				onSubmit={() => {}}
			/>
		)

		expect(screen.getByDisplayValue('Title edit')).toBeInTheDocument()
		expect(screen.getByText('Description edit')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})
})
