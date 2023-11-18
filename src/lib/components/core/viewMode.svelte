<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/consts';
	import { getContext, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ViewCode from '../viewBlocks/viewCode.svelte';
	import ViewHeader from '../viewBlocks/viewHeader.svelte';
	import ViewImage from '../viewBlocks/viewImage.svelte';
	import ViewList from '../viewBlocks/viewList.svelte';
	import ViewParagraph from '../viewBlocks/viewParagraph.svelte';
	import ViewQuote from '../viewBlocks/viewQuote.svelte';
	import ViewSpace from '../viewBlocks/viewSpace.svelte';
	import ViewChecklist from '../viewBlocks/viewChecklist.svelte';
	import viewAttachment from '../viewBlocks/viewAttachment.svelte';
	import ViewEmbed from '../viewBlocks/viewEmbed.svelte';
	const data: Writable<dataBlock[]> = getContext('data');
	const viewsMap = new Map<blocks, ComponentType>([
		['code', ViewCode],
		['header', ViewHeader],
		['image', ViewImage],
		['list', ViewList],
		['paragraph', ViewParagraph],
		['quote', ViewQuote],
		['space', ViewSpace],
		['checklist', ViewChecklist],
		['attachment', viewAttachment],
		['embed', ViewEmbed]
	]);
</script>

{#each $data as block}
	<svelte:component this={viewsMap.get(block.name)} {...block.data} />
{/each}
