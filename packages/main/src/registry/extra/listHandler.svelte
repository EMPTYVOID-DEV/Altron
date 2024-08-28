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
