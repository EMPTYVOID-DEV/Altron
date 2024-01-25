<script>
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
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	import EmbedIcon from '../icons/embedIcon.svelte';
	import { getContext } from 'svelte';
	export let add;
	const excludedBlocks = getContext('excludedBlocks');
	const options = new Map([
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
	let toggle = true;
	excludedBlocks.forEach((el) => {
		options.delete(el);
	});
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
					class="option"
					on:click|stopPropagation={() => {
						const blockName = option[0];
						add(blockName);
						toggle = true;
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
		gap: 20px;
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
		gap: 10px;
	}
	.option {
		border: 2px solid var(--primaryColor);
		position: relative;
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
</style>
