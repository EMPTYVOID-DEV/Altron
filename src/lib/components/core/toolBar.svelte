<script lang="ts">
	import { data, workingBlock } from '$lib/utils/store';
	import type { blocks, dataBlock } from '$lib/utils/types';
	import shortUUID from 'short-uuid';
	let toggle = true;
	let menuOptions: { type: blocks; label: string }[] = [
		{ type: 'paragraph', label: 'Paragraph' },
		{ type: 'header', label: 'Header' },
		{ type: 'code', label: 'Code' },
		{ type: 'list', label: 'List' },
		{ type: 'quote', label: 'Quote' },
		{ type: 'image', label: 'Image' },
		{ type: 'video', label: 'Video' }
	];
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
</script>

<div class="toolBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span class="menuToggle" on:click|stopPropagation={() => (toggle = true)}>
		<svg
			width="32px"
			height="32px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			/><g id="SVGRepo_iconCarrier">
				<path
					d="M6 12H18M12 6V18"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g></svg
		>
	</span>
	{#if toggle}
		<div class="dropDownMenu">
			<span>Add Block</span>
			{#each menuOptions as option}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					on:click|stopPropagation={() => {
						data.update((prev) => {
							const id = shortUUID().generate();
							add(prev, id, option.type);
							workingBlock.set({ state: 'editing', id });
							toggle = false;
							return prev;
						});
					}}>{option.label}</span
				>
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span on:click={() => (toggle = false)}>Cancel</span>
		</div>
	{/if}
</div>

<style>
	.toolBar {
		position: relative;
		display: none;
	}
	.menuToggle {
		width: fit-content;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3px solid var(--primaryColor);
		border-radius: 50%;
	}
	.menuToggle svg {
		width: 32px;
		height: 32px;
	}
	.menuToggle svg path {
		stroke: var(--fontColor);
		stroke-width: 3px;
	}
</style>
