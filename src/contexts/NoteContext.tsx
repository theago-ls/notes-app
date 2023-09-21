import type { PropsWithChildren, ReactElement } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'
import { v1 as uuidv1 } from 'uuid'

import type { Category, Note } from 'types'
import { getFromStorage, saveToStorage } from 'utils'

interface NoteContextType {
	notes: Note[]
	addNote: (note: {
		title: string
		description: string
		category: Category
	}) => void
	removeNote: (id: string) => void
	editNote: (editedNote: Note) => void
}

export const NoteContext = createContext<NoteContextType>({} as NoteContextType)

export default function NoteContextProvider({
	children
}: PropsWithChildren): ReactElement {
	const [notes, setNotes] = useState<Note[]>(getFromStorage<Note>('notes'))

	const addNote = useCallback(
		(note: { title: string; description: string; category: Category }) => {
			const addedNote: Note = {
				...note,
				done: false,
				id: uuidv1(),
				createdAt: new Date()
			}

			const changedNotes = [...notes, addedNote]

			saveToStorage('notes', changedNotes)
			setNotes(changedNotes)
		},
		[notes]
	)

	const removeNote = useCallback(
		(id: string) => {
			const changedNotes = notes.filter(note => note.id !== id)

			saveToStorage('notes', changedNotes)
			setNotes(changedNotes)
		},
		[notes]
	)

	const editNote = useCallback(
		(editedNote: Note) => {
			const changedNotes = notes.map(note => {
				if (note.id === editedNote.id) {
					return { ...editedNote, updatedAt: new Date() }
				}

				return note
			})

			saveToStorage('notes', changedNotes)
			setNotes(changedNotes)
		},
		[notes]
	)

	const value = useMemo(
		() => ({
			notes,
			addNote,
			removeNote,
			editNote
		}),
		[notes, addNote, removeNote, editNote]
	)

	return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}
