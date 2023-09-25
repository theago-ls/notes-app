import { render, screen } from '@testing-library/react'
import CompletedProgressBar from './CompletedProgressBar'

describe('CompletedProgressBar', () => {
	it('should render with "You have 0/0 notes completed"', () => {
		render(<CompletedProgressBar completedNotes={0} totalNotes={0} />)

		expect(screen.getByText('You have 0/0 notes completed')).toBeInTheDocument()
	})

	it('should render with "You have 1/2 notes completed"', () => {
		render(<CompletedProgressBar completedNotes={1} totalNotes={2} />)

		expect(screen.getByText('You have 1/2 notes completed')).toBeInTheDocument()
	})
})
