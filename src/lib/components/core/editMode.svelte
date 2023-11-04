<script lang="ts">
	import { data, workingBlock } from '../../utils/stores';
	import { onMount } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	import ToolBar from './toolBar.svelte';
	import DropDown from '../../components/extra/dropDown.svelte';
	import UpIcon from '../icons/upIcon.svelte';
	import DeleteIcon from '../icons/deleteIcon.svelte';
	import DownIcon from '../icons/downIcon.svelte';

	function traverseParent(element: any): null | string {
		while (element) {
			let currentId = element?.dataset.blockid;
			if (typeof currentId == 'string') return currentId;
			element = element.parentElement;
		}
		return null;
	}

	function switchBlockState(event: MouseEvent) {
		const id = traverseParent(event.target);
		if (!id) workingBlock.set(null);
		else if ($workingBlock == null || $workingBlock.id !== id)
			workingBlock.set({ id, state: 'focused' });
		else workingBlock.set({ id, state: 'editing' });
	}

	function move(up: boolean) {
		data.update((prev) => {
			const index = prev.findIndex((val) => val.id == $workingBlock.id);
			const val = prev.splice(index, 1)[0];
			prev.splice(up ? index - 1 : index + 1, 0, val);
			return prev;
		});
	}

	function Delete() {
		data.update((prev) => {
			const newDataBlocks = prev.filter((element) => {
				return element.id != $workingBlock.id;
			});
			return newDataBlocks;
		});
	}

	// function actionOnBlock(event: KeyboardEvent) {
	// 	if (!$workingBlock || $workingBlock.state != 'focused') return;
	// 	if (event.key == 'Backspace') {
	// 		data.update((prev) => {
	// 			const newDataBlocks = prev.filter((element) => {
	// 				return element.id != $workingBlock.id;
	// 			});
	// 			return newDataBlocks;
	// 		});
	// 	} else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
	// 		data.update((prev) => {
	// 			const index = prev.findIndex((val) => val.id == $workingBlock.id);
	// 			const val = prev.splice(index, 1)[0];
	// 			prev.splice(event.key == 'ArrowUp' ? index - 1 : index + 1, 0, val);
	// 			return prev;
	// 		});
	// 	}
	// }

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		return () => {
			window.removeEventListener('click', switchBlockState);
		};
	});
</script>

{#each $data as block}
	<div class="block">
		<BlockWrapper dataBlock={block} />
		{#if $workingBlock?.id == block.id && $workingBlock.state == 'focused'}
			<div class="menu">
				<DropDown
					options={[
						{
							label: 'move the block up',
							icon: UpIcon,
							cb: () => {
								move(true);
							}
						},
						{
							icon: DownIcon,
							label: 'move the block down',
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
					]}
				/>
			</div>
		{/if}
	</div>
{/each}

<ToolBar />

<style>
	.block {
		display: flex;
		width: 100%;
		gap: 10px;
		align-items: center;
	}
	.block .menu {
		display: block;
	}
</style>
