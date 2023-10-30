<script lang="ts">
	import { data, workingBlock } from '$lib/utils/store.js';
	import { onDestroy, onMount } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	import ToolBar from './toolBar.svelte';
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let editingColor = '#1eeb36';
	export let textColor = '#121212';

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
		else if ($workingBlock == null || ($workingBlock.id !== id && $workingBlock.state == 'focused'))
			workingBlock.set({ id, state: 'focused' });
		else workingBlock.set({ id, state: 'editing' });
	}

	function removeBlock(event: KeyboardEvent) {
		if (event.key == 'Backspace' && $workingBlock && $workingBlock.state == 'focused') {
			data.update((prev) => {
				const newDataBlocks = prev.filter((element) => {
					return element.id != $workingBlock.id;
				});
				return newDataBlocks;
			});
		}
	}

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		window.addEventListener('keyup', removeBlock);
	});
	onDestroy(() => {
		window.removeEventListener('click', switchBlockState);
		window.removeEventListener('keyup', removeBlock);
	});
</script>

<div
	class="main"
	style:--primaryColor={primaryColor}
	style:--editingColor={editingColor}
	style:--fontColor={textColor}
	style:--headingFont={headerFont}
	style:--bodyFont={bodyFont}
	style:--h1="clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)"
	style:--h2="clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)"
	style:--h3="clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)"
	style:--h4="clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)"
	style:--body="clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)"
	style:--small="clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem)"
	style:--lh1="1.3"
	style:--lh2="1.35"
	style:--lh3="1.4"
	style:--lh4="1.5"
	style:--lbody="1.6"
>
	{#each $data as block (block.id)}
		<BlockWrapper dataBlock={block} />
	{/each}

	<ToolBar />
</div>

<style>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-bottom: 20px;
	}
	.main :global(*) {
		box-sizing: border-box;
	}
	.main :global(h1),
	.main :global(h2),
	.main :global(h3),
	.main :global(h4) {
		font-family: var(--headingFont);
		font-weight: bold;
	}
	.main :global(h1) {
		font-size: var(--h1);
		line-height: var(--lh1);
	}
	.main :global(h2) {
		font-size: var(--h2);
		line-height: var(--lh2);
	}
	.main :global(h3) {
		font-size: var(--h3);
		line-height: var(--lh3);
	}
	.main :global(h4) {
		font-size: var(--h4);
		line-height: var(--lh4);
	}

	.main :global(span),
	.main :global(li),
	.main :global(p),
	.main :global(code) {
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lbody);
		white-space: normal;
	}
</style>
