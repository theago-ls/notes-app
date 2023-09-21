export enum Category {
	Home = 1,
	Personal,
	Work
}

export interface Note {
	id: string
	title: string
	description: string
	category: Category
	createdAt: Date
	updatedAt?: Date
	done: boolean
}
