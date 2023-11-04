<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import MenuIcon from '../icons/menuIcon.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	export let options: { icon: ComponentType<SvelteComponent>; label: string; cb: () => void }[] =
		[];
	let dialog: HTMLDialogElement = null;
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
<dialog
	bind:this={dialog}
	on:click={(e) => {
		e.stopPropagation();
	}}
>
	<div class="dropDown">
		<div class="label">
			<MenuIcon />
			<span>Menu</span>
		</div>
		{#each options as option}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="option"
				on:click={() => {
					option.cb();
					dialog.close();
				}}
			>
				<svelte:component this={option.icon} />
				<span>{option.label}</span>
			</div>
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="option"
			on:click|stopPropagation={() => {
				dialog.close();
			}}
		>
			<CloseIcon />
			<span>Close menu</span>
		</div>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		outline: none;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		background-color: var(--bgColor);
		border-radius: 4px;
		border: 2px solid var(--textColor);
	}

	dialog::backdrop {
		background: color-mix(in srgb, gray 70%, white 0%);
	}
	.openMenu {
		cursor: pointer;
	}

	.openMenu :global(svg) {
		width: 36px;
		height: 36px;
	}
	.label {
		border-bottom: 1px solid var(--textColor);
	}
	.dropDown {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-inline: 8px;
		padding-block: 4px;
		min-width: 18rem;
		max-width: 25rem;
	}
	.dropDown div {
		width: 100%;
		padding-left: 3px;
		padding-block: 8px;
		display: flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
	}
	.dropDown span {
		text-transform: capitalize;
		color: var(--textColor);
		font-weight: 600;
	}
	.dropDown :global(svg) {
		width: 20px;
		height: 20px;
	}
	.dropDown .option :global(path) {
		fill: var(--primaryColor);
	}
	.dropDown .option:hover {
		background-color: color-mix(in srgb, var(--primaryColor) 38%, white 0%);
		border-radius: 4px;
	}
</style>
