<script lang="ts">
	import { getContext, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { blocks, dataBlock } from '../../utils/consts.js';
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
	$: active = $workingBlock && $workingBlock.state == 'editing' && $workingBlock.id == dataBlock.id;
	$: focused =
		$workingBlock && $workingBlock.state == 'focused' && $workingBlock.id == dataBlock.id;
</script>

<div
	class="blockWrapper"
	class:focused
	class:editing={active}
	data-blockid={dataBlock.id}
	data-editorid={editorId}
	data-blocktype={dataBlock.name}
>
	<svelte:component
		this={blocksMap.get(dataBlock.name)}
		{active}
		id={dataBlock.id}
		content={dataBlock.data}
	/>
	<span class="blockType">{dataBlock.name}</span>
</div>

<style>
	.blockWrapper {
		width: 100%;
		position: relative;
	}

	.focused {
		border: 3px solid var(--primaryColor);
		border-radius: 8px;
	}

	.focused,
	.editing {
		padding-top: 30px;
		padding-bottom: 10px;
		padding-inline: 15px;
	}
	.editing {
		border: 3px solid var(--secondaryColor);
		border-radius: 8px;
	}

	.focused .blockType,
	.editing .blockType {
		display: inline-block;
	}
	.focused .blockType {
		background-color: var(--primaryColor);
	}

	.editing .blockType {
		background-color: var(--secondaryColor);
	}

	.blockType {
		position: absolute;
		width: fit-content;
		height: fit-content;
		top: 0%;
		right: 0%;
		font-size: var(--small);
		color: var(--textColor);
		font-weight: bold;
		display: none;
		padding-inline: 12px;
		padding-block: 2px;
		border-bottom-left-radius: 12px;
		text-transform: capitalize;
	}
</style>
