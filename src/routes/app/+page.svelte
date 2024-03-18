<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';

	export let data;
</script>

<h3>Events you're hosting</h3>
{#each data.events as event (event.id)}
	<EventCard {event} />
{:else}
	<p>No events found</p>
{/each}

<h3>Events you're participating in</h3>
{#each data.participatedEvents as event (event.id)}
	<EventCard {event} />
{:else}
	<p>No events found</p>
{/each}
