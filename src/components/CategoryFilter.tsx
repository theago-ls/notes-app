import type { ReactElement } from 'react'

import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { FaCircle } from 'react-icons/fa'

const tabClasses = 'flex h-9 w-24 flex-col items-center justify-center'
const unselectedClass =
	'text-blackText h-12 border-none bg-transparent capitalize shadow-none transition-none  hover:bg-none hover:shadow-none'

export default function CategoryFilter({
	onChange
}: {
	onChange: (value: string) => void
}): ReactElement {
	const [activeTab, setActiveTab] = useState('all')

	const onClickHandler = (value: string) => {
		setActiveTab(value)
		onChange(value)
	}

	return (
		<div className='flex h-9 items-center justify-between'>
			<Button
				className={`${tabClasses} ${
					activeTab === 'all' ? 'bg-lightBlue capitalize' : unselectedClass
				}`}
				onClick={() => {
					onClickHandler('all')
				}}
				role='tab'
				aria-selected={activeTab === 'all'}
			>
				All <FaCircle size='6px' color='#69BCFF' />
			</Button>
			<Button
				className={`${tabClasses}  ${
					activeTab === 'home' ? 'bg-orange capitalize' : unselectedClass
				}`}
				onClick={() => {
					onClickHandler('home')
				}}
				role='tab'
				aria-selected={activeTab === 'home'}
			>
				Home <FaCircle className='m-auto' size={6} color='#FF9100' />
			</Button>
			<Button
				className={`${tabClasses} ${
					activeTab === 'work' ? 'bg-darkBlue capitalize' : unselectedClass
				}`}
				onClick={() => {
					onClickHandler('work')
				}}
				role='tab'
				aria-selected={activeTab === 'work'}
			>
				Work <FaCircle className='m-auto' size={6} color='#5C6BC0' />
			</Button>
			<Button
				className={`${tabClasses} ${
					activeTab === 'personal' ? 'bg-green capitalize' : unselectedClass
				}`}
				onClick={() => {
					onClickHandler('personal')
				}}
				role='tab'
				aria-selected={activeTab === 'personal'}
			>
				Personal <FaCircle className='m-auto' size={6} color='#66BB6A' />
			</Button>
		</div>
	)
}
