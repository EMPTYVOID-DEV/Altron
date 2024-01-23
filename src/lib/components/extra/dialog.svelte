<script lang="ts">
	import { getContext, type ComponentType, type SvelteComponent } from 'svelte';
	import MenuIcon from '../icons/menuIcon.svelte';
	const menu = getContext('dropDown') as ComponentType<
		SvelteComponent<{
			close: () => void;
		}>
	>;
	let dialog: HTMLDialogElement = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	class="openMenu"
	on:click|stopPropagation={() => {
		dialog.show();
	}}
>
	<MenuIcon />
</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click|stopPropagation>
	<svelte:component this={menu} close={() => dialog.close()} />
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
