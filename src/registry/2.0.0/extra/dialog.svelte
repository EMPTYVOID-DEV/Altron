<script>
	import { getContext } from 'svelte';
	const componentMap = getContext('componentMap');
	const MenuIcon = componentMap.get('menuIcon');
	const Menu = componentMap.get('menu');
	let dialog = null;
</script>

<span
	class="openMenu"
	on:click|stopPropagation={() => {
		dialog.showModal();
	}}
>
	<svelte:component this={MenuIcon} />
</span>
<dialog bind:this={dialog} on:click|stopPropagation>
	<svelte:component this={Menu} close={() => dialog.close()} on:blockMoved on:blockDeleted />
</dialog>

<style>
	dialog {
		border: none;
		outline: none;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		background-color: transparent;
	}

	dialog::backdrop {
		background: color-mix(in srgb, gray 54%, white 0%);
	}

	.openMenu {
		cursor: pointer;
	}

	.openMenu :global(svg) {
		width: 36px;
		height: 36px;
	}
</style>
