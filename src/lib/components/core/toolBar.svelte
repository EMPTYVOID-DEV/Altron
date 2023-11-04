<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/consts';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import CodeIcon from '../icons/codeIcon.svelte';
	import HeaderIcon from '../icons/headerIcon.svelte';
	import ImageIcon from '../icons/imageIcon.svelte';
	import ListIcon from '../icons/listIcon.svelte';
	import QuoteIcon from '../icons/closeQuoteIcon.svelte';
	import ParagraphIcon from '../icons/paragraphIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import SpaceIcon from '../icons/spaceIcon.svelte';
	import shortUUID from 'short-uuid';
	import { data, workingBlock } from '../../utils/stores';
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	function add(list: dataBlock[], id: string, name: blocks) {
		if (name === 'paragraph') {
			list.push({ name, id, data: { text: 'hello friend' } });
		} else if (name === 'image') {
			list.push({
				name,
				id,
				data: { base64: '', name: 'default.png', caption: 'default image' }
			});
		} else if (name === 'code') {
			list.push({ name, id, data: { text: 'console.log("hello friend")', lang: 'plaintext' } });
		} else if (name === 'quote') {
			list.push({ name, id, data: { text: 'hello friend', owner: 'me' } });
		} else if (name === 'header') {
			list.push({ name, id, data: { text: 'hello friend', level: 4 } });
		} else if (name === 'list') {
			list.push({ name, id, data: { items: ['hello friend'], type: 'ordered' } });
		} else {
			list.push({ id, name, data: { size: 24 } });
		}
	}

	const options: Map<blocks, ComponentType<SvelteComponent>> = new Map([
		['code', CodeIcon],
		['image', ImageIcon],
		['quote', QuoteIcon],
		['header', HeaderIcon],
		['paragraph', ParagraphIcon],
		['list', ListIcon],
		['space', SpaceIcon]
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
		margin-top: 30px;
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
		border: 1px solid var(--textColor);
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
		color: var(--textColor);
		background-color: transparent;
		z-index: 99;
	}
	.option:hover::after {
		display: block;
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
</style>
