<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<form method="post" use:enhance>
	<h3>Add new Event</h3>
	<label for="name">Name</label>
	<input
		type="text"
		id="name"
		name="name"
		placeholder="Event name..."
		required
		value={data.event.name}
	/>
	<label for="date">Date</label>
	<input type="date" id="date" name="date" required value={data.event.date} />
	<label for="location">Location</label>
	<input
		type="text"
		id="location"
		name="location"
		placeholder="Event location..."
		required
		value={data.event.location}
	/>
	<label for="description">Description</label>
	<textarea
		id="description"
		name="description"
		placeholder="Event description..."
		value={data.event.description}
	></textarea>

	<button type="submit">Save Event</button>
</form>
