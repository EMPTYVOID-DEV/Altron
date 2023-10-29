<script lang="ts">
	import type { blocks, dataBlock } from '$lib/utils/types';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import CodeIcon from '$lib/components/icons/codeIcon.svelte';
	import HeaderIcon from '$lib/components/icons/header.svelte';
	import ImageIcon from '$lib/components/icons/image.svelte';
	import VideoIcon from '$lib/components/icons/video.svelte';
	import ListIcon from '$lib/components/icons/listIcon.svelte';
	import QuoteIcon from '$lib/components/icons/quote.svelte';
	import ParagraphIcon from '$lib/components/icons/paragraphIcon.svelte';
	import PlusIcon from '$lib/components/icons/plusIcon.svelte';
	import CloseIcon from '$lib/components/icons/closeIcon.svelte';
	import shortUUID from 'short-uuid';
	import { data } from '$lib/utils/store';
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	function add(list: dataBlock[], id: string, type: blocks) {
		if (type === 'paragraph') {
			list.push({ type, id, data: { text: '' } });
		} else if (type === 'image') {
			list.push({ type, id, data: { href: '', alt: '' } });
		} else if (type === 'video') {
			list.push({ type, id, data: { href: '', alt: '' } });
		} else if (type === 'code') {
			list.push({ type, id, data: { text: '', lang: '' } });
		} else if (type === 'quote') {
			list.push({ type, id, data: { text: '' } });
		} else if (type === 'header') {
			list.push({ type, id, data: { text: '', level: 1 } });
		} else if (type === 'list') {
			list.push({ type, id, data: { items: [], type: 'unordered' } });
		}
	}
	const options: Map<blocks, ComponentType<SvelteComponent>> = new Map([
		['code', CodeIcon],
		['image', ImageIcon],
		['video', VideoIcon],
		['quote', QuoteIcon],
		['header', HeaderIcon],
		['paragraph', ParagraphIcon],
		['list', ListIcon]
	]);
	let toggle = true;
</script>

<div class="toolBar">
	{#if toggle}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={() => (toggle = false)} class="control">
			<PlusIcon />
		</span>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={() => (toggle = true)} class="control">
			<CloseIcon />
		</span>
		<div class="options">
			{#each options.entries() as option, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					in:fade|global={{ delay: 100 * index, duration: 400, easing: elasticIn }}
					out:fade|global={{
						delay: 100 * (6 - index),
						duration: 400,
						easing: elasticIn
					}}
					class="option"
					on:click={() => {
						data.update((prev) => {
							const id = shortUUID().generate();
							add(prev, id, option[0]);
							return prev;
						});
					}}
				>
					<svelte:component this={option[1]} />
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.toolBar {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.toolBar span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		cursor: pointer;
	}

	.control {
		border: 1px solid var(--fontColor);
	}
	.control :global(svg path) {
		fill: var(--fontColor);
	}
	.options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: 5px;
	}
	.option {
		border: 1px solid var(--primaryColor);
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
	/* @media screen and (width < 768px) {
		.toolBar span {
			width: 28px;
		}
		.toolBar span :global(svg) {
			width: 20px;
			height: 20px;
		}
	} */
</style>
