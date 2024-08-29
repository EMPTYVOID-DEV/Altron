<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { FormattedText, updateDataType } from '../../utils/types';
	import { htmlToFormattedText } from '../../utils/utils';

	export let content: { items: FormattedText[]; type: 'ordered' | 'unordered' };
	export let id: string;
	export let active = false;

	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const select = componentMap.get('select');
	const listHandler = componentMap.get('listHandler');
	const updateData: updateDataType = getContext('updateData');
	const view = componentMap.get('viewList');

	function updateEntry(index: number, html: string) {
		updateData(id, (el) => {
			if (el.name == 'list') htmlToFormattedText(el.data.items[index], html);
		});
	}
	function removeEntry(index: number) {
		updateData(id, (el) => {
			if (el.name == 'list') el.data.items.splice(index, 1);
		});
	}
	function addEntry(defaultVal: FormattedText) {
		updateData(id, (el) => {
			if (el.name == 'list') el.data.items.push(defaultVal);
		});
	}
</script>

{#if active}
	<div class="listEdit">
		<svelte:component
			this={select}
			label="List type"
			preSelected={{ value: content.type, label: content.type }}
			elements={[
				{ value: 'ordered', label: 'ordered' },
				{ value: 'unordered', label: 'unordered' }
			]}
			changeHandler={(detail) => {
				updateData(id, (el) => {
					if (el.name == 'list') el.data.type = detail.value;
				});
			}}
		/>
		<svelte:component
			this={listHandler}
			items={content.items}
			{updateEntry}
			{addEntry}
			{removeEntry}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.listEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
