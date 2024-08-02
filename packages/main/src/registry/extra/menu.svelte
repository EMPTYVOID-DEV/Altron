<script>
	import { getContext } from 'svelte';
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const upDownIcon = componentMap.get('upDownIcon');
	const deleteIcon = componentMap.get('deleteIcon');
</script>

<div class="menu">
	<button on:pointerdown on:pointerup>
		<svelte:component this={upDownIcon} />
	</button>
	<button on:click>
		<svelte:component this={deleteIcon} />
	</button>
</div>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
	.menu button {
		all: unset;
		cursor: pointer;
		touch-action: none;
	}
</style>
