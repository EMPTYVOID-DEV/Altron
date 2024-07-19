<script lang="ts">
	import { SvelteComponent, createEventDispatcher, setContext, type ComponentType } from 'svelte';
	import ToolBar from './toolBar.svelte';
	import type { IframeSettings, blocks, dataBlock } from '../../utils/types';
	import ViewMode from './viewMode.svelte';
	import EditMode from './editMode.svelte';
	import { createDataStore, createWorkingBlockStore } from '../../utils/stores';
	import { get } from 'svelte/store';
	import { nanoid } from 'nanoid';

	interface $$Events {
		blockAdded: CustomEvent<{ id: string }>;
		blockDeleted: CustomEvent<dataBlock>;
		blockMoved: CustomEvent<{ up: boolean; id: string }>;
		editing: CustomEvent<{ id: string }>;
		focusing: CustomEvent<{ id: string }>;
		afterEditing: CustomEvent<{ id: string }>;
		blockUpdate: CustomEvent<{ id: string }>;
	}

	// exports
	export let processEmbedSrcs: (src: string) => string = (src: string) => {
		return src;
	};
	export let acceptedEmbedSrcs: { rules: string[]; description: string } = {
		description: 'You should enter a valid url for an embed , any source is accepted',
		rules: []
	};
	export let excludedBlocks: blocks[] = [];
	export let initialData: dataBlock[] = [];
	// by default -1 means no limits
	export let sizeLimits = {
		imgs: -1,
		attachments: -1
	};
	export let componentMap: Map<string, ComponentType<SvelteComponent>> = new Map();
	export let iframeSettings: IframeSettings = {};
	export let attachmentTypes = '*';
	export let viewMode = false;
	export let codeBlockLanguages: string[] = [
		'javascript',
		'java',
		'c',
		'css',
		'plaintext',
		'typescript',
		'python',
		'csharp'
	];

	const eventDispatcher = createEventDispatcher();
	// component context
	setContext('componentMap', componentMap);

	// size limits
	setContext('sizeLimits', sizeLimits);

	// embeds context
	setContext('processEmbedSrcs', processEmbedSrcs);
	setContext('acceptedEmbedSrcs', acceptedEmbedSrcs);
	setContext('iframeSettings', iframeSettings);

	// excluded blocks
	setContext('excludedBlocks', excludedBlocks);

	//setting attachment types
	setContext('attachmentType', attachmentTypes);

	// in case no options add plaintext
	if (codeBlockLanguages.length == 0) codeBlockLanguages.push('plaintext');
	setContext('languages', codeBlockLanguages);

	// editor id
	const editorId = nanoid(8);
	setContext('editorId', nanoid(8));

	// setting up stores
	const data = createDataStore(validateData(initialData));
	const workingBlock = createWorkingBlockStore();

	// global set and get funhction
	setContext('setData', setData);
	setContext('getAllBlocks', getAllBlocks);
	setContext('getBlock', getBlock);
	setContext('getWorkingBlock', getWorkingBlock);
	setContext('getEditorId', getEditorId);

	function validateData(data: dataBlock[]): dataBlock[] {
		const dupSet = new Set();
		for (let block of data) {
			if (dupSet.has(block.id)) {
				block.id = nanoid(8);
			}
			dupSet.add(block.id);
		}
		return data;
	}

	export function getAllBlocks() {
		const currentData = get(data);
		return currentData;
	}

	export function getBlock(id: string) {
		const currentData = get(data);
		return currentData.find((el) => el.id == id);
	}

	export function getEditorId() {
		return editorId;
	}

	export function setData(newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])) {
		if (typeof newData == 'function') {
			const result = newData(get(data));
			data.set(validateData(result));
		} else if (typeof newData == 'object') data.set(validateData(newData));
	}

	export function getWorkingBlock() {
		return get(workingBlock);
	}

	function isEmptyBlock(block: dataBlock) {
		const srcBlocks = ['embed', 'image', 'attachment'] as const;
		const listBlocks = ['checklist', 'list'] as const;
		const textBlocks = ['code', 'quote', 'paragraph', 'header'] as const;
		for (let srcBlock of srcBlocks)
			if (block.name == srcBlock && block.data.src === '') return true;
		for (let listBlock of listBlocks)
			if (block.name == listBlock && block.data.items.length == 0) return true;
		for (let textBlock of textBlocks)
			if (block.name == textBlock && block.data.text === '') return true;
		if (block.name == 'space' && block.data.size == 0) return true;
		return false;
	}

	function removeBadBlocks(e: { detail: { id: string } }) {
		const currentData = get(data);
		const block = currentData.find((el) => el.id == e.detail.id);
		if (isEmptyBlock(block)) {
			data.set(currentData.filter((el) => el.id != e.detail.id));
		} else {
			eventDispatcher('afterEditing', { id: e.detail.id });
		}
	}
</script>

<main>
	{#if viewMode}
		<div class="blocks">
			<ViewMode />
		</div>
	{:else}
		<div class="blocks">
			<EditMode
				on:blockDeleted
				on:blockMoved
				on:editing
				on:focusing
				on:afterEditing={removeBadBlocks}
			/>
		</div>
		<ToolBar on:blockAdded on:afterEditing={removeBadBlocks} />
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: var(--width, 95%);
		margin-top: var(--margin-top, 0);
		margin-left: var(--margin-left, 0);
		margin-bottom: var(--margin-bottom, 0);
		margin-right: var(--margin-right, 0);
		--primaryColor: var(--primary-color, #3366ff);
		--secondaryColor: var(--secondary-color, #1eeb36);
		--textColor: var(--text-color, #121212);
		--bgColor: var(--bg-color, #ffffff);
		--headingFont: var(--heading-font, 'Verdana, sans-serif');
		--bodyFont: var(--body-font, 'Helvetica, sans-serif');
		--h1: var(--h1-size, clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem));
		--h2: var(--h1-size, clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem));
		--h3: var(--h3-size, clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem));
		--h4: var(--h4-size, clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem));
		--body: var(--body-size, clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem));
		--small: var(--small-size, clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem));
		--lh1: var(--lh1-size, 1.3);
		--lh2: var(--lh2-size, 1.35);
		--lh3: var(--lh3-size, 1.4);
		--lh4: var(--lh4-size, 1.5);
		--lbody: var(--lbody-size, 1.6);
	}

	main .blocks {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: var(--block-gap, 10px);
	}
	main :global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	main :global(:where(h1, h2, h3, h4)) {
		font-family: var(--headingFont);
		font-weight: bold;
	}
	main :global(h1) {
		font-size: var(--h1);
		line-height: var(--lh1);
	}
	main :global(h2) {
		font-size: var(--h2);
		line-height: var(--lh2);
	}
	main :global(h3) {
		font-size: var(--h3);
		line-height: var(--lh3);
	}
	main :global(h4) {
		font-size: var(--h4);
		line-height: var(--lh4);
	}

	main :global(:where(label, code, span, li, p, i)) {
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lbody);
	}
</style>
