<script>
	import { getContext } from 'svelte';

	/**@type {string[]}*/
	export let items;
	/**@type {(index:number,text:string)=>void}*/
	export let updateEntry;
	/**@type {(index:number)=>void}*/
	export let removeEntry;
	/**@type {(defaultVal: string)=>void}*/
	export let addEntry;

	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const Textarea = componentMap.get('textArea');
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
			addEntry('hello friend');
		}}><svelte:component this={PlusIcon} /></button
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
		all: unset;
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
		--icon: var(--secondaryColor);
	}
	.itemsEdit .header {
		font-weight: 600;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemsEdit button:last-child {
		align-self: center;
	}
</style>
