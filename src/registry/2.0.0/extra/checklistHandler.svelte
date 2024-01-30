<script>
	import { getContext } from 'svelte';
	export let updateEntry;
	export let removeEntry;
	export let addEntry;
	export let checkEntry;
	export let items;
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
				on:change={(e) => {
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
