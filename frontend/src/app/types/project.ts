import { Task } from "./task"

export interface Project {
	id: number,
	title: string,
	description: string,
	meta: {
		tasks_count: number
	},
	tasks: Array<Task>
}
