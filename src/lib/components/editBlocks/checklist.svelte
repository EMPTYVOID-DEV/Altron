<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/consts';
	import Textarea from '../extra/textarea.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';
	export let content: { items: { value: string; checked: boolean }[] };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ items: { value: string; checked: boolean }[] }>> =
		getContext('Checklist');
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="checkListEdit">
		<span>Check list items </span>
		{#each content.items as item, index}
			<div class="itemEdit">
				<input
					type="checkbox"
					bind:checked={item.checked}
					on:change={(e) => {
						updateData(id, (el) => {
							if (el.name == 'checklist') el.data.items[index].checked = e.currentTarget.checked;
						});
					}}
				/>
				<Textarea
					width={85}
					textContent={item.value}
					textLevel={0}
					changeHandler={(text) => {
						updateData(id, (el) => {
							if (el.name == 'checklist') el.data.items[index].value = text;
						});
					}}
				/>
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="control"
					on:click|stopPropagation={() => {
						updateData(id, (el) => {
							if (el.name == 'checklist') el.data.items.splice(index, 1);
						});
					}}><CloseIcon /></span
				>
			</div>
		{/each}
		<!-- svelte-ignore missing-declaration -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="control"
			on:click|stopPropagation={() => {
				updateData(id, (el) => {
					if (el.name == 'checklist') el.data.items.push({ checked: false, value: '' });
				});
			}}><PlusIcon /></span
		>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.checkListEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.checkListEdit .itemEdit {
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
	.checkListEdit .control {
		cursor: pointer;
	}
	.checkListEdit span:first-child {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
	.checkListEdit span:last-child {
		align-self: center;
	}
</style>
