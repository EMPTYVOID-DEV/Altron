<script>
	import { getContext } from 'svelte';
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	const Textarea = componentMap.get('textArea');

	export let items;
	export let updateEntry;
	export let removeEntry;
	export let addEntry;
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
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="control"
				on:click|stopPropagation={() => {
					removeEntry(index);
				}}><svelte:component this={CloseIcon} /></span
			>
		</div>
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		class="control"
		on:click|stopPropagation={() => {
			// default value
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
