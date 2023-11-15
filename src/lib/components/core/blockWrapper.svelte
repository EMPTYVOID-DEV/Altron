<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { dataBlock } from '../../utils/consts.js';
	import Code from '../editBlocks/code.svelte';
	import Header from '../editBlocks/header.svelte';
	import Img from '../editBlocks/img.svelte';
	import List from '../editBlocks/list.svelte';
	import Paragraph from '../editBlocks/paragraph.svelte';
	import Quote from '../editBlocks/quote.svelte';
	import Space from '../editBlocks/space.svelte';
	export let dataBlock: dataBlock;
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const editorId: string = getContext('editorId');
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
	{#if dataBlock.name == 'header'}
		<Header id={dataBlock.id} content={dataBlock.data} {active} />
	{:else if dataBlock.name == 'code'}
		<Code content={dataBlock.data} id={dataBlock.id} {active} />
	{:else if dataBlock.name == 'image'}
		<Img id={dataBlock.id} content={dataBlock.data} {active} />
	{:else if dataBlock.name == 'list'}
		<List id={dataBlock.id} content={dataBlock.data} {active} />
	{:else if dataBlock.name == 'paragraph'}
		<Paragraph id={dataBlock.id} content={dataBlock.data} {active} />
	{:else if dataBlock.name == 'quote'}
		<Quote id={dataBlock.id} content={dataBlock.data} {active} />
	{:else}
		<Space id={dataBlock.id} content={dataBlock.data} {active} />
	{/if}
	<span class="blockType">{dataBlock.name}</span>
</div>

<style>
	.blockWrapper {
		width: 100%;
		padding-top: 30px;
		position: relative;
	}

	.focused {
		border: 3px solid var(--primaryColor);
		border-radius: 8px;
	}

	.focused,
	.editing {
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
