<script lang="ts">
	import type { dataBlock } from '$lib/utils/types.js';
	import Code from '../extra/code.svelte';
	import Header from '../extra/header.svelte';
	import Img from '../extra/img.svelte';
	import List from '../extra/list.svelte';
	import Paragraph from '../extra/paragraph.svelte';
	import Quote from '../extra/quote.svelte';
	import Video from '../extra/video.svelte';
	import { workingBlock } from '$lib/utils/store';
	export let dataBlock: dataBlock;
</script>

<div
	class="blockWrapper"
	class:focused={$workingBlock &&
		$workingBlock.state == 'focused' &&
		$workingBlock.id == dataBlock.id}
	class:editing={$workingBlock &&
		$workingBlock.state == 'editing' &&
		$workingBlock.id == dataBlock.id}
	data-blockid={dataBlock.id}
	data-blocktype={dataBlock.type}
>
	{#if dataBlock.type == 'header'}
		<Header id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'code'}
		<Code data={dataBlock.data} id={dataBlock.id} />
	{:else if dataBlock.type == 'image'}
		<Img id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'list'}
		<List id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'paragraph'}
		<Paragraph id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'quote'}
		<Quote id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'video'}
		<Video id={dataBlock.id} data={dataBlock.data} />
	{/if}
	<span class="blockType">{dataBlock.type}</span>
</div>

<style>
	.blockWrapper {
		width: 100%;
		padding-block: 30px;
		padding-inline: 20px;
		position: relative;
		overflow: hidden;
	}
	.focused {
		border: 2px solid var(--primaryColor);
		border-radius: 8px;
	}

	.editing {
		border: 2px solid var(--editingColor);
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
		background-color: var(--editingColor);
	}

	.blockType {
		position: absolute;
		width: fit-content;
		height: fit-content;
		top: 0%;
		right: 0%;
		color: var(--fontColor);
		font-size: var(--small);
		font-weight: bold;
		display: none;
		padding-inline: 12px;
		padding-block: 4px;
		border-bottom-left-radius: 12px;
		text-transform: capitalize;
	}
</style>
