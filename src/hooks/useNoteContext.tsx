import { useContext } from 'react'

import { NoteContext } from 'contexts'
import type { NoteContextType } from 'contexts'

export default function useNoteContext(): NoteContextType {
	const values = useContext(NoteContext)

	return values
}
