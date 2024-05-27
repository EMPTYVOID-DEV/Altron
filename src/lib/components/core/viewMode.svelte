<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/types';
	import { getContext, type ComponentType, SvelteComponent } from 'svelte';
	const getAllBlocks = getContext('getAllBlocks') as () => dataBlock[];
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const data = getAllBlocks();

	const viewsMap = new Map<blocks, ComponentType>([
		['code', componentMap.get('viewCode')],
		['header', componentMap.get('viewHeader')],
		['image', componentMap.get('viewImage')],
		['list', componentMap.get('viewList')],
		['paragraph', componentMap.get('viewParagraph')],
		['quote', componentMap.get('viewQuote')],
		['space', componentMap.get('viewSpace')],
		['checklist', componentMap.get('viewChecklist')],
		['attachment', componentMap.get('viewAttachment')],
		['embed', componentMap.get('viewEmbed')]
	]);
</script>

{#each data as block}
	<svelte:component this={viewsMap.get(block.name)} {...block.data} />
{/each}
