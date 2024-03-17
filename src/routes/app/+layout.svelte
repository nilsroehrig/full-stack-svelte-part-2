<script lang="ts">
	import { Calendar, LogOut } from 'lucide-svelte';
</script>

<div class="wrapper">
	<header>
		<nav class="container">
			<ul>
				<li class="brand"><Calendar /> <strong>Svelte EventDB</strong></li>
				<li><button class="unstyled"><LogOut size="18" /></button></li>
			</ul>
		</nav>
	</header>

	<main class="container">
		<slot />
	</main>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr;
	}

	header {
		border-bottom: solid thin var(--pico-muted-border-color);
	}

	nav ul {
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
	}

	.unstyled {
		padding: calc(var(--pico-spacing) / 2);
		border: none;
		background-color: transparent;
	}
</style>
