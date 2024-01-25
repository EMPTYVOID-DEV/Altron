<script>
	import { getContext } from 'svelte';
	import MenuIcon from '../icons/menuIcon.svelte';
	const menu = getContext('dropDown');
	let dialog = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	class="openMenu"
	on:click|stopPropagation={() => {
		dialog.showModal();
	}}
>
	<MenuIcon />
</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click|stopPropagation>
	<svelte:component this={menu} close={() => dialog.close()} on:blockMoved on:blockDeleted />
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
