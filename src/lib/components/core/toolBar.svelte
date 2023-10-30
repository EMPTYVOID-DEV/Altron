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
	import { data, workingBlock } from '$lib/utils/store';
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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span on:click={() => (toggle = !toggle)} class="control">
		{#if toggle}
			<CloseIcon />
		{:else}
			<PlusIcon />
		{/if}
	</span>
	{#if toggle}
		<div class="options">
			{#each options.entries() as option, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					in:fade|global={{ delay: 80 * index, duration: 300, easing: elasticIn }}
					out:fade|global={{ delay: 80 * (6 - index), duration: 300, easing: elasticIn }}
					data-label={'add ' + option[0]}
					class="option"
					on:click|stopPropagation={() => {
						const id = shortUUID().generate();
						data.update((prev) => {
							add(prev, id, option[0]);
							toggle = true;
							return prev;
						});
						workingBlock.set({ id, state: 'editing' });
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
		width: fit-content;
		display: grid;
		align-items: center;
		grid-template-columns: repeat(2, auto);
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
		gap: 12px;
	}
	.option {
		border: 1px solid var(--primaryColor);
		position: relative;
	}
	.option::after {
		content: attr(data-label);
		position: absolute;
		display: none;
		top: 102%;
		left: 1.2rem;
		width: 120px;
		text-transform: capitalize;
		padding-inline: 6px;
		padding-block: 3px;
		font-size: var(--small);
		font-weight: bold;
		color: var(--primaryColor);
		background-color: transparent;
		z-index: 99;
	}
	.option:hover::after {
		display: block;
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
	@media screen and (width < 768px) {
		.toolBar span {
			width: 32px;
		}
		.toolBar .options {
			row-gap: 25px;
		}
		.toolBar span :global(svg) {
			width: 22px;
			height: 22px;
		}
	}
</style>
