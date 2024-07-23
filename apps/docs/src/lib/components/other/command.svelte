<script lang="ts">
	import CopyIcon from '../altron/icons/copyIcon.svelte';
	import DoneIcon from '../altron/icons/doneIcon.svelte';
	export let command: string;
	let copyStatement = false;
	function copyCode() {
		navigator.clipboard.writeText(command);
		copyStatement = true;
		new Promise((res) => setTimeout(res, 800)).then(() => (copyStatement = false));
	}
</script>

<div class="command">
	<span>{command}</span>
	{#if !copyStatement}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={copyCode} class="control">
			<CopyIcon />
		</span>
	{:else}
		<span class="control">
			<DoneIcon />
		</span>
	{/if}
</div>

<style>
	.command {
		padding-inline: 20px;
		padding-block: 10px;
		display: flex;
		align-items: center;
		gap: 20px;
		border-radius: 6px;
		background-color: transparent;
		cursor: pointer;
		transition: all 600ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	.command :global(svg path) {
		fill: var(--svelte) !important;
	}
	.control {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.command span:first-child {
		color: color-mix(in srgb, white 65%, transparent 0%);
		transition: inherit;
	}
	.command:hover {
		box-shadow: 4px 4px 4px var(--svelte);
		border: 1px solid var(--svelte);
	}
	.command:hover span:first-child {
		color: white;
	}
</style>
