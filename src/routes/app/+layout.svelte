<script lang="ts">
	import { Calendar, CalendarPlus, Home, LogOut } from 'lucide-svelte';
</script>

<div class="wrapper">
	<header>
		<nav class="container">
			<ul>
				<li class="brand"><Calendar /> <strong>Svelte EventDB</strong></li>
				<li>
					<form action="/app/logout" method="post">
						<button class="contrast outline borderless" title="Log out"><LogOut size="18" /></button
						>
					</form>
				</li>
			</ul>
		</nav>
	</header>

	<main class="container">
		<slot />
	</main>

	<div class="app-nav">
		<nav class="container">
			<ul>
				<li>
					<a role="button" class="contrast outline borderless" href="/app">
						<Home /> <br />
						<small>Home</small>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
	}

	header {
		border-bottom: solid thin var(--pico-muted-border-color);
	}

	header nav ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		width: 100%;
	}

	.brand {
		display: flex;
		gap: calc(var(--pico-spacing) / 2);
		align-items: center;
	}

	main {
		padding-top: var(--pico-spacing);
		padding-bottom: var(--pico-spacing);
		overflow: auto;
	}

	.borderless {
		border: none;
	}

	.app-nav {
		border-top: solid thin var(--pico-muted-border-color);
	}

	.app-nav ul {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: var(--pico-spacing);
	}

	.app-nav li {
		padding-bottom: 0;
	}
</style>
