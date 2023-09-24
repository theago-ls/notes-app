import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Category } from 'types'
import NoteCard from './NoteCard'

describe('NoteCard', () => {
	beforeAll(() => {
		// Material lib uses the animate function to do the ripple effect, which throws an error during tests
		Element.prototype.animate = vitest.fn()
	})

	it('should render with the correct note properties', () => {
		const note = {
			title: 'Title test',
			description: 'Description test',
			category: 'home' as Category,
			done: false,
			id: '1',
			createdAt: new Date()
		}

		render(
			<NoteCard
				note={note}
				actions={{
					editNote: () => {},
					removeNote: () => {},
					completeNote: () => {}
				}}
			/>
		)

		expect(screen.getByText(note.title)).toBeInTheDocument()
		expect(screen.getByText(note.description)).toBeInTheDocument()
		expect(
			screen.getByText(
				note.createdAt.toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			)
		).toBeInTheDocument()
	})

	it('should call the actions when the buttons are clicked', async () => {
		const note = {
			title: 'Title test',
			description: 'Description test',
			category: 'home' as Category,
			done: false,
			id: '1',
			createdAt: new Date()
		}

		const actionsMock = {
			editNote: vitest.fn(),
			removeNote: vitest.fn(),
			completeNote: vitest.fn()
		}

		render(<NoteCard note={note} actions={actionsMock} />)

		const editBtn = screen.getByRole('button', { name: 'Edit' })
		const doneBtn = screen.getByRole('button', { name: 'Done' })
		const removeBtn = screen.getByRole('button', { name: 'Delete' })

		await userEvent.click(doneBtn)
		await userEvent.click(editBtn)
		await userEvent.click(removeBtn)

		await waitFor(() => {
			expect(
				screen.getByRole('button', { name: /Confirm delete/ })
			).toBeInTheDocument()
		})

		const confirmRemove = screen.getByRole('button', { name: /Confirm delete/ })

		await userEvent.click(confirmRemove)

		expect(actionsMock.editNote).toHaveBeenCalled()
		expect(actionsMock.completeNote).toHaveBeenCalled()
		expect(actionsMock.removeNote).toHaveBeenCalled()
	})
})
