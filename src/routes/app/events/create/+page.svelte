<form method="post">
	<h3>Add new Event</h3>
	<label for="name">Name</label>
	<input type="text" id="name" name="name" placeholder="Event name..." required />
	<label for="date">Date</label>
	<input type="date" id="date" name="date" required />
	<label for="location">Location</label>
	<input type="text" id="location" name="location" placeholder="Event location..." required />
	<label for="description">Description</label>
	<textarea id="description" name="description" placeholder="Event description..."></textarea>

	<button type="submit">Add Event</button>
</form>
