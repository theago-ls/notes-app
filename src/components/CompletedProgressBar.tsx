import { Progress } from '@material-tailwind/react'
import type { ReactElement } from 'react'

type CompletedProgressBarProps = {
	completedNotes: number
	totalNotes: number
}

export default function CompletedProgressBar({
	completedNotes,
	totalNotes
}: CompletedProgressBarProps): ReactElement {
	return (
		<section className='mt-8 w-full max-w-[824px]'>
			<p className='text-lg'>{`You have ${completedNotes}/${totalNotes} notes completed`}</p>
			<Progress
				value={(completedNotes / totalNotes) * 100}
				className='mt-3 h-1 rounded-none bg-light-blue-100'
				color='light-blue'
			/>
		</section>
	)
}
