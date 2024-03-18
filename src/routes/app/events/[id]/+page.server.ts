import { Event } from '$lib/server/entities/Event';
import { User } from '$lib/server/entities/User';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

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

const ParticipateLeaveFormData = zfd.formData(
	z.object({
		event_id: z.coerce.number()
	})
);

export const actions = {
	async participate({ request, locals }) {
		const formData = ParticipateLeaveFormData.parse(await request.formData());
		const userRepository = locals.dataSource.getRepository(User);
		const eventRepository = locals.dataSource.getRepository(Event);

		const user = await userRepository.findOne({ where: { id: locals.currentUser.id } });
		const event = await eventRepository.findOne({ where: { id: formData.event_id } });

		if (!user || !event) {
			console.error('event or user are not found');
			error(500);
		}

		event.participants = event.participants ?? [];
		event.participants.push(user);

		await eventRepository.save(event);
	},

	async leave({ request, locals }) {
		const formData = ParticipateLeaveFormData.parse(await request.formData());
		const userRepository = locals.dataSource.getRepository(User);
		const eventRepository = locals.dataSource.getRepository(Event);

		const user = await userRepository.findOne({ where: { id: locals.currentUser.id } });
		const event = await eventRepository.findOne({ where: { id: formData.event_id } });

		if (!user || !event) {
			console.error('event or user are not found');
			error(500);
		}

		event.participants = event.participants ?? [];
		event.participants = event.participants.filter((p) => p.id !== user.id);

		await eventRepository.save(event);
	}
};
