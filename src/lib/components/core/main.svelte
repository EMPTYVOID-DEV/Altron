<script lang="ts">
	import { type SvelteComponent, type ComponentType, setContext } from 'svelte';
	import ViewImage from '../viewBlocks/viewImage.svelte';
	import ViewCode from '../viewBlocks/viewCode.svelte';
	import ViewHeader from '../viewBlocks/viewHeader.svelte';
	import ViewList from '../viewBlocks/viewList.svelte';
	import ViewParagraph from '../viewBlocks/viewParagraph.svelte';
	import ToolBar from './toolBar.svelte';
	import ViewQuote from '../viewBlocks/viewQuote.svelte';
	import type { IframeSettings, blocks, dataBlock } from '../../utils/consts';
	import ViewMode from './viewMode.svelte';
	import EditMode from './editMode.svelte';
	import { createDataStore, createWorkingBlockStore } from '../../utils/stores';
	import { get } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import ViewChecklist from '../viewBlocks/viewChecklist.svelte';
	import ViewAttachment from '../viewBlocks/viewAttachment.svelte';
	import ViewEmbed from '../viewBlocks/viewEmbed.svelte';

	// TODO:cypress testing

	// exports
	export let processEmbedSrcs: (src: string) => string = (src: string) => {
		return src;
	};
	export let acceptedEmbedSrcs: string[] = [];
	export let iframeSettings: IframeSettings = {};
	export let attachmentTypes = '*';
	export let excludedBlocks: blocks[] = [];
	export let viewMode = false;
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let secondaryColor = '#1eeb36';
	export let textColor = '#121212';
	export let bgColor = '#ffffff';
	export let blocksGap = '10px';
	export let marginTop = '10px';
	export let marginBottom = '10px';
	export let marginLeft = '10px';
	export let marginRight = '10px';
	export let width = '95%';
	export let h1 = 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
	export let h2 = 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)';
	export let h3 = 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)';
	export let h4 = 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
	export let body = 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)';
	export let small = 'clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem)';
	export let lh1 = '1.3';
	export let lh2 = '1.35';
	export let lh3 = '1.4';
	export let lh4 = '1.5';
	export let lbody = '1.6';
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
	export let customEmbed: ComponentType<SvelteComponent<{ src: string }>> = ViewEmbed;
	export let customAttachment: ComponentType<SvelteComponent<{ file: File; title: string }>> =
		ViewAttachment;
	export let customImage: ComponentType<SvelteComponent<{ file: File; caption: string }>> =
		ViewImage;
	export let customCode: ComponentType<SvelteComponent<{ text: string; lang: string }>> = ViewCode;
	export let customList: ComponentType<
		SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>
	> = ViewList;
	export let customHeader: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> =
		ViewHeader;
	export let customParagraph: ComponentType<SvelteComponent<{ text: string }>> = ViewParagraph;
	export let customQuote: ComponentType<SvelteComponent<{ text: string; owner: string }>> =
		ViewQuote;
	export let customCheckList: ComponentType<
		SvelteComponent<{ items: { value: string; checked: boolean }[] }>
	> = ViewChecklist;
	export let customMenu: ComponentType<SvelteComponent<{ close: () => void }>> = null;
	// context setup
	setContext('dropDown', customMenu);
	setContext('Embed', customEmbed);
	setContext('Attachment', customAttachment);
	setContext('Checklist', customCheckList);
	setContext('Image', customImage);
	setContext('Code', customCode);
	setContext('Header', customHeader);
	setContext('Paragraph', customParagraph);
	setContext('List', customList);
	setContext('Quote', customQuote);
	// embeds context
	setContext('processEmbedSrcs', processEmbedSrcs);
	setContext('acceptedEmbedSrcs', acceptedEmbedSrcs);
	setContext('iframeSettings', iframeSettings);
	//setting attachment types
	setContext('attachmentType', attachmentTypes);
	// excluded blocks
	setContext('excludedBlocks', excludedBlocks);
	// in case no options add plaintext
	if (codeBlockLanguages.length == 0) codeBlockLanguages.push('plaintext');
	setContext('languages', codeBlockLanguages);
	// editor id
	setContext('editorId', nanoid(8));

	// setting up stores
	const data = createDataStore();
	const workingBlock = createWorkingBlockStore();

	export function getData() {
		return get(data);
	}

	export function setData(newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])) {
		if (typeof newData == 'function') data.set(newData(get(data)) || []);
		else if (typeof newData == 'object') data.set(newData);
	}

	export function getWorkingBlock() {
		return get(workingBlock);
	}

	// onMount(() => {
	// 	const intervalId = setInterval(() => {
	// 		fetch('', {
	// 			body: JSON.stringify(getData())
	// 		});
	// 	}, 2000);
	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// });
</script>

<div
	class="main"
	style:--primaryColor={primaryColor}
	style:--secondaryColor={secondaryColor}
	style:--textColor={textColor}
	style:--bgColor={bgColor}
	style:--headingFont={headerFont}
	style:--bodyFont={bodyFont}
	style:--h1={h1}
	style:--h2={h2}
	style:--h3={h3}
	style:--h4={h4}
	style:--body={body}
	style:--small={small}
	style:--lh1={lh1}
	style:--lh2={lh2}
	style:--lh3={lh3}
	style:--lh4={lh4}
	style:--lbody={lbody}
	style:margin-right={marginRight}
	style:margin-left={marginLeft}
	style:margin-top={marginTop}
	style:margin-bottom={marginBottom}
	style:width
>
	{#if viewMode}
		<div class="blocks" style:gap={blocksGap}>
			<ViewMode />
		</div>
	{:else}
		<div class="blocks" style:gap={blocksGap}>
			<EditMode on:blockDeleted on:blockMoved on:editing on:focusing on:afterEditing />
		</div>
		<ToolBar on:blockAdded on:afterEditing />
	{/if}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
	}

	.main .blocks {
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.main :global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.main :global(h1),
	.main :global(h2),
	.main :global(h3),
	.main :global(h4) {
		font-family: var(--headingFont);
		font-weight: bold;
		color: var(--textColor);
		word-break: break-word;
		white-space: pre-line;
	}
	.main :global(h1) {
		font-size: var(--h1);
		line-height: var(--lh1);
	}
	.main :global(h2) {
		font-size: var(--h2);
		line-height: var(--lh2);
	}
	.main :global(h3) {
		font-size: var(--h3);
		line-height: var(--lh3);
	}
	.main :global(h4) {
		font-size: var(--h4);
		line-height: var(--lh4);
	}

	.main :global(span),
	.main :global(code),
	.main :global(li),
	.main :global(p),
	.main :global(i),
	.main :global(label) {
		white-space: pre-wrap;
		word-break: break-word;
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lbody);
	}
</style>
