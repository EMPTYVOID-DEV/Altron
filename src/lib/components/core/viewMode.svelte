<script lang="ts">
	import type { dataBlock } from '$lib/utils/consts';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ViewCode from '../viewBlocks/viewCode.svelte';
	import ViewHeader from '../viewBlocks/viewHeader.svelte';
	import ViewImage from '../viewBlocks/viewImage.svelte';
	import ViewList from '../viewBlocks/viewList.svelte';
	import ViewParagraph from '../viewBlocks/viewParagraph.svelte';
	import ViewQuote from '../viewBlocks/viewQuote.svelte';
	import ViewSpace from '../viewBlocks/viewSpace.svelte';
	const data: Writable<dataBlock[]> = getContext('data');
</script>

{#each $data as block}
	{#if block.name == 'code'}
		<ViewCode {...block.data} />
	{:else if block.name == 'header'}
		<ViewHeader {...block.data} />
	{:else if block.name == 'list'}
		<ViewList {...block.data} />
	{:else if block.name == 'image'}
		<ViewImage {...block.data} />
	{:else if block.name == 'quote'}
		<ViewQuote {...block.data} />
	{:else if block.name == 'paragraph'}
		<ViewParagraph {...block.data} />
	{:else}
		<ViewSpace size={block.data.size} />
	{/if}
{/each}
