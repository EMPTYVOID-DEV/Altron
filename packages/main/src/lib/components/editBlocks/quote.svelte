<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { text: string; owner: string };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const input = componentMap.get('input');
	const textarea = componentMap.get('textArea');
	const updateData: updateDataType = getContext('updateData');
	const view = componentMap.get('viewQuote');
</script>

{#if active}
	<div class="quoteEdit">
		<svelte:component
			this={input}
			value={content.owner}
			label="The Quote owner"
			changeHandler={(textContent) => {
				updateData(id, (prev) => {
					if (prev.name == 'quote') prev.data.owner = textContent;
				});
			}}
		/>

		<svelte:component
			this={textarea}
			label="The Quote content"
			textContent={content.text}
			textLevel={0}
			changeHandler={(textContent) => {
				updateData(id, (prev) => {
					if (prev.name == 'quote') prev.data.text = textContent;
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.quoteEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
