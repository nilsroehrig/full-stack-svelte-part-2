<script lang="ts">
	import { Calendar } from 'lucide-svelte';
</script>

<div class="wrapper">
	<header>
		<nav class="container">
			<ul>
				<li class="brand"><Calendar /> <strong>Svelte EventDB</strong></li>
			</ul>
		</nav>
	</header>

	<main class="container">
		<slot />
	</main>

	<footer class="container">
		<p>&copy; 2024 Svelte EventDB</p>
	</footer>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
	}

	header {
		border-bottom: solid thin var(--pico-muted-border-color);
	}

	nav ul {
		display: flex;
		justify-content: center;
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
	}

	footer {
		padding-top: var(--pico-spacing);
		padding-bottom: var(--pico-spacing);
		text-align: center;
		border-top: solid thin var(--pico-muted-border-color);
	}

	footer p {
		margin: 0;
	}
</style>
