import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import * as bcrypt from 'bcrypt';
import { createToken } from '$lib/server/jwt.js';

const LoginFormData = zfd.formData({
	email: zfd.text(),
	password: zfd.text()
});

export const actions = {
	async default({ request, locals, cookies }) {
		const loginParseResult = LoginFormData.safeParse(await request.formData());

		if (!loginParseResult.success) {
			return fail(400, {
				success: false,
				error: loginParseResult.error.format()
			});
		}

		const userRepository = locals.dataSource.getRepository('User');

		const user = await userRepository.findOne({
			where: {
				email: loginParseResult.data.email
			}
		});

		if (!user || !bcrypt.compareSync(loginParseResult.data.password, user.password)) {
			return fail(401, {
				success: false,
				error: 'Unknown email and password combination.'
			});
		}

		const token = await createToken({
			id: user.id,
			email: user.email,
			username: user.username
		});

		cookies.set('token', token, {
			httpOnly: true,
			secure: true,
			path: '/'
		});

		redirect(302, '/app');
	}
};
