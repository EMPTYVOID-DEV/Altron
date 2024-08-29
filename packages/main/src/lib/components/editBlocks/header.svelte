<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { text: string; level: 1 | 2 | 3 | 4 };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const select = componentMap.get('select');
	const textarea = componentMap.get('textArea');
	const updateData: updateDataType = getContext('updateData');
	const view = componentMap.get('viewHeader');
	const elements = [
		{ value: 1, label: 'Very big' },
		{ value: 2, label: 'Big' },
		{ value: 3, label: 'Medium' },
		{ value: 4, label: 'Small' }
	];
</script>

{#if active}
	<div class="headerEdit">
		<svelte:component
			this={select}
			preSelected={{
				value: content.level,
				label: elements.find((el) => el.value == content.level).label
			}}
			label="Header level"
			{elements}
			changeHandler={(detail) => {
				updateData(id, (prev) => {
					if (prev.name == 'header') {
						prev.data.level = detail.value;
						content.level = detail.value;
					}
				});
			}}
		/>
		<svelte:component
			this={textarea}
			label="Header content"
			textLevel={content.level}
			textContent={content.text}
			changeHandler={(text) => {
				updateData(id, (prev) => {
					if (prev.name == 'header') prev.data.text = text;
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.headerEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
