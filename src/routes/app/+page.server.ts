import { Event } from '$lib/server/entities/Event';
import { User } from '$lib/server/entities/User';

export async function load({ locals }) {
	const userRepository = locals.dataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: locals.currentUser.id },
		relations: ['owned_events', 'participated_events']
	});

	return {
		events: user?.owned_events.map(mapDate) ?? [],
		participatedEvents: user?.participated_events.map(mapDate) ?? []
	};
}

function mapDate(event: Event) {
	return { ...event, date: event.date.toISOString() };
}
