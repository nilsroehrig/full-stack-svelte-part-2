import { Event } from '$lib/server/entities/Event';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const eventRepository = locals.dataSource.getRepository(Event);
	const event = await eventRepository.findOne({
		where: { id: Number(params.id) },
		relations: ['owner', 'participants']
	});

	if (!event) {
		error(404);
	}

	const { owner, date, participants, ...rest } = event;

	return {
		event: {
			...rest,
			participants: participants.length,
			date: date.toISOString(),
			owner: owner.username
		},
		isOwner: locals.currentUser?.id === owner.id,
		isParticipant: participants.some((p) => p.id === locals.currentUser?.id)
	};
}
