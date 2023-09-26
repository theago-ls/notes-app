import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Option,
	Select,
	Textarea
} from '@material-tailwind/react'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import type { Note } from 'types'
import { Category } from 'types'
import { useMediaQuery } from 'utils'

type NewNote = {
	title: string
	description: string
	category: Category
}

type AddNoteDialogProps = {
	isOpen: boolean
	onSubmit: ({ title, description, category }: NewNote) => void
	onClose: () => void
	note?: Partial<Note> | null
}

const defaultNewNote = {
	title: '',
	description: '',
	category: 'placeholder'
}

export default function AddNoteDialog({
	isOpen,
	onSubmit,
	onClose,
	note = null
}: AddNoteDialogProps): ReactElement {
	const isQueryActive = useMediaQuery('(min-width: 900px)')

	const [newNote, setNewNote] = useState(defaultNewNote)

	useEffect(() => {
		setNewNote(note ? (note as NewNote) : defaultNewNote)
	}, [note])

	const [errors, setErrors] = useState<{
		title?: string
		description?: string
		category?: string
	} | null>(null)

	const validateErrors = () => {
		if (newNote.title === '') {
			setErrors({ title: 'Title is required.' })
			return false
		}

		if (newNote.category === 'placeholder') {
			setErrors({ category: 'Category is required.' })
			return false
		}

		if (newNote.description === '') {
			setErrors({ description: 'Description is required.' })
			return false
		}

		return true
	}

	const handleConfirm = () => {
		if (validateErrors()) {
			onSubmit(newNote as NewNote)
			setNewNote(defaultNewNote)
		}
	}

	return (
		<Dialog
			handler={onClose}
			open={isOpen}
			style={{ minWidth: isQueryActive ? '824px' : 'auto' }}
			dismiss={{
				enabled: false
			}}
		>
			<DialogHeader className='border-b-2 border-gray-100 px-9 font-normal text-blackText'>
				{`${note ? 'Edit' : 'Add'} note`}
			</DialogHeader>
			<form>
				<DialogBody className='flex flex-col px-9 pb-0 pt-9'>
					<div className='flex w-full flex-col gap-3 lg:flex-row lg:gap-2'>
						<div>
							<Input
								placeholder='Add title...'
								variant='outlined'
								labelProps={{
									className: 'before:content-none after:content-none'
								}}
								className='rounded-sm border-none !bg-bgGray text-gray-800  lg:w-[475px]'
								value={newNote.title}
								onChange={e => {
									setNewNote(prev => ({ ...prev, title: e.target.value }))
								}}
							/>
							{errors?.title ? (
								<p className='text-red-500'>{errors.title}</p>
							) : null}
						</div>
						<div className='lg:min-w-[247px]'>
							<Select
								className='rounded-sm border-none bg-bgGray  text-gray-800 '
								labelProps={{
									className: 'before:content-none after:content-none'
								}}
								value={newNote.category}
								onChange={(value: string | undefined) => {
									setNewNote(prev => ({
										...(prev as NewNote),
										category: value ?? Category.Home
									}))
								}}
							>
								<Option value='placeholder' disabled>
									Select Category
								</Option>
								<Option value={Category.Home}>Home</Option>
								<Option value={Category.Work}>Work</Option>
								<Option value={Category.Personal}>Personal</Option>
							</Select>

							{errors?.category ? (
								<p className='text-red-500'>{errors.category}</p>
							) : null}
						</div>
					</div>
					<Textarea
						className='mt-3 min-h-[227px] rounded-sm border-none !bg-bgGray text-gray-800 lg:mt-7  lg:w-[475px]'
						placeholder='Add description...'
						value={newNote.description}
						variant='outlined'
						labelProps={{
							className: 'before:content-none after:content-none'
						}}
						onChange={e => {
							setNewNote(prev => ({ ...prev, description: e.target.value }))
						}}
					/>
					{errors?.description ? (
						<p className='text-red-500'>{errors.description}</p>
					) : null}
				</DialogBody>
				<DialogFooter className='px-9 py-6'>
					<Button onClick={onClose} className='text-blue' variant='text'>
						Cancel
					</Button>
					<Button onClick={handleConfirm} className='text-blue' variant='text'>
						{`${note ? 'Update' : 'Add'}`}
					</Button>
				</DialogFooter>
			</form>
		</Dialog>
	)
}
