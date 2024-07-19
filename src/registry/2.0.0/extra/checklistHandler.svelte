<script>
	import { getContext } from 'svelte';

	/**
	 * @typedef {{value:string,checked:boolean}} item
	 */

	/**
	 * @type {{ items:item[],updateEntry:(index: number, text: string)=>void,removeEntry:(index: number)=>void ,
     addEntry :(item:item)=>void , checkEntry:(index:number,checked:boolean)=>void}}
	 */
	let { addEntry, items, removeEntry, updateEntry, checkEntry } = $props();
	/**
	 * @type {Map<string,import("svelte").Component>}
	 */
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const Textarea = componentMap.get('textArea');
</script>

<div class="checkListExtra">
	<span class="header">Check list items </span>
	{#each items as item, index}
		<div class="itemEdit">
			<input
				type="checkbox"
				bind:checked={item.checked}
				onchange={(e) => {
					checkEntry(index, e.currentTarget.checked);
				}}
			/>
			<svelte:component
				this={Textarea}
				width={90}
				textContent={item.value}
				textLevel={0}
				changeHandler={(text) => {
					updateEntry(index, text);
				}}
			/>

			<span
				class="control"
				onclick={(e) => {
					e.stopPropagation();
					removeEntry(index);
				}}><svelte:component this={CloseIcon} /></span
			>
		</div>
	{/each}
	<span
		class="control"
		onclick={(e) => {
			e.stopPropagation();
			addEntry({ value: 'hello friend', checked: true });
		}}><svelte:component this={PlusIcon} /></span
	>
</div>

<style>
	.checkListExtra {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.checkListExtra > .header {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemEdit {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.itemEdit input {
		width: 1.2rem;
		aspect-ratio: 1/1;
		margin-right: 10px;
		cursor: pointer;
	}
	.control {
		cursor: pointer;
		width: 2.2rem;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 2px solid var(--secondaryColor);
		box-shadow: 0 0 5px var(--secondaryColor), 0 0 5px var(--secondaryColor),
			0 0 5px var(--secondaryColor);
	}
	.checkListExtra span:last-child {
		align-self: center;
	}
</style>
