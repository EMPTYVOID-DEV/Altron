<script lang="ts">
	import type { blocks, dataBlock, languages } from '../../utils/consts';
	import {
		getContext,
		type ComponentType,
		type SvelteComponent,
		createEventDispatcher
	} from 'svelte';
	import CodeIcon from '../icons/codeIcon.svelte';
	import HeaderIcon from '../icons/headerIcon.svelte';
	import ImageIcon from '../icons/imageIcon.svelte';
	import ListIcon from '../icons/listIcon.svelte';
	import ChecklistIcon from '../icons/checkListIcon.svelte';
	import QuoteIcon from '../icons/closeQuoteIcon.svelte';
	import ParagraphIcon from '../icons/paragraphIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import SpaceIcon from '../icons/spaceIcon.svelte';
	import AttachmentIcon from '../icons/attachmentIcon.svelte';
	import { nanoid } from 'nanoid';
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import EmbedIcon from '../icons/embedIcon.svelte';

	const eventDispatcher = createEventDispatcher();
	const data: Writable<dataBlock[]> = getContext('data');
	const excludedBlocks: blocks[] = getContext('excludedBlocks');
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const languages = getContext('languages') as languages[];
	const options: Map<blocks, ComponentType<SvelteComponent>> = new Map([
		['paragraph', ParagraphIcon],
		['header', HeaderIcon],
		['image', ImageIcon],
		['list', ListIcon],
		['quote', QuoteIcon],
		['code', CodeIcon],
		['space', SpaceIcon],
		['checklist', ChecklistIcon],
		['attachment', AttachmentIcon],
		['embed', EmbedIcon]
	]);
	const defaultData = new Map<blocks, any>([
		['paragraph', { text: 'hello friend' }],
		['image', { base64: '', name: 'default.png', caption: 'default image' }],
		['code', { text: 'console.log("hello friend")', lang: languages[0] }],
		['quote', { text: 'hello friend', owner: 'me' }],
		['header', { text: 'hello friend', level: 4 }],
		['list', { items: ['hello friend'], type: 'ordered' }],
		['space', { size: 24 }],
		['checklist', { items: [] }],
		['attachment', { file: null, title: '' }],
		['embed', { src: '' }]
	]);
	excludedBlocks.forEach((el) => {
		options.delete(el);
	});
	let toggle = true;
	function add(list: dataBlock[], id: string, name: blocks) {
		list.push({ id, name, data: { ...defaultData.get(name) } as any });
		eventDispatcher('blockAdded', {
			id,
			name
		});
	}
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
					data-label={'add ' + option[0] + '...'}
					class="option"
					on:click|stopPropagation={() => {
						const id = nanoid(8);
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
		grid-template-columns: repeat(2, auto);
		align-items: center;
		gap: 12px;
		margin-top: 35px;
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
		border: 2px solid var(--textColor);
	}

	.options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: 15px;
	}
	.option {
		border: 2px solid var(--primaryColor);
		position: relative;
	}
	.option::after {
		content: attr(data-label);
		position: absolute;
		display: none;
		top: -95%;
		left: -50%;
		width: 8rem;
		text-transform: capitalize;
		padding-inline: 6px;
		border: 1px solid var(--textColor);
		border-radius: 24px;
		font-size: var(--small);
		font-weight: bold;
		color: var(--textColor);
		background-color: color-mix(in srgb, gray 60%, var(--primaryColor) 30%);
		z-index: 99;
	}
	.option:hover::after {
		display: block;
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
</style>
