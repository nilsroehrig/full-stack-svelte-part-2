import { initialized } from '$lib/server/db/dataSource';

export async function handle({ event, resolve }) {
	const dataSource = await initialized;
	event.locals.dataSource = dataSource;
	return resolve(event);
}
