<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { FormattedText, updateDataType } from '../../utils/types';
	import { generateHTML, htmlToFormattedText } from '../../utils/utils';
	export let content: { formattedText: FormattedText; owner: string };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const input = componentMap.get('input');
	const markupTextArea = componentMap.get('markupTextArea');
	const updateData: updateDataType = getContext('updateData');
	const view = componentMap.get('viewQuote');
	function changeHandler(html: string) {
		updateData(id, (prev) => {
			if (prev.name == 'quote') htmlToFormattedText(prev.data.formattedText, html);
		});
	}
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
			this={markupTextArea}
			label="Quote content"
			initialHtml={generateHTML(content.formattedText)}
			{changeHandler}
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
