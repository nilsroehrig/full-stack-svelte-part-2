import { Event } from '$lib/server/entities/Event';

export async function load({ locals }) {
	const eventRepository = locals.dataSource.getRepository(Event);
	const events = await eventRepository.find({
		order: { date: 'ASC' }
	});

	return {
		events: events.map(mapDate)
	};
}

function mapDate(event: Event) {
	return { ...event, date: event.date.toISOString() };
}
