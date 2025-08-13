export type Qout = {
	qout?: string,
	writer?: string
	created?: number
}

export type Event = {
	id: number,
	name: string,
	description: string,
	location: string,
	kind: string,
	max_people: number,
	nbr_subscribers: number,
	begin_at: string,
	end_at: string,
	campus_ids: number[],
	cursus_ids: number[],
	created_at: string,
	updated_at: string,
	prohibition_of_cancellation: number,
	waitlist: {
		created_at: string,
		id: number,
		updated_at: string,
		waitlistable_id: number,
		waitlistable_type: string
	},
	themes: {
		id: number,
		name: string,
		created_at: string,
		updated_at: string
	}[]
}
