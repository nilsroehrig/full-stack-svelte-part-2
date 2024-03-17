// See https://kit.svelte.dev/docs/types#app

import type { DataSource } from 'typeorm';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			dataSource: DataSource;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
