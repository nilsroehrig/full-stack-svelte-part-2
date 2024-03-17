import { initialized } from '$lib/server/db/dataSource';
import { verifyToken } from '$lib/server/jwt';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authenticate: Handle = async ({ event, resolve }) => {
	const { url, cookies, locals } = event;

	if (url.pathname.startsWith('/app')) {
		const token = cookies.get('token');

		try {
			locals.currentUser = await verifyToken(token ?? '');
		} catch (e) {
			cookies.delete('token', { path: '/' });
			redirect(302, '/');
		}
	}

	return resolve(event);
};

const dataSource: Handle = async ({ event, resolve }) => {
	const dataSource = await initialized;
	event.locals.dataSource = dataSource;
	return resolve(event);
};

export const handle = sequence(authenticate, dataSource);
