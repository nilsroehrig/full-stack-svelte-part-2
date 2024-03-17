<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<form method="post" use:enhance>
	<h1>Sign Up</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.success}
		<p class="success">
			You've successfully signe up! <a href="/">Sign in</a> with your new account now!
		</p>
	{/if}

	<label for="email">E-mail</label>
	<input type="email" id="email" name="email" placeholder="E-mail address..." required />

	<label for="username">Username</label>
	<input type="text" id="username" name="username" placeholder="Username..." required />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" placeholder="Password..." required />

	<label for="password_confirmation">Confirm password</label>
	<input
		type="password"
		id="password"
		name="password_confirmation"
		placeholder="Confirm password..."
		required
	/>

	<button type="submit">Sign up</button>
	<p class="login-link"><small><a href="/">Sign in with existing account</a></small></p>
</form>

<style>
	.error {
		color: var(--pico-color-red-500);
	}

	.success {
		color: var(--pico-color-green-500);
	}

	.login-link {
		text-align: center;
	}
</style>
