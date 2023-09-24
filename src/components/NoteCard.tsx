import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler
} from '@material-tailwind/react'
import { useState, type ReactElement } from 'react'
import {
	MdCheckBoxOutlineBlank,
	MdDelete,
	MdModeEditOutline,
	MdOutlineCheckBox
} from 'react-icons/md'
import type { Note } from 'types'
import { Category } from 'types'
import { useMediaQuery } from 'utils'

const getCardColor = (category: Category): string => {
	switch (category) {
		case Category.Work:
			return 'bg-darkBlue'
		case Category.Personal:
			return 'bg-green'
		case Category.Home:
		default:
			return 'bg-orange'
	}
}

export default function NoteCard({
	note,
	actions
}: {
	note: Note
	actions: {
		editNote: (note: Note) => void
		removeNote: (id: string) => void
		completeNote: (note: Note) => void
	}
}): ReactElement {
	const isSmallerScreen = useMediaQuery('(max-width: 900px)')
	const [openPopover, setOpenPopover] = useState(false)

	const dateFormatted = new Date(note.createdAt).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})

	return (
		<div
			className={`${
				note.done ? 'bg-darkGray' : getCardColor(note.category)
			} h-[174px] w-[404px] rounded-md p-4 text-white`}
		>
			<section className='mb-2 flex items-center justify-between'>
				<div className='flex items-center gap-5'>
					<Button
						name='done'
						aria-label='Done'
						onClick={() => {
							actions.completeNote({ ...note, done: !note.done })
						}}
						className='bg-transparent p-0 shadow-none'
					>
						{note.done ? (
							<MdOutlineCheckBox size={22} />
						) : (
							<MdCheckBoxOutlineBlank size={22} />
						)}
					</Button>
					<strong className='text-left text-xl'>
						{note.done ? <s>{note.title}</s> : note.title}
					</strong>{' '}
				</div>
				<div className='flex gap-4'>
					<Button
						name='edit'
						aria-label='Edit'
						onClick={() => {
							actions.editNote(note)
						}}
						className='bg-transparent p-0 shadow-none'
					>
						<MdModeEditOutline size={22} />
					</Button>
					<Popover
						open={openPopover}
						handler={() => {
							setOpenPopover(!openPopover)
						}}
						dismiss={{ enabled: false }}
						placement={isSmallerScreen ? 'left' : 'top'}
					>
						<PopoverHandler>
							<Button
								name='delete'
								aria-label='Delete'
								className='bg-transparent p-0 shadow-none'
							>
								<MdDelete size={22} />
							</Button>
						</PopoverHandler>
						<PopoverContent className='flex h-32 w-80 flex-col justify-between rounded-none p-4 shadow-lg'>
							<p className='text-base text-blackText'>Delete note?</p>
							<div className='flex justify-end gap-2'>
								<Button
									variant='text'
									className='p-2 text-blue hover:shadow-none'
									onClick={() => {
										setOpenPopover(false)
									}}
								>
									CANCEL
								</Button>
								<Button
									name='confirm-delete'
									aria-label='Confirm delete'
									variant='text'
									className='p-2  text-blue hover:shadow-none'
									onClick={() => {
										actions.removeNote(note.id)
									}}
								>
									DELETE
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</section>
			<section className='mb-3  h-[76px]'>
				<p className='line-clamp-4 text-sm'>
					{note.done ? <s>{note.description}</s> : note.description}
				</p>
			</section>
			<section>
				<p className='text-sm'>
					{note.done ? <s>{dateFormatted}</s> : dateFormatted}
				</p>
			</section>
		</div>
	)
}
