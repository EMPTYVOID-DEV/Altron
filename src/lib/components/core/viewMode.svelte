<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/consts';
	import { getContext, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ViewSpace from '../viewBlocks/viewSpace.svelte';
	const data: Writable<dataBlock[]> = getContext('data');

	const viewsMap = new Map<blocks, ComponentType>([
		['code', getContext('Code')],
		['header', getContext('Header')],
		['image', getContext('Image')],
		['list', getContext('List')],
		['paragraph', getContext('Paragraph')],
		['quote', getContext('Quote')],
		['space', ViewSpace],
		['checklist', getContext('Checklist')],
		['attachment', getContext('Attachment')],
		['embed', getContext('Embed')]
	]);
</script>

{#each $data as block}
	<svelte:component this={viewsMap.get(block.name)} {...block.data} />
{/each}
