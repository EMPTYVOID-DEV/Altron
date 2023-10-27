<script lang="ts">
	import type { dataBlock } from '$lib/utils/types.js';
	import Code from '../extra/code.svelte';
	import Header from '../extra/header.svelte';
	import Img from '../extra/img.svelte';
	import List from '../extra/list.svelte';
	import Paragraph from '../extra/paragraph.svelte';
	import Quote from '../extra/quote.svelte';
	import Video from '../extra/video.svelte';

	export let dataBlock: dataBlock;
</script>

<div class="blockWrapper">
	{#if dataBlock.type == 'header'}
		<Header id={dataBlock.id} data={dataBlock.data} />
	{:else if dataBlock.type == 'code'}
		<Code data={dataBlock.data} id={dataBlock.id} />
	{:else if dataBlock.type == 'img'}
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
</div>
