// See https://kit.svelte.dev/docs/types#app

import type { JWTPayload } from '$lib/server/jwt';
import type { DataSource } from 'typeorm';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			dataSource: DataSource;
			currentUser: JWTPayload;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
