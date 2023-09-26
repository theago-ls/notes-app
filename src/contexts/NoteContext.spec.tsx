import type { RenderResult } from '@testing-library/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteContextProvider, { NoteContext } from 'contexts/NoteContext'
import type { ReactElement, ReactNode } from 'react'
import { useContext } from 'react'
import { Category } from 'types'

function CustomComponent(): ReactElement {
	const { notes, addNote, removeNote, editNote, completeNote } =
		useContext(NoteContext)

	return (
		<>
			<div>
				{JSON.stringify(
					notes.map(note => ({
						title: note.title,
						description: note.description
					}))
				)}
			</div>
			<button
				type='button'
				onClick={(): void => {
					addNote({
						title: `Test${notes.length + 1}`,
						description: `Description${notes.length + 1}`,
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

			<button
				type='button'
				onClick={(): void => {
					completeNote(notes[0].id)
				}}
			>
				Complete note
			</button>

			<button
				type='button'
				onClick={(): void => {
					completeNote(notes[notes.length - 1].id)
				}}
			>
				Mark note as uncompleted
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

	it('should mark note as completed', async () => {
		const addNoteBtn = screen.getByRole('button', { name: /Add note/i })
		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test1/i)).toBeInTheDocument()
			expect(screen.getByText(/Description1/i)).toBeInTheDocument()
		})

		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test2/i)).toBeInTheDocument()
			expect(screen.getByText(/Description2/i)).toBeInTheDocument()
		})

		await userEvent.click(addNoteBtn)

		await waitFor(async () => {
			expect(screen.getByText(/Test3/i)).toBeInTheDocument()
			expect(screen.getByText(/Description3/i)).toBeInTheDocument()
		})

		const completeNoteBtn = screen.getByRole('button', {
			name: /Complete note/i
		})
		await userEvent.click(completeNoteBtn)

		expect(
			screen.getByText(
				'[{"title":"Test2","description":"Description2"},{"title":"Test1","description":"Description1"},{"title":"Test3","description":"Description3"}]'
			)
		).toBeInTheDocument()

		const unmarkCompletedNoteBtn = screen.getByRole('button', {
			name: /Mark note as uncompleted/i
		})
		await userEvent.click(unmarkCompletedNoteBtn)

		expect(
			screen.getByText(
				'[{"title":"Test3","description":"Description3"},{"title":"Test2","description":"Description2"},{"title":"Test1","description":"Description1"}]'
			)
		).toBeInTheDocument()
	})
})
