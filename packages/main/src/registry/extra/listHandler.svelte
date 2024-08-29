<script>
	import { generateHTML } from '$lib/utils/utils';
	import { getContext } from 'svelte';

	/**
	 * @typedef {'bold' | 'italic' | 'underline'} FormatType
	 */

	/**
	 * @typedef {{start: number; end: number; type: FormatType}} Format
	 */

	/**
	 * @typedef {{text: string; formats: Format[] }} FormattedText
	 */

	/**@type {FormattedText[]}*/
	export let items;
	/**@type {(index:number,html:string)=>void}*/
	export let updateEntry;
	/**@type {(index:number)=>void}*/
	export let removeEntry;
	/**@type {(defaultVal: FormattedText)=>void}*/
	export let addEntry;

	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const markupTextArea = componentMap.get('markupTextArea');
</script>

<div class="itemsEdit">
	<span class="header">List items</span>
	{#each items as item, index}
		<div class="itemEdit">
			<svelte:component
				this={markupTextArea}
				initialHtml={generateHTML(item)}
				changeHandler={(/**@type {string}*/ html) => {
					updateEntry(index, html);
				}}
			/>

			<button
				class="control"
				on:click|stopPropagation={() => {
					removeEntry(index);
				}}><svelte:component this={CloseIcon} /></button
			>
		</div>
	{/each}
	<button
		class="control"
		on:click|stopPropagation={() => {
			addEntry({ formats: [], text: 'hello friend' });
		}}><svelte:component this={PlusIcon} /></button
	>
</div>

<style>
	.itemsEdit {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.itemEdit {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.control {
		all: unset;
		--icon: var(--secondaryColor);
	}

	.control :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
	.header {
		font-weight: 600;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemsEdit button:last-child {
		align-self: center;
	}
</style>
