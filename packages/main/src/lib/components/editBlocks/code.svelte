<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { text: string; lang: string };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const select = componentMap.get('select');
	const textarea = componentMap.get('textArea');
	const view = componentMap.get('viewCode');
	const languages = getContext('languages') as string[];
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="codeEdit">
		<svelte:component
			this={select}
			label="Code language"
			preSelected={{ label: content.lang, value: content.lang }}
			elements={languages.map((el) => ({ value: el, label: el }))}
			changeHandler={(detail) => {
				updateData(id, (el) => {
					if (el.name == 'code') el.data.lang = detail.value;
				});
			}}
		/>
		<svelte:component
			this={textarea}
			label="Code content"
			textLevel={0}
			textContent={content.text}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'code') el.data.text = text;
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.codeEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.codeEdit :global(::-webkit-scrollbar) {
		width: 0.5rem;
	}
	.codeEdit :global(::-webkit-scrollbar-track) {
		background: color-mix(in srgb, var(--secondaryColor) 40%, white 40%);
	}
	.codeEdit :global(::-webkit-scrollbar-thumb) {
		background: var(--secondaryColor);
	}
</style>
