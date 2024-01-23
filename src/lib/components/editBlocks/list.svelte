<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Select from '../extra/select.svelte';
	import type { updateDataType } from '../../utils/types';
	import ListHandler from '../extra/listHandler.svelte';
	export let content: { items: string[]; type: 'ordered' | 'unordered' };
	export let id: string;
	export let active = false;
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>> =
		getContext('List');
	function updateEntry(index: number, text: string) {
		updateData(id, (el) => {
			if (el.name == 'list') el.data.items[index] = text;
		});
	}
	function removeEntry(index: number) {
		updateData(id, (el) => {
			if (el.name == 'list') el.data.items.splice(index, 1);
		});
	}
	function addEntry(defaultVal: string) {
		updateData(id, (el) => {
			if (el.name == 'list') el.data.items.push(defaultVal);
		});
	}
</script>

{#if active}
	<div class="listEdit">
		<Select
			label="List type"
			preSelected={{ value: content.type, label: content.type }}
			elements={[
				{ value: 'ordered', label: 'ordered' },
				{ value: 'unordered', label: 'unordered' }
			]}
			changeHandler={(detail) => {
				updateData(id, (el) => {
					if (el.name == 'list') el.data.type = detail.value;
					console.log(el);
				});
			}}
		/>
		<ListHandler items={content.items} {updateEntry} {addEntry} {removeEntry} />
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.listEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
