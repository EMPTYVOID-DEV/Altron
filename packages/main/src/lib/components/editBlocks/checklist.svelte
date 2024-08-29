<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { FormattedText, updateDataType } from '../../utils/types';
	import { htmlToFormattedText } from '../../utils/utils';
	export let content: { items: { value: FormattedText; checked: boolean }[] };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const checkListHandler = componentMap.get('checklistHandler');
	const view = componentMap.get('viewChecklist');
	const updateData: updateDataType = getContext('updateData');

	function checkEntry(index: number, checked: boolean) {
		updateData(id, (el) => {
			if (el.name == 'checklist') el.data.items[index].checked = checked;
		});
	}

	function updateEntry(index: number, html: string) {
		updateData(id, (el) => {
			if (el.name == 'checklist') htmlToFormattedText(el.data.items[index].value, html);
		});
	}
	function removeEntry(index: number) {
		updateData(id, (el) => {
			if (el.name == 'checklist') el.data.items.splice(index, 1);
		});
	}
	function addEntry(defaultVal: { value: FormattedText; checked: boolean }) {
		updateData(id, (el) => {
			if (el.name == 'checklist')
				el.data.items.push({ value: defaultVal.value, checked: defaultVal.checked });
		});
	}
</script>

{#if active}
	<div class="checkListEdit">
		<svelte:component
			this={checkListHandler}
			items={content.items}
			{addEntry}
			{removeEntry}
			{updateEntry}
			{checkEntry}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.checkListEdit {
		width: 100%;
	}
</style>
