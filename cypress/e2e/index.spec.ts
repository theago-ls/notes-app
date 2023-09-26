describe('Notes App', () => {
	it('should be able to cancel adding a new note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByRole('button', { name: /Cancel/i }).click()

		cy.findByText("You don't have any notes yet").should('exist')
	})

	it('should show error message if any required field is not filled', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()

		cy.findByRole('button', { name: /Add/i }).click()
		cy.findByText('Title is required.').should('exist')
		cy.findByPlaceholderText('Add title...').type('Test title')

		cy.findByRole('button', { name: /Add/i }).click()
		cy.findByText('Category is required.').should('exist')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()

		cy.findByRole('button', { name: /Add/i }).click()
		cy.findByText('Description is required.').should('exist')
		cy.findByPlaceholderText('Add description...').type('Test description')

		cy.findByRole('button', { name: /Add/i }).click()
		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')
	})

	it('should be able to add a new note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title')
		cy.findByPlaceholderText('Add description...').type('Test description')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')
	})

	it('should be able to edit a note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title')
		cy.findByPlaceholderText('Add description...').type('Test description')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')

		cy.findByRole('button', { name: /Edit/i }).click()

		cy.findByDisplayValue('Test title').type(' 2')
		cy.findByDisplayValue('Test description').type(' 2')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Work/ }).click()
		cy.findByRole('button', { name: /Update/i }).click()

		cy.findByText('Test title 2').should('exist')
		cy.findByText('Test description 2').should('exist')
	})

	it('should be able to cancel editing a note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title')
		cy.findByPlaceholderText('Add description...').type('Test description')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')

		cy.findByRole('button', { name: /Edit/i }).click()
		cy.findByRole('button', { name: /Cancel/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')
	})

	it('should be able to delete a note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title')
		cy.findByPlaceholderText('Add description...').type('Test description')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')

		cy.findByRole('button', { name: /Delete/i }).click()
		cy.findByText('Delete note?').should('exist')
		cy.findByRole('button', { name: /Confirm delete/i }).click()

		cy.findByText('Test title').should('not.exist')
		cy.findByText('Test description').should('not.exist')
		cy.findByText("You don't have any notes yet").should('exist')
	})

	it('should be able to cancel the deletion of a note', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title')
		cy.findByPlaceholderText('Add description...').type('Test description')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')

		cy.findByRole('button', { name: /Delete/i }).click()
		cy.findByText('Delete note?').should('exist')
		cy.findByRole('button', { name: /Cancel/i }).click()

		cy.findByText('Test title').should('exist')
		cy.findByText('Test description').should('exist')
		cy.findByText("You don't have any notes yet").should('not.exist')
	})

	it('should be able to filter by category', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title home')
		cy.findByPlaceholderText('Add description...').type('Test description home')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title work')
		cy.findByPlaceholderText('Add description...').type('Test description work')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Work/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title home').should('exist')
		cy.findByText('Test description home').should('exist')
		cy.findByText('Test title work').should('exist')
		cy.findByText('Test description work').should('exist')

		cy.findByRole('tab', { name: /Home/ }).click()
		cy.findByText('Test title home').should('exist')
		cy.findByText('Test title work').should('not.exist')

		cy.findByRole('tab', { name: /Work/ }).click()
		cy.findByText('Test title home').should('not.exist')
		cy.findByText('Test title work').should('exist')

		cy.findByRole('tab', { name: /Personal/ }).click()
		cy.findByText('Test title home').should('not.exist')
		cy.findByText('Test title work').should('not.exist')
		cy.findByText("Couldn't find any notes").should('exist')

		cy.findByRole('tab', { name: /All/ }).click()
		cy.findByText('Test title home').should('exist')
		cy.findByText('Test title work').should('exist')
		cy.findByText("Couldn't find any notes").should('not.exist')
	})

	it('should be able to search note by text', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title home')
		cy.findByPlaceholderText('Add description...').type('Test description home')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title work')
		cy.findByPlaceholderText('Add description...').type('Test description work')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Work/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title home').should('exist')
		cy.findByText('Test description home').should('exist')
		cy.findByText('Test title work').should('exist')
		cy.findByText('Test description work').should('exist')

		cy.findByPlaceholderText(/Search notes.../).type('home')
		cy.findByText('Test title home').should('exist')
		cy.findByText('Test title work').should('not.exist')

		cy.findByPlaceholderText(/Search notes.../)
			.clear()
			.type('work')
		cy.findByText('Test title home').should('not.exist')
		cy.findByText('Test title work').should('exist')

		cy.findByPlaceholderText(/Search notes.../)
			.clear()
			.type('Test')
		cy.findByText('Test title home').should('exist')
		cy.findByText('Test title work').should('exist')

		cy.findByPlaceholderText(/Search notes.../)
			.clear()
			.type('Yahoo')
		cy.findByText("Couldn't find any notes").should('exist')
	})

	it('should be able to mark the note as done', () => {
		cy.visit('/')

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title home')
		cy.findByPlaceholderText('Add description...').type('Test description home')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Home/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByRole('button', { name: /Add note/i }).click()
		cy.findByPlaceholderText('Add title...').type('Test title work')
		cy.findByPlaceholderText('Add description...').type('Test description work')
		cy.findByRole('combobox').click()
		cy.findByRole('option', { name: /Work/ }).click()
		cy.findByRole('button', { name: /Add/i }).click()

		cy.findByText('Test title home').should('exist')
		cy.findByText('Test description home').should('exist')
		cy.findByText('Test title work').should('exist')
		cy.findByText('Test description work').should('exist')

		cy.findByText('You have 0/2 notes completed').should('exist')

		cy.findByText('Test title home')
			.parent()
			.findByRole('button', { name: /Done/i })
			.click()

		cy.findByText('You have 1/2 notes completed').should('exist')

		cy.findByText('Test title work')
			.parent()
			.findByRole('button', { name: /Done/i })
			.click()

		cy.findByText('You have 2/2 notes completed').should('exist')

		cy.findByText('Test title home')
			.parent()
			.parent()
			.findByRole('button', { name: /Done/i })
			.click()

		cy.findByText('You have 1/2 notes completed').should('exist')

		cy.findByText('Test title work')
			.parent()
			.parent()
			.findByRole('button', { name: /Done/i })
			.click()

		cy.findByText('You have 0/2 notes completed').should('exist')
	})
})
