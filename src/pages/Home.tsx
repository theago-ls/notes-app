import { Button } from '@material-tailwind/react'
import { useContext, useState, type ReactElement } from 'react'
import { MdAdd } from 'react-icons/md'

import AddNoteDialog from 'components/AddNoteDialog'
import CategoryFilter from 'components/CategoryFilter'
import CompletedProgressBar from 'components/CompletedProgressBar'
import NoteCard from 'components/NoteCard'
import Search from 'components/Search'
import { NoteContext } from 'contexts/NoteContext'
import type { Category, Note } from 'types'

const renderEmptyImage = (isSearchQuery: boolean) =>
	isSearchQuery ? (
		<div className='m-auto mt-14'>
			<p className='text-3xl text-gray-500'>Couldn&apos;t find any notes</p>
			<img
				className='mt-14 h-64 w-64'
				alt='Empty search'
				src='empty-search.png'
			/>
		</div>
	) : (
		<div className='m-auto mt-14 flex flex-col items-center'>
			<p className='text-3xl text-gray-500'>
				You don&apos;t have any notes yet
			</p>
			<img
				className='mt-14 h-64 w-64'
				alt='Empty notes list'
				src='empty-notes.png'
			/>
		</div>
	)

export default function Home(): ReactElement {
	const [filters, setFilters] = useState<{ query: string; category: Category }>(
		{ query: '', category: 'all' as Category }
	)
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)
	const [showModal, setShowModal] = useState(false)

	const { notes, addNote, editNote, removeNote, completeNote } =
		useContext(NoteContext)

	const filteredNotes = notes
		.filter(note =>
			filters.query !== ''
				? note.title.toLowerCase().includes(filters.query.toLowerCase()) ||
				  note.description.toLowerCase().includes(filters.query.toLowerCase())
				: true
		)
		.filter(note =>
			filters.category !== ('all' as Category)
				? note.category === filters.category
				: true
		)

	const completedNotes = notes.reduce(
		(acc, note) => (note.done ? acc + 1 : acc),
		0
	)

	return (
		<main className='flex min-h-screen flex-col items-center bg-lightGray p-12'>
			<Search
				placeholder='Search notes...'
				onChange={query => {
					setFilters(prev => ({
						...prev,
						query
					}))
				}}
			/>

			<section className='mt-4 flex w-full  max-w-[824px] flex-col-reverse justify-center gap-3 md:mt-6 md:flex-row md:items-center md:justify-between md:gap-0'>
				<CategoryFilter
					onChange={(category: string) => {
						setFilters(prev => ({ ...prev, category: category as Category }))
					}}
				/>
				<Button
					onClick={() => {
						setShowModal(true)
					}}
					className='flex h-9 items-center justify-center gap-1.5 bg-blue p-3.5 '
				>
					<MdAdd size={20} />
					Add note
				</Button>
			</section>

			<CompletedProgressBar
				completedNotes={completedNotes}
				totalNotes={notes.length}
			/>

			<section className='mt-8 flex w-full max-w-[824px] flex-wrap gap-4'>
				{filteredNotes.length > 0
					? filteredNotes.map(note => (
							<NoteCard
								key={note.id}
								note={note}
								actions={{
									removeNote,
									editNote: (sNote: Note) => {
										setSelectedNote(sNote)
										setShowModal(true)
									},
									completeNote
								}}
							/>
					  ))
					: renderEmptyImage(
							!!filters.query || filters.category !== ('all' as Category)
					  )}
			</section>

			<AddNoteDialog
				isOpen={showModal}
				onClose={() => {
					setSelectedNote(null)
					setShowModal(false)
				}}
				onSubmit={value => {
					if (selectedNote) {
						editNote({ ...selectedNote, ...value })
						setSelectedNote(null)
					} else {
						addNote(value)
					}
					setShowModal(false)
				}}
				note={selectedNote}
			/>
		</main>
	)
}
