<script lang="ts">
	import { getContext, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { blocks, dataBlock } from '../../utils/types.js';
	import Code from '../editBlocks/code.svelte';
	import Header from '../editBlocks/header.svelte';
	import Img from '../editBlocks/img.svelte';
	import List from '../editBlocks/list.svelte';
	import Paragraph from '../editBlocks/paragraph.svelte';
	import Quote from '../editBlocks/quote.svelte';
	import Space from '../editBlocks/space.svelte';
	import Checklist from '../editBlocks/checklist.svelte';
	import Attachment from '../editBlocks/attachment.svelte';
	import Embed from '../editBlocks/embed.svelte';
	import BlockWrapperUi from './blockWrapperUi.svelte';
	export let dataBlock: dataBlock;
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const editorId: string = getContext('editorId');
	const blocksMap = new Map<blocks, ComponentType>([
		['code', Code],
		['header', Header],
		['image', Img],
		['list', List],
		['paragraph', Paragraph],
		['quote', Quote],
		['space', Space],
		['checklist', Checklist],
		['attachment', Attachment],
		['embed', Embed]
	]);
	$: edited = $workingBlock && $workingBlock.state == 'editing' && $workingBlock.id == dataBlock.id;
	$: focused =
		$workingBlock && $workingBlock.state == 'focused' && $workingBlock.id == dataBlock.id;
</script>

<div
	class="blockWrapper"
	data-blockid={dataBlock.id}
	data-editorid={editorId}
	data-blocktype={dataBlock.name}
>
	<BlockWrapperUi blockName={dataBlock.name} {edited} {focused}>
		<svelte:component
			this={blocksMap.get(dataBlock.name)}
			active={edited}
			id={dataBlock.id}
			content={dataBlock.data}
		/>
	</BlockWrapperUi>
</div>

<style>
	.blockWrapper {
		width: 100%;
	}
</style>
