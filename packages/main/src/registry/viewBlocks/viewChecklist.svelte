<script>
	import { getContext } from 'svelte';
	import FormatParser from '../extra/formatParser.svelte';
	/**
	 * @typedef {'bold' | 'italic' | 'underline'} FormatType
	 */

	/**
	 * @typedef {{start: number; end: number; type: FormatType}} Format
	 */

	/**
	 * @typedef {{text: string; formats: Format[] }} FormattedText
	 */

	/**@type {FormattedText}*/
	/**@type {{ value: FormattedText; checked: boolean }[]}*/
	export let items;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const Checked = componentMap.get('checkedIcon');
	const UnChecked = componentMap.get('unCheckedIcon');
</script>

<div class="checkListView">
	{#each items as item}
		<div class="checkItem">
			{#if item.checked}
				<svelte:component this={Checked} />
			{:else}
				<svelte:component this={UnChecked} />
			{/if}
			<span style:text-decoration={item.checked ? 'line-through' : 'none'}
				><FormatParser formattedText={item.value} /></span
			>
		</div>
	{/each}
</div>

<style>
	.checkListView {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.checkListView .checkItem {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, auto);
		align-items: center;
		justify-content: start;
		gap: 0.75rem;
	}
	.checkListView span {
		color: var(--textColor);
		white-space: pre-wrap;
	}
</style>
