<script lang="ts">
	import { Hotel, MapPin, PenBox, User } from 'lucide-svelte';
	import { DateTime } from 'luxon';

	export let data;

	$: dateAsDateTime = DateTime.fromISO(String(data.event.date));
</script>

<img width="900" height="600" src="https://picsum.photos/seed/{data.event.name}/900/600" alt="" />
<h4>
	{data.event.name}
	<small>{dateAsDateTime.toLocaleString(DateTime.DATE_FULL, { locale: 'en-Uk' })}</small>
</h4>

<article><MapPin /> {data.event.location}</article>

<article>
	<Hotel />
	Hosted by
	{#if data.isOwner}
		You
	{:else}
		{data.event.owner}
	{/if}
</article>

{#if data.event.description}
	<article>
		<h5>Description</h5>
		<p>{data.event.description}</p>
	</article>
{/if}

<article>
	<p>
		<User />
		{data.event.participants || 'No'} participants so far.
	</p>
</article>

<form class="actions" method="post">
	{#if data.isParticipant}
		<button type="submit" formaction="?/leave">Leave</button>
	{:else}
		<button type="submit" formaction="?/participate">Participate</button>
	{/if}
	{#if data.isOwner}
		<a role="button" class="secondary" href="/app/events/{data.event.id}/edit"
			><PenBox size="18" /> Edit</a
		>
	{/if}
</form>

<style>
	img {
		width: calc(100% + (var(--pico-spacing) * 2));
		max-width: unset;
		margin-left: calc(var(--pico-spacing) * -1);
		margin-top: calc(var(--pico-spacing) * -1);
	}

	h4 {
		margin-top: var(--pico-spacing);
	}

	h4 small {
		font-size: 0.75em;
		font-weight: normal;
	}

	article p:last-child {
		margin-bottom: 0;
	}

	.actions {
		width: 100%;
		display: flex;
		gap: var(--pico-spacing);
	}

	.actions a,
	.actions button {
		flex: 1;
		margin: 0;
	}

	.actions a {
		order: 1;
	}

	.actions button {
		order: 2;
	}
</style>
