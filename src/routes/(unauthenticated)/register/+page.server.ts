import { User } from '$lib/server/entities/User';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import * as bcrypt from 'bcrypt';

const RegistrationFormData = zfd.formData(
	z.object({
		email: z.string().email(),
		username: z.string(),
		password: z.string(),
		password_confirmation: z.string()
	})
);

export const actions = {
	async default({ request, locals }) {
		const formData = RegistrationFormData.safeParse(await request.formData());

		if (!formData.success) {
			console.error(formData.error.format);
			return fail(400, { success: false, error: 'Invalid input data.' });
		}

		if (formData.data.password !== formData.data.password_confirmation) {
			return fail(400, { success: false, error: 'Passwords do not match.' });
		}

		const userRepository = locals.dataSource.getRepository(User);
		const user = new User();
		user.email = formData.data.email;
		user.password = bcrypt.hashSync(formData.data.password, 10);
		user.username = formData.data.username;
		await userRepository.save(user);

		return {
			success: true
		};
	}
};
