import { User } from '$lib/server/entities/User.js';

export async function load({ locals }) {
	const userRepository = locals.dataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: locals.currentUser.id },
		relations: ['owned_events']
	});

	return {
		events:
			user?.owned_events.map((event) => ({
				...event,
				date: event.date.toISOString()
			})) ?? []
	};
}
