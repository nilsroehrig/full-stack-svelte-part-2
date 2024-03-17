<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<div>
	<form method="post" use:enhance>
		<h1>Sign In</h1>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<label for="email">E-mail</label>
		<input type="email" id="email" name="email" placeholder="E-mail address..." required />

		<label for="password">Password</label>
		<input type="password" id="password" name="password" placeholder="Password..." required />

		<button type="submit">Sign in</button>
	</form>
</div>

<style>
	div {
		height: 100%;
		display: grid;
		align-items: center;
	}

	.error {
		color: var(--pico-color-red-500);
	}
</style>
