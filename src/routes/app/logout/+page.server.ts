import { redirect } from '@sveltejs/kit';

export const actions = {
	async default({ cookies }) {
		cookies.delete('token', { path: '/' });
		redirect(302, '/');
	}
};
