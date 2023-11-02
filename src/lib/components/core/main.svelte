<script lang="ts">
	import { data, workingBlock } from '$lib/utils/stores.js';
	import { SvelteComponent, onDestroy, onMount, type ComponentType, setContext } from 'svelte';
	import { nightOwl } from 'svelte-highlight/styles';
	import BlockWrapper from './blockWrapper.svelte';
	import ToolBar from './toolBar.svelte';
	import ViewImage from '../viewBlocks/viewImage.svelte';
	import ViewCode from '../viewBlocks/viewCode.svelte';
	import ViewHeader from '../viewBlocks/viewHeader.svelte';
	import ViewList from '../viewBlocks/viewList.svelte';
	import ViewParagraph from '../viewBlocks/viewParagraph.svelte';
	import ViewQuote from '../viewBlocks/viewQuote.svelte';
	import ViewVideo from '../viewBlocks/viewVideo.svelte';
	import type { languages } from '$lib/utils/consts';
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let secondaryColor = '#1eeb36';
	export let textColor = '#121212';
	export let codeTheme: string = nightOwl;
	export let customImage: ComponentType<SvelteComponent<{ href: string; alt: string }>> = ViewImage;
	export let customCode: ComponentType<SvelteComponent<{ text: string; lang: languages }>> =
		ViewCode;
	export let customVideo: ComponentType<SvelteComponent<{ href: string; alt: string }>> = ViewVideo;
	export let customList: ComponentType<
		SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>
	> = ViewList;
	export let customHeader: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> =
		ViewHeader;
	export let customParagraph: ComponentType<SvelteComponent<{ text: string }>> = ViewParagraph;
	export let customQuote: ComponentType<SvelteComponent<{ text: string; owner: string }>> =
		ViewQuote;
	export let codeBlockLanguages: languages[] = [
		'javascript',
		'java',
		'c',
		'css',
		'typescript',
		'python',
		'csharp'
	];
	setContext('codeTheme', codeTheme);
	setContext('Image', customImage);
	setContext('Video', customVideo);
	setContext('Code', customCode);
	setContext('Header', customHeader);
	setContext('Paragraph', customParagraph);
	setContext('List', customList);
	setContext('Quote', customQuote);
	setContext('languages', codeBlockLanguages);
	function traverseParent(element: any): null | string {
		while (element) {
			let currentId = element?.dataset.blockid;
			if (typeof currentId == 'string') return currentId;
			element = element.parentElement;
		}
		return null;
	}

	function switchBlockState(event: MouseEvent) {
		const id = traverseParent(event.target);
		if (!id) workingBlock.set(null);
		else if ($workingBlock == null || $workingBlock.id !== id)
			workingBlock.set({ id, state: 'focused' });
		else workingBlock.set({ id, state: 'editing' });
	}

	function actionOnBlock(event: KeyboardEvent) {
		if (!$workingBlock || $workingBlock.state != 'focused') return;
		if (event.key == 'Backspace') {
			data.update((prev) => {
				const newDataBlocks = prev.filter((element) => {
					return element.id != $workingBlock.id;
				});
				return newDataBlocks;
			});
		} else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
			data.update((prev) => {
				const index = prev.findIndex((val) => val.id == $workingBlock.id);
				const val = prev.splice(index, 1)[0];
				prev.splice(event.key == 'ArrowUp' ? index - 1 : index + 1, 0, val);
				return prev;
			});
		}
	}

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		window.addEventListener('keyup', actionOnBlock);
	});
	onDestroy(() => {
		window.removeEventListener('click', switchBlockState);
		window.removeEventListener('keyup', actionOnBlock);
	});
	// *TODO:: add the moving behiavior to mobile
	// *TODO : add view mode
</script>

<div
	class="main"
	style:--primaryColor={primaryColor}
	style:--secondaryColor={secondaryColor}
	style:--textColor={textColor}
	style:--headingFont={headerFont}
	style:--bodyFont={bodyFont}
	style:--h1="clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)"
	style:--h2="clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)"
	style:--h3="clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)"
	style:--h4="clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)"
	style:--body="clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)"
	style:--small="clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem)"
	style:--lh1="1.3"
	style:--lh2="1.35"
	style:--lh3="1.4"
	style:--lh4="1.5"
	style:--lbody="1.6"
>
	{#each $data as block}
		<BlockWrapper dataBlock={block} />
	{/each}

	<ToolBar />
</div>

<style>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding-bottom: 20px;
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
	.main :global(li),
	.main :global(p),
	.main :global(i),
	.main :global(label) {
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lbody);
		white-space: pre-line;
	}

	.main :global(::-webkit-scrollbar) {
		width: 0.5rem;
	}
	.main :global(::-webkit-scrollbar-track) {
		background: color-mix(in srgb, var(--secondaryColor) 40%, white 40%);
	}
	.main :global(::-webkit-scrollbar-thumb) {
		background: var(--secondaryColor);
	}
</style>
