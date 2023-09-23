export enum Category {
	Home = 'home',
	Personal = 'personal',
	Work = 'work'
}

export type Note = {
	id: string
	title: string
	description: string
	category: Category
	createdAt: Date
	updatedAt?: Date
	done: boolean
}
