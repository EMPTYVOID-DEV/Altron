<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	import CheckListHandler from '../extra/checkListHandler.svelte';
	export let content: { items: { value: string; checked: boolean }[] };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ items: { value: string; checked: boolean }[] }>> =
		getContext('Checklist');
	const updateData: updateDataType = getContext('updateData');

	function checkEntry(index: number, checked: boolean) {
		updateData(id, (el) => {
			if (el.name == 'checklist') el.data.items[index].checked = checked;
		});
	}

	function updateEntry(index: number, text: string) {
		updateData(id, (el) => {
			if (el.name == 'checklist') el.data.items[index].value = text;
		});
	}
	function removeEntry(index: number) {
		updateData(id, (el) => {
			if (el.name == 'checklist') el.data.items.splice(index, 1);
		});
	}
	function addEntry(defaultVal: { value: string; checked: boolean }) {
		updateData(id, (el) => {
			if (el.name == 'checklist')
				el.data.items.push({ value: defaultVal.value, checked: defaultVal.checked });
		});
	}
</script>

{#if active}
	<div class="checkListEdit">
		<CheckListHandler items={content.items} {addEntry} {removeEntry} {updateEntry} {checkEntry} />
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.checkListEdit {
		width: 100%;
	}
</style>
