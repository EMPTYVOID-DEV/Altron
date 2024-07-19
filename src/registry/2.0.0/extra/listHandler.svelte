<script>
	import { getContext } from 'svelte';

	/**
	 * @type {Map<string,import("svelte").Component>}
	 */
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const Textarea = componentMap.get('textArea');

	/**
	 * @type {{ items:string[],updateEntry:(index: number, text: string)=>void,removeEntry:(index: number)=>void ,
     addEntry :(val:string)=>void}}
	 */
	let { addEntry, items, removeEntry, updateEntry } = $props();
</script>

<div class="itemsEdit">
	<span class="header">List items</span>
	{#each items as item, index}
		<div class="itemEdit">
			<svelte:component
				this={Textarea}
				width={90}
				textContent={item}
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
			addEntry('hello friend');
		}}><svelte:component this={PlusIcon} /></span
	>
</div>

<style>
	.itemsEdit {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.itemsEdit .itemEdit {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.itemsEdit .control {
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
	.itemsEdit .header {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemsEdit span:last-child {
		align-self: center;
	}
</style>
