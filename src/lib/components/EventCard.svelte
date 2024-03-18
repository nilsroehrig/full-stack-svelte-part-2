<script lang="ts">
	import type { Event } from '$lib/server/entities/Event';
	import { DateTime } from 'luxon';

	export let event: Omit<Event, 'date'> & { date: string };

	$: dateAsDateTime = DateTime.fromISO(String(event.date));
</script>

<a href="/app/events/{event.id}">
	<article>
		<img src="https://picsum.photos/seed/{event.name}/300/200" alt="" />
		<h5>{event.name}</h5>
		<p>{dateAsDateTime.toLocaleString(DateTime.DATE_FULL, { locale: 'en-UK' })}</p>
	</article>
</a>

<style>
	article {
		display: grid;
		grid-template-columns: 3fr 7fr;
		grid-template-rows: auto auto;
		padding: 0;
		column-gap: var(--pico-spacing);
	}

	article img {
		width: 100%;
		height: 100%;
		grid-row: 1 / -1;
		object-fit: cover;
		border-top-left-radius: var(--pico-border-radius);
		border-bottom-left-radius: var(--pico-border-radius);
	}

	article h5,
	article p {
		margin: 0;
		padding-right: var(--pico-spacing);
	}

	article h5 {
		padding-top: var(--pico-spacing);
	}

	article p {
		padding-bottom: var(--pico-spacing);
	}

	a,
	a p {
		text-decoration: none;
		color: inherit;
	}
</style>
