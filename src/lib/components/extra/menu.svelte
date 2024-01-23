<script lang="ts">
	import {
		createEventDispatcher,
		type ComponentType,
		type SvelteComponent,
		getContext
	} from 'svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import MenuIcon from '../icons/menuIcon.svelte';
	import type { dataBlock, eventTypes } from '../../utils/types';
	import UpIcon from '../icons/upIcon.svelte';
	import DeleteIcon from '../icons/deleteIcon.svelte';
	import DownIcon from '../icons/downIcon.svelte';
	const eventDispatcher = createEventDispatcher<eventTypes>();
	export let close: () => void;
	const setData = getContext('setData') as (
		newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])
	) => void;
	const workingBlock = (
		getContext('getWorkingBlock') as () => {
			state: 'focused' | 'editing';
			id: string;
		}
	)();
	let options: { icon: ComponentType<SvelteComponent>; label: string; cb: () => void }[] = [
		{
			label: 'Move up',
			icon: UpIcon,
			cb: () => {
				move(true);
			}
		},
		{
			icon: DownIcon,
			label: 'Move down',
			cb: () => {
				move(false);
			}
		},
		{
			icon: DeleteIcon,
			label: 'Delete the block',
			cb: () => {
				Delete();
			}
		}
	];
	function move(up: boolean) {
		setData((prev) => {
			const index = prev.findIndex((val) => val.id == workingBlock.id);
			const val = prev.splice(index, 1)[0];
			prev.splice(up ? index - 1 : index + 1, 0, val);
			return prev;
		});
		eventDispatcher('blockMoved', {
			id: workingBlock.id,
			up
		});
	}

	function Delete() {
		let deletedBlock: dataBlock = null;
		setData((prev) => {
			const newDataBlocks = prev.filter((element) => {
				if (element.id == workingBlock.id) {
					deletedBlock = { ...element };
				}
				return element.id != workingBlock.id;
			});
			return newDataBlocks;
		});

		eventDispatcher('blockDeleted', deletedBlock);
	}
</script>

<div class="dropDown">
	<div class="label">
		<MenuIcon />
		<span>Menu</span>
	</div>
	{#each options as option}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore missing-declaration -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="option"
			on:click={() => {
				option.cb();
				close();
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
		on:click={() => {
			close();
		}}
	>
		<CloseIcon />
		<span>Close menu</span>
	</div>
</div>

<style>
	.label {
		border-bottom: 1px solid var(--textColor);
	}
	.dropDown {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-inline: 8px;
		padding-block: 4px;
		min-width: 16rem;
		max-width: 24rem;
		background-color: var(--bgColor);
		border-radius: 6px;
		border: 2px solid var(--textColor);
	}
	.dropDown :is(.label, .option) {
		width: 100%;
		padding-left: 6px;
		padding-block: 8px;
		display: flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
	}
	.dropDown span {
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
