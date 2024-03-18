import { Event } from '$lib/server/entities/Event';
import { User } from '$lib/server/entities/User';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const NewEventFormData = zfd.formData({
	name: z.string(),
	date: z.coerce.date(),
	location: z.string(),
	description: z.string().optional()
});

export const actions = {
	async default({ request, locals }) {
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

		const event = new Event();
		event.name = formData.data.name;
		event.date = formData.data.date;
		event.location = formData.data.location;
		if (formData.data.description) {
			event.description = formData.data.description;
		}
		event.owner = user;
		await eventRepository.save(event);

		redirect(302, '/app');
	}
};
