import { Event } from '$lib/server/entities/Event';
import { User } from '$lib/server/entities/User';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export async function load({ params, locals }) {
	const eventRepository = locals.dataSource.getRepository(Event);
	const event = await eventRepository.findOne({
		where: { id: Number(params.id) },
		relations: ['owner']
	});

	if (!event) {
		error(404);
	}

	if (locals.currentUser.id !== event.owner.id) {
		error(403);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { owner, date, ...rest } = event;

	return {
		event: {
			...rest,
			date: date.toISOString().split('T')[0]
		}
	};
}

const NewEventFormData = zfd.formData({
	name: z.string(),
	date: z.coerce.date(),
	location: z.string(),
	description: z.string().optional()
});

export const actions = {
	async default({ request, locals, params }) {
		const formData = NewEventFormData.safeParse(await request.formData());

		if (!formData.success) {
			console.error(formData.error.format);
			return fail(400, {
				success: false,
				error: 'Invalid input data'
			});
		}

		const userRepository = locals.dataSource.getRepository(User);
		const eventRepository = locals.dataSource.getRepository(Event);

		const user = await userRepository.findOne({ where: { id: locals.currentUser.id } });

		if (!user) {
			console.error(`User with id ${locals.currentUser.id} not found`);
			error(500);
		}

		const event = await eventRepository.findOne({ where: { id: Number(params.id) } });

		if (!event) {
			console.error('event could not be found');
			error(500);
		}

		event.name = formData.data.name;
		event.date = formData.data.date;
		event.location = formData.data.location;
		if (formData.data.description) {
			event.description = formData.data.description;
		}
		event.owner = user;
		await eventRepository.save(event);

		redirect(302, `/app/events/${event.id}/`);
	}
};
