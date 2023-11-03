<script lang="ts">
	import { data, workingBlock } from '$lib/utils/stores';
	import { onMount, onDestroy } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	import ToolBar from './toolBar.svelte';

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

	function actionOnBlock(event: KeyboardEvent) {
		if (!$workingBlock || $workingBlock.state != 'focused') return;
		if (event.key == 'Backspace') {
			data.update((prev) => {
				const newDataBlocks = prev.filter((element) => {
					return element.id != $workingBlock.id;
				});
				return newDataBlocks;
			});
		} else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
			data.update((prev) => {
				const index = prev.findIndex((val) => val.id == $workingBlock.id);
				const val = prev.splice(index, 1)[0];
				prev.splice(event.key == 'ArrowUp' ? index - 1 : index + 1, 0, val);
				return prev;
			});
		}
	}

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		window.addEventListener('keyup', actionOnBlock);
	});
	onDestroy(() => {
		window.removeEventListener('click', switchBlockState);
		window.removeEventListener('keyup', actionOnBlock);
	});
</script>

{#each $data as block}
	<BlockWrapper dataBlock={block} />
{/each}

<ToolBar />
