<script lang="ts">
	import { data, workingBlock } from '$lib/utils/store.js';
	import { onDestroy, onMount } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let bgColor = '#dfe2ec';
	export let textColor = '#121212';
	let h1 = ' clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
	let h2 = ' clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)';
	let h3 = ' clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)';
	let h4 = ' clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
	let body = ' clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)';
	let lh1 = '1.3';
	let lh2 = '1.35';
	let lh3 = '1.4';
	let lh4 = '1.5';
	let lbody = '1.6';

	$: {
		console.log($data, $workingBlock);
	}

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
	onMount(() => {
		window.addEventListener('click', switchBlockState);
	});
	onDestroy(() => {
		window.removeEventListener('click', switchBlockState);
	});
</script>

<div
	class="main"
	style:--primaryColor={primaryColor}
	style:--fontColor={textColor}
	style:--bgColor={bgColor}
	style:--headingFont={headerFont}
	style:--bodyFont={bodyFont}
	style:--h1={h1}
	style:--h2={h2}
	style:--h3={h3}
	style:--h4={h4}
	style:--body={body}
	style:--small="clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem);"
	style:--lh1={lh1}
	style:--lh2={lh2}
	style:--lh3={lh3}
	style:--lh4={lh4}
	style:--lbody={lbody}
>
	{#each $data as block (block.id)}
		<BlockWrapper dataBlock={block} />
	{/each}
</div>

<style>
	.main {
		width: 100%;
	}
	.main :global(*) {
		box-sizing: border-box;
	}
</style>
