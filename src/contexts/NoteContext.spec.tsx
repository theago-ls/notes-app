import type { RenderResult } from '@testing-library/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteContextProvider, { NoteContext } from 'contexts/NoteContext'
import type { ReactElement, ReactNode } from 'react'
import { useContext } from 'react'
import { Category } from 'types'

function CustomComponent(): ReactElement {
	const { notes, addNote, removeNote, editNote } = useContext(NoteContext)

	return (
		<>
			<div>{JSON.stringify(notes)}</div>
			<button
				type='button'
				onClick={(): void => {
					addNote({
						title: 'Test1',
						description: 'Description1',
						category: Category.Home
					})
				}}
			>
				Add note
			</button>
			<button
				type='button'
				onClick={(): void => {
					editNote({ ...notes[0], description: 'Description edited' })
				}}
			>
				Edit note
			</button>
			<button
				type='button'
				onClick={(): void => {
					removeNote(notes[0].id)
				}}
			>
				Remove note
			</button>
		</>
	)
}

const customRender = (ui: ReactNode): RenderResult =>
	render(<NoteContextProvider>{ui}</NoteContextProvider>)

describe('NoteContext', () => {
	beforeEach(() => {
		vitest.stubGlobal('localStorage', {
			setItem: vitest.fn().mockReturnValue(null),
			getItem: vitest.fn().mockReturnValue(null)
		})
		customRender(<CustomComponent />)
	})

	it('should add note', async () => {
		const addNoteBtn = screen.getByRole('button', { name: /Add note/i })
		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test1/i)).toBeInTheDocument()
			expect(screen.getByText(/Description1/i)).toBeInTheDocument()
		})
	})

	it('should edit note', async () => {
		const addNoteBtn = screen.getByRole('button', { name: /Add note/i })
		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test1/i)).toBeInTheDocument()
			expect(screen.getByText(/Description1/i)).toBeInTheDocument()
		})

		const editNoteBtn = screen.getByRole('button', { name: /Edit note/i })
		await userEvent.click(editNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test1/i)).toBeInTheDocument()
			expect(screen.getByText(/Description edited/i)).toBeInTheDocument()
		})
	})

	it('should delete note', async () => {
		const addNoteBtn = screen.getByRole('button', { name: /Add note/i })
		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test1/i)).toBeInTheDocument()
			expect(screen.getByText(/Description1/i)).toBeInTheDocument()
		})

		const removeNoteBtn = screen.getByRole('button', { name: /Remove note/i })
		await userEvent.click(removeNoteBtn)

		await waitFor(async () => {
			expect(screen.queryByText(/Test1/i)).not.toBeInTheDocument()
			expect(screen.queryByText(/Description1/i)).not.toBeInTheDocument()
		})
	})
})
