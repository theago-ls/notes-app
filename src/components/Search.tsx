import { Input } from '@material-tailwind/react'
import { useState, type ReactElement } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search({
	placeholder,
	onChange
}: {
	placeholder: string
	onChange: (value: string) => void
}): ReactElement {
	const [value, setValue] = useState('')

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value)
		onChange(e.target.value)
	}

	return (
		<section className='relative flex w-full max-w-[824px]'>
			<FaSearch color='gray' className='absolute z-10 ml-3 mt-3' size='15px' />
			<Input
				className='rounded-sm border-none bg-white pl-9 text-gray-800 shadow-lg'
				type='text'
				placeholder={placeholder}
				variant='outlined'
				labelProps={{
					className: 'before:content-none after:content-none'
				}}
				value={value}
				onChange={onChangeHandler}
			/>
		</section>
	)
}
