<script>
	import NavBar from '$lib/components/other/navBar.svelte';
	import Command from '$lib/components/other/command.svelte';
</script>

<div class="home">
	<NavBar />
	<div class="body">
		<h1>the block editor for svelte</h1>
		<p>
			Altron is a powerful block-based editor tailored for Svelte applications, offering effortless
			creation, editing, and management of structured content. Empower your workflow with Altron's
			robust features.
		</p>
		<div class="actions">
			<button><a href="/test">Try altron</a></button>
			<button><a href="/docs/Altron/Introduction">Documentation</a></button>
		</div>
		<Command command="pnpm install @altron/altron@latest" />
	</div>
</div>

<style>
	.home {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 20px;
		align-items: center;
		gap: 20%;
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 30px;
	}
	.body h1 {
		font-size: var(--huge);
		text-transform: capitalize;
		text-align: center;
		color: var(--svelte);
	}
	.body p {
		width: 70%;
		text-align: center;
		color: color-mix(in srgb, white 80%, transparent 0%);
	}

	.actions {
		display: flex;
		gap: 50px;
	}
	.actions button {
		padding-inline: 25px;
		padding-block: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		cursor: pointer;
		border: none;
		outline: none;
	}
	.actions button a {
		font-size: var(--h4);
		color: white;
		font-weight: bold;
		text-transform: capitalize;
	}
	.actions button:first-of-type {
		background-color: transparent;
		border: 1px solid var(--primary800);
		box-shadow: 4px 4px 4px var(--primary800);
	}
	.actions button:last-child {
		background-color: transparent;
		border: 1px solid white;
		box-shadow: 4px 4px 4px white;
	}
	@media screen and (width < 768px) {
		.body h1 {
			font-size: var(--h1);
		}
		.body p {
			width: 90%;
		}
	}
</style>
