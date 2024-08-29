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

	/**@type {(index:number,html:string)=>void}*/
	export let updateEntry;
	/**@type {(index:number)=>void}*/
	export let removeEntry;
	/**@type {(defaultVal: { value:FormattedText ; checked: boolean })=>void}*/
	export let addEntry;
	/**@type {(index:number,checked:boolean)=>void}*/
	export let checkEntry;
	/**@type {{ value: FormattedText; checked: boolean }[]}*/
	export let items;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const markupTextArea = componentMap.get('markupTextArea');
	const Checked = componentMap.get('checkedIcon');
	const UnChecked = componentMap.get('unCheckedIcon');
</script>

<div class="checkListExtra">
	<span class="header">Check list items</span>
	{#each items as item, index}
		<div class="itemEdit">
			<svelte:component
				this={markupTextArea}
				initialHtml={generateHTML(item.value)}
				changeHandler={(/**@type {string}*/ html) => {
					updateEntry(index, html);
				}}
			/>
			<div class="options">
				{#if item.checked}
					<button class="control" on:click|stopPropagation={() => checkEntry(index, false)}>
						<svelte:component this={Checked} />
					</button>
				{:else}
					<button class="control" on:click|stopPropagation={() => checkEntry(index, true)}>
						<svelte:component this={UnChecked} />
					</button>
				{/if}
				<button class="control" on:click|stopPropagation={() => removeEntry(index)}>
					<svelte:component this={CloseIcon} />
				</button>
			</div>
		</div>
	{/each}
	<button
		class="control"
		on:click|stopPropagation={() =>
			addEntry({ value: { text: 'Hello friend', formats: [] }, checked: true })}
	>
		<svelte:component this={PlusIcon} />
	</button>
</div>

<style>
	.checkListExtra {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.header {
		font-weight: 600;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemEdit {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.control {
		all: unset;
		--icon: var(--secondaryColor);
	}

	.control :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	.checkListExtra button:last-child {
		align-self: center;
	}
</style>
