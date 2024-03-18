<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	export let data;
</script>

<h3>All Events</h3>
{#each data.events as event (event.id)}
	<EventCard {event} />
{:else}
	<p>No events found</p>
{/each}
